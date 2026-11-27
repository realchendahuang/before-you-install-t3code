# #04 · Suplantación de cabeceras de Google Antigravity, `SSH_CONNECTION` falsos y cuentas baneadas en 3 minutos

> Pese a garantizar en su FAQ el cumplimiento de los ToS, T3 Code extrae credenciales del llavero del sistema operativo, suplanta cabeceras internas de Google (`antigravity/hub/2.24.0`) contra `v1internal` e inyecta valores falsos de `SSH_CONNECTION`, exponiendo las suscripciones personales de Google a baneos rápidos.

<!-- section:claim -->
## Qué se afirmó

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) aseguraba a los suscriptores de pago: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Cuando los usuarios baneados abrieron [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), un maintainer negó que se accediera al backend de Antigravity o se reutilizaran tokens; y en X, `@theo` culpó a los proxies de terceros (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Qué muestra la evidencia

- **Extracción de credenciales del SO y llamadas `v1internal` suplantadas:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) extrae tokens OAuth de Google de archivos locales, de `@napi-rs/keyring` o del Administrador de credenciales de Windows (`CredReadW` vía `ffi-rs` sobre `advapi32.dll`), fija en duro `antigravity/hub/2.24.0` y hace `POST` directamente al endpoint privado `v1internal` de Google. Personal de Google confirmó en el [foro oficial](https://discuss.ai.google.dev/t/185992) que la Sección 6 de los [ToS de Google Antigravity](https://antigravity.google/terms) prohíbe que herramientas de terceros extraigan o reutilicen credenciales para consultar endpoints del backend directamente.
- **`SSH_CONNECTION` falsificados y fuga entre cuentas:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) inyecta una variable de entorno `SSH_CONNECTION` falsificada (`"127.0.0.1 0 127.0.0.1 0"`) para engañar a la CLI de Google y sacarla del aislamiento del llavero del SO hacia archivos en texto plano. Cuando Google actualizó su CLI el 24 de noviembre, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) confirmó que los prompts de la Cuenta A se enrutaban silenciosamente a la Cuenta B.
- **Cuenta nueva de $20 baneada en 3 minutos (`Issue #41536`):** Una suscripción de Google AI recién creada de $20, sin ningún proxy —usando únicamente Antigravity gestionado por T3— fue baneada en su primerísimo mensaje, 3 minutos después de la configuración. Los maintainers cerraron el issue como duplicado sin añadir ninguna advertencia al usuario.
- **Suplantación del cliente nativo y de CLIProxyAPI:** `@theo` fusionó personalmente [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) haciéndose pasar por `"zed"`, mientras que el [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) fusionado conectó el sondeo del hub de [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) con cabeceras suplantadas `claude-code/2.1.273`, `grok-cli/1.0.77` y `antigravityUserAgent`.

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
## Estado upstream (`ca81b7b9`)

- **Sigue activo:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) añadió [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) para mostrar los enlaces de verificación de cuenta de Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`), lo que confirma que Google sigue aplicando sus controles, mientras las cuatro rutas de suplantación y extracción de tokens continúan operativas.

<!-- section:visuals -->
## Evidencia visual

![antigravityUsageLimits.ts fija en duro cabeceras de Google suplantadas y llama a v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts falsifica SSH_CONNECTION para eludir el almacenamiento del llavero del SO](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 documenta una cuenta nueva de $20 sin proxy baneada en 3 minutos](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 conecta de forma nativa el sondeo del hub de CLIProxyAPI suplantado en T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Garantía de ToS en la FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [ToS de Google Antigravity](https://antigravity.google/terms) · [Foro de desarrolladores de Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Dosier técnico profundo 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
