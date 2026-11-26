# #03 · 拖延 52 天不修的靜默 `git push --force` vs 21 小時撤除隱私過濾

> 會直接衝毀主分支的 Claude Auto 靜默強推漏洞拖了 52 天以上無人修復；但為了讓私有模型登上 @theo 的公開排行榜，團隊僅用 21 小時就撤掉了模型隱私白名單。

<!-- section:claim -->
## 官方 / Theo 宣稱

- Claude Auto 模式本應攔截高危破壞性指令（例如向 `main` 強推），並在重試升級時彈窗交由人類確認。
- 官方對外宣稱所蒐集的遙測資料已做好隱私脫敏，僅用於彙總統計。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **拖延 52+ 天不修的靜默強推（`Issue #15353`）：** `ClaudeAdapterV2.ts` 在 Auto 模式下將 `!requiresClaudeApproval(context)` 直接短路放行為 `"allow"`。使用者實測顯示，即便 Claude 內建安全分類器連續攔截兩次 `git push --force origin main`，並在第 3 次升級請求人工確認，T3 Code 仍不彈出任何對話框、直接靜默放行，還在日誌裡偽造紀錄為 `"source": "user_temporary"`。社群主動送上的兩個修復 PR（`#15360`、`#35207`）無人理睬，直到被機器人自動關閉，`#40692` 則長期懸而未決。
- **21 小時火速撤除模型隱私過濾（`Issue #40948` → `PR #41237`）：** 11 月 22 日，[`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) 回報新模型沒出現在 `@theo` 的公開榜單 [`slopalytics.com`](https://slopalytics.com/)（[`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)）上，原因是 `PR #29001` 設了白名單，防止洩露私有模型名。僅 **21 小時**後，[`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) 在 `@theo` 帳號下直接合入，並明寫係 Theo 要求移除過濾——導致 `ollama/acme-internal`、`acme-azure-deployment` 等企業私有部署名稱原樣上報。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **核心安全漏洞仍未修復：** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) 事後將非目錄模型改寫為 `custom:<driver>`（但私有端點後的目錄模型 slug 仍照常上報）。**`Issue #15353`（Auto 模式靜默 `git push --force`）在 `ca81b7b9` 依然敞開未修。**

<!-- section:visuals -->
## 一手實證原圖

![Issue #15353 敞開 52 天以上，證實 Claude Auto 模式不彈窗、靜默放行 git push --force](../../evidence/11-issue15353-auto-force-push.png)

![Issue #40948 提出僅 21 小時後，PR #41237 即合併、撤除模型隱私過濾，以服務 slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 3 彈）](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [重現評論 `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [被冷落的社群修復：PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [深度技術卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
