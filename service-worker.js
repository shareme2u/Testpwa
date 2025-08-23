const CACHE_NAME = "yt-pwa-v3"; // bump version to force refresh
const ASSETS = [
  "./",
  "./index.html",
  "./icon-192.png?v=3",
  "./manifest.json?v=3"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request))
  );
});
