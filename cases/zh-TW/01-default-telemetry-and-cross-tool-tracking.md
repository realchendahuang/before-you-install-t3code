# #01 · 官網掛著「零遙測」承諾卻預設全量上報、偷讀跨工具憑證並連拒四個關閉開關 PR

> 在官網白紙黑字寫著「No telemetry. Unless you opt in. Full stop.」期間，T3 Code 預設啟用 PostHog 遙測，並經閉源閘道 `ingest.t3.codes` 留存原始資料，還悄悄讀取 `~/.codex` 與 `~/.claude.json`，以無鹽雜湊進行跨裝置歸因；此外，它更拒絕了社群主動送上的四個關閉開關 PR。

<!-- section:claim -->
## 官方／Theo 宣稱

- T3 Code 官網首頁醒目承諾：*"No telemetry / Unless you opt in. Full stop."*（絕無遙測，除非你主動選擇加入，沒有例外）。
- 對外宣傳為注重隱私、自由透明的本機開源 AI 程式設計客戶端。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **掛羊頭賣狗肉，跑了三個月後靜默刪除承諾（`PR #174` → `3bdaa6e1`）：** 2026 年 3 月 6 日，[`PR #174`](https://github.com/pingdotgg/t3code/pull/174) 在沒有彈窗、沒有設定開關、沒有文件的情況下預設開啟 PostHog 遙測。跑了三個多月後，6 月 18 日 [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) 在改版中靜默刪掉官網「絕無遙測」承諾，且未向使用者發布任何說明。
- **閉源中轉閘道留存原始副本（`PR #15028`）：** 2026 年 10 月起，每 10 秒批次上報的遙測資料會先發往 T3 自建的閉源閘道 [`https://ingest.t3.codes/`](https://ingest.t3.codes/)。`AnalyticsService.ts` 第一行註解明確寫著：在轉發給 PostHog 之前，T3 閉源閘道會先留存一份完整原始副本。
- **偷讀 `~/.codex/auth.json` 與 `~/.claude.json`，以無鹽 SHA-256 進行跨機歸因（`PR #21506`）：** 基線版本 `9d3195b4` 的 `Identify.ts` 直接讀取使用者家目錄下其他 AI 工具的憑證檔案，解析 OpenAI `user_id` JWT 與 Claude `oauthAccount.accountUuid`，再用無鹽 SHA-256（`telemetryId.ts`）把多台電腦精準串連到同一個自然人。由於 T3 後台同時持有明文 Clerk 帳號 ID，無鹽雜湊可直接反向精確比對。
- **細粒度採集：** `ProviderUsageAnalytics.ts` 與 `FeatureUsage.ts` 上報供應商、自訂模型名稱、推理檔位、權限模式、Token 消耗、本機專案／執行緒數、系統／WSL 環境，以及 **35 項具體 UI 與指令操作**。
- **強硬拒絕社群的關閉開關：** 6 月 23 日，核心維護者 Julius 把 [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) 標為 `not planned` 關閉，直言 *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*。質疑違背承諾的 [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) 被靜默關閉；4 個社群提交的關閉開關 PR（`#13458`、`#16763`、`#21248`、`#27077`——通過 147 項測試並獲審查機器人通過）全數被以 `unwanted` 拒於門外。

```ts
// apps/server/src/telemetry/AnalyticsService.ts（第 1 行与启动初始化）
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **部分修補：** 經 226 萬次閱讀曝光後，[`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) 移除了對 `.codex`／`.claude.json` 的讀取；[`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) 將非目錄的自訂模型脫敏為 `custom:<driver>`；[`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) 與 [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) 則回應 CI 環境與 `DO_NOT_TRACK`。
- **仍未修復：** `AnalyticsService.ts:156` 啟動時仍先落盤本機追蹤 ID，再檢查是否退出；`DesktopShellEnvironment.ts` 仍漏傳 `OTEL_SDK_DISABLED`／`T3CODE_OTEL_SDK_DISABLED`；`ingest.t3.codes` 依舊閉源；軟體設定介面至今沒有任何關閉按鈕。

<!-- section:visuals -->
## 一手實證原圖

![Commit 3bdaa6e1 靜默刪除官網 "No telemetry / Unless you opt in. Full stop." 承諾](../../evidence/02-no-telemetry-removed.png)

![Identify.ts 讀取 ~/.codex/auth.json 與 ~/.claude.json 產生無鹽 SHA-256 跨裝置歸因雜湊](../../evidence/03-identify-codex-claude.png)

![核心維護者 Julius 關閉 Issue #1397，並直言不會讓使用者更容易退出遙測](../../evidence/04-issue1397-no-optout.png)

![通過 147 項測試的社群遙測開關 PR #27077 被打上 unwanted 拒絕](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 1 彈 · 226 萬+ 閱讀）](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [事後補丁 PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [深度技術卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
