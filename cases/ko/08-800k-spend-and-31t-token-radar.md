# #08 · $800,000+ 비즈니스 장부와 31.7조 토큰 일일 컴퓨트 레이더

> 기본 활성화된 텔레메트리는 엔지니어링상의 실수가 아니었다. 그것은 실시간 31.7조 토큰/일($10.19M/일 상당 API 지출) 규모의 정보 레이더에 자금을 대주었고, 그 대가로 $300k+ 상당의 무료 OpenAI 얼리 액세스 토큰과 투자자 접촉을 얻었다.

<!-- section:claim -->
## 무엇이 주장되었나

- T3 Code는 순수한 열정으로 만든 무료 MIT 오픈소스 도구로 포장되었고, 텔레메트리는 *"know how many users we have."*를 확인하기 위한 기초적인 집계일 뿐이라고 옹호되었다.
- `@theo`는 또한 DeepMind의 `@PatrickToulme`가 T3 Code에 *"many PRs"*를 반영했다고 주장했다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **$800k+ 지출과 유료 제품으로부터의 완전한 이탈:** 11월 7일부터 24일까지 이어진 **연속 1,151개 X 게시물** 전체에서 `@theo`는 T3 Code를 **162회(14.1%)** 언급한 반면, 기존 유료 제품(`T3 Chat`, `UploadThing`, `ping.gg`)은 **0회** 언급했다. 동시에 무료 클라이언트에 **$800k+**를 자기 돈으로 지출했다고 공개적으로 확인했다 ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)).
- **31.7조 토큰/일($10.19M/일) 분석 레이더:** 폐쇄 소스 `ingest.t3.codes`를 통해 보관된 원시 이벤트는 **31.7조 토큰/일**(11월 18일 기준 **$10.19M/일** 상당 API 지출, 최고치 **약 $10.2M/일**)과 세밀한 연구소별 점유율 분할(`99%` 구독 기반, Codex/Claude/Antigravity 전반 `~98.5%`, 오픈 웨이트 비중은 `15%`에서 `6%`로 하락)을 추적하는 내부 대시보드를 구동했다. 11월 23일 한 댓글 작성자가 시장 점유율을 추측하자, `@theo`는 자신의 분석 데이터에 접근할 수 없다며 그를 조롱했다 ([`2124682906132181482`](https://x.com/theo/status/2124682906132181482)).
- **사용자 텔레메트리를 연구소 혜택과 VC 레버리지로 전환:** `@theo`는 GPT-6.2 Astra 벤치마크에 **$300k+ 상당의 무제한 무료 OpenAI 얼리 액세스 토큰**을 태웠다고 공개적으로 밝혔고 ([`2122760447103484410`](https://x.com/theo/status/2122760447103484410)), Google 베어메탈 벤치마크를 돌렸으며, 투자자들의 접촉을 받고 있다고 언급했다 (*"multiple investors have asked me about this"*, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).
- **과장된 연구소 협업:** `patrick-toulme`로 필터링한 Git 커밋 이력에는 정확히 **1개의 커밋**([`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158))만 나타난다. *"many PRs"*가 아니다.

<!-- section:status -->
## 업스트림 상태 (`ca81b7b9`)

- **공개 기록 / 현행 비즈니스 모델:** `ingest.t3.codes`는 `ca81b7b9`에서도 여전히 폐쇄 소스이며 기본 활성화 상태로, 동일한 자체 분석 파이프라인에 계속 데이터를 공급하고 있다.

<!-- section:visuals -->
## 시각 증거

![31.7조 토큰과 $10.19M 일일 상당 API 지출을 보여주는 Theo의 내부 T3 Code 대시보드](../../evidence/17-theo-31t-tokens-10m-day.png)

![T3 Code에 $800k+를 지출했다고 밝히는 Theo](../../evidence/extra/p6-1-x-theo-800k-cost.png)

!["many PRs"가 아니라 patrick-toulme의 커밋이 1개(#31158)뿐임을 보여주는 Git 커밋 로그](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (8편)](https://x.com/realchendahuang/status/2125392410763239723)
- [$800k+ 지출 (`2120729779511124267`)](https://x.com/theo/status/2120729779511124267) · [31.7T / $10.19M 대시보드 (`2122860770329608290`)](https://x.com/theo/status/2122860770329608290) · [연구소별 점유율 분할 (`2123965784888377541`)](https://x.com/theo/status/2123965784888377541)
- [분석 데이터 조롱 (`2124682906132181482`)](https://x.com/theo/status/2124682906132181482) · [$300k+ OpenAI 토큰 (`2122760447103484410`)](https://x.com/theo/status/2122760447103484410) · [투자자 문의 (`2123885732330885417`)](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [Deep Technical Dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
