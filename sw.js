var cacheName = 'go-to-sleep';
var filesToCache = [
    './',
    './index.html',
    './boom.css',
    './main.js',
    './sheep.png',
    './star.png',
    './clouds.png',
    './bah.mp3',
    './bah2.mp3',
    './bah3.mp3',
    './bah4.mp3',
    './bah5.mp3',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});