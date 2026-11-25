# Zanim zainstalujesz T3 Code

<p align="center">
  <strong>Języki oficjalne ONZ:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>Edycje społeczności globalnej:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md"><strong>Polski</strong></a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

![Zanim zainstalujesz T3 Code — baner niezależnego audytu w 18 częściach](../../evidence/00-cover-en.png)

> **Zakres i zasady weryfikacji**  
> To repozytorium stanowi niezależny audyt bezpieczeństwa, telemetrii, zarządzania projektem oraz dokumentacji publicznej `pingdotgg/t3code` (T3 Code). Zestawia 2 wpisy źródłowe oraz **18 udokumentowanych części audytu** opublikowanych w dniach 24–25 listopada 2026 roku wraz z **ponad 180 kanonicznymi adresami URL źródeł pierwotnych** (commity, pull requesty i zgłoszenia issues na GitHubie, dosłowne pliki źródłowe, oficjalna dokumentacja, rejestry USPTO TSDR i zarchiwizowane wpisy publiczne), sześcioma pogłębionymi dossier technicznymi ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)) oraz ilościowym zbiorem danych obejmującym **1151 kolejnych wpisów `@theo` na X** (7–24 listopada 2026 r.). Nie zamieszczono tu żadnych skróconych przekierowań ani prywatnych danych kontaktowych. Aktualizacje oparte na faktach, później scalone poprawki oraz dodatkowe tłumaczenia są mile widziane w formie Pull Requestu z bezpośrednim wskazaniem źródeł pierwotnych — szczegóły w [`CONTRIBUTING.md`](../../CONTRIBUTING.md) i [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md).

---

## Spis treści

