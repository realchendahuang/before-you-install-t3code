# #12 · GDPR 시행 후 6시간의 새벽 긴급 패치: 시간당 220만 건 IP 로그와 망가진 계정 삭제

> 11월 24일 공식 EU GDPR 민원이 접수된 뒤, 6시간에 걸친 새벽 긴급 패치 과정에서 네 가지 더 깊은 프라이버시 문제가 뜻밖에 드러났다. 그 중심에는 **시간당 220만 건** 규모로 수집되어 30일간 보관된 IP 태그 Axiom span이 있다.

<!-- section:claim -->
## 무엇이 주장되었나

- `PR #42380`이 병합되고 3.5시간이 지난 뒤에도 `@theo`는 호출자 IP가 이미 제거되었다고 공개적으로 답변했다.
- 공식 문서(`docs/user/telemetry.md`)는 `agent.feedback` 보고가 익명이며 계정 삭제 시 사용자 데이터가 깔끔하게 제거된다고 약속했다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **시간당 220만 건 IP + User-Agent 릴레이 span (`PR #42380`):** Axiom으로 내보내진 모든 릴레이 요청 span은 약 **시간당 220만 건, 30일 보관** 규모였으며, `client.address`(`cf-connecting-ip`에서 가져온 실제 호출자 IP)와 `user_agent.original`을 `user.id`와 나란히 직접 기록했다(Cloudflare Workers 로그 1%는 별도로 남았다).
- **망가진 Clerk 계정 삭제 (`PR #42285` & `PR #42430`):** 이전에는 Clerk에서 사용자 계정을 삭제해도 PlanetScale 릴레이 행과 활성 Cloudflare 터널이 배후에서 계속 실행됐다. 실제 사용자의 프라이버시 삭제 요청이 들어온 뒤에야 엔지니어들이 **수작업 SQL 작성과 수동 터널 해체**를 해야 했다.
- **모바일 푸시 토큰 및 사용자 ID 유출 (`PR #42459` & `PR #41859`):** Android FCM 푸시 페이로드는 알림이 발생할 때마다 Clerk `user_id` 값을 평문으로 Google에 전송했다. iOS APNs span과 오류 로그는 푸시 토큰이 담긴 전체 기기 푸시 URL을 포착했다.
- **"익명" 피드백 배치 혼합 (`PR #42466`):** 익명이라고 알려진 `agent.feedback` 이벤트는 식별 가능한 `installId` 이벤트 및 전체 호스트 지문(OS, 아키텍처, 원시 WSL 배포판)과 정확히 동일한 HTTP POST 안에 함께 배치되어 `docs/user/telemetry.md`와 정면으로 모순됐다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **부분 패치:** 긴급 PR `#42380`, `#42285`, `#42430`, `#42459`, `#41859`, `#42466`이 새벽 GDPR 긴급 작업 중 병합됐다.
- **여전히 미해결:** `privacy-policy.astro`는 `2026-10-06` 이후 변경되지 않았고, 클로즈드 소스인 `ingest.t3.codes`는 독립적 감사 가능성 없이 원본 이벤트 사본을 보유하며, 과거 30일 Axiom 보관 기간은 영향받은 사용자에게 공식적으로 공개된 적이 없다.

<!-- section:visuals -->
## 시각 증거

![PR #42380에서 약 220만 건/시간 규모의 릴레이 span이 실제 호출자 IP와 User-Agent를 user.id 옆에 30일간 Axiom에 기록했음을 보여줌](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285에서 계정 삭제가 이전에 PlanetScale 행과 활성 Cloudflare 터널을 남겼음을 인정함](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459에서 Android FCM 푸시가 원시 Clerk user_id 값을 Google에 전송했음을 인정함](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466에서 익명 피드백이 installId 및 호스트 지문과 함께 배치되었음을 인정함](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (파트 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [심층 기술 보고서 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
