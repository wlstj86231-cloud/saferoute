import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "site");
const siteUrl = "https://tripmarking.com";
const lastmod = "2026-07-03";
const buildDate = "Fri, 03 Jul 2026 15:40:00 +0900";
const assetVersion = "20260703-spotfield1";

const relatedTitles = new Map([
  ["/", "트립마킹 지도 열기"],
  ["/guide/", "해외여행 도난·스캠 예방 가이드"],
  ["/guides/", "여행 상황별 판단 가이드"],
  ["/guides/pickpocket/", "해외여행 소매치기 예방 핵심 가이드"],
  ["/guides/airport-arrival/", "공항 도착 직후 소지품 점검 가이드"],
  ["/guides/metro-transfer/", "지하철 환승 중 소지품 점검 가이드"],
  ["/guides/crowded-square/", "붐비는 광장·사진 명소 판단 가이드"],
  ["/guides/atm-withdrawal/", "해외 ATM 출금 전후 확인 가이드"],
  ["/guides/taxi-app-check/", "해외 택시·호출앱 확인 가이드"],
  ["/guides/beach-bag-safety/", "해변·테라스 가방 관리 가이드"],
  ["/guides/night-transport/", "야간 이동 주의 기준"],
  ["/cities/", "도시별 해외여행 주의 맥락"],
  ["/cities/barcelona/", "바르셀로나 여행 안전 맥락 가이드"],
  ["/cities/paris/", "파리 여행 안전 맥락 가이드"],
  ["/cities/rome/", "로마 여행 안전 맥락 가이드"],
  ["/cities/london/", "런던 여행 안전 맥락 가이드"],
  ["/cities/amsterdam/", "암스테르담 여행 안전 맥락 가이드"],
  ["/cities/istanbul/", "이스탄불 여행 안전 맥락 가이드"],
  ["/cities/bangkok/", "방콕 여행 안전 맥락 가이드"],
  ["/field-notes/", "트립마킹 현장 판단 기준"],
  ["/field-notes/crowd-density-check/", "혼잡도 확인 field note"],
  ["/field-notes/bag-position-decision/", "가방 위치 판단 field note"],
  ["/field-notes/night-transport-choice/", "야간 이동 선택 field note"],
  ["/field-notes/when-to-leave-area/", "자리를 옮길 때 field note"],
  ["/editorial-policy/", "표현·검수·제보 정책"],
  ["/spots/paris/chatelet-transfer/", "파리 샤틀레 환승 주의 맥락"],
  ["/spots/paris/montmartre-crowd/", "파리 몽마르트르 혼잡 구간 주의 맥락"],
  ["/spots/rome/termini-station/", "로마 테르미니역 주의 맥락"],
  ["/spots/rome/trevi-fountain-crowd/", "로마 트레비 분수 혼잡 구간 주의 맥락"],
  ["/spots/barcelona/catalunya-transfer/", "바르셀로나 카탈루냐 광장 환승 주의 맥락"],
  ["/spots/barcelona/sagrada-familia-queue/", "사그라다 파밀리아 대기줄 주의 맥락"],
  ["/spots/london/oxford-street-phone-awareness/", "런던 옥스퍼드 스트리트 휴대폰 주의 맥락"],
  ["/spots/amsterdam/central-station-bike-area/", "암스테르담 중앙역 자전거 동선 주의 맥락"],
  ["/spots/bangkok/night-market-bag-check/", "방콕 야시장 가방 점검 맥락"],
  ["/spots/istanbul/grand-bazaar-navigation/", "이스탄불 그랜드 바자르 이동 판단 맥락"],
  ["/spots/barcelona/la-rambla/", "람블라스 거리 장소별 주의 맥락"],
  ["/travel-pickpocket-prevention/", "해외여행 소매치기 예방 체크리스트"]
]);

