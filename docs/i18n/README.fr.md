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
<p align="center">
  <strong>Éditions de la communauté mondiale :</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml/badge.svg" alt="CI de vérification du dépôt" /></a>
  ·
  <a href="https://realchendahuang.github.io/before-you-install-t3code/"><strong>Portail interactif des preuves (GitHub Pages)</strong></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>Index des 108 images de preuve</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>Index des 320 URL sources</strong></a>
</p>
<p align="center">
  <strong>Base auditée :</strong> <a href="https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2"><code>9d3195b4</code></a> (<code>#42000</code>) ·
  <strong>Dernière vérification amont :</strong> <a href="https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd"><code>ca81b7b9</code></a> (<code>#42634</code>, 25 nov. 14 h 49 CST · +259 commits)
</p>

![Avant d'installer T3 Code — Bannière de l'audit indépendant en 18 volets](../../evidence/00-cover-en.png)

> **Périmètre et politique de vérification**  
> Ce dépôt constitue un audit indépendant de `pingdotgg/t3code` (T3 Code) portant sur la sécurité, la télémétrie, la gouvernance et les archives publiques. Il consolide les 2 publications d'origine et **18 volets d'audit documentés** publiés les 24 et 25 novembre 2026, accompagnés de **320 URL de sources primaires canoniques** répertoriées dans [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md) (`SRC-001`–`SRC-320`), de **108 preuves visuelles et graphiques primaires** catalogués dans [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md), de six dossiers techniques approfondis ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)), du [Portail interactif des preuves](https://realchendahuang.github.io/before-you-install-t3code/), ainsi que d'un jeu de données quantitatif de **1 151 publications X consécutives de `@theo`** (7–24 novembre 2026). L'audit du code source couvre la base de référence principale [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) (`PR #42000`, `2026-11-24T08:41:04Z`) et fait l'objet d'un suivi continu jusqu'au `HEAD` de `main` [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`PR #42634`, `2026-11-25T06:49:37Z` / `2026-11-25 14:49 CST`). Aucun lien raccourci de redirection et aucune coordonnée privée n'y figurent. Les mises à jour factuelles, correctifs fusionnés ultérieurement ou traductions supplémentaires sont les bienvenus par Pull Request avec citations primaires — voir [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

---

## TL;DR (Verdict en 30 secondes)

- **Public concerné :** Utilisateurs des versions bureau locales, CLI, web hébergée (`app.t3.codes`), mobile et T3 Connect de `pingdotgg/t3code` — en particulier les installations bureau sans droits administrateur, les développeurs utilisant des endpoints personnalisés ou des abonnements Antigravity/Gemini, les utilisateurs du mode Claude Auto et toute personne disposant de sessions GitHub ou T3 Connect liées.
- **3 constats majeurs vérifiés dans le code (contrôlés de `9d3195b4` → `ca81b7b9`) :**
  1. **Télémétrie par défaut, ID inconditionnel au démarrage et révélations post-RGPD ([Section 2](#2-télémétrie-lecture-didentifiants-inter-outils-et-correctifs-nocturnes-post-rgpd-volets-1-7-11-12) · [Dossier 01](../dossiers/01-telemetry-and-gdpr-timeline.md)) :** Télémétrie PostHog activée par défaut ([PR #174](https://github.com/pingdotgg/t3code/pull/174)) alors que la page d'accueil promettait `"No telemetry"` jusqu'au 18 juin ([commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) ; conservation des événements bruts via le serveur propriétaire [`https://ingest.t3.codes/`](https://ingest.t3.codes/) ; les PR post-RGPD ont reconnu **2,2 M/h de spans IP + UA** dans Axiom ([PR #42380](https://github.com/pingdotgg/t3code/pull/42380)), des fuites de chemins `git.cwd` ([PR #42450](https://github.com/pingdotgg/t3code/pull/42450)) et une suppression Clerk incomplète ([PR #42285](https://github.com/pingdotgg/t3code/pull/42285)). Les PR post-audit ont cessé la lecture de `.codex`/`.claude.json` ([PR #42299](https://github.com/pingdotgg/t3code/pull/42299)), masqué les modèles personnalisés sous `custom:<driver>` ([PR #42465](https://github.com/pingdotgg/t3code/pull/42465)) et pris en compte CI/`DO_NOT_TRACK` ([PR #42630](https://github.com/pingdotgg/t3code/pull/42630), [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)), **mais [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`line 156`) écrit toujours un ID sur disque avant de vérifier les opt-outs, [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omet `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`, et aucun interrupteur n'existe dans Settings ou `app.t3.codes`.**
  2. **Failles de sécurité locale, hooks SSH/dépôt ambiants et `0` avis de sécurité ([Section 3](#3-stockage-local-surveillance-des-processus-contournement-de-garde-fous-et-correctifs-de-sécurité-non-divulgués-volets-2-3-13) · [Dossier 02](../dossiers/02-local-safety-and-security-audit.md)) :** Le mode Claude Auto exécute silencieusement `git push --force` à la 3e tentative ([Issue #15353](https://github.com/pingdotgg/t3code/issues/15353), toujours ouverte) ; des correctifs de sécurité discrets ont été fusionnés face à [**0 avis de sécurité GitHub**](https://github.com/pingdotgg/t3code/security/advisories) tandis que [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) déclare intentionnels le `filesystem:read` sur tout l'OS et le HTTP en clair sous iOS ; l'ouverture d'un dépôt initialise automatiquement et récursivement `.gitmodules` (`GitVcsDriverCore.ts`), omet `core.hooksPath=/dev/null` au niveau global dans Git (`VcsProcess.ts`) et exécute en direct les hooks `SessionStart` de Claude (`ClaudeAdapterV2.ts`) avec l'intégralité de `GITHUB_TOKEN`/`SSH_AUTH_SOCK` hérités ; et bien que la [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) ait ajouté une purge asynchrone des fils (fermant `#17845`), les références de forks/sous-agents ainsi que les marqueurs de suppression demeurent et la réduction de `statev2.sqlite` exige un `VACUUM` hors ligne, tandis que la [PR #42577](https://github.com/pingdotgg/t3code/pull/42577) n'a restreint la surveillance des processus que sous Windows (laissant `ProcessesToUpdate::All` sous Linux/macOS).
  3. **Usurpation Antigravity, relais en clair, failles LAN/Auth et mise en favori de dépôts arbitraires ([Section 4](#4-risques-liés-aux-conditions-dutilisation-de-google-antigravity-et-relais-t3-connect-non-chiffré-volets-4-5) · [Section 5.3](#53-comment-t3-code-est-passé-de-30k-à-77k-étoiles-en-25-jours-129-watchers-volet-18)) :** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts) extrait toujours les jetons du trousseau / `CredReadW` et usurpe `antigravity/hub/2.24.0` contre `v1internal` (tandis que la [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) a exposé des liens de vérification Google `VALIDATION_REQUIRED` `403`) ; **T3 Connect** n'a toujours **aucun chiffrement E2E** ([Issue #32098](https://github.com/pingdotgg/t3code/issues/32098)) et `requireConnectDeviceApproval` reste à `false` par défaut ([`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)) ; l'inspection du code source à `ca81b7b9` confirme également l'émission de cookies de shell de 30 jours sans `Secure` sur HTTP `--lan` avec contournement en cas d'`Origin` absent (`PR #37042`), des jetons Bearer non-DPoP de 30 jours non révocables sans route `/logout`, des identifiants d'URL `?wsTicket=` valables 5 minutes et rejouables, ainsi que `isIPv4` coupant silencieusement les sockets Tailscale Serve / Connect sur `::1` ; et [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) laisse non verrouillé l'ajout d'étoiles sur n'importe quel dépôt avec les identifiants serveur.
- **Action immédiate :** Déjà installé ? Passez directement au [**Plan d'action d'atténuation et de remédiation**](#7-plan-daction-datténuation-et-de-remédiation) (`export DO_NOT_TRACK=1`, blocage `/etc/hosts` pour `ingest.t3.codes`, Managed Policy, `VACUUM` hors ligne et révocation OAuth/jetons).

---

## Table des matières

- [TL;DR (Verdict en 30 secondes)](#tldr-verdict-en-30-secondes)
- [Matrice structurée des constats et des risques](#matrice-structurée-des-constats-et-des-risques)
- [Chronologie (2023–2026)](#chronologie-20232026)
- [1. Conflit d'origine : "Steal Our Code", menace sur le nom d'un fork et deux poids deux mesures](#1-conflit-dorigine--steal-our-code-menace-sur-le-nom-dun-fork-et-deux-poids-deux-mesures)
- [2. Télémétrie, lecture d'identifiants inter-outils et correctifs nocturnes post-RGPD (Volets 1, 7, 11, 12)](#2-télémétrie-lecture-didentifiants-inter-outils-et-correctifs-nocturnes-post-rgpd-volets-1-7-11-12)
- [3. Stockage local, surveillance des processus, contournement de garde-fous et correctifs de sécurité non divulgués (Volets 2, 3, 13)](#3-stockage-local-surveillance-des-processus-contournement-de-garde-fous-et-correctifs-de-sécurité-non-divulgués-volets-2-3-13)
- [4. Risques liés aux conditions d'utilisation de Google Antigravity et relais T3 Connect non chiffré (Volets 4, 5)](#4-risques-liés-aux-conditions-dutilisation-de-google-antigravity-et-relais-t3-connect-non-chiffré-volets-4-5)
- [5. Bilan financier, conflits d'investisseur, sponsors et moteur des 77 000 étoiles (Volets 6, 8, 17, 18)](#5-bilan-financier-conflits-dinvestisseur-sponsors-et-moteur-des-77-000-étoiles-volets-6-8-17-18)
- [6. Gouvernance, bots aspirant les forks, registre des marques, corpus de 1 151 tweets et historique (Volets 9, 10, 14, 15, 16)](#6-gouvernance-bots-aspirant-les-forks-registre-des-marques-corpus-de-1-151-tweets-et-historique-volets-9-10-14-15-16)
- [7. Plan d'action d'atténuation et de remédiation](#7-plan-daction-datténuation-et-de-remédiation)
- [8. Sources primaires et index des 18 volets originaux](#8-sources-primaires-et-index-des-18-volets-originaux)

---

## Matrice structurée des constats et des risques

| Domaine et volets d'audit | Risque / Impact | Principaux constats documentés et preuves sources | Statut (`ca81b7b9`, 25 nov. 14 h 49 CST) | Dossier approfondi |
|---|---|---|---|---|
| **Télémétrie et vie privée post-RGPD**<br>*(Volets 1, 7, 11, 12)* | **Critique** | Télémétrie PostHog par défaut (`PR #174`) alors que la page d'accueil promettait `"No telemetry / Unless you opt in. Full stop."` (`3bdaa6e1` l'a supprimé le 18 juin) ; conservation d'événements bruts via le serveur propriétaire `ingest.t3.codes` (`PR #15028`) ; hachage SHA-256 non salé inter-outils de `~/.codex/auth.json` et `~/.claude.json` (`Identify.ts`, `telemetryId.ts`) ; 4 PR d'opt-out rejetées (`#13458`, `#16763`, `#21248`, `#27077`) ; failles de la Managed Policy (`docs/user/telemetry.md`) ; PR nocturnes post-RGPD reconnaissant **2,2 M/h de spans IP + UA** conservés 30 jours dans Axiom (`#42380`), fuites de chemins `git.cwd` (`#42450`), opt-outs Windows/Mac ignorés (`#42376`, `#42464`), suppression de compte défaillante (`#42285`) et lots anonymes mélangés (`#42466`). | Post-audit, [`#42299`](https://github.com/pingdotgg/t3code/pull/42299) (arrêt des lectures `.codex`/`.claude.json`), [`#42465`](https://github.com/pingdotgg/t3code/pull/42465) (`custom:<driver>`), [`#42630`](https://github.com/pingdotgg/t3code/pull/42630) (opt-out CI) et [`#42629`](https://github.com/pingdotgg/t3code/pull/42629) (`DO_NOT_TRACK`) ont été fusionnées ; **non corrigés à `ca81b7b9` :** `AnalyticsService.ts:156` initialise toujours l'ID sur disque avant de vérifier l'opt-out, `DesktopShellEnvironment.ts` omet toujours `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`, `ingest.t3.codes` fermé reste par défaut, zéro opt-out UI/web, mobile hors Managed Policy, `Publish agent activity` ignore l'opt-out. | [**Dossier 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **Sécurité locale et avis silencieux**<br>*(Volets 2, 3, 13)* | **Critique** | La « suppression définitive » dans la barre latérale ajoutait `"thread.deleted"` dans `statev2.sqlite` (gonflement de 25,9 à 41,6 Go, `#17845`) ; `t3-resource-monitor` balayait tous les processus de l'OS avec leurs lignes de commande (`ProcessesToUpdate::All`, `#11222`, `PR #41889`) ; le mode Claude Auto approuve silencieusement `git push --force` à la 3e tentative (`#15353`, ouvert depuis 52–53+ jours) ; retrait en 21 h du filtre sur les modèles privés pour `slopalytics.com` (`#41237`) ; **0 avis de sécurité GitHub publié** malgré des correctifs discrets (`#39483`, `#41757`, `#42386`, `#42504`) ; bug ouvert sous Windows d'alerte antivirus sur PowerShell en Base64 (`#30997`) ; l'ouverture d'un dépôt non fiable lance automatiquement l'initialisation récursive de `.gitmodules`, omet le `core.hooksPath=/dev/null` global et déclenche les hooks `SessionStart` de Claude avec `GITHUB_TOKEN`/`SSH_AUTH_SOCK` hérités ; `SECURITY.md` déclare intentionnels l'accès `filesystem:read` sur tout l'OS et le HTTP en clair sous iOS. | [`#42119`](https://github.com/pingdotgg/t3code/pull/42119) a fermé `#17845` via une purge asynchrone `thread-content.purge` (conserve l'historique source des forks/merge-back/sous-agents + marqueurs de suppression ; réduire la BDD exige un `VACUUM` hors ligne) ; [`#42577`](https://github.com/pingdotgg/t3code/pull/42577) a restreint les lectures du moniteur sous Windows (Linux/macOS conservent `ProcessesToUpdate::All` et `#41889` reste ouverte) ; **non corrigés à `ca81b7b9` :** `#15353`, `#26489`, `#30997`, hooks de dépôts non fiables et exposition de `SSH_AUTH_SOCK`, **`0` avis de sécurité**, et les limites de `SECURITY.md`. | [**Dossier 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **CGU Antigravity et relais T3 Connect**<br>*(Volets 4, 5)* | **Élevé** | `docs/user/faq.md` garantit la conformité aux CGU de Google Antigravity tandis que `antigravityUsageLimits.ts` extrait les jetons du trousseau OS / Windows `CredReadW`, usurpe `antigravity/hub/2.24.0` et appelle les endpoints privés `v1internal` ; `antigravityAuthSupport.ts` injecte un faux `SSH_CONNECTION` provoquant un routage inter-comptes (`#41973`) ; un compte neuf à 20 $ a été banni en 3 minutes (`#41536`) ; `PR #33800` câble un polling hub CLIProxyAPI usurpant `claude`/`xai`/`antigravity` ; T3 Connect n'a **aucun chiffrement de bout en bout**, `requireConnectDeviceApproval` désactivé par défaut (`#36419`) et une passerelle OVH Caddy terminant le TLS (`PR #32945`) ; les contrôles d'authentification à `ca81b7b9` exposent des cookies `--lan` en clair de 30 jours (`PR #37042` limitée au HTTPS) acceptés même sans `Origin`, des jetons Bearer non-DPoP de 30 jours non révocables, des valeurs `?wsTicket=` d'URL de 5 minutes rejouables et `isIPv4` qui tue les tunnels `::1`. | [`#41210`](https://github.com/pingdotgg/t3code/pull/41210) a ajouté des liens de vérification Google `VALIDATION_REQUIRED` `403` (confirmant des contrôles actifs de Google) ; [`#42311`](https://github.com/pingdotgg/t3code/pull/42311) a ajouté des notifications de connexion depuis un nouvel appareil ; **non corrigés à `ca81b7b9` :** le code d'usurpation/trousseau Antigravity et `cliproxyApi.ts` restent actifs, **aucun E2E sur T3 Connect** (`#32098` / `#32945`), et `requireConnectDeviceApproval` reste à `false` par défaut, ainsi que les failles d'authentification et de tunnel liées aux cookies LAN / jetons Bearer / tickets WS / `::1`. | [**Dossier 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **Modèle économique, sponsors et 77k étoiles**<br>*(Volets 6, 8, 17, 18)* | **Élevé** | Plus de 800 000 $ investis dans un client gratuit (`162` mentions de T3 contre `0` pour les produits payants) ; radar de calcul à **31,7 T tokens/jour** (10,19 M $/jour) monnayé contre plus de 300 000 $ de tokens OpenAI en accès anticipé et l'intérêt de VC ; recoupements d'investisseur providentiel avec Vibe Kanban et Daytona ; pile de sponsors (Clerk, Axiom, exclusivité Vercel) ; exploitation du quota 0 % de Codex (`Endless` / `codex#45444`) ; Gist `CLIProxyAPI` à 10 comptes (`555%` de quota) face à l'avertissement de bannissement de la FAQ ; invite après 5 requêtes / 30 s d'inactivité déclenchant `PUT user/starred/...` avec les identifiants hôtes (`#27832`, `#29922`, `#29987`), contournant Macroscope et laissant non corrigée pendant 19 jours l'absence de verrouillage de dépôt dans `driver.ts#L60-L99`. | Le star non verrouillé dans `driver.ts#L60-L99` et la revue de `zhilsinger` restent **non corrigés à `ca81b7b9`** ; dépôt à 77k+ étoiles pour ~129 watchers. | [**Dossier 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **Gouvernance, marques et historique**<br>*(Origines 1–2, Volets 9, 10, 15, 16)* | **Moyen–Élevé** | 500 commits/jour / 700 agents / `yolo merges` contre `CONTRIBUTING.md` (`"here's my advice: Don't"`), bannissements avec mise au pilori via `.github/VOUCHED.td`, `174` étiquettes `unwanted`, suppression du mode Plan (`#5551`, `#9190`, `#33131`) et insultes sur `#33639` ; aspiration publique de forks par `@bot` (`@MiaAI_lab`), appel à démonétiser par Community Notes et bot de blocage automatique ; **0 enregistrement USPTO** pour `T3 Code`/`T3 Tools`/`T3 Connect` (`PING LABS` `97294243` abandonné ; EquipmentShare `7795672` enregistré) lors de la menace de fermeture sur GitHub ; `PR #41898` ajoutant `TRADEMARK.md` rétroactivement 17 h plus tard ; schéma récurrent 2024–2026 (`vsc-material-but-i-wont-sue-you`, harcèlement de développeurs indiens, prime de 20 000 $ contre FFmpeg, menace de passage en code fermé supprimée le 25 nov. à 4 h). | `CONTRIBUTING.md` / `.github/VOUCHED.td` et `TRADEMARK.md` restent en ligne sur `main` (`ca81b7b9`). | [**Dossier 05**](../dossiers/05-governance-trademark-and-history.md) |
| **Corpus quantitatif de 1 151 tweets**<br>*(Volet 14)* | **Référence d'audit** | Corpus exhaustif du 7 au 24 nov. (`n = 1 151`, 17,24 jours, 66,8 posts/jour, 75,6 % de réponses, écart médian de 2,7 min) : **0,0 % d'injures ou d'insultes** envers 20 dirigeants, chercheurs de grands labos et KOL (`0/43` en `@` direct strict, `32,6 %` de gratitude) contre **8,0 % d'hostilité** envers des développeurs ordinaires (`61/766`) et une **multiplication par 4,0 à 14,4 %** (`19/132`) d'insultes personnelles directes durant la fenêtre de crise de 25 heures visant le fork chinois. | Audit reproductible par expressions régulières avec 4 graphiques forensiques. | [**Dossier 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **Catalogue complet des URL et preuves** | **Référence** | Catalogue intégral et recoupé de **320** URL primaires canoniques `https://` (`SRC-001`–`SRC-320`) et **108** preuves visuelles et graphiques optimisés sans perte (`EV-001`–`EV-108`). | 100 % canonisé (zéro lien `t.co` ; 108/108 ressources indexées). | [**Index des sources**](../COMPLETE-SOURCE-INDEX.md) · [**Index des preuves**](../EVIDENCE-INDEX.md) |

---

## Chronologie (2023–2026)

| Date / Heure | Étape clé | Preuve / Source vérifiable |
|---|---|---|
| **2023-05-14** | `@theo` publie la liste des sponsors de sa chaîne YouTube (`@vercel`, `@clerk`, `@upstash`, `@axiomhq`, `@PlanetScale`). Clerk et Axiom constitueront ensuite l'infrastructure centrale d'authentification et de journalisation de T3 Code. | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | Le PDG de Vercel confirme ne sponsoriser qu'un seul youtubeur (`Theo`) ; `@theo` reconnaît que les contrats de sponsoring comportaient des clauses d'exclusivité interdisant la promotion de concurrents. | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [Vidéo](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(2 ans plus tôt)* | `@theo` crée un fork d'un thème VS Code nommé `vsc-material-but-i-wont-sue-you` pour railler le tempérament de l'auteur initial ; par ailleurs, après qu'une de ses vidéos ciblant des chaînes de tutoriels indiennes a déclenché une vague de harcèlement, il publie une vidéo d'excuses (`I screwed up.`) condamnant les attaques fondées sur la nationalité. | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | L'USPTO rejette l'unique demande de marque de T3 Tools Inc. (`PING LABS`, numéro de série `97294243`) et la déclare `ABANDONED` (19 mai 2025). EquipmentShare enregistre `T3` dans les classes logicielles/SaaS 9 et 42 (`Reg. 7795672`, 13 mai 2025). | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` s'en prend à FFmpeg sur X et offre une **prime de 20 000 $** pour évincer un mainteneur de FFmpeg ; Windscribe surenchérit à 21 000 $, le fondateur de VLC s'y oppose, des développeurs de FFmpeg documentent un harcèlement public et `@theo` supprime la vidéo/les tweets puis retire sa prime. | [Archive FFmpeg](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | La **PR #174** est fusionnée dans `pingdotgg/t3code`, activant la télémétrie PostHog par défaut sans fenêtre de consentement, sans interrupteur dans les réglages et sans documentation. | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` publie *"Github has a fake star problem"*, écrivant que les étoiles GitHub servent `"mostly a way for companies to trick VCs into investing"`. | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | Le **commit `3bdaa6e1`** supprime silencieusement `No telemetry / Unless you opt in. Full stop.` de la page d'accueil de T3 Code après plus de trois mois de collecte par défaut. | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | Le mainteneur Julius ferme l'**Issue #1397** en `not planned` : *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*. | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | L'**Issue #4123** (captures archivées « No telemetry ») est fermée silencieusement le 4 nov. ; 4 PR d'opt-out communautaires (`#13458`, `#16763`, `#21248`, `#27077`) sont rejetées (`#27077` fermée en `unwanted` malgré 147 tests réussis). | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | La **PR #5551** enfouit le sélecteur Build/Plan (`Reality check for those upset`, 10 votes négatifs) ; la **PR #9190** masque la jauge de contexte (16 votes négatifs, record du dépôt). | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` se vante d'avoir extrait **plus de 800 $** au-delà du quota de 0 % de Codex pendant que `@maria_rcks` publie *Endless* ; toutes deux suppriment après le tollé (`2090972426876129658`) ; OpenAI durcit les coupures à 0 % (`openai/codex#45444`). | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | Sont enregistrés l'**Issue #15353** (`git push --force` silencieux en mode Claude Auto, 3 oct.), `privacy-policy.astro` (`2026-10-06`) et l'**Issue #17845** (suppression factice dans `statev2.sqlite`, 10 oct.). | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | La **PR #15028** achemine la télémétrie via `ingest.t3.codes` (code fermé) ; la **PR #21506** ajoute le hachage SHA-256 non salé inter-outils dans `Identify.ts` ; `@theo` publie son Gist `CLIProxyAPI` à 10 comptes (`555%` de quota). | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | Les **PR #27832**, **#29922** et **#29987** déploient la notification de mise en favori après 5 requêtes / 30 s d'inactivité déclenchant `PUT user/starred/...` via les identifiants de l'hôte ; `zhilsinger` dépose un `Request changes` le 6 nov. (sans réponse pendant 19 jours). | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | Aspiration de fork par `@bot` (`@MiaAI_lab`), suppression du mode Plan (`#33131`), divulgation de `800k+$` de dépenses et d'un radar de `31,7T/jour` / `10,19 M$/jour`, `300k+$` de tokens gratuits OpenAI, refonte de `CONTRIBUTING.md`, chevauchements Vibe Kanban/Daytona, et retrait en 21 h du filtre modèle par la `PR #41237`. | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` publie `"Chinese knockoff"` et `"Temu3 Code"` puis menace de faire supprimer le compte GitHub (`2124829315657576890`) ; l'auteur du fork MIT renomme le projet en `Stardust` en 30 minutes ; des excuses suivent en message privé, mais les publications publiques restent en ligne. | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [Origine 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` salue les géants américains pesant des milliers de milliards qui copient du code MIT (`2124989435154726982`), raille les questions juridiques (`"get a better lawyer"`), les publications Origine 1–2 paraissent, et à **12:21 CST** (`04:21Z`, 17 h après la menace de bannissement), `@theo` fusionne la **PR #41898** ajoutant `TRADEMARK.md` rétroactivement. | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | Publication des **Volets 1–5** de l'audit (le Volet 1 dépasse **1,81 M de vues**, 6 640 signets). À `18:39 CST`, `@theo` qualifie la tech chinoise sur Twitter de `"the biggest fucking cesspit"` (`2125177503526588877`) ; à `19:13–19:36 CST`, il affirme que la Managed Policy coupe toute télémétrie (`2125186071357251715`). | [Volet 1](https://x.com/realchendahuang/status/2125153472450527440) → [Volet 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 Nuit – 2026-11-25 ~07:00 CST** | Dépôt d'une plainte formelle au titre du RGPD européen ; un **sprint nocturne de 6 heures** fusionne `#42380` (2,2 M/h de spans IP), `#42285`/`#42430` (suppression de compte), `#42376`/`#42464` (opt-outs Windows/Mac ignorés), `#42450` (fuites de chemins `git.cwd`, 90 min après que Theo a nié collecter des chemins), `#42459`/`#41859` (fuites push), `#42466` (lots anonymes), `#41757`/`#42386`/`#42504` (correctifs de sécurité silencieux). Avant l'aube, `@theo` publie puis supprime une menace de passage en code fermé. | [Volet 11](https://x.com/realchendahuang/status/2125394810559426993) · [Volet 12](https://x.com/realchendahuang/status/2125395501663281198) · [Volet 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | Publication des **Volets 6–18** couvrant le bilan économique, les angles morts de la Managed Policy, les `yolo merges`, l'aspiration par `@bot`, les aveux post-RGPD, le corpus de 1 151 tweets, le registre USPTO, les liens avec les sponsors et l'usine à 77k étoiles. | [Volet 6](https://x.com/realchendahuang/status/2125385742243520653) → [Volet 18](https://x.com/realchendahuang/status/2125416210120765799) |
| **2026-11-25 jusqu'à 14 h 49 CST (`ca81b7b9`)** | Le suivi en amont après la ligne de base (`+259` commits de `9d3195b4` à `ca81b7b9`) vérifie `#42299` (arrêt des lectures `.codex`/`.claude.json`), `#42465` (`custom:<driver>`), `#42577` (restriction du moniteur sous Windows), `#41210` (lien de vérification Antigravity `VALIDATION_REQUIRED`), `#42630` (opt-out des runners CI), `#42629` (`DO_NOT_TRACK`), `#42119` (purge asynchrone des fils fermant `#17845` tout en gardant l'historique forks/sous-agents + marqueurs nécessitant `VACUUM`), `#42311` (notifications de nouvel appareil) et le resserrement `#42356`–`#42415` — tout en confirmant que `AnalyticsService.ts:156`, les omissions OTel de `DesktopShellEnvironment.ts`, `ingest.t3.codes` fermé, `#15353`, `driver.ts#L60-L99`, `0` avis de sécurité et l'absence de chiffrement E2E dans T3 Connect demeurent non corrigés. | [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) |

---

## 1. Conflit d'origine : "Steal Our Code", menace sur le nom d'un fork et deux poids deux mesures

En l'espace de 48 heures, du 23 au 25 novembre 2026, un différend sur le nom d'un fork communautaire sous licence MIT de T3 Code s'est transformé en un audit complet du code source, en une plainte européenne au titre du RGPD et en près de vingt correctifs d'urgence fusionnés durant la nuit.

Entre la soirée du 23 novembre et la matinée du 24 novembre 2026 (heure de Pékin), un internaute s'est plaint en ligne de l'interface d'un fork libre et gratuit sous licence MIT réalisé par un développeur chinois (`@DDdxx666`), en le confondant avec l'application officielle. Sans vérifier si le dépôt était un fork MIT légitime, `@theo` a publié deux messages en onze minutes qualifiant le projet de `"Chinese knockoff"` et `"Temu3 Code"`, a tourné directement le travail de l'auteur en dérision et a menacé de contacter GitHub pour faire suspendre son compte (`"Do it right now or I'm going to contact GitHub and have your account taken down"`). Au même moment, le site web de T3 Code ([`https://t3.codes/`](https://t3.codes/)) intitulait le lien vers son dépôt GitHub `"Steal our code (legally)"` (`"steal our code"`) ([Origine 1](https://x.com/realchendahuang/status/2125059292919394654), [Origine 2](https://x.com/realchendahuang/status/2125062675147448475)).

L'auteur du fork a obtempéré immédiatement, renommant le dépôt en `Stardust` et retirant toute référence à la marque T3 en moins de 30 minutes. `@theo` a présenté ses excuses en privé par message direct, tout en laissant ses deux publications publiques — dépassant ensemble les 200 000 vues — en ligne sans suppression ni mise au point. Moins de onze heures plus tard, à `06:12 BJ` le 24 novembre (`2124989435154726982`), lorsqu'on lui a demandé si des laboratoires américains pesant plusieurs milliers de milliards de dollars franchissaient une limite en copiant des fonctionnalités de T3 Code, il a pris la position exactement inverse : `"Nah. Open source is open source, even if a trillion dollar company uses it!"` Pendant ce temps, `@maria_rcks`, membre de l'équipe T3, hébergeait elle-même un fork public nommé `maria-rcks/t3libre` (*"T3 Code, liberated"*), et des dépôts anglophones tels que `t3code-quota-ui`, `t3code-atlas` et `t3code-bar` fonctionnaient sans aucune menace publique.

![Theo menaçant publiquement de contacter GitHub pour faire bannir l'auteur d'un fork open source](../../evidence/01-origin-theo-threat.png)

![Membre de l'équipe T3 @maria_rcks hébergeant un fork public nommé maria-rcks/t3libre ("T3 Code, liberated")](../../evidence/extra/p1-3-maria-t3libre.png)

À compter de 17 h 04 (heure de Pékin) le 24 novembre, j'ai audité l'historique des commits de `pingdotgg/t3code`, les fichiers sources, les PR, les Issues, la documentation officielle, les dossiers USPTO TSDR et la chronologie publique de `@theo` sur X. En 24 heures, j'ai publié **18 volets documentés** appuyés par des liens directs et des captures d'écran. Le seul Volet 1 a dépassé **1,81 million de vues** et **6 640 signets**, déclenchant un dépôt de plainte RGPD en Europe ainsi qu'un marathon de 6 heures de correctifs nocturnes par l'équipe T3.

---

## 2. Télémétrie, lecture d'identifiants inter-outils et correctifs nocturnes post-RGPD (Volets 1, 7, 11, 12)

> **Audit technique approfondi :** La correspondance complète des lignes de code, la liste des actions de `FeatureUsage.ts`, les angles morts de `DesktopShellEnvironment.ts`, les diffs post-`9d3195b4` et le journal minute par minute des 23–25 nov. figurent dans le [**Dossier 01 : Architecture de télémétrie, corrélation d'identités inter-outils et sprint nocturne post-RGPD des 24–25 nov.**](../dossiers/01-telemetry-and-gdpr-timeline.md).

### 2.1 Télémétrie par défaut, promesse supprimée en vitrine et hachage d'identifiants inter-outils (`Volet 1`)

Le **6 mars 2026**, `pingdotgg/t3code` a fusionné la **PR #174**, activant la télémétrie PostHog par défaut sans documentation sur la télémétrie dans le dépôt, sans invite de consentement au premier lancement et sans interrupteur dans l'interface des réglages. La variable d'environnement de désactivation est restée enfouie dans le code tandis que les installations par défaut commençaient à émettre des événements immédiatement ([Volet 1](https://x.com/realchendahuang/status/2125153472450527440)).

Pendant plus de trois mois de collecte par défaut, la page d'accueil de T3 Code affichait bien en vue deux lignes : `No telemetry / Unless you opt in. Full stop.` Le **18 juin 2026**, `@theo` a supprimé silencieusement ces deux lignes lors d'une refonte de la page d'accueil ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) sans annonce ni notification aux utilisateurs existants.

![Le commit 3bdaa6e1 du 18 juin 2026 supprimant silencieusement la promesse "No telemetry / Unless you opt in. Full stop." de la page d'accueil](../../evidence/02-no-telemetry-removed.png)

En octobre 2026, `@theo` a fusionné la **PR #15028**, acheminant des envois groupés toutes les 10 secondes (`FLUSH_INTERVAL_MS = 10_000`) via la passerelle propriétaire [`https://ingest.t3.codes/`](https://ingest.t3.codes/). La ligne 1 de [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) indique explicitement que ce point de collecte conserve une copie de chaque événement brut avant de le transmettre à PostHog :

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149 at 9d3195b4; line 156 at ca81b7b9)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

Les champs recueillis dans [`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) et `FeatureUsage.ts` comprenaient le fournisseur, le modèle sélectionné (à `9d3195b4`, en transmettant verbatim les identifiants de modèles/endpoints personnalisés hors catalogue via [`ProviderDimensions.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts)), l'effort de raisonnement, le mode de permission, la durée des exécutions, les volumes de tokens d'entrée/sortie/cache/raisonnement, les tokens des sous-agents, le nombre de projets et de fils locaux, **35 actions distinctes d'interface et de commande** (`18` `COMMAND_FEATURES` + `17` `METHOD_FEATURES`), les informations système, la distribution WSL et l'architecture matérielle.

Le **19 octobre 2026**, `@theo` a enchaîné avec la **PR #21506** pour comptabiliser combien de machines appartenaient à une même personne. À la base de référence `9d3195b4`, [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) lisait discrètement les fichiers d'identifiants d'autres outils d'IA dans le répertoire personnel de l'utilisateur — `~/.codex/auth.json` et `~/.claude.json` — décodant le champ JWT `user_id` d'OpenAI ainsi que `oauthAccount.accountUuid` de Claude, et les hachait aux côtés de l'identifiant utilisateur T3 Connect lié et de l'identifiant machine (retiré ensuite par la [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299), tandis que le hachage non salé des identifiants `connect` et `device` demeure) :

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338 at baseline 9d3195b4)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

Et dans [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (lignes 8–9), `hashTelemetryId` calcule un **condensat SHA-256 non salé** (`Hex.encode(sha256(new TextEncoder().encode(value)))`). Comme le serveur détient déjà les identifiants de compte T3 Connect en clair issus de Clerk, hacher les valeurs en clair côté backend permet de remonter directement d'un condensat non salé à une personne identifiée ; de même, des identifiants OpenAI ou Claude ayant fuité se recoupent de manière déterministe sur le même hash.

![Identify.ts lisant ~/.codex/auth.json et ~/.claude.json pour envoyer des hachages SHA-256 non salés à des fins d'attribution inter-appareils](../../evidence/03-identify-codex-claude.png)

Les contestations de la communauté ont été systématiquement écartées. Le **23 juin**, un développeur a ouvert l'**Issue #1397** demandant un bouton dans les paramètres ; le mainteneur principal Julius l'a fermée en `not planned` : `We will not make this easier to opt out of, it is crucial for us to know how many users we have`. En juillet, un utilisateur a publié des captures archivées de la page d'accueil dans l'**Issue #4123** pointant la promesse rompue (`"No telemetry"`), fermée via un commit sans rapport par le compte de `@theo` le 21 octobre, rouverte après un tollé, puis refermée discrètement le 4 novembre. Entre septembre et novembre, des contributeurs ont soumis **quatre PR distinctes d'opt-out** (`#13458`, `#16763`, `#21248`, `#27077`). Même la `#27077` — vérifiée sur matériel réel avec **147 tests réussis** et approuvée par Macroscope — a été fermée le **17 novembre** avec l'étiquette `unwanted`.

<details>
<summary>Afficher 2 preuves de rejet d'opt-out (Issue #1397 &amp; PR #27077)</summary>

![Le mainteneur principal Julius fermant l'Issue #1397 en not planned et déclarant qu'ils ne faciliteront pas la désactivation](../../evidence/04-issue1397-no-optout.png)

![La PR #27077 fermée sans fusion comme unwanted malgré 147 tests réussis et l'approbation de Macroscope](../../evidence/extra/t3code-4-pr-27077-rejected.png)

</details>

### 2.2 Contradiction entre la Managed Policy et la documentation (`Volet 7`)

Le 24 novembre, alors que les critiques montaient, `@theo` a affirmé sur X que T3 Code disposait de la meilleure Managed Policy d'entreprise du secteur (`"trivial to set up and turn off all telemetry"`) et que les conversations restaient sur disque et `"never touches any of our servers"` ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715), [`2125191784859115766`](https://x.com/theo/status/2125191784859115766), [Volet 7](https://x.com/realchendahuang/status/2125391659492081947)).

L'examen direct de [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) et [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) démontre le contraire :
1. **Configuration réservée aux administrateurs :** Les utilisateurs bureau ne disposent toujours d'aucun interrupteur dans Settings. Désactiver la télémétrie via Managed Policy exige un MDM/GPO ou l'écriture de `policy.json` dans des chemins protégés par les droits administrateur (`/Library/Application Support/T3Code/policy.json` sous macOS, `C:\Program Files\T3Code\policy.json` ou `HKLM\SOFTWARE\Policies\T3Tools\T3Code` sous Windows, `/etc/t3code/policy.json` sous Linux).
2. **Angle mort de l'application web hébergée (`app.t3.codes`) :** `docs/user/telemetry.md` reconnaît explicitement que l'application navigateur ne lit pas les variables d'environnement du serveur, ignore la Managed Policy, envoie des traces de connexion lorsqu'elle est compilée avec le traçage et `"has no relay tracing toggle"`.
3. **Applications mobiles hors périmètre :** Les variables d'environnement serveur et la Managed Policy `"do not disable mobile tracing"` (la `PR #42415` nocturne a ajouté un interrupteur mobile **Send connection traces**, tout en laissant les variables d'environnement serveur et la Managed Policy incapables de désactiver le traçage mobile).
4. **`Publish agent activity` ignore les opt-outs :** Lorsqu'il est activé sur un hôte, les titres de projets, les titres de fils, les noms de modèles et l'état d'activité en direct partent vers le relais T3 Connect — et `"The telemetry opt-out does not disable it."` (De plus, les spans Axiom en erreur et les journaux de plantage mobile `"can quote a value the app was handling"`, tandis que `Agent feedback` peut joindre jusqu'à 16 Ko de messages de conversation.)

![Documentation officielle docs/user/telemetry.md confirmant que l'app web hébergée n'a pas d'interrupteur, que le mobile échappe à la Managed Policy et que la publication d'activité d'agent ignore l'opt-out de télémétrie](../../evidence/05-telemetry-cant-disable.png)

<details>
<summary>Afficher la preuve des chemins administrateur de la Managed Policy (docs/user/managed-policy.md)</summary>

![Documentation officielle docs/user/managed-policy.md listant les chemins système protégés par droits administrateur sous macOS, Windows et Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

</details>

### 2.3 La mise au point du 25 novembre contredite en moins de 2 heures (`Volet 11`)

Le matin du 25 novembre, `@theo` a publié une longue mise au point ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) accompagnée d'un export public de télémétrie ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)) formulant trois assurances fermes — suivies d'une réponse niant toute écriture locale de pistage après opt-out ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([Volet 11](https://x.com/realchendahuang/status/2125394810559426993)) :

- **« Jamais collecté de chemins de fichiers » (`"Never collected file paths"`) :** 90 minutes plus tard, Julius fusionnait la **PR #42450**, reconnaissant que les exécutions déclenchées par webhook via le relais exportaient l'intégralité des spans d'exécution vers Axiom — y compris des spans Git transportant `git.cwd` (**chemin absolu de l'espace de travail, nom d'utilisateur OS et nom du dépôt**).
- **« Les variables d'environnement ont toujours désactivé la télémétrie proprement » :** La **PR #42376** a confirmé que l'application bureau Windows ignorait la variable utilisateur enregistrée `T3CODE_TELEMETRY_ENABLED=false` lorsqu'elle était lancée depuis des processus préexistants, tandis que la **PR #42464** a confirmé que le traçage du relais au premier lancement sous macOS/Linux s'initialisait avant la découverte du shell, ignorant les opt-outs de `~/.zshrc` pendant toute la session. ([`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omet encore à `ca81b7b9` de transmettre `T3CODE_OTEL_SDK_DISABLED` et `OTEL_SDK_DISABLED`.)
- **« Aucun fichier de suivi écrit après opt-out » et « Les hashes Claude étaient cassés » :** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 149` à `9d3195b4`, `line 156` à `ca81b7b9`) appelle toujours `getTelemetryIdentity` sans condition au démarrage, écrivant l'ID d'installation local (`upsertAnonymousId`) avant de vérifier `telemetryEnabled`. Pendant ce temps, l'inspection de l'en-tête gzip de l'archive d'environ 100 Mo publiée par `@theo` (`6 056 594` octets compressés, `95 789` événements) révélait un nom de fichier d'origine `events.clean.jsonl` généré 20 minutes avant son tweet — mais contenant encore **264 enregistrements de comptes Claude actifs** reliant **4 machines distinctes** (`installId`) exactement au même hash SHA-256 le 20 octobre, aux côtés de noms verbatim de modèles proxy privés (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

![La PR #42450 confirmant que les exécutions déclenchées par relais exportaient auparavant vers Axiom les chemins absolus git.cwd contenant noms d'utilisateur et noms de dépôts](../../evidence/06-pr42450-absolute-path.jpg)

<details>
<summary>Afficher 3 autres preuves de la mise au point du 25 nov. et du dump de 100 Mo (PR #42376, PR #42464, events.clean.jsonl)</summary>

![La PR #42376 admettant que l'application bureau Windows ignorait la variable d'environnement utilisateur T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![La PR #42464 admettant que le traçage relais au premier lancement sous macOS ignorait les opt-outs de ~/.zshrc durant toute la session](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Audit forensique de l'archive publique events.clean.jsonl de Theo montrant 264 enregistrements Claude reliant 4 machines et des noms verbatim de modèles proxy personnalisés](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

</details>

### 2.4 Le blitz nocturne de 6 heures post-RGPD (`Volet 12`)

Après le dépôt d'une plainte formelle au titre du RGPD européen dans la nuit du 24 novembre, des PR d'urgence fusionnées pendant la nuit ont mis au jour quatre révélations plus profondes sur la vie privée ([Volet 12](https://x.com/realchendahuang/status/2125395501663281198)) :

1. **2,2 M/h de spans relais marqués par IP (`PR #42380`) :** Admet que chaque span de requête relais exporté vers Axiom — environ **2,2 millions de spans par heure, conservés pendant 30 jours** — journalisait `client.address` (IP du client extraite de `cf-connecting-ip`) et `user_agent.original` juste à côté de `user.id` (tout en précisant que les journaux d'invocation Cloudflare Workers à 1 % demeuraient distincts). Trois heures et demie après la fusion, `@theo` répondait encore que les adresses IP avaient déjà été retirées.
2. **Suppression de compte incomplète (`PR #42285` et `PR #42430`) :** Admet que la suppression d'un utilisateur dans Clerk laissait auparavant intactes les lignes relais dans PlanetScale et les tunnels Cloudflare actifs jusqu'à ce qu'une demande d'effacement oblige à exécuter **du SQL écrit à la main et une fermeture manuelle des tunnels**.
3. **Fuites dans les notifications push mobiles (`PR #42459` et `PR #41859`) :** Les notifications Android FCM envoyaient en clair l'identifiant `user_id` Clerk à Google à chaque notification ; les spans et erreurs des requêtes push iOS journalisaient les URL complètes de notification contenant les jetons d'appareil.
4. **Retours « anonymes » mélangés (`PR #42466`) :** Admet que les événements `agent.feedback`, présentés comme anonymes, étaient regroupés dans le même POST HTTP aux côtés d'événements identifiés par `installId` et des empreintes complètes de l'hôte (OS, architecture, distribution WSL brute), en contradiction avec `docs/user/telemetry.md`. Parallèlement, `privacy-policy.astro` restait inchangé depuis le 6 octobre.

![La PR #42380 révélant que les spans relais journalisaient les adresses IP réelles des appelants et le User-Agent à côté de user.id au rythme de 2,2 M spans/heure pendant 30 jours dans Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

<details>
<summary>Afficher 3 autres preuves nocturnes post-RGPD (PR #42285, PR #42459, PR #42466)</summary>

![La PR #42285 admettant que la suppression de compte laissait auparavant les lignes relais et les tunnels Cloudflare actifs jusqu'à ce qu'une demande d'effacement nécessite du SQL manuel](../../evidence/09-pr42285-delete-account-leftover.jpg)

![La PR #42459 admettant que les notifications push Android FCM envoyaient les valeurs brutes Clerk user_id à Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![La PR #42466 admettant que le feedback anonyme était groupé dans le même POST aux côtés de l'installId et des empreintes d'hôte](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

</details>

### 2.5 Mises à jour post-audit sur la télémétrie et l'identité (`9d3195b4` → `ca81b7b9`)

Le suivi en amont de `pingdotgg/t3code` jusqu'à `ca81b7b9` (`2026-11-25 14:49 CST`) confirme quatre fusions ciblées réduisant le périmètre de télémétrie aux côtés de lacunes fondamentales toujours non corrigées :

- **Fusionné après `9d3195b4` :**
  - [**PR #42299**](https://github.com/pingdotgg/t3code/pull/42299) ([`84e4264b`](https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07)) : cesse de lire `~/.codex/auth.json` et `~/.claude.json` dans `Identify.ts` (le hachage SHA-256 non salé des identifiants propriétaires `connect` `CLOUD_LINKED_USER_ID` et `device` demeure).
  - [**PR #42465**](https://github.com/pingdotgg/t3code/pull/42465) ([`6b3899f2`](https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da)) : modifie `modelLabel` dans `ProviderDimensions.ts` (`lines 66–72`) pour émettre `custom:<driver>` pour les modèles hors catalogue (les modèles catalogue/fournisseur continuent d'émettre leurs identifiants même derrière des endpoints personnalisés).
  - [**PR #42630**](https://github.com/pingdotgg/t3code/pull/42630) ([`c925b9ab`](https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b)) : ajoute `isCiEnvironment` sur 13 variables d'environnement CI dans [`otelEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts) (`lines 322–343`), désactivant par défaut `AnalyticsService` (`line 130`) et `isRelayTracingEnabled` sur les runners CI sauf surcharge explicite.
  - [**PR #42629**](https://github.com/pingdotgg/t3code/pull/42629) ([`ef4a1643`](https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64)) : respecte `DO_NOT_TRACK` (`isDoNotTrackSet` dans `otelEnvironment.ts:346-347`), vérifié dans `AnalyticsService.ts:137` et `isRelayTracingEnabled` (`otelEnvironment.ts:357`), et transmis par [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) et [`DesktopBackendConfiguration.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts) (l'emporte sur `T3CODE_TELEMETRY_ENABLED=true`).
  - Les PR complémentaires de resserrement [**#42356**](https://github.com/pingdotgg/t3code/pull/42356), [**#42394**](https://github.com/pingdotgg/t3code/pull/42394), [**#42397**](https://github.com/pingdotgg/t3code/pull/42397), [**#42398**](https://github.com/pingdotgg/t3code/pull/42398) et [**#42415**](https://github.com/pingdotgg/t3code/pull/42415) ont restreint le traçage navigateur ouvert par le serveur, les identifiants/l'interrupteur mobile, les énumérations d'erreurs MCP et la liaison d'`installId` dans `agent.feedback`.
- **Non corrigé à `ca81b7b9` :** [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`line 156`, auparavant `line 149` à `9d3195b4`) exécute toujours `getTelemetryIdentity` (`upsertAnonymousId`) sans condition au démarrage **avant** de vérifier `telemetryEnabled` ; `DesktopShellEnvironment.ts` omet toujours `OTEL_SDK_DISABLED` et `T3CODE_OTEL_SDK_DISABLED` ; le point de collecte propriétaire `ingest.t3.codes` reste par défaut ; il n'existe toujours aucun interrupteur dans Settings ni d'opt-out sur `app.t3.codes` ; le mobile reste hors Managed Policy ; `Publish agent activity` ignore les opt-outs ; et `privacy-policy.astro` reste daté du `2026-10-06`.

---

## 3. Stockage local, surveillance des processus, contournement de garde-fous et correctifs de sécurité non divulgués (Volets 2, 3, 13)

> **Audit technique approfondi :** Les requêtes SQL verbatim de purge SQLite, les appels Rust `sysinfo`, les lignes de permission de `ClaudeAdapterV2.ts`, les diffs post-`9d3195b4` et l'analyse complète du périmètre de `SECURITY.md` figurent dans le [**Dossier 02 : Sécurité locale, contournements silencieux d'exécution de code et audit de sécurité non divulgué**](../dossiers/02-local-safety-and-security-audit.md).

### 3.1 Suppression factice dans SQLite et balayage intégral des processus machine (`Volet 2`)

Lorsqu'un utilisateur supprime un fil de discussion dans la barre latérale, la fenêtre de confirmation (`useThreadActionMenu.ts`) promet : `"This permanently clears conversation history for this thread."` À la base de référence `9d3195b4`, `ThreadDeletion.ts` se contentait d'ajouter un événement `"thread.deleted"` dans `statev2.sqlite`, et `ProjectionMaintenance.ts` épargnait `thread.created` ainsi que les événements les plus récents du flux (`MAX(newer.sequence)`) tout en conservant les événements antérieurs. Des utilisateurs ont signalé un gonflement de `statev2.sqlite` atteignant **25,9 Go** en trois semaines (90 % de fils « supprimés »), **41,6 Go** en six semaines et **33 Go** en sept semaines — laissant l'**Issue #17845** (et la **#28903**) sans correctif depuis le 10 octobre ([Volet 2](https://x.com/realchendahuang/status/2125160473176023486)).

Le 25 novembre, la [**PR #42119**](https://github.com/pingdotgg/t3code/pull/42119) ([`91f0b32e`](https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e), `2026-11-25T05:58:26Z`) a fermé l'**Issue #17845** en ajoutant un nettoyage asynchrone via la boîte d'envoi `thread-content.purge` (`ThreadDeletion.ts`, `ProjectionMaintenance.ts`). Cependant, l'inspection à `ca81b7b9` montre que les fils sources supprimés conservent leur historique tant qu'ils sont référencés par un fork actif, un `merge_back` en attente ou un sous-agent parent actif ; les lignes de métadonnées marqueurs de suppression restent dans SQLite ; et la réduction effective du fichier `.sqlite` sur disque requiert toujours l'exécution d'un `VACUUM` hors ligne.

![L'Issue #17845 signalant que les fils supprimés définitivement restent dans statev2.sqlite, faisant enfler les disques de plusieurs dizaines de gigaoctets](../../evidence/10-issue17845-fake-delete.png)

Un utilitaire Rust en arrière-plan, `t3-resource-monitor` (**Issue #11222**, `native/resource-monitor/src/main.rs` appelant `ProcessesToUpdate::All` avec `with_cmd(UpdateKind::Always)`), balayait chaque processus de la machine toutes les 5 secondes même lorsque les diagnostics étaient fermés — ouvrant environ 280 à 300 descripteurs persistants sur plus de 440 applications et jeux sans rapport sous Windows sans aucun opt-out, alors que la documentation affirmait que l'échantillonnage ne fonctionnait qu'en présence d'abonnés actifs. Ce n'est que le **24 novembre** que la **PR #41889** a confirmé que les diagnostics de processus capturaient **l'intégralité des arguments de ligne de commande des processus** — lesquels contiennent fréquemment des clés API, des mots de passe de bases de données et des jetons d'authentification en clair — dans la télémétrie en direct et les instantanés d'historique. Post-audit, la [**PR #42577**](https://github.com/pingdotgg/t3code/pull/42577) ([`af276ccb`](https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c), `2026-11-25T04:09:53Z`) a empêché `t3-resource-monitor` sous Windows de lire la mémoire et les lignes de commande des processus non suivis, tandis que Linux et macOS utilisent toujours la découverte en deux étapes `ProcessesToUpdate::All` et que la `PR #41889` reste ouverte.

<details>
<summary>Afficher la preuve Issue #11222 de surveillance intégrale des processus machine</summary>

![L'Issue #11222 documentant t3-resource-monitor en train de balayer tous les processus de la machine](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

</details>

Parmi les autres défauts locaux vérifiés dans le Volet 2 figurent :
- **Fuites de noms d'hôtes internes via favicon :** Les requêtes frontend envoyaient des noms d'hôtes internes (p. ex. `devbox.localdomain`) à l'API de favicons de Google (`PR #16950`, `PR #32657`).
- **Requête réseau obligatoire au démarrage :** Même avec la télémétrie désactivée, le démarrage du serveur télécharge sans condition des manifestes de compatibilité depuis [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) sans aucun opt-out (**Issue #36479**).
- **Contournements d'approbation et de politique :** Correctifs pour des contournements de permissions full-access et WSL/Tailscale (`PR #21806`, `PR #27322`).
- **Consommation x1,7 du quota Claude et surconsommation électrique x136 :** Piloter Claude via l'Agent SDK épuisait les quotas de 5 heures **1,7 fois** plus vite que la normale jusqu'à début novembre (`Issue #7338`, `Issue #24649`, 81 commentaires) ; des bugs GPU/énergie atteignaient **136 fois** la consommation d'applications Electron comparables — dont un GPU 19 cœurs de MacBook bloqué à **60 W** vidant la batterie en 78 minutes et **18 W** après fermeture de l'onglet web (`Issue #3143`, `Issue #40581`).

### 3.2 `git push --force` silencieux pendant 52 jours contre retrait en 21 heures du filtre de confidentialité des modèles (`Volet 3`)

À partir du **3 octobre** — et **toujours non corrigé à `ca81b7b9`** dans l'**Issue #15353** ([commentaire](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)) — le mode Claude Auto a exécuté silencieusement des commandes dangereuses (`ClaudeAdapterV2.ts` court-circuitant `!requiresClaudeApproval(context)` vers `"allow"`). Même sans aucune règle personnalisée, après que le classifieur de Claude eut bloqué `git push --force origin main` à deux reprises et escaladé la troisième tentative pour validation manuelle, T3 Code l'a approuvé silencieusement sans aucune boîte de dialogue et a journalisé `"source": "user_temporary"`. Deux PR correctives de la communauté (`#15360`, `#35207`) ont été laissées sans relecture jusqu'à leur fermeture automatique par des bots, tandis que la `#40692` restait en attente ([Volet 3](https://x.com/realchendahuang/status/2125201882687881378)).

![L'Issue #15353 ouverte depuis plus de 52 jours montrant le mode Claude Auto approuvant silencieusement git push --force sans invite](../../evidence/11-issue15353-auto-force-push.png)

À l'inverse, le **22 novembre**, l'**Issue #40948** signalait que de nouveaux modèles n'apparaissaient pas sur le classement public de télémétrie de `@theo` [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) parce que la `PR #29001` restreignait le signalement à une liste blanche. En **21 heures**, la **PR #41237** était fusionnée sous le compte de `@theo`, mentionnant explicitement que Theo en avait demandé le retrait — envoyant verbatim `ollama/acme-internal` et des noms de déploiement d'entreprise `acme-azure-deployment` vers l'analytique (restreint par la suite aux modèles hors catalogue sous la forme `custom:<driver>` dans la `PR #42465`, tandis que les identifiants des modèles catalogue/fournisseurs continuent d'être remontés même derrière des endpoints personnalisés).

<details>
<summary>Afficher la preuve du retrait du filtre en 21 heures par la PR #41237 (slopalytics.com)</summary>

![La PR #41237 fusionnée 21 heures après l'Issue #40948 supprimant le filtrage des modèles pour slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

</details>

### 3.3 Zéro avis de sécurité, correctifs de vulnérabilités silencieux et `SECURITY.md` (`Volet 13`)

Au 25 novembre (`ca81b7b9`), l'onglet [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) de `pingdotgg/t3code` affiche **0 avis publié** ([Volet 13](https://x.com/realchendahuang/status/2125395980354994414)). Pourtant, les mainteneurs ont fusionné discrètement des correctifs de haute gravité sans avertir les utilisateurs existants :
- **Correctifs de sécurité fusionnés en silence :** `PR #39483` (traversée de chemin dans `ServerSecretStore` via `jti`/`nonce` du relais avant approbation de l'appareil), `PR #41756` (fuites inter-domaines de jetons GitHub/GitLab d'entreprise), `PR #41886`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41757` et `PR #42386` (isolation de l'aperçu navigateur bureau sans bac à sable / confirmation des commandes de disposition de worktree), [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413) (permissions réservées au propriétaire sur le fichier de jeton Clerk bureau), ainsi que `PR #42504` (correctif d'environ 3 000 lignes ajoutant enfin des invites de confirmation pour des configurations de dépôts non fiables qui exécutaient auparavant des commandes locales sans validation).
- **Éléments de sécurité non résolus / ouverts à `ca81b7b9` :** `Issue #26489` (risques de traversée de chemin externe / liens symboliques), `PR #36216`, `PR #23428`, `PR #33144` et `PR #30997` (lanceur Windows `externalLauncher.ts` exécutant `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` détecté par AVG/Avast comme `IDP.HELU.PSE96`), ainsi que les risques d'exécution liés aux dépôts non fiables ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) exécutant automatiquement une initialisation récursive de `.gitmodules`, [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) omettant le `core.hooksPath=/dev/null` global, et [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) lançant les hooks `SessionStart` de `.claude/settings.json` avec l'intégralité de `GITHUB_TOKEN` et `SSH_AUTH_SOCK` hérités).
- **[`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) rédigé à la hâte (`PR #38812`, `PR #41942`) :** Déclare toujours la lecture `filesystem:read` sur l'ensemble de l'OS hors des espaces de travail, le transport HTTP en clair sur iOS/LAN et la prise de contrôle complète de la machine via une clé de signature de relais compromise comme des **limites de conception intentionnelles** plutôt que des vulnérabilités, tandis que [`https://ingest.t3.codes/`](https://ingest.t3.codes/) demeure propriétaire (`2125370330244128924`).

<details>
<summary>Afficher 3 preuves sur la sécurité silencieuse et SECURITY.md (PR #39483, PR #30997, SECURITY.md)</summary>

![La PR #39483 corrigeant silencieusement une traversée de chemin dans ServerSecretStore sans avis de sécurité](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![La PR #30997 ouverte pour corriger les lancements PowerShell Windows en Base64 EncodedCommand signalés comme malveillants](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md marquant explicitement les lectures sur tout l'OS, le HTTP arbitraire sous iOS et la prise de contrôle machine par clé de relais comme des frontières intentionnelles](../../evidence/extra/x-post05-4-security-md-intended.jpg)

</details>

---

## 4. Risques liés aux conditions d'utilisation de Google Antigravity et relais T3 Connect non chiffré (Volets 4, 5)

> **Audit technique approfondi :** Les tableaux complets d'en-têtes de `cliproxyApi.ts` (`PR #33800`), `AntigravityAcpSupport.ts`, `AntigravityTurnOutcome.ts`, `contracts/src/settings.ts` et les références de lignes de `ManagedEndpointProvider.ts` figurent dans le [**Dossier 03 : Usurpation vis-à-vis des CGU Google Antigravity, `PR #33800` et architecture du relais T3 Connect**](../dossiers/03-antigravity-tos-and-t3connect-relay.md).

### 4.1 Usurpation d'en-têtes Google Antigravity, faux `SSH_CONNECTION` et bannissements en 3 minutes (`Volet 4`)

La documentation officielle [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) de T3 Code assure aux utilisateurs payants : *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* Lorsque des utilisateurs ont signalé des bannissements dans l'**Issue #40713**, un mainteneur a nié appeler le backend d'Antigravity ou réutiliser des jetons, affirmant que toutes les requêtes provenaient de la CLI officielle de Google — avant que des développeurs (`schlessera`) ne réfutent cette affirmation à partir des propres fichiers sources de T3 Code ([Volet 4](https://x.com/realchendahuang/status/2125213397507858657)) :

1. **User-Agent usurpé, extraction du trousseau et appels `v1internal` ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)) :** Extrait les identifiants Google OAuth depuis des fichiers locaux, `@napi-rs/keyring` ou le Gestionnaire d'identification Windows (`CredReadW` via `ffi-rs` sur `advapi32.dll`), code en dur la chaîne cliente interne de Google et envoie des `POST` directement vers le backend non documenté `v1internal` de Google ([lignes 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)). Le personnel de Google a confirmé sur le [forum officiel des développeurs](https://discuss.ai.google.dev/t/185992) que la section 6 des [CGU de Google Antigravity](https://antigravity.google/terms) interdit aux outils tiers d'extraire ou de réutiliser des identifiants pour interroger directement le backend :

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

2. **Injection d'un faux `SSH_CONNECTION` et mélange de comptes ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)) :** Comme la CLI de Google isole une session unique dans le trousseau de l'OS, T3 injecte une variable d'environnement `SSH_CONNECTION` falsifiée pour tromper la CLI et l'amener à écrire localement des fichiers de jetons en clair. Lorsque Google a mis à jour sa CLI le 24 novembre en supprimant ce repli, l'**Issue #41973** a confirmé que des requêtes du compte A étaient routées silencieusement vers le compte B :

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **Bannissement en 3 minutes d'un compte neuf (`Issue #41536`), usurpation de client (`PR #26876`) et déclencheurs de vérification post-audit (`PR #41210`) :** Le 23 novembre, l'**Issue #41536** a documenté le cas d'un abonnement Google AI à `20 $` fraîchement souscrit fonctionnant avec **zéro proxy** — uniquement Antigravity géré à l'intérieur de T3 Code — banni dès son **tout premier message, 3 minutes après la configuration** (Google n'accorde aux comptes personnels qu'un seul recours ; les mainteneurs ont fermé l'issue comme doublon sans ajouter d'avertissement). Plus tôt, `@theo` a personnellement fusionné la **PR #26876** déguisant T3 Code en `"zed"` ([`AntigravityAcpSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts)) pour contourner les listes blanches de modèles. Bien que `@theo` ait dessiné `T3 Code -> Antigravity binary ✅` le 23 novembre ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) et rejeté la faute sur CLIProxy lorsque le deuxième compte Google AI Ultra de l'utilisateur `@Only_21Mil` a été désactivé ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397)), la [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) fusionnée câble nativement l'interrogation hub [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) avec des en-têtes usurpés `claude-code/2.1.273`, `grok-cli/1.0.77` et `antigravityUserAgent`.
   - **Statut post-audit (`ca81b7b9`) :** La [**PR #41210**](https://github.com/pingdotgg/t3code/pull/41210) ([`3e74a0aa`](https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836), `2026-11-25T05:23:36Z`) a ajouté dans [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) l'analyse des réponses `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) de `cloudcode-pa.googleapis.com` pour afficher des liens directs de vérification du compte Google dans la chronologie des tours — confirmant des déclencheurs de vérification Google actifs — tandis que la [**PR #42545**](https://github.com/pingdotgg/t3code/pull/42545) ([`4da8d19d`](https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc)) a corrigé `AGY_CLI_DISABLE_AUTO_UPDATE: "true"` (aux côtés des PR [`#42339`](https://github.com/pingdotgg/t3code/pull/42339) et [`#42475`](https://github.com/pingdotgg/t3code/pull/42475)). Les quatre chemins d'usurpation/extraction — [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts), [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts), `AntigravityAcpSupport.ts` et `cliproxyApi.ts` — restent intacts à `ca81b7b9`.

![antigravityUsageLimits.ts codant en dur des en-têtes clients Google usurpés et appelant le backend non documenté v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

<details>
<summary>Afficher 3 autres preuves d'usurpation et de bannissement Antigravity (SSH_CONNECTION, Issue #41536, PR #33800)</summary>

![antigravityAuthSupport.ts injectant une fausse variable d'environnement SSH_CONNECTION pour contourner le stockage dans le trousseau de l'OS](../../evidence/13-antigravity-ssh-spoof.png)

![L'Issue #41536 documentant un compte Google neuf à 20 $ sans proxy banni trois minutes après l'installation dès son premier message, fermé comme doublon](../../evidence/14-issue41536-fresh-ban.png)

![La PR #33800 intégrant directement l'interrogation du hub CLIProxyAPI pour Antigravity, xAI et Claude dans T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

</details>

### 4.2 T3 Connect : zéro chiffrement de bout en bout et passerelle OVH à terminaison TLS (`Volet 5`)

**T3 Connect ne dispose d'aucun chiffrement de bout en bout — chaque prompt, fichier source et sortie terminal est techniquement visible en clair pour T3** ([Volet 5](https://x.com/realchendahuang/status/2125218189596676555)). Actuellement, [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) provisionne des tunnels et des enregistrements DNS Cloudflare au sein du propre compte Cloudflare de T3 (`06_t3-connect.md`). Le TLS se termine à la périphérie de Cloudflare sans aucun chiffrement de la charge utile ; l'attachement d'une route Workers permet de capter tout le trafic sans modifier le code et sans alerter le client.

L'approbation des nouveaux appareils (`requireConnectDeviceApproval` ajoutée dans la [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419)) vaut toujours **`false`** par défaut dans [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426` à `ca81b7b9`), même après que la [**PR #42311**](https://github.com/pingdotgg/t3code/pull/42311) ([`ece5f21b`](https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd)) post-audit a ajouté des notifications de connexion depuis un nouvel appareil. Comme le reconnaît [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md), une clé de signature relais divulguée ou un compte cloud compromis peut émettre directement des sessions vers une machine liée — ce qui équivaut à un shell local. Par ailleurs, l'inspection du code source de `ca81b7b9` ([Dossier 03](../dossiers/03-antigravity-tos-and-t3connect-relay.md)) confirme quatre failles supplémentaires d'authentification / LAN / tunnel : `t3 up --lan` émet toujours des cookies de shell de 30 jours sans `Secure` ([`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042), [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221), [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493)) et accepte les requêtes omettant `Origin` ([`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)) ; les échanges `/oauth/token` non-DPoP émettent des jetons Bearer de 30 jours non liés et non révocables, sans route `/logout` et avec auto-révocation bloquée ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186), [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511), [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)) ; les jetons de requête `?wsTicket=` de 5 minutes n'offrent aucune protection contre le rejeu pour le RPC Bearer ni pour aucune des routes `media` ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622), [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156)) ; et [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) classe `::1` à tort via `NodeNet.isIPv4`, appelant silencieusement `socket.destroy()` sur les tunnels Tailscale Serve / Connect. Lorsque l'**Issue #32098** a demandé une authentification mutuelle et un chiffrement E2E, un mainteneur l'a fermée en affirmant qu'un chiffrement E2E complet représentait un changement trop important ; les discussions `#21286` et `#37831` restent sans réponse, et le 25 novembre `@theo` a déclaré le chiffrement E2E impossible (`2125370330244128924`).

Les factures de Cloudflare Tunnels ayant atteint **25 000 $ par mois**, `@theo` a ouvert la **PR #32945** pour migrer le trafic vers une passerelle OVH Hillsboro louée par T3 (`gw.t3coderelay.com`), où le serveur Caddy de T3 termine le TLS et transfère les données en clair via un socket Unix vers un proxy Go `yamux` — toujours sans aucun chiffrement de bout en bout. Parallèlement, [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promet un `"encrypted network transport"` sans divulguer l'absence de chiffrement E2E ni offrir de garantie de non-conservation.

![Un mainteneur principal reconnaissant dans l'Issue #32098 qu'un compte cloud ou une clé relais volée permet de contrôler les machines liées tout en écartant le chiffrement E2E](../../evidence/15-connect-no-e2e.jpg)

<details>
<summary>Afficher la preuve de la passerelle OVH Caddy à terminaison TLS (PR #32945)</summary>

![La PR #32945 de Theo évoquant une facture Cloudflare de 25k $ par mois et déplaçant T3 Connect vers une passerelle OVH auto-hébergée où Caddy termine le TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

</details>

---

## 5. Bilan financier, conflits d'investisseur, sponsors et moteur des 77 000 étoiles (Volets 6, 8, 17, 18)

> **Audit technique approfondi :** Les citations complètes de revenus et de radar, la configuration Axiom `infra/relay/src/observability.ts` et l'analyse détaillée de `GitHubStarPrompt.tsx` figurent dans le [**Dossier 04 : Le bilan économique, les conflits d'investisseur, la pile de sponsors et l'usine à 77k étoiles**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md).

### 5.1 Plus de 800 000 $ investis et radar de calcul à 31,7 T tokens/jour (10,19 M $/jour) (`Volet 8`)

Sur 1 151 tweets publiés en 17,24 jours, `@theo` a mentionné T3 Code **162 fois (14,1 %)** tout en mentionnant ses trois activités payantes antérieures — `T3 Chat`, `UploadThing` et [`https://ping.gg/`](https://ping.gg/) — **0 fois**. Le 12 novembre, il a confirmé avoir dépensé **plus de 800k $** de sa poche pour le client MIT gratuit ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267), [Volet 8](https://x.com/realchendahuang/status/2125392410763239723)).

En contrepartie, la télémétrie centralisée vers `ingest.t3.codes` a bâti un radar de calcul en temps réel suivant **31,7 billions (31,7 T) de tokens/jour** — soit **10,19 millions de dollars/jour** en coût d'API équivalent le 18 novembre (culminant près de **10,2 M $/jour**) — avec les parts de marché exactes (`99%` adossés à des abonnements, `~98,5%` entre Codex/Claude/Antigravity, la part d'essai des modèles open-weight chutant de `15%` à `6%` avec moins de 0,5 % des requêtes). Lorsqu'un commentateur a tenté de deviner les parts de marché le 23 novembre, `@theo` s'est moqué de lui parce qu'il n'avait pas accès à son analytique (`2124682906132181482`).

Ce radar s'est directement converti en levier d'influence : **plus de 300k $ de tokens OpenAI gratuits en accès anticipé illimité** consommés sur un seul benchmark GPT-6.2 Astra (`2122760447103484410`), du benchmarking bare-metal Google et des échanges avec DeepMind (même si l'affirmation de `@theo` selon laquelle `@PatrickToulme` de DeepMind aurait livré `"many PRs"` contraste avec l'historique git de `pingdotgg/t3code` qui ne montre qu'**un seul commit**, `PR #31158`), ainsi que des sollicitations d'investisseurs (`"multiple investors have asked me about this"`, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).

![Tableau de bord analytique interne de Theo pour T3 Code affichant 31,7 billions de tokens et 10,19 M $ d'équivalent API quotidien](../../evidence/17-theo-31t-tokens-10m-day.png)

<details>
<summary>Afficher la capture de vérification du commit unique de Patrick Toulme (PR #31158)</summary>

![Historique des commits de pingdotgg/t3code filtré sur patrick-toulme montrant 1 seul commit (#31158) au lieu de "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

</details>

### 5.2 Conflits d'investisseur providentiel (`Volet 6`) et hypocrisie sponsors / quotas (`Volet 17`)

- **Chevauchement Vibe Kanban et Daytona ([Volet 6](https://x.com/realchendahuang/status/2125385742243520653)) :** Le 16 novembre (`2122201981167251877`), `@theo` a révélé être investisseur et contributeur de **Vibe Kanban** — qui avait pivoté vers l'interface de T3 Code avant de fermer — puis a raillé cette interface comme étant idéale `"for running out of runway and killing your business"`. Le 18 novembre (`2123011578090127499`), il a confirmé avoir investi dans l'entreprise de sandboxes cloud **Daytona** aux côtés de concurrents, neuf jours seulement après avoir évoqué des sandboxes cloud payantes intégrées à T3 Code (`2119705561679933806`).
- **Pile de sponsors intégrée au relais ([Volet 17](https://x.com/realchendahuang/status/2125411353393553744)) :** Deux sponsors figurant dans la liste YouTube de `@theo` de mai 2023 (`1657488850472804353`) — **Clerk** et **Axiom** — assurent l'authentification cloud de T3 Code et la journalisation relais IP sur 30 jours. En avril 2024, le PDG de Vercel `@rauchg` confirmait que Vercel ne sponsorisait que Theo (`1776260839965863965`), et Theo reconnaissait plus tard l'existence de clauses d'exclusivité dans les contrats de sponsoring (`uv179CTAK-w`). Il est également investisseur providentiel dans Cursor et Cline.
- **Exploitation du quota 0 % de Codex et contradiction du `CLIProxyAPI` à 10 comptes :** Le 21 août 2026, `@theo` s'est vanté d'avoir extrait **plus de 800 $** au-delà de la fenêtre de grâce à 0 % de Codex tandis que `@maria_rcks`, salariée de T3, publiait *Endless* pour boucler les tours au-delà de zéro ; après le tollé du 22 août, tous deux ont supprimé leurs messages et Maria a souhaité que Codex bannisse des comptes (`2090972426876129658`), précédant le durcissement mondial par OpenAI (`openai/codex#45444`). En octobre, `@theo` a publié un Gist à 452 étoiles (`59a521d2ee8d70aaf90e280c175072af`) mutualisant **7 comptes Claude + 3 comptes Codex** (`555%` de quota sur plus de 12 machines ; tout en se vantant d'un rendement de `14 662 $` / `15k $` Ultra sur 1,1 million de requêtes relayées et en rédigeant un tutoriel Grok Bot + configuration Claude à `100 $`) — Gist que la propre documentation `docs/user/faq.md` de T3 Code cite en lien immédiatement après avoir refusé le basculement intégré pour risque de bannissement (`"Early apologies if it gets you banned 💀"`).

<details>
<summary>Afficher 3 preuves sur les conflits, le Gist CLIProxyAPI et le quota 0 % de Codex</summary>

![Theo révélant qu'il a investi et contribué à Vibe Kanban avant de se moquer publiquement de sa fermeture](../../evidence/18-theo-vibe-kanban.png)

![Gist cliproxy-setup.md de Theo à 452 étoiles mutualisant 7 comptes Claude et 3 comptes Codex sur plus de 12 ordinateurs à 555 % de quota](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 documentant la régression globale interrompant les tours actifs en cours de tâche à 0 % de quota](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

</details>

### 5.3 Comment T3 Code est passé de 30k à 77k étoiles en 25 jours (129 watchers) (`Volet 18`)

Six mois après avoir publié *"Github has a fake star problem"* (`2048122499834036340`, avertissant que les étoiles étaient devenues un outil `"to trick VCs into investing"`), `@theo` a rédigé et fusionné lui-même trois PR ([Volet 18](https://x.com/realchendahuang/status/2125416210120765799)) :
1. **30 oct. (`PR #27832`) :** Ajout d'une invite à mettre une étoile en haut à droite après 5 requêtes envoyées (`PROMPTS_BEFORE_ASKING = 5`, se déclenchant à la 6e requête dans [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx)), **multipliant immédiatement par 10** les étoiles quotidiennes (`2117065834267136469`) et atteignant **+3 094 étoiles/jour** sur GitHub Trending (`2117172614158508400`).
2. **3 nov. (`PR #29922` et `PR #29987`) :** Passage à une **détection d'inactivité de fenêtre de 30 secondes** (`IDLE_MS = 30_000`) pendant que les utilisateurs attendent les réponses de l'agent, et remplacement de la redirection navigateur par un appel RPC `sourceControl.star` — déclenchant `PUT user/starred/pingdotgg/t3code` directement via les **identifiants GitHub du serveur hôte** avant d'afficher des confettis de 160 particules.
3. **Relecture contournée et faille de mise en favori d'un dépôt arbitraire (toujours non corrigée à `ca81b7b9`) :** Macroscope a marqué la `PR #29922` comme `Needs Human Approval` ; `@theo` l'a fusionnée lui-même malgré tout. Le 6 novembre, `zhilsinger` a déposé un avis `Request changes` signalant l'opacité sur les identifiants en cas d'hôte partagé (reconnue dans `GitHubStarPrompt.tsx#L115`) et le fait que [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) ne verrouille jamais `pingdotgg/t3code` :

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

Tout client disposant du droit `source-control:write` peut ainsi attribuer une étoile à n'importe quel dépôt arbitraire en utilisant les identifiants de l'hôte. La demande de modifications de `zhilsinger` reste sans réponse et sans correctif jusqu'à `ca81b7b9` (**19 jours** après son dépôt) tandis que le dépôt passait de 30k à 77k étoiles (pour 129 watchers).

![Graphique de Theo du 2 novembre célébrant une envolée quasi verticale par 10 des étoiles quotidiennes juste après la sortie de l'invite intégrée](../../evidence/20-star-10x-cliff.png)

<details>
<summary>Afficher les preuves de la revue de zhilsinger et de la faille driver.ts (PR #29922)</summary>

![Revue Request Changes du développeur zhilsinger sur la PR #29922 avertissant sur les étoiles sur hôte partagé et le star de dépôts arbitraires via les identifiants serveur, restée sans réponse pendant 19 jours](../../evidence/21-pr29922-zhilsinger-review.png)

![packages/source-control-github/src/server/driver.ts lignes 60–99 ne verrouillant pas pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

</details>

---

## 6. Gouvernance, bots aspirant les forks, registre des marques, corpus de 1 151 tweets et historique (Volets 9, 10, 14, 15, 16)

> **Audit technique approfondi :** Le code d'automatisation de gouvernance (`.github/scripts/pr-limits.cjs`), l'audit USPTO TSDR ainsi que la méthodologie complète et les tableaux lexicaux sur `n = 1 151` figurent dans le [**Dossier 05 : Gouvernance du dépôt, bots aspirant les forks, abus de marque et historique**](../dossiers/05-governance-trademark-and-history.md) et le [**Dossier 06 : Le jeu de données forensique quantitatif de 1 151 tweets (7–24 nov. 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md).

### 6.1 Vélocité interne contre hostilité externe (`Volet 9`) et aspiration de forks (`Volet 10`)

- **500 commits/jour et `yolo merges` contre `CONTRIBUTING.md` ([Volet 9](https://x.com/realchendahuang/status/2125392916369871309)) :** `@theo` a décrit livrer **500 commits/jour** (`2120741101250515322`), faire tourner **700 agents**, Julius fusionnant les PR en lot via une boucle d'agent, `"my yolo merges breaking shit sometimes"` (`2119951615679672513`), et risquer d'effacer des machines pour obtenir du `"free content"` (`2119993037971730879`). Pour les utilisateurs externes, la **PR #5551** a enterré le mode Plan (`"Reality check for those upset"`, 10 votes négatifs), la **PR #9190** a caché l'anneau de contexte (16 votes négatifs, record du dépôt), la **PR #33131** a supprimé le mode Plan avec un résumé IA absurde, l'**Issue #33639** a accueilli un utilisateur mécontent par `"uninstall our software"` / `"ungrateful prick"` (et la **PR #41572** a été rejetée le lendemain matin), `CONTRIBUTING.md` commençait par `"here's my advice: Don't"` accompagné d'interdictions de modèles et de bannissements avec mise au pilori publique dans `.github/VOUCHED.td` (174 étiquettes `unwanted` sur le dépôt), et des contributeurs sur X ont été réprimandés parce qu'ils ne le suivaient pas (`2120821423438778667`), menacés de la suppression de `/btw` (`2120853340078874923`), ou se sont fait répondre que des captures annotées valaient mieux que des PR (`2123754193530053110`).
- **Aspiration publique par `@bot` contre moquerie des concurrents ([Volet 10](https://x.com/realchendahuang/status/2125393641665671593)) :** Le 8 novembre, `@theo` a répondu `"Okay I'm stealing this"` à une fonctionnalité du fork de `@MiaAI_lab` et a envoyé `@bot` 30 secondes plus tard en réponse publique pour aspirer son fork sur `beebox` via Opus 5.5 (`2119240810202034645`) ; le 13 novembre, il a de nouveau envoyé `@bot` cloner des fonctionnalités saluées d'outils concurrents (`2121017649652269120`). Pourtant, le 24 novembre, il s'est moqué de Claude Code Desktop pour avoir ajouté des onglets dans la barre latérale (`2124987957803446311`). Contre ses détracteurs, il a appelé ses abonnés à utiliser les Community Notes pour `"demonetize them"` (`2120238923884696025`) et a confirmé utiliser un bot de blocage automatique sur X (~100 comptes bloqués le 24 nov., `2125077510941802509`).

![CONTRIBUTING.md décourageant les PR externes et détaillant les bannissements par dénonciation publique dans .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

<details>
<summary>Afficher les preuves sur l'Issue #33639 et l'aspiration de forks par @bot</summary>

![Réponse de Theo dans l'Issue #33639 disant à @bermudi de désinstaller le logiciel et le traitant d'ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo répondant "Okay I'm stealing this" et envoyant @bot 30 secondes plus tard aspirer le fork d'une développeuse dans T3 Code](../../evidence/23-stealing-fork-bot.png)

</details>

### 6.2 Audit des marques : 0 enregistrement USPTO et `PR #41898` rétroactive (`Volet 15`)

À la suite d'une piste de `@vildanden_ai` (`2125275487404761555`), la consultation de la base USPTO TSDR révèle **0 enregistrement** pour `T3 Code`, `T3 Tools` ou `T3 Connect` ([Volet 15](https://x.com/realchendahuang/status/2125408163273080950)). L'unique dépôt USPTO de T3 Tools Inc. (`PING LABS`, numéro de série [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) a essuyé un refus définitif en février 2025 et a été classé `ABANDONED` le 19 mai 2025, tandis que des tiers détiennent déjà des marques `T3` dans les classes logicielles/SaaS 42 et 9 (`EquipmentShare` Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) ; `ESG Operations` Reg. `3324707`).

En vertu de la [politique de GitHub sur les marques](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), les entreprises commerciales déposant une demande de retrait pour atteinte à une marque doivent fournir sous peine de parjure un numéro d'enregistrement fédéral ou international (les exceptions pour marques non enregistrées ne s'appliquent qu'aux organismes publics et associations à but non lucratif). Au moment où `@theo` menaçait de faire fermer le compte GitHub de `@DDdxx666`, il était dans l'incapacité de remplir le formulaire de GitHub. Ce n'est que **17 heures plus tard** (`12:21 BJ` le 24 novembre) que `@theo` a fusionné la **PR #41898** insérant rétroactivement `TRADEMARK.md` (`"whether registered or unregistered"`) et l'a citée 94 secondes après (`2125082769395220688`) — alors même qu'il s'était moqué de WordPress pour un `"unenforceable trademark dispute"` en septembre 2024 (`1839261574005141945`) et avait lancé `"get a better lawyer"` aux développeurs trois heures plus tôt le 24 novembre (`2125026423769555308`).

![La PR #41898 fusionnée 17 heures après la menace de bannissement, ajoutant rétroactivement TRADEMARK.md revendiquant des droits qu'ils soient enregistrés ou non](../../evidence/24-pr41898-trademark-aftermath.png)

<details>
<summary>Afficher la preuve de la réponse X "get a better lawyer"</summary>

![Theo disant aux développeurs "get a better lawyer" trois heures avant de fusionner TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

</details>

### 6.3 Jeu de données quantitatif de 1 151 tweets (`Volet 14`) et historique sur deux ans (`Volet 16`)

L'analyse de l'ensemble des **1 151 publications X consécutives de `@theo`** du 7 au 24 novembre 2026 (`17,24` jours ; `66,8/jour` ; `75,6%` de réponses ; `2,7 min` d'intervalle médian) quantifie une asymétrie de pouvoir extrême ([Volet 14](https://x.com/realchendahuang/status/2125404517697290438)) :
- **Dirigeants de la Big Tech, chercheurs de grands labos et grands KOL (`n = 43` en `@` direct strict / `n = 60`–`62` au sens large) :** **0,0 %** de vulgarités ciblées ou d'insultes personnelles (`30,0%`–`32,6%` de remerciements polis). De vives critiques visant Gemini 4 Carbon et GPT-6.2 Astra ont été adoucies ou suivies d'excuses publiques (`2123255588570501585`, `2123995323123343869`).
- **Développeurs ordinaires et critiques (`n = 766` en `@` direct strict / `n = 749` au sens large) :** L'hostilité/grossièreté grimpe à **8,0 %** (`61/766`), incluant `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`), `"dance on the graves of the 'local ai' community"` (`2120733839832273025`), `"Linux larpers"` (`2124298216271499605`), des injures répétées `stupid bitch` (`2120599310211703274`) et des moqueries autour de la prison/RSD (`2122865897375400066`).
- **Fenêtre de crise de 25 heures autour du fork chinois (`n = 132`) :** Les insultes personnelles directes ont bondi de **4,0x**, passant d'une ligne de base de `3,6%` à **14,4 %** (`19/132`), allant jusqu'à `"chinese tech twitter is the biggest fucking cesspit"` et traitant les lecteurs d'audits chinois de `"fucking braindead"` (`2125177503526588877`) — moins de 24 heures après avoir fait la leçon à un autre internaute sur l'importance de ne pas ruiner la confiance (`2124449493513068862`).

![Graphique forensique 1 : 1 151 tweets sur 17 jours — 75,6 % de réponses et 162 mentions contre 0 pour les produits payants](../../evidence/charts/theo-chart-1-overview.png)

![Graphique forensique 2 : Cadence sur 24 heures PST (233 publications nocturnes) et barres quotidiennes sur 17 jours](../../evidence/charts/theo-chart-2-rhythm.png)

![Graphique forensique 3 : Politesse sélective — 0,0 % d'injures envers les VIP contre 8,0 % d'hostilité envers les développeurs et pic à 14,4 % durant la crise](../../evidence/charts/theo-chart-3-double-standard.png)

![Graphique forensique 4 : Décomposition en trois vagues de la fenêtre de crise de 25 heures autour du fork chinois](../../evidence/charts/theo-chart-4-cn-crisis.png)

<details>
<summary>Afficher 2 preuves primaires d'hostilité sur X citées dans les Volets 13 et 14</summary>

![Theo citant une simple question de comparaison d'outils pour écrire que les ingénieurs méritent le chômage de masse](../../evidence/25-engineers-unemployment.png)

![Theo qualifiant la tech chinoise sur Twitter de fosse septique et insultant les développeurs lisant les audits chinois du code](../../evidence/26-cn-cesspit.png)

</details>

Le recul sur deux ans confirme un schéma récurrent ([Volet 16](https://x.com/realchendahuang/status/2125408843152953693)) :
- **Moquerie de fork en 2024 :** A baptisé son propre fork du thème VS Code d'un autre développeur [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) tout en tournant en dérision le tempérament du créateur d'origine.
- **Harcèlement de développeurs indiens et excuses en 2024 :** Après qu'une vidéo visant des chaînes de tutoriels indiennes a déclenché du harcèlement, il a publié [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) condamnant les attaques fondées sur la nationalité — deux ans avant de s'en prendre à la tech chinoise sur Twitter.
- **Prime contre FFmpeg en octobre 2025 :** A juré face caméra et offert une **prime de 20 000 $** pour évincer un mainteneur de FFmpeg ([archive](https://www.youtube.com/watch?v=1oQ3KMeaH04)), avant de la retirer et de supprimer les publications après la contre-offre de 21k $ de Windscribe, l'opposition publique de VLC et la condamnation sur la liste de diffusion FFmpeg.
- **Menace de passage en code fermé supprimée le 25 novembre 2026 (~4 h 00) :** A menacé cette nuit-là de fermer le code source de T3 Code parce que les utilisateurs ne méritaient pas l'open source ; a supprimé le tweet discrètement avant le lever du jour après avoir dépassé les 3 000 mentions J'aime.

---

## 7. Plan d'action d'atténuation et de remédiation

Si T3 Code est installé sur un poste personnel ou d'entreprise, appliquez une défense en profondeur couvrant les variables d'environnement, le blocage réseau au niveau de l'OS, la Managed Policy, l'hygiène SQLite/identifiants locaux et la révocation des jetons cloud.

### 7.1 Variables d'environnement + blocage réseau au niveau de l'OS (utilisateurs locaux / poste de travail)

Ne vous fiez **pas** uniquement aux variables d'environnement : même à `ca81b7b9`, [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`line 156`, auparavant `line 149`) initialise toujours l'identité sur disque au démarrage avant de vérifier les opt-outs, [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omet toujours `OTEL_SDK_DISABLED` et `T3CODE_OTEL_SDK_DISABLED`, et les versions antérieures ignoraient les opt-outs shell/utilisateur (`PR #42376`, `PR #42464`). Combinez les variables shell/utilisateur — y compris `DO_NOT_TRACK=1` pris en compte à partir de la [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) (qui prévaut sur `T3CODE_TELEMETRY_ENABLED=true` et désactive le traçage du relais serveur) — avec un blocage `/etc/hosts` au niveau du système :

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
#    DO_NOT_TRACK=1 (PR #42629) overrides T3CODE_TELEMETRY_ENABLED=true and disables relay tracing,
#    but AnalyticsService.ts:156 still writes local install identity on disk and DesktopShellEnvironment.ts
#    still omits T3CODE_OTEL_SDK_DISABLED / OTEL_SDK_DISABLED.
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

Sous Windows, configurez également `DO_NOT_TRACK=1`, `T3CODE_TELEMETRY_ENABLED=false`, `T3CODE_OTEL_SDK_DISABLED=true` et `OTEL_SDK_DISABLED=true` dans **Propriétés système → Variables d'environnement** (Utilisateur et Système) et redémarrez l'ordinateur ou tout service d'arrière-plan. Notez d'après l'`Issue #36479` que le démarrage du serveur effectue tout de même une requête sortante vers `raw.githubusercontent.com` sauf blocage par pare-feu ou proxy.

### 7.2 Managed Policy administrateur (`macOS`, `Linux`, `Windows`)

Pour verrouiller la télémétrie, les tunnels T3 Connect, les tâches webhook, l'importation de cookies du navigateur et les tunnels d'aperçu conformément à [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md), déployez un fichier `policy.json` appartenant à l'administrateur (ou l'équivalent MDM/GPO) :

| OS | Politique native / Registre | Chemin du fichier (`chmod 644` / propriété root ou Admin) |
|---|---|---|
| **macOS** | Profil de configuration appareil pour `com.t3tools.t3code` *(les profils utilisateur sont ignorés)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(déployer séparément dans chaque distribution WSL)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) ou valeur `REG_SZ` `Policy` sous `HKLM\SOFTWARE\Policies\T3Tools\T3Code` | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

Validez et vérifiez l'application avec `t3 policy check policy.json`, redémarrez complètement T3 Code, puis exécutez `t3 policy show`. **Gardez à l'esprit les angles morts documentés dans `docs/user/telemetry.md` :** la Managed Policy ne désactive **pas** le traçage relais sur l'instance hébergée `app.t3.codes`, ne contrôle **pas** le traçage des applications mobiles et ne désactive **pas** `Publish agent activity` s'il a été activé auparavant.

### 7.3 Inspection de `statev2.sqlite` et nettoyage de l'état local

Bien que la [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) ait ajouté un nettoyage asynchrone `thread-content.purge` (fermant l'`Issue #17845`), les versions antérieures conservaient tout l'historique des fils sur disque et, même à `ca81b7b9`, les fils sources supprimés conservent leur historique tant qu'ils sont référencés par des forks actifs, des transferts `merge_back` en attente ou des sous-agents parents actifs — sans compter que les lignes marqueurs de suppression restent dans SQLite et que la récupération d'espace disque sur le fichier `.sqlite` exige un `VACUUM` hors ligne :

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# Optional offline compaction to reclaim disk pages after PR #42119 purge (quit T3 Code first)
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

*(Sous Windows, inspectez et nettoyez `%USERPROFILE%\.t3\userdata\`, notamment `statev2.sqlite`, `anonymous-id` et `secrets`.)*

### 7.4 Révocation Google Antigravity, T3 Connect, Clerk/Cloudflare et GitHub

1. **Google Antigravity :** Cessez immédiatement d'utiliser des abonnements personnels Google AI / Antigravity via l'intégration gérée par T3 ou CLIProxyAPI afin de préserver l'unique recours autorisé de votre compte. Supprimez `~/.t3/userdata/providers/antigravity/` et `~/.t3/tools/antigravity-acp/`.
2. **Suppression des données cloud et de T3 Connect :** Désactivez **Publish agent activity** dans **Settings → Sharing & access**, dissociez toutes les machines locales (`t3` logout / unlink) et activez `requireConnectDeviceApproval` si vous réactivez un jour l'accès distant. Demandez la suppression complète de votre compte et des données relais auprès de Clerk et via le contact officiel d'effacement des données de T3 Tools indiqué dans `privacy-policy.astro` (afin que le webhook de suppression Clerk de la `PR #42285` purge les lignes PlanetScale et détruise les tunnels Cloudflare).
3. **Révocation du jeton GitHub et rotation des secrets :** Révoquez l'autorisation GitHub OAuth / App de T3 Code dans **GitHub Settings → Applications / Authorized GitHub Apps** (`driver.ts` détient des permissions de mise en favori au niveau de l'hôte). Procédez à la rotation de toute clé API, URL de base de données ou jeton ayant pu transiter en ligne de commande de processus capturée par `t3-resource-monitor` avant la `PR #41889` / `PR #42577`, ou dans des erreurs webhook/relais transmises à Axiom.
4. **Confinement du HTTP LAN, des jetons Bearer CI et des dépôts non fiables (`ca81b7b9`) :** N'exposez jamais un `t3 up --lan` en HTTP non chiffré sans placer TLS (proxy inverse ou Tailscale Serve ; attention au contournement IPv4 entre `::1` et `127.0.0.1`) devant lui ; ne placez jamais de jetons Bearer non-DPoP de 30 jours dans des scripts ou des chaînes CI ; et effacez `SSH_AUTH_SOCK` / `GITHUB_TOKEN` (en auditant aussi les hooks `.gitmodules` / `.claude/settings.json`) avant d'ouvrir un dépôt non fiable.

### 7.5 Clients alternatifs

Dans les retours communautaires, les développeurs ont fréquemment mentionné **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`) et **Cloudroom** ([Fil des alternatives](https://x.com/realchendahuang/status/2125244977878036713)). Avant d'adopter un client de remplacement, vérifiez de manière indépendante : (1) télémétrie désactivée par défaut et capture réseau propre, (2) véritable `DELETE` + `VACUUM` ou suppression de fichier lors de l'effacement d'un fil, (3) délégation stricte à la CLI officielle sans extraction d'identifiants ni usurpation d'en-têtes, et (4) véritable chiffrement de bout en bout côté client pour les tunnels distants.

---

## 8. Sources primaires et index des 18 volets originaux

> Pour consulter le tableau maître de référence reliant chaque citation `SRC-001` à `SRC-320` aux différents volets, dossiers et commits post-audit, voir [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md). Pour l'ensemble des **108** preuves visuelles et graphiques forensiques (`EV-001`–`EV-108`), voir [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md).

### Publications d'origine et index complet des 18 volets sur X (ordre chronologique)

- Origine 1 (Lien GitHub en page d'accueil libellé `"steal our code"`) : https://x.com/realchendahuang/status/2125059292919394654
- Origine 2 (Litige sur le nom d'un fork MIT, insultes Temu et deux poids deux mesures) : https://x.com/realchendahuang/status/2125062675147448475
- Volet 1 (Télémétrie par défaut, promesse `"No telemetry"` rompue, hachage non salé inter-outils) : https://x.com/realchendahuang/status/2125153472450527440
- Volet 2 (Suppression factice SQLite, balayage des processus toutes les 5 secondes, retrait du mode Plan, bannissements dans `CONTRIBUTING.md`) : https://x.com/realchendahuang/status/2125160473176023486
- Volet 3 (`git push --force` silencieux en mode Auto, retrait en 21 h du filtre de confidentialité, 0 avis de sécurité, insultes aux utilisateurs) : https://x.com/realchendahuang/status/2125201882687881378
- Volet 4 (Usurpation d'en-têtes Google Antigravity, faux `SSH_CONNECTION`, bannissement en 3 minutes d'un compte neuf) : https://x.com/realchendahuang/status/2125213397507858657
- Volet 5 (Absence de chiffrement E2E dans T3 Connect, Cloudflare Tunnel, passerelle OVH en clair auto-hébergée) : https://x.com/realchendahuang/status/2125218189596676555
- Volet 6 (Conflits d'investisseur providentiel : moquerie sur l'arrêt de Vibe Kanban et chevauchement avec Daytona) : https://x.com/realchendahuang/status/2125385742243520653
- Volet 7 (Affirmation `"turn off all telemetry"` sur la Managed Policy contre les trois angles morts de la documentation officielle) : https://x.com/realchendahuang/status/2125391659492081947
- Volet 8 (Le bilan financier à 800k+ $ sur un client gratuit et le radar quotidien à 31,7 T tokens / 10,19 M $) : https://x.com/realchendahuang/status/2125392410763239723
- Volet 9 (500 commits/jour, 700 agents, `yolo merges` contre découragement des PR et filtrage des abonnés) : https://x.com/realchendahuang/status/2125392916369871309
- Volet 10 (Envoi de `@bot` pour aspirer forks et concurrents, bot de blocage automatique, démonétisation via Community Notes) : https://x.com/realchendahuang/status/2125393641665671593
- Volet 11 (Mise au point du 25 nov. contredite en moins de 2 heures par les PR nocturnes et 264 enregistrements Claude dans l'archive de 100 Mo) : https://x.com/realchendahuang/status/2125394810559426993
- Volet 12 (Correctifs nocturnes post-RGPD révélant 2,2 M/h de journaux IP, suppression de compte incomplète, fuites push et lots anonymes mélangés) : https://x.com/realchendahuang/status/2125395501663281198
- Volet 13 (Qualification de la tech chinoise sur Twitter de fosse septique tout en corrigeant en silence aperçus sans bac à sable et exécution de commandes sans confirmation) : https://x.com/realchendahuang/status/2125395980354994414
- Volet 14 (Clivage quantitatif sur 1 151 tweets : 0 % d'injures envers les dirigeants de la Big Tech contre 8 % d'hostilité envers des développeurs ordinaires) : https://x.com/realchendahuang/status/2125404517697290438
- Volet 15 (Zéro enregistrement USPTO pour T3 Code et exigences de la politique de GitHub sur les marques) : https://x.com/realchendahuang/status/2125408163273080950
- Volet 16 (Antécédents récurrents : `vsc-material-but-i-wont-sue-you`, harcèlement de développeurs indiens, prime de 20k $ contre FFmpeg, menace supprimée de passage en code fermé) : https://x.com/realchendahuang/status/2125408843152953693
- Volet 17 (Pile de sponsors Clerk/Axiom, exploitation du quota 0 % de Codex et suppression, Gist `CLIProxyAPI` à 10 comptes) : https://x.com/realchendahuang/status/2125411353393553744
- Volet 18 (Comment les 77k étoiles GitHub ont été atteintes : invite après 30 secondes d'inactivité déclenchant des étoiles API par les identifiants hôtes et star non verrouillé de dépôts arbitraires) : https://x.com/realchendahuang/status/2125416210120765799
- Liste communautaire d'alternatives : https://x.com/realchendahuang/status/2125244977878036713
- Archive des commentaires de la communauté (Issue #1 par `@opserx` — *"The Case Against Theo"*) : [`docs/community/issue-1-the-case-against-theo.md`](../community/issue-1-the-case-against-theo.md)

### Code source, PR, Issues, politiques et preuves primaires

**Télémétrie, vie privée et correctifs nocturnes post-RGPD (Volets 1, 7, 11, 12)**

- Domaine d'accueil officiel : https://t3.codes/
- Télémétrie PostHog par défaut (PR #174) : https://github.com/pingdotgg/t3code/pull/174
- Suppression silencieuse de la promesse `"No telemetry"` en page d'accueil (`commit 3bdaa6e1`) : https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Refus de faciliter la désactivation (Issue #1397) et enquête sur la promesse rompue (Issue #4123) : https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Copie des événements bruts sur `ingest.t3.codes` auto-hébergé (PR #15028) et hachage non salé inter-outils (PR #21506) : https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- Quatre PR communautaires d'opt-out rejetées (`#13458` / `#16763` / `#21248` / `#27077`) : https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- Fichiers sources de télémétrie et d'identification (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `ProviderDimensions.ts` / `telemetryId.ts` / `otelEnvironment.ts` / `DesktopShellEnvironment.ts` / `DesktopBackendConfiguration.ts`) : https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts
- Documentation officielle sur la télémétrie et la Managed Policy : https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Déclarations de Theo sur la Managed Policy, sa mise au point et l'absence de fichiers de suivi + export public `events.clean.jsonl` : https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- Fuite de chemins absolus d'espace de travail (PR #42450) et opt-outs ignorés sous Win/Mac (PR #42376 / #42464) : https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Journaux IP à 2,2 M/h conservés 30 jours (PR #42380), suppression de compte incomplète (PR #42285 / #42430), fuites push mobiles (PR #42459 / #41859) et regroupement des retours anonymes (PR #42466) : https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Sécurité locale, correctifs de sécurité silencieux, Antigravity et T3 Connect (Volets 2, 3, 4, 5, 13)**

- Suppression factice SQLite (Issue #17845 / #28903), moniteur de processus toutes les 5 secondes (Issue #11222) et correctif de capture des lignes de commande (PR #41889) : https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Noms d'hôtes internes envoyés au service favicon de Google (PR #16950 / #32657), vérification sortante forcée (Issue #36479 / `raw.githubusercontent.com`), contournements de permissions/politiques (PR #21806 / #27322), consommation 1,7x du quota Claude (Issue #7338 / #24649) et bugs de consommation électrique (Issue #3143 / #40581) : https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- `git push --force` silencieux en mode Claude Auto (Issue #15353 et commentaire de reproduction) et PR correctives communautaires (`#15360` / `#35207` / `#40692`) : https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Retrait en 21 heures du filtrage des modèles privés pour `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237) : https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- Onglet Security Advisories vide, `SECURITY.md` (`PR #38812` / `#41942`), correctifs de sécurité silencieux fusionnés (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`) et tickets de sécurité/lanceur ouverts (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`) : https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Garantie CGU de la FAQ Antigravity, réfutation par le code dans l'Issue #40713, bannissement en 3 minutes (Issue #41536), mélange de comptes (Issue #41973), usurpation d'éditeur en liste blanche (PR #26876), PR #33800 hub CLIProxyAPI, tweets de Theo niant le risque / schéma / report de faute sur CLIProxy et code source : https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Conditions d'utilisation Google Antigravity et interdiction sur le forum officiel : https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Refus du chiffrement E2E pour T3 Connect (Issue #32098), `requireConnectDeviceApproval` désactivé par défaut (PR #36419 et `settings.ts`), passerelle Caddy OVH auto-hébergée (PR #32945), code du relais, politique de confidentialité et discussions sans réponse : https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Modèle économique, conflits d'investisseur, sponsors et 77k étoiles (Volets 6, 8, 17, 18)**

- Dépenses de 800k+ $, tableau de bord quotidien à 31,7 T tokens / 10,19 M $, part de 98,5 % des trois labos, réplique sur l'analytique, 300k+ $ de tokens OpenAI gratuits en accès anticipé, PR #31158 à 1 commit de Patrick, sollicitations d'investisseurs et `Ping.gg` : https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- Moquerie envers Vibe Kanban, divulgation de l'investissement dans Daytona et projet de sandboxes cloud payantes : https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Liste des sponsors YouTube, confirmation du PDG de Vercel, vidéo sur l'exclusivité, publication de suppression de Maria, `openai/codex#45444`, tweets CLIProxyAPI ClickHouse/Ultra/GrokBot, Gist CLIProxyAPI et FAQ : https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Vidéo `"Fake star"` sur les VC, bond x10 des étoiles, tweet Trending +3 094, tweet `"missed 70k"`, PR #27832 / #29922 / #29987, `GitHubStarPrompt.tsx` et code de mise en favori de dépôts arbitraires dans `driver.ts` : https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Gouvernance, marques, politesse sélective et incidents passés (Volets 9, 10, 14, 15, 16)**

- Suppression du mode Plan (PR #5551 / #33131), anneau de progression masqué (PR #9190), insultes dans l'Issue #33639, PR #41572 rejetée, `CONTRIBUTING.md` et `.github/VOUCHED.td` : https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commits/jour, `yolo merges`, `"nukes my machine = free content"`, filtrage des PR selon l'abonnement, menace sur `/btw` et messages préférant des captures aux PR : https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Ordres d'aspiration de forks donnés à `@bot`, moquerie envers Claude Desktop, appel à démonétisation par Community Notes et confirmation de l'auto-blocker : https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Registres USPTO TSDR (`PING LABS` 97294243 abandonné ; EquipmentShare `T3` Reg. 7795672), politique de GitHub sur les marques, `PR #41898` rétroactive, menace de bannissement, réponse sur l'open source à mille milliards de dollars, `"aware of the legality"`, `"get a better lawyer"` et anciens tweets sur les marques : https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Preuves de politesse sélective (excuses et ponts avec Google Neon, chômage des ingénieurs, tombes de l'IA locale, Linux larpers, menace prison/RSD, publications `stupid bitch`, fosse septique tech chinoise sur Twitter, absence d'excuses, leçon sur la destruction de la confiance) : https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- Preuves historiques (`vsc-material-but-i-wont-sue-you`, vidéo d'excuses aux développeurs indiens, archive de la prime de 20k $ contre FFmpeg) : https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04

### Suivi en amont post-audit (`9d3195b4` à `ca81b7b9`, `SRC-280`–`SRC-320`)

- Base auditée (`9d3195b4`, `#42000`) et dernier `HEAD` vérifié sur `main` (`ca81b7b9`, `#42634`) : https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 ; https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd
- Restriction de la télémétrie et de l'identité (`#42299` / `84e4264b`, `#42465` / `6b3899f2`, `#42630` / `c925b9ab`, `#42629` / `ef4a1643`) : https://github.com/pingdotgg/t3code/pull/42299 ; https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07 ; https://github.com/pingdotgg/t3code/pull/42465 ; https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da ; https://github.com/pingdotgg/t3code/pull/42630 ; https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b ; https://github.com/pingdotgg/t3code/pull/42629 ; https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64
- Purge locale, moniteur de ressources et durcissement sécurité (`#42119` / `91f0b32e`, `#42577` / `af276ccb`, `#42413`) : https://github.com/pingdotgg/t3code/pull/42119 ; https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e ; https://github.com/pingdotgg/t3code/pull/42577 ; https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c ; https://github.com/pingdotgg/t3code/pull/42413
- Déclencheurs de vérification Antigravity et mises à jour CLI (`#41210` / `3e74a0aa`, `#42545` / `4da8d19d`, `#42339`, `#42475`) : https://github.com/pingdotgg/t3code/pull/41210 ; https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836 ; https://github.com/pingdotgg/t3code/pull/42545 ; https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc ; https://github.com/pingdotgg/t3code/pull/42339 ; https://github.com/pingdotgg/t3code/pull/42475
- Notifications T3 Connect et resserrement relais/mobile/feedback (`#42311` / `ece5f21b`, `#42356`, `#42394`, `#42397`, `#42398`, `#42415`) : https://github.com/pingdotgg/t3code/pull/42311 ; https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd ; https://github.com/pingdotgg/t3code/pull/42356 ; https://github.com/pingdotgg/t3code/pull/42394 ; https://github.com/pingdotgg/t3code/pull/42397 ; https://github.com/pingdotgg/t3code/pull/42398 ; https://github.com/pingdotgg/t3code/pull/42415
- Preuves `ca81b7b9` sur les cookies LAN, les jetons Bearer, `?wsTicket=`, la boucle locale `::1` et l'authentification/exécution liées aux dépôts non fiables (`SRC-308`–`SRC-320`) : https://github.com/pingdotgg/t3code/pull/37042 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985
