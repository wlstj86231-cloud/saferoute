import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");
const siteUrl = "https://tripmarking.com";
const lastmod = "2026-07-03";
const buildDate = "Fri, 03 Jul 2026 14:30:00 +0900";
const assetVersion = "20260703-tripcity1";

const relatedTitles = new Map([
  ["/", "트립마킹 지도 열기"],
  ["/guide/", "해외여행 도난·스캠 예방 가이드"],
  ["/guides/", "여행 상황별 판단 가이드"],
  ["/field-notes/", "트립마킹 현장 판단 기준"],
  ["/cities/", "도시별 해외여행 주의 맥락"],
  ["/cities/barcelona/", "바르셀로나 여행 안전 맥락 가이드"],
  ["/cities/paris/", "파리 여행 안전 맥락 가이드"],
  ["/cities/rome/", "로마 여행 안전 맥락 가이드"],
  ["/cities/london/", "런던 여행 안전 맥락 가이드"],
  ["/cities/amsterdam/", "암스테르담 여행 안전 맥락 가이드"],
  ["/cities/istanbul/", "이스탄불 여행 안전 맥락 가이드"],
  ["/cities/bangkok/", "방콕 여행 안전 맥락 가이드"],
  ["/cities/tokyo/", "도쿄 여행 안전 맥락 가이드"],
  ["/cities/new-york/", "뉴욕 여행 안전 맥락 가이드"],
  ["/cities/lisbon/", "리스본 여행 안전 맥락 가이드"],
  ["/guides/pickpocket/", "해외여행 소매치기 예방 핵심 가이드"],
  ["/guides/passport-loss/", "여권·카드 분실 직후 대응 가이드"],
  ["/guides/night-transport/", "야간 이동 주의 기준"],
  ["/guides/airport-arrival/", "공항 도착 직후 소지품 점검 가이드"],
  ["/guides/metro-transfer/", "지하철 환승 중 소지품 점검 가이드"],
  ["/guides/crowded-square/", "붐비는 광장·사진 명소 판단 가이드"],
  ["/guides/atm-withdrawal/", "해외 ATM 출금 전후 확인 가이드"],
  ["/guides/taxi-app-check/", "해외 택시·호출앱 확인 가이드"],
  ["/guides/beach-bag-safety/", "해변·테라스 가방 관리 가이드"],
  ["/spots/barcelona/la-rambla/", "람블라스 거리 장소별 주의 맥락"],
  ["/barcelona-pickpocket-guide/", "바르셀로나 소매치기 주의 가이드"],
  ["/barcelona/la-rambla-pickpocket/", "람블라스 거리 소매치기 주의"],
  ["/barcelona/catalunya-metro-pickpocket/", "카탈루냐 광장 환승 주의"],
  ["/barcelona/sagrada-familia-scam/", "사그라다 파밀리아 사진 대기 구역 주의"],
  ["/barcelona/barceloneta-beach-bag-theft/", "바르셀로네타 해변·테라스 가방 주의"],
  ["/london-phone-snatching-guide/", "런던 휴대폰 날치기 주의 가이드"],
  ["/amsterdam-bike-area-pickpocket-guide/", "암스테르담 자전거 동선·소매치기 주의"],
  ["/istanbul-tourist-scam-guide/", "이스탄불 여행 스캠 주의 가이드"],
  ["/bangkok-tourist-scam-guide/", "방콕 여행 스캠 주의 가이드"],
  ["/tokyo-travel-scam-guide/", "도쿄 여행 스캠·호객 주의 가이드"],
  ["/new-york-bag-theft-guide/", "뉴욕 가방 도난·분실 주의 가이드"],
  ["/travel-pickpocket-prevention/", "해외여행 소매치기 예방 체크리스트"],
  ["/europe-subway-pickpocket/", "유럽 지하철 소매치기 주의 가이드"],
  ["/lost-passport-card-response/", "여권·카드 분실 직후 행동 순서"],
  ["/editorial-policy/", "표현·검수·제보 정책"]
]);

