// JARDÉO 2.7 — Proxy Pl@ntNet pour Cloudflare Workers
// Secret à configurer dans Cloudflare : PLANTNET_API_KEY
// Ne jamais placer la clé dans GitHub ni dans le JavaScript du navigateur.
const ORIGIN='https://olivicas.github.io';
const MAX_BYTES=8*1024*1024;
const cors={'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};
function reply(message,status=400){return new Response(JSON.stringify({error:message}),{status,headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'}})}
export default {
 async fetch(request,env){
  const origin=request.headers.get('Origin');
  if(origin!==ORIGIN)return reply('Origine non autorisée',403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
  if(request.method!=='POST')return reply('Méthode non autorisée',405);
  if(!env.PLANTNET_API_KEY)return reply('Service non configuré',503);
  const length=Number(request.headers.get('Content-Length')||0);
  if(length>MAX_BYTES)return reply('Photo trop volumineuse',413);
  let data;
  try{data=await request.formData()}catch{return reply('Formulaire invalide')}
  const photo=data.get('images');
  if(!(photo instanceof File)||!photo.type.startsWith('image/')||photo.size>MAX_BYTES||photo.size===0)return reply('Photo invalide ou trop volumineuse',413);
  // Limitation appliquée côté serveur, avant chaque appel payant/quoté à Pl@ntNet.
  // Le binding SCAN_RATE_LIMITER est configuré dans Cloudflare : 5 requêtes / 60 s.
  // Cloudflare Rate Limiting est approximatif et n'est pas une garantie anti-abus absolue.
  if(!env.SCAN_RATE_LIMITER || typeof env.SCAN_RATE_LIMITER.limit!=='function')
    return reply('Protection du scanner non configurée',503);
  const ip=request.headers.get('CF-Connecting-IP');
  if(!ip)return reply('Impossible de vérifier la limite de scans',503);
  let allowed;
  try{allowed=await env.SCAN_RATE_LIMITER.limit({key:ip})}
  catch{return reply('Vérification de la limite momentanément indisponible',503)}
  if(!allowed.success)
    return new Response(JSON.stringify({error:'Trop de scans : patientez une minute avant de réessayer.'}),{status:429,headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store','Retry-After':'60'}});
  // Le contrôle CORS n'est pas une authentification ; cette limitation réduit les abus.
  const form=new FormData();
  form.append('images',photo,photo.name||'plante.jpg');
  let upstream;
  try{upstream=await fetch('https://my-api.plantnet.org/v2/identify/all?lang=fr&api-key='+encodeURIComponent(env.PLANTNET_API_KEY),{method:'POST',body:form})}
  catch{return reply('Service de reconnaissance momentanément indisponible',502)}
  const body=await upstream.text();
  return new Response(body,{status:upstream.status,headers:{...cors,'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}})
 }
};
