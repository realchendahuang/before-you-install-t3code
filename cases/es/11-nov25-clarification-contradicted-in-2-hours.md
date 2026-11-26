# #11 · La aclaración del 25 de noviembre quedó contradicha en menos de 2 horas por PRs nocturnos y un volcado de 100 MB

> En la mañana del 25 de noviembre, @theo hizo tres amplias garantías de privacidad y publicó un volcado de telemetría de 100 MB — las tres afirmaciones quedaron contradichas en menos de dos horas por los PRs de su propio equipo y por el propio volcado comprimido en gzip.

<!-- section:claim -->
## Lo que se afirmó

En su aclaración de la mañana del 25 de noviembre ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) y en su respuesta de seguimiento ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` aseguró a los usuarios que:
- T3 Code *"never collected file paths."*
- Las variables de entorno *"always disabled telemetry cleanly."*
- Las instalaciones con telemetría desactivada no escriben ningún archivo de rastreo local, y los hashes de propietario de Claude estaban *"broken."*

<!-- section:evidence -->
## Lo que muestra la evidencia

- **Contradicción 1 — Fuga de la ruta absoluta del workspace en `git.cwd` (`PR #42450`):** Unos 90 minutos después de la publicación, el mantenedor principal Julius fusionó [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), admitiendo que las ejecuciones de webhook entregadas por relay exportaban spans de ejecución completos a Axiom — incluidos spans de Git que contenían `git.cwd` (**ruta absoluta completa del workspace, nombre de usuario del sistema operativo y nombre del repositorio**).
- **Contradicción 2 — Desactivaciones de telemetría rotas en Windows y macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) admitió que el escritorio de Windows ignoraba las variables de entorno de usuario `T3CODE_TELEMETRY_ENABLED=false` guardadas cuando se lanzaba desde procesos preexistentes. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) admitió que el trazado de relay del primer arranque en macOS/Linux se inicializaba antes del descubrimiento del shell, ignorando las desactivaciones configuradas en `~/.zshrc` durante toda la sesión.
- **Contradicción 3 — Escrituras en disco incondicionales y 264 registros activos de Claude en `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` en `ca81b7b9`) sigue llamando a `getTelemetryIdentity` de forma incondicional al arrancar, escribiendo el UUID de instalación local (`upsertAnonymousId`) antes de comprobar `telemetryEnabled`. Mientras tanto, la cabecera gzip de la exportación pública de `@theo` (`6,056,594` bytes comprimidos, `95,789` eventos) mostraba un nombre de archivo original `events.clean.jsonl` generado 20 minutos antes de publicar — y aun así contenía **264 registros activos de propietario de Claude** que vinculaban **4 máquinas distintas** (`installId`s) a un único hash SHA-256, junto con modelos proxy privados textuales (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Parcialmente parcheado:** `PR #42450`, `PR #42376` y `PR #42464` se fusionaron durante la noche.
- **Sigue abierto:** `AnalyticsService.ts:156` todavía escribe el ID anónimo local de forma incondicional antes de comprobar las desactivaciones, y `DesktopShellEnvironment.ts` todavía omite reenviar `T3CODE_OTEL_SDK_DISABLED` y `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Evidencia visual

![PR #42450 admitiendo que las ejecuciones activadas por relay exportaban rutas absolutas del workspace desde git.cwd a Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 admitiendo que el escritorio de Windows ignoraba las variables de entorno T3CODE_TELEMETRY_ENABLED=false guardadas](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 admitiendo que el trazado de relay del primer arranque en macOS ignoraba las desactivaciones de ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Auditoría forense de events.clean.jsonl que revela 264 registros de Claude que vinculan 4 máquinas e IDs de modelos proxy privados](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Aclaración de `@theo` del 25 de noviembre (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Respuesta de seguimiento (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Volcado público comprimido en gzip](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
