# #13 · GitHub 보안 공지 0건, 고위험 패치의 조용한 처리, 그리고 급조된 `SECURITY.md`

> X에서 중국 소스 코드 감사자들을 무시하던 T3 Code는 고위험 취약점 수정 — 비밀 저장소 경로 순회, 교차 도메인 토큰 유출, 신뢰할 수 없는 저장소의 명령 실행 — 을 조용히 병합하면서, 게시된 GitHub 보안 공지는 0건으로 유지했다.

<!-- section:claim -->
## 주장된 내용

- 11월 24일, `@theo`는 X에서 중국어 기술 감사 자료를 *"the biggest fucking cesspit"* 라며 일축하고, 이를 읽는 개발자들을 모욕했다 ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- 급조된 `SECURITY.md` 개정(`PR #38812`, `PR #41942`)은 광범위한 호스트 접근과 비암호화 전송을 용인되는 의도된 경계로 규정했다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **게시된 보안 공지 0건 (`0`):** `ca81b7b9` 기준, `pingdotgg/t3code`의 [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) 페이지에는 게시된 공지가 **0건** — 기존 데스크톱/서버 사용자에게 공식 CVE 경고나 업그레이드 권고가 전혀 제공되지 않았다.
- **고위험 취약점이 조용히 수정됨:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): 기기 승인 이전 릴레이 `jti`/`nonce`를 통한 `ServerSecretStore` 경로 순회.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): 교차 도메인 엔터프라이즈 GitHub/GitLab 토큰 유출.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) & [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): 샌드박스 미적용 데스크톱 브라우저 프리뷰 격리 및 워크트리 레이아웃 명령 확인.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): 소유자 전용 데스크톱 Clerk 토큰 파일 권한.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): 신뢰할 수 없는 저장소 설정의 명령을 실행하기 전 확인 프롬프트를 마침내 추가한 약 3,000줄 패치 (앞서의 조용한 수정 `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`과 함께).
- **미해결 로컬 보안 결함:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489)(외부 경로 순회/심볼릭 링크)와 [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997)(Windows `externalLauncher.ts`가 `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`를 실행, AVG/Avast가 `IDP.HELU.PSE96`으로 탐지)은 여전히 병합되지 않았다.
- **`SECURITY.md`는 아키텍처 강화 대신 책임 범위를 축소:** 워크스페이스 밖의 OS 전역 `filesystem:read`, iOS/LAN의 평문 HTTP 전송, 릴레이 서명 키가 탈취될 경우 호스트 머신 전체 장악을 *의도된 설계 경계*로 명시했다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **여전히 미해결:** 게시된 GitHub 보안 공지는 **0건**; `Issue #26489`와 `PR #30997`은 미수정 상태; `SECURITY.md`는 OS 전역 읽기와 평문 HTTP를 계속 의도된 동작으로 분류하고 있다.

<!-- section:visuals -->
## 시각 증거

![PR #39483, 보안 공지 게시 없이 ServerSecretStore 경로 순회를 조용히 수정](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997, 백신이 탐지한 Windows Base64 PowerShell 실행에 대한 미병합 수정](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md, OS 전역 읽기, iOS 평문 HTTP, 릴레이 키를 통한 머신 장악을 의도된 경계로 분류](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 published)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
