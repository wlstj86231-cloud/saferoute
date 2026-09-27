# 트립마킹

농기계 이동 현장 조건을 기록하고 받은 탁송 견적의 비용 항목을 비교하는 웹 도구입니다. 기존 해외여행 주의 지도는 `/travel/`에서 보존합니다.

- 홈 `/`: 농기계 이동 서비스와 판단 범위
- `/agri/machinery-transport-plan/`: 기계·현장 문의용 메모
- `/agri/quote-compare/`: 사용자가 입력한 견적 항목 비교
- `/travel/`: 기존 여행 안전 지도

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
