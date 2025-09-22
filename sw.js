const CACHE_NAME = 'afreach-creatives-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/portfolio.html',
    '/contact.html',
    '/styles.css',
    '/main.js',
    '/site.webmanifest',
    '/images/logo.png',
    '/images/livestreaming.jpg',
    '/images/branding.jpg',
    '/images/webdev.jpg',
    '/images/maintenance.jpg',
    '/images/marketing.jpg',
    '/images/publishing.jpg',
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg',
    '/images/brandmain.jpg',
    '/images/brand1.png',
    '/images/brand2.jpg',
    '/images/brand3.jpg',
    '/images/brand4.png',
    '/images/e-commercemain.jpg',
    '/images/e-commerce1.jpg',
    '/images/e-commerce2.jpg',
    '/images/e-commerce3.jpg',
    '/images/e-commerce4.jpg',
    '/images/digitalmain.jpg',
    '/images/digital1.jpg',
    '/images/digital2.jpg',
    '/images/digital3.jpg',
    '/images/digital4.jpg',
    '/images/bookpublishingmain.jpg',
    '/images/bookpublishing1.jpg',
    '/images/bookpublishing2.jpg',
    '/images/bookpublishing3.jpg',
    '/images/bookpublishing4.jpg',
    '/images/team1.jpg',
    '/images/team2.jpg',
    '/images/team3.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Cache addAll failed:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    return caches.match('/index.html');
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
