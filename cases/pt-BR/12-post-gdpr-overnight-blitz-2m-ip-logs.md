# #12 · Blitz noturna de seis horas no pós-GDPR: logs de IP de 2,2 milhões/h e exclusão de conta quebrada

> Após uma denúncia formal de violação do GDPR ser protocolada na UE, em 24 de novembro, seis horas de patches emergenciais durante a madrugada acabaram expondo involuntariamente quatro revelações de privacidade ainda mais profundas — lideradas por spans do Axiom marcados com IP, de 2,2 milhões por hora, retidos por 30 dias.

<!-- section:claim -->
## O que foi alegado

- Mesmo 3,5 horas depois de o `PR #42380` ser mesclado, `@theo` respondeu publicamente que os IPs dos chamadores já haviam sido removidos.
- A documentação oficial (`docs/user/telemetry.md`) prometia que os relatórios de `agent.feedback` eram anônimos e que a exclusão de conta removia os dados do usuário de forma limpa.

<!-- section:evidence -->
## O que as evidências mostram

- **Spans de relay de IP + User-Agent a 2,2 milhões por hora (`PR #42380`):** Cada span de requisição de relay exportado para o Axiom — aproximadamente **2,2 milhões de spans por hora, retidos por 30 dias** — registrava `client.address` (IP real do chamador proveniente de `cf-connecting-ip`) e `user_agent.original` diretamente ao lado de `user.id` (com os logs de 1% do Workers da Cloudflare mantidos separados).
- **Exclusão de conta quebrada no Clerk (`PR #42285` e `PR #42430`):** Excluir uma conta de usuário no Clerk anteriormente deixava linhas de relay no PlanetScale e túneis ativos da Cloudflare rodando nos bastidores — até que uma solicitação real de exclusão de dados de privacidade de um usuário obrigou engenheiros a executar **SQL escrito à mão e desmontagem manual de túneis**.
- **Vazamentos de tokens de push e IDs de usuário em dispositivos móveis (`PR #42459` e `PR #41859`):** Payloads de push do FCM no Android transmitiam valores `user_id` do Clerk em texto puro ao Google a cada notificação; spans e logs de erro do APNs no iOS capturavam URLs completas de push do dispositivo, que continham tokens de push.
- **Lotes mistos de feedback "anonymous" (`PR #42466`):** Eventos `agent.feedback` supostamente anônimos eram agrupados dentro do exato mesmo POST HTTP, ao lado de eventos `installId` identificados e de impressões digitais completas do host (SO, arquitetura, distribuição WSL bruta), em contradição direta com `docs/user/telemetry.md`.

<!-- section:status -->
## Status do upstream (`ca81b7b9`)

- **Parcialmente corrigido:** PRs emergenciais `#42380`, `#42285`, `#42430`, `#42459`, `#41859` e `#42466` foram mesclados durante o sprint noturno do GDPR.
- **Ainda em aberto:** `privacy-policy.astro` permanecia inalterado desde `2026-10-06`, o `ingest.t3.codes`, de código fechado, mantém cópias brutas de eventos sem possibilidade de auditoria independente, e as janelas anteriores de retenção de 30 dias no Axiom nunca foram formalmente divulgadas aos usuários afetados.

<!-- section:visuals -->
## Evidências visuais

![PR #42380 revelando que spans de relay de ~2,2 milhões/h registravam o IP real do chamador e o User-Agent ao lado de user.id por 30 dias no Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 admitindo que a exclusão de conta anteriormente deixava para trás linhas no PlanetScale e túneis ativos da Cloudflare](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 admitindo que pushes do FCM no Android enviavam valores brutos de user_id do Clerk ao Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 admitindo que o feedback anônimo era agrupado ao lado de installId e impressões digitais do host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Fontes primárias

- [Investigação original no X (Parte 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Dossiê técnico detalhado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
