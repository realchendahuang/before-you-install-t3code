# #12 · Blitz notturno di sei ore post-GDPR: 2,2 milioni/ora di log IP e cancellazione degli account non funzionante

> Dopo la presentazione di un formale reclamo GDPR all'UE il 24 novembre, sei ore di patch d'emergenza notturne hanno fatto emergere inavvertitamente quattro rivelazioni sulla privacy ancora più profonde — a cominciare da 2,2 milioni/ora di span Axiom etichettati con l'IP e conservati per 30 giorni.

<!-- section:claim -->
## Che cosa era stato dichiarato

- Anche 3,5 ore dopo l'unione di `PR #42380`, `@theo` ha risposto pubblicamente che gli IP dei chiamanti erano già stati rimossi.
- La documentazione ufficiale (`docs/user/telemetry.md`) prometteva che i report `agent.feedback` erano anonimi e che la cancellazione dell'account rimuoveva in modo pulito i dati degli utenti.

<!-- section:evidence -->
## Che cosa dimostrano le prove

- **Span di relay con IP e User-Agent da 2,2 milioni all'ora (`PR #42380`):** Ogni span di richiesta relay esportato verso Axiom — circa **2,2 milioni di span all'ora, conservati per 30 giorni** — registrava `client.address` (l'IP reale del chiamante da `cf-connecting-ip`) e `user_agent.original` direttamente accanto a `user.id` (con i log Workers dell'1% di Cloudflare mantenuti separati).
- **Cancellazione dell'account Clerk non funzionante (`PR #42285` & `PR #42430`):** In precedenza, l'eliminazione di un account utente in Clerk lasciava dietro le quinte righe relay su PlanetScale e tunnel Cloudflare attivi — finché una vera richiesta di cancellazione dei dati da parte di un utente non ha costretto gli ingegneri a eseguire **SQL scritto a mano e lo smantellamento manuale dei tunnel**.
- **Fughe di token push mobile e user ID (`PR #42459` & `PR #41859`):** I payload push FCM di Android trasmettevano a Google valori `user_id` di Clerk in chiaro a ogni notifica; gli span APNs di iOS e i log degli errori catturavano URL push completi del dispositivo contenenti i token push.
- **Feedback "anonymous" in batch misti (`PR #42466`):** Eventi `agent.feedback` presumibilmente anonimi venivano raggruppati nello stesso identico POST HTTP insieme a eventi `installId` identificati e a impronte complete dell'host (OS, architettura, distribuzione WSL grezza), contraddicendo direttamente `docs/user/telemetry.md`.

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Parzialmente corretto con patch:** Le PR d'emergenza `#42380`, `#42285`, `#42430`, `#42459`, `#41859` e `#42466` sono state unite durante lo sprint GDPR notturno.
- **Ancora aperto:** `privacy-policy.astro` è rimasto invariato dal `2026-10-06`, il servizio closed-source `ingest.t3.codes` conserva copie grezze degli eventi senza possibilità di verifica indipendente, e le precedenti finestre di conservazione di 30 giorni in Axiom non sono mai state comunicate formalmente agli utenti interessati.

<!-- section:visuals -->
## Prove visive

![PR #42380 che rivela come circa 2,2 milioni di span relay all'ora registrassero l'IP reale del chiamante e lo User-Agent accanto a user.id per 30 giorni in Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 che ammette come la cancellazione dell'account lasciasse in precedenza righe PlanetScale e tunnel Cloudflare attivi](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 che ammette come i push FCM di Android inviassero valori user_id grezzi di Clerk a Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 che ammette come il feedback anonimo fosse raggruppato insieme a installId e alle impronte dell'host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Dossier tecnico approfondito 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
