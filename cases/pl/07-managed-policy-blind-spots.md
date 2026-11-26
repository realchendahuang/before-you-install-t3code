# #07 · Sprzeczność wokół polityki zarządzanej: cztery udokumentowane martwe punkty telemetrii

> @theo twierdził, że T3 Code ma „najlepszy w branży system polityk zarządzanych dla firm”, dzięki któremu „wyłączenie całej telemetrii jest banalnie proste” — co stoi w bezpośredniej sprzeczności z własnymi dokumentami T3 Code: `docs/user/telemetry.md` i `docs/user/managed-policy.md`.

<!-- section:claim -->
## Co zostało twierdzone

- 24 listopada o 19:13 CST `@theo` zbył brak przełączników rezygnacji dla użytkowników: *„Mamy najlepszy w branży system polityk zarządzanych dla firm, banalnie prosty do skonfigurowania i wyłączenia całej telemetrii. 100x łatwiejszy niż narzędzia takie jak cursor.”* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Pół godziny później dodał, że dane rozmów *„nigdy nie trafiają na żaden z naszych serwerów”* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Co pokazują dowody

Oficjalna dokumentacja samego T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) oraz [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) dokumentuje cztery konkretne martwe punkty:

- **Wdrożenie wyłącznie administracyjne (zero osobistego przełącznika w UI):** Użytkownicy aplikacji desktopowej nie mają przełącznika w Ustawieniach. Polityka zarządzana wymaga MDM/GPO lub chronionych przez administratora ścieżek systemowych (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code` lub `/etc/t3code/policy.json`), całkowicie niedostępnych dla użytkowników desktopu bez uprawnień administratora.
- **Hostowana aplikacja webowa (`app.t3.codes`) ignoruje politykę:** Aplikacja przeglądarkowa ignoruje zmienne środowiskowe serwera i Politykę zarządzaną, emituje ślady połączeń, gdy została zbudowana z tracingiem, i *„nie ma przełącznika śledzenia relay”*.
- **Aplikacje mobilne znajdują się poza polityką serwera:** Oficjalna dokumentacja potwierdza, że zmienne środowiskowe serwera i Polityka zarządzana *„nie wyłączają śledzenia w aplikacjach mobilnych”*.
- **`Publish agent activity` ignoruje rezygnacje:** Wysyła tytuły projektów, tytuły wątków, nazwy modeli i bieżący status do T3 Connect — a dokumentacja wyraźnie stwierdza: *„Rezygnacja z telemetrii tego nie wyłącza.”* Ponadto nieudane spany Axiom i logi awarii *„mogą cytować wartość, którą przetwarzała aplikacja”*, a `Agent feedback` może dołączyć do 16 KB wiadomości z rozmowy.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Nadal otwarte:** Nocny [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) dodał przełącznik śledzenia mobilnego w aplikacji, ale Polityka zarządzana nadal nie może wyłączyć śledzenia w aplikacjach mobilnych, hostowana `app.t3.codes` nadal nie ma żadnego przełącznika rezygnacji, `Publish agent activity` nadal ignoruje rezygnacje z telemetrii, a w Ustawieniach aplikacji desktopowej nadal nie istnieje żaden przełącznik.

<!-- section:visuals -->
## Dowody wizualne

![Oficjalna dokumentacja docs/user/telemetry.md potwierdzająca, że app.t3.codes nie ma przełącznika, aplikacje mobilne ignorują Politykę zarządzaną, a aktywność agenta ignoruje rezygnacje](../../evidence/05-telemetry-cant-disable.png)

![Oficjalna dokumentacja docs/user/managed-policy.md wymieniająca chronione przez administratora ścieżki systemowe w macOS, Windows i Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Post Theo z 24 listopada twierdzący, że Polityka zarządzana czyni wyłączenie całej telemetrii banalnie prostym](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Twierdzenie `@theo` o Polityce zarządzanej (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` „nigdy nie trafiają na serwery” (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Szczegółowe dossier techniczne 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
