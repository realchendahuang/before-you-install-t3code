# #19 · `ca81b7b9` Krytyczny audyt uwierzytelniania i wykonywania kodu z repozytoriów: 30-dniowy plaintextowy shell w sieci LAN, nieodwoływalne tokeny i ekspozycja `SSH_AUTH_SOCK`

> Weryfikacja linia po linii najnowszego `main` HEAD (`ca81b7b9`, 25 lis 14:49 CST) potwierdziła pięć aktywnych błędów bezpieczeństwa i niezawodności: 30-dniowe plaintextowe ciasteczka sesji shella `--lan` z obejściem przy braku nagłówka `Origin`, nieodwoływalne 30-dniowe tokeny Bearer, powtarzalne adresy URL `?wsTicket=`, `isIPv4` zabijające tunele `::1` oraz niezaufane repozytoria uruchamiające hooki i podmoduły z odziedziczonym `SSH_AUTH_SOCK` i `GITHUB_TOKEN`.

<!-- section:claim -->
## Co zostało twierdzone

- Po nocnej serii łatek z 24–25 listopada T3 Code przedstawiano jako uporządkowany i bezpieczny do codziennej pracy inżynierskiej.
- `SECURITY.md` definiuje domyślną sesję jako pełną kontrolę nad shellem użytkownika systemu, jednocześnie twierdząc, że granice lokalne/LAN są należycie zarządzane.

<!-- section:evidence -->
## Co pokazują dowody

Zweryfikowano bezpośrednio na upstreamowym commicie [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. 30-dniowe plaintextowe ciasteczka sesji shella `--lan` + obejście przy braku nagłówka `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) ustawia domyślny TTL sesji na 30 dni (co według `SECURITY.md` odpowiada pełnemu dostępowi do shella systemu). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) dodał atrybut `Secure` wyłącznie dla `https:`, przez co ciasteczka HTTP przy `t3 up --lan` są przesyłane otwartym tekstem ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Co gorsza, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) zwraca `true` za każdym razem, gdy `Origin` jest pominięty — więc każdy, kto podsłucha pojedynczy pakiet w sieci LAN, może odtworzyć ciasteczko ze skryptu nieprzeglądarkowego bez `Origin` i po cichu utrzymać 30-dniowy dostęp do shella hosta.
- **2. Nieodwoływalne 30-dniowe tokeny Bearer bez DPoP i brak trasy `/logout`:** `/oauth/token` skraca czas życia do 1 godziny tylko wtedy, gdy dostarczony jest dowód DPoP; w przeciwnym razie wydaje niepowiązany **30-dniowy token Bearer** ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Kontrakt HTTP definiuje **zero endpointów `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), a `revokeClientSession` jawnie blokuje samoodwołanie kodem `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Powtarzalne 5-minutowe tokeny URL `?wsTicket=`:** bilety WebSocket podróżują w ciągach zapytań (`?wsTicket=`, trafiając do logów proxy/dostępu) z TTL 5 minut. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) sprawdza podpis, ważność, odbiorcę i odwołanie, ale **bez magazynu jednorazowych `jti` chroniących przed powtórzeniem** — co pozwala na nieograniczone powtórzenia Bearer RPC i wszystkich biletów `media` w ciągu 5 minut ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Niezaufane repozytoria uruchamiane z pełnym `SSH_AUTH_SOCK` i `GITHUB_TOKEN`:** Konfiguracja worktree automatycznie uruchamia `git submodule update --init --recursive`, gdy tylko istnieje `.gitmodules` ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) pomija globalny guard `core.hooksPath=/dev/null`; a [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) synchronicznie uruchamia hooki `SessionStart` z `.claude/settings.json` — wszystkie dziedziczą pełne `process.env` hosta, w tym `GITHUB_TOKEN` i `SSH_AUTH_SOCK` (którego zasięg rażenia obejmuje każde zdalne repozytorium i każdy serwer produkcyjny, za które twój agent SSH może podpisywać).
- **5. `isIPv4` po cichu niszczący tunele loopback `::1`:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) dodaje `::1` do listy dozwolonych interfejsów loopback w linii 39, a następnie w linii 73 wywołuje `NodeNet.isIPv4` — błędnie klasyfikując gniazda IPv6 loopback Tailscale Serve i T3 Connect jako ruch zewnętrzny i wywołując `socket.destroy()`.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Wszystkie 5 problemów pozostaje aktywnie nieusuniętych w `ca81b7b9`:** Potwierdzono linia po linii na `main` HEAD (`2026-11-25 14:49 CST`), wraz z **0 opublikowanymi GitHub Security Advisories** (w tym cichą poprawką path traversal z 20 listopada w `PR #39483`).

<!-- section:visuals -->
## Dowody wizualne

![http.ts#L215-L241 wysyła 30-dniowe ciasteczka sesji shella bez Secure przez plaintextowy HTTP --lan](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 zwraca true za każdym razem, gdy nagłówek Origin jest pominięty](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 blokuje samoodwołanie bieżącej sesji, nie ma trasy logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 uruchamia rekurencyjną inicjalizację podmodułów pod odziedziczonym SSH_AUTH_SOCK i GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 odrzuca tunele loopback IPv6 ::1 przez NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalny post audytu na X — część 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Część 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Pogłębione dossier techniczne 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
