# #04 · Google Antigravity-headerspoofing, nep-`SSH_CONNECTION` en accountbans binnen 3 minuten

> Ondanks de garantie in de FAQ dat alles binnen de ToS valt, leest T3 Code inloggegevens uit de OS-sleutelhanger, vervalst het Google's interne headers (`antigravity/hub/2.24.0`) richting `v1internal` en injecteert het nepwaarden voor `SSH_CONNECTION` — waarmee persoonlijke Google-abonnementen worden blootgesteld aan snelle bans.

<!-- section:claim -->
## Wat er werd beweerd

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) verzekerde betalende abonnees: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Toen gebande gebruikers [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) indienden, ontkende een maintainer dat Antigravity's backend werd aangesproken of tokens werden hergebruikt — en op X gaf `@theo` proxies van derden de schuld (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Wat het bewijs laat zien

- **Uitlezen van OS-inloggegevens en vervalste `v1internal`-aanroepen:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) haalt Google OAuth-tokens uit lokale bestanden, `@napi-rs/keyring` of Windows Credential Manager (`CredReadW` via `ffi-rs` op `advapi32.dll`), hardcodeert `antigravity/hub/2.24.0` en stuurt `POST`-verzoeken rechtstreeks naar Google's privé-endpoint `v1internal`. Medewerkers van Google bevestigden op het [officiële forum](https://discuss.ai.google.dev/t/185992) dat artikel 6 van de [Google Antigravity ToS](https://antigravity.google/terms) het voor tools van derden verbiedt om inloggegevens te extraheren of te hergebruiken om backend-endpoints rechtstreeks te bevragen.
- **Vervalste `SSH_CONNECTION` en lekkage tussen accounts:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) injecteert een vervalste omgevingsvariabele `SSH_CONNECTION` (`"127.0.0.1 0 127.0.0.1 0"`) om Google's CLI te misleiden de OS-sleutelhanger te omzeilen en naar platte tekstbestanden over te stappen. Toen Google zijn CLI op 24 november bijwerkte, bevestigde [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) dat prompts van Account A stilzwijgend naar Account B werden gerouteerd.
- **Vers $20-account geband in 3 minuten (`Issue #41536`):** Een gloednieuw Google AI-abonnement van $20 zonder enige proxy — uitsluitend via T3-beheerde Antigravity — werd al bij het allereerste bericht geband, 3 minuten na de installatie. Maintainers sloten de issue als duplicaat zonder enige waarschuwing aan gebruikers toe te voegen.
- **Spoofing via native client en CLIProxyAPI:** `@theo` mergete persoonlijk [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876), dat zich voordoet als `"zed"`, terwijl de gemergede [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) koppelde aan hub-polling met vervalste headers `claude-code/2.1.273`, `grok-cli/1.0.77` en `antigravityUserAgent`.

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
## Status upstream (`ca81b7b9`)

- **Nog steeds actief:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) voegde [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) toe om Google's `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`)-links voor accountverificatie te tonen — een bevestiging dat Google actief handhaaft — terwijl alle vier de spoofing- en token-extractieroutes nog steeds actief zijn.

<!-- section:visuals -->
## Visueel bewijs

![antigravityUsageLimits.ts hardcodeert vervalste Google-headers en roept v1internal aan](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts vervalst SSH_CONNECTION om de OS-sleutelhangeropslag te omzeilen](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 documenteert een vers $20-account zonder proxy dat in 3 minuten werd geband](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 koppelt vervalste CLIProxyAPI-hub-polling native aan T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Primaire bronnen

- [Origineel X-onderzoek (deel 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [ToS-garantie in de FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Diepgaand technisch dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
