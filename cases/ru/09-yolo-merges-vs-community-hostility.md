# #09 · Внутренние `yolo merges` против внешней враждебности к сообществу и банов через `.github/VOUCHED.td`

> Внутри T3 Code выпускал по 500 коммитов в день через автоматизированные агентские циклы и признавал, что «yolo merges breaking shit» — а снаружи говорил контрибьюторам «here's my advice: Don't», предавал пользователей публичному осуждению через `.github/VOUCHED.td` и оскорблял тех, кто сообщал об ошибках.

<!-- section:claim -->
## Что утверждалось

- T3 Code позиционирует себя как быстро развивающийся открытый проект, дружелюбный к сообществу, созданный инженерами для инженеров.

<!-- section:evidence -->
## Что показывают доказательства

- **Безрассудная скорость внутренних мержей:** `@theo` публично рассказывал о выпуске **500 коммитов в день** ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), о запуске **700 параллельных агентов**, о пакетном мерже PR сообщества через автоматизированный агентский цикл, признавался, что *«my yolo merges breaking shit sometimes»* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)), и шутил, что риск стереть машину — это *«free content»* ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **Враждебное управление и публичные баны через осуждение:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) начинался со слов *«here's my advice: Don't»*, а подкрепляли это [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) с автобанами за «осуждение» и **174 метки `unwanted`** на отклонённых PR сообщества.
- **Односторонние удаления функций и оскорбления пользователей:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) похоронил переключатель Build/Plan (*«Reality check for those upset»*, 10 дизлайков), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) скрыл индикатор использования контекста (16 дизлайков — рекорд репозитория), а [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) вовсе удалил режим Plan, сопроводив это самопротиворечивым ИИ-резюме. В [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) `@theo` сказал пользователю `@bermudi`, что тому стоит *«uninstall our software»*, и назвал его *«ungrateful prick»* — а наутро отклонил его последующий [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572).
- **Гейткипинг по подписке в X:** контрибьюторам выговаривали за то, что они не подписаны на `@theo` ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), угрожали удалить `/btw` ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)) и заявляли, что скриншот с пометками лучше, чем отправленный PR ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Всё ещё в силе:** `CONTRIBUTING.md` и `.github/VOUCHED.td` остаются в ветке `main` на коммите `ca81b7b9`.

<!-- section:visuals -->
## Визуальные доказательства

![CONTRIBUTING.md отговаривает от внешних PR и описывает публичные баны через осуждение в .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Ответ Theo в Issue #33639, где он советует пользователю удалить программу и называет его ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo признаёт, что «my yolo merges breaking shit sometimes»](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Комментарий в Issue #33639](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [500 коммитов в день (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Стереть машину = «free content» (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Техническое досье 05](../../docs/dossiers/05-governance-trademark-and-history.md)