const cityPages = [
  {
    slug: "cities/barcelona",
    title: "바르셀로나 여행 안전 맥락 가이드 - 트립마킹",
    h1: "바르셀로나에서 사진, 지하철, 해변 동선을 나눠 보는 법",
    description: "바르셀로나 람블라스 거리, 카탈루냐 광장, 사그라다 파밀리아, 바르셀로네타 주변에서 소지품과 접근 제안을 차분히 확인하는 도시별 여행 안전 가이드.",
    city: "바르셀로나",
    mapHref: "/?city=barcelona&utm_source=city-guide&utm_medium=internal&utm_campaign=barcelona-context",
    intro: "바르셀로나는 관광지, 지하철, 해변, 야외 좌석이 짧은 동선 안에서 이어지는 도시입니다. 이 페이지는 도시 전체를 위험하다고 말하지 않고, 여행자가 어떤 장면에서 손과 시선이 분리되는지 확인하도록 돕습니다.",
    principle: "핵심은 사진을 찍는 시간과 이동 준비 시간을 섞지 않는 것입니다. 람블라스 거리에서는 길찾기와 사진이 겹치고, 카탈루냐 광장에서는 환승과 만남이 겹치며, 해변에서는 가방을 몸에서 떼어놓기 쉽습니다.",
    movement: "동선을 짤 때는 관광지 하나를 본 뒤 바로 다음 장소로 뛰어가기보다, 지갑과 휴대폰을 정리하는 짧은 멈춤을 넣는 편이 좋습니다.",
    situations: [
      "람블라스 거리에서 사진을 찍으며 가방 지퍼가 등 뒤로 돌아가는 순간",
      "카탈루냐 광장 지하철 환승 중 노선과 출구를 보느라 캐리어와 휴대폰이 분산되는 순간",
      "사그라다 파밀리아 주변에서 사진, 입장권, 길찾기를 동시에 확인하는 순간",
      "바르셀로네타 해변이나 테라스 좌석에서 가방을 의자 뒤나 바닥에 내려놓는 순간"
    ],
    checks: [
      "사진 전에는 휴대폰을 제외한 물건을 먼저 닫고 몸 안쪽으로 둔다.",
      "지하철 환승 전에는 출구와 노선을 먼저 본 뒤 움직인다.",
      "야외 좌석에서는 휴대폰을 테이블 위에 오래 두지 않는다.",
      "해변에서는 한 명이 물건을 보고, 모두가 동시에 자리를 비우지 않는다."
    ],
    response: "분실이 의심되면 이동을 멈추고 마지막으로 물건을 본 위치, 결제 시각, 이동 경로를 먼저 적습니다. 쫓아가기보다 카드 정지, 계정 잠금, 숙소와 동행자 연락이 우선입니다.",
    note: "바르셀로나 문서는 특정 사람이나 집단을 지목하지 않습니다. 여행자가 실제로 바꿀 수 있는 행동, 즉 가방 위치, 휴대폰 사용 시간, 결제 후 정리 순서를 기준으로 설명합니다.",
    related: ["/spots/barcelona/la-rambla/", "/barcelona-pickpocket-guide/", "/barcelona/catalunya-metro-pickpocket/", "/guides/metro-transfer/", "/guides/beach-bag-safety/", "/cities/"]
  },
  {
    slug: "cities/london",
    title: "런던 여행 안전 맥락 가이드 - 트립마킹",
    h1: "런던에서 휴대폰 길찾기와 큰 역 환승을 분리해서 보는 법",
    description: "런던 큰 역, 횡단보도, 펍·카페 좌석, 야간 이동에서 휴대폰과 가방 관리 기준을 정리한 도시별 여행 안전 가이드.",
    city: "런던",
    mapHref: "/?city=london&utm_source=city-guide&utm_medium=internal&utm_campaign=london-context",
    intro: "런던 여행자는 길찾기, 교통 결제, 메시지를 휴대폰 하나로 처리하는 경우가 많습니다. 그래서 위험한 도시라는 단정이 아니라, 휴대폰이 손에 오래 노출되는 장면을 줄이는 방식으로 보는 것이 실용적입니다.",
    principle: "큰 역과 번화가에서는 목적지를 정한 뒤 걷고, 걷는 중에는 휴대폰을 도로 쪽 손에 오래 들지 않는 것이 기본입니다.",
    movement: "펍이나 카페에서는 휴대폰을 테이블 위에 올려두는 시간이 길어집니다. 결제와 길찾기를 마친 뒤에는 안쪽 주머니로 바로 정리하는 습관이 필요합니다.",
    situations: [
      "킹스크로스, 빅토리아, 워털루처럼 출구와 플랫폼이 많은 역에서 휴대폰과 캐리어를 동시에 보는 순간",
      "횡단보도 앞에서 지도 앱을 확대하며 도로 쪽 손에 휴대폰을 오래 들고 있는 순간",
      "펍이나 카페 테이블 위에 휴대폰과 지갑을 함께 올려두는 순간",
      "야간 이동 후 호출앱 차량 번호와 목적지를 급하게 확인하는 순간"
    ],
    checks: [
      "출구와 플랫폼은 벽 쪽이나 실내에서 먼저 확인한다.",
      "길 위에서는 휴대폰을 안쪽 손으로 짧게 확인한다.",
      "펍과 카페에서는 테이블 위 물건을 주문·결제 직후 정리한다.",
      "야간 귀가 전에는 호출앱 목적지, 결제 수단, 배터리를 먼저 확인한다."
    ],
    response: "휴대폰을 잃어버렸다면 카드 앱과 계정 접근을 먼저 막습니다. 숙소 주소와 동행자 연락 수단을 별도로 남겨두면 기기 분실 후에도 이동이 덜 흔들립니다.",
    note: "런던 문서는 휴대폰 날치기를 자극적으로 묘사하지 않고, 휴대폰 사용 장면을 어떻게 줄일지에 초점을 둡니다.",
    related: ["/london-phone-snatching-guide/", "/guides/taxi-app-check/", "/guides/night-transport/", "/guides/crowded-square/", "/cities/", "/field-notes/"]
  },
  {
    slug: "cities/amsterdam",
    title: "암스테르담 여행 안전 맥락 가이드 - 트립마킹",
    h1: "암스테르담에서 자전거 동선, 역, 운하 주변을 함께 보는 법",
    description: "암스테르담 중앙역, 운하 주변, 자전거 동선, 야간 번화가에서 소지품과 이동 판단을 정리한 도시별 여행 안전 가이드.",
    city: "암스테르담",
    mapHref: "/?city=amsterdam&utm_source=city-guide&utm_medium=internal&utm_campaign=amsterdam-context",
    intro: "암스테르담은 이동이 편한 만큼 걷기, 자전거 흐름, 사진 촬영이 자주 겹칩니다. 도시를 불안하게 볼 필요는 없지만, 길찾기와 소지품 관리가 동시에 느슨해지는 장면은 따로 봐야 합니다.",
    principle: "자전거 동선에 신경 쓰느라 가방 지퍼와 휴대폰 위치를 놓치지 않는 것이 중요합니다. 특히 역 주변과 운하 다리 위에서는 사진과 이동이 겹치기 쉽습니다.",
    movement: "밤에는 숙소 방향과 대중교통 막차를 먼저 정하고, 술자리 후에는 카드와 휴대폰을 한 번에 확인하는 짧은 루틴을 둡니다.",
    situations: [
      "중앙역 앞에서 트램, 자전거, 보행자 흐름을 동시에 보며 캐리어를 끄는 순간",
      "운하 다리에서 사진을 찍다가 휴대폰과 가방 위치가 분리되는 순간",
      "카페 야외 좌석에서 지갑과 휴대폰을 테이블에 오래 두는 순간",
      "야간 번화가에서 숙소 방향과 교통편을 급하게 다시 찾는 순간"
    ],
    checks: [
      "사진 전에는 자전거 동선 밖으로 완전히 이동한다.",
      "운하 주변에서는 휴대폰 스트랩보다 손과 가방 위치를 먼저 본다.",
      "역 앞에서는 목적지를 확인한 뒤 걸음을 시작한다.",
      "술자리 후에는 카드, 휴대폰, 숙소 주소를 동행자와 함께 확인한다."
    ],
    response: "소지품이 사라졌다고 느끼면 운하 주변이나 역 앞에서 오래 찾기보다 카드 정지와 계정 보호를 먼저 진행합니다. 현지 신고와 보험 기록을 위해 시간과 장소를 짧게 남기는 것이 좋습니다.",
    note: "암스테르담 문서는 자전거 문화를 위험으로 단정하지 않습니다. 여행자가 동선에 적응하는 동안 놓치기 쉬운 소지품 관리 기준을 분리해 보여줍니다.",
    related: ["/amsterdam-bike-area-pickpocket-guide/", "/guides/crowded-square/", "/guides/night-transport/", "/guides/metro-transfer/", "/cities/", "/guide/"]
  },
  {
    slug: "cities/istanbul",
    title: "이스탄불 여행 안전 맥락 가이드 - 트립마킹",
    h1: "이스탄불에서 관광지 접근 제안과 결제 전 확인을 나눠 보는 법",
    description: "이스탄불 관광지, 바자르, 택시·환전, 공항 이동 중 가격과 목적지를 확인하는 도시별 여행 안전 가이드.",
    city: "이스탄불",
    mapHref: "/?city=istanbul&utm_source=city-guide&utm_medium=internal&utm_campaign=istanbul-context",
    intro: "이스탄불은 관광지, 바자르, 교통 이동, 환전이 여행 동선 안에서 자연스럽게 이어집니다. 이 페이지는 친절한 제안 자체를 의심하라는 글이 아니라, 가격과 목적지가 흐려지는 장면을 줄이기 위한 기준입니다.",
    principle: "결제와 이동 제안은 친절함보다 조건의 명확성을 먼저 봅니다. 목적지, 가격, 결제 방식, 이동 수단이 분명하지 않으면 길게 대화하기보다 공식 창구를 다시 확인합니다.",
    movement: "공항이나 큰 역에서 숙소로 이동할 때는 피로가 크기 때문에 택시·호출앱·대중교통 선택을 현장에서 즉흥적으로 바꾸지 않는 편이 좋습니다.",
    situations: [
      "관광지 입구에서 오늘 닫혔다며 다른 장소를 권하는 말을 오래 듣는 순간",
      "바자르에서 결제 방식과 최종 가격이 명확하지 않은 상태로 대화가 길어지는 순간",
      "공항 도착 직후 숙소 이동 방법을 현장에서 급하게 바꾸는 순간",
      "환전이나 ATM 이용 후 지갑을 정리하지 않은 채 바로 이동하는 순간"
    ],
    checks: [
      "공식 입구, 공식 요금, 운영 시간을 먼저 확인한다.",
      "택시나 호출앱은 차량 번호와 목적지를 탑승 전 확인한다.",
      "가격이 모호하면 결제 전 짧게 멈추고 조건을 다시 묻는다.",
      "환전과 ATM 뒤에는 지갑과 카드를 몸 안쪽에 넣고 이동한다."
    ],
    response: "결제 문제가 생기면 감정적으로 다투기보다 영수증, 앱 기록, 위치, 시간을 남깁니다. 카드 결제라면 카드사 앱에서 해외 결제 내역과 차단 가능 여부를 먼저 확인합니다.",
    note: "이스탄불 문서는 도시나 사람을 낙인찍지 않습니다. 여행자가 낯선 언어와 피로 속에서 조건을 놓치지 않도록 확인 순서를 정리합니다.",
    related: ["/istanbul-tourist-scam-guide/", "/guides/airport-arrival/", "/guides/taxi-app-check/", "/guides/atm-withdrawal/", "/cities/", "/editorial-policy/"]
  },
  {
    slug: "cities/bangkok",
    title: "방콕 여행 안전 맥락 가이드 - 트립마킹",
    h1: "방콕에서 관광지 제안, 택시, 야시장 결제를 나눠 보는 법",
    description: "방콕 관광지, 툭툭·택시 제안, 야시장, ATM·환전 상황에서 여행자가 확인할 기준을 정리한 도시별 여행 안전 가이드.",
    city: "방콕",
    mapHref: "/?city=bangkok&utm_source=city-guide&utm_medium=internal&utm_campaign=bangkok-context",
    intro: "방콕은 이동 수단과 관광지 제안이 다양해서 여행자가 선택을 자주 해야 합니다. 중요한 것은 제안 자체를 무조건 거절하는 것이 아니라, 가격과 목적지, 결제 수단을 흐리지 않는 것입니다.",
    principle: "특히 도착 직후와 더운 시간대에는 판단이 빨리 피로해집니다. 목적지와 결제 조건이 명확하지 않으면 이동하기 전에 한 번 멈추는 것이 좋습니다.",
    movement: "야시장과 쇼핑 구간에서는 결제 후 지갑을 정리하는 시간이 가장 중요합니다. 여러 봉투와 휴대폰, 현금이 동시에 손에 있으면 잃어버리기 쉽습니다.",
    situations: [
      "관광지 앞에서 오늘 닫혔다거나 다른 코스를 권하는 말을 오래 듣는 순간",
      "툭툭이나 택시 제안에서 가격과 도착지가 명확하지 않은 순간",
      "야시장 결제 후 지갑, 휴대폰, 쇼핑 봉투가 한꺼번에 손에 있는 순간",
      "ATM 출금 직후 현금과 카드를 정리하지 않은 채 사람 흐름에 밀리는 순간"
    ],
    checks: [
      "공식 운영 시간과 입구를 지도나 공식 안내로 먼저 확인한다.",
      "택시·호출앱은 목적지와 결제 방식을 탑승 전 맞춘다.",
      "야시장에서는 결제 후 한쪽으로 빠져 지갑과 휴대폰을 정리한다.",
      "ATM은 밝고 실내에 가까운 곳을 고르고 출금 뒤 바로 이동하지 않는다."
    ],
    response: "문제가 생겼을 때는 마지막 결제 기록과 위치를 먼저 캡처합니다. 카드 결제라면 승인 내역을 확인하고, 현금이나 물건 분실은 이동 경로와 시간을 짧게 메모합니다.",
    note: "방콕 문서는 스캠을 자극적으로 다루지 않습니다. 여행자가 친절한 제안과 결제 조건을 분리해서 볼 수 있게 돕는 문서입니다.",
    related: ["/bangkok-tourist-scam-guide/", "/guides/taxi-app-check/", "/guides/atm-withdrawal/", "/guides/crowded-square/", "/cities/", "/field-notes/"]
  },
  {
    slug: "cities/tokyo",
    title: "도쿄 여행 안전 맥락 가이드 - 트립마킹",
    h1: "도쿄에서 큰 역 환승과 야간 번화가를 따로 점검하는 법",
    description: "도쿄 신주쿠, 시부야, 우에노 등 큰 역과 야간 번화가에서 소지품, 결제, 숙소 귀가를 확인하는 도시별 여행 안전 가이드.",
    city: "도쿄",
    mapHref: "/?city=tokyo&utm_source=city-guide&utm_medium=internal&utm_campaign=tokyo-context",
    intro: "도쿄는 비교적 질서가 잘 잡힌 도시로 느껴질 수 있지만, 큰 역 환승과 야간 번화가에서는 여행 피로가 빠르게 쌓입니다. 그래서 이 문서는 위험 단정보다 복잡한 출구, 결제, 귀가 루틴을 중심으로 봅니다.",
    principle: "신주쿠나 시부야처럼 출구가 많은 역에서는 길찾기를 하며 걷기보다, 출구와 플랫폼을 먼저 확인한 뒤 움직이는 편이 안전합니다.",
    movement: "야간에는 호객이나 결제 제안을 오래 듣는 상황보다, 숙소 방향과 교통편을 놓쳐 판단이 급해지는 상황이 더 자주 문제가 됩니다.",
    situations: [
      "큰 역에서 출구 번호와 노선을 보느라 휴대폰과 캐리어가 분산되는 순간",
      "야간 번화가에서 가격과 조건을 정확히 보지 못한 채 결정을 재촉받는 순간",
      "편의점이나 음식점 결제 후 카드와 휴대폰을 따로 들고 이동하는 순간",
      "막차나 숙소 방향을 다시 찾느라 동행자와 떨어지는 순간"
    ],
    checks: [
      "역에서는 출구 번호를 먼저 확인하고, 이동 중 검색을 줄인다.",
      "야간 번화가에서는 가격과 조건이 모호하면 짧게 멈추고 이동한다.",
      "결제 후 카드와 휴대폰을 한 곳에 오래 들고 있지 않는다.",
      "숙소 주소와 막차 대안을 여행 전 메모해 둔다."
    ],
    response: "분실이 생기면 역무원, 매장, 경찰 절차를 순서대로 확인합니다. 카드와 휴대폰 계정 보호는 먼저 진행하고, 찾는 절차는 이동 경로 기록과 함께 진행하는 것이 좋습니다.",
    note: "도쿄 문서는 낮은 체감 위험을 이유로 준비를 생략하지 않게 하는 문서입니다. 편안한 도시에서도 큰 역과 야간 피로는 별도로 관리해야 합니다.",
    related: ["/tokyo-travel-scam-guide/", "/guides/metro-transfer/", "/guides/night-transport/", "/guides/taxi-app-check/", "/cities/", "/guide/"]
  },
  {
    slug: "cities/new-york",
    title: "뉴욕 여행 안전 맥락 가이드 - 트립마킹",
    h1: "뉴욕에서 지하철, 광장, 야간 이동 중 소지품을 나눠 보는 법",
    description: "뉴욕 지하철, 타임스스퀘어, 카페, 야간 이동에서 휴대폰과 가방 위치를 확인하는 도시별 여행 안전 가이드.",
    city: "뉴욕",
    mapHref: "/?city=newyork&utm_source=city-guide&utm_medium=internal&utm_campaign=newyork-context",
    intro: "뉴욕은 이동 속도가 빠르고 길 위에서 휴대폰을 자주 확인하게 되는 도시입니다. 이 문서는 도시를 위험하게 단정하지 않고, 빠른 이동 속도 속에서 소지품 관리가 느슨해지는 순간을 줄입니다.",
    principle: "지하철과 광장에서는 사진, 결제, 길찾기를 한 번에 처리하지 않는 것이 좋습니다. 특히 가방을 내려놓거나 휴대폰을 도로 쪽 손에 오래 드는 습관을 줄입니다.",
    movement: "야간 이동에서는 숙소 방향, 호출앱, 지하철 대안을 먼저 정하고 움직입니다. 이동 중 결정을 계속 바꾸면 카드와 휴대폰 확인이 흩어집니다.",
    situations: [
      "타임스스퀘어처럼 시각 정보가 많은 곳에서 사진과 길찾기를 동시에 하는 순간",
      "지하철 플랫폼에서 열차 방향과 휴대폰, 캐리어를 함께 보는 순간",
      "카페나 푸드코트에서 가방을 의자 뒤나 옆자리에 두는 순간",
      "야간에 숙소 방향을 다시 찾으며 결제 앱과 지도 앱을 번갈아 여는 순간"
    ],
    checks: [
      "사진을 찍기 전 가방 끈과 지퍼를 먼저 확인한다.",
      "지하철에서는 벽 쪽에서 방향을 확인한 뒤 플랫폼으로 이동한다.",
      "카페에서는 가방을 몸과 의자 사이에 둔다.",
      "야간에는 이동 수단을 바꾸기 전에 결제 수단과 목적지를 다시 본다."
    ],
    response: "가방이나 휴대폰 분실이 의심되면 마지막으로 앉았던 좌석, 결제 시각, 이동 경로를 먼저 기록합니다. 카드 정지와 계정 잠금이 끝난 뒤 경찰 신고와 보험 기록을 진행하는 편이 덜 흔들립니다.",
    note: "뉴욕 문서는 빠른 도시 흐름 속에서 여행자가 스스로 조절할 수 있는 행동만 다룹니다. 특정 지역이나 사람을 일반화하지 않습니다.",
    related: ["/new-york-bag-theft-guide/", "/guides/crowded-square/", "/guides/metro-transfer/", "/guides/night-transport/", "/cities/", "/field-notes/"]
  },
  {
    slug: "cities/lisbon",
    title: "리스본 여행 안전 맥락 가이드 - 트립마킹",
    h1: "리스본에서 트램, 전망대, 언덕 동선을 차분히 보는 법",
    description: "리스본 트램, 전망대, 언덕길, 지하철과 관광지 주변에서 휴대폰과 가방 위치를 확인하는 도시별 여행 안전 가이드.",
    city: "리스본",
    mapHref: "/?city=lisbon&utm_source=city-guide&utm_medium=internal&utm_campaign=lisbon-context",
    intro: "리스본은 언덕길, 트램, 전망대, 좁은 골목이 여행 동선에 자주 들어옵니다. 이 문서는 도시 분위기를 불안하게 만들지 않고, 이동 중 사진과 소지품 관리가 겹치는 장면을 분리합니다.",
    principle: "전망대와 트램 정류장에서는 사진 욕구와 대기 시간이 겹칩니다. 이때 가방을 몸 뒤로 돌리거나 휴대폰을 난간 위에 오래 두지 않는 것이 기본입니다.",
    movement: "언덕길에서는 길찾기를 보며 걷기보다 멈춘 뒤 방향을 확인합니다. 짐이 많거나 비가 오는 날에는 이동 속도를 낮추는 것이 더 안전합니다.",
    situations: [
      "트램 대기줄에서 사진을 찍다가 가방 지퍼가 뒤로 돌아가는 순간",
      "전망대 난간 주변에서 휴대폰, 카메라, 가방을 동시에 관리하는 순간",
      "언덕길에서 지도 앱을 보며 걷다가 동행자와 거리가 벌어지는 순간",
      "ATM이나 결제 후 현금과 카드를 정리하지 않은 채 좁은 길로 이동하는 순간"
    ],
    checks: [
      "트램과 전망대에서는 사진 전 가방 위치를 먼저 본다.",
      "언덕길에서는 벽 쪽이나 넓은 곳에서 길을 확인한다.",
      "결제와 ATM 뒤에는 한쪽으로 빠져 지갑과 카드를 정리한다.",
      "비 오는 날에는 우산, 휴대폰, 가방이 동시에 손에 있지 않게 한다."
    ],
    response: "분실이 의심되면 좁은 골목에서 오래 찾기보다 밝은 장소로 이동해 카드와 계정을 먼저 보호합니다. 여행자 보험과 현지 신고를 위해 마지막 확인 위치를 간단히 기록합니다.",
    note: "리스본 문서는 트램이나 전망대를 위험하다고 말하지 않습니다. 여행자가 좋아하는 사진 장면 속에서 소지품이 몸에서 떨어지는 순간을 줄이는 데 집중합니다.",
    related: ["/guides/crowded-square/", "/guides/metro-transfer/", "/guides/atm-withdrawal/", "/guides/beach-bag-safety/", "/cities/", "/guide/"]
  }
];

