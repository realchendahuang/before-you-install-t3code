# #12 · 歐盟 GDPR 檢舉後 6 小時通宵自爆：每小時 220 萬筆 IP 日誌與刪號不刪庫

> 11 月 24 日晚間有人向歐盟提起正式 GDPR 檢舉後，團隊在 6 小時內連夜合入的一連串急救補丁，反手把藏得更深的四筆隱私舊帳抖了個底朝天——其中僅 Axiom 一項就曾每小時記錄 220 萬筆真實 IP 與 UA，保存整整 30 天。

<!-- section:claim -->
## 官方 / Theo 宣稱

- 即使 `PR #42380` 合入已過三個半小時，`@theo` 仍在留言區回覆稱 IP 位址早就去識別化移除了。
- 官方文件（`docs/user/telemetry.md`）承諾 `agent.feedback` 屬於匿名回饋，且刪除帳號會徹底清除雲端資料。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **每小時 220 萬筆真實 IP + UA 綁定 `user.id` 留存 30 天（`PR #42380`）：** 中繼服務此前把每條請求鏈路匯出給第三方日誌平台 Axiom——規模約 **每小時 220 萬筆、保存 30 天**——直接在 `user.id` 旁記錄 `client.address`（取自 `cf-connecting-ip` 的真實呼叫方 IP）與 `user_agent.original`（Cloudflare 1% Workers 日誌另計）。
- **刪除帳號不刪庫、不關隧道（`PR #42285`、`PR #42430`）：** 使用者在 Clerk 註銷帳號後，PlanetScale 資料庫裡的中繼紀錄與活躍的 Cloudflare 隧道根本不會自動清除——直到收到真實的隱私刪除請求，工程師才被迫**手寫 SQL 刪庫並手動拆除隧道**。
- **行動端推播明文外洩 `user_id` 與權杖（`PR #42459`、`PR #41859`）：** Android FCM 推播每次都把明文 Clerk `user_id` 直接送給 Google；iOS APNs 請求鏈路與錯誤日誌則直接記錄包含裝置推播權杖的完整 URL。
- **所謂「匿名回饋」與主機指紋混包發送（`PR #42466`）：** 宣稱匿名的 `agent.feedback` 事件，實際與帶 `installId` 的具名事件及完整主機指紋（系統、架構、原始 WSL 發行版）塞在同一個 HTTP POST 裡發出，直接違背 `docs/user/telemetry.md` 的承諾。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **部分修補：** 急救補丁 `#42380`、`#42285`、`#42430`、`#42459`、`#41859`、`#42466` 已於 GDPR 檢舉當夜合入。
- **仍未修復：** `privacy-policy.astro` 仍停留在 `2026-10-06` 未更新；閉源 `ingest.t3.codes` 仍留存原始資料且無法被外部稽核；團隊也從未向過去 30 天受 IP 記錄影響的使用者發出正式通知。

<!-- section:visuals -->
## 第一手實證原圖

![PR #42380 自爆中繼鏈路此前每小時向 Axiom 匯出 220 萬筆含真實 IP 和 UA 的日誌並保留 30 天](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 承認刪除帳號後 PlanetScale 紀錄與 Cloudflare 隧道殘留在雲端，需手寫 SQL 清理](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 承認 Android FCM 推播向 Google 明文傳送 Clerk user_id](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 承認所謂匿名回饋與具名 installId 及主機指紋混包發送](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 12 彈）](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [深度技術卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
