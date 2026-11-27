# #01 · "텔레메트리 없음" 홈페이지 약속 뒤에 숨은 기본 텔레메트리

> 홈페이지가 "No telemetry. Unless you opt in. Full stop."이라고 약속하고 있는 동안, T3 Code는 기본값으로 PostHog 추적을 켜 두었고, 원본 사본을 폐쇄 소스인 `ingest.t3.codes`를 거쳐 전송했으며, 외부 `~/.codex` 및 `~/.claude.json` 자격 증명을 해시 처리했고, 커뮤니티가 제출한 옵트아웃 PR 네 건을 거부했다.

<!-- section:claim -->
## 무엇을 주장했는가

- T3 Code 홈페이지는 *"No telemetry / Unless you opt in. Full stop."*이라는 문구를 눈에 띄게 내걸었다.
- 대외적으로는 프라이버시를 우선하는 오픈소스 로컬 AI 코딩 클라이언트로 소개되었다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **"텔레메트리 없음" 서약 아래 출시된 기본 추적 (`PR #174` → `3bdaa6e1`):** 2026년 3월 6일, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174)는 동의 대화상자도, 설정 UI 토글도, 텔레메트리 문서도 없이 PostHog 분석을 기본값으로 켰다. 석 달이 넘게 지난 6월 18일, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)는 리디자인 과정에서 *"No telemetry"* 홈페이지 약속을 사용자 공지 없이 조용히 삭제했다.
- **폐쇄 소스 자체 보관 (`PR #15028`):** 2026년 10월, 텔레메트리 전송 묶음(`FLUSH_INTERVAL_MS = 10_000`)은 T3의 폐쇄 소스 엔드포인트 [`https://ingest.t3.codes/`](https://ingest.t3.codes/)를 거치도록 바뀌었다. `AnalyticsService.ts` 1번째 줄은 서버가 모든 이벤트의 원본 사본을 보관한 뒤 PostHog로 전달한다는 점을 확인해 준다.
- **교차 도구 자격 증명 읽기 및 솔트 없는 SHA-256 (`PR #21506`):** 기준 리비전 `9d3195b4`의 `Identify.ts`는 `~/.codex/auth.json`(OpenAI의 `user_id` JWT 클레임을 디코딩)과 `~/.claude.json`(`oauthAccount.accountUuid`)을 T3 Connect 사용자 ID와 함께 읽어 들이고, 솔트 없는 SHA-256 다이제스트(`telemetryId.ts`)를 계산해 서로 다른 기기를 한 사람에게 연결했다. T3는 평문 Clerk ID를 보유하므로, 솔트 없는 다이제스트는 결정적으로 역산된다.
- **세분화된 사용 기록:** `ProviderUsageAnalytics.ts`와 `FeatureUsage.ts`는 프로바이더, 사용자 정의 모델, 추론 강도, 권한 모드, 토큰 수, 프로젝트/스레드 수, OS/WSL 메타데이터, 그리고 **35가지 개별 UI/명령 동작**을 보고했다.
- **커뮤니티 옵트아웃 PR 네 건 거부:** 6월 23일, 메인테이너 Julius는 [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397)을 `not planned`로 닫으며 말했다. *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123)은 아무 설명 없이 닫혔고, 커뮤니티가 제출한 옵트아웃 PR 네 건(`#13458`, `#16763`, `#21248`, `#27077` — 147개 테스트 통과, 봇 승인)은 `unwanted`로 거부되었다.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **부분 패치:** 대중적 폭로(조회수 226만 회 이상) 이후, [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299)가 `~/.codex/auth.json` 및 `~/.claude.json` 읽기를 제거했고, [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465)는 카탈로그에 없는 모델을 `custom:<driver>`로 마스킹했으며, [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630)과 [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629)는 CI 및 `DO_NOT_TRACK` 옵트아웃을 추가했다.
- **여전히 미해결:** `AnalyticsService.ts:156`은 옵트아웃 여부를 확인하기 전에 여전히 로컬 설치 ID를 디스크에 기록한다. `DesktopShellEnvironment.ts`는 여전히 `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED` 전달을 누락하고 있다. `ingest.t3.codes`는 폐쇄 소스로 남아 있고, 설정 UI 토글은 하나도 존재하지 않는다.

<!-- section:visuals -->
## 시각 증거

![Commit 3bdaa6e1이 "No telemetry / Unless you opt in. Full stop." 홈페이지 약속을 조용히 삭제하는 모습](../../evidence/02-no-telemetry-removed.png)

![Identify.ts가 솔트 없는 SHA-256 교차 기기 귀속을 위해 ~/.codex/auth.json과 ~/.claude.json을 읽는 모습](../../evidence/03-identify-codex-claude.png)

![Issue #1397이 not planned로 닫힌 기록: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![147개 테스트를 통과했음에도 PR #27077이 unwanted로 거부된 모습](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## 1차 출처

- [최초 X 조사 스레드 (Part 1 · 조회수 226만 회 이상)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [감사 이후 PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [심층 기술 문서 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
