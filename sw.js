// sw.js
const CACHE_NAME = "afreach-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/services.html",
  "/portfolio.html",
  "/contact.html",
  "/styles.css",
  "/main.js",
  "/aos-init.js",
  "/images/logo.png",
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg"
];

// Install Service Worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching site files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate and clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache or fetch from network
      return response || fetch(event.request);
    })
  );
});
