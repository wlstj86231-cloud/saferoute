# Content and ad placement structure

Since 2026-10-26 the site is only "농기계 탁송 견적 비교" (farm machinery transport quotes). The former overseas travel theft/scam map and all of its city, spot, guide and field-note pages were retired; `functions/_middleware.js` answers 410 for those paths. Do not regenerate or re-add travel content.

## Publishable content

- Tools: `/agri/machinery-transport-plan/`, `/agri/quote-compare/`
- Hub: `/agri/`
- Guides: `/agri/guides/*` (적재 기준, 기종별 준비, 상하차 방법, 운송 안전 점검표, 견적서 읽는 법, 파손·분실) — facts only from 국가법령정보센터 law text, 한국교통안전공단, 농촌진흥청/농사로, 한국농업기술진흥원, 한국소비자원, each linked with a check date.
- Trust pages: `/about/`, `/contact/`, `/editorial/`, `/corrections/` (정정 정책과 수정 기록 — add a dated entry for every change that alters meaning), `/privacy/`, `/terms/`, `/sources/`.

Every content page needs a canonical URL, a unique title/description, a `.page-meta` line (작성·관리: 제이 미디어 편집팀 (운영 책임: 대표 이정우), real 게시일 = first publish, 최종 확인일 = date the sources were actually re-checked, 출처 N건 matching the list), a `SOURCE_NOTE_START/END` block with an `ol.source-list` (title · institution · 확인일), a `scope-note` section titled 범위와 한계, three or more internal links, and an entry in `site/sitemap.xml` and `site/feed.xml` (`npm run site:indexes`). Every page carries the operator footer (제이 미디어 · 대표 이정우 · 사업자등록번호 · 고객센터) and every indexable page the `google-adsense-account` meta and the JSON-LD Organization node `https://jnewmedia.com/#organization`; `npm run validate` checks all of this. Never invent authors, reviewers, experience or testimonials.

## Ad placement

No page currently loads the AdSense script; ownership is shown by the `google-adsense-account` meta on every indexable page and `/ads.txt`. Whether the guides under `/agri/guides/` should carry ads is an owner decision. Ads must stay off:

- `/`, `/about/`, `/editorial/`, `/corrections/`, `/privacy/`, `/terms/`, `/contact/`, `/sources/`
- the tools and hub: `/agri/`, `/agri/machinery-transport-plan/`, `/agri/quote-compare/`
- the 404 page and the 410 retirement notice

`npm run content:inventory` fails on ad scripts on blocked pages and reports pages without ads as warnings.
