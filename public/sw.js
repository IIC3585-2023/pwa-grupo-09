// Name of the Cache.
const CACHE = "cacheV1";

// Select files for caching.
let urlsToCache = [
    "/",
    "/index.html",
    "/images/32.png",
    "/images/64.png",
    "/images/128.png",
    "/images/192.png",
    "/images/256.png",
    "/images/512.png",
    "/css/style.css",
    "/js/main.js",
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log("Caching started.");
            return cache.addAll(urlsToCache);
        })
    );
});

// Whenever a resource is requested, return if its cached else fetch the resourcefrom server.
/* self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
}); */

self.addEventListener("fetch", (event) => {
    if (event.request.method === "GET") {
        event.respondWith(
            fetch(event.request)
            .then((fetchResponse) => {
                // Clone the response as it can be consumed only once.
                const clonedResponse = fetchResponse.clone();

                // Open the cache and add the cloned response to it.
                caches.open(CACHE).then((cache) => {
                    cache.put(event.request, clonedResponse);
                });

                return fetchResponse; // Return the fetched response.
            })
            .catch(() => {
                return caches.match(event.request); // Return the cached response if fetch fails.
            })
        );
    }
});