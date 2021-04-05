self.addEventListener("install", e => {
    console.log("SW installed");
    e.waitUntil(
        caches.open("v1").then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./about.html",
                "./search.html",
                "./assets/json/product_details.js",
                "./assets/css/style.css"
            ]);
        })
    );
});


self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
