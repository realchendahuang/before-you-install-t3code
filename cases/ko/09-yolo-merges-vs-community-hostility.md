# #09 · 내부의 `yolo merges` vs. 외부의 커뮤니티 적대감 & `.github/VOUCHED.td` 차단

> 내부적으로 T3 Code는 자동화된 에이전트 루프를 통해 하루 500커밋을 배포했고 "yolo merges breaking shit"을 인정했다 — 반면 외부적으로는 기여자들에게 "here's my advice: Don't"라고 말하고, `.github/VOUCHED.td`를 통해 사용자들을 규탄했으며, 이슈 제보자들을 모욕했다.

<!-- section:claim -->
## 무엇이 주장되었나

- T3 Code는 엔지니어가 엔지니어를 위해 만든, 빠르게 움직이며 커뮤니티를 포용하는 오픈소스 프로젝트로 자신을 마케팅한다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **무모한 내부 병합 속도:** `@theo`는 공개적으로 하루 **500커밋**을 배포했다고 설명했으며 ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), **700개의 동시 에이전트**를 운영하고, 자동화된 에이전트 루프를 통해 커뮤니티 PR을 일괄 병합했으며, *"my yolo merges breaking shit sometimes"*라고 인정했고 ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)), 기기 초기화 위험을 *"free content"*에 비유해 농담했다 ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **적대적 거버넌스 & 공개 규탄 차단:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md)는 *"here's my advice: Don't"*로 시작했으며, [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) 규탄 자동 차단과 거부된 커뮤니티 PR 전반의 **174개의 `unwanted` 라벨**이 이를 뒷받침한다.
- **일방적 기능 제거 & 사용자 모욕:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551)은 Build/Plan 토글을 묻었고 (*"Reality check for those upset"*, 반대 10표), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190)은 컨텍스트 사용량 링을 숨겼으며 (반대 16표, 저장소 내 최고), [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131)은 자기모순적인 AI 요약과 함께 Plan 모드를 통째로 삭제했다. [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545)에서 `@theo`는 사용자 `@bermudi`에게 *"uninstall our software"*라고 말하고 그를 *"ungrateful prick"*이라고 불렀다 — 그리고 다음 날 아침 그의 후속 [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572)를 거부했다.
- **X에서의 팔로워 게이트키핑:** 기여자들은 `@theo`를 팔로우하지 않는다고 꾸중을 들었고 ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), `/btw`를 제거하겠다는 협박을 받았으며 ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)), 주석을 단 스크린샷이 PR을 제출하는 것보다 낫다는 말을 들었다 ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## 업스트림 상태 (`ca81b7b9`)

- **여전히 유효:** `CONTRIBUTING.md`와 `.github/VOUCHED.td`는 `ca81b7b9`의 `main`에 여전히 남아 있다.

<!-- section:visuals -->
## 시각적 증거

![CONTRIBUTING.md가 외부 PR을 만류하고 .github/VOUCHED.td의 공개 규탄 차단을 문서화하는 모습](../../evidence/22-contributing-vouched-ban.png)

![Issue #33639에서 Theo가 사용자에게 소프트웨어를 삭제하라고 말하고 그를 ungrateful prick이라고 부르는 답변](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo가 "my yolo merges breaking shit sometimes"라고 인정하는 모습](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 댓글](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [하루 500커밋 (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [기기 초기화 = "free content" (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [심층 기술 문서 05](../../docs/dossiers/05-governance-trademark-and-history.md)
