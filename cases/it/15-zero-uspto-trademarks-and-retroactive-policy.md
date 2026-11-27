# #15 · Zero marchi USPTO dietro la minaccia di ban su GitHub e `TRADEMARK.md` retroattivo in 17 ore

> Quando @theo ha minacciato di contattare GitHub per far chiudere l'account di uno sviluppatore cinese per "trademark infringement", T3 Tools Inc. aveva 0 registrazioni USPTO per `T3 Code`, `T3 Tools` o `T3 Connect` — e ha unito retroattivamente `TRADEMARK.md` 17 ore dopo.

<!-- section:claim -->
## Che cosa è stato affermato

- Il 23 novembre, `@theo` ha accusato l'autore del fork MIT di violazione di marchio e ha minacciato la chiusura di un account GitHub ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- Tre ore prima di unire `TRADEMARK.md`, ha detto agli sviluppatori che chiedevano spiegazioni di *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — dopo aver deriso WordPress nel settembre 2024 per una *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Che cosa dimostrano le prove

- **Zero registrazioni USPTO per i marchi T3:** la verifica diretta sul TSDR dell'USPTO (partendo da una segnalazione di `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) mostra **0 registrazioni** per `T3 Code`, `T3 Tools` o `T3 Connect`. L'unica domanda USPTO di T3 Tools Inc. (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) è stata rifiutata a febbraio 2025 e contrassegnata come `ABANDONED` il 19 maggio 2025. Nel frattempo, terzi non correlati detengono registrazioni attive `T3` per software/SaaS nelle Classi 9 e 42 (`EquipmentShare`, Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`).
- **Requisito della Trademark Policy di GitHub:** secondo la [Trademark Policy di GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), le richieste commerciali di rimozione per marchio richiedono un numero di registrazione federale o internazionale, sotto pena di spergiuro. Nel momento in cui `@theo` ha minacciato di far chiudere l'account di `@DDdxx666`, non poteva completare il modulo di GitHub.
- **`TRADEMARK.md` retroattivo dopo 17 ore (`PR #41898`):** alle **12:21 CST del 24 novembre** — 17 ore dopo la minaccia di ban — `@theo` ha unito [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) inserendo `TRADEMARK.md`, che rivendica diritti *"whether registered or unregistered"*, e lo ha citato su X 94 secondi dopo ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Documentazione pubblica:** il `TRADEMARK.md` retroattivo resta su `main`; i registri USPTO TSDR continuano a mostrare 0 registrazioni di T3 Tools Inc. per `T3 Code`.

<!-- section:visuals -->
## Prove visive

![PR #41898 unita 17 ore dopo la minaccia di ban, aggiungendo retroattivamente TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md che rivendica diritti esclusivi "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo che dice agli sviluppatori "get a better lawyer" tre ore prima di unire TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [Trademark Policy di GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Citazione retroattiva 94 secondi dopo (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Derisione di WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Dossier tecnico approfondito 05](../../docs/dossiers/05-governance-trademark-and-history.md)
