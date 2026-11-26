# #11 · 11월 25일 해명, 2시간 만에 심야 PR과 100 MB 덤프로 뒤집히다

> 11월 25일 아침, @theo는 포괄적인 프라이버시 보증 세 가지를 내놓고 100 MB 텔레메트리 덤프를 공개했다. 그러나 세 가지 주장 모두 두 시간 안에 그의 팀이 올린 PR과 gzip으로 압축된 덤프 그 자체에 의해 반박됐다.

<!-- section:claim -->
## 무엇을 주장했나

11월 25일 아침 해명 글([`2125332390239494211`](https://x.com/theo/status/2125332390239494211))과 후속 답글([`2125370330244128924`](https://x.com/theo/status/2125370330244128924))에서 `@theo`는 사용자들에게 이렇게 장담했다.
- T3 Code는 *"never collected file paths."*
- 환경 변수는 *"always disabled telemetry cleanly."*
- 옵트아웃한 설치본은 로컬 추적 파일을 전혀 기록하지 않으며, Claude 소유자 해시는 *"broken."* 상태였다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **모순 1 — `git.cwd` 절대 워크스페이스 경로 유출 (`PR #42450`):** 게시물이 올라온 지 약 90분 뒤, 핵심 메인테이너 Julius는 [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450)을 병합했다. 여기서 그는 릴레이로 전달된 웹훅 실행이 전체 실행 스팬(execution span)을 Axiom으로 내보냈음을 인정했다. 여기에는 `git.cwd`(**전체 절대 워크스페이스 경로, OS 사용자 이름, 저장소 이름**)를 담은 Git 스팬도 포함됐다.
- **모순 2 — Windows와 macOS의 옵트아웃 오작동 (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376)은 Windows 데스크톱이 이미 실행 중이던 프로세스에서 시작될 때 저장된 `T3CODE_TELEMETRY_ENABLED=false` 사용자 환경 변수를 무시했음을 인정했다. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464)는 macOS·Linux에서 첫 실행 시 릴레이 트레이싱이 셸 탐색보다 먼저 초기화되어, 세션 내내 `~/.zshrc`의 옵트아웃을 무시했음을 인정했다.
- **모순 3 — 무조건적인 디스크 쓰기와 `events.clean.jsonl`에 남은 264건의 활성 Claude 레코드:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152)(`ca81b7b9` 기준 `line 156`)는 여전히 시작 시 `getTelemetryIdentity`를 무조건 호출해, `telemetryEnabled`를 확인하기 전에 로컬 설치 UUID(`upsertAnonymousId`)를 기록한다. 한편 `@theo`가 공개한 내보내기 파일(압축 기준 `6,056,594` 바이트, `95,789`개 이벤트)의 gzip 헤더에는 게시 20분 전에 생성된 원본 파일명 `events.clean.jsonl`이 찍혀 있었고, 그 안에는 여전히 **264건의 활성 Claude 소유자 레코드**가 들어 있었다. 이 레코드들은 **4대의 서로 다른 머신**(`installId`)을 하나의 SHA-256 해시로 엮고 있었고, 사설 프록시 모델명(`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`)도 그대로 담고 있었다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **부분 패치됨:** `PR #42450`, `PR #42376`, `PR #42464`가 심야에 병합됐다.
- **여전히 미해결:** `AnalyticsService.ts:156`은 여전히 옵트아웃 여부를 확인하기 전에 로컬 익명 ID를 무조건 기록하며, `DesktopShellEnvironment.ts`는 여전히 `T3CODE_OTEL_SDK_DISABLED`와 `OTEL_SDK_DISABLED` 전달을 빠뜨리고 있다.

<!-- section:visuals -->
## 시각 증거

![릴레이로 트리거된 실행이 git.cwd 절대 워크스페이스 경로를 Axiom으로 내보냈음을 인정하는 PR #42450](../../evidence/06-pr42450-absolute-path.jpg)

![Windows 데스크톱이 저장된 T3CODE_TELEMETRY_ENABLED=false 환경 변수를 무시했음을 인정하는 PR #42376](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![macOS 첫 실행 시 릴레이 트레이싱이 ~/.zshrc 옵트아웃을 무시했음을 인정하는 PR #42464](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![events.clean.jsonl 포렌식 감사에서 4대의 머신과 사설 프록시 모델 ID를 연결하는 264건의 Claude 레코드가 드러난 화면](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` 11월 25일 해명 (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [후속 답글 (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [공개 gzip 덤프](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [심층 기술 보고서 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
