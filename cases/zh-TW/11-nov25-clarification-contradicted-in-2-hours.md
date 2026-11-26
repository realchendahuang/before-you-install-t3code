# #11 · 11 月 25 日澄清長文 2 小時內被自家通宵 PR 與 100 MB 匯出包三連打臉

> 11 月 25 日早晨，@theo 發長文拍胸脯作出三項隱私保證並放出 100 MB 遙測匯出包——不到兩小時，全部三項說法均被自家團隊通宵合入的 PR 與匯出包原始數據正面證偽。

<!-- section:claim -->
## 官方 / Theo 宣稱

在 11 月 25 日早上的澄清長文（[`2125332390239494211`](https://x.com/theo/status/2125332390239494211)）及後續回覆（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）中，`@theo` 向用戶保證：
- 從未收集過用戶的檔案路徑。
- 環境變數一直都能乾淨徹底地關閉遙測。
- 退出遙測後本機不會寫入任何追蹤檔案，且 Claude 帳號雜湊本來就是「壞的」。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **打臉一：`git.cwd` 絕對工作區路徑直接發往 Axiom（`PR #42450`）：** 發帖僅約 90 分鐘後，核心維護者 Julius 合入 [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450)，承認中繼觸發的 Webhook 執行會把完整執行鏈路匯出給 Axiom——其中 Git span 直接帶著 `git.cwd`（**完整絕對路徑、作業系統使用者名稱與儲存庫名稱**）。
- **打臉二：Windows 與 macOS 退出環境變數長期失效（`PR #42376`、`PR #42464`）：** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) 承認 Windows 桌面端從既有行程啟動時會忽略使用者儲存的 `T3CODE_TELEMETRY_ENABLED=false`；[`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) 承認 macOS/Linux 首次啟動的中繼追蹤早於 shell 環境變數探索，整個工作階段期間完全無視 `~/.zshrc` 中的關閉設定。
- **打臉三：啟動無條件落盤追蹤 ID + 100 MB 匯出包裡藏著 264 條活躍 Claude 歸因紀錄：** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152)（在 `ca81b7b9` 位於第 156 行）啟動時至今仍無條件先呼叫 `getTelemetryIdentity` 落盤本機 UUID（`upsertAnonymousId`），然後才檢查 `telemetryEnabled`。更諷刺的是，對 `@theo` 公開壓縮包（`6,056,594` 位元組、`95,789` 條事件）解包查 gzip 標頭發現原始檔名叫 `events.clean.jsonl`（發帖前 20 分鐘才剛洗出來）——即便清洗過，裡面依然留著 **264 條真實 Claude 帳號雜湊紀錄**，在 10 月 20 日把 **4 台不同電腦**（`installId`）精準串到同一個 SHA-256 雜湊上，並原樣洩露了 `vibeproxy/gpt-6-luna`、`muse-proxy-wonder-full` 等私人代理模型名稱。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **部分修補：** `PR #42450`、`PR #42376` 與 `PR #42464` 已於當晚合入。
- **仍未修復：** `AnalyticsService.ts:156` 仍在檢查退出開關前無條件寫入本機追蹤 ID；`DesktopShellEnvironment.ts` 依然漏傳 `T3CODE_OTEL_SDK_DISABLED` 與 `OTEL_SDK_DISABLED`。

<!-- section:visuals -->
## 一手實證原圖

![PR #42450 證實中繼觸發執行曾將含使用者名稱與儲存庫名稱的 git.cwd 絕對路徑匯出至 Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 承認 Windows 桌面端忽略使用者儲存的 T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 承認 macOS 首次啟動中繼追蹤整場無視 ~/.zshrc 退出設定](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![對 Theo 公開匯出的 events.clean.jsonl 取證：264 條活躍 Claude 紀錄串聯 4 台電腦並洩露私人代理模型名稱](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 11 彈）](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` 11 月 25 日澄清長文（`2125332390239494211`）](https://x.com/theo/status/2125332390239494211) · [後續否認回覆（`2125370330244128924`）](https://x.com/theo/status/2125370330244128924) · [公開遙測匯出壓縮包](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [深度技術卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
