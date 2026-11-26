# #18 · De 77.000-sterrenfunnel: Sterren voor hostreferenties na 30 seconden inactiviteit en een onopgeloste bug voor willekeurige repo's

> Zes maanden nadat hij GitHub-sterren had veroordeeld als een manier om "VC's om de tuin te leiden zodat ze investeren", heeft @theo eigenhandig een in-app melding met 30 seconden inactiviteit samengevoegd die `PUT user/starred/...` uitvoert met de GitHub-referenties van de host. Daarmee schoot de repo van 30k naar 77k sterren (met ongeveer 129 watchers), terwijl een bug waarmee je willekeurige repo's kunt sterren onopgelost bleef.

<!-- section:claim -->
## Wat er werd beweerd

- Op 26 april 2026 publiceerde `@theo` *"Github has a fake star problem"*, waarin hij schreef dat GitHub-sterren *"mostly a way for companies to trick VCs into investing"* waren geworden ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Op 24 november, bij 74,6k sterren, beweerde hij dat hij *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Wat het bewijs laat zien

- **10× dagelijkse sterrenval via een in-app inactiviteitsmelding (`PR #27832`, `#29922`, `#29987`):** Nadat het meer dan 8 maanden had geduurd om 30.000 sterren te bereiken, schreef en mergeerde `@theo` zelf [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) op 30 oktober. Die voegde een sterrenmelding toe na 5 verzonden prompts (`PROMPTS_BEFORE_ASKING = 5`), waardoor het aantal dagelijkse sterren onmiddellijk **10×** werd (`+3,094` sterren/dag op GitHub Trending). Op 3 november voegden [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) en [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) **detectie van 30 seconden inactiviteit** toe (`IDLE_MS = 30_000`) terwijl gebruikers wachten op AI-beurten, en vervingen ze de browserredirect door een server-side `sourceControl.star`-RPC die `PUT user/starred/pingdotgg/t3code` rechtstreeks uitvoert via de **`gh` CLI / `GH_TOKEN`-referenties van de hostserver**, gevolgd door confetti met 160 deeltjes.
- **Omzeilde review en ondoorzichtigheid rond gedeelde hostaccounts:** Macroscope markeerde `PR #29922` als *Needs Human Approval* vanwege de mismatch tussen de browsergebruiker en de serverreferenties; `@theo` mergeerde desondanks zelf. Op gedeelde of externe hosts sterren gebruikers die op *Star* klikken stilzwijgend de repo met de GitHub-referenties van wie de server ook bezit, zonder de gebruiker te vertellen welk account is gebruikt.
- **Onopgeloste bug voor het sterren van willekeurige repo's (`driver.ts#L60-L99`):** Op 6 november diende ontwikkelaar `zhilsinger` een `Request changes` in met de opmerking dat [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) elke `owner/repo`-string accepteert zonder `pingdotgg/t3code` vast te pinnen, waardoor elke client met `source-control:write` willekeurige GitHub-repositories kan sterren met de referenties van de host.

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
## Status upstream (`ca81b7b9`)

- **Nog steeds open:** het niet vastpinnen van willekeurige repo's in `driver.ts#L60-L99` en de `Request changes`-review van `zhilsinger` van 6 november zijn 19 dagen later nog steeds onbeantwoord en onopgelost (77k+ sterren tegenover ongeveer 129 watchers).

<!-- section:visuals -->
## Visueel bewijs

![Theo's grafiek van 2 november, met een bijna verticale 10x-sterrenval direct na het uitbrengen van de in-app prompt](../../evidence/20-star-10x-cliff.png)

![De Request Changes-review van ontwikkelaar zhilsinger op PR #29922, 19 dagen onbeantwoord](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 accepteert willekeurige owner/repo-strings zonder pingdotgg/t3code vast te pinnen](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10x-val (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/dag Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Diepgaand technisch dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
