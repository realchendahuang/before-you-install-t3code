# #18 · El embudo de 77.000 estrellas: starring con credenciales del host tras 30 s de inactividad y un bug de repos arbitrarios sin corregir

> Seis meses después de condenar las estrellas de GitHub como una forma "to trick VCs into investing", @theo hizo auto-merge de un toast en la app que se dispara tras 30 segundos de inactividad y que ejecuta `PUT user/starred/...` usando las credenciales de GitHub del host — catapultando el repositorio de 30k a 77k estrellas (con ~129 watchers) mientras dejaba sin corregir un bug que permite dar estrella a repositorios arbitrarios.

<!-- section:claim -->
## Qué se afirmó

- El 26 de abril de 2026, `@theo` publicó *"Github has a fake star problem"*, donde escribía que las estrellas de GitHub se habían convertido en *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- El 24 de noviembre, con 74,6k estrellas, afirmó que se había *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Qué muestra la evidencia

- **Acantilado de 10× en las estrellas diarias mediante un toast de inactividad en la app (`PR #27832`, `#29922`, `#29987`):** Después de tardar más de 8 meses en llegar a las 30.000 estrellas, `@theo` escribió y auto-mergeó [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) el 30 de octubre, añadiendo un toast de estrella tras 5 prompts enviados (`PROMPTS_BEFORE_ASKING = 5`), lo que de inmediato **multiplicó por 10** las estrellas diarias (`+3,094` estrellas/día en GitHub Trending). El 3 de noviembre, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) y [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) añadieron **detección de inactividad con una ventana de 30 segundos** (`IDLE_MS = 30_000`) mientras los usuarios esperan los turnos de la IA, y reemplazaron la redirección del navegador por un RPC del lado del servidor `sourceControl.star` que ejecuta `PUT user/starred/pingdotgg/t3code` directamente a través de las **credenciales del `gh` CLI / `GH_TOKEN` del servidor host**, seguido de un confeti de 160 partículas.
- **Revisión eludida y opacidad de la cuenta en hosts compartidos:** Macroscope marcó `PR #29922` como *Needs Human Approval* por el desajuste entre el usuario del navegador y las credenciales del servidor; `@theo` hizo auto-merge de todos modos. En hosts compartidos o remotos, hacer clic en *Star* da estrella al repositorio en silencio usando las credenciales de GitHub de quien sea dueño del servidor, sin decirle al usuario qué cuenta se utilizó.
- **Bug sin corregir de starring de repositorios arbitrarios (`driver.ts#L60-L99`):** El 6 de noviembre, el desarrollador `zhilsinger` presentó `Request changes` señalando que [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) acepta cualquier cadena `owner/repo` sin fijar `pingdotgg/t3code` — lo que permite a cualquier cliente con `source-control:write` dar estrella a repositorios arbitrarios de GitHub usando las credenciales del host.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Sigue abierto:** el starring de repositorios arbitrarios sin fijar en `driver.ts#L60-L99` y la revisión `Request changes` de `zhilsinger` del 6 de noviembre siguen sin respuesta y sin corregir 19 días después (77k+ estrellas frente a ~129 watchers).

<!-- section:visuals -->
## Evidencia visual

![El gráfico de Theo del 2 de noviembre celebrando un acantilado de estrellas de 10x casi vertical, justo después de publicar el prompt dentro de la app](../../evidence/20-star-10x-cliff.png)

![La revisión Request Changes del desarrollador zhilsinger en el PR #29922, sin respuesta durante 19 días](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 aceptando cadenas owner/repo arbitrarias sin fijar pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [acantilado de 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/día en Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Dosier técnico profundo 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
