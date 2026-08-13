const CANONICAL_ORIGIN = "https://tripmarking.com";
const REDIRECT_HOSTS = new Set([
  "www.tripmarking.com",
  "saferoute-4hu.pages.dev"
]);

// Keep this map deliberately exact. Add only root-relative source and target
// paths, including their intended trailing-slash form.
const EXACT_LEGACY_REDIRECTS = new Map([
  ["/review-readiness/", "/about/"],
  ["/paris-pickpocket-guide/", "/cities/paris/"],
  ["/rome-pickpocket-guide/", "/cities/rome/"],
  ["/barcelona-pickpocket-guide/", "/cities/barcelona/"],
  ["/london-phone-snatching-guide/", "/cities/london/"],
  ["/bangkok-tourist-scam-guide/", "/cities/bangkok/"],
  ["/ho-chi-minh-phone-snatching-guide/", "/guide/"],
  ["/tokyo-travel-scam-guide/", "/cities/tokyo/"],
  ["/new-york-bag-theft-guide/", "/cities/new-york/"],
  ["/istanbul-tourist-scam-guide/", "/cities/istanbul/"],
  ["/amsterdam-bike-area-pickpocket-guide/", "/cities/amsterdam/"],
  ["/travel-pickpocket-prevention/", "/guides/pickpocket/"],
  ["/lost-passport-card-response/", "/guides/passport-loss/"],
  ["/europe-subway-pickpocket/", "/guides/metro-transfer/"],
  ["/barcelona/la-rambla-pickpocket/", "/spots/barcelona/la-rambla/"],
  ["/barcelona/catalunya-metro-pickpocket/", "/spots/barcelona/catalunya-transfer/"],
  ["/barcelona/sagrada-familia-scam/", "/spots/barcelona/sagrada-familia-queue/"],
  ["/barcelona/barceloneta-beach-bag-theft/", "/guides/beach-bag-safety/"]
]);

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex, follow"
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const legacyTarget = EXACT_LEGACY_REDIRECTS.get(url.pathname);
  const needsCanonicalHost = REDIRECT_HOSTS.has(url.hostname);

  if (needsCanonicalHost || legacyTarget) {
    url.protocol = "https:";
    url.hostname = new URL(CANONICAL_ORIGIN).hostname;
    url.port = "";
    if (legacyTarget) url.pathname = legacyTarget;
    return Response.redirect(url.toString(), 301);
  }

  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    return jsonNotFound();
  }

  const response = await context.next();
  if (response.status !== 404) return response;

  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(NO_STORE_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function jsonNotFound() {
  return new Response(JSON.stringify({ ok: false, error: "not found" }), {
    status: 404,
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
