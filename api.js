const cfg=window.LCR_CONFIG;
async function rpc(name,params={}){const r=await fetch(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:cfg.supabaseKey,Authorization:`Bearer ${cfg.supabaseKey}`,'Content-Type':'application/json'},body:JSON.stringify(params)});const text=await r.text();if(!r.ok)throw new Error((()=>{try{return JSON.parse(text).message||text}catch{return text}})());return text?JSON.parse(text):null}
window.LCR_API={rpc};
