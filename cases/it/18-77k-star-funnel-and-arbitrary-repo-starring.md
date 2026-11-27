# #18 · L'imbuto delle 77.000 stelle: starring con credenziali host a 30 secondi di inattività e bug irrisolto del repo arbitrario

> Sei mesi dopo aver condannato le stelle di GitHub come un modo "to trick VCs into investing", @theo ha auto-approvato e auto-merged un toast in-app che scatta dopo 30 secondi di inattività e lancia `PUT user/starred/...` usando le credenziali GitHub dell'host — catapultando il repo da 30k a 77k stelle (con ~129 watcher) e lasciando irrisolto un bug che consente di mettere la stella a repository arbitrari.

<!-- section:claim -->
## Cosa era stato dichiarato

- Il 26 aprile 2026 `@theo` ha pubblicato *"Github has a fake star problem"*, scrivendo che le stelle di GitHub erano diventate *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Il 24 novembre, a 74,6k stelle, ha dichiarato di aver *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Cosa mostrano le prove

- **Crollo verticale (10×) delle stelle giornaliere tramite toast in-app di inattività (`PR #27832`, `#29922`, `#29987`):** dopo aver impiegato più di 8 mesi per arrivare a 30.000 stelle, il 30 ottobre `@theo` ha scritto e auto-merged [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832), che aggiunge un toast per la stella dopo 5 prompt inviati (`PROMPTS_BEFORE_ASKING = 5`), moltiplicando subito **per 10×** le stelle giornaliere (`+3,094` stelle/giorno su GitHub Trending). Il 3 novembre [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) e [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) hanno aggiunto il **rilevamento di inattività su una finestra di 30 secondi** (`IDLE_MS = 30_000`) mentre gli utenti attendono i turni dell'AI, e hanno sostituito il redirect nel browser con una RPC lato server `sourceControl.star` che lancia `PUT user/starred/pingdotgg/t3code` direttamente attraverso le **credenziali `gh` CLI / `GH_TOKEN` del server host**, seguita da coriandoli a 160 particelle.
- **Revisione aggirata e opacità dell'account su host condivisi:** Macroscope ha segnalato `PR #29922` come *Needs Human Approval* per il disallineamento tra utente del browser e credenziali del server; `@theo` l'ha comunque auto-merged. Su host condivisi o remoti, cliccare *Star* mette silenziosamente la stella al repo usando le credenziali GitHub di chi possiede il server, senza dire all'utente quale account è stato usato.
- **Bug irrisolto dello starring su repo arbitrari (`driver.ts#L60-L99`):** il 6 novembre lo sviluppatore `zhilsinger` ha inviato una `Request changes` facendo notare che [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) accetta qualsiasi stringa `owner/repo` senza fissare `pingdotgg/t3code` — permettendo a qualunque client con `source-control:write` di mettere la stella a repository GitHub arbitrari usando le credenziali dell'host.

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
## Stato upstream (`ca81b7b9`)

- **Tutto ancora aperto:** lo starring su repo arbitrari non vincolato in `driver.ts#L60-L99` e la review `Request changes` di `zhilsinger` del 6 novembre restano senza risposta e non corretti 19 giorni dopo (oltre 77k stelle contro ~129 watcher).

<!-- section:visuals -->
## Prove visive

![Il grafico di Theo del 2 novembre che celebra un crollo quasi verticale da 10x delle stelle, subito dopo il rilascio del prompt in-app](../../evidence/20-star-10x-cliff.png)

![La review Request Changes dello sviluppatore zhilsinger sulla PR #29922, rimasta senza risposta per 19 giorni](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 che accetta stringhe owner/repo arbitrarie senza fissare pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [crollo 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/giorno su Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Dossier tecnico approfondito 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
