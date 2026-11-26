# #11 · La clarification du 25 novembre contredite en moins de 2 heures par des PR nocturnes et un dump de 100 Mo

> Le matin du 25 novembre, @theo a formulé trois assurances générales sur la confidentialité et publié un dump de télémétrie de 100 Mo — les trois affirmations ont été contredites en moins de deux heures par les PR de sa propre équipe et par le dump gzippé lui-même.

<!-- section:claim -->
## Ce qui a été affirmé

Dans sa clarification du matin du 25 novembre ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) et sa réponse complémentaire ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` a assuré aux utilisateurs :
- T3 Code *"never collected file paths."*
- Les variables d'environnement *"always disabled telemetry cleanly."*
- Les installations ayant désactivé la télémétrie n'écrivent aucun fichier de suivi local, et les hachages de propriétaire Claude étaient *"broken."*

<!-- section:evidence -->
## Ce que montrent les pièces

- **Contradiction 1 — fuite du chemin absolu de l'espace de travail via `git.cwd` (`PR #42450`) :** Environ 90 minutes après la publication, le mainteneur principal Julius a fusionné [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), reconnaissant que les exécutions déclenchées par webhook via le relais exportaient des spans d'exécution entiers vers Axiom — y compris des spans Git contenant `git.cwd` (**chemin absolu complet de l'espace de travail, nom d'utilisateur du système et nom du dépôt**).
- **Contradiction 2 — désactivations défaillantes sous Windows et macOS (`PR #42376`, `PR #42464`) :** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) reconnaissait que le client de bureau Windows ignorait les variables d'environnement utilisateur `T3CODE_TELEMETRY_ENABLED=false` enregistrées lorsqu'il était lancé depuis des processus préexistants. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) reconnaissait que, sous macOS/Linux, le traçage du relais au premier lancement s'initialisait avant la découverte du shell, ignorant les désactivations définies dans `~/.zshrc` pendant toute la session.
- **Contradiction 3 — écritures disque inconditionnelles et 264 enregistrements Claude actifs dans `events.clean.jsonl` :** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` à `ca81b7b9`) appelle toujours `getTelemetryIdentity` sans condition au démarrage, écrivant l'UUID d'installation local (`upsertAnonymousId`) avant de vérifier `telemetryEnabled`. Par ailleurs, l'en-tête gzip de l'export public de `@theo` (`6,056,594` octets compressés, `95,789` événements) indiquait un nom de fichier d'origine `events.clean.jsonl` généré 20 minutes avant la publication — et pourtant il contenait encore **264 enregistrements de propriétaire Claude actifs** reliant **4 machines distinctes** (`installId`s) à un même hachage SHA-256, aux côtés de modèles de proxy privés repris mot pour mot (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Partiellement corrigé :** `PR #42450`, `PR #42376` et `PR #42464` fusionnées pendant la nuit.
- **Toujours ouvert :** `AnalyticsService.ts:156` écrit toujours l'identifiant anonyme local sans condition avant de vérifier les désactivations, et `DesktopShellEnvironment.ts` omet toujours de transmettre `T3CODE_OTEL_SDK_DISABLED` et `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Preuves visuelles

![PR #42450 reconnaissant que les exécutions déclenchées par le relais exportaient les chemins absolus d'espace de travail git.cwd vers Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 reconnaissant que le client de bureau Windows ignorait les variables d'environnement T3CODE_TELEMETRY_ENABLED=false enregistrées](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 reconnaissant que le traçage du relais au premier lancement sous macOS ignorait les désactivations de ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Audit forensique de events.clean.jsonl révélant 264 enregistrements Claude reliant 4 machines et des identifiants de modèles de proxy privés](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Sources primaires

- [Enquête X originale (partie 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Clarification de `@theo` du 25 novembre (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Réponse complémentaire (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Dump gzippé public](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Dossier technique approfondi 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
