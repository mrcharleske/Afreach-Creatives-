// Service Worker for Afreach Creatives PWA
// Version: 2025-09-25
const CACHE_NAME = 'afreach-creatives-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/portfolio.html',
  '/contact.html',
  '/thankyou.html',
  '/privacy.html',
  '/case-study-alpha.html',
  '/case-study-beta.html',
  '/case-study-gamma.html',
  '/case-study-delta.html',
  '/case-study-epsilon.html',
  '/case-study-zeta.html',
  '/css/styles.css',
  '/js/main.js',
  '/manifest.webmanifest',
  '/images/favicon.png',
  '/images/logo.png',
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/ceo.jpg',
  '/images/joseph.jpg',
  '/images/beatrice.jpg',
  '/images/brandingmain.jpg',
  '/images/webdev.jpg',
  '/images/bookpublishingmain.jpg',
  '/images/digitalmain.jpg',
  '/images/webmaint.jpg',
  '/images/livestreaming.jpg'
];

// Install: Cache all essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Serve cached content, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Fallback for offline page
          return caches.match('/index.html');
        });
      })
  );
});
