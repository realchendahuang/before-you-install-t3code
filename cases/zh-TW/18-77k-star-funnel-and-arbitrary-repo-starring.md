# #18 · 25 天衝出 7.7 萬星的祕密：發呆 30 秒彈窗動用主機 GitHub 憑證背景點星與未修漏洞

> 痛批 GitHub Star 淪為「誆騙 VC 投資的工具」僅半年後，@theo 自寫自併了發呆 30 秒彈窗，並直接動用主機 `gh` CLI / `GH_TOKEN` 在背景呼叫 API 點星，25 天從 3 萬星衝到 7.7 萬星（僅約 129 名 watcher），更把任意倉庫點星漏洞擱了 19 天未修。

<!-- section:claim -->
## 官方 / Theo 宣稱

- 2026 年 4 月 26 日，`@theo` 專程發長影片《*Github has a fake star problem*》，稱 GitHub Star 已淪為 *"mostly a way for companies to trick VCs into investing"*（[`2048122499834036340`](https://x.com/theo/status/2048122499834036340)）。
- 11 月 24 日倉庫達 7.46 萬星時，他輕描淡寫稱自己 *"completely missed crossing 70k"*（完全沒注意到破 7 萬星，[`2124992724223029538`](https://x.com/theo/status/2124992724223029538)）。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **發呆 30 秒彈窗 + 背景靜默 API 點星讓日增暴漲 10 倍（`PR #27832`、`#29922`、`#29987`）：** 建倉 8 個多月才漲到 3 萬星後，`@theo` 於 10 月 30 日自寫自併 [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832)，在使用者發滿 5 輪對話（`PROMPTS_BEFORE_ASKING = 5`）時於右上角彈窗求星，單日增星瞬間暴漲 **10 倍**（GitHub Trending 衝到 **+3,094 星/天**）。11 月 3 日他又合入 [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) 與 [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987)，加上 **視窗發呆 30 秒偵測**（`IDLE_MS = 30_000`，正好卡在等 AI 回覆的空檔）並取消跳轉瀏覽器，改為直接觸發伺服器端 `sourceControl.star` RPC——**直接動用主機原本用於開發的 GitHub 憑證發出 `PUT user/starred/pingdotgg/t3code`**，順手放 160 顆彩帶紙花。
- **繞過程式碼審查且在共享主機上隱瞞所動用帳號：** 審查機器人 Macroscope 當場把 `PR #29922` 標為 *Needs Human Approval*（警告瀏覽器操作者與主機憑證帳號可能不一致），`@theo` 照樣直接強行自併。在共享或遠端開發機上，前端點一下星甚至直接動用主機上別人的 GitHub 帳號代點，全程不告知用的是哪個帳號。
- **未鎖死目標倉庫的任意點星漏洞（`driver.ts#L60-L99`）：** 11 月 6 日，開發者 `zhilsinger` 提交 `Request changes` 審查意見，直指 [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) 從未將目標鎖死為 `pingdotgg/t3code`——任何擁有 `source-control:write` 的用戶端都能借主機憑證給**任意 GitHub 倉庫**點星。

```ts
// packages/source-control-github/src/server/driver.ts（第 60–66、90–96 行）
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **仍未修復：** `driver.ts#L60-L99` 任意倉庫點星漏洞與 `zhilsinger` 的審查意見在 19 天後的 `ca81b7b9` 依然無人回覆、原封未修（倉庫此時已達 7.7 萬+ 星，而 watcher 僅約 129 人）。

<!-- section:visuals -->
## 一手實證原圖

![Theo 11 月 2 日炫耀上線應用內求星彈窗後單日新增 Star 暴漲 10 倍的垂直陡崖圖](../../evidence/20-star-10x-cliff.png)

![開發者 zhilsinger 在 PR #29922 提交 Request Changes 指出共享主機代點與任意點星漏洞，19 天無人理睬](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 原始碼鐵證未鎖死 pingdotgg/t3code，接受任意 owner/repo 路徑點星](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 18 彈）](https://x.com/realchendahuang/status/2125416210120765799)
- [痛批假星誆騙 VC（`2048122499834036340`）](https://x.com/theo/status/2048122499834036340) · [10 倍暴漲陡崖（`2117065834267136469`）](https://x.com/theo/status/2117065834267136469) · [單日 +3,094 星（`2117172614158508400`）](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [深度技術卷宗 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
