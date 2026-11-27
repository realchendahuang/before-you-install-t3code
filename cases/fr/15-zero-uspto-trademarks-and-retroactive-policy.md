# #15 · Aucune marque déposée à l'USPTO derrière la menace de bannissement GitHub, et un `TRADEMARK.md` rétroactif en 17 heures

> Quand @theo a menacé de contacter GitHub pour faire supprimer le compte d'un développeur chinois pour "trademark infringement", T3 Tools Inc. ne détenait aucun enregistrement à l'USPTO pour `T3 Code`, `T3 Tools` ou `T3 Connect` — et a fusionné `TRADEMARK.md` de façon rétroactive 17 heures plus tard.

<!-- section:claim -->
## Ce qui a été affirmé

- Le 23 novembre, `@theo` a accusé l'auteur du fork MIT de contrefaçon de marque et menacé de faire supprimer un compte GitHub ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- Trois heures avant de fusionner `TRADEMARK.md`, il a lancé aux développeurs qui l'interrogeaient : *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — alors même qu'il s'était moqué de WordPress en septembre 2024 à propos d'un *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Ce que montrent les preuves

- **Zéro enregistrement à l'USPTO pour les marques T3 :** une vérification directe dans le TSDR de l'USPTO (sur une piste fournie par `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) montre **0 enregistrement** pour `T3 Code`, `T3 Tools` ou `T3 Connect`. La seule demande déposée par T3 Tools Inc. auprès de l'USPTO (`PING LABS`, numéro de série [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) a été refusée en février 2025 et marquée `ABANDONED` le 19 mai 2025. De leur côté, des tiers sans lien avec l'affaire détiennent des enregistrements actifs de logiciels/SaaS `T3` dans les classes 9 et 42 (`EquipmentShare`, Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) ; `ESG Operations`, Reg. `3324707`).
- **Exigence de la politique de marques de GitHub :** selon la [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), les demandes commerciales de retrait pour marque exigent un numéro d'enregistrement fédéral ou international, sous peine de parjure. Au moment où `@theo` a menacé de faire supprimer le compte de `@DDdxx666`, il ne pouvait pas remplir le formulaire de GitHub.
- **`TRADEMARK.md` rétroactif en 17 heures (`PR #41898`) :** le **24 novembre à 12h21 CST** — 17 heures après la menace de bannissement — `@theo` a fusionné [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898), qui insérait `TRADEMARK.md` en revendiquant des droits *"whether registered or unregistered"*, et l'a cité sur X 94 secondes plus tard ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Registre public :** le `TRADEMARK.md` rétroactif reste sur `main` ; les dossiers TSDR de l'USPTO continuent d'afficher 0 enregistrement de T3 Tools Inc. pour `T3 Code`.

<!-- section:visuals -->
## Preuves visuelles

![PR #41898 fusionnée 17 heures après la menace de bannissement, ajoutant rétroactivement TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md revendiquant des droits exclusifs "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo lançant aux développeurs "get a better lawyer" trois heures avant de fusionner TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Sources primaires

- [Enquête X originale (partie 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Citation rétroactive 94 s plus tard (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Moquerie envers WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Deep Technical Dossier 05](../../docs/dossiers/05-governance-trademark-and-history.md)
