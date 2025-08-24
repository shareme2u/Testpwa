// service-worker.js
const CACHE_NAME = "testpwa-cache-v1";
const OFFLINE_URL = "/Testpwa/index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/Testpwa/",
        "/Testpwa/index.html",
        "/Testpwa/manifest.json",
        "/Testpwa/icon-192.png",
        "/Testpwa/icon-512.png"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(
        (response) => response || fetch(event.request)
      )
    );
  }
});
