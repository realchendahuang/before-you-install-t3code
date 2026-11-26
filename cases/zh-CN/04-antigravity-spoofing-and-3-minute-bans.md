# #04 · 伪装 Google Antigravity 内部请求头、伪造 `SSH_CONNECTION` 与新号 3 分钟封禁

> 官网 FAQ 白纸黑字担保符合 Google Antigravity 服务条款；源码却提取系统钥匙串令牌、伪造 `antigravity/hub/2.24.0` 直连 `v1internal` 内部接口并注入假 `SSH_CONNECTION`，导致全新 $20 付费账号 3 分钟被封。

<!-- section:claim -->
## 官方 / Theo 宣称

- 官方 [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) 向付费用户担保：*"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- 封号用户在 [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) 维权时，维护者否认调用 Antigravity 后端或复用令牌；`@theo` 也在 X 上把锅甩给第三方代理（`"Not with cliproxy right?"`）。

<!-- section:evidence -->
## 源码与公开记录铁证

- **提取系统钥匙串凭证 + 伪造内部 User-Agent 直连 `v1internal`：** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) 从本地文件、`@napi-rs/keyring` 或 Windows 凭据管理器（经 `ffi-rs` 调用 `advapi32.dll` 的 `CredReadW`）提取 Google OAuth 令牌，硬编码 `antigravity/hub/2.24.0` 并直接 `POST` Google 内部未公开的 `v1internal` 后端。Google 员工已在[官方开发者论坛](https://discuss.ai.google.dev/t/185992)明确指出，[Google Antigravity ToS](https://antigravity.google/terms) 第 6 条严禁第三方工具提取或复用凭证直连后端。
- **注入假 `SSH_CONNECTION` 诱骗明文落盘并引发串号：** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) 强行伪造环境变量 `SSH_CONNECTION="127.0.0.1 0 127.0.0.1 0"`，骗过 Google CLI 的钥匙串隔离机制让令牌落盘。11 月 24 日 Google 更新 CLI 后，[`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) 证实账号 A 的对话被静默路由到了账号 B。
- **全新 $20 账号零代理 3 分钟首句封禁（`Issue #41536`）：** 11 月 23 日，有用户用刚买的新 $20 账号、零代理、纯 T3 托管 Antigravity 发第一条消息，配置完仅 **3 分钟**即遭 Google 封禁（个人号仅有一次申诉机会；维护者直接按重复单关闭，未加任何警示）。
- **原生客户端与 CLIProxyAPI 伪装：** `@theo` 亲自合入 [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) 冒充 `"zed"` 客户端；已合并的 [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) 在 [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) 中直接内置了伪造 `claude-code/2.1.273`、`grok-cli/1.0.77` 与 `antigravityUserAgent` 的轮询代码。

```ts
// apps/server/src/provider/antigravityUsageLimits.ts（第 20–24、450–454 行）
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **仍在生效：** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) 新增 [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) 专门解析 Google 的 `403 PERMISSION_DENIED`（`VALIDATION_REQUIRED`）验证链接——恰恰反证已频繁触发 Google 风控——而四条伪装与提权路径目前全部保留在主干代码中。

<!-- section:visuals -->
## 一手实证原图

![antigravityUsageLimits.ts 硬编码伪造 Google 内部请求头直连 v1internal 接口](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts 注入假 SSH_CONNECTION 环境变量绕过系统钥匙串隔离](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 记录零代理全新 $20 账号首条消息 3 分钟封禁，被标重复关闭](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 在 T3 Code 中直接内置伪装请求头的 CLIProxyAPI 轮询](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 4 弹）](https://x.com/realchendahuang/status/2125213397507858657)
- [官网 FAQ 合规担保](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity 服务条款](https://antigravity.google/terms) · [Google 官方开发者论坛](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [深度技术卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
