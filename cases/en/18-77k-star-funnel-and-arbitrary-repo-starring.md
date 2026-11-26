# #18 · The 77,000-Star Funnel: 30s-Idle Host-Credential Starring & Unfixed Arbitrary-Repo Bug

> Six months after condemning GitHub stars as a way "to trick VCs into investing", @theo self-merged an in-app 30-second-idle toast that fires `PUT user/starred/...` using host GitHub credentials — catapulting the repo from 30k to 77k stars (with ~129 watchers) while leaving an arbitrary-repo starring bug unfixed.

<!-- section:claim -->
## What Was Claimed

- On April 26, 2026, `@theo` published *"Github has a fake star problem"*, writing that GitHub stars had become *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- On November 24 at 74.6k stars, he claimed he *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## What the Evidence Shows

- **10× daily star cliff via in-app idle toast (`PR #27832`, `#29922`, `#29987`):** After taking 8+ months to reach 30,000 stars, `@theo` self-authored and self-merged [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) on October 30 adding a star toast after 5 sent prompts (`PROMPTS_BEFORE_ASKING = 5`), immediately **10×'ing** daily stars (`+3,094` stars/day on GitHub Trending). On November 3, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) and [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) added **30-second window idle detection** (`IDLE_MS = 30_000`) while users wait on AI turns and replaced the browser redirect with a server-side `sourceControl.star` RPC firing `PUT user/starred/pingdotgg/t3code` directly through the **host server's `gh` CLI / `GH_TOKEN` credentials**, followed by 160-particle confetti.
- **Bypassed review & shared-host account opacity:** Macroscope flagged `PR #29922` as *Needs Human Approval* over browser-user vs. server-credential mismatch; `@theo` self-merged anyway. On shared or remote hosts, clicking *Star* silently stars the repo using whoever owns the server's GitHub credentials without telling the user which account was used.
- **Unfixed arbitrary-repo starring bug (`driver.ts#L60-L99`):** On November 6, developer `zhilsinger` filed `Request changes` pointing out that [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) accepts any `owner/repo` string without pinning `pingdotgg/t3code` — letting any client with `source-control:write` star arbitrary GitHub repositories using host credentials.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Still open:** `driver.ts#L60-L99` unpinned arbitrary-repo starring and `zhilsinger`'s November 6 `Request changes` review remain unanswered and unfixed 19 days later (77k+ stars vs. ~129 watchers).

<!-- section:visuals -->
## Visual Evidence

![Theo's Nov 2 chart celebrating a near-vertical 10x star cliff right after shipping the in-app prompt](../../evidence/20-star-10x-cliff.png)

![Developer zhilsinger's Request Changes review on PR #29922 unanswered for 19 days](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 accepting arbitrary owner/repo strings without pinning pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10x cliff (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/day Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Deep Technical Dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
