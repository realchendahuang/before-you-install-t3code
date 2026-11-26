# #15 · Zero znaków towarowych w USPTO za groźbą zgłoszenia do GitHuba i retroaktywny `TRADEMARK.md` po 17 godzinach

> Gdy @theo groził kontaktem z GitHubem i usunięciem konta chińskiego dewelopera za „naruszenie znaku towarowego", T3 Tools Inc. miała 0 rejestracji w USPTO dla `T3 Code`, `T3 Tools` i `T3 Connect` — a 17 godzin później retroaktywnie scaliła `TRADEMARK.md`.

<!-- section:claim -->
## Co twierdzono

- 23 listopada `@theo` oskarżył autora forka na licencji MIT o naruszenie znaku towarowego i zagroził usunięciem konta na GitHubie ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- Trzy godziny przed scaleniem `TRADEMARK.md` powiedział pytającym deweloperom *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — mimo że we wrześniu 2024 r. kpił z WordPressa w związku z *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Co pokazują dowody

- **Zero rejestracji znaków T3 w USPTO:** Bezpośrednia weryfikacja w USPTO TSDR (za wskazówką od `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) pokazuje **0 rejestracji** dla `T3 Code`, `T3 Tools` i `T3 Connect`. Jedyny wniosek T3 Tools Inc. do USPTO (`PING LABS`, numer seryjny [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) został odrzucony w lutym 2025 r. i 19 maja 2025 r. oznaczony jako `ABANDONED`. Tymczasem niepowiązane strony trzecie posiadają aktywne rejestracje znaku `T3` dla oprogramowania/SaaS w klasach 9 i 42 (`EquipmentShare`, Reg. `7795672` / numer seryjny [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`).
- **Wymóg polityki znaków towarowych GitHuba:** Zgodnie z [GitHub's Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) komercyjne wnioski o usunięcie treści z powołaniem na znak towarowy wymagają podania federalnego lub międzynarodowego numeru rejestracji, pod rygorem odpowiedzialności karnej za fałszywe oświadczenie. W momencie, gdy `@theo` groził usunięciem konta `@DDdxx666`, nie mógł wypełnić formularza GitHuba.
- **Retroaktywny `TRADEMARK.md` po 17 godzinach (`PR #41898`):** O **12:21 CST 24 listopada** — 17 godzin po groźbie — `@theo` scalił [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898), wprowadzający `TRADEMARK.md` z roszczeniem do praw *"whether registered or unregistered"*, i 94 sekundy później powołał się na niego na X ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Zapis publiczny:** Retroaktywny `TRADEMARK.md` pozostaje na `main`; rejestry USPTO TSDR nadal pokazują 0 rejestracji T3 Tools Inc. dla `T3 Code`.

<!-- section:visuals -->
## Dowody wizualne

![PR #41898 scalony 17 godzin po groźbie, retroaktywnie dodający TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md roszczący sobie prawa wyłączne "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo mówiący deweloperom "get a better lawyer" trzy godziny przed scaleniem TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Retroaktywne powołanie 94 s później (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Kpina z WordPressa (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Pogłębione dossier techniczne 05](../../docs/dossiers/05-governance-trademark-and-history.md)
