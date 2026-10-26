# Content and ad placement structure

Since 2026-10-26 the site is only "농기계 탁송 견적 비교" (farm machinery transport quotes). The former overseas travel theft/scam map and all of its city, spot, guide and field-note pages were retired; `functions/_middleware.js` answers 410 for those paths. Do not regenerate or re-add travel content.

## Publishable content

- Tools: `/agri/machinery-transport-plan/`, `/agri/quote-compare/`
- Hub: `/agri/`
- Guides: `/agri/guides/*` — facts only from 국가법령정보센터 law text, 한국교통안전공단, 농촌진흥청, each linked with a check date.

Every content page needs a canonical URL, a unique title/description, a `SOURCE_NOTE_START/END` block with at least one direct official source, three or more internal links, and an entry in `site/sitemap.xml` and `site/feed.xml` (`npm run site:indexes`).

## Ad placement

No page currently loads the AdSense script. Whether the guides under `/agri/guides/` should carry ads is an owner decision. Ads must stay off:

- `/`, `/about/`, `/editorial/`, `/privacy/`, `/terms/`, `/contact/`, `/sources/`
- the tools and hub: `/agri/`, `/agri/machinery-transport-plan/`, `/agri/quote-compare/`
- the 404 page and the 410 retirement notice

`npm run content:inventory` fails on ad scripts on blocked pages and reports pages without ads as warnings.