const guidePages = [
  {
    slug: "guides/airport-arrival",
    title: "공항 도착 직후 소지품 점검 가이드 - 트립마킹",
    h1: "공항에 도착한 첫 30분 동안 지갑, 여권, 휴대폰을 나누어 보는 법",
    description: "해외 공항 도착 직후 유심, 환전, 택시, 숙소 이동을 시작하기 전에 여권, 카드, 휴대폰, 수하물을 점검하는 여행 안전 가이드.",
    city: "공항 도착",
    mapHref: "/?scenario=arrival&utm_source=guide-page&utm_medium=internal&utm_campaign=airport-arrival",
    intro: "공항 도착 직후에는 피로, 수하물, 유심, 환전, 숙소 이동이 한 번에 몰립니다. 이 페이지는 공항을 위험하게 묘사하기보다, 여행자가 판단을 잃기 쉬운 첫 30분을 정리합니다.",
    principle: "도착 직후에는 새 결정을 줄이는 것이 가장 중요합니다. 숙소 이동 수단, 결제 수단, 여권 위치를 먼저 고정하고 나머지 일을 진행합니다.",
    movement: "수하물을 찾은 뒤 바로 이동하지 말고, 사람이 적은 곳에서 여권, 카드, 휴대폰, 보조 배터리, 숙소 주소를 한 번에 확인합니다.",
    situations: [
      "유심이나 eSIM 설정 중 여권과 지갑을 카운터 위에 오래 두는 순간",
      "환전과 ATM 이용 후 현금, 카드, 영수증을 한꺼번에 들고 이동하는 순간",
      "택시나 호출앱을 급하게 고르며 목적지와 결제 수단을 동시에 확인하는 순간",
      "수하물, 백팩, 휴대폰, 여권이 각각 다른 손과 주머니에 흩어지는 순간"
    ],
    checks: [
      "여권과 카드 위치를 정한 뒤 유심·환전·이동을 시작한다.",
      "숙소 주소는 한국어와 현지어 또는 영어로 함께 저장한다.",
      "호출앱 차량 번호, 승차 위치, 목적지를 탑승 전 확인한다.",
      "공항에서 바로 꺼낼 현금과 보관할 현금을 분리한다."
    ],
    response: "공항에서 분실을 알아차리면 이동하기 전에 항공사 수하물 창구, 공항 안내, 카드사 앱을 순서대로 확인합니다. 특히 여권이 없으면 숙소 이동보다 공항과 영사 절차 확인이 먼저입니다.",
    note: "공항 도착 가이드는 긴장감을 키우기 위한 글이 아닙니다. 첫 이동을 시작하기 전에 확인 순서를 고정해 이후 여행 전체의 실수를 줄이기 위한 문서입니다.",
    related: ["/guides/taxi-app-check/", "/guides/atm-withdrawal/", "/guides/passport-loss/", "/guides/night-transport/", "/guide/", "/field-notes/"]
  },
  {
    slug: "guides/metro-transfer",
    title: "지하철 환승 중 소지품 점검 가이드 - 트립마킹",
    h1: "지하철 환승 때 노선 확인과 소지품 확인을 분리하는 법",
    description: "해외 지하철 환승, 승강장, 개찰구, 에스컬레이터에서 휴대폰, 지갑, 백팩, 캐리어를 관리하는 여행 안전 가이드.",
    city: "지하철 환승",
    mapHref: "/?scenario=transit&utm_source=guide-page&utm_medium=internal&utm_campaign=metro-transfer",
    intro: "지하철 환승은 여행자가 가장 자주 멈추고, 다시 걷고, 휴대폰을 여는 장면입니다. 이 페이지는 지하철 자체를 두려워하라는 뜻이 아니라, 노선 확인과 소지품 확인을 분리하는 방법을 설명합니다.",
    principle: "환승 중에는 출구, 플랫폼, 열차 방향을 먼저 정하고 이동합니다. 움직이는 중에 검색을 계속하면 캐리어, 백팩, 휴대폰이 서로 다른 방향으로 흩어집니다.",
    movement: "혼잡한 구간에서는 백팩을 앞으로 돌리고, 휴대폰은 벽 쪽이나 기둥 옆에서 짧게 확인합니다. 문 앞보다 벽 쪽이나 승강장 안쪽이 더 차분합니다.",
    situations: [
      "개찰구 앞에서 교통카드, 휴대폰, 지갑을 동시에 꺼내는 순간",
      "에스컬레이터에서 한 손은 캐리어, 한 손은 휴대폰을 들고 있는 순간",
      "출입문 앞에서 노선을 다시 보느라 가방이 등 뒤로 밀리는 순간",
      "환승 통로에서 동행자와 대화하며 방향을 바꾸는 순간"
    ],
    checks: [
      "개찰구에 들어가기 전 교통카드와 지갑을 분리한다.",
      "출구와 플랫폼은 멈춘 상태에서 먼저 확인한다.",
      "혼잡하면 백팩은 앞으로, 크로스백 지퍼는 몸 안쪽으로 둔다.",
      "열차 탑승 직전에는 휴대폰을 주머니나 가방 안쪽에 넣는다."
    ],
    response: "지하철에서 분실을 느끼면 바로 다음 역의 안전한 위치로 이동해 카드와 계정 보호를 진행합니다. 열차를 쫓기보다 노선, 역, 시간, 마지막 위치를 기록하는 편이 신고와 문의에 도움이 됩니다.",
    note: "지하철 환승 가이드는 도시별 사건 묘사가 아니라 보편적인 행동 기준입니다. 그래서 파리, 로마, 바르셀로나, 도쿄처럼 다른 도시 문서와 함께 읽을 수 있습니다.",
    related: ["/cities/barcelona/", "/cities/paris/", "/cities/tokyo/", "/europe-subway-pickpocket/", "/guides/pickpocket/", "/field-notes/"]
  },
  {
    slug: "guides/crowded-square",
    title: "붐비는 광장·사진 명소 판단 가이드 - 트립마킹",
    h1: "붐비는 광장에서 사진, 서명 제안, 길찾기를 분리해서 보는 법",
    description: "유명 광장, 사진 명소, 전망대, 관광지 대기줄에서 휴대폰과 가방 노출을 줄이는 여행 안전 가이드.",
    city: "붐비는 광장",
    mapHref: "/?scenario=photo&utm_source=guide-page&utm_medium=internal&utm_campaign=crowded-square",
    intro: "유명 광장과 사진 명소에서는 여행자가 가장 쉽게 시선을 빼앗깁니다. 이 페이지는 장소를 불안하게 보이게 하려는 글이 아니라, 사진과 대화와 길찾기가 동시에 일어나는 장면을 분리합니다.",
    principle: "사진을 찍기 전에는 물건을 먼저 정리하고, 사진을 찍은 뒤에는 길찾기를 시작합니다. 두 행동을 동시에 하면 휴대폰과 가방이 몸에서 떨어지기 쉽습니다.",
    movement: "서명, 기부, 팔찌, 즉석 투어처럼 대화가 길어지는 접근은 목적과 가격이 분명한지 먼저 봅니다. 모호하면 짧게 거절하고 밝고 사람이 많은 쪽으로 이동합니다.",
    situations: [
      "사진을 부탁하거나 찍어주겠다는 말에 휴대폰을 바로 넘기려는 순간",
      "서명이나 기부 제안을 들으며 가방 지퍼 확인을 놓치는 순간",
      "광장 한가운데서 지도 앱과 카메라 앱을 번갈아 여는 순간",
      "대기줄에서 입장권, 휴대폰, 지갑을 모두 손에 들고 있는 순간"
    ],
    checks: [
      "사진 전에는 가방과 지갑 위치를 먼저 고정한다.",
      "휴대폰을 넘기기 전에는 상대와 주변 상황을 짧게 본다.",
      "대화가 길어지면 가격, 목적, 공식 여부를 먼저 확인한다.",
      "대기줄에서는 필요한 물건 하나만 꺼내고 나머지는 닫아둔다."
    ],
    response: "사진 명소에서 물건을 잃어버렸다면 주변을 무리하게 따라가기보다 마지막 사진 시각과 위치를 기록합니다. 휴대폰 분실은 계정 잠금과 기기 찾기, 카드 분실은 카드 정지를 먼저 진행합니다.",
    note: "광장 가이드는 사람을 의심하라는 문서가 아닙니다. 여행자가 사진에 집중하는 동안 물건 관리가 끊기지 않게 하는 행동 문서입니다.",
    related: ["/spots/barcelona/la-rambla/", "/cities/new-york/", "/cities/lisbon/", "/guides/pickpocket/", "/travel-pickpocket-prevention/", "/editorial-policy/"]
  },
  {
    slug: "guides/atm-withdrawal",
    title: "해외 ATM 출금 전후 확인 가이드 - 트립마킹",
    h1: "해외 ATM에서 카드, 현금, 휴대폰을 한 번에 흩뜨리지 않는 법",
    description: "해외 ATM 출금, 환전, 카드 결제 후 현금과 카드를 정리하고 기록을 남기는 여행 안전 가이드.",
    city: "해외 ATM",
    mapHref: "/?scenario=atm&utm_source=guide-page&utm_medium=internal&utm_campaign=atm-withdrawal",
    intro: "해외 ATM과 환전은 돈이 오가는 순간이라 여행자가 긴장하기 쉽습니다. 이 페이지는 ATM 이용 자체를 불안하게 만들지 않고, 출금 전후의 짧은 정리 순서를 고정합니다.",
    principle: "ATM을 고를 때는 수수료보다 먼저 위치와 정리 공간을 봅니다. 밝고 실내에 가까운 곳, 뒤에 물러설 공간이 있는 곳이 좋습니다.",
    movement: "출금 후 바로 걷지 않고, 한쪽으로 비켜 카드, 현금, 영수증, 휴대폰을 정리합니다. 손에 들고 이동하는 물건이 많을수록 분실과 착오가 늘어납니다.",
    situations: [
      "출금 뒤 현금과 카드를 손에 든 채 다음 목적지를 검색하는 순간",
      "수수료 화면을 급하게 넘기며 카드와 휴대폰 위치를 동시에 놓치는 순간",
      "환전소나 ATM 주변에서 영수증과 지갑을 정리하지 않은 채 이동하는 순간",
      "야간이나 혼잡한 길에서 급하게 현금을 꺼내야 하는 순간"
    ],
    checks: [
      "ATM 전에는 카드 한 장과 필요한 현금 규모만 정한다.",
      "출금 뒤 카드가 돌아왔는지 먼저 확인한다.",
      "현금은 바로 나누어 보관하고, 큰 금액을 밖에서 세지 않는다.",
      "영수증과 앱 알림으로 결제·출금 기록을 짧게 확인한다."
    ],
    response: "카드가 사라졌거나 이상 결제가 보이면 카드사 앱에서 해외 사용을 먼저 중지합니다. ATM 위치, 시각, 승인 내역은 캡처해 두고, 필요하면 은행과 카드사에 바로 문의합니다.",
    note: "ATM 가이드는 금융 조언이 아니라 여행 중 소지품과 기록을 보호하기 위한 행동 기준입니다. 결제 문제는 카드사와 은행 안내가 우선입니다.",
    related: ["/guides/airport-arrival/", "/guides/taxi-app-check/", "/cities/bangkok/", "/cities/istanbul/", "/lost-passport-card-response/", "/guide/"]
  },
  {
    slug: "guides/taxi-app-check",
    title: "해외 택시·호출앱 확인 가이드 - 트립마킹",
    h1: "해외에서 택시와 호출앱을 탈 때 목적지, 차량, 결제를 맞추는 법",
    description: "해외 택시, 호출앱, 공항 이동, 야간 귀가 전 차량 번호, 목적지, 결제 수단을 확인하는 여행 안전 가이드.",
    city: "택시·호출앱",
    mapHref: "/?scenario=taxi&utm_source=guide-page&utm_medium=internal&utm_campaign=taxi-app-check",
    intro: "해외에서 택시나 호출앱을 탈 때는 빠르게 이동하려는 마음 때문에 확인 순서가 줄어듭니다. 이 문서는 택시를 위험하게 말하는 글이 아니라, 탑승 전 확인해야 할 정보를 짧게 고정하는 가이드입니다.",
    principle: "차량 번호, 목적지, 결제 수단, 동행자 공유를 탑승 전 확인합니다. 특히 공항과 야간에는 피로 때문에 제안을 길게 비교하기 어렵습니다.",
    movement: "택시를 타기 전에 목적지가 앱이나 지도에 맞게 들어갔는지 확인하고, 도착 후 결제 기록을 캡처하거나 알림을 확인합니다.",
    situations: [
      "공항에서 숙소 이동을 빨리 정하려다 차량과 목적지를 제대로 보지 않는 순간",
      "야간 귀가 중 호출앱 차량 번호와 실제 차량이 맞는지 확인하지 않는 순간",
      "현금 결제와 카드 결제 조건이 불명확한 상태로 탑승하는 순간",
      "동행자와 떨어진 채 숙소 주소와 결제 수단을 혼자 급하게 확인하는 순간"
    ],
    checks: [
      "차량 번호와 기사 정보가 앱과 맞는지 본다.",
      "목적지가 숙소 이름만이 아니라 주소까지 맞는지 확인한다.",
      "결제 방식과 예상 금액을 탑승 전 확인한다.",
      "야간에는 현재 위치와 도착 예정지를 동행자에게 공유한다."
    ],
    response: "요금이나 경로 문제가 생기면 현장에서 논쟁을 키우기보다 앱 기록, 영수증, 차량 번호, 시각을 남깁니다. 결제 문제는 카드사와 호출앱 고객 지원 기록을 함께 확인합니다.",
    note: "택시·호출앱 가이드는 특정 도시의 교통을 일반화하지 않습니다. 여행자가 피곤할 때도 같은 순서로 확인할 수 있게 돕는 문서입니다.",
    related: ["/guides/airport-arrival/", "/guides/night-transport/", "/cities/london/", "/cities/istanbul/", "/cities/bangkok/", "/field-notes/"]
  },
  {
    slug: "guides/beach-bag-safety",
    title: "해변·테라스 가방 관리 가이드 - 트립마킹",
    h1: "해변과 테라스에서 가방을 몸에서 완전히 떼지 않는 법",
    description: "해외 해변, 야외 테라스, 카페 좌석에서 가방, 휴대폰, 지갑을 내려놓는 시간을 줄이는 여행 안전 가이드.",
    city: "해변·테라스",
    mapHref: "/?scenario=beach&utm_source=guide-page&utm_medium=internal&utm_campaign=beach-bag-safety",
    intro: "해변과 테라스에서는 여행자가 쉬는 모드로 바뀌면서 가방을 몸에서 떼어놓기 쉽습니다. 이 페이지는 휴식을 줄이라는 뜻이 아니라, 모두가 동시에 물건을 보지 않는 상황을 피하는 방법입니다.",
    principle: "해변에서는 한 명이 물건을 보고, 테라스에서는 가방이 몸과 의자 사이에 있도록 둡니다. 보이는 곳에 있다는 이유만으로 안전하다고 보기는 어렵습니다.",
    movement: "사진, 주문, 결제, 수영, 화장실 이동이 겹칠 때 가방과 휴대폰이 흩어집니다. 이동 전에는 누가 무엇을 보고 있는지 짧게 정합니다.",
    situations: [
      "해변에서 모두가 동시에 물에 들어가며 가방이 자리 위에 남는 순간",
      "테라스 좌석에서 휴대폰을 테이블 가장자리나 의자 위에 올려두는 순간",
      "주문과 결제 후 지갑을 정리하지 않은 채 사진을 찍는 순간",
      "비나 바람 때문에 짐을 급하게 옮기며 휴대폰과 카드가 분리되는 순간"
    ],
    checks: [
      "해변에서는 물건을 보는 사람을 정하고, 모두가 동시에 자리를 비우지 않는다.",
      "테라스에서는 가방을 의자 뒤보다 몸과 의자 사이에 둔다.",
      "휴대폰은 테이블 가장자리보다 안쪽 주머니나 가방 안쪽에 둔다.",
      "결제 후에는 지갑을 먼저 정리하고 사진이나 이동을 시작한다."
    ],
    response: "해변이나 테라스에서 분실이 생기면 주변을 무리하게 뛰기보다 결제 수단과 계정을 먼저 보호합니다. 매장 직원이나 인근 안내소에 문의할 때는 시간, 좌석, 물품을 짧게 정리합니다.",
    note: "해변·테라스 가이드는 휴식 공간을 위험하다고 단정하지 않습니다. 쉬는 장면에서 물건이 몸에서 떨어지는 시간을 줄이기 위한 문서입니다.",
    related: ["/cities/barcelona/", "/cities/lisbon/", "/barcelona/barceloneta-beach-bag-theft/", "/guides/crowded-square/", "/guides/pickpocket/", "/guide/"]
  }
];

