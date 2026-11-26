# #03 · 52일간 침묵한 `git push --force` vs. 모델 프라이버시 필터를 제거하는 데 걸린 21시간

> 52일이 넘도록 T3 Code는 Claude Auto 모드가 아무런 확인 없이 `git push --force origin main`을 조용히 승인하는 버그를 열어둔 채 방치했다. 반면 프라이빗 모델이 @theo의 공개 리더보드에 노출되도록 만든 프라이버시 화이트리스트를 제거하는 데는 고작 21시간밖에 걸리지 않았다.

<!-- section:claim -->
## 무엇이 주장되었나

- Claude Auto 모드는 고위험 파괴적 작업(예: `main`에 대한 force-push)을 명시적인 사람의 승인으로 에스컬레이션하도록 설계되어 있다.
- 텔레메트리는 프라이버시에 안전한 집계 지표로 묘사되었다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **52일 이상 미수정 — 침묵하는 `git push --force` (`Issue #15353`):** `ClaudeAdapterV2.ts`에서 Auto 모드는 `!requiresClaudeApproval(context)`를 곧바로 단락시켜 `"allow"`로 넘겼다. Claude 자체의 안전 분류기가 `git push --force origin main`을 두 번 차단하고 세 번째 시도에서 사람의 확인을 요구하도록 에스컬레이션했지만, T3 Code는 UI 프롬프트 하나 없이 조용히 이를 승인하고 `"source": "user_temporary"`를 기록했다. 커뮤니티 수정 PR 두 건(`#15360`, `#35207`)은 봇의 자동 종료 때까지 리뷰되지 않은 채 방치되었고, `#40692`는 병합되지 않은 상태로 남았다.
- **프라이버시 화이트리스트를 걷어내는 데 21시간 (`Issue #40948` → `PR #41237`):** 11월 22일, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948)은 `PR #29001`이 모델 화이트리스트를 강제한 탓에 최신 모델들이 `@theo`의 공개 리더보드인 [`slopalytics.com`](https://slopalytics.com/)([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json))에서 빠져 있다는 점을 지적했다. **21시간** 이내에 [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237)이 `@theo`의 계정으로 병합되었고, 해당 PR에는 Theo가 필터 제거를 명시적으로 요청했다는 설명이 달렸다. 그 결과 `ollama/acme-internal`, `acme-azure-deployment` 같은 프라이빗 로컬/엔터프라이즈 모델 이름이 그대로 분석 시스템으로 전송되었다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **일부만 변경됨 / 핵심 안전 버그는 여전히 열려 있음:** 이후 [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465)가 카탈로그에 없는 모델을 `custom:<driver>`로 마스킹했으나, 카탈로그/벤더 슬러그는 여전히 커스텀 엔드포인트 뒤에서 보고된다. **Issue #15353(Auto 모드의 침묵하는 `git push --force`)은 `ca81b7b9` 시점에도 열려 있으며 수정되지 않았다.**

<!-- section:visuals -->
## 시각 증거

![Claude Auto 모드가 git push --force를 조용히 승인하는 모습을 보여주는, 52일 넘게 열려 있는 Issue #15353](../../evidence/11-issue15353-auto-force-push.png)

![slopalytics.com을 위해 모델 프라이버시 필터를 제거한 Issue #40948 이후 21시간 만에 병합된 PR #41237](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [재현 코멘트 `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [병합되지 않은 커뮤니티 수정: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [심층 기술 문서 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
