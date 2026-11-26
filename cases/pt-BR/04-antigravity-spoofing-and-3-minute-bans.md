# #04 · Falsificação de cabeçalhos do Google Antigravity, `SSH_CONNECTION` falso e contas banidas em 3 minutos

> Apesar de garantir conformidade com os ToS em seu FAQ, o T3 Code extrai credenciais do keyring do sistema operacional, falsifica cabeçalhos internos do Google (`antigravity/hub/2.24.0`) contra o `v1internal` e injeta valores falsos de `SSH_CONNECTION` — expondo assinaturas pessoais do Google a banimentos rápidos.

<!-- section:claim -->
## O que foi alegado

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) garantia aos assinantes pagantes: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Quando usuários banidos abriram a [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), um mantenedor negou que o T3 Code acessasse o backend do Antigravity ou reutilizasse tokens — e, no X, `@theo` culpou proxies de terceiros (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## O que as evidências mostram

- **Extração de credenciais do SO e chamadas `v1internal` falsificadas:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) extrai tokens OAuth do Google de arquivos locais, do `@napi-rs/keyring` ou do Gerenciador de Credenciais do Windows (`CredReadW` via `ffi-rs` em `advapi32.dll`), fixa em código `antigravity/hub/2.24.0` e faz `POST` diretamente no endpoint privado `v1internal` do Google. Funcionários do Google confirmaram no [fórum oficial](https://discuss.ai.google.dev/t/185992) que a Seção 6 dos [Termos de Serviço do Google Antigravity](https://antigravity.google/terms) proíbe ferramentas de terceiros de extrair ou reutilizar credenciais para consultar endpoints de backend diretamente.
- **`SSH_CONNECTION` forjado e vazamento entre contas:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) injeta uma variável de ambiente `SSH_CONNECTION` forjada (`"127.0.0.1 0 127.0.0.1 0"`) para enganar a CLI do Google e tirá-la do isolamento do keychain do SO, levando-a a arquivos de texto simples. Quando o Google atualizou sua CLI em 24 de novembro, a [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) confirmou que prompts da Conta A eram silenciosamente roteados para a Conta B.
- **Conta nova de US$ 20 banida em 3 minutos (`Issue #41536`):** Uma assinatura novíssima de US$ 20 do Google AI, sem nenhum proxy — usando apenas o Antigravity gerenciado pelo T3 —, foi banida já na primeira mensagem, 3 minutos após a configuração. Os mantenedores fecharam a issue como duplicata sem adicionar qualquer aviso ao usuário.
- **Falsificação de cliente nativo e da CLIProxyAPI:** `@theo` fez pessoalmente o merge do [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) passando-se por `"zed"`, enquanto o também mergeado [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) conectou a sondagem de hub do [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) com cabeçalhos falsificados `claude-code/2.1.273`, `grok-cli/1.0.77` e `antigravityUserAgent`.

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Ainda ativo:** o [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) adicionou o [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) para exibir links de verificação de conta do Google com `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — confirmando que a fiscalização do Google está ativa —, enquanto os quatro caminhos de falsificação e extração de tokens continuam operantes.

<!-- section:visuals -->
## Evidências visuais

![antigravityUsageLimits.ts fixando em código cabeçalhos falsificados do Google e chamando v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts forjando SSH_CONNECTION para contornar o armazenamento do keychain do SO](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 documentando uma conta nova de US$ 20 sem proxy banida em 3 minutos](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 integrando nativamente a sondagem de hub falsificada da CLIProxyAPI ao T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Garantia de conformidade com os ToS no FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Termos de Serviço do Google Antigravity](https://antigravity.google/terms) · [Fórum de Desenvolvedores do Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Dossiê técnico aprofundado 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
