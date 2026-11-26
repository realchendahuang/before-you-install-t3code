# #02 · Falsa cancellazione dei thread in SQLite (gonfiore da 41,6 GB) e scansione di tutti i processi del sistema operativo ogni 5 secondi

> Cliccare su "elimina definitivamente" lasciava intatta l'intera cronologia delle conversazioni dentro `statev2.sqlite` (gonfiando i dischi locali fino a 41,6 GB), mentre un monitor Rust in background scansionava ogni processo del sistema operativo e la riga di comando completa ogni 5 secondi, senza alcuna possibilità di disattivarlo.

<!-- section:claim -->
## Che cosa era stato dichiarato

- La finestra di conferma dell'eliminazione nella barra laterale (`useThreadActionMenu.ts`) diceva esplicitamente agli utenti: *"This permanently clears conversation history for this thread."*
- T3 Code veniva presentato come un workspace di programmazione locale pulito e veloce.

<!-- section:evidence -->
## Che cosa dimostrano le prove

- **Falsa eliminazione definitiva (`Issue #17845`, `#28903`):** alla baseline `9d3195b4`, eliminare un thread si limitava ad aggiungere un evento `"thread.deleted"` a `statev2.sqlite`, lasciando intatti su disco i messaggi precedenti, gli output degli strumenti e le tracce di ragionamento. Gli utenti hanno documentato `statev2.sqlite` gonfiarsi fino a **25,9 GB** in 3 settimane (90% dei thread "eliminati"), **41,6 GB** in 6 settimane e **33 GB** in 7 settimane.
- **Scansione dei processi e delle righe di comando dell'intera macchina (`Issue #11222`, `PR #41889`):** l'helper in background `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) eseguiva `ProcessesToUpdate::All` con `with_cmd(UpdateKind::Always)` ogni 5 secondi anche a diagnostica chiusa, mantenendo 280–300 handle persistenti su 440+ app e giochi non correlati su Windows. Il 24 novembre, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) ha confermato che la diagnostica catturava **le righe di comando complete dei processi** (spesso contenenti chiavi API in chiaro, password di database e token) all'interno di snapshot e telemetria.
- **Fughe di hostname aziendali e fetch obbligatorio all'avvio:** le richieste di favicon dal frontend esponevano hostname interni (come `devbox.localdomain`) al servizio favicon di Google (`PR #16950`, `PR #32657`), mentre all'avvio il server recuperava incondizionatamente i manifest di compatibilità da `raw.githubusercontent.com` senza possibilità di disattivarlo (`Issue #36479`).
- **Grave consumo di quota e bug di alimentazione:** usare Claude tramite Agent SDK consumava le quote da 5 ore a una velocità **1,7x** rispetto al normale (`Issue #7338`, `Issue #24649`, 81 commenti), mentre regressioni della GPU arrivavano a consumare fino a **136x** l'energia di un Electron comparabile — bloccando la GPU di un MacBook a **60W** (78 minuti di autonomia) e a **18W** dopo aver chiuso la scheda web (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Parzialmente corretto:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) ha aggiunto `thread-content.purge` asincrono (chiudendo `#17845`), e [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) ha ridotto le letture del monitor dei processi su Windows.
- **Ancora aperto:** i thread sorgente eliminati conservano ancora la cronologia finché sono referenziati da fork attivi, da `merge_back` in sospeso o da subagent attivi; le righe tombstone restano in SQLite e recuperare spazio su disco richiede ancora un `VACUUM` offline; Linux e macOS mantengono il rilevamento con `ProcessesToUpdate::All`, e `PR #41889` resta aperto.

<!-- section:visuals -->
## Prove visive

![Issue #17845 che documenta thread eliminati definitivamente gonfiare statev2.sqlite fino a decine di gigabyte](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 che documenta t3-resource-monitor scansionare ogni processo del sistema operativo ogni 5 secondi](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Dossier tecnico approfondito 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
