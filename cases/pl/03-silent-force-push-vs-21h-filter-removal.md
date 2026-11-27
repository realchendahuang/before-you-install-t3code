# #03 · 52 dni cichego `git push --force` kontra 21 godzin na usunięcie filtra prywatności modeli

> Przez ponad 52 dni T3 Code trzymał otwarty błąd, w którym tryb Claude Auto w milczeniu zatwierdzał `git push --force origin main` bez pytania — a usunięcie białej listy prywatności, po którym prywatne modele pojawiły się na publicznym rankingu @theo, zajęło zaledwie 21 godzin.

<!-- section:claim -->
## Co twierdzono

- Tryb Claude Auto jest zaprojektowany tak, by działania wysokiego ryzyka i o charakterze destrukcyjnym (jak force-push na `main`) eskaluje do wyraźnego zatwierdzenia przez człowieka.
- Telemetrię przedstawiano jako bezpieczne dla prywatności metryki zbiorcze.

<!-- section:evidence -->
## Co pokazują dowody

- **Ponad 52 dni bez poprawki — cichy `git push --force` (`Issue #15353`):** W `ClaudeAdapterV2.ts` tryb Auto skracał drogę przez `!requiresClaudeApproval(context)` prosto do `"allow"`. Gdy własny klasyfikator bezpieczeństwa Claude'a dwukrotnie zablokował `git push --force origin main`, a trzecią próbę eskalował do potwierdzenia przez człowieka, T3 Code zatwierdził ją po cichu, bez żadnego okna w interfejsie, i zalogował `"source": "user_temporary"`. Dwa PR-y z poprawkami od społeczności (`#15360`, `#35207`) przeleżały bez recenzji aż do automatycznego zamknięcia przez bota; `#40692` pozostał niezmergowany.
- **21 godzin na zdjęcie białej listy prywatności (`Issue #40948` → `PR #41237`):** 22 listopada [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) wskazał, że nowszych modeli brakuje na publicznym rankingu `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)), ponieważ `PR #29001` wymuszał białą listę modeli. W ciągu **21 godzin** zmergowano [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) z konta `@theo`, z adnotacją, że Theo wyraźnie poprosił o usunięcie filtra — w efekcie prywatne nazwy lokalne i korporacyjne, takie jak `ollama/acme-internal` i `acme-azure-deployment`, zaczęły być przesyłane dosłownie do analityki.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Częściowo zmienione / główny błąd bezpieczeństwa nadal otwarty:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) zamaskował później modele spoza katalogu jako `custom:<driver>` (slugi z katalogu i od dostawców nadal są raportowane pod niestandardowymi endpointami). **Issue #15353 (cichy `git push --force` w trybie Auto) pozostaje otwarty i niepoprawiony na `ca81b7b9`.**

<!-- section:visuals -->
## Dowody wizualne

![Issue #15353 otwarty ponad 52 dni, pokazujący, jak tryb Claude Auto po cichu zatwierdza git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 zmergowany 21 godzin po Issue #40948, usuwający filtr prywatności modeli dla slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Komentarz z reprodukcją `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Niezmergowane poprawki społeczności: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Techniczne dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
