# #04 · 偽裝 Google Antigravity 內部請求標頭、偽造 `SSH_CONNECTION`，新帳號 3 分鐘即遭封鎖

> 官網 FAQ 白紙黑字擔保符合 Google Antigravity 服務條款；原始碼卻提取系統鑰匙圈權杖、偽造 `antigravity/hub/2.24.0` 直連 `v1internal` 內部介面並注入假 `SSH_CONNECTION`，導致全新 $20 付費帳號 3 分鐘內被封鎖。

<!-- section:claim -->
## 官方與 Theo 的說法

- 官方 [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) 向付費使用者掛保證：*"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- 被封鎖的使用者在 [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) 維權時，維護者否認曾呼叫 Antigravity 後端或重用權杖；`@theo` 也在 X 上把責任推給第三方代理（`"Not with cliproxy right?"`）。

<!-- section:evidence -->
## 原始碼與公開紀錄的鐵證

- **提取系統鑰匙圈憑證 + 偽造內部 User-Agent 直連 `v1internal`：** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) 從本機檔案、`@napi-rs/keyring` 或 Windows 認證管理員（經 `ffi-rs` 呼叫 `advapi32.dll` 的 `CredReadW`）提取 Google OAuth 權杖，硬編碼 `antigravity/hub/2.24.0` 並直接 `POST` Google 內部未公開的 `v1internal` 後端。Google 員工已在[官方開發者論壇](https://discuss.ai.google.dev/t/185992)明確指出，[Google Antigravity ToS](https://antigravity.google/terms) 第 6 條嚴禁第三方工具提取或重用憑證直連後端。
- **注入假 `SSH_CONNECTION` 誘騙明文落盤並引發串號：** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) 強行偽造環境變數 `SSH_CONNECTION="127.0.0.1 0 127.0.0.1 0"`，騙過 Google CLI 的鑰匙圈隔離機制讓權杖落盤。11 月 24 日 Google 更新 CLI 後，[`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) 證實帳號 A 的對話被靜默路由到了帳號 B。
- **全新 $20 帳號、零代理，3 分鐘內首句即遭封鎖（`Issue #41536`）：** 11 月 23 日，有使用者用剛買的新 $20 帳號、零代理、純 T3 託管 Antigravity 發送第一則訊息，設定完成僅 **3 分鐘**即遭 Google 封鎖（個人帳號僅有一次申訴機會；維護者直接按重複單關閉，未加任何警示）。
- **原生客戶端與 CLIProxyAPI 偽裝：** `@theo` 親自合併 [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) 冒充 `"zed"` 客戶端；已合併的 [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) 在 [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) 中直接內建了偽造 `claude-code/2.1.273`、`grok-cli/1.0.77` 與 `antigravityUserAgent` 的輪詢程式碼。

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
## 上游最新狀態（`ca81b7b9`）

- **仍在生效：** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) 新增 [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) 專門解析 Google 的 `403 PERMISSION_DENIED`（`VALIDATION_REQUIRED`）驗證連結——恰恰反證已頻繁觸發 Google 風控——而四條偽裝與提權路徑目前全部保留在主幹程式碼中。

<!-- section:visuals -->
## 第一手實證原圖

![antigravityUsageLimits.ts 硬編碼偽造 Google 內部請求標頭直連 v1internal 介面](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts 注入假 SSH_CONNECTION 環境變數繞過系統鑰匙圈隔離](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 記錄零代理全新 $20 帳號首則訊息 3 分鐘內遭封鎖，被標記重複關閉](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 在 T3 Code 中直接內建偽裝請求標頭的 CLIProxyAPI 輪詢](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## 可核驗的原始來源

- [X 調查原帖（第 4 彈）](https://x.com/realchendahuang/status/2125213397507858657)
- [官網 FAQ 合規擔保](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity 服務條款](https://antigravity.google/terms) · [Google 官方開發者論壇](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [深度技術卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
