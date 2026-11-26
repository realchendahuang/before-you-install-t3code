# #15 · Zero registros de marca no USPTO por trás da ameaça de banimento no GitHub e o `TRADEMARK.md` retroativo 17 horas depois

> Quando @theo ameaçou contatar o GitHub para derrubar a conta de um desenvolvedor chinês por "violação de marca", a T3 Tools Inc. tinha 0 registros no USPTO para `T3 Code`, `T3 Tools` ou `T3 Connect` — e fundiu retroativamente o `TRADEMARK.md` 17 horas depois.

<!-- section:claim -->
## O que foi alegado

- Em 23 de novembro, `@theo` acusou o autor do fork MIT de violação de marca e ameaçou derrubar uma conta no GitHub ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- Três horas antes de fundir o `TRADEMARK.md`, ele disse a desenvolvedores que o questionavam para *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — apesar de ter zombado do WordPress em setembro de 2024 por uma *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## O que as evidências mostram

- **Zero registros no USPTO para as marcas T3:** Verificação direta no USPTO TSDR (a partir de uma pista de `@vildanden_ai`, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) mostra **0 registros** para `T3 Code`, `T3 Tools` ou `T3 Connect`. O único pedido da T3 Tools Inc. no USPTO (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) foi recusado em fevereiro de 2025 e marcado como `ABANDONED` em 19 de maio de 2025. Enquanto isso, terceiros não relacionados possuem registros ativos de software/SaaS `T3` nas Classes 9 e 42 (`EquipmentShare`, Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`).
- **Exigência da Política de Marcas do GitHub:** Segundo a [Política de Marcas do GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), pedidos comerciais de remoção por marca exigem um número de registro federal ou internacional sob pena de perjúrio. No momento em que `@theo` ameaçou derrubar a conta de `@DDdxx666`, ele não poderia completar o formulário do GitHub.
- **`TRADEMARK.md` retroativo 17 horas depois (`PR #41898`):** Às **12h21 CST de 24 de novembro** — 17 horas após a ameaça de banimento — `@theo` fundiu o [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898), inserindo o `TRADEMARK.md` que reivindicava direitos *"whether registered or unregistered"*, e o citou no X 94 segundos depois ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Registro público:** O `TRADEMARK.md` retroativo permanece em `main`; os registros do USPTO TSDR continuam a mostrar 0 registros da T3 Tools Inc. para `T3 Code`.

<!-- section:visuals -->
## Evidências visuais

![PR #41898 fundido 17 horas após a ameaça de banimento, adicionando retroativamente o TRADEMARK.md](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md reivindicando direitos exclusivos "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo dizendo a desenvolvedores para "get a better lawyer" três horas antes de fundir o TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [Política de Marcas do GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [Citação retroativa 94s depois (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [Zombaria com o WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Dossiê Técnico Profundo 05](../../docs/dossiers/05-governance-trademark-and-history.md)
