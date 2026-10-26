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

for (const [from, to] of [["/travel/about/", "/about/"], ["/review-readiness/", "/about/"], ["/editorial-policy/", "/editorial/"]]) {
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

for (const script of ["quote-request-20261026.js", "quote-compare-20261026.js"]) {
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

for (const file of await collectHtml(siteRoot)) {
  const html = await fs.readFile(file, "utf8");
  assert.doesNotMatch(html, /트립마킹|assets\/app\.js|leaflet|href="\/(travel|cities|guides|guide|spots|field-notes)\//i, `legacy travel reference in ${path.relative(siteRoot, file)}`);
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    JSON.parse(match[1]);
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
