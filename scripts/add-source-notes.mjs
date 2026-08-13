import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");
const checkedAt = "2026-08-14";

const citySources = {
  amsterdam: ["네덜란드 경찰 범죄 신고 안내", "https://www.politie.nl/en/topics/report-a-crime.html"],
  bangkok: ["태국 관광경찰 여행 안전 안내", "https://www.touristpolice.go.th/post/tpbnews2026041002"],
  barcelona: ["바르셀로나 시청 여행 안전 안내", "https://bcnroc.ajuntament.barcelona.cat/jspui/bitstream/11703/147874/1/Consells-per-gaudir-de-Barcelona-ANG.pdf"],
  istanbul: ["튀르키예 내무부 이스탄불 112 안내", "https://www.112.gov.tr/istanbul/112-acil-cagri-merkezi-yonergesi"],
  lisbon: ["포르투갈 관광청 긴급·관광경찰 안내", "https://www.visitportugal.com/pt-pt/sobre-portugal/info-util"],
  london: ["런던광역경찰청 방문객 안전 안내", "https://www.met.police.uk/cp/crime-prevention/personal-safety-how-to-stay-safe/visiting-london/"],
  "new-york": ["뉴욕경찰청 범죄 신고 안내", "https://www.nyc.gov/site/nypd/services/victim-services/how-to-report-a-crime.page"],
  paris: ["프랑스 내무부·경찰 파리 여행 안전 안내", "https://www.masecurite.interieur.gouv.fr/media/1487/download/Staying_safe_in_Paris.pdf?v=1"],
  rome: ["이탈리아 국가경찰 로마 관광 구역 안내", "https://questure.poliziadistato.it/it/Roma/articolo/17336a59ca1a5259d543088168"],
  tokyo: ["일본정부관광국 긴급 상황 안내", "https://www.japan.travel/en/plan/emergencies/"]
};

const guideSources = {
  "airport-arrival": ["외교부 해외안전여행 상황별 위기대응 매뉴얼", "https://www.0404.go.kr/bbs/contsPst/MST0000000000125/25/detail", "methodology"],
  "atm-withdrawal": ["여신금융협회 해외 카드 분실·도난 대응", "https://customer.crefia.or.kr/common/forward.xx?url=%2Fcustomer%2Fguard%2FguardCreditcardUseGuide5", "card-loss"],
  "beach-bag-safety": ["바르셀로나 시청 여행 안전 안내", citySources.barcelona[1], "barcelona"],
  "crowded-square": ["Police.uk 소매치기 예방 안내", "https://www.police.uk/cp/crime-prevention/personal-safety-how-to-stay-safe/pickpocketing/", "methodology"],
  "metro-transfer": ["Police.uk 소매치기 예방 안내", "https://www.police.uk/cp/crime-prevention/personal-safety-how-to-stay-safe/pickpocketing/", "methodology"],
  "night-transport": ["외교부 해외안전여행 상황별 위기대응 매뉴얼", "https://www.0404.go.kr/bbs/contsPst/MST0000000000125/25/detail", "methodology"],
  "passport-loss": ["외교부 여권 분실·습득 안내", "https://www.passport.go.kr/home/kor/contents.do?menuPos=26", "passport-loss"],
  pickpocket: ["Police.uk 소매치기 예방 안내", "https://www.police.uk/cp/crime-prevention/personal-safety-how-to-stay-safe/pickpocketing/", "methodology"],
  "taxi-app-check": ["외교부 해외안전여행 상황별 위기대응 매뉴얼", "https://www.0404.go.kr/bbs/contsPst/MST0000000000125/25/detail", "methodology"]
};

const defaultSource = [
  "외교부 해외안전여행",
  "https://www.0404.go.kr/",
  "methodology"
];

function routeFromFile(filePath) {
  const relative = path.relative(siteRoot, filePath).replaceAll(path.sep, "/");
  return relative === "index.html" ? "/" : `/${relative.slice(0, -"index.html".length)}`;
}

function cityKeyFromRoute(route) {
  const cityMatch = route.match(/^\/cities\/([^/]+)\/$/);
  if (cityMatch) return cityMatch[1];
  const spotMatch = route.match(/^\/spots\/([^/]+)\//);
  return spotMatch?.[1] || "";
}

function sourceForRoute(route) {
  const cityKey = cityKeyFromRoute(route);
  if (citySources[cityKey]) return [...citySources[cityKey], cityKey];

  const guideMatch = route.match(/^\/guides\/([^/]+)\/$/);
  if (guideMatch && guideSources[guideMatch[1]]) return guideSources[guideMatch[1]];

  if (route.startsWith("/field-notes/")) {
    return ["Police.uk 소매치기 예방 안내", "https://www.police.uk/cp/crime-prevention/personal-safety-how-to-stay-safe/pickpocketing/", "methodology"];
  }

  return defaultSource;
}

function isContentRoute(route) {
  return ["/guide/", "/guides/", "/cities/", "/field-notes/", "/spots/"]
    .some((prefix) => route === prefix || route.startsWith(prefix));
}

function renderSourceNote(label, url, anchor) {
  return `
      <!-- SOURCE_NOTE_START -->
      <div class="editor-note source-note">
        <strong>공식 근거와 검수</strong>
        <p><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>를 확인했으며, 마지막 링크·내용 대조일은 ${checkedAt}입니다. 이 문서는 범죄 통계나 실시간 위험 예측이 아니라 여행자의 행동을 돕는 편집 안내입니다. <a href="/sources/#${anchor}">출처 적용 범위와 편집 방법</a></p>
      </div>
      <!-- SOURCE_NOTE_END -->`;
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

let changed = 0;
for (const filePath of await collectIndexFiles(siteRoot)) {
  const route = routeFromFile(filePath);
  if (!isContentRoute(route)) continue;

  const original = await fs.readFile(filePath, "utf8");
  const withoutExisting = original.replace(/\n\s*<!-- SOURCE_NOTE_START -->[\s\S]*?<!-- SOURCE_NOTE_END -->/g, "");
  const [label, url, anchor] = sourceForRoute(route);
  const next = withoutExisting.replace(/\n\s*<\/main>/, `${renderSourceNote(label, url, anchor)}\n    </main>`);
  if (next === withoutExisting) throw new Error(`Could not place source note in ${route}`);
  if (next !== original) {
    await fs.writeFile(filePath, next);
    changed += 1;
  }
}

console.log(`Added or refreshed source notes on ${changed} content pages.`);
