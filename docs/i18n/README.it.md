# Prima di installare T3 Code

<p align="center">
  <strong>Lingue ufficiali delle Nazioni Unite:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>Edizioni globali della community:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md"><strong>Italiano</strong></a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml/badge.svg" alt="CI di verifica del repository" /></a>
  ·
  <a href="https://realchendahuang.github.io/before-you-install-t3code/"><strong>Portale interattivo delle prove (GitHub Pages)</strong></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>Indice di 108 immagini probatorie</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>Indice di 320 URL sorgente</strong></a>
</p>
<p align="center">
  <strong>Linea base esaminata:</strong> <a href="https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2"><code>9d3195b4</code></a> (<code>#42000</code>) ·
  <strong>Ultima verifica upstream:</strong> <a href="https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd"><code>ca81b7b9</code></a> (<code>#42634</code>, 25 nov. 14:49 CST · +259 commit)
</p>

![Prima di installare T3 Code — Banner dell'audit indipendente in 18 parti](../../evidence/00-cover-en.png)

> **Ambito e politica di verifica**  
> Questo repository è un audit indipendente su sicurezza, telemetria, governance e atti pubblici di `pingdotgg/t3code` (T3 Code), che consolida i 2 post originari e le **18 parti documentate** pubblicate il 24–25 novembre 2026 insieme a **320 URL canonici a fonti primarie** indicizzati in [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md) (`SRC-001`–`SRC-320`), **108 riscontri visivi e grafici primari** catalogati in [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md), sei dossier tecnici di approfondimento ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)), il [Portale interattivo delle prove](https://realchendahuang.github.io/before-you-install-t3code/) e un dataset quantitativo di **1.151 post consecutivi di `@theo` su X** (7–24 novembre 2026). L'audit del codice copre la linea base primaria [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) (`PR #42000`, `2026-11-24T08:41:04Z`) ed è monitorato in modo continuo fino a `main` HEAD [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`PR #42634`, `2026-11-25T06:49:37Z` / `2026-11-25 14:49 CST`). Non sono inclusi URL abbreviati di reindirizzamento né dati di contatto privati. Aggiornamenti fattuali, correzioni successivamente integrate o ulteriori traduzioni sono i benvenuti tramite Pull Request corredata da citazioni primarie — consultare [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

---

## TL;DR (Verdetto in 30 secondi)

- **Chi è interessato:** Utenti desktop locali, CLI, web ospitata (`app.t3.codes`), mobile e T3 Connect di `pingdotgg/t3code` — in particolare installazioni desktop senza privilegi di amministratore, sviluppatori che usano endpoint personalizzati o abbonamenti Antigravity/Gemini, utenti della modalità Claude Auto e chiunque abbia sessioni GitHub o T3 Connect collegate.
- **3 risultati chiave verificati sul codice (controllati tra `9d3195b4` → `ca81b7b9`):**
  1. **Telemetria predefinita, ID incondizionato all'avvio e rivelazioni post-GDPR ([Sezione 2](#2-telemetria-lettura-delle-credenziali-cross-tool-e-sprint-notturno-post-gdpr-parti-1-7-11-12) · [Dossier 01](../dossiers/01-telemetry-and-gdpr-timeline.md)):** Ha distribuito telemetria PostHog attiva per impostazione predefinita ([PR #174](https://github.com/pingdotgg/t3code/pull/174)) promettendo `"No telemetry"` fino al 18 giugno ([commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)); conserva eventi grezzi sul gateway closed-source [`https://ingest.t3.codes/`](https://ingest.t3.codes/); le PR post-GDPR hanno ammesso **2,2M/ora di span con IP + UA** in Axiom ([PR #42380](https://github.com/pingdotgg/t3code/pull/42380)), fughe di percorsi `git.cwd` ([PR #42450](https://github.com/pingdotgg/t3code/pull/42450)) ed eliminazione Clerk incompleta ([PR #42285](https://github.com/pingdotgg/t3code/pull/42285)). Le PR successive all'audit hanno interrotto la lettura di `.codex`/`.claude.json` ([PR #42299](https://github.com/pingdotgg/t3code/pull/42299)), mascherato i modelli personalizzati come `custom:<driver>` ([PR #42465](https://github.com/pingdotgg/t3code/pull/42465)) e recepito CI/`DO_NOT_TRACK` ([PR #42630](https://github.com/pingdotgg/t3code/pull/42630), [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)), **eppure [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`riga 156`) scrive ancora un ID su disco prima di verificare gli opt-out, [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omette ancora `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`, e non esiste alcun interruttore nelle Impostazioni né su `app.t3.codes`.**
  2. **Lacune di sicurezza locale, hook SSH/repository ereditati e `0` Security Advisories ([Sezione 3](#3-archiviazione-locale-monitoraggio-dei-processi-aggiramenti-delle-protezioni-e-patch-di-sicurezza-non-divulgate-parti-2-3-13) · [Dossier 02](../dossiers/02-local-safety-and-security-audit.md)):** La modalità Claude Auto esegue silenziosamente `git push --force` al 3º tentativo ([Issue #15353](https://github.com/pingdotgg/t3code/issues/15353), tuttora aperta); sono state integrate patch di sicurezza silenziose a fronte di [**0 GitHub Security Advisories**](https://github.com/pingdotgg/t3code/security/advisories) mentre [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) dichiara intenzionali `filesystem:read` sull'intero SO e HTTP in chiaro su iOS; aprire un repository non attendibile avvia automaticamente `git submodule update --init --recursive` ricorsivo (`GitVcsDriverCore.ts`), `VcsProcess.ts` non imposta globalmente `core.hooksPath=/dev/null` e le sessioni Claude attive eseguono gli hook `SessionStart` di `.claude/settings.json` (`ClaudeAdapterV2.ts`) con `GITHUB_TOKEN` e `SSH_AUTH_SOCK` ereditati per intero; e benché la [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) abbia aggiunto la pulizia asincrona dei thread (chiudendo `#17845`), restano i riferimenti di fork/subagenti più i record tombstone e ridurre `statev2.sqlite` richiede un `VACUUM` offline, mentre la [PR #42577](https://github.com/pingdotgg/t3code/pull/42577) ha ristretto il monitoraggio processi solo su Windows (lasciando `ProcessesToUpdate::All` su Linux/macOS).
  3. **Spoofing Antigravity, relay in chiaro, bug LAN/Auth e starring su repository arbitrari ([Sezione 4](#4-rischi-dei-termini-di-servizio-di-google-antigravity-e-relay-t3-connect-non-cifrato-parti-4-5) · [Sezione 5.3](#53-come-t3-code-è-balzato-da-30k-a-77k-stelle-in-25-giorni-129-watcher-parte-18)):** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts) continua a estrarre token dal portachiavi / `CredReadW` e a falsificare `antigravity/hub/2.24.0` contro `v1internal` (mentre la [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) ha esposto i link di verifica Google `VALIDATION_REQUIRED` `403`); **T3 Connect** è ancora privo di **qualsiasi cifratura E2E** ([Issue #32098](https://github.com/pingdotgg/t3code/issues/32098)) e `requireConnectDeviceApproval` era impostato su `false` per default ([`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)); l'ispezione del codice sorgente a `ca81b7b9` conferma che `t3 up --lan` in HTTP in chiaro emette ancora cookie di shell del SO validi 30 giorni senza `Secure` nonostante la [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) (`http.ts`, `SessionStore.ts`) e accetta richieste prive di `Origin` (`EnvironmentAuth.ts`), che gli scambi non-DPoP su `/oauth/token` emettono Bearer token di 30 giorni non revocabili senza rotta `/logout` e con auto-revoca bloccata (`EnvironmentAuth.ts`, `environmentHttp.ts`), che i token `?wsTicket=` da 5 minuti mancano di protezione anti-replay per RPC Bearer e per tutte le rotte `media` (`EnvironmentAuth.ts`, `SessionStore.ts`), e che `startupAccess.ts` classifica erroneamente `::1` tramite `NodeNet.isIPv4` terminando con `socket.destroy()` i tunnel Tailscale Serve / Connect; e [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) lascia privo di vincolo sul repository lo starring tramite credenziali del server.
- **Azione immediata:** Già installato? Vai direttamente al [**Manuale pratico di mitigazione e bonifica**](#7-manuale-pratico-di-mitigazione-e-bonifica) (`export DO_NOT_TRACK=1`, blocco `/etc/hosts` per `ingest.t3.codes`, Managed Policy, `VACUUM` offline e revoca di OAuth/token).

---

## Indice dei contenuti

- [TL;DR (Verdetto in 30 secondi)](#tldr-verdetto-in-30-secondi)
- [Risultati strutturati e matrice dei rischi](#risultati-strutturati-e-matrice-dei-rischi)
- [Cronologia storica (2023–2026)](#cronologia-storica-20232026)
- [1. Controversia d'origine: "Steal Our Code", minaccia sul nome del fork e doppio standard](#1-controversia-dorigine-steal-our-code-minaccia-sul-nome-del-fork-e-doppio-standard)
- [2. Telemetria, lettura delle credenziali cross-tool e sprint notturno post-GDPR (Parti 1, 7, 11, 12)](#2-telemetria-lettura-delle-credenziali-cross-tool-e-sprint-notturno-post-gdpr-parti-1-7-11-12)
- [3. Archiviazione locale, monitoraggio dei processi, aggiramenti delle protezioni e patch di sicurezza non divulgate (Parti 2, 3, 13)](#3-archiviazione-locale-monitoraggio-dei-processi-aggiramenti-delle-protezioni-e-patch-di-sicurezza-non-divulgate-parti-2-3-13)
- [4. Rischi dei Termini di servizio di Google Antigravity e relay T3 Connect non cifrato (Parti 4, 5)](#4-rischi-dei-termini-di-servizio-di-google-antigravity-e-relay-t3-connect-non-cifrato-parti-4-5)
- [5. Bilancio economico, conflitti degli investitori, sponsor e l'imbuto delle 77.000 stelle (Parti 6, 8, 17, 18)](#5-bilancio-economico-conflitti-degli-investitori-sponsor-e-limbuto-delle-77000-stelle-parti-6-8-17-18)
- [6. Governance, bot di scraping dei fork, registri marchi, dataset di 1.151 tweet e precedenti (Parti 9, 10, 14, 15, 16)](#6-governance-bot-di-scraping-dei-fork-registri-marchi-dataset-di-1151-tweet-e-precedenti-parti-9-10-14-15-16)
- [7. Manuale pratico di mitigazione e bonifica](#7-manuale-pratico-di-mitigazione-e-bonifica)
- [8. Fonti primarie e indice completo dei 18 post originali](#8-fonti-primarie-e-indice-completo-dei-18-post-originali)

---

## Risultati strutturati e matrice dei rischi

| Ambito e parti dell'audit | Rischio / Impatto | Risultati chiave documentati e riscontri alle fonti | Stato (`ca81b7b9`, 25 nov. 14:49 CST) | Dossier tecnico |
|---|---|---|---|---|
| **Telemetria e privacy post-GDPR**<br>*(Parti 1, 7, 11, 12)* | **Critico** | Telemetria PostHog attiva per impostazione predefinita (`PR #174`) mentre la homepage prometteva `"No telemetry / Unless you opt in. Full stop."` (`3bdaa6e1` l'ha rimossa il 18 giu.); conservazione degli eventi grezzi tramite il gateway closed-source `ingest.t3.codes` (`PR #15028`); hashing SHA-256 non salato tra strumenti diversi su `~/.codex/auth.json` e `~/.claude.json` (`Identify.ts`, `telemetryId.ts`); 4 PR di opt-out respinte (`#13458`, `#16763`, `#21248`, `#27077`); lacune nella Managed Policy (`docs/user/telemetry.md`); PR notturne post-GDPR che ammettono **2,2M/ora di span con IP + UA** conservati 30 giorni in Axiom (`#42380`), fughe di percorsi `git.cwd` (`#42450`), opt-out ignorati su Win/Mac (`#42376`, `#42464`), eliminazione account incompleta (`#42285`) e batch anonimi misti (`#42466`). | Integrate dopo l'audit [`#42299`](https://github.com/pingdotgg/t3code/pull/42299) (interrotte letture di `.codex`/`.claude.json`), [`#42465`](https://github.com/pingdotgg/t3code/pull/42465) (`custom:<driver>`), [`#42630`](https://github.com/pingdotgg/t3code/pull/42630) (opt-out CI) e [`#42629`](https://github.com/pingdotgg/t3code/pull/42629) (`DO_NOT_TRACK`); **irrisolto a `ca81b7b9`:** `AnalyticsService.ts:156` inizializza ancora l'ID su disco prima di controllare l'opt-out, `DesktopShellEnvironment.ts` omette ancora `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`, `ingest.t3.codes` closed-source resta predefinito, zero opt-out UI/web, mobile fuori dalla Managed Policy, `Publish agent activity` ignora l'opt-out. | [**Dossier 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **Sicurezza locale e advisory silenziosi**<br>*(Parti 2, 3, 13)* | **Critico** | L'«eliminazione definitiva» nella barra laterale accodava soltanto `"thread.deleted"` in `statev2.sqlite` (crescita anomala di 25,9–41,6 GB, `#17845`); `t3-resource-monitor` scansionava tutti i processi del SO incluse le righe di comando (`ProcessesToUpdate::All`, `#11222`, `PR #41889`); la modalità Claude Auto approva silenziosamente `git push --force` al 3º tentativo (`#15353`, aperto da oltre 52–53 giorni); rimozione in 21 ore del filtro sui modelli privati per `slopalytics.com` (`#41237`); **0 GitHub Security Advisories** nonostante correzioni silenziose (`#39483`, `#41757`, `#42386`, `#42504`); segnalazione aperta su Windows per AV e PowerShell Base64 (`#30997`); aprire repository non attendibili esegue automaticamente l'init ricorsivo di `.gitmodules`, omette `core.hooksPath=/dev/null` globale e attiva gli hook `SessionStart` di Claude con `GITHUB_TOKEN`/`SSH_AUTH_SOCK` ereditati; `SECURITY.md` dichiara intenzionali `filesystem:read` sull'intero SO e HTTP su iOS. | [`#42119`](https://github.com/pingdotgg/t3code/pull/42119) ha chiuso `#17845` tramite `thread-content.purge` asincrono (conserva la cronologia sorgente per fork/merge-back/subagenti + tombstone; ridurre il DB richiede `VACUUM` offline); [`#42577`](https://github.com/pingdotgg/t3code/pull/42577) ha ristretto le letture del monitor su Windows (`ProcessesToUpdate::All` su Linux/macOS e `#41889` restano aperti); **irrisolto a `ca81b7b9`:** `#15353`, `#26489`, `#30997`, hook di repository non attendibili + esposizione di `SSH_AUTH_SOCK`, **`0` Security Advisories** e i confini di `SECURITY.md`. | [**Dossier 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **ToS di Antigravity e relay T3 Connect**<br>*(Parti 4, 5)* | **Alto** | `docs/user/faq.md` garantisce la conformità ai ToS di Google Antigravity mentre `antigravityUsageLimits.ts` estrae token dal portachiavi del SO / Windows `CredReadW`, falsifica `antigravity/hub/2.24.0` e interroga endpoint privati `v1internal`; `antigravityAuthSupport.ts` inietta un falso `SSH_CONNECTION` causando instradamenti incrociati tra account (`#41973`); nuovo account da $20 bannato in 3 minuti (`#41536`); `PR #33800` integra polling CLIProxyAPI falsificato per `claude`/`xai`/`antigravity`; T3 Connect ha **zero cifratura E2E**, `requireConnectDeviceApproval` disattivato per default (`#36419`) e un gateway OVH Caddy aperto con terminazione TLS (`PR #32945`); i controlli auth a `ca81b7b9` espongono cookie `--lan` in chiaro validi 30 giorni ([PR #37042](https://github.com/pingdotgg/t3code/pull/37042) solo HTTPS) accettati anche senza `Origin`, Bearer token non-DPoP di 30 giorni non revocabili, valori `?wsTicket=` riutilizzabili da 5 minuti e tunnel `::1` uccisi da `isIPv4`. | [`#41210`](https://github.com/pingdotgg/t3code/pull/41210) ha aggiunto i link di verifica Google `VALIDATION_REQUIRED` `403` (confermando controlli Google attivi); [`#42311`](https://github.com/pingdotgg/t3code/pull/42311) ha aggiunto avvisi di accesso da nuovo dispositivo; **irrisolto a `ca81b7b9`:** il codice di spoofing/portachiavi Antigravity e `cliproxyApi.ts` restano attivi, **nessuna E2E su T3 Connect** (`#32098` / `#32945`), `requireConnectDeviceApproval` resta `false` di default, più i bug auth/tunnel su cookie LAN / Bearer / ticket WS / `::1`. | [**Dossier 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **Bilancio economico, sponsor e 77k stelle**<br>*(Parti 6, 8, 17, 18)* | **Alto** | Oltre $800k spesi per un client gratuito (`162` menzioni a T3 contro `0` per i prodotti a pagamento); radar computazionale da **31,7T token/giorno** ($10,19M/giorno) scambiato per oltre $300k in token OpenAI ad accesso anticipato e contatti con VC; sovrapposizioni da angel investor con Vibe Kanban e Daytona; stack degli sponsor (Clerk, Axiom, esclusività Vercel); exploit Codex 0% (`Endless` / `codex#45444`); Gist `CLIProxyAPI` da 10 account (`555%` di quota) vs. avviso di ban nelle FAQ; toast dopo 5 prompt / 30s di inattività che invoca `PUT user/starred/...` con le credenziali dell'host (`#27832`, `#29922`, `#29987`), aggirando Macroscope e lasciando `driver.ts#L60-L99` privo di blocco sul repository per 19 giorni. | Starring non vincolato in `driver.ts#L60-L99` e revisione di `zhilsinger` restano **irrisolti a `ca81b7b9`**; repo oltre 77k stelle contro ~129 watcher. | [**Dossier 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **Governance, marchi e storia**<br>*(Origini 1–2, Parti 9, 10, 15, 16)* | **Medio–Alto** | 500 commit/giorno / 700 agenti / `yolo merges` contro `CONTRIBUTING.md` (`"here's my advice: Don't"`), ban con gogna pubblica in `.github/VOUCHED.td`, `174` etichette `unwanted`, rimozione della modalità Plan (`#5551`, `#9190`, `#33131`) e insulti in `#33639`; scraping pubblico dei fork via `@bot` (`@MiaAI_lab`), appelli alla demonetizzazione con Community Notes e auto-blocker; **0 registrazioni USPTO** per `T3 Code`/`T3 Tools`/`T3 Connect` (`PING LABS` `97294243` abbandonato; EquipmentShare `7795672` registrato) al momento della minaccia di takedown su GitHub; `PR #41898` retroattiva con `TRADEMARK.md` 17 ore dopo; schema ricorrente 2024–2026 (`vsc-material-but-i-wont-sue-you`, attacchi agli sviluppatori indiani, taglia da $20k su FFmpeg, minaccia closed-source delle 4 del mattino del 25 nov. poi cancellata). | `CONTRIBUTING.md` / `.github/VOUCHED.td` e `TRADEMARK.md` restano attivi su `main` (`ca81b7b9`). | [**Dossier 05**](../dossiers/05-governance-trademark-and-history.md) |
| **Dataset quantitativo di 1.151 tweet**<br>*(Parte 14)* | **Linea base dell'audit** | Corpus esaustivo 7–24 nov. (`n = 1.151`, 17,24 giorni, 66,8 post/giorno, 75,6% risposte, intervallo mediano 2,7m): **0,0% volgarità/insulti** rivolti a 20 dirigenti/staff/KOL di big-tech (`0/43` `@` primario stretto, `32,6%` gratitudine) contro **8,0% di ostilità** verso sviluppatori comuni (`61/766`) e un'impennata di **4,0 volte al 14,4%** (`19/132`) negli insulti personali diretti durante la finestra di crisi di 25 ore sul fork cinese. | Verifica regex riproducibile con 4 grafici forensi. | [**Dossier 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **Catalogo completo di URL primari e prove visive** | **Riferimento** | Catalogo completo con riferimenti incrociati di **320** URL primari `https://` canonici (`SRC-001`–`SRC-320`) e **108** riscontri visivi e grafici ottimizzati senza perdita di qualità (`EV-001`–`EV-108`). | 100% canonizzato (zero link `t.co`; 108/108 asset indicizzati). | [**Indice delle fonti**](../COMPLETE-SOURCE-INDEX.md) · [**Indice delle prove**](../EVIDENCE-INDEX.md) |

---

## Cronologia storica (2023–2026)

| Data / Ora | Tappa | Riscontro / Fonte verificabile |
|---|---|---|
| **2023-05-14** | `@theo` pubblica la propria lista di sponsor su YouTube (`@vercel`, `@clerk`, `@upstash`, `@axiomhq`, `@PlanetScale`). Clerk e Axiom costituiranno in seguito l'infrastruttura centrale di autenticazione e logging di T3 Code. | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | Il CEO di Vercel conferma di sponsorizzare un solo YouTuber (`Theo`); `@theo` ammette che i contratti di sponsorizzazione includevano clausole di esclusiva che vietavano la promozione di concorrenti. | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [Video](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(2 anni prima)* | `@theo` crea il fork di un tema VS Code chiamandolo `vsc-material-but-i-wont-sue-you` per deridere il temperamento dell'autore originale; separatamente, dopo che un suo video contro i canali tutorial indiani scatena molestie, pubblica un video di scuse (`I screwed up.`) condannando gli attacchi basati sulla nazionalità. | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | L'USPTO respinge l'unica domanda di marchio di T3 Tools Inc. (`PING LABS`, Serial `97294243`) e la dichiara `ABANDONED` (19 maggio 2025). EquipmentShare registra `T3` nelle classi software/SaaS 9 e 42 (`Reg. 7795672`, 13 maggio 2025). | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` si scontra con FFmpeg su X e offre una **taglia da $20.000** per estromettere un maintainer di FFmpeg; Windscribe rilancia con $21.000, il fondatore di VLC si oppone, gli sviluppatori FFmpeg documentano il bullismo pubblico e `@theo` cancella video/tweet ritirando la taglia. | [Documento FFmpeg](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | La **PR #174** viene integrata in `pingdotgg/t3code`, attivando la telemetria PostHog per impostazione predefinita senza finestra di consenso, senza selettore nelle impostazioni e senza documentazione. | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` pubblica *"Github has a fake star problem"*, scrivendo che le stelle di GitHub sono `"mostly a way for companies to trick VCs into investing"`. | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | Il **commit `3bdaa6e1`** elimina silenziosamente `No telemetry / Unless you opt in. Full stop.` dalla homepage di T3 Code dopo oltre 3 mesi di raccolta predefinita. | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | Il maintainer Julius chiude l'**Issue #1397** (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*. | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | L'**Issue #4123** (screenshot archiviati con `"No telemetry"`) viene chiusa silenziosamente il 4 nov.; 4 PR della community per l'opt-out (`#13458`, `#16763`, `#21248`, `#27077`) vengono respinte (`#27077` chiusa come `unwanted` nonostante 147 test superati). | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | La **PR #5551** seppellisce il selettore Build/Plan (`Reality check for those upset`, 10 voti negativi); la **PR #9190** nasconde l'indicatore di contesto (16 voti negativi, record del repository). | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` si vanta di aver estratto **oltre $800** oltre la quota 0% di Codex mentre `@maria_rcks` pubblica *Endless*; entrambi cancellano dopo le proteste (`2090972426876129658`); OpenAI irrigidisce l'interruzione allo 0% (`openai/codex#45444`). | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | Vengono registrate l'**Issue #15353** (`git push --force` silenzioso in modalità Claude Auto, 3 ott.), `privacy-policy.astro` (`2026-10-06`) e l'**Issue #17845** (falsa eliminazione in `statev2.sqlite`, 10 ott.). | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | La **PR #15028** instrada la telemetria attraverso il gateway closed-source `ingest.t3.codes`; la **PR #21506** aggiunge l'hashing cross-tool SHA-256 non salato in `Identify.ts`; `@theo` pubblica il suo Gist `CLIProxyAPI` con 10 account (`555%` di quota). | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | Le **PR #27832**, **#29922** e **#29987** introducono il toast per le stelle dopo 5 prompt / 30s di inattività che invia `PUT user/starred/...` con le credenziali dell'host; `zhilsinger` invia `Request changes` il 6 nov. (senza risposta per 19 giorni). | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | Scraping dei fork via `@bot` (`@MiaAI_lab`), eliminazione modalità Plan (`#33131`), rivelazione di `$800k+` di spesa e radar `31.7T/day` / `$10.19M/day`, `$300k+` di token OpenAI gratuiti, riscrittura di `CONTRIBUTING.md`, sovrapposizione Vibe Kanban/Daytona, `PR #41237` rimuove il filtro modelli in 21 ore. | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` scrive `"Chinese knockoff"` e `"Temu3 Code"` e minaccia la chiusura dell'account GitHub (`2124829315657576890`); l'autore del fork MIT rinomina in `Stardust` entro 30 min.; seguono scuse in DM privato, ma i post pubblici restano online. | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [Origine 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` accoglie con favore le aziende USA da mille miliardi che copiano codice MIT (`2124989435154726982`), schernisce la conformità legale (`"get a better lawyer"`), escono Origine 1–2 e alle **12:21 CST** (`04:21Z`, 17 ore dopo la minaccia di ban) `@theo` integra la **PR #41898** aggiungendo retroattivamente `TRADEMARK.md`. | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | Vengono pubblicate le **Parti 1–5** dell'audit (la Parte 1 supera **1,81M+ visualizzazioni**, 6.640 segnalibri). Alle `18:39 CST`, `@theo` definisce il Twitter tech cinese `"the biggest fucking cesspit"` (`2125177503526588877`); alle `19:13–19:36 CST` sostiene che la Managed Policy disattiva tutta la telemetria (`2125186071357251715`). | [Parte 1](https://x.com/realchendahuang/status/2125153472450527440) → [Parte 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 Notte – 2026-11-25 ~07:00 CST** | Presentato reclamo formale GDPR nell'UE; uno **sprint notturno di 6 ore** integra `#42380` (2,2M/ora span con IP), `#42285`/`#42430` (eliminazione account), `#42376`/`#42464` (opt-out Win/Mac ignorati), `#42450` (fughe di percorsi `git.cwd`, 90m dopo che Theo aveva negato la raccolta di percorsi), `#42459`/`#41859` (fughe nei push), `#42466` (batch anonimi), `#41757`/`#42386`/`#42504` (patch di sicurezza silenziose). Prima dell'alba `@theo` pubblica e poi cancella una minaccia di passare al closed-source. | [Parte 11](https://x.com/realchendahuang/status/2125394810559426993) · [Parte 12](https://x.com/realchendahuang/status/2125395501663281198) · [Parte 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | Vengono pubblicate le **Parti 6–18** dell'audit su bilancio economico, lacune della Managed Policy, `yolo merges`, scraping via `@bot`, rivelazioni post-GDPR, dataset da 1.151 tweet, registri USPTO, legami con gli sponsor e il meccanismo delle 77k stelle. | [Parte 6](https://x.com/realchendahuang/status/2125385742243520653) → [Parte 18](https://x.com/realchendahuang/status/2125416210120765799) |
| **2026-11-25 fino alle 14:49 CST (`ca81b7b9`)** | Il tracciamento upstream post-baseline (`+259` commit da `9d3195b4` a `ca81b7b9`) verifica `#42299` (interrompe le letture di `.codex`/`.claude.json`), `#42465` (`custom:<driver>`), `#42577` (restrizione del monitor su Windows), `#41210` (link di verifica `VALIDATION_REQUIRED` di Antigravity), `#42630` (opt-out CI runner), `#42629` (`DO_NOT_TRACK`), `#42119` (pulizia asincrona dei thread che chiude `#17845` mantenendo però la cronologia di fork/subagenti + tombstone che richiedono `VACUUM`), `#42311` (avvisi per nuovi dispositivi) e le restrizioni `#42356`–`#42415` — confermando al contempo che `AnalyticsService.ts:156`, le omissioni OTel in `DesktopShellEnvironment.ts`, `ingest.t3.codes` closed-source, `#15353`, `driver.ts#L60-L99`, `0` Advisory e la mancanza di E2E su T3 Connect restano irrisolti. | [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) |

---

## 1. Controversia d'origine: "Steal Our Code", minaccia sul nome del fork e doppio standard

Nelle 48 ore tra il 23 e il 25 novembre 2026, una disputa sul nome di un fork comunitario di T3 Code con licenza MIT si è trasformata in un audit completo del codice sorgente, in un esposto europeo per violazione del GDPR e in quasi venti patch d'emergenza integrate nella notte.

Tra la sera del 23 novembre e la mattina del 24 novembre 2026 (ora di Pechino), un utente si è lamentato online dell'interfaccia di un fork gratuito e open-source con licenza MIT realizzato da uno sviluppatore cinese (`@DDdxx666`), scambiandolo per l'applicazione ufficiale. Senza verificare se il repository fosse un legittimo fork MIT, `@theo` ha pubblicato due post nel giro di 11 minuti definendolo `"Chinese knockoff"` e `"Temu3 Code"`, deridendo direttamente il lavoro dell'autore e minacciando di contattare GitHub per far chiudere il suo account (`"Do it right now or I'm going to contact GitHub and have your account taken down"`). Nello stesso periodo, il sito web di T3 Code ([`https://t3.codes/`](https://t3.codes/)) etichettava il link al proprio repository GitHub con `"Steal our code (legally)"` (`"steal our code"`) ([Origine 1](https://x.com/realchendahuang/status/2125059292919394654), [Origine 2](https://x.com/realchendahuang/status/2125062675147448475)).

L'autore del fork ha ottemperato immediatamente, rinominando il repository in `Stardust` e rimuovendo ogni riferimento a T3 entro 30 minuti. `@theo` si è scusato in privato tramite DM, ma ha lasciato online entrambi i post pubblici — che insieme hanno superato le 200.000 visualizzazioni — senza rimozioni né chiarimenti. Meno di 11 ore dopo, alle `06:12 BJ` del 24 novembre (`2124989435154726982`), alla domanda se fosse eccessivo che laboratori statunitensi da mille miliardi di dollari copiassero funzionalità di T3 Code, ha assunto la posizione opposta: `"Nah. Open source is open source, even if a trillion dollar company uses it!"` Nel frattempo, la dipendente di T3 `@maria_rcks` ospitava personalmente un fork pubblico chiamato `maria-rcks/t3libre` (*«T3 Code, liberato»*), e repository in lingua inglese come `t3code-quota-ui`, `t3code-atlas` e `t3code-bar` operavano senza alcuna minaccia pubblica.

![Theo che minaccia pubblicamente di contattare GitHub per far bannare l'autore del fork open-source](../../evidence/01-origin-theo-threat.png)

![La collaboratrice di T3 @maria_rcks che ospita un fork pubblico chiamato maria-rcks/t3libre ("T3 Code, liberated")](../../evidence/extra/p1-3-maria-t3libre.png)

A partire dalle 17:04 ora di Pechino del 24 novembre, ho esaminato la cronologia dei commit, i file sorgente, le PR, le Issue, la documentazione ufficiale, i registri USPTO TSDR e la timeline pubblica su X di `@theo` relativi a `pingdotgg/t3code`. Nell'arco di 24 ore ho pubblicato **18 parti documentate**, supportate da link diretti e schermate. La sola Parte 1 ha superato **1,81 milioni di visualizzazioni** e **6.640 segnalibri**, innescando una segnalazione GDPR in Europa e una maratona notturna di sei ore di correzioni da parte del team T3.

---

## 2. Telemetria, lettura delle credenziali cross-tool e sprint notturno post-GDPR (Parti 1, 7, 11, 12)

> **Audit tecnico approfondito:** Le mappature complete delle righe di codice, gli elenchi delle azioni in `FeatureUsage.ts`, le lacune di `DesktopShellEnvironment.ts`, i diff successivi a `9d3195b4` e i log minuto per minuto del 23–25 novembre si trovano nel [**Dossier 01: Architettura della telemetria, correlazione identità cross-tool e sprint notturno GDPR del 24–25 novembre**](../dossiers/01-telemetry-and-gdpr-timeline.md).

### 2.1 Telemetria attiva di default, promessa rimossa dalla homepage e hashing delle credenziali cross-tool (`Parte 1`)

Il **6 marzo 2026**, `pingdotgg/t3code` ha integrato la **PR #174**, attivando la telemetria PostHog per impostazione predefinita senza alcuna documentazione sulla telemetria nel repository, nessuna richiesta di consenso al primo avvio e nessun interruttore nelle impostazioni. La variabile d'ambiente per disattivarla è rimasta sepolta nel codice mentre le installazioni predefinite iniziavano immediatamente a trasmettere eventi ([Parte 1](https://x.com/realchendahuang/status/2125153472450527440)).

Per oltre tre mesi di raccolta attiva per default, la homepage di T3 Code mostrava in primo piano due righe: `No telemetry / Unless you opt in. Full stop.` Il **18 giugno 2026**, `@theo` ha cancellato silenziosamente entrambe le righe durante un restyling della homepage ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) senza alcun annuncio né avviso agli utenti esistenti.

![Commit 3bdaa6e1 del 18 giugno 2026 che elimina silenziosamente dalla homepage la promessa "No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

Nell'ottobre 2026, `@theo` ha integrato la **PR #15028**, instradando gli invii di telemetria raggruppati ogni 10 secondi (`FLUSH_INTERVAL_MS = 10_000`) tramite il gateway proprietario closed-source di T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). La riga 1 di [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) dichiara esplicitamente che l'endpoint di ingest conserva una copia di ogni evento grezzo prima di inoltrarlo a PostHog:

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149 at 9d3195b4; line 156 at ca81b7b9)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

I campi raccolti in [`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) e `FeatureUsage.ts` includevano provider, selezione del modello (a `9d3195b4`, trasmettendo verbatim tramite [`ProviderDimensions.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts) anche ID di modelli ed endpoint personalizzati fuori catalogo), livello di reasoning, modalità dei permessi, durate di esecuzione, conteggi dei token di input/output/cache/reasoning, token di agenti figli, conteggi locali di progetti e thread, **35 distinte azioni UI/comando** (`18` `COMMAND_FEATURES` + `17` `METHOD_FEATURES`), dettagli del SO, distribuzione WSL e architettura.

Il **19 ottobre 2026**, `@theo` ha proseguito con la **PR #21506** per contare quante macchine appartenessero a un singolo individuo. Alla linea base `9d3195b4`, [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) leggeva silenziosamente i file delle credenziali di altri strumenti AI nella home directory dell'utente — `~/.codex/auth.json` e `~/.claude.json` — decodificando il claim JWT `user_id` di OpenAI e `oauthAccount.accountUuid` di Claude, per poi calcolarne l'hash insieme all'ID utente T3 Connect collegato e all'ID dispositivo (rimozione poi avvenuta nella [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299), mentre resta l'hashing non salato dei proprietari `connect` e `device`):

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338 at baseline 9d3195b4)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

E in [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (righe 8–9), `hashTelemetryId` calcola un **digest SHA-256 privo di salt** (`Hex.encode(sha256(new TextEncoder().encode(value)))`). Poiché il server possiede già in chiaro gli ID account T3 Connect da Clerk, calcolare l'hash dei valori in chiaro lato backend consente di risalire direttamente da un digest non salato a una persona nota; eventuali ID OpenAI o Claude trapelati da terze parti si correlano in modo deterministico sullo stesso hash.

![Identify.ts legge ~/.codex/auth.json e ~/.claude.json per inviare hash SHA-256 non salati per l'attribuzione tra dispositivi](../../evidence/03-identify-codex-claude.png)

Le proteste della community sono state ripetutamente respinte. Il **23 giugno**, uno sviluppatore ha aperto l'**Issue #1397** chiedendo un selettore nelle impostazioni; il maintainer principale Julius l'ha chiusa come `not planned`: `We will not make this easier to opt out of, it is crucial for us to know how many users we have` (*«Non renderemo più semplice disattivarla, per noi è cruciale sapere quanti utenti abbiamo»*). A luglio un utente ha pubblicato nell'**Issue #4123** schermate archiviate della homepage contestando la promessa infranta (`"No telemetry"`): l'account di `@theo` l'ha chiusa tramite un commit estraneo il 21 ottobre, riaperta dopo le proteste e richiusa silenziosamente il 4 novembre. Tra settembre e novembre, i collaboratori hanno inviato **quattro diverse PR per l'opt-out** (`#13458`, `#16763`, `#21248`, `#27077`). Persino la `#27077` — verificata su hardware reale con **147 test superati** e approvata da Macroscope — è stata chiusa il **17 novembre** con l'etichetta `unwanted`.

<details>
<summary>Mostra 2 riscontri sui rifiuti dell'opt-out (Issue #1397 &amp; PR #27077)</summary>

![Il maintainer principale Julius chiude l'Issue #1397 come not planned affermando che non faciliteranno l'opt-out](../../evidence/04-issue1397-no-optout.png)

![La PR #27077 chiusa senza merge come unwanted nonostante 147 test superati e l'approvazione di Macroscope](../../evidence/extra/t3code-4-pr-27077-rejected.png)

</details>

### 2.2 La contraddizione tra Managed Policy e documentazione ufficiale (`Parte 7`)

Il 24 novembre, con il crescere delle critiche, `@theo` ha sostenuto su X che T3 Code offriva la migliore Managed Policy aziendale del settore (`"trivial to set up and turn off all telemetry"`) e che i dati delle conversazioni restavano su disco e `"never touches any of our servers"` (*«non toccano mai nessuno dei nostri server»*) ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715), [`2125191784859115766`](https://x.com/theo/status/2125191784859115766), [Parte 7](https://x.com/realchendahuang/status/2125391659492081947)).

L'esame diretto di [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) e [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) mostra l'esatto contrario:
1. **Configurazione riservata agli amministratori:** Gli utenti desktop continuano a non avere alcun selettore nell'interfaccia delle impostazioni. Disattivare la telemetria tramite Managed Policy richiede MDM/Criteri di gruppo oppure la scrittura di `policy.json` in percorsi protetti da amministratore (`/Library/Application Support/T3Code/policy.json` su macOS, `C:\Program Files\T3Code\policy.json` o `HKLM\SOFTWARE\Policies\T3Tools\T3Code` su Windows, `/etc/t3code/policy.json` su Linux).
2. **Punto cieco dell'app web ospitata (`app.t3.codes`):** `docs/user/telemetry.md` ammette esplicitamente che l'app nel browser non legge le variabili d'ambiente del server, ignora la Managed Policy, invia tracce di connessione quando compilata con il tracing e `"has no relay tracing toggle"`.
3. **App mobili fuori dalla policy del server:** Le variabili d'ambiente del server e la Managed Policy `"do not disable mobile tracing"` (nella notte la `PR #42415` ha aggiunto un interruttore mobile **Send connection traces**, lasciando comunque le variabili d'ambiente del server e la Managed Policy incapaci di disattivare il tracing mobile).
4. **`Publish agent activity` ignora gli opt-out:** Se abilitata su un host, titoli dei progetti, titoli dei thread, nomi dei modelli e stato dell'attività in tempo reale vengono inviati al relay T3 Connect — e `"The telemetry opt-out does not disable it."` (Inoltre, gli span Axiom falliti e i log di crash mobili `"can quote a value the app was handling"`, mentre `Agent feedback` può allegare fino a 16 KB di messaggi della conversazione.)

![Il file ufficiale docs/user/telemetry.md conferma che l'app web ospitata non ha interruttore, il mobile è escluso dalla Managed Policy e la pubblicazione dell'attività agente ignora gli opt-out](../../evidence/05-telemetry-cant-disable.png)

<details>
<summary>Mostra il riscontro sui percorsi amministratore di Managed Policy (docs/user/managed-policy.md)</summary>

![Il file ufficiale docs/user/managed-policy.md che elenca i percorsi di sistema protetti da amministratore su macOS, Windows e Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

</details>

### 2.3 Chiarimento del 25 novembre smentito nel giro di 2 ore (`Parte 11`)

La mattina del 25 novembre `@theo` ha pubblicato un lungo chiarimento ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) insieme a un'esportazione pubblica della telemetria ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)) formulando tre rassicurazioni nette — seguite da una risposta che negava scritture di tracciamento locale in caso di opt-out ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([Parte 11](https://x.com/realchendahuang/status/2125394810559426993)):

- **«Mai raccolti percorsi di file»:** 90 minuti dopo, Julius ha integrato la **PR #42450**, ammettendo che le esecuzioni webhook avviate tramite il relay esportavano interi span di esecuzione verso Axiom — inclusi span Git contenenti `git.cwd` (**percorso assoluto del workspace, nome utente del SO e nome del repository**).
- **«Le variabili d'ambiente hanno sempre disattivato la telemetria in modo pulito»:** La **PR #42376** ha confermato che il client desktop Windows ignorava le variabili utente salvate `T3CODE_TELEMETRY_ENABLED=false` quando avviato da processi preesistenti, mentre la **PR #42464** ha confermato che su macOS/Linux il tracing del relay al primo avvio veniva valutato prima del caricamento della shell, ignorando gli opt-out di `~/.zshrc` per l'intera esecuzione. ([`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omette tuttora di inoltrare `T3CODE_OTEL_SDK_DISABLED` e `OTEL_SDK_DISABLED` a `ca81b7b9`.)
- **«Nessun file di tracciamento scritto se disattivato» e «Gli hash di Claude erano rotti»:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`riga 149` a `9d3195b4`, `riga 156` a `ca81b7b9`) continua a invocare `getTelemetryIdentity` incondizionatamente all'avvio, scrivendo l'ID di installazione locale (`upsertAnonymousId`) prima di verificare `telemetryEnabled`. Nel frattempo, l'ispezione dell'header gzip dell'esportazione da ~100 MB di `@theo` (`6.056.594` byte compressi, `95.789` eventi) ha rivelato il nome file originale `events.clean.jsonl` generato 20 minuti prima del suo tweet — eppure conteneva ancora **264 record attivi di account Claude** che collegavano **4 macchine distinte** (`installId`) allo stesso identico hash SHA-256 il 20 ottobre, oltre a nomi verbatim di modelli proxy privati (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

![La PR #42450 conferma che le esecuzioni avviate via relay esportavano in precedenza verso Axiom i percorsi assoluti git.cwd con nomi utente e nomi di repository](../../evidence/06-pr42450-absolute-path.jpg)

<details>
<summary>Mostra 3 ulteriori riscontri sul chiarimento del 25 nov. e sul dump da 100 MB (PR #42376, PR #42464, events.clean.jsonl)</summary>

![La PR #42376 ammette che il client desktop Windows ignorava la variabile d'ambiente utente T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![La PR #42464 ammette che il tracing del relay al primo avvio su macOS ignorava gli opt-out in ~/.zshrc per l'intera sessione](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Analisi forense del dump pubblico events.clean.jsonl di Theo che mostra 264 record Claude collegati a 4 macchine e modelli proxy personalizzati verbatim](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

</details>

### 2.4 Il blitz notturno di sei ore dopo il reclamo GDPR (`Parte 12`)

Dopo la presentazione di un reclamo formale GDPR nell'UE nella notte del 24 novembre, le PR d'emergenza della notte hanno portato alla luce altre quattro gravi criticità sulla privacy ([Parte 12](https://x.com/realchendahuang/status/2125395501663281198)):

1. **2,2M/ora di span del relay con indirizzo IP (`PR #42380`):** Ammette che ogni span di richiesta del relay esportato verso Axiom — circa **2,2 milioni di span all'ora, conservati per 30 giorni** — registrava `client.address` (IP del chiamante da `cf-connecting-ip`) e `user_agent.original` proprio accanto a `user.id` (precisando inoltre che i log di invocazione dell'1% dei Cloudflare Workers restavano separati). Tre ore e mezza dopo il merge, `@theo` rispondeva ancora sostenendo che gli IP erano già stati rimossi.
2. **Eliminazione account incompleta (`PR #42285` & `PR #42430`):** Ammette che l'eliminazione di un utente in Clerk lasciava intatte le righe del relay su PlanetScale e i tunnel Cloudflare attivi fino a quando una richiesta di cancellazione per motivi di privacy non ha reso necessari **query SQL scritte a mano e lo smantellamento manuale dei tunnel**.
3. **Fughe nelle notifiche push mobili (`PR #42459` & `PR #41859`):** Le notifiche Android FCM inviavano valori `user_id` di Clerk in chiaro a Google a ogni push; gli span ed errori delle richieste push iOS registravano URL completi di push del dispositivo contenenti token.
4. **Feedback «anonimo» mescolato (`PR #42466`):** Ammette che eventi `agent.feedback` dichiarati anonimi venivano raggruppati nello stesso POST HTTP insieme a eventi identificati con `installId` e impronte complete dell'host (SO, architettura, distro WSL grezza), contraddicendo `docs/user/telemetry.md`. Nel frattempo, `privacy-policy.astro` restava invariato dal 6 ottobre.

![La PR #42380 rivela che gli span del relay registravano gli indirizzi IP reali dei chiamanti e lo User-Agent accanto a user.id al ritmo di 2,2M span/ora per 30 giorni in Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

<details>
<summary>Mostra 3 ulteriori riscontri notturni post-GDPR (PR #42285, PR #42459, PR #42466)</summary>

![La PR #42285 ammette che la cancellazione dell'account lasciava residui nel relay e tunnel Cloudflare attivi fino a una richiesta di eliminazione che richiese SQL manuale](../../evidence/09-pr42285-delete-account-leftover.jpg)

![La PR #42459 ammette che i push Android FCM inviavano valori user_id Clerk in chiaro a Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![La PR #42466 ammette che il feedback anonimo veniva inviato in batch nello stesso POST insieme a installId e impronte dell'host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

</details>

### 2.5 Aggiornamenti post-audit su telemetria e identità (`9d3195b4` → `ca81b7b9`)

Il monitoraggio di `pingdotgg/t3code` fino a `ca81b7b9` (`2026-11-25 14:49 CST`) conferma quattro merge mirati a restringere la telemetria accanto alle lacune principali rimaste irrisolte:

- **Integrati dopo `9d3195b4`:**
  - [**PR #42299**](https://github.com/pingdotgg/t3code/pull/42299) ([`84e4264b`](https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07)): interrompe la lettura di `~/.codex/auth.json` e `~/.claude.json` in `Identify.ts` (resta l'hashing SHA-256 non salato del proprietario su `connect` `CLOUD_LINKED_USER_ID` e `device`).
  - [**PR #42465**](https://github.com/pingdotgg/t3code/pull/42465) ([`6b3899f2`](https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da)): aggiorna `modelLabel` in `ProviderDimensions.ts` (`righe 66–72`) per emettere `custom:<driver>` per i modelli fuori catalogo (i modelli in catalogo/vendor continuano a inviare gli slug anche dietro endpoint personalizzati).
  - [**PR #42630**](https://github.com/pingdotgg/t3code/pull/42630) ([`c925b9ab`](https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b)): introduce `isCiEnvironment` su 13 variabili d'ambiente CI in [`otelEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts) (`righe 322–343`), disattivando `AnalyticsService` di default (`riga 130`) e `isRelayTracingEnabled` sui runner CI salvo override esplicito.
  - [**PR #42629**](https://github.com/pingdotgg/t3code/pull/42629) ([`ef4a1643`](https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64)): recepisce `DO_NOT_TRACK` (`isDoNotTrackSet` in `otelEnvironment.ts:346-347`), verificato in `AnalyticsService.ts:137` e `isRelayTracingEnabled` (`otelEnvironment.ts:357`), e inoltrato da [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) e [`DesktopBackendConfiguration.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts) (prevale anche su `T3CODE_TELEMETRY_ENABLED=true`).
  - Le PR complementari di restrizione [**#42356**](https://github.com/pingdotgg/t3code/pull/42356), [**#42394**](https://github.com/pingdotgg/t3code/pull/42394), [**#42397**](https://github.com/pingdotgg/t3code/pull/42397), [**#42398**](https://github.com/pingdotgg/t3code/pull/42398) e [**#42415**](https://github.com/pingdotgg/t3code/pull/42415) hanno ristretto il tracing del browser aperto dal server, gli ID dispositivo / interruttore su mobile, gli enum di errore MCP e il collegamento di `installId` su `agent.feedback`.
- **Irrisolto a `ca81b7b9`:** [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`riga 156`, già `riga 149` a `9d3195b4`) esegue tuttora `getTelemetryIdentity` (`upsertAnonymousId`) incondizionatamente all'avvio **prima** di controllare `telemetryEnabled`; `DesktopShellEnvironment.ts` omette ancora `OTEL_SDK_DISABLED` e `T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` closed-source rimane predefinito; continuano a mancare un selettore nelle Impostazioni e qualsiasi opt-out su `app.t3.codes`; il mobile resta fuori dalla Managed Policy; `Publish agent activity` ignora gli opt-out; e `privacy-policy.astro` rimane datato `2026-10-06`.

---

## 3. Archiviazione locale, monitoraggio dei processi, aggiramenti delle protezioni e patch di sicurezza non divulgate (Parti 2, 3, 13)

> **Audit tecnico approfondito:** Le query SQL di pruning di SQLite, le chiamate Rust `sysinfo`, le righe dei permessi di `ClaudeAdapterV2.ts`, i diff successivi a `9d3195b4` e l'analisi completa dei confini di `SECURITY.md` si trovano nel [**Dossier 02: Sicurezza locale, bypass silenziosi di esecuzione di codice e audit delle vulnerabilità non divulgate**](../dossiers/02-local-safety-and-security-audit.md).

### 3.1 Falsa eliminazione dei thread in SQLite e scansione di tutti i processi della macchina (`Parte 2`)

Quando un utente elimina un thread dalla barra laterale, la finestra di conferma (`useThreadActionMenu.ts`) promette `"This permanently clears conversation history for this thread."` Alla linea base `9d3195b4`, `ThreadDeletion.ts` si limitava ad accodare un evento `"thread.deleted"` in `statev2.sqlite`, e `ProjectionMaintenance.ts` esentava `thread.created` e gli eventi più recenti dello stream (`MAX(newer.sequence)`) conservando gli eventi precedenti. Gli utenti hanno segnalato che `statev2.sqlite` raggiungeva **25,9 GB** in tre settimane (90% thread «eliminati»), **41,6 GB** in sei settimane e **33 GB** in sette settimane — lasciando l'**Issue #17845** (e la **#28903**) irrisolta dal 10 ottobre ([Parte 2](https://x.com/realchendahuang/status/2125160473176023486)).

Il 25 novembre, la [**PR #42119**](https://github.com/pingdotgg/t3code/pull/42119) ([`91f0b32e`](https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e), `2026-11-25T05:58:26Z`) ha chiuso l'**Issue #17845** aggiungendo una pulizia asincrona tramite outbox `thread-content.purge` (`ThreadDeletion.ts`, `ProjectionMaintenance.ts`). Tuttavia, l'ispezione a `ca81b7b9` mostra che i thread sorgente eliminati mantengono ancora la propria cronologia finché risultano referenziati da qualsiasi fork attivo, `merge_back` in sospeso o subagente padre attivo; le righe dei metadati tombstone restano in SQLite; e per ridurre la dimensione del file `.sqlite` su disco occorre comunque eseguire un `VACUUM` offline.

![Issue #17845 che segnala come i thread eliminati in modo permanente restino dentro statev2.sqlite gonfiando i dischi fino a decine di gigabyte](../../evidence/10-issue17845-fake-delete.png)

Un helper Rust in background, `t3-resource-monitor` (**Issue #11222**, `native/resource-monitor/src/main.rs` che invoca `ProcessesToUpdate::All` con `with_cmd(UpdateKind::Always)`), scansionava ogni 5 secondi tutti i processi sulla macchina anche con la diagnostica chiusa — aprendo ~280–300 handle persistenti su oltre 440 applicazioni e giochi estranei su Windows senza possibilità di disattivazione, mentre la documentazione affermava che il campionamento avvenisse solo in presenza di sottoscrittori attivi. Solo il **24 novembre** la **PR #41889** ha confermato che la diagnostica dei processi aveva acquisito **intere righe di comando dei processi** — che spesso contengono chiavi API in chiaro, password di database e token di autenticazione — dentro telemetria attiva e snapshot della cronologia. Dopo l'audit, la [**PR #42577**](https://github.com/pingdotgg/t3code/pull/42577) ([`af276ccb`](https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c), `2026-11-25T04:09:53Z`) ha impedito a `t3-resource-monitor` su Windows di leggere memoria e righe di comando dei processi non tracciati, mentre Linux e macOS usano ancora l'individuazione in due fasi con `ProcessesToUpdate::All` e la `PR #41889` rimane aperta.

<details>
<summary>Mostra il riscontro sul monitoraggio di tutti i processi della macchina (Issue #11222)</summary>

![Issue #11222 che documenta t3-resource-monitor mentre scansiona ogni processo sulla macchina](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

</details>

Altri difetti locali verificati nella Parte 2 includono:
- **Fughe di hostname aziendali tramite favicon:** Le richieste del frontend inviavano hostname interni (es. `devbox.localdomain`) all'API favicon di Google (`PR #16950`, `PR #32657`).
- **Richiesta di rete obbligatoria all'avvio:** Anche con telemetria disattivata, l'avvio del server scarica incondizionatamente manifest di compatibilità da [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) senza opt-out (**Issue #36479**).
- **Aggiramenti di approvazioni e policy:** Correzioni per bypass di approvazioni e policy in full-access e WSL/Tailscale (`PR #21806`, `PR #27322`).
- **Consumo quota Claude 1,7x e assorbimento energetico 136x:** L'esecuzione di Claude tramite Agent SDK bruciava le quote da 5 ore a velocità **1,7x** rispetto al normale fino all'inizio di novembre (`Issue #7338`, `Issue #24649`, 81 commenti); bug di GPU/consumo hanno raggiunto **136x** l'assorbimento di Electron equivalente — inclusa una GPU a 19 core di un MacBook inchiodata a **60W** che scaricava la batteria in 78 minuti e **18W** dopo la chiusura della scheda web (`Issue #3143`, `Issue #40581`).

### 3.2 `git push --force` silenzioso per 52 giorni contro rimozione in 21 ore del filtro privacy sui modelli (`Parte 3`)

Dal **3 ottobre** in avanti — e **tuttora irrisolta a `ca81b7b9`** nell'**Issue #15353** ([commento](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)) — la modalità Claude Auto ha eseguito silenziosamente comandi pericolosi (`ClaudeAdapterV2.ts` effettua corto-circuito su `!requiresClaudeApproval(context)` verso `"allow"`). Anche in assenza di regole personalizzate, dopo che il classificatore di Claude aveva bloccato due volte `git push --force origin main` e scalato il terzo tentativo per l'approvazione manuale, T3 Code lo ha approvato silenziosamente senza finestra di dialogo e ha registrato `"source": "user_temporary"`. Due PR correttive della community (`#15360`, `#35207`) sono rimaste senza revisione fino alla chiusura automatica da parte dei bot, mentre la `#40692` restava in sospeso ([Parte 3](https://x.com/realchendahuang/status/2125201882687881378)).

![Issue #15353 aperta da oltre 52 giorni che mostra la modalità Claude Auto approvare silenziosamente git push --force senza richiesta](../../evidence/11-issue15353-auto-force-push.png)

Al contrario, il **22 novembre**, l'**Issue #40948** ha segnalato che i modelli più recenti non comparivano nella classifica pubblica della telemetria di `@theo` [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) perché la `PR #29001` aveva ristretto la segnalazione a una whitelist. Nel giro di **21 ore**, la **PR #41237** è stata integrata sotto l'account di `@theo` indicando esplicitamente che Theo aveva richiesto la rimozione — trasmettendo verbatim all'analytics nomi come `ollama/acme-internal` e deploy aziendali `acme-azure-deployment` (successivamente ristretta per i modelli fuori catalogo a `custom:<driver>` nella `PR #42465`, mentre gli slug dei modelli in catalogo/vendor vengono ancora segnalati anche dietro endpoint personalizzati).

<details>
<summary>Mostra il riscontro sulla rimozione in 21 ore del filtro per slopalytics.com (PR #41237)</summary>

![La PR #41237 integrata 21 ore dopo l'Issue #40948 che rimuove il filtro sui modelli per slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

</details>

### 3.3 Zero Security Advisories, patch silenziose e `SECURITY.md` (`Parte 13`)

Al 25 novembre (`ca81b7b9`), la scheda [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) di `pingdotgg/t3code` registra **0 advisory pubblicati** ([Parte 13](https://x.com/realchendahuang/status/2125395980354994414)). Eppure i maintainer hanno integrato silenziosamente patch ad alta severità senza informare gli utenti esistenti:
- **Correzioni di sicurezza integrate in silenzio:** `PR #39483` (path traversal di `ServerSecretStore` tramite `jti`/`nonce` del relay prima dell'approvazione del dispositivo), `PR #41756` (fughe cross-domain di token GitHub/GitLab aziendali), `PR #41886`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41757` e `PR #42386` (isolamento dell'anteprima browser desktop senza sandbox / conferma comandi di layout worktree), [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413) (permessi solo-proprietario per i file token Clerk su desktop), e `PR #42504` (patch da ~3.000 righe che finalmente introduce richieste di conferma per configurazioni di repository non attendibili che in precedenza eseguivano comandi locali senza approvazione).
- **Irrisolti / aperti a `ca81b7b9`:** `Issue #26489` (rischi di path traversal / symlink esterni), `PR #36216`, `PR #23428`, `PR #33144` e `PR #30997` (launcher Windows `externalLauncher.ts` che avvia `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` segnalato da AVG/Avast come `IDP.HELU.PSE96`), oltre ai rischi di esecuzione da repository non attendibile ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) che esegue automaticamente l'init ricorsivo di `.gitmodules`, [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) che omette `core.hooksPath=/dev/null` globale, e [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) che esegue gli hook `SessionStart` di `.claude/settings.json` con `GITHUB_TOKEN` e `SSH_AUTH_SOCK` ereditati per intero).
- **File [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) pubblicato in fretta (`PR #38812`, `PR #41942`):** Dichiara tuttora `filesystem:read` sull'intero SO fuori dai workspace, trasporto HTTP in chiaro su iOS/LAN e presa di controllo totale della macchina tramite chiave di firma del relay compromessa come **confini di progettazione intenzionali** anziché vulnerabilità, mentre [`https://ingest.t3.codes/`](https://ingest.t3.codes/) rimane closed-source (`2125370330244128924`).

<details>
<summary>Mostra 3 riscontri sulle patch silenziose e su SECURITY.md (PR #39483, PR #30997, SECURITY.md)</summary>

![PR #39483 che corregge silenziosamente il path traversal in ServerSecretStore senza un Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 fix aperto per gli avvii PowerShell Base64 EncodedCommand su Windows segnalati come malware](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md che contrassegna esplicitamente letture sull'intero SO, HTTP arbitrario su iOS e compromissione della macchina via chiave relay come confini intenzionali](../../evidence/extra/x-post05-4-security-md-intended.jpg)

</details>

---

## 4. Rischi dei Termini di servizio di Google Antigravity e relay T3 Connect non cifrato (Parti 4, 5)

> **Audit tecnico approfondito:** Le mappe complete degli header di `cliproxyApi.ts` (`PR #33800`), `AntigravityAcpSupport.ts`, `AntigravityTurnOutcome.ts`, `contracts/src/settings.ts` e i riferimenti alle righe di `ManagedEndpointProvider.ts` si trovano nel [**Dossier 03: Spoofing ToS di Google Antigravity, `PR #33800` e architettura del relay T3 Connect**](../dossiers/03-antigravity-tos-and-t3connect-relay.md).

### 4.1 Spoofing degli header Google Antigravity, falso `SSH_CONNECTION` e ban in 3 minuti (`Parte 4`)

La documentazione ufficiale di T3 Code [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) assicura agli utenti paganti: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* Quando gli utenti hanno segnalato ban nell'**Issue #40713**, un maintainer ha negato di chiamare il backend di Antigravity o di riutilizzare token, sostenendo che tutte le richieste provenissero dalla CLI ufficiale di Google — prima che gli sviluppatori (`schlessera`) smentissero l'affermazione citando gli stessi file sorgente di T3 Code ([Parte 4](https://x.com/realchendahuang/status/2125213397507858657)):

1. **User-Agent falsificato, estrazione dal portachiavi e chiamate a `v1internal` ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)):** Estrae le credenziali OAuth di Google da file locali, `@napi-rs/keyring` o Gestione credenziali di Windows (`CredReadW` tramite `ffi-rs` su `advapi32.dll`), codifica staticamente la stringa client interna di Google ed esegue `POST` direttamente verso il backend non documentato `v1internal` di Google ([righe 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)). Membri dello staff Google hanno confermato sul [forum ufficiale per sviluppatori](https://discuss.ai.google.dev/t/185992) che la Sezione 6 dei [Termini di servizio di Google Antigravity](https://antigravity.google/terms) vieta agli strumenti di terze parti di estrarre o riutilizzare credenziali per interrogare direttamente il backend:

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

2. **Iniezione di falso `SSH_CONNECTION` e mescolamento di account ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)):** Poiché la CLI di Google isola un unico accesso nel portachiavi del SO, T3 inietta una variabile d'ambiente `SSH_CONNECTION` contraffatta per indurre la CLI a scrivere localmente file di token in chiaro. Quando Google ha aggiornato la CLI il 24 novembre rimuovendo quel ripiego, l'**Issue #41973** ha confermato che i prompt dell'Account A venivano instradati silenziosamente all'Account B:

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **Ban in 3 minuti su account nuovo (`Issue #41536`), spoofing del client (`PR #26876`) e trigger di verifica post-audit (`PR #41210`):** Il 23 novembre l'**Issue #41536** ha documentato un abbonamento Google AI da `$20` appena acquistato senza **alcun proxy** — solo Antigravity gestito all'interno di T3 Code — bannato al suo **primissimo messaggio, 3 minuti dopo la configurazione** (Google concede agli account personali un solo ricorso; i maintainer hanno chiuso la segnalazione come duplicato senza aggiungere alcun avviso). In precedenza, `@theo` aveva integrato personalmente la **PR #26876** mascherando T3 Code come `"zed"` ([`AntigravityAcpSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts)) per aggirare le whitelist dei modelli. Nonostante `@theo` abbia disegnato `T3 Code -> Antigravity binary ✅` il 23 novembre ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) e abbia dato la colpa a CLIProxy quando è stato disabilitato il secondo account Google AI Ultra dell'utente `@Only_21Mil` ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397)), la [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) integrata collega nativamente il polling dell'hub [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) con header falsificati `claude-code/2.1.273`, `grok-cli/1.0.77` e `antigravityUserAgent`.
   - **Stato post-audit (`ca81b7b9`):** La [**PR #41210**](https://github.com/pingdotgg/t3code/pull/41210) ([`3e74a0aa`](https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836), `2026-11-25T05:23:36Z`) ha aggiunto in [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) il parsing delle risposte `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) di `cloudcode-pa.googleapis.com` per mostrare nella timeline del turno i link diretti alla verifica dell'account Google — confermando l'esistenza di trigger di verifica attivi lato Google — mentre la [**PR #42545**](https://github.com/pingdotgg/t3code/pull/42545) ([`4da8d19d`](https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc)) ha corretto `AGY_CLI_DISABLE_AUTO_UPDATE: "true"` (insieme alle [`#42339`](https://github.com/pingdotgg/t3code/pull/42339) e [`#42475`](https://github.com/pingdotgg/t3code/pull/42475)). Tutti e quattro i percorsi di spoofing/scraping — [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts), [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts), `AntigravityAcpSupport.ts` e `cliproxyApi.ts` — restano intatti a `ca81b7b9`.

![antigravityUsageLimits.ts codifica staticamente header falsificati del client Google e interroga il backend non documentato v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

<details>
<summary>Mostra 3 ulteriori riscontri su spoofing e ban di Antigravity (SSH_CONNECTION, Issue #41536, PR #33800)</summary>

![antigravityAuthSupport.ts inietta una falsa variabile d'ambiente SSH_CONNECTION per aggirare il portachiavi del SO](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 che documenta un nuovo account Google da $20 senza proxy bannato tre minuti dopo la configurazione al primo messaggio, chiuso come duplicato](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 che collega il polling hub CLIProxyAPI per Antigravity, xAI e Claude direttamente dentro T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

</details>

### 4.2 T3 Connect: zero cifratura end-to-end e gateway OVH con terminazione TLS (`Parte 5`)

**T3 Connect ha zero cifratura end-to-end — ogni prompt, file sorgente e output di terminale è tecnicamente visibile in chiaro a T3** ([Parte 5](https://x.com/realchendahuang/status/2125218189596676555)). Attualmente, [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) esegue il provisioning di Cloudflare Tunnels e record DNS all'interno dell'account Cloudflare di T3 stessa (`06_t3-connect.md`). TLS termina all'edge di Cloudflare senza alcuna cifratura del payload; collegare una Workers Route cattura tutto il traffico senza modifiche al codice e senza alcun avviso lato client.

L'approvazione di nuovi dispositivi (`requireConnectDeviceApproval` aggiunta nella [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419)) è tuttora impostata su **`false`** per default in [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`righe 1424–1426` a `ca81b7b9`), anche dopo che la [**PR #42311**](https://github.com/pingdotgg/t3code/pull/42311) post-audit ([`ece5f21b`](https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd)) ha aggiunto avvisi di accesso da nuovo dispositivo. Come ammette [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md), una chiave di firma del relay trafugata o un account cloud compromesso può generare sessioni direttamente verso una macchina collegata — equivalente a una shell locale. Nel frattempo, l'ispezione del sorgente a `ca81b7b9` ([Dossier 03](../dossiers/03-antigravity-tos-and-t3connect-relay.md)) conferma quattro ulteriori difetti di autenticazione, LAN e tunnel: `t3 up --lan` imposta ancora cookie di shell del SO validi 30 giorni senza `Secure` ([`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042), [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221), [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493)) e accetta richieste che omettono `Origin` ([`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)); gli scambi non-DPoP su `/oauth/token` emettono Bearer token di 30 giorni non vincolati e non revocabili, senza rotta `/logout` e con auto-revoca bloccata ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186), [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511), [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)); i token in query `?wsTicket=` validi 5 minuti sono privi di protezione dal replay per RPC Bearer e per tutte le rotte `media` ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622), [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156)); e `startupAccess.ts` classifica male `::1` tramite `NodeNet.isIPv4`, invocando silenziosamente `socket.destroy()` sui tunnel Tailscale Serve / Connect ([`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)). Quando l'**Issue #32098** ha richiesto mutua autenticazione e cifratura E2E, un maintainer l'ha chiusa dichiarando che la E2E completa era una modifica troppo grande; le discussioni `#21286` e `#37831` restano senza risposta e il 25 novembre `@theo` ha dichiarato la cifratura E2E impossibile (`2125370330244128924`).

Poiché i costi dei Cloudflare Tunnels avevano raggiunto **$25.000 al mese**, `@theo` ha aperto la **PR #32945** per migrare il traffico su un gateway OVH a Hillsboro noleggiato da T3 (`gw.t3coderelay.com`), dove il Caddy di T3 termina TLS e inoltra il traffico in chiaro su socket Unix verso un proxy Go `yamux` — ancora con zero cifratura E2E. Nel frattempo, [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promette `"encrypted network transport"` senza dichiarare l'assenza di cifratura E2E né offrire garanzie di non conservazione.

![Il maintainer principale riconosce nell'Issue #32098 che un account cloud rubato o una chiave relay possono controllare le macchine collegate lasciando fuori la cifratura E2E](../../evidence/15-connect-no-e2e.jpg)

<details>
<summary>Mostra il riscontro sul gateway OVH Caddy con terminazione TLS (PR #32945)</summary>

![La PR #32945 di Theo segnala una bolletta mensile Cloudflare da $25k e sposta T3 Connect su un gateway OVH self-hosted in cui Caddy termina TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

</details>

---

## 5. Bilancio economico, conflitti degli investitori, sponsor e l'imbuto delle 77.000 stelle (Parti 6, 8, 17, 18)

> **Audit tecnico approfondito:** Le citazioni complete su ricavi/radar, la configurazione Axiom in `infra/relay/src/observability.ts` e l'analisi completa di `GitHubStarPrompt.tsx` si trovano nel [**Dossier 04: Il bilancio economico, i conflitti degli investitori, lo stack degli sponsor e il motore delle 77k stelle**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md).

### 5.1 Oltre $800.000 di spesa e il radar computazionale da 31,7T token/giorno ($10,19M/giorno) (`Parte 8`)

Su 1.151 tweet nell'arco di 17,24 giorni, `@theo` ha menzionato T3 Code **162 volte (14,1%)**, mentre ha menzionato le sue tre attività storiche a pagamento — `T3 Chat`, `UploadThing` e [`https://ping.gg/`](https://ping.gg/) — **0 volte**. Il 12 novembre ha confermato di aver speso **oltre $800k** di tasca propria sul client MIT gratuito ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267), [Parte 8](https://x.com/realchendahuang/status/2125392410763239723)).

In cambio, la telemetria convogliata in `ingest.t3.codes` ha costruito un radar computazionale in tempo reale capace di tracciare **31,7 trilioni di token/giorno** — pari a **$10,19 milioni/giorno** di spesa API equivalente il 18 novembre (con picchi vicini a **$10,2M/giorno**) — insieme alle quote esatte di mercato (`99%` tramite abbonamento, `~98,5%` tra Codex/Claude/Antigravity, quota di prova open-weight scesa dal `15%` al `6%` con meno dello 0,5% dei prompt). Quando un commentatore ha provato a stimare le quote il 23 novembre, `@theo` lo ha deriso perché non aveva accesso alle sue analytics (`2124682906132181482`).

Quel radar si è trasformato direttamente in leva contrattuale: **oltre $300k in token gratuiti illimitati di accesso anticipato OpenAI** bruciati in un singolo benchmark su GPT-6.2 Astra (`2122760447103484410`), benchmark bare-metal con Google e interlocuzioni con DeepMind (sebbene l'affermazione di `@theo` secondo cui `@PatrickToulme` di DeepMind avrebbe inviato `"many PRs"` contrasti con il git log di `pingdotgg/t3code`, che mostra **1 solo commit**, la `PR #31158`), oltre a manifestazioni d'interesse da parte di investitori (`"multiple investors have asked me about this"`, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).

![Dashboard interna delle analytics di T3 Code di Theo che mostra 31,7 trilioni di token e $10,19M di spesa API giornaliera equivalente](../../evidence/17-theo-31t-tokens-10m-day.png)

<details>
<summary>Mostra lo screenshot di verifica a 1 solo commit di Patrick Toulme (PR #31158)</summary>

![Cronologia dei commit di pingdotgg/t3code filtrata per patrick-toulme che mostra 1 commit (#31158) invece di "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

</details>

### 5.2 Conflitti da angel investor (`Parte 6`) e ipocrisia su sponsor/quote (`Parte 17`)

- **Sovrapposizione con Vibe Kanban e Daytona ([Parte 6](https://x.com/realchendahuang/status/2125385742243520653)):** Il 16 novembre (`2122201981167251877`), `@theo` ha rivelato di essere stato investitore e collaboratore di **Vibe Kanban** — che prima di chiudere si era riorientato verso la UI di T3 Code — per poi deridere quell'interfaccia definendola ottima `"for running out of runway and killing your business"`. Il 18 novembre (`2123011578090127499`), ha confermato di aver investito nella società di sandbox cloud **Daytona** insieme a concorrenti, appena nove giorni dopo aver ventilato sandbox cloud a pagamento dentro T3 Code (`2119705561679933806`).
- **Stack degli sponsor integrato nel relay ([Parte 17](https://x.com/realchendahuang/status/2125411353393553744)):** Due sponsor della lista YouTube di `@theo` del maggio 2023 (`1657488850472804353`) — **Clerk** e **Axiom** — alimentano l'autenticazione cloud e il logging del relay con tracciamento IP a 30 giorni di T3 Code. Nell'aprile 2024 il CEO di Vercel `@rauchg` ha confermato che Vercel sponsorizzava unicamente Theo (`1776260839965863965`), e Theo ha successivamente riconosciuto clausole di esclusiva nei contratti di sponsorizzazione (`uv179CTAK-w`). È inoltre angel investor in Cursor e Cline.
- **Contraddizione tra exploit 0% di Codex e `CLIProxyAPI` a 10 account:** Il 21 agosto 2026 `@theo` si è vantato di aver estratto **oltre $800** oltre la finestra di tolleranza allo 0% di Codex mentre la dipendente di T3 `@maria_rcks` pubblicava *Endless* per reiterare turni oltre lo zero; dopo le polemiche del 22 agosto entrambi hanno cancellato i post e Maria ha auspicato che Codex bannasse gli account (`2090972426876129658`), precedendo la regressione con taglio netto di OpenAI (`openai/codex#45444`). A ottobre `@theo` ha pubblicato un Gist da 452 stelle (`59a521d2ee8d70aaf90e280c175072af`) che aggrega **7 account Claude + 3 Codex** (`555%` di quota su oltre 12 macchine; vantandosi inoltre di `$14.662` / `$15k` di resa Ultra su 1,1M di richieste tramite proxy e scrivendo un tutorial di configurazione Grok Bot + `$100` Claude) — lo stesso Gist collegato dalla `docs/user/faq.md` di T3 Code subito dopo aver rifiutato il cambio account integrato per i rischi di ban (`"Early apologies if it gets you banned 💀"`).

<details>
<summary>Mostra 3 riscontri su conflitti d'interesse, Gist CLIProxyAPI e quota Codex 0%</summary>

![Theo che rivela di aver investito e contribuito a Vibe Kanban prima di deriderne pubblicamente la chiusura](../../evidence/18-theo-vibe-kanban.png)

![Il Gist cliproxy-setup.md di Theo da 452 stelle che aggrega 7 account Claude e 3 Codex su oltre 12 computer al 555% di quota](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 che documenta la regressione globale che interrompe i turni attivi a metà operazione alla quota dello 0%](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

</details>

### 5.3 Come T3 Code è balzato da 30k a 77k stelle in 25 giorni (129 watcher) (`Parte 18`)

Sei mesi dopo aver pubblicato *"Github has a fake star problem"* (`2048122499834036340`, avvertendo che le stelle erano diventate uno strumento `"to trick VCs into investing"`), `@theo` ha scritto e integrato di proprio pugno tre PR ([Parte 18](https://x.com/realchendahuang/status/2125416210120765799)):
1. **30 ott. (`PR #27832`):** Ha aggiunto un invito in alto a destra a mettere una stella dopo 5 prompt inviati (`PROMPTS_BEFORE_ASKING = 5`, che scatta al 6º prompt in [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx)), **decuplicando** immediatamente le stelle giornaliere (`2117065834267136469`) e toccando **+3.094 stelle/giorno** su GitHub Trending (`2117172614158508400`).
2. **3 nov. (`PR #29922` & `PR #29987`):** Ha introdotto il **rilevamento di inattività della finestra per 30 secondi** (`IDLE_MS = 30_000`) mentre gli utenti attendono i turni dell'agente e ha sostituito il reindirizzamento del browser con la RPC `sourceControl.star` — inviando `PUT user/starred/pingdotgg/t3code` direttamente tramite le **credenziali GitHub del server host** prima di mostrare 160 particelle di coriandoli.
3. **Revisione aggirata e bug di starring su repository arbitrari (tuttora irrisolto a `ca81b7b9`):** Macroscope ha contrassegnato la `PR #29922` come `Needs Human Approval`; `@theo` l'ha comunque integrata da solo. Il 6 novembre, `zhilsinger` ha inviato `Request changes` segnalando l'opacità delle credenziali su host condivisi (ammessa in `GitHubStarPrompt.tsx#L115`) e il fatto che [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) non vincola mai `pingdotgg/t3code`:

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

Qualsiasi client con permesso `source-control:write` può assegnare stelle a repository arbitrari usando le credenziali dell'host. La revisione di `zhilsinger` è rimasta senza risposta e irrisolta fino a `ca81b7b9` (**19 giorni** dopo l'apertura) mentre il repository saliva da 30k a 77k stelle (129 watcher).

![Grafico di Theo del 2 novembre che celebra un picco quasi verticale di 10x nelle stelle giornaliere subito dopo l'introduzione del prompt in-app](../../evidence/20-star-10x-cliff.png)

<details>
<summary>Mostra i riscontri sulla revisione di zhilsinger e sullo starring arbitrario in driver.ts (PR #29922)</summary>

![La revisione Request Changes dello sviluppatore zhilsinger sulla PR #29922 che segnala lo starring su host condivisi e su repository arbitrari tramite credenziali del server, rimasta senza risposta per 19 giorni](../../evidence/21-pr29922-zhilsinger-review.png)

![packages/source-control-github/src/server/driver.ts righe 60–99 che omettono il vincolo su pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

</details>

---

## 6. Governance, bot di scraping dei fork, registri marchi, dataset di 1.151 tweet e precedenti (Parti 9, 10, 14, 15, 16)

> **Audit tecnico approfondito:** Il codice completo di automazione della governance (`.github/scripts/pr-limits.cjs`), la verifica USPTO TSDR e la metodologia completa con tabelle lessicali per `n = 1.151` si trovano nel [**Dossier 05: Governance del repository, bot di scraping dei fork, abusi di marchio e registro storico**](../dossiers/05-governance-trademark-and-history.md) e nel [**Dossier 06: Il dataset forense quantitativo di 1.151 tweet (7–24 nov. 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md).

### 6.1 Velocità interna contro ostilità esterna (`Parte 9`) e scraping dei fork (`Parte 10`)

- **500 commit/giorno e `yolo merges` contro `CONTRIBUTING.md` ([Parte 9](https://x.com/realchendahuang/status/2125392916369871309)):** `@theo` ha raccontato di produrre **500 commit/giorno** (`2120741101250515322`), far girare **700 agenti**, far eseguire a Julius merge in blocco delle PR tramite un ciclo di agenti, di avere `"my yolo merges breaking shit sometimes"` (`2119951615679672513`) e di rischiare la cancellazione della macchina per `"free content"` (`2119993037971730879`). Per gli utenti esterni, invece, la **PR #5551** ha nascosto la modalità Plan (`"Reality check for those upset"`, 10 voti negativi), la **PR #9190** ha occultato l'anello del contesto (16 voti negativi, record del repo), la **PR #33131** ha eliminato la modalità Plan con un riassunto AI assurdo, l'**Issue #33639** ha risposto a un utente che si lamentava con `"uninstall our software"` / `"ungrateful prick"` (e la **PR #41572** è stata respinta la mattina seguente), `CONTRIBUTING.md` si apriva con `"here's my advice: Don't"` accanto a divieti per i modelli e ban pubblici alla gogna in `.github/VOUCHED.td` (174 etichette `unwanted` nel repository), mentre i contributori su X venivano rimproverati perché non lo seguivano (`2120821423438778667`), minacciati della rimozione di `/btw` (`2120853340078874923`) o invitati a mandare screenshot annotati anziché PR (`2123754193530053110`).
- **Scraping pubblico via `@bot` contro derisione dei concorrenti ([Parte 10](https://x.com/realchendahuang/status/2125393641665671593)):** L'8 novembre `@theo` ha risposto `"Okay I'm stealing this"` alla funzionalità del fork di `@MiaAI_lab` e 30 secondi dopo ha inviato `@bot` nelle risposte pubbliche per estrarre il suo fork su `beebox` tramite Opus 5.5 (`2119240810202034645`); il 13 novembre ha mobilitato di nuovo `@bot` per clonare funzionalità apprezzate di strumenti rivali (`2121017649652269120`). Eppure il 24 novembre ha deriso Claude Code Desktop per aver introdotto le schede nella barra laterale (`2124987957803446311`). Contro i critici, ha invitato i follower a usare le Community Notes per `"demonetize them"` (`2120238923884696025`) e ha confermato di gestire un bot di auto-blocco su X (~100 account bloccati il 24 nov., `2125077510941802509`).

![CONTRIBUTING.md che scoraggia le PR esterne e descrive i ban pubblici alla gogna in .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

<details>
<summary>Mostra i riscontri sull'Issue #33639 e sullo scraping dei fork tramite @bot</summary>

![La risposta di Theo nell'Issue #33639 che dice a @bermudi di disinstallare e lo chiama ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo che risponde "Okay I'm stealing this" e invia @bot 30 secondi dopo per estrarre il fork di una sviluppatrice in T3 Code](../../evidence/23-stealing-fork-bot.png)

</details>

### 6.2 Audit sui marchi: 0 registrazioni USPTO e `PR #41898` retroattiva (`Parte 15`)

Seguendo una segnalazione di `@vildanden_ai` (`2125275487404761555`), la consultazione del database USPTO TSDR evidenzia **0 registrazioni** per `T3 Code`, `T3 Tools` o `T3 Connect` ([Parte 15](https://x.com/realchendahuang/status/2125408163273080950)). L'unica domanda USPTO di T3 Tools Inc. (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) è stata respinta definitivamente nel febbraio 2025 e contrassegnata come `ABANDONED` il 19 maggio 2025, mentre soggetti terzi detengono già registrazioni `T3` per software/SaaS nelle classi 42 e 9 (`EquipmentShare` Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations` Reg. `3324707`).

Secondo la [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), le aziende commerciali che inviano richieste di rimozione per marchio devono fornire sotto pena di spergiuro un numero di registrazione federale o internazionale (le eccezioni per marchi non registrati valgono solo per enti governativi e organizzazioni non profit). Nel momento in cui `@theo` minacciava di far chiudere l'account GitHub di `@DDdxx666`, non era in grado di compilare il modulo di GitHub. Solo **17 ore dopo** (`12:21 BJ` del 24 novembre), `@theo` ha integrato la **PR #41898** inserendo retroattivamente `TRADEMARK.md` (`"whether registered or unregistered"`) e citandola 94 secondi più tardi (`2125082769395220688`) — nonostante nel settembre 2024 avesse deriso WordPress per una `"unenforceable trademark dispute"` (`1839261574005141945`) e avesse risposto agli sviluppatori `"get a better lawyer"` tre ore prima, il 24 novembre (`2125026423769555308`).

![PR #41898 integrata 17 ore dopo la minaccia di ban, che aggiunge retroattivamente TRADEMARK.md rivendicando diritti "whether registered or unregistered"](../../evidence/24-pr41898-trademark-aftermath.png)

<details>
<summary>Mostra il riscontro sulla risposta su X "get a better lawyer"</summary>

![Theo che dice agli sviluppatori "get a better lawyer" tre ore prima di integrare TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

</details>

### 6.3 Dataset quantitativo di 1.151 tweet (`Parte 14`) e archivio storico biennale (`Parte 16`)

L'analisi di tutti i **1.151 post consecutivi di `@theo` su X** dal 7 al 24 novembre 2026 (`17,24` giorni; `66,8/giorno`; `75,6%` risposte; intervallo mediano `2,7m`) quantifica un'estrema asimmetria di potere ([Parte 14](https://x.com/realchendahuang/status/2125404517697290438)):
- **Dirigenti Big-Tech, personale dei laboratori e principali KOL (`n = 43` `@` primario stretto / `n = 60`–`62` perimetro ampio):** **0,0%** di volgarità mirate o insulti personali (`30,0%`–`32,6%` ringraziamenti cortesi). Critiche dure a Gemini 4 Carbon e GPT-6.2 Astra sono state attenuate o seguite da scuse pubbliche (`2123255588570501585`, `2123995323123343869`).
- **Sviluppatori comuni e critici (`n = 766` `@` primario stretto / `n = 749` perimetro ampio):** Ostilità/volgarità sono salite all'**8,0%** (`61/766`), tra cui `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`), `"dance on the graves of the 'local ai' community"` (`2120733839832273025`), `"Linux larpers"` (`2124298216271499605`), post ripetuti con `stupid bitch` (`2120599310211703274`) e derisioni su carcere/RSD (`2122865897375400066`).
- **Finestra di crisi di 25 ore sul fork cinese (`n = 132`):** Gli insulti personali diretti sono aumentati di **4,0 volte**, passando dalla base del `3,6%` al **14,4%** (`19/132`), includendo `"chinese tech twitter is the biggest fucking cesspit"` e definendo i lettori cinesi degli audit `"fucking braindead"` (`2125177503526588877`) — meno di 24 ore dopo aver fatto la predica a un altro utente di non bruciare la fiducia (`2124449493513068862`).

![Grafico forense 1: 1.151 tweet in 17 giorni — 75,6% di risposte e 162 contro 0 menzioni di prodotto](../../evidence/charts/theo-chart-1-overview.png)

![Grafico forense 2: Cadenza PST nelle 24 ore (233 post notturni) e barre giornaliere su 17 giorni](../../evidence/charts/theo-chart-2-rhythm.png)

![Grafico forense 3: Cortesia selettiva — 0,0% di volgarità verso i VIP contro 8,0% di ostilità verso gli sviluppatori e picco di crisi al 14,4%](../../evidence/charts/theo-chart-3-double-standard.png)

![Grafico forense 4: Scomposizione in tre ondate della finestra di crisi di 25 ore sul fork cinese](../../evidence/charts/theo-chart-4-cn-crisis.png)

<details>
<summary>Mostra 2 riscontri primari su X relativi all'ostilità citati nella Parte 13 e Parte 14</summary>

![Theo che fa quote-tweet su una semplice domanda di confronto tra strumenti scrivendo che gli ingegneri meritano la disoccupazione di massa](../../evidence/25-engineers-unemployment.png)

![Theo che definisce il Twitter tech cinese una cloaca e insulta gli sviluppatori che leggono audit di codice cinesi](../../evidence/26-cn-cesspit.png)

</details>

Allargando lo sguardo a due anni prima emerge uno schema ricorrente ([Parte 16](https://x.com/realchendahuang/status/2125408843152953693)):
- **2024 derisione del fork:** Ha intitolato il proprio fork del tema VS Code di un altro sviluppatore [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you), ridicolizzando il carattere del creatore originale.
- **2024 molestie agli sviluppatori indiani e scuse:** Dopo che un suo video contro i canali tutorial indiani aveva scatenato molestie, ha caricato [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) condannando gli attacchi basati sulla nazionalità — due anni prima dell'attacco al Twitter tech cinese.
- **Ottobre 2025 taglia su FFmpeg:** Ha imprecato davanti alla telecamera e offerto una **taglia da $20.000** per estromettere un maintainer di FFmpeg ([documento](https://www.youtube.com/watch?v=1oQ3KMeaH04)), ritirandola e cancellando tutto dopo la controfferta da $21k di Windscribe, la presa di posizione pubblica di VLC e la condanna sulla mailing list di FFmpeg.
- **25 novembre 2026 (~4:00 del mattino) minaccia closed-source cancellata:** Quella notte ha minacciato di rendere T3 Code closed-source sostenendo che gli utenti non meritassero l'open source; ha cancellato silenziosamente il tweet prima dell'alba dopo aver superato 3.000 mi piace.

---

## 7. Manuale pratico di mitigazione e bonifica

Se T3 Code è installato su una macchina personale o aziendale, applicare una difesa in profondità su flag d'ambiente, blocco di rete a livello di sistema operativo, Managed Policy, igiene di SQLite e credenziali locali e revoca dei token cloud.

### 7.1 Variabili d'ambiente + blocco di rete a livello di SO (utenti locali / desktop)

**Non** affidarsi esclusivamente alle variabili d'ambiente: anche a `ca81b7b9`, [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`riga 156`, già `riga 149`) inizializza ancora l'identità su disco all'avvio prima di verificare gli opt-out, [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) omette ancora `OTEL_SDK_DISABLED` e `T3CODE_OTEL_SDK_DISABLED`, e le build precedenti ignoravano gli opt-out di shell/utente (`PR #42376`, `PR #42464`). Combinare le variabili della shell/utente — includendo `DO_NOT_TRACK=1` recepita a partire dalla [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) (che prevale su `T3CODE_TELEMETRY_ENABLED=true` e disattiva il tracing del relay lato server) — con un blocco in `/etc/hosts` a livello di sistema operativo:

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
#    DO_NOT_TRACK=1 (PR #42629) overrides T3CODE_TELEMETRY_ENABLED=true and disables relay tracing,
#    but AnalyticsService.ts:156 still writes local install identity on disk and DesktopShellEnvironment.ts
#    still omits T3CODE_OTEL_SDK_DISABLED / OTEL_SDK_DISABLED.
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

Su Windows, configurare inoltre `DO_NOT_TRACK=1`, `T3CODE_TELEMETRY_ENABLED=false`, `T3CODE_OTEL_SDK_DISABLED=true` e `OTEL_SDK_DISABLED=true` in **Proprietà del sistema → Variabili d'ambiente** (Utente e Sistema) e riavviare il sistema o qualsiasi servizio in background. Tenere presente che secondo l'`Issue #36479` l'avvio del server esegue comunque una verifica in uscita verso `raw.githubusercontent.com`, a meno che non venga bloccata da regole firewall o proxy.

### 7.2 Managed Policy per amministratori (`macOS`, `Linux`, `Windows`)

Per bloccare telemetria, tunnel T3 Connect, attività webhook, importazione cookie dal browser e tunnel di anteprima in base a [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md), distribuire un file `policy.json` di proprietà dell'amministratore (o equivalente MDM/GPO):

| Sistema operativo | Criterio nativo / Registro | Percorso file (`chmod 644` / proprietà root o Admin) |
|---|---|---|
| **macOS** | Profilo di configurazione dispositivo per `com.t3tools.t3code` *(i profili utente vengono ignorati)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(distribuire separatamente in ogni distribuzione WSL)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) oppure `REG_SZ` `Policy` in `HKLM\SOFTWARE\Policies\T3Tools\T3Code` | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

Validare e verificare l'applicazione con `t3 policy check policy.json`, riavviare completamente T3 Code ed eseguire `t3 policy show`. **Ricordare i punti ciechi documentati in `docs/user/telemetry.md`:** la Managed Policy **non** disattiva il tracing del relay su `app.t3.codes` ospitato, **non** controlla il tracing dell'app mobile e **non** disabilita `Publish agent activity` se era stata attivata in precedenza.

### 7.3 Ispezione di `statev2.sqlite` e pulizia dello stato locale

Benché la [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) abbia introdotto la pulizia asincrona `thread-content.purge` (chiudendo l'`Issue #17845`), le versioni precedenti conservavano su disco l'intera cronologia dei thread e persino a `ca81b7b9` i thread sorgente eliminati mantengono la cronologia finché sono referenziati da fork attivi, trasferimenti `merge_back` in sospeso o subagenti padre attivi — inoltre le righe tombstone restano in SQLite e recuperare lo spazio liberato nel file `.sqlite` richiede un `VACUUM` offline:

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# Optional offline compaction to reclaim disk pages after PR #42119 purge (quit T3 Code first)
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

*(Su Windows, ispezionare e pulire `%USERPROFILE%\.t3\userdata\` inclusi `statev2.sqlite`, `anonymous-id` e `secrets`.)*

### 7.4 Revoca di Google Antigravity, T3 Connect, Clerk/Cloudflare e GitHub

1. **Google Antigravity:** Smettere immediatamente di utilizzare abbonamenti personali Google AI / Antigravity attraverso Antigravity gestito da T3 o CLIProxyAPI per proteggere l'unica possibilità di ricorso dell'account. Rimuovere `~/.t3/userdata/providers/antigravity/` e `~/.t3/tools/antigravity-acp/`.
2. **T3 Connect e cancellazione dei dati cloud:** Disabilitare **Publish agent activity** in **Settings → Sharing & access**, scollegare tutte le macchine locali (`t3` logout / unlink) e attivare `requireConnectDeviceApproval` nel caso si riattivi mai l'accesso remoto. Richiedere l'eliminazione completa dell'account e del relay tramite Clerk e il contatto ufficiale per la privacy di T3 Tools indicato in `privacy-policy.astro` (affinché il webhook di eliminazione Clerk introdotto nella `PR #42285` smantelli le righe su PlanetScale e i tunnel Cloudflare).
3. **Rotazione dei token GitHub e dei segreti:** Revocare l'autorizzazione OAuth / App GitHub di T3 Code in **GitHub Settings → Applications / Authorized GitHub Apps** (`driver.ts` detiene permessi di starring a livello di host). Ruotare qualsiasi chiave API, URL di database o token che possa essere stato passato nelle righe di comando dei processi acquisite da `t3-resource-monitor` prima della `PR #41889` / `PR #42577`, oppure trasmesso tramite errori webhook/relay inviati ad Axiom.
4. **HTTP su LAN, Bearer in CI e contenimento di repository non attendibili (`ca81b7b9`):** Non eseguire mai `t3 up --lan` in HTTP in chiaro senza anteporre TLS (reverse proxy o Tailscale Serve; attenzione al confronto tra `::1` e `127.0.0.1`), non inserire mai Bearer token non-DPoP validi 30 giorni in script o pipeline CI, e svuotare `SSH_AUTH_SOCK` / `GITHUB_TOKEN` (verificando anche gli hook in `.gitmodules` e `.claude/settings.json`) prima di aprire qualsiasi repository non attendibile.

### 7.5 Client alternativi

Nelle risposte della community, gli sviluppatori hanno segnalato spesso **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`) e **Cloudroom** ([Thread sulle alternative](https://x.com/realchendahuang/status/2125244977878036713)). Prima di adottare qualsiasi client sostitutivo, verificare autonomamente: (1) telemetria disattivata di default e cattura di rete pulita, (2) reale `DELETE` + `VACUUM` o rimozione dei file alla cancellazione dei thread, (3) rigorosa delega alla CLI ufficiale senza estrazione di credenziali o spoofing di header e (4) autentica cifratura end-to-end lato client per i tunnel remoti.

---

## 8. Fonti primarie e indice completo dei 18 post originali

> Per la tabella generale di riferimento che mappa ogni citazione da `SRC-001` a `SRC-320` tra parti dell'audit, dossier e commit post-audit, consultare [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md). Per tutti i **108** riscontri visivi e grafici forensi (`EV-001`–`EV-108`), consultare [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md).

### Post originari e indice completo su X in 18 parti (ordine cronologico)

- Origine 1 (Link GitHub in homepage etichettato `"steal our code"`): https://x.com/realchendahuang/status/2125059292919394654
- Origine 2 (Disputa sul nome del fork MIT, insulti su Temu e doppio standard): https://x.com/realchendahuang/status/2125062675147448475
- Parte 1 (Telemetria predefinita, promessa `"No telemetry"` infranta, hashing non salato cross-tool): https://x.com/realchendahuang/status/2125153472450527440
- Parte 2 (Falsa eliminazione SQLite, scanner dei processi ogni 5 secondi, rimozione modalità Plan, ban in `CONTRIBUTING.md`): https://x.com/realchendahuang/status/2125160473176023486
- Parte 3 (`git push --force` silenzioso in modalità Auto, rimozione del filtro privacy in 21 ore, 0 advisory, insulti agli utenti): https://x.com/realchendahuang/status/2125201882687881378
- Parte 4 (Spoofing header Google Antigravity, falso `SSH_CONNECTION`, ban in 3 minuti su account nuovo): https://x.com/realchendahuang/status/2125213397507858657
- Parte 5 (Assenza di cifratura E2E su T3 Connect, Cloudflare Tunnel, gateway OVH in chiaro self-hosted): https://x.com/realchendahuang/status/2125218189596676555
- Parte 6 (Conflitti da angel investor: derisione sulla chiusura di Vibe Kanban e sovrapposizione con le sandbox Daytona): https://x.com/realchendahuang/status/2125385742243520653
- Parte 7 (Affermazione Managed Policy `"turn off all telemetry"` contro i tre punti ciechi nella documentazione ufficiale): https://x.com/realchendahuang/status/2125391659492081947
- Parte 8 (Il bilancio economico da oltre $800k del client gratuito e il radar giornaliero da 31,7T token / $10,19M): https://x.com/realchendahuang/status/2125392410763239723
- Parte 9 (500 commit/giorno, 700 agenti, `yolo merges` contro scoraggiamento delle PR e gatekeeping sui follower): https://x.com/realchendahuang/status/2125392916369871309
- Parte 10 (Invio di `@bot` per fare scraping di fork e concorrenti, bot di auto-blocco, demonetizzazione via Community Notes): https://x.com/realchendahuang/status/2125393641665671593
- Parte 11 (Chiarimento del 25 nov. smentito entro 2 ore dalle PR notturne e dai 264 record Claude nel dump da 100 MB): https://x.com/realchendahuang/status/2125394810559426993
- Parte 12 (Correzioni notturne post-GDPR che rivelano log IP da 2,2M/ora, eliminazione account incompleta, fughe push, batch anonimi misti): https://x.com/realchendahuang/status/2125395501663281198
- Parte 13 (Definire il Twitter tech cinese una cloaca mentre si correggono in silenzio anteprime senza sandbox ed esecuzione di comandi senza richiesta): https://x.com/realchendahuang/status/2125395980354994414
- Parte 14 (Analisi quantitativa su 1.151 tweet: 0% volgarità verso dirigenti big-tech contro 8% ostilità verso sviluppatori comuni): https://x.com/realchendahuang/status/2125404517697290438
- Parte 15 (Zero registrazioni USPTO per T3 Code e requisiti della GitHub Trademark Policy): https://x.com/realchendahuang/status/2125408163273080950
- Parte 16 (Precedenti ricorrenti: `vsc-material-but-i-wont-sue-you`, attacchi agli sviluppatori indiani, taglia da $20k su FFmpeg, minaccia closed-source cancellata): https://x.com/realchendahuang/status/2125408843152953693
- Parte 17 (Stack sponsor Clerk/Axiom, exploit quota 0% Codex e cancellazione, Gist `CLIProxyAPI` a 10 account): https://x.com/realchendahuang/status/2125411353393553744
- Parte 18 (Come sono nate le 77k stelle GitHub: toast a 30 secondi di inattività che invia stelle API con credenziali host e starring su repo arbitrari non corretto): https://x.com/realchendahuang/status/2125416210120765799
- Elenco delle alternative dalla community: https://x.com/realchendahuang/status/2125244977878036713
- Archivio dei commenti della community (Issue #1 di `@opserx` — *"The Case Against Theo"*): [`docs/community/issue-1-the-case-against-theo.md`](../community/issue-1-the-case-against-theo.md)

### Codice sorgente, PR, Issue, policy e riscontri primari

**Telemetria, privacy e patch notturne post-GDPR (Parti 1, 7, 11, 12)**

- Dominio ufficiale di atterraggio: https://t3.codes/
- Telemetria PostHog predefinita (PR #174): https://github.com/pingdotgg/t3code/pull/174
- Rimozione silenziosa della promessa `"No telemetry"` in homepage (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Rifiuto di semplificare l'opt-out (Issue #1397) e segnalazione sulla promessa infranta (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Copia degli eventi grezzi su `ingest.t3.codes` self-hosted (PR #15028) e hashing non salato cross-tool (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- Quattro PR della community per l'interruttore di opt-out respinte (`#13458` / `#16763` / `#21248` / `#27077`): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- File sorgente di telemetria e identificazione (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `ProviderDimensions.ts` / `telemetryId.ts` / `otelEnvironment.ts` / `DesktopShellEnvironment.ts` / `DesktopBackendConfiguration.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts
- Documentazione ufficiale di telemetria e Managed Policy: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Dichiarazioni di Theo su Managed Policy, chiarimento e assenza di file di tracciamento + esportazione pubblica `events.clean.jsonl`: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- Fuga del percorso assoluto del workspace (PR #42450) e opt-out ignorati su Win/Mac (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Log IP a 2,2M/ora conservati 30 giorni (PR #42380), eliminazione account incompleta (PR #42285 / #42430), fughe push mobili (PR #42459 / #41859) e invio in batch del feedback anonimo (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Sicurezza locale, patch di sicurezza silenziose, Antigravity e T3 Connect (Parti 2, 3, 4, 5, 13)**

- Falsa eliminazione SQLite (Issue #17845 / #28903), monitor processi ogni 5 secondi (Issue #11222) e correzione della cattura delle righe di comando (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Hostname interni inviati a Google favicon (PR #16950 / #32657), verifica in uscita forzata (Issue #36479 / `raw.githubusercontent.com`), bypass di permessi/policy (PR #21806 / #27322), consumo quota Claude 1,7x (Issue #7338 / #24649) e bug di consumo energetico (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- `git push --force` silenzioso in modalità Claude Auto (Issue #15353 e commento di riproduzione) e PR di correzione della community (`#15360` / `#35207` / `#40692`): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Rimozione in 21 ore del filtro sui modelli privati per `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- Scheda Security Advisories vuota, `SECURITY.md` (`PR #38812` / `#41942`), correzioni di sicurezza integrate in silenzio (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`) e problemi aperti di sicurezza/launcher (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Garanzia FAQ di Antigravity, confutazione basata sul codice nell'Issue #40713, ban in 3 minuti (Issue #41536), instradamento incrociato di account (Issue #41973), spoofing editor in whitelist (PR #26876), PR #33800 hub CLIProxyAPI, post di Theo su zero rischio/schema/scarico di responsabilità su CLIProxy e codice sorgente: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Termini di servizio di Google Antigravity e divieto sul forum ufficiale: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Rifiuto E2E su T3 Connect (Issue #32098), `requireConnectDeviceApproval` disattivato per default (PR #36419 e `settings.ts`), gateway OVH Caddy self-hosted (PR #32945), codice relay, informativa sulla privacy e discussioni senza risposta: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Bilancio economico, conflitti degli investitori, sponsor e 77k stelle (Parti 6, 8, 17, 18)**

- Spesa di oltre $800k, dashboard giornaliera da 31,7T token / $10,19M, quota del 98,5% tra i tre laboratori, replica polemica sulle analytics, oltre $300k in token gratuiti ad accesso anticipato OpenAI, PR #31158 da 1 commit di Patrick, contatti con investitori e `Ping.gg`: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- Derisione verso Vibe Kanban, divulgazione dell'investimento in Daytona e piano delle sandbox cloud a pagamento: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Lista sponsor YouTube, conferma del CEO di Vercel, video sull'esclusiva, post sulla cancellazione di Maria, `openai/codex#45444`, tweet CLIProxyAPI su ClickHouse/Ultra/GrokBot, Gist CLIProxyAPI e FAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Video VC "Fake star", impennata 10x delle stelle, post +3.094 su Trending, post "missed 70k", PR #27832 / #29922 / #29987, `GitHubStarPrompt.tsx` e codice di starring su repository arbitrari in `driver.ts`: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Governance, marchi, cortesia selettiva e incidenti passati (Parti 9, 10, 14, 15, 16)**

- Rimozione della modalità Plan (PR #5551 / #33131), anello di avanzamento nascosto (PR #9190), insulti nell'Issue #33639, PR #41572 respinta, `CONTRIBUTING.md` e `.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commit/giorno, `yolo merges`, `"nukes my machine = free content"`, gatekeeping sui follower per le PR, minaccia su `/btw` e post sugli screenshot al posto delle PR: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Ordini a `@bot` di scraping dei fork, derisione di Claude Desktop, appello alla demonetizzazione con Community Notes e conferma dell'auto-blocker: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Registri USPTO TSDR (`PING LABS` 97294243 abbandonato; EquipmentShare `T3` Reg. 7795672), GitHub Trademark Policy, `PR #41898` retroattiva, minaccia di ban, risposta sull'open source alle aziende da mille miliardi, `"aware of the legality"`, `"get a better lawyer"` e precedenti tweet sui marchi: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Riscontri sulla cortesia selettiva (scuse e ponti con Google Neon, disoccupazione degli ingegneri, tombe dell'AI locale, Linux larper, minaccia carcere/RSD, post `stupid bitch`, cloaca del Twitter tech cinese, mancate scuse, predica sul non bruciare la fiducia): https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- Riscontri storici (`vsc-material-but-i-wont-sue-you`, video di scuse agli sviluppatori indiani, documento sulla taglia da $20k su FFmpeg): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04

### Monitoraggio upstream post-audit (`9d3195b4` a `ca81b7b9`, `SRC-280`–`SRC-320`)

- Linea base esaminata (`9d3195b4`, `#42000`) e ultimo `main` HEAD verificato (`ca81b7b9`, `#42634`): https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 ; https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd
- Restrizione di telemetria e identità (`#42299` / `84e4264b`, `#42465` / `6b3899f2`, `#42630` / `c925b9ab`, `#42629` / `ef4a1643`): https://github.com/pingdotgg/t3code/pull/42299 ; https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07 ; https://github.com/pingdotgg/t3code/pull/42465 ; https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da ; https://github.com/pingdotgg/t3code/pull/42630 ; https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b ; https://github.com/pingdotgg/t3code/pull/42629 ; https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64
- Pulizia locale, monitor delle risorse e hardening di sicurezza (`#42119` / `91f0b32e`, `#42577` / `af276ccb`, `#42413`): https://github.com/pingdotgg/t3code/pull/42119 ; https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e ; https://github.com/pingdotgg/t3code/pull/42577 ; https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c ; https://github.com/pingdotgg/t3code/pull/42413
- Trigger di verifica Antigravity e aggiornamenti CLI (`#41210` / `3e74a0aa`, `#42545` / `4da8d19d`, `#42339`, `#42475`): https://github.com/pingdotgg/t3code/pull/41210 ; https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836 ; https://github.com/pingdotgg/t3code/pull/42545 ; https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc ; https://github.com/pingdotgg/t3code/pull/42339 ; https://github.com/pingdotgg/t3code/pull/42475
- Avvisi T3 Connect e restrizioni su relay/mobile/feedback (`#42311` / `ece5f21b`, `#42356`, `#42394`, `#42397`, `#42398`, `#42415`): https://github.com/pingdotgg/t3code/pull/42311 ; https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd ; https://github.com/pingdotgg/t3code/pull/42356 ; https://github.com/pingdotgg/t3code/pull/42394 ; https://github.com/pingdotgg/t3code/pull/42397 ; https://github.com/pingdotgg/t3code/pull/42398 ; https://github.com/pingdotgg/t3code/pull/42415
- Riscontri su cookie LAN, Bearer, `?wsTicket=`, loopback `::1` ed esecuzione da repository non attendibili a `ca81b7b9` (`SRC-308`–`SRC-320`): https://github.com/pingdotgg/t3code/pull/37042 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985
