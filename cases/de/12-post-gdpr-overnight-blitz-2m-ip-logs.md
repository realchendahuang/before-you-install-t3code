# #12 · Sechs-Stunden-Blitz über Nacht nach der DSGVO-Beschwerde: 2,2 Mio. IP-Logs pro Stunde & kaputte Kontolöschung

> Nachdem am 24. November eine förmliche EU-DSGVO-Beschwerde eingereicht worden war, brachten sechs Stunden nächtlicher Notfall-Patches unbeabsichtigt vier tieferliegende Datenschutz-Offenlegungen ans Licht — angeführt von 2,2 Millionen pro Stunde mit IP-Adressen versehenen Axiom-Spans, die 30 Tage lang aufbewahrt werden.

<!-- section:claim -->
## Was behauptet wurde

- Selbst 3,5 Stunden nach dem Merge von `PR #42380` antwortete `@theo` öffentlich, die IP-Adressen der Aufrufer seien bereits entfernt worden.
- Die offizielle Dokumentation (`docs/user/telemetry.md`) versprach, `agent.feedback`-Berichte seien anonym, und die Kontolöschung entferne Nutzerdaten restlos.

<!-- section:evidence -->
## Was die Belege zeigen

- **2,2 Millionen Relay-Spans pro Stunde mit IP + User-Agent (`PR #42380`):** Jeder an Axiom exportierte Relay-Request-Span — rund **2,2 Millionen Spans pro Stunde, 30 Tage lang aufbewahrt** — erfasste `client.address` (echte IP-Adresse des Aufrufers aus `cf-connecting-ip`) und `user_agent.original` direkt neben `user.id` (wobei Cloudflares 1-%-Workers-Logs separat blieben).
- **Defekte Clerk-Kontolöschung (`PR #42285` & `PR #42430`):** Das Löschen eines Nutzerkontos in Clerk ließ zuvor PlanetScale-Relay-Zeilen und aktive Cloudflare-Tunnel im Hintergrund weiterlaufen — bis eine tatsächliche Löschanfrage eines Nutzers die Entwickler zwang, **handgeschriebenes SQL und einen manuellen Tunnel-Abbau** auszuführen.
- **Leaks von Mobile-Push-Tokens und User-IDs (`PR #42459` & `PR #41859`):** Android-FCM-Push-Payloads übertrugen bei jeder Benachrichtigung Klartext-`user_id`-Werte von Clerk an Google; iOS-APNs-Spans und Fehlerprotokolle erfassten vollständige Geräte-Push-URLs, die Push-Tokens enthielten.
- **Gemischt gebündelte „anonyme" Feedback-Batches (`PR #42466`):** Angeblich anonyme `agent.feedback`-Ereignisse wurden im exakt selben HTTP-POST zusammen mit identifizierten `installId`-Ereignissen und vollständigen Host-Fingerabdrücken (OS, Architektur, rohe WSL-Distribution) gebündelt — in direktem Widerspruch zu `docs/user/telemetry.md`.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Teilweise gepatcht:** Die Notfall-PRs `#42380`, `#42285`, `#42430`, `#42459`, `#41859` und `#42466` wurden während des nächtlichen DSGVO-Sprints gemergt.
- **Noch offen:** `privacy-policy.astro` blieb seit `2026-10-06` unverändert, das quellgeschlossene `ingest.t3.codes` behält Rohkopien der Ereignisse ohne unabhängige Prüfbarkeit, und die früheren 30-tägigen Axiom-Aufbewahrungsfristen wurden den betroffenen Nutzern nie förmlich offengelegt.

<!-- section:visuals -->
## Bildbelege

![PR #42380 zeigt, dass rund 2,2 Mio. Relay-Spans pro Stunde echte IP-Adresse des Aufrufers und User-Agent neben user.id 30 Tage lang in Axiom protokollierten](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 räumt ein, dass die Kontolöschung zuvor PlanetScale-Zeilen und aktive Cloudflare-Tunnel zurückließ](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 räumt ein, dass Android-FCM-Pushes rohe Clerk-user_id-Werte an Google sendeten](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 räumt ein, dass anonymes Feedback zusammen mit installId und Host-Fingerabdrücken gebündelt wurde](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Primärquellen

- [Original-X-Recherche (Teil 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