const spotPages = [
  {
    slug: "spots/paris/chatelet-transfer",
    title: "파리 샤틀레 환승 주의 맥락 - 트립마킹",
    h1: "파리 샤틀레 환승에서 노선 확인과 가방 위치를 분리하는 법",
    description: "파리 샤틀레·레알 환승 구간에서 출구, 노선, 휴대폰, 백팩이 동시에 흩어지지 않게 확인하는 장소별 여행 안전 가이드.",
    scope: "파리 샤틀레 환승",
    mapHref: "/?city=paris&risk=transit&spot=chatelet-transfer&utm_source=spot-page&utm_medium=internal&utm_campaign=paris-chatelet",
    intro: "샤틀레·레알은 환승이 편하지만 출구와 노선이 많아 여행자가 자주 멈추는 구간입니다. 이 문서는 역을 위험하게 단정하지 않고, 환승 중 손과 시선이 분리되는 순간을 줄이는 데 집중합니다.",
    context: "지하철과 RER을 갈아탈 때는 노선 검색, 에스컬레이터, 개찰구, 캐리어 이동이 한 번에 겹칩니다. 노선 확인을 끝내고 이동을 시작하는 작은 순서만 있어도 가방과 휴대폰이 흩어지는 일을 줄일 수 있습니다.",
    signals: [
      "출구 번호를 찾느라 휴대폰을 오래 열어두고 백팩이 뒤로 돌아가는 순간",
      "개찰구 앞에서 교통권, 지갑, 휴대폰을 동시에 꺼내는 순간",
      "에스컬레이터에서 캐리어와 휴대폰을 양손에 나누어 든 순간",
      "동행자와 방향을 맞추느라 몸이 멈췄는데 주변 흐름은 계속 움직이는 순간"
    ],
    checks: [
      "벽 쪽이나 기둥 옆에서 노선과 출구를 먼저 확인한다.",
      "개찰구 전에는 교통권만 손에 남기고 지갑은 안쪽에 넣는다.",
      "혼잡하면 백팩은 앞으로 돌리고 휴대폰은 짧게 확인한다.",
      "길을 잃었다고 느끼면 통로 한가운데가 아니라 가장자리에서 멈춘다."
    ],
    routeReading: "트립마킹 지도에서는 파리 도시 맥락과 지하철 환승 가이드를 함께 보면 좋습니다. 이 장소 문서는 지도 마커의 한 줄 주의를 검색 가능한 문서로 풀어쓴 보조 설명입니다.",
    response: "물건이 보이지 않으면 무리해서 사람 흐름을 거슬러 뛰지 말고, 바로 다음 안전한 벽 쪽으로 이동해 카드와 계정을 먼저 확인합니다. 역명, 노선, 시간, 마지막으로 물건을 본 위치를 짧게 적어 두면 문의와 신고가 쉬워집니다.",
    editorialNote: "샤틀레 환승 문서는 특정 사람을 의심하라는 문서가 아닙니다. 복잡한 환승 구조 속에서 여행자가 조정할 수 있는 동작만 정리합니다.",
    related: ["/cities/paris/", "/guides/metro-transfer/", "/field-notes/crowd-density-check/", "/field-notes/bag-position-decision/", "/guides/pickpocket/", "/field-notes/"]
  },
  {
    slug: "spots/paris/montmartre-crowd",
    title: "파리 몽마르트르 혼잡 구간 주의 맥락 - 트립마킹",
    h1: "몽마르트르 언덕과 사진 구간에서 접근 제안과 가방 위치를 나눠 보는 법",
    description: "파리 몽마르트르 언덕, 사크레쾨르 주변, 사진 명소에서 대화가 길어지는 접근과 소지품 노출을 줄이는 장소별 가이드.",
    scope: "파리 몽마르트르",
    mapHref: "/?city=paris&risk=pickpocket&spot=montmartre-crowd&utm_source=spot-page&utm_medium=internal&utm_campaign=paris-montmartre",
    intro: "몽마르트르와 사크레쾨르 주변은 사진을 찍고, 언덕길을 오르고, 길을 확인하는 시간이 자주 겹칩니다. 이 문서는 장소 분위기를 불안하게 만들지 않고, 여행자가 사진과 이동을 분리하도록 돕습니다.",
    context: "언덕길에서는 시선이 풍경과 계단으로 자주 이동합니다. 누군가 대화를 길게 걸어오거나 사진을 제안할 때도 휴대폰, 지갑, 가방 위치를 먼저 확인하는 습관이 필요합니다.",
    signals: [
      "사진을 찍느라 휴대폰은 손에 있고 가방 지퍼는 등 뒤로 돌아가는 순간",
      "기념품, 서명, 팔찌, 사진 제안처럼 대화가 길어지는 순간",
      "계단이나 언덕에서 숨이 차서 짐을 바닥에 잠깐 내려놓는 순간",
      "일행을 기다리며 휴대폰과 지갑을 동시에 꺼내는 순간"
    ],
    checks: [
      "사진 전에는 가방 지퍼와 휴대폰 외 물건을 먼저 정리한다.",
      "대화가 길어지면 가격과 목적이 명확한지 먼저 보고 짧게 이동한다.",
      "계단 중간보다 넓은 가장자리에서 길과 일행을 확인한다.",
      "가방을 내려놓아야 한다면 발 사이가 아니라 몸과 벽 사이에 둔다."
    ],
    routeReading: "몽마르트르 문서는 파리 도시 문서와 붐비는 광장 판단 가이드 사이를 연결합니다. 지도에서는 사진 명소와 접근 제안 신호를 짧게 확인하고, 이 문서에서는 행동 기준을 읽습니다.",
    response: "분실이 의심되면 마지막 사진 시각과 위치를 확인합니다. 휴대폰이나 카드가 함께 사라졌다면 계정 잠금과 카드 정지를 먼저 진행하고, 이동 경로와 좌석 또는 계단 위치를 기록합니다.",
    editorialNote: "이 문서는 특정 제안을 모두 나쁘게 단정하지 않습니다. 여행자가 대화가 길어지는 순간에 물건 관리를 놓치지 않게 하는 기준입니다.",
    related: ["/cities/paris/", "/guides/crowded-square/", "/field-notes/when-to-leave-area/", "/field-notes/bag-position-decision/", "/travel-pickpocket-prevention/", "/editorial-policy/"]
  },
  {
    slug: "spots/rome/termini-station",
    title: "로마 테르미니역 주의 맥락 - 트립마킹",
    h1: "로마 테르미니역에서 열차, 지하철, 숙소 이동을 분리해서 보는 법",
    description: "로마 테르미니역에서 열차 도착, 지하철 환승, 숙소 이동, 택시 선택 전 소지품과 목적지를 확인하는 장소별 여행 안전 가이드.",
    scope: "로마 테르미니역",
    mapHref: "/?city=rome&risk=transit&spot=termini-station&utm_source=spot-page&utm_medium=internal&utm_campaign=rome-termini",
    intro: "테르미니역은 로마 여행의 출발점이자 환승점입니다. 이 문서는 역을 위험하게 묘사하지 않고, 장거리 이동 후 피로와 환승 판단이 겹치는 순간을 줄이는 방법을 다룹니다.",
    context: "열차에서 내린 직후에는 숙소 주소, 지하철, 버스, 택시, 캐리어가 한 번에 걸립니다. 이때 새 결정을 계속 만들면 카드와 휴대폰 확인이 흩어지기 쉽습니다.",
    signals: [
      "열차에서 내려 플랫폼 번호와 숙소 위치를 동시에 확인하는 순간",
      "매표기나 개찰구 앞에서 카드, 현금, 휴대폰을 모두 꺼내는 순간",
      "택시나 이동 제안을 들으며 캐리어와 백팩이 몸에서 멀어지는 순간",
      "지하철 환승 전 동행자와 방향을 맞추다가 통로 한가운데 멈추는 순간"
    ],
    checks: [
      "플랫폼을 벗어나기 전에 휴대폰, 지갑, 여권, 캐리어를 한 번 확인한다.",
      "지하철이나 택시를 고르기 전 숙소 주소를 먼저 고정한다.",
      "결제 전후에는 카드와 지갑을 한쪽으로 빠져 정리한다.",
      "이동 제안은 목적지, 가격, 결제 방식이 분명할 때만 고려한다."
    ],
    routeReading: "테르미니역은 도시별 로마 문서와 공항·역 도착 가이드, 택시·호출앱 가이드를 이어 읽는 지점입니다. 지도에서는 이동 전 확인할 마커로 짧게 봅니다.",
    response: "분실을 알아차리면 플랫폼, 매표기, 개찰구, 이동 제안 위치 중 마지막 확인 지점을 먼저 적습니다. 카드와 계정 보호를 끝낸 뒤 역 안내나 경찰 신고 절차를 확인합니다.",
    editorialNote: "테르미니역 문서는 특정 교통수단이나 사람을 일반화하지 않습니다. 장거리 이동 후 판단이 느려지는 구조를 행동 기준으로 바꿉니다.",
    related: ["/cities/rome/", "/guides/airport-arrival/", "/guides/metro-transfer/", "/guides/taxi-app-check/", "/field-notes/night-transport-choice/", "/field-notes/"]
  },
  {
    slug: "spots/rome/trevi-fountain-crowd",
    title: "로마 트레비 분수 혼잡 구간 주의 맥락 - 트립마킹",
    h1: "트레비 분수 주변에서 사진, 동전, 길찾기를 한 번에 처리하지 않는 법",
    description: "로마 트레비 분수 주변 혼잡 구간에서 사진 촬영, 동전, 휴대폰, 가방 위치를 분리해 확인하는 장소별 가이드.",
    scope: "로마 트레비 분수",
    mapHref: "/?city=rome&risk=crowd&spot=trevi-fountain&utm_source=spot-page&utm_medium=internal&utm_campaign=rome-trevi",
    intro: "트레비 분수 주변은 사진을 찍으려는 사람과 이동하는 사람이 계속 섞이는 곳입니다. 이 문서는 관광지를 불안하게 보이게 하려는 것이 아니라, 사진과 길찾기를 나누는 기준입니다.",
    context: "사진을 찍고, 동전을 준비하고, 다음 식당이나 지하철을 찾는 일이 동시에 생깁니다. 이때 휴대폰, 지갑, 가방이 각각 다른 방향으로 흩어지지 않도록 순서를 정합니다.",
    signals: [
      "사진을 찍으려고 앞으로 들어가며 가방이 등 뒤로 밀리는 순간",
      "동전이나 지갑을 찾다가 휴대폰을 손에 든 채 시선이 분수로 향하는 순간",
      "다음 목적지를 찾느라 군중 가운데서 지도 앱을 오래 보는 순간",
      "사진을 부탁받거나 부탁하면서 휴대폰을 바로 넘기려는 순간"
    ],
    checks: [
      "사진 전에는 지갑과 카드 위치를 먼저 닫아둔다.",
      "군중 한가운데가 아니라 가장자리에서 길찾기를 한다.",
      "휴대폰을 넘기기 전에는 짧게 주변과 상대를 확인한다.",
      "동전이나 지갑을 꺼낸 뒤에는 바로 안쪽 주머니에 정리한다."
    ],
    routeReading: "트레비 분수 페이지는 붐비는 광장 판단 가이드와 가방 위치 field note를 장소에 적용한 예시입니다. 지도에서는 사진 명소 신호로 빠르게 열 수 있게 연결합니다.",
    response: "휴대폰이나 지갑이 보이지 않으면 마지막 사진 시각, 분수 기준 위치, 이동 방향을 기록합니다. 감정적으로 사람을 특정하기보다 계정 잠금과 카드 정지를 먼저 진행합니다.",
    editorialNote: "이 문서는 혼잡 자체를 위험으로 단정하지 않습니다. 여행자가 사진에 집중하는 동안 소지품 확인이 끊기지 않도록 돕습니다.",
    related: ["/cities/rome/", "/guides/crowded-square/", "/field-notes/crowd-density-check/", "/field-notes/bag-position-decision/", "/guides/pickpocket/", "/editorial-policy/"]
  },
  {
    slug: "spots/barcelona/catalunya-transfer",
    title: "바르셀로나 카탈루냐 광장 환승 주의 맥락 - 트립마킹",
    h1: "카탈루냐 광장에서 만남, 환승, 길찾기를 분리해서 보는 법",
    description: "바르셀로나 카탈루냐 광장과 지하철 환승 주변에서 휴대폰, 가방, 캐리어 위치를 확인하는 장소별 여행 안전 가이드.",
    scope: "바르셀로나 카탈루냐 광장",
    mapHref: "/?city=barcelona&risk=transit&spot=catalunya-transfer&utm_source=spot-page&utm_medium=internal&utm_campaign=barcelona-catalunya",
    intro: "카탈루냐 광장은 만남 장소, 쇼핑 동선, 지하철 환승이 겹치는 지점입니다. 이 문서는 광장을 위험하다고 말하지 않고, 여행자가 멈추는 순간에 소지품 위치를 놓치지 않게 돕습니다.",
    context: "약속 장소를 찾거나 지하철 입구를 고를 때 휴대폰이 오래 열립니다. 주변을 보느라 가방이 몸 밖으로 밀리면 작은 확인 루틴이 필요합니다.",
    signals: [
      "동행자를 찾느라 휴대폰 화면과 주변을 번갈아 보는 순간",
      "지하철 입구를 고르며 캐리어와 백팩이 서로 다른 방향으로 놓이는 순간",
      "광장 가장자리에서 사진과 길찾기를 동시에 하는 순간",
      "쇼핑 후 봉투, 지갑, 휴대폰을 모두 손에 든 채 이동하는 순간"
    ],
    checks: [
      "만남 위치를 정할 때는 가방 지퍼와 휴대폰 위치를 먼저 본다.",
      "지하철 입구는 멈춘 상태에서 고르고 이동 중 검색을 줄인다.",
      "쇼핑 봉투가 있으면 지갑과 휴대폰은 안쪽에 넣은 뒤 걷는다.",
      "동행자와 떨어질 가능성이 있으면 짧은 만남 지점을 미리 정한다."
    ],
    routeReading: "카탈루냐 광장은 바르셀로나 도시 문서와 지하철 환승 가이드를 이어주는 장소입니다. 기존 카탈루냐 지하철 문서와 함께 보면 맥락이 더 분명해집니다.",
    response: "분실이 의심되면 광장 중앙에서 오래 찾기보다 가장자리로 이동해 카드, 휴대폰 계정, 숙소 연락을 먼저 확인합니다. 마지막 확인 위치와 이동 방향을 짧게 남깁니다.",
    editorialNote: "이 문서는 광장이나 특정 사람을 낙인찍지 않습니다. 만남과 환승이 겹치는 장면의 행동 기준만 정리합니다.",
    related: ["/cities/barcelona/", "/barcelona/catalunya-metro-pickpocket/", "/guides/metro-transfer/", "/field-notes/crowd-density-check/", "/field-notes/bag-position-decision/", "/spots/barcelona/la-rambla/"]
  },
  {
    slug: "spots/barcelona/sagrada-familia-queue",
    title: "사그라다 파밀리아 대기줄 주의 맥락 - 트립마킹",
    h1: "사그라다 파밀리아 대기줄에서 입장권, 사진, 가방을 나눠 보는 법",
    description: "사그라다 파밀리아 주변 대기줄과 사진 구간에서 입장권, 휴대폰, 가방 위치를 분리해 확인하는 장소별 여행 안전 가이드.",
    scope: "사그라다 파밀리아 대기줄",
    mapHref: "/?city=barcelona&risk=queue&spot=sagrada-familia-queue&utm_source=spot-page&utm_medium=internal&utm_campaign=barcelona-sagrada",
    intro: "사그라다 파밀리아 주변은 사진을 찍는 사람과 입장을 준비하는 사람이 동시에 움직입니다. 이 문서는 대기줄을 불안하게 만들기보다, 입장권과 사진과 소지품을 분리하는 기준입니다.",
    context: "대기줄에서는 입장권 화면, 여권 여부, 가방 검사, 사진 촬영이 겹칩니다. 필요한 물건만 꺼내고 나머지는 닫아두는 단순한 순서가 중요합니다.",
    signals: [
      "입장권 QR을 찾으며 지갑과 휴대폰을 동시에 꺼내는 순간",
      "사진을 찍기 위해 대기줄에서 잠깐 벗어나며 가방을 열어둔 순간",
      "가방 검사 전후로 물건을 급하게 다시 넣는 순간",
      "입구가 헷갈려 접근 제안이나 설명을 길게 듣는 순간"
    ],
    checks: [
      "입장권 화면만 먼저 열고 지갑과 카드는 닫아둔다.",
      "사진은 입장 준비를 끝낸 뒤 따로 찍는다.",
      "가방 검사가 끝나면 바로 지퍼와 휴대폰 위치를 확인한다.",
      "입구나 시간표는 공식 안내와 예약 정보를 우선한다."
    ],
    routeReading: "이 장소 문서는 바르셀로나 도시 문서와 붐비는 광장 가이드 사이의 세부 페이지입니다. 지도에서는 대기줄 신호를 보고, 이 문서에서는 입장 전 행동 순서를 확인합니다.",
    response: "입장 전후 물건이 사라졌다면 예약 시간, 입구 위치, 검사 전후 마지막 확인 순간을 적습니다. 카드와 휴대폰 계정 보호를 먼저 진행하고, 필요하면 현장 직원에게 문의합니다.",
    editorialNote: "사그라다 파밀리아 문서는 접근 제안을 자극적으로 묘사하지 않습니다. 공식 정보 확인과 물건 정리 순서를 분리해 보여줍니다.",
    related: ["/cities/barcelona/", "/barcelona/sagrada-familia-scam/", "/guides/crowded-square/", "/field-notes/bag-position-decision/", "/field-notes/when-to-leave-area/", "/editorial-policy/"]
  },
  {
    slug: "spots/london/oxford-street-phone-awareness",
    title: "런던 옥스퍼드 스트리트 휴대폰 주의 맥락 - 트립마킹",
    h1: "옥스퍼드 스트리트에서 쇼핑, 길찾기, 휴대폰 확인을 분리하는 법",
    description: "런던 옥스퍼드 스트리트와 주변 횡단보도, 매장 입구, 카페 좌석에서 휴대폰과 쇼핑 봉투를 관리하는 장소별 가이드.",
    scope: "런던 옥스퍼드 스트리트",
    mapHref: "/?city=london&risk=phone&spot=oxford-street&utm_source=spot-page&utm_medium=internal&utm_campaign=london-oxford",
    intro: "옥스퍼드 스트리트는 쇼핑, 길찾기, 횡단보도, 카페 휴식이 빠르게 이어지는 곳입니다. 이 문서는 휴대폰 날치기를 자극적으로 말하지 않고, 휴대폰 노출 시간을 줄이는 기준을 다룹니다.",
    context: "쇼핑 봉투가 늘어나면 손이 부족해지고, 휴대폰은 길찾기와 결제 확인 때문에 오래 열립니다. 걷는 중 검색보다 멈춘 뒤 확인하는 순서가 더 안정적입니다.",
    signals: [
      "횡단보도 앞에서 휴대폰을 도로 쪽 손에 오래 들고 있는 순간",
      "매장 입구에서 결제 내역과 다음 목적지를 동시에 확인하는 순간",
      "쇼핑 봉투와 휴대폰을 같은 손에 들고 걷는 순간",
      "카페 테이블에 휴대폰을 올려두고 영수증이나 지갑을 정리하는 순간"
    ],
    checks: [
      "길찾기는 매장 안쪽이나 벽 쪽에서 먼저 확인한다.",
      "횡단보도와 도로 가장자리에서는 휴대폰을 안쪽 손에 짧게 든다.",
      "쇼핑 봉투가 많으면 지갑과 휴대폰을 따로 손에 들지 않는다.",
      "카페에서는 휴대폰을 테이블 위보다 안쪽 주머니에 둔다."
    ],
    routeReading: "옥스퍼드 스트리트 문서는 런던 도시 문서와 택시·야간 이동 가이드를 함께 보완합니다. 지도에서는 휴대폰 신호로 빠르게 보고, 문서에서는 쇼핑 동선별 기준을 읽습니다.",
    response: "휴대폰을 잃어버렸다면 기기 찾기와 계정 잠금을 먼저 진행합니다. 마지막으로 휴대폰을 열었던 횡단보도, 매장, 카페 위치와 결제 기록을 남깁니다.",
    editorialNote: "이 문서는 거리나 사람을 일반화하지 않습니다. 쇼핑과 길찾기가 겹치는 상황에서 사용자가 조절할 수 있는 휴대폰 사용 방식을 정리합니다.",
    related: ["/cities/london/", "/london-phone-snatching-guide/", "/guides/taxi-app-check/", "/guides/night-transport/", "/field-notes/night-transport-choice/", "/field-notes/bag-position-decision/"]
  },
  {
    slug: "spots/amsterdam/central-station-bike-area",
    title: "암스테르담 중앙역 자전거 동선 주의 맥락 - 트립마킹",
    h1: "암스테르담 중앙역 앞에서 자전거 흐름과 소지품을 동시에 보지 않는 법",
    description: "암스테르담 중앙역 주변 자전거 동선, 트램, 운하 방향 이동 중 휴대폰과 가방 위치를 확인하는 장소별 여행 안전 가이드.",
    scope: "암스테르담 중앙역",
    mapHref: "/?city=amsterdam&risk=transit&spot=central-station-bike&utm_source=spot-page&utm_medium=internal&utm_campaign=amsterdam-central",
    intro: "암스테르담 중앙역 앞은 자전거, 트램, 보행자, 캐리어 이동이 한꺼번에 보이는 장소입니다. 이 문서는 자전거 동선을 위험으로 단정하지 않고, 여행자가 적응하는 순간의 소지품 확인을 돕습니다.",
    context: "역에서 나오면 목적지 방향과 자전거 흐름을 동시에 봐야 합니다. 휴대폰으로 길을 보며 걷기보다 한쪽에서 방향을 확인한 뒤 이동하는 편이 좋습니다.",
    signals: [
      "역을 나오자마자 지도 앱을 확대하며 자전거 동선 쪽으로 걷는 순간",
      "트램 정류장과 운하 방향을 찾느라 캐리어가 몸 뒤로 밀리는 순간",
      "사진을 찍으려고 멈추면서 백팩 지퍼가 등 뒤로 향하는 순간",
      "카페나 벤치에서 휴대폰과 지갑을 잠깐 내려놓는 순간"
    ],
    checks: [
      "역 앞에서는 자전거 동선 밖으로 완전히 이동한 뒤 길을 본다.",
      "캐리어가 있으면 휴대폰 확인 시간을 짧게 나눈다.",
      "사진 전에는 가방 지퍼와 지갑 위치를 먼저 확인한다.",
      "트램이나 택시를 고르기 전 목적지 주소를 고정한다."
    ],
    routeReading: "이 페이지는 암스테르담 도시 문서와 지하철·환승 가이드, 혼잡도 field note를 연결합니다. 지도에서는 역 앞 이동 신호로 보고, 문서에서는 동선 선택 기준을 확인합니다.",
    response: "물건이 보이지 않으면 자전거 흐름을 거슬러 찾기보다 역 안쪽이나 넓은 장소로 이동해 카드와 계정을 보호합니다. 마지막 위치와 이동 방향을 기록합니다.",
    editorialNote: "암스테르담 중앙역 문서는 자전거 이용자나 지역 문화를 탓하지 않습니다. 여행자가 낯선 흐름에 적응하는 동안 필요한 행동 기준만 다룹니다.",
    related: ["/cities/amsterdam/", "/amsterdam-bike-area-pickpocket-guide/", "/guides/metro-transfer/", "/field-notes/crowd-density-check/", "/field-notes/bag-position-decision/", "/guides/taxi-app-check/"]
  },
  {
    slug: "spots/bangkok/night-market-bag-check",
    title: "방콕 야시장 가방 점검 맥락 - 트립마킹",
    h1: "방콕 야시장에서 결제, 봉투, 휴대폰을 한꺼번에 들지 않는 법",
    description: "방콕 야시장과 음식 노점 주변에서 결제 후 지갑, 휴대폰, 쇼핑 봉투, 가방 위치를 정리하는 장소별 여행 안전 가이드.",
    scope: "방콕 야시장",
    mapHref: "/?city=bangkok&risk=bag&spot=night-market-bag-check&utm_source=spot-page&utm_medium=internal&utm_campaign=bangkok-night-market",
    intro: "방콕 야시장은 음식, 쇼핑, 결제, 사진이 자연스럽게 이어지는 장소입니다. 이 문서는 야시장을 불안하게 보이게 하려는 것이 아니라, 결제 후 물건 정리 순서를 고정하는 데 목적이 있습니다.",
    context: "손에는 음식이나 봉투가 있고, 휴대폰은 번역과 결제 확인 때문에 자주 열립니다. 결제 직후 한쪽으로 빠져 지갑과 휴대폰을 정리하는 작은 루틴이 중요합니다.",
    signals: [
      "결제 후 현금, 지갑, 휴대폰, 봉투를 모두 손에 든 순간",
      "음식을 들고 사진을 찍으며 가방 지퍼를 확인하지 못하는 순간",
      "사람 흐름에 밀려 다음 가게로 이동하며 영수증과 카드가 흩어지는 순간",
      "택시나 호출앱을 찾으려고 시장 입구에서 휴대폰을 오래 여는 순간"
    ],
    checks: [
      "결제 뒤에는 이동하기 전에 지갑과 휴대폰을 먼저 정리한다.",
      "쇼핑 봉투가 많으면 카드와 현금은 몸 안쪽 한 곳에 둔다.",
      "사진은 결제와 음식 수령을 끝낸 뒤 따로 찍는다.",
      "시장 밖 이동 수단은 출구에서 오래 고민하지 않게 미리 확인한다."
    ],
    routeReading: "방콕 야시장 문서는 방콕 도시 문서와 ATM, 택시·호출앱 가이드 사이를 연결합니다. 지도에서는 야간·가방 신호로 보고, 문서에서는 결제 후 행동을 읽습니다.",
    response: "지갑이나 휴대폰이 보이지 않으면 마지막 결제 가게와 시각을 먼저 확인합니다. 카드 결제 기록을 보고 필요한 경우 카드 사용을 막고, 이동 경로를 짧게 남깁니다.",
    editorialNote: "야시장 문서는 상인이나 방문객을 의심하라는 문서가 아닙니다. 결제 후 손이 복잡해지는 장면에서 여행자가 실수를 줄이는 기준입니다.",
    related: ["/cities/bangkok/", "/bangkok-tourist-scam-guide/", "/guides/atm-withdrawal/", "/guides/taxi-app-check/", "/field-notes/bag-position-decision/", "/field-notes/night-transport-choice/"]
  },
  {
    slug: "spots/istanbul/grand-bazaar-navigation",
    title: "이스탄불 그랜드 바자르 이동 판단 맥락 - 트립마킹",
    h1: "그랜드 바자르에서 길찾기, 가격 확인, 가방 위치를 분리하는 법",
    description: "이스탄불 그랜드 바자르 주변에서 길찾기, 가격 확인, 결제, 가방 위치를 차분히 분리하는 장소별 여행 안전 가이드.",
    scope: "이스탄불 그랜드 바자르",
    mapHref: "/?city=istanbul&risk=scam&spot=grand-bazaar-navigation&utm_source=spot-page&utm_medium=internal&utm_campaign=istanbul-grand-bazaar",
    intro: "그랜드 바자르는 길이 복잡하고 대화와 쇼핑이 자연스럽게 이어지는 장소입니다. 이 문서는 시장을 위험하게 단정하지 않고, 가격과 목적지가 흐려지는 순간을 줄이는 기준을 제공합니다.",
    context: "가게를 둘러보고 길을 찾고 가격을 확인하다 보면 휴대폰과 지갑이 자주 밖으로 나옵니다. 대화가 길어질수록 결제 조건과 이동 방향을 분리해 확인해야 합니다.",
    signals: [
      "목적지를 찾으며 휴대폰을 오래 열고 가방이 등 뒤로 밀리는 순간",
      "가격, 배송, 결제 방식이 명확하지 않은 상태로 대화가 길어지는 순간",
      "환전이나 카드 결제 후 영수증과 지갑을 정리하지 못한 순간",
      "출구를 찾다가 원래 동선과 다른 방향으로 계속 이동하는 순간"
    ],
    checks: [
      "길찾기는 통로 중앙보다 가장자리에서 멈춘 뒤 확인한다.",
      "가격과 결제 조건은 구매 전 짧게 다시 확인한다.",
      "카드 결제 후 영수증과 승인 알림을 보고 바로 정리한다.",
      "동행자와 출구 또는 만남 지점을 미리 정한다."
    ],
    routeReading: "그랜드 바자르 페이지는 이스탄불 도시 문서와 ATM·택시 가이드를 이어줍니다. 지도에서는 접근 제안과 결제 신호를 짧게 확인하고, 문서에서는 행동 순서를 봅니다.",
    response: "결제 문제가 생기면 감정적으로 오래 다투기보다 영수증, 앱 승인 내역, 가게 위치, 시간을 남깁니다. 카드사 확인과 숙소 이동 계획을 먼저 정리하는 편이 안전합니다.",
    editorialNote: "이 문서는 시장이나 상인을 일반화하지 않습니다. 여행자가 낯선 가격 협상과 복잡한 길 안에서 스스로 확인할 수 있는 기준만 다룹니다.",
    related: ["/cities/istanbul/", "/istanbul-tourist-scam-guide/", "/guides/atm-withdrawal/", "/guides/taxi-app-check/", "/field-notes/when-to-leave-area/", "/editorial-policy/"]
  }
];

