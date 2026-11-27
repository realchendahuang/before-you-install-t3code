# #02 · Gefälschtes Löschen von SQLite-Threads (41,6 GB Ballast) & 5-Sekunden-Scans aller OS-Prozesse

> Ein Klick auf „endgültig löschen“ ließ die vollständige Konversationshistorie in `statev2.sqlite` unangetastet (lokale Festplatten schwollen auf 41,6 GB an), während ein Hintergrund-Monitor in Rust alle 5 Sekunden jeden OS-Prozess und jede vollständige Kommandozeile scannte – ohne jede Opt-out-Möglichkeit.

<!-- section:claim -->
## Was behauptet wurde

- Der Bestätigungsdialog zum Löschen in der Seitenleiste (`useThreadActionMenu.ts`) teilte den Nutzern ausdrücklich mit: *"This permanently clears conversation history for this thread."*
- T3 Code wurde als saubere, schnelle lokale Coding-Umgebung vermarktet.

<!-- section:evidence -->
## Was die Belege zeigen

- **Gefälschtes endgültiges Löschen (`Issue #17845`, `#28903`):** Bei der Baseline `9d3195b4` fügte das Löschen eines Threads lediglich ein `"thread.deleted"`-Event an `statev2.sqlite` an, während frühere Nachrichten, Tool-Ausgaben und Reasoning-Traces unversehrt auf der Festplatte blieben. Nutzer dokumentierten, dass `statev2.sqlite` in 3 Wochen auf **25,9 GB** anschwoll (90 % "deleted" Threads), in 6 Wochen auf **41,6 GB** und in 7 Wochen auf **33 GB**.
- **Prozess- und Kommandozeilen-Scans auf dem gesamten Rechner (`Issue #11222`, `PR #41889`):** Der Hintergrund-Helfer `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) führte alle 5 Sekunden `ProcessesToUpdate::All` mit `with_cmd(UpdateKind::Always)` aus – selbst bei geschlossener Diagnose – und hielt unter Windows 280–300 dauerhafte Handles über 440+ nicht zugehörige Apps/Spiele hinweg. Am 24. November bestätigte [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889), dass die Diagnose **vollständige Prozess-Kommandozeilen** (oft mit Klartext-API-Keys, Datenbank-Passwörtern und Tokens) in Snapshots und Telemetrie erfasste.
- **Durchgesickerte Unternehmens-Hostnamen & erzwungener Abruf beim Start:** Favicon-Anfragen des Frontends ließen interne Hostnamen (etwa `devbox.localdomain`) an Googles Favicon-Dienst durchsickern (`PR #16950`, `PR #32657`), während der Serverstart bedingungslos Kompatibilitäts-Manifeste von `raw.githubusercontent.com` abrief – ohne Opt-out (`Issue #36479`).
- **Massiver Kontingentverbrauch & Stromfehler:** Wer Claude über das Agent SDK nutzte, verbrannte 5-Stunden-Kontingente mit **1,7-facher** Normalgeschwindigkeit (`Issue #7338`, `Issue #24649`, 81 Kommentare), während GPU-Regressionen bis zu **136-mal** so viel Strom zogen wie vergleichbares Electron – die GPU eines MacBook wurde bei **60 W** festgehalten (78 Minuten Akkuentladung) und bei **18 W** nach dem Schließen des Web-Tabs (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Teilweise gepatcht:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) fügte ein asynchrones `thread-content.purge` hinzu (schließt `#17845`), und [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) verengte die Prozess-Monitor-Lesevorgänge unter Windows.
- **Weiterhin offen:** Gelöschte Quell-Threads behalten ihre Historie, solange sie von aktiven Forks, ausstehendem `merge_back` oder aktiven Subagenten referenziert werden; Tombstone-Zeilen bleiben in SQLite, und das Zurückgewinnen von Speicherplatz erfordert weiterhin ein Offline-`VACUUM`; Linux und macOS behalten die Discovery per `ProcessesToUpdate::All` bei, und `PR #41889` bleibt offen.

<!-- section:visuals -->
## Visuelle Belege

![Issue #17845, das dokumentiert, wie endgültig gelöschte Threads statev2.sqlite auf zweistellige Gigabyte-Größen anschwellen lassen](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222, das dokumentiert, wie t3-resource-monitor alle 5 Sekunden jeden OS-Prozess scannt](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Primärquellen

- [Originale X-Recherche (Teil 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Technisches Tiefendossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
