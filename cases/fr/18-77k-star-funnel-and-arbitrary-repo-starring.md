# #18 · L’entonnoir des 77 000 étoiles : ajout d’une étoile après 30 s d’inactivité via les identifiants de l’hôte et bug non corrigé d’ajout d’étoile à un dépôt arbitraire

> Six mois après avoir dénoncé les étoiles GitHub comme un moyen "to trick VCs into investing", @theo a fusionné lui-même une notification dans l’application, déclenchée après 30 secondes d’inactivité, qui exécute `PUT user/starred/...` avec les identifiants GitHub de l’hôte — faisant bondir le dépôt de 30 k à 77 k étoiles (avec ~129 watchers) tout en laissant non corrigé un bug d’ajout d’étoile à un dépôt arbitraire.

<!-- section:claim -->
## Ce qui a été affirmé

- Le 26 avril 2026, `@theo` a publié *"Github has a fake star problem"*, écrivant que les étoiles GitHub étaient devenues *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Le 24 novembre, à 74,6 k étoiles, il a affirmé avoir *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Ce que montrent les preuves

- **Multiplication par 10 des étoiles quotidiennes via une notification d’inactivité dans l’application (`PR #27832`, `#29922`, `#29987`) :** Après avoir mis plus de 8 mois à atteindre 30 000 étoiles, `@theo` a rédigé et auto-fusionné [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) le 30 octobre, ajoutant une notification d’ajout d’étoile après 5 prompts envoyés (`PROMPTS_BEFORE_ASKING = 5`), ce qui a immédiatement **multiplié par 10** les étoiles quotidiennes (`+3,094` étoiles/jour sur GitHub Trending). Le 3 novembre, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) et [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) ont ajouté une **détection d’inactivité sur une fenêtre de 30 secondes** (`IDLE_MS = 30_000`) pendant que les utilisateurs attendent des réponses de l’IA, et ont remplacé la redirection du navigateur par un RPC côté serveur `sourceControl.star` exécutant `PUT user/starred/pingdotgg/t3code` directement via les **identifiants `gh` CLI / `GH_TOKEN` du serveur hôte**, suivi de confettis à 160 particules.
- **Contournement de la revue et opacité du compte sur un hôte partagé :** Macroscope a signalé `PR #29922` comme *Needs Human Approval* en raison d’une inadéquation entre l’utilisateur du navigateur et les identifiants du serveur ; `@theo` l’a auto-fusionnée malgré tout. Sur les hôtes partagés ou distants, cliquer sur *Star* ajoute silencieusement une étoile au dépôt avec le compte de la personne qui possède les identifiants GitHub du serveur, sans indiquer à l’utilisateur quel compte a été utilisé.
- **Bug non corrigé d’ajout d’étoile à un dépôt arbitraire (`driver.ts#L60-L99`) :** Le 6 novembre, le développeur `zhilsinger` a soumis un `Request changes` signalant que [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) accepte toute chaîne `owner/repo` sans épingler `pingdotgg/t3code` — permettant à tout client disposant de `source-control:write` d’ajouter une étoile à des dépôts GitHub arbitraires avec les identifiants de l’hôte.

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
## Statut en amont (`ca81b7b9`)

- **Toujours ouvert :** l’ajout d’étoile à un dépôt arbitraire sans épinglage dans `driver.ts#L60-L99` et la revue `Request changes` de `zhilsinger` du 6 novembre restent sans réponse et sans correction 19 jours plus tard (77 k+ étoiles contre ~129 watchers).

<!-- section:visuals -->
## Preuves visuelles

![Graphique de Theo du 2 novembre célébrant un pic de 10x des étoiles quasi vertical juste après le déploiement du prompt dans l’application](../../evidence/20-star-10x-cliff.png)

![Revue Request Changes du développeur zhilsinger sur la PR #29922, restée sans réponse pendant 19 jours](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 qui accepte des chaînes owner/repo arbitraires sans épingler pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Sources primaires

- [Enquête originale sur X (partie 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [Pic de 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/jour sur Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Dossier technique approfondi 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
