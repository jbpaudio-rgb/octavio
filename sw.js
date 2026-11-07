// Offline copy: the page is fetched from the network first (so updates arrive), and from this cache without a connection
const V='octavio-4b46fbf2f7',FILES=['./','index.html','manifest.webmanifest?v=46290ae9','icon-180-46290ae9.png','icon-192-46290ae9.png','icon-512-46290ae9.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
  const page=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
  if(page){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return res})))});
