const cfg=window.LCR_CONFIG;
async function rpc(name,params={},options={}){
  const session=window.LCR_AUTH?await LCR_AUTH.getSession():null;
  const token=options.anon?cfg.supabaseKey:(session?.access_token||cfg.supabaseKey);
  const r=await fetch(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:cfg.supabaseKey,Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(params)});
  const text=await r.text();if(!r.ok)throw new Error((()=>{try{return JSON.parse(text).message||text}catch{return text}})());return text?JSON.parse(text):null
}
window.LCR_API={rpc};