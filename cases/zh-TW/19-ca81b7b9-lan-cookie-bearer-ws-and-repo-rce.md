# #19 · `ca81b7b9` 重大認證與程式碼執行漏洞：區域網路 30 天明文 Shell、不可撤銷權杖與 `SSH_AUTH_SOCK` 裸奔

> 鎖定最新上游提交 `ca81b7b9`（11 月 25 日 14:49 CST）逐行核驗，證實五項現網高危安全與底層缺陷：同區域網路抓一個封包即可白拿一個月完整終端控制權、30 天裸 Bearer 無法自行註銷、5 分鐘內可重放 `?wsTicket=`、`isIPv4` 掐斷 `::1` 隧道，以及開啟陌生倉庫就把整台機器的 `SSH_AUTH_SOCK` 與 `GITHUB_TOKEN` 暴露出去。

<!-- section:claim -->
## 官方 / Theo 宣稱

- 歷經 11 月 24–25 日通宵補丁戰後，官方對外營造出問題已清理妥當、可放心日常使用的印象。
- `SECURITY.md` 明確將預設工作階段定義為等同宿主机 OS 使用者的完整終端 shell 權限，卻聲稱區域網路與認證邊界可控。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

直接鎖定上游提交 [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) 逐行複核：

- **1. 區域網路 30 天明文 shell Cookie + 省略 `Origin` 直接放行：** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) 將預設瀏覽器工作階段有效期定為 **30 天**（等同宿主机完整終端 shell）。11 月 15 日 [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) 僅對 `https:` 補加 `Secure` 標記，`t3 up --lan` 明文 HTTP 模式依然明文裸傳 Cookie（[`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)）。更致命的是 [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) 寫死了只要請求不帶 `Origin` 標頭就直接回傳 `true`——同區域網路任何人抓到一個封包、用非瀏覽器腳本省略 `Origin` 重放，就能靜默白拿你電腦一個月的 shell 控制權。
- **2. 30 天非 DPoP 裸 Bearer 權杖無法自行註銷，且全介面無 `/logout`：** `/oauth/token` 僅在帶 DPoP 證明時才簽發 1 小時短權杖，否則直接回落成不綁定裝置的 **30 天裸 Bearer**（[`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)）。整套 HTTP 介面契約壓根**沒有 `/logout` 路由**（[`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)），呼叫撤銷介面撤銷目前工作階段還會被伺服器端以 `current_session_revoke_not_allowed` 直接攔截（[`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)）。
- **3. WebSocket 票據走 URL 查詢字串且 5 分鐘內無限重放：** 票據直接拼在 `?wsTicket=` URL 裡發送（天然落入反向代理與抓包日誌），有效期整整 5 分鐘。[`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) 僅驗簽章、過期、audience 與撤銷狀態，**沒有任何單次消費防重放表**——一般 Bearer 換出的 RPC 票據及全部 `media` 路由票據 5 分鐘內可無限次重放連線（[`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)）。
- **4. 開啟陌生倉庫帶著整台機器 `SSH_AUTH_SOCK` 與 `GITHUB_TOKEN` 裸奔：** 建 worktree 時只要存在 `.gitmodules` 就自動跑 `git submodule update --init --recursive`（[`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)）；[`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) 未全域設定 `core.hooksPath=/dev/null`；[`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) 同步執行專案目錄裡的 `.claude/settings.json` `SessionStart` 鉤子——且全部子程序原樣繼承宿主机完整 `process.env`，包括 `GITHUB_TOKEN` 與 `SSH_AUTH_SOCK`（爆炸半徑涵蓋這把 SSH 金鑰能登入的全部遠端倉庫與生產伺服器）。
- **5. 滑稽底層 Bug：`isIPv4` 靜默掐斷 `::1` 本機隧道：** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) 第 39 行剛把 IPv6 回環 `::1` 放進白名單，第 73 行判斷私網卻只呼叫 `NodeNet.isIPv4`，導致經 `::1` 連入的 Tailscale Serve 與 T3 Connect 隧道全被當成外網攻擊，直接觸發 `socket.destroy()` 靜默掐斷。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **全部 5 項在最新提交 `ca81b7b9` 均未修復：** 逐行原始碼實證鎖定在 2026-11-25 14:49 CST 主幹分支，同時倉庫已發布 GitHub Security Advisories 仍為 **0 條**（含 11 月 20 日靜默修補 `ServerSecretStore` 路徑穿越的 `PR #39483`）。

<!-- section:visuals -->
## 一手實證原圖

![http.ts#L215-L241 在明文 --lan HTTP 模式下簽發不帶 Secure 標記的 30 天 shell Cookie](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 寫死省略 Origin 標頭直接回傳 true 放行 Cookie](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 禁止目前工作階段自行撤銷且全介面缺失 logout 路由](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 自動遞迴初始化 submodule 並繼承宿主机 SSH_AUTH_SOCK 與 GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 只呼叫 NodeNet.isIPv4 誤判 IPv6 ::1 回環並直接呼叫 socket.destroy()](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 審計原帖 — 第 19 項（中文）](https://x.com/realchendahuang/status/2125494234614788390) · [第 19 項（英文）](https://x.com/realchendahuang/status/2125494623640465525)
- [提交 `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [深度技術卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
