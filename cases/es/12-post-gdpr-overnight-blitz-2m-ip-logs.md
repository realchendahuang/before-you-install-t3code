# #12 · Blitz nocturno de seis horas tras el RGPD: registros de IP a 2,2 M/h y una eliminación de cuentas rota

> Tras la presentación de una denuncia formal ante el RGPD de la UE el 24 de noviembre, seis horas de parches de emergencia durante la madrugada dejaron al descubierto, de forma involuntaria, cuatro revelaciones de privacidad más profundas, encabezadas por spans de Axiom etiquetados con IP a razón de 2,2 millones por hora y retenidos durante 30 días.

<!-- section:claim -->
## Qué se afirmó

- Incluso 3,5 horas después de que se fusionara `PR #42380`, `@theo` respondió públicamente que las IP de los llamantes ya se habían eliminado.
- La documentación oficial (`docs/user/telemetry.md`) prometía que los informes de `agent.feedback` eran anónimos y que la eliminación de cuentas borraba los datos del usuario de forma limpia.

<!-- section:evidence -->
## Qué muestra la evidencia

- **Spans de relay con IP y User-Agent a 2,2 millones por hora (`PR #42380`):** Todos los spans de peticiones de relay exportados a Axiom —aproximadamente **2,2 millones de spans por hora, retenidos durante 30 días**— registraban `client.address` (la IP real del llamante, procedente de `cf-connecting-ip`) y `user_agent.original` justo al lado de `user.id` (con los logs del 1 % de Workers de Cloudflare mantenidos aparte).
- **Eliminación de cuentas de Clerk averiada (`PR #42285` y `PR #42430`):** Eliminar una cuenta de usuario en Clerk dejaba antes filas de relay en PlanetScale y túneles de Cloudflare activos funcionando entre bastidores, hasta que una solicitud real de eliminación por privacidad de un usuario obligó a los ingenieros a ejecutar **SQL escrito a mano y un desmontaje manual de los túneles**.
- **Filtraciones de tokens de push móvil e identificadores de usuario (`PR #42459` y `PR #41859`):** Las cargas útiles de push de FCM en Android transmitían a Google valores `user_id` de Clerk en texto plano en cada notificación; los spans de APNs en iOS y los logs de errores capturaban las URL completas de push del dispositivo, que llevaban los tokens de push.
- **Lotes mezclados de feedback «anónimo» (`PR #42466`):** Los eventos de `agent.feedback` supuestamente anónimos se agrupaban dentro del mismísimo HTTP POST junto a eventos identificados de `installId` y huellas completas del host (sistema operativo, arquitectura, distribución de WSL sin tratar), lo que contradice directamente `docs/user/telemetry.md`.

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Parcheado en parte:** Los PR de emergencia `#42380`, `#42285`, `#42430`, `#42459`, `#41859` y `#42466` se fusionaron durante el sprint nocturno del RGPD.
- **Sigue abierto:** `privacy-policy.astro` permanecía sin cambios desde el `2026-10-06`, el servicio de código cerrado `ingest.t3.codes` conserva copias sin procesar de los eventos sin posibilidad de auditoría independiente, y las anteriores ventanas de retención de 30 días en Axiom nunca se comunicaron formalmente a los usuarios afectados.

<!-- section:visuals -->
## Evidencia visual

![PR #42380 que revela que los spans de relay de ~2,2 M/h registraban la IP real del llamante y el User-Agent junto a user.id durante 30 días en Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 que admite que la eliminación de cuentas dejaba atrás filas de PlanetScale y túneles de Cloudflare activos](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 que admite que los push de FCM en Android enviaban valores user_id de Clerk sin tratar a Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 que admite que el feedback anónimo se agrupaba junto a installId y las huellas del host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Dosier técnico detallado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
