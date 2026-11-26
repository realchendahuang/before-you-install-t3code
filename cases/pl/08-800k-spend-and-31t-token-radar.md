# #08 · Biznesowy rejestr wydatków ponad 800 000 USD i dzienny radar mocy obliczeniowej 31,7 biliona tokenów

> Telemetria włączona domyślnie nie była przeoczeniem inżynierskim: finansowała działający w czasie rzeczywistym radar wywiadowczy o przepustowości 31,7 bln tokenów dziennie (równowartość 10,19 mln USD wydatków na API dziennie), wymieniany na ponad 300 tys. USD darmowych tokenów wczesnego dostępu OpenAI i kontakty z inwestorami.

<!-- section:claim -->
## Co twierdzono

- T3 Code przedstawiano jako darmowe narzędzie open source na licencji MIT, tworzone z czystej pasji, a telemetrię tłumaczono wyłącznie jako podstawowe liczenie, by *"know how many users we have."*
- `@theo` twierdził również, że `@PatrickToulme` z DeepMind wniósł *"many PRs"* do T3 Code.

<!-- section:evidence -->
## Co pokazują dowody

- **Wydatki ponad 800 tys. USD i całkowity zwrot od płatnych produktów:** We wszystkich **1 151 kolejnych postach na X** z okresu 7–24 listopada `@theo` wspomniał T3 Code **162 razy (14,1%)**, wobec **0 wzmianek** o swoich wcześniejszych płatnych produktach (`T3 Chat`, `UploadThing`, `ping.gg`), jednocześnie publicznie potwierdzając **ponad 800 tys. USD** wydanych z własnej kieszeni na darmowego klienta ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)).
- **Radar analityczny 31,7 bln tokenów dziennie (10,19 mln USD dziennie):** Surowe zdarzenia gromadzone przez zamknięty źródłowo `ingest.t3.codes` zasilały wewnętrzny dashboard śledzący **31,7 biliona tokenów dziennie** (**równowartość 10,19 mln USD** wydatków na API 18 listopada, ze szczytem blisko **10,2 mln USD dziennie**) oraz szczegółowe podziały udziałów laboratoriów (`99%` opartych na subskrypcjach, `~98.5%` łącznie w Codex/Claude/Antigravity, udział modeli open-weight spadający z `15%` do `6%`). Gdy 23 listopada komentujący spekulował o udziałach rynkowych, `@theo` wykpił go za brak dostępu do swoich analityk ([`2124682906132181482`](https://x.com/theo/status/2124682906132181482)).
- **Zamiana telemetrii użytkowników na przywileje od laboratoriów i dźwignię wobec inwestorów:** `@theo` publicznie przyznał, że przepalił **ponad 300 tys. USD na nielimitowanych darmowych tokenach wczesnego dostępu OpenAI** na benchmarku GPT-6.2 Astra ([`2122760447103484410`](https://x.com/theo/status/2122760447103484410)), przeprowadzał benchmarki na sprzęcie bare-metal Google i odbierał napływające zapytania od inwestorów (*"multiple investors have asked me about this"*, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).
- **Wyolbrzymiona współpraca z laboratorium:** historia commitów Git przefiltrowana po `patrick-toulme` pokazuje dokładnie **1 commit** ([`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158)), a nie *"many PRs."*

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Zapis publiczny / aktywny model biznesowy:** `ingest.t3.codes` pozostaje zamknięty źródłowo i domyślnie włączony w `ca81b7b9`, nadal zasilając ten sam wewnętrzny potok analityczny.

<!-- section:visuals -->
## Dowody wizualne

![Wewnętrzny dashboard T3 Code Theo, pokazujący 31,7 biliona tokenów i równowartość 10,19 mln USD dziennych wydatków na API](../../evidence/17-theo-31t-tokens-10m-day.png)

![Theo ujawniający wydatki ponad 800 tys. USD na T3 Code](../../evidence/extra/p6-1-x-theo-800k-cost.png)

![Log commitów Git pokazujący tylko 1 commit (#31158) od patrick-toulme, a nie "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## Główne źródła

- [Oryginalne śledztwo na X (część 8)](https://x.com/realchendahuang/status/2125392410763239723)
- [Wydatki ponad 800 tys. USD (`2120729779511124267`)](https://x.com/theo/status/2120729779511124267) · [Dashboard 31,7 bln / 10,19 mln USD (`2122860770329608290`)](https://x.com/theo/status/2122860770329608290) · [Podział udziałów laboratoriów (`2123965784888377541`)](https://x.com/theo/status/2123965784888377541)
- [Kpina z analityk (`2124682906132181482`)](https://x.com/theo/status/2124682906132181482) · [Tokeny OpenAI o wartości ponad 300 tys. USD (`2122760447103484410`)](https://x.com/theo/status/2122760447103484410) · [Zapytania inwestorów (`2123885732330885417`)](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [Pogłębione dossier techniczne 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
