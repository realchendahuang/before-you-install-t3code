# #11 · Esclarecimento de 25 de novembro é contraditado em menos de 2 horas por PRs da madrugada e por um dump de 100 MB

> Na manhã de 25 de novembro, @theo fez três garantias amplas sobre privacidade e publicou um dump de telemetria de 100 MB — as três alegações foram contraditadas em menos de duas horas pelos PRs da própria equipe dele e pelo próprio dump em gzip.

<!-- section:claim -->
## O que foi alegado

Em seu esclarecimento da manhã de 25 de novembro ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) e na resposta de acompanhamento ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` garantiu aos usuários:
- Que o T3 Code *"never collected file paths."*
- Que as variáveis de ambiente *"always disabled telemetry cleanly."*
- Que instalações com opt-out não gravam nenhum arquivo de rastreamento local e que os hashes de proprietário do Claude estavam *"broken."*

<!-- section:evidence -->
## O que as evidências mostram

- **Contradição 1 — vazamento do caminho absoluto do workspace em `git.cwd` (`PR #42450`):** Cerca de 90 minutos após a publicação, o mantenedor principal Julius fez o merge do [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), admitindo que execuções de webhook entregues via relay exportavam spans de execução inteiros para o Axiom — incluindo spans do Git com `git.cwd` (**caminho absoluto completo do workspace, nome de usuário do sistema operacional e nome do repositório**).
- **Contradição 2 — opt-outs quebrados no Windows e no macOS (`PR #42376`, `PR #42464`):** O [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) admitiu que o desktop no Windows ignorava variáveis de ambiente de usuário `T3CODE_TELEMETRY_ENABLED=false` já salvas quando era iniciado a partir de processos preexistentes. O [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) admitiu que, no macOS/Linux, o rastreamento relay da primeira execução era inicializado antes da descoberta do shell, ignorando os opt-outs do `~/.zshrc` durante toda a sessão.
- **Contradição 3 — gravações em disco incondicionais e 264 registros ativos de Claude em `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` em `ca81b7b9`) continua chamando `getTelemetryIdentity` incondicionalmente na inicialização, gravando o UUID de instalação local (`upsertAnonymousId`) antes de verificar `telemetryEnabled`. Enquanto isso, o cabeçalho gzip da exportação pública de `@theo` (`6.056.594` bytes comprimidos, `95.789` eventos) mostrava um nome de arquivo original `events.clean.jsonl` gerado 20 minutos antes da publicação — e ainda assim ele continha **264 registros ativos de proprietário do Claude** que ligavam **4 máquinas separadas** (`installId`s) a um único hash SHA-256, ao lado de modelos de proxy privados reproduzidos literalmente (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Parcialmente corrigido:** `PR #42450`, `PR #42376` e `PR #42464` receberam merge durante a madrugada.
- **Ainda em aberto:** `AnalyticsService.ts:156` continua gravando o ID anônimo local incondicionalmente antes de verificar os opt-outs, e `DesktopShellEnvironment.ts` continua sem repassar `T3CODE_OTEL_SDK_DISABLED` e `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Evidências visuais

![PR #42450 admitindo que execuções disparadas pelo relay exportavam caminhos absolutos de workspace em git.cwd para o Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 admitindo que o desktop no Windows ignorava variáveis de ambiente T3CODE_TELEMETRY_ENABLED=false salvas](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 admitindo que o rastreamento relay da primeira execução no macOS ignorava os opt-outs do ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Auditoria forense de events.clean.jsonl revelando 264 registros de Claude que ligam 4 máquinas e IDs de modelos de proxy privados](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Esclarecimento de `@theo` em 25 de novembro (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Resposta de acompanhamento (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Dump público em gzip](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Dossiê técnico aprofundado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
