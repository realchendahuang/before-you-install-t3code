# #19 · `ca81b7b9` 重大认证与代码执行漏洞：局域网 30 天明文 Shell、不可吊销令牌与 `SSH_AUTH_SOCK` 裸奔

> 锁定最新上游提交 `ca81b7b9`（11 月 25 日 14:49 CST）逐行核验，证实五项现网高危安全与底层缺陷：同局域网抓一个包即可白拿一个月完整终端控制权、30 天裸 Bearer 无法自注销、5 分钟可重放 `?wsTicket=`、`isIPv4` 掐断 `::1` 隧道，以及打开陌生仓库直接把整机 `SSH_AUTH_SOCK` 与 `GITHUB_TOKEN` 暴露出去。

<!-- section:claim -->
## 官方 / Theo 宣称

- 经历 11 月 24–25 日通宵补丁战后，官方对外营造出问题已清理妥当、可放心日常使用的印象。
- `SECURITY.md` 明确将默认会话定义为等同宿主机 OS 用户的完整终端 shell 权限，却声称局域网与认证边界可控。

<!-- section:evidence -->
## 源码与公开记录铁证

直接锁定上游提交 [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) 逐行复核：

- **1. 局域网 30 天明文 shell Cookie + 省略 `Origin` 直接放行：** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) 将默认浏览器会话有效期定为 **30 天**（等同宿主机完整终端 shell）。11 月 15 日 [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) 仅对 `https:` 补加 `Secure` 标记，`t3 up --lan` 明文 HTTP 模式依然明文裸传 Cookie（[`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)）。更致命的是 [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) 写死了只要请求不带 `Origin` 头就直接返回 `true`——同局域网任何人抓到一个包、用非浏览器脚本省略 `Origin` 重放，就能静默白拿你电脑一个月的 shell 控制权。
- **2. 30 天非 DPoP 裸 Bearer 令牌无法自注销且全接口无 `/logout`：** `/oauth/token` 仅在带 DPoP 证明时才签发 1 小时短令牌，否则直接回落成不绑定设备的 **30 天裸 Bearer**（[`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)）。整套 HTTP 接口契约压根**没有 `/logout` 路由**（[`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)），调用吊销接口撤当前会话还会被服务端以 `current_session_revoke_not_allowed` 直接拦截（[`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)）。
- **3. WebSocket 票据走 URL 查询串且 5 分钟内无限重放：** 票据直接拼在 `?wsTicket=` URL 里发送（天然落入反代与抓包日志），有效期整整 5 分钟。[`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) 仅验签名、过期、audience 与吊销状态，**没有任何单次消费防重放表**——普通 Bearer 换出的 RPC 票据及全部 `media` 路由票据 5 分钟内可无限次重放连接（[`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)）。
- **4. 打开陌生仓库带着整机 `SSH_AUTH_SOCK` 与 `GITHUB_TOKEN` 裸奔：** 建 worktree 时只要存在 `.gitmodules` 就自动跑 `git submodule update --init --recursive`（[`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)）；[`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) 未全局配置 `core.hooksPath=/dev/null`；[`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) 同步执行项目目录里的 `.claude/settings.json` `SessionStart` 钩子——且全部子进程原样继承宿主机完整 `process.env`，包括 `GITHUB_TOKEN` 与 `SSH_AUTH_SOCK`（爆炸半径涵盖这把 SSH 密钥能登录的全部远端仓库与生产服务器）。
- **5. 滑稽底层 Bug：`isIPv4` 静默掐断 `::1` 本机隧道：** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) 第 39 行刚把 IPv6 回环 `::1` 放进白名单，第 73 行判断私网却只调 `NodeNet.isIPv4`，导致经 `::1` 连入的 Tailscale Serve 与 T3 Connect 隧道全被当成外网攻击，直接触发 `socket.destroy()` 静默掐断。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **全部 5 项在最新提交 `ca81b7b9` 均未修复：** 逐行源码实证锁定在 2026-11-25 14:49 CST 主干分支，同时仓库已发布 GitHub Security Advisories 仍为 **0 条**（含 11 月 20 日静默修补 `ServerSecretStore` 路径穿越的 `PR #39483`）。

<!-- section:visuals -->
## 一手实证原图

![http.ts#L215-L241 在明文 --lan HTTP 模式下签发不带 Secure 标记的 30 天 shell Cookie](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 写死省略 Origin 头直接返回 true 放行 Cookie](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 禁止当前会话自吊销且全接口缺失 logout 路由](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 自动递归初始化 submodule 并继承宿主机 SSH_AUTH_SOCK 与 GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 只调用 NodeNet.isIPv4 错判 IPv6 ::1 回环并直接调用 socket.destroy()](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## 可核验原始来源

- [X 审计原帖 — 第 19 项（中文）](https://x.com/realchendahuang/status/2125494234614788390) · [第 19 项（英文）](https://x.com/realchendahuang/status/2125494623640465525)
- [提交 `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [深度技术卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
