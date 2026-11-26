# #04 · Podszywanie się pod nagłówki Google Antigravity, fałszywy `SSH_CONNECTION` i bany kont w 3 minuty

> Mimo że w swoim FAQ gwarantuje zgodność z ToS, T3 Code wyciąga dane uwierzytelniające z keyringa systemu operacyjnego, podszywa się pod wewnętrzne nagłówki Google (`antigravity/hub/2.24.0`) wobec `v1internal` i wstrzykuje fałszywe wartości `SSH_CONNECTION` — narażając osobiste subskrypcje Google na gwałtowne bany.

<!-- section:claim -->
## Co zostało zadeklarowane

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) zapewniał płacących subskrybentów: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Gdy zbanowani użytkownicy zgłosili [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), opiekun projektu zaprzeczył, jakoby uderzano w backend Antigravity lub ponownie wykorzystywano tokeny — a na X `@theo` obwinił proxy firm trzecich (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Co pokazują dowody

- **Wyciąganie danych z systemowego magazynu poświadczeń i podszyte wywołania `v1internal`:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) wyciąga tokeny Google OAuth z plików lokalnych, z `@napi-rs/keyring` lub z Windows Credential Manager (`CredReadW` przez `ffi-rs` na `advapi32.dll`), na sztywno wpisuje `antigravity/hub/2.24.0` i wysyła `POST` bezpośrednio do prywatnego punktu końcowego `v1internal` Google. Pracownicy Google potwierdzili na [oficjalnym forum](https://discuss.ai.google.dev/t/185992), że sekcja 6 [Google Antigravity ToS](https://antigravity.google/terms) zakazuje narzędziom zewnętrznym wydobywania i ponownego wykorzystywania danych uwierzytelniających do bezpośredniego odpytywania punktów końcowych backendu.
- **Sfałszowany `SSH_CONNECTION` i wyciek między kontami:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) wstrzykuje podrobioną zmienną środowiskową `SSH_CONNECTION` (`"127.0.0.1 0 127.0.0.1 0"`), by wyprowadzić CLI Google z izolacji systemowego keychaina i zmusić je do zwykłych plików tekstowych. Gdy Google zaktualizowało swoje CLI 24 listopada, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) potwierdził, że zapytania z konta A były po cichu kierowane do konta B.
- **Świeże konto za 20 USD zbanowane w 3 minuty (`Issue #41536`):** Zupełnie nowa subskrypcja Google AI za 20 USD, bez żadnych proxy — korzystająca wyłącznie z Antigravity zarządzanego przez T3 — została zbanowana przy pierwszej wiadomości, 3 minuty po konfiguracji. Opiekunowie zamknęli zgłoszenie jako duplikat, nie dodając żadnego ostrzeżenia dla użytkowników.
- **Podszywanie się pod natywnego klienta i CLIProxyAPI:** `@theo` osobiście scalił [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) podszywający się pod `"zed"`, a scalony [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) podłączył odpytywanie huba w [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) z podszytymi nagłówkami `claude-code/2.1.273`, `grok-cli/1.0.77` i `antigravityUserAgent`.

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
## Status po stronie upstream (`ca81b7b9`)

- **Nadal aktywne:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) dodał [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts), aby wyświetlać linki do weryfikacji konta przy odpowiedzi Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — co potwierdza aktywne egzekwowanie zasad przez Google — podczas gdy wszystkie cztery ścieżki podszywania się i wyciągania tokenów pozostają czynne.

<!-- section:visuals -->
## Dowody wizualne

![antigravityUsageLimits.ts z na sztywno wpisanymi podszytymi nagłówkami Google i wywołaniem v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts fałszujący SSH_CONNECTION, by ominąć systemowe przechowywanie keychaina](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 dokumentujący świeże konto za 20 USD bez proxy, zbanowane w 3 minuty](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 natywnie podłączający podszyte odpytywanie huba CLIProxyAPI do T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Źródła pierwotne

- [Original X Investigation (Part 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ ToS guarantee](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
