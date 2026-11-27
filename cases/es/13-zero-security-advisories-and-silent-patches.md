# #13 · Cero avisos de seguridad de GitHub, parches silenciosos de alta gravedad y un `SECURITY.md` apresurado

> Mientras desestimaba en X a los auditores chinos de código fuente, T3 Code fusionó en silencio correcciones de vulnerabilidades de alta gravedad —incluidos path traversal en el almacén de secretos, filtraciones de tokens entre dominios y ejecución de comandos desde repositorios no confiables— mientras mantenía en 0 los avisos de seguridad publicados en GitHub.

<!-- section:claim -->
## Lo que se afirmó

- El 24 de noviembre, `@theo` desestimó en X las auditorías técnicas en chino afirmando que provenían de *"the biggest fucking cesspit"* e insultó a los desarrolladores que las leían ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Las revisiones apresuradas de `SECURITY.md` (`PR #38812`, `PR #41942`) enmarcaron el acceso amplio al host y el transporte sin cifrar como límites previstos aceptables.

<!-- section:evidence -->
## Lo que muestra la evidencia

- **Cero avisos de seguridad publicados (`0`):** A fecha de `ca81b7b9`, la página de [avisos de seguridad de GitHub](https://github.com/pingdotgg/t3code/security/advisories) de `pingdotgg/t3code` enumera **cero** avisos publicados, lo que deja a los usuarios actuales de escritorio/servidor sin alertas formales de CVE ni advertencias de actualización.
- **Vulnerabilidades de alta gravedad corregidas en silencio:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal en `ServerSecretStore` mediante `jti`/`nonce` del relay antes de la aprobación del dispositivo.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): filtraciones de tokens empresariales de GitHub/GitLab entre dominios.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) y [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): aislamiento de la vista previa del navegador de escritorio sin sandbox y confirmación de comandos del layout de worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): permisos de archivo del token de Clerk de escritorio restringidos al propietario.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): parche de ~3.000 líneas que por fin añade confirmaciones antes de ejecutar comandos desde configuraciones de repositorios no confiables (junto con correcciones silenciosas anteriores `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Defectos de seguridad locales abiertos:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal/symlinks externos) y [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (`externalLauncher.ts` de Windows ejecutando `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, marcado por AVG/Avast como `IDP.HELU.PSE96`) siguen sin fusionarse.
- **`SECURITY.md` reduce la responsabilidad en lugar de reforzar la arquitectura:** Declara explícitamente el `filesystem:read` en todo el SO fuera de los espacios de trabajo, el transporte HTTP sin cifrar en iOS/LAN y la toma de control total de la máquina anfitriona mediante una clave de firma de relay comprometida como *límites de diseño previstos*.

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Sigue abierto:** Los avisos de seguridad publicados en GitHub siguen en **0**; `Issue #26489` y `PR #30997` siguen sin corregirse; `SECURITY.md` continúa clasificando las lecturas en todo el SO y el HTTP sin cifrar como comportamiento previsto.

<!-- section:visuals -->
## Evidencia visual

![PR #39483 corrigiendo en silencio el path traversal de ServerSecretStore sin publicar un aviso de seguridad](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997, corrección abierta para lanzamientos de PowerShell con Base64 en Windows señalados por el antivirus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md clasificando las lecturas en todo el SO, el HTTP sin cifrar en iOS y la toma de control de la máquina mediante la clave del relay como límites previstos](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [Avisos de seguridad de GitHub (0 publicados)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Dossier técnico profundo 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
