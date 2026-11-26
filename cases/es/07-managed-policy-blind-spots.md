# #07 · La contradicción de Managed Policy: cuatro puntos ciegos documentados en la telemetría

> `@theo` afirmó que T3 Code tenía el *"best corporate managed policy system"*, lo que hacía *"trivial to turn off all telemetry"*; una afirmación directamente contradicha por los propios `docs/user/telemetry.md` y `docs/user/managed-policy.md` de T3 Code.

<!-- section:claim -->
## Lo que se afirmó

- El 24 de noviembre a las 19:13 CST, `@theo` minimizó la ausencia de controles de exclusión voluntaria para usuarios: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Media hora después, añadió que los datos de conversación *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Lo que muestra la evidencia

La documentación oficial de T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) y [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) documenta cuatro puntos ciegos concretos:

- **Implementación exclusiva para administradores (cero interruptor en la interfaz personal):** Los usuarios de escritorio no tienen ningún control en Ajustes. Managed Policy requiere MDM/GPO o rutas del sistema operativo protegidas por administrador (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, o `/etc/t3code/policy.json`), completamente inaccesibles para usuarios de escritorio sin privilegios de administrador.
- **La aplicación web alojada (`app.t3.codes`) ignora la política:** La aplicación de navegador ignora las variables de entorno del servidor y Managed Policy, emite rastros de conexión cuando se compila con tracing, y *"has no relay tracing toggle."*
- **Las aplicaciones móviles quedan fuera de la política del servidor:** La documentación oficial confirma que las variables de entorno del servidor y Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` ignora las exclusiones voluntarias:** Sube títulos de proyectos, títulos de hilos, nombres de modelos y estado en vivo a T3 Connect, y la documentación afirma explícitamente: *"The telemetry opt-out does not disable it."* Además, los spans y registros de fallos fallidos de Axiom *"can quote a value the app was handling"*, y `Agent feedback` puede adjuntar hasta 16 KB de mensajes de conversación.

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Sigue abierto:** Durante la noche, [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) añadió un interruptor de rastreo móvil dentro de la aplicación, pero Managed Policy sigue sin poder desactivar el rastreo móvil, la aplicación web alojada `app.t3.codes` sigue sin ningún interruptor de exclusión voluntaria, `Publish agent activity` sigue ignorando las exclusiones voluntarias de telemetría y no existe ningún interruptor en la interfaz de Ajustes de escritorio.

<!-- section:visuals -->
## Evidencia visual

![La documentación oficial docs/user/telemetry.md confirma que app.t3.codes no tiene interruptor, que móvil ignora Managed Policy y que la actividad del agente ignora las exclusiones voluntarias](../../evidence/05-telemetry-cant-disable.png)

![La documentación oficial docs/user/managed-policy.md enumera rutas del sistema protegidas por administrador en macOS, Windows y Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Publicación de Theo del 24 de noviembre en la que afirma que Managed Policy hace trivial desactivar toda la telemetría](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Afirmación de `@theo` sobre Managed Policy (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [Afirmación de `@theo`: "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Dosier técnico detallado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
