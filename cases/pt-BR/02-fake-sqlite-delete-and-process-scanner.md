# #02 · Exclusão falsa de threads no SQLite (inchaço de 41,6 GB) e varredura de todos os processos do sistema a cada 5 segundos

> Clicar em "permanently delete" deixava o histórico completo da conversa intacto dentro do `statev2.sqlite` (inchando os discos locais até 41,6 GB), enquanto um monitor Rust em segundo plano varria todos os processos do sistema e a linha de comando completa a cada 5 segundos, sem nenhuma opção de desativação.

<!-- section:claim -->
## O que foi alegado

- O diálogo de confirmação de exclusão na barra lateral (`useThreadActionMenu.ts`) dizia explicitamente aos usuários: *"This permanently clears conversation history for this thread."*
- O T3 Code era vendido como um espaço de trabalho de programação local limpo e rápido.

<!-- section:evidence -->
## O que as evidências mostram

- **Exclusão permanente falsa (`Issue #17845`, `#28903`):** Na baseline `9d3195b4`, excluir uma thread apenas acrescentava um evento `"thread.deleted"` ao `statev2.sqlite`, deixando no disco, intactas, as mensagens anteriores, as saídas de ferramentas e os rastros de raciocínio. Usuários documentaram o `statev2.sqlite` inflando para **25,9 GB** em 3 semanas (90% das threads "excluídas"), **41,6 GB** em 6 semanas e **33 GB** em 7 semanas.
- **Varredura de processos e linhas de comando de toda a máquina (`Issue #11222`, `PR #41889`):** O auxiliar em segundo plano `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) executava `ProcessesToUpdate::All` com `with_cmd(UpdateKind::Always)` a cada 5 segundos, mesmo com o diagnóstico fechado — mantendo 280–300 handles persistentes em 440+ aplicativos e jogos sem relação com o produto, no Windows. Em 24 de novembro, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) confirmou que o diagnóstico capturava **linhas de comando completas dos processos** (muitas vezes carregando chaves de API em texto puro, senhas de banco de dados e tokens) dentro de snapshots e telemetria.
- **Vazamento de hostnames corporativos e busca obrigatória na inicialização:** Requisições de favicon do frontend vazavam hostnames internos (como `devbox.localdomain`) para o serviço de favicon do Google (`PR #16950`, `PR #32657`), enquanto a inicialização do servidor buscava incondicionalmente manifestos de compatibilidade em `raw.githubusercontent.com`, sem opção de desativação (`Issue #36479`).
- **Queima severa de cota e bugs de consumo de energia:** Usar o Claude via Agent SDK queimava cotas de 5 horas a **1,7x** a velocidade normal (`Issue #7338`, `Issue #24649`, 81 comentários), enquanto regressões de GPU chegavam a consumir até **136x** a energia de um Electron comparável — fixando a GPU de um MacBook em **60W** (78 minutos de bateria) e em **18W** após fechar a aba web (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Status no upstream (`ca81b7b9`)

- **Parcialmente corrigido:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) adicionou a purga assíncrona `thread-content.purge` (encerrando o `#17845`), e [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) restringiu as leituras do monitor de processos no Windows.
- **Ainda em aberto:** Threads de origem excluídas continuam guardando o histórico enquanto forem referenciadas por forks ativos, por `merge_back` pendente ou por subagentes ativos; as linhas tombstone permanecem no SQLite e recuperar espaço em disco ainda exige `VACUUM` offline; Linux e macOS mantêm a descoberta `ProcessesToUpdate::All`, e o `PR #41889` segue aberto.

<!-- section:visuals -->
## Evidências visuais

![Issue #17845 documentando threads permanentemente excluídas que inflavam o statev2.sqlite para dezenas de gigabytes](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 documentando o t3-resource-monitor varrendo todos os processos do sistema a cada 5 segundos](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Dossiê técnico aprofundado 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
