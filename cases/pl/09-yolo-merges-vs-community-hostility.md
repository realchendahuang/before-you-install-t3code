# #09 · Wewnętrzne `yolo merges` kontra zewnętrzna wrogość społeczności i bany z `.github/VOUCHED.td`

> Wewnętrznie T3 Code dostarczało 500 commitów dziennie przez zautomatyzowane pętle agentów i przyznawało, że "yolo merges breaking shit" — a na zewnątrz mówiło współtwórcom "here's my advice: Don't", piętnowało użytkowników przez `.github/VOUCHED.td` i obrażało osoby zgłaszające issue.

<!-- section:claim -->
## Co twierdzono

- T3 Code przedstawia się jako szybko rozwijający się, otwarty na społeczność projekt open source tworzony przez inżynierów dla inżynierów.

<!-- section:evidence -->
## Co pokazują dowody

- **Lekkomyślne tempo wewnętrznych merge'ów:** `@theo` publicznie opisał dostarczanie **500 commitów dziennie** ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), uruchamianie **700 równoległych agentów**, wsadowe mergowanie PR-ów społeczności przez zautomatyzowaną pętlę agentów oraz przyznał, że *"my yolo merges breaking shit sometimes"* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)), a także żartował, że ryzyko wyczyszczenia maszyny to *"free content"* ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **Wrogo nastawione zarządzanie i publiczne piętnowanie z banami:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) zaczynał się od *"here's my advice: Don't"*, a wspierały go automatyczne bany za piętnowanie z [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) oraz **174 etykiety `unwanted`** na odrzuconych PR-ach społeczności.
- **Jednostronne usuwanie funkcji i obrażanie użytkowników:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) zakopał przełącznik Build/Plan (*"Reality check for those upset"*, 10 głosów w dół), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) ukrył pierścień zużycia kontekstu (16 głosów w dół, rekord repozytorium), a [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) usunął tryb Plan całkowicie, wraz z samozaprzeczającym się podsumowaniem AI. W [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) `@theo` powiedział użytkownikowi `@bermudi`, żeby *"uninstall our software"*, i nazwał go *"ungrateful prick"* — a następnego ranka odrzucił jego kolejny [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572).
- **Selekcja po obserwujących na X:** Współtwórców strofowano za to, że nie obserwują `@theo` ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), grożono im usunięciem `/btw` ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)) i mówiono, że opatrzony adnotacjami zrzut ekranu bije na głowę zgłoszenie PR-a ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Nadal aktywne:** `CONTRIBUTING.md` i `.github/VOUCHED.td` pozostają aktywne na `main` w `ca81b7b9`.

<!-- section:visuals -->
## Dowody wizualne

![CONTRIBUTING.md zniechęcający do zewnętrznych PR-ów i dokumentujący publiczne bany za piętnowanie w .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Odpowiedź Theo w Issue #33639, w której każe użytkownikowi odinstalować oprogramowanie i nazywa go niewdzięcznym draniem](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo przyznający: "my yolo merges breaking shit sometimes"](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [komentarz w Issue #33639](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [500 commitów dziennie (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Wyczyszczenie maszyny = "free content" (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Pogłębione dossier techniczne 05](../../docs/dossiers/05-governance-trademark-and-history.md)
