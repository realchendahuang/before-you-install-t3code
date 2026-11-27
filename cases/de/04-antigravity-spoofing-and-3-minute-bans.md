# #04 · Google Antigravity: Header-Spoofing, gefälschte `SSH_CONNECTION` und Kontosperren binnen drei Minuten

> Obwohl die FAQ die Einhaltung der Nutzungsbedingungen zusichern, liest T3 Code Zugangsdaten aus dem OS-Schlüsselbund aus, spoofed interne Google-Header (`antigravity/hub/2.24.0`) gegen `v1internal` und injiziert gefälschte `SSH_CONNECTION`-Werte — und setzt damit persönliche Google-Abos schnellen Sperrungen aus.

<!-- section:claim -->
## Was behauptet wurde

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) versicherte zahlenden Abonnenten: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Als gesperrte Nutzer [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) einreichten, bestritt ein Maintainer, das Antigravity-Backend anzusprechen oder Tokens wiederzuverwenden — und gab auf X Drittanbieter-Proxys die Schuld (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Was die Beweise zeigen

- **Auslesen von OS-Zugangsdaten & gespoofte `v1internal`-Aufrufe:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) extrahiert Google-OAuth-Tokens aus lokalen Dateien, `@napi-rs/keyring` oder dem Windows Credential Manager (`CredReadW` via `ffi-rs` auf `advapi32.dll`), hardcodet `antigravity/hub/2.24.0` und `POST`et direkt an Googles privaten `v1internal`-Endpunkt. Google-Mitarbeiter bestätigten im [offiziellen Forum](https://discuss.ai.google.dev/t/185992), dass Abschnitt 6 der [Google Antigravity ToS](https://antigravity.google/terms) es Drittanbieter-Tools untersagt, Zugangsdaten zu extrahieren oder wiederzuverwenden, um Backend-Endpunkte direkt abzufragen.
- **Gefälschte `SSH_CONNECTION` & kontoübergreifende Vermischung:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) injiziert eine gefälschte Umgebungsvariable `SSH_CONNECTION` (`"127.0.0.1 0 127.0.0.1 0"`), um Googles CLI aus der Isolation des OS-Schlüsselbunds in Klartextdateien zu locken. Als Google seine CLI am 24. November aktualisierte, bestätigte [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973), dass Prompts von Konto A stillschweigend an Konto B geleitet wurden.
- **Neues 20-Dollar-Konto nach 3 Minuten gesperrt (`Issue #41536`):** Ein brandneues Google-AI-Abo für 20 Dollar, ohne jegliche Proxys — ausschließlich über T3 verwaltetes Antigravity — wurde bereits bei der allerersten Nachricht gesperrt, drei Minuten nach der Einrichtung. Die Maintainer schlossen das Issue als Duplikat, ohne irgendeinen Nutzerhinweis zu ergänzen.
- **Spoofing von Native Client & CLIProxyAPI:** `@theo` hat persönlich [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) zusammengeführt, der sich als `"zed"` ausgibt, während der gemergte [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) das Hub-Polling von [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) mit gefälschten Headern `claude-code/2.1.273`, `grok-cli/1.0.77` und `antigravityUserAgent` verdrahtete.

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
## Upstream-Status (`ca81b7b9`)

- **Weiterhin aktiv:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) fügte [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) hinzu, um Googles `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) mit Links zur Kontoverifizierung anzuzeigen — ein Beleg für die aktive Durchsetzung durch Google — während alle vier Pfade zum Spoofing und zur Token-Extraktion weiterhin live sind.

<!-- section:visuals -->
## Visuelle Belege

![antigravityUsageLimits.ts hardcodet gefälschte Google-Header und ruft v1internal auf](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts fälscht SSH_CONNECTION, um die Speicherung im OS-Schlüsselbund zu umgehen](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 dokumentiert ein frisches 20-Dollar-Konto ohne Proxy, das nach 3 Minuten gesperrt wurde](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 verdrahtet das gefälschte CLIProxyAPI-Hub-Polling nativ in T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ-ToS-Zusicherung](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Technisches Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
