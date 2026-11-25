# Avant d'installer T3 Code

<p align="center">
  <strong>Langues officielles des Nations unies :</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md"><strong>Français</strong></a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>

![Avant d'installer T3 Code — Bannière de l'audit indépendant en 18 volets](../../evidence/00-cover-en.png)

> **Périmètre et politique de vérification**  
> Ce dépôt présente un audit indépendant de `pingdotgg/t3code` (T3 Code) portant sur la sécurité, la télémétrie et les archives publiques. Il rassemble 18 volets documentés publiés les 24 et 25 novembre 2026, accompagnés de **plus de 150 liens vers des sources primaires** (commits GitHub, pull requests, issues, documentation du dépôt, registres de marques USPTO TSDR et publications publiques). Aucune coordonnée privée n'est incluse. Les mises à jour factuelles, correctifs fusionnés ultérieurement ou traductions supplémentaires sont les bienvenus par Pull Request, sources primaires à l'appui.

### Synthèse des faits documentés

- **Télémétrie et vie privée (Volets 1, 7, 11, 12) :** Activation par défaut de PostHog alors que la page d'accueil promettait `No telemetry / Unless you opt in. Full stop.` ; copies brutes envoyées vers la passerelle propriétaire `ingest.t3.codes` ; hachage SHA-256 non salé de `~/.codex/auth.json` et `~/.claude.json` ; 4 PR d'opt-out rejetées ; correctifs nocturnes post-RGPD révélant **2,2 millions de spans par heure** journalisés avec adresse IP dans Axiom pendant 30 jours, fuite de chemins absolus (`git.cwd`), variables d'opt-out ignorées sous Windows/macOS et suppression de compte incomplète.
- **Sécurité locale, risque de bannissement et transport (Volets 2, 3, 4, 5, 13) :** La « suppression définitive » dans la barre latérale laisse les lignes intactes dans `statev2.sqlite` (gonflement de 25 à 41 Go) ; balayage complet des processus machine toutes les 5 secondes en arrière-plan ; `git push --force` silencieux pendant plus de 52 jours en mode Claude Auto ; **0 avis de sécurité GitHub publié** malgré des correctifs discrets pour des aperçus sans bac à sable et l'exécution sans confirmation de commandes issues de dépôts ; falsification d'en-têtes Google Antigravity et injection d'un faux `SSH_CONNECTION` provoquant des bannissements en 3 minutes et un mélange de comptes ; **aucun chiffrement de bout en bout** sur les tunnels distants T3 Connect.
- **Modèle économique et 77 000 étoiles (Volets 6, 8, 17, 18) :** Plus de 800 000 USD investis dans un client MIT gratuit pour bâtir un radar de parts de marché atteignant 31 700 milliards de tokens/jour (10,19 M USD d'équivalent API) ; conflits d'intérêts d'investisseur providentiel (Vibe Kanban, Daytona) ; pile de sponsors (Clerk, Axiom) ; guide d'agrégation multi-comptes CLIProxyAPI accompagné d'avertissements sur le risque de bannissement ; notification après 30 secondes d'inactivité déclenchant une étoile API via les identifiants du serveur hôte (`PUT user/starred/...`) sans verrouiller le dépôt dans `driver.ts`, propulsant le compteur de 30 000 à 77 000 étoiles (pour 129 watchers) en 25 jours.
- **Gouvernance, marques et historique public (Volets 9, 10, 14, 15, 16) :** 500 commits/jour fusionnés à l'aveugle (« yolo merges ») contre découragement des PR externes et bannissements avec mise au pilori dans `.github/VOUCHED.td` ; utilisation publique d'un `@bot` pour aspirer les forks ; menaces de clôture de compte GitHub alors que l'USPTO ne compte **0 marque déposée** pour `T3 Code` (`TRADEMARK.md` ajouté rétroactivement 17 heures plus tard) ; fracture mesurée sur 1 151 tweets (0 % d'injures envers les dirigeants de la tech contre 8,0 % d'hostilité envers des développeurs ordinaires) ; précédents documentés.

---

En l'espace de 48 heures, une querelle autour du nom d'un fork communautaire sous licence MIT de T3 Code s'est transformée en audit complet du code source, en plainte européenne au titre du RGPD et en près de vingt correctifs d'urgence fusionnés en pleine nuit.

Tout commence entre la soirée du 23 novembre et la matinée du 24 novembre 2026. Un internaute critique l'interface d'un fork libre et gratuit sous licence MIT réalisé par un développeur chinois, en le confondant avec l'application officielle. Sans vérifier s'il s'agissait d'un fork légitime, `@theo` publie deux messages en dix minutes qualifiant le projet de copie chinoise bas de gamme (« clone Temu »), tournant ouvertement le travail de l'auteur en dérision et menaçant de contacter GitHub pour faire suspendre son compte. Au même moment, le site web de T3 Code affiche le libellé « steal our code » (« volez notre code ») sur le lien menant à son dépôt GitHub ([Publication d'origine 1](https://x.com/realchendahuang/status/2125059292919394654), [Publication d'origine 2](https://x.com/realchendahuang/status/2125062675147448475)).

L'auteur du fork obtempère aussitôt : en trente minutes, il renomme le dépôt et retire toute référence à la marque T3. `@theo` présente ses excuses en message privé, mais laisse en ligne ses deux attaques publiques — qui dépassent ensemble les 200 000 vues — sans suppression ni mise au point. Le lendemain à 6 h du matin, en commentant la reprise de fonctionnalités de T3 Code par des laboratoires américains pesant plusieurs milliers de milliards de dollars, il tient le discours inverse : l'open source reste l'open source, et même ces géants sont libres de s'en servir.

![Theo menaçant publiquement de contacter GitHub pour faire bannir l'auteur d'un fork open source](../../evidence/01-origin-theo-threat.png)

Le 24 novembre à partir de 17 h 04 (heure de Pékin), plutôt que de répondre sur le terrain de l'invective, j'ai passé au crible l'historique des commits de `pingdotgg/t3code`, le code source, les pull requests, les issues, la documentation officielle, les registres de marques de l'USPTO et la chronologie publique de `@theo` sur X. En 24 heures, j'ai publié **18 volets documentés**, étayés par des liens directs et des captures d'écran. Le seul volet 1 a dépassé **1,81 million de vues** et **6 600 signets**, déclenchant un signalement RGPD en Europe ainsi qu'un marathon de six heures de correctifs nocturnes au sein de l'équipe T3.

Le présent document rassemble ces 18 volets dans une archive chronologique et thématique unique. Chaque section renvoie directement vers la publication d'origine correspondante, suivie de mesures de mitigation concrètes et de l'index exhaustif des sources primaires.


## « Zéro télémétrie » en vitrine, pistage inter-outils et journaux IP dans le code

Le premier volet porte sur l'écart entre les engagements publics de confidentialité de T3 Code et le code de télémétrie effectivement livré ([Volet 1](https://x.com/realchendahuang/status/2125153472450527440)).

Le 6 mars 2026, le dépôt fusionne la **PR #174**, qui active la télémétrie PostHog par défaut. Aucune documentation sur la télémétrie ne figure alors dans le dépôt, aucun écran de consentement n'apparaît au premier lancement et aucun interrupteur n'existe dans les paramètres. La variable d'environnement permettant de la couper reste enfouie dans le code pendant que les installations par défaut expédient immédiatement des événements.

Pendant plus de trois mois de collecte active par défaut, la page d'accueil de T3 Code affiche toujours bien en vue deux lignes explicites : `No telemetry / Unless you opt in. Full stop.` Le 18 juin, `@theo` supprime discrètement ces deux phrases lors d'une refonte graphique (`commit 3bdaa6e1`), sans annonce ni notification aux utilisateurs existants.

![Le commit 3bdaa6e1 du 18 juin 2026 supprimant silencieusement la promesse « No telemetry / Unless you opt in. Full stop. » de la page d'accueil](../../evidence/02-no-telemetry-removed.png)

En octobre, `@theo` fusionne la **PR #15028**, acheminant les lots de télémétrie envoyés toutes les 10 secondes via sa propre passerelle `ingest.t3.codes`. Les commentaires du code précisent explicitement que le backend de T3 enregistre une copie brute de chaque événement avant de le transmettre à PostHog. Les champs collectés couvrent le modèle choisi, les noms de modèles personnalisés privés, les modes de permission, la durée des exécutions, les volumes de tokens en entrée, en sortie et en cache, le nombre de projets et de fils locaux, plus de trente actions d'interface, les informations du système d'exploitation et les références matérielles.

Le 19 octobre, `@theo` enchaîne avec la **PR #21506**, les métriques existantes ne permettant pas de savoir combien de machines appartiennent à une même personne. `Identify.ts` se met alors à lire discrètement les fichiers d'identifiants d'outils concurrents dans le répertoire personnel de l'utilisateur — `~/.codex/auth.json` et `~/.claude.json` — pour en extraire le `user_id` OpenAI et l'`accountUuid` Claude, puis téléverser des **empreintes SHA-256 non salées** aux côtés du compte T3 Connect et de l'identifiant matériel afin de relier toutes les machines d'un même individu côté serveur.

![Identify.ts lisant ~/.codex/auth.json et ~/.claude.json pour envoyer des hachages SHA-256 non salés à des fins de corrélation inter-appareils](../../evidence/03-identify-codex-claude.png)

Comme le serveur détient déjà les identifiants T3 Connect en clair, un simple hachage côté serveur suffit à remonter d'une empreinte non salée jusqu'à l'identité réelle. Des identifiants de comptes tiers ayant fuité ailleurs peuvent être recoupés selon le même procédé.

Les demandes de la communauté sont systématiquement écartées. Le 23 juin, un développeur ouvre l'**Issue #1397** pour demander poliment un bouton de désactivation dans les réglages. Le mainteneur principal Julius la ferme en `not planned` avec ce motif : `We will not make this easier to opt out of, it is crucial for us to know how many users we have` (« Nous ne faciliterons pas la désactivation, il est vital pour nous de savoir combien d'utilisateurs nous avons »).

![Le mainteneur principal Julius fermant l'Issue #1397 en « not planned » et refusant de faciliter la désactivation](../../evidence/04-issue1397-no-optout.png)

En juillet, un utilisateur publie dans l'**Issue #4123** des captures archivées de la page d'accueil pour pointer la promesse rompue. Le 21 octobre, le compte de `@theo` ferme le ticket via un correctif sans rapport, le rouvre face au tollé, puis le referme discrètement le 4 novembre. Entre septembre et novembre, des contributeurs soumettent **quatre PR distinctes** pour ajouter un interrupteur dans les paramètres (`#13458`, `#16763`, `#21248`, `#27077`). Même la `#27077`, validée sur matériel réel avec **147 tests réussis**, est fermée le 17 novembre sous l'étiquette `unwanted`.


Le 24 novembre, devant l'ampleur des critiques, `@theo` riposte sur X en affirmant que T3 Code propose la meilleure Managed Policy d'entreprise du secteur pour couper aisément toute télémétrie, et assure que les données de conversation restent en local sans jamais toucher leurs serveurs ([Volet 7](https://x.com/realchendahuang/status/2125391659492081947)).

La lecture de `docs/user/managed-policy.md` révèle une autre réalité. L'utilisateur individuel sur poste de travail ne dispose toujours d'aucun réglage graphique. Couper la télémétrie impose d'éditer `~/.zshrc` et de redémarrer, de déployer une solution MDM ou d'écrire un fichier `policy.json` dans des répertoires système protégés par droits administrateur (`/Library/Application Support/T3Code/policy.json` sous macOS, `C:\Program Files\T3Code\policy.json` ou clés de registre HKLM sous Windows, `/etc/t3code/policy.json` sous Linux).

Plus grave, le document officiel `docs/user/telemetry.md` du dépôt recense lui-même trois angles morts échappant totalement à la Managed Policy. D'abord, l'application web hébergée émet des traces de connexion dès qu'elle est compilée avec le traçage actif et ne comporte aucun mécanisme d'opt-out. Ensuite, les applications mobiles ignorent les variables d'environnement serveur comme la Managed Policy. Enfin, lorsque `Publish agent activity` est activé sur un hôte, les titres de projets, titres de discussions, noms de modèles et états en direct partent vers les serveurs relais de T3 Connect — et la documentation précise noir sur blanc que désactiver la télémétrie n'interrompt pas cet envoi.

![Documentation officielle docs/user/telemetry.md confirmant l'absence de réglage sur le client web, l'exclusion du mobile et l'envoi persistant de l'activité agent](../../evidence/05-telemetry-cant-disable.png)


Le 25 novembre au matin, `@theo` publie une longue mise au point articulée autour de trois affirmations tranchées : T3 Code n'a jamais collecté de chemins de fichiers, les variables d'environnement ont toujours désactivé proprement la télémétrie, et le suivi de comptes Claude ne fonctionnait de toute façon pas. En moins de deux heures, les PR nocturnes de sa propre équipe et l'**export de 100 Mo** qu'il vient lui-même de rendre public démentent ces trois points ([Volet 11](https://x.com/realchendahuang/status/2125394810559426993)).

Quatre-vingt-dix minutes après sa publication, le mainteneur Julius fusionne la **PR #42450**, reconnaissant dans sa description que les exécutions déclenchées par webhook via le relais exportaient l'intégralité de leurs spans vers Axiom — dont des spans Git portant `git.cwd`, qui contenait le **chemin absolu de l'espace de travail, le nom d'utilisateur système et le nom du dépôt**.

![PR #42450 confirmant que les exécutions via relais exportaient vers Axiom les chemins absolus git.cwd contenant nom d'utilisateur et nom du dépôt](../../evidence/06-pr42450-absolute-path.jpg)

Deux autres correctifs de la nuit réfutent l'efficacité des variables d'environnement. La **PR #42376** confirme que l'application desktop Windows ignorait la variable utilisateur `T3CODE_TELEMETRY_ENABLED=false` et envoyait malgré tout la télémétrie. La **PR #42464** confirme qu'au premier lancement, le traçage du relais desktop s'initialisait avant la lecture du shell de connexion, rendant l'opt-out placé dans `~/.zshrc` inopérant durant toute la session.

Lorsqu'un développeur anglophone lui demande si l'application continue d'écrire des fichiers de suivi locaux après désactivation, `@theo` nie catégoriquement. Pourtant, autour de la ligne 152 de `AnalyticsService.ts` sur la branche `main`, le programme continuait d'écrire inconditionnellement au démarrage l'identifiant d'installation persistant et les hachages des comptes liés, quel que soit l'état du drapeau.

Quant à l'archive de 100 Mo publiée par `@theo` en gage de transparence, l'inspection de ses en-têtes montre que le fichier source portait le nom d'un export nettoyé généré vingt minutes avant la publication. Même après ce nettoyage, le jeu de données renfermait encore **264 enregistrements actifs de suivi de compte Claude** reliant **4 machines distinctes** au même individu, ainsi que des noms privés de modèles fournis par des proxys tiers.


Ce branle-bas de nettoyage nocturne faisait suite à une plainte formelle au titre du RGPD déposée en Europe dans la nuit du 24 novembre. En six heures au petit matin du 25 novembre, les PR d'urgence révèlent quatre failles supplémentaires en matière de confidentialité ([Volet 12](https://x.com/realchendahuang/status/2125395501663281198)).

Premièrement, la PR #42380 révèle que **chaque span de requête du relais envoyé au collecteur tiers Axiom — environ 2,2 millions de spans par heure, conservés 30 jours — enregistrait l'adresse IP réelle de l'appelant et son User-Agent juste à côté de `user.id`.** Trois heures et demie après la fusion de cette PR, `@theo` soutenait encore dans ses réponses que les IP avaient déjà été retirées.

![PR #42380 révélant que les spans du relais journalisaient IP réelle et User-Agent près de user.id au rythme de 2,2 millions/heure pendant 30 jours dans Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

Deuxièmement, les **PR #42285** et **#42430** montrent que la suppression d'un compte utilisateur dans Clerk laissait jusque-là intactes ses lignes dans la base du relais ainsi que ses tunnels Cloudflare actifs. Dès la première phrase, le mainteneur avoue pourquoi le correctif a été développé dans la nuit : ils venaient de recevoir une demande d'effacement de données personnelles et avaient dû purger les tables par requêtes SQL manuelles et couper les tunnels à la main.

![PR #42285 reconnaissant que la suppression de compte laissait des données relais et des tunnels Cloudflare actifs jusqu'à une demande d'effacement ayant exigé du SQL manuel](../../evidence/09-pr42285-delete-account-leftover.jpg)

Troisièmement, les **PR #42459** et **#41859** établissent que les notifications push Android transmettaient l'identifiant utilisateur en clair à Google, tandis que les journaux d'erreurs et la télémétrie iOS avaient laissé fuiter des URL de notification push contenant des jetons d'accès.

Quatrièmement, la **PR #42466** reconnaît que des événements de retour utilisateur censément anonymes étaient regroupés dans le même POST HTTP que des événements nominatifs portant `installId` et l'empreinte complète de la machine (OS, architecture, distribution WSL), en contradiction directe avec `docs/user/telemetry.md`. Pendant ce temps, la politique de confidentialité publique n'avait pas été mise à jour depuis le 6 octobre.


## Suppression factice, force-push silencieux, bannissements Antigravity et tunnels en clair

Au-delà de la télémétrie, T3 Code accumule des défauts de stockage local, de sûreté d'exécution, de conformité des comptes et de transport qui exposent directement les postes de développeurs et leurs abonnements payants.

Commençons par le disque local et les processus ([Volet 2](https://x.com/realchendahuang/status/2125160473176023486)). Lorsqu'un utilisateur supprime une conversation dans la barre latérale, la boîte de confirmation promet la suppression définitive de l'historique. En ouvrant `statev2.sqlite`, pas une seule ligne n'a disparu : échanges sensibles, sorties d'outils et traces de raisonnement restent intacts sur le disque.

Des utilisateurs ont signalé des bases enflant jusqu'à **25,9 Go** en trois semaines (avec 90 % de fils « supprimés »), **41,6 Go** en six semaines et **33 Go** en sept semaines. Signalé le 10 octobre sous l'**Issue #17845**, ce bug de fausse suppression demeurait irrésolu.

![Issue #17845 signalant que les conversations supprimées définitivement subsistent dans statev2.sqlite et saturent le disque sur plusieurs dizaines de gigaoctets](../../evidence/10-issue17845-fake-delete.png)

Un composant en arrière-plan, `t3-resource-monitor` (**Issue #11222**), interrogeait également tous les processus en cours sur la machine toutes les 5 secondes, même diagnostics fermés et clients déconnectés. Sous Windows, il ouvrait des handles sur plus de 400 applications et jeux tiers sans aucun rapport pour lire leurs lignes de commande, sans option de désactivation, tandis que la documentation interne prétendait que la collecte ne tournait qu'en présence d'abonnés actifs.

Il faut attendre le 24 novembre et la **PR #41889** pour confirmer que ce diagnostic enregistrait les **lignes de commande complètes des processus** — lesquelles contiennent couramment clés API en clair, mots de passe de bases et jetons d'authentification — dans la télémétrie en direct et l'historique.

S'y ajoutent d'autres défauts locaux documentés : fuite de noms d'hôtes internes d'entreprise vers l'API favicon de Google (`PR #16950`, `#32657`), requêtes sortantes obligatoires de vérification de manifeste même télémétrie désactivée (`Issue #36479`), consommation du quota Claude par tranches de 5 heures **1,7 fois** plus rapide que la normale (`Issue #7338`, `#24649`) et surconsommation électrique de **136 fois** — dont un test récent où le GPU 19 cœurs d'un MacBook restait bloqué à **60 W**, vidant une batterie pleine en 78 minutes et consommant encore **18 W** une fois l'onglet web fermé (`Issue #3143`, `#40581`).


Viennent ensuite les garde-fous d'exécution et la gestion des vulnérabilités ([Volet 3](https://x.com/realchendahuang/status/2125201882687881378), [Volet 13](https://x.com/realchendahuang/status/2125395980354994414)).

Le mode Claude Auto de T3 Code est censé suspendre l'exécution et demander validation avant toute commande à haut risque. Pourtant, à partir du 3 octobre — soit plus de **52 jours** dans l'**Issue #15353** —, le mode Auto validait silencieusement des commandes qui auraient dû bloquer. Même sans aucune règle personnalisée, après que le classificateur de sécurité de Claude eut bloqué `git push --force` deux fois et escaladé la troisième tentative vers une demande d'approbation manuelle, T3 Code l'approuvait automatiquement sans aucune fenêtre d'interface et consignait l'action comme validée par l'utilisateur. Deux correctifs proposés par la communauté (`#15360`, `#35207`) sont restés sans suite jusqu'à leur fermeture automatique par un bot.

![Issue #15353 ouverte depuis plus de 52 jours montrant le mode Claude Auto validant silencieusement git push --force sans aucune demande](../../evidence/11-issue15353-auto-force-push.png)

Rapprochons ces 53 jours d'attente d'un autre épisode. Le 22 novembre, l'**Issue #40948** relève que les nouveaux modèles n'apparaissent pas sur le classement public de `@theo`, `slopalytics.com`, parce qu'une liste blanche antérieure empêchait la fuite de noms de modèles privés. En **21 heures**, la **PR #41237** est fusionnée sous le nom de `@theo`, précisant explicitement que Theo demandait ce retrait — envoyant aussitôt les noms internes de modèles Ollama et les identifiants de déploiement Azure d'entreprise en clair pour alimenter son classement public.

Côté divulgation de failles, **l'onglet GitHub Security Advisories de T3 Code affiche toujours 0 avis publié.** En quelques jours seulement, les mainteneurs ont fusionné discrètement des correctifs pour une traversée de chemin dans le coffre de secrets (`#39483`), des fuites inter-domaines de jetons GitHub/GitLab d'entreprise, des secrets webhook sans expiration écrits dans les journaux, des identifiants cloud desktop lisibles par tous les utilisateurs locaux, un aperçu navigateur intégré sans bac à sable (`#41757`, `#42386`) et un correctif de 3 000 lignes (`#42504`) ajoutant enfin une confirmation pour des configurations de dépôts non fiables qui exécutaient jusque-là des commandes locales sans autorisation.

Plutôt que de prévenir les utilisateurs de mettre à jour, le dépôt a publié dans l'urgence un fichier `SECURITY.md` qualifiant la lecture de l'ensemble du disque hors projet, le HTTP en clair sous iOS et la prise de contrôle totale de la machine en cas de fuite de clé relais de limites assumées par conception. Pendant ce temps, la passerelle centrale de collecte `ingest.t3.codes` demeure propriétaire, `@theo` soutenant que la rendre open source attirerait des attaques.


Pour les utilisateurs payants, le danger le plus immédiat touche Google Antigravity ([Volet 4](https://x.com/realchendahuang/status/2125213397507858657)).

La FAQ officielle de T3 Code assure travailler avec chaque laboratoire et respecter pleinement les conditions d'utilisation de Google Antigravity : si cela tourne dans T3 Code, aucun risque. Lorsque des comptes payants se font bannir pour violation des CGU et que les utilisateurs interrogent l'équipe dans l'**Issue #40713**, un mainteneur principal répond publiquement que T3 Code n'appelle pas le backend d'Antigravity et ne réutilise pas les jetons utilisateurs, assurant que tout transite par le CLI officiel de Google.

Des développeurs le démentent aussitôt à l'aide des fichiers sources mêmes de T3 Code. `antigravityUsageLimits.ts` extrait les jetons OAuth Google depuis les fichiers locaux et le trousseau système (en interrogeant directement le Gestionnaire d'identification Windows), code en dur des en-têtes falsifiés du client officiel Google — dont des chaînes de compilation internes à Google — et attaque directement le point d'accès non documenté `v1internal`. Des ingénieurs Google avaient pourtant rappelé sur le forum développeurs officiel que la section 6 des CGU interdit aux outils tiers d'extraire ou de réutiliser des identifiants pour interroger directement le backend.

![antigravityUsageLimits.ts codant en dur de faux en-têtes client Google pour appeler l'API non documentée v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

Plus encore : le CLI officiel de Google verrouille les identifiants dans le trousseau du système afin de lier une machine à un seul compte. Pour autoriser plusieurs comptes en parallèle et lire lui-même les jetons, `antigravityAuthSupport.ts` injecte une fausse variable d'environnement `SSH_CONNECTION`, trompant le CLI pour lui faire croire qu'il s'exécute sur une machine distante sans interface afin qu'il écrive les jetons en clair dans le répertoire de T3. Lorsque Google publie le 24 novembre une mise à jour supprimant ce repli, l'isolation entre comptes s'effondre instantanément : l'**Issue #41973** confirme que chaque message envoyé sous le compte A basculait silencieusement vers le compte B.

![antigravityAuthSupport.ts injectant une fausse variable SSH_CONNECTION pour contourner le stockage dans le trousseau système](../../evidence/13-antigravity-ssh-spoof.png)

Le 23 novembre, l'**Issue #41536** documente un abonnement Google AI tout juste acheté à 20 USD, sans aucun proxy — uniquement géré via Antigravity dans T3 Code — banni par Google dès son tout premier message, **trois minutes** après configuration. Google n'accorde qu'un seul appel aux comptes personnels. Les mainteneurs n'ont ni enquêté ni ajouté d'avertissement : ils ont fermé le ticket comme doublon.

![Issue #41536 documentant un compte Google neuf à 20 USD sans proxy banni trois minutes après configuration au premier message, fermé comme doublon](../../evidence/14-issue41536-fresh-ban.png)

Usurper l'identité d'un client pour contourner les restrictions des fournisseurs était déjà une pratique ancrée. Auparavant, lorsque Google restreignait l'accès complet aux modèles à certains clients sur liste blanche, une issue de la communauté recommandait expressément de ne pas se faire passer pour un autre éditeur. Le bot de `@theo` a fermé le ticket ; huit jours plus tard, `@theo` fusionnait lui-même la **PR #26876**, renommant la chaîne d'identification de T3 Code avec le nom d'un éditeur autorisé pour tromper la détection du backend Google.


Examinons enfin T3 Connect, le relais de contrôle à distance entre mobile et ordinateur ([Volet 5](https://x.com/realchendahuang/status/2125218189596676555)).

**T3 Connect ne dispose d'aucun chiffrement de bout en bout : chaque prompt, fichier source et sortie terminal est techniquement lisible en clair par T3.** Le service repose actuellement sur des tunnels Cloudflare provisionnés sous le compte Cloudflare de T3. Le chiffrement TLS s'arrête en périphérie chez Cloudflare, sans aucune couche applicative chiffrée. Rattacher une Workers Route depuis le tableau de bord Cloudflare de T3 suffit à capter tout le trafic en clair, sans toucher une ligne du code open source et sans alerter ni le poste ni le téléphone.

Dans le même temps, l'approbation des nouveaux appareils est désactivée par défaut. Le propre fichier `SECURITY.md` de T3 reconnaît qu'une fuite de clé de signature du relais ou un compte cloud compromis permet d'émettre une session valide vers la machine liée — ce qui équivaut à livrer un shell local complet.

Lorsqu'un utilisateur demande l'authentification mutuelle et le chiffrement de bout en bout dans l'**Issue #32098**, un mainteneur ajoute un réglage d'approbation désactivé par défaut, répond que le chiffrement intégral constitue un chantier trop lourd pour l'instant et clôt le ticket. Deux discussions communautaires réclamant le chiffrement de bout en bout (`#21286`, `#37831`) restent sans réponse, et le 25 novembre `@theo` affirme tout net qu'un tel chiffrement est impossible à réaliser.

![Un mainteneur reconnaissant dans l'Issue #32098 qu'un compte cloud ou une clé relais volés permettent de contrôler les machines liées tout en laissant le chiffrement de bout en bout de côté](../../evidence/15-connect-no-e2e.jpg)

La facture des tunnels Cloudflare ayant atteint **25 000 USD par mois**, `@theo` ouvre la **PR #32945** pour migrer le trafic vers une passerelle OVH louée par T3, où le serveur Caddy de T3 termine le TLS puis transmet le trafic en clair via une socket Unix vers un proxy Go — toujours sans chiffrement de bout en bout. Une fois cette bascule effectuée, l'ensemble du trafic en clair traverse directement la mémoire vive des serveurs de T3. Pendant ce temps, `privacy-policy.astro` n'évoque qu'une vague « transmission chiffrée », sans mentionner l'absence de chiffrement de bout en bout ni prendre d'engagement de non-conservation.

![PR #32945 de Theo évoquant une facture Cloudflare de 25 000 USD/mois et transférant T3 Connect vers une passerelle OVH où Caddy termine le TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)


## Dépenser plus de 800 000 USD dans un client gratuit : bilan économique, conflits et 77 000 étoiles

Pourquoi le fondateur d'entreprises par abonnement injecterait-il plus de 800 000 USD dans un client MIT gratuit tout en bloquant chaque PR ajoutant un simple interrupteur de télémétrie ? Le recoupement de ses déclarations publiques, de ses liens d'investisseur, de ses sponsors et de ses PR GitHub éclaire l'équation complète.

Suivons d'abord l'argent et le radar à tokens ([Volet 8](https://x.com/realchendahuang/status/2125392410763239723)). Sur 1 151 tweets publiés en 17 jours, `@theo` mentionne T3 Code 162 fois, contre exactement **0 mention** pour ses trois anciens produits payants — T3 Chat, UploadThing et `Ping.gg`. Le 12 novembre, il confirme avoir déjà dépensé **plus de 800 000 USD** pour T3 Code.

En contrepartie, il s'est doté d'un radar de consommation en temps réel réparti sur des centaines de milliers de machines de développeurs. Le 18 novembre, il publie un tableau de bord interne affichant **31 700 milliards de tokens (31,7 T)** traités en une seule journée — soit **10,19 millions USD** d'équivalent API — avant d'évoquer un pic à **10,2 millions USD/jour**.

![Tableau de bord interne de T3 Code publié par Theo affichant 31,7 T de tokens et 10,19 millions USD d'équivalent API quotidien](../../evidence/17-theo-31t-tokens-10m-day.png)

Les 21 et 22 novembre, il égrène des parts de marché détaillées : 99 % d'usage adossé à des abonnements, **98,5 %** concentrés sur Codex, Claude et Antigravity, et un taux d'essai des modèles open source chutant de 15 % à 6 % pour moins de 0,5 % des prompts réels. Lorsqu'un commentateur avance une estimation le 23 novembre, il le raille de ne pas avoir accès à ses statistiques.

Ce tableau de bord se monnaye aussitôt en influence. Dans son test du modèle GPT-6.2 Astra le 18 novembre, il remercie OpenAI pour un accès anticipé illimité en tokens gratuits — brûlant **plus de 300 000 USD** sur un seul benchmark. Google lui offre de son côté un accès anticipé et l'appui d'équipes DeepMind. Le 21 novembre, lorsque sa collègue `@maria_rcks` plaisante sur un rachat de T3, il lui demande d'arrêter car plusieurs investisseurs l'ont déjà contacté pour vérifier. Le client MIT gratuit fait office de coût d'acquisition pour un radar sectoriel sur les parts de marché des modèles, des accès privilégiés aux laboratoires et un levier de valorisation.


Examinons ensuite sa frontière entre business angel et fondateur concurrent ([Volet 6](https://x.com/realchendahuang/status/2125385742243520653)).

Le 16 novembre, `@theo` révèle avoir été investisseur et contributeur de Vibe Kanban. Lorsque cette équipe comprend que le modèle kanban ne fonctionne pas et commence à pivoter vers une interface proche de T3 Code, elle n'arrive pas à livrer assez vite et ferme l'entreprise. Il conclut sa publication en tournant cette interface en dérision comme un excellent moyen de brûler son capital et de tuer sa start-up.

![Theo révélant avoir investi et contribué à Vibe Kanban avant de tourner publiquement sa fermeture en dérision](../../evidence/18-theo-vibe-kanban.png)

Deux jours plus tard, le 18 novembre, il confirme avoir investi dans la société de bacs à sable cloud Daytona ainsi que chez plusieurs de ses concurrents — neuf jours seulement après avoir écrit le 9 novembre qu'il pourrait lui-même faire des bacs à sable cloud une fonctionnalité payante de T3 Code.


Troisième axe : les liens avec ses sponsors et le double discours sur les quotas ([Volet 17](https://x.com/realchendahuang/status/2125411353393553744)).

En mai 2023, `@theo` publie la liste des sponsors de sa chaîne YouTube : Vercel, Clerk, Upstash, Axiom et PlanetScale. Dans T3 Code, l'authentification cloud repose sur **Clerk**, et le service tiers stockant pendant 30 jours 2,2 millions de spans par heure marqués de l'IP des utilisateurs est **Axiom** — deux sponsors de sa liste personnelle. En avril 2024, le PDG de Vercel Guillermo Rauch confirme que Vercel ne rétribue qu'un seul youtubeur sponsorisé (Theo) ; en septembre 2024, Theo reconnaît que le contrat comporte des clauses d'exclusivité interdisant la promotion de concurrents. Il est également business angel dans Cursor, Cline et d'autres outils de développement IA.

Sur le respect des conditions d'utilisation des fournisseurs, il prône la conformité en public tout en exploitant des failles pour lui-même. Le 19 août 2026, un ingénieur d'OpenAI explique que Codex laisse volontairement se terminer le tour en cours une fois le quota tombé à 0 %.

Deux jours plus tard, Theo se vante publiquement d'avoir lancé une longue tâche afin d'extraire au moins **800 USD de calcul gratuit** au-delà des 0 %, pendant que Maria, salariée de T3, publie un outil open source nommé Endless pour boucler les tours Codex sous le seuil zéro. Quand la polémique éclate le 22 août, Theo supprime son message et Maria efface le dépôt — avant de déclarer souhaiter que l'équipe Codex retrouve et bannisse les comptes l'ayant utilisé. OpenAI durcit aussitôt ses règles pour couper brutalement les tours actifs à 0 %, pénalisant l'ensemble des clients payants ordinaires (`openai/codex#45444`).

En octobre, Theo met en ligne un Gist GitHub (aujourd'hui à 452 étoiles) décrivant comment faire tourner CLIProxyAPI sur une machine personnelle pour mutualiser **7 comptes Claude et 3 comptes Codex** derrière un unique point d'accès partagé entre plus de 12 ordinateurs, capture d'écran de 12 identifiants et **555 %** de quota cumulé à l'appui. Aujourd'hui encore, la FAQ officielle de T3 Code explique dans un paragraphe refuser la rotation multi-comptes par crainte des bannissements — puis renvoie directement, dès le paragraphe suivant, vers ce Gist et sa vidéo, en intégrant un agrégateur de quotas CLIProxyAPI accompagné d'un désinvolte « désolé d'avance si vous vous faites bannir ».

![Le Gist cliproxy-setup.md de Theo (452 étoiles) mutualisant 7 comptes Claude et 3 comptes Codex sur plus de 12 machines jusqu'à 555 % de quota](../../evidence/19-cliproxy-gist-555pct.jpg)


Quatrième point : comment T3 Code a grimpé à **plus de 77 000 étoiles GitHub** avec seulement **129 watchers** ([Volet 18](https://x.com/realchendahuang/status/2125416210120765799)).

Fin avril 2026, Theo publie une vidéo de 36 minutes intitulée « Github has a fake star problem », estimant que les étoiles sont surtout devenues un moyen d'abuser les fonds de capital-risque. Fin octobre, après huit mois d'existence, T3 Code plafonne autour de 30 000 étoiles et suscite des interrogations sur sa traction réelle.

Le 30 octobre, Theo rédige et fusionne lui-même la **PR #27832**, ajoutant une bannière en haut à droite après cinq prompts saisis — en commençant par interroger en arrière-plan l'API GitHub locale pour vérifier si le compte a déjà mis une étoile au dépôt. Le 2 novembre, il publie un graphique de croissance quasi vertical juste après la ligne `Star prompt`, expliquant que cette astuce a immédiatement **multiplié par 10** les étoiles quotidiennes ; quelques heures plus tard, il partage une capture GitHub Trending soulignant **+3 094 étoiles en une seule journée**.

![Graphique publié par Theo le 2 novembre célébrant une multiplication par dix quasi verticale des étoiles quotidiennes après l'ajout de l'invite intégrée](../../evidence/20-star-10x-cliff.png)

Le 3 novembre, un internaute note qu'il ferme ces bannières lorsqu'il est occupé mais cliquerait volontiers en attendant la réponse. Un peu plus d'une heure plus tard, Theo rédige et fusionne lui-même les **PR #29922** et **#29987**, renforçant le mécanisme en deux temps : attente de **30 secondes d'inactivité de la fenêtre** pendant que l'utilisateur attend ses agents, et suppression pure et simple du passage par le navigateur pour que le clic déclenche directement en backend `PUT user/starred/pingdotgg/t3code` avec les identifiants GitHub du serveur hôte avant de lancer une pluie de confettis.

Le bot de revue interne du dépôt, Macroscope, marque pourtant la PR #29922 en `Needs Human Approval`, avertissant que l'ajout d'étoile s'effectue avec les identifiants GitHub du serveur plutôt que nécessairement ceux de la personne qui clique. Theo fusionne tout de même sa propre PR.

Le 6 novembre, le développeur `zhilsinger` dépose un avis `Request changes` sur la PR #29922 pour exiger le retour à l'ouverture dans le navigateur utilisateur, en relevant deux failles : sur des hôtes distants ou partagés, la notification ne précise jamais quel compte GitHub est utilisé (et les commentaires du code eux-mêmes admettent que le jeton de l'hôte peut ne pas appartenir au cliqueur) ; en outre, `packages/source-control-github/src/server/driver.ts` (lignes 60 à 99) ne verrouille pas `pingdotgg/t3code`, permettant à tout client disposant du droit `source-control:write` d'étoiler n'importe quel dépôt arbitraire avec les identifiants du serveur.

![Avis Request Changes du développeur zhilsinger sur la PR #29922 alertant sur l'étoilage via identifiants partagés et dépôts arbitraires, laissé sans réponse pendant 19 jours](../../evidence/21-pr29922-zhilsinger-review.png)

Cette revue reste lettre morte pendant 19 jours, sans réponse ni correctif. Porté par les déclencheurs à 5 prompts, la détection d'inactivité de 30 secondes et les appels API directs sur identifiants hôtes, T3 Code passe de 30 000 à 77 000 étoiles en 25 jours. Le 24 novembre, Theo poste une capture à 74 600 étoiles en affirmant ne même pas avoir remarqué le passage des 70 000.


## Fusions à l'aveugle, bots pilleurs de forks, marques non déposées et politesse à géométrie variable

En prenant du recul par rapport au code pour observer la gestion communautaire, on retrouve la même mécanique derrière les choix techniques et la gouvernance.

Comparons d'abord la vélocité interne au traitement réservé aux contributeurs externes ([Volet 9](https://x.com/realchendahuang/status/2125392916369871309), [Volet 2](https://x.com/realchendahuang/status/2125160473176023486), [Volet 3](https://x.com/realchendahuang/status/2125201882687881378)).

`@theo` s'est publiquement vanté d'envoyer **500 commits par jour** avec **700 agents** en parallèle tandis qu'un mainteneur principal faisait tourner une boucle automatisée traitant les PR en série. Le 10 novembre, il prévient ses utilisateurs de ne rester sur la version nightly que s'ils acceptent ses `yolo merges` occasionnellement destructeurs ; le même jour, au sujet de la sûreté des agents, il écrit qu'il se dépêche d'obtenir des résultats pour tourner ses vidéos et que si un agent détruit sa machine, cela lui fait du contenu gratuit.

À l'opposé, les utilisateurs externes essuient des fins de non-recevoir. Le 6 août, parce qu'il n'utilise pas personnellement le mode Plan, il ouvre la **PR #5551** reléguant l'option Build/Plan dans un menu hérité, assortie d'un graphique de télémétrie légendé `Reality check for those upset` (« Retour à la réalité pour ceux que ça contrarie »). Le 2 septembre, la **PR #9190** masque l'anneau de progression de la fenêtre de contexte (recueillant 16 votes négatifs, record du dépôt).

Lorsqu'un utilisateur déplore dans l'**Issue #33639** que les notes de version ne signalent pas où le bouton a été déplacé, `@theo` lui intime de désinstaller le logiciel, le menace de bannissement, le traite d'ingrat et de paresseux et déclare se moquer de l'avis des utilisateurs. Quand la **PR #33131** supprime purement et simplement le mode Plan le 9 novembre, il la fusionne sans même avoir lu le résumé généré par sa propre IA — lequel prétendait pourtant que la suppression était isolée dans un commit distinct pour pouvoir la rétablir si les données d'usage le justifiaient.

Le fichier `CONTRIBUTING.md` à la racine formalise cette culture : open source ou pas, il invite les contributeurs potentiels à s'abstenir car leurs PR seront presque à coup sûr fermées. Sa section Bans précise que mettre un mainteneur mal à l'aise — en citant nommément le fait de contester la fermeture d'une issue — expose le développeur à une dénonciation publique dans `.github/VOUCHED.td`, entraînant la fermeture automatique immédiate de toutes ses issues et PR futures. À l'échelle du dépôt, 174 éléments portent l'étiquette `unwanted`, à côté d'interdictions visant les PR rédigées avec certains modèles.

![CONTRIBUTING.md dissuadant les contributions externes et détaillant le pilori public des bannissements dans .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

Le 10 novembre, il affirme que 70 % des demandes de fonctionnalités viennent d'utilisateurs incapables de rédiger un prompt correct. Le 12 novembre, lorsqu'un développeur propose une PR, il répond par une capture de `CONTRIBUTING.md` et lui reproche d'intervenir sans être d'abord abonné à son compte. Le soir même, il avertit les utilisateurs critiques dans les réponses qu'il a déjà concédé `/btw` et qu'il n'hésitera pas à le retirer. Le 20 novembre, il tranche qu'une capture d'écran barrée de flèches vaut mieux qu'une PR.


Vient ensuite le deux poids, deux mesures sur la copie d'idées et le contrôle de la critique ([Volet 10](https://x.com/realchendahuang/status/2125393641665671593)).

Le 8 novembre, la développeuse `@MiaAI_lab` présente une fonctionnalité issue de son fork personnalisé. Theo lui répond `Okay I'm stealing this` (« OK, je pique ça »), puis mentionne 30 secondes plus tard son `@bot` interne directement dans les réponses publiques pour localiser son fork, en évaluer la portabilité et lancer un thread Opus 5.5 sur beebox afin de l'intégrer dans T3 Code. Le 13 novembre, lorsqu'un utilisateur fait l'éloge d'outils concurrents, il dépêche de nouveau `@bot` en public pour découper chaque fonctionnalité vantée en fils séparés prêts à être clonés dans T3 Code.

![Theo répondant « Okay I'm stealing this » puis mandatant @bot 30 secondes plus tard pour aspirer le fork d'une développeuse dans T3 Code](../../evidence/23-stealing-fork-bot.png)

Dès que la concurrence adopte une ergonomie comparable, le ton s'inverse instantanément. Le 24 novembre, à la sortie des onglets latéraux dans Claude Code Desktop, il cite le message pour railler leur vitesse de copie. Contre ses détracteurs, il appelle le 11 novembre ses abonnés ayant accès aux Community Notes à démonétiser les comptes critiquant son équipe, et confirme le 24 novembre utiliser sur X un bot bloqueur automatique qui a bloqué environ cent comptes ce jour-là.


Revenir à la menace de marque déposée à l'origine de toute l'affaire met au jour un décalage tout aussi net ([Volet 15](https://x.com/realchendahuang/status/2125408163273080950)).

Suivant une piste signalée par `@vildanden_ai`, la consultation de la base de l'USPTO renvoie **0 enregistrement** pour `T3 Code`, `T3 Tools` ou `T3 Connect`. L'unique demande jamais déposée par T3 Tools Inc. concernait son ancien nom `PING LABS` (numéro de série `97294243`, mars 2022), définitivement refusée en février 2025 puis marquée `ABANDONED` le 19 mai 2025 dans l'USPTO TSDR. Parallèlement, la marque `T3` seule est déjà enregistrée dans les classes logicielles et SaaS 42 et 9 par des tiers dont EquipmentShare (Reg. `7795672`) et ESG Operations (Reg. `3324707`).

Or, selon la politique officielle de GitHub en matière de marques, **une entreprise commerciale soumettant une demande de retrait doit obligatoirement fournir un numéro d'enregistrement fédéral ou international ainsi que l'office d'enregistrement sous peine de parjure ; les exceptions non enregistrées ne s'appliquent qu'aux organismes publics et aux associations à but non lucratif.** Au moment précis où `@theo` menaçait de faire bannir l'auteur chinois sur GitHub, il était juridiquement incapable de remplir ne serait-ce que le formulaire de plainte de GitHub.

Ce n'est qu'à 12 h 21 le 24 novembre — soit 17 heures après sa menace — que `@theo` fusionne la **PR #41898** ajoutant un fichier `TRADEMARK.md` revendiquant des droits « qu'ils soient enregistrés ou non ». Ses propres tweets passés le montrent pourtant moquant WordPress en septembre 2024 pour avoir engagé une « querelle de marque inapplicable », et jugeant en avril 2025 que tenter de déposer un terme courant déjà occupé par l'art antérieur était « proprement insensé ».

![PR #41898 fusionnée 17 heures après la menace de bannissement pour ajouter rétroactivement TRADEMARK.md revendiquant des droits enregistrés ou non](../../evidence/24-pr41898-trademark-aftermath.png)


L'analyse de l'ensemble des **1 151 tweets publics** publiés par `@theo` entre le 7 et le 24 novembre montre combien son registre dépend de la position de force de son interlocuteur ([Volet 14](https://x.com/realchendahuang/status/2125404517697290438)).

Sur **60 réponses** adressées à 20 dirigeants de grands groupes, chercheurs de laboratoires et leaders d'opinion majeurs (43 selon le filtre strict sur le `@` initial), le taux d'attaques personnelles et de grossièretés s'établit à **0 %**, tandis que les remerciements courtois atteignent environ un tiers. Après avoir critiqué Gemini 4 Carbon de Google le 12 novembre, il s'empresse de nuancer en saluant les efforts de l'équipe ; une semaine plus tard, à la sortie de Neon, il s'excuse publiquement et se félicite deux jours plus tard de ne pas s'être fâché avec eux. Le 18 novembre, au lendemain d'une longue critique du modèle GPT-6.2 Astra d'OpenAI, il publie dès le matin suivant un message saluant OpenAI.

À l'inverse, sur les **749 autres réponses** adressées à des développeurs ordinaires et des critiques (766 selon le filtre par `@` initial), l'hostilité et les grossièretés grimpent à **8,0 %** — atteignant même un pic de **14,4 %** dans les 25 heures suivant la polémique du fork chinois.

Cette attitude ne vise pas uniquement les développeurs chinois. Lorsqu'un internaute demande simplement s'il vaut mieux utiliser T3 Code ou Antigravity avec Gemini 4, il cite la question devant ses 380 000 abonnés pour écrire que les ingénieurs méritent le chômage de masse qui les attend.

![Theo citant une simple question de comparaison d'outils pour déclarer que les ingénieurs méritent le chômage de masse](../../evidence/25-engineers-unemployment.png)

Dans d'autres réponses, il affirme que les développeurs moyens ne sont pas bien malins et que les nouveaux venus sont des utilisateurs de piètre qualité, jure d'aller danser sur les tombes de la communauté IA locale, qualifie les utilisateurs Linux d'imposteurs (« larpers »), traite à trois reprises sans aucun regret une critique féminine de `stupid bitch` (11–12 novembre), et menace d'envoyer un critique sur Threads en prison tout en raillant son diagnostic de RSD (18 novembre).

Le 24 novembre après-midi, il qualifie publiquement le Twitter tech chinois de pire fosse d'aisances qu'il ait jamais piétinée et traite d'abrutis les développeurs qui consultent les audits de code chinois — moins de 24 heures après avoir fait la leçon à quelqu'un, le 22 novembre, en expliquant que ruiner la confiance de tout son entourage mène rarement à ce que l'on veut.

![Theo qualifiant le Twitter tech chinois de fosse d'aisances et insultant les développeurs lisant les audits de code chinois](../../evidence/26-cn-cesspit.png)


En remontant deux ans en arrière, on retrouve exactement le même schéma ([Volet 16](https://x.com/realchendahuang/status/2125408843152953693)).

En 2024, lorsqu'il forke le thème VS Code d'un autre développeur, il baptise son dépôt `vsc-material-but-i-wont-sue-you`, brocardant le caractère de l'auteur original dans la description. Deux ans plus tard, lorsqu'un développeur forke son propre projet MIT, il brandit avocats et menaces GitHub.

Deux ans plus tôt, l'une de ses vidéos ciblant des chaînes de tutoriels indiennes déclenche une vague de harcèlement contre des développeurs indiens ; sous le feu des critiques, il enregistre une vidéo d'excuses (`I screwed up.`) condamnant les attaques fondées sur la nationalité — avant d'attaquer lui-même le Twitter tech chinois deux ans après.

En octobre 2025, il s'en prend au compte de FFmpeg, lâche des jurons face caméra et met sur la table une **prime de 20 000 USD** pour faire écarter un mainteneur de FFmpeg. Lorsque le fournisseur VPN Windscribe surenchérit en offrant 21 000 USD s'il reste éloigné de X pendant un mois, que le fondateur de VLC dénonce ces primes contre des mainteneurs et que les développeurs FFmpeg parlent de harcèlement public sur leur liste de diffusion, il supprime la vidéo, efface ses tweets et retire sa prime.

Enfin, peu avant 4 h du matin le 25 novembre 2026, il menace de fermer le code source de T3 Code la nuit même sous prétexte que les utilisateurs ne « mériteraient pas l'open source ». Après avoir récolté plus de 3 000 mentions J'aime, il supprime silencieusement cette menace avant l'aube pendant que le dépôt demeure public.


## Mesures de mitigation immédiates et clients alternatifs

Si T3 Code est encore installé sur une machine professionnelle ou personnelle, prenez deux dispositions immédiates.

Si vous prévoyez de conserver l'application locale ou desktop, ne vous fiez pas aux seules variables d'environnement. Renseignez les deux drapeaux de désactivation dans `~/.zshrc` et bloquez au niveau du système d'exploitation le domaine fermé de collecte via `/etc/hosts` :

```bash
# 1. Ajouter dans ~/.zshrc puis redémarrer l'application
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true

# 2. Bloquer la passerelle de collecte propriétaire dans `/etc/hosts`
127.0.0.1 ingest.t3.codes
```

Si vous désinstallez l'application et changez d'outil, vérifiez deux points restants : supprimez les fichiers résiduels `statev2.sqlite` afin que vos conversations « supprimées » cessent d'occuper des dizaines de gigaoctets sur le disque, et révoquez vos sessions Google Antigravity gérées via T3 ainsi que les liaisons distantes T3 Connect non chiffrées tout en passant en revue vos autorisations cloud connectées.

Parmi les alternatives mentionnées dans les réponses de la communauté figurent notamment **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`) et **Cloudroom** ([Fil sur les alternatives](https://x.com/realchendahuang/status/2125244977878036713)). Quel que soit l'outil choisi, auditez au préalable ses réglages de télémétrie par défaut, son comportement de suppression locale et le périmètre d'accès à vos identifiants.


## Sources primaires et index des 18 volets originaux

### Publications d'origine et index complet des 18 volets sur X (ordre chronologique)

- Publication d'origine 1 (lien GitHub sur la page d'accueil intitulé « steal our code ») : https://x.com/realchendahuang/status/2125059292919394654
- Publication d'origine 2 (querelle sur le nom du fork MIT, attaques « Temu » et deux poids, deux mesures) : https://x.com/realchendahuang/status/2125062675147448475
- Volet 1 (télémétrie par défaut, promesse « No telemetry » rompue, hachage inter-outils non salé) : https://x.com/realchendahuang/status/2125153472450527440
- Volet 2 (fausse suppression SQLite, scanner de processus toutes les 5 s, suppression du mode Plan, bannissements dans `CONTRIBUTING.md`) : https://x.com/realchendahuang/status/2125160473176023486
- Volet 3 (`git push --force` silencieux en mode Auto, suppression en 21 h du filtre de confidentialité, 0 avis de sécurité, insultes aux utilisateurs) : https://x.com/realchendahuang/status/2125201882687881378
- Volet 4 (falsification d'en-têtes Google Antigravity, faux `SSH_CONNECTION`, bannissement en 3 minutes sur un compte neuf) : https://x.com/realchendahuang/status/2125213397507858657
- Volet 5 (absence de chiffrement de bout en bout dans T3 Connect, tunnel Cloudflare, passerelle OVH en clair auto-hébergée) : https://x.com/realchendahuang/status/2125218189596676555
- Volet 6 (conflits d'intérêts de business angel : raillerie sur la fermeture de Vibe Kanban et chevauchement avec les bacs à sable Daytona) : https://x.com/realchendahuang/status/2125385742243520653
- Volet 7 (discours sur la Managed Policy face aux trois angles morts de la documentation officielle) : https://x.com/realchendahuang/status/2125391659492081947
- Volet 8 (bilan économique à plus de 800 000 USD sur un client gratuit et radar à 31,7 T tokens / 10,19 M USD par jour) : https://x.com/realchendahuang/status/2125392410763239723
- Volet 9 (500 commits/jour, 700 agents, yolo merges contre rejet des PR externes et filtrage par abonnement) : https://x.com/realchendahuang/status/2125392916369871309
- Volet 10 (mandatement public de `@bot` pour copier forks et concurrents, bot bloqueur automatique, appel à démonétisation via Community Notes) : https://x.com/realchendahuang/status/2125393641665671593
- Volet 11 (mise au point du 25 novembre contredite en moins de 2 heures par les PR nocturnes et 264 enregistrements Claude dans l'export de 100 Mo) : https://x.com/realchendahuang/status/2125394810559426993
- Volet 12 (correctifs nocturnes post-RGPD révélant 2,2 M/h de journaux IP, suppression de compte incomplète, fuites push et lots mixtes) : https://x.com/realchendahuang/status/2125395501663281198
- Volet 13 (attaques contre le Twitter tech chinois pendant la fusion silencieuse de correctifs pour aperçus sans bac à sable et commandes sans confirmation) : https://x.com/realchendahuang/status/2125395980354994414
- Volet 14 (analyse quantitative de 1 151 tweets : 0 % d'injures envers les dirigeants de grands groupes contre 8 % d'hostilité envers des développeurs ordinaires) : https://x.com/realchendahuang/status/2125404517697290438
- Volet 15 (zéro marque déposée à l'USPTO pour T3 Code et exigences de la politique GitHub sur les marques) : https://x.com/realchendahuang/status/2125408163273080950
- Volet 16 (précédents récurrents : `vsc-material-but-i-wont-sue-you`, polémique contre les développeurs indiens, prime de 20 000 USD contre FFmpeg, menace supprimée de fermeture du code source) : https://x.com/realchendahuang/status/2125408843152953693
- Volet 17 (sponsors Clerk/Axiom, exploitation de la faille à 0 % de quota Codex et suppression des preuves, Gist CLIProxyAPI à 10 comptes) : https://x.com/realchendahuang/status/2125411353393553744
- Volet 18 (comment T3 Code a atteint 77 000 étoiles GitHub : invite après 30 s d'inactivité déclenchant des étoiles par API sur identifiants hôtes et étoilage de dépôts arbitraires non corrigé) : https://x.com/realchendahuang/status/2125416210120765799
- Liste d'alternatives communautaires : https://x.com/realchendahuang/status/2125244977878036713

### Code source, PR, Issues, politiques et preuves primaires

**Télémétrie, vie privée et correctifs nocturnes post-RGPD (Volets 1, 7, 11, 12)**

- Télémétrie PostHog par défaut (PR #174) : https://github.com/pingdotgg/t3code/pull/174
- Suppression silencieuse de la promesse « No telemetry » sur la page d'accueil (`commit 3bdaa6e1`) : https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Refus de faciliter la désactivation (Issue #1397) et question sur la promesse rompue (Issue #4123) : https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Copie brute vers `ingest.t3.codes` (PR #15028) et hachage inter-outils non salé (PR #21506) : https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506
- Quatre PR communautaires d'opt-out rejetées (#13458 / #16763 / #21248 / #27077) : https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- Fichiers sources de télémétrie et d'identification (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts`) : https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts
- Documentation officielle de télémétrie et de Managed Policy : https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Déclarations de Theo sur la Managed Policy, sa mise au point et l'absence de fichiers locaux de suivi : https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924
- Fuite de chemins absolus d'espace de travail (PR #42450) et variables d'opt-out ignorées sous Win/Mac (PR #42376 / #42464) : https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Journaux IP à 2,2 M/h conservés 30 jours (PR #42380), suppression de compte incomplète (PR #42285 / #42430), fuites push mobiles (PR #42459 / #41859) et regroupement de retours dits anonymes (PR #42466) : https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Sécurité locale, correctifs silencieux, Antigravity et T3 Connect (Volets 2, 3, 4, 5, 13)**

- Fausse suppression SQLite (Issue #17845 / #28903), moniteur de processus toutes les 5 s (Issue #11222) et capture des lignes de commande (PR #41889) : https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Envoi de noms d'hôtes internes vers Google favicon (PR #16950 / #32657), requête sortante forcée (Issue #36479), contournements de permissions/politiques (PR #21806 / #27322), surconsommation de quota Claude à 1,7x (Issue #7338 / #24649) et bugs de consommation électrique (Issue #3143 / #40581) : https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- `git push --force` silencieux en mode Claude Auto (Issue #15353) et PR correctives communautaires (#15360 / #35207 / #40692) : https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Retrait en 21 heures du filtrage des modèles privés pour `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237) : https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/data/t3-usage.json
- Onglet Security Advisories vide, `SECURITY.md` et correctifs de sécurité silencieux (traversée de chemin des secrets, aperçus sans bac à sable, exécution de commandes sans confirmation) : https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504
- Garantie de la FAQ Antigravity, démenti par le code dans l'Issue #40713, bannissement en 3 minutes (Issue #41536), mélange de comptes (Issue #41973), usurpation d'éditeur autorisé (PR #26876) et code source : https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236
- Conditions d'utilisation de Google Antigravity et interdiction sur le forum officiel : https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Refus du chiffrement E2E sur T3 Connect (Issue #32098), passerelle Caddy OVH auto-hébergée (PR #32945), code du relais, politique de confidentialité et discussions restées sans réponse : https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Modèle économique, conflits d'intérêts, sponsors et 77 000 étoiles (Volets 6, 8, 17, 18)**

- Dépenses > 800 000 USD, tableau de bord 31,7 T tokens / 10,19 M USD/jour, part de 98,5 % sur trois laboratoires, réplique sur les statistiques et 300 000+ USD de tokens OpenAI gratuits en accès anticipé : https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410
- Raillerie sur Vibe Kanban, annonce d'investissement dans Daytona et projet de bacs à sable cloud payants : https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Liste des sponsors YouTube, confirmation du PDG de Vercel, vidéo sur l'exclusivité, message de suppression de Maria, `openai/codex#45444`, Gist CLIProxyAPI et FAQ : https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Vidéo « Fake star » et VC, courbe de croissance 10x, publication Trending à +3 094 étoiles, billet « raté les 70k », PR #29922 et code d'étoilage arbitraire dans `driver.ts` : https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Gouvernance, marques, politesse sélective et précédents historiques (Volets 9, 10, 14, 15, 16)**

- Suppression du mode Plan (PR #5551 / #33131), masquage de l'anneau de progression (PR #9190), insultes dans l'Issue #33639, `CONTRIBUTING.md` et `.github/VOUCHED.td` : https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commits/jour, yolo merges, « nukes my machine = free content », PR réservées aux abonnés, menace sur `/btw` et messages « capture d'écran plutôt que PR » : https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Ordres publics donnés à `@bot` pour aspirer les forks, railleries contre Claude Desktop, appel à démonétisation via Community Notes et confirmation du bot bloqueur automatique : https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Registres USPTO TSDR (`PING LABS` 97294243 abandonnée ; EquipmentShare `T3` Reg. 7795672), politique GitHub sur les marques, `PR #41898` rétroactive, menace de bannissement et anciens tweets sur les marques : https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Preuves sur la politesse sélective (ponts avec Google, chômage des ingénieurs, tombes de l'IA locale, utilisateurs Linux qualifiés de larpers, menace de prison et raillerie RSD, tweets `stupid bitch`, « fosse d'aisances » du Twitter tech chinois, leçon sur la confiance détruite) : https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2124449493513068862
- Archives historiques (`vsc-material-but-i-wont-sue-you`, vidéo d'excuses aux développeurs indiens, prime de 20 000 USD contre FFmpeg) : https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04
