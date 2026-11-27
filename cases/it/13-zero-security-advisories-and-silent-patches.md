# #13 · Zero GitHub Security Advisories, patch silenziosi ad alta gravità e `SECURITY.md` redatto in fretta

> Mentre su X liquidava gli auditor cinesi del codice sorgente, T3 Code ha integrato in silenzio correzioni a vulnerabilità di gravità elevata — tra cui path traversal nello store dei segreti, fughe di token tra domini diversi ed esecuzione di comandi da repository non attendibili — mantenendo a 0 gli avvisi di sicurezza pubblicati su GitHub.

<!-- section:claim -->
## Che cosa è stato dichiarato

- Il 24 novembre, `@theo` ha liquidato su X le verifiche tecniche in lingua cinese definendole opera di *"the biggest fucking cesspit"* e ha insultato gli sviluppatori che le leggevano ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Le revisioni affrettate di `SECURITY.md` (`PR #38812`, `PR #41942`) presentavano l'accesso ampio all'host e il trasporto non cifrato come confini accettabili e voluti.

<!-- section:evidence -->
## Che cosa dimostrano le prove

- **Zero Security Advisories pubblicati (`0`):** alla revisione `ca81b7b9`, la pagina [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) di `pingdotgg/t3code` elenca **zero** avvisi pubblicati — lasciando gli utenti desktop/server esistenti senza alcun avviso formale CVE né indicazione di aggiornamento.
- **Vulnerabilità ad alta gravità corrette in silenzio:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal in `ServerSecretStore` tramite `jti`/`nonce` del relay prima dell'approvazione del dispositivo.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): fuga di token enterprise GitHub/GitLab tra domini diversi.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) e [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): isolamento dell'anteprima browser desktop senza sandbox e conferma dei comandi di layout del worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): permessi sul file del token Clerk del desktop riservati al solo proprietario.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): patch di circa 3.000 righe che aggiunge finalmente richieste di conferma prima di eseguire comandi provenienti da configurazioni di repository non attendibili (insieme alle precedenti correzioni silenziose `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Difetti di sicurezza locali ancora aperti:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal/symlink esterni) e [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (`externalLauncher.ts` su Windows che esegue `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, segnalato da AVG/Avast come `IDP.HELU.PSE96`) restano non integrati.
- **`SECURITY.md` restringe le responsabilità invece di rafforzare l'architettura:** dichiara esplicitamente come *confini di progettazione voluti* la lettura `filesystem:read` a livello di intero sistema operativo fuori dai workspace, il trasporto HTTP in chiaro su iOS/LAN e la piena compromissione della macchina host tramite una chiave di firma del relay compromessa.

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Ancora aperti:** i GitHub Security Advisories pubblicati restano a **0**; `Issue #26489` e `PR #30997` restano non corretti; `SECURITY.md` continua a classificare le letture a livello di sistema operativo e l'HTTP in chiaro come comportamenti voluti.

<!-- section:visuals -->
## Prove visive

![PR #39483 corregge in silenzio il path traversal di ServerSecretStore senza pubblicare un Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997, correzione ancora aperta per gli avvii PowerShell in Base64 su Windows segnalati dall'antivirus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md classifica le letture a livello di sistema operativo, l'HTTP in chiaro su iOS e la compromissione della macchina tramite chiave del relay come confini voluti](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 pubblicati)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Dossier tecnico approfondito 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