const fieldPages = [
  {
    slug: "field-notes/crowd-density-check",
    title: "혼잡도 확인 field note - 트립마킹",
    h1: "사람이 많은 곳에서 위험도를 단정하지 않고 움직임을 읽는 법",
    description: "해외여행 중 역, 광장, 대기줄, 야시장에서 혼잡도를 불안이 아니라 행동 신호로 바꾸어 보는 트립마킹 현장 판단 기준.",
    scope: "혼잡도 확인",
    mapHref: "/?utm_source=field-note&utm_medium=internal&utm_campaign=crowd-density",
    intro: "혼잡한 곳은 무조건 위험한 곳이 아닙니다. 트립마킹은 사람 수 자체보다 사용자의 손, 시선, 가방 위치, 이동 방향이 동시에 흔들리는지를 봅니다.",
    context: "같은 광장이라도 사진을 찍는 중인지, 환승을 찾는 중인지, 결제 직후인지에 따라 확인 기준이 달라집니다. 혼잡도는 장소 평가가 아니라 다음 행동을 고르는 신호입니다.",
    signals: [
      "휴대폰 화면을 보는 동안 몸 주변 흐름이 계속 바뀌는 순간",
      "가방이 몸 앞이 아니라 등 뒤나 옆으로 밀리는 순간",
      "동행자와 거리가 벌어져 시선이 물건이 아니라 사람 찾기에 묶이는 순간",
      "대기줄이 느리게 움직여 지갑과 입장권을 계속 손에 들고 있는 순간"
    ],
    checks: [
      "사람 수보다 내 물건이 몸 안쪽에 있는지 먼저 본다.",
      "사진, 결제, 길찾기 중 하나만 먼저 처리한다.",
      "군중 한가운데에서 오래 멈추지 않고 가장자리로 빠져 확인한다.",
      "불안하면 사람을 특정하지 말고 위치와 행동만 바꾼다."
    ],
    routeReading: "이 field note는 파리, 로마, 바르셀로나, 뉴욕처럼 사진 명소와 환승이 겹치는 도시 문서의 공통 판단 기준입니다. 지도 마커를 보기 전 전체 기준으로 읽기 좋습니다.",
    response: "혼잡한 곳에서 물건이 보이지 않으면 사람을 따라가기보다 위치와 시간을 기록합니다. 계정 잠금, 카드 정지, 동행자 연락을 먼저 끝내면 이후 신고나 문의가 단순해집니다.",
    editorialNote: "혼잡도 field note는 특정 장소나 집단을 낙인찍지 않습니다. 사용자가 바꿀 수 있는 위치, 손, 시선, 물건 정리 순서만 남깁니다.",
    related: ["/field-notes/", "/field-notes/bag-position-decision/", "/spots/paris/chatelet-transfer/", "/spots/rome/trevi-fountain-crowd/", "/guides/crowded-square/", "/cities/"]
  },
  {
    slug: "field-notes/bag-position-decision",
    title: "가방 위치 판단 field note - 트립마킹",
    h1: "가방을 앞으로 돌릴지, 몸 안쪽에 둘지 결정하는 기준",
    description: "해외여행 중 백팩, 크로스백, 쇼핑 봉투, 캐리어 위치를 장소와 행동에 맞게 정하는 트립마킹 현장 판단 기준.",
    scope: "가방 위치 판단",
    mapHref: "/?utm_source=field-note&utm_medium=internal&utm_campaign=bag-position",
    intro: "가방을 항상 앞으로 돌려야 하는 것은 아닙니다. 트립마킹은 장소보다 사용자가 지금 무엇을 하는지, 가방 지퍼가 어느 방향을 향하는지, 손이 얼마나 비어 있는지를 봅니다.",
    context: "길찾기, 사진, 결제, 대기줄, 야간 이동처럼 시선이 바뀌는 순간에는 가방 위치도 바뀌어야 합니다. 이 기준은 도시별 문서와 장소 상세에서 반복되는 가장 기본적인 field note입니다.",
    signals: [
      "휴대폰을 오래 보고 있어 가방이 시야 밖으로 밀리는 순간",
      "쇼핑 봉투나 음식 때문에 양손이 부족해지는 순간",
      "대기줄에서 지갑과 입장권을 계속 꺼내고 넣는 순간",
      "야외 좌석에서 가방을 의자 뒤나 바닥에 놓고 대화가 길어지는 순간"
    ],
    checks: [
      "혼잡한 환승과 대기줄에서는 백팩을 앞으로 돌린다.",
      "크로스백 지퍼는 몸 안쪽을 향하게 둔다.",
      "야외 좌석에서는 가방을 의자 뒤보다 몸과 의자 사이에 둔다.",
      "봉투가 많을 때는 지갑과 휴대폰을 손에 들지 않는다."
    ],
    routeReading: "가방 위치 field note는 거의 모든 장소 상세의 공통 기준입니다. 지도에서는 짧은 행동 문장으로 보이고, 이 문서에서는 왜 그 행동이 필요한지 설명합니다.",
    response: "가방 안 물건이 사라졌다고 느끼면 가방을 뒤지며 이동하지 말고, 한쪽으로 빠져 카드와 휴대폰, 여권 위치를 순서대로 확인합니다. 없어진 물건과 마지막 확인 순간을 짧게 기록합니다.",
    editorialNote: "이 문서는 특정 가방 형태나 여행 스타일을 비난하지 않습니다. 실제 현장에서 조정 가능한 위치와 손의 여유를 기준으로 합니다.",
    related: ["/field-notes/", "/field-notes/crowd-density-check/", "/guides/beach-bag-safety/", "/spots/barcelona/catalunya-transfer/", "/spots/bangkok/night-market-bag-check/", "/guide/"]
  },
  {
    slug: "field-notes/night-transport-choice",
    title: "야간 이동 선택 field note - 트립마킹",
    h1: "밤에 이동 수단을 고를 때 비용보다 먼저 확인할 것",
    description: "해외여행 야간 귀가, 호출앱, 택시, 지하철 막차, 숙소 주소를 확인하는 트립마킹 현장 판단 기준.",
    scope: "야간 이동 선택",
    mapHref: "/?utm_source=field-note&utm_medium=internal&utm_campaign=night-transport-choice",
    intro: "밤에는 도시 전체의 위험보다 여행자의 피로와 배터리, 결제 수단, 숙소 주소가 더 중요해집니다. 이 field note는 이동 수단을 고를 때 비용보다 먼저 볼 기준을 정리합니다.",
    context: "술자리, 공연, 늦은 식사 뒤에는 판단 속도가 느려지고 휴대폰 배터리도 줄어 있습니다. 택시, 호출앱, 지하철, 도보를 고르기 전 최소 확인 순서를 고정해야 합니다.",
    signals: [
      "배터리가 낮은데 숙소 주소와 결제 수단을 아직 확인하지 않은 순간",
      "막차 시간이 가까워 이동 수단을 계속 바꾸는 순간",
      "호출앱 차량 번호와 실제 차량을 제대로 보지 못한 순간",
      "동행자와 떨어진 채 길찾기와 결제를 혼자 급하게 처리하는 순간"
    ],
    checks: [
      "숙소 주소, 결제 수단, 배터리를 먼저 확인한다.",
      "차량 번호와 목적지는 탑승 전 동행자와 함께 본다.",
      "막차가 애매하면 비용보다 안정적인 이동 수단을 먼저 고른다.",
      "위치 공유나 짧은 메시지를 보내고 이동을 시작한다."
    ],
    routeReading: "야간 이동 field note는 런던, 방콕, 로마 같은 도시 문서와 택시·호출앱 가이드에 반복적으로 연결됩니다. 지도에서는 야간 신호를 보고 이 문서로 기준을 보강합니다.",
    response: "야간에 문제가 생기면 논쟁이나 추적보다 밝은 장소로 이동해 동행자와 숙소에 현재 위치를 공유합니다. 결제 이상이 있으면 영수증, 앱 기록, 차량 정보, 시간을 남깁니다.",
    editorialNote: "야간 이동 문서는 특정 지역을 위험하다고 단정하지 않습니다. 피로와 배터리, 결제 수단처럼 사용자가 관리할 수 있는 조건을 우선합니다.",
    related: ["/field-notes/", "/guides/night-transport/", "/guides/taxi-app-check/", "/spots/london/oxford-street-phone-awareness/", "/spots/rome/termini-station/", "/cities/"]
  },
  {
    slug: "field-notes/when-to-leave-area",
    title: "자리를 옮길 때 field note - 트립마킹",
    h1: "불안할 때 사람을 판단하지 않고 위치를 바꾸는 기준",
    description: "해외여행 중 접근 제안, 가격이 모호한 대화, 길찾기 혼란, 과한 혼잡에서 자리를 옮기는 기준을 정리한 트립마킹 field note.",
    scope: "자리를 옮길 때",
    mapHref: "/?utm_source=field-note&utm_medium=internal&utm_campaign=leave-area",
    intro: "여행 중 불안할 때 중요한 것은 누군가를 단정하는 것이 아니라 내 위치와 다음 행동을 바꾸는 것입니다. 이 field note는 자리를 옮길 타이밍을 행동 기준으로 정리합니다.",
    context: "접근 제안이 길어지거나 가격과 목적지가 흐려질 때, 군중 가운데서 계속 검색하게 될 때, 동행자와 떨어질 때는 설명을 더 듣기보다 위치를 바꾸는 편이 낫습니다.",
    signals: [
      "가격, 목적지, 공식 여부가 명확하지 않은 대화가 길어지는 순간",
      "길찾기를 계속 다시 열지만 현재 위치가 안정적이지 않은 순간",
      "가방과 휴대폰을 동시에 확인하기 어려울 정도로 손이 복잡한 순간",
      "동행자와 신호가 맞지 않아 각자 다른 방향을 보는 순간"
    ],
    checks: [
      "사람을 평가하지 말고 먼저 밝고 넓은 가장자리로 이동한다.",
      "가격과 목적지가 모호하면 짧게 거절하고 공식 정보를 다시 본다.",
      "동행자와 만남 지점이나 다음 행동을 한 문장으로 맞춘다.",
      "이동 후에야 지도, 결제, 숙소 주소를 다시 확인한다."
    ],
    routeReading: "자리를 옮길 때 field note는 이스탄불, 방콕, 몽마르트르, 사그라다 파밀리아처럼 접근 제안이나 대기줄이 긴 장소에서 공통으로 쓰입니다.",
    response: "이미 결제나 분실 문제가 생겼다면 먼저 기록을 남기고, 다툼을 키우지 않는 쪽을 택합니다. 카드사, 앱 고객 지원, 현장 직원, 경찰 신고 등 실제 처리 기관으로 이어지는 순서를 확인합니다.",
    editorialNote: "이 문서는 특정 사람을 의심하라고 말하지 않습니다. 여행자가 불확실한 상황에서 자신의 위치와 정보 확인 순서를 회복하는 방법만 다룹니다.",
    related: ["/field-notes/", "/editorial-policy/", "/spots/istanbul/grand-bazaar-navigation/", "/spots/paris/montmartre-crowd/", "/guides/crowded-square/", "/guides/taxi-app-check/"]
  }
];

