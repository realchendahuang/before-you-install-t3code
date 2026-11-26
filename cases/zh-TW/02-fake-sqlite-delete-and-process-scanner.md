# #02 · SQLite 假「永久刪除」撐爆 41.6 GB 硬碟與每 5 秒全機行程命令列掃描

> 在側邊欄點擊「永久刪除」根本不會刪掉歷史資料，導致本地 `statev2.sqlite` 膨脹至 41.6 GB；後台 Rust 監控程式每 5 秒無開關掃描全機所有行程與完整命令列參數。

<!-- section:claim -->
## 官方 / Theo 宣稱

- 側邊欄刪除確認框（`useThreadActionMenu.ts`）明確告知使用者：*"This permanently clears conversation history for this thread."*（這將永久清除該對話的全部歷史紀錄）。
- 將 T3 Code 宣傳為輕量、高效的本地開發工作台。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **假「永久刪除」撐爆硬碟（`Issue #17845`、`#28903`）：** 基線版本 `9d3195b4` 點擊刪除時，僅在 `statev2.sqlite` 裡追加一條 `"thread.deleted"` 標記事件，所有敏感聊天、工具輸出與推理過程原封不動留在硬碟裡。多位使用者實測資料庫 3 週漲到 **25.9 GB**（90% 為「已刪除」對話）、6 週漲到 **41.6 GB**、7 週漲到 **33 GB**。
- **每 5 秒全機掃描行程與明文命令列（`Issue #11222`、`PR #41889`）：** 後台 Rust 輔助程式 `t3-resource-monitor`（`native/resource-monitor/src/main.rs`）即便關閉診斷面板，也每 5 秒呼叫 `ProcessesToUpdate::All` 與 `with_cmd(UpdateKind::Always)`，在 Windows 上對 440+ 個無關軟體/遊戲持有近 300 個常駐控制代碼且無開關。11 月 24 日 [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) 證實診斷快照一直在蒐集**完整行程命令列**（常含明文 API Key、資料庫密碼與權杖）。
- **洩漏內網主機名與強制連網拉取：** 前端圖示請求將企業內網主機名（如 `devbox.localdomain`）發往 Google Favicon 服務（`PR #16950`、`PR #32657`）；伺服器每次啟動均無條件請求 `raw.githubusercontent.com` 拉取相容清單，無任何停用選項（`Issue #36479`）。
- **1.7 倍額度空耗與 136 倍異常功耗：** 透過 Agent SDK 驅動 Claude 曾以正常速率 **1.7 倍**消耗 5 小時配額（`Issue #7338`、`#24649`，81 條評論）；GPU 缺陷導致功耗高達同類 Electron 應用程式的 **136 倍**，MacBook GPU 被頂死在 **60W**（78 分鐘耗盡電量），關掉網頁分頁後仍持續耗電 **18W**（`Issue #3143`、`#40581`）。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **部分修補：** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) 新增非同步 `thread-content.purge`（關閉 `#17845`）；[`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) 僅收窄了 Windows 行程讀取範圍。
- **仍未修復：** 若來源對話仍被活躍分支、`merge_back` 或子代理參照，歷史資料仍會保留，墓碑列仍留在 SQLite 中且縮減體積需離線手動執行 `VACUUM`；Linux 與 macOS 依舊維持 `ProcessesToUpdate::All` 全機發現，`PR #41889` 仍未合併。

<!-- section:visuals -->
## 一手實證原圖

![Issue #17845 證實所謂永久刪除對話仍留在 statev2.sqlite 中，將硬碟撐爆至數十 GB](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 記錄 t3-resource-monitor 每 5 秒掃描整台電腦所有行程](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 2 彈）](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [深度技術卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
