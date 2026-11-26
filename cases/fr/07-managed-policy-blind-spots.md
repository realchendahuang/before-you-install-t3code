# #07 · La contradiction du dispositif Managed Policy : quatre angles morts documentés de la télémétrie

> @theo affirmait que T3 Code disposait du "best corporate managed policy system", ce qui rendait "trivial to turn off all telemetry" — une affirmation directement contredite par les propres fichiers `docs/user/telemetry.md` et `docs/user/managed-policy.md` de T3 Code.

<!-- section:claim -->
## Ce qui a été affirmé

- Le 24 novembre à 19:13 CST, `@theo` a balayé l’absence de boutons de désactivation côté utilisateur : *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Une demi-heure plus tard, il a ajouté que les données de conversation *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Ce que démontrent les éléments de preuve

La documentation officielle de T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) et [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) recense quatre angles morts concrets :

- **Déploiement réservé aux administrateurs (aucun bouton dans l’interface personnelle) :** Les utilisateurs de la version bureau n’ont aucun bouton de réglage. Managed Policy exige MDM/GPO ou des chemins système protégés par un administrateur (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, ou `/etc/t3code/policy.json`), totalement inaccessibles aux utilisateurs de bureau non administrateurs.
- **L’application Web hébergée (`app.t3.codes`) ignore Managed Policy :** L’application navigateur ignore les variables d’environnement du serveur et Managed Policy, émet des traces de connexion lorsqu’elle est compilée avec le traçage, et *"has no relay tracing toggle."*
- **Les applications mobiles échappent à la politique serveur :** La documentation officielle confirme que les variables d’environnement du serveur et Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` ignore les désactivations :** Cette fonction transmet les titres de projets, les titres de fils, les noms de modèles et l’état en direct à T3 Connect — et la documentation indique explicitement : *"The telemetry opt-out does not disable it."* En outre, les spans Axiom et les journaux de plantage en échec *"can quote a value the app was handling"*, et `Agent feedback` peut joindre jusqu’à 16 Ko de messages de conversation.

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Toujours en suspens :** Pendant la nuit, [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) a ajouté un bouton de traçage mobile dans l’application, mais Managed Policy ne peut toujours pas désactiver le traçage mobile, l’application hébergée `app.t3.codes` n’a toujours aucun bouton de désactivation, `Publish agent activity` ignore toujours les désactivations de la télémétrie, et aucun bouton n’existe dans l’interface Réglages de la version bureau.

<!-- section:visuals -->
## Preuves visuelles

![La documentation officielle docs/user/telemetry.md confirme que app.t3.codes n’a aucun bouton, que le mobile ignore Managed Policy et que l’activité des agents ignore les désactivations](../../evidence/05-telemetry-cant-disable.png)

![La documentation officielle docs/user/managed-policy.md énumère les chemins système protégés par administrateur sous macOS, Windows et Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Publication de Theo du 24 novembre affirmant que Managed Policy rend triviale la désactivation de toute la télémétrie](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Sources primaires

- [Enquête originale sur X (partie 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` affirmation sur Managed Policy (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Dossier technique approfondi 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
