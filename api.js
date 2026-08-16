const cfg=window.LCR_CONFIG;
const SAFE_RETRY=new Set(['lcr_start_attempt_quick','lcr_submit_answer','lcr_finish_and_route','lcr_retry_attempt','lcr_get_result','lcr_mark_checkout_interest']);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function rpc(name,params={},options={}){
  const attempts=options.retries??(SAFE_RETRY.has(name)?3:1);
  let lastError;
  for(let i=0;i<attempts;i++){
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),options.timeoutMs||8000);
    try{
      const r=await fetch(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`,{
        method:'POST',
        headers:{apikey:cfg.supabaseKey,Authorization:`Bearer ${cfg.supabaseKey}`,'Content-Type':'application/json'},
        body:JSON.stringify(params),
        signal:controller.signal,
        cache:'no-store'
      });
      const text=await r.text();
      if(r.ok)return text?JSON.parse(text):null;
      let message=text;
      try{const parsed=JSON.parse(text);message=parsed.message||parsed.error_description||parsed.error||text}catch{}
      const retryable=[429,500,502,503,504].includes(r.status);
      if(!retryable||i===attempts-1)throw new Error(message||`Erro ${r.status}`);
      lastError=new Error(message||`Erro ${r.status}`);
    }catch(e){
      lastError=e?.name==='AbortError'?new Error('A conexão demorou mais que o esperado. Tentando novamente...'):e;
      if(i===attempts-1||(!SAFE_RETRY.has(name)&&e?.name!=='AbortError'))throw lastError;
    }finally{clearTimeout(timeout)}
    await sleep(250*(i+1)+Math.floor(Math.random()*180));
  }
  throw lastError||new Error('Não foi possível conectar.');
}
window.LCR_API={rpc};