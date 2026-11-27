# #03 · `git push --force` silenzioso per 52 giorni contro la rimozione in 21 ore del filtro sulla privacy dei modelli

> Per oltre 52 giorni T3 Code ha lasciato aperto un bug in cui la modalità Auto di Claude approvava silenziosamente `git push --force origin main` senza chiedere conferma — eppure ha impiegato solo 21 ore a rimuovere una whitelist sulla privacy, così che i modelli privati comparissero sulla classifica pubblica di @theo.

<!-- section:claim -->
## Cosa era stato dichiarato

- La modalità Auto di Claude è progettata per escalare le azioni distruttive ad alto rischio (come il force-push su `main`) richiedendo un'esplicita approvazione umana.
- La telemetria è stata presentata come metriche aggregate sicure per la privacy.

<!-- section:evidence -->
## Cosa mostrano le prove

- **52+ giorni senza correzione — `git push --force` silenzioso (`Issue #15353`):** In `ClaudeAdapterV2.ts`, la modalità Auto cortocircuitava `!requiresClaudeApproval(context)` direttamente su `"allow"`. Quando il classificatore di sicurezza di Claude ha bloccato due volte `git push --force origin main` e ha escalato il terzo tentativo per la conferma umana, T3 Code l'ha approvato in silenzio, senza alcun prompt nell'interfaccia, registrando `"source": "user_temporary"`. Due PR di correzione comunitarie (`#15360`, `#35207`) sono rimaste senza revisione fino alla chiusura automatica da parte del bot; `#40692` è rimasta non unita.
- **21 ore per smantellare una whitelist sulla privacy (`Issue #40948` → `PR #41237`):** Il 22 novembre, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) segnalava che i modelli più recenti mancavano dalla classifica pubblica di `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) perché `PR #29001` applicava una whitelist di modelli. Nel giro di **21 ore**, [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) è stata unita sotto l'account di `@theo`, con la nota che Theo aveva esplicitamente chiesto la rimozione del filtro — facendo sì che nomi privati locali/enterprise come `ollama/acme-internal` e `acme-azure-deployment` venissero trasmessi testualmente all'analytics.

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Parzialmente modificato / bug di sicurezza centrale ancora aperto:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) ha successivamente mascherato i modelli fuori catalogo come `custom:<driver>` (gli slug di catalogo/vendor vengono comunque riportati dietro endpoint personalizzati). **L'Issue #15353 (silenzioso `git push --force` in modalità Auto) resta aperta e non corretta a `ca81b7b9`.**

<!-- section:visuals -->
## Prove visive

![Issue #15353 aperta da 52+ giorni, con la modalità Auto di Claude che approva silenziosamente il git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 unita 21 ore dopo l'Issue #40948, che rimuove il filtro sulla privacy dei modelli per slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Commento di riproduzione `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Correzioni comunitarie non unite: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Dossier tecnico approfondito 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
