# #00 · 起因導火線：「偷我們的程式碼」、Fork 封號威脅與赤裸雙標

> 11 分鐘內，@theo 連發兩帖，將一名中國開發者免費的 MIT 二次開發辱罵為「Chinese knockoff」「Temu3 Code」，並威脅找 GitHub 封掉其帳號；不到 11 小時後，他又公開表態歡迎萬億美元美國大廠照抄 MIT 程式碼。

<!-- section:claim -->
## 官方 / Theo 宣稱

- T3 Code 官網（[`t3.codes`](https://t3.codes/)）將自己的開源 GitHub 儲存庫入口直接標作 *"Steal our code (legally)"*（合法偷走我們的程式碼），並採用寬鬆的 MIT 授權開源。
- 攻擊中國開發者不到 11 小時後，面對網友提問「如果萬億美元美國大廠照抄 T3 Code 會不會介意」，`@theo` 公開回覆：*"Nah. Open source is open source, even if a trillion dollar company uses it!"*（開源就是開源，哪怕萬億美元公司拿去用也無所謂，[`2124989435154726982`](https://x.com/theo/status/2124989435154726982)）。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **針對中國開發者的辱罵與封號威脅（2026-11-23 19:11–19:54 CST）：** 有路人將中國開發者 `@DDdxx666` 基於 MIT 授權製作的免費二次開發誤當成官方客戶端。`@theo` 在 11 分鐘內連發兩帖，將其定性為 *"Chinese knockoff"* 與 *"Temu3 Code"*，並公開威脅要找 GitHub 封掉對方整個帳號：*"Do it right now or I'm going to contact GitHub and have your account taken down"*（[`2124829315657576890`](https://x.com/theo/status/2124829315657576890)）。
- **30 分鐘光速改名 vs 不對等私訊道歉：** `@DDdxx666` 在 30 分鐘內就將專案更名為 `Stardust`，並移除了全部 T3 標識。`@theo` 僅在私訊裡道了歉，卻讓兩條合計超過 20 萬曝光的公開辱罵帖繼續掛在主頁上。
- **赤裸的國籍選擇性執法：** T3 團隊員工 `@maria_rcks` 自己就公開託管著名為 `maria-rcks/t3libre`（*"T3 Code, liberated"*）的二次開發儲存庫；GitHub 上英文命名的 `t3code-quota-ui`、`t3code-atlas`、`t3code-bar` 等專案也全部安然無恙，從未收到任何封號威脅。
- **自家 FAQ 白紙黑字承認借鑑他家：** T3 Code 官方 FAQ 明確寫明自身設計直接借鑑了 Codex Desktop、Conductor、Claude Desktop 與 Cursor（[`2125066677188702698`](https://x.com/realchendahuang/status/2125066677188702698)）。
- **引爆全球原始碼大起底：** 從 11 月 24 日起，針對 `pingdotgg/t3code` 原始碼、提交紀錄與公開檔案的逐行核查陸續查出後續全部 19 項實錘，直接觸發歐盟 GDPR 正式舉報與近 20 個通宵急救補丁。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **公開歷史留檔：** 11 月 23 日的公開辱罵與封號威脅，以及次日「歡迎萬億美元大廠」的公開回覆均已永久歸檔。

<!-- section:visuals -->
## 一手實證原圖

![Theo 公開威脅聯繫 GitHub 封殺中國開源 MIT 二次開發作者帳號](../../evidence/01-origin-theo-threat.png)

![T3 員工 @maria_rcks 公開託管名為 maria-rcks/t3libre 的二次開發儲存庫卻毫無威脅](../../evidence/extra/p1-3-maria-t3libre.png)

![GitHub 搜尋顯示大量英文命名的 t3code 相關儲存庫全部安然無恙](../../evidence/extra/p1-4-github-t3code-search.png)

<!-- section:sources -->
## 可核驗原始來源

- [導火線原帖 1（「Steal our code」）](https://x.com/realchendahuang/status/2125059292919394654)
- [導火線原帖 2（Fork 命名威脅與雙標）](https://x.com/realchendahuang/status/2125062675147448475)
- [`@theo` 公開封號威脅（`2124829315657576890`）](https://x.com/theo/status/2124829315657576890)
- [`@theo` 歡迎萬億美元美國大廠照抄（`2124989435154726982`）](https://x.com/theo/status/2124989435154726982)
- [FAQ 自承借鑑競品紀錄（`2125066677188702698`）](https://x.com/realchendahuang/status/2125066677188702698)
- [T3 Code 官網（`t3.codes`）](https://t3.codes/)
- [深度技術卷宗 05](../../docs/dossiers/05-governance-trademark-and-history.md)
