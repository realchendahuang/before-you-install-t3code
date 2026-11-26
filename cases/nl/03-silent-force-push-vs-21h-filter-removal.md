# #03 · 52 dagen stilzwijgende `git push --force` tegenover 21 uur voor het verwijderen van het privacyfilter voor modellen

> Meer dan 52 dagen liet T3 Code een bug openstaan waarbij Claude Auto mode stilzwijgend `git push --force origin main` goedkeurde zonder om bevestiging te vragen — en toch had het maar 21 uur nodig om een privacystoplijst te verwijderen, zodat privémodellen op de openbare leaderboard van @theo verschenen.

<!-- section:claim -->
## Wat er werd beweerd

- Claude Auto mode is ontworpen om zeer risicovolle destructieve acties (zoals het force-pushen van `main`) ter expliciete menselijke goedkeuring te escaleren.
- Telemetrie werd voorgesteld als privacyveilige, geaggregeerde statistieken.

<!-- section:evidence -->
## Wat het bewijs laat zien

- **52+ dagen onopgelost — stilzwijgende `git push --force` (`Issue #15353`):** In `ClaudeAdapterV2.ts` sloeg Auto mode `!requiresClaudeApproval(context)` kort door naar `"allow"`. Toen Claude's eigen veiligheidsclassificator `git push --force origin main` twee keer blokkeerde en de derde poging escaleerde voor menselijke bevestiging, keurde T3 Code het stilzwijgend goed zonder enige UI-prompt en logde `"source": "user_temporary"`. Twee community-fix-PR's (`#15360`, `#35207`) bleven onbeoordeeld tot een bot ze automatisch sloot; `#40692` bleef ongemerged.
- **21 uur om een privacystoplijst te schrappen (`Issue #40948` → `PR #41237`):** Op 22 november merkte [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) op dat nieuwere modellen ontbraken op de openbare leaderboard van `@theo`, [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)), omdat `PR #29001` een modellenstoplijst afdwong. Binnen **21 uur** werd [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) gemerged onder het account van `@theo`, met de vermelding dat Theo expliciet had gevraagd het filter te verwijderen — waardoor private lokale/enterprise-namen zoals `ollama/acme-internal` en `acme-azure-deployment` letterlijk werden doorgegeven aan de analytics.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Gedeeltelijk gewijzigd / kernveiligheidsbug nog open:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) maskeerde later niet-catalogusmodellen als `custom:<driver>` (catalogus-/vendor-slugs worden nog steeds gerapporteerd achter custom endpoints). **Issue #15353 (stilzwijgende `git push --force` in Auto mode) blijft open en onopgelost op `ca81b7b9`.**

<!-- section:visuals -->
## Visueel bewijs

![Issue #15353 staat al 52+ dagen open en toont dat Claude Auto mode stilzwijgend git push --force goedkeurt](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 gemerged 21 uur na Issue #40948, waarmee het privacyfilter voor modellen voor slopalytics.com werd verwijderd](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Reproductiecommentaar `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Ongemergede communityfixes: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Diepgaand technisch dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
