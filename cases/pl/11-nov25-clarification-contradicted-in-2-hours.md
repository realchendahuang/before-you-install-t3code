# #11 · Wyjaśnienie z 25 listopada obalone w ciągu 2 godzin przez nocne PR-y i zrzut 100 MB

> Rankiem 25 listopada @theo przedstawił trzy daleko idące zapewnienia dotyczące prywatności i udostępnił zrzut telemetrii o rozmiarze 100 MB — wszystkie trzy twierdzenia zostały obalone w ciągu dwóch godzin przez PR-y jego własnego zespołu i sam zrzut spakowany gzipem.

<!-- section:claim -->
## Co zadeklarowano

W swoim porannym wyjaśnieniu z 25 listopada ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) oraz w uzupełniającej odpowiedzi ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) `@theo` zapewniał użytkowników:
- T3 Code *"never collected file paths."*
- Zmienne środowiskowe *"always disabled telemetry cleanly."*
- Instalacje z wyłączoną telemetrią nie zapisują żadnych lokalnych plików śledzących, a skróty właściciela Claude były *"broken."*

<!-- section:evidence -->
## Co pokazują dowody

- **Sprzeczność 1 — wyciek bezwzględnej ścieżki obszaru roboczego w `git.cwd` (`PR #42450`):** Mniej więcej 90 minut po publikacji wpisu główny opiekun projektu Julius scalił [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), przyznając, że uruchomienia webhooków dostarczanych przez relay eksportowały całe spany wykonania do Axiom — w tym spany Git zawierające `git.cwd` (**pełną bezwzględną ścieżkę obszaru roboczego, nazwę użytkownika systemu i nazwę repozytorium**).
- **Sprzeczność 2 — zepsute wyłączenia telemetrii w Windows i macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) przyznał, że aplikacja desktopowa na Windows ignorowała zapisane zmienne środowiskowe użytkownika `T3CODE_TELEMETRY_ENABLED=false`, gdy była uruchamiana przez wcześniej istniejące procesy. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) przyznał, że śledzenie relay przy pierwszym uruchomieniu na macOS/Linux inicjalizowało się przed wykryciem powłoki, ignorując wyłączenia z `~/.zshrc` przez całą sesję.
- **Sprzeczność 3 — bezwarunkowe zapisy na dysk i 264 aktywne rekordy Claude w `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` at `ca81b7b9`) nadal bezwarunkowo wywołuje `getTelemetryIdentity` przy starcie, zapisując lokalny UUID instalacji (`upsertAnonymousId`) przed sprawdzeniem `telemetryEnabled`. Tymczasem nagłówek gzip publicznego eksportu `@theo` (`6,056,594` bajtów po kompresji, `95,789` zdarzeń) wskazywał oryginalną nazwę pliku `events.clean.jsonl`, wygenerowanego 20 minut przed opublikowaniem wpisu — a mimo to zawierał **264 aktywne rekordy właściciela Claude** wiążące **4 osobne maszyny** (`installId`) z jednym skrótem SHA-256, obok dosłownych nazw prywatnych modeli proxy (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Częściowo załatane:** `PR #42450`, `PR #42376` i `PR #42464` scalono w ciągu nocy.
- **Nadal otwarte:** `AnalyticsService.ts:156` wciąż bezwarunkowo zapisuje lokalny anonimowy identyfikator przed sprawdzeniem wyłączeń, a `DesktopShellEnvironment.ts` wciąż nie przekazuje `T3CODE_OTEL_SDK_DISABLED` i `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Dowody wizualne

![PR #42450 przyznający, że uruchomienia wyzwalane przez relay eksportowały bezwzględne ścieżki obszaru roboczego git.cwd do Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 przyznający, że aplikacja desktopowa na Windows ignorowała zapisane zmienne środowiskowe T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 przyznający, że śledzenie relay przy pierwszym uruchomieniu na macOS ignorowało wyłączenia z ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Audyt kryminalistyczny events.clean.jsonl ujawniający 264 rekordy Claude wiążące 4 maszyny i prywatne identyfikatory modeli proxy](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [wyjaśnienie `@theo` z 25 listopada (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [uzupełniająca odpowiedź (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [publiczny zrzut spakowany gzipem](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Pogłębione dossier techniczne 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