const pages = [...spotPages, ...fieldPages];

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

function pageKind(page) {
  return page.slug.startsWith("field-notes/") ? "field note" : "장소 상세";
}

function renderStructuredData(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripBrand(page.title),
    description: page.description,
    inLanguage: "ko-KR",
    datePublished: lastmod,
    dateModified: lastmod,
    author: { "@type": "Organization", name: "트립마킹 편집부" },
    publisher: { "@type": "Organization", name: "트립마킹", url: siteUrl },
    mainEntityOfPage: pageUrl(page),
    about: [page.scope, "해외여행 안전", "현장 판단"]
  };
}

function renderPage(page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const h1 = escapeHtml(page.h1);
  const canonical = pageUrl(page);
  const kind = pageKind(page);
  const screenshot = kind === "field note"
    ? "/assets/screenshots/tripmarking-marker-legend.png"
    : "/assets/screenshots/tripmarking-spot-detail.png";
  const screenshotAlt = kind === "field note"
    ? "트립마킹 지도에서 위험 유형별 마커를 확인하는 화면"
    : "트립마킹 장소 상세에서 현장 행동과 피해 직후 순서를 확인하는 화면";

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="article">
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
      <p>${escapeHtml(page.context)}</p>

      <div class="keyword-map">
        <strong>${escapeHtml(page.scope)} ${kind}를 읽는 기준</strong>
        <p>이 문서는 사건을 자극적으로 묘사하지 않습니다. 여행자가 현장에서 바로 바꿀 수 있는 위치, 손, 시선, 결제, 이동 순서를 기준으로 정리합니다.</p>
      </div>

      <figure class="static-shot">
        <img src="${screenshot}" alt="${screenshotAlt}">
        <figcaption>트립마킹은 지도에서 짧은 신호를 먼저 보여주고, 문서에서 그 신호를 실제 행동으로 풀어 씁니다. 장소 이름은 낙인이 아니라 여행자가 자신의 동선을 기억하기 위한 기준점입니다.</figcaption>
      </figure>

      <h2>먼저 볼 신호</h2>
      <p>${escapeHtml(page.scope)}에서 확인할 핵심은 사람을 특정하는 일이 아니라, 내 물건이 시야와 손에서 얼마나 떨어지는지입니다. 아래 장면이 겹치면 이동 전에 한 번 멈춰 확인합니다.</p>
      <ul>
${renderList(page.signals)}
      </ul>

      <h2>현장에서 바로 할 일</h2>
      <p>긴 준비보다 짧은 순서가 중요합니다. 다음 항목은 여행 중 실제로 걸음을 멈추고 10초 안에 확인할 수 있는 기준입니다.</p>
      <ol class="use-steps">
${page.checks.map((item) => `        <li>${escapeHtml(item)}</li>`).join("\n")}
      </ol>

      <h2>지도와 연결해서 보는 방식</h2>
      <p>${escapeHtml(page.routeReading)}</p>
      <p>현장에서는 지도 마커와 한 줄 주의를 먼저 보고, 이동 전이나 숙소에서는 이 문서를 읽어 자신의 동선에 맞는 행동을 정하면 됩니다. 같은 도시라도 환승, 사진, 결제, 야간 이동은 서로 다른 판단 기준을 씁니다.</p>

      <h2>문제가 생겼을 때</h2>
      <p>${escapeHtml(page.response)}</p>
      <p>추적이나 큰 소리의 항의보다 기록과 차단이 먼저입니다. 시간, 위치, 마지막 결제, 마지막으로 물건을 확인한 순간을 남기면 카드사 문의, 경찰 신고, 보험 접수에서 설명이 단순해집니다.</p>

      <div class="editor-note">
        <strong>편집 기준</strong>
        <p>${escapeHtml(page.editorialNote)}</p>
      </div>

      <h2>같이 보면 좋은 문서</h2>
      <div class="cluster-links">
        <ul>
${renderRelatedLinks(page)}
        </ul>
      </div>

      <p><a href="${page.mapHref}">트립마킹 지도에서 ${escapeHtml(page.scope)} 관련 신호 보기</a> · <a href="/field-notes/">현장 판단 기준</a> · <a href="/cities/">도시별 맥락</a> · <a href="/editorial-policy/">표현·검수 기준</a></p>
    </main>
  </body>
</html>
`;
}

function extractLinkFromItem(itemBlock) {
  const match = itemBlock.match(/<link>\s*([^<]+?)\s*<\/link>/i);
  return match ? match[1].trim() : "";
}

function renderFeedItem(page) {
  const link = pageUrl(page);
  return `    <item>
      <title>${escapeHtml(stripBrand(page.title))}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${buildDate}</pubDate>
      <description>${escapeHtml(page.description)}</description>
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
  const generatedBlocks = pages.map((page) => `  <url><loc>${pageUrl(page)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.74</priority></url>`);
  const next = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${existingBlocks.map((block) => `  ${block}`).join("\n")}\n${generatedBlocks.join("\n")}\n</urlset>\n`;
  await fs.writeFile(sitemapPath, next);
}

async function upsertFeed() {
  const feedPath = path.join(siteRoot, "feed.xml");
  const xml = await fs.readFile(feedPath, "utf8");
  const generatedLinks = new Set(pages.map(pageUrl));
  const existingItems = [...xml.matchAll(/\s*<item>[\s\S]*?<\/item>/g)]
    .map((match) => match[0].trim())
    .filter((itemBlock) => !generatedLinks.has(extractLinkFromItem(itemBlock)));
  const renderedItems = [
    ...pages.map(renderFeedItem),
    ...existingItems.map((block) => `    ${block}`)
  ].join("\n");
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>트립마킹</title>
    <link>${siteUrl}/</link>
    <description>한국인 여행자를 위한 해외여행 도난·스캠 주의 지도와 장소별 현장 판단 가이드.</description>
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

console.log(`Generated ${pages.length} Tripmarking spot and field note pages.`);
