# #02 · Suppression factice des fils dans SQLite (gonflement à 41.6 GB) et scan de tous les processus du système toutes les 5 secondes

> Cliquer sur "permanently delete" laissait l'intégralité de l'historique de conversation intact dans `statev2.sqlite` (gonflant les disques locaux jusqu'à 41.6 GB), tandis qu'un moniteur Rust en arrière-plan scannait chaque processus du système et chaque ligne de commande complète toutes les 5 secondes, sans aucun moyen de refuser.

<!-- section:claim -->
## Ce qui a été affirmé

- La boîte de confirmation de suppression dans la barre latérale (`useThreadActionMenu.ts`) indiquait explicitement aux utilisateurs : *"This permanently clears conversation history for this thread."*
- T3 Code était présenté comme un espace de travail local de codage propre et rapide.

<!-- section:evidence -->
## Ce que montrent les preuves

- **Suppression définitive factice (`Issue #17845`, `#28903`) :** à la référence `9d3195b4`, supprimer un fil ne faisait qu'ajouter un événement `"thread.deleted"` à `statev2.sqlite`, tout en laissant les messages antérieurs, les sorties d'outils et les traces de raisonnement intacts sur le disque. Des utilisateurs ont documenté un `statev2.sqlite` gonflant jusqu'à **25.9 GB** en 3 semaines (90 % de fils "supprimés"), **41.6 GB** en 6 semaines et **33 GB** en 7 semaines.
- **Scan de tous les processus et lignes de commande de la machine (`Issue #11222`, `PR #41889`) :** l'utilitaire d'arrière-plan `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) exécutait `ProcessesToUpdate::All` avec `with_cmd(UpdateKind::Always)` toutes les 5 secondes, même diagnostics fermés — retenant 280–300 handles persistants à travers plus de 440 applications et jeux sans rapport sous Windows. Le 24 novembre, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) a confirmé que les diagnostics capturaient les **lignes de commande complètes des processus** (transportant souvent des clés d'API en clair, des mots de passe de base de données et des jetons) dans des snapshots et dans la télémétrie.
- **Fuites de noms d'hôtes d'entreprise et récupération obligatoire au démarrage :** les requêtes de favicon du frontend fuitaient des noms d'hôtes internes (comme `devbox.localdomain`) vers le service de favicons de Google (`PR #16950`, `PR #32657`), tandis qu'au démarrage le serveur récupérait inconditionnellement des manifestes de compatibilité depuis `raw.githubusercontent.com`, sans possibilité de refus (`Issue #36479`).
- **Consommation massive de quotas et bugs de puissance :** piloter Claude via le Agent SDK brûlait les quotas de 5 heures à **1.7x** la vitesse normale (`Issue #7338`, `Issue #24649`, 81 commentaires), tandis que des régressions GPU tiraient jusqu'à **136x** la puissance d'une application Electron comparable — bloquant le GPU d'un MacBook à **60W** (batterie vidée en 78 minutes) et à **18W** après fermeture de l'onglet web (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Partiellement corrigé :** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) a ajouté un `thread-content.purge` asynchrone (fermant `#17845`), et [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) a restreint les lectures du moniteur de processus sous Windows.
- **Toujours ouvert :** les fils sources supprimés conservent leur historique tant qu'ils sont référencés par des forks actifs, un `merge_back` en attente ou des sous-agents actifs ; les lignes tombstone restent dans SQLite et récupérer l'espace disque exige toujours un `VACUUM` hors ligne ; sous Linux et macOS, la découverte via `ProcessesToUpdate::All` subsiste, et `PR #41889` reste ouvert.

<!-- section:visuals -->
## Preuves visuelles

![Issue #17845 documentant des fils supprimés définitivement qui gonflent statev2.sqlite jusqu'à des dizaines de gigaoctets](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 documentant t3-resource-monitor scannant chaque processus du système toutes les 5 secondes](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Sources primaires

- [Enquête originale sur X (partie 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Dossier technique approfondi 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
