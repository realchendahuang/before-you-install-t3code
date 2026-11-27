# #12 · 欧盟 GDPR 举报后 6 小时通宵自爆：每小时 220 万条 IP 日志与删号不删库

> 11 月 24 日晚有人向欧盟提起正式 GDPR 举报后，团队在 6 小时内通宵合入的一连串急救补丁，反手把藏得更深的四笔隐私旧账抖了个底朝天——其中仅 Axiom 一项就曾每小时记录 220 万条真实 IP 与 UA，保存整整 30 天。

<!-- section:claim -->
## 官方 / Theo 宣称

- 哪怕在 `PR #42380` 合入三个半小时后，`@theo` 仍在评论区回复称 IP 地址早就脱敏移除了。
- 官方文档（`docs/user/telemetry.md`）承诺 `agent.feedback` 属于匿名反馈，且删除账号会彻底清退云端数据。

<!-- section:evidence -->
## 源码与公开记录铁证

- **每小时 220 万条真实 IP + UA 绑定 `user.id` 留存 30 天（`PR #42380`）：** 中继服务此前把每条请求链路导出给第三方日志平台 Axiom——规模约 **每小时 220 万条、保存 30 天**——直接在 `user.id` 旁边记录 `client.address`（取自 `cf-connecting-ip` 的真实调用方 IP）与 `user_agent.original`（Cloudflare 1% Workers 日志另计）。
- **删除账号不删库、不关隧道（`PR #42285`、`PR #42430`）：** 用户在 Clerk 注销账号后，PlanetScale 数据库里的中继记录与活跃 Cloudflare 隧道根本不会自动清除——直到收到真实的隐私删除请求，工程师才被迫**手写 SQL 删库并手动拆除隧道**。
- **移动端推送明文泄露 `user_id` 与令牌（`PR #42459`、`PR #41859`）：** Android FCM 推送每次都把明文 Clerk `user_id` 直接发给 Google；iOS APNs 请求链路与错误日志则直接记录包含设备推送令牌的完整 URL。
- **所谓“匿名反馈”与宿主机指纹混包发送（`PR #42466`）：** 宣称匿名的 `agent.feedback` 事件，实际与带 `installId` 的具名事件及完整主机指纹（系统、架构、原始 WSL 发行版）塞在同一个 HTTP POST 里发出，直接违背 `docs/user/telemetry.md` 承诺。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **部分修补：** 急救补丁 `#42380`、`#42285`、`#42430`、`#42459`、`#41859`、`#42466` 已于 GDPR 举报当夜合入。
- **仍未修复：** `privacy-policy.astro` 仍停留在 `2026-10-06` 未更新；闭源 `ingest.t3.codes` 仍留存原始数据且无法被外部审计；团队也从未向过去 30 天受 IP 记录影响的用户发出正式通知。

<!-- section:visuals -->
## 一手实证原图

![PR #42380 自爆中继链路此前每小时向 Axiom 导出 220 万条含真实 IP 和 UA 的日志并保留 30 天](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 承认删除账号后 PlanetScale 记录与 Cloudflare 隧道残留在云端，需手写 SQL 清理](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 承认 Android FCM 推送向 Google 明文发送 Clerk user_id](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 承认所谓匿名反馈与具名 installId 及主机指纹混包发送](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 12 弹）](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [深度技术卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
