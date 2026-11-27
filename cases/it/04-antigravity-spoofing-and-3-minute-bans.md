# #04 · Spoofing degli header di Google Antigravity, finto `SSH_CONNECTION` e ban dell'account in 3 minuti

> Nonostante garantisca il rispetto dei ToS nella sua FAQ, T3 Code estrae le credenziali dal keyring del sistema operativo, contraffà header interni di Google (`antigravity/hub/2.24.0`) contro `v1internal` e inietta valori `SSH_CONNECTION` falsi — esponendo gli abbonamenti Google personali a ban rapidissimi.

<!-- section:claim -->
## Cosa era stato dichiarato

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) assicurava ai sottoscrittori paganti: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Quando gli utenti bannati hanno aperto la [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), un maintainer ha negato di aver mai colpito il backend di Antigravity o di riutilizzare i token — e su X, `@theo` ha dato la colpa ai proxy di terze parti (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Cosa dimostrano le prove

- **Estrazione delle credenziali dal sistema operativo e chiamate `v1internal` contraffatte:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) estrae i token OAuth di Google da file locali, da `@napi-rs/keyring` o dal Windows Credential Manager (`CredReadW` tramite `ffi-rs` su `advapi32.dll`), codifica in modo fisso `antigravity/hub/2.24.0` ed esegue `POST` direttamente all'endpoint privato `v1internal` di Google. Il personale di Google ha confermato sul [forum ufficiale](https://discuss.ai.google.dev/t/185992) che la Sezione 6 dei [Termini di servizio di Google Antigravity](https://antigravity.google/terms) vieta agli strumenti di terze parti di estrarre o riutilizzare le credenziali per interrogare direttamente gli endpoint del backend.
- **`SSH_CONNECTION` falsificato e fuga di dati tra account:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) inietta una variabile d'ambiente `SSH_CONNECTION` falsificata (`"127.0.0.1 0 127.0.0.1 0"`) per indurre la CLI di Google a uscire dall'isolamento del keychain del sistema operativo e a salvare le credenziali in file di testo in chiaro. Quando Google ha aggiornato la sua CLI il 24 novembre, la [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) ha confermato che i prompt dell'Account A venivano indirizzati silenziosamente all'Account B.
- **Nuovo account da 20 $ bannato in 3 minuti (`Issue #41536`):** Un abbonamento Google AI da 20 $ appena attivato, senza alcun proxy — usando esclusivamente Antigravity gestito da T3 — è stato bannato al primo messaggio, 3 minuti dopo la configurazione. I maintainer hanno chiuso la issue come duplicato senza aggiungere alcun avviso per gli utenti.
- **Spoofing del client nativo e di CLIProxyAPI:** `@theo` ha personalmente fatto il merge della [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) mascherandosi da `"zed"`, mentre la [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800), anch'essa integrata, ha collegato il polling dell'hub di [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) con gli header contraffatti `claude-code/2.1.273`, `grok-cli/1.0.77` e `antigravityUserAgent`.

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Ancora attivo:** la [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) ha aggiunto [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) per mostrare i link di verifica dell'account Google in caso di `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — confermando che Google applica attivamente le proprie regole — mentre tutti e quattro i percorsi di spoofing ed estrazione dei token restano attivi.

<!-- section:visuals -->
## Prove visive

![antigravityUsageLimits.ts codifica in modo fisso header Google contraffatti e chiama v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts falsifica SSH_CONNECTION per aggirare l'archiviazione nel keychain del sistema operativo](../../evidence/13-antigravity-ssh-spoof.png)

![La Issue #41536 documenta un nuovo account da 20 $ senza proxy bannato in 3 minuti](../../evidence/14-issue41536-fresh-ban.png)

![La PR #33800 collega nativamente il polling contraffatto dell'hub CLIProxyAPI dentro T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Garanzia sui ToS nella FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Termini di servizio di Google Antigravity](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Dossier tecnico approfondito 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
