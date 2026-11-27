# #02 · 가짜 SQLite 스레드 삭제(41.6 GB 비대화) & 5초마다 전체 OS 프로세스 스캔

> "영구 삭제"를 클릭해도 전체 대화 기록이 `statev2.sqlite` 안에 그대로 남아 로컬 디스크를 41.6 GB까지 부풀렸고, 백그라운드 Rust 모니터는 거부 수단 없이 5초마다 모든 OS 프로세스와 전체 명령줄을 스캔했다.

<!-- section:claim -->
## 무엇이 주장되었나

- 사이드바 삭제 확인 대화상자(`useThreadActionMenu.ts`)는 사용자에게 분명히 이렇게 알렸다: *"This permanently clears conversation history for this thread."*
- T3 Code는 깔끔하고 빠른 로컬 코딩 워크스페이스로 마케팅되었다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **가짜 영구 삭제 (`Issue #17845`, `#28903`):** 기준 커밋 `9d3195b4`에서 스레드를 삭제하면 `"thread.deleted"` 이벤트를 `statev2.sqlite`에 덧붙일 뿐, 이전 메시지와 도구 출력, 추론 흔적은 디스크에 그대로 남겼다. 사용자들은 `statev2.sqlite`가 3주 만에 **25.9 GB**(스레드의 90%가 "삭제됨"), 6주 만에 **41.6 GB**, 7주 만에 **33 GB**로 불어났다고 기록했다.
- **전체 머신 프로세스 및 명령줄 스캔 (`Issue #11222`, `PR #41889`):** 백그라운드 헬퍼 `t3-resource-monitor`(`native/resource-monitor/src/main.rs`)는 진단 기능이 닫혀 있어도 5초마다 `ProcessesToUpdate::All`과 `with_cmd(UpdateKind::Always)`를 실행했고, Windows에서 무관한 440개 이상의 앱·게임에 걸쳐 280~300개의 핸들을 상시 유지했다. 11월 24일, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889)는 진단 기능이 **전체 프로세스 명령줄**(흔히 평문 API 키, 데이터베이스 비밀번호, 토큰을 담고 있는)을 스냅샷과 텔레메트리로 수집했음을 확인했다.
- **기업 호스트명 유출 & 강제 시작 fetch:** 프런트엔드 파비콘 요청이 내부 호스트명(예: `devbox.localdomain`)을 Google 파비콘 서비스로 유출했고(`PR #16950`, `PR #32657`), 서버 시작 시에는 거부 수단 없이 `raw.githubusercontent.com`에서 호환성 매니페스트를 무조건 가져왔다(`Issue #36479`).
- **심각한 할당량 소진 & 전력 버그:** Agent SDK로 Claude를 구동하면 5시간 할당량이 평소보다 **1.7배** 빠르게 소진되었고(`Issue #7338`, `Issue #24649`, 댓글 81개), GPU 회귀 문제로 비교 가능한 Electron 대비 최대 **136배** 전력을 끌어와 MacBook GPU를 **60W**(배터리 78분 소진)로 고정했으며, 웹 탭을 닫은 뒤에도 **18W**를 유지했다(`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **부분 패치됨:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119)가 비동기 `thread-content.purge`를 추가해 `#17845`를 닫았고, [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577)은 Windows 프로세스 모니터 읽기 범위를 좁혔다.
- **여전히 열려 있음:** 삭제된 원본 스레드는 라이브 포크가 참조하거나 `merge_back` 대기 중이거나 라이브 서브에이전트가 붙어 있는 동안 여전히 기록을 보존한다. 툼스톤 행은 SQLite에 남아 있고 디스크 공간 회수에는 여전히 오프라인 `VACUUM`이 필요하다. Linux와 macOS는 `ProcessesToUpdate::All` 탐색을 유지하며 `PR #41889`도 열려 있다.

<!-- section:visuals -->
## 시각 증거

![영구 삭제된 스레드가 statev2.sqlite를 수십 기가바이트로 부풀린다는 것을 기록한 Issue #17845](../../evidence/10-issue17845-fake-delete.png)

![t3-resource-monitor가 5초마다 모든 OS 프로세스를 스캔한다는 것을 기록한 Issue #11222](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [심층 기술 문서 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
