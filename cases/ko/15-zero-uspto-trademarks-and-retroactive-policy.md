# #15 · GitHub 차단 협박 뒤에 숨은 USPTO 상표 등록 0건 & 17시간 만에 소급 추가된 `TRADEMARK.md`

> @theo가 "상표권 침해"를 이유로 GitHub에 중국인 개발자의 계정 삭제를 요청하겠다고 협박했을 당시, T3 Tools Inc.는 `T3 Code`, `T3 Tools`, `T3 Connect`에 대해 USPTO 등록을 0건 보유하고 있었으며, 그로부터 17시간 뒤 `TRADEMARK.md`를 소급해 병합했다.

<!-- section:claim -->
## 무엇이 주장되었나

- 11월 23일, `@theo`는 MIT 포크 작성자를 상표권 침해로 몰아세우며 GitHub 계정 삭제를 위협했다 ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- `TRADEMARK.md`를 병합하기 3시간 전, 그는 의문을 제기한 개발자들에게 *"get a better lawyer"* 라고 말했다 ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)). 그런 그가 2024년 9월에는 *"unenforceable trademark dispute"* 를 이유로 WordPress를 조롱한 바 있다 ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## 증거가 보여주는 것

- **T3 상표에 대한 USPTO 등록 0건:** `@vildanden_ai`의 제보([`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555))를 따라 USPTO TSDR을 직접 확인한 결과, `T3 Code`, `T3 Tools`, `T3 Connect`에 대한 등록은 **0건**이다. T3 Tools Inc.의 유일한 USPTO 출원(`PING LABS`, 출원번호 [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243))은 2025년 2월 거절되었고 2025년 5월 19일 `ABANDONED`로 표시되었다. 한편 무관한 제3자들이 Class 9와 42에서 유효한 `T3` 소프트웨어/SaaS 등록을 보유하고 있다 (`EquipmentShare`, 등록번호 `7795672` / 출원번호 [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, 등록번호 `3324707`).
- **GitHub 상표 정책 요건:** [GitHub의 상표 정책](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)에 따르면, 상업적 상표 삭제 요청에는 위증 처벌을 감수한 연방 또는 국제 등록번호가 필요하다. `@theo`가 `@DDdxx666`의 계정 삭제를 위협한 시점에 그는 GitHub의 양식을 끝까지 작성할 수 없었다.
- **17시간 뒤 소급된 `TRADEMARK.md` (`PR #41898`):** **11월 24일 12:21 CST** — 차단 협박으로부터 17시간 뒤 — `@theo`는 [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898)을 병합해 *"whether registered or unregistered"* 라는 권리를 주장하는 `TRADEMARK.md`를 추가했고, 94초 뒤 X에서 이를 근거로 인용했다 ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **공개 기록:** 소급된 `TRADEMARK.md`는 여전히 `main`에 남아 있고, USPTO TSDR 기록은 계속해서 `T3 Code`에 대한 T3 Tools Inc.의 등록이 0건임을 보여준다.

<!-- section:visuals -->
## 시각 자료

![차단 협박 17시간 뒤 병합되어 TRADEMARK.md를 소급 추가한 PR #41898](../../evidence/24-pr41898-trademark-aftermath.png)

!["whether registered or unregistered"라는 독점권을 주장하는 TRADEMARK.md](../../evidence/extra/p1-2b-trademark-md.png)

![TRADEMARK.md를 병합하기 3시간 전, Theo가 개발자들에게 "get a better lawyer"라고 말하는 장면](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub 상표 정책](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [94초 뒤의 소급 인용 (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [WordPress 조롱 (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [심층 기술 문서 05](../../docs/dossiers/05-governance-trademark-and-history.md)
