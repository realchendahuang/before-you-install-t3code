# #12 · Sześciogodzinny nocny zryw po GDPR: logi IP 2,2 mln/godz. i zepsute usuwanie kont

> Po złożeniu 24 listopada formalnej skargi w trybie unijnego GDPR, sześć godzin awaryjnych nocnych poprawek mimowolnie ujawniło cztery głębsze naruszenia prywatności — na czele z 2,2 mln/godz. spanami Axiom oznaczonymi adresem IP, przechowywanymi przez 30 dni.

<!-- section:claim -->
## Co twierdzono

- Jeszcze 3,5 godziny po scaleniu `PR #42380` `@theo` odpowiadał publicznie, że adresy IP wywołujących zostały już usunięte.
- Oficjalna dokumentacja (`docs/user/telemetry.md`) obiecywała, że raporty `agent.feedback` są anonimowe, a usunięcie konta czysto usuwa dane użytkownika.

<!-- section:evidence -->
## Co pokazują dowody

- **2,2 mln/godz. spanów relay z IP i User-Agent (`PR #42380`):** Każdy span żądania relay eksportowany do Axiom — około **2,2 mln spanów na godzinę, przechowywanych przez 30 dni** — zapisywał `client.address` (rzeczywisty adres IP wywołującego z `cf-connecting-ip`) oraz `user_agent.original` bezpośrednio obok `user.id` (przy czym 1% logów Workers Cloudflare pozostawał osobno).
- **Zepsute usuwanie konta w Clerk (`PR #42285` i `PR #42430`):** Usunięcie konta użytkownika w Clerk pozostawiało wcześniej w tle wiersze relay w PlanetScale i aktywne tunele Cloudflare — dopóki rzeczywiste żądanie usunięcia danych przez użytkownika nie zmusiło inżynierów do uruchomienia **ręcznie napisanego SQL i ręcznego demontażu tuneli**.
- **Wycieki tokenów push i identyfikatorów użytkownika (`PR #42459` i `PR #41859`):** Payloady push FCM na Androidzie przesyłały do Google jawny tekst wartości `user_id` z Clerk przy każdej notyfikacji; spany APNs na iOS i logi błędów przechwytywały pełne adresy URL push urządzenia wraz z tokenami push.
- **Mieszane partie „anonimowego” feedbacku (`PR #42466`):** Rzekomo anonimowe zdarzenia `agent.feedback` były pakowane w dokładnie ten sam HTTP POST razem ze zidentyfikowanymi zdarzeniami `installId` i pełnymi odciskami hosta (system, architektura, surowa dystrybucja WSL), co wprost przeczy `docs/user/telemetry.md`.

<!-- section:status -->
## Status po stronie upstream (`ca81b7b9`)

- **Częściowo załatane:** Awaryjne PR-y `#42380`, `#42285`, `#42430`, `#42459`, `#41859` i `#42466` zostały scalone w trakcie nocnego zrywu GDPR.
- **Nadal otwarte:** `privacy-policy.astro` pozostaje niezmieniony od `2026-10-06`, zamknięte źródłowo `ingest.t3.codes` przechowuje surowe kopie zdarzeń bez możliwości niezależnego audytu, a wcześniejsze 30-dniowe okresy retencji w Axiom nigdy nie zostały formalnie ujawnione dotkniętym użytkownikom.

<!-- section:visuals -->
## Dowody wizualne

![PR #42380 ujawnia, że ~2,2 mln/godz. spanów relay zapisywało rzeczywisty adres IP wywołującego i User-Agent obok user.id przez 30 dni w Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 przyznaje, że usuwanie konta pozostawiało wcześniej wiersze PlanetScale i aktywne tunele Cloudflare](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 przyznaje, że push FCM na Androidzie wysyłał surowe wartości Clerk user_id do Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 przyznaje, że anonimowy feedback był pakowany razem z installId i odciskami hosta](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
