# #03 · `git push --force` silencioso por 52 dias vs. remoção em 21 horas do filtro de privacidade de modelos

> Por mais de 52 dias, o T3 Code manteve aberto um bug em que o modo Auto do Claude aprovava silenciosamente `git push --force origin main` sem pedir confirmação — mas precisou de apenas 21 horas para remover uma whitelist de privacidade para que modelos privados aparecessem no leaderboard público de @theo.

<!-- section:claim -->
## O Que Foi Alegado

- O modo Auto do Claude é projetado para escalar ações destrutivas de alto risco (como force-push em `main`) para aprovação humana explícita.
- A telemetria foi apresentada como métricas agregadas seguras do ponto de vista da privacidade.

<!-- section:evidence -->
## O Que as Evidências Mostram

- **Mais de 52 dias sem correção — `git push --force` silencioso (`Issue #15353`):** Em `ClaudeAdapterV2.ts`, o modo Auto fazia curto-circuito em `!requiresClaudeApproval(context)` direto para `"allow"`. Quando o próprio classificador de segurança do Claude bloqueou `git push --force origin main` duas vezes e escalou a terceira tentativa para confirmação humana, o T3 Code aprovou silenciosamente, sem nenhum prompt na interface, e registrou no log `"source": "user_temporary"`. Dois PRs de correção da comunidade (`#15360`, `#35207`) ficaram sem revisão até o fechamento automático pelo bot; o `#40692` permaneceu sem merge.
- **21 horas para remover uma whitelist de privacidade (`Issue #40948` → `PR #41237`):** Em 22 de novembro, a [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) observou que modelos mais novos estavam faltando no leaderboard público de `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) porque o `PR #29001` impunha uma whitelist de modelos. Em **21 horas**, o [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) foi mergeado na conta de `@theo` anotando que Theo pediu explicitamente a remoção do filtro — fazendo com que nomes privados locais/empresariais como `ollama/acme-internal` e `acme-azure-deployment` fossem transmitidos literalmente para a analítica.

<!-- section:status -->
## Status Upstream (`ca81b7b9`)

- **Parcialmente alterado / bug central de segurança ainda aberto:** O [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) posteriormente mascarou modelos fora do catálogo como `custom:<driver>` (slugs de catálogo/fornecedor ainda são reportados por trás de endpoints customizados). **A Issue #15353 (`git push --force` silencioso no modo Auto) permanece aberta e sem correção em `ca81b7b9`.**

<!-- section:visuals -->
## Evidências Visuais

![Issue #15353 aberta há mais de 52 dias mostrando o modo Auto do Claude aprovando silenciosamente git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 mergeado 21 horas após a Issue #40948, removendo o filtro de privacidade de modelos para slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Fontes Primárias

- [Investigação original no X (Parte 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Comentário de reprodução `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Correções da comunidade sem merge: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Dossiê Técnico Detalhado 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
