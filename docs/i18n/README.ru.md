# Прежде чем установить T3 Code

<p align="center">
  <em>Независимый публичный реестр pingdotgg/t3code, основанный на доказательствах: расовые двойные стандарты, вводящая в заблуждение телеметрия, критические уязвимости и коммерческие манипуляции.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/"><strong>🌐 Открыть интерактивное визуальное расследование (18 языков)</strong></a>
  ·
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 визуальных свидетельств</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 первичных источников</strong></a>
</p>

<p align="center">
  <strong>Официальные языки ООН:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md"><strong>Русский</strong></a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>Глобальные версии сообщества:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

![Прежде чем установить T3 Code](../../evidence/00-cover-en.png)

> [!IMPORTANT]
> **Независимое публичное расследование · 18 языков**
>
> Никакой телеметрии. Никакой расовой дискриминации. Каждое утверждение ниже привязано к дословным публичным заявлениям, коммитам репозитория, pull request, документам USPTO и архивным скриншотам.
>
> - **Проверенные материалы:** 20 материалов (#00–#19)
> - **Первичные доказательства:** 109 визуальных свидетельств · 327 канонических URL
> - **Проверка upstream:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Уведомления о безопасности:** 0 опубликованных GitHub Security Advisories

---

## Как это произошло за 60 секунд

Один спор об имени вокруг MIT-форка, созданного сообществом, выявил картину расовых двойных стандартов, скрытой телеметрии, молчаливых исправлений безопасности и нерешённых архитектурных рисков.

1. **Искра дискриминации** *(23 ноября 2026)* — После того как пользователь принял бесплатный MIT-форк китайского разработчика за официальный T3 Code, @theo назвал его «китайской подделкой» и «Temu3 Code» и пригрозил блокировкой аккаунта GitHub — хотя у него не было ни одного товарного знака USPTO и через 11 часов он публично приветствовал копирование MIT-кода американскими лабораториями с триллионной стоимостью.
2. **Открытие исходного кода** *(24 ноября 2026)* — Построчная проверка pingdotgg/t3code выявила телеметрию PostHog, включённую по умолчанию и скрытую за обещанием «Никакой телеметрии» на главной странице; закрытое хранение событий на ingest.t3.codes; чтение SHA-256 без соли из ~/.codex и ~/.claude.json; фиктивное удаление 41,6 ГБ в SQLite; 52-дневную ошибку молчаливого git push --force; подмену заголовков Google Antigravity и T3 Connect без E2E-шифрования и с передачей открытым текстом.
3. **2,26 млн+ просмотров, жалоба в ЕС по GDPR и шестичасовой аврал** *(Ночь 24–25 ноября)* — Первая часть набрала более 2,26 млн просмотров и спровоцировала жалобу в ЕС по GDPR. Срочные ночные PR непреднамеренно раскрыли журналы IP и User-Agent в Axiom с интенсивностью 2,2 млн в час и хранением 30 дней, утечки абсолютных путей рабочей области git.cwd, неработающее удаление аккаунта и игнорирование отказов от сбора данных в Windows/macOS.
4. **Что остаётся открытым сегодня** *(25 ноября (`ca81b7b9`) и далее)* — Отслеживание +259 коммитов вплоть до ca81b7b9 подтвердило частичные исправления телеметрии — наряду с неисправленной записью идентификатора при запуске, отсутствием переключателя в интерфейсе, 0 GitHub Security Advisories, незакреплённой простановкой звёзд произвольным репозиториям, 30-дневными shell-cookie для --lan в открытом виде, неотзываемыми Bearer-токенами и раскрытием SSH_AUTH_SOCK для недоверенных репозиториев (#19).

---

## Все 20 проверенных материалов (#00–#19)

Каждый материал ниже ведёт на отдельный локализованный файл материала без таблиц в этом репозитории и на его визуальную карточку для обмена на веб-портале. Дальнейшее отслеживание будет продолжаться последовательно (#20, #21, ...).

### Часть I · Расовая дискриминация, двойные стандарты и закономерность

*От «китайской подделки» и угроз удаления проекта под названием «Temu3 Code» при отсутствии товарных знаков USPTO до количественного разбора 1 151 твита (0,0% сквернословия со стороны VIP против 8,0% враждебности к разработчикам и 14,4% всплеска антикитайских высказываний на фоне кризиса) и повторяющейся истории за два года.*

- **#00 · [Спор об истоках: «Украдите наш код», угрозы из-за названия форка и расовые двойные стандарты](../../cases/ru/00-origin-fork-dispute-and-double-standard.md)** — `📌 Публичный реестр`
  Меньше чем за 11 минут @theo назвал бесплатный MIT-форк китайского разработчика «китайской подделкой» и «Temu3 Code» и пригрозил блокировкой аккаунта на GitHub — а менее чем через 11 часов публично одобрил копирование MIT-кода компаниями стоимостью в триллион долларов из США.
  [Открыть материал полностью](../../cases/ru/00-origin-fork-dispute-and-double-standard.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [Количественный датасет из 1 151 твита: избирательная вежливость и 4,0-кратный всплеск антикитайского кризиса](../../cases/ru/14-1151-tweet-quantitative-double-standard.md)** — `📌 Публичный реестр`
  Исчерпывающий количественный анализ 1 151 последовательного поста @theo в X (7–24 ноября 2026 года) доказывает резкую асимметрию власти: 0,0% нецензурной брани в адрес 20 топ-менеджеров крупных технологических компаний и сотрудников лабораторий против 8,0% враждебности по отношению к рядовым разработчикам — с ростом в 4,0 раза до 14,4% во время 25-часового спора вокруг китайского форка.
  [Открыть материал полностью](../../cases/ru/14-1151-tweet-quantitative-double-standard.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [Ноль товарных знаков USPTO за угрозой блокировки на GitHub и `TRADEMARK.md`, добавленный задним числом через 17 часов](../../cases/ru/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Публичный реестр`
  Когда @theo пригрозил обратиться в GitHub, чтобы заблокировать аккаунт китайского разработчика за «нарушение прав на товарный знак», у T3 Tools Inc. не было ни одной регистрации в USPTO на `T3 Code`, `T3 Tools` или `T3 Connect` — а `TRADEMARK.md` был добавлен задним числом через 17 часов.
  [Открыть материал полностью](../../cases/ru/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [Двухлетняя историческая закономерность: волны травли по национальному признаку, награда в $20 тыс. за FFmpeg и удалённые угрозы](../../cases/ru/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Публичный реестр`
  Вспышка вокруг китайского форка в ноябре 2026 года не была единичным срывом — публичные записи с 2024 по 2026 год фиксируют повторяющийся цикл: травля по национальному признаку, издевательства в open source, насмешки над интерфейсами других разработчиков и удаление постов после волны критики.
  [Открыть материал полностью](../../cases/ru/16-two-year-pattern-of-bullying-and-deletions.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125408843152953693)

### Часть II · Вводящая в заблуждение телеметрия и нарушения приватности

*Как «Никакой телеметрии. Точка.» скрывало отправку данных в PostHog по умолчанию, закрытое хранение на ingest.t3.codes, хеширование учётных данных между инструментами, слепые зоны Managed Policy и журналы Axiom с метками IP в объёме 2,2 млн в час.*

- **#01 · [Телеметрия по умолчанию за обещанием "No Telemetry" на главной странице](../../cases/ru/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Частично исправлено`
  Пока на главной странице обещали *"No telemetry. Unless you opt in. Full stop."*, T3 Code включил отслеживание PostHog по умолчанию, направлял сырые копии через закрытый `ingest.t3.codes`, хешировал внешние учетные данные `~/.codex` и `~/.claude.json` и отклонил четыре PR сообщества об отказе от телеметрии.
  [Открыть материал полностью](../../cases/ru/01-default-telemetry-and-cross-tool-tracking.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [Противоречие управляемой политики: четыре задокументированных слепых зоны телеметрии](../../cases/ru/07-managed-policy-blind-spots.md)** — `🔴 Не исправлено`
  @theo утверждал, что в T3 Code «best corporate managed policy system», благодаря которой «trivial to turn off all telemetry», — что напрямую опровергается собственными файлами T3 Code `docs/user/telemetry.md` и `docs/user/managed-policy.md`.
  [Открыть материал полностью](../../cases/ru/07-managed-policy-blind-spots.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [Разъяснение от 25 ноября опровергнуто в течение 2 часов ночными PR и дампом на 100 МБ](../../cases/ru/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Частично исправлено`
  Утром 25 ноября @theo выступил с тремя широкими заверениями о приватности и опубликовал дамп телеметрии на 100 МБ — все три утверждения были опровергнуты в течение двух часов PR его собственной команды и самим gzip-архивом.
  [Открыть материал полностью](../../cases/ru/11-nov25-clarification-contradicted-in-2-hours.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [Шестичасовая ночная гонка после GDPR: 2,2 млн IP-логов в час и сломанное удаление аккаунтов](../../cases/ru/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Частично исправлено`
  После подачи официальной жалобы по GDPR в ЕС 24 ноября шесть часов экстренных ночных патчей невольно вскрыли четыре более глубокие проблемы с приватностью — главная из них: 2,2 млн спанов Axiom в час с привязкой к IP, хранящихся 30 дней.
  [Открыть материал полностью](../../cases/ru/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125395501663281198)

### Часть III · Дефекты продукта и критические уязвимости

*Фиктивное удаление 41,6 ГБ в SQLite, пятисекундное сканирование процессов ОС, 52-дневный молчаливый git push --force, подмена ToS Google Antigravity, приводившая к трёхминутным блокировкам, T3 Connect без E2E-шифрования и с передачей открытым текстом, 0 Security Advisories и уязвимости LAN/Bearer/SSH_AUTH_SOCK в ca81b7b9.*

- **#02 · [Фальшивое удаление тредов в SQLite (раздувание до 41.6 ГБ) и пятисекундное сканирование всех процессов ОС](../../cases/ru/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Частично исправлено`
  Нажатие «удалить навсегда» оставляло полную историю переписки внутри `statev2.sqlite` (раздувая локальные диски до 41.6 ГБ), а фоновый монитор на Rust каждые 5 секунд сканировал все процессы ОС вместе с полными командными строками, без возможности отказаться.
  [Открыть материал полностью](../../cases/ru/02-fake-sqlite-delete-and-process-scanner.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 дня молчаливого `git push --force` против 21 часа на удаление фильтра приватности моделей](../../cases/ru/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Не исправлено`
  Более 52 дней T3 Code держал открытым баг, при котором режим Claude Auto молча одобрял `git push --force origin main`, не запрашивая подтверждения, — и при этом ему понадобился всего 21 час, чтобы убрать белый список приватности, из-за чего приватные модели появились в публичном лидерборде @theo.
  [Открыть материал полностью](../../cases/ru/03-silent-force-push-vs-21h-filter-removal.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Подмена заголовков Google Antigravity, фиктивный `SSH_CONNECTION` и блокировка аккаунта за 3 минуты](../../cases/ru/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Не исправлено`
  Несмотря на гарантии соблюдения ToS в своём FAQ, T3 Code извлекает учётные данные из связки ключей ОС, подменяет внутренние заголовки Google (`antigravity/hub/2.24.0`) при обращении к `v1internal` и подставляет фиктивные значения `SSH_CONNECTION` — подвергая личные подписки Google риску быстрых блокировок.
  [Открыть материал полностью](../../cases/ru/04-antigravity-spoofing-and-3-minute-bans.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: полное отсутствие сквозного шифрования и шлюз с терминацией TLS, пропускающий открытый текст](../../cases/ru/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Не исправлено`
  Каждый промпт, исходный файл и поток терминала, проходящие через T3 Connect, обрабатываются в открытом виде внутри инфраструктуры, контролируемой T3, — при полном отсутствии сквозного шифрования и одобрении устройств, отключённом по умолчанию.
  [Открыть материал полностью](../../cases/ru/05-t3-connect-zero-e2e-plaintext-relay.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [Ноль опубликованных GitHub Security Advisories, молчаливые патчи высокой критичности и поспешный `SECURITY.md`](../../cases/ru/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Не исправлено`
  Отмахиваясь на X от китайских аудиторов исходного кода, T3 Code тихо вливал исправления уязвимостей высокой критичности — включая path traversal в хранилище секретов, утечки токенов между доменами и выполнение команд из недоверенных репозиториев — при этом число опубликованных GitHub Security Advisories оставалось равным 0.
  [Открыть материал полностью](../../cases/ru/13-zero-security-advisories-and-silent-patches.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Критический аудит аутентификации и выполнения в репозитории: 30-дневная оболочка по открытому HTTP в LAN, неотзываемые токены и утечка `SSH_AUTH_SOCK`](../../cases/ru/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Не исправлено`
  Построчная проверка последнего HEAD ветки `main` (`ca81b7b9`, 25 ноября 14:49 CST) подтвердила пять активных брешей в безопасности и надёжности: 30-дневные куки оболочки в открытом виде при `--lan` с обходом при отсутствии `Origin`, неотзываемые Bearer-токены на 30 дней, воспроизводимые URL с `?wsTicket=`, `isIPv4`, убивающий туннели `::1`, и недоверенные репозитории, исполняющие хуки и сабмодули с унаследованными `SSH_AUTH_SOCK` и `GITHUB_TOKEN`.
  [Открыть материал полностью](../../cases/ru/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125494234614788390)

### Часть IV · Коммерческие манипуляции и давление на сообщество

*Радар суточных вычислений на $800 тыс.+ / 31,7 трлн токенов, конфликты с ангельскими инвесторами (Vibe Kanban, Daytona), пересечения в спонсорском стеке, автоматическая простановка звёзд с учётными данными хоста после 30 секунд простоя, обеспечившая 77 тыс. звёзд, сбор форков через @bot и баны в .github/VOUCHED.td.*

- **#06 · [Конфликты ангельского инвестора: насмешки над закрытием Vibe Kanban и пересечение с Daytona](../../cases/ru/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Публичный реестр`
  Помимо дефектов кода, публичные посты @theo в X документируют острые конфликты между его ролью ангельского инвестора в конкурирующих стартапах, делающих инструменты для разработчиков, и его управлением T3 Code.
  [Открыть материал полностью](../../cases/ru/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [Бизнес-бухгалтерия на $800 000+ и радар ежедневных вычислений на 31,7 трлн токенов](../../cases/ru/08-800k-spend-and-31t-token-radar.md)** — `📌 Публичный реестр`
  Телеметрия, включённая по умолчанию, была не инженерным недосмотром: она финансировала разведывательный радар в реальном времени на 31,7 трлн токенов в день (эквивалент $10,19 млн в день на API), который обменивался на $300 тыс.+ бесплатных ранних токенов OpenAI и выходы на инвесторов.
  [Открыть материал полностью](../../cases/ru/08-800k-spend-and-31t-token-radar.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [Внутренние `yolo merges` против внешней враждебности к сообществу и банов через `.github/VOUCHED.td`](../../cases/ru/09-yolo-merges-vs-community-hostility.md)** — `📌 Публичный реестр`
  Внутри T3 Code выпускал по 500 коммитов в день через автоматизированные агентские циклы и признавал, что «yolo merges breaking shit» — а снаружи говорил контрибьюторам «here's my advice: Don't», предавал пользователей публичному осуждению через `.github/VOUCHED.td` и оскорблял тех, кто сообщал об ошибках.
  [Открыть материал полностью](../../cases/ru/09-yolo-merges-vs-community-hostility.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Публичный скрапинг форков через `@bot`, насмешки над конкурентами и подавление критиков](../../cases/ru/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Публичный реестр`
  Высмеивая конкурентов за копирование UI-паттернов, @theo публично ответил «Okay I'm stealing this» на форк разработчицы и через 30 секунд отправил @bot скрапить её код — параллельно разворачивая автоблокировщики и призывая подписчиков лишить критиков монетизации.
  [Открыть материал полностью](../../cases/ru/10-fork-scraping-bot-and-critics-suppression.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Спонсорские связки в стеке, эксплуатация бага 0% квоты Codex и лицемерие `CLIProxyAPI` с 10 аккаунтами](../../cases/ru/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Публичный реестр`
  Проповедуя комплаенс и отказываясь от встроенного переключения аккаунтов из-за риска блокировок, T3 Code встраивает в свой облачный стек YouTube-спонсоров @theo (Clerk и Axiom), тогда как сам @theo хвастался эксплуатацией бага 0% квоты Codex и опубликовал Gist с объединением 10 аккаунтов через `CLIProxyAPI`, на который напрямую ссылается FAQ T3.
  [Открыть материал полностью](../../cases/ru/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2023-05-sponsor-roster) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [Воронка на 77 000 звёзд: звёзды за 30-секундный простой под учётными данными хоста и неисправленный баг с произвольным репозиторием](../../cases/ru/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Не исправлено`
  Спустя шесть месяцев после того, как он назвал звёзды GitHub способом "to trick VCs into investing", @theo сам смёржил внутриинтерфейсный тост по 30-секундному простою, который шлёт `PUT user/starred/...` с учётными данными GitHub хоста, — и это подбросило репозиторий с 30k до 77k звёзд (при ~129 watchers), тогда как баг со звёздами произвольным репозиториям так и остался неисправленным.
  [Открыть материал полностью](../../cases/ru/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Интерактивная карточка](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars) · [Оригинальный пост в X](https://x.com/realchendahuang/status/2125416210120765799)

---

## Ключевые визуальные свидетельства

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## План укрепления и очистки за 2 минуты

Если T3 Code уже установлен на вашей машине, не полагайтесь только на переменные среды: AnalyticsService.ts:156 записывает локальный идентификатор до проверки отказов, а DesktopShellEnvironment.ts не включает OTEL_SDK_DISABLED. Сочетайте переменные среды, блокировку через hosts ОС, офлайн-сжатие SQLite и отзыв токенов.

- [ ] Экспортируйте DO_NOT_TRACK=1 и устаревшие переключатели отключения телеметрии, а также заблокируйте ingest.t3.codes через /etc/hosts.
- [ ] Закройте T3 Code, проверьте statev2.sqlite, выполните VACUUM; в офлайн-режиме либо полностью удалите ~/.t3.
- [ ] Перестаньте запускать личные аккаунты Google AI / Antigravity через каталоги, управляемые T3, чтобы сохранить единственную возможность апелляции.
- [ ] Отключите Publish agent activity, отвяжите машины T3 Connect, запросите удаление данных у Clerk и relay и отзовите OAuth-приложение T3 Code в GitHub.
- [ ] Никогда не открывайте t3 up --lan в открытом виде без TLS, избегайте 30-дневных Bearer-токенов без DPoP в CI и очищайте SSH_AUTH_SOCK / GITHUB_TOKEN перед открытием недоверенных репозиториев.

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**Альтернативы, рекомендованные сообществом:** Разработчики выделяли Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash и Orca. Прежде чем выбрать любой клиент, проверьте телеметрию, отключённую по умолчанию, настоящее локальное удаление, делегирование официальному CLI без подмены заголовков и сквозное шифрование на стороне клиента.

---

## Отчёты сообщества и независимые комментарии

20 пронумерованных материалов (#00–#19) содержат исключительно публично проверяемые фрагменты кода, pull request, официальные документы и архивные публичные посты. Материалы, присланные сообществом, и утверждения из личных сообщений вынесены сюда для ясности доказательной базы.

- **Issue #1 · «Дело против Theo» (@opserx)** — Дословный архив комментариев сообщества, направленных в этот репозиторий 25 ноября 2026 года, вместе с точными примечаниями по первичным источникам к PR #42450 и PR #41237. ([Читать архивный Issue #1](../community/issue-1-the-case-against-theo.md))
- **Жалобы из личных сообщений и текущие поступления** — Несколько разработчиков прислали личные рассказы о своём опыте с @theo и T3 Code. Чтобы соблюсти строгие стандарты проверки, частные сообщения остаются отдельно от первичного реестра материалов #00–#19, если только они не подтверждены независимо публичными артефактами. Присылайте проверяемые находки или подтверждения исправлений upstream через Pull Request или GitHub Issue. ([Политика подачи и проверки](../../CONTRIBUTING.md))

---

## Глубокие технические досье и мастер-индексы

Для построчных различий исходного кода, дословного SQL и полных перекрёстно связанных каталогов изучите сохранённые справочные архивы:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 визуальных свидетельств (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 первичных источников (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Непрерывное отслеживание и участие

Репозиторий активно поддерживается. Фактические исправления, недавно принятые исправления upstream с подтверждением в виде коммита/PR или новые первичные доказательства приветствуются через Pull Request или GitHub Issue — см. CONTRIBUTING.md.
