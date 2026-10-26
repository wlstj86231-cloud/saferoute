const CANONICAL_ORIGIN = "https://tripmarking.com";
const REDIRECT_HOSTS = new Set([
  "www.tripmarking.com",
  "saferoute-4hu.pages.dev"
]);

// Pages that still have a real successor on the current site. Keep this map
// exact: root-relative source and target paths with their trailing slash.
// A request for the source without its trailing slash matches too.
const EXACT_LEGACY_REDIRECTS = new Map([
  ["/review-readiness/", "/about/"],
  ["/travel/about/", "/about/"],
  ["/editorial-policy/", "/editorial/"]
]);

// The former overseas travel theft/scam map and its articles were retired on
// 2026-10-26. They contradict the current farm-machinery transport purpose and
// have no equivalent page, so they answer 410 Gone with a short notice.
const RETIRED_PREFIXES = ["/travel", "/cities", "/guides", "/guide", "/spots", "/field-notes", "/barcelona"];
const RETIRED_EXACT = new Set([
  "/paris-pickpocket-guide/",
  "/rome-pickpocket-guide/",
  "/barcelona-pickpocket-guide/",
  "/london-phone-snatching-guide/",
  "/bangkok-tourist-scam-guide/",
  "/ho-chi-minh-phone-snatching-guide/",
  "/tokyo-travel-scam-guide/",
  "/new-york-bag-theft-guide/",
  "/istanbul-tourist-scam-guide/",
  "/amsterdam-bike-area-pickpocket-guide/",
  "/travel-pickpocket-prevention/",
  "/lost-passport-card-response/",
  "/europe-subway-pickpocket/"
]);

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex, follow"
};

function isRetiredPath(pathname) {
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (RETIRED_EXACT.has(withSlash)) return true;
  return RETIRED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const legacyTarget = EXACT_LEGACY_REDIRECTS.get(url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`);
  const needsCanonicalHost = REDIRECT_HOSTS.has(url.hostname);

  if (needsCanonicalHost || legacyTarget) {
    url.protocol = "https:";
    url.hostname = new URL(CANONICAL_ORIGIN).hostname;
    url.port = "";
    if (legacyTarget) url.pathname = legacyTarget;
    return Response.redirect(url.toString(), 301);
  }

  if (isRetiredPath(url.pathname)) return retiredResponse();

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

function retiredResponse() {
  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>종료된 해외여행 안전 자료 - 농기계 탁송 견적 비교</title>
<meta name="robots" content="noindex, follow">
<link rel="icon" href="/assets/icon.svg?v=20261026" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css?v=20261026b">
</head>
<body>
<main id="main" class="narrow page">
<p class="eyebrow">410 · 종료된 페이지</p>
<h1>이 해외여행 안전 자료는 종료되었습니다</h1>
<p>tripmarking.com은 지금 중고 농기계 탁송 견적을 정리하고 비교하는 <strong>농기계 탁송 견적 비교</strong>로 운영됩니다. 이전의 해외여행 도난·스캠 지도와 도시·장소별 글은 2026년 10월 26일에 모두 종료했습니다.</p>
<p>해외여행 안전 정보는 <a href="https://www.0404.go.kr/">외교부 해외안전여행</a>에서 확인하세요.</p>
<div class="btn-row">
<a class="btn btn-primary" href="/">농기계 탁송 견적 비교 홈</a>
<a class="btn btn-secondary" href="/about/">사이트 소개와 변경 이력</a>
</div>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 410,
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff"
    }
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
