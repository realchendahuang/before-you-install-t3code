# #02 · Schijnverwijdering van SQLite-threads (41,6 GB opgeblazen data) & scans van alle OS-processen elke 5 seconden

> Een klik op "permanent verwijderen" liet de volledige gespreksgeschiedenis intact in `statev2.sqlite` (waardoor lokale schijven opzwollen tot 41,6 GB), terwijl een achtergrondmonitor in Rust elke 5 seconden elk OS-proces en de volledige commandoregel scande, zonder enige mogelijkheid om dat uit te zetten.

<!-- section:claim -->
## Wat er werd beweerd

- De bevestigingsdialoog voor verwijderen in de zijbalk (`useThreadActionMenu.ts`) vertelde gebruikers expliciet: *"This permanently clears conversation history for this thread."*
- T3 Code werd in de markt gezet als een schone, snelle lokale programmeeromgeving.

<!-- section:evidence -->
## Wat het bewijs laat zien

- **Schijnbare definitieve verwijdering (`Issue #17845`, `#28903`):** Bij baseline `9d3195b4` voegde het verwijderen van een thread alleen een `"thread.deleted"`-event toe aan `statev2.sqlite`, terwijl eerdere berichten, tool-outputs en redeneersporen intact op schijf bleven staan. Gebruikers documenteerden dat `statev2.sqlite` opzwol tot **25,9 GB** in 3 weken (90% "verwijderde" threads), **41,6 GB** in 6 weken en **33 GB** in 7 weken.
- **Scannen van processen en commandoregels op de hele machine (`Issue #11222`, `PR #41889`):** De achtergrondhelper `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) voerde elke 5 seconden `ProcessesToUpdate::All` uit met `with_cmd(UpdateKind::Always)`, zelfs met de diagnostiek gesloten — en hield daarbij 280–300 permanente handles vast over meer dan 440 niet-gerelateerde apps en games op Windows. Op 24 november bevestigde [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) dat de diagnostiek **volledige commandoregels van processen** (vaak met API-keys, databasewachtwoorden en tokens in platte tekst) opnam in snapshots en telemetrie.
- **Lekken van bedrijfs-hostnames & verplichte fetch bij het opstarten:** Favicon-verzoeken uit de frontend lekten interne hostnames (zoals `devbox.localdomain`) naar de favicon-dienst van Google (`PR #16950`, `PR #32657`), terwijl de server bij het opstarten zonder enige voorwaarde compatibiliteitsmanifesten ophaalde van `raw.githubusercontent.com`, zonder opt-out (`Issue #36479`).
- **Ernstige quota-verspilling & stroomverbruikbugs:** Claude aansturen via de Agent SDK verbruikte 5-uursquota's tegen **1,7x** de normale snelheid (`Issue #7338`, `Issue #24649`, 81 reacties), terwijl GPU-regressies tot **136x** het stroomverbruik van vergelijkbare Electron-apps veroorzaakten — een MacBook-GPU werd vastgepind op **60W** (accu leeg in 78 minuten) en op **18W** nadat het webtabblad was gesloten (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Upstream-status (`ca81b7b9`)

- **Gedeeltelijk gepatcht:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) voegde een asynchrone `thread-content.purge` toe (waarmee `#17845` werd gesloten), en [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) beperkte het uitlezen door de procesmonitor op Windows.
- **Nog open:** Verwijderde bronthreads behouden nog steeds hun geschiedenis zolang er levende forks, een lopende `merge_back` of actieve subagents naar verwijzen; tombstone-rijen blijven in SQLite staan en het vrijmaken van schijfruimte vereist nog altijd een offline `VACUUM`; op Linux en macOS blijft de discovery via `ProcessesToUpdate::All` bestaan, en `PR #41889` is nog open.

<!-- section:visuals -->
## Visueel bewijs

![Issue #17845 documenteert permanent verwijderde threads die statev2.sqlite opblazen tot tientallen gigabytes](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 documenteert dat t3-resource-monitor elke 5 seconden elk OS-proces scant](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Diepgaand technisch dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
