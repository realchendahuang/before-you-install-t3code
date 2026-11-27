# Temu3 Code — T3 Code 설치 전에

<p align="center">
  <em>pingdotgg/t3code에 관한 독립적이고 증거 중심의 공개 기록 — 인종적 이중 잣대, 기만적 텔레메트리, 중대한 보안 결함, 상업적 조작을 기록한다.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=ko"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=ko"><strong>✉ Tmail 수신함</strong></a> ·
  <a href="https://temu3code.com/?lang=ko#x-receipts"><strong>📸 원본 X 화면 12개</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=ko"><strong>🃏 밈 61개</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>영수증 109건</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>출처 327개</strong></a>
</p>

<p align="center">
  <strong>언어 (18개):</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md"><strong>한국어</strong></a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

> [!IMPORTANT]
> **독립 공개 기록 조사 · 18개 언어**
>
> 텔레메트리 없음. 인종 차별 없음. 아래의 모든 주장은 원문 그대로의 공개 발언, 저장소 커밋, 풀 리퀘스트, USPTO 제출 서류, 보관된 스크린샷에 근거한다.
>
> - **검증된 증거물:** 증거물 20건(#00–#19)
> - **1차 증거:** 시각 증빙 109건 · 표준 URL 327개
> - **업스트림 확인:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **보안 권고:** 게시된 GitHub 보안 권고 0건

<!-- origin-story:start -->
> [!TIP]
> **왜 "Temu3 Code"인가?**
>
> 2026년 11월 23일 — 중국 개발자의 무료 MIT 포크를 "Chinese knockoff"이라고 발언한 지 정확히 10분 만에, @theo가 X에서 우리의 브랜드명을 관대하게 기증했습니다: "Temu3 Code" (8.4만 조회수).
>
> USPTO 출원商标가 0개인 창업자가 무료로 선물을 준 브랜드 이름을 버리기엔 아깝죠. 그래서 temu3code.com을 등록하고 공개 감사를 옮겨 놓았으며, PostHog 텔레메트리는 제외했습니다. 무료 명명 상담, Theo, 감사합니다. (CC0 1.0 — 우리를 다시 포크하셔도 됩니다.) — [@theo의 이름 짓기 트윗 보기 ↗](https://x.com/theo/status/2124825920808829077)
<!-- origin-story:end -->
---

## 60초로 보는 사건 경과

한 커뮤니티 MIT 포크를 둘러싼 명칭 분쟁 하나가 인종적 이중 잣대, 숨겨진 텔레메트리, 조용한 보안 패치, 미수정 아키텍처 위험의 패턴을 드러냈다.

1. **차별의 발단** *(2026년 11월 23일)* — 한 사용자가 중국인 개발자가 공개한 무료 MIT 포크를 공식 T3 Code로 착각하자, @theo는 이를 “중국산 모조품”이자 “Temu3 Code”라고 부르며 GitHub 계정 정지까지 위협했다. 그러나 USPTO 상표권은 0건이었고, 11시간 뒤에는 MIT 코드를 복제하는 미국의 1조 달러 규모 연구소들을 공개적으로 환영했다.
2. **소스 코드를 열어 보다** *(2026년 11월 24일)* — pingdotgg/t3code를 한 줄씩 점검한 결과, 홈페이지의 “텔레메트리 없음” 약속 뒤편에서 기본 활성화된 PostHog 텔레메트리가 배포되고 있었고, ingest.t3.codes에서는 폐쇄 소스 방식으로 이벤트를 보존하고 있었으며, ~/.codex와 ~/.claude.json을 솔트 없이 SHA-256으로 읽고 있었다. 또한 41.6GB 규모의 가짜 SQLite 삭제, 52일간 조용히 이어진 git push --force 버그, Google Antigravity 헤더 위조, E2E 암호화가 전혀 없는 평문 T3 Connect가 확인됐다.
3. **조회수 226만 회 이상, EU GDPR 신고, 6시간의 긴급 수습** *(2026년 11월 24–25일 밤사이)* — 1부는 조회수 226만 회를 넘어서며 EU GDPR 신고를 촉발했다. 밤사이 긴급히 제출된 PR들은 시간당 220만 건의 IP 및 User-Agent 로그가 Axiom에 30일간 보관된다는 점, 절대 경로인 git.cwd 작업 공간 경로가 유출된다는 점, 계정 삭제 기능이 고장 났다는 점, Windows/macOS의 선택 해제가 무시된다는 점을 뜻하지 않게 드러냈다.
4. **오늘날까지 남은 문제** *(2026년 11월 25일(`ca81b7b9`) 및 진행 중)* — ca81b7b9까지 +259개 커밋을 추적한 결과 일부 텔레메트리 패치는 확인됐지만, 수정되지 않은 시작 ID 기록, UI 토글 부재, GitHub 보안 권고 0건, 고정되지 않은 임의 저장소 스타 기능, 평문으로 30일간 유지되는 --lan 셸 쿠키, 폐기할 수 없는 Bearer 토큰, 신뢰할 수 없는 저장소에서의 SSH_AUTH_SOCK 노출(#19)은 그대로였다.

---

## 검증된 증거물 20건 전체(#00–#19)

아래 각 증거물은 이 저장소에 있는 표가 없는 전용 현지화 증거물 파일과 웹 포털의 공유 가능한 시각 카드로 연결된다. 추적은 순차적으로 계속 이어질 예정이다(#20, #21, ...).

### 1부 · 인종 차별, 이중 잣대, 그리고 반복 패턴

*USPTO 상표 0건 상태에서 “중국산 모조품”, “Temu3 Code”라며 게시 중단을 요구한 위협에서 시작해, 1,151개 트윗의 정량 분석(0.0% VIP 욕설 vs. 8.0% 개발자 적대감 vs. 14.4% 반중 위기 급증)과 2년간 반복된 이력으로 이어진다.*

- **#00 · [원조 논쟁: "Steal Our Code", 포크 명명 협박, 그리고 인종적 이중 기준](../../cases/ko/00-origin-fork-dispute-and-double-standard.md)** — `📌 공개 기록`
  11분 만에 @theo는 중국인 개발자의 무료 MIT 포크를 "Chinese knockoff"이자 "Temu3 Code"라고 낙인찍고 GitHub 계정 정지까지 위협했다. 그러고는 11시간이 채 지나기 전에, MIT 코드를 베끼는 조 단위 미국 기업들을 공개적으로 환영했다.
  [증거물 전체 보기](../../cases/ko/00-origin-fork-dispute-and-double-standard.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [1,151개 트윗 정량 데이터셋: 선택적 공손함과 4.0배 반중 위기 급증](../../cases/ko/14-1151-tweet-quantitative-double-standard.md)** — `📌 공개 기록`
  2026년 11월 7일부터 24일까지 연속 게시된 `@theo`의 X 게시물 1,151건을 전수 정량 분석한 결과, 극명한 권력 비대칭이 입증됐다. 빅테크 임원 20명과 연구소 직원에 대한 비속어 사용률은 **0.0%**인 반면, 일반 개발자에 대한 적대감은 **8.0%**였으며, 25시간짜리 중국 포크 분쟁 기간에는 **4.0배** 급증해 **14.4%**를 기록했다.
  [증거물 전체 보기](../../cases/ko/14-1151-tweet-quantitative-double-standard.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [GitHub 차단 협박 뒤에 숨은 USPTO 상표 등록 0건 & 17시간 만에 소급 추가된 `TRADEMARK.md`](../../cases/ko/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 공개 기록`
  @theo가 "상표권 침해"를 이유로 GitHub에 중국인 개발자의 계정 삭제를 요청하겠다고 협박했을 당시, T3 Tools Inc.는 `T3 Code`, `T3 Tools`, `T3 Connect`에 대해 USPTO 등록을 0건 보유하고 있었으며, 그로부터 17시간 뒤 `TRADEMARK.md`를 소급해 병합했다.
  [증거물 전체 보기](../../cases/ko/15-zero-uspto-trademarks-and-retroactive-policy.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [2년에 걸친 역사적 패턴: 국적 기반 공격, 2만 달러 FFmpeg 현상금, 그리고 삭제된 위협](../../cases/ko/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 공개 기록`
  2026년 11월 중국계 포크 사태는 일회성 실수가 아니었다. 2024년부터 2026년까지의 공개 기록은 국적을 겨냥한 괴롭힘, 오픈소스 불링, 다른 개발자의 UI 조롱, 그리고 반발이 일자 게시물을 삭제하는 순환이 반복되었음을 보여준다.
  [증거물 전체 보기](../../cases/ko/16-two-year-pattern-of-bullying-and-deletions.md) · [대화형 카드](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125408843152953693)

### 2부 · 기만적 텔레메트리와 프라이버시 침해

*“텔레메트리 없음. 끝.”이라는 문구가 어떻게 기본 PostHog 업로드, ingest.t3.codes의 폐쇄 소스 보존, 도구 간 자격 증명 해싱, Managed Policy 사각지대, 시간당 220만 건의 IP가 태그된 Axiom 로그를 감췄는지 보여준다.*

- **#01 · ["텔레메트리 없음" 홈페이지 약속 뒤에 숨은 기본 텔레메트리](../../cases/ko/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 부분 패치`
  홈페이지가 "No telemetry. Unless you opt in. Full stop."이라고 약속하고 있는 동안, T3 Code는 기본값으로 PostHog 추적을 켜 두었고, 원본 사본을 폐쇄 소스인 `ingest.t3.codes`를 거쳐 전송했으며, 외부 `~/.codex` 및 `~/.claude.json` 자격 증명을 해시 처리했고, 커뮤니티가 제출한 옵트아웃 PR 네 건을 거부했다.
  [증거물 전체 보기](../../cases/ko/01-default-telemetry-and-cross-tool-tracking.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [관리형 정책의 모순: 문서로 확인된 네 가지 텔레메트리 사각지대](../../cases/ko/07-managed-policy-blind-spots.md)** — `🔴 미수정`
  @theo는 T3 Code가 "best corporate managed policy system"을 갖추고 있어 "trivial to turn off all telemetry"하다고 주장했다 — 그러나 이는 T3 Code 자체의 `docs/user/telemetry.md`와 `docs/user/managed-policy.md`에 의해 정면으로 반박된다.
  [증거물 전체 보기](../../cases/ko/07-managed-policy-blind-spots.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [11월 25일 해명, 2시간 만에 심야 PR과 100 MB 덤프로 뒤집히다](../../cases/ko/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 부분 패치`
  11월 25일 아침, @theo는 포괄적인 프라이버시 보증 세 가지를 내놓고 100 MB 텔레메트리 덤프를 공개했다. 그러나 세 가지 주장 모두 두 시간 안에 그의 팀이 올린 PR과 gzip으로 압축된 덤프 그 자체에 의해 반박됐다.
  [증거물 전체 보기](../../cases/ko/11-nov25-clarification-contradicted-in-2-hours.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [GDPR 시행 후 6시간의 새벽 긴급 패치: 시간당 220만 건 IP 로그와 망가진 계정 삭제](../../cases/ko/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 부분 패치`
  11월 24일 공식 EU GDPR 민원이 접수된 뒤, 6시간에 걸친 새벽 긴급 패치 과정에서 네 가지 더 깊은 프라이버시 문제가 뜻밖에 드러났다. 그 중심에는 **시간당 220만 건** 규모로 수집되어 30일간 보관된 IP 태그 Axiom span이 있다.
  [증거물 전체 보기](../../cases/ko/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125395501663281198)

### 3부 · 제품 결함과 중대한 보안 결함

*41.6GB 규모의 가짜 SQLite 삭제, 5초마다 OS 프로세스를 스캔하는 동작, 52일간 조용히 이어진 git push --force, 3분 정지 사태를 부른 Google Antigravity ToS 위조, E2E 암호화가 전혀 없는 평문 T3 Connect, GitHub 보안 권고 0건, ca81b7b9의 LAN/Bearer/SSH_AUTH_SOCK 취약점이 드러났다.*

- **#02 · [가짜 SQLite 스레드 삭제(41.6 GB 비대화) & 5초마다 전체 OS 프로세스 스캔](../../cases/ko/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 부분 패치`
  "영구 삭제"를 클릭해도 전체 대화 기록이 `statev2.sqlite` 안에 그대로 남아 로컬 디스크를 41.6 GB까지 부풀렸고, 백그라운드 Rust 모니터는 거부 수단 없이 5초마다 모든 OS 프로세스와 전체 명령줄을 스캔했다.
  [증거물 전체 보기](../../cases/ko/02-fake-sqlite-delete-and-process-scanner.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52일간 침묵한 `git push --force` vs. 모델 프라이버시 필터를 제거하는 데 걸린 21시간](../../cases/ko/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 미수정`
  52일이 넘도록 T3 Code는 Claude Auto 모드가 아무런 확인 없이 `git push --force origin main`을 조용히 승인하는 버그를 열어둔 채 방치했다. 반면 프라이빗 모델이 @theo의 공개 리더보드에 노출되도록 만든 프라이버시 화이트리스트를 제거하는 데는 고작 21시간밖에 걸리지 않았다.
  [증거물 전체 보기](../../cases/ko/03-silent-force-push-vs-21h-filter-removal.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity 헤더 위조, 가짜 `SSH_CONNECTION`, 그리고 3분 만의 계정 차단](../../cases/ko/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 미수정`
  FAQ에서 ToS 준수를 보장했음에도, T3 Code는 OS 키링 자격 증명을 추출하고, `v1internal`을 상대로 Google 내부 헤더(`antigravity/hub/2.24.0`)를 위조하며, 가짜 `SSH_CONNECTION` 값을 주입한다 — 개인 Google 구독을 빠른 차단 위험에 노출시키면서.
  [증거물 전체 보기](../../cases/ko/04-antigravity-spoofing-and-3-minute-bans.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: 종단간 암호화 제로 & 평문 TLS 종단 게이트웨이](../../cases/ko/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 미수정`
  T3 Connect를 거쳐 오가는 모든 프롬프트, 소스 파일, 터미널 스트림은 T3가 통제하는 인프라 내부에서 평문으로 종단된다. 종단간 암호화는 전무하고, 기기 승인은 기본값이 꺼져 있다.
  [증거물 전체 보기](../../cases/ko/05-t3-connect-zero-e2e-plaintext-relay.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [GitHub 보안 공지 0건, 고위험 패치의 조용한 처리, 그리고 급조된 `SECURITY.md`](../../cases/ko/13-zero-security-advisories-and-silent-patches.md)** — `🔴 미수정`
  X에서 중국 소스 코드 감사자들을 무시하던 T3 Code는 고위험 취약점 수정 — 비밀 저장소 경로 순회, 교차 도메인 토큰 유출, 신뢰할 수 없는 저장소의 명령 실행 — 을 조용히 병합하면서, 게시된 GitHub 보안 공지는 0건으로 유지했다.
  [증거물 전체 보기](../../cases/ko/13-zero-security-advisories-and-silent-patches.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` 인증·저장소 실행 긴급 감사: 30일간 평문으로 흐르는 LAN 셸, 취소 불가 토큰, 그리고 `SSH_AUTH_SOCK` 노출](../../cases/ko/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 미수정`
  최신 `main` HEAD(`ca81b7b9`, 11월 25일 14:49 CST)를 한 줄씩 검증한 결과, 현재 활동 중인 보안·신뢰성 결함 다섯 가지가 확인됐다: `Origin` 부재 시 우회되는 30일 평문 `--lan` 셸 쿠키, 취소 불가능한 30일 Bearer 토큰, 재사용 가능한 `?wsTicket=` URL, `::1` 터널을 무력화하는 `isIPv4`, 그리고 상속된 `SSH_AUTH_SOCK`·`GITHUB_TOKEN`으로 훅과 서브모듈을 실행하는 신뢰할 수 없는 저장소.
  [증거물 전체 보기](../../cases/ko/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125494234614788390)

### 4부 · 상업적 조작과 커뮤니티 괴롭힘

*일일 80만 달러 이상·31.7조 토큰 규모를 보여주는 컴퓨팅 레이더, 엔젤 투자자 이해충돌(Vibe Kanban, Daytona), 후원사 구성의 중첩, 30초 유휴 상태에서 호스트 자격 증명을 스타 처리해 7만 7,000개 스타를 견인한 정황, @bot의 포크 스크래핑, .github/VOUCHED.td 차단까지 드러났다.*

- **#06 · [엔젤 투자자 이해충돌: Vibe Kanban 셧다운 조롱과 Daytona 중복 투자](../../cases/ko/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 공개 기록`
  코드 결함을 넘어서, @theo의 공개 X 게시물들은 경쟁 개발자 스타트업에 대한 그의 엔젤 투자자 역할과 T3 Code 운영 사이의 첨예한 이해충돌을 기록해 둔다.
  [증거물 전체 보기](../../cases/ko/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [$800,000+ 비즈니스 장부와 31.7조 토큰 일일 컴퓨트 레이더](../../cases/ko/08-800k-spend-and-31t-token-radar.md)** — `📌 공개 기록`
  기본 활성화된 텔레메트리는 엔지니어링상의 실수가 아니었다. 그것은 실시간 31.7조 토큰/일($10.19M/일 상당 API 지출) 규모의 정보 레이더에 자금을 대주었고, 그 대가로 $300k+ 상당의 무료 OpenAI 얼리 액세스 토큰과 투자자 접촉을 얻었다.
  [증거물 전체 보기](../../cases/ko/08-800k-spend-and-31t-token-radar.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [내부의 `yolo merges` vs. 외부의 커뮤니티 적대감 & `.github/VOUCHED.td` 차단](../../cases/ko/09-yolo-merges-vs-community-hostility.md)** — `📌 공개 기록`
  내부적으로 T3 Code는 자동화된 에이전트 루프를 통해 하루 500커밋을 배포했고 "yolo merges breaking shit"을 인정했다 — 반면 외부적으로는 기여자들에게 "here's my advice: Don't"라고 말하고, `.github/VOUCHED.td`를 통해 사용자들을 규탄했으며, 이슈 제보자들을 모욕했다.
  [증거물 전체 보기](../../cases/ko/09-yolo-merges-vs-community-hostility.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [공개 `@bot` 포크 스크래핑, 경쟁자 조롱, 비판자 수익 창출 차단](../../cases/ko/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 공개 기록`
  경쟁자들이 UI 패턴을 베꼈다고 조롱하면서도, @theo는 한 개발자의 포크에 공개적으로 "Okay I'm stealing this"라고 답하고 30초 뒤 `@bot`을 투입해 그녀의 코드를 긁어갔으며, 자동 차단 봇을 운용하고 팔로워들에게 비판자들의 수익 창출을 막으라고 촉구했다.
  [증거물 전체 보기](../../cases/ko/10-fork-scraping-bot-and-critics-suppression.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [스폰서 스택 결속, Codex 0% 쿼터 악용, 그리고 10개 계정 `CLIProxyAPI`의 위선](../../cases/ko/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 공개 기록`
  준법을 내세우며 계정 정지 위험을 이유로 내장 계정 전환 기능을 거부해 온 T3 Code가 정작 자사 클라우드 스택에는 @theo의 YouTube 스폰서(Clerk와 Axiom)를 그대로 박아 넣었다. 한편 @theo는 Codex의 0% 쿼터 버그를 악용했다고 자랑했고, T3의 FAQ에서 곧바로 링크되는 10개 계정 `CLIProxyAPI` 풀링 Gist까지 공개했다.
  [증거물 전체 보기](../../cases/ko/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [대화형 카드](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [7만 7천 스타 퍼널: 30초 유휴 시 호스트 자격증명으로 스타 누르기 & 고쳐지지 않은 임의 리포지토리 버그](../../cases/ko/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 미수정`
  GitHub 스타를 "to trick VCs into investing" 수단이라고 규정한 지 6개월 후, @theo는 앱 내에서 30초 유휴 시 호스트 GitHub 자격증명으로 `PUT user/starred/...` 를 호출하는 토스트를 직접 머지해 스타를 3만 개에서 7만 7천 개(워처 약 129명)까지 끌어올렸고, 임의 리포지토리 스타 버그는 고치지 않은 채 남겨두었다.
  [증거물 전체 보기](../../cases/ko/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [대화형 카드](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=ko) · [원본 X 게시물](https://x.com/realchendahuang/status/2125416210120765799)

---

## 주요 시각 증빙

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## 2분 보안 강화 및 정리 절차

T3 Code가 이미 설치되어 있다면 환경 변수만 믿지 말라 — AnalyticsService.ts:156은 선택 해제 여부를 확인하기 전에 로컬 ID를 기록하고, DesktopShellEnvironment.ts는 OTEL_SDK_DISABLED를 누락한다. 환경 플래그, OS hosts 차단, 오프라인 SQLite 압축, 토큰 폐기를 함께 적용하라.

- [ ] DO_NOT_TRACK=1과 레거시 텔레메트리 비활성화 스위치를 설정하고, /etc/hosts에서 ingest.t3.codes를 싱크홀 처리하라.
- [ ] T3 Code를 종료하고 statev2.sqlite를 점검한 뒤 오프라인에서 VACUUM;을 실행하거나 ~/.t3를 완전히 삭제하라.
- [ ] 한 번뿐인 이의 제기 기회를 지키려면 T3가 관리하는 디렉터리로 개인 Google AI / Antigravity 계정을 실행하지 말라.
- [ ] “Publish agent activity”를 비활성화하고, T3 Connect 머신 연결을 해제하고, Clerk + relay 삭제를 요청하고, T3 Code의 GitHub OAuth 앱 권한을 취소하라.
- [ ] 평문 t3 up --lan을 TLS 없이 노출하지 말고, CI에서 DPoP가 적용되지 않은 30일짜리 Bearer 토큰을 피하며, 신뢰할 수 없는 저장소를 열기 전에 SSH_AUTH_SOCK / GITHUB_TOKEN을 제거하라.

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**커뮤니티 권장 대안:** 개발자들은 Mirasim(@Mirasim_ADE), Paseo(@paseo_sh), Paradev(@ParadevAI), Cloudroom, Conductor, Emdash, Orca를 언급했다. 어떤 클라이언트든 도입하기 전에 기본값이 꺼진 텔레메트리, 실제 로컬 삭제, 헤더 위조 없는 공식 CLI 위임, 클라이언트 측 E2E 암호화를 확인하라.

---

## 커뮤니티 제보와 독립 논평

번호가 매겨진 증거물 20건(#00–#19)은 공개적으로 검증 가능한 코드, 풀 리퀘스트, 공식 제출 서류, 보관된 공개 게시물만을 엄격히 담는다. 커뮤니티 제보와 비공개 메시지 관련 의혹은 증거의 명료성을 위해 이곳에서 분리해 둔다.

- **이슈 #1 · “테오에 대한 사건”(@opserx)** — 2026년 11월 25일 이 저장소에 제출된 커뮤니티 논평의 원문 보관본이며, PR #42450과 PR #41237에 관한 1차 출처 정밀 주석을 함께 제시한다. ([보관된 이슈 #1 읽기](../community/issue-1-the-case-against-theo.md))
- **비공개 메시지 제보 및 계속되는 제출** — 여러 개발자가 @theo와 T3 Code에 관한 경험을 비공개로 전해 왔다. 엄격한 검증 기준을 지키기 위해 비공개 제보는 공개 자료로 독립적으로 교차 확인되지 않는 한 1차 증거물 #00–#19 기록과 분리해 둔다. 검증 가능한 발견이나 업스트림 수정 확인 내용은 풀 리퀘스트 또는 GitHub 이슈로 제출해 달라. ([제출 및 검증 정책](../../CONTRIBUTING.md))

---

## 심층 기술 문서 및 마스터 색인

줄 단위 소스 코드 차이, 원문 SQL, 전체 상호 참조 목록을 보려면 보존된 참조 아카이브를 살펴보라:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [시각 증빙 109건 (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [1차 출처 327건 (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### 지속적 추적과 기여

이 저장소는 활발히 유지된다. 사실 정정, 커밋/PR 증거가 첨부된 새 업스트림 수정 병합, 새로운 1차 증거는 풀 리퀘스트 또는 GitHub 이슈로 환영한다 — CONTRIBUTING.md를 참고하라.
