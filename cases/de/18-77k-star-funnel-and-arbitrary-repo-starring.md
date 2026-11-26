# #18 · Der 77.000-Sterne-Trichter: Sterne per Host-Zugangsdaten bei 30-Sekunden-Inaktivität & ungefixter Arbitrary-Repo-Bug

> Ein halbes Jahr, nachdem er GitHub-Sterne als Mittel verurteilt hatte, „to trick VCs into investing“, hat @theo eigenhändig einen In-App-Toast zusammengeführt, der nach 30 Sekunden Inaktivität `PUT user/starred/...` mit den GitHub-Zugangsdaten des Hosts abfeuert — und das Repo damit von 30k auf 77k Sterne katapultiert (bei rund 129 Watchern), während ein Bug zum Sternen beliebiger Repos ungefixt blieb.

<!-- section:claim -->
## Was behauptet wurde

- Am 26. April 2026 veröffentlichte `@theo` *"Github has a fake star problem"* und schrieb, GitHub-Sterne seien *"mostly a way for companies to trick VCs into investing"* geworden ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Am 24. November behauptete er bei 74,6k Sternen, er habe *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Was die Belege zeigen

- **10-facher täglicher Sterne-Sprung durch In-App-Inaktivitäts-Toast (`PR #27832`, `#29922`, `#29987`):** Nachdem er mehr als 8 Monate gebraucht hatte, um 30.000 Sterne zu erreichen, verfasste und mergte `@theo` am 30. Oktober eigenhändig [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832), der nach 5 gesendeten Prompts einen Sterne-Toast einführte (`PROMPTS_BEFORE_ASKING = 5`) und die täglichen Sterne sofort **verzehnfachte** (`+3.094` Sterne/Tag auf GitHub Trending). Am 3. November fügten [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) und [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) eine **Erkennung von Inaktivität über ein 30-Sekunden-Fenster** hinzu (`IDLE_MS = 30_000`), während Nutzer auf KI-Antworten warten, und ersetzten die Browser-Weiterleitung durch einen serverseitigen `sourceControl.star`-RPC, der `PUT user/starred/pingdotgg/t3code` direkt über die **`gh`-CLI- bzw. `GH_TOKEN`-Zugangsdaten des Host-Servers** abfeuert — gefolgt von Konfetti mit 160 Partikeln.
- **Umgegangenes Review & Undurchsichtigkeit bei geteilten Hosts:** Macroscope markierte `PR #29922` wegen der Diskrepanz zwischen Browser-Nutzer und Server-Zugangsdaten als *Needs Human Approval*; `@theo` mergte trotzdem selbst. Auf geteilten oder entfernten Hosts setzt ein Klick auf *Star* stillschweigend einen Stern für das Repo — mit den GitHub-Zugangsdaten dessen, dem der Server gehört, ohne dem Nutzer zu sagen, welches Konto verwendet wurde.
- **Ungefixter Bug zum Sternen beliebiger Repos (`driver.ts#L60-L99`):** Am 6. November reichte der Entwickler `zhilsinger` ein `Request changes` ein mit dem Hinweis, dass [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) jeden beliebigen `owner/repo`-String akzeptiert, ohne auf `pingdotgg/t3code` festgelegt zu sein — wodurch jeder Client mit `source-control:write` beliebige GitHub-Repositories mit den Zugangsdaten des Hosts sternen kann.

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
## Upstream-Status (`ca81b7b9`)

- **Weiterhin offen:** Das ungepinnte Sternen beliebiger Repos in `driver.ts#L60-L99` und `zhilsinger`s `Request changes`-Review vom 6. November sind 19 Tage später noch immer unbeantwortet und ungefixt (77k+ Sterne gegenüber rund 129 Watchern).

<!-- section:visuals -->
## Visuelle Belege

![Theos Diagramm vom 2. November, das einen nahezu senkrechten 10-fachen Sterne-Sprung direkt nach dem Ausliefern des In-App-Prompts feiert](../../evidence/20-star-10x-cliff.png)

![Das unbeantwortete Request-Changes-Review von Entwickler zhilsinger zu PR #29922, 19 Tage lang offen](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 akzeptiert beliebige owner/repo-Strings, ohne auf pingdotgg/t3code festgelegt zu sein](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Primärquellen

- [Original-X-Recherche (Teil 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10-facher Sprung (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3.094/Tag Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Deep Technical Dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
