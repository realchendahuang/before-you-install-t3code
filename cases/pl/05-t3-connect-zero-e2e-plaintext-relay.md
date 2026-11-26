# #05 · T3 Connect: brak szyfrowania end-to-end i brama TLS przetwarzająca tekst jawny

> Każde polecenie, plik źródłowy i strumień terminala przesyłane przez T3 Connect kończą bieg jako tekst jawny w infrastrukturze kontrolowanej przez T3 — bez szyfrowania end-to-end i z domyślnie wyłączonym zatwierdzaniem urządzeń.

<!-- section:claim -->
## Co deklarowano

- 24 listopada `@theo` stwierdził, że dane rozmów *„lives on your machine. It never touches any of our servers”* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) obiecuje *„encrypted network transport”*, nie ujawniając braku szyfrowania end-to-end.

<!-- section:evidence -->
## Co pokazują dowody

- **Widoczność tekstu jawnego wewnątrz przekaźnika T3 (`ManagedEndpointProvider.ts`):** T3 Connect tworzy Cloudflare Tunnels na własnym koncie Cloudflare firmy T3 (`docs/internals/06_t3-connect.md`). TLS transportu kończy się na brzegu Cloudflare, bez jakiegokolwiek szyfrowania ładunku między klientami, co oznacza, że podłączenie Cloudflare Workers Route odsłania każde polecenie, plik i strumień terminala w postaci jawnej.
- **Szyfrowanie E2E odrzucone jako poza zakresem (`Issue #32098`):** Gdy deweloperzy poprosili o wzajemne uwierzytelnianie i szyfrowanie end-to-end, opiekun projektu zamknął [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) jako zbyt dużą zmianę; dyskusje `#21286` i `#37831` pozostały bez odpowiedzi. 25 listopada `@theo` ogłosił, że szyfrowanie E2E jest niemożliwe ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migracja do obsługiwanej przez T3 bramy OVH Caddy (`PR #32945`):** Gdy rachunki za Cloudflare Tunnel osiągnęły **25 000 USD miesięcznie**, `@theo` otworzył [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945), aby przenieść się na wynajmowany przez T3 serwer OVH w Hillsboro (`gw.t3coderelay.com`), gdzie własna instancja Caddy firmy T3 kończy TLS i przekazuje tekst jawny przez gniazdo Unix do proxy `yamux` napisanego w Go — wciąż bez szyfrowania E2E.
- **Domyślnie wyłączone zatwierdzanie urządzeń (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` nadal domyślnie ma wartość `false` w [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Jak przyznaje `SECURITY.md`, przejęte konto w chmurze lub wyciek klucza podpisującego przekaźnika daje dostęp do hosta równoważny dostępowi do powłoki.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Wciąż otwarte:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) dodał powiadomienia o logowaniu, ale **T3 Connect nadal nie ma żadnego szyfrowania end-to-end**, `requireConnectDeviceApproval` pozostaje domyślnie `false`, a `privacy-policy.astro` nie zmienił się od `2026-10-06`.

<!-- section:visuals -->
## Dowody wizualne

![Issue #32098 potwierdzający, że skradzione konto w chmurze lub klucz przekaźnika pozwala kontrolować połączone maszyny bez szyfrowania E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 przenoszący T3 Connect na samodzielnie hostowaną bramę OVH, na której Caddy kończy TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts tworzący Cloudflare Tunnels na własnym koncie T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Komentarz do Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Dyskusja #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Dyskusja #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Pogłębione dossier techniczne 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
