# 세이프루트

한국인 해외여행자를 위한 도난·스캠 주의 지도형 웹앱입니다.

## Local

```powershell
python -m http.server 4197 --directory site --bind 127.0.0.1
```

## Cloudflare Pages

Build command: 없음
Output directory: `site`

## 공유 제보 API

Cloudflare Pages Functions가 `/api/reports`를 제공합니다. Cloudflare Pages 프로젝트에 D1 바인딩 `REPORTS_DB`를 연결하고 `migrations/0001_reports.sql`을 적용하면, 선택형 위험 제보가 다른 사용자 지도에도 짧은 주기로 반영됩니다.
## Feedback API

`/api/feedback` stores quick bug reports, questions, and suggestions in the same D1 binding (`REPORTS_DB`). Apply `migrations/0002_feedback.sql` after the reports migration.