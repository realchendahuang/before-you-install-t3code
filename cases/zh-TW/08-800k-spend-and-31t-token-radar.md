# #08 · 自掏 80 萬美元的真實帳本：日跑 31.7 兆 Token（$10.19M/天）算力雷達

> 預設開啟的遙測絕非「順手統計一下人數」：它為 @theo 撐起了一台日跑 31.7 兆 Token（折合每日 1,019 萬美元 API 消耗）的即時產業雷達，並直接換來逾 30 萬美元的 OpenAI 免費內測額度與創投接洽。

<!-- section:claim -->
## 官方 / Theo 的說法

- 對外把 T3 Code 包裝成用愛發電的免費 MIT 開源工具，並辯稱強制遙測只是為了 *"know how many users we have"*（知道我們有多少使用者）。
- `@theo` 還在推文中宣稱 DeepMind 工程師 `@PatrickToulme` 為 T3 Code 送進了 *"many PRs"*（很多 PR）。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **豪擲 80 萬美元、徹底冷落收費老業務：** 統計 11 月 7 日至 24 日全部 **1,151 條連續推文**，`@theo` 提及 T3 Code 高達 **162 次（14.1%）**，而對其先前主推的三款付費產品（`T3 Chat`、`UploadThing`、`ping.gg`）提及次數全部為 **0**，同時親口證實已自掏腰包 **80 萬美元以上**打造這款免費客戶端（[`2120729779511124267`](https://x.com/theo/status/2120729779511124267)）。
- **閉源遙測撐起的 31.7 兆 Token/天 情報看板：** 經閉源 `ingest.t3.codes` 匯聚的原始資料，被用來建起一套即時看板，單日追蹤 **31.7 兆 Token**（11 月 18 日折合 **1,019 萬美元/天** 等效 API 消費，峰值逼近 1,020 萬美元/天），精確掌握各大廠市佔（`99%` 由訂閱驅動、Codex/Claude/Antigravity 三家合計 `~98.5%`、開源權重試用從 `15%` 跌至 `6%`）。11 月 23 日有網友猜測市佔時，`@theo` 當場嘲諷對方沒權限看自己的後台資料（[`2124682906132181482`](https://x.com/theo/status/2124682906132181482)）。
- **把使用者資料變現為大廠特權與資本籌碼：** `@theo` 公開透露，靠此在單次 GPT-6.2 Astra 評測中燒掉逾 **30 萬美元無上限免費 OpenAI 內測額度**（[`2122760447103484410`](https://x.com/theo/status/2122760447103484410)），並參與 Google 裸機評測，另披露已有多家投資機構主動接洽（*"multiple investors have asked me about this"*，[`2123885732330885417`](https://x.com/theo/status/2123885732330885417)）。
- **誇大大廠合作紀錄：** 檢索倉庫 git 提交歷史，`patrick-toulme` 實際上只有 **1 個提交**（[`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158)），並非所謂 *"many PRs"*。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **商業閉環持續運轉：** 閉源 `ingest.t3.codes` 在 `ca81b7b9` 依然是預設採集端點，上述第一方資料管線繼續運轉。

<!-- section:visuals -->
## 一手實證原圖

![Theo 曬出的 T3 Code 內部算力大螢幕：日跑 31.7 兆 Token、等效 $10.19M/天 API 消耗](../../evidence/17-theo-31t-tokens-10m-day.png)

![Theo 公開披露已為免費客戶端投入 80 萬美元以上](../../evidence/extra/p6-1-x-theo-800k-cost.png)

![倉庫提交紀錄核實 patrick-toulme 僅貢獻 1 個提交（#31158），並非「很多 PR」](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## 可查核的原始出處

- [X 調查原帖（第 8 彈）](https://x.com/realchendahuang/status/2125392410763239723)
- [披露 $800k+ 投入（`2120729779511124267`）](https://x.com/theo/status/2120729779511124267) · [31.7T / $10.19M 內部大螢幕（`2122860770329608290`）](https://x.com/theo/status/2122860770329608290) · [大廠市佔分布（`2123965784888377541`）](https://x.com/theo/status/2123965784888377541)
- [炫耀獨家後台資料（`2124682906132181482`）](https://x.com/theo/status/2124682906132181482) · [$300k+ OpenAI 免費額度（`2122760447103484410`）](https://x.com/theo/status/2122760447103484410) · [投資機構接洽（`2123885732330885417`）](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [深度技術卷宗 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
