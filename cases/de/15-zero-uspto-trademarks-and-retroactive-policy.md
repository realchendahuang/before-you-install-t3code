# #15 · Keine einzige USPTO-Marke hinter der GitHub-Sperrdrohung & 17 Stunden später rückwirkend `TRADEMARK.md`

> Als @theo damit drohte, sich wegen „trademark infringement“ an GitHub zu wenden, um das Konto eines chinesischen Entwicklers sperren zu lassen, hielt T3 Tools Inc. **0** USPTO-Registrierungen für `T3 Code`, `T3 Tools` oder `T3 Connect` — und 17 Stunden später wurde `TRADEMARK.md` rückwirkend per Merge hinzugefügt.

<!-- section:claim -->
## Was behauptet wurde

- Am 23. November warf `@theo` dem Autor des MIT-Forks Markenverletzung vor und drohte mit der Sperrung eines GitHub-Kontos ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- Drei Stunden vor dem Merge von `TRADEMARK.md` sagte er gegenüber fragenden Entwicklern, sie sollten sich *„get a better lawyer“* nehmen ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — obwohl er sich im September 2024 über WordPress wegen eines *„unenforceable trademark dispute“* lustig gemacht hatte ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Was die Belege zeigen

- **Null USPTO-Registrierungen für T3-Marken:** Die direkte Prüfung über USPTO TSDR (auf Hinweis von `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) zeigt **0 Registrierungen** für `T3 Code`, `T3 Tools` oder `T3 Connect`. Der einzige USPTO-Antrag von T3 Tools Inc. (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) wurde im Februar 2025 zurückgewiesen und am 19. Mai 2025 als `ABANDONED` gekennzeichnet. Unbeteiligte Dritte halten indessen aktive `T3`-Registrierungen für Software/SaaS in den Klassen 9 und 42 (`EquipmentShare`, Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`).
- **Vorgabe der GitHub-Richtlinie zu Marken:** Nach der [Trademark Policy von GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) verlangen gewerbliche Marken-Takedown-Anträge eine nationale oder internationale Registrierungsnummer — unter Strafandrohung bei Falschaussage. In dem Moment, in dem `@theo` drohte, das Konto von `@DDdxx666` sperren zu lassen, konnte er das Formular von GitHub nicht ausfüllen.
- **Rückwirkendes `TRADEMARK.md` nach 17 Stunden (`PR #41898`):** Am **24. November um 12:21 CST** — 17 Stunden nach der Sperrdrohung — hat `@theo` [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) gemergt und damit `TRADEMARK.md` eingefügt, das Rechte *„whether registered or unregistered“* beansprucht; 94 Sekunden später zitierte er es auf X ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Öffentlicher Stand:** Das rückwirkende `TRADEMARK.md` ist weiterhin auf `main`; die TSDR-Datensätze der USPTO zeigen nach wie vor 0 Registrierungen von T3 Tools Inc. für `T3 Code`.

<!-- section:visuals -->
## Bildbelege

![PR #41898 wurde 17 Stunden nach der Sperrdrohung gemergt und fügte TRADEMARK.md rückwirkend hinzu](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md beansprucht Exklusivrechte „whether registered or unregistered“](../../evidence/extra/p1-2b-trademark-md.png)

![Theo rät Entwicklern drei Stunden vor dem Merge von TRADEMARK.md: „get a better lawyer“](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Rückwirkende Zitation 94 s später (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · [„Get a better lawyer“ (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Spott über WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Technisches Dossier 05 (Deep Technical Dossier 05)](../../docs/dossiers/05-governance-trademark-and-history.md)
