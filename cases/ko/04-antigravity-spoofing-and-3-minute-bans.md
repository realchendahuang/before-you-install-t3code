# #04 · Google Antigravity 헤더 위조, 가짜 `SSH_CONNECTION`, 그리고 3분 만의 계정 차단

> FAQ에서 ToS 준수를 보장했음에도, T3 Code는 OS 키링 자격 증명을 추출하고, `v1internal`을 상대로 Google 내부 헤더(`antigravity/hub/2.24.0`)를 위조하며, 가짜 `SSH_CONNECTION` 값을 주입한다 — 개인 Google 구독을 빠른 차단 위험에 노출시키면서.

<!-- section:claim -->
## 무엇이 주장되었나

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription)는 유료 구독자들에게 이렇게 장담했다: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- 차단당한 사용자들이 [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713)을 제기하자, 한 메인테이너는 Antigravity 백엔드에 접근하거나 토큰을 재사용한 적이 없다고 부인했고, X에서는 `@theo`가 제3자 프록시 탓으로 돌렸다 (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## 증거가 보여주는 것

- **OS 자격 증명 추출과 `v1internal` 호출 위조:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)는 로컬 파일, `@napi-rs/keyring`, 또는 Windows Credential Manager(`advapi32.dll`에 대한 `ffi-rs` 경유 `CredReadW`)에서 Google OAuth 토큰을 추출하고, `antigravity/hub/2.24.0`을 하드코딩한 뒤 Google의 비공개 `v1internal` 엔드포인트로 직접 `POST`를 보낸다. Google 관계자는 [공식 포럼](https://discuss.ai.google.dev/t/185992)에서 [Google Antigravity ToS](https://antigravity.google/terms) 제6조가 제3자 도구가 자격 증명을 추출하거나 재사용해 백엔드 엔드포인트를 직접 조회하는 것을 금지한다고 확인했다.
- **`SSH_CONNECTION` 위조와 계정 간 누출:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)은 위조된 `SSH_CONNECTION` 환경 변수(`"127.0.0.1 0 127.0.0.1 0"`)를 주입해, Google CLI가 OS 키체인 격리를 벗어나 평문 파일을 사용하도록 속인다. Google이 11월 24일 CLI를 업데이트했을 때, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973)은 계정 A의 프롬프트가 계정 B로 조용히 라우팅되었음을 확인했다.
- **신규 $20 계정이 3분 만에 차단됨 (`Issue #41536`):** 프록시를 전혀 쓰지 않고 T3가 관리하는 Antigravity만 사용한, 완전히 새 $20 Google AI 구독이 설정 후 3분 만에 첫 메시지에서 차단되었다. 메인테이너들은 사용자 경고를 전혀 추가하지 않은 채 이 이슈를 중복으로 닫았다.
- **네이티브 클라이언트 및 CLIProxyAPI 위조:** `@theo`는 `"zed"`로 위장하는 [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876)을 직접 병합했고, 병합된 [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800)은 [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) 허브 폴링을 위조된 `claude-code/2.1.273`, `grok-cli/1.0.77`, `antigravityUserAgent` 헤더로 연결했다.

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **여전히 유효:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210)은 Google의 `403 PERMISSION_DENIED`(`VALIDATION_REQUIRED`) 계정 인증 링크를 표시하기 위해 [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts)를 추가했는데 — 이는 Google의 단속이 실제로 작동 중임을 확인해 준다 — 네 가지 위조 및 토큰 추출 경로는 모두 그대로 살아 있다.

<!-- section:visuals -->
## 시각적 증거

![antigravityUsageLimits.ts가 위조된 Google 헤더를 하드코딩하고 v1internal을 호출하는 모습](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts가 OS 키체인 저장소를 우회하기 위해 SSH_CONNECTION을 위조하는 모습](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536: 프록시 없는 신규 $20 계정이 3분 만에 차단된 사례 기록](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800: 위조된 CLIProxyAPI 허브 폴링을 T3 Code에 네이티브로 연결](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## 1차 출처

- [X 원문 조사 (파트 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ의 ToS 보장](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google 개발자 포럼](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [심층 기술 문서 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
