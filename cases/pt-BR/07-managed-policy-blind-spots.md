# #07 · A Contradição da Política Gerenciada: Quatro Pontos Cegos de Telemetria Documentados

> @theo afirmou que o T3 Code tinha o "melhor sistema de política gerenciada corporativa" do mercado, tornando "trivial desativar toda a telemetria" — contraditado diretamente pelo próprio `docs/user/telemetry.md` e pelo `docs/user/managed-policy.md` do T3 Code.

<!-- section:claim -->
## O Que Foi Afirmado

- Em 24 de novembro, às 19h13 (horário de Brasília), `@theo` descartou a ausência de opções de desativação para o usuário: *"Temos o melhor sistema de política gerenciada corporativa do mercado, trivial de configurar e desativar toda a telemetria. 100x mais fácil que ferramentas como o cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Meia hora depois, ele acrescentou que os dados de conversa *"nunca passam por nenhum dos nossos servidores"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## O Que as Evidências Mostram

A documentação oficial do próprio T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) e [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) documenta quatro pontos cegos concretos:

- **Implantação exclusiva para administradores (zero opção na interface pessoal):** Usuários do aplicativo desktop não têm nenhuma opção nas Configurações. A Política Gerenciada exige MDM/GPO ou caminhos do sistema operacional protegidos por administrador (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, ou `/etc/t3code/policy.json`), completamente inacessíveis para usuários desktop sem privilégios de administrador.
- **O Aplicativo Web Hospedado (`app.t3.codes`) ignora a política:** O aplicativo no navegador ignora as variáveis de ambiente do servidor e a Política Gerenciada, emite rastros de conexão quando compilado com rastreamento e *"não tem opção de desativar o rastreamento de relay."*
- **Os aplicativos móveis ficam fora da política do servidor:** A documentação oficial confirma que as variáveis de ambiente do servidor e a Política Gerenciada *"não desativam o rastreamento móvel."*
- **`Publish agent activity` ignora as desativações:** Envia títulos de projetos, títulos de conversas, nomes de modelos e status em tempo real para o T3 Connect — e a documentação afirma explicitamente: *"A desativação da telemetria não o desabilita."* Além disso, spans e logs de falha do Axiom *"podem citar um valor que o aplicativo estava manipulando"*, e o `Agent feedback` pode anexar até 16 KB de mensagens da conversa.

<!-- section:status -->
## Status no Upstream (`ca81b7b9`)

- **Ainda em aberto:** Durante a madrugada, o [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) adicionou uma opção de rastreamento móvel dentro do aplicativo, mas a Política Gerenciada ainda não consegue desativar o rastreamento móvel, o `app.t3.codes` hospedado ainda não tem nenhuma opção de desativação, o `Publish agent activity` ainda ignora as desativações de telemetria, e não existe nenhuma opção de interface nas Configurações do desktop.

<!-- section:visuals -->
## Evidências Visuais

![Documentação oficial docs/user/telemetry.md confirmando que o app.t3.codes não tem opção de desativação, que o móvel ignora a Política Gerenciada e que a atividade do agente ignora as desativações](../../evidence/05-telemetry-cant-disable.png)

![Documentação oficial docs/user/managed-policy.md listando os caminhos de sistema protegidos por administrador no macOS, Windows e Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Publicação de Theo em 24 de novembro afirmando que a Política Gerenciada torna trivial desativar toda a telemetria](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Fontes Primárias

- [Investigação Original no X (Parte 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Afirmação de `@theo` sobre a Política Gerenciada (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "nunca passam por servidores" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Dossiê Técnico Aprofundado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
