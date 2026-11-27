# #12 · Zes uur durende nachtelijke blitz na de GDPR: 2,2 miljoen IP-logs per uur & kapotte accountverwijdering

> Nadat op 24 november een formele EU-GDPR-klacht was ingediend, brachten zes uur aan noodpatches midden in de nacht onbedoeld vier diepere privacydisclosures aan het licht — met als koploper 2,2 miljoen per uur aan met IP gelabelde Axiom-spans die 30 dagen werden bewaard.

<!-- section:claim -->
## Wat er werd beweerd

- Zelfs 3,5 uur nadat `PR #42380` was gemerged, antwoordde `@theo` publiekelijk dat de IP-adressen van aanroepers al waren verwijderd.
- De officiële documentatie (`docs/user/telemetry.md`) beloofde dat `agent.feedback`-rapporten anoniem waren en dat accountverwijdering gebruikersgegevens netjes verwijderde.

<!-- section:evidence -->
## Wat het bewijs laat zien

- **2,2 miljoen per uur aan relay-spans met IP + User-Agent (`PR #42380`):** Elke relay request-span die naar Axiom werd geëxporteerd — ongeveer **2,2 miljoen spans per uur, 30 dagen bewaard** — legde `client.address` vast (het echte IP-adres van de aanroeper uit `cf-connecting-ip`) en `user_agent.original` direct naast `user.id` (terwijl de 1% Workers-logs van Cloudflare apart bleven).
- **Kapotte Clerk-accountverwijdering (`PR #42285` & `PR #42430`):** Het verwijderen van een gebruikersaccount in Clerk liet voorheen PlanetScale-relayrijen en actieve Cloudflare-tunnels op de achtergrond draaien — totdat een daadwerkelijk privacyverzoek tot verwijdering van een gebruiker ingenieurs dwong om **handgeschreven SQL en handmatige tunnel-teardown** uit te voeren.
- **Lekken van mobiele push-tokens en user-ID's (`PR #42459` & `PR #41859`):** Android FCM-pushpayloads stuurden bij elke notificatie plaintext Clerk `user_id`-waarden naar Google; iOS APNs-spans en errorlogs legden volledige push-URL's van apparaten vast, inclusief push-tokens.
- **Gemengde "anonieme" feedbackbatches (`PR #42466`):** Zogenaamd anonieme `agent.feedback`-events werden gebundeld in exact dezelfde HTTP POST als geïdentificeerde `installId`-events en volledige host-vingerafdrukken (OS, architectuur, raw WSL-distro), wat `docs/user/telemetry.md` direct tegenspreekt.

<!-- section:status -->
## Upstream-status (`ca81b7b9`)

- **Gedeeltelijk gepatcht:** De nood-PR's `#42380`, `#42285`, `#42430`, `#42459`, `#41859` en `#42466` werden tijdens de nachtelijke GDPR-sprint gemerged.
- **Nog open:** `privacy-policy.astro` bleef ongewijzigd sinds `2026-10-06`, het closed-source `ingest.t3.codes` bewaart ruwe kopieën van events zonder onafhankelijke controleerbaarheid, en eerdere bewaartermijnen van 30 dagen in Axiom zijn nooit formeel aan getroffen gebruikers bekendgemaakt.

<!-- section:visuals -->
## Visueel bewijs

![PR #42380 onthult dat ~2,2 miljoen relay-spans per uur het echte IP-adres en de User-Agent van de aanroeper 30 dagen lang naast user.id in Axiom vastlegden](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 geeft toe dat accountverwijdering voorheen PlanetScale-rijen en actieve Cloudflare-tunnels achterliet](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 geeft toe dat Android FCM-pushes ruwe Clerk user_id-waarden naar Google stuurden](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 geeft toe dat anonieme feedback werd gebundeld met installId en host-vingerafdrukken](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Diepgaand technisch dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
