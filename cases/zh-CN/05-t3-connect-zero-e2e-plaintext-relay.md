# #05 · T3 Connect 零端到端加密：所有提示词、源码与终端明文经过 T3 自有网关

> 通过 T3 Connect 远程连电脑时，没有任何端到端加密——所有对话、源代码与终端输出都在 T3 控制的 Cloudflare 或 OVH Caddy 网关上明文终结，且新设备审批默认关闭。

<!-- section:claim -->
## 官方 / Theo 宣称

- 11 月 24 日，`@theo` 公开宣称用户的对话数据 *"lives on your machine. It never touches any of our servers"*（只留在你电脑上，从不经过我们任何服务器，[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)）。
- 官网 [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)（`effectiveDate="2026-10-06"`）仅笼统宣称 *"encrypted network transport"*，从未披露缺乏端到端加密。

<!-- section:evidence -->
## 源码与公开记录铁证

- **T3 自有 Cloudflare 账号明文终结（`ManagedEndpointProvider.ts`）：** T3 Connect 在 T3 自己的 Cloudflare 账号下创建 Cloudflare Tunnel（`docs/internals/06_t3-connect.md`），仅具备客户端到 Cloudflare 边缘节点的普通 TLS，无客户端到客户端的载荷加密。只要在边缘挂一条 Workers Route，全部对话与代码流量在技术上随时明文可见。
- **明确拒绝端到端加密（`Issue #32098`）：** 社区提交 [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) 请求双向认证与端到端加密时，维护者以改动太大直接关闭；讨论 `#21286` 与 `#37831` 无人回复；11 月 25 日 `@theo` 直接宣称端到端加密“不可能做到”（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）。
- **迁往自租 OVH Caddy 明文网关（`PR #32945`）：** 当 Cloudflare Tunnel 月账单飙到 **25,000 美元** 后，`@theo` 提交 [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) 迁往 T3 自租的 OVH Hillsboro 网关（`gw.t3coderelay.com`），由 T3 自己的 Caddy 终结 TLS 后再经 Unix socket 明文转发给 Go `yamux` 代理——依旧零端到端加密。
- **新设备审批默认关闭（`PR #36419`、`settings.ts`）：** [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)（第 1424–1426 行）中 `requireConnectDeviceApproval` 至今默认为 `false`。正如 `SECURITY.md` 自己承认：一旦云端账号或中继签名密钥泄露，攻击者将获得等同宿主机 shell 的完全控制权。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **仍未修复：** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) 仅增加了新设备登录提醒，**T3 Connect 至今零端到端加密**，`requireConnectDeviceApproval` 默认值仍为 `false`，`privacy-policy.astro` 仍停留在 `2026-10-06` 未做更新。

<!-- section:visuals -->
## 一手实证原图

![Issue #32098 中维护者承认云端账号或中继密钥失守可控制关联主机，但仍不做端到端加密](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 提及月付 2.5 万美元 Cloudflare 账单并迁往自建 OVH Caddy TLS 终结网关](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts 在 T3 自有 Cloudflare 账号下配置隧道与域名](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 5 弹）](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 评论](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [深度技术卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
