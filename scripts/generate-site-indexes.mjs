import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");
const siteUrl = "https://tripmarking.com";
// Every page was rewritten for the transport-quote purpose on 2026-10-26.
// Add a route here with a newer date when its visible content changes.
const lastmod = "2026-10-26";
const buildDate = "Mon, 26 Oct 2026 12:00:00 +0900";
const routeLastmod = new Map();
const routePubDate = new Map([
  ["/agri/", "Thu, 24 Sep 2026 21:00:00 +0900"],
  ["/agri/machinery-transport-plan/", "Thu, 24 Sep 2026 21:00:00 +0900"],
  ["/agri/quote-compare/", "Thu, 24 Sep 2026 21:00:00 +0900"]
]);
const originalPubDate = "Mon, 26 Oct 2026 12:00:00 +0900";

const nonFeedRoutes = new Set([
  "/",
  "/about/",
  "/contact/",
  "/editorial/",
  "/editorial-policy/",
  "/privacy/",
  "/sources/",
  "/terms/"
]);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodeHtml(value) {
  return String(value)
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function firstMatch(html, regex) {
  return decodeHtml(html.match(regex)?.[1]?.trim() || "");
}

function routeFromFile(filePath) {
  const relative = path.relative(siteRoot, filePath).replaceAll(path.sep, "/");
  return relative === "index.html" ? "/" : `/${relative.slice(0, -"index.html".length)}`;
}

function isFeedRoute(route) {
  if (nonFeedRoutes.has(route)) return false;
  return route === "/agri/" || route.startsWith("/agri/");
}

function priority(route) {
  if (route === "/") return "1.0";
  if (route === "/agri/machinery-transport-plan/" || route === "/agri/quote-compare/") return "0.9";
  if (route.startsWith("/agri/")) return "0.8";
  return "0.4";
}

async function collectIndexFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectIndexFiles(fullPath));
    if (entry.isFile() && entry.name === "index.html") files.push(fullPath);
  }
  return files;
}

const pages = [];
for (const filePath of await collectIndexFiles(siteRoot)) {
  const route = routeFromFile(filePath);
  const html = await fs.readFile(filePath, "utf8");
  const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = firstMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const expectedCanonical = `${siteUrl}${route}`;
  if (!title || !description) throw new Error(`Missing title or description on ${route}`);
  if (canonical !== expectedCanonical) throw new Error(`Canonical mismatch on ${route}: ${canonical}`);
  pages.push({ route, title, description });
}

pages.sort((a, b) => {
  if (a.route === "/") return -1;
  if (b.route === "/") return 1;
  return a.route.localeCompare(b.route, "en");
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ route }) => `  <url><loc>${siteUrl}${escapeXml(route)}</loc><lastmod>${routeLastmod.get(route) ?? lastmod}</lastmod><changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq><priority>${priority(route)}</priority></url>`).join("\n")}
</urlset>
`;

const feedPages = pages.filter(({ route }) => isFeedRoute(route));
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>농기계 탁송 견적 비교</title>
    <link>${siteUrl}/</link>
    <description>중고 농기계 탁송 견적 요청서와 견적 비교표, 화물 적재 기준과 운송 안전 안내.</description>
    <language>ko-KR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${feedPages.map(({ route, title, description }) => `    <item>
      <title>${escapeXml(title.replace(/\s+-\s+농기계 탁송 견적 비교$/, ""))}</title>
      <link>${siteUrl}${escapeXml(route)}</link>
      <guid>${siteUrl}${escapeXml(route)}</guid>
      <pubDate>${routePubDate.get(route) ?? originalPubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`).join("\n")}
  </channel>
</rss>
`;

await Promise.all([
  fs.writeFile(path.join(siteRoot, "sitemap.xml"), sitemap),
  fs.writeFile(path.join(siteRoot, "feed.xml"), feed)
]);

console.log(`Indexed ${pages.length} pages and ${feedPages.length} feed entries.`);
