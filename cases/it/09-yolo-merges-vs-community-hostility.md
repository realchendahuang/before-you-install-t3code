# #09 · `yolo merges` interne vs. ostilità esterna della community e ban con `.github/VOUCHED.td`

> All'interno, T3 Code spediva 500 commit al giorno tramite cicli automatizzati di agent e ammetteva "yolo merges breaking shit" — mentre all'esterno diceva ai contributor "here's my advice: Don't", denunciava gli utenti tramite `.github/VOUCHED.td` e insultava chi apriva issue.

<!-- section:claim -->
## Cosa era stato dichiarato

- T3 Code si presenta come un progetto open source in rapida evoluzione, che abbraccia la community, costruito da ingegneri per gli ingegneri.

<!-- section:evidence -->
## Cosa mostrano le prove

- **Velocità di merge interna spericolata:** `@theo` ha descritto pubblicamente la spedizione di **500 commit al giorno** ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), l'esecuzione di **700 agent in contemporanea**, il merge in blocco delle PR della community tramite un ciclo automatizzato di agent, ammettendo *"my yolo merges breaking shit sometimes"* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)) e scherzando sul fatto che rischiare una cancellazione della macchina equivale a *"free content"* ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **Governance ostile e ban per denuncia pubblica:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) si apriva con *"here's my advice: Don't"*, sostenuto da [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) con auto-ban per denuncia e **174 etichette `unwanted`** sulle PR della community respinte.
- **Rimozioni unilaterali di funzionalità e insulti agli utenti:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) ha seppellito il toggle Build/Plan (*"Reality check for those upset"*, 10 downvote), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) ha nascosto l'anello di utilizzo del contesto (16 downvote, record del repository) e [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) ha eliminato del tutto la modalità Plan con un riassunto AI auto-contraddittorio. In [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545), `@theo` ha detto all'utente `@bermudi` di *"uninstall our software"* e lo ha chiamato *"ungrateful prick"* — respingendo la sua [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) la mattina seguente.
- **Gatekeeping sui follower su X:** i contributor sono stati rimproverati per non seguire `@theo` ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), minacciati con la rimozione di `/btw` ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)) e informati che uno screenshot annotato vale più dell'invio di una PR ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Ancora attivo:** `CONTRIBUTING.md` e `.github/VOUCHED.td` restano presenti su `main` in `ca81b7b9`.

<!-- section:visuals -->
## Prove visive

![CONTRIBUTING.md che scoraggia le PR esterne e documenta i ban per denuncia pubblica in .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![La risposta di Theo nella Issue #33639 che dice a un utente di disinstallare e lo chiama ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo che ammette "my yolo merges breaking shit sometimes"](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Commento alla Issue #33639](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [500 commit al giorno (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Cancellazione della macchina = contenuto gratuito (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Dossier tecnico approfondito 05](../../docs/dossiers/05-governance-trademark-and-history.md)
