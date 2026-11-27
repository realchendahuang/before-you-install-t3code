# #01 · Telemetria ativada por padrão por trás da promessa de "sem telemetria" na página inicial

> Enquanto sua página inicial prometia "No telemetry. Unless you opt in. Full stop.", o T3 Code ativou o rastreamento padrão do PostHog, encaminhou cópias brutas por meio do `ingest.t3.codes`, de código fechado, aplicou hash em credenciais externas de `~/.codex` e `~/.claude.json` e rejeitou quatro PRs da comunidade para desativar o rastreamento.

<!-- section:claim -->
## O que foi alegado

- A página inicial do T3 Code prometia em destaque: *"No telemetry / Unless you opt in. Full stop."*
- Apresentava-se publicamente como um cliente de programação com IA local, de código aberto e focado em privacidade.

<!-- section:evidence -->
## O que as evidências mostram

- **Rastreamento ativado por padrão sob a promessa de "No telemetry" (`PR #174` → `3bdaa6e1`):** Em 6 de março de 2026, o [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) ativou o analytics do PostHog ligado por padrão, sem diálogo de consentimento, sem opção na interface de configurações e sem qualquer documentação de telemetria. Mais de três meses depois, em 18 de junho, o [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) apagou silenciosamente a promessa *"No telemetry"* da página inicial durante um redesign, sem nenhum aviso ao usuário.
- **Retenção de primeira parte em código fechado (`PR #15028`):** Em outubro de 2026, os lotes de telemetria (`FLUSH_INTERVAL_MS = 10_000`) passaram a ser encaminhados pelo endpoint de código fechado da T3, [`https://ingest.t3.codes/`](https://ingest.t3.codes/). A linha 1 do `AnalyticsService.ts` confirma que o servidor retém uma cópia bruta de cada evento antes de repassá-la ao PostHog.
- **Leitura de credenciais de outras ferramentas e SHA-256 sem sal (`PR #21506`):** Na baseline `9d3195b4`, o `Identify.ts` lia `~/.codex/auth.json` (decodificando a claim `user_id` do JWT da OpenAI) e `~/.claude.json` (`oauthAccount.accountUuid`) junto com os IDs de usuário do T3 Connect, calculando digests SHA-256 sem sal (`telemetryId.ts`) para vincular máquinas distintas a uma mesma pessoa. Como a T3 guarda os IDs do Clerk em texto puro, os digests sem sal são reversíveis de forma determinística.
- **Captura granular de uso:** `ProviderUsageAnalytics.ts` e `FeatureUsage.ts` reportavam provedores, modelos personalizados, esforço de raciocínio, modo de permissão, contagem de tokens, número de projetos/threads, metadados de SO/WSL e **35 ações distintas de interface/comando**.
- **Quatro PRs da comunidade para desativar o rastreamento rejeitados:** Em 23 de junho, o mantenedor Julius fechou a [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* A [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) foi fechada em silêncio, e quatro PRs da comunidade para desativar o rastreamento (`#13458`, `#16763`, `#21248`, `#27077` — 147 testes passando, aprovados por bot) foram rejeitados como `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Situação no upstream (`ca81b7b9`)

- **Parcialmente corrigido:** Após a exposição pública (2,26 mi+ de visualizações), o [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) removeu as leituras de `~/.codex/auth.json` e `~/.claude.json`; o [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) passou a mascarar modelos fora do catálogo como `custom:<driver>`; os PRs [`#42630`](https://github.com/pingdotgg/t3code/pull/42630) e [`#42629`](https://github.com/pingdotgg/t3code/pull/42629) adicionaram opções de desativação via CI e `DO_NOT_TRACK`.
- **Ainda em aberto:** `AnalyticsService.ts:156` continua gravando um ID de instalação local em disco antes de verificar as opções de desativação; `DesktopShellEnvironment.ts` segue sem repassar `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` permanece de código fechado; não existe nenhuma opção na interface de Configurações.

<!-- section:visuals -->
## Evidências visuais

![Commit 3bdaa6e1 apagando silenciosamente a promessa "No telemetry / Unless you opt in. Full stop." da página inicial](../../evidence/02-no-telemetry-removed.png)

![Identify.ts lendo ~/.codex/auth.json e ~/.claude.json para atribuição entre dispositivos via SHA-256 sem sal](../../evidence/03-identify-codex-claude.png)

![Issue #1397 fechada como not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 rejeitado como unwanted apesar de 147 testes passando](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 1 · 2,26 mi+ de visualizações)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299, pós-auditoria](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Dossiê técnico aprofundado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
