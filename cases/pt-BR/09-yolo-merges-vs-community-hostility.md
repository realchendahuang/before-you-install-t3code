# #09 · `yolo merges` internos vs. hostilidade externa da comunidade e banimentos via `.github/VOUCHED.td`

> Internamente, o T3 Code publicava 500 commits por dia por meio de loops automatizados de agentes e admitia "yolo merges breaking shit" — enquanto, externamente, dizia aos contribuidores "here's my advice: Don't", denunciava usuários via `.github/VOUCHED.td` e insultava quem abria issues.

<!-- section:claim -->
## O que foi alegado

- O T3 Code se apresenta como um projeto open-source ágil, acolhedor para a comunidade e feito por engenheiros para engenheiros.

<!-- section:evidence -->
## O que as evidências mostram

- **Velocidade de merge interna imprudente:** `@theo` descreveu publicamente a publicação de **500 commits por dia** ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), a execução de **700 agentes simultâneos**, o merge em lote de PRs da comunidade por meio de um loop automatizado de agentes, admitindo *"my yolo merges breaking shit sometimes"* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)) e brincando que arriscar uma limpeza da máquina equivale a *"free content"* ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)).
- **Governança hostil e banimentos por denúncia pública:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) começava com *"here's my advice: Don't"*, respaldado por banimentos automáticos por denúncia em [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) e **174 rótulos `unwanted`** em PRs da comunidade rejeitados.
- **Remoções unilaterais de funcionalidades e insultos a usuários:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) enterrou o toggle Build/Plan (*"Reality check for those upset"*, 10 votos negativos), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) escondeu o anel de uso de contexto (16 votos negativos, recorde do repositório) e [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) excluiu o modo Plan de vez com um resumo de IA autocontraditório. Na [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545), `@theo` disse ao usuário `@bermudi` para *"uninstall our software"* e o chamou de *"ungrateful prick"* — rejeitando seu [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) de acompanhamento na manhã seguinte.
- **Gatekeeping de seguidores no X:** contribuidores foram repreendidos por não seguir `@theo` ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), ameaçados com a remoção do `/btw` ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)) e ouvidos que um screenshot anotado vale mais do que enviar um PR ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Status no upstream (`ca81b7b9`)

- **Ainda no ar:** `CONTRIBUTING.md` e `.github/VOUCHED.td` permanecem ativos em `main` em `ca81b7b9`.

<!-- section:visuals -->
## Evidências visuais

![CONTRIBUTING.md desencorajando PRs externos e documentando banimentos por denúncia pública em .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Resposta de Theo na Issue #33639 dizendo a um usuário para desinstalar e o chamando de ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo admitindo "my yolo merges breaking shit sometimes"](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Comentário na Issue #33639](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [500 commits por dia (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Limpeza da máquina = free content (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Dossiê Técnico Aprofundado 05](../../docs/dossiers/05-governance-trademark-and-history.md)
