import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");
const siteUrl = "https://tripmarking.com";
const lastmod = "2026-08-14";
const buildDate = "Thu, 24 Sep 2026 21:00:00 +0900";
const routeLastmod = new Map([["/agri/machinery-transport-plan/", "2026-09-24"]]);
const routePubDate = new Map([["/agri/machinery-transport-plan/", buildDate]]);
const originalPubDate = "Fri, 14 Aug 2026 00:00:00 +0900";

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
  return ["/guide/", "/guides/", "/cities/", "/field-notes/", "/spots/", "/agri/"]
    .some((prefix) => route === prefix || route.startsWith(prefix));
}

function priority(route) {
  if (route === "/") return "1.0";
  if (["/guide/", "/guides/", "/cities/", "/field-notes/"].includes(route)) return "0.8";
  if (route.startsWith("/cities/") || route.startsWith("/guides/")) return "0.7";
  if (route.startsWith("/spots/") || route.startsWith("/field-notes/")) return "0.6";
  if (route.startsWith("/agri/")) return "0.7";
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
    <title>트립마킹</title>
    <link>${siteUrl}/</link>
    <description>여행 안전 자료와 현장 이동 조건을 확인하는 트립마킹의 가이드·도구.</description>
    <language>ko-KR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${feedPages.map(({ route, title, description }) => `    <item>
      <title>${escapeXml(title.replace(/\s+-\s+트립마킹$/, ""))}</title>
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
