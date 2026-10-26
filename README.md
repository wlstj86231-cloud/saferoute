# 농기계 탁송 견적 비교

중고 농기계를 옮기기 전에 기계 제원과 상하차 조건으로 표준 견적 요청서를 만들고, 받은 탁송 견적을 같은 항목으로 비교하는 정적 웹 도구입니다. 운영: 제이 미디어(J MEDIA).

- `/`: 홈
- `/agri/machinery-transport-plan/`: 견적 요청서 만들기 (`site/assets/quote-request-20261026b.js`)
- `/agri/quote-compare/`: 업체별 견적 비교표 (`site/assets/quote-compare-20261026b.js`)
- `/agri/`: 운송 안내 모음, `/agri/guides/*`: 적재 기준·기종별 준비·상하차 방법·운송 안전·견적서 읽는 법·파손·분실
- `/about/`·`/contact/`·`/editorial/`·`/corrections/`·`/privacy/`·`/terms/`·`/sources/`: 운영자 정보와 신뢰 페이지 (수정 기록은 `/corrections/`에 날짜와 함께 남깁니다)
- 이전 해외여행 지도(`/travel/`, `/cities/`, `/guides/`, `/guide/`, `/spots/`, `/field-notes/`)는 2026-10-26 종료했고 `functions/_middleware.js`가 410 안내를 돌려줍니다.

도구 스크립트와 `site.css`는 `/assets/*` 1년 캐시 대상이므로 내용을 바꾸면 파일명 또는 `?v=` 값을 올리고 `site/sw.js`의 `CACHE_NAME`도 함께 바꿉니다.

## Local

```powershell
python -m http.server 4197 --directory site --bind 127.0.0.1
```

정적 서버는 미들웨어(리디렉션·410)를 실행하지 않습니다. e2e 테스트(`npm run test:e2e`)는 미들웨어가 동작하는 서버를 `SITE_URL`(기본 `http://127.0.0.1:4198`)로 지정해 실행합니다.

## Checks

- `npm run validate`: 스크립트 문법, 미들웨어 동작, 검증 메타 태그, 사이트맵·내부 링크·출처 표기 점검
- `npm run site:indexes`: `site/sitemap.xml`, `site/feed.xml` 재생성

## Cloudflare Pages

Build command: 없음
Output directory: `site`
