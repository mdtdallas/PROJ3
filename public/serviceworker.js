const CACHE_NAME = "version-1";
const urlsToCache = [
  "App.js",
  "App.css",
  "index.css",
  "index.js",
  "index.html",
  "favicon.ico",
  "Charts.jsx",
  "darkModeContext.jsx",
  "darkModeReducer.jsx",
  "DataTable.jsx",
  "Featured.jsx",
  "Navbar.jsx",
  "Sidebar.jsx",
  "Table.jsx",
  "Widgets.jsx",
  "Home.jsx",
  "List.jsx",
  "Login.jsx",
  "New.jsx",
  "Single.jsx",
  "theme.css",
];

const self = this;
// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("index.html"));
    })
  );
});
// Activate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
