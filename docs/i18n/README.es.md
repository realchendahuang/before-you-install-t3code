# Antes de instalar T3 Code

<p align="center">
  <strong>Idiomas oficiales de las Naciones Unidas:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md"><strong>Español</strong></a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>

![Antes de instalar T3 Code — Portada de la auditoría independiente en 18 entregas](../../evidence/00-cover-en.png)

> **Alcance y política de verificación**  
> Este repositorio es una auditoría independiente de seguridad, telemetría y registros públicos de `pingdotgg/t3code` (T3 Code), que consolida 18 entregas documentadas y publicadas entre el 24 y el 25 de noviembre de 2026 junto con **más de 150 enlaces a fuentes primarias** (commits de GitHub, pull requests, issues, documentación del repositorio, registros de marcas de USPTO TSDR y publicaciones públicas). No incluye datos personales de contacto. Se aceptan Pull Requests para incorporar actualizaciones factuales, correcciones fusionadas posteriormente o nuevas traducciones respaldadas por fuentes primarias.

### Resumen rápido de los hallazgos documentados

- **Telemetría y privacidad (Entregas 1, 7, 11 y 12):** Telemetría de PostHog activada por defecto mientras la portada prometía `No telemetry / Unless you opt in. Full stop.`; copias en bruto enviadas al dominio cerrado `ingest.t3.codes`; hashes SHA-256 sin sal sobre `~/.codex/auth.json` y `~/.claude.json`; 4 PR de exclusión voluntaria rechazados; PR nocturnos posteriores a una denuncia RGPD que reconocen **2,2 millones de spans por hora** con dirección IP almacenados 30 días en Axiom, filtración de rutas absolutas del espacio de trabajo (`git.cwd`), exclusiones ignoradas en Windows/macOS y eliminación incompleta de cuentas.
- **Seguridad local, riesgo de suspensión y transporte (Entregas 2, 3, 4, 5 y 13):** La opción de «borrado permanente» en la barra lateral deja intactas las filas en `statev2.sqlite` (crecimiento de 25 a 41 GB); escaneo completo de todos los procesos de la máquina cada 5 segundos en segundo plano; `git push --force` silencioso durante más de 52 días en modo Claude Auto; **0 avisos de seguridad publicados en GitHub** pese a parches discretos para vistas previas sin aislamiento (sandbox) y ejecución sin confirmación de comandos definidos en repositorios; suplantación de cabeceras de Google Antigravity e inyección de un `SSH_CONNECTION` falso que provocaron bloqueos en 3 minutos y mezcla de cuentas; **cero cifrado de extremo a extremo** en los túneles remotos de T3 Connect.
- **Balance económico y 77.000 estrellas (Entregas 6, 8, 17 y 18):** Más de 800.000 USD invertidos en un cliente MIT gratuito para levantar un radar de cuota de modelos de 31,7 billones de tokens al día (equivalentes a 10,19 millones USD diarios en API); conflictos de interés como inversor ángel (Vibe Kanban y Daytona); pila tecnológica ligada a patrocinadores (Clerk y Axiom); guía de agrupación multicuenta con CLIProxyAPI junto a descargos por riesgo de bloqueo; aviso tras 30 segundos de inactividad que dispara estrellas por API con las credenciales del servidor anfitrión (`PUT user/starred/...`) sin fijar el repositorio en `driver.ts`, elevando las estrellas de 30.000 a 77.000 (con solo 129 watchers) en 25 días.
- **Gobernanza, marcas e historial público (Entregas 9, 10, 14, 15 y 16):** 500 commits diarios en fusiones a ciegas («yolo merges») frente al rechazo sistemático de PR externos y listas públicas de veto en `.github/VOUCHED.td`; uso público de un `@bot` para extraer código de forks; amenazas de cierre de cuenta en GitHub con **0 registros en la USPTO** para `T3 Code` (`TRADEMARK.md` añadido con carácter retroactivo 17 horas después); brecha cuantitativa en 1.151 tuits (0 % de insultos hacia directivos de grandes tecnológicas frente al 8,0 % de hostilidad hacia desarrolladores corrientes); antecedentes documentados.

---

En apenas 48 horas, una disputa por el nombre de un fork comunitario de T3 Code bajo licencia MIT derivó en una auditoría completa del código fuente, una denuncia europea bajo el RGPD y casi veinte parches de emergencia fusionados durante la madrugada.

