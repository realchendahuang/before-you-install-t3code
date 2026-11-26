# #11 · Verduidelijking van 25 nov binnen 2 uur weersproken door overnight-PR's & 100 MB dump

> Op de ochtend van 25 november gaf @theo drie allesomvattende privacyverzekeringen en publiceerde hij een telemetriedump van 100 MB — alle drie de beweringen werden binnen twee uur weersproken door de PR's van zijn eigen team en door de gzip-dump zelf.

<!-- section:claim -->
## Wat er werd beweerd

In zijn verduidelijking van 25 november in de ochtend ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) en zijn follow-upreactie ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) verzekerde `@theo` gebruikers:
- T3 Code *"never collected file paths."*
- Omgevingsvariabelen *"always disabled telemetry cleanly."*
- Installaties waarvoor je je hebt afgemeld, schrijven geen enkel lokaal trackingbestand, en de Claude owner-hashes waren *"broken."*

<!-- section:evidence -->
## Wat het bewijs laat zien

- **Tegenstrijdigheid 1 — `git.cwd` lekt het volledige absolute werkpad (`PR #42450`):** Ongeveer 90 minuten na de post mergede kernmaintainer Julius [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), waarmee hij toegaf dat via de relay geleverde webhook-runs volledige execution spans naar Axiom exporteerden — inclusief Git-spans met `git.cwd` (**het volledige absolute werkpad, de OS-gebruikersnaam en de naam van de repository**).
- **Tegenstrijdigheid 2 — Kapotte opt-outs op Windows en macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) gaf toe dat de Windows-desktop opgeslagen gebruikersomgevingsvariabelen `T3CODE_TELEMETRY_ENABLED=false` negeerde wanneer die werd gestart vanuit al bestaande processen. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) gaf toe dat relay-tracing bij de eerste start op macOS/Linux werd geïnitialiseerd vóór de shell-detectie, waardoor opt-outs in `~/.zshrc` voor de hele sessie werden genegeerd.
- **Tegenstrijdigheid 3 — Onvoorwaardelijke schrijfacties naar schijf & 264 live Claude-records in `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` bij `ca81b7b9`) roept bij het opstarten nog steeds onvoorwaardelijk `getTelemetryIdentity` aan en schrijft zo de lokale installatie-UUID (`upsertAnonymousId`) weg vóór er wordt gecontroleerd op `telemetryEnabled`. Ondertussen toonde de gzip-header van `@theo`'s publieke export (`6,056,594` bytes gecomprimeerd, `95,789` events) een oorspronkelijke bestandsnaam `events.clean.jsonl`, gegenereerd 20 minuten vóór het posten — en toch bevatte die nog steeds **264 live Claude owner-records** die **4 afzonderlijke machines** (`installId`s) aan één SHA-256-hash koppelden, naast letterlijk overgenomen privé-proxymodellen (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Deels gepatcht:** `PR #42450`, `PR #42376` en `PR #42464` zijn 's nachts gemerged.
- **Nog open:** `AnalyticsService.ts:156` schrijft nog steeds onvoorwaardelijk het lokale anonieme ID weg vóór het controleren van opt-outs, en `DesktopShellEnvironment.ts` laat nog steeds na om `T3CODE_OTEL_SDK_DISABLED` en `OTEL_SDK_DISABLED` door te geven.

<!-- section:visuals -->
## Visueel bewijs

![PR #42450 geeft toe dat door de relay getriggerde runs absolute git.cwd-werkpaden naar Axiom exporteerden](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 geeft toe dat de Windows-desktop opgeslagen T3CODE_TELEMETRY_ENABLED=false-omgevingsvariabelen negeerde](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 geeft toe dat relay-tracing bij de eerste start op macOS opt-outs in ~/.zshrc negeerde](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Forensische audit van events.clean.jsonl waaruit 264 Claude-records blijken die 4 machines en privé-proxymodel-ID's aan elkaar koppelen](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Primaire bronnen

- [Origineel X-onderzoek (deel 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` verduidelijking van 25 nov (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Follow-upreactie (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Publieke gzip-dump](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Diepgaand technisch dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