const hubPage = {
  slug: "guides",
  title: "여행 상황별 판단 가이드 - 트립마킹",
  h1: "여행자가 현장에서 바로 떠올릴 상황별 판단 기준",
  description: "공항 도착, 지하철 환승, 붐비는 광장, ATM 출금, 택시·호출앱, 해변·테라스처럼 여행자가 자주 검색하는 상황을 정리한 트립마킹 가이드 허브.",
  city: "상황별 가이드",
  mapHref: "/?utm_source=guide-hub&utm_medium=internal&utm_campaign=guides",
  intro: "트립마킹의 상황별 가이드는 지도 화면에서 다 담기 어려운 판단 기준을 설명합니다. 현장에서는 지도와 체크리스트를 짧게 보고, 여행 전에는 이 허브에서 자신에게 필요한 장면을 골라 읽으면 됩니다.",
  principle: "이 허브는 특정 도시를 위험하다고 단정하지 않습니다. 공항 도착, 지하철 환승, 사진 명소, ATM, 택시, 해변처럼 도시가 달라도 반복되는 장면을 기준으로 정리합니다.",
  movement: "각 문서는 길게 읽는 여행 에세이가 아니라, 실제로 손에 든 물건과 다음 행동을 바꾸기 위한 운영자 메모에 가깝습니다.",
  situations: [
    "도착 직후 피로와 수하물 때문에 여권과 카드가 흩어지는 장면",
    "지하철 환승 중 노선 확인과 소지품 확인이 겹치는 장면",
    "광장과 사진 명소에서 휴대폰, 지갑, 가방이 동시에 노출되는 장면",
    "ATM, 택시, 해변처럼 결제와 이동, 휴식이 섞이는 장면"
  ],
  checks: [
    "여행 전에는 도시별 문서와 상황별 문서를 한 번씩 연결해서 본다.",
    "현장에서는 긴 글보다 지도 마커와 한 줄 행동을 먼저 확인한다.",
    "분실이나 결제 문제가 생기면 신고보다 카드·계정 보호를 먼저 본다.",
    "불안감을 키우는 표현보다 바로 할 수 있는 행동 문장을 우선한다."
  ],
  response: "여행 중 문제가 생겼다면 이 허브에서 관련 상황 문서를 먼저 열고, 카드사·경찰·영사 절차처럼 실제 대응 기관으로 이어지는 순서를 확인합니다.",
  note: "상황별 가이드는 광고를 넣을 수 있는 일반 예방 문서지만, 여권·카드 분실처럼 긴급 대응 성격이 강한 문서는 광고를 제외하는 원칙을 유지합니다.",
  related: [
    "/guides/airport-arrival/",
    "/guides/metro-transfer/",
    "/guides/crowded-square/",
    "/guides/atm-withdrawal/",
    "/guides/taxi-app-check/",
    "/guides/beach-bag-safety/",
    "/guides/pickpocket/",
    "/guides/night-transport/",
    "/cities/",
    "/field-notes/"
  ],
  hub: true
};

