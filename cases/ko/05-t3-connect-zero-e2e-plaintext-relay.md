# #05 · T3 Connect: 종단간 암호화 제로 & 평문 TLS 종단 게이트웨이

> T3 Connect를 거쳐 오가는 모든 프롬프트, 소스 파일, 터미널 스트림은 T3가 통제하는 인프라 내부에서 평문으로 종단된다. 종단간 암호화는 전무하고, 기기 승인은 기본값이 꺼져 있다.

<!-- section:claim -->
## 무엇을 주장했나

- 11월 24일, `@theo`는 대화 데이터가 *"lives on your machine. It never touches any of our servers"*라고 밝혔다 ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)(`effectiveDate="2026-10-06"`)는 종단간 암호화가 없다는 사실을 밝히지 않은 채 *"encrypted network transport"*를 약속한다.

<!-- section:evidence -->
## 증거가 보여주는 것

- **T3 릴레이 내부의 평문 노출 (`ManagedEndpointProvider.ts`):** T3 Connect는 T3 자신의 Cloudflare 계정 안에 Cloudflare Tunnel을 프로비저닝한다(`docs/internals/06_t3-connect.md`). 전송 구간 TLS는 Cloudflare 엣지에서 종단되며 클라이언트 간 페이로드 암호화는 전혀 없다. 즉 Cloudflare Workers Route를 하나 붙이기만 하면 모든 프롬프트, 파일, 터미널 스트림이 평문으로 드러난다.
- **범위 밖이라며 거부된 E2E 암호화 (`Issue #32098`):** 개발자들이 상호 인증과 종단간 암호화를 요청했을 때, 한 메인테이너는 변경 범위가 너무 크다는 이유로 [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926)을 닫아버렸다. Discussions `#21286`과 `#37831`은 답변 없이 방치됐다. 11월 25일, `@theo`는 종단간 암호화가 불가능하다고 선언했다([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **T3가 운영하는 OVH Caddy 게이트웨이로의 이전 (`PR #32945`):** Cloudflare Tunnel 청구서가 **월 $25,000**에 달하자, `@theo`는 T3가 임차한 OVH Hillsboro 서버(`gw.t3coderelay.com`)로 옮기기 위해 [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945)를 열었다. 이 환경에서 T3 자체 Caddy 인스턴스가 TLS를 종단하고 평문을 Unix 소켓을 통해 Go `yamux` 프록시로 전달한다. 여전히 E2E 암호화는 없다.
- **기본값이 꺼진 기기 승인 (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval`은 여전히 [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)에서 `false`가 기본값이다(`lines 1424–1426`). `SECURITY.md`가 인정하듯, 클라우드 계정이 탈취되거나 릴레이 서명 키가 유출되면 셸에 준하는 호스트 접근 권한이 그대로 넘어간다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **여전히 미해결:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311)이 로그인 알림 기능을 추가했지만, **T3 Connect에는 여전히 종단간 암호화가 전무**하고 `requireConnectDeviceApproval`은 기본값 `false`로 남아 있으며, `privacy-policy.astro`는 `2026-10-06` 이후 한 줄도 바뀌지 않았다.

<!-- section:visuals -->
## 시각 자료

![클라우드 계정이나 릴레이 키가 탈취되면 E2E 암호화 없이도 연결된 기기를 제어할 수 있음을 확인해 주는 Issue #32098](../../evidence/15-connect-no-e2e.jpg)

![T3 Connect를 Caddy가 TLS를 종단하는 자체 호스팅 OVH 게이트웨이로 옮기는 PR #32945](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![T3 자신의 계정 안에 Cloudflare Tunnel을 프로비저닝하는 ManagedEndpointProvider.ts](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## 1차 출처

- [원본 X 조사 (Part 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 코멘트](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [심층 기술 보고서 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
