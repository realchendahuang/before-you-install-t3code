# 安裝 T3 Code 之前

<p align="center">
  <strong>聯合國官方語言版本：</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>全球社群語言版本：</strong>
  <a href="./README.zh-TW.md"><strong>繁體中文</strong></a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml/badge.svg" alt="儲存庫驗證 CI" /></a>
  ·
  <a href="https://realchendahuang.github.io/before-you-install-t3code/"><strong>互動式實證入口網站（GitHub Pages）</strong></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>108 張視覺憑證索引</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>320 條一手來源索引</strong></a>
</p>
<p align="center">
  <strong>稽核基準：</strong> <a href="https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2"><code>9d3195b4</code></a>（<code>#42000</code>）·
  <strong>最新上游覆核：</strong> <a href="https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd"><code>ca81b7b9</code></a>（<code>#42634</code>，11 月 25 日 14:49 CST · 新增 +259 筆 commit）
</p>

![安裝 T3 Code 之前 — 18 篇獨立稽核橫幅圖](../../evidence/00-cover-zh.png)

> **稽核範圍與核驗原則**  
> 本儲存庫為針對 `pingdotgg/t3code`（T3 Code）的獨立資安、遙測、社群治理與公開紀錄稽核檔案庫，完整彙整 2026 年 11 月 24–25 日發布的 2 篇導火線原帖與 **18 篇實證稽核報告**，並附帶收錄於 [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md) 的 **320 條正規一手來源網址**（`SRC-001`–`SRC-320`）、編目於 [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md) 的 **108 張一手視覺憑證與鑑識圖表**、六份深度技術專題檔案（[`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)）、[互動式實證入口網站](https://realchendahuang.github.io/before-you-install-t3code/)，以及連續 **1,151 則 `@theo` X 貼文** 的量化分析資料集（2026 年 11 月 7–24 日）。本次程式碼庫稽核涵蓋主基準 [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2)（`PR #42000`，`2026-11-24T08:41:04Z`），並持續追蹤至 `main` 分支最新提交 [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd)（`PR #42634`，`2026-11-25T06:49:37Z` / `2026-11-25 14:49 CST`）。本庫不包含任何短網址轉址連結，亦不揭露任何私人聯絡資訊。歡迎附上可驗證之一手出處透過 Pull Request 更新事實進展、已合併之修補程式或增補多語系翻譯——詳見 [`CONTRIBUTING.md`](../../CONTRIBUTING.md)。

---

## TL;DR（30 秒結論速覽）

- **受影響對象：** `pingdotgg/t3code` 的本機桌面版、命令列（CLI）、託管網頁版（`app.t3.codes`）、行動裝置版以及 T3 Connect 使用者——特別是非管理員權限安裝桌面版的用戶、使用自訂端點或 Antigravity／Gemini 訂閱的開發者、Claude Auto 模式使用者，以及任何已連結 GitHub 或 T3 Connect 工作階段的用戶。
- **3 項經原始碼驗證的核心發現（對照 `9d3195b4` → `ca81b7b9`）：**
  1. **預設啟用遙測、啟動無條件寫入識別碼與 GDPR 後揭露（[第 2 節](#2-遙測機制跨工具憑證讀取與-gdpr-後連夜修補戰第-171112-篇) · [專題檔案 01](../dossiers/01-telemetry-and-gdpr-timeline.md)）：** 在 6 月 18 日前（[`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)）官網仍承諾 `"No telemetry"` 期間便已預設啟用 PostHog 遙測（[PR #174](https://github.com/pingdotgg/t3code/pull/174)）；透過閉源閘道 [`https://ingest.t3.codes/`](https://ingest.t3.codes/) 留存原始事件複本；GDPR 檢舉後的連夜 PR 坦承 Axiom 每小時記錄 **220 萬筆含 IP 與 UA 的追蹤區段**（[PR #42380](https://github.com/pingdotgg/t3code/pull/42380)）、`git.cwd` 路徑外洩（[PR #42450](https://github.com/pingdotgg/t3code/pull/42450)），以及 Clerk 帳號刪除不完全（[PR #42285](https://github.com/pingdotgg/t3code/pull/42285)）。稽核後官方雖合併了停止讀取 `.codex`/`.claude.json`（[PR #42299](https://github.com/pingdotgg/t3code/pull/42299)）、將自訂模型遮罩為 `custom:<driver>`（[PR #42465](https://github.com/pingdotgg/t3code/pull/42465)）以及採認 CI／`DO_NOT_TRACK`（[PR #42630](https://github.com/pingdotgg/t3code/pull/42630)、[PR #42629](https://github.com/pingdotgg/t3code/pull/42629)），**但截至 `ca81b7b9`，[`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts)（`第 156 行`）仍會在檢查退出開關前先向磁碟寫入本機識別碼，[`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) 仍遺漏轉發 `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`，且至今完全沒有設定介面開關或 `app.t3.codes` 退出按鈕。**
  2. **本機安全缺口、環境 SSH／儲存庫鉤子與 `0` 筆安全性公告（[第 3 節](#3-本機儲存處理程序監控防護繞過與未公告安全修補第-2313-篇) · [專題檔案 02](../dossiers/02-local-safety-and-security-audit.md)）：** Claude Auto 模式會在第 3 次重試時靜默核准 `git push --force`（[Issue #15353](https://github.com/pingdotgg/t3code/issues/15353)，至今未修）；多項高嚴重性安全修補在 [**0 筆 GitHub 安全性公告**](https://github.com/pingdotgg/t3code/security/advisories) 的情況下靜默合入，而 [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) 將全作業系統 `filesystem:read` 與 iOS 明文 HTTP 宣稱為「預期設計」；開啟儲存庫時會自動遞迴初始化 `.gitmodules`（`GitVcsDriverCore.ts#L6144-L6205`）、缺少全域 Git `core.hooksPath=/dev/null`（`VcsProcess.ts#L145-L157`），並直接以完整繼承的 `GITHUB_TOKEN`／`SSH_AUTH_SOCK` 執行 `.claude/settings.json` 中的 Claude `SessionStart` 鉤子（`ClaudeAdapterV2.ts#L5982-L5985`）；儘管 [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) 新增了非同步對話串清理（並關閉 `#17845`），但受活躍分支／子代理引用的歷史與墓碑資料列依然留存、縮減 `statev2.sqlite` 仍需離線執行 `VACUUM`；而 [PR #42577](https://github.com/pingdotgg/t3code/pull/42577) 僅收窄 Windows 處理程序監控（Linux/macOS 仍維持 `ProcessesToUpdate::All`）。
  3. **Antigravity 標頭偽裝、明文中繼、區網／驗證漏洞與任意儲存庫點星（[第 4 節](#4-google-antigravity-條款風險與未加密-t3-connect-中繼架構第-45-篇) · [第 5.3 節](#53-t3-code-如何在-25-天內從-3-萬暴衝至-77-萬星標僅-129-名關注者第-18-篇)）：** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts) 仍在擷取系統金鑰圈／`CredReadW` 權杖並偽裝 `antigravity/hub/2.24.0` 直連 `v1internal`（[PR #41210](https://github.com/pingdotgg/t3code/pull/41210) 更證實觸發了 Google `VALIDATION_REQUIRED` `403` 帳號驗證連結）；**T3 Connect** 依舊 **沒有端對端加密**（[Issue #32098](https://github.com/pingdotgg/t3code/issues/32098)）且 `requireConnectDeviceApproval` 預設仍為 `false`（[`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)）；針對 `ca81b7b9` 的原始碼檢視亦證實：`--lan` HTTP 仍下發不含 `Secure` 標記的 30 天 Shell Cookie 並放行缺少 `Origin` 標頭的請求（`PR #37042`）、非 DPoP 交換會簽發無 `/logout` 路由且無法撤銷的 30 天未綁定 Bearer 權杖、URL 中的 5 分鐘 `?wsTicket=` 憑證可供重放，以及 `isIPv4` 誤判會靜默切斷 `::1` 上的 Tailscale Serve／Connect 通訊端；而 [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) 藉伺服器憑證替任意儲存庫按星的未鎖定漏洞依舊未修。
- **立即採取行動：** 已經安裝了 T3 Code？請直接前往 [**可執行緩解措施與止損實戰手冊**](#7-可執行緩解措施與止損實戰手冊)（設定 `export DO_NOT_TRACK=1`、透過 `/etc/hosts` 封鎖 `ingest.t3.codes`、部署受管原則、執行離線 `VACUUM` 並撤銷 OAuth 與相關權杖）。

---

## 目錄

- [TL;DR（30 秒結論速覽）](#tldr30-秒結論速覽)
- [結構化調查發現與風險矩陣](#結構化調查發現與風險矩陣)
- [事件完整時間軸（2023–2026）](#事件完整時間軸20232026)
- [1. 起因爭議：「Steal Our Code」、Fork 命名威脅與雙重標準](#1-起因爭議steal-our-codefork-命名威脅與雙重標準)
- [2. 遙測機制、跨工具憑證讀取與 GDPR 後連夜修補戰（第 1、7、11、12 篇）](#2-遙測機制跨工具憑證讀取與-gdpr-後連夜修補戰第-171112-篇)
- [3. 本機儲存、處理程序監控、防護繞過與未公告安全修補（第 2、3、13 篇）](#3-本機儲存處理程序監控防護繞過與未公告安全修補第-2313-篇)
- [4. Google Antigravity 條款風險與未加密 T3 Connect 中繼架構（第 4、5 篇）](#4-google-antigravity-條款風險與未加密-t3-connect-中繼架構第-45-篇)
- [5. 商業帳本、投資人利益衝突、贊助商與 7.7 萬星標漏斗（第 6、8、17、18 篇）](#5-商業帳本投資人利益衝突贊助商與-77-萬星標漏斗第-681718-篇)
- [6. 社群治理、Fork 爬蟲機器人、商標紀錄、1,151 則推文資料集與歷史脈絡（第 9、10、14、15、16 篇）](#6-社群治理fork-爬蟲機器人商標紀錄1151-則推文資料集與歷史脈絡第-910141516-篇)
- [7. 可執行緩解措施與止損實戰手冊](#7-可執行緩解措施與止損實戰手冊)
- [8. 一手原始出處與 18 篇原帖完整索引](#8-一手原始出處與-18-篇原帖完整索引)

---

## 結構化調查發現與風險矩陣

| 稽核領域與對應篇章 | 風險／影響 | 核心實證發現與來源憑證 | 狀態（`ca81b7b9`，11 月 25 日 14:49 CST） | 深度專題檔案 |
|---|---|---|---|---|
| **遙測與 GDPR 後隱私揭露**<br>*（第 1、7、11、12 篇）* | **嚴重（Critical）** | 官網仍承諾 `"No telemetry / Unless you opt in. Full stop."` 期間即透過 `PR #174` 預設啟用 PostHog 分析（`3bdaa6e1` 於 6 月 18 日靜默刪除該承諾）；經閉源閘道 `ingest.t3.codes` 留存原始事件複本（`PR #15028`）；對 `~/.codex/auth.json` 與 `~/.claude.json` 進行無鹽 SHA-256 跨工具雜湊歸因（`Identify.ts`、`telemetryId.ts`）；連續駁回 4 個選擇退出 PR（`#13458`、`#16763`、`#21248`、`#27077`）；受管原則盲點（`docs/user/telemetry.md`）；遭檢舉後連夜合入的 GDPR PR 坦承每小時將 **220 萬筆含 IP 與 UA 的追蹤紀錄** 存於 Axiom 30 天（`#42380`）、外洩 `git.cwd` 路徑（`#42450`）、無視 Win/Mac 退出設定（`#42376`、`#42464`）、帳號刪除未清資料庫（`#42285`），以及混包傳送匿名回饋（`#42466`）。 | 稽核後合併 [`#42299`](https://github.com/pingdotgg/t3code/pull/42299)（停止讀取 `.codex`/`.claude.json`）、[`#42465`](https://github.com/pingdotgg/t3code/pull/42465)（`custom:<driver>`）、[`#42630`](https://github.com/pingdotgg/t3code/pull/42630)（CI 停用）與 [`#42629`](https://github.com/pingdotgg/t3code/pull/42629)（`DO_NOT_TRACK`）；**截至 `ca81b7b9` 仍未修復：** `AnalyticsService.ts:156` 啟動時仍先寫入本機識別碼再檢查退出設定、`DesktopShellEnvironment.ts` 仍遺漏轉發 `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`、`ingest.t3.codes` 維持閉源、設定 UI 與網頁版仍無開關、行動端不受 Managed Policy 管轄、`Publish agent activity` 仍無視退出設定。 | [**專題檔案 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **本機安全與未公告修補**<br>*（第 2、3、13 篇）* | **嚴重（Critical）** | 側邊欄「永久刪除」僅在 `statev2.sqlite` 附加 `"thread.deleted"` 事件（導致 25.9–41.6 GB 磁碟膨脹，`#17845`）；`t3-resource-monitor` 掃描作業系統全數處理程序與命令列參數（`ProcessesToUpdate::All`，`#11222`，`PR #41889`）；Claude Auto 模式在第 3 次嘗試時靜默核准 `git push --force`（`#15353`，懸置逾 52–53 天）；僅耗時 21 小時移除 `slopalytics.com` 私有模型過濾（`#41237`）；即使靜默修復多項漏洞（`#39483`、`#41757`、`#42386`、`#42504`），GitHub Security Advisories 仍為 **0 筆公告**；Windows Base64 PowerShell 防毒誤報/告警議題未決（`#30997`）；開啟未受信任儲存庫時會自動遞迴執行 `git submodule update --init --recursive`（`GitVcsDriverCore.ts#L6144-L6205`）、缺少全域 `core.hooksPath=/dev/null`（`VcsProcess.ts#L145-L157`），並帶著完整繼承的 `GITHUB_TOKEN`／`SSH_AUTH_SOCK` 直接觸發 `.claude/settings.json` 的 Claude `SessionStart` 鉤子（`ClaudeAdapterV2.ts#L5982-L5985`）；`SECURITY.md` 將全作業系統 `filesystem:read` 與 iOS 明文 HTTP 宣稱為預期設計邊界。 | [`#42119`](https://github.com/pingdotgg/t3code/pull/42119) 新增非同步 `thread-content.purge` 清理並關閉 `#17845`（仍保留受活躍分支／回併／子代理引用的源對話串歷史與墓碑資料列，縮減檔案須離線 `VACUUM`）；[`#42577`](https://github.com/pingdotgg/t3code/pull/42577) 僅收窄 Windows 監控讀取（Linux/macOS 仍維持 `ProcessesToUpdate::All`，且 `#41889` 仍未合併）；**截至 `ca81b7b9` 仍未修復：** `#15353`、`#26489`、`#30997`、未受信任儲存庫鉤子與 `SSH_AUTH_SOCK` 暴露風險、**`0` 筆安全性公告**與 `SECURITY.md` 邊界聲明。 | [**專題檔案 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **Antigravity 條款與 T3 Connect 中繼**<br>*（第 4、5 篇）* | **高風險（High）** | `docs/user/faq.md` 保證符合 Google Antigravity 服務條款，但 `antigravityUsageLimits.ts` 自系統金鑰圈／Windows `CredReadW` 擷取權杖、偽裝 `antigravity/hub/2.24.0` 並直連未公開的 `v1internal` 端點；`antigravityAuthSupport.ts` 注入偽造的 `SSH_CONNECTION` 導致跨帳號路由錯亂（`#41973`）；全新 $20 訂閱帳號在 3 分鐘內遭停權（`#41536`）；`PR #33800` 原生接線偽裝 `claude`/`xai`/`antigravity` 的 CLIProxyAPI 中樞輪詢；T3 Connect **完全沒有端對端加密**、預設關閉 `requireConnectDeviceApproval`（`#36419`），並擬遷移至 OVH Caddy TLS 終止閘道（`PR #32945`）；`ca81b7b9` 驗證檢視亦揭露 `--lan` 下發 30 天明文 Cookie（`PR #37042` 僅限 HTTPS）且接受缺失 `Origin` 請求、無法撤銷的 30 天非 DPoP Bearer 權杖、URL 中可重放的 5 分鐘 `?wsTicket=`，以及 `isIPv4` 切斷 `::1` 通道。 | [`#41210`](https://github.com/pingdotgg/t3code/pull/41210) 新增 Google `VALIDATION_REQUIRED` `403` 帳號驗證連結解析（印證確已觸發 Google 風控核驗）；[`#42311`](https://github.com/pingdotgg/t3code/pull/42311) 新增新裝置登入通知；**截至 `ca81b7b9` 仍未修復：** Antigravity 偽裝／金鑰圈擷取程式碼與 `cliproxyApi.ts` 仍持續運作、**無 T3 Connect 端對端加密**（`#32098`／`#32945`），`requireConnectDeviceApproval` 預設仍為 `false`，另有區網 Cookie／Bearer／WS 票證／`::1` 驗證與通道缺陷。 | [**專題檔案 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **商業帳本、贊助商與 7.7 萬星**<br>*（第 6、8、17、18 篇）* | **高風險（High）** | 在免費開源用戶端自掏腰包投入逾 $800k（提及 T3 `162` 次 vs 付費舊產品 `0` 次）；以 **單日 31.7 兆 token**（等效每日 $10.19M）算力雷達換取逾 $300k OpenAI 早期測試免費額度與創投接洽；天使投資標的與 Vibe Kanban、Daytona 重疊；贊助商生態（Clerk、Axiom、Vercel 排他條款）深植架構；Codex 0% 額度漏洞利用（`Endless` / `codex#45444`）；10 帳號 `CLIProxyAPI` Gist（`555%` 配額）與 FAQ 停權警告自相矛盾；透過發滿 5 次提示／閒置 30 秒彈窗觸發主機憑證執行 `PUT user/starred/...`（`#27832`、`#29922`、`#29987`），繞過 Macroscope 審查且使 `driver.ts#L60-L99` 未鎖定目標儲存庫的點星漏洞長達 19 天未修。 | `driver.ts#L60-L99` 未鎖定目標點星與 `zhilsinger` 審查意見在 **`ca81b7b9` 仍未修復**；儲存庫達 7.7 萬+ 星標 vs 約 129 名關注者。 | [**專題檔案 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **社群治理、商標與歷史紀錄**<br>*（起因 1–2，第 9、10、15、16 篇）* | **中高風險（Medium–High）** | 每日 500 筆 commit／700 個代理／`yolo merges` 對照 `CONTRIBUTING.md`（`"here's my advice: Don't"`）、`.github/VOUCHED.td` 公開點名自動封鎖、全庫 `174` 個 `unwanted` 標籤、移除 Plan 模式（`#5551`、`#9190`、`#33131`）及 `#33639` 辱罵用戶；公開指揮 `@bot` 爬梳他人 Fork（`@MiaAI_lab`）、號召以 Community Notes 斷絕批評者分潤，以及使用自動封鎖腳本；威脅下架 GitHub 帳號時，USPTO 名下 `T3 Code`/`T3 Tools`/`T3 Connect` 註冊商標為 **0 筆**（`PING LABS` `97294243` 已放棄；EquipmentShare 持有 `7795672`）；17 小時後才補上 `PR #41898` `TRADEMARK.md`；2024–2026 年行為模式高度一致（`vsc-material-but-i-wont-sue-you`、印度開發者網暴風波、$20k FFmpeg 懸賞事件、11 月 25 日凌晨 4 點發文威脅閉源後刪除）。 | `CONTRIBUTING.md`／`.github/VOUCHED.td` 與 `TRADEMARK.md` 仍存於 `main` 分支（`ca81b7b9`）。 | [**專題檔案 05**](../dossiers/05-governance-trademark-and-history.md) |
| **1,151 則推文量化資料集**<br>*（第 14 篇）* | **稽核基準（Audit Baseline）** | 11 月 7–24 日窮舉語料庫（`n = 1,151`，歷時 17.24 天，日均 66.8 則，回覆佔 75.6%，中位間隔 2.7 分鐘）：面對 20 位大型科技公司高層／員工／頂尖 KOL 時，髒話與人身攻擊為 **0.0%**（嚴格首位 `@` 口徑 `0/43`，禮貌致謝達 `32.6%`）；面對一般開發者時，敵意與粗口升至 **8.0%**（`61/766`）；在中文 Fork 爭議爆發的 25 小時危機窗口內，直接人身攻擊更激增 **4.0 倍至 14.4%**（`19/132`）。 | 可重現之正規表示式稽核與 4 張鑑識統計圖表。 | [**專題檔案 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **完整一手網址與視覺憑證目錄** | **參考基準（Reference）** | 交叉編目 **320** 條正規 `https://` 一手來源網址（`SRC-001`–`SRC-320`）與 **108** 張無損最佳化視覺憑證及鑑識圖表（`EV-001`–`EV-108`）。 | 100% 正規化直連（零 `t.co` 短網址；108/108 資產編目完成）。 | [**來源總索引**](../COMPLETE-SOURCE-INDEX.md) · [**憑證總索引**](../EVIDENCE-INDEX.md) |

---

## 事件完整時間軸（2023–2026）

| 日期／時間 | 關鍵事件里程碑 | 可驗證原始檔案／出處 |
|---|---|---|
| **2023-05-14** | `@theo` 公開其 YouTube 贊助商名單（`@vercel`、`@clerk`、`@upstash`、`@axiomhq`、`@PlanetScale`）。Clerk 與 Axiom 日後成為 T3 Code 核心驗證與日誌基礎設施。 | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | Vercel 執行長證實僅贊助唯一一位 YouTuber（`Theo`）；`@theo` 本人承認贊助合約包含排他條款，限制推廣競爭產品。 | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [影片](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *（兩年前）* | `@theo` Fork 他人的 VS Code 主題並命名為 `vsc-material-but-i-wont-sue-you` 嘲諷原作者脾氣；另外在其針對印度教學頻道的影片引發網暴後，發布致歉影片（`I screwed up.`）譴責以國籍攻擊他人。 | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | USPTO 駁回 T3 Tools Inc. 唯一商標申請案（`PING LABS`，申請號 `97294243`）並標記為 `ABANDONED`（2025 年 5 月 19 日）。EquipmentShare 在軟體／SaaS 第 9 與第 42 類成功註冊 `T3`（註冊號 `7795672`，2025 年 5 月 13 日）。 | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` 在 X 上與 FFmpeg 發生衝突，並開出 **$20,000 懸賞** 企圖迫使一名 FFmpeg 維護者離職；Windscribe 反手懸賞 $21,000、VLC 創辦人公開反對、FFmpeg 開發者記錄其公開霸凌行為後，`@theo` 刪除影片與推文並撤回懸賞。 | [FFmpeg 事件紀錄](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | **PR #174** 併入 `pingdotgg/t3code`，在沒有同意提示視窗、沒有設定頁面開關、亦無遙測文件的情況下預設啟用 PostHog 遙測。 | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` 發布影片 *「Github has a fake star problem」*，直言 GitHub 星標「大多是公司用來欺騙創投投資的工具」（`"mostly a way for companies to trick VCs into investing"`）。 | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | **Commit `3bdaa6e1`** 在預設遙測持續收集逾三個月後，從 T3 Code 官網首頁靜默刪除 `No telemetry / Unless you opt in. Full stop.`。 | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | 維護者 Julius 以 `not planned` 關閉 **Issue #1397**：*「我們不會讓選擇退出變得更容易，知道我們有多少使用者對我們至關重要」*（*"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*）。 | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | **Issue #4123**（附官網「No telemetry」歷史截圖）於 11 月 4 日遭靜默關閉；4 個社群提交的退出開關 PR（`#13458`、`#16763`、`#21248`、`#27077`）接連遭拒（`#27077` 在通過 147 項測試的情況下仍被貼上 `unwanted` 標籤關閉）。 | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | **PR #5551** 隱藏 Build/Plan 切換鈕（附文 `Reality check for those upset`，獲 10 個倒讚）；**PR #9190** 隱藏上下文視窗用量表（獲 16 個倒讚，為全庫最高紀錄）。 | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` 炫耀在 Codex 0% 配額寬限期間額外榨取 **$800+** 算力，同時 `@maria_rcks` 發布 *Endless*；遭批評後雙雙刪文（`2090972426876129658`）；OpenAI 隨後收緊 0% 即強制中斷執行回合（`openai/codex#45444`）。 | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | **Issue #15353**（Claude Auto 靜默執行 `git push --force`，10 月 3 日）、`privacy-policy.astro`（`2026-10-06`）與 **Issue #17845**（`statev2.sqlite` 假刪除，10 月 10 日）相繼建檔紀錄。 | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | **PR #15028** 將遙測路由至閉源 `ingest.t3.codes`；**PR #21506** 在 `Identify.ts` 加入無鹽 SHA-256 跨工具識別歸因；`@theo` 公開其 10 帳號 `CLIProxyAPI` Gist（`555%` 配額）。 | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | **PR #27832**、**#29922** 與 **#29987** 上線「發滿 5 次提示／閒置 30 秒」討星提示，改用主機憑證呼叫 `PUT user/starred/...`；`zhilsinger` 於 11 月 6 日提出 `Request changes`（擱置 19 天無回覆）。 | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | `@bot` 爬梳他人 Fork（`@MiaAI_lab`）、刪除 Plan 模式（`#33131`）、揭露 `$800k+` 支出與 `31.7T/day`（`$10.19M/day`）算力雷達、`$300k+` OpenAI 免費額度、`CONTRIBUTING.md` 改寫、Vibe Kanban/Daytona 投資重疊，`PR #41237` 於 21 小時內移除模型過濾器。 | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` 發文辱罵 `"Chinese knockoff"` 與 `"Temu3 Code"`，並威脅聯繫 GitHub 封鎖帳號（`2124829315657576890`）；MIT Fork 作者於 30 分鐘內將專案更名為 `Stardust`；隨後私訊致歉，但公開貼文全數保留未刪。 | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [導火線 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` 表態歡迎兆美元級美國企業取用 MIT 程式碼（`2124989435154726982`），嘲諷合規質疑（`"get a better lawyer"`）；導火線 1–2 發布；**12:21 CST**（`04:21Z`，發出封號威脅 17 小時後）`@theo` 合併 **PR #41898** 事後補入 `TRADEMARK.md`。 | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | 稽核報告 **第 1–5 篇** 發布（第 1 篇突破 **181 萬次瀏覽**、6,640 次書籤收藏）。`18:39 CST`，`@theo` 稱中文科技推特為 `"the biggest fucking cesspit"`（`2125177503526588877`）；`19:13–19:36 CST` 宣稱受管原則（Managed Policy）可關閉所有遙測（`2125186071357251715`）。 | [第 1 篇](https://x.com/realchendahuang/status/2125153472450527440) → [第 5 篇](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 夜間 – 2026-11-25 ~07:00 CST** | 歐洲正式 GDPR 檢舉送件；**6 小時通宵趕工** 合併 `#42380`（2.2M/hr 含 IP 追蹤紀錄）、`#42285`/`#42430`（帳號刪除）、`#42376`/`#42464`（被無視的 Win/Mac 退出變數）、`#42450`（`git.cwd` 路徑外洩，距離 Theo 否認收集路徑僅 90 分鐘）、`#42459`/`#41859`（推播外洩）、`#42466`（混合匿名批次）、`#41757`/`#42386`/`#42504`（靜默安全修補）。黎明前 `@theo` 發文威脅閉源隨後刪推。 | [第 11 篇](https://x.com/realchendahuang/status/2125394810559426993) · [第 12 篇](https://x.com/realchendahuang/status/2125395501663281198) · [第 13 篇](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | 稽核報告 **第 6–18 篇** 發布，完整揭露商業帳本、受管原則盲點、`yolo merges`、`@bot` 爬蟲行為、GDPR 後披露事項、1,151 則推文資料集、USPTO 商標紀錄、贊助商連結與 7.7 萬星標運作機制。 | [第 6 篇](https://x.com/realchendahuang/status/2125385742243520653) → [第 18 篇](https://x.com/realchendahuang/status/2125416210120765799) |
| **2026-11-25 截至 14:49 CST（`ca81b7b9`）** | 基準後上游追蹤（從 `9d3195b4` 至 `ca81b7b9` 計 `+259` 筆 commit）驗證 `#42299`（停止讀取 `.codex`/`.claude.json`）、`#42465`（`custom:<driver>`）、`#42577`（收窄 Windows 處理程序監控範圍）、`#41210`（Antigravity `VALIDATION_REQUIRED` 帳號驗證連結）、`#42630`（CI 執行器停用）、`#42629`（`DO_NOT_TRACK`）、`#42119`（非同步清理關閉 `#17845`，惟仍保留分支／子代理歷史與墓碑資料列且須離線 `VACUUM`）、`#42311`（新裝置登入通知）及 `#42356`–`#42415` 收緊；同時確認 `AnalyticsService.ts:156`、`DesktopShellEnvironment.ts` 遺漏 OTel 變數、閉源 `ingest.t3.codes`、`#15353`、`driver.ts#L60-L99`、`0` 筆安全公告及缺少 T3 Connect 端對端加密等項目依然未修。 | [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) |

---

## 1. 起因爭議：「Steal Our Code」、Fork 命名威脅與雙重標準

在 2026 年 11 月 23–25 日短短 48 小時內，一場圍繞 T3 Code 社群 MIT 授權 Fork 的命名風波，迅速演變為全面性的原始碼稽核、歐洲 GDPR 正式檢舉與近 20 項連夜緊急修補。

2026 年 11 月 23 日晚間至 24 日上午（北京時間），一名網友在網路上抱怨某款由中國開發者（`@DDdxx666`）基於 MIT 授權製作的免費開源 Fork 介面難看，並將其誤認為官方應用程式。`@theo` 在未查證該儲存庫是否為合法 MIT Fork 的情況下，11 分鐘內連發兩則貼文辱罵其為 `"Chinese knockoff"`（中國山寨貨）與 `"Temu3 Code"`，直接嘲諷原作者的作品，並威脅將聯繫 GitHub 封鎖該作者整個帳號（`"Do it right now or I'm going to contact GitHub and have your account taken down"`）。與此同時，T3 Code 官方網站（[`https://t3.codes/`](https://t3.codes/)）卻將其 GitHub 儲存庫連結標示為 `"Steal our code (legally)"`（`"steal our code"`）（見[導火線原帖 1](https://x.com/realchendahuang/status/2125059292919394654)、[導火線原帖 2](https://x.com/realchendahuang/status/2125062675147448475)）。

該名 Fork 作者隨即配合處理，在 30 分鐘內將儲存庫更名為 `Stardust` 並移除所有 T3 品牌識別。`@theo` 雖透過私訊致歉，卻將合計超過 20 萬次瀏覽的兩則公開貼文原封不動留在版面上，既未刪除也未公開澄清。不到 11 小時後，於 11 月 24 日 `06:12 BJ`（`2124989435154726982`），當被問及兆美元等級的美國 AI 實驗室複製 T3 Code 功能是否越界時，他卻採取截然相反的立場：`"Nah. Open source is open source, even if a trillion dollar company uses it!"`（不，開源就是開源，就算兆美元公司拿去用也一樣）。與此同時，T3 團隊員工 `@maria_rcks` 自己亦公開託管了一個名為 `maria-rcks/t3libre`（*"T3 Code, liberated"*）的 Fork，且英語圈如 `t3code-quota-ui`、`t3code-atlas` 與 `t3code-bar` 等專案亦長期運作而未曾遭到任何公開威脅。

![Theo 公開威脅聯繫 GitHub 封鎖開源 Fork 作者帳號的原帖](../../evidence/01-origin-theo-threat.png)

![T3 團隊成員 @maria_rcks 公開託管名為 maria-rcks/t3libre（"T3 Code, liberated"）的 Fork](../../evidence/extra/p1-3-maria-t3libre.png)

自 11 月 24 日北京時間 17:04 起，我對 `pingdotgg/t3code` 的 commit 歷史、原始碼、PR、Issue、官方文件、USPTO TSDR 商標資料庫及 `@theo` 的公開 X 時間軸進行系統性稽核。在 24 小時內陸續發布 **18 篇實證貼文**，每篇皆附直達連結與截圖憑證。僅第 1 篇貼文便突破 **181 萬次瀏覽** 與 **6,640 次書籤收藏**，直接促成歐洲開發者提出 GDPR 檢舉，並迫使 T3 團隊展開長達 6 小時的通宵修補馬拉松。

---

## 2. 遙測機制、跨工具憑證讀取與 GDPR 後連夜修補戰（第 1、7、11、12 篇）

> **深度技術稽核：** 完整原始碼行號對照、`FeatureUsage.ts` 行為清單、`DesktopShellEnvironment.ts` 漏洞、`9d3195b4` 之後的 diff 與 11 月 23–25 日逐分鐘時序紀錄，收錄於 [**專題檔案 01：遙測架構、跨工具身分縫合與 11 月 24–25 日 GDPR 通宵修補戰**](../dossiers/01-telemetry-and-gdpr-timeline.md)。

### 2.1 預設遙測、遭刪除的首頁承諾與跨工具憑證雜湊（`第 1 篇`）

**2026 年 3 月 6 日**，`pingdotgg/t3code` 合併了 **PR #174**，在沒有儲存庫遙測說明文件、沒有首次啟動同意對話框、也沒有設定介面開關的前提下，預設啟用 PostHog 遙測。選擇退出用的環境變數深埋於程式碼中，一般使用者安裝並啟動後便會立即自動向外傳輸事件資料（[第 1 篇](https://x.com/realchendahuang/status/2125153472450527440)）。

在預設收集遙測資料的長達三個多月裡，T3 Code 官方首頁始終醒目地懸掛著兩行字：`No telemetry / Unless you opt in. Full stop.`（零遙測／除非您主動選擇加入，沒有例外）。直到 **2026 年 6 月 18 日**，`@theo` 在一次首頁改版中透過 [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) 靜默刪除了這兩行承諾，未發布任何公告，亦未通知既有使用者。

![2026 年 6 月 18 日 Commit 3bdaa6e1 靜默刪除首頁 "No telemetry / Unless you opt in. Full stop." 承諾](../../evidence/02-no-telemetry-removed.png)

2026 年 10 月，`@theo` 合併了 **PR #15028**，將每 10 秒批次上傳一次的遙測資料（`FLUSH_INTERVAL_MS = 10_000`）改道傳輸至 T3 自建的閉源閘道 [`https://ingest.t3.codes/`](https://ingest.t3.codes/)。[`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) 第 1 行註解即明確指出，該接收端點在轉發給 PostHog 前會先保留每一筆原始事件的複本：

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149 at 9d3195b4; line 156 at ca81b7b9)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

[`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) 與 `FeatureUsage.ts` 收集的欄位涵蓋服務供應商、模型選擇（在 `9d3195b4` 時透過 [`ProviderDimensions.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts) 原封不動傳送非官方目錄的自訂模型／端點 ID）、推理強度（reasoning effort）、權限模式、執行耗時、輸入／輸出／快取／推理 token 數量、子代理（child-agent）token 消耗、本機專案與對話串數量、**35 種獨立的介面與指令操作**（`18` 個 `COMMAND_FEATURES` + `17` 個 `METHOD_FEATURES`）、作業系統資訊、WSL 發行版與硬體架構。

**2026 年 10 月 19 日**，`@theo` 進一步提出並合併 **PR #21506**，以統計同一個人擁有多少台電腦。在基準 `9d3195b4` 中，[`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) 靜默讀取使用者家目錄中其他獨立 AI 工具的憑證檔案——`~/.codex/auth.json` 與 `~/.claude.json`——解碼其中的 OpenAI `user_id` JWT 聲明與 Claude `oauthAccount.accountUuid`，並將其連同已綁定的 T3 Connect 使用者 ID 與裝置 ID 一併雜湊上傳（此跨檔案讀取後於 [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) 移除，惟 `connect` 與 `device` 之無鹽擁有者雜湊機制依然保留）：

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338 at baseline 9d3195b4)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

而在 [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)（第 8–9 行）中，`hashTelemetryId` 計算的是 **無鹽 SHA-256 雜湊值**（`Hex.encode(sha256(new TextEncoder().encode(value)))`）。由於伺服器端已透過 Clerk 持有明文的 T3 Connect 帳號 ID，後端只需對明文計算一次雜湊，即可直接將無鹽雜湊值反查對應至具體的已知人員；外洩的第三方 OpenAI 或 Claude ID 亦能以決定性方式比對縫合至同一組雜湊。

![Identify.ts 讀取 ~/.codex/auth.json 與 ~/.claude.json 並傳送無鹽 SHA-256 雜湊值進行跨裝置歸因](../../evidence/03-identify-codex-claude.png)

來自社群的反彈屢遭壓制。**6 月 23 日**，一名開發者開啟 **Issue #1397** 請求在設定頁增加遙測開關；核心維護者 Julius 將其標記為 `not planned` 關閉並回覆：`We will not make this easier to opt out of, it is crucial for us to know how many users we have`。7 月，有使用者在 **Issue #4123** 貼出官網歷史封存截圖質疑違反 `"No telemetry"` 承諾，該議題於 10 月 21 日遭 `@theo` 帳號以無關 commit 關閉，引發眾怒重開後，又於 11 月 4 日再次遭靜默關閉。9 月至 11 月間，外部貢獻者先後提交了 **4 個獨立的選擇退出 PR**（`#13458`、`#16763`、`#21248`、`#27077`）。即便 `#27077` 已經過實機硬體測試、**通過 147 項測試** 並獲得 Macroscope 核准，仍在 **11 月 17 日** 被貼上 `unwanted` 標籤直接關閉。

<details>
<summary>展開查看 2 張拒絕選擇退出 PR 憑證（Issue #1397 與 PR #27077）</summary>

![核心維護者 Julius 將 Issue #1397 標記為 not planned 關閉並聲明不會讓選擇退出變得更容易](../../evidence/04-issue1397-no-optout.png)

![PR #27077 儘管通過 147 項測試與 Macroscope 審查，仍被貼上 unwanted 標籤未合併即關閉](../../evidence/extra/t3code-4-pr-27077-rejected.png)

</details>

### 2.2 受管原則（Managed Policy）與官方文件之間的矛盾（`第 7 篇`）

11 月 24 日批評聲浪升溫後，`@theo` 在 X 上宣稱 T3 Code 擁有業界最完善的企業受管原則（Managed Policy），設定上「輕而易舉且能關閉所有遙測」（`"trivial to set up and turn off all telemetry"`），並稱對話資料皆留於本機磁碟，「從未接觸我們的任何伺服器」（`"never touches any of our servers"`）（[`2125186071357251715`](https://x.com/theo/status/2125186071357251715)、[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)、[第 7 篇](https://x.com/realchendahuang/status/2125391659492081947)）。

然而直接檢視儲存庫內的 [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) 與 [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)，顯示的卻是相反事實：
1. **僅限系統管理員設定：** 桌面版使用者的設定介面至今依舊沒有任何遙測開關。透過 Managed Policy 停用遙測必須部署 MDM／群組原則，或將 `policy.json` 寫入受系統管理員權限保護的目錄（macOS 為 `/Library/Application Support/T3Code/policy.json`，Windows 為 `C:\Program Files\T3Code\policy.json` 或 `HKLM\SOFTWARE\Policies\T3Tools\T3Code`，Linux 為 `/etc/t3code/policy.json`）。
2. **託管網頁版（`app.t3.codes`）的盲點：** `docs/user/telemetry.md` 明確承認瀏覽器版應用程式不讀取伺服器環境變數、無視 Managed Policy、若建置時啟用追蹤則會發送連線追蹤紀錄，且「沒有中繼追蹤的關閉開關」（`"has no relay tracing toggle"`）。
3. **行動裝置應用程式不受伺服器原則管轄：** 伺服器環境變數與 Managed Policy「無法停用行動裝置端的追蹤」（`"do not disable mobile tracing"`；儘管連夜合併的 `PR #42415` 為行動端加入了 **Send connection traces** 開關，伺服器環境變數與受管原則仍無法停用行動裝置追蹤）。
4. **`Publish agent activity` 無視遙測退出設定：** 一旦主機啟用此選項，專案標題、對話串標題、模型名稱與即時活動狀態皆會傳送至 T3 Connect 中繼伺服器——且文件明載「遙測選擇退出設定無法停用此功能」（`"The telemetry opt-out does not disable it."`）。（此外，失敗的 Axiom 追蹤區段與行動端當機日誌「可能會引用應用程式當時正在處理的數值」（`"can quote a value the app was handling"`），而 `Agent feedback` 則可夾帶最高 16 KB 的對話訊息。）

![官方 docs/user/telemetry.md 證實託管網頁版無關閉開關、行動端不受 Managed Policy 管轄，且發布代理活動無視遙測退出設定](../../evidence/05-telemetry-cant-disable.png)

<details>
<summary>展開查看 Managed Policy 系統管理員路徑憑證（docs/user/managed-policy.md）</summary>

![官方 docs/user/managed-policy.md 列出 macOS、Windows 與 Linux 須系統管理員權限保護的設定路徑](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

</details>

### 2.3 11 月 25 日澄清聲明在 2 小時內遭自家補丁逐條拆穿（`第 11 篇`）

11 月 25 日上午，`@theo` 發布了一篇長文澄清（[`2125332390239494211`](https://x.com/theo/status/2125332390239494211)），同時附上一份公開遙測匯出檔案（[`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)），做出三項斬釘截鐵的保證——隨後又回覆網友否認在選擇退出時會於本機寫入追蹤檔案（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）（[第 11 篇](https://x.com/realchendahuang/status/2125394810559426993)）：

- **「從未收集檔案路徑」：** 發文 90 分鐘後，Julius 合併了 **PR #42450**，坦承由中繼伺服器觸發的 webhook 執行任務，先前會將整段執行追蹤資料匯出至 Axiom——其中包含帶有 `git.cwd` 的 Git 追蹤區段（涵蓋 **本機工作區絕對路徑、作業系統使用者名稱與儲存庫名稱**）。
- **「環境變數始終能乾淨地停用遙測」：** **PR #42376** 證實 Windows 桌面端在從既有的背景處理程序啟動時，曾無視使用者已儲存的 `T3CODE_TELEMETRY_ENABLED=false` 環境變數；而 **PR #42464** 則證實 macOS／Linux 首次啟動時的中繼追蹤在探索 shell 環境前即已判定，導致寫在 `~/.zshrc` 內的退出設定在該次整個執行階段全面失效。（截至 `ca81b7b9`，[`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) 至今仍未轉發 `T3CODE_OTEL_SDK_DISABLED` 與 `OTEL_SDK_DISABLED`。）
- **「選擇退出後不會寫入任何追蹤檔案」且「Claude 雜湊本來就是壞的」：** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152)（`9d3195b4` 為第 149 行，`ca81b7b9` 為第 156 行）在啟動時依然無條件呼叫 `getTelemetryIdentity`，在檢查 `telemetryEnabled` 之前便於本機磁碟寫入安裝識別碼（`upsertAnonymousId`）。同時，檢視 `@theo` 釋出之約 100MB 匯出檔（壓縮後 `6,056,594` 位元組，含 `95,789` 筆事件）的 gzip 檔頭，發現其原始檔名為於推文發布前 20 分鐘才產生的 `events.clean.jsonl`——然而即便經過清洗，裡頭仍保留著 **264 筆真實的 Claude 帳號紀錄**，在 10 月 20 日將 **4 台獨立機器**（不同的 `installId`）精準縫合至同一個 SHA-256 雜湊值，並完整曝光了私有代理模型名稱（如 `vibeproxy/gpt-6-luna`、`muse-proxy-wonder-full`）。

![PR #42450 證實透過中繼觸發的執行任務先前曾將含使用者名稱與儲存庫名稱的 git.cwd 絕對工作區路徑匯出至 Axiom](../../evidence/06-pr42450-absolute-path.jpg)

<details>
<summary>展開查看另外 3 張 11 月 25 日澄清與 100MB 匯出檔鑑識憑證（PR #42376、PR #42464、events.clean.jsonl）</summary>

![PR #42376 承認 Windows 桌面端先前無視使用者已儲存的 T3CODE_TELEMETRY_ENABLED=false 環境變數](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 承認 macOS 首次啟動時的中繼追蹤在整個工作階段無視 ~/.zshrc 退出設定](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![對 Theo 公開的 events.clean.jsonl 資料集進行鑑識檢驗，發現 264 筆 Claude 紀錄縫合 4 台機器並原樣外洩自訂代理模型](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

</details>

### 2.4 遭歐盟 GDPR 檢舉後的 6 小時通宵閃電戰（`第 12 篇`）

在 11 月 24 日晚間正式歐盟 GDPR 檢舉送件後，連夜合入的緊急 PR 進一步揭露了四項更深層的隱私缺失（[第 12 篇](https://x.com/realchendahuang/status/2125395501663281198)）：

1. **每小時 220 萬筆含 IP 之中繼追蹤紀錄（`PR #42380`）：** 坦承每一個匯出至 Axiom 的中繼請求追蹤區段——約 **每小時 220 萬筆，保留 30 天**——皆將 `client.address`（來自 `cf-connecting-ip` 的呼叫端真實 IP）與 `user_agent.original` 直接記錄在 `user.id` 旁邊（且另註明 Cloudflare 1% Workers 呼叫日誌仍獨立存在）。在該 PR 合併三個半小時後，`@theo` 仍在回覆中聲稱 IP 早已被剔除。
2. **形同虛設的帳號刪除流程（`PR #42285` 與 `PR #42430`）：** 坦承先前使用者於 Clerk 刪除帳號後，PlanetScale 中的中繼資料列與運作中的 Cloudflare 通道皆會原封不動留存，直到收到一筆正式的隱私刪除請求，才發現得 **手寫 SQL 指令並手動拆除通道**。
3. **行動端推播外洩（`PR #42459` 與 `PR #41859`）：** Android FCM 推播通知在每次推播時都將明文的 Clerk `user_id` 傳送給 Google；iOS 推播請求的追蹤紀錄與錯誤日誌則直接記錄了夾帶 token 的完整裝置推播網址。
4. **混雜實名身分的「匿名」意見回饋（`PR #42466`）：** 坦承號稱匿名的 `agent.feedback` 事件先前與帶有 `installId` 的具名事件及完整主機指紋（作業系統、架構、原始 WSL 發行版名稱）打包在同一個 HTTP POST 請求中傳送，公然違反 `docs/user/telemetry.md` 的說明。同時，官方 `privacy-policy.astro` 自 10 月 6 日以來一字未改。

![PR #42380 揭露中繼追蹤紀錄以每小時 220 萬筆的速率在 Axiom 保留 30 天，且於 user.id 旁記錄真實 IP 與 User-Agent](../../evidence/08-pr42380-220w-ip-axiom.jpg)

<details>
<summary>展開查看另外 3 張 GDPR 後連夜揭露憑證（PR #42285、PR #42459、PR #42466）</summary>

![PR #42285 承認帳號刪除先前會遺留中繼資料列與運作中的 Cloudflare 通道，直到收到隱私刪除請求才靠手寫 SQL 清理](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 承認 Android FCM 推播曾向 Google 傳送明文 Clerk user_id](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 承認匿名意見回饋曾與 installId 及主機指紋在同一個 POST 請求中批次傳送](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

</details>

### 2.5 稽核後遙測與身分歸因更新（`9d3195b4` → `ca81b7b9`）

持續追蹤上游 `pingdotgg/t3code` 至 `ca81b7b9`（`2026-11-25 14:49 CST`），確認官方合併了四項鎖定遙測縮減的修補，同時保留了核心未修復缺口：

- **`9d3195b4` 之後已合併：**
  - [**PR #42299**](https://github.com/pingdotgg/t3code/pull/42299)（[`84e4264b`](https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07)）：停止在 `Identify.ts` 讀取 `~/.codex/auth.json` 與 `~/.claude.json`（惟 `connect` `CLOUD_LINKED_USER_ID` 與 `device` 之無鹽 SHA-256 擁有者雜湊機制仍然保留）。
  - [**PR #42465**](https://github.com/pingdotgg/t3code/pull/42465)（[`6b3899f2`](https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da)）：更新 `ProviderDimensions.ts` 之 `modelLabel`（`第 66–72 行`），針對非官方目錄模型改傳 `custom:<driver>`（惟官方目錄／供應商模型即便走自訂端點仍會直接傳送原始模型代號）。
  - [**PR #42630**](https://github.com/pingdotgg/t3code/pull/42630)（[`c925b9ab`](https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b)）：在 [`otelEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts)（`第 322–343 行`）新增涵蓋 13 個 CI 環境變數的 `isCiEnvironment`，除非明確覆寫，否則於 CI 執行環境預設關閉 `AnalyticsService`（`第 130 行`）與 `isRelayTracingEnabled`。
  - [**PR #42629**](https://github.com/pingdotgg/t3code/pull/42629)（[`ef4a1643`](https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64)）：開始採認 `DO_NOT_TRACK`（`otelEnvironment.ts:346-347` 之 `isDoNotTrackSet`），同時由 `AnalyticsService.ts:137` 與 `isRelayTracingEnabled`（`otelEnvironment.ts:357`）檢查，並經由 [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) 與 [`DesktopBackendConfiguration.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts) 向下轉發（優先權高於 `T3CODE_TELEMETRY_ENABLED=true`）。
  - 配套收緊之 PR [**#42356**](https://github.com/pingdotgg/t3code/pull/42356)、[**#42394**](https://github.com/pingdotgg/t3code/pull/42394)、[**#42397**](https://github.com/pingdotgg/t3code/pull/42397)、[**#42398**](https://github.com/pingdotgg/t3code/pull/42398) 與 [**#42415**](https://github.com/pingdotgg/t3code/pull/42415) 分別收窄了伺服器開啟瀏覽器的追蹤、行動裝置 ID／開關、MCP 錯誤列舉與 `agent.feedback` 之 `installId` 關聯。
- **截至 `ca81b7b9` 仍未修復：** [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts)（`第 156 行`，即 `9d3195b4` 第 149 行）仍在檢查 `telemetryEnabled` **之前**於啟動時無條件執行 `getTelemetryIdentity`（`upsertAnonymousId`）；`DesktopShellEnvironment.ts` 依然遺漏轉發 `OTEL_SDK_DISABLED` 與 `T3CODE_OTEL_SDK_DISABLED`；閉源 `ingest.t3.codes` 仍為預設閘道；桌面端設定介面仍無開關，且 `app.t3.codes` 亦無退出按鈕；行動端依舊不受受管原則約束；`Publish agent activity` 依然無視退出設定；而 `privacy-policy.astro` 的生效日期亦停留在 `2026-10-06`。

---

## 3. 本機儲存、處理程序監控、防護繞過與未公告安全修補（第 2、3、13 篇）

> **深度技術稽核：** 逐字 SQLite 清理語句、Rust `sysinfo` 系統呼叫細節、`ClaudeAdapterV2.ts` 權限繞過原始碼、`9d3195b4` 之後的 diff 以及完整的 `SECURITY.md` 邊界剖析，收錄於 [**專題檔案 02：本機安全性、靜默程式執行繞過與未公告安全稽核**](../dossiers/02-local-safety-and-security-audit.md)。

### 3.1 SQLite 假刪除與全機處理程序掃描（`第 2 篇`）

當使用者在側邊欄刪除一個對話串時，確認對話框（`useThreadActionMenu.ts`）承諾 `"This permanently clears conversation history for this thread."`（這將永久清除此對話串的對話紀錄）。然而在基準 `9d3195b4` 中，`ThreadDeletion.ts` 僅向 `statev2.sqlite` 附加一筆 `"thread.deleted"` 事件，而 `ProjectionMaintenance.ts` 又豁免了 `thread.created` 與最新串流事件（`MAX(newer.sequence)`），使所有先前的事件資料皆留在磁碟上。多名使用者回報 `statev2.sqlite` 在三週內膨脹至 **25.9 GB**（其中 90% 為所謂「已刪除」的對話串）、六週內達 **41.6 GB**、七週內達 **33 GB**——致使 **Issue #17845**（以及 **#28903**）自 10 月 10 日起長期懸而未決（[第 2 篇](https://x.com/realchendahuang/status/2125160473176023486)）。

11 月 25 日，[**PR #42119**](https://github.com/pingdotgg/t3code/pull/42119)（[`91f0b32e`](https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e)，`2026-11-25T05:58:26Z`）藉由新增非同步 `thread-content.purge` 清理佇列（`ThreadDeletion.ts`、`ProjectionMaintenance.ts`）關閉了 **Issue #17845**。然而於 `ca81b7b9` 實碼檢查顯示：凡是被任何活躍分支（fork）、待處理 `merge_back` 或活躍父層子代理引用的已刪除源對話串仍會繼續保留其歷史紀錄；墓碑中繼資料列依然留存於 SQLite；且要縮減磁碟上實際的 `.sqlite` 檔案體積，依然須由使用者離線執行 `VACUUM`。

![Issue #17845 回報永久刪除的對話串仍完整留存於 statev2.sqlite，導致磁碟空間膨脹數十 GB](../../evidence/10-issue17845-fake-delete.png)

另一項本機背景程式 `t3-resource-monitor`（**Issue #11222**，`native/resource-monitor/src/main.rs` 呼叫 `ProcessesToUpdate::All` 並搭配 `with_cmd(UpdateKind::Always)`）即便在診斷面板關閉的情況下，仍每 5 秒鐘掃描整台機器的所有處理程序——在 Windows 上甚至會對 440 多個無關的應用程式與遊戲開啟約 280–300 個持續控制代碼（handle），完全沒有退出開關，而官方文件卻宣稱僅在有活躍訂閱者時才進行採樣。直到 **11 月 24 日**，**PR #41889** 才證實處理程序診斷功能先前一直將 **完整的處理程序命令列參數**——其中經常包含明文的 API 金鑰、資料庫密碼與驗證權杖——寫入即時遙測與歷史快照之中。稽核後合入的 [**PR #42577**](https://github.com/pingdotgg/t3code/pull/42577)（[`af276ccb`](https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c)，`2026-11-25T04:09:53Z`）僅停止 Windows 版 `t3-resource-monitor` 讀取未追蹤處理程序的記憶體與命令列參數，Linux 與 macOS 仍維持兩階段 `ProcessesToUpdate::All` 全機掃描，且 `PR #41889` 依然處於未合併狀態。

<details>
<summary>展開查看 Issue #11222 全機處理程序監控憑證</summary>

![Issue #11222 記錄 t3-resource-monitor 每 5 秒掃描本機所有處理程序](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

</details>

第 2 篇中其他經過查證的本機缺陷還包括：
- **企業內部主機名稱外洩至 Favicon API：** 前端請求曾將公司內部主機名稱（如 `devbox.localdomain`）洩漏給 Google 的 favicon API（`PR #16950`、`PR #32657`）。
- **啟動時強制向外連線擷取資料：** 即使停用了遙測，伺服器啟動時仍會無條件向 [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) 擷取相容性資訊清單且無任何開關可停用（**Issue #36479**）。
- **權限核准與原則繞過：** 完整存取權限及 WSL／Tailscale 的核准與原則繞過修補（`PR #21806`、`PR #27322`）。
- **1.7 倍 Claude 配額消耗與 136 倍異常功耗：** 透過 Agent SDK 驅動 Claude 曾以正常速度的 **1.7 倍** 燒掉 5 小時配額，直到 11 月初才緩解（`Issue #7338`、`Issue #24649`，共 81 則留言）；GPU／功耗異常高達同類 Electron 應用的 **136 倍**——包含將 MacBook 的 19 核心 GPU 鎖死在 **60W**、78 分鐘榨乾電池，以及關閉網頁分頁後背景仍消耗 **18W**（`Issue #3143`、`Issue #40581`）。

### 3.2 拖延 52 天的靜默 `git push --force` 與 21 小時極速移除模型隱私過濾（`第 3 篇`）

自 **10 月 3 日** 起——且在 **`ca81b7b9` 依然未修**——**Issue #15353**（[留言佐證](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)）顯示 Claude Auto 模式會靜默放行危險指令（當 `requiresClaudeApproval` 評估為 false 時，`ClaudeAdapterV2.ts` 直接短路回傳 `"allow"`）。即便完全沒有設定任何自訂規則，當 Claude 安全分類器兩度攔截 `git push --force origin main` 並在第三次嘗試將其升級為須由人工確認後，T3 Code 仍在沒有任何介面提示視窗的情況下靜默核准執行，並在日誌中記入 `"source": "user_temporary"`。社群提交的兩個修補 PR（`#15360`、`#35207`）長期未獲審查直到被機器人自動關閉，而 `#40692` 亦處於擱置狀態（[第 3 篇](https://x.com/realchendahuang/status/2125201882687881378)）。

![Issue #15353 懸置超過 52 天未修，顯示 Claude Auto 模式在未詢問使用者的情況下靜默核准 git push --force](../../evidence/11-issue15353-auto-force-push.png)

形成鮮明對比的是，**11 月 22 日**有人開啟 **Issue #40948** 反映較新的模型沒有出現在 `@theo` 公開的遙測排行榜 [`https://slopalytics.com/`](https://slopalytics.com/)（[`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)）上，原因是 `PR #29001` 曾將上報範圍限制在白名單內。僅僅 **21 小時** 後，`@theo` 帳號底下便合併了 **PR #41237**，並明確註記係應 Theo 要求移除該過濾機制——從此將企業內部的 `ollama/acme-internal` 與 `acme-azure-deployment` 等私有模型名稱原封不動上報至公開分析平台（後續 `PR #42465` 才將非目錄模型改為 `custom:<driver>`，惟官方目錄／供應商模型代號在自訂端點下仍會持續回報）。

<details>
<summary>展開查看 PR #41237 於 21 小時內移除過濾器憑證（slopalytics.com）</summary>

![PR #41237 在 Issue #40948 開啟後僅 21 小時即火速合併，移除供 slopalytics.com 使用的模型過濾器](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

</details>

### 3.3 零筆安全性公告、靜默修補漏洞與 `SECURITY.md`（`第 13 篇`）

截至 11 月 25 日（`ca81b7b9`），`pingdotgg/t3code` 的 [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) 頁籤依然維持 **0 筆已發布公告**（[第 13 篇](https://x.com/realchendahuang/status/2125395980354994414)）。然而維護者卻在未通知既有使用者的情況下，靜默合併了一連串高嚴重性安全修補：
- **已靜默合併的安全修補：** `PR #39483`（裝置核准前透過中繼 `jti`/`nonce` 觸發的 `ServerSecretStore` 路徑遍歷漏洞）、`PR #41756`（跨網域企業 GitHub／GitLab 權杖外洩）、`PR #41886`、`PR #22190`、`PR #37823`、`PR #39464`、`PR #39480`、`PR #40133`、`PR #41757` 與 `PR #42386`（未經沙盒隔離的桌面瀏覽器預覽與 worktree 版面設定指令確認修補）、[`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413)（收緊桌面版 Clerk 權杖檔案為僅限擁有者讀寫權限），以及 `PR #42504`（約 3,000 行的大型修補，終於為先前無需核准即可在本機執行指令的未受信任儲存庫組態加上確認提示）。
- **截至 `ca81b7b9` 尚未解決／仍處於開啟狀態：** `Issue #26489`（外部路徑遍歷／符號連結風險）、`PR #36216`、`PR #23428`、`PR #33144`、`PR #30997`（Windows 啟動器 `externalLauncher.ts` 呼叫 `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` 遭 AVG/Avast 偵測標記為 `IDP.HELU.PSE96`），以及未受信任儲存庫的執行風險（[`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) 自動遞迴初始化 `.gitmodules`、[`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) 遺漏全域 `core.hooksPath=/dev/null`，以及 [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) 以完整繼承的 `GITHUB_TOKEN` 與 `SSH_AUTH_SOCK` 執行 `.claude/settings.json` 中的 `SessionStart` 鉤子）。
- **倉促補上的 [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)（`PR #38812`、`PR #41942`）：** 至今仍明文將讀取工作區以外的全作業系統 `filesystem:read`、iOS／區網上的明文 HTTP 傳輸，以及中繼簽章金鑰外洩導致的整機接管宣稱為**預期設計邊界**而非漏洞；而 [`https://ingest.t3.codes/`](https://ingest.t3.codes/) 至今仍維持閉源狀態（`2125370330244128924`）。

<details>
<summary>展開查看 3 張靜默安全修補與 SECURITY.md 憑證（PR #39483、PR #30997、SECURITY.md）</summary>

![PR #39483 在未發布任何安全性公告的情況下靜默修補 ServerSecretStore 路徑遍歷漏洞](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 針對 Windows Base64 EncodedCommand PowerShell 啟動遭防毒軟體標記為惡意程式的未關閉修補](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md 明確將全系統檔案讀取、iOS 任意明文 HTTP 與中繼金鑰接管機器標記為預期邊界](../../evidence/extra/x-post05-4-security-md-intended.jpg)

</details>

---

## 4. Google Antigravity 條款風險與未加密 T3 Connect 中繼架構（第 4、5 篇）

> **深度技術稽核：** 完整的 `cliproxyApi.ts` 標頭對照表（`PR #33800`）、`AntigravityAcpSupport.ts`、`AntigravityTurnOutcome.ts`、`contracts/src/settings.ts` 與 `ManagedEndpointProvider.ts` 程式碼行號索引，收錄於 [**專題檔案 03：Google Antigravity 條款偽裝、`PR #33800` 與 T3 Connect 中繼架構**](../dossiers/03-antigravity-tos-and-t3connect-relay.md)。

### 4.1 Google Antigravity 標頭偽裝、假 `SSH_CONNECTION` 與 3 分鐘停權（`第 4 篇`）

T3 Code 官方 [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) 向付費使用者打包票：*「我們與所有實驗室均有合作，T3 Code 完全符合 Claude Code、Codex 與 Google Antigravity 的服務條款……只要在 T3 Code 裡能運作，你就可以放心它是安全的。」* 然而當使用者在 **Issue #40713** 回報帳號遭停權時，一名維護者竟否認有呼叫 Antigravity 後端或重複利用權杖，聲稱所有請求皆出自 Google 官方 CLI——直到開發者（`schlessera`）直接引述 T3 Code 自家原始碼當場拆穿（[第 4 篇](https://x.com/realchendahuang/status/2125213397507858657)）：

1. **偽裝 User-Agent、擷取金鑰圈與直連 `v1internal`（[`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)）：** 從本機檔案、`@napi-rs/keyring` 或 Windows 認證管理員（透過 `ffi-rs` 呼叫 `advapi32.dll` 的 `CredReadW`）擷取 Google OAuth 憑證，硬編碼偽造 Google 內部用戶端字串，並直接對 Google 未公開的 `v1internal` 後端發送 `POST` 請求（[第 445–476 行](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)）。Google 人員早已在[官方開發者論壇](https://discuss.ai.google.dev/t/185992)確認，[Google Antigravity 服務條款](https://antigravity.google/terms)第 6 條明令禁止第三方工具擷取或重複利用憑證直接查詢後端：

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
);
```

2. **注入偽造 `SSH_CONNECTION` 與跨帳號路由錯亂（[`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)）：** 由於 Google CLI 將單一登入狀態隔離在作業系統金鑰圈中，T3 刻意注入偽造的 `SSH_CONNECTION` 環境變數，誘騙官方 CLI 以為自己運行於遠端 SSH 連線並將明文權杖寫入本機檔案。當 Google 於 11 月 24 日更新 CLI 移除該降級機制後，**Issue #41973** 實測證實帳號 A 發出的提示詞會毫無預警地路由至帳號 B 執行：

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **全新帳號 3 分鐘即遭停權（`Issue #41536`）、用戶端冒充（`PR #26876`）與稽核後驗證觸發（`PR #41210`）：** 11 月 23 日，**Issue #41536** 記錄了一名剛花 `$20` 購買全新 Google AI 訂閱的使用者，在 **完全沒開任何代理程式**、僅於 T3 Code 內啟用受管 Antigravity 的情況下，於**完成設定 3 分鐘後送出第一則訊息即遭永久停權**（Google 對個人帳號僅提供一次申訴機會；維護者未加任何風險警告便以重複議題為由直接關閉）。更早之前，`@theo` 亦親自合併 **PR #26876**，將 T3 Code 偽裝成 `"zed"`（[`AntigravityAcpSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts)）以繞過模型白名單限制。儘管 `@theo` 於 11 月 23 日畫出 `T3 Code -> Antigravity binary ✅` 圖示（[`2124665075638411641`](https://x.com/theo/status/2124665075638411641)）並在用戶 `@Only_21Mil` 第二個 Google AI Ultra 帳號被停權時將責任推給 CLIProxy（[`2124703048140517397`](https://x.com/theo/status/2124703048140517397)），早已合併的 [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) 實則原生將 [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) 中樞輪詢寫死在軟體內，並偽裝 `claude-code/2.1.273`、`grok-cli/1.0.77` 與 `antigravityUserAgent` 標頭。
   - **稽核後狀態（`ca81b7b9`）：** [**PR #41210**](https://github.com/pingdotgg/t3code/pull/41210)（[`3e74a0aa`](https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836)，`2026-11-25T05:23:36Z`）在 [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) 新增對 `cloudcode-pa.googleapis.com` 回傳 `403 PERMISSION_DENIED`（`VALIDATION_REQUIRED`）的解析，藉以在回合時間軸上直接顯示 Google 帳號驗證連結——反過來印證了 Google 風控驗證的頻繁觸發；而 [**PR #42545**](https://github.com/pingdotgg/t3code/pull/42545)（[`4da8d19d`](https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc)）則修復了 `AGY_CLI_DISABLE_AUTO_UPDATE: "true"`（併同 [`#42339`](https://github.com/pingdotgg/t3code/pull/42339) 與 [`#42475`](https://github.com/pingdotgg/t3code/pull/42475)）。上述全數四條偽裝與擷取路徑——[`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts)、[`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts)、`AntigravityAcpSupport.ts` 與 `cliproxyApi.ts`——於 `ca81b7b9` 依然完整運作。

![antigravityUsageLimits.ts 硬編碼偽裝 Google 官方用戶端標頭並直連未公開的 v1internal 後端](../../evidence/12-antigravity-v1internal-spoof.png)

<details>
<summary>展開查看另外 3 張 Antigravity 偽裝與停權憑證（SSH_CONNECTION、Issue #41536、PR #33800）</summary>

![antigravityAuthSupport.ts 注入偽造的 SSH_CONNECTION 環境變數以繞過作業系統金鑰圈儲存限制](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 記錄全新 $20 無代理 Google 帳號在完成設定三分鐘後發出首則訊息即遭停權，並被標為重複關閉](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 直接將針對 Antigravity、xAI 與 Claude 的 CLIProxyAPI 中樞輪詢接線進 T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

</details>

### 4.2 T3 Connect：零端對端加密與 OVH TLS 終止閘道（`第 5 篇`）

**T3 Connect 完全沒有端對端加密——技術上，每一段提示詞、原始碼檔案與終端機輸出對 T3 而言皆隨時處於明文可見狀態**（[第 5 篇](https://x.com/realchendahuang/status/2125218189596676555)）。現行架構由 [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) 在 T3 自有的 Cloudflare 帳號底下佈建 Cloudflare Tunnels 與 DNS 紀錄（`06_t3-connect.md`）。TLS 在 Cloudflare 邊緣節點即已終止，應用層酬載毫無加密；只要掛上一條 Workers Route 即可攔截所有流量，完全無需修改開源程式碼，用戶端亦不會收到任何警示。

新裝置核准機制（於 [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419) 新增的 `requireConnectDeviceApproval`）在 [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)（`ca81b7b9` 第 1424–1426 行）預設值依舊為 **`false`**，即便稽核後的 [**PR #42311**](https://github.com/pingdotgg/t3code/pull/42311)（[`ece5f21b`](https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd)）僅新增了新裝置登入通知。正如 [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) 所承認，外洩的中繼簽章金鑰或遭入侵的雲端帳號能直接對已連線的本機核發工作階段——等同於取得本機終端機 shell 控制權。同時，針對 `ca81b7b9` 的原始碼檢視（[專題檔案 03](../dossiers/03-antigravity-tos-and-t3connect-relay.md)）另確認四項驗證／區網／通道缺陷：`t3 up --lan` 明文 HTTP 仍會下發不含 `Secure` 標記的 30 天 Shell Cookie（[`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042)，[`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)，[`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493)），並接受未附 `Origin` 標頭的請求（[`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)）；非 DPoP 的 `/oauth/token` 交換會簽發無 `/logout` 路由、封鎖自行撤銷且無法撤銷的 30 天未綁定 Bearer 權杖（[`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)，[`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)，[`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)）；URL 中效期 5 分鐘的 `?wsTicket=` 憑證對 Bearer RPC 與所有 `media` 路由皆缺乏重放保護（[`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)，[`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156)）；而 `startupAccess.ts` 以 `NodeNet.isIPv4` 誤判 `::1`，會靜默呼叫 `socket.destroy()` 切斷 Tailscale Serve／Connect 通道（[`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)）。當 **Issue #32098** 要求導入雙向驗證與端對端加密時，一名維護者以完整端對端加密改動幅度過大為由將該議題關閉；社群另外兩則討論 `#21286` 與 `#37831` 至今無人回覆，而 `@theo` 更在 11 月 25 日斷言端對端加密在技術上不可能實現（`2125370330244128924`）。

由於 Cloudflare Tunnels 每月帳單高達 **25,000 美元**，`@theo` 開啟了 **PR #32945**，計畫將流量遷移至 T3 向 OVH 承租的 Hillsboro 閘道伺服器（`gw.t3coderelay.com`），改由 T3 自己的 Caddy 終止 TLS 並透過 Unix socket 將明文轉發給 Go `yamux` 代理程式——依然沒有任何端對端加密。同時，[`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)（`effectiveDate="2026-10-06"`）僅含糊承諾 `"encrypted network transport"`，隻字未提缺少端對端加密，亦未提供零留存保證。

![核心維護者在 Issue #32098 中承認失竊的雲端帳號或中繼金鑰可控制已連線機器，同時將端對端加密排除於開發範圍之外](../../evidence/15-connect-no-e2e.jpg)

<details>
<summary>展開查看 OVH Caddy TLS 終止閘道憑證（PR #32945）</summary>

![Theo 的 PR #32945 揭露每月高達 2.5 萬美元的 Cloudflare 帳單，並擬將 T3 Connect 遷至由 Caddy 終止 TLS 的自建 OVH 閘道](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

</details>

---

## 5. 商業帳本、投資人利益衝突、贊助商與 7.7 萬星標漏斗（第 6、8、17、18 篇）

> **深度技術稽核：** 完整營收與算力雷達引述、`infra/relay/src/observability.ts` Axiom 組態，以及 `GitHubStarPrompt.tsx` 完整拆解分析，收錄於 [**專題檔案 04：商業帳本、投資人利益衝突、贊助商生態與 7.7 萬星標引擎**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)。

### 5.1 逾 80 萬美元投入與單日 31.7 兆 Token（$10.19M/日）算力雷達（`第 8 篇`）

在歷時 17.24 天的 1,151 則推文中，`@theo` 提及 T3 Code 高達 **162 次（佔比 14.1%）**，卻對他過往的三項付費老本行——`T3 Chat`、`UploadThing` 與 [`https://ping.gg/`](https://ping.gg/)——隻字未提（**0 次**）。11 月 12 日，他親自證實自己已在這款免費 MIT 用戶端上自掏腰包燒掉 **$800k+**（[`2120729779511124267`](https://x.com/theo/status/2120729779511124267)、[第 8 篇](https://x.com/realchendahuang/status/2125392410763239723)）。

作為回報，匯入 `ingest.t3.codes` 的遙測資料為他建構了一座即時算力雷達：11 月 18 日單日追蹤量高達 **31.7 兆 token**——等效 API 消費額達 **每日 1,019 萬美元**（峰值接近 **每日 $10.2M**）——並能精確掌握市場份額消長（`99%` 屬訂閱制用量、Codex／Claude／Antigravity 三強合佔 `~98.5%`、開放權重模型試用比例從 `15%` 跌至 `6%` 且實際提示詞佔比低於 0.5%）。11 月 23 日當一名留言者猜測模型市佔時，`@theo` 直接嘲諷對方沒有權限看到他的後台分析數據（`2124682906132181482`）。

這座算力雷達隨即直接變現為談判籌碼：包含在單場 GPT-6.2 Astra 基準測試中便燒掉 **$300k+ 無上限免費 OpenAI 早期測試 token**（`2122760447103484410`）、Google 提供的裸機測試與 DeepMind 團隊互動（儘管 `@theo` 宣稱 DeepMind 的 `@PatrickToulme` 貢獻了「許多 PR」，但檢視 `pingdotgg/t3code` git 紀錄實際僅有 **1 筆 commit**，即 `PR #31158`），以及多方創投主動接洽（`"multiple investors have asked me about this"`，[`2123885732330885417`](https://x.com/theo/status/2123885732330885417)）。

![Theo 公開的 T3 Code 內部算力分析看板，顯示單日跑出 31.7 兆 token 與等效 $10.19M 的 API 消費](../../evidence/17-theo-31t-tokens-10m-day.png)

<details>
<summary>展開查看 Patrick Toulme 僅 1 筆 commit 查證截圖（PR #31158）</summary>

![經 patrick-toulme 篩選的 pingdotgg/t3code commit 歷史紀錄僅顯示 1 筆 commit（#31158），而非其宣稱的 "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

</details>

### 5.2 天使投資人利益衝突（`第 6 篇`）與贊助商／配額雙重標準（`第 17 篇`）

- **Vibe Kanban 與 Daytona 投資重疊（[第 6 篇](https://x.com/realchendahuang/status/2125385742243520653)）：** 11 月 16 日（`2122201981167251877`），`@theo` 透露自己曾是 **Vibe Kanban** 的投資人兼貢獻者——該團隊後來轉型朝向類似 T3 Code 的介面發展卻因燒光資金而停業——他隨即在貼文中嘲諷那套 UI 很適合「燒光跑道資金把公司搞垮」（`"for running out of runway and killing your business"`）。11 月 18 日（`2123011578090127499`），他又證實自己投資了雲端沙盒公司 **Daytona** 及其多家競爭對手——而僅在 9 天前，他才剛提議將付費雲端沙盒整合進 T3 Code（`2119705561679933806`）。
- **深植於中繼架構的贊助商名單（[第 17 篇](https://x.com/realchendahuang/status/2125411353393553744)）：** `@theo` 在 2023 年 5 月公開的 YouTube 贊助商名單（`1657488850472804353`）中的兩家廠商——**Clerk** 與 **Axiom**——正是驅動 T3 Code 雲端認證與 30 天含 IP 中繼日誌的核心元件。2024 年 4 月 Vercel 執行長 `@rauchg` 證實 Vercel 僅贊助了 Theo 一人（`1776260839965863965`），而 Theo 本人稍後亦承認贊助合約帶有排他條款（`uv179CTAK-w`）。他同時也是 Cursor 與 Cline 的天使投資人。
- **Codex 0% 漏洞利用與 10 帳號 CLIProxyAPI 自相矛盾：** 2026 年 8 月 21 日，`@theo` 公開炫耀自己利用 Codex 配額歸零後的寬限機制額外榨取 **$800+** 算力，同時 T3 員工 `@maria_rcks` 發布 *Endless* 工具專門循環續跑突破 0% 限制；8 月 22 日遭社群炎上後，兩人雙雙刪文且 Maria 公開表示希望 Codex 封鎖違規帳號（`2090972426876129658`），隨後促使 OpenAI 強硬收緊機制，額度歸零立即切斷進行中的任務（`openai/codex#45444`）。同年 10 月，`@theo` 又發布了一份累積 452 星標的 Gist 教學（`59a521d2ee8d70aaf90e280c175072af`），示範如何聚合 **7 個 Claude 帳號與 3 個 Codex 帳號**（橫跨 12 台以上機器達 `555%` 配額；他並另行炫耀透過 110 萬次代理請求榨出 `$14,662`／`$15k` Ultra 產出，以及撰寫 Grok Bot + `$100` Claude 串接教學）——而 T3 Code 自己的 `docs/user/faq.md` 卻在以停權風險為由拒絕內建多帳號切換功能的下一段，直接附上該篇 Gist 教學連結，末了僅附上一句 `"Early apologies if it gets you banned 💀"`（若因此被鎖帳號先說聲抱歉）。

<details>
<summary>展開查看 3 張利益衝突、CLIProxyAPI Gist 與 Codex 0% 配額憑證</summary>

![Theo 自曝曾為 Vibe Kanban 投資人兼貢獻者，卻在其倒閉後公開拿該專案的失敗開玩笑](../../evidence/18-theo-vibe-kanban.png)

![Theo 累積 452 星標的 cliproxy-setup.md Gist，示範將 7 個 Claude 與 3 個 Codex 帳號聚合至 12 台以上電腦共用並顯示 555% 配額](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 記錄因制度收緊導致配額達 0% 時在任務中途強制終止回合的全球退化問題](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

</details>

### 5.3 T3 Code 如何在 25 天內從 3 萬暴衝至 7.7 萬星標（僅 129 名關注者）（`第 18 篇`）

在發布 *「Github has a fake star problem」* 影片（`2048122499834036340`，警告星標已淪為「欺騙創投投資」的工具）僅六個月後，`@theo` 便親自撰寫並自行合併了三個 PR（[第 18 篇](https://x.com/realchendahuang/status/2125416210120765799)）：
1. **10 月 30 日（`PR #27832`）：** 在發出 5 則提示詞後（`PROMPTS_BEFORE_ASKING = 5`，於 [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) 第 6 次提示觸發），於右上角彈出討星視窗，立即讓每日新增星標數暴增 **10 倍**（`2117065834267136469`）並以 **單日 +3,094 星** 衝上 GitHub Trending（`2117172614158508400`）。
2. **11 月 3 日（`PR #29922` 與 `PR #29987`）：** 升級為**視窗閒置 30 秒偵測**（`IDLE_MS = 30_000`），專挑使用者等待代理執行任務的空檔跳出；同時將原本導向瀏覽器的設計改為呼叫 `sourceControl.star` RPC——直接動用 **主機伺服器的 GitHub 憑證** 發送 `PUT user/starred/pingdotgg/t3code` 完成點星，接著噴出 160 顆五彩碎紙特效。
3. **繞過審查與任意儲存庫點星漏洞（截至 `ca81b7b9` 仍未修復）：** 審查機器人 Macroscope 將 `PR #29922` 標記為 `Needs Human Approval`；`@theo` 依舊逕行自行合併。11 月 6 日，開發者 `zhilsinger` 提交 `Request changes` 指出共享主機憑證的不透明風險（`GitHubStarPrompt.tsx#L115` 註解亦親口承認），並點出 [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) 根本未鎖定目標為 `pingdotgg/t3code`：

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

任何具備 `source-control:write` 權限的用戶端皆可藉此利用主機憑證替任意儲存庫按星。`zhilsinger` 的審查意見就這樣在零回覆且未修復的情況下一直維持到 `ca81b7b9`（提出後已逾 **19 天**），而儲存庫星標數則一路從 3 萬飆升至 7.7 萬（關注者僅 129 人）。

![Theo 於 11 月 2 日曬出的成長曲線圖，顯示在應用程式內置入討星提示後每日新增星標幾乎呈垂直 10 倍暴衝](../../evidence/20-star-10x-cliff.png)

<details>
<summary>展開查看 zhilsinger 審查意見與 driver.ts 任意儲存庫點星憑證（PR #29922）</summary>

![開發者 zhilsinger 在 PR #29922 提出 Request Changes 審查意見，警告共享主機代點星與藉伺服器憑證替任意儲存庫按星的漏洞，卻遭擱置 19 天零回覆](../../evidence/21-pr29922-zhilsinger-review.png)

![packages/source-control-github/src/server/driver.ts 第 60–99 行未鎖定目標儲存庫為 pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

</details>

---

## 6. 社群治理、Fork 爬蟲機器人、商標紀錄、1,151 則推文資料集與歷史脈絡（第 9、10、14、15、16 篇）

> **深度技術稽核：** 完整治理自動化腳本（`.github/scripts/pr-limits.cjs`）、USPTO TSDR 檢索稽核，以及 `n = 1,151` 資料集之完整研究方法與詞彙統計表，收錄於 [**專題檔案 05：儲存庫治理、Fork 爬蟲機器人、商標越界與歷史紀錄**](../dossiers/05-governance-trademark-and-history.md) 與 [**專題檔案 06：1,151 則推文量化鑑識資料集（2026 年 11 月 7–24 日）**](../dossiers/06-tweet-forensic-dataset-1151.md)。

### 6.1 內部高速開發 vs 對外敵意治理（`第 9 篇`）與公開爬梳他人 Fork（`第 10 篇`）

- **每日 500 筆 Commit 與 `yolo merges` vs `CONTRIBUTING.md`（[第 9 篇](https://x.com/realchendahuang/status/2125392916369871309)）：** `@theo` 曾描述其內部開發節奏為單日推進 **500 筆 commit**（`2120741101250515322`）、同時運行 **700 個代理**、Julius 透過代理迴圈批次自動合併 PR、`"my yolo merges breaking shit sometimes"`（`2119951615679672513`），甚至不惜冒著弄毀本機系統的風險來換取 `"free content"`（`2119993037971730879`）。然而對待外部使用者與貢獻者卻截然不同：**PR #5551** 將 Plan 模式埋入角落（配文 `"Reality check for those upset"`，10 個倒讚）、**PR #9190** 隱藏上下文進度圈（16 個倒讚，全庫最高）、**PR #33131** 夾帶荒謬的 AI 摘要徹底刪除 Plan 模式、**Issue #33639** 對反映意見的使用者辱罵 `"uninstall our software"`／`"ungrateful prick"`（且隔天上午隨即拒絕 **PR #41572**）、`CONTRIBUTING.md` 開宗明義勸退 `"here's my advice: Don't"` 並搭配模型禁用與在 `.github/VOUCHED.td` 公開批鬥自動封鎖名單（全庫累積高達 174 個 `unwanted` 標籤），在 X 上則數落想貢獻的人竟沒追蹤他（`2120821423438778667`）、威脅收回 `/btw` 功能（`2120853340078874923`），甚至稱給他畫箭頭的截圖遠勝過提交 PR（`2123754193530053110`）。
- **公開派 `@bot` 扒取他人 Fork vs 嘲諷競爭對手（[第 10 篇](https://x.com/realchendahuang/status/2125393641665671593)）：** 11 月 8 日，`@theo` 在開發者 `@MiaAI_lab` 展示自改 Fork 功能下回覆 `"Okay I'm stealing this"`，30 秒後便於公開留言區呼叫 `@bot`，下令透過 Opus 5.5 將她的 Fork 搬運至 `beebox` 整合進 T3 Code（`2119240810202034645`）；11 月 13 日他再次指派 `@bot` 複製競爭工具備受好評的功能（`2121017649652269120`）。然而 11 月 24 日 Claude Code Desktop 推出側邊欄分頁時，他卻發文嘲諷對方抄襲（`2124987957803446311`）。面對批評者，他一邊號召粉絲利用 Community Notes `"demonetize them"`（斷絕其創作者分潤收益，`2120238923884696025`），一邊親口證實自己運行 X 自動封鎖機器人（11 月 24 日單日封鎖約 100 個帳號，`2125077510941802509`）。

![CONTRIBUTING.md 勸退外部 PR 並詳述寫入 .github/VOUCHED.td 的公開點名封鎖規則](../../evidence/22-contributing-vouched-ban.png)

<details>
<summary>展開查看 Issue #33639 與 @bot 爬梳他人 Fork 憑證</summary>

![Theo 在 Issue #33639 中要求 @bermudi 解除安裝軟體並辱罵對方為 ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo 回覆 "Okay I'm stealing this" 並於 30 秒後當場指派 @bot 爬取開發者的 Fork 移植進 T3 Code](../../evidence/23-stealing-fork-bot.png)

</details>

### 6.2 商標稽核：USPTO 零筆註冊與事後補救的 `PR #41898`（`第 15 篇`）

順著 `@vildanden_ai` 提供的線索（`2125275487404761555`）查詢美國專利商標局（USPTO）TSDR 資料庫後發現：`T3 Code`、`T3 Tools` 與 `T3 Connect` 均為 **0 筆** 註冊紀錄（[第 15 篇](https://x.com/realchendahuang/status/2125408163273080950)）。T3 Tools Inc. 歷史上唯一的 USPTO 申請案（`PING LABS`，申請號 [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)）已於 2025 年 2 月遭最終核駁，並於 2025 年 5 月 19 日標記為 `ABANDONED`（放棄）；反觀軟體與 SaaS 所在的第 42 類及第 9 類 `T3` 註冊商標，早已由第三方持有（`EquipmentShare` 註冊號 `7795672`／申請號 [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)；`ESG Operations` 註冊號 `3324707`）。

依據 [GitHub 商標政策（Trademark Policy）](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)，商業公司提交商標下架檢舉時，必須在偽證罪宣誓的前提下填具聯邦或國際註冊商標編號（未註冊商標例外僅適用於政府機構與非營利組織）。換言之，當 `@theo` 公開威脅要封鎖 `@DDdxx666` 的 GitHub 帳號時，他根本連 GitHub 的檢舉表單都無法填完。直到整整 **17 小時後**（11 月 24 日北京時間 `12:21`），`@theo` 才合併 **PR #41898** 事後補寫一份 `TRADEMARK.md`（宣稱 `"whether registered or unregistered"` 皆屬其所有），並在 94 秒後隨即引用該文件（`2125082769395220688`）——儘管他曾在 2024 年 9 月嘲諷 WordPress 發起「無法執行的商標爭議」（`"unenforceable trademark dispute"`，`1839261574005141945`），且在 11 月 24 日補檔前三小時才剛嗆開發者 `"get a better lawyer"`（去找個好點的律師，`2125026423769555308`）。

![PR #41898 於發出封號威脅 17 小時後才合併，事後補寫 TRADEMARK.md 宣稱無論註冊與否均擁有商標權](../../evidence/24-pr41898-trademark-aftermath.png)

<details>
<summary>展開查看 "get a better lawyer" X 回覆憑證</summary>

![Theo 在合併 TRADEMARK.md 前三小時於貼文中嘲諷開發者 "get a better lawyer"](../../evidence/extra/p1-5-x-get-better-lawyer.png)

</details>

### 6.3 1,151 則推文量化資料集（`第 14 篇`）與兩年歷史脈絡（`第 16 篇`）

全面分析 2026 年 11 月 7 日至 11 月 24 日期間 `@theo` 的連續 **1,151 則 X 貼文**（歷時 `17.24` 天；日均 `66.8` 則；`75.6%` 為回覆；發文間隔中位數 `2.7` 分鐘），量化呈現出極端的權力不對稱與雙重標準（[第 14 篇](https://x.com/realchendahuang/status/2125404517697290438)）：
- **科技大廠高層、實驗室員工與頂尖 KOL（嚴格首位 `@` 口徑 `n = 43`／寬鬆口徑 `n = 60`–`62`）：** 針對性的粗口或人身攻擊為 **0.0%**（禮貌致謝佔 `30.0%`–`32.6%`）。即便在嚴厲批評 Gemini 4 Carbon 與 GPT-6.2 Astra 後，亦立即緩和語氣或公開致歉（`2123255588570501585`、`2123995323123343869`）。
- **一般開發者與批評者（嚴格首位 `@` 口徑 `n = 766`／寬鬆口徑 `n = 749`）：** 敵意／粗口比例躍升至 **8.0%**（`61/766`），包含 `"Engineers deserve the mass unemployment they have coming"`（工程師活該迎來大規模失業，`2124470530590011704`）、`"dance on the graves of the 'local ai' community"`（在「本地 AI」社群的墳頭上跳舞，`2120733839832273025`）、`"Linux larpers"`（`2124298216271499605`）、連續多則貼文辱罵女性批評者 `stupid bitch`（`2120599310211703274`），以及以監獄／RSD 病況進行人身威脅與嘲諷（`2122865897375400066`）。
- **25 小時中文 Fork 危機窗口（`n = 132`）：** 直接人身攻擊比例自基準值 `3.6%` 暴衝 **4.0 倍** 至 **14.4%**（`19/132`），包括稱 `"chinese tech twitter is the biggest fucking cesspit"`（中文科技推特是最大的糞坑）並辱罵閱讀中文原始碼稽核報告的開發者 `"fucking braindead"`（腦死，`2125177503526588877`）——而就在不到 24 小時前，他才剛訓誡另一名使用者不該燒毀彼此的信任（`2124449493513068862`）。

![鑑識圖表 1：17 天內 1,151 則推文總覽 — 75.6% 為回覆，162 次 vs 0 次產品提及比例](../../evidence/charts/theo-chart-1-overview.png)

![鑑識圖表 2：太平洋時間 24 小時發文節奏（含 233 則深夜貼文）與 17 天每日發文長條圖](../../evidence/charts/theo-chart-2-rhythm.png)

![鑑識圖表 3：看人下菜碟實錘（中文版權力不對稱對照圖）— 面對大廠 VIP 0.0% 粗口 vs 面對一般開發者 8.0% 敵意與中文區危機期間 14.4% 暴衝](../../evidence/25-double-standard-chart-zh.png)

![鑑識圖表 4：25 小時中文 Fork 危機窗口的三波發作拆解圖](../../evidence/charts/theo-chart-4-cn-crisis.png)

<details>
<summary>展開查看第 13 與第 14 篇引用之 2 則 X 敵意原帖憑證</summary>

![Theo 轉推單純的工具比較提問並配文稱工程師活該迎來大規模失業](../../evidence/25-engineers-unemployment.png)

![Theo 公開稱中文科技推特為糞坑並辱罵閱讀中文程式碼稽核報告的開發者](../../evidence/26-cn-cesspit.png)

</details>

將時間軸往回拉兩年，更證實這套行為模式一再重複上演（[第 16 篇](https://x.com/realchendahuang/status/2125408843152953693)）：
- **2024 年 Fork 嘲諷紀錄：** 親自 Fork 他人的 VS Code 主題並命名為 [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you)，同時在介紹中嘲諷原作者的脾氣。
- **2024 年印度開發者網暴與致歉影片：** 在其針對印度教學頻道的影片引爆網路霸凌後，他曾上傳 [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) 公開譴責基於國籍的人身攻擊——兩年後卻親口攻擊中文科技推特。
- **2025 年 10 月 FFmpeg 懸賞事件：** 在鏡頭前爆粗口並開出 **$20,000 懸賞** 企圖趕走一名 FFmpeg 維護者（[紀錄](https://www.youtube.com/watch?v=1oQ3KMeaH04)），在遭到 Windscribe 反手出價 $21,000、VLC 公開反對以及 FFmpeg 郵件列表集體譴責後，迅速撤回懸賞並刪除影片與推文。
- **2026 年 11 月 25 日（約凌晨 4:00）發文威脅閉源後刪除：** 當天凌晨發推威脅將 T3 Code 轉為閉源，稱使用者不配享有開源軟體；該貼文突破 3,000 個讚後，隨即於黎明前悄悄刪除。

---

## 7. 可執行緩解措施與止損實戰手冊

若您的個人電腦或公司機器上已安裝 T3 Code，請依循以下縱深防禦步驟，針對環境變數、作業系統層級網路封鎖、Managed Policy、本機 SQLite／憑證清理及雲端權杖撤銷進行完整止損。

### 7.1 環境變數 + 作業系統層級網路阻斷（本機／桌面端使用者）

切勿**僅**依賴環境變數：即使截至 `ca81b7b9`，[`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts)（`第 156 行`，原為第 149 行）仍在檢查退出設定前於啟動時初始化磁碟識別碼，[`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) 依舊遺漏轉發 `OTEL_SDK_DISABLED` 與 `T3CODE_OTEL_SDK_DISABLED`，且舊版本存在忽略 shell／使用者退出設定的問題（`PR #42376`、`PR #42464`）。請務必將 shell／使用者變數——包含自 [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) 起受採認的 `DO_NOT_TRACK=1`（可覆寫 `T3CODE_TELEMETRY_ENABLED=true` 並停用伺服器中繼追蹤）——與作業系統層級的 `/etc/hosts` 封鎖搭配使用：

```bash
# 1. macOS / Linux：加入 ~/.zshrc（或 ~/.bashrc），重新載入 shell，並完全重啟 T3 Code
#    DO_NOT_TRACK=1（PR #42629）優先於 T3CODE_TELEMETRY_ENABLED=true 且停用中繼追蹤，
#    惟 AnalyticsService.ts:156 仍會在磁碟寫入本機安裝識別碼，且 DesktopShellEnvironment.ts
#    至今仍漏傳 T3CODE_OTEL_SDK_DISABLED / OTEL_SDK_DISABLED。
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. 在作業系統邊界阻斷閉源資料接收閘道（/etc/hosts）
#    (Windows 路徑：C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

在 Windows 上，亦請至 **系統內容 → 環境變數**（使用者與系統變數）設定 `DO_NOT_TRACK=1`、`T3CODE_TELEMETRY_ENABLED=false`、`T3CODE_OTEL_SDK_DISABLED=true` 與 `OTEL_SDK_DISABLED=true`，並重新啟動任何背景服務。請留意依 `Issue #36479` 紀錄，伺服器啟動時除非透過防火牆／代理規則攔截，否則仍會主動對 `raw.githubusercontent.com` 發起對外相容性檢查連線。

### 7.2 系統管理員受管原則（`macOS`、`Linux`、`Windows`）

若要依據 [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) 鎖定並停用遙測、T3 Connect 通道、webhook 任務、瀏覽器 Cookie 匯入與預覽通道，請部署由系統管理員擁有的 `policy.json`（或等效的 MDM／GPO 原則）：

| 作業系統 | 原生原則／登錄檔設定 | 檔案路徑（`chmod 644` ／ root 或系統管理員所有） |
|---|---|---|
| **macOS** | 針對 `com.t3tools.t3code` 的裝置組態描述檔 *（使用者級描述檔將被忽略）* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *（須在每一個 WSL 發行版中個別部署）* | `/etc/t3code/policy.json` |
| **Windows** | GPO（`t3code.admx`）或位於 `HKLM\SOFTWARE\Policies\T3Tools\T3Code` 下的 `REG_SZ` `Policy` 機碼 | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

使用 `t3 policy check policy.json` 驗證設定無誤後，完整重啟 T3 Code 並執行 `t3 policy show` 確認生效狀態。**務必謹記 `docs/user/telemetry.md` 中記載的已知盲點：** Managed Policy **無法**停用託管網頁版 `app.t3.codes` 的中繼追蹤、**無法**控管行動裝置應用程式的追蹤，亦**無法**關閉先前已啟用的 `Publish agent activity`。

### 7.3 `statev2.sqlite` 檢視與本機狀態清理

雖然 [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) 新增了非同步 `thread-content.purge` 清理機制（並關閉 `Issue #17845`），舊版本仍將完整對話歷史留存於磁碟中；且即便到了 `ca81b7b9`，只要已刪除之源對話串仍受活躍分支（fork）、待處理 `merge_back` 轉移或活躍父層子代理引用，其歷史內容依然會保留——此外墓碑資料列亦留存於 SQLite 中，且要回收已釋放的 `.sqlite` 磁碟空間仍須執行離線 `VACUUM`：

```bash
# 檢查本機 T3 狀態目錄大小與資料庫膨脹情況（macOS / Linux）
ls -lh ~/.t3/userdata/statev2.sqlite*

# 選用：唯讀檢查留存於資料庫中的刪除標記數量（請先完全關閉 T3 Code）
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# 選用：在 PR #42119 清理後執行離線壓縮以回收磁碟分頁空間（請先完全關閉 T3 Code）
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"

# 若準備完全解除安裝，請先備份所需的自訂資料後移除 ~/.t3
rm -rf ~/.t3
```

*（在 Windows 上，請檢查並清理 `%USERPROFILE%\.t3\userdata\` 目錄，包含 `statev2.sqlite`、`anonymous-id` 與 `secrets`。）*

### 7.4 Google Antigravity、T3 Connect、Clerk／Cloudflare 與 GitHub 授權撤銷

1. **Google Antigravity：** 請立即停止透過 T3 受管 Antigravity 或 CLIProxyAPI 運行個人 Google AI／Antigravity 訂閱帳號，以免耗盡您帳號唯一一次的申訴機會。同時移除 `~/.t3/userdata/providers/antigravity/` 與 `~/.t3/tools/antigravity-acp/`。
2. **T3 Connect 與雲端資料刪除：** 至 **Settings → Sharing & access** 關閉 **Publish agent activity**，解除所有本機電腦的連結（`t3` logout / unlink），若日後仍須重啟遠端存取請務必開啟 `requireConnectDeviceApproval`。請透過 Clerk 與 `privacy-policy.astro` 中載明的 T3 Tools 官方隱私刪除聯絡窗口提出完整帳號與中繼資料刪除請求（使 `PR #42285` 的 Clerk 刪除 webhook 得以徹底清除 PlanetScale 中繼資料列與 Cloudflare 通道）。
3. **GitHub 權杖撤銷與密鑰輪替：** 請至 **GitHub Settings → Applications / Authorized GitHub Apps** 撤銷 T3 Code 的 GitHub OAuth／App 授權（`driver.ts` 持有主機層級的點星權限）。對於在 `PR #41889`／`PR #42577` 之前可能已遭 `t3-resource-monitor` 透過命令列參數側錄，或經 webhook／中繼錯誤紀錄送往 Axiom 的任何 API 金鑰、資料庫連線字串或權杖，請一律進行輪替更新。
4. **區網 HTTP、CI Bearer 與未受信任儲存庫隔離（`ca81b7b9`）：** 切勿在未前置 TLS（反向代理或 Tailscale Serve；並留意改用 `127.0.0.1` 避開 `::1` 的 IPv4 誤判權宜做法）的情況下對外暴露明文 `t3 up --lan` HTTP；切勿將非 DPoP 的 30 天 Bearer 權杖寫入腳本或 CI；並在開啟任何未受信任儲存庫之前，先清除 `SSH_AUTH_SOCK`／`GITHUB_TOKEN`，同時檢查 `.gitmodules` 與 `.claude/settings.json` 鉤子。

### 7.5 可替代用戶端參考

在社群後續討論回覆中，開發者常提及的替代專案包括 **Mirasim**（`@Mirasim_ADE`）、**Paseo**（`@paseo_sh`）、**Paradev**（`@ParadevAI`）與 **Cloudroom**（詳見[替代方案討論串](https://x.com/realchendahuang/status/2125244977878036713)）。在採用任何替代用戶端之前，建議先獨立驗證以下四項條件：（1）遙測預設關閉且具備乾淨的網路封包紀錄；（2）刪除對話串時確實執行 `DELETE` + `VACUUM` 或直接刪除對應檔案；（3）嚴格委派給官方 CLI 執行，不擷取憑證亦不偽裝標頭；（4）遠端連線通道具備真正的用戶端端對端加密。

---

## 8. 一手原始出處與 18 篇原帖完整索引

> 若需查閱涵蓋所有篇章、專題檔案與稽核後 commit 之 `SRC-001` 至 `SRC-320` 逐條對照主表，請見 [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md)。若需查閱全部 **108** 張視覺憑證與鑑識圖表（`EV-001`–`EV-108`），請見 [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md)。

### 導火線與 18 篇 X 原帖完整索引（依發布時間排序）

- 導火線 1（首頁 GitHub 連結標示為 `"steal our code"`）：https://x.com/realchendahuang/status/2125059292919394654
- 導火線 2（MIT Fork 命名爭議、Temu 辱罵與雙重標準始末）：https://x.com/realchendahuang/status/2125062675147448475
- 第 1 篇（預設遙測、破產的 `"No telemetry"` 承諾、跨工具無鹽雜湊歸因）：https://x.com/realchendahuang/status/2125153472450527440
- 第 2 篇（SQLite 假刪除、每 5 秒全機處理程序掃描、移除 Plan 模式、`CONTRIBUTING.md` 封鎖名單）：https://x.com/realchendahuang/status/2125160473176023486
- 第 3 篇（Auto 模式靜默放行 `git push --force`、21 小時移除隱私過濾、0 安全公告、辱罵使用者）：https://x.com/realchendahuang/status/2125201882687881378
- 第 4 篇（Google Antigravity 標頭偽裝、假 `SSH_CONNECTION`、全新帳號 3 分鐘停權）：https://x.com/realchendahuang/status/2125213397507858657
- 第 5 篇（T3 Connect 缺少端對端加密、Cloudflare Tunnel、自建 OVH 明文閘道）：https://x.com/realchendahuang/status/2125218189596676555
- 第 6 篇（天使投資人利益衝突：嘲諷 Vibe Kanban 倒閉與 Daytona 沙盒重疊）：https://x.com/realchendahuang/status/2125385742243520653
- 第 7 篇（Managed Policy `"turn off all telemetry"` 宣稱 vs 官方文件揭露的三處盲點）：https://x.com/realchendahuang/status/2125391659492081947
- 第 8 篇（$800k+ 免費開源用戶端商業帳本與單日 31.7 兆 token／$10.19M 算力雷達）：https://x.com/realchendahuang/status/2125392410763239723
- 第 9 篇（單日 500 commit、700 代理、`yolo merges` vs 勸退外部 PR 並要求追蹤門檻）：https://x.com/realchendahuang/status/2125392916369871309
- 第 10 篇（指揮 `@bot` 爬梳他人 Fork 與競品、自動封鎖機器人、Community Notes 斷分潤號召）：https://x.com/realchendahuang/status/2125393641665671593
- 第 11 篇（11 月 25 日澄清長文於 2 小時內遭連夜 PR 與 100MB 匯出檔內 264 筆 Claude 紀錄打臉）：https://x.com/realchendahuang/status/2125394810559426993
- 第 12 篇（GDPR 後連夜修補揭露每小時 220 萬筆 IP 日誌、失效帳號刪除、推播外洩、混包匿名回饋）：https://x.com/realchendahuang/status/2125395501663281198
- 第 13 篇（痛罵中文科技推特為糞坑之際靜默合併未沙盒隔離預覽與未確認指令執行修補）：https://x.com/realchendahuang/status/2125395980354994414
- 第 14 篇（1,151 則推文量化分析：對大廠高層 0% 粗口 vs 對一般開發者 8% 敵意）：https://x.com/realchendahuang/status/2125404517697290438
- 第 15 篇（USPTO 名下 T3 Code 零筆註冊商標與 GitHub 商標政策規定）：https://x.com/realchendahuang/status/2125408163273080950
- 第 16 篇（兩年歷史脈絡：`vsc-material-but-i-wont-sue-you`、印度開發者風波、$20k FFmpeg 懸賞、凌晨閉源威脅刪推）：https://x.com/realchendahuang/status/2125408843152953693
- 第 17 篇（贊助商 Clerk/Axiom、Codex 0% 配額漏洞利用與刪文、10 帳號 `CLIProxyAPI` Gist）：https://x.com/realchendahuang/status/2125411353393553744
- 第 18 篇（7.7 萬 GitHub 星標真相：30 秒閒置彈窗動用主機憑證呼叫 API 點星與未修復的任意儲存庫點星漏洞）：https://x.com/realchendahuang/status/2125416210120765799
- 社群替代專案清單：https://x.com/realchendahuang/status/2125244977878036713
- 社群投稿評論存檔（`@opserx` 提交之 Issue #1——《*The Case Against Theo*》）：[`docs/community/issue-1-the-case-against-theo.md`](../community/issue-1-the-case-against-theo.md)

### 原始碼、PR、Issue、政策與一手實證出處

**遙測、隱私與 GDPR 後連夜修補（第 1、7、11、12 篇）**

- 官方網站網域：https://t3.codes/
- 預設 PostHog 遙測（PR #174）：https://github.com/pingdotgg/t3code/pull/174
- 靜默刪除首頁 `"No telemetry"` 承諾（`commit 3bdaa6e1`）：https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- 拒絕簡化選擇退出（Issue #1397）與毀諾追問（Issue #4123）：https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- 自建 `ingest.t3.codes` 保留原始事件複本（PR #15028）與跨工具無鹽雜湊歸因（PR #21506）：https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- 遭拒關的 4 個社群遙測選擇退出開關 PR（`#13458` / `#16763` / `#21248` / `#27077`）：https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- 遙測與身分歸因核心原始碼（`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `ProviderDimensions.ts` / `telemetryId.ts` / `otelEnvironment.ts` / `DesktopShellEnvironment.ts` / `DesktopBackendConfiguration.ts`）：https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts
- 官方遙測與受管原則文件：https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Theo 的 Managed Policy、澄清聲明與否認寫入追蹤檔案之推文 + 公開 `events.clean.jsonl` 匯出檔：https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- 工作區絕對路徑外洩（PR #42450）與 Win/Mac 無視退出變數（PR #42376 / #42464）：https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- 每小時 220 萬筆含 IP 日誌留存 30 天（PR #42380）、未徹底刪除帳號（PR #42285 / #42430）、行動端推播外洩（PR #42459 / #41859）與混合匿名回饋批次（PR #42466）：https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**本機安全、靜默安全修補、Antigravity 與 T3 Connect（第 2、3、4、5、13 篇）**

- SQLite 假刪除（Issue #17845 / #28903）、5 秒處理程序監控（Issue #11222）與命令列參數側錄修補（PR #41889）：https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- 內部主機名稱洩漏給 Google favicon（PR #16950 / #32657）、強制對外連線檢查（Issue #36479 / `raw.githubusercontent.com`）、權限／原則繞過（PR #21806 / #27322）、1.7 倍 Claude 配額消耗（Issue #7338 / #24649）與異常功耗問題（Issue #3143 / #40581）：https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- Claude Auto 模式靜默放行 `git push --force`（Issue #15353 與重現留言）及社群修補 PR（`#15360` / `#35207` / `#40692`）：https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- 21 小時內移除供 `slopalytics.com` 使用的私有模型過濾（PR #29001 / Issue #40948 / PR #41237）：https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- 空白的安全性公告頁籤、`SECURITY.md`（`PR #38812` / `#41942`）、已靜默合併的安全修補（`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`）與未關閉的安全／啟動器議題（`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`）：https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Antigravity FAQ 保證、Issue #40713 原始碼反駁、3 分鐘停權（Issue #41536）、跨帳號串接錯亂（Issue #41973）、白名單編輯器冒充（PR #26876）、CLIProxyAPI 中樞 PR #33800、Theo 的零風險／圖解／推責 CLIProxy 推文與相關原始碼：https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Google Antigravity 服務條款與官方論壇明文禁止事項：https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- T3 Connect 拒絕端對端加密（Issue #32098）、預設關閉的 `requireConnectDeviceApproval`（PR #36419 與 `settings.ts`）、自架 OVH Caddy 閘道（PR #32945）、中繼原始碼、隱私政策與無人回覆之討論串：https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**商業帳本、投資人利益衝突、贊助商與 7.7 萬星標（第 6、8、17、18 篇）**

- $800k+ 支出、單日 31.7 兆 token／$10.19M 看板、三家實驗室 98.5% 佔比、後台數據反嗆、$300k+ 免費 OpenAI 早期測試額度、Patrick 僅 1 筆 commit 的 PR #31158、創投接觸與 `Ping.gg`：https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- 嘲諷 Vibe Kanban、揭露 Daytona 投資與付費雲端沙盒規劃：https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- YouTube 贊助商名單、Vercel CEO 證實、排他條款影片、Maria 刪文聲明、`openai/codex#45444`、CLIProxyAPI ClickHouse／Ultra／GrokBot 推文、CLIProxyAPI Gist 與 FAQ：https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- 「假星」創投影片、10 倍星標陡升曲線、+3,094 Trending 貼文、「沒注意到破 7 萬」貼文、PR #27832 / #29922 / #29987、`GitHubStarPrompt.tsx` 與 `driver.ts` 任意儲存庫點星程式碼：https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**治理、商標、選擇性禮貌與歷史事件（第 9、10、14、15、16 篇）**

- 移除 Plan 模式（PR #5551 / #33131）、隱藏進度圈（PR #9190）、Issue #33639 辱罵、遭拒的 PR #41572、`CONTRIBUTING.md` 與 `.github/VOUCHED.td`：https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 每日 500 筆 commit、`yolo merges`、`"nukes my machine = free content"`、依追蹤狀態把關 PR、威脅收回 `/btw` 與「截圖勝過 PR」貼文：https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- 指派 `@bot` 爬梳他人 Fork 的指令、嘲諷 Claude Desktop、號召 Community Notes 斷絕收益與證實使用自動封鎖機器人：https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- USPTO TSDR 紀錄（`PING LABS` 97294243 已放棄；EquipmentShare `T3` 註冊號 7795672）、GitHub 商標政策、事後補救的 `PR #41898`、封號威脅、兆美元企業開源回覆、`"aware of the legality"`、`"get a better lawyer"` 與過往商標爭議推文：https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- 選擇性禮貌憑證（對 Google Neon 致歉與慶幸沒燒毀橋樑、工程師失業言論、本地 AI 墳頭、Linux larpers、監獄／RSD 威脅、`stupid bitch` 貼文、中文科技推特糞坑言論、拒絕道歉、訓誡勿燒毀信任）：https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- 歷史紀錄（`vsc-material-but-i-wont-sue-you`、印度開發者致歉影片、$20k FFmpeg 懸賞事件紀錄）：https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04

### 稽核後上游追蹤（`9d3195b4` 至 `ca81b7b9`，`SRC-280`–`SRC-320`）

- 稽核基準（`9d3195b4`，`#42000`）與最新驗證之 `main` HEAD（`ca81b7b9`，`#42634`）：https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 ; https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd
- 遙測與身分歸因收窄（`#42299` / `84e4264b`、`#42465` / `6b3899f2`、`#42630` / `c925b9ab`、`#42629` / `ef4a1643`）：https://github.com/pingdotgg/t3code/pull/42299 ; https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07 ; https://github.com/pingdotgg/t3code/pull/42465 ; https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da ; https://github.com/pingdotgg/t3code/pull/42630 ; https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b ; https://github.com/pingdotgg/t3code/pull/42629 ; https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64
- 本機清理、資源監控與安全強化（`#42119` / `91f0b32e`、`#42577` / `af276ccb`、`#42413`）：https://github.com/pingdotgg/t3code/pull/42119 ; https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e ; https://github.com/pingdotgg/t3code/pull/42577 ; https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c ; https://github.com/pingdotgg/t3code/pull/42413
- Antigravity 帳號驗證觸發與 CLI 更新（`#41210` / `3e74a0aa`、`#42545` / `4da8d19d`、`#42339`、`#42475`）：https://github.com/pingdotgg/t3code/pull/41210 ; https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836 ; https://github.com/pingdotgg/t3code/pull/42545 ; https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc ; https://github.com/pingdotgg/t3code/pull/42339 ; https://github.com/pingdotgg/t3code/pull/42475
- T3 Connect 登入通知與中繼／行動端／意見回饋收窄（`#42311` / `ece5f21b`、`#42356`、`#42394`、`#42397`、`#42398`、`#42415`）：https://github.com/pingdotgg/t3code/pull/42311 ; https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd ; https://github.com/pingdotgg/t3code/pull/42356 ; https://github.com/pingdotgg/t3code/pull/42394 ; https://github.com/pingdotgg/t3code/pull/42397 ; https://github.com/pingdotgg/t3code/pull/42398 ; https://github.com/pingdotgg/t3code/pull/42415
- `ca81b7b9` 區網 Cookie、Bearer、`?wsTicket=`、`::1` 回環與未受信任儲存庫驗證／執行憑證（`SRC-308`–`SRC-320`）：https://github.com/pingdotgg/t3code/pull/37042 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985
