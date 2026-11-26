# #02 · Fałszywe usuwanie wątków w SQLite (41,6 GB balastu) i skanowanie wszystkich procesów systemu co 5 sekund

> Kliknięcie „trwale usuń” pozostawiało pełną historię rozmowy nietkniętą w `statev2.sqlite` (rozdymając lokalne dyski do 41,6 GB), podczas gdy działający w tle monitor w Rust skanował każdy proces systemu wraz z pełną linią poleceń co 5 sekund, bez możliwości rezygnacji.

<!-- section:claim -->
## Co deklarowano

- Okno potwierdzenia usunięcia w panelu bocznym (`useThreadActionMenu.ts`) wprost informowało użytkowników: *„This permanently clears conversation history for this thread.”*
- T3 Code był reklamowany jako czyste, szybkie lokalne środowisko pracy programisty.

<!-- section:evidence -->
## Co pokazują dowody

- **Fałszywe trwałe usuwanie (`Issue #17845`, `#28903`):** W wersji bazowej `9d3195b4` usunięcie wątku jedynie dopisywało zdarzenie `"thread.deleted"` do `statev2.sqlite`, pozostawiając wcześniejsze wiadomości, wyniki narzędzi i ślady rozumowania nienaruszone na dysku. Użytkownicy udokumentowali rozrost `statev2.sqlite` do **25,9 GB** w ciągu 3 tygodni (90% „usuniętych” wątków), **41,6 GB** w ciągu 6 tygodni i **33 GB** w ciągu 7 tygodni.
- **Skanowanie procesów i wierszy poleceń na całej maszynie (`Issue #11222`, `PR #41889`):** Działający w tle pomocnik `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) uruchamiał `ProcessesToUpdate::All` z `with_cmd(UpdateKind::Always)` co 5 sekund, nawet przy zamkniętej diagnostyce — utrzymując 280–300 trwałych uchwytów w ponad 440 niepowiązanych aplikacjach i grach w systemie Windows. 24 listopada [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) potwierdził, że diagnostyka przechwytywała **pełne wiersze poleceń procesów** (często zawierające jawnotekstowe klucze API, hasła do baz danych i tokeny) do zrzutów i telemetrii.
- **Wycieki firmowych nazw hostów i obowiązkowe pobieranie przy starcie:** Żądania favikony z frontendu ujawniały wewnętrzne nazwy hostów (takie jak `devbox.localdomain`) usłudze favikon Google (`PR #16950`, `PR #32657`), a serwer przy starcie bezwarunkowo pobierał manifesty zgodności z `raw.githubusercontent.com`, bez możliwości rezygnacji (`Issue #36479`).
- **Poważne zużycie limitów i błędy zasilania:** Korzystanie z Claude przez Agent SDK spalało 5-godzinne limity w tempie **1,7x** szybszym niż normalne (`Issue #7338`, `Issue #24649`, 81 komentarzy), a regresje wydajności GPU osiągały do **136x** zużycia energii porównywalnego Electrona — przypinając GPU MacBooka na poziomie **60 W** (78 minut do rozładowania baterii) i **18 W** po zamknięciu karty przeglądarki (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Częściowo załatane:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) dodał asynchroniczne `thread-content.purge` (zamykając `#17845`), a [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) zawęził odczyt monitora procesów w systemie Windows.
- **Nadal otwarte:** Usunięte wątki źródłowe nadal zachowują historię, gdy odwołują się do nich aktywne forki, oczekujące operacje `merge_back` lub aktywne podagenty; wiersze nagrobkowe pozostają w SQLite, a odzyskanie miejsca na dysku wciąż wymaga offline'owego `VACUUM`; Linux i macOS zachowują odkrywanie przez `ProcessesToUpdate::All`, a `PR #41889` pozostaje otwarty.

<!-- section:visuals -->
## Dowody wizualne

![Issue #17845 dokumentujące, jak trwale usunięte wątki rozdymają statev2.sqlite do dziesiątek gigabajtów](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 dokumentujące, jak t3-resource-monitor skanuje każdy proces systemu co 5 sekund](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Szczegółowe dossier techniczne 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
