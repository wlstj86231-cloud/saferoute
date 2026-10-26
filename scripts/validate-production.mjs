import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");

const { onRequest } = await import(pathToFileURL(path.join(root, "functions", "_middleware.js")));

async function callMiddleware(url, downstreamStatus = 200) {
  return onRequest({
    request: new Request(url),
    next: async () => new Response(downstreamStatus === 404 ? "not found" : "ok", { status: downstreamStatus })
  });
}

const www = await callMiddleware("https://www.tripmarking.com/agri/quote-compare/?from=test");
assert.equal(www.status, 301);
assert.equal(www.headers.get("location"), "https://tripmarking.com/agri/quote-compare/?from=test");

const pagesDev = await callMiddleware("https://saferoute-4hu.pages.dev/agri/");
assert.equal(pagesDev.status, 301);
assert.equal(pagesDev.headers.get("location"), "https://tripmarking.com/agri/");

for (const [from, to] of [["/travel/about/", "/about/"], ["/review-readiness/", "/about/"], ["/editorial-policy/", "/editorial/"], ["/travel/about", "/about/"], ["/review-readiness", "/about/"], ["/editorial-policy", "/editorial/"]]) {
  const moved = await callMiddleware(`https://tripmarking.com${from}?utm_source=old`);
  assert.equal(moved.status, 301, from);
  assert.equal(moved.headers.get("location"), `https://tripmarking.com${to}?utm_source=old`);
}

// The retired overseas travel section answers 410 with a notice, never 200.
for (const retired of ["/travel/", "/travel", "/cities/paris/", "/guides/pickpocket/", "/guide/", "/spots/rome/termini-station/", "/field-notes/", "/paris-pickpocket-guide/", "/barcelona/la-rambla-pickpocket/"]) {
  const gone = await callMiddleware(`https://tripmarking.com${retired}`);
  assert.equal(gone.status, 410, retired);
  assert.match(gone.headers.get("x-robots-tag") || "", /noindex/);
  assert.match(await gone.text(), /종료되었습니다/);
}
for (const live of ["/agri/guides/loading-limits/", "/agri/", "/"]) {
  const ok = await callMiddleware(`https://tripmarking.com${live}`);
  assert.equal(ok.status, 200, live);
}

const api = await callMiddleware("https://tripmarking.com/api/reports");
assert.equal(api.status, 404);
assert.match(api.headers.get("cache-control") || "", /no-store/);
assert.match(api.headers.get("x-robots-tag") || "", /noindex/);

const missing = await callMiddleware("https://tripmarking.com/no-such-route", 404);
assert.equal(missing.status, 404);
assert.match(missing.headers.get("cache-control") || "", /no-store/);
assert.match(missing.headers.get("x-robots-tag") || "", /noindex/);

for (const script of ["quote-request-20261026b.js", "quote-compare-20261026b.js"]) {
  const code = await fs.readFile(path.join(siteRoot, "assets", script), "utf8");
  assert.doesNotMatch(code, /fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon/, `${script} must keep input in the browser`);
}

const home = await fs.readFile(path.join(siteRoot, "index.html"), "utf8");
assert.match(home, /<meta name="naver-site-verification" content="c06d1248da3e65e670fc0dd22847f11765c946d5">/);
assert.match(home, /<meta name="google-site-verification" content="UDKZhW7Zh4CFIqIGz8Oif7QR_XjBFwxWFiBbBsDPs7Q">/);
assert.match(home, /<meta name="google-adsense-account" content="ca-pub-5877883031077615">/);

