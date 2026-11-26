# #07 · De managed-policy-tegenspraak: vier gedocumenteerde blinde vlekken in telemetrie

> @theo beweerde dat T3 Code het "best corporate managed policy system" had, waardoor het "trivial to turn off all telemetry" zou zijn — rechtstreeks weersproken door T3 Code's eigen `docs/user/telemetry.md` en `docs/user/managed-policy.md`.

<!-- section:claim -->
## Wat er werd beweerd

- Op 24 november om 19:13 CST wuifde `@theo` het ontbreken van opt-out-toggles voor gebruikers weg: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Een half uur later voegde hij toe dat gespreksgegevens *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Wat het bewijs laat zien

De eigen officiële documentatie van T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) en [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) documenteert vier concrete blinde vlekken:

- **Implementatie alleen voor beheerders (geen persoonlijke UI-schakelaar):** Bureaubladgebruikers hebben geen Settings-toggle. Managed Policy vereist MDM/GPO of door de beheerder beschermde OS-paden (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, of `/etc/t3code/policy.json`), volledig ontoegankelijk voor niet-beheerders op de desktop.
- **Gehoste webapp (`app.t3.codes`) negeert policy:** De browserapp negeert server-omgevingsvariabelen en Managed Policy, zendt connection traces uit wanneer hij met tracing is gebouwd, en *"has no relay tracing toggle."*
- **Mobiele apps vallen buiten het serverbeleid:** Officiële documentatie bevestigt dat server-env-variabelen en Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` negeert opt-outs:** Uploadt projecttitels, threadtitels, modelnamen en live status naar T3 Connect — en de documentatie stelt expliciet: *"The telemetry opt-out does not disable it."* Daarnaast kunnen mislukte Axiom-spans/crashlogs *"can quote a value the app was handling"*, en `Agent feedback` kan tot 16 KB aan gespreksberichten bijvoegen.

<!-- section:status -->
## Upstream-status (`ca81b7b9`)

- **Nog open:** In de nacht voegde [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) een in-app toggle voor mobiele tracing toe, maar Managed Policy kan mobiele tracing nog steeds niet uitschakelen, de gehoste `app.t3.codes` heeft nog steeds geen enkele opt-out-toggle, `Publish agent activity` negeert nog steeds telemetrie-opt-outs, en er bestaat geen Settings-UI-toggle op de desktop.

<!-- section:visuals -->
## Visueel bewijs

![Officiële docs/user/telemetry.md die bevestigt dat app.t3.codes geen toggle heeft, mobiel Managed Policy negeert en agent-activiteit opt-outs negeert](../../evidence/05-telemetry-cant-disable.png)

![Officiële docs/user/managed-policy.md met een lijst van door beheerders beschermde systeempaden op macOS, Windows en Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo's bericht van 24 november waarin hij beweert dat Managed Policy het uitschakelen van alle telemetrie triviaal maakt](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Primaire bronnen

- [Origineel X-onderzoek (deel 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` Managed Policy-claim (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Diepgaand technisch dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
