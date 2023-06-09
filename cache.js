(() => {
  "use strict";
  self, location.origin;
  const {setTimeout: e, setInterval: t, clearTimeout: s, clearInterval: n, AbortController: o, fetch: r, XMLHttpRequest: a, webkitNotifications: c, decodeURIComponent: i, encodeURIComponent: l, Notification: u, TextDecoder: h, FileReader: d, DOMParser: p, unescape: w, escape: f, btoa: g, atob: m, alert: W, confirm: x, crypto: y, Worker: T} = self;
  self.addEventListener("install", () => {
    console.log("SW: started"), self.skipWaiting().catch(e => console.warn(e));
  });
  const b = "x-sw-cache-timestamp";
  self.addEventListener("fetch", e => {
    const t = e.request.url, s = caches.match(t).then(async s => {
      let n;
      if (s && (!(n = s.headers.get(b)) || Date.now() < Number(n) + 6048e5)) return console.log(`SW: delivering cached response for ${t}`), s;
      if (!t.startsWith("http") || !(t.startsWith("https://www.google.com/s2/favicons") || t.startsWith("https://icons.duckduckgo.com/ip2/") || t.endsWith("favicon.ico"))) return r(e.request);
      try {
        const s = await r(e.request);
        return (async (e, t) => {
          console.log(`SW: caching ${e}`);
          const s = await caches.open("dynamic"), n = await (async (e, t) => {
            const s = t ? t((() => {
              const t = new Headers;
              for (const [s, n] of e.headers.entries()) t.append(s, n);
              return t;
            })()) : e.headers, n = await e.blob();
            return new Response(n, {status: e.status, statusText: e.statusText, headers: s});
          })(t, e => (e.set(b, Date.now().toString()), e));
          return s.put(e, n.clone()).catch(e => console.warn(e)), n;
        })(t, s);
      } catch (e) {
        return (async (e, t) => {
          console.log(`SW: caching error response for ${e}`);
          const s = await caches.open("dynamic"), n = new Response(null, {status: 500, statusText: t || "internal error", headers: {[b]: Date.now().toString()}});
          return s.put(e, n.clone()).catch(e => console.warn(e)), n;
        })(t, e.message);
      }
    }).catch(e => {
      const t = e.message || e.statusText || "unknown error";
      return console.log(`SW: unexpected error ${t}`), new Response(null, {status: 500, statusText: t});
    });
    e.respondWith(s);
  });
})();

