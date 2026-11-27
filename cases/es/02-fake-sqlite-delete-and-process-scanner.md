# #02 · Eliminación falsa de hilos en SQLite (hinchazón de 41,6 GB) y escaneo de todos los procesos del SO cada 5 segundos

> Al hacer clic en «eliminar permanentemente», el historial completo de la conversación seguía intacto dentro de `statev2.sqlite` (hinchando los discos locales hasta 41,6 GB), mientras un monitor Rust en segundo plano escaneaba todos los procesos del sistema operativo y la línea de comandos completa cada 5 segundos, sin ninguna opción para desactivarlo.

<!-- section:claim -->
## Qué se afirmaba

- El diálogo de confirmación de eliminación de la barra lateral (`useThreadActionMenu.ts`) decía explícitamente a los usuarios: *"This permanently clears conversation history for this thread."*
- T3 Code se promocionaba como un espacio de trabajo local de código limpio y rápido.

<!-- section:evidence -->
## Qué muestra la evidencia

- **Eliminación permanente falsa (`Issue #17845`, `#28903`):** En la línea base `9d3195b4`, eliminar un hilo solo añadía un evento `"thread.deleted"` a `statev2.sqlite`, dejando intactos en disco los mensajes previos, las salidas de herramientas y las trazas de razonamiento. Los usuarios documentaron que `statev2.sqlite` se inflaba hasta **25,9 GB** en 3 semanas (90% de hilos «eliminados»), **41,6 GB** en 6 semanas y **33 GB** en 7 semanas.
- **Escaneo de procesos y líneas de comandos de toda la máquina (`Issue #11222`, `PR #41889`):** El asistente en segundo plano `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) ejecutaba `ProcessesToUpdate::All` con `with_cmd(UpdateKind::Always)` cada 5 segundos, incluso con los diagnósticos cerrados, manteniendo entre 280 y 300 handles persistentes en más de 440 aplicaciones y juegos no relacionados en Windows. El 24 de noviembre, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) confirmó que los diagnósticos capturaban **las líneas de comandos completas de los procesos** (que a menudo transportan claves de API en texto plano, contraseñas de bases de datos y tokens) dentro de las instantáneas y de la telemetría.
- **Filtraciones de nombres de host corporativos y consulta obligatoria al arrancar:** Las peticiones de favicon del frontend filtraban nombres de host internos (como `devbox.localdomain`) al servicio de favicons de Google (`PR #16950`, `PR #32657`), mientras que el arranque del servidor consultaba incondicionalmente manifiestos de compatibilidad desde `raw.githubusercontent.com` sin opción de desactivarlo (`Issue #36479`).
- **Graves fallos de consumo de cuota y de energía:** Ejecutar Claude a través del Agent SDK consumía las cuotas de 5 horas a **1,7x** de la velocidad normal (`Issue #7338`, `Issue #24649`, 81 comentarios), mientras que las regresiones de GPU llegaban a consumir hasta **136x** la energía de un Electron comparable —manteniendo la GPU de un MacBook a **60 W** (78 minutos de descarga de batería) y a **18 W** tras cerrar la pestaña web (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Parcialmente corregido:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) añadió `thread-content.purge` asíncrono (cerrando `#17845`), y [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) acotó las lecturas del monitor de procesos en Windows.
- **Sigue abierto:** Los hilos de origen eliminados todavía conservan el historial mientras los referencien forks activos, `merge_back` pendientes o subagentes activos; las filas tombstone permanecen en SQLite y recuperar el espacio en disco aún exige ejecutar `VACUUM` sin conexión; Linux y macOS mantienen el descubrimiento con `ProcessesToUpdate::All`, y `PR #41889` sigue abierto.

<!-- section:visuals -->
## Evidencia visual

![Issue #17845 documentando cómo los hilos eliminados permanentemente hinchan statev2.sqlite hasta decenas de gigabytes](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 documentando cómo t3-resource-monitor escanea cada proceso del SO cada 5 segundos](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Expediente técnico detallado 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
