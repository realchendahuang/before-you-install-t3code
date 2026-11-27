# #11 · Die Klarstellung vom 25. November wurde binnen zwei Stunden durch über Nacht eingegangene PRs und einen 100-MB-Dump widerlegt

> Am Morgen des 25. November gab @theo drei weitreichende Datenschutz-Zusicherungen und veröffentlichte einen 100 MB großen Telemetrie-Dump — alle drei Behauptungen wurden binnen zwei Stunden durch die PRs seines eigenen Teams und den gzip-komprimierten Dump selbst widerlegt.

<!-- section:claim -->
## Was behauptet wurde

In seiner Klarstellung vom Morgen des 25. November ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) und der nachfolgenden Antwort ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) versicherte `@theo` den Nutzern:
- T3 Code habe *"never collected file paths."*
- Umgebungsvariablen hätten *"always disabled telemetry cleanly."*
- Opt-out-Installationen schrieben keine lokalen Tracking-Dateien, und die Claude-Owner-Hashes seien *"broken."*

<!-- section:evidence -->
## Was die Belege zeigen

- **Widerspruch 1 — `git.cwd` leakte den absoluten Workspace-Pfad (`PR #42450`):** Rund 90 Minuten nach dem Post merge te Julius, Core-Maintainer, [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450) und räumte damit ein, dass über Relay ausgelöste Webhook-Läufe vollständige Execution-Spans an Axiom exportierten — darunter Git-Spans mit `git.cwd` (**vollständiger absoluter Workspace-Pfad, OS-Benutzername und Repository-Name**).
- **Widerspruch 2 — defekte Opt-outs unter Windows und macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) räumte ein, dass die Windows-Desktop-App gespeicherte Benutzer-Umgebungsvariablen `T3CODE_TELEMETRY_ENABLED=false` ignorierte, wenn sie aus bereits laufenden Prozessen heraus gestartet wurde. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) räumte ein, dass beim Erststart unter macOS/Linux das Relay-Tracing initialisiert wurde, bevor die Shell-Umgebung ermittelt war, sodass Opt-outs aus `~/.zshrc` für die gesamte Sitzung ignoriert wurden.
- **Widerspruch 3 — bedingungslose Schreibzugriffe auf die Festplatte & 264 aktive Claude-Datensätze in `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` at `ca81b7b9`) ruft beim Start weiterhin bedingungslos `getTelemetryIdentity` auf und schreibt die lokale Installations-UUID (`upsertAnonymousId`), bevor `telemetryEnabled` geprüft wird. Der gzip-Header von `@theo`s öffentlichem Export (`6,056,594` Bytes komprimiert, `95,789` Events) wies zugleich als ursprünglichen Dateinamen `events.clean.jsonl` aus, erzeugt 20 Minuten vor dem Posting — und dennoch enthielt er **264 aktive Claude-Owner-Datensätze**, die **4 verschiedene Maschinen** (`installId`s) über einen einzigen SHA-256-Hash miteinander verknüpften, zusammen mit wortwörtlich übernommenen privaten Proxy-Modellen (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Teilweise gepatcht:** `PR #42450`, `PR #42376` und `PR #42464` wurden über Nacht gemergt.
- **Weiterhin offen:** `AnalyticsService.ts:156` schreibt die lokale anonyme ID weiterhin bedingungslos, bevor Opt-outs geprüft werden, und `DesktopShellEnvironment.ts` leitet `T3CODE_OTEL_SDK_DISABLED` und `OTEL_SDK_DISABLED` weiterhin nicht weiter.

<!-- section:visuals -->
## Visuelle Belege

![PR #42450 räumt ein, dass relay-ausgelöste Läufe absolute `git.cwd`-Workspace-Pfade an Axiom exportierten](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 räumt ein, dass die Windows-Desktop-App gespeicherte `T3CODE_TELEMETRY_ENABLED=false`-Umgebungsvariablen ignorierte](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 räumt ein, dass das Relay-Tracing beim macOS-Erststart Opt-outs aus `~/.zshrc` ignorierte](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Forensische Auswertung von `events.clean.jsonl`: 264 Claude-Datensätze, die 4 Maschinen und private Proxy-Modell-IDs verknüpfen](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` Klarstellung vom 25. November (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Folgeantwort (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Öffentlicher gzip-Dump](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Technisches Detail-Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
