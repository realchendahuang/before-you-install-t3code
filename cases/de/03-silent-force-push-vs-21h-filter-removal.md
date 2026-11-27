# #03 · 52 Tage stilles `git push --force` gegen 21 Stunden für die Entfernung des Modell-Datenschutzfilters

> Über 52 Tage ließ T3 Code einen Bug offen, bei dem der Claude-Auto-Modus `git push --force origin main` stillschweigend genehmigte, ohne nachzufragen — für die Entfernung einer Datenschutz-Whitelist, die private Modelle auf @theos öffentlichem Leaderboard sichtbar machte, brauchte es dagegen nur 21 Stunden.

<!-- section:claim -->
## Was behauptet wurde

- Der Claude-Auto-Modus ist dafür ausgelegt, hochriskante destruktive Aktionen (etwa einen Force-Push auf `main`) zur ausdrücklichen menschlichen Freigabe hochzustufen.
- Telemetrie wurde als datenschutzsichere aggregierte Metriken dargestellt.

<!-- section:evidence -->
## Was die Belege zeigen

- **Seit über 52 Tagen ungefixt — stilles `git push --force` (`Issue #15353`):** In `ClaudeAdapterV2.ts` leitete der Auto-Modus `!requiresClaudeApproval(context)` kurzgeschlossen direkt auf `"allow"`. Als Claudes eigener Sicherheitsklassifikator `git push --force origin main` zweimal blockierte und den dritten Versuch zur menschlichen Bestätigung hochstufte, genehmigte T3 Code ihn stillschweigend ohne jeden UI-Dialog und protokollierte `"source": "user_temporary"`. Zwei Community-Fix-PRs (`#15360`, `#35207`) blieben ungeprüft, bis ein Bot sie automatisch schloss; `#40692` blieb ungemergt.
- **21 Stunden, um eine Datenschutz-Whitelist zu entfernen (`Issue #40948` → `PR #41237`):** Am 22. November vermerkte [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948), dass neuere Modelle auf @theos öffentlichem Leaderboard [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) fehlten, weil `PR #29001` eine Modell-Whitelist erzwungen hatte. Innerhalb von **21 Stunden** wurde [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) unter @theos Account gemergt, mit dem Vermerk, Theo habe die Entfernung des Filters ausdrücklich verlangt — wodurch private lokale und Enterprise-Namen wie `ollama/acme-internal` und `acme-azure-deployment` wörtlich an die Analytics übertragen wurden.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Teilweise geändert / zentraler Sicherheitsbug weiterhin offen:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) maskierte später Nicht-Katalog-Modelle als `custom:<driver>` (Katalog- und Vendor-Slugs werden hinter Custom-Endpunkten weiterhin gemeldet). **Issue #15353 (stilles `git push --force` im Auto-Modus) ist bei `ca81b7b9` weiterhin offen und ungefixt.**

<!-- section:visuals -->
## Visuelle Belege

![Issue #15353 seit über 52 Tagen offen — Claude-Auto-Modus genehmigt stillschweigend git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237, 21 Stunden nach Issue #40948 gemergt — Entfernung des Modell-Datenschutzfilters für slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Primärquellen

- [Original-X-Recherche (Teil 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Reproduktionskommentar `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Nicht gemergte Community-Fixes: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