const pages = [hubPage, ...cityPages, ...guidePages];

const extraFeedItems = [
  {
    title: "도시별 해외여행 도난·스캠 주의 맥락",
    href: "/cities/",
    description: "바르셀로나, 파리, 로마, 런던, 방콕, 도쿄, 뉴욕 등 도시별로 소지품과 이동 판단을 확인하는 허브."
  },
  {
    title: "바르셀로나 소매치기 주의 가이드",
    href: "/barcelona-pickpocket-guide/",
    description: "바르셀로나 주요 관광지와 지하철, 해변 동선에서 소지품 노출을 줄이는 여행 안전 가이드."
  },
  {
    title: "람블라스 거리와 보케리아 주변 소매치기 대처",
    href: "/barcelona/la-rambla-pickpocket/",
    description: "람블라스 거리와 보케리아 시장 주변에서 사진, 길찾기, 결제 중 소지품을 확인하는 장소별 가이드."
  },
  {
    title: "카탈루냐 광장 지하철 환승 소매치기 주의",
    href: "/barcelona/catalunya-metro-pickpocket/",
    description: "카탈루냐 광장 지하철 환승과 만남 장소에서 노선 확인과 소지품 관리를 분리하는 장소별 가이드."
  },
  {
    title: "사그라다 파밀리아 사진 대기 구역 스캠 주의",
    href: "/barcelona/sagrada-familia-scam/",
    description: "사그라다 파밀리아 주변 사진 대기와 입장 전 확인 중 접근 제안과 소지품 노출을 줄이는 가이드."
  },
  {
    title: "바르셀로네타 해변·테라스 가방 도난 주의",
    href: "/barcelona/barceloneta-beach-bag-theft/",
    description: "바르셀로네타 해변과 테라스 좌석에서 가방과 휴대폰을 몸에서 떼지 않는 기준."
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function routePath(page) {
  return `/${page.slug}/`;
}

function pageUrl(page) {
  return `${siteUrl}${routePath(page)}`;
}

function stripBrand(title) {
  return title.replace(" - 트립마킹", "");
}

function relatedTitle(href) {
  return relatedTitles.get(href) || href;
}

function renderList(items) {
  return items.map((item) => `          <li>${escapeHtml(item)}</li>`).join("\n");
}

function renderRelatedLinks(page) {
  return page.related
    .map((href) => `          <li><a href="${href}">${escapeHtml(relatedTitle(href))}</a></li>`)
    .join("\n");
}

function renderStructuredData(page) {
  const type = page.hub ? "CollectionPage" : "Article";
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: stripBrand(page.title),
    description: page.description,
    inLanguage: "ko-KR",
    datePublished: lastmod,
    dateModified: lastmod,
    author: { "@type": "Organization", name: "트립마킹 편집부" },
    publisher: { "@type": "Organization", name: "트립마킹", url: siteUrl },
    mainEntityOfPage: pageUrl(page),
    about: [page.city, "해외여행 안전", "소지품 관리"]
  };
}

function renderPage(page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const h1 = escapeHtml(page.h1);
  const canonical = pageUrl(page);
  const articleClass = page.hub ? "keyword-map" : "editor-note";

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="${page.hub ? "website" : "article"}">
    <meta property="og:site_name" content="트립마킹">
    <meta property="og:title" content="${escapeHtml(stripBrand(page.title))}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7217591196020054" crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-7217591196020054">
    <link rel="alternate" type="application/rss+xml" title="트립마킹 RSS" href="${siteUrl}/feed.xml">
    <link rel="stylesheet" href="/assets/styles.css?v=${assetVersion}">
    <script type="application/ld+json">${JSON.stringify(renderStructuredData(page))}</script>
  </head>
  <body>
    <main class="static-shell">
      <h1>${h1}</h1>
      <p>${escapeHtml(page.intro)}</p>
      <p>${escapeHtml(page.principle)}</p>

      <div class="${articleClass}">
        <strong>${escapeHtml(page.hub ? "이 허브의 역할" : `${page.city} 문서를 읽는 기준`)}</strong>
        <p>${escapeHtml(page.movement)}</p>
      </div>

      <figure class="static-shot">
        <img src="/assets/screenshots/tripmarking-marker-legend.png" alt="트립마킹 지도에서 위험 유형별 마커를 확인하는 화면">
        <figcaption>지도는 현장에서 짧게 보고, 문서는 여행 전이나 이동 전 쉬는 시간에 읽는 구조입니다. 마커는 도시 전체를 평가하는 표시가 아니라 특정 장면에서 확인할 행동을 떠올리게 하는 신호입니다.</figcaption>
      </figure>

      <h2>먼저 떠올릴 장면</h2>
      <p>${escapeHtml(page.city)}에서 가장 중요한 것은 장소 이름보다 장면입니다. 같은 장소라도 사진을 찍는 중인지, 결제를 막 끝냈는지, 환승을 찾는 중인지에 따라 확인해야 할 물건이 달라집니다.</p>
      <ul>
${renderList(page.situations)}
      </ul>

      <h2>현장에서 바로 확인할 행동</h2>
      <p>아래 항목은 긴 준비물이 아니라, 실제로 걷기 전 10초 안에 확인할 수 있는 기준입니다. 불안감을 키우기보다 손에 든 물건과 다음 이동만 분리해서 보는 데 목적이 있습니다.</p>
      <ol class="use-steps">
${page.checks.map((item) => `        <li>${escapeHtml(item)}</li>`).join("\n")}
      </ol>

      <figure class="static-shot">
        <img src="/assets/screenshots/tripmarking-spot-summary.png" alt="트립마킹 장소 상세에서 한 줄 주의와 현장 행동을 확인하는 화면">
        <figcaption>트립마킹의 장소 요약은 긴 경고문을 대신합니다. 사용자는 한 줄 주의, 지금 할 일, 피해 직후 순서를 보고 필요한 경우 자세한 문서로 이동합니다.</figcaption>
      </figure>

      <h2>문제가 생겼을 때</h2>
      <p>${escapeHtml(page.response)}</p>
      <p>추적이나 큰 소리의 항의보다 기록과 차단이 먼저입니다. 시간, 위치, 마지막 결제, 마지막으로 물건을 확인한 순간을 남기면 경찰 신고, 카드사 문의, 보험 접수에서 설명이 훨씬 단순해집니다.</p>

      <div class="editor-note">
        <strong>표현 기준</strong>
        <p>${escapeHtml(page.note)}</p>
      </div>

      <h2>같이 보면 좋은 문서</h2>
      <div class="cluster-links">
        <ul>
${renderRelatedLinks(page)}
        </ul>
      </div>

      <p><a href="${page.mapHref}">트립마킹 지도에서 ${escapeHtml(page.city)} 관련 신호 보기</a> · <a href="/guide/">예방 가이드</a> · <a href="/field-notes/">현장 판단 기준</a> · <a href="/editorial-policy/">표현·검수 기준</a></p>
    </main>
  </body>
</html>
`;
}

function extractLinkFromItem(itemBlock) {
  const match = itemBlock.match(/<link>\s*([^<]+?)\s*<\/link>/i);
  return match ? match[1].trim() : "";
}

function renderFeedItem({ title, href, description, pubDate = buildDate }) {
  const link = href.startsWith("http") ? href : `${siteUrl}${href}`;
  return `    <item>
      <title>${escapeHtml(title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeHtml(description)}</description>
    </item>`;
}

async function upsertSitemap() {
  const sitemapPath = path.join(siteRoot, "sitemap.xml");
  const xml = await fs.readFile(sitemapPath, "utf8");
  const generatedLocs = new Set(pages.map(pageUrl));
  const existingBlocks = [...xml.matchAll(/\s*<url>[\s\S]*?<\/url>/g)]
    .map((match) => match[0].trim())
    .filter((block) => {
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
      return loc && !generatedLocs.has(loc);
    });
  const generatedBlocks = pages.map((page) => `  <url><loc>${pageUrl(page)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${page.hub ? "0.8" : "0.75"}</priority></url>`);
  const next = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${existingBlocks.map((block) => `  ${block}`).join("\n")}\n${generatedBlocks.join("\n")}\n</urlset>\n`;
  await fs.writeFile(sitemapPath, next);
}

async function upsertFeed() {
  const feedPath = path.join(siteRoot, "feed.xml");
  const xml = await fs.readFile(feedPath, "utf8");
  const upsertItems = [
    ...pages.map((page) => ({
      title: stripBrand(page.title),
      href: routePath(page),
      description: page.description
    })),
    ...extraFeedItems
  ];
  const upsertLinks = new Set(upsertItems.map((item) => `${siteUrl}${item.href}`));
  const existingItems = [...xml.matchAll(/\s*<item>[\s\S]*?<\/item>/g)]
    .map((match) => match[0].trim())
    .filter((itemBlock) => !upsertLinks.has(extractLinkFromItem(itemBlock)));
  const renderedItems = [
    ...upsertItems.map(renderFeedItem),
    ...existingItems.map((block) => `    ${block}`)
  ].join("\n");
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>트립마킹</title>
    <link>${siteUrl}/</link>
    <description>한국인 여행자를 위한 해외여행 도난·스캠 주의 지도와 상황별 판단 가이드.</description>
    <language>ko-KR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${renderedItems}
  </channel>
</rss>
`;
  await fs.writeFile(feedPath, feed);
}

async function writePages() {
  await Promise.all(pages.map(async (page) => {
    const dir = path.join(siteRoot, ...page.slug.split("/"));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), renderPage(page));
  }));
}

await writePages();
await upsertSitemap();
await upsertFeed();

console.log(`Generated ${pages.length} Tripmarking city and situation guide pages.`);
