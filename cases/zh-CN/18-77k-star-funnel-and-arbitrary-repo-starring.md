# #18 · 25 天冲出 7.7 万星的秘密：发呆 30 秒弹窗动用宿主机 GitHub 凭据后台点星与未修漏洞

> 痛批 GitHub Star 沦为“忽悠 VC 投资的工具”仅半年后，@theo 自写自合了发呆 30 秒弹窗并直接动用宿主机 `gh` CLI / `GH_TOKEN` 后台发 API 点星，25 天从 3 万星冲到 7.7 万星（仅约 129 名 watcher），更把任意仓库点星漏洞晾了 19 天未修。

<!-- section:claim -->
## 官方 / Theo 宣称

- 2026 年 4 月 26 日，`@theo` 专程发长视频《*Github has a fake star problem*》，称 GitHub Star 已沦为 *"mostly a way for companies to trick VCs into investing"*（[`2048122499834036340`](https://x.com/theo/status/2048122499834036340)）。
- 11 月 24 日仓库达 7.46 万星时，他轻描淡写称自己 *"completely missed crossing 70k"*（完全没注意到破 7 万星，[`2124992724223029538`](https://x.com/theo/status/2124992724223029538)）。

<!-- section:evidence -->
## 源码与公开记录铁证

- **发呆 30 秒弹窗 + 后台静默 API 点星让日增暴涨 10 倍（`PR #27832`、`#29922`、`#29987`）：** 建仓 8 个多月才涨到 3 万星后，`@theo` 于 10 月 30 日自写自合 [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) 在用户发满 5 轮对话（`PROMPTS_BEFORE_ASKING = 5`）时右上角弹窗求星，单日增星瞬间暴涨 **10 倍**（GitHub Trending 冲到 **+3,094 星/天**）。11 月 3 日他又合入 [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) 与 [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987)，加上 **窗口发呆 30 秒检测**（`IDLE_MS = 30_000`，正好卡在等 AI 回复的空档）并取消跳转浏览器，改为直接触发服务端 `sourceControl.star` RPC——**直接动用宿主机原本用于开发的 GitHub 凭据发 `PUT user/starred/pingdotgg/t3code`**，顺手放 160 颗彩带礼花。
- **绕过代码审查且在共享主机上隐瞒所动用账号：** 审查机器人 Macroscope 当场把 `PR #29922` 标为 *Needs Human Approval*（警告浏览器操作者与宿主机凭据账号可能不一致），`@theo` 照样直接强行自合。在共享或远程开发机上，前端点一下星甚至直接动用宿主机上别人的 GitHub 账号代点，全程不告知用的是哪个号。
- **未锁死目标仓库的任意点星漏洞（`driver.ts#L60-L99`）：** 11 月 6 日，开发者 `zhilsinger` 提交 `Request changes` 审查意见，直指 [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) 从未将目标锁死为 `pingdotgg/t3code`——任何拥有 `source-control:write` 的客户端都能借宿主机凭据给**任意 GitHub 仓库**点星。

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
## 上游最新状态（`ca81b7b9`）

- **仍未修复：** `driver.ts#L60-L99` 任意仓库点星漏洞与 `zhilsinger` 的审查意见在 19 天后的 `ca81b7b9` 依然无人回复、原封未修（仓库此时已达 7.7 万+ 星，而 watcher 仅约 129 人）。

<!-- section:visuals -->
## 一手实证原图

![Theo 11 月 2 日炫耀上线应用内求星弹窗后单日新增 Star 暴涨 10 倍的垂直陡崖图](../../evidence/20-star-10x-cliff.png)

![开发者 zhilsinger 在 PR #29922 提交 Request Changes 指出共享主机代点与任意点星漏洞，19 天无人理睬](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 源码实锤未锁死 pingdotgg/t3code，接受任意 owner/repo 路径点星](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 18 弹）](https://x.com/realchendahuang/status/2125416210120765799)
- [痛批假星忽悠 VC（`2048122499834036340`）](https://x.com/theo/status/2048122499834036340) · [10 倍暴涨陡崖（`2117065834267136469`）](https://x.com/theo/status/2117065834267136469) · [单日 +3,094 星（`2117172614158508400`）](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [深度技术卷宗 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
