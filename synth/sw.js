// Offline copy: the page is fetched from the network first, bypassing the browser cache (so updates arrive), and from this cache without a connection.
// Each app keeps its own cache (the apps share the site): it only clears its own older ones.
const P='octavio-octavio-',V=P+'74c3183b6a',FILES=['./','index.html','manifest.webmanifest?v=cbfb1e8a','icon-180-cbfb1e8a.png','icon-192-cbfb1e8a.png','icon-512-cbfb1e8a.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>(n.startsWith(P)||/^octavio-[0-9a-f]{10}$/.test(n))&&n!==V).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.pathname.endsWith('version.json'))return;
  const page=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
  if(page){e.respondWith(fetch(u.href,{cache:'no-store',credentials:'same-origin'}).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return res})))});
