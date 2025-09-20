self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('onoa-v1').then((c) => c.addAll(['/'])));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => new Response('Offline')))
  );
});
