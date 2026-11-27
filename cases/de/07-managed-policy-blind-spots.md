# #07 · Der Widerspruch in der Managed-Policy: Vier dokumentierte Telemetrie-Blindstellen

> @theo behauptete, T3 Code habe das „best corporate managed policy system“, das es „trivial“ mache, „all telemetry“ abzuschalten — dem widersprechen T3 Codes eigene `docs/user/telemetry.md` und `docs/user/managed-policy.md` unmittelbar.

<!-- section:claim -->
## Was behauptet wurde

- Am 24. November um 19:13 CST tat `@theo` die fehlenden Opt-out-Schalter für Nutzer ab: *„We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor.“* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Eine halbe Stunde später ergänzte er, Gesprächsdaten *„never touches any of our servers“* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Was die Belege zeigen

T3 Codes eigene offizielle Dokumentation ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) und [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) dokumentiert vier konkrete Blindstellen:

- **Deployment nur für Admins (null persönlicher UI-Schalter):** Desktop-Nutzer haben keinen Schalter in den Einstellungen. Managed Policy verlangt MDM/GPO oder admin-geschützte Betriebssystempfade (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, oder `/etc/t3code/policy.json`), die für Desktop-Nutzer ohne Adminrechte vollständig unerreichbar sind.
- **Hosted Web App (`app.t3.codes`) ignoriert die Policy:** Die Browser-App ignoriert Server-Umgebungsvariablen und Managed Policy, sendet Verbindungs-Traces, wenn sie mit Tracing gebaut wurde, und *„has no relay tracing toggle.“*
- **Mobile Apps liegen außerhalb der Server-Policy:** Die offizielle Dokumentation bestätigt, dass Server-Umgebungsvariablen und Managed Policy *„do not disable mobile tracing.“*
- **`Publish agent activity` ignoriert Opt-outs:** Lädt Projektnamen, Thread-Titel, Modellnamen und Live-Status zu T3 Connect hoch — und die Dokumentation stellt ausdrücklich fest: *„The telemetry opt-out does not disable it.“* Zusätzlich können fehlgeschlagene Axiom-Spans/Crash-Logs *„can quote a value the app was handling“*, und `Agent feedback` kann bis zu 16 KB an Gesprächsnachrichten anhängen.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Weiterhin offen:** Über Nacht fügte [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) einen In-App-Schalter für Mobile-Traces hinzu, doch Managed Policy kann Mobile-Tracing weiterhin nicht deaktivieren, das gehostete `app.t3.codes` hat weiterhin keinen einzigen Opt-out-Schalter, `Publish agent activity` ignoriert weiterhin Telemetrie-Opt-outs, und es existiert weiterhin kein Schalter in der Desktop-Einstellungsoberfläche.

<!-- section:visuals -->
## Visuelle Belege

![Offizielle docs/user/telemetry.md, die bestätigt, dass app.t3.codes keinen Schalter hat, Mobile Managed Policy ignoriert und Agent-Aktivität Opt-outs ignoriert](../../evidence/05-telemetry-cant-disable.png)

![Offizielle docs/user/managed-policy.md mit den admin-geschützten Systempfaden unter macOS, Windows und Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theos Beitrag vom 24. November mit der Behauptung, Managed Policy mache das Abschalten aller Telemetrie trivial](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` Managed-Policy-Behauptung (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` „never touches servers“ (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
