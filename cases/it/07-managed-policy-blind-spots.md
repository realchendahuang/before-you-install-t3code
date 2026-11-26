# #07 · La contraddizione della Managed Policy: quattro punti ciechi documentati nella telemetria

> @theo ha sostenuto che T3 Code avesse il "best corporate managed policy system", tale da rendere "trivial to turn off all telemetry" — una tesi smentita di netto dalla stessa documentazione di T3 Code, `docs/user/telemetry.md` e `docs/user/managed-policy.md`.

<!-- section:claim -->
## Che cosa è stato dichiarato

- Il 24 novembre alle 19:13 CST, `@theo` ha liquidato la mancanza di toggle di opt-out per gli utenti: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Mezz'ora dopo ha aggiunto che i dati delle conversazioni *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Che cosa dimostrano le prove

La documentazione ufficiale di T3 Code stesso ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) e [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) documenta quattro punti ciechi concreti:

- **Distribuzione riservata agli amministratori (nessun interruttore nella UI personale):** gli utenti desktop non hanno alcun toggle nelle Impostazioni. Managed Policy richiede MDM/GPO o percorsi di sistema protetti da amministratore (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, oppure `/etc/t3code/policy.json`), del tutto inaccessibili agli utenti desktop non amministratori.
- **La Hosted Web App (`app.t3.codes`) ignora la policy:** l'app browser ignora le variabili d'ambiente del server e la Managed Policy, emette trace di connessione quando è compilata con il tracing attivo, e *"has no relay tracing toggle."*
- **Le app mobile restano fuori dalla policy del server:** la documentazione ufficiale conferma che le variabili d'ambiente del server e la Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` ignora gli opt-out:** carica su T3 Connect i titoli dei progetti, i titoli dei thread, i nomi dei modelli e lo stato in tempo reale — e la documentazione afferma esplicitamente: *"The telemetry opt-out does not disable it."* Inoltre, gli span Axiom e i crash log falliti *"can quote a value the app was handling"*, e `Agent feedback` può allegare fino a 16 KB di messaggi della conversazione.

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Ancora aperto:** nella notte [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) ha aggiunto un toggle in-app per il tracing mobile, ma Managed Policy non può ancora disattivare il tracing mobile, la versione hosted `app.t3.codes` ha ancora zero toggle di opt-out, `Publish agent activity` ignora ancora gli opt-out della telemetria, e non esiste alcun toggle nella UI delle Impostazioni desktop.

<!-- section:visuals -->
## Prove visive

![La documentazione ufficiale docs/user/telemetry.md conferma che app.t3.codes non ha alcun toggle, che il mobile ignora la Managed Policy e che l'attività dell'agente ignora gli opt-out](../../evidence/05-telemetry-cant-disable.png)

![La documentazione ufficiale docs/user/managed-policy.md elenca i percorsi di sistema protetti da amministratore su macOS, Windows e Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Il post di Theo del 24 novembre in cui sostiene che Managed Policy renda banale disattivare tutta la telemetria](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Dichiarazione di `@theo` sulla Managed Policy (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