- [Strukturalne ustalenia i macierz ryzyka](#strukturalne-ustalenia-i-macierz-ryzyka)
- [Oś czasu wydarzeń (2023–2026)](#oś-czasu-wydarzeń-20232026)
- [1. Spór u źródła: „Steal Our Code”, groźba z powodu nazwy forka i podwójne standardy](#1-spór-u-źródła-steal-our-code-groźba-z-powodu-nazwy-forka-i-podwójne-standardy)
- [2. Telemetria, odczyt poświadczeń innych narzędzi i nocny sprint po skardze RODO (Części 1, 7, 11, 12)](#2-telemetria-odczyt-poświadczeń-innych-narzędzi-i-nocny-sprint-po-skardze-rodo-części-1-7-11-12)
- [3. Pamięć lokalna, monitorowanie procesów, omijanie zabezpieczeń i nieujawnione poprawki bezpieczeństwa (Części 2, 3, 13)](#3-pamięć-lokalna-monitorowanie-procesów-omijanie-zabezpieczeń-i-nieujawnione-poprawki-bezpieczeństwa-części-2-3-13)
- [4. Ryzyko naruszenia ToS Google Antigravity i nieszyfrowany przekaźnik T3 Connect (Części 4, 5)](#4-ryzyko-naruszenia-tos-google-antigravity-i-nieszyfrowany-przekaźnik-t3-connect-części-4-5)
- [5. Bilans biznesowy, konflikty inwestorskie, sponsorzy i lejek 77 000 gwiazdek (Części 6, 8, 17, 18)](#5-bilans-biznesowy-konflikty-inwestorskie-sponsorzy-i-lejek-77-000-gwiazdek-części-6-8-17-18)
- [6. Zarządzanie projektem, boty kopiujące forki, znaki towarowe, zbiór 1151 tweetów i historia incydentów (Części 9, 10, 14, 15, 16)](#6-zarządzanie-projektem-boty-kopiujące-forki-znaki-towarowe-zbiór-1151-tweetów-i-historia-incydentów-części-9-10-14-15-16)
- [7. Praktyczny plan łagodzenia skutków i działań naprawczych](#7-praktyczny-plan-łagodzenia-skutków-i-działań-naprawczych)
- [8. Źródła pierwotne i pełny indeks 18 oryginalnych części](#8-źródła-pierwotne-i-pełny-indeks-18-oryginalnych-części)

---

## Strukturalne ustalenia i macierz ryzyka

| Obszar i części audytu | Ryzyko / Wpływ | Kluczowe udokumentowane ustalenia i dowody źródłowe | Status (25 listopada 2026) | Szczegółowe dossier |
|---|---|---|---|---|
| **Telemetria i prywatność po skardze RODO/GDPR**<br>*(Części 1, 7, 11, 12)* | **Krytyczne** | Domyślna telemetria PostHog (`PR #174`), gdy strona główna obiecywała `"No telemetry / Unless you opt in. Full stop."` (usunięte przez `3bdaa6e1` 18 czerwca); przechowywanie surowych zdarzeń przez zamknięty `ingest.t3.codes` (`PR #15028`); niesolone haszowanie SHA-256 plików `~/.codex/auth.json` i `~/.claude.json` między narzędziami (`Identify.ts`, `telemetryId.ts`); 4 odrzucone PR-y z wyłącznikiem (`#13458`, `#16763`, `#21248`, `#27077`); luki Managed Policy (`docs/user/telemetry.md`); nocne PR-y po skardze RODO ujawniające **2,2 mln/godz. spanów z IP + UA** przetrzymywanych 30 dni w Axiom (`#42380`), wycieki ścieżek `git.cwd` (`#42450`), ignorowanie opt-out na Win/Mac (`#42376`, `#42464`), zepsute usuwanie kont (`#42285`) oraz mieszanie anonimowych paczek (`#42466`). | Częściowe poprawki nocne; `AnalyticsService.ts` wciąż tworzy identyfikator na dysku przy starcie; aplikacja webowa nadal bez przełącznika; `ingest.t3.codes` pozostaje zamkniętym kodem | [**Dossier 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **Bezpieczeństwo lokalne i ciche biuletyny**<br>*(Części 2, 3, 13)* | **Krytyczne** | „Trwałe usunięcie” w panelu bocznym jedynie dopisuje `"thread.deleted"` w `statev2.sqlite` (puchnięcie do 25,9–41,6 GB, `#17845`); `t3-resource-monitor` skanuje wszystkie procesy systemu wraz z liniami poleceń (`ProcessesToUpdate::All`, `#11222`, `PR #41889`); tryb Claude Auto po cichu zatwierdza `git push --force` przy 3. próbie (`#15353`, otwarte od 52–53+ dni); usunięcie filtra modeli prywatnych w 21 godz. na potrzeby `slopalytics.com` (`#41237`); **0 GitHub Security Advisories** mimo cichych poprawek (`#39483`, `#41757`, `#42386`, `#42504`); otwarte zgłoszenie dot. alarmów AV dla Base64 PowerShell w Windows (`#30997`); `SECURITY.md` uznaje ogólnosystemowy `filesystem:read` i nieszyfrowany HTTP na iOS za zamierzone. | `#17845`, `#15353`, `#26489`, `#30997` pozostają nierozwiązane / otwarte; `0` opublikowanych Security Advisories | [**Dossier 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **ToS Antigravity i przekaźnik T3 Connect**<br>*(Części 4, 5)* | **Wysokie** | `docs/user/faq.md` gwarantuje zgodność z ToS Google Antigravity, tymczasem `antigravityUsageLimits.ts` wydobywa tokeny z pęku kluczy OS / Windows `CredReadW`, podszywa się pod `antigravity/hub/2.24.0` i uderza w prywatne endpointy `v1internal`; `antigravityAuthSupport.ts` wstrzykuje fałszywy `SSH_CONNECTION`, powodując mieszanie kont (`#41973`); nowe konto za $20 zbanowane w 3 minuty (`#41536`); `PR #33800` wpina podszyty polling CLIProxyAPI dla `claude`/`xai`/`antigravity`; T3 Connect **nie ma żadnego szyfrowania E2E**, ma domyślnie wyłączony `requireConnectDeviceApproval` (`#36419`) oraz otwartą bramę OVH Caddy terminującą TLS (`PR #32945`). | Kod podszywania się pod Antigravity pozostaje aktywny; szyfrowanie E2E w T3 Connect wprost odrzucone (`#32098`, odpowiedź z 25 listopada) | [**Dossier 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **Bilans biznesowy, sponsorzy i 77 tys. gwiazdek**<br>*(Części 6, 8, 17, 18)* | **Wysokie** | Ponad $800k wydatków na darmowego klienta (`162` wzmianki T3 vs `0` o płatnych produktach); radar obliczeniowy **31,7 bln tokenów/dobę** ($10,19 mln/dobę) przehandlowany za >$300k darmowych tokenów wczesnego dostępu OpenAI i zainteresowanie VC; konflikty anioła biznesu w Vibe Kanban i Daytona; stos sponsorów (Clerk, Axiom, wyłączność Vercel); exploit 0% w Codex (`Endless` / `codex#45444`); 10-kontowy Gist `CLIProxyAPI` (`555%` limitu) obok ostrzeżenia o banach w FAQ; okienko po 5 promptach / 30 s bezczynności wysyłające `PUT user/starred/...` z poświadczeniami hosta (`#27832`, `#29922`, `#29987`), omijające Macroscope i pozostawiające przypisanie dowolnego repozytorium w `driver.ts#L60-L99` nienaprawione przez 19 dni. | Nierozwiązany błąd gwiazdkowania dowolnych repozytoriów w `driver.ts` oraz recenzja `zhilsinger` po 19 dniach; >77 tys. gwiazdek vs ~129 obserwujących | [**Dossier 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **Zarządzanie, znaki towarowe i historia**<br>*(Źródła 1–2, Części 9, 10, 15, 16)* | **Średnie–Wysokie** | 500 commitów/dzień / 700 agentów / `yolo merges` w zestawieniu z `CONTRIBUTING.md` (`"here's my advice: Don't"`), publicznym piętnowaniem i banami w `.github/VOUCHED.td`, `174` etykietami `unwanted`, usunięciem trybu Plan (`#5551`, `#9190`, `#33131`) i obelgami w `#33639`; publiczne zlecanie `@bot` scrapowania forków (`@MiaAI_lab`), wezwania do demonetyzacji przez Community Notes i auto-bloker; **0 rejestracji USPTO** dla `T3 Code`/`T3 Tools`/`T3 Connect` (`PING LABS` `97294243` porzucone; EquipmentShare `7795672` zarejestrowane) w chwili grożenia zablokowaniem na GitHubie; wsteczny `PR #41898` z `TRADEMARK.md` po 17 godz.; wzorzec z lat 2024–2026 (`vsc-material-but-i-wont-sue-you`, nagonka na twórców z Indii, nagroda $20k przeciw FFmpeg, usunięta o 4 rano 25 listopada groźba zamknięcia kodu). | `CONTRIBUTING.md` / `.github/VOUCHED.td` i `TRADEMARK.md` pozostają na gałęzi `main` | [**Dossier 05**](../dossiers/05-governance-trademark-and-history.md) |
| **Ilościowy zbiór 1151 tweetów**<br>*(Część 14)* | **Punkt odniesienia audytu** | Pełny korpus z 7–24 listopada (`n = 1151`, 17,24 dnia, 66,8 posta/dobę, 75,6% odpowiedzi, mediana odstępu 2,7 min): **0,0% wulgaryzmów/obelg** wobec 20 menedżerów big-tech, pracowników laboratoriów i KOL-ów (`0/43` przy ścisłym pierwszym `@`, `32,6%` podziękowań) w porównaniu z **8,0% wrogości** wobec zwykłych programistów (`61/766`) oraz **4,0-krotnym skokiem do 14,4%** (`19/132`) bezpośrednich obelg osobistych w 25-godzinnym oknie kryzysu wokół chińskiego forka. | Powtarzalny audyt regex z 4 wykresami | [**Dossier 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **Pełny katalog źródłowych URL** | **Referencja** | Kompletny, krzyżowo zweryfikowany wykaz wszystkich kanonicznych adresów `https://` w tym portalu, `canonical_refs.txt`, `tco_resolved.json`, `all_18_posts.txt` i `missing_posts_full.json`. | 100% kanonizacji (zero linków `t.co`) | [**Indeks źródeł**](../COMPLETE-SOURCE-INDEX.md) |

---

## Oś czasu wydarzeń (2023–2026)

| Data / Godzina | Wydarzenie | Weryfikowalny artefakt / Źródło |
|---|---|---|
| **2023-05-14** | `@theo` publikuje listę sponsorów swojego kanału YouTube (`@vercel`, `@clerk`, `@upstash`, `@axiomhq`, `@PlanetScale`). Clerk i Axiom stają się później fundamentem uwierzytelniania i logowania w T3 Code. | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | CEO Vercel potwierdza sponsorowanie tylko jednego youtubera (`Theo`); `@theo` przyznaje, że umowy sponsorskie zawierały klauzule wyłączności zakazujące promocji konkurencji. | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [Wideo](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(2 lata wcześniej)* | `@theo` forkuje motyw VS Code jako `vsc-material-but-i-wont-sue-you`, wyśmiewając temperament autora oryginału; osobno, po tym jak jego film wymierzony w indyjskie kanały tutorialowe wywołał falę nękania, publikuje film z przeprosinami (`I screwed up.`), potępiając ataki na tle narodowościowym. | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | USPTO odrzuca jedyne zgłoszenie znaku towarowego T3 Tools Inc. (`PING LABS`, Serial `97294243`) i oznacza je jako `ABANDONED` (19 maja 2025). EquipmentShare rejestruje `T3` w klasach oprogramowania/SaaS 9 i 42 (`Reg. 7795672`, 13 maja 2025). | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` ściera się z FFmpeg na X i ogłasza **nagrodę $20,000** za usunięcie opiekuna FFmpeg; Windscribe kontruje ofertą $21,000, założyciel VLC protestuje, deweloperzy FFmpeg dokumentują publiczne nękanie, a `@theo` usuwa film/tweety i wycofuje nagrodę. | [Zapis dot. FFmpeg](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | **PR #174** zostaje scalony z `pingdotgg/t3code`, włączając domyślną telemetrię PostHog bez okna zgody, przełącznika w ustawieniach i dokumentacji telemetrii. | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` publikuje *"Github has a fake star problem"*, pisząc, że gwiazdki na GitHubie to `"mostly a way for companies to trick VCs into investing"`. | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | **Commit `3bdaa6e1`** po cichu usuwa `No telemetry / Unless you opt in. Full stop.` ze strony głównej T3 Code po ponad 3 miesiącach domyślnego zbierania telemetrii. | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | Opiekun Julius zamyka **Issue #1397** (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*. | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | **Issue #4123** (zarchiwizowane zrzuty „No telemetry”) zamknięte po cichu 4 listopada; 4 społecznościowe PR-y z opt-out (`#13458`, `#16763`, `#21248`, `#27077`) odrzucone (`#27077` zamknięty jako `unwanted` mimo 147 zaliczonych testów). | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | **PR #5551** chowa przełącznik Build/Plan (`Reality check for those upset`, 10 głosów w dół); **PR #9190** ukrywa wskaźnik kontekstu (16 głosów w dół — rekord repozytorium). | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` chwali się wyciągnięciem **$800+** ponad limit 0% w Codex, a `@maria_rcks` publikuje *Endless*; oboje kasują materiały po krytyce (`2090972426876129658`); OpenAI zaostrza odcięcie tur przy 0% (`openai/codex#45444`). | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | Odnotowano **Issue #15353** (cichy `git push --force` w Claude Auto, 3 paź), `privacy-policy.astro` (`2026-10-06`) oraz **Issue #17845** (pozorne usuwanie w `statev2.sqlite`, 10 paź). | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | **PR #15028** kieruje telemetrię przez zamknięty `ingest.t3.codes`; **PR #21506** dodaje niesolone haszowanie SHA-256 między narzędziami w `Identify.ts`; `@theo` publikuje 10-kontowy Gist `CLIProxyAPI` (`555%` limitu). | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | **PR #27832**, **#29922** i **#29987** wdrażają powiadomienie po 5 promptach / 30 s bezczynności wykonujące `PUT user/starred/...` poświadczeniami hosta; `zhilsinger` wystawia `Request changes` 6 listopada (bez odpowiedzi przez 19 dni). | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | Scrapowanie forka przez `@bot` (`@MiaAI_lab`), usunięcie trybu Plan (`#33131`), ujawnienie wydatków `$800k+` i radaru `31.7T/day` / `$10.19M/day`, `$300k+` darmowych tokenów OpenAI, przepisanie `CONTRIBUTING.md`, powiązania z Vibe Kanban/Daytona, `PR #41237` usuwa filtr modeli w 21 godz. | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` pisze o `"Chinese knockoff"` i `"Temu3 Code"` oraz grozi usunięciem konta na GitHubie (`2124829315657576890`); autor forka MIT zmienia nazwę na `Stardust` w 30 min; następuje prywatne przeproszenie na DM, publiczne posty pozostają. | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [Wpis źródłowy 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` przyklaskuje kopiowaniu kodu MIT przez amerykańskie korporacje warte biliony (`2124989435154726982`), drwi z kwestii prawnych (`"get a better lawyer"`), ukazują się Wpisy źródłowe 1–2, a o **12:21 CST** (`04:21Z`, 17 godz. po groźbie bana) `@theo` scala **PR #41898**, wstecznie dodając `TRADEMARK.md`. | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | Publikacja **Części 1–5** audytu (Część 1 osiąga **1,81M+ wyświetleń**, 6640 zakładek). O `18:39 CST` `@theo` nazywa chiński tech-Twitter `"the biggest fucking cesspit"` (`2125177503526588877`); o `19:13–19:36 CST` twierdzi, że Managed Policy wyłącza całą telemetrię (`2125186071357251715`). | [Część 1](https://x.com/realchendahuang/status/2125153472450527440) → [Część 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 Noc – 2026-11-25 ~07:00 CST** | Złożenie formalnej skargi RODO/GDPR w UE; **6-godzinny nocny sprint** scala `#42380` (2,2M/godz. spanów z IP), `#42285`/`#42430` (usuwanie kont), `#42376`/`#42464` (ignorowany opt-out na Win/Mac), `#42450` (wyciek ścieżek `git.cwd`, 90 min po zaprzeczeniu zbierania ścieżek), `#42459`/`#41859` (wycieki push), `#42466` (anonimowe paczki), `#41757`/`#42386`/`#42504` (ciche poprawki bezpieczeństwa). Przed świtem `@theo` publikuje i usuwa groźbę zamknięcia kodu źródłowego. | [Część 11](https://x.com/realchendahuang/status/2125394810559426993) · [Część 12](https://x.com/realchendahuang/status/2125395501663281198) · [Część 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | Publikacja **Części 6–18** obejmujących bilans biznesowy, luki Managed Policy, `yolo merges`, scrapowanie `@bot`, ujawnienia po RODO/GDPR, zbiór 1151 tweetów, rekord USPTO, powiązania ze sponsorami oraz mechanizm 77 tys. gwiazdek. | [Część 6](https://x.com/realchendahuang/status/2125385742243520653) → [Część 18](https://x.com/realchendahuang/status/2125416210120765799) |

---

## 1. Spór u źródła: „Steal Our Code”, groźba z powodu nazwy forka i podwójne standardy

W ciągu 48 godzin między 23 a 25 listopada 2026 roku spór o nazwę społecznościowego forka T3 Code na licencji MIT przerodził się w pełny audyt kodu źródłowego, europejską skargę RODO/GDPR oraz niemal dwadzieścia pilnych nocnych poprawek.

Między wieczorem 23 listopada a rankiem 24 listopada 2026 roku (czasu pekińskiego) pewien użytkownik skrytykował w sieci interfejs darmowego, otwartoźródłowego forka na licencji MIT stworzonego przez chińskiego programistę (`@DDdxx666`), biorąc go omyłkowo za oficjalną aplikację. Nie sprawdziwszy nawet, czy repozytorium jest legalnym forkiem MIT, `@theo` opublikował w ciągu 11 minut dwa wpisy, nazywając je `"Chinese knockoff"` i `"Temu3 Code"`, bezpośrednio wyszydził pracę autora i zagroził skontaktowaniem się z GitHubem w celu zablokowania jego konta (`"Do it right now or I'm going to contact GitHub and have your account taken down"` — „Zrób to natychmiast albo skontaktuję się z GitHubem i usuną ci konto”). W tym samym czasie strona internetowa T3 Code ([`https://t3.codes/`](https://t3.codes/)) opatrywała link do repozytorium GitHub etykietą `"Steal our code (legally)"` (`"steal our code"`) ([Wpis źródłowy 1](https://x.com/realchendahuang/status/2125059292919394654), [Wpis źródłowy 2](https://x.com/realchendahuang/status/2125062675147448475)).

Autor forka podporządkował się natychmiast, zmieniając w 30 minut nazwę repozytorium na `Stardust` i usuwając wszelkie oznaczenia T3. `@theo` przeprosił prywatnie w wiadomościach DM, pozostawił jednak oba publiczne wpisy — mające łącznie ponad 200 000 wyświetleń — bez usunięcia ani wyjaśnienia. Niespełna 11 godzin później, o `06:12 BJ` 24 listopada (`2124989435154726982`), zapytany, czy kopiowanie funkcji T3 Code przez amerykańskie laboratoria warte biliony dolarów przekracza granicę, zajął przeciwne stanowisko: `"Nah. Open source is open source, even if a trillion dollar company uses it!"` („Nie. Open source to open source, nawet jeśli korzysta z niego firma warta bilion dolarów!”). Tymczasem pracownica T3 `@maria_rcks` sama utrzymywała publiczny fork o nazwie `maria-rcks/t3libre` (*„T3 Code, liberated”*), a anglojęzyczne repozytoria takie jak `t3code-quota-ui`, `t3code-atlas` i `t3code-bar` działały bez jakichkolwiek publicznych gróźb.

![Theo publicznie grożący kontaktem z GitHubem w celu zablokowania autora otwartoźródłowego forka](../../evidence/01-origin-theo-threat.png)

![Członkini zespołu T3 @maria_rcks utrzymująca publiczny fork pod nazwą maria-rcks/t3libre ("T3 Code, liberated")](../../evidence/extra/p1-3-maria-t3libre.png)

Począwszy od godziny 17:04 czasu pekińskiego 24 listopada, zbadałem historię commitów `pingdotgg/t3code`, pliki źródłowe, PR-y, zgłoszenia Issues, oficjalną dokumentację, rejestry USPTO TSDR oraz publiczną oś czasu `@theo` na X. W ciągu 24 godzin opublikowałem **18 udokumentowanych części** popartych bezpośrednimi linkami i zrzutami ekranu. Sama Część 1 przekroczyła **1,81 miliona wyświetleń** oraz **6640 zakładek**, wywołując złożenie skargi RODO/GDPR w Europie oraz 6-godzinny nocny sprint naprawczy zespołu T3.

---

## 2. Telemetria, odczyt poświadczeń innych narzędzi i nocny sprint po skardze RODO (Części 1, 7, 11, 12)

> **Szczegółowy audyt techniczny:** Pełne mapowanie wierszy kodu źródłowego, listy akcji `FeatureUsage.ts`, luki `DesktopShellEnvironment.ts` oraz zapis minuta po minucie z 23–25 listopada znajdują się w [**Dossier 01: Architektura telemetrii, łączenie tożsamości między narzędziami i nocny sprint RODO/GDPR 24–25 listopada**](../dossiers/01-telemetry-and-gdpr-timeline.md).

### 2.1 Domyślna telemetria, usunięta obietnica na stronie głównej i haszowanie poświadczeń innych narzędzi (`Część 1`)

**6 marca 2026 roku** do `pingdotgg/t3code` scalono **PR #174**, włączający domyślnie telemetrię PostHog bez żadnej dokumentacji telemetrii w repozytorium, bez komunikatu o zgodzie przy pierwszym uruchomieniu i bez przełącznika w ustawieniach interfejsu. Zmienna środowiskowa wyłączająca zbieranie pozostała ukryta w kodzie, podczas gdy domyślne instalacje natychmiast zaczęły wysyłać zdarzenia ([Część 1](https://x.com/realchendahuang/status/2125153472450527440)).

Przez ponad trzy miesiące domyślnego zbierania danych strona główna T3 Code eksponowała dwa wyraźne wersy: `No telemetry / Unless you opt in. Full stop.` **18 czerwca 2026 roku** `@theo` po cichu usunął oba wersy podczas przebudowy strony głównej ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) bez ogłoszenia ani powiadomienia dotychczasowych użytkowników.

![Commit 3bdaa6e1 z 18 czerwca 2026 r. po cichu usuwający obietnicę „No telemetry / Unless you opt in. Full stop.” ze strony głównej](../../evidence/02-no-telemetry-removed.png)

W październiku 2026 roku `@theo` scalił **PR #15028**, kierując paczki telemetryczne wysyłane co 10 sekund (`FLUSH_INTERVAL_MS = 10_000`) przez zamkniętoźródłową bramkę T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Wiersz 1 pliku [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) wprost stwierdza, że endpoint zbierający zachowuje kopię każdego surowego zdarzenia przed przekazaniem go do PostHog:

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

Pola gromadzone w [`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) i `FeatureUsage.ts` obejmowały dostawcę, wybrany model (przekazując niestandardowe identyfikatory modeli i endpointów spoza katalogu dosłownie przez `ProviderDimensions.ts`), poziom rozumowania (reasoning effort), tryb uprawnień, czasy trwania uruchomień, liczbę tokenów wejściowych/wyjściowych/buforowanych/rozumowania, tokeny agentów podrzędnych, liczbę lokalnych projektów i wątków, **35 odrębnych akcji UI i poleceń** (`18` `COMMAND_FEATURES` + `17` `METHOD_FEATURES`), dane systemu operacyjnego, dystrybucję WSL i architekturę.

**19 października 2026 roku** `@theo` dołożył **PR #21506**, aby zliczać, ile maszyn należy do jednej osoby. Moduł [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) zaczął po cichu odczytywać pliki uwierzytelniające niezależnych narzędzi AI w katalogu domowym użytkownika — `~/.codex/auth.json` i `~/.claude.json` — dekodując pole JWT OpenAI `user_id` oraz pole Claude `oauthAccount.accountUuid` i haszując je wraz z powiązanym identyfikatorem użytkownika T3 Connect oraz identyfikatorem urządzenia:

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

Z kolei w [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (wiersze 8–9) funkcja `hashTelemetryId` oblicza **niesolony skrót SHA-256** (`Hex.encode(sha256(new TextEncoder().encode(value)))`). Ponieważ serwer już przechowuje jawne identyfikatory kont T3 Connect z Clerk, zhaszowanie jawnych wartości po stronie backendu bezpośrednio odwraca niesolony skrót z powrotem do konkretnej osoby; ujawnione identyfikatory kont OpenAI lub Claude łączą się deterministycznie z tym samym haszem.

![Identify.ts odczytujący ~/.codex/auth.json i ~/.claude.json w celu wysyłania niesolonych haszy SHA-256 do atrybucji między urządzeniami](../../evidence/03-identify-codex-claude.png)

Opór społeczności był konsekwentnie tłumiony. **23 czerwca** programista otworzył **Issue #1397** z prośbą o przełącznik w ustawieniach; główny opiekun Julius zamknął zgłoszenie jako `not planned`: `We will not make this easier to opt out of, it is crucial for us to know how many users we have` („Nie ułatwimy rezygnacji z tego — kluczowe jest dla nas, by wiedzieć, ilu mamy użytkowników”). W lipcu użytkownik opublikował zarchiwizowane zrzuty ekranu strony głównej w **Issue #4123**, kwestionując złamaną obietnicę (`"No telemetry"`), co konto `@theo` zamknęło niepowiązanym commitem 21 października, otworzyło ponownie po fali krytyki i po cichu zamknęło znów 4 listopada. Od września do listopada współtwórcy zgłosili **cztery osobne PR-y z opcją opt-out** (`#13458`, `#16763`, `#21248`, `#27077`). Nawet `#27077` — zweryfikowany na prawdziwym sprzęcie ze **147 zaliczonymi testami** i zatwierdzony przez Macroscope — został zamknięty **17 listopada** z etykietą `unwanted`.

![Główny opiekun Julius zamykający Issue #1397 jako not planned i oświadczający, że nie ułatwią rezygnacji](../../evidence/04-issue1397-no-optout.png)

![PR #27077 zamknięty bez scalenia z etykietą unwanted mimo 147 zaliczonych testów i akceptacji Macroscope](../../evidence/extra/t3code-4-pr-27077-rejected.png)

### 2.2 Sprzeczność wokół Managed Policy i oficjalnej dokumentacji (`Część 7`)

24 listopada, w obliczu narastającej krytyki, `@theo` przekonywał na X, że T3 Code ma najlepszą w branży korporacyjną politykę Managed Policy (`"trivial to set up and turn off all telemetry"` — „banalna w konfiguracji i wyłączająca całą telemetrię”), a dane konwersacji pozostają na dysku i `"never touches any of our servers"` („nigdy nie dotykają żadnego z naszych serwerów”) ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715), [`2125191784859115766`](https://x.com/theo/status/2125191784859115766), [Część 7](https://x.com/realchendahuang/status/2125391659492081947)).

Bezpośrednia kontrola [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) oraz [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) dowodzi czegoś przeciwnego:
1. **Konfiguracja wyłącznie dla administratora:** Użytkownicy desktopowi wciąż nie mają przełącznika w Settings UI. Wyłączenie telemetrii przez Managed Policy wymaga MDM/Group Policy albo zapisu pliku `policy.json` w chronionych uprawnieniami administratora ścieżkach (`/Library/Application Support/T3Code/policy.json` na macOS, `C:\Program Files\T3Code\policy.json` lub `HKLM\SOFTWARE\Policies\T3Tools\T3Code` na Windows, `/etc/t3code/policy.json` na Linuxie).
2. **Martwy punkt hostowanej aplikacji webowej (`app.t3.codes`):** `docs/user/telemetry.md` wprost przyznaje, że aplikacja przeglądarkowa nie odczytuje zmiennych środowiskowych serwera, ignoruje Managed Policy, wysyła ślady połączeń, gdy jest zbudowana ze śledzeniem, i `"has no relay tracing toggle"` („nie ma przełącznika śledzenia przekaźnika”).
3. **Aplikacje mobilne poza polityką serwera:** Zmienne środowiskowe serwera oraz Managed Policy `"do not disable mobile tracing"` („nie wyłączają śledzenia mobilnego”).
4. **`Publish agent activity` ignoruje opt-out:** Gdy funkcja jest włączona na hoście, tytuły projektów, tytuły wątków, nazwy modeli i bieżący status aktywności trafiają do przekaźnika T3 Connect — a `"The telemetry opt-out does not disable it."` („Rezygnacja z telemetrii tego nie wyłącza.”). (Ponadto nieudane spany Axiom oraz mobilne logi awarii `"can quote a value the app was handling"`, a `Agent feedback` może załączać do 16 KB wiadomości z konwersacji.)

![Oficjalny dokument docs/user/telemetry.md potwierdzający brak przełącznika w aplikacji webowej, wyłączenie urządzeń mobilnych spod Managed Policy oraz ignorowanie opt-out przy publikowaniu aktywności agenta](../../evidence/05-telemetry-cant-disable.png)

![Oficjalny dokument docs/user/managed-policy.md wyliczający systemowe ścieżki chronione uprawnieniami administratora na macOS, Windows i Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

### 2.3 Wyjaśnienie z 25 listopada obalone w ciągu 2 godzin (`Część 11`)

Rankiem 25 listopada `@theo` zamieścił długie wyjaśnienie ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) wraz z publicznym eksportem telemetrii ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)), składając trzy stanowcze zapewnienia — po czym w odpowiedzi zaprzeczył lokalnemu zapisowi plików śledzących po wyłączeniu telemetrii ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([Część 11](https://x.com/realchendahuang/status/2125394810559426993)):

- **„Nigdy nie zbieraliśmy ścieżek plików” (`"Never collected file paths"`):** 90 minut później Julius scalił **PR #42450**, przyznając, że uruchomienia wyzwalane przez webhook przekaźnika eksportowały do Axiom całe spany wykonania — w tym spany Git zawierające `git.cwd` (**bezwzględną ścieżkę roboczą, nazwę użytkownika OS oraz nazwę repozytorium**).
- **„Zmienne środowiskowe zawsze czysto wyłączały telemetrię” (`"Environment variables always disabled telemetry cleanly"`):** **PR #42376** potwierdził, że wersja desktopowa dla Windows ignorowała zapisaną zmienną użytkownika `T3CODE_TELEMETRY_ENABLED=false` przy uruchomieniu z istniejących wcześniej procesów, natomiast **PR #42464** potwierdził, że przy pierwszym uruchomieniu na macOS/Linuxie śledzenie przekaźnika oceniało stan przed wykryciem powłoki, ignorując wpisy opt-out w `~/.zshrc` przez cały czas działania. (`DesktopShellEnvironment.ts` nadal nie przekazuje dalej `T3CODE_OTEL_SDK_DISABLED`.)
- **„Brak zapisu plików śledzących po rezygnacji” i „hasze Claude były zepsute” (`"No tracking files written when opted out"` i `"Claude hashes were broken"`):** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (wiersz 149) nadal bezwarunkowo wywołuje `getTelemetryIdentity` przy starcie, zapisując lokalny identyfikator instalacji oraz odczytując/haszując `~/.codex/auth.json` i `~/.claude.json`. Jednocześnie inspekcja nagłówka gzip ~100-megabajtowego zrzutu `@theo` (`6,056,594` bajtów po kompresji, `95,789` zdarzeń) ujawniła oryginalną nazwę pliku `events.clean.jsonl` wygenerowaną 20 minut przed jego tweetem — a mimo to plik wciąż zawierał **264 aktywne rekordy kont Claude** łączące **4 różne maszyny** (`installId`) z dokładnie tym samym skrótem SHA-256 z 20 października, obok dosłownych nazw prywatnych modeli proxy (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

![PR #42450 potwierdzający, że uruchomienia wywoływane przez przekaźnik wcześniej eksportowały do Axiom bezwzględne ścieżki git.cwd z nazwami użytkowników i repozytoriów](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 przyznający, że wersja desktopowa dla Windows ignorowała zapisane zmienne środowiskowe użytkownika T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 przyznający, że przy pierwszym uruchomieniu na macOS śledzenie przekaźnika ignorowało opt-out z ~/.zshrc przez całą sesję](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Kryminalistyczny audyt publicznego zrzutu Theo events.clean.jsonl wykazujący 264 rekordy Claude łączące 4 maszyny oraz dosłowne nazwy prywatnych modeli proxy](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

### 2.4 Sześciogodzinny nocny sprint po skardze RODO/GDPR (`Część 12`)

Po złożeniu formalnej skargi RODO/GDPR w UE w nocy 24 listopada pilne nocne PR-y ujawniły cztery głębsze naruszenia prywatności ([Część 12](https://x.com/realchendahuang/status/2125395501663281198)):

1. **2,2 mln/godz. spanów przekaźnika z tagiem IP (`PR #42380`):** Przyznano, że każdy span żądania przekaźnika eksportowany do Axiom — około **2,2 miliona spanów na godzinę, przechowywanych przez 30 dni** — rejestrował `client.address` (adres IP wywołującego z `cf-connecting-ip`) oraz `user_agent.original` tuż obok `user.id` (zaznaczając nadal, że logi 1% wywołań Cloudflare Workers pozostały osobno). Trzy i pół godziny po scaleniu `@theo` nadal odpowiadał, że adresy IP zostały już usunięte.
2. **Zepsute usuwanie kont (`PR #42285` i `PR #42430`):** Przyznano, że usunięcie użytkownika w Clerk pozostawiało wcześniej wiersze przekaźnika PlanetScale i aktywne tunele Cloudflare nietknięte, dopóki napływające żądanie usunięcia danych nie wymusiło **ręcznych zapytań SQL i ręcznego zamykania tuneli**.
3. **Wycieki w powiadomieniach push na urządzeniach mobilnych (`PR #42459` i `PR #41859`):** Powiadomienia Android FCM wysyłały jawne wartości Clerk `user_id` do Google przy każdym pushu; spany i błędy żądań push na iOS logowały pełne adresy URL urządzeń zawierające tokeny.
4. **Mieszane „anonimowe” zgłoszenia zwrotne (`PR #42466`):** Przyznano, że rzekomo anonimowe zdarzenia `agent.feedback` były pakowane w ten sam HTTP POST razem ze zdarzeniami oznaczonymi `installId` oraz pełnymi odciskami hosta (OS, architektura, surowa dystrybucja WSL), co przeczy `docs/user/telemetry.md`. Tymczasem `privacy-policy.astro` pozostawał niezmieniony od 6 października.

![PR #42380 ujawniający, że spany przekaźnika rejestrowały prawdziwe adresy IP i User-Agent obok user.id w tempie 2,2 mln spanów/godz. przez 30 dni w Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 przyznający, że usuwanie kont pozostawiało wiersze przekaźnika i aktywne tunele Cloudflare aż do żądania usunięcia danych wymagającego ręcznego SQL](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 przyznający, że powiadomienia Android FCM wysyłały jawne wartości Clerk user_id do Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 przyznający, że anonimowe zgłoszenia zwrotne były pakowane w tym samym POST razem z installId i odciskiem hosta](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

---

## 3. Pamięć lokalna, monitorowanie procesów, omijanie zabezpieczeń i nieujawnione poprawki bezpieczeństwa (Części 2, 3, 13)

> **Szczegółowy audyt techniczny:** Dosłowne zapytania SQL czyszczące SQLite, wywołania Rust `sysinfo`, wiersze uprawnień w `ClaudeAdapterV2.ts` oraz pełna analiza granic w `SECURITY.md` znajdują się w [**Dossier 02: Bezpieczeństwo lokalne, ciche obejścia wykonywania kodu i nieujawniony audyt bezpieczeństwa**](../dossiers/02-local-safety-and-security-audit.md).

### 3.1 Pozorne usuwanie wątków w SQLite i skanowanie procesów w całym systemie (`Część 2`)

Gdy użytkownik usuwa wątek w panelu bocznym, okno potwierdzenia (`useThreadActionMenu.ts`) obiecuje `"This permanently clears conversation history for this thread."` („To trwale czyści historię rozmowy dla tego wątku”). W rzeczywistości `ThreadDeletion.ts` jedynie dopisuje zdarzenie `"thread.deleted"` do `statev2.sqlite`, a `ProjectionMaintenance.ts` wyłącza z czyszczenia `thread.created` i najnowsze zdarzenia strumienia (`MAX(newer.sequence)`), zachowując wcześniejsze zdarzenia. Użytkownicy zgłaszali rozrost `statev2.sqlite` do **25,9 GB** w trzy tygodnie (90% „usuniętych” wątków), **41,6 GB** w sześć tygodni i **33 GB** w siedem tygodni — pozostawiając **Issue #17845** (i **#28903**) nienaprawione od 10 października ([Część 2](https://x.com/realchendahuang/status/2125160473176023486)).

![Issue #17845 zgłaszające, że trwale usunięte wątki pozostają wewnątrz statev2.sqlite, rozdymając dyski do dziesiątek gigabajtów](../../evidence/10-issue17845-fake-delete.png)

Działający w tle pomocnik Rust `t3-resource-monitor` (**Issue #11222**, `native/resource-monitor/src/main.rs` wywołujący `ProcessesToUpdate::All` z `with_cmd(UpdateKind::Always)`) co 5 sekund skanował każdy proces na maszynie nawet przy zamkniętej diagnostyce — otwierając ~280–300 trwałych uchwytów do ponad 440 niezwiązanych aplikacji i gier w Windows bez żadnej opcji wyłączenia, podczas gdy dokumentacja twierdziła, że próbkowanie działa wyłącznie przy aktywnych subskrybentach. Dopiero **24 listopada** **PR #41889** potwierdził, że diagnostyka procesów przechwytywała **pełne argumenty wiersza poleceń** — które często zawierają jawne klucze API, hasła do baz danych i tokeny uwierzytelniające — do bieżącej telemetrii oraz migawek historii.

![Issue #11222 dokumentujące skanowanie każdego procesu na maszynie przez t3-resource-monitor](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

Dodatkowe potwierdzone wady lokalne w Części 2 obejmują:
- **Wycieki firmowych nazw hostów przez favicon:** Żądania frontendu ujawniały wewnętrzne nazwy hostów (np. `devbox.localdomain`) w API ikon Google (`PR #16950`, `PR #32657`).
- **Obowiązkowe zapytanie sieciowe przy starcie:** Nawet przy wyłączonej telemetrii start serwera bezwarunkowo pobiera manifesty zgodności z [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) bez możliwości rezygnacji (**Issue #36479**).
- **Obejścia zatwierdzeń i polityk:** Poprawki omijania zatwierdzeń i polityk dla trybu pełnego dostępu oraz WSL/Tailscale (`PR #21806`, `PR #27322`).
- **1,7-krotne zużycie limitu Claude i 136-krotny pobór mocy:** Sterowanie Claude przez Agent SDK wypalało 5-godzinne limity w tempie **1,7x** normalnego aż do początku listopada (`Issue #7338`, `Issue #24649`, 81 komentarzy); błędy GPU/zasilania sięgały **136x** poboru podobnych aplikacji Electron — w tym 19-rdzeniowe GPU MacBooka zablokowane na **60 W** rozładowujące baterię w 78 minut i pobierające **18 W** po zamknięciu karty webowej (`Issue #3143`, `Issue #40581`).

### 3.2 52-dniowy cichy `git push --force` kontra usunięcie filtra prywatności modeli w 21 godzin (`Część 3`)

Od **3 października** — ponad **52–53 dni** w **Issue #15353** ([komentarz](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)) — tryb Claude Auto po cichu wykonywał niebezpieczne polecenia (`ClaudeAdapterV2.ts` robiący zwarcie do `"allow"`, gdy `requiresClaudeApproval` przyjmuje false). Nawet bez własnych reguł, po tym jak klasyfikator Claude dwukrotnie zablokował `git push --force origin main` i przekazał trzecią próbę do ręcznego zatwierdzenia, T3 Code po cichu zatwierdził je bez okna dialogowego w UI i zapisał `"source": "user_temporary"`. Dwa PR-y społecznościowe z poprawkami (`#15360`, `#35207`) leżały bez przeglądu aż do automatycznego zamknięcia przez boty, a `#40692` nadal czekał ([Część 3](https://x.com/realchendahuang/status/2125201882687881378)).

![Issue #15353 otwarte od ponad 52 dni pokazujące, jak tryb Claude Auto po cichu zatwierdza git push --force bez pytania użytkownika](../../evidence/11-issue15353-auto-force-push.png)

Dla kontrastu **22 listopada** w **Issue #40948** zauważono, że nowsze modele nie pojawiają się w publicznym rankingu telemetrycznym `@theo` [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)), ponieważ `PR #29001` ograniczył raportowanie białą listą. W ciągu **21 godzin** pod kontem `@theo` scalono **PR #41237**, zaznaczając wprost, że usunięcia zażądał Theo — wysyłając odtąd `ollama/acme-internal` i firmowe nazwy wdrożeń `acme-azure-deployment` dosłownie do analityki.

![PR #41237 scalony 21 godzin po Issue #40948, usuwający filtrowanie modeli na potrzeby slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

### 3.3 Zero biuletynów bezpieczeństwa, ciche łatki podatności i `SECURITY.md` (`Część 13`)

Na dzień 25 listopada zakładka [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) projektu `pingdotgg/t3code` wykazuje **0 opublikowanych biuletynów** ([Część 13](https://x.com/realchendahuang/status/2125395980354994414)). Mimo to opiekunowie po cichu scalali poprawki o wysokim poziomie krytyczności bez powiadamiania obecnych użytkowników:
- **Scalone ciche poprawki bezpieczeństwa:** `PR #39483` (traversal ścieżek w `ServerSecretStore` przez `jti`/`nonce` przekaźnika przed zatwierdzeniem urządzenia), `PR #41756` (międzydomenowe wycieki firmowych tokenów GitHub/GitLab), `PR #41886`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41757` i `PR #42386` (nieizolowany podgląd przeglądarki desktopowej i izolacja wyskakujących okien) oraz `PR #42504` (poprawka ~3000 wierszy wreszcie dodająca monity potwierdzenia dla niezaufanych konfiguracji repozytoriów, które wcześniej uruchamiały lokalne polecenia bez zgody).
- **Nierozwiązane / otwarte kwestie bezpieczeństwa:** `Issue #26489` (ryzyko traversal zewnętrznych ścieżek/dowiązań symbolicznych), `PR #36216`, `PR #23428`, `PR #33144` oraz `PR #30997` (program uruchamiający Windows `externalLauncher.ts` wywołujący `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` oznaczany przez AVG/Avast jako `IDP.HELU.PSE96`).
- **Pospieszny [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) (`PR #38812`, `PR #41942`):** Ogłasza ogólnosystemowy odczyt `filesystem:read` poza obszarami roboczymi, nieszyfrowany transport HTTP na iOS/w sieci LAN oraz pełne przejęcie maszyny przez przejęty klucz podpisujący przekaźnika za **zamierzone granice projektu**, a nie podatności, podczas gdy [`https://ingest.t3.codes/`](https://ingest.t3.codes/) pozostaje zamkniętym kodem (`2125370330244128924`).

![PR #39483 po cichu łatający traversal ścieżek w ServerSecretStore bez publikacji Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![Otwarta poprawka PR #30997 dla uruchomień PowerShell z Base64 EncodedCommand w Windows oznaczanych jako złośliwe oprogramowanie](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md wprost oznaczający odczyty całego systemu OS, dowolny HTTP na iOS i przejęcie maszyny kluczem przekaźnika jako zamierzone granice](../../evidence/extra/x-post05-4-security-md-intended.jpg)

---

## 4. Ryzyko naruszenia ToS Google Antigravity i nieszyfrowany przekaźnik T3 Connect (Części 4, 5)

> **Szczegółowy audyt techniczny:** Pełne mapy nagłówków `cliproxyApi.ts` (`PR #33800`), odwołania do wierszy w `AntigravityAcpSupport.ts`, `contracts/src/settings.ts` i `ManagedEndpointProvider.ts` znajdują się w [**Dossier 03: Podszywanie się pod ToS Google Antigravity, `PR #33800` i architektura przekaźnika T3 Connect**](../dossiers/03-antigravity-tos-and-t3connect-relay.md).

### 4.1 Podszywanie się pod nagłówki Google Antigravity, fałszywy `SSH_CONNECTION` i bany w 3 minuty (`Część 4`)

Oficjalne FAQ T3 Code [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) zapewnia płacących użytkowników: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* („Współpracujemy ze wszystkimi laboratoriami, a T3 Code mieści się w warunkach świadczenia usług Claude Code, Codex i Google Antigravity... Jeśli coś działa w T3 Code, możesz ufać, że jest bezpieczne”). Gdy użytkownicy zgłosili bany w **Issue #40713**, jeden z opiekunów zaprzeczył wywoływaniu backendu Antigravity czy ponownemu używaniu tokenów, twierdząc, że wszystkie żądania pochodzą z oficjalnego CLI Google — zanim programiści (`schlessera`) obalili to twierdzenie własnymi plikami źródłowymi T3 Code ([Część 4](https://x.com/realchendahuang/status/2125213397507858657)):

1. **Podszyty User-Agent, ekstrakcja z pęku kluczy i wywołania `v1internal` ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)):** Wyciąga poświadczenia Google OAuth z plików lokalnych, `@napi-rs/keyring` lub Menedżera poświadczeń Windows (`CredReadW` przez `ffi-rs` na `advapi32.dll`), wpisuje na sztywno wewnętrzny ciąg klienta Google i wysyła `POST` bezpośrednio do nieudokumentowanego backendu Google `v1internal` ([wiersze 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)). Pracownicy Google potwierdzili na [oficjalnym forum deweloperskim](https://discuss.ai.google.dev/t/185992), że Sekcja 6 [Warunków korzystania z Google Antigravity](https://antigravity.google/terms) zabrania narzędziom firm trzecich wydobywania lub ponownego użycia poświadczeń do bezpośredniego odpytywania backendu:

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

2. **Wstrzyknięcie fałszywego `SSH_CONNECTION` i mieszanie kont ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)):** Ponieważ CLI Google izoluje jedno logowanie w pęku kluczy OS, T3 wstrzykuje sfałszowaną zmienną środowiskową `SSH_CONNECTION`, aby oszukać CLI i wymusić lokalny zapis jawnych plików tokenów. Gdy 24 listopada Google zaktualizowało swoje CLI, usuwając ten tryb awaryjny, **Issue #41973** potwierdziło, że prompty Konta A trafiały po cichu na Konto B:

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **Ban nowego konta po 3 minutach (`Issue #41536`) i podszywanie się pod klienta (`PR #26876`):** 23 listopada **Issue #41536** udokumentowało świeżo kupioną subskrypcję Google AI za `$20` działającą przy **zerowym udziale proxy** — wyłącznie przez zarządzany Antigravity wewnątrz T3 Code — zbanowaną przy **pierwszej wiadomości, 3 minuty po konfiguracji** (Google przyznaje kontom osobistym jedno odwołanie; opiekunowie zamknęli zgłoszenie jako duplikat bez dodania ostrzeżenia). Wcześniej `@theo` osobiście scalił **PR #26876**, maskując T3 Code jako `"zed"` (`AntigravityAcpSupport.ts`), aby ominąć białe listy modeli. I choć 23 listopada `@theo` narysował schemat `T3 Code -> Antigravity binary ✅` ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) oraz obwiniał CLIProxy, gdy wyłączono drugie konto Google AI Ultra użytkownika `@Only_21Mil` ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397)), scalony [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) natywnie podpina odpytywanie hubu [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) z podszytymi nagłówkami `claude-code/2.1.273`, `grok-cli/1.0.77` oraz `antigravityUserAgent`.

![antigravityUsageLimits.ts wpisujący na sztywno podszyte nagłówki klienta Google i wywołujący nieudokumentowany backend v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts wstrzykujący fałszywą zmienną środowiskową SSH_CONNECTION w celu ominięcia zapisu w pęku kluczy OS](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 dokumentujące zbanowanie nowego konta Google za $20 bez proxy trzy minuty po konfiguracji przy pierwszej wiadomości, zamknięte jako duplikat](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 podpinający odpytywanie hubu CLIProxyAPI dla Antigravity, xAI i Claude bezpośrednio do T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

### 4.2 T3 Connect: brak szyfrowania end-to-end i brama OVH terminująca TLS (`Część 5`)

**T3 Connect nie ma żadnego szyfrowania end-to-end (E2E) — każdy prompt, plik źródłowy i wyjście terminala są technicznie widoczne dla T3 w postaci jawnego tekstu** ([Część 5](https://x.com/realchendahuang/status/2125218189596676555)). Obecnie [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) tworzy Cloudflare Tunnels oraz rekordy DNS na własnym koncie Cloudflare firmy T3 (`06_t3-connect.md`). TLS kończy się na brzegu Cloudflare bez żadnego szyfrowania ładunku; podpięcie Workers Route przechwytuje cały ruch bez ani jednej zmiany w kodzie i bez żadnego alertu po stronie klienta.

Zatwierdzanie nowych urządzeń (`requireConnectDeviceApproval` dodane w [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419)) jest domyślnie ustawione na **`false`**. Jak przyznaje [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md), wyciek klucza podpisującego przekaźnika lub przejęcie konta w chmurze pozwala wystawiać sesje bezpośrednio do powiązanej maszyny — co jest równoważne lokalnej powłoce. Gdy w **Issue #32098** poproszono o wzajemne uwierzytelnianie i szyfrowanie E2E, opiekun zamknął zgłoszenie, stwierdzając, że pełne E2E to zbyt duża zmiana; dyskusje `#21286` i `#37831` pozostają bez odpowiedzi, a 25 listopada `@theo` ogłosił szyfrowanie E2E niemożliwym (`2125370330244128924`).

Ponieważ koszty Cloudflare Tunnels sięgnęły **$25,000 miesięcznie**, `@theo` otworzył **PR #32945**, aby przenieść ruch na wynajętą przez T3 bramę OVH w Hillsboro (`gw.t3coderelay.com`), gdzie należący do T3 serwer Caddy terminuje TLS i przekazuje jawny tekst przez gniazdo Unix do proxy Go `yamux` — wciąż bez szyfrowania E2E. Tymczasem [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) obiecuje `"encrypted network transport"` („szyfrowany transport sieciowy”) bez ujawnienia braku szyfrowania E2E ani zapewnienia gwarancji nieprzechowywania danych.

![Główny opiekun przyznający w Issue #32098, że skradzione konto chmurowe lub klucz przekaźnika pozwalają sterować powiązanymi maszynami przy pominięciu szyfrowania E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 autorstwa Theo odnotowujący miesięczny rachunek Cloudflare w wysokości $25k i przenoszący T3 Connect na własną bramę OVH, gdzie Caddy terminuje TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

---

## 5. Bilans biznesowy, konflikty inwestorskie, sponsorzy i lejek 77 000 gwiazdek (Części 6, 8, 17, 18)

> **Szczegółowy audyt techniczny:** Pełne cytowania przychodów/radaru, konfiguracja Axiom `infra/relay/src/observability.ts` i pełna analiza `GitHubStarPrompt.tsx` znajdują się w [**Dossier 04: Bilans biznesowy, konflikty inwestorskie, stos sponsorów i mechanizm 77 tys. gwiazdek**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md).

### 5.1 Wydatki $800,000+ i radar obliczeniowy 31,7 bln tokenów/dobę ($10,19 mln/dobę) (`Część 8`)

Wśród 1151 tweetów z 17,24 dnia `@theo` wspomniał o T3 Code **162 razy (14,1%)**, podczas gdy swoje trzy starsze płatne biznesy — `T3 Chat`, `UploadThing` i [`https://ping.gg/`](https://ping.gg/) — wymienił **0 razy**. 12 listopada potwierdził wydanie **$800k+** z własnej kieszeni na darmowego klienta MIT ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267), [Część 8](https://x.com/realchendahuang/status/2125392410763239723)).

W zamian telemetria spływająca do `ingest.t3.codes` zbudowała radar obliczeniowy czasu rzeczywistego monitorujący **31,7 biliona tokenów/dobę** — **$10,19 miliona/dobę** równoważnych wydatków na API w dniu 18 listopada (ze szczytem blisko **$10.2M/day**) — wraz z dokładnymi udziałami rynkowymi (`99%` w oparciu o subskrypcje, `~98.5%` między Codex/Claude/Antigravity, spadek prób modeli o otwartych wagach z `15%` do `6%` przy poniżej 0,5% promptów). Gdy 23 listopada komentujący próbował oszacować udziały, `@theo` wyśmiał go za brak dostępu do jego analityki (`2124682906132181482`).

Ten radar przełożył się bezpośrednio na wpływy: **$300k+ w nielimitowanych darmowych tokenach wczesnego dostępu OpenAI** zużytych w jednym teście porównawczym GPT-6.2 Astra (`2122760447103484410`), benchmarki bare-metal Google i kontakty z DeepMind (choć twierdzenie `@theo`, jakoby `@PatrickToulme` z DeepMind dostarczył `"many PRs"`, stoi w sprzeczności z logiem git `pingdotgg/t3code` wykazującym **1 commit**, `PR #31158`), a także zapytania inwestorów (`"multiple investors have asked me about this"`, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).

![Wewnętrzny pulpit analityczny T3 Code od Theo pokazujący 31,7 biliona tokenów i $10.19M równoważnych dziennych wydatków API](../../evidence/17-theo-31t-tokens-10m-day.png)

![Historia commitów pingdotgg/t3code przefiltrowana po patrick-toulme pokazująca 1 commit (#31158) zamiast "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

### 5.2 Konflikty anioła biznesu (`Część 6`) i hipokryzja wokół sponsorów i limitów (`Część 17`)

- **Nakładanie się Vibe Kanban i Daytona ([Część 6](https://x.com/realchendahuang/status/2125385742243520653)):** 16 listopada (`2122201981167251877`) `@theo` ujawnił, że był inwestorem i współtwórcą **Vibe Kanban** — który przed zamknięciem zmienił kierunek w stronę interfejsu T3 Code — a następnie wyśmiał ten UI jako świetny `"for running out of runway and killing your business"` („do przepalenia środków i zabicia firmy”). 18 listopada (`2123011578090127499`) potwierdził zainwestowanie w firmę chmurowych sandboxów **Daytona** oraz jej konkurentów, zaledwie dziewięć dni po zapowiedzi płatnych chmurowych sandboxów wewnątrz T3 Code (`2119705561679933806`).
- **Stos sponsorów wbudowany w przekaźnik ([Część 17](https://x.com/realchendahuang/status/2125411353393553744)):** Dwaj sponsorzy z majowej listy sponsorów YouTube `@theo` z 2023 r. (`1657488850472804353`) — **Clerk** i **Axiom** — obsługują uwierzytelnianie w chmurze T3 Code i 30-dniowe logowanie przekaźnika z tagowaniem IP. W kwietniu 2024 roku CEO Vercel `@rauchg` potwierdził, że Vercel sponsorowała wyłącznie Theo (`1776260839965863965`), a Theo przyznał później istnienie klauzul wyłączności w umowach sponsorskich (`uv179CTAK-w`). Jest również aniołem biznesu w Cursor i Cline.
- **Exploit 0% w Codex i sprzeczność z 10-kontowym Gistem CLIProxyAPI:** 21 sierpnia 2026 roku `@theo` chwalił się wyciśnięciem **$800+** ponad limit 0% w Codex, podczas gdy pracownica T3 `@maria_rcks` wydała *Endless*, by zapętlać tury poniżej zera; po fali krytyki 22 sierpnia oboje wszystko usunęli, a Maria wyraziła nadzieję, że Codex zbanuje konta (`2090972426876129658`), co poprzedziło twarde odcięcie w OpenAI (`openai/codex#45444`). W październiku `@theo` opublikował Gist mający 452 gwiazdki (`59a521d2ee8d70aaf90e280c175072af`) łączący **7 kont Claude + 3 konta Codex** (`555%` limitu na 12+ maszynach; chwaląc się również uzyskiem `$14,662` / `$15k` Ultra z 1,1 mln zapytań przez proxy i pisząc poradnik konfiguracji Grok Bot + Claude za `$100`) — do którego własne `docs/user/faq.md` T3 Code linkuje zaraz po odmowie wbudowania przełączania kont z powodu ryzyka bana (`"Early apologies if it gets you banned 💀"` — „Z góry przepraszamy, jeśli dostaniesz bana 💀”).

![Theo ujawniający inwestycję i wkład w Vibe Kanban przed publicznym wyśmianiem jego zamknięcia](../../evidence/18-theo-vibe-kanban.png)

![Gist cliproxy-setup.md autorstwa Theo z 452 gwiazdkami łączący 7 kont Claude i 3 konta Codex na 12+ komputerach z limitem 555%](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 dokumentujące globalną regresję przerywającą aktywne tury w połowie zadania przy limicie 0%](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

### 5.3 Jak T3 Code skoczył z 30 tys. do 77 tys. gwiazdek w 25 dni (129 obserwujących) (`Część 18`)

Sześć miesięcy po publikacji *"Github has a fake star problem"* (`2048122499834036340`, ostrzegającego, że gwiazdki stały się narzędziem `"to trick VCs into investing"` — „do nabierania funduszy VC na inwestycje”), `@theo` samodzielnie napisał i samodzielnie scalił trzy PR-y ([Część 18](https://x.com/realchendahuang/status/2125416210120765799)):
1. **30 paź (`PR #27832`):** Dodał w prawym górnym rogu monit o gwiazdkę po 5 wysłanych promptach (`PROMPTS_BEFORE_ASKING = 5`, odpalany przy 6. prompcie w [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx)), natychmiast **10-krotnie zwiększając** dzienne gwiazdki (`2117065834267136469`) i osiągając **+3,094 gwiazdek/dzień** w GitHub Trending (`2117172614158508400`).
2. **3 lis (`PR #29922` i `PR #29987`):** Ulepszył mechanizm o **30-sekundowe wykrywanie bezczynności okna** (`IDLE_MS = 30_000`), gdy użytkownicy czekają na tury agenta, i zastąpił przekierowanie do przeglądarki wywołaniem RPC `sourceControl.star` — wysyłającym `PUT user/starred/pingdotgg/t3code` bezpośrednio za pomocą **poświadczeń GitHub serwera-hosta** przed wystrzeleniem 160 cząsteczek konfetti.
3. **Ominięta recenzja i błąd gwiazdkowania dowolnych repozytoriów:** Macroscope oznaczył `PR #29922` statusem `Needs Human Approval`; `@theo` i tak go scalił samodzielnie. 6 listopada `zhilsinger` wystawił `Request changes`, wskazując na nieprzejrzystość poświadczeń na współdzielonych hostach (przyznaną w `GitHubStarPrompt.tsx#L115`) oraz fakt, że [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) nigdy nie przypina na sztywno `pingdotgg/t3code`:

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

Dowolny klient z uprawnieniem `source-control:write` może gwiazdkować dowolne repozytoria, używając poświadczeń hosta. Recenzja `zhilsinger` leżała nietknięta przez **19 dni** bez żadnej reakcji, podczas gdy repozytorium rosło z 30 tys. do 77 tys. gwiazdek (129 obserwujących).

![Wykres Theo z 2 listopada świętujący niemal pionowy 10-krotny skok dziennych gwiazdek natychmiast po wdrożeniu monitu w aplikacji](../../evidence/20-star-10x-cliff.png)

![Recenzja Request Changes dewelopera zhilsinger dla PR #29922 ostrzegająca przed gwiazdkowaniem na współdzielonych hostach i dowolnych repozytoriach przez poświadczenia serwera, pozostawiona bez odpowiedzi przez 19 dni](../../evidence/21-pr29922-zhilsinger-review.png)

![Wiersze 60–99 pliku packages/source-control-github/src/server/driver.ts nieprzypinające pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

---

## 6. Zarządzanie projektem, boty kopiujące forki, znaki towarowe, zbiór 1151 tweetów i historia incydentów (Części 9, 10, 14, 15, 16)

> **Szczegółowy audyt techniczny:** Pełny kod automatyzacji zarządzania (`.github/scripts/pr-limits.cjs`), audyt USPTO TSDR oraz kompletne tabele metodologii i leksyki dla `n = 1151` znajdują się w [**Dossier 05: Zarządzanie repozytorium, boty scrapujące forki, nadużycia znaków towarowych i zapis historyczny**](../dossiers/05-governance-trademark-and-history.md) oraz [**Dossier 06: Ilościowy kryminalistyczny zbiór 1151 tweetów (7–24 listopada 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md).

### 6.1 Wewnętrzne tempo kontra zewnętrzna wrogość (`Część 9`) i scrapowanie forków (`Część 10`)

- **500 commitów/dzień i `yolo merges` kontra `CONTRIBUTING.md` ([Część 9](https://x.com/realchendahuang/status/2125392916369871309)):** `@theo` opisywał wypychanie **500 commitów/dzień** (`2120741101250515322`), uruchamianie **700 agentów**, hurtowe scalanie PR-ów przez pętlę agentową Juliusa, `"my yolo merges breaking shit sometimes"` (`2119951615679672513`) oraz ryzykowanie wyczyszczenia maszyny dla `"free content"` (`2119993037971730879`). Wobec użytkowników zewnętrznych **PR #5551** schował tryb Plan (`"Reality check for those upset"`, 10 głosów w dół), **PR #9190** ukrył pierścień kontekstu (16 głosów w dół — rekord repozytorium), **PR #33131** usunął tryb Plan z absurdalnym podsumowaniem AI, **Issue #33639** przywitało skarżącego się użytkownika słowami `"uninstall our software"` / `"ungrateful prick"` (a **PR #41572** odrzucono następnego ranka), `CONTRIBUTING.md` zaczyna się od `"here's my advice: Don't"` wraz z zakazami modeli i publicznym piętnowaniem i banami w `.github/VOUCHED.td` (174 etykiety `unwanted` w całym repozytorium), zaś autorów na X upominano za brak obserwowania go (`2120821423438778667`), straszono usunięciem `/btw` (`2120853340078874923`) lub pouczano, że zrzuty ekranu z adnotacjami biją PR-y (`2123754193530053110`).
- **Publiczne scrapowanie przez `@bot` kontra drwiny z konkurencji ([Część 10](https://x.com/realchendahuang/status/2125393641665671593)):** 8 listopada `@theo` odpowiedział `"Okay I'm stealing this"` na funkcję z forka `@MiaAI_lab` i 30 sekund później wysłał `@bot` w publicznych odpowiedziach, by zescrapować jej fork na `beebox` przez Opus 5.5 (`2119240810202034645`); 13 listopada ponownie wysłał `@bot`, aby sklonować chwalone funkcje rywalizujących narzędzi (`2121017649652269120`). Mimo to 24 listopada wyśmiał Claude Code Desktop za dodanie kart na pasku bocznym (`2124987957803446311`). Przeciw krytykom wzywał obserwujących do użycia Community Notes, by `"demonetize them"` (`2120238923884696025`), i potwierdził działanie auto-blokera na X (~100 kont zablokowanych 24 listopada, `2125077510941802509`).

![CONTRIBUTING.md zniechęcające do zewnętrznych PR-ów i opisujące publiczne bany z piętnowaniem w .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Odpowiedź Theo w Issue #33639 nakazująca @bermudi odinstalować program i nazywająca go ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo odpowiadający "Okay I'm stealing this" i wysyłający 30 sekund później @bot do zescrapowania forka programistki do T3 Code](../../evidence/23-stealing-fork-bot.png)

### 6.2 Audyt znaków towarowych: 0 rejestracji USPTO i wsteczny `PR #41898` (`Część 15`)

Idąc za tropem `@vildanden_ai` (`2125275487404761555`), sprawdzenie bazy USPTO TSDR wykazuje **0 rejestracji** dla `T3 Code`, `T3 Tools` lub `T3 Connect` ([Część 15](https://x.com/realchendahuang/status/2125408163273080950)). Jedyne zgłoszenie USPTO złożone przez T3 Tools Inc. (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) zostało ostatecznie odrzucone w lutym 2025 r. i oznaczone jako `ABANDONED` 19 maja 2025 r., podczas gdy podmioty trzecie posiadają już rejestracje `T3` dla oprogramowania/SaaS w klasach 42 i 9 (`EquipmentShare` Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations` Reg. `3324707`).

Zgodnie z [Polityką Znaków Towarowych GitHuba](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) firmy komercyjne składające wniosek o usunięcie z tytułu znaku towarowego muszą pod rygorem odpowiedzialności za krzywoprzysięstwo podać numer rejestracji federalnej lub międzynarodowej (wyjątki dla znaków niezarejestrowanych przysługują wyłącznie organom rządowym i organizacjom non-profit). W momencie, gdy `@theo` groził usunięciem konta `@DDdxx666` na GitHubie, nie był w stanie wypełnić formularza GitHuba. Dopiero **17 godzin później** (`12:21 BJ` 24 listopada) `@theo` scalił **PR #41898**, wstecznie dodając `TRADEMARK.md` (`"whether registered or unregistered"`) i cytując go 94 sekundy później (`2125082769395220688`) — mimo że we wrześniu 2024 r. wyśmiewał WordPress za `"unenforceable trademark dispute"` (`1839261574005141945`), a trzy godziny wcześniej 24 listopada rzucił programistom `"get a better lawyer"` (`2125026423769555308`).

![PR #41898 scalony 17 godzin po groźbie zablokowania, wstecznie dodający TRADEMARK.md roszczący prawa niezależnie od rejestracji](../../evidence/24-pr41898-trademark-aftermath.png)

![Theo mówiący programistom "get a better lawyer" trzy godziny przed scaleniem TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

### 6.3 Ilościowy zbiór 1151 tweetów (`Część 14`) i dwuletnia historia (`Część 16`)

Analiza wszystkich **1151 kolejnych wpisów `@theo` na X** od 7 do 24 listopada 2026 r. (`17,24` dnia; `66,8/dzień`; `75,6%` odpowiedzi; mediana odstępu `2,7 min`) ilościowo dokumentuje skrajną asymetrię władzy ([Część 14](https://x.com/realchendahuang/status/2125404517697290438)):
- **Menedżerowie big-tech, pracownicy laboratoriów i czołowi KOL-owie (`n = 43` ścisłe pierwsze `@` / `n = 60`–`62` szersze):** **0,0%** ukierunkowanych wulgaryzmów lub obelg osobistych (`30,0%`–`32,6%` uprzejmych podziękowań). Ostra krytyka Gemini 4 Carbon i GPT-6.2 Astra była łagodzona lub kończyła się publicznymi przeprosinami (`2123255588570501585`, `2123995323123343869`).
- **Zwykli programiści i krytycy (`n = 766` ścisłe pierwsze `@` / `n = 749` szersze):** Odsetek wrogości/wulgaryzmów skoczył do **8,0%** (`61/766`), obejmując `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`), `"dance on the graves of the 'local ai' community"` (`2120733839832273025`), `"Linux larpers"` (`2124298216271499605`), wielokrotne wpisy ze zwrotem `stupid bitch` (`2120599310211703274`) oraz drwiny z więzienia/RSD (`2122865897375400066`).
- **25-godzinne okno kryzysu wokół chińskiego forka (`n = 132`):** Bezpośrednie obelgi osobiste wzrosły **4,0-krotnie** z poziomu bazowego `3,6%` do **14,4%** (`19/132`), w tym `"chinese tech twitter is the biggest fucking cesspit"` oraz nazywanie czytelników chińskich audytów `"fucking braindead"` (`2125177503526588877`) — niespełna 24 godziny po pouczaniu innego użytkownika, by nie palić zaufania (`2124449493513068862`).

![Wykres kryminalistyczny 1: 1151 tweetów w 17 dni — 75,6% odpowiedzi i 162 vs 0 wzmianek o produktach](../../evidence/charts/theo-chart-1-overview.png)

![Wykres kryminalistyczny 2: Dobowy rytm PST (233 nocne posty) i dzienne słupki z 17 dni](../../evidence/charts/theo-chart-2-rhythm.png)

![Wykres kryminalistyczny 3: Wybiórcza uprzejmość — 0,0% wulgaryzmów wobec VIP-ów vs 8,0% wrogości wobec deweloperów i skok do 14,4% w kryzysie](../../evidence/charts/theo-chart-3-double-standard.png)

![Wykres kryminalistyczny 4: Podział na trzy fale w 25-godzinnym oknie kryzysu wokół chińskiego forka](../../evidence/charts/theo-chart-4-cn-crisis.png)

![Theo cytujący podstawowe pytanie o porównanie narzędzi, by napisać, że inżynierowie zasługują na masowe bezrobocie](../../evidence/25-engineers-unemployment.png)

![Theo nazywający chiński tech-Twitter szambem i obrażający programistów czytających chińskie audyty kodu](../../evidence/26-cn-cesspit.png)

Spojrzenie dwa lata wstecz potwierdza powtarzalny schemat ([Część 16](https://x.com/realchendahuang/status/2125408843152953693)):
- **Drwina z forka z 2024 roku:** Nazwał własny fork motywu VS Code innego twórcy [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you), wyśmiewając temperament autora oryginału.
- **Nękanie indyjskich programistów i przeprosiny z 2024 roku:** Po tym jak jego film wymierzony w indyjskie kanały tutorialowe wywołał falę nękania, opublikował [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc), potępiając ataki na tle narodowościowym — dwa lata przed zaatakowaniem chińskiego tech-Twittera.
- **Październik 2025 — nagroda przeciw FFmpeg:** Przeklinał przed kamerą i wyznaczył **nagrodę $20,000** za usunięcie opiekuna FFmpeg ([zapis](https://www.youtube.com/watch?v=1oQ3KMeaH04)), wycofując ją i kasując wpisy po kontrofercie Windscribe na $21k, publicznym sprzeciwie VLC i potępieniu na liście dyskusyjnej FFmpeg.
- **25 listopada 2026 (~4:00 nad ranem) — usunięta groźba zamknięcia kodu:** Zagroził tej nocy zamknięciem kodu źródłowego T3 Code, ponieważ użytkownicy nie zasługują na open source; po przekroczeniu 3000 polubień po cichu skasował tweeta przed świtem.

---

## 7. Praktyczny plan łagodzenia skutków i działań naprawczych

Jeśli T3 Code jest zainstalowany na maszynie prywatnej lub firmowej, wdróż obronę warstwową obejmującą flagi środowiskowe, blokadę sieci na poziomie systemu operacyjnego, Managed Policy, higienę lokalnego SQLite/poświadczeń oraz unieważnienie tokenów w chmurze.

### 7.1 Zmienne środowiskowe + blokada sieci na poziomie OS (użytkownicy lokalni / desktopowi)

Nie polegaj **wyłącznie** na zmiennych środowiskowych (`PR #42376`, `PR #42464` i `DesktopShellEnvironment.ts` pomijają przekazywanie `T3CODE_OTEL_SDK_DISABLED`, a `AnalyticsService.ts:149` nadal inicjalizuje tożsamość na dysku przy starcie). Połącz zmienne powłoki/użytkownika z blokadą w `/etc/hosts` na poziomie systemu operacyjnego:

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

W systemie Windows ustaw także `T3CODE_TELEMETRY_ENABLED=false`, `T3CODE_OTEL_SDK_DISABLED=true` i `OTEL_SDK_DISABLED=true` w **Właściwości systemu → Zmienne środowiskowe** (Użytkownika i Systemowe) oraz uruchom ponownie system lub zrestartuj wszelkie usługi w tle. Pamiętaj zgodnie z `Issue #36479`, że start serwera nadal wykonuje wychodzące zapytanie do `raw.githubusercontent.com`, o ile nie zostanie zablokowane regułami zapory sieciowej lub proxy.

### 7.2 Administratorska polityka Managed Policy (`macOS`, `Linux`, `Windows`)

Aby zablokować telemetrię, tunele T3 Connect, zadania webhookowe, import ciasteczek przeglądarki oraz tunele podglądu zgodnie z [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md), wdróż plik `policy.json` należący do administratora (lub odpowiednik MDM/GPO):

| OS | Natywna polityka / Rejestr | Ścieżka pliku (`chmod 644` / własność root lub Administrator) |
|---|---|---|
| **macOS** | Profil konfiguracji urządzenia dla `com.t3tools.t3code` *(profile użytkownika są ignorowane)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(wdróż osobno wewnątrz każdej dystrybucji WSL)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) lub `REG_SZ` `Policy` w `HKLM\SOFTWARE\Policies\T3Tools\T3Code` | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

Sprawdź poprawność i wymuszenie polityki poleceniem `t3 policy check policy.json`, zrestartuj T3 Code całkowicie i uruchom `t3 policy show`. **Pamiętaj o udokumentowanych martwych punktach w `docs/user/telemetry.md`:** Managed Policy **nie** wyłącza śledzenia przekaźnika w hostowanej aplikacji `app.t3.codes`, **nie** kontroluje śledzenia w aplikacji mobilnej oraz **nie** wyłącza `Publish agent activity`, jeśli zostało wcześniej włączone.

### 7.3 Kontrola `statev2.sqlite` i czyszczenie stanu lokalnego

Ponieważ usuwanie wątków w UI zachowuje wcześniejsze zdarzenia wewnątrz `~/.t3/userdata/statev2.sqlite` (`Issue #17845`):

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

*(W systemie Windows sprawdź i wyczyść `%USERPROFILE%\.t3\userdata\`, w tym `statev2.sqlite`, `anonymous-id` i `secrets`.)*

### 7.4 Google Antigravity, T3 Connect, Clerk/Cloudflare i cofnięcie uprawnień GitHub

1. **Google Antigravity:** Natychmiast przestań używać prywatnych subskrypcji Google AI / Antigravity przez zarządzany tryb Antigravity w T3 lub CLIProxyAPI, aby chronić przysługujące kontu jednorazowe odwołanie. Usuń katalogi `~/.t3/userdata/providers/antigravity/` i `~/.t3/tools/antigravity-acp/`.
2. **T3 Connect i usunięcie danych w chmurze:** Wyłącz **Publish agent activity** w **Settings → Sharing & access**, odłącz wszystkie lokalne maszyny (`t3` logout / unlink) i włącz `requireConnectDeviceApproval`, jeśli kiedykolwiek ponownie aktywujesz dostęp zdalny. Zażądaj pełnego usunięcia konta i danych przekaźnika przez Clerk oraz oficjalny kontakt ds. usuwania danych prywatnych T3 Tools podany w `privacy-policy.astro` (aby webhook usuwania Clerk z `PR #42285` usunął wiersze przekaźnika PlanetScale i tunele Cloudflare).
3. **Rotacja tokenów GitHub i sekretów:** Cofnij autoryzację OAuth / App dla T3 Code w **GitHub Settings → Applications / Authorized GitHub Apps** (`driver.ts` ma uprawnienia do gwiazdkowania na poziomie hosta). Zrotuj wszystkie klucze API, adresy URL baz danych oraz tokeny, które mogły zostać przekazane w argumentach wiersza poleceń procesów przechwyconych przez `t3-resource-monitor` przed `PR #41889` lub wysłane w błędach webhooka/przekaźnika do Axiom.

### 7.5 Alternatywni klienci

W odpowiedziach społeczności programiści często wskazywali **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`) oraz **Cloudroom** ([Wątek z alternatywami](https://x.com/realchendahuang/status/2125244977878036713)). Przed przyjęciem dowolnego zamiennika samodzielnie zweryfikuj: (1) domyślnie wyłączoną telemetrię i czysty zrzut ruchu sieciowego, (2) rzeczywisty `DELETE` + `VACUUM` lub usunięcie pliku przy kasowaniu wątku, (3) ścisłe delegowanie do oficjalnego CLI bez ekstrakcji poświadczeń i podszywania się pod nagłówki oraz (4) prawdziwe szyfrowanie end-to-end po stronie klienta dla zdalnych tuneli.

---

## 8. Źródła pierwotne i pełny indeks 18 oryginalnych części

> Główną tabelę referencyjną mapującą każde odniesienie od `SRC-001` do `SRC-206+` pomiędzy częściami i zrzutami ekranu znajdziesz w [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md).

### Wpisy źródłowe i pełny indeks 18 części na X (chronologicznie)

- Wpis źródłowy 1 (link do GitHuba na stronie głównej oznaczony jako `"steal our code"`): https://x.com/realchendahuang/status/2125059292919394654
- Wpis źródłowy 2 (spór o nazwę forka MIT, obelgi Temu i podwójne standardy): https://x.com/realchendahuang/status/2125062675147448475
- Część 1 (domyślna telemetria, złamana obietnica `"No telemetry"`, niesolone haszowanie między narzędziami): https://x.com/realchendahuang/status/2125153472450527440
- Część 2 (pozorne usuwanie w SQLite, skaner procesów co 5 sekund, usunięcie trybu Plan, bany w `CONTRIBUTING.md`): https://x.com/realchendahuang/status/2125160473176023486
- Część 3 (cichy `git push --force` w trybie Auto, zdjęcie filtra prywatności w 21 godzin, 0 biuletynów, obrażanie użytkowników): https://x.com/realchendahuang/status/2125201882687881378
- Część 4 (podszywanie się pod nagłówki Google Antigravity, fałszywy `SSH_CONNECTION`, ban nowego konta w 3 minuty): https://x.com/realchendahuang/status/2125213397507858657
- Część 5 (brak szyfrowania E2E w T3 Connect, tunel Cloudflare, własna brama OVH z jawnym tekstem): https://x.com/realchendahuang/status/2125218189596676555
- Część 6 (konflikty interesów anioła biznesu: wyśmiewanie zamknięcia Vibe Kanban i pokrywanie się sandboxów z Daytona): https://x.com/realchendahuang/status/2125385742243520653
- Część 7 (twierdzenia o Managed Policy `"turn off all telemetry"` kontra trzy martwe punkty w oficjalnej dokumentacji): https://x.com/realchendahuang/status/2125391659492081947
- Część 8 (bilans wydatków $800k+ na darmowego klienta i dzienny radar na 31,7 bln tokenów / $10.19M): https://x.com/realchendahuang/status/2125392410763239723
- Część 9 (500 commitów/dzień, 700 agentów, `yolo merges` kontra zniechęcanie do PR-ów i wymaganie obserwacji): https://x.com/realchendahuang/status/2125392916369871309
- Część 10 (wysyłanie `@bot` do scrapowania forków i rywali, bot auto-blokujący, demonetyzacja przez Community Notes): https://x.com/realchendahuang/status/2125393641665671593
- Część 11 (wyjaśnienie z 25 listopada obalone w 2 godziny nocnymi PR-ami i 264 rekordami Claude w zrzucie 100 MB): https://x.com/realchendahuang/status/2125394810559426993
- Część 12 (nocne poprawki po RODO/GDPR ujawniające 2,2 mln/godz. logów IP, zepsute usuwanie kont, wycieki push, mieszane anonimowe paczki): https://x.com/realchendahuang/status/2125395501663281198
- Część 13 (nazywanie chińskiego tech-Twittera szambem przy jednoczesnym cichym łataniu nieizolowanych podglądów i wykonywania poleceń bez pytania): https://x.com/realchendahuang/status/2125395980354994414
- Część 14 (ilościowy podział 1151 tweetów: 0% wulgaryzmów wobec menedżerów big-tech vs 8% wrogości wobec zwykłych programistów): https://x.com/realchendahuang/status/2125404517697290438
- Część 15 (zero rejestracji w USPTO dla T3 Code oraz wymogi Polityki Znaków Towarowych GitHub): https://x.com/realchendahuang/status/2125408163273080950
- Część 16 (powtarzalna historia: `vsc-material-but-i-wont-sue-you`, nagonka na twórców z Indii, nagroda $20k przeciw FFmpeg, skasowana groźba zamknięcia kodu): https://x.com/realchendahuang/status/2125408843152953693
- Część 17 (stos sponsorów Clerk/Axiom, exploit limitu 0% Codex i usunięcie dowodów, Gist `CLIProxyAPI` na 10 kont): https://x.com/realchendahuang/status/2125411353393553744
- Część 18 (jak powstało 77 tys. gwiazdek GitHub: monit po 30 s bezczynności wysyłający gwiazdki API poświadczeniami hosta i nienaprawione gwiazdkowanie dowolnych repozytoriów): https://x.com/realchendahuang/status/2125416210120765799
- Lista alternatyw społeczności: https://x.com/realchendahuang/status/2125244977878036713

### Kod źródłowy, PR-y, Issues, polityki i dowody pierwotne

**Telemetria, prywatność i nocne poprawki po RODO/GDPR (Części 1, 7, 11, 12)**

- Oficjalna domena projektu: https://t3.codes/
- Domyślna telemetria PostHog (PR #174): https://github.com/pingdotgg/t3code/pull/174
- Ciche usunięcie obietnicy `"No telemetry"` na stronie głównej (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Odmowa ułatwienia opt-out (Issue #1397) i zapytanie o złamaną obietnicę (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Kopia surowych zdarzeń na własnym `ingest.t3.codes` (PR #15028) oraz niesolone haszowanie między narzędziami (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- Cztery odrzucone PR-y społecznościowe z przełącznikiem opt-out (`#13458` / `#16763` / `#21248` / `#27077`): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- Pliki źródłowe telemetrii i identyfikacji (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `telemetryId.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts
- Oficjalna dokumentacja telemetrii i Managed Policy: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Twierdzenia Theo o Managed Policy, wyjaśnienia i zaprzeczenia zapisom plików śledzących + publiczny eksport `events.clean.jsonl`: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- Wyciek bezwzględnych ścieżek roboczych (PR #42450) oraz ignorowany opt-out na Win/Mac (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Logi IP w tempie 2,2 mln/godz. przechowywane 30 dni (PR #42380), niepełne usuwanie konta (PR #42285 / #42430), wycieki push na urządzeniach mobilnych (PR #42459 / #41859) i paczkowanie anonimowych zgłoszeń zwrotnych (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Bezpieczeństwo lokalne, ciche łatki bezpieczeństwa, Antigravity i T3 Connect (Części 2, 3, 4, 5, 13)**

- Pozorne usuwanie w SQLite (Issue #17845 / #28903), 5-sekundowy monitor procesów (Issue #11222) oraz poprawka przechwytywania linii poleceń (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Wewnętrzne nazwy hostów wysyłane do Google favicon (PR #16950 / #32657), wymuszone żądanie wychodzące (Issue #36479 / `raw.githubusercontent.com`), obejścia uprawnień/polityk (PR #21806 / #27322), 1,7-krotne zużycie limitu Claude (Issue #7338 / #24649) i błędy poboru mocy (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- Cichy `git push --force` w trybie Claude Auto (Issue #15353 i komentarz z reprodukcją) oraz społecznościowe PR-y z poprawką (`#15360` / `#35207` / `#40692`): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Usunięcie filtrowania modeli prywatnych w 21 godzin dla `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- Pusta zakładka Security Advisories, `SECURITY.md` (`PR #38812` / `#41942`), scalone ciche poprawki bezpieczeństwa (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`) i otwarte zgłoszenia bezpieczeństwa/launchera (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Gwarancja FAQ dla Antigravity, obalenie w kodzie w Issue #40713, ban w 3 minuty (Issue #41536), mieszanie kont (Issue #41973), podszycie pod edytor z białej listy (PR #26876), hub CLIProxyAPI PR #33800, wpisy Theo z zaprzeczeniem ryzyka/diagramem/zrzucaniem winy na CLIProxy oraz kod źródłowy: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Warunki korzystania z Google Antigravity i zakaz na oficjalnym forum: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Odrzucenie E2E w T3 Connect (Issue #32098), domyślnie wyłączony `requireConnectDeviceApproval` (PR #36419), własna brama Caddy na OVH (PR #32945), kod przekaźnika, polityka prywatności oraz dyskusje bez odpowiedzi: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Bilans biznesowy, konflikty inwestorskie, sponsorzy i 77 tys. gwiazdek (Części 6, 8, 17, 18)**

- Wydatki >$800k, dzienny pulpit 31,7 bln tokenów / $10.19M, udział trzech laboratoriów 98,5%, przytyk o braku dostępu do analityki, >$300k darmowych tokenów wczesnego dostępu OpenAI, PR #31158 (1 commit Patricka), zapytania inwestorów i `Ping.gg`: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- Wyśmiewanie Vibe Kanban, ujawnienie inwestycji w Daytona i plan płatnych sandboxów chmurowych: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Lista sponsorów YouTube, potwierdzenie CEO Vercel, wideo o wyłączności, post Marii po usunięciu, `openai/codex#45444`, tweety CLIProxyAPI ClickHouse/Ultra/GrokBot, Gist CLIProxyAPI oraz FAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Wideo „Fake star” o VC, 10-krotny skok gwiazdek, post +3,094 w Trending, post „missed 70k”, PR #27832 / #29922 / #29987, `GitHubStarPrompt.tsx` oraz kod gwiazdkowania dowolnych repozytoriów w `driver.ts`: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Zarządzanie, znaki towarowe, wybiórcza uprzejmość i dawne incydenty (Części 9, 10, 14, 15, 16)**

- Usunięcie trybu Plan (PR #5551 / #33131), ukryty pierścień postępu (PR #9190), obelgi w Issue #33639, odrzucony PR #41572, `CONTRIBUTING.md` i `.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commitów/dzień, `yolo merges`, `"nukes my machine = free content"`, wymóg obserwowania przy PR-ach, groźba usunięcia `/btw` oraz wpisy o wyższości zrzutów ekranu nad PR-ami: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Rozkazy scrapowania forków dla `@bot`, wyśmiewanie Claude Desktop, wezwanie do demonetyzacji przez Community Notes i potwierdzenie auto-blokera: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Rejestry USPTO TSDR (`PING LABS` 97294243 porzucone; EquipmentShare `T3` Reg. 7795672), Polityka Znaków Towarowych GitHub, wsteczny `PR #41898`, groźba bana, odpowiedź o open-source dla firm za bilion dolarów, `"aware of the legality"`, `"get a better lawyer"` i dawne tweety o znakach towarowych: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Dowody wybiórczej uprzejmości (przeprosiny i mosty z Google po Neon, bezrobocie inżynierów, groby lokalnego AI, Linux larpers, groźba więzienia/RSD, posty `stupid bitch`, szambo chińskiego tech-Twittera, brak przeprosin, kazanie o niepaleniu zaufania): https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- Zapisy historyczne (`vsc-material-but-i-wont-sue-you`, film z przeprosinami dla indyjskich programistów, kronika nagrody $20k przeciw FFmpeg): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04
