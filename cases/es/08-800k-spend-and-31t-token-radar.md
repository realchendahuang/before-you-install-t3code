# #08 · El libro de negocios de más de $800.000 y el radar de cómputo diario de 31,7 billones de tokens

> La telemetría activada por defecto no fue un descuido de ingeniería: financió un radar de inteligencia en tiempo real de 31,7 billones de tokens al día (equivalente a $10,19 M diarios de gasto en API), canjeado por más de $300k en tokens gratuitos de acceso anticipado de OpenAI y por contacto con inversores.

<!-- section:claim -->
## Lo que se afirmó

- T3 Code se presentó como una herramienta open source MIT gratuita, hecha por pura pasión, y la telemetría se defendió apenas como un conteo básico para *"know how many users we have."*
- `@theo` también afirmó que `@PatrickToulme`, de DeepMind, había aportado *"many PRs"* a T3 Code.

<!-- section:evidence -->
## Lo que muestra la evidencia

- **Un gasto de más de $800k y un giro total away de los productos de pago:** En las **1.151 publicaciones consecutivas en X** del 7 al 24 de noviembre, `@theo` mencionó T3 Code **162 veces (14,1%)** frente a **0 menciones** de sus productos de pago anteriores (`T3 Chat`, `UploadThing`, `ping.gg`), y confirmó públicamente un gasto de más de **$800k** de su bolsillo en el cliente gratuito ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)).
- **Radar analítico de 31,7 billones de tokens/día ($10,19 M/día):** Los eventos en bruto retenidos mediante `ingest.t3.codes`, de código cerrado, alimentaban un panel interno que registraba **31,7 billones de tokens al día** (**$10,19 millones diarios** de gasto equivalente en API el 18 de noviembre, con un pico cercano a **$10,2 M/día**) y desgloses finos de cuota por laboratorio (`99%` respaldado por suscripción, `~98.5%` entre Codex/Claude/Antigravity, con la cuota de modelos de pesos abiertos cayendo de `15%` a `6%`). Cuando un comentarista especuló sobre cuotas de mercado el 23 de noviembre, `@theo` se burló de él por no tener acceso a sus analíticas ([`2124682906132181482`](https://x.com/theo/status/2124682906132181482)).
- **Convertir la telemetría de usuarios en privilegios de laboratorio y apalancamiento para inversores:** `@theo` contó públicamente que quemó **más de $300k en tokens ilimitados y gratuitos de acceso anticipado de OpenAI** en un benchmark de GPT-6.2 Astra ([`2122760447103484410`](https://x.com/theo/status/2122760447103484410)), que ejecutó benchmarks de Google sobre bare metal y que atendió contactos de inversores (*"multiple investors have asked me about this"*, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).
- **Colaboración con laboratorios exagerada:** El historial de commits de Git filtrado por `patrick-toulme` muestra exactamente **1 commit** ([`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158)), no *"many PRs."*

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Registro público / modelo de negocio activo:** `ingest.t3.codes` sigue siendo de código cerrado y viene activado por defecto en `ca81b7b9`, y continúa alimentando la misma canalización de analítica propia.

<!-- section:visuals -->
## Evidencia visual

![El panel interno de T3 Code de Theo mostrando 31,7 billones de tokens y $10,19 M de gasto diario equivalente en API](../../evidence/17-theo-31t-tokens-10m-day.png)

![Theo revelando un gasto de más de $800k en T3 Code](../../evidence/extra/p6-1-x-theo-800k-cost.png)

![Registro de commits de Git que muestra solo 1 commit (#31158) de patrick-toulme en lugar de "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 8)](https://x.com/realchendahuang/status/2125392410763239723)
- [Gasto de más de $800k (`2120729779511124267`)](https://x.com/theo/status/2120729779511124267) · [Panel de 31,7T / $10,19 M (`2122860770329608290`)](https://x.com/theo/status/2122860770329608290) · [Desglose de cuota por laboratorio (`2123965784888377541`)](https://x.com/theo/status/2123965784888377541)
- [Burla sobre las analíticas (`2124682906132181482`)](https://x.com/theo/status/2124682906132181482) · [Más de $300k en tokens de OpenAI (`2122760447103484410`)](https://x.com/theo/status/2122760447103484410) · [Consultas de inversores (`2123885732330885417`)](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [Dossier técnico profundo 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
