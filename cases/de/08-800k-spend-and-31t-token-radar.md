# #08 · Die Geschäftsbücher über 800.000 $+ und das tägliche Compute-Radar von 31,7 Billionen Tokens

> Die standardmäßig aktive Telemetrie war kein Versehen der Entwickler: Sie finanzierte ein Echtzeit-Aufklärungsradar über 31,7 Billionen Tokens pro Tag (API-Ausgaben im Gegenwert von 10,19 Mio. $ pro Tag), das gegen über 300.000 $ an kostenlosen OpenAI-Frühzugangs-Tokens und Investorenkontakte eingetauscht wurde.

<!-- section:claim -->
## Was behauptet wurde

- T3 Code wurde als kostenloses Open-Source-Werkzeug unter MIT-Lizenz aus reiner Leidenschaft dargestellt, und die Telemetrie wurde lediglich als einfache Zählung verteidigt, um *"know how many users we have."* zu erfahren.
- `@theo` behauptete außerdem, DeepMinds `@PatrickToulme` habe *"many PRs"* in T3 Code eingebracht.

<!-- section:evidence -->
## Was die Belege zeigen

- **Ausgaben von über 800.000 $ und die vollständige Abkehr von bezahlten Produkten:** Über alle **1.151 aufeinanderfolgenden X-Posts** vom 7. bis 24. November nannte `@theo` T3 Code **162 Mal (14,1 %)** gegenüber **0 Erwähnungen** seiner früheren bezahlten Produkte (`T3 Chat`, `UploadThing`, `ping.gg`) und bestätigte zugleich öffentlich **über 800.000 $** an Eigenmitteln für den kostenlosen Client ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)).
- **Analytik-Radar über 31,7 Billionen Tokens pro Tag (10,19 Mio. $/Tag):** Rohdaten, die über das nicht quelloffene `ingest.t3.codes` gespeichert wurden, speisten ein internes Dashboard, das **31,7 Billionen Tokens pro Tag** (**API-Ausgaben im Gegenwert von 10,19 Millionen $ pro Tag** am 18. November, mit Spitzen nahe **10,2 Mio. $/Tag**) und fein granulare Aufteilungen der Anteile der Labore verfolgte (`99%` abonnementgestützt, `~98.5%` über Codex/Claude/Antigravity, Open-Weight-Anteil von `15%` auf `6%` fallend). Als ein Kommentator am 23. November über Marktanteile spekulierte, verspottete `@theo` ihn dafür, keinen Zugang zu seiner Analytik zu haben ([`2124682906132181482`](https://x.com/theo/status/2124682906132181482)).
- **Umwandlung von Nutzer-Telemetrie in Labor-Vergünstigungen und VC-Hebel:** `@theo` erklärte öffentlich, **über 300.000 $ an unbegrenzt kostenlosen OpenAI-Frühzugangs-Tokens** für einen GPT-6.2-Astra-Benchmark verbrannt zu haben ([`2122760447103484410`](https://x.com/theo/status/2122760447103484410)), führte Google-Bare-Metal-Benchmarks durch und bekam Investorenanfragen herein (*"multiple investors have asked me about this"*, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).
- **Übertriebene Zusammenarbeit mit Laboren:** Eine nach `patrick-toulme` gefilterte Git-Commit-Historie zeigt exakt **1 Commit** ([`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158)), nicht *"many PRs."*

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Öffentlich dokumentiertes / aktives Geschäftsmodell:** `ingest.t3.codes` ist bei `ca81b7b9` weiterhin nicht quelloffen und standardmäßig aktiviert und speist nach wie vor dieselbe eigene Analytik-Pipeline.

<!-- section:visuals -->
## Visuelle Belege

![Theos internes T3-Code-Dashboard, das 31,7 Billionen Tokens und API-Ausgaben im Gegenwert von 10,19 Mio. $ pro Tag zeigt](../../evidence/17-theo-31t-tokens-10m-day.png)

![Theo, der Ausgaben von über 800.000 $ für T3 Code offenlegt](../../evidence/extra/p6-1-x-theo-800k-cost.png)

![Git-Commit-Log, das nur 1 Commit (#31158) von patrick-toulme zeigt statt "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 8)](https://x.com/realchendahuang/status/2125392410763239723)
- [Ausgaben von über 800.000 $ (`2120729779511124267`)](https://x.com/theo/status/2120729779511124267) · [Dashboard 31,7 Billionen / 10,19 Mio. $ (`2122860770329608290`)](https://x.com/theo/status/2122860770329608290) · [Aufteilung der Laboranteile (`2123965784888377541`)](https://x.com/theo/status/2123965784888377541)
- [Spott über die Analytik (`2124682906132181482`)](https://x.com/theo/status/2124682906132181482) · [OpenAI-Tokens im Wert von über 300.000 $ (`2122760447103484410`)](https://x.com/theo/status/2122760447103484410) · [Investorenanfragen (`2123885732330885417`)](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [Technisches Tiefen-Dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
