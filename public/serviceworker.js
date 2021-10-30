const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

//Install a  service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch()
        )
});


//listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match(event.request))
            })
    )
});



// self.addEventListener('fetch', (event) => {
//   console.log('Fetch intercepted for:', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse;
//       }
//       return fetch(event.request);
//     }),
//   );
// });


//activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                Promise.all(
                    cacheNames.map((cacheName) => {
                        if(!cacheWhiteList.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
    )
});