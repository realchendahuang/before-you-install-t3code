# #13 · Zéro avis de sécurité GitHub, correctifs critiques silencieux et `SECURITY.md` rédigé dans la précipitation

> Tout en dénigrant sur X les auditeurs de code source chinois, T3 Code a discrètement fusionné des correctifs de vulnérabilités de gravité élevée — dont une traversée de répertoire dans le magasin de secrets, des fuites de jetons entre domaines et l'exécution de commandes issues de dépôts non fiables — tout en maintenant à 0 le nombre d'avis de sécurité GitHub publiés.

<!-- section:claim -->
## Ce qui avait été affirmé

- Le 24 novembre, `@theo` a écarté d'un revers de main sur X les audits techniques en langue chinoise, les attribuant à *"the biggest fucking cesspit"*, et a insulté les développeurs qui les lisaient ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Des révisions précipitées de `SECURITY.md` (`PR #38812`, `PR #41942`) présentaient un accès étendu à l'hôte et un transport non chiffré comme des limites intentionnelles acceptables.

<!-- section:evidence -->
## Ce que montrent les preuves

- **Zéro avis de sécurité publié (`0`) :** à la date de `ca81b7b9`, la page [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) de `pingdotgg/t3code` recense **zéro** avis publié — privant les utilisateurs existants de la version bureau et du serveur de toute alerte CVE formelle et de tout avertissement de mise à jour.
- **Vulnérabilités de gravité élevée corrigées en silence :**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483) : traversée de répertoire dans `ServerSecretStore` via les `jti`/`nonce` du relais avant l'approbation de l'appareil.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756) : fuites de jetons d'entreprise GitHub/GitLab entre domaines.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) et [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386) : isolation sans sandbox de l'aperçu du navigateur de bureau et confirmation des commandes de disposition des worktrees.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413) : permissions du fichier de jeton Clerk de bureau réservées au propriétaire.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504) : un patch d'environ 3 000 lignes ajoutant enfin des demandes de confirmation avant l'exécution de commandes issues de configurations de dépôts non fiables (aux côtés de correctifs silencieux antérieurs `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Défauts de sécurité locaux non corrigés :** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (traversée de répertoire et liens symboliques externes) et [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (sous Windows, `externalLauncher.ts` lançant `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, signalé par AVG/Avast comme `IDP.HELU.PSE96`) restent non fusionnés.
- **`SECURITY.md` restreint la responsabilité au lieu de durcir l'architecture :** le document déclare explicitement que la lecture `filesystem:read` à l'échelle de l'OS hors des espaces de travail, le transport HTTP en clair sur iOS et sur le réseau local, ainsi que la prise de contrôle complète de la machine hôte via une clé de signature de relais compromise relèvent de *limites de conception intentionnelles*.

<!-- section:status -->
## Statut en amont (`ca81b7b9`)

- **Toujours en cours :** les avis de sécurité GitHub publiés restent à **0** ; `Issue #26489` et `PR #30997` ne sont toujours pas corrigés ; `SECURITY.md` continue de classer les lectures à l'échelle de l'OS et le HTTP en clair parmi les comportements intentionnels.

<!-- section:visuals -->
## Preuves visuelles

![PR #39483 corrigeant en silence une traversée de répertoire dans ServerSecretStore sans publier d'avis de sécurité](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997, correctif ouvert pour les lancements PowerShell en Base64 sous Windows signalés par l'antivirus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md classant les lectures à l'échelle de l'OS, le HTTP en clair sur iOS et la prise de contrôle de la machine via la clé de relais parmi les limites intentionnelles](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Sources primaires

- [Enquête originale sur X (partie 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 publié)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Dossier technique approfondi 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
