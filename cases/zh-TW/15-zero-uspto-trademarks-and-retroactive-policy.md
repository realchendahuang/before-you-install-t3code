# #15 · 威脅 GitHub 封鎖帳號時 USPTO 註冊商標為 0，17 小時後緊急補寫 `TRADEMARK.md`

> 當 @theo 威脅找 GitHub 封鎖中國開發者帳號並指控對方「侵犯商標」時，T3 Tools Inc. 名下對 `T3 Code`、`T3 Tools` 與 `T3 Connect` 的 USPTO 註冊商標全部為 0——直到 17 小時後，他才倉促補上了一份 `TRADEMARK.md`。

<!-- section:claim -->
## 官方／Theo 宣稱

- 11 月 23 日，`@theo` 指控 MIT 二改作者侵犯商標，並威脅聯繫 GitHub 封鎖對方整個帳號（[`2124829315657576890`](https://x.com/theo/status/2124829315657576890)）。
- 補寫 `TRADEMARK.md` 前三小時，他嘲諷提出法律質疑的開發者 *"get a better lawyer"*（找個好一點的律師，[`2125026423769555308`](https://x.com/theo/status/2125026423769555308)）——儘管 2024 年 9 月他自己還發文嘲諷 WordPress 打的是 *"unenforceable trademark dispute"*（[`1839261574005141945`](https://x.com/theo/status/1839261574005141945)）。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **USPTO 官方資料庫查核為 0 筆註冊：** 順著 `@vildanden_ai` 的線索（[`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)）直查美國專利商標局 TSDR 資料庫，`T3 Code`、`T3 Tools`、`T3 Connect` 的註冊紀錄全為 **0 筆**。T3 Tools Inc. 歷史上提交過的唯一申請（`PING LABS`，序號 [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)）已於 2025 年 2 月被駁回、5 月 19 日標記為 `ABANDONED`。反倒是不相干的第三方在第 9/42 類軟體與 SaaS 中持有有效的 `T3` 註冊商標（`EquipmentShare` 註冊號 `7795672`／序號 [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)；`ESG Operations` 註冊號 `3324707`）。
- **GitHub 商標下架政策的硬門檻：** 依 [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)，商業公司提起商標下架，必須在偽證罪約束下填寫聯邦或國際註冊商標號。`@theo` 威脅封鎖帳號的那一刻，他連 GitHub 投訴表單都填不出來。
- **17 小時後緊急補寫 `TRADEMARK.md`（`PR #41898`）：** 11 月 24 日 **12:21 CST**（封鎖帳號威脅後 17 小時），`@theo` 合入 [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) 補寫 `TRADEMARK.md`，宣稱無論 *"whether registered or unregistered"*（註冊與否）均享有權利，並在 **94 秒後**立即於 X 上貼出該檔案連結（[`2125082769395220688`](https://x.com/theo/status/2125082769395220688)）。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **公開歷史留檔：** 事後補寫的 `TRADEMARK.md` 留在 `main` 中，而 USPTO 官方資料庫對 `T3 Code` 的註冊紀錄依然為 0。

<!-- section:visuals -->
## 一手實證原圖

![PR #41898 在封鎖帳號威脅 17 小時後緊急合併 TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md 宣稱無論商標「是否註冊」均主張排他權利](../../evidence/extra/p1-2b-trademark-md.png)

![補寫 TRADEMARK.md 前三小時 Theo 嘲諷質疑者 "get a better lawyer"](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 15 彈）](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243`（PING LABS — ABANDONED）](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500`（EquipmentShare `T3`）](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub 商標下架政策](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [94 秒後引用新檔案（`2125082769395220688`）](https://x.com/theo/status/2125082769395220688) · ["get a better lawyer"（`2125026423769555308`）](https://x.com/theo/status/2125026423769555308) · [曾嘲諷 WordPress 商標戰（`1839261574005141945`）](https://x.com/theo/status/1839261574005141945)
- [深度技術卷宗 05](../../docs/dossiers/05-governance-trademark-and-history.md)
