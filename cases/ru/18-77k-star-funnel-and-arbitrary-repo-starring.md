# #18 · Воронка на 77 000 звёзд: звёзды за 30-секундный простой под учётными данными хоста и неисправленный баг с произвольным репозиторием

> Спустя шесть месяцев после того, как он назвал звёзды GitHub способом "to trick VCs into investing", @theo сам смёржил внутриинтерфейсный тост по 30-секундному простою, который шлёт `PUT user/starred/...` с учётными данными GitHub хоста, — и это подбросило репозиторий с 30k до 77k звёзд (при ~129 watchers), тогда как баг со звёздами произвольным репозиториям так и остался неисправленным.

<!-- section:claim -->
## Что утверждалось

- 26 апреля 2026 года `@theo` опубликовал *"Github has a fake star problem"*, написав, что звёзды GitHub превратились *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- 24 ноября, при 74,6k звёзд, он заявил, что *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Что показывают доказательства

- **Скачок суточного прироста звёзд в 10 раз через внутриинтерфейсный тост простоя (`PR #27832`, `#29922`, `#29987`):** Потратив более 8 месяцев на первые 30 000 звёзд, `@theo` 30 октября сам написал и сам же смёржил [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832), добавив тост со звездой после 5 отправленных промптов (`PROMPTS_BEFORE_ASKING = 5`), — и суточный прирост звёзд мгновенно **вырос в 10 раз** (`+3,094` звезды в день в GitHub Trending). 3 ноября [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) и [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) добавили **детект простоя с окном 30 секунд** (`IDLE_MS = 30_000`), пока пользователь ждёт ответа ИИ, и заменили браузерный редирект на серверный RPC `sourceControl.star`, который шлёт `PUT user/starred/pingdotgg/t3code` напрямую через **учётные данные `gh` CLI / `GH_TOKEN` хостового сервера**, а следом — конфетти из 160 частиц.
- **Обойдённое ревью и непрозрачность аккаунта на общих хостах:** Macroscope пометил `PR #29922` как *Needs Human Approval* из-за расхождения между браузерным пользователем и серверными учётными данными; `@theo` всё равно смёржил его сам. На общих или удалённых хостах клик по *Star* молча ставит звезду, используя учётные данные GitHub того, кому принадлежит сервер, и не сообщает пользователю, какой аккаунт был использован.
- **Неисправленный баг со звёздами произвольным репозиториям (`driver.ts#L60-L99`):** 6 ноября разработчик `zhilsinger` оставил `Request changes`, указав, что [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) принимает любую строку `owner/repo`, не фиксируя `pingdotgg/t3code`, — из-за чего любой клиент с правом `source-control:write` может ставить звёзды произвольным репозиториям GitHub, используя учётные данные хоста.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Всё ещё открыто:** постановка звёзд произвольным репозиториям без пина в `driver.ts#L60-L99` и ревью `Request changes` от `zhilsinger` от 6 ноября по-прежнему без ответа и без исправлений спустя 19 дней (77k+ звёзд против ~129 watchers).

<!-- section:visuals -->
## Визуальные доказательства

![График Theo от 2 ноября: почти вертикальный скачок звёзд в 10 раз сразу после выката внутриинтерфейсного промпта](../../evidence/20-star-10x-cliff.png)

![Ревью Request Changes от разработчика zhilsinger на PR #29922 без ответа 19 дней](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 принимает произвольные строки owner/repo, не фиксируя pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [скачок в 10 раз (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094 в день в Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Техническое досье 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
