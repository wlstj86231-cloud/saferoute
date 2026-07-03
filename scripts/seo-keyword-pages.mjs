import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..", "site");
const siteUrl = "https://tripmarking.com";
const lastmod = "2026-05-09";
const buildDate = "Sat, 09 May 2026 18:35:00 +0900";

const pages = [
  {
    slug: "paris-pickpocket-guide",
    title: "파리 소매치기 주의 가이드 - 트립마킹",
    h1: "파리 여행 중 소매치기 걱정을 줄이는 동선별 기준",
    description: "파리 지하철, 에펠탑, 몽마르트르, 루브르 주변에서 소매치기와 접근 제안을 조심스럽게 확인하는 트립마킹 가이드.",
    intent: "파리 소매치기, 파리 지하철 소매치기, 에펠탑 소매치기",
    city: "파리",
    signal: "소매치기",
    emoji: "👜",
    mapHref: "/?risk=pickpocket&city=paris&utm_source=seo-keyword&utm_medium=internal&utm_campaign=paris-pickpocket",
    scenarios: ["지하철 승하차 직전 몸이 가까워지는 순간", "에펠탑과 루브르 주변에서 사진과 길찾기가 겹치는 순간", "몽마르트르 언덕처럼 접근 제안이 생기기 쉬운 장소"],
    related: ["/guide/", "/cities/", "/travel-pickpocket-prevention/"]
  },
  {
    slug: "rome-pickpocket-guide",
    title: "로마 소매치기 주의 가이드 - 트립마킹",
    h1: "로마 관광지와 대중교통에서 소지품을 지키는 확인 순서",
    description: "로마 테르미니역, 콜로세움, 트레비 분수, 스페인 계단 주변 소매치기 주의 기준을 정리한 여행 안전 가이드.",
    intent: "로마 소매치기, 로마 테르미니역 주의, 로마 관광지 소매치기",
    city: "로마",
    signal: "소매치기",
    emoji: "👜",
    mapHref: "/?risk=pickpocket&city=rome&utm_source=seo-keyword&utm_medium=internal&utm_campaign=rome-pickpocket",
    scenarios: ["테르미니역에서 짐, 표, 길찾기를 동시에 확인하는 순간", "트레비 분수와 스페인 계단처럼 사람이 멈춰 서는 장소", "입장 줄과 사진 줄이 길어져 가방이 몸에서 멀어지는 순간"],
    related: ["/guide/", "/cities/", "/europe-subway-pickpocket/"]
  },
  {
    slug: "cities/paris",
    title: "파리 여행 안전 맥락 가이드 - 트립마킹",
    h1: "파리에서 사진 명소와 지하철 동선을 나눠 보는 법",
    description: "파리 에펠탑, 루브르, 몽마르트르, 지하철 환승 구간에서 소지품과 접근 제안을 조심스럽게 확인하는 도시별 여행 안전 가이드.",
    intent: "파리 여행 주의, 파리 지하철 소매치기, 에펠탑 주변 주의",
    city: "파리",
    signal: "도시별 주의 맥락",
    emoji: "🗼",
    mapHref: "/?city=paris&utm_source=city-page&utm_medium=internal&utm_campaign=paris-city",
    scenarios: ["트로카데로와 에펠탑 포토존에서 사진을 찍느라 가방 지퍼가 시야 밖으로 가는 순간", "샤틀레, 루브르, 북역 연결 구간에서 노선과 짐을 동시에 확인하는 순간", "몽마르트르 언덕길에서 팔찌, 서명, 사진 제안처럼 대화가 길어지는 접근을 받는 순간"],
    related: ["/paris-pickpocket-guide/", "/guides/pickpocket/", "/guides/night-transport/", "/field-notes/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900"
  },
  {
    slug: "cities/rome",
    title: "로마 여행 안전 맥락 가이드 - 트립마킹",
    h1: "로마에서 역·분수·입장 대기줄을 다르게 보는 법",
    description: "로마 테르미니역, 트레비 분수, 콜로세움, 바티칸 주변에서 소지품 분산과 접근 제안을 줄이는 도시별 여행 안전 가이드.",
    intent: "로마 여행 주의, 로마 테르미니역 소매치기, 트레비 분수 주의",
    city: "로마",
    signal: "도시별 주의 맥락",
    emoji: "🏛️",
    mapHref: "/?city=rome&utm_source=city-page&utm_medium=internal&utm_campaign=rome-city",
    scenarios: ["테르미니역에서 발권기, 플랫폼, 캐리어, 여권 확인이 한 번에 몰리는 순간", "트레비 분수에서 사진과 동전, 휴대폰, 가방을 동시에 다루는 순간", "콜로세움이나 바티칸 대기줄에서 입장권과 소지품 확인 역할이 섞이는 순간"],
    related: ["/rome-pickpocket-guide/", "/guides/pickpocket/", "/guides/passport-loss/", "/field-notes/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900"
  },
  {
    slug: "guides/pickpocket",
    title: "해외여행 소매치기 예방 핵심 가이드 - 트립마킹",
    h1: "도시가 달라도 반복되는 소매치기 순간을 줄이는 법",
    description: "해외여행 중 지하철, 사진 명소, 시장, 야외 좌석에서 지갑, 휴대폰, 여권, 가방 노출을 줄이는 소매치기 예방 가이드.",
    intent: "해외여행 소매치기 예방, 여행 지갑 보관, 여행 가방 지퍼 관리",
    city: "해외여행",
    signal: "소매치기 예방",
    emoji: "🖐️",
    mapHref: "/?risk=pickpocket&utm_source=guide-topic&utm_medium=internal&utm_campaign=pickpocket-guide",
    scenarios: ["지하철 승하차 직전에 몸이 가까워지고 백팩이 뒤로 밀리는 순간", "사진 명소에서 휴대폰은 앞에 있지만 지갑과 여권 파우치가 시야 밖으로 가는 순간", "시장이나 카페에서 결제 후 지갑을 다시 넣었는지 기억이 흐려지는 순간"],
    related: ["/travel-pickpocket-prevention/", "/cities/paris/", "/cities/rome/", "/spots/barcelona/la-rambla/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900"
  },
  {
    slug: "guides/passport-loss",
    title: "해외여행 여권·카드 분실 직후 대응 가이드 - 트립마킹",
    h1: "여권이나 카드가 사라졌을 때 먼저 잠글 것과 기록할 것",
    description: "해외여행 중 여권, 카드, 휴대폰, 숙소 키를 잃어버렸다고 느낄 때 카드 정지, 계정 잠금, 경찰 신고, 영사관 절차를 정리하는 대응 가이드.",
    intent: "여권 분실 대처, 해외 카드 분실 신고, 여행 도난 직후 행동",
    city: "해외여행",
    signal: "분실 직후 대응",
    emoji: "🧾",
    mapHref: "/?utm_source=guide-topic&utm_medium=internal&utm_campaign=passport-loss",
    scenarios: ["지갑이나 여권 파우치가 사라졌지만 마지막으로 확인한 위치가 불명확한 상황", "카드와 휴대폰이 같이 불안해 결제 차단과 계정 잠금 순서를 정해야 하는 상황", "경찰 신고와 보험 접수를 위해 시간, 장소, 마지막 결제, 피해 물품을 짧게 기록해야 하는 상황"],
    related: ["/lost-passport-card-response/", "/field-notes/", "/cities/rome/", "/guides/night-transport/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900",
    adAllowed: false
  },
  {
    slug: "guides/night-transport",
    title: "해외여행 야간 이동 주의 기준 - 트립마킹",
    h1: "밤 이동 전에 카드·여권·휴대폰을 먼저 맞추는 법",
    description: "해외여행 중 야간 귀가, 호출앱, 술자리 후 이동, 큰 역 환승에서 소지품과 목적지를 다시 확인하는 여행 안전 가이드.",
    intent: "해외여행 야간 이동 주의, 밤길 여행 안전, 호출앱 카드 여권 확인",
    city: "해외여행",
    signal: "야간 이동",
    emoji: "🌙",
    mapHref: "/?risk=night&utm_source=guide-topic&utm_medium=internal&utm_campaign=night-transport",
    scenarios: ["술자리나 공연 후 숙소 주소, 호출앱, 결제 수단을 동시에 확인해야 하는 상황", "큰 역에서 막차나 야간 버스 시간 때문에 캐리어와 휴대폰이 분산되는 상황", "배터리와 데이터가 부족해 동행자와 위치 공유, 카드, 여권 확인을 짧게 끝내야 하는 상황"],
    related: ["/field-notes/", "/guides/passport-loss/", "/london-phone-snatching-guide/", "/cities/paris/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900"
  },
  {
    slug: "spots/barcelona/la-rambla",
    title: "바르셀로나 람블라스 거리 주의 맥락 - 트립마킹",
    h1: "람블라스 거리에서 사진·시장·길찾기가 겹칠 때",
    description: "바르셀로나 람블라스 거리와 보케리아 시장 주변에서 사진, 길찾기, 결제, 야외 좌석 중 소지품 노출을 줄이는 장소별 가이드.",
    intent: "람블라스 거리 소매치기, 보케리아 시장 소매치기, 바르셀로나 구시가지 주의",
    city: "바르셀로나 람블라스",
    signal: "장소별 주의 맥락",
    emoji: "📍",
    mapHref: "/?city=barcelona&risk=pickpocket&spot=barcelona-ramblas&utm_source=spot-page&utm_medium=internal&utm_campaign=la-rambla",
    scenarios: ["사진을 보거나 길을 찾는 동안 가방 지퍼와 뒷주머니가 시야 밖으로 가는 순간", "보케리아 시장 근처에서 간식, 결제 카드, 휴대폰, 작은 봉투를 동시에 다루는 순간", "야외 좌석이나 테이블 주변에서 휴대폰을 내려놓고 동행자와 다음 동선을 이야기하는 순간"],
    related: ["/barcelona/la-rambla-pickpocket/", "/barcelona-pickpocket-guide/", "/guides/pickpocket/", "/cities/"],
    lastmod: "2026-07-03",
    buildDate: "Fri, 03 Jul 2026 11:10:00 +0900"
  },
  {
    slug: "london-phone-snatching-guide",
    title: "런던 휴대폰 날치기 주의 가이드 - 트립마킹",
    h1: "런던에서 휴대폰을 꺼내는 순간을 더 안전하게 만드는 법",
    description: "런던 도심, 역 주변, 횡단보도와 카페 좌석에서 휴대폰 날치기와 분실 위험을 줄이는 체크 가이드.",
    intent: "런던 휴대폰 날치기, 런던 소매치기, 런던 여행 휴대폰 주의",
    city: "런던",
    signal: "휴대폰 날치기",
    emoji: "📱",
    mapHref: "/?risk=phone&city=london&utm_source=seo-keyword&utm_medium=internal&utm_campaign=london-phone",
    scenarios: ["길찾기 때문에 횡단보도 앞에서 휴대폰을 오래 들고 있는 순간", "카페 테라스 테이블 위에 휴대폰을 내려놓는 순간", "역 앞에서 차량, 자전거, 사람 흐름이 동시에 지나가는 순간"],
    related: ["/guide/", "/field-notes/", "/lost-passport-card-response/"]
  },
  {
    slug: "bangkok-tourist-scam-guide",
    title: "방콕 여행 스캠 주의 가이드 - 트립마킹",
    h1: "방콕에서 친절한 제안과 실제 필요를 구분하는 기준",
    description: "방콕 왕궁 주변, 툭툭 제안, 쇼핑 유도, 환전·결제 상황에서 여행자가 확인할 스캠 예방 기준.",
    intent: "방콕 스캠, 방콕 툭툭 사기, 방콕 여행 주의",
    city: "방콕",
    signal: "관광지 스캠",
    emoji: "🎭",
    mapHref: "/?risk=scam&city=bangkok&utm_source=seo-keyword&utm_medium=internal&utm_campaign=bangkok-scam",
    scenarios: ["관광지 앞에서 오늘 닫혔다고 말하며 다른 장소를 권하는 상황", "툭툭이나 투어 제안이 지나치게 저렴하게 느껴지는 상황", "결제 전에 가격, 시간, 목적지가 명확하지 않은 상황"],
    related: ["/guide/", "/cities/", "/field-notes/"]
  },
  {
    slug: "ho-chi-minh-phone-snatching-guide",
    title: "호치민 휴대폰 날치기 주의 가이드 - 트립마킹",
    h1: "호치민에서 길찾기와 사진 촬영을 할 때 휴대폰을 지키는 법",
    description: "호치민 오토바이 흐름, 횡단보도, 카페 앞, 야간 이동 중 휴대폰 날치기 위험을 줄이는 가이드.",
    intent: "호치민 휴대폰 날치기, 베트남 소매치기, 호치민 여행 주의",
    city: "호치민",
    signal: "휴대폰 날치기",
    emoji: "📱",
    mapHref: "/?risk=phone&city=hochiminh&utm_source=seo-keyword&utm_medium=internal&utm_campaign=hochiminh-phone",
    scenarios: ["오토바이가 가까운 도로변에서 휴대폰으로 길을 보는 순간", "카페 앞에서 호출 차량 위치를 확인하는 순간", "야간에 손과 시선이 갈라지는 순간"],
    related: ["/guide/", "/field-notes/", "/travel-pickpocket-prevention/"]
  },
  {
    slug: "tokyo-travel-scam-guide",
    title: "도쿄 여행 스캠·호객 주의 가이드 - 트립마킹",
    h1: "도쿄 밤거리와 관광지에서 제안을 조심스럽게 확인하는 법",
    description: "도쿄 관광지와 번화가에서 과한 호객, 결제 전 설명 부족, 낯선 제안을 확인하는 트립마킹 여행 가이드.",
    intent: "도쿄 스캠, 도쿄 호객 주의, 일본 여행 사기 주의",
    city: "도쿄",
    signal: "호객·스캠",
    emoji: "🎭",
    mapHref: "/?risk=scam&city=tokyo&utm_source=seo-keyword&utm_medium=internal&utm_campaign=tokyo-scam",
    scenarios: ["번화가에서 가격과 조건이 명확하지 않은 제안을 받는 상황", "사진, 티켓, 투어처럼 현장 결정을 유도받는 상황", "일본어 설명이 빨라 결제 전 확인이 어려운 상황"],
    related: ["/guide/", "/cities/", "/field-notes/"]
  },
  {
    slug: "new-york-bag-theft-guide",
    title: "뉴욕 가방 도난·분실 주의 가이드 - 트립마킹",
    h1: "뉴욕에서 가방을 몸에서 떼는 순간을 줄이는 기준",
    description: "뉴욕 지하철, 카페, 관광지, 야간 이동 중 가방 도난과 분실 위험을 줄이는 여행자 확인 가이드.",
    intent: "뉴욕 가방 도난, 뉴욕 소매치기, 뉴욕 여행 주의",
    city: "뉴욕",
    signal: "가방 도난",
    emoji: "🎒",
    mapHref: "/?risk=bag&city=newyork&utm_source=seo-keyword&utm_medium=internal&utm_campaign=newyork-bag",
    scenarios: ["카페나 푸드홀에서 가방을 의자 뒤에 거는 순간", "지하철 승강장에서 캐리어와 휴대폰을 동시에 보는 순간", "야간 이동 중 숙소 주소와 결제 앱을 번갈아 확인하는 순간"],
    related: ["/guide/", "/cities/", "/lost-passport-card-response/"]
  },
  {
    slug: "istanbul-tourist-scam-guide",
    title: "이스탄불 여행 스캠 주의 가이드 - 트립마킹",
    h1: "이스탄불에서 낯선 제안을 안전하게 끊는 행동 기준",
    description: "이스탄불 관광지, 환전, 택시, 친근한 접근 제안에서 여행자가 확인할 스캠 예방 기준.",
    intent: "이스탄불 스캠, 이스탄불 여행 주의, 터키 여행 사기",
    city: "이스탄불",
    signal: "관광지 스캠",
    emoji: "🎭",
    mapHref: "/?risk=scam&city=istanbul&utm_source=seo-keyword&utm_medium=internal&utm_campaign=istanbul-scam",
    scenarios: ["관광지 앞에서 다른 가게나 장소를 권유받는 상황", "택시나 이동 수단 가격이 명확히 합의되지 않은 상황", "친근한 대화가 결제나 구매 제안으로 이어지는 상황"],
    related: ["/guide/", "/field-notes/", "/cities/"]
  },
  {
    slug: "amsterdam-bike-area-pickpocket-guide",
    title: "암스테르담 자전거 동선·소매치기 주의 가이드 - 트립마킹",
    h1: "암스테르담에서 자전거 흐름과 소지품을 동시에 보는 법",
    description: "암스테르담 역 주변, 운하, 자전거 동선, 관광지에서 소매치기와 소지품 분실을 줄이는 여행 안전 가이드.",
    intent: "암스테르담 소매치기, 암스테르담 자전거 주의, 네덜란드 여행 주의",
    city: "암스테르담",
    signal: "소매치기",
    emoji: "🚲",
    mapHref: "/?risk=pickpocket&city=amsterdam&utm_source=seo-keyword&utm_medium=internal&utm_campaign=amsterdam-bike",
    scenarios: ["중앙역 주변에서 자전거, 트램, 보행자 흐름을 동시에 보는 상황", "운하 사진을 찍느라 가방 지퍼가 뒤로 가는 순간", "카페와 상점 앞에서 휴대폰과 지갑을 따로 내려놓는 순간"],
    related: ["/guide/", "/cities/", "/travel-pickpocket-prevention/"]
  },
  {
    slug: "travel-pickpocket-prevention",
    title: "해외여행 소매치기 예방 체크리스트 - 트립마킹",
    h1: "도시가 달라도 반복되는 소매치기 순간을 줄이는 체크리스트",
    description: "해외여행 중 지하철, 관광지, 카페, 야간 이동에서 소매치기 가능성을 줄이는 실전 행동 기준.",
    intent: "해외여행 소매치기 예방, 여행 소지품 관리, 여행 지갑 휴대폰 보관",
    city: "해외여행",
    signal: "소매치기 예방",
    emoji: "✅",
    mapHref: "/?risk=pickpocket&utm_source=seo-keyword&utm_medium=internal&utm_campaign=prevention",
    scenarios: ["사진을 찍느라 한 손과 시선이 고정되는 순간", "지하철 승하차 직전에 몸이 밀리는 순간", "카페 테이블 위에 휴대폰과 지갑을 잠깐 놓는 순간"],
    related: ["/guide/", "/field-notes/", "/cities/"]
  },
  {
    slug: "lost-passport-card-response",
    title: "여행 중 여권·카드 분실 직후 행동 순서 - 트립마킹",
    h1: "여권이나 카드가 사라졌을 때 먼저 할 일을 줄여놓는 법",
    description: "해외여행 중 여권, 카드, 휴대폰을 잃어버렸을 때 당황을 줄이는 첫 행동 순서와 확인 기준.",
    intent: "여권 분실 대처, 해외 카드 분실, 여행 도난 직후 행동",
    city: "해외여행",
    signal: "분실 대응",
    emoji: "🧾",
    mapHref: "/?risk=response&utm_source=seo-keyword&utm_medium=internal&utm_campaign=lost-response",
    scenarios: ["지갑이나 여권 파우치가 없다는 것을 숙소 밖에서 깨달은 순간", "결제 카드가 사라졌지만 마지막 장소가 불명확한 상황", "휴대폰까지 불안해 동행자와 연락을 먼저 정리해야 하는 상황"],
    related: ["/guide/", "/field-notes/", "/travel-pickpocket-prevention/"]
  },
  {
    slug: "europe-subway-pickpocket",
    title: "유럽 지하철 소매치기 주의 가이드 - 트립마킹",
    h1: "유럽 지하철에서 몸이 가까워지는 순간을 미리 줄이는 법",
    description: "유럽 도시 지하철 승하차, 환승, 개찰구, 에스컬레이터에서 여행자가 확인할 소매치기 예방 기준.",
    intent: "유럽 지하철 소매치기, 해외 지하철 소매치기, 유럽 여행 지하철 주의",
    city: "유럽",
    signal: "지하철 소매치기",
    emoji: "🚇",
    mapHref: "/?risk=metro&utm_source=seo-keyword&utm_medium=internal&utm_campaign=europe-metro",
    scenarios: ["개찰구 앞에서 표, 휴대폰, 가방이 동시에 움직이는 순간", "에스컬레이터와 승강장에서 뒤쪽 가방이 시야 밖으로 나가는 순간", "승하차 직전 밀집도가 갑자기 올라가는 순간"],
    related: ["/guide/", "/field-notes/", "/barcelona-pickpocket-guide/"]
  }
];

const coreFeedItems = [
  ["트립마킹 여행 안전 지도", "/", "해외여행 도난·스캠 제보를 지도와 이모티콘 신호로 빠르게 확인하는 서비스."],
  ["해외여행 도난·스캠 예방 가이드", "/guide/", "지하철, 관광지, 카페, 야간 이동, 피해 직후 행동을 확인하는 기본 가이드."],
  ["트립마킹 현장 판단 기준", "/field-notes/", "손, 시선, 피로, 접근 제안, 첫 대응 루틴으로 여행 위험을 읽는 방식."],
  ["표현·검수·제보 정책", "/editorial-policy/", "여행 안전 정보를 특정 집단 낙인 없이 다루기 위한 표현, 제보, 광고 제외 기준."]
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageUrl(page) {
  return `${siteUrl}/${page.slug}/`;
}

function relatedTitle(href) {
  const titles = {
    "/": "트립마킹 지도 열기",
    "/guide/": "해외여행 도난·스캠 예방 가이드",
    "/field-notes/": "현장 판단 기준",
    "/editorial-policy/": "표현·검수·제보 정책",
    "/cities/": "도시별 위험 맥락",
    "/barcelona-pickpocket-guide/": "바르셀로나 소매치기 주의 가이드",
    "/travel-pickpocket-prevention/": "해외여행 소매치기 예방 체크리스트",
    "/lost-passport-card-response/": "여권·카드 분실 직후 행동 순서",
    "/europe-subway-pickpocket/": "유럽 지하철 소매치기 주의",
    "/paris-pickpocket-guide/": "파리 소매치기 주의 가이드",
    "/rome-pickpocket-guide/": "로마 소매치기 주의 가이드",
    "/london-phone-snatching-guide/": "런던 휴대폰 날치기 주의 가이드",
    "/cities/paris/": "파리 여행 안전 맥락 가이드",
    "/cities/rome/": "로마 여행 안전 맥락 가이드",
    "/guides/pickpocket/": "해외여행 소매치기 예방 핵심 가이드",
    "/guides/passport-loss/": "여권·카드 분실 직후 대응 가이드",
    "/guides/night-transport/": "야간 이동 주의 기준",
    "/spots/barcelona/la-rambla/": "바르셀로나 람블라스 거리 주의 맥락",
    "/barcelona/la-rambla-pickpocket/": "람블라스 거리 소매치기 대처"
  };
  return titles[href] || href;
}

function renderPage(page) {
  const url = pageUrl(page);
  const pageLastmod = page.lastmod || lastmod;
  const adMeta = page.adAllowed === false
    ? `<meta name="google-adsense-account" content="ca-pub-7217591196020054">`
    : `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7217591196020054" crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-7217591196020054">`;
  const scenarios = page.scenarios.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  const related = page.related.map((href) => `<li><a href="${href}">${escapeHtml(relatedTitle(href))}</a></li>`).join("\n");
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title.replace(" - 트립마킹", ""),
    description: page.description,
    inLanguage: "ko-KR",
    datePublished: page.datePublished || pageLastmod,
    dateModified: pageLastmod,
    author: { "@type": "Organization", name: "트립마킹 편집부" },
    publisher: { "@type": "Organization", name: "트립마킹", url: siteUrl },
    mainEntityOfPage: url,
    about: [page.city, page.signal, "해외여행 안전"]
  };

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="트립마킹">
    <meta property="og:title" content="${escapeHtml(page.title.replace(" - 트립마킹", ""))}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${url}">
    ${adMeta}
    <link rel="alternate" type="application/rss+xml" title="트립마킹 RSS" href="${siteUrl}/feed.xml">
    <link rel="stylesheet" href="/assets/styles.css?v=20260509-seo1">
    <script type="application/ld+json">${JSON.stringify(articleLd)}</script>
  </head>
  <body>
    <main class="static-shell">
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)} 이 페이지는 공포를 키우는 글이 아니라, 여행자가 현장에서 손과 시선을 어디에 둬야 하는지 바로 떠올리도록 만든 검색 진입 문서입니다.</p>

      <div class="keyword-map">
        <strong>${page.emoji} 이 페이지의 검색 구조</strong>
        <ul>
          <li>세부키워드: ${escapeHtml(page.intent)}</li>
          <li>핵심 주제: ${escapeHtml(page.city)} ${escapeHtml(page.signal)} 주의</li>
          <li>상위 연결: <a href="/guide/">해외여행 도난·스캠 예방 가이드</a></li>
        </ul>
      </div>

      <figure class="static-shot">
        <img src="/assets/screenshots/tripmarking-marker-legend.png" alt="트립마킹 지도에서 위험 마커 의미를 확인하는 화면">
        <figcaption>트립마킹은 위험을 긴 문장으로만 설명하지 않고, 지도 위 이모티콘 신호로 먼저 보여줍니다. 현장에서는 이 방식이 가장 빨리 판단됩니다.</figcaption>
      </figure>

      <h2>먼저 나눠볼 상황</h2>
      <p>${escapeHtml(page.city)}에서 ${escapeHtml(page.signal)} 신호를 본다는 말만으로는 막연합니다. 실제로 도움이 되는 것은 특정 사람을 의심하는 태도가 아니라, 여행자가 손과 시선을 놓치기 쉬운 장면을 미리 나누는 일입니다. 그래서 트립마킹은 도시 전체를 위험하다고 말하지 않고, 승하차, 사진 촬영, 결제, 길찾기, 접근 제안처럼 반복되는 순간을 중심으로 정리합니다.</p>
      <ul>
        ${scenarios}
      </ul>

      <h2>트립마킹에서 확인하는 순서</h2>
      <ol class="use-steps">
        <li><strong>도시와 위험 유형을 먼저 좁힙니다.</strong> 검색 화면에서 ${escapeHtml(page.city)} · ${escapeHtml(page.signal)} 관련 마커를 먼저 봅니다.</li>
        <li><strong>지도 마커를 누릅니다.</strong> 장소명, 한 줄 주의, 지금 할 일을 먼저 확인합니다.</li>
        <li><strong>상세 설명은 이동 전후에 읽습니다.</strong> 현장에서는 요약이 먼저이고, 숙소나 카페에서 자세한 글을 보는 편이 덜 피곤합니다.</li>
        <li><strong>동행자에게 공유합니다.</strong> 같은 장소를 지나가기 전에 한 줄 요약을 공유하면 불필요한 설명 없이 행동이 맞춰집니다.</li>
      </ol>

      <figure class="static-shot">
        <img src="/assets/screenshots/tripmarking-spot-summary.png" alt="트립마킹에서 위험 장소 요약을 확인하는 화면">
        <figcaption>상세 글보다 먼저 뜨는 요약은 길 위에서 바로 쓰는 정보입니다. 오래 읽지 않아도 “휴대폰을 안쪽 손으로 들기”, “가방을 앞으로 돌리기” 같은 행동으로 이어지게 구성했습니다.</figcaption>
      </figure>

      <h2>현장에서 바로 쓰는 기준</h2>
      <p>첫째, 휴대폰과 지갑은 동시에 느슨해지기 쉽습니다. 길찾기를 보면서 결제 앱을 열거나, 사진을 찍은 뒤 지도를 다시 확인할 때 손의 위치가 자주 바뀝니다. 이때는 휴대폰을 도로 반대쪽 손에 들고, 지갑과 여권은 같은 주머니에 두지 않는 편이 좋습니다.</p>
      <p>둘째, 낯선 제안은 내용보다 속도를 봅니다. 너무 빨리 결정하게 만들거나, 가격과 목적지가 명확하지 않거나, 원래 가려던 동선을 바꾸게 만들면 일단 멈추는 것이 낫습니다. 친절 자체를 의심하라는 뜻이 아니라, 결제와 이동이 엮이는 순간을 분리하자는 뜻입니다.</p>
      <p>셋째, 피해가 의심되면 멀리 쫓아가기보다 계정과 결제를 먼저 잠급니다. 카드 정지, 휴대폰 위치 확인, 여권 분실 신고, 숙소와 동행자 연락처럼 복구에 직접 연결되는 행동이 우선입니다. 트립마킹은 이런 첫 대응을 별도 문서로 연결해 두었습니다.</p>

      <div class="editor-note">
        <strong>편집자 사용 노트</strong>
        <p>이 글은 특정 국가, 도시, 사람을 낙인찍기 위한 글이 아닙니다. 여행자가 검색으로 들어왔을 때 불안을 키우지 않고, 실제로 다음 행동을 고를 수 있도록 정리했습니다. 트립마킹의 목표는 겁을 주는 것이 아니라, 길 위에서 놓치기 쉬운 10초를 줄이는 것입니다.</p>
      </div>

      <h2>같이 보면 좋은 글</h2>
      <div class="cluster-links">
        <ul>
          ${related}
        </ul>
      </div>

      <p><a href="${page.mapHref}">트립마킹 지도에서 ${escapeHtml(page.city)} ${escapeHtml(page.signal)} 보기</a> · <a href="/cities/">도시별 주의 맥락</a> · <a href="/field-notes/">현장 판단 기준</a> · <a href="/editorial-policy/">표현·검수 기준</a></p>
    </main>
  </body>
</html>
`;
}

function upsertSitemap() {
  const sitemapPath = path.join(siteRoot, "sitemap.xml");
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const generatedLocs = new Set(pages.map(pageUrl));
  const existingBlocks = [...xml.matchAll(/\s*<url>[\s\S]*?<\/url>/g)]
    .map((match) => match[0].trim())
    .filter((block) => {
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
      return loc && !generatedLocs.has(loc);
    });
  const generatedBlocks = pages.map((page) => `  <url><loc>${pageUrl(page)}</loc><lastmod>${page.lastmod || lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  const next = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${existingBlocks.map((block) => `  ${block}`).join("\n")}\n${generatedBlocks.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, next);
}

function renderFeedItem(title, href, description, date = buildDate) {
  const link = href.startsWith("http") ? href : `${siteUrl}${href}`;
  return `    <item>
      <title>${escapeHtml(title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${date}</pubDate>
      <description>${escapeHtml(description)}</description>
    </item>`;
}

function writeFeed() {
  const items = [
    ...pages.map((page) => renderFeedItem(page.title.replace(" - 트립마킹", ""), `/${page.slug}/`, page.description, page.buildDate || buildDate)),
    ...coreFeedItems.map(([title, href, description]) => renderFeedItem(title, href, description, "Sat, 09 May 2026 00:00:00 +0900"))
  ].join("\n");
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>트립마킹</title>
    <link>${siteUrl}/</link>
    <description>한국인 여행자를 위한 해외여행 도난·스캠 주의 지도.</description>
    <language>ko-KR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(siteRoot, "feed.xml"), feed);
}

for (const page of pages) {
  const dir = path.join(siteRoot, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(page));
}

upsertSitemap();
writeFeed();

console.log(`Generated ${pages.length} Tripmarking keyword pages.`);
