# #03 · 52 jours de silence sur un `git push --force` contre 21 heures pour retirer le filtre de confidentialité des modèles

> Pendant plus de 52 jours, T3 Code a laissé ouvert un bug dans lequel le mode Auto de Claude approuvait silencieusement `git push --force origin main` sans demander de confirmation — alors qu'il n'a fallu que 21 heures pour retirer une liste blanche de confidentialité, afin que des modèles privés apparaissent sur le classement public de @theo.

<!-- section:claim -->
## Ce qui a été affirmé

- Le mode Auto de Claude est conçu pour escalader les actions destructrices à haut risque (comme un force-push sur `main`) vers une approbation humaine explicite.
- La télémétrie était présentée comme des métriques agrégées respectueuses de la vie privée.

<!-- section:evidence -->
## Ce que montrent les preuves

- **Plus de 52 jours sans correction — `git push --force` silencieux (`Issue #15353`) :** Dans `ClaudeAdapterV2.ts`, le mode Auto court-circuitait `!requiresClaudeApproval(context)` directement vers `"allow"`. Lorsque le classificateur de sécurité de Claude a bloqué deux fois `git push --force origin main` et escaladé la troisième tentative pour une confirmation humaine, T3 Code l'a approuvée silencieusement, sans la moindre invite dans l'interface, et a consigné `"source": "user_temporary"`. Deux PR de correction communautaires (`#15360`, `#35207`) sont restées sans relecture jusqu'à leur fermeture automatique par un bot ; `#40692` est restée non fusionnée.
- **21 heures pour supprimer une liste blanche de confidentialité (`Issue #40948` → `PR #41237`) :** Le 22 novembre, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) signalait que les modèles plus récents manquaient au classement public de `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)), parce que `PR #29001` imposait une liste blanche de modèles. En **21 heures**, [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) a été fusionnée sous le compte de `@theo`, avec la mention que Theo avait explicitement demandé la suppression du filtre — ce qui a conduit à transmettre tels quels des noms privés, locaux ou d'entreprise, comme `ollama/acme-internal` et `acme-azure-deployment`, à l'outil d'analytics.

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Partiellement modifié / bug de sécurité central toujours ouvert :** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) a ensuite masqué les modèles hors catalogue en `custom:<driver>` (les slugs de catalogue et de fournisseur sont toujours signalés derrière des points de terminaison personnalisés). **L'Issue #15353 (le `git push --force` silencieux en mode Auto) reste ouverte et non corrigée à `ca81b7b9`.**

<!-- section:visuals -->
## Preuves visuelles

![Issue #15353 ouverte depuis plus de 52 jours, montrant le mode Auto de Claude approuvant silencieusement un git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 fusionnée 21 heures après l'Issue #40948, supprimant le filtre de confidentialité des modèles pour slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Sources primaires

- [Enquête X d'origine (partie 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Commentaire de reproduction `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Corrections communautaires non fusionnées : PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Dossier technique approfondi 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
