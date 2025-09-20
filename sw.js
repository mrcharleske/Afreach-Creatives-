const CACHE_NAME = 'afreach-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/portfolio.html',
  '/contact.html',
  '/styles.css',
  '/main.js',
  '/images/logo.png',
  '/images/favicon.ico',
  '/images/apple-touch-icon.png',
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',
  '/images/ceo.jpg',
  '/images/joseph.jpg',
  '/images/beatrice.jpg',
  '/images/creative.jpg',
  '/images/web.jpg',
  '/images/pr.jpg',
  '/images/support.jpg',
  '/images/publishing.jpg',
  '/images/elite.jpg',
  '/images/grace.png',
  '/images/lydia.jpg',
  '/images/contact.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching site files...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
