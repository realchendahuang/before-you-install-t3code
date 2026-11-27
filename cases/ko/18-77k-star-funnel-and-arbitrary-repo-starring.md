# #18 · 7만 7천 스타 퍼널: 30초 유휴 시 호스트 자격증명으로 스타 누르기 & 고쳐지지 않은 임의 리포지토리 버그

> GitHub 스타를 "to trick VCs into investing" 수단이라고 규정한 지 6개월 후, @theo는 앱 내에서 30초 유휴 시 호스트 GitHub 자격증명으로 `PUT user/starred/...` 를 호출하는 토스트를 직접 머지해 스타를 3만 개에서 7만 7천 개(워처 약 129명)까지 끌어올렸고, 임의 리포지토리 스타 버그는 고치지 않은 채 남겨두었다.

<!-- section:claim -->
## 무엇이 주장되었나

- 2026년 4월 26일, `@theo`는 *"Github has a fake star problem"* 을 발표하며 GitHub 스타가 *"mostly a way for companies to trick VCs into investing"* 이 되어버렸다고 썼다 ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- 11월 24일, 스타 7만 4,600개 시점에서 그는 자신이 *"completely missed crossing 70k"* 했다고 주장했다 ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## 증거가 보여주는 것

- **앱 내 유휴 토스트로 만든 일일 스타 10배 급증 (`PR #27832`, `#29922`, `#29987`):** 스타 3만 개에 도달하는 데 8개월 이상이 걸렸지만, `@theo`는 10월 30일 프롬프트 5회 전송 후 스타 토스트를 띄우는 [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832)를 직접 작성해 직접 머지했고(`PROMPTS_BEFORE_ASKING = 5`), 이것은 즉시 일일 스타를 **10배**로 끌어올렸다(GitHub Trending 기준 `+3,094` 스타/일). 11월 3일 [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922)와 [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987)는 사용자가 AI 응답을 기다리는 동안 작동하는 **30초 창 유휴 감지**(`IDLE_MS = 30_000`)를 추가하고, 브라우저 리디렉션을 서버 측 `sourceControl.star` RPC로 교체해 **호스트 서버의 `gh` CLI / `GH_TOKEN` 자격증명**을 통해 곧바로 `PUT user/starred/pingdotgg/t3code` 를 호출하도록 했으며, 뒤이어 160개 입자의 색종이 효과가 터진다.
- **리뷰 우회와 공유 호스트 계정 불투명성:** Macroscope는 브라우저 사용자와 서버 자격증명의 불일치를 이유로 `PR #29922`를 *Needs Human Approval* 로 표시했지만, `@theo`는 그대로 직접 머지했다. 공유 호스트나 원격 호스트에서는 *Star* 를 클릭하면 서버의 GitHub 자격증명을 소유한 계정으로 조용히 스타가 눌리며, 어떤 계정이 사용되었는지 사용자에게 알리지 않는다.
- **고쳐지지 않은 임의リ포지토리 스타 버그 (`driver.ts#L60-L99`):** 11월 6일 개발자 `zhilsinger`는 [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) 가 `pingdotgg/t3code` 를 고정하지 않고 어떤 `owner/repo` 문자열이든 받아들인다고 지적하며 `Request changes` 를 제출했다 — `source-control:write` 권한을 가진 클라이언트라면 누구든 호스트 자격증명으로 임의의 GitHub 리포지토리에 스타를 누를 수 있다는 뜻이다.

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
## 업스트림 현황 (`ca81b7b9`)

- **여전히 열려 있음:** `driver.ts#L60-L99` 의 고정되지 않은 임의 리포지토리 스타 기능과 `zhilsinger`의 11월 6일 `Request changes` 리뷰는 19일이 지난 지금도 답변도, 수정도 없다(스타 7만 7천 개 이상 대비 워처 약 129명).

<!-- section:visuals -->
## 시각적 증거

![앱 내 프롬프트를 출시한 직후 거의 수직에 가까운 스타 10배 급증을 자축하는 Theo의 11월 2일 차트](../../evidence/20-star-10x-cliff.png)

![PR #29922에 달린 개발자 zhilsinger의 Request Changes 리뷰, 19일째 미답변](../../evidence/21-pr29922-zhilsinger-review.png)

![`pingdotgg/t3code` 를 고정하지 않고 임의의 owner/repo 문자열을 받아들이는 driver.ts#L60-L99](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## 1차 출처

- [최초 X 조사 (제18편)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10배 급증 (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [Trending `+3,094`/일 (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [심층 기술 문서 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
