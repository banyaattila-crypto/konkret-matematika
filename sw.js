/* Konkrét Matematika – service worker. A verzió a VERSION fájllal egyezik; változáskor a régi gyorsítótár törlődik. */
const VERSION = "1.2.1";
const CORE = `km-core-${VERSION}`;
const RUNTIME = "km-runtime";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith("km-core-") && k !== CORE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Oldal: előbb a hálózat (friss tartalom), hiba esetén a gyorsítótár. Külső erőforrás (MathJax, betűtípusok): stale-while-revalidate. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(r => { const copy = r.clone(); caches.open(CORE).then(c => c.put("index.html", copy)); return r; })
        .catch(() => caches.match("index.html").then(r => r || caches.match("./")))
    );
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CORE).then(c => c.put(req, copy)); } return r; })));
    return;
  }
  const hosts = ["cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];
  if (hosts.includes(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
