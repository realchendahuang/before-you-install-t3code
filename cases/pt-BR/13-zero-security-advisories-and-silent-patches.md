# #13 · Zero GitHub Security Advisories, correções silenciosas de alta gravidade e `SECURITY.md` redigido às pressas

> Enquanto desqualificava auditores chineses de código-fonte no X, o T3 Code mesclou em silêncio correções para vulnerabilidades de alta gravidade — incluindo path traversal no armazenamento de segredos, vazamento de tokens entre domínios e execução de comandos a partir de repositórios não confiáveis — e manteve em 0 os GitHub Security Advisories publicados.

<!-- section:claim -->
## O que foi alegado

- Em 24 de novembro, `@theo` desqualificou no X auditorias técnicas em chinês, dizendo que vinham do *"the biggest fucking cesspit"*, e insultou os desenvolvedores que as liam ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Revisões apressadas do `SECURITY.md` (`PR #38812`, `PR #41942`) enquadraram amplo acesso ao host e transporte não criptografado como limites intencionais aceitáveis.

<!-- section:evidence -->
## O que as evidências mostram

- **Zero Security Advisories publicados (`0`):** Até `ca81b7b9`, a página de [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) do `pingdotgg/t3code` lista **zero** avisos publicados — deixando usuários atuais de desktop/servidor sem qualquer alerta formal de CVE ou aviso de atualização.
- **Vulnerabilidades de alta gravidade corrigidas em silêncio:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal no `ServerSecretStore` via `jti`/`nonce` do relay antes da aprovação do dispositivo.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): vazamento de tokens empresariais do GitHub/GitLab entre domínios.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) e [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): isolamento sem sandbox da pré-visualização do navegador no desktop e confirmação de comandos de layout do worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): permissões de arquivo do token Clerk do desktop restritas ao proprietário.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): patch de ~3.000 linhas que finalmente adiciona solicitações de confirmação antes de executar comandos de configurações de repositórios não confiáveis (ao lado de correções silenciosas anteriores `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Defeitos de segurança locais em aberto:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal externo/symlinks) e [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (`externalLauncher.ts` no Windows executando `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, sinalizado pela AVG/Avast como `IDP.HELU.PSE96`) permanecem sem merge.
- **`SECURITY.md` restringe a responsabilidade em vez de reforçar a arquitetura:** declara explicitamente `filesystem:read` em todo o SO fora dos workspaces, transporte HTTP sem criptografia no iOS/LAN e a tomada completa da máquina host por meio de uma chave de assinatura de relay comprometida como *limites de projeto intencionais*.

<!-- section:status -->
## Situação no upstream (`ca81b7b9`)

- **Ainda em aberto:** os GitHub Security Advisories publicados continuam em **0**; a `Issue #26489` e o `PR #30997` continuam sem correção; o `SECURITY.md` segue classificando leituras em todo o SO e HTTP sem criptografia como comportamento intencional.

<!-- section:visuals -->
## Evidências visuais

![PR #39483 corrigindo em silêncio o path traversal do ServerSecretStore sem publicar um Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997, correção em aberto para execuções do PowerShell em Base64 no Windows sinalizadas por antivírus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md classificando leituras em todo o SO, HTTP sem criptografia no iOS e tomada da máquina via chave de relay como limites intencionais](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 publicados)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Dossiê técnico aprofundado 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
