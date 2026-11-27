# #09 · `yolo merges` internes vs. hostilité envers la communauté externe et bannissements via `.github/VOUCHED.td`

> En interne, T3 Code livrait 500 commits/jour via des boucles d'agents automatisées et admettait « yolo merges breaking shit » — tandis qu'en externe, il expliquait aux contributeurs « here's my advice: Don't », dénonçait des utilisateurs via `.github/VOUCHED.td` et insultait les personnes qui ouvraient des issues.

<!-- section:claim -->
## Ce qui a été affirmé

- T3 Code se présente comme un projet open source en mouvement rapide et ouvert à sa communauté, bâti par des ingénieurs pour des ingénieurs.

<!-- section:evidence -->
## Ce que montrent les preuves

- **Vélocité de merge interne imprudente :** `@theo` a décrit publiquement livrer **500 commits/jour** ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), faire tourner **700 agents en parallèle**, merger en lot les PR de la communauté via une boucle d'agents automatisée, en admettant *« my yolo merges breaking shit sometimes »* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)), et en plaisantant que risquer un effacement de machine équivalait à du *« free content »* ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **Gouvernance hostile et bannissements par dénonciation publique :** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) s'ouvrait sur *« here's my advice: Don't »*, adossé à des auto-bannissements par dénonciation via [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) et à **174 labels `unwanted`** sur des PR communautaires rejetées.
- **Suppressions de fonctionnalités unilatérales et insultes envers les utilisateurs :** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) a enterré le basculement Build/Plan (*« Reality check for those upset »*, 10 votes négatifs), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) a masqué l'anneau d'utilisation du contexte (16 votes négatifs, un record dans le dépôt), et [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) a supprimé le mode Plan purement et simplement, avec un résumé généré par IA qui se contredit. Dans [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545), `@theo` a dit à l'utilisateur `@bermudi` de *« uninstall our software »* et l'a traité d'*« ungrateful prick »* — avant de rejeter sa [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) le lendemain matin.
- **Filtrage par abonnement sur X :** des contributeurs ont été réprimandés pour ne pas suivre `@theo` ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), menacés de la suppression de `/btw` ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)), et on leur a expliqué qu'une capture d'écran annotée valait mieux que soumettre une PR ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Statut en amont (`ca81b7b9`)

- **Toujours en ligne :** `CONTRIBUTING.md` et `.github/VOUCHED.td` restent en ligne sur `main` au commit `ca81b7b9`.

<!-- section:visuals -->
## Preuves visuelles

![CONTRIBUTING.md dissuadant les PR externes et documentant les bannissements par dénonciation publique dans .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Réponse de Theo dans l'issue #33639 disant à un utilisateur de désinstaller le logiciel et le traitant d'« ungrateful prick »](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo admettant « my yolo merges breaking shit sometimes »](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Sources primaires

- [Enquête originale sur X (partie 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Commentaire de l'issue #33639](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [500 commits/jour (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Effacement de machine = free content (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Dossier technique approfondi 05](../../docs/dossiers/05-governance-trademark-and-history.md)
