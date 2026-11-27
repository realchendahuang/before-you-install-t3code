# #13 · GitHub 安全性公告始終為 0，卻靜默修補多個高風險漏洞並倉促改寫 `SECURITY.md`

> 一邊把中文技術圈原始碼審計罵成「糞坑」，一邊悄悄合入金鑰目錄路徑穿越、跨網域權杖洩漏、未隔離預覽與陌生儲存庫自動執行等高風險修補——卻連一則提醒舊版使用者升級的 GitHub Security Advisory 都不發。

<!-- section:claim -->
## 官方／Theo 宣稱

- 11 月 24 日，`@theo` 在 X 上攻擊中文技術圈是 *"the biggest fucking cesspit"*，並辱罵相信中文原始碼審計的開發者（[`2125177503526588877`](https://x.com/theo/status/2125177503526588877)）。
- 倉促修訂的 `SECURITY.md`（`PR #38812`、`#41942`）試圖將越權檔案讀取與明文傳輸定義為「預期邊界」。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **已發布的 GitHub 安全性公告為 0 則：** 截至 `ca81b7b9`，`pingdotgg/t3code` 的 [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) 清單仍為 **0 則**，現網舊版使用者收不到任何正式 CVE 或升級警報。
- **悄悄合入的一連串高風險安全性修補：**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483)：在裝置審批前，透過中繼 `jti`/`nonce` 觸發的 `ServerSecretStore` 路徑穿越漏洞。
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756)：企業級 GitHub/GitLab 跨網域權杖洩漏。
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) 與 [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386)：無沙箱桌面瀏覽器預覽隔離，以及 worktree 版面配置命令確認。
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413)：將桌面端 Clerk 權杖檔案權限收窄為僅限擁有者讀取。
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504)：近 3,000 行的大型修補，終於在執行陌生儲存庫設定命令前加上彈窗確認（另有 `#22190`、`#37823`、`#39464`、`#39480`、`#40133`、`#41886` 等靜默修補）。
- **依然懸而未決的本機漏洞：** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489)（外部路徑穿越／符號連結）與 [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997)（Windows `externalLauncher.ts` 呼叫 `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` 觸發 AVG/Avast 報毒 `IDP.HELU.PSE96`）均未合併。
- **以 `SECURITY.md` 推責而非加固架構：** 明文將工作區外的全盤 `filesystem:read`、iOS／區域網路明文 HTTP 傳輸，以及中繼簽章金鑰失守導致整台機器被接管，劃為「預期設計邊界」，拒絕視為漏洞。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **仍未修復：** 已發布的 GitHub Security Advisories 仍為 **0 則**；`Issue #26489` 與 `PR #30997` 仍未合併；`SECURITY.md` 仍維持上述寬鬆的邊界聲明。

<!-- section:visuals -->
## 一手實證原圖

![PR #39483 靜默修復 ServerSecretStore 路徑穿越漏洞，卻未發布任何安全性公告](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 記錄 Windows 端 Base64 編碼 PowerShell 啟動方式遭防毒軟體報毒，至今未合併](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md 明確將全盤讀取、iOS 明文 HTTP 與中繼金鑰接管主機劃為「預期邊界」](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 13 彈）](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories（0 則）](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [深度技術卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
