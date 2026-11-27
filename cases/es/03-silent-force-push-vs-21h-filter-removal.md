# #03 · 52 días de silencio ante el `git push --force` frente a 21 horas para eliminar el filtro de privacidad de modelos

> Durante más de 52 días, T3 Code dejó abierto un fallo por el cual el modo Auto de Claude aprobaba en silencio `git push --force origin main` sin pedir confirmación; sin embargo, necesitó solo 21 horas para eliminar una lista blanca de privacidad para que los modelos privados aparecieran en la clasificación pública de @theo.

<!-- section:claim -->
## Lo que se afirmó

- El modo Auto de Claude está diseñado para escalar las acciones destructivas de alto riesgo (como el force-push a `main`) a una aprobación humana explícita.
- La telemetría se presentó como métricas agregadas y seguras para la privacidad.

<!-- section:evidence -->
## Lo que muestran las pruebas

- **Más de 52 días sin corregir — `git push --force` silencioso (`Issue #15353`):** En `ClaudeAdapterV2.ts`, el modo Auto cortocircuitaba `!requiresClaudeApproval(context)` directamente a `"allow"`. Cuando el propio clasificador de seguridad de Claude bloqueó `git push --force origin main` dos veces y escaló el tercer intento para confirmación humana, T3 Code lo aprobó en silencio sin ninguna solicitud en la interfaz y registró `"source": "user_temporary"`. Dos PR de la comunidad con la corrección (`#15360`, `#35207`) quedaron sin revisar hasta el cierre automático del bot; `#40692` siguió sin fusionarse.
- **21 horas para desmantelar una lista blanca de privacidad (`Issue #40948` → `PR #41237`):** El 22 de noviembre, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) señaló que los modelos más recientes faltaban en la clasificación pública de `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) porque `PR #29001` imponía una lista blanca de modelos. En **21 horas**, [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) se fusionó bajo la cuenta de `@theo`, señalando que Theo había pedido explícitamente eliminar el filtro, lo que provocó que nombres privados de ámbito local o empresarial como `ollama/acme-internal` y `acme-azure-deployment` se transmitieran literalmente a la analítica.

<!-- section:status -->
## Estado del upstream (`ca81b7b9`)

- **Cambio parcial / el fallo de seguridad central sigue abierto:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) enmascaró más tarde los modelos fuera de catálogo como `custom:<driver>` (los slugs de catálogo y proveedor aún se reportan detrás de endpoints personalizados). **El `Issue #15353` (el `git push --force` silencioso en modo Auto) sigue abierto y sin corregir en `ca81b7b9`.**

<!-- section:visuals -->
## Pruebas visuales

![Issue #15353 abierto más de 52 días que muestra cómo el modo Auto de Claude aprueba en silencio git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 fusionado 21 horas después del Issue #40948 eliminando el filtro de privacidad de modelos para slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Comentario de reproducción `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Correcciones de la comunidad sin fusionar: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Dosier técnico profundo 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
