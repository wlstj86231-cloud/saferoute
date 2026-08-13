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

const www = await callMiddleware("https://www.tripmarking.com/cities/paris/?from=test");
assert.equal(www.status, 301);
assert.equal(www.headers.get("location"), "https://tripmarking.com/cities/paris/?from=test");

const pagesDev = await callMiddleware("https://saferoute-4hu.pages.dev/guides/pickpocket/");
assert.equal(pagesDev.status, 301);
assert.equal(pagesDev.headers.get("location"), "https://tripmarking.com/guides/pickpocket/");

const legacy = await callMiddleware("https://tripmarking.com/paris-pickpocket-guide/?utm_source=old");
assert.equal(legacy.status, 301);
assert.equal(legacy.headers.get("location"), "https://tripmarking.com/cities/paris/?utm_source=old");

const api = await callMiddleware("https://tripmarking.com/api/reports");
assert.equal(api.status, 404);
assert.match(api.headers.get("cache-control") || "", /no-store/);
assert.match(api.headers.get("x-robots-tag") || "", /noindex/);

const missing = await callMiddleware("https://tripmarking.com/no-such-route", 404);
assert.equal(missing.status, 404);
assert.match(missing.headers.get("cache-control") || "", /no-store/);
assert.match(missing.headers.get("x-robots-tag") || "", /noindex/);

const app = await fs.readFile(path.join(siteRoot, "assets", "app.js"), "utf8");
for (const forbidden of [
  "/api/reports",
  "/api/feedback",
  "tripmarking:reports",
  "tripmarking:feedbackOutbox",
  "contact@tripmarking.com",
  "sumimap.com",
  "평균 위험",
  "Average risk",
  "실시간 제보",
  "Live reports"
]) {
  assert.equal(app.includes(forbidden), false, `app still contains disabled or misleading string: ${forbidden}`);
}

const notFound = await fs.readFile(path.join(siteRoot, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex,\s*follow"/i);
assert.doesNotMatch(notFound, /rel="canonical"/i);
assert.doesNotMatch(notFound, /adsbygoogle|pagead2\.googlesyndication/i);

const privacy = await fs.readFile(path.join(siteRoot, "privacy", "index.html"), "utf8");
assert.match(privacy, /2026년 8월 14일/);
assert.match(privacy, /운영 서버에 .*수집·저장하지 않습니다/);

const sources = await fs.readFile(path.join(siteRoot, "sources", "index.html"), "utf8");
for (const anchor of [
  "barcelona", "paris", "rome", "london", "bangkok", "hochiminh", "tokyo", "new-york",
  "istanbul", "amsterdam", "madrid", "lisbon", "athens", "prague", "budapest", "mexicocity",
  "passport-loss", "phone-loss", "card-loss", "methodology"
]) {
  assert.match(sources, new RegExp(`id=["']${anchor}["']`), `missing source anchor ${anchor}`);
}

for (const file of await collectHtml(siteRoot)) {
  const html = await fs.readFile(file, "utf8");
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
