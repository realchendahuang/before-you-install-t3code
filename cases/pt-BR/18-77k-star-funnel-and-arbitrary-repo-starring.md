# #18 · O Funil de 77.000 Estrelas: Estrelamento por Credencial de Host em 30s de Inatividade e Bug Não Corrigido de Repositório Arbitrário

> Seis meses depois de condenar as estrelas do GitHub como uma forma "to trick VCs into investing", @theo fez self-merge de um toast in-app disparado após 30 segundos de inatividade que executa `PUT user/starred/...` usando as credenciais GitHub do host — catapultando o repositório de 30k para 77k estrelas (com ~129 watchers), enquanto deixava sem correção um bug de estrelamento de repositório arbitrário.

<!-- section:claim -->
## O Que Foi Alegado

- Em 26 de abril de 2026, `@theo` publicou *"Github has a fake star problem"*, escrevendo que as estrelas do GitHub haviam se tornado *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Em 24 de novembro, com 74,6k estrelas, ele afirmou que *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## O Que as Evidências Mostram

- **Salto de 10× nas estrelas diárias via toast in-app de inatividade (`PR #27832`, `#29922`, `#29987`):** Depois de levar mais de 8 meses para chegar a 30.000 estrelas, `@theo` escreveu e fez self-merge da [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) em 30 de outubro, adicionando um toast de estrela após 5 prompts enviados (`PROMPTS_BEFORE_ASKING = 5`), multiplicando imediatamente por **10×** as estrelas diárias (`+3,094` estrelas/dia no GitHub Trending). Em 3 de novembro, a [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) e a [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) adicionaram **detecção de inatividade em janela de 30 segundos** (`IDLE_MS = 30_000`) enquanto os usuários aguardam turnos de IA, e substituíram o redirecionamento no navegador por um RPC `sourceControl.star` do lado do servidor, que dispara `PUT user/starred/pingdotgg/t3code` diretamente por meio das **credenciais `gh` CLI / `GH_TOKEN` do servidor host**, seguido de 160 partículas de confete.
- **Revisão contornada e opacidade da conta no host compartilhado:** O Macroscope sinalizou a `PR #29922` como *Needs Human Approval* por causa da divergência entre usuário do navegador e credencial do servidor; `@theo` fez self-merge mesmo assim. Em hosts compartilhados ou remotos, clicar em *Star* dá estrela ao repositório silenciosamente usando as credenciais GitHub de quem quer que seja o dono do servidor, sem informar ao usuário qual conta foi usada.
- **Bug não corrigido de estrelamento de repositório arbitrário (`driver.ts#L60-L99`):** Em 6 de novembro, o desenvolvedor `zhilsinger` abriu `Request changes` apontando que [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) aceita qualquer string `owner/repo` sem fixar `pingdotgg/t3code` — permitindo que qualquer cliente com `source-control:write` dê estrela em repositórios GitHub arbitrários usando as credenciais do host.

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
## Status Upstream (`ca81b7b9`)

- **Ainda aberto:** o estrelamento de repositório arbitrário sem fixação em `driver.ts#L60-L99` e a revisão `Request changes` de `zhilsinger`, de 6 de novembro, seguem sem resposta e sem correção 19 dias depois (77k+ estrelas contra ~129 watchers).

<!-- section:visuals -->
## Evidência Visual

![Gráfico de Theo em 2 de novembro celebrando um salto de estrelas quase vertical de 10x logo após o envio do prompt in-app](../../evidence/20-star-10x-cliff.png)

![Revisão Request Changes do desenvolvedor zhilsinger na PR #29922, sem resposta há 19 dias](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 aceitando strings owner/repo arbitrárias sem fixar pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Fontes Primárias

- [Investigação Original no X (Parte 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [salto de 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/dia no Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Dossiê Técnico Detalhado 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