const notFound = await fs.readFile(path.join(siteRoot, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex,\s*follow"/i);
assert.doesNotMatch(notFound, /rel="canonical"/i);
assert.doesNotMatch(notFound, /adsbygoogle|pagead2\.googlesyndication/i);

const privacy = await fs.readFile(path.join(siteRoot, "privacy", "index.html"), "utf8");
assert.match(privacy, /2026년 8월 14일/);
assert.match(privacy, /운영 서버에 .*수집·저장하지 않습니다/);

const sources = await fs.readFile(path.join(siteRoot, "sources", "index.html"), "utf8");
for (const anchor of ["law", "ts", "rda", "agri", "methodology"]) {
  assert.match(sources, new RegExp(`id=["']${anchor}["']`), `missing source anchor ${anchor}`);
}

for (const phrase of ["adssettings.google.com", "policies.google.com/technologies/ads", "consultingjinjeong@gmail.com", "010-2846-2011"]) {
  assert.ok(privacy.includes(phrase), `privacy page must mention ${phrase}`);
}
// The funding/ads wording must stay true whether or not ad code is live, so
// trust pages may not promise "no ads now" and must say ads may be shown.
for (const page of ["about", "privacy", "editorial", "terms"]) {
  const html = await fs.readFile(path.join(siteRoot, page, "index.html"), "utf8");
  assert.doesNotMatch(html, /광고를 싣지 않습니다|광고 스크립트를 싣는 페이지는 없|광고가 없습니다/, `${page} page states a time-bound "no ads" claim`);
  assert.match(html, /Google 애드센스 광고가 게재될 수 있/, `${page} page must disclose that AdSense ads may be shown`);
}

const contact = await fs.readFile(path.join(siteRoot, "contact", "index.html"), "utf8");
for (const phrase of ["tel:010-2846-2011", "mailto:consultingjinjeong@gmail.com", "https://open.kakao.com/o/scuvl1wi", "https://open.kakao.com/o/p6HiJ9Pi", "의료원로 80-8"]) {
  assert.ok(contact.includes(phrase), `contact page must list ${phrase}`);
}

// Every page shares the operator footer; every indexable page carries the
// AdSense ownership meta and points its JSON-LD at the one Organization node.
// Content pages under /agri/ also show who maintains them, real dates, a
// source list whose count matches the meta line, and a scope note.
for (const file of await collectHtml(siteRoot)) {
  const html = await fs.readFile(file, "utf8");
  const rel = path.relative(siteRoot, file).replaceAll(path.sep, "/");
  assert.doesNotMatch(html, /트립마킹|assets\/app\.js|leaflet|href="\/(travel|cities|guides|guide|spots|field-notes)\//i, `legacy travel reference in ${rel}`);
  const graphs = [];
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    graphs.push(JSON.parse(match[1]));
  }
  if (/^google[0-9a-f]+\.html$/.test(rel)) continue;
  const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] || "";
  assert.match(footer, /제이 미디어 · 대표 이정우 · 사업자등록번호 456-33-01705 · 고객센터/, `operator line missing in footer of ${rel}`);
  for (const href of ["/about/", "/contact/", "/editorial/", "/privacy/", "/terms/"]) {
    assert.ok(footer.includes(`href="${href}"`), `footer of ${rel} must link ${href}`);
  }
  if (rel === "404.html") continue;
  assert.match(html, /<meta name="google-adsense-account" content="ca-pub-5877883031077615">/, `AdSense ownership meta missing on ${rel}`);
  const nodes = graphs.flatMap((g) => g["@graph"] || [g]);
  assert.ok(nodes.some((n) => n["@type"] === "Organization" && n["@id"] === "https://jnewmedia.com/#organization" && n.telephone && n.address), `Organization node missing on ${rel}`);
  for (const n of nodes.filter((x) => ["Article", "WebPage", "AboutPage", "ContactPage", "CollectionPage", "WebApplication"].includes(x["@type"]))) {
    assert.equal(n.publisher?.["@id"], "https://jnewmedia.com/#organization", `${n["@type"]} publisher on ${rel}`);
  }
  if (rel.startsWith("agri/")) {
    const metaLine = html.match(/<p class="page-meta">([\s\S]*?)<\/p>/)?.[1] || "";
    assert.match(metaLine, /작성·관리: <a href="\/editorial\/">제이 미디어 편집팀<\/a> \(운영 책임: 대표 이정우\)/, `byline missing on ${rel}`);
    assert.match(metaLine, /게시일 <time datetime="\d{4}-\d{2}-\d{2}">/, `published date missing on ${rel}`);
    assert.match(metaLine, /최종 확인일 <time datetime="\d{4}-\d{2}-\d{2}">/, `checked date missing on ${rel}`);
    const listed = (html.match(/<ol class="source-list">([\s\S]*?)<\/ol>/)?.[1].match(/<li>/g) || []).length;
    assert.equal(Number(metaLine.match(/출처 (\d+)건/)?.[1]), listed, `source count on ${rel}`);
    assert.match(html, /<section class="note warn scope-note"[^>]*>\s*<h2 id="scope-title">범위와 한계<\/h2>/, `scope note missing on ${rel}`);
    const article = nodes.find((n) => n["@type"] === "Article");
    if (article) assert.equal(article.author?.["@id"], "https://jnewmedia.com/#organization", `Article author on ${rel}`);
  }
}

const manifest = JSON.parse(await fs.readFile(path.join(siteRoot, "manifest.webmanifest"), "utf8"));
assert.ok(manifest.name);

const sw = await fs.readFile(path.join(siteRoot, "sw.js"), "utf8");
assert.doesNotMatch(sw, /mode === "navigate"\) return caches\.match\("\/"\)/);

async function collectHtml(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtml(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

console.log("Production validation passed.");
