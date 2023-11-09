const COPILOT_WEB_CACHE = "copilot-cache";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");

self.addEventListener("activate", function(event) {
    console.log("ServiceWorker activated.");
});

workbox.core.clientsClaim();
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    /\.js|.css$/,
    new workbox.strategies.NetworkFirst({
        cacheName: COPILOT_WEB_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60
            })
        ]
    })
);
