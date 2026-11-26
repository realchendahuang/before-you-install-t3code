# #15 · Ноль товарных знаков USPTO за угрозой блокировки на GitHub и `TRADEMARK.md`, добавленный задним числом через 17 часов

> Когда @theo пригрозил обратиться в GitHub, чтобы заблокировать аккаунт китайского разработчика за «нарушение прав на товарный знак», у T3 Tools Inc. не было ни одной регистрации в USPTO на `T3 Code`, `T3 Tools` или `T3 Connect` — а `TRADEMARK.md` был добавлен задним числом через 17 часов.

<!-- section:claim -->
## Что утверждалось

- 23 ноября `@theo` обвинил автора MIT-форка в нарушении прав на товарный знак и пригрозил блокировкой аккаунта на GitHub ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- За три часа до合并... 

- За три часа до слияния `TRADEMARK.md` он сказал задававшим вопросы разработчикам *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — хотя в сентябре 2024 года высмеивал WordPress за *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Что показывают доказательства

- **Ноль регистраций в USPTO по знакам T3:** Прямая проверка в USPTO TSDR (по наводке от `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) показывает **0 регистраций** для `T3 Code`, `T3 Tools` или `T3 Connect`. Единственная заявка T3 Tools Inc. в USPTO (`PING LABS`, серийный номер [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) была отклонена в феврале 2025 года и помечена как `ABANDONED` 19 мая 2025 года. Тем временем не связанные с компанией третьи лица владеют действующими регистрациями `T3` для ПО/SaaS в классах 9 и 42 (`EquipmentShare`, рег. `7795672` / серийный номер [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, рег. `3324707`).
- **Требование политики GitHub в отношении товарных знаков:** Согласно [политике GitHub в отношении товарных знаков](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), запросы на удаление по коммерческим товарным знакам требуют указания федерального или международного регистрационного номера под угрозой ответственности за лжесвидетельство. В момент, когда `@theo` угрожал заблокировать аккаунт `@DDdxx666`, он не мог заполнить форму GitHub.
- **`TRADEMARK.md` задним числом через 17 часов (`PR #41898`):** В **12:21 CST 24 ноября** — через 17 часов после угрозы блокировки — `@theo` слил [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898), добавив `TRADEMARK.md` с притязанием на права *"whether registered or unregistered"*, и сослался на него в X через 94 секунды ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Публичная запись:** `TRADEMARK.md`, добавленный задним числом, остаётся в `main`; записи USPTO TSDR по-прежнему показывают 0 регистраций T3 Tools Inc. на `T3 Code`.

<!-- section:visuals -->
## Визуальные доказательства

![PR #41898 слит через 17 часов после угрозы блокировки, задним числом добавляя TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md с притязанием на исключительные права "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo говорит разработчикам "get a better lawyer" за три часа до слияния TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [Политика GitHub в отношении товарных знаков](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Ссылка задним числом через 94 с (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Насмешка над WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Техническое досье 05](../../docs/dossiers/05-governance-trademark-and-history.md)