La secuencia comenzó entre la noche del 23 y la mañana del 24 de noviembre de 2026. Un usuario se quejó en redes de la interfaz de un fork libre y gratuito bajo licencia MIT creado por un desarrollador chino, confundiéndolo con la aplicación oficial. Sin comprobar siquiera si se trataba de un fork legítimo bajo licencia MIT, `@theo` publicó dos mensajes en diez minutos calificándolo de imitación china y «clon de Temu», ridiculizó el trabajo del autor y amenazó con contactar a GitHub para conseguir el bloqueo de su cuenta. Al mismo tiempo, la web de T3 Code etiquetó el enlace a su propio repositorio en GitHub como «steal our code» («roba nuestro código») ([Publicación inicial 1](https://x.com/realchendahuang/status/2125059292919394654), [Publicación inicial 2](https://x.com/realchendahuang/status/2125062675147448475)).

El autor del fork acató de inmediato: en menos de 30 minutos renombró el repositorio y eliminó toda referencia a T3. `@theo` pidió disculpas en mensajes privados, pero mantuvo intactas ambas publicaciones públicas —que juntas superaron las 200.000 visualizaciones— sin borrarlas ni publicar aclaración alguna. A las 6:00 de la mañana siguiente, al comentar la copia de funciones de T3 Code por parte de laboratorios estadounidenses valorados en billones de dólares, sostuvo la postura contraria: el código abierto es código abierto, e incluso las empresas de billones de dólares son bienvenidas a utilizarlo.

![Theo amenazando públicamente con contactar a GitHub para hacer suspender la cuenta del autor de un fork de código abierto](../../evidence/01-origin-theo-threat.png)

A partir de las 17:04 (hora de Pekín) del 24 de noviembre, en lugar de responder con descalificaciones, revisé directamente el historial de commits de `pingdotgg/t3code`, su código fuente, pull requests, issues, documentación oficial, registros de marcas en la USPTO y la cronología pública de `@theo` en X. En 24 horas publiqué **18 entregas documentadas** respaldadas por enlaces directos y capturas. Solo la primera entrega superó **1,81 millones de visualizaciones** y **6.600 guardados**, desencadenando una denuncia ante el RGPD en Europa y un maratón nocturno de seis horas de parches por parte del equipo de T3.

Este documento reúne las 18 entregas en un único archivo cronológico y temático. Cada apartado enlaza directamente con la publicación original correspondiente, seguido de medidas prácticas de mitigación y de la lista completa de fuentes primarias al final.


## «Cero telemetría» en la portada, rastreo entre herramientas y registros de IP en el código

La primera auditoría se centró en la brecha entre las promesas públicas de privacidad de T3 Code y la telemetría efectivamente distribuida en su código ([Entrega 1](https://x.com/realchendahuang/status/2125153472450527440)).

El 6 de marzo de 2026 se fusionó en el repositorio el **PR #174**, que activó la telemetría de PostHog por defecto. No existía documentación de telemetría en el repositorio, no había aviso de consentimiento en el primer arranque ni interruptor en la configuración. La variable de entorno para desactivarla quedaba enterrada en el código mientras las instalaciones predeterminadas empezaban a enviar eventos de inmediato.

Durante más de tres meses de recopilación por defecto, la página principal de T3 Code mantuvo bien visibles dos líneas explícitas: `No telemetry / Unless you opt in. Full stop.` El 18 de junio, `@theo` eliminó silenciosamente ambas frases durante un rediseño de la portada (`commit 3bdaa6e1`), sin anuncio ni aviso alguno a los usuarios existentes.

![El commit 3bdaa6e1 del 18 de junio de 2026 eliminando en silencio la promesa «No telemetry / Unless you opt in. Full stop.» de la página principal](../../evidence/02-no-telemetry-removed.png)

En octubre, `@theo` fusionó el **PR #15028**, redirigiendo los envíos agrupados cada 10 segundos a través de su propio endpoint `ingest.t3.codes`. Los comentarios del código indican de forma explícita que el backend de T3 guarda una copia de cada evento en bruto antes de reenviarlo a PostHog. Los campos recopilados incluían el modelo seleccionado, nombres privados de modelos personalizados, modos de permiso, duración de ejecuciones, recuentos de tokens de entrada, salida y caché, número de proyectos e hilos locales, más de treinta acciones de interfaz, datos del sistema operativo y modelo de hardware.

El 19 de octubre, `@theo` añadió el **PR #21506** porque las métricas previas no permitían saber cuántas máquinas pertenecían a la misma persona. `Identify.ts` empezó a leer silenciosamente los archivos de credenciales de otras herramientas en la carpeta del usuario —`~/.codex/auth.json` y `~/.claude.json`—, extrayendo el `user_id` de OpenAI y el `accountUuid` de Claude para subir **hashes SHA-256 sin sal** junto con la cuenta de T3 Connect y el identificador de dispositivo, correlacionando así todas las máquinas de una persona en el servidor.

![Identify.ts leyendo ~/.codex/auth.json y ~/.claude.json para enviar hashes SHA-256 sin sal con fines de vinculación entre dispositivos](../../evidence/03-identify-codex-claude.png)

Dado que el servidor ya almacena en texto plano los identificadores de cuenta de T3 Connect, aplicar el mismo hash en el backend permite revertir directamente un hash sin sal hasta la identidad individual. Lo mismo ocurre con identificadores de cuentas de terceros filtrados.

Las quejas de la comunidad fueron cerradas una tras otra. El 23 de junio, un desarrollador abrió el **Issue #1397** pidiendo cortésmente un interruptor en los ajustes. El mantenedor principal Julius lo cerró como `not planned` con esta explicación: `We will not make this easier to opt out of, it is crucial for us to know how many users we have` («No facilitaremos la exclusión; es crucial para nosotros saber cuántos usuarios tenemos»).

![El mantenedor principal Julius cerrando el Issue #1397 como not planned y afirmando que no facilitarán la exclusión](../../evidence/04-issue1397-no-optout.png)

En julio, un usuario aportó capturas archivadas de la portada en el **Issue #4123** cuestionando la promesa rota. El 21 de octubre, la cuenta de `@theo` lo cerró vinculándolo a una corrección ajena, lo reabrió tras la presión comunitaria y volvió a cerrarlo en silencio el 4 de noviembre. Entre septiembre y noviembre, distintos colaboradores enviaron **cuatro PR separados** para añadir un ajuste en la interfaz (`#13458`, `#16763`, `#21248`, `#27077`). Incluso el `#27077`, probado en hardware real con **147 pruebas superadas**, fue cerrado el 17 de noviembre con la etiqueta `unwanted`.


El 24 de noviembre, ante el aumento de las críticas, `@theo` respondió en X asegurando que T3 Code ofrece la mejor Managed Policy empresarial del sector para desactivar fácilmente toda telemetría y sosteniendo que los datos de conversación permanecen en local sin tocar nunca sus servidores ([Entrega 7](https://x.com/realchendahuang/status/2125391659492081947)).

Al revisar `docs/user/managed-policy.md`, la realidad dista de esa afirmación. El usuario individual de escritorio sigue sin disponer de interruptor en la interfaz. Desactivar la telemetría exige editar `~/.zshrc` y reiniciar, desplegar MDM o escribir `policy.json` en rutas del sistema protegidas por permisos de administrador (`/Library/Application Support/T3Code/policy.json` en macOS, `C:\Program Files\T3Code\policy.json` o claves del registro HKLM en Windows y `/etc/t3code/policy.json` en Linux).

Peor aún: el propio documento `docs/user/telemetry.md` del repositorio recoge tres ámbitos que Managed Policy no controla en absoluto. Primero, la aplicación web alojada envía trazas de conexión siempre que se compila con el trazado habilitado y carece de interruptor de exclusión. Segundo, las aplicaciones móviles ignoran las variables de entorno del servidor y la Managed Policy. Tercero, cuando `Publish agent activity` está activo en un equipo anfitrión, los títulos de proyectos, títulos de hilos, nombres de modelos y estado en vivo se envían a los servidores de retransmisión de T3 Connect —y la documentación advierte explícitamente de que desactivar la telemetría no detiene ese envío.

![Documentación oficial docs/user/telemetry.md confirmando que la aplicación web carece de ajuste, el móvil queda fuera de Managed Policy y la publicación de actividad ignora la exclusión](../../evidence/05-telemetry-cant-disable.png)


En la mañana del 25 de noviembre, `@theo` publicó un extenso comunicado con tres afirmaciones categóricas: T3 Code nunca recopiló rutas de archivos, las variables de entorno siempre desactivaron limpiamente la telemetría y el rastreo de cuentas de Claude ni siquiera funcionaba. En menos de dos horas, los PR nocturnos de su propio equipo y la **exportación de datos de 100 MB** que él mismo publicó desmintieron los tres puntos ([Entrega 11](https://x.com/realchendahuang/status/2125394810559426993)).

Noventa minutos después de su publicación, el mantenedor Julius fusionó el **PR #42450**, admitiendo en la descripción que las ejecuciones activadas por webhook a través del relay exportaban sus spans completos a Axiom —incluidos spans de Git con `git.cwd`, que contenían la **ruta absoluta del espacio de trabajo, el nombre de usuario del sistema operativo y el nombre del repositorio**.

![PR #42450 confirmando que las ejecuciones activadas por relay exportaban previamente a Axiom rutas absolutas git.cwd con nombres de usuario y repositorio](../../evidence/06-pr42450-absolute-path.jpg)

Otras dos correcciones nocturnas refutaron la supuesta fiabilidad de las variables de entorno. El **PR #42376** confirmó que la aplicación de escritorio para Windows ignoraba una variable de usuario guardada `T3CODE_TELEMETRY_ENABLED=false` y enviaba analítica igualmente. El **PR #42464** confirmó que, en el primer arranque, el trazado del relay de escritorio se evaluaba antes de leer el shell de inicio de sesión, provocando que las exclusiones en `~/.zshrc` quedaran ignoradas durante toda la ejecución.

Cuando un desarrollador angloparlante preguntó si la aplicación seguía escribiendo archivos locales de seguimiento tras desactivar la telemetría, `@theo` lo negó rotundamente. Sin embargo, alrededor de la línea 152 de `AnalyticsService.ts` en la rama `main`, el programa seguía escribiendo sin condiciones al arrancar el identificador persistente de instalación y los hashes de cuentas vinculadas sin comprobar siquiera la variable.

En cuanto al archivo de 100 MB publicado por `@theo` como prueba de transparencia, la inspección de la cabecera del paquete reveló que el nombre interno original correspondía a una exportación depurada generada 20 minutos antes del tuit. Aun tras esa limpieza, el volcado conservaba **264 registros activos de seguimiento de cuentas de Claude** que vinculaban **4 máquinas distintas** al mismo individuo, junto con nombres privados de modelos procedentes de proxies de terceros.


Lo que desencadenó esa carrera nocturna de limpieza fue una denuncia formal ante el RGPD europeo presentada la noche del 24 de noviembre. En el lapso de seis horas de la madrugada del 25 de noviembre, los PR de urgencia sacaron a la luz cuatro revelaciones adicionales sobre privacidad ([Entrega 12](https://x.com/realchendahuang/status/2125395501663281198)).

En primer lugar, el PR #42380 reveló que **cada span de petición del relay enviado al servicio de registro de terceros Axiom —alrededor de 2,2 millones de spans por hora, retenidos durante 30 días— guardaba la dirección IP real del solicitante y su User-Agent justo junto a `user.id`.** Tres horas y media después de fusionarse ese PR, `@theo` seguía asegurando en respuestas que las IP ya se habían eliminado con anterioridad.

![PR #42380 revelando que los spans del relay registraban IP real y User-Agent junto a user.id a un ritmo de 2,2 millones por hora durante 30 días en Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

En segundo lugar, los **PR #42285** y **#42430** mostraron que eliminar una cuenta de usuario en Clerk dejaba intactas sus filas en la base de datos del relay y sus túneles activos de Cloudflare. La primera línea del mantenedor reconocía el motivo de la corrección nocturna: acababan de recibir una solicitud de supresión por privacidad y habían tenido que limpiar las tablas mediante SQL escrito a mano y cerrar los túneles manualmente.

![PR #42285 admitiendo que el borrado de cuentas dejaba filas en el relay y túneles de Cloudflare activos hasta que una solicitud de privacidad obligó a usar SQL manual](../../evidence/09-pr42285-delete-account-leftover.jpg)

En tercer lugar, los **PR #42459** y **#41859** mostraron que las notificaciones push en Android enviaban identificadores de usuario en texto plano a Google, mientras que los registros de errores y la telemetría en iOS habían filtrado URL de notificaciones push con tokens incluidos.

En cuarto lugar, el **PR #42466** admitió que eventos de opinión supuestamente anónimos se agrupaban en el mismo POST HTTP junto a eventos identificados que portaban `installId` y huellas completas del equipo (sistema operativo, arquitectura y distribución WSL), en contradicción directa con `docs/user/telemetry.md`. Mientras tanto, la política de privacidad pública llevaba sin actualizarse desde el 6 de octubre.


## Borrado ficticio, force-push silencioso, bloqueos en Antigravity y túneles en texto plano

Más allá de la telemetría, T3 Code acumuló fallos de almacenamiento local, seguridad de ejecución, cumplimiento con proveedores y transporte que ponían directamente en riesgo tanto las máquinas de los desarrolladores como sus suscripciones de pago.

Empecemos por el comportamiento en disco y los procesos locales ([Entrega 2](https://x.com/realchendahuang/status/2125160473176023486)). Cuando un usuario elimina una conversación en la barra lateral, el cuadro de confirmación promete el borrado permanente del historial. Al abrir `statev2.sqlite`, ni una sola fila ha sido eliminada: conversaciones sensibles, salidas de herramientas y trazas de razonamiento siguen intactas en disco.

Distintos usuarios documentaron bases de datos hinchadas hasta **25,9 GB** en tres semanas (con un 90 % de hilos «borrados»), **41,6 GB** en seis semanas y **33 GB** en siete semanas. Reportado el 10 de octubre como **Issue #17845**, el fallo del falso borrado seguía sin solucionarse.

![Issue #17845 reportando que los hilos borrados permanentemente permanecen en statev2.sqlite, inflando los discos decenas de gigabytes](../../evidence/10-issue17845-fake-delete.png)

Un componente en segundo plano, `t3-resource-monitor` (**Issue #11222**), también consultaba cada proceso en ejecución en el equipo cada 5 segundos, incluso con el panel de diagnóstico cerrado y los clientes desconectados. En Windows abría manejadores sobre más de 400 aplicaciones y juegos ajenos para leer sus líneas de comandos, sin opción para desactivarlo, mientras la documentación interna sostenía que el muestreo solo corría con suscriptores activos.

No fue hasta el 24 de noviembre cuando aterrizó el **PR #41889**, confirmando que el diagnóstico de procesos había estado registrando las **líneas de comandos completas** —donde suelen viajar claves API en texto plano, contraseñas de bases de datos y tokens de autenticación— dentro de la telemetría en vivo y del historial.

A ello se sumaron otros problemas locales documentados: filtración de nombres de host corporativos internos hacia la API de favicons de Google (`PR #16950`, `#32657`), comprobaciones salientes obligatorias de manifiestos incluso con la telemetría desactivada (`Issue #36479`), consumo de la cuota de 5 horas de Claude a un ritmo **1,7 veces** superior al normal (`Issue #7338`, `#24649`) y anomalías energéticas de hasta **136 veces** el consumo normal —incluida una prueba reciente donde la GPU de 19 núcleos de un MacBook quedaba clavada a **60 W**, agotando la batería en 78 minutos y manteniendo **18 W** tras cerrar la pestaña web (`Issue #3143`, `#40581`).


A continuación están las salvaguardas de ejecución y la divulgación de vulnerabilidades ([Entrega 3](https://x.com/realchendahuang/status/2125201882687881378), [Entrega 13](https://x.com/realchendahuang/status/2125395980354994414)).

El modo Claude Auto de T3 Code debe detenerse y pedir permiso al usuario antes de ejecutar comandos de alto riesgo. Sin embargo, desde el 3 de octubre —más de **52 días** documentados en el **Issue #15353**—, el modo Auto aprobó en silencio operaciones que debían haber pedido confirmación. Incluso sin reglas personalizadas, tras bloquear el clasificador de seguridad de Claude `git push --force` en dos ocasiones y escalar el tercer intento a aprobación manual, T3 Code lo aprobaba automáticamente sin mostrar diálogo alguno y lo registraba como aprobado por el usuario. Dos PR correctivos enviados por la comunidad (`#15360`, `#35207`) quedaron olvidados hasta que un bot los cerró automáticamente.

![Issue #15353 abierto durante más de 52 días mostrando al modo Claude Auto aprobando en silencio git push --force sin pedir permiso](../../evidence/11-issue15353-auto-force-push.png)

Compárese esa espera de 53 días con otro cambio. El 22 de noviembre, el **Issue #40948** advirtió que los nuevos modelos no aparecían en la clasificación pública de `@theo`, `slopalytics.com`, porque una lista blanca previa impedía filtrar nombres de modelos privados. En apenas **21 horas**, el **PR #41237** se fusionó bajo el nombre de `@theo` indicando explícitamente que Theo solicitaba retirar ese filtro —enviando al instante en texto claro nombres internos de modelos Ollama e identificadores empresariales de despliegue en Azure para nutrir su ranking público.

En cuanto a divulgación de seguridad, **la pestaña Security Advisories de T3 Code en GitHub sigue marcando 0 avisos publicados.** En cuestión de días, los mantenedores fusionaron en silencio parches para salto de rutas en el almacén de secretos (`#39483`), fugas entre dominios de tokens empresariales de GitHub/GitLab, secretos de webhook sin expiración escritos en registros, credenciales cloud de escritorio legibles por cualquier usuario local, una vista previa de navegador integrada sin sandbox (`#41757`, `#42386`) y un parche de 3.000 líneas (`#42504`) que por fin añadía avisos de confirmación para configuraciones de repositorios no confiables que antes ejecutaban comandos locales sin permiso.

En lugar de advertir a los usuarios para que actualizaran, el repositorio publicó de prisa un `SECURITY.md` declarando la lectura completa del disco fuera del proyecto, el tráfico HTTP sin cifrar en iOS y el control total de la máquina si se filtra la clave del relay como límites de diseño asumidos. Mientras tanto, la pasarela central de ingestión `ingest.t3.codes` continúa siendo de código cerrado, bajo el argumento de `@theo` de que abrir su código atraería ataques.


Para los suscriptores de pago, el riesgo más inmediato afecta a Google Antigravity ([Entrega 4](https://x.com/realchendahuang/status/2125213397507858657)).

Las preguntas frecuentes oficiales de T3 Code aseguran que el equipo colabora con todos los laboratorios y que T3 Code cumple íntegramente los Términos de Servicio de Google Antigravity: si corre dentro de T3 Code, es seguro. Después de que varias cuentas de pago fueran bloqueadas por infracción de condiciones y los usuarios preguntaran en el **Issue #40713**, un mantenedor principal respondió públicamente que T3 Code no llama al backend de Antigravity ni reutiliza tokens del usuario, afirmando que todas las peticiones proceden del CLI oficial de Google.

Otros desarrolladores refutaron de inmediato esa afirmación con los propios archivos del código fuente de T3 Code. `antigravityUsageLimits.ts` extrae tokens OAuth de Google desde archivos locales y el llavero del sistema (consultando directamente el Administrador de credenciales de Windows), fija en código cabeceras falsificadas del cliente oficial de Google —incluidas cadenas internas de compilación de Google— y llama directamente al endpoint no documentado `v1internal`. Personal de Google ya había advertido en el foro oficial para desarrolladores que la sección 6 de los Términos prohíbe a herramientas de terceros extraer o reutilizar credenciales para consultar directamente el backend.

![antigravityUsageLimits.ts fijando en código cabeceras falsificadas del cliente de Google para llamar al backend no documentado v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

Más aún: el CLI oficial de Google bloquea las credenciales en el llavero del sistema operativo para vincular cada equipo a una sola cuenta. Para habilitar varias cuentas simultáneas y leer él mismo los tokens, `antigravityAuthSupport.ts` inyecta una variable de entorno falsa `SSH_CONNECTION`, engañando al CLI para hacerle creer que corre en un servidor remoto sin entorno gráfico y que escriba los tokens en texto plano dentro del directorio de T3. Cuando Google lanzó una actualización del CLI el 24 de noviembre eliminando ese mecanismo de respaldo, el aislamiento entre cuentas colapsó al instante: el **Issue #41973** confirmó que cada mensaje enviado bajo la cuenta A se enrutaba en silencio a la cuenta B.

![antigravityAuthSupport.ts inyectando una variable SSH_CONNECTION falsa para eludir el almacenamiento en el llavero del sistema](../../evidence/13-antigravity-ssh-spoof.png)

El 23 de noviembre, el **Issue #41536** documentó una suscripción de Google AI recién comprada por 20 USD, sin ningún proxy —solo Antigravity gestionado dentro de T3 Code—, bloqueada por Google en su primer mensaje, **tres minutos** después de configurarla. Google concede a las cuentas personales una única apelación. Los mantenedores ni investigaron ni añadieron advertencia alguna: cerraron el issue como duplicado.

![Issue #41536 documentando una cuenta nueva de Google de 20 USD sin proxy bloqueada tres minutos después de configurarla en su primer mensaje, cerrado como duplicado](../../evidence/14-issue41536-fresh-ban.png)

Suplantar clientes para sortear restricciones de los laboratorios ya era práctica habitual. Anteriormente, cuando Google limitó el acceso completo a los modelos a clientes incluidos en lista blanca, un issue comunitario advirtió expresamente contra suplantar el nombre de otro editor. El bot de `@theo` cerró el issue; ocho días después, el propio `@theo` fusionó el **PR #26876**, cambiando la cadena de cliente de T3 Code al nombre de un editor autorizado para que el backend de Google clasificara erróneamente el tráfico de T3.


Por último, conviene examinar T3 Connect, el relay de control remoto del móvil al escritorio ([Entrega 5](https://x.com/realchendahuang/status/2125218189596676555)).

**T3 Connect carece por completo de cifrado de extremo a extremo: cada prompt, archivo fuente y salida de terminal resulta técnicamente visible en texto plano para T3.** Actualmente depende de Cloudflare Tunnels aprovisionados dentro de la cuenta de Cloudflare de T3. El cifrado TLS termina en el borde de Cloudflare sin cifrado en la capa de aplicación. Adjuntar una Workers Route desde el panel de Cloudflare de T3 basta para capturar todo el tráfico en texto plano sin modificar el código abierto y sin generar alerta alguna en el escritorio o el móvil.

Al mismo tiempo, la aprobación manual de nuevos dispositivos viene desactivada por defecto. El propio `SECURITY.md` de T3 confirma que una clave de firma del relay filtrada o una cuenta en la nube comprometida permite emitir una sesión válida directamente hacia el equipo vinculado —equivalente a entregar una shell local completa.

Cuando un usuario abrió el **Issue #32098** solicitando autenticación mutua y cifrado de extremo a extremo, un mantenedor añadió una casilla opcional de aprobación (apagada por defecto), respondió que el cifrado completo de extremo a extremo suponía un cambio demasiado grande por ahora y cerró el issue. Dos debates comunitarios pidiendo cifrado E2E (`#21286`, `#37831`) siguen sin respuesta, y el 25 de noviembre `@theo` afirmó directamente que construir cifrado de extremo a extremo es imposible.

![Mantenedor reconociendo en el Issue #32098 que una cuenta cloud o clave de relay robada permite controlar equipos vinculados mientras deja fuera el cifrado E2E](../../evidence/15-connect-no-e2e.jpg)

Debido a que los túneles de Cloudflare alcanzaron un coste de **25.000 USD mensuales**, `@theo` abrió el **PR #32945** para migrar el tráfico a una pasarela en OVH alquilada por T3, donde el propio servidor Caddy de T3 termina el TLS y reenvía el tráfico en texto plano mediante un socket Unix hacia un proxy en Go —igualmente sin cifrado de extremo a extremo. Completada la migración, el tráfico en texto claro pasa directamente por la memoria de los servidores de T3. Entretanto, `privacy-policy.astro` menciona únicamente una vaga «transmisión cifrada» sin revelar la ausencia de E2E ni ofrecer garantía de no retención.

![PR #32945 de Theo señalando una factura mensual de 25.000 USD en Cloudflare y trasladando T3 Connect a una pasarela propia en OVH donde Caddy termina el TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)


## Más de 800.000 USD invertidos en un cliente gratuito: cuentas del negocio, conflictos y 77.000 estrellas

¿Por qué el fundador de negocios por suscripción invertiría más de 800.000 USD en un cliente MIT gratuito mientras rechaza cada PR que propone un simple botón para desactivar la telemetría? Cruzar sus publicaciones públicas, declaraciones de inversión, lista de patrocinadores y PR de GitHub aclara toda la contabilidad.

Sigamos primero el dinero y el radar de tokens ([Entrega 8](https://x.com/realchendahuang/status/2125392410763239723)). En 1.151 tuits publicados durante 17 días, `@theo` mencionó T3 Code 162 veces, mientras nombró exactamente **0 veces** a sus tres productos de pago anteriores: T3 Chat, UploadThing y `Ping.gg`. El 12 de noviembre confirmó haber invertido **más de 800.000 USD** en T3 Code.

A cambio, construyó un radar de cómputo en tiempo real desplegado sobre cientos de miles de equipos de desarrolladores. El 18 de noviembre publicó un panel interno que mostraba **31,7 billones de tokens** procesados en un solo día —equivalentes a **10,19 millones USD** en gasto de API—, citando más tarde un pico de **10,2 millones USD diarios**.

![Panel interno de analítica de T3 Code publicado por Theo mostrando 31,7 billones de tokens y 10,19 millones USD equivalentes diarios en API](../../evidence/17-theo-31t-tokens-10m-day.png)

Entre el 21 y el 22 de noviembre fue detallando cuotas de mercado concretas: un 99 % de uso respaldado por suscripciones, un **98,5 %** concentrado entre Codex, Claude y Antigravity, y una cuota de prueba de modelos de código abierto cayendo del 15 % al 6 %, con menos del 0,5 % de los prompts reales. Cuando un comentarista especuló con cifras de uso el 23 de noviembre, se burló de él por no tener acceso a su analítica.

Ese panel se tradujo de inmediato en poder de negociación. En su reseña de GPT-6.2 Astra del 18 de noviembre agradeció a OpenAI el acceso anticipado gratuito e ilimitado en tokens —consumiendo **más de 300.000 USD** en una sola batería de pruebas—. Google le facilitó acceso anticipado y contacto directo con personal de DeepMind. El 21 de noviembre, cuando su compañera `@maria_rcks` bromeó diciendo que T3 había sido adquirida, le pidió que parara porque varios inversores ya le estaban escribiendo para preguntar. El cliente MIT gratuito funciona como coste de adquisición para un radar sectorial de cuota de modelos, acceso privilegiado a laboratorios y palanca de valoración.


Veamos en segundo lugar su frontera entre inversor ángel y fundador competidor ([Entrega 6](https://x.com/realchendahuang/status/2125385742243520653)).

El 16 de noviembre, `@theo` reveló que había sido inversor y colaborador de Vibe Kanban. Después de que aquel equipo comprobara que la interfaz kanban no funcionaba y empezara a girar hacia un diseño similar al de T3 Code, no lograron lanzar lo bastante rápido y cerraron la empresa. Cerró su mensaje burlándose de aquella interfaz como una gran forma de quemar dinero y matar una startup.

![Theo revelando que invirtió y colaboró en Vibe Kanban antes de burlarse públicamente de su cierre](../../evidence/18-theo-vibe-kanban.png)

Dos días después, el 18 de noviembre, confirmó haber invertido en la empresa de sandboxes en la nube Daytona junto a varios competidores —solo nueve días después de haber publicado el 9 de noviembre que él mismo podría convertir los sandboxes en la nube en una función de pago dentro de T3 Code.


En tercer lugar están los vínculos con patrocinadores y la hipocresía respecto al abuso de cuotas ([Entrega 17](https://x.com/realchendahuang/status/2125411353393553744)).

En mayo de 2023, `@theo` publicó la lista de patrocinadores de su canal de YouTube: Vercel, Clerk, Upstash, Axiom y PlanetScale. Dentro de T3 Code, la autenticación en la nube corre sobre **Clerk**, y el registrador de terceros que almacena 2,2 millones de spans por hora con IP durante 30 días es **Axiom** —ambos de su propia lista de patrocinadores—. En abril de 2024, el CEO de Vercel, Guillermo Rauch, confirmó que Vercel pagaba únicamente a un creador de YouTube patrocinado (Theo); en septiembre de 2024 Theo reconoció que el contrato incluía cláusulas de exclusividad que prohibían promocionar competidores. También es inversor ángel en Cursor, Cline y otras herramientas de desarrollo con IA.

Respecto a los términos de servicio de los proveedores, predicaba cumplimiento mientras explotaba lagunas. El 19 de agosto de 2026, un ingeniero de OpenAI explicó que Codex permitía intencionadamente terminar un turno ya iniciado tras alcanzar el 0 % de cuota.

Dos días después, Theo presumió públicamente de haber ejecutado una tarea larga para exprimir al menos **800 USD en cómputo adicional** más allá del 0 %, mientras Maria, empleada de T3, publicaba una herramienta abierta llamada Endless para encadenar turnos de Codex por debajo de cero. Al estallar las críticas el 22 de agosto, Theo borró su publicación y Maria eliminó el repositorio —y luego escribió deseando que el equipo de Codex localizara y bloqueara las cuentas que la habían utilizado—. OpenAI endureció de inmediato el control para cortar en seco los turnos activos al llegar al 0 %, perjudicando a usuarios de pago corrientes (`openai/codex#45444`).

En octubre, Theo publicó un Gist en GitHub (actualmente con 452 estrellas) detallando cómo ejecutaba CLIProxyAPI en un ordenador doméstico para agrupar **7 cuentas de Claude y 3 cuentas de Codex** tras un único endpoint compartido entre más de 12 máquinas, acompañándolo de una captura con 12 credenciales y un **555 %** de cuota acumulada. Hoy la FAQ oficial de T3 Code sigue afirmando en un párrafo que no añadirá rotación multicuenta por riesgo de bloqueo —y justo en el párrafo siguiente enlaza directamente al Gist y vídeo de su proxy multicuenta, incluyendo un agregador de cuotas CLIProxyAPI integrado y un despreocupado «lo sentimos de antemano si te banean».

![Gist cliproxy-setup.md de Theo con 452 estrellas agrupando 7 cuentas de Claude y 3 de Codex en más de 12 ordenadores con un 555 % de cuota](../../evidence/19-cliproxy-gist-555pct.jpg)


En cuarto lugar, cómo T3 Code saltó por encima de las **77.000 estrellas en GitHub** con apenas **129 watchers** ([Entrega 18](https://x.com/realchendahuang/status/2125416210120765799)).

A finales de abril de 2026, Theo publicó un vídeo de 36 minutos titulado «Github has a fake star problem», escribiendo que las estrellas se habían convertido sobre todo en un método para engañar a los fondos de capital riesgo. A finales de octubre, tras ocho meses en línea, T3 Code rondaba las 30.000 estrellas y generaba dudas sobre su tracción.

El 30 de octubre, Theo redactó y autofusionó el **PR #27832**, inyectando una notificación emergente en la esquina superior derecha tras enviar 5 prompts —consultando antes en segundo plano la API local de GitHub para comprobar si la cuenta ya había dado estrella al repositorio—. El 2 de noviembre publicó un gráfico de historial de estrellas subiendo casi en vertical justo tras la línea `Star prompt`, afirmando que había multiplicado por **10** las estrellas diarias al instante; horas después compartió una captura de GitHub Trending destacando **+3.094 estrellas en un solo día**.

![Gráfico publicado por Theo el 2 de noviembre celebrando un salto casi vertical de 10x en estrellas diarias tras activar la invitación integrada](../../evidence/20-star-10x-cliff.png)

El 3 de noviembre, un usuario comentó que descartaba los avisos cuando estaba ocupado pero haría clic en momentos de espera. Poco más de una hora después, Theo redactó y autofusionó los **PR #29922** y **#29987**, reforzando el embudo por partida doble: esperando **30 segundos de inactividad de la ventana** mientras el usuario aguarda a los agentes y eliminando por completo la redirección al navegador para que al pulsar el botón el backend ejecute directamente `PUT user/starred/pingdotgg/t3code` usando las credenciales locales de GitHub del servidor anfitrión antes de lanzar confeti.

El bot revisor del propio repositorio, Macroscope, marcó el PR #29922 como `Needs Human Approval`, advirtiendo de que la acción de dar estrella se ejecutaba con las credenciales de GitHub del servidor y no necesariamente con las de la persona que pulsaba el botón. Theo lo autofusionó de todos modos.

El 6 de noviembre, el desarrollador `zhilsinger` registró un `Request changes` en el PR #29922 pidiendo devolver el proceso de estrella al navegador del usuario por dos fallos graves: en equipos anfitriones remotos o compartidos, el aviso nunca informa qué cuenta de GitHub se va a utilizar (y los propios comentarios del código reconocen que el token del host puede no pertenecer a quien hace clic); además, `packages/source-control-github/src/server/driver.ts` (líneas 60–99) no restringe `pingdotgg/t3code`, lo que permite a cualquier cliente con permiso `source-control:write` dar estrellas a repositorios arbitrarios usando las credenciales del servidor anfitrión.

![Revisión Request Changes del desarrollador zhilsinger en el PR #29922 advirtiendo sobre estrellas desde cuentas compartidas y repositorios arbitrarios mediante credenciales del servidor, sin respuesta durante 19 días](../../evidence/21-pr29922-zhilsinger-review.png)

Esa revisión permaneció 19 días intacta, sin respuesta ni corrección. Impulsado por avisos tras 5 prompts, detección de 30 segundos de inactividad y estrellas por API respaldadas por credenciales locales, T3 Code pasó de 30.000 a 77.000 estrellas en 25 días. El 24 de noviembre, Theo publicó una captura con 74.600 estrellas asegurando que ni se había enterado al cruzar las 70.000.


## Fusiones a ciegas, bots para copiar forks, marcas sin registrar y cortesía selectiva

Ampliar la mirada del código hacia el trato comunitario muestra que estos fallos técnicos y de gobernanza responden a un mismo patrón.

Obsérvese primero el contraste entre el ritmo interno y el trato a colaboradores externos ([Entrega 9](https://x.com/realchendahuang/status/2125392916369871309), [Entrega 2](https://x.com/realchendahuang/status/2125160473176023486), [Entrega 3](https://x.com/realchendahuang/status/2125201882687881378)).

`@theo` describió públicamente despachar **500 commits diarios** con **700 agentes** operando en paralelo mientras un mantenedor principal ejecutaba un bucle automático para procesar PR en lote. El 10 de noviembre advirtió a los usuarios que siguieran en nightly solo si aceptaban que sus `yolo merges` rompieran cosas de vez en cuando; ese mismo día, al hablar de seguridad de agentes, escribió que corría para grabar vídeos y que si un agente arrasaba su máquina le salía contenido gratis.

Los usuarios externos recibieron el trato opuesto. El 6 de agosto, como él no usaba el modo Plan, abrió el **PR #5551** enterrando el selector Build/Plan en un menú antiguo y adjuntó una gráfica de telemetría titulada `Reality check for those upset` («Baño de realidad para los molestos»). El 2 de septiembre, el **PR #9190** ocultó el anillo de progreso de la ventana de contexto (cosechando 16 votos negativos, récord del repositorio).

Cuando un usuario se quejó en el **Issue #33639** de que las notas de versión omitieran adónde se había movido el selector, `@theo` le mandó desinstalar el programa, le amenazó con bloquearlo, lo tildó de desagradecido y perezoso y declaró que la opinión de los usuarios no le importaba. Cuando el **PR #33131** eliminó por completo el modo Plan el 9 de noviembre, lo fusionó sin leer siquiera su propio resumen generado por IA —el cual sostenía que el borrado estaba aislado en un commit independiente para poder revertirlo si los datos de uso aconsejaban mantenerlo.

El archivo raíz `CONTRIBUTING.md` deja esa cultura por escrito: código abierto o no, pide a los posibles colaboradores que ni se molesten porque sus PR serán cerrados casi con toda seguridad. Su apartado Bans advierte que incomodar a un mantenedor —mencionando específicamente discutir el motivo de cierre de un issue— conlleva la denuncia pública en `.github/VOUCHED.td`, provocando el cierre automático instantáneo de todos sus futuros issues y PR. En todo el repositorio figuran 174 elementos etiquetados como `unwanted`, junto a vetos expresos contra PR redactados con determinados modelos.

![CONTRIBUTING.md desincentivando PR externos y detallando vetos con denuncia pública en .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

El 10 de noviembre afirmó que el 70 % de las peticiones de funciones se debían a fallos de los usuarios al redactar prompts. El 12 de noviembre, cuando un desarrollador se ofreció a enviar un PR, le respondió con una captura de `CONTRIBUTING.md` y lo reprendió por responderle sin seguirlo antes. Esa misma noche advirtió a los usuarios que protestaban en respuestas que ya había cedido con `/btw` y no dudaría en retirarlo. El 20 de noviembre sentenció que una captura con flechas dibujadas vale más que un PR.


En segundo plano aparece el doble rasero sobre copiar ideas y reprimir críticas ([Entrega 10](https://x.com/realchendahuang/status/2125393641665671593)).

El 8 de noviembre, la desarrolladora `@MiaAI_lab` mostró una función de su fork personalizado. Theo respondió `Okay I'm stealing this` («Vale, me quedo con esto») y 30 segundos después invocó a su `@bot` interno en las respuestas públicas para localizar su fork, evaluar la portabilidad y abrir un hilo con Opus 5.5 en beebox para incorporarlo a T3 Code. El 13 de noviembre, cuando un usuario elogió herramientas rivales, volvió a despachar a `@bot` en público para trocear cada característica elogiada en hilos separados listos para clonarse en T3 Code.

![Theo respondiendo «Okay I'm stealing this» y ordenando 30 segundos después a @bot extraer el fork de una desarrolladora hacia T3 Code](../../evidence/23-stealing-fork-bot.png)

Cuando la competencia lanzó diseños similares, su discurso dio un giro inmediato. El 24 de noviembre, al incorporar Claude Code Desktop pestañas laterales, citó el anuncio burlándose de lo rápido que copiaban. Frente a los críticos, el 11 de noviembre pidió a sus seguidores con acceso a Community Notes desmonetizar a quienes criticaran a su equipo, y el 24 de noviembre confirmó que su cuenta en X emplea un bot de bloqueo automático que había bloqueado alrededor de 100 cuentas ese mismo día.


Volver a la amenaza de marca registrada que desató la tormenta revela una asimetría igual de marcada ([Entrega 15](https://x.com/realchendahuang/status/2125408163273080950)).

Siguiendo la pista de `@vildanden_ai`, consultar la base de la USPTO arroja **0 registros** para `T3 Code`, `T3 Tools` o `T3 Connect`. La única solicitud presentada en su historia por T3 Tools Inc. correspondía a su antiguo nombre `PING LABS` (número de serie `97294243`, presentada en marzo de 2022), definitivamente denegada en febrero de 2025 y marcada como `ABANDONED` el 19 de mayo de 2025 en USPTO TSDR. Mientras tanto, la marca simple `T3` en las clases de software y SaaS 42 y 9 ya pertenece a terceros como EquipmentShare (Reg. `7795672`) y ESG Operations (Reg. `3324707`).

Según la política oficial de marcas de GitHub, **una empresa comercial que presente una solicitud de retirada por marca debe aportar obligatoriamente un número de registro federal o internacional y el organismo registrador bajo pena de perjurio; las excepciones sin registro se limitan exclusivamente a organismos gubernamentales y entidades sin ánimo de lucro.** En el instante mismo en que `@theo` amenazó con hacer banear en GitHub al autor del fork chino, ni siquiera cumplía los requisitos para rellenar el formulario de denuncia de GitHub.

Solo a las 12:21 PM del 24 de noviembre —17 horas después de proferir la amenaza— `@theo` fusionó el **PR #41898** añadiendo un `TRADEMARK.md` que reclama derechos «estén registrados o no». En sus propios tuits anteriores se había burlado de WordPress en septiembre de 2024 por iniciar una «disputa de marcas inaplicable» y en abril de 2025 opinaba que intentar registrar un término común con uso previo es «genuinamente descabellado».

![PR #41898 fusionado 17 horas después de la amenaza de bloqueo para añadir retroactivamente TRADEMARK.md reclamando derechos registrados o no](../../evidence/24-pr41898-trademark-aftermath.png)


El análisis de los **1.151 tuits públicos** de `@theo` entre el 7 y el 24 de noviembre refleja hasta qué punto su tono depende de la jerarquía de su interlocutor ([Entrega 14](https://x.com/realchendahuang/status/2125404517697290438)).

En **60 respuestas** a 20 ejecutivos de grandes tecnológicas, personal de laboratorios e influencers destacados (43 bajo filtro estricto por `@` inicial), los insultos personales y las palabrotas hacia ellos fueron del **0 %**, mientras los agradecimientos corteses rondaron un tercio. Tras criticar a Gemini 4 Carbon de Google el 12 de noviembre, matizó rápidamente elogiando el esfuerzo del equipo; una semana después, al lanzarse Neon, pidió disculpas en público y dos días más tarde celebró no haber quemado puentes. Tras publicar una extensa crítica a GPT-6.2 Astra de OpenAI el 18 de noviembre, a la mañana siguiente dedicó otro mensaje a elogiar a OpenAI.

En las **749 respuestas** restantes dirigidas a desarrolladores comunes y críticos (766 con filtro por `@` inicial), la hostilidad y las palabrotas saltaron al **8,0 %** —y escalaron al **14,4 %** en las 25 horas posteriores a la polémica con el fork chino.

La hostilidad nunca se limitó a los desarrolladores chinos. Cuando alguien preguntó simplemente si convenía usar T3 Code o Antigravity con Gemini 4, citó la pregunta ante sus 380.000 seguidores declarando que los ingenieros se merecen el desempleo masivo que se les viene encima.

![Theo citando una simple pregunta comparativa de herramientas para declarar que los ingenieros se merecen el desempleo masivo](../../evidence/25-engineers-unemployment.png)

En otras respuestas sostuvo que los desarrolladores promedio no son muy listos y que los nuevos usuarios son de baja calidad, juró bailar sobre las tumbas de la comunidad de IA local, ridiculizó a los usuarios de Linux como impostores («larpers»), llamó repetidamente `stupid bitch` a una crítica en tres mensajes sin arrepentimiento alguno (11–12 de noviembre) y amenazó con meter en la cárcel a un crítico en Threads mientras se burlaba de su diagnóstico de RSD (18 de noviembre).

En la tarde del 24 de noviembre calificó públicamente al Twitter tecnológico chino como el peor pozo negro en el que había puesto un pie e insultó como descerebrados a los desarrolladores que leían auditorías de código en chino —menos de 24 horas después de sermonear a otro usuario el 22 de noviembre diciéndole que quemar la confianza de todo tu entorno rara vez sirve para conseguir lo que quieres.

![Theo calificando al Twitter tech chino de pozo negro e insultando a los desarrolladores que leen auditorías de código chinas](../../evidence/26-cn-cesspit.png)


Retroceder dos años confirma que se trata de una pauta repetida ([Entrega 16](https://x.com/realchendahuang/status/2125408843152953693)).

En 2024, al hacer un fork del tema de VS Code de otro autor, tituló su repositorio `vsc-material-but-i-wont-sue-you` («pero no te voy a demandar»), burlando el temperamento del autor original en la descripción. Dos años después, cuando alguien hizo un fork de su proyecto bajo licencia MIT, recurrió a amenazas legales y de cierre en GitHub.

Dos años atrás, un vídeo suyo contra canales indios de tutoriales desató una ola de acoso contra desarrolladores de la India; tras la reacción en contra grabó un vídeo de disculpa (`I screwed up.`) condenando los ataques por nacionalidad —para volver a atacar al entorno tecnológico chino dos años después.

En octubre de 2025 chocó con la cuenta de FFmpeg, lanzó insultos en cámara y ofreció una **recompensa de 20.000 USD** para apartar a un mantenedor de FFmpeg. Después de que el proveedor VPN Windscribe contraofertara 21.000 USD si dejaba X durante un mes, el fundador de VLC condenara esas recompensas contra mantenedores y los desarrolladores de FFmpeg lo calificaran de acoso público en su lista de correo, eliminó el vídeo, borró los tuits y retiró la recompensa.

Por último, poco antes de las 4:00 AM del 25 de noviembre de 2026, amenazó con cerrar el código fuente de T3 Code esa misma noche porque los usuarios «no merecían el código abierto». Tras acumular más de 3.000 «me gusta», borró discretamente la amenaza antes del amanecer mientras el repositorio siguió público.


## Medidas inmediatas de mitigación y clientes alternativos

Si T3 Code sigue instalado en un equipo personal o de trabajo, conviene tomar dos medidas concretas de inmediato.

Si decides seguir ejecutando la versión local o de escritorio, no dependas únicamente de las variables de entorno. Define ambas banderas de exclusión en `~/.zshrc` y bloquea el servidor de ingestión de código cerrado en el sistema mediante `/etc/hosts`:

```bash
# 1. Añadir a ~/.zshrc y reiniciar la aplicación
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true

# 2. Bloquear la pasarela cerrada de ingestión en `/etc/hosts`
127.0.0.1 ingest.t3.codes
```

Si vas a desinstalar y migrar a otro cliente, revisa dos elementos pendientes: elimina los archivos residuales `statev2.sqlite` para que las conversaciones «borradas» dejen de ocupar decenas de gigabytes en disco, y desconecta tanto las sesiones de Google Antigravity gestionadas por T3 como los enlaces remotos sin cifrar de T3 Connect revisando los permisos en la nube vinculados.

Entre las alternativas citadas en las respuestas de la comunidad destacan **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`) y **Cloudroom** ([Hilo de alternativas](https://x.com/realchendahuang/status/2125244977878036713)). Sea cual sea la herramienta elegida, audita antes su telemetría predeterminada, su borrado local real y el manejo de tus credenciales.


## Fuentes primarias e índice de las 18 entregas originales

### Publicaciones iniciales e índice completo de las 18 entregas en X (orden cronológico)

- Publicación inicial 1 (enlace a GitHub en la portada etiquetado como «steal our code»): https://x.com/realchendahuang/status/2125059292919394654
- Publicación inicial 2 (disputa por el nombre del fork MIT, ataques «Temu» y doble rasero): https://x.com/realchendahuang/status/2125062675147448475
- Entrega 1 (telemetría por defecto, promesa rota «No telemetry», hashes sin sal entre herramientas): https://x.com/realchendahuang/status/2125153472450527440
- Entrega 2 (falso borrado en SQLite, escáner de procesos cada 5 s, retirada del modo Plan, vetos en `CONTRIBUTING.md`): https://x.com/realchendahuang/status/2125160473176023486
- Entrega 3 (`git push --force` silencioso en modo Auto, retirada en 21 h del filtro de privacidad, 0 avisos de seguridad, insultos a usuarios): https://x.com/realchendahuang/status/2125201882687881378
- Entrega 4 (suplantación de cabeceras de Google Antigravity, falso `SSH_CONNECTION`, bloqueo en 3 minutos de una cuenta nueva): https://x.com/realchendahuang/status/2125213397507858657
- Entrega 5 (falta de cifrado E2E en T3 Connect, túnel de Cloudflare y pasarela OVH autoalojada en texto plano): https://x.com/realchendahuang/status/2125218189596676555
- Entrega 6 (conflictos de interés como inversor ángel: burlas tras el cierre de Vibe Kanban y solapamiento con sandboxes de Daytona): https://x.com/realchendahuang/status/2125385742243520653
- Entrega 7 (afirmaciones sobre Managed Policy frente a tres puntos ciegos de la documentación oficial): https://x.com/realchendahuang/status/2125391659492081947
- Entrega 8 (balance de más de 800.000 USD en un cliente gratuito y radar de 31,7 billones de tokens / 10,19 millones USD diarios): https://x.com/realchendahuang/status/2125392410763239723
- Entrega 9 (500 commits diarios, 700 agentes y fusiones a ciegas frente al rechazo de PR externos y exigencia de seguir la cuenta): https://x.com/realchendahuang/status/2125392916369871309
- Entrega 10 (órdenes públicas a `@bot` para copiar forks y competidores, bot bloqueador automático y llamamiento a desmonetizar mediante Community Notes): https://x.com/realchendahuang/status/2125393641665671593
- Entrega 11 (aclaración del 25 de noviembre desmentida en menos de 2 horas por los PR nocturnos y 264 registros de Claude en el volcado de 100 MB): https://x.com/realchendahuang/status/2125394810559426993
- Entrega 12 (parches nocturnos post-RGPD que revelan 2,2 millones/h de registros IP, borrado incompleto de cuentas, fugas push y lotes mixtos): https://x.com/realchendahuang/status/2125395501663281198
- Entrega 13 (ataques al Twitter tech chino mientras se fusionaban en silencio parches para vistas previas sin sandbox y ejecución sin confirmación): https://x.com/realchendahuang/status/2125395980354994414
- Entrega 14 (análisis cuantitativo de 1.151 tuits: 0 % de insultos hacia directivos de grandes tecnológicas frente al 8 % de hostilidad hacia desarrolladores corrientes): https://x.com/realchendahuang/status/2125404517697290438
- Entrega 15 (cero registros en la USPTO para T3 Code y requisitos de la política de marcas de GitHub): https://x.com/realchendahuang/status/2125408163273080950
- Entrega 16 (historial recurrente: `vsc-material-but-i-wont-sue-you`, campaña contra desarrolladores indios, recompensa de 20.000 USD contra FFmpeg y amenaza borrada de cerrar el código): https://x.com/realchendahuang/status/2125408843152953693
- Entrega 17 (patrocinadores Clerk y Axiom, explotación del límite del 0 % en Codex y borrado posterior, Gist CLIProxyAPI de 10 cuentas): https://x.com/realchendahuang/status/2125411353393553744
- Entrega 18 (cómo se alcanzaron 77.000 estrellas en GitHub: aviso tras 30 s de inactividad disparando estrellas API con credenciales del servidor y problema sin corregir de repositorios arbitrarios): https://x.com/realchendahuang/status/2125416210120765799
- Lista de alternativas comunitarias: https://x.com/realchendahuang/status/2125244977878036713

### Código fuente, PR, Issues, políticas y pruebas primarias

**Telemetría, privacidad y parches nocturnos post-RGPD (Entregas 1, 7, 11 y 12)**

- Telemetría PostHog por defecto (PR #174): https://github.com/pingdotgg/t3code/pull/174
- Eliminación silenciosa del compromiso «No telemetry» en la portada (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Negativa a facilitar la exclusión (Issue #1397) y consulta sobre la promesa rota (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Copia en bruto a `ingest.t3.codes` (PR #15028) y hashes sin sal entre herramientas (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506
- Cuatro PR comunitarios rechazados para añadir ajuste de exclusión (#13458 / #16763 / #21248 / #27077): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- Archivos fuente de telemetría e identificación (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts
- Documentación oficial de telemetría y Managed Policy: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Afirmaciones de Theo sobre Managed Policy, su aclaración y la inexistencia de archivos de seguimiento: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924
- Filtración de rutas absolutas del espacio de trabajo (PR #42450) y exclusiones ignoradas en Win/Mac (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Registros de IP de 2,2 millones/h retenidos 30 días (PR #42380), eliminación incompleta de cuentas (PR #42285 / #42430), fugas push móviles (PR #42459 / #41859) y agrupación de opiniones supuestamente anónimas (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Seguridad local, parches silenciosos, Antigravity y T3 Connect (Entregas 2, 3, 4, 5 y 13)**

- Falso borrado en SQLite (Issue #17845 / #28903), monitor de procesos cada 5 s (Issue #11222) y captura de líneas de comandos (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Envío de nombres de host internos al servicio favicon de Google (PR #16950 / #32657), comprobación saliente forzada (Issue #36479), evasión de permisos y políticas (PR #21806 / #27322), consumo de cuota de Claude a 1,7x (Issue #7338 / #24649) y fallos de consumo eléctrico (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- `git push --force` silencioso en modo Claude Auto (Issue #15353) y PR correctivos de la comunidad (#15360 / #35207 / #40692): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Retirada en 21 horas del filtrado de modelos privados para `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/data/t3-usage.json
- Pestaña de Security Advisories vacía, `SECURITY.md` y parches silenciosos de seguridad (salto de rutas en secretos, vistas previas sin sandbox, ejecución de comandos sin confirmación): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504
- Garantía de la FAQ sobre Antigravity, refutación con el código fuente en Issue #40713, bloqueo en 3 minutos (Issue #41536), cruce entre cuentas (Issue #41973), suplantación de editor autorizado (PR #26876) y código fuente: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236
- Términos de servicio de Google Antigravity y prohibición en el foro oficial: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Rechazo del cifrado E2E en T3 Connect (Issue #32098), pasarela Caddy autoalojada en OVH (PR #32945), código del relay, política de privacidad y debates sin respuesta: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Balance económico, conflictos de inversores, patrocinadores y 77.000 estrellas (Entregas 6, 8, 17 y 18)**

- Gasto superior a 800.000 USD, panel diario de 31,7 T tokens / 10,19 M USD, cuota del 98,5 % en tres laboratorios, réplica sobre estadísticas y más de 300.000 USD en tokens gratuitos de acceso anticipado de OpenAI: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410
- Burla a Vibe Kanban, declaración de inversión en Daytona y plan de sandboxes en la nube de pago: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Lista de patrocinadores de YouTube, confirmación del CEO de Vercel, vídeo sobre exclusividad, mensaje de Maria tras borrar el repositorio, `openai/codex#45444`, Gist CLIProxyAPI y FAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Vídeo sobre «fake stars» y capital riesgo, salto vertical 10x de estrellas, tuit Trending de +3.094 estrellas, mensaje «se me pasaron los 70k», PR #29922 y código de estrellas arbitrarias en `driver.ts`: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Gobernanza, marcas, cortesía selectiva e incidentes previos (Entregas 9, 10, 14, 15 y 16)**

- Retirada del modo Plan (PR #5551 / #33131), ocultación del anillo de progreso (PR #9190), insultos en Issue #33639, `CONTRIBUTING.md` y `.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commits diarios, fusiones yolo, «nukes my machine = free content», filtro por seguimiento previo para PR, amenaza sobre `/btw` y mensajes «captura mejor que PR»: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Órdenes públicas a `@bot` para extraer forks, burlas a Claude Desktop, llamamiento a desmonetizar vía Community Notes y confirmación del bot bloqueador automático: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Registros USPTO TSDR (`PING LABS` 97294243 abandonada; EquipmentShare `T3` Reg. 7795672), política de marcas de GitHub, `PR #41898` retroactivo, amenaza de cierre y tuits anteriores sobre marcas: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Pruebas sobre cortesía selectiva (puentes con Google, desempleo de ingenieros, tumbas de la IA local, burlas a usuarios Linux como larpers, amenaza de cárcel y burla RSD, publicaciones con `stupid bitch`, Twitter tech chino calificado de pozo negro y sermón sobre quemar la confianza): https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2124449493513068862
- Archivo histórico (`vsc-material-but-i-wont-sue-you`, vídeo de disculpa ante desarrolladores indios y registro de la recompensa de 20.000 USD contra FFmpeg): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04
