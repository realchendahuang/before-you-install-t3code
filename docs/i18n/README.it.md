# Prima di installare T3 Code

<p align="center">
  <em>Un registro pubblico indipendente e basato sulle prove su pingdotgg/t3code — che documenta doppi standard razziali, telemetria ingannevole, gravi falle di sicurezza e manipolazione commerciale.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/"><strong>🌐 Apri l'inchiesta visiva interattiva (18 lingue)</strong></a>
  ·
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 riscontri visivi</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 fonti primarie</strong></a>
</p>

<p align="center">
  <strong>Lingue ufficiali ONU:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>Edizioni della community globale:</strong>
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

![Prima di installare T3 Code](../../evidence/00-cover-en.png)

> [!IMPORTANT]
> **Inchiesta indipendente su atti pubblici · 18 lingue**
>
> Nessuna telemetria. Nessuna discriminazione razziale. Ogni affermazione riportata di seguito è ancorata a dichiarazioni pubbliche alla lettera, commit del repository, pull request, depositi USPTO e screenshot archiviati.
>
> - **Reperti verificati:** 20 reperti (#00–#19)
> - **Prove primarie:** 109 riscontri visivi · 327 URL canonici
> - **Verifica upstream:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Avvisi di sicurezza:** 0 avvisi di sicurezza pubblicati su GitHub

---

## Come è successo in 60 secondi

Un'unica disputa sul nome di un fork MIT comunitario ha rivelato un modello di doppi standard razziali, telemetria nascosta, patch di sicurezza silenziose e rischi architetturali irrisolti.

1. **La scintilla discriminatoria** *(23 nov 2026)* — Dopo che un utente ha scambiato il fork MIT gratuito di uno sviluppatore cinese per T3 Code ufficiale, @theo lo ha definito una «imitazione cinese» e «Temu3 Code» e ha minacciato la sospensione dell'account GitHub — pur non detenendo alcun marchio USPTO e pur avendo pubblicamente accolto con favore, 11 ore dopo, la copia del codice MIT da parte di laboratori statunitensi del valore di mille miliardi di dollari.
2. **L'apertura del codice sorgente** *(24 nov 2026)* — L'ispezione riga per riga di pingdotgg/t3code ha rivelato la telemetria PostHog attiva per impostazione predefinita, inclusa nonostante la promessa «No telemetry» della homepage, la conservazione degli eventi a codice chiuso presso ingest.t3.codes, letture SHA-256 senza salt di ~/.codex e ~/.claude.json, una finta cancellazione SQLite da 41,6 GB, un bug di git push --force rimasto silenzioso per 52 giorni, lo spoofing dell'header di Google Antigravity e T3 Connect in chiaro e senza E2E.
3. **Oltre 2,26 milioni di visualizzazioni, denuncia GDPR nell'UE e blitz d'emergenza di 6 ore** *(Notte tra il 24 e il 25 nov)* — La Parte 1 ha superato 2,26 milioni di visualizzazioni e ha innescato una denuncia GDPR nell'UE. Le PR d'emergenza della notte hanno inavvertitamente ammesso log di IP + User-Agent da 2,2 milioni/ora conservati per 30 giorni in Axiom, fughe di percorsi assoluti del workspace git.cwd, cancellazione dell'account non funzionante e opt-out ignorati su Windows/macOS.
4. **Che cosa resta irrisolto oggi** *(25 nov (`ca81b7b9`) e in corso)* — Il monitoraggio di +259 commit fino a ca81b7b9 ha confermato patch parziali alla telemetria — insieme a scritture dell'ID di avvio non risolte, nessun interruttore nell'interfaccia, 0 avvisi di sicurezza GitHub, assegnazione di star a repository arbitrari senza vincoli, cookie di shell --lan in chiaro validi 30 giorni, token Bearer non revocabili e l'esposizione di SSH_AUTH_SOCK ai repository non attendibili (#19).

---

## Tutti i 20 reperti verificati (#00–#19)

Ogni reperto qui sotto rimanda al file localizzato dedicato e senza tabelle in questo repository e alla relativa scheda visiva condivisibile sul portale web. Il monitoraggio proseguirà in ordine sequenziale (#20, #21, ...).

### Parte I · Discriminazione razziale, doppi standard e modello ricorrente

*Dalle minacce di rimozione per «imitazione cinese» e «Temu3 Code», con 0 marchi USPTO, a una ripartizione quantitativa di 1.151 tweet (0,0% di volgarità verso i VIP contro 8,0% di ostilità verso gli sviluppatori e 14,4% di impennata anti-cinese durante la crisi), fino a una storia ricorrente lunga due anni.*

- **#00 · [Disputa sull'origine: "Steal Our Code", minacce sul nome del fork e doppi standard razziali](../../cases/it/00-origin-fork-dispute-and-double-standard.md)** — `📌 Registro pubblico`
  Nel giro di 11 minuti, @theo ha etichettato il fork MIT gratuito di uno sviluppatore cinese come "Chinese knockoff" e "Temu3 Code" e ha minacciato il ban dell'account GitHub — per poi accogliere pubblicamente, meno di 11 ore dopo, le aziende americane da mille miliardi di dollari che copiano codice MIT.
  [Apri il reperto completo](../../cases/it/00-origin-fork-dispute-and-double-standard.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat) · [Post originale su X](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [Dataset quantitativo di 1.151 tweet: cortesia selettiva e impennata anti-cinese di 4,0×](../../cases/it/14-1151-tweet-quantitative-double-standard.md)** — `📌 Registro pubblico`
  Un'analisi quantitativa esaustiva di 1.151 post consecutivi di `@theo` su X (7–24 novembre 2026) dimostra una netta asimmetria di potere: 0,0% di volgarità verso 20 dirigenti big-tech e personale di laboratorio contro l'8,0% di ostilità verso sviluppatori comuni — un'impennata di 4,0× fino al 14,4% durante la disputa di 25 ore sul fork cinese.
  [Apri il reperto completo](../../cases/it/14-1151-tweet-quantitative-double-standard.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips) · [Post originale su X](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [Zero marchi USPTO dietro la minaccia di ban su GitHub e `TRADEMARK.md` retroattivo in 17 ore](../../cases/it/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Registro pubblico`
  Quando @theo ha minacciato di contattare GitHub per far chiudere l'account di uno sviluppatore cinese per "trademark infringement", T3 Tools Inc. aveva 0 registrazioni USPTO per `T3 Code`, `T3 Tools` o `T3 Connect` — e ha unito retroattivamente `TRADEMARK.md` 17 ore dopo.
  [Apri il reperto completo](../../cases/it/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker) · [Post originale su X](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [Schema storico biennale: reazioni ostili su base nazionale, la taglia da 20.000 dollari su FFmpeg e le minacce cancellate](../../cases/it/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Registro pubblico`
  Lo sfogo del novembre 2026 sul fork cinese non è stato un episodio isolato: i documenti pubblici dal 2024 al 2026 registrano un ciclo ricorrente di molestie mirate su base nazionale, bullismo nell'open source, derisione delle interfacce di altri sviluppatori e cancellazioni successive alle reazioni.
  [Apri il reperto completo](../../cases/it/16-two-year-pattern-of-bullying-and-deletions.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty) · [Post originale su X](https://x.com/realchendahuang/status/2125408843152953693)

### Parte II · Telemetria ingannevole e violazioni della privacy

*Come «No telemetry. Full stop.» abbia nascosto upload PostHog predefiniti, la conservazione a codice chiuso su ingest.t3.codes, l'hashing delle credenziali tra strumenti diversi, punti ciechi delle Managed Policy e log Axiom con IP taggati a 2,2 milioni/ora.*

- **#01 · [Telemetria predefinita dietro la promessa «niente telemetria» di una homepage](../../cases/it/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Parzialmente corretto`
  Mentre la sua homepage prometteva "No telemetry. Unless you opt in. Full stop.", T3 Code attivava per impostazione predefinita il tracciamento PostHog, faceva transitare copie grezze attraverso `ingest.t3.codes`, servizio a codice chiuso, calcolava l'hash delle credenziali esterne in `~/.codex` e `~/.claude.json`, e respingeva quattro PR della community per disattivare la telemetria.
  [Apri il reperto completo](../../cases/it/01-default-telemetry-and-cross-tool-tracking.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry) · [Post originale su X](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [La contraddizione della Managed Policy: quattro punti ciechi documentati nella telemetria](../../cases/it/07-managed-policy-blind-spots.md)** — `🔴 Non risolto`
  @theo ha sostenuto che T3 Code avesse il "best corporate managed policy system", tale da rendere "trivial to turn off all telemetry" — una tesi smentita di netto dalla stessa documentazione di T3 Code, `docs/user/telemetry.md` e `docs/user/managed-policy.md`.
  [Apri il reperto completo](../../cases/it/07-managed-policy-blind-spots.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [Post originale su X](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [Chiarimento del 25 novembre smentito in meno di 2 ore dalle PR notturne e da un dump da 100 MB](../../cases/it/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Parzialmente corretto`
  La mattina del 25 novembre, @theo ha rilasciato tre ampie rassicurazioni sulla privacy e pubblicato un dump di telemetria da 100 MB — tutte e tre le dichiarazioni sono state smentite entro due ore dalle PR del suo stesso team e dal dump gzippato stesso.
  [Apri il reperto completo](../../cases/it/11-nov25-clarification-contradicted-in-2-hours.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [Post originale su X](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [Blitz notturno di sei ore post-GDPR: 2,2 milioni/ora di log IP e cancellazione degli account non funzionante](../../cases/it/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Parzialmente corretto`
  Dopo la presentazione di un formale reclamo GDPR all'UE il 24 novembre, sei ore di patch d'emergenza notturne hanno fatto emergere inavvertitamente quattro rivelazioni sulla privacy ancora più profonde — a cominciare da 2,2 milioni/ora di span Axiom etichettati con l'IP e conservati per 30 giorni.
  [Apri il reperto completo](../../cases/it/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [Post originale su X](https://x.com/realchendahuang/status/2125395501663281198)

### Parte III · Difetti di prodotto e gravi falle di sicurezza

*Finta cancellazione SQLite da 41,6 GB, scansione dei processi del sistema operativo ogni 5 secondi, git push --force silenzioso per 52 giorni, spoofing dei ToS di Google Antigravity che provoca ban di 3 minuti, T3 Connect in chiaro senza E2E, 0 avvisi di sicurezza e vulnerabilità LAN/Bearer/SSH_AUTH_SOCK in ca81b7b9.*

- **#02 · [Falsa cancellazione dei thread in SQLite (gonfiore da 41,6 GB) e scansione di tutti i processi del sistema operativo ogni 5 secondi](../../cases/it/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Parzialmente corretto`
  Cliccare su "elimina definitivamente" lasciava intatta l'intera cronologia delle conversazioni dentro `statev2.sqlite` (gonfiando i dischi locali fino a 41,6 GB), mentre un monitor Rust in background scansionava ogni processo del sistema operativo e la riga di comando completa ogni 5 secondi, senza alcuna possibilità di disattivarlo.
  [Apri il reperto completo](../../cases/it/02-fake-sqlite-delete-and-process-scanner.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy) · [Post originale su X](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [`git push --force` silenzioso per 52 giorni contro la rimozione in 21 ore del filtro sulla privacy dei modelli](../../cases/it/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Non risolto`
  Per oltre 52 giorni T3 Code ha lasciato aperto un bug in cui la modalità Auto di Claude approvava silenziosamente `git push --force origin main` senza chiedere conferma — eppure ha impiegato solo 21 ore a rimuovere una whitelist sulla privacy, così che i modelli privati comparissero sulla classifica pubblica di @theo.
  [Apri il reperto completo](../../cases/it/03-silent-force-push-vs-21h-filter-removal.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push) · [Post originale su X](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Spoofing degli header di Google Antigravity, finto `SSH_CONNECTION` e ban dell'account in 3 minuti](../../cases/it/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Non risolto`
  Nonostante garantisca il rispetto dei ToS nella sua FAQ, T3 Code estrae le credenziali dal keyring del sistema operativo, contraffà header interni di Google (`antigravity/hub/2.24.0`) contro `v1internal` e inietta valori `SSH_CONNECTION` falsi — esponendo gli abbonamenti Google personali a ban rapidissimi.
  [Apri il reperto completo](../../cases/it/04-antigravity-spoofing-and-3-minute-bans.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban) · [Post originale su X](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: crittografia end-to-end assente e gateway con terminazione TLS in chiaro](../../cases/it/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Non risolto`
  Ogni prompt, file sorgente e flusso di terminale instradato tramite T3 Connect termina in chiaro all'interno dell'infrastruttura controllata da T3, con crittografia end-to-end assente e approvazione dei dispositivi disattivata per default.
  [Apri il reperto completo](../../cases/it/05-t3-connect-zero-e2e-plaintext-relay.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [Post originale su X](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [Zero GitHub Security Advisories, patch silenziosi ad alta gravità e `SECURITY.md` redatto in fretta](../../cases/it/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Non risolto`
  Mentre su X liquidava gli auditor cinesi del codice sorgente, T3 Code ha integrato in silenzio correzioni a vulnerabilità di gravità elevata — tra cui path traversal nello store dei segreti, fughe di token tra domini diversi ed esecuzione di comandi da repository non attendibili — mantenendo a 0 gli avvisi di sicurezza pubblicati su GitHub.
  [Apri il reperto completo](../../cases/it/13-zero-security-advisories-and-silent-patches.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [Post originale su X](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Audit critico di autenticazione ed esecuzione nei repository: shell LAN in chiaro per 30 giorni, token non revocabili ed esposizione di `SSH_AUTH_SOCK`](../../cases/it/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Non risolto`
  La verifica riga per riga dell'ultimo HEAD di `main` (`ca81b7b9`, 25 nov 14:49 CST) ha confermato cinque falle attive di sicurezza e affidabilità: cookie di shell `--lan` in chiaro validi 30 giorni con bypass in assenza di `Origin`, token Bearer di 30 giorni non revocabili, URL `?wsTicket=` riproducibili, `isIPv4` che elimina i tunnel `::1`, e repository non attendibili che eseguono hook e sottomoduli con `SSH_AUTH_SOCK` e `GITHUB_TOKEN` ereditati.
  [Apri il reperto completo](../../cases/it/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [Post originale su X](https://x.com/realchendahuang/status/2125494234614788390)

### Parte IV · Manipolazione commerciale e intimidazione della community

*Il radar del calcolo giornaliero da oltre 800.000 $ / 31,7 T token, i conflitti con angel investor (Vibe Kanban, Daytona), le sovrapposizioni nello stack degli sponsor, l'assegnazione di star con credenziali dell'host dopo 30 secondi di inattività, responsabile di 77.000 star, lo scraping dei fork da parte di @bot e i ban tramite .github/VOUCHED.td.*

- **#06 · [Conflitti da angel investor: la derisione dello shutdown di Vibe Kanban e la sovrapposizione con Daytona](../../cases/it/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Registro pubblico`
  Oltre ai difetti del codice, i post pubblici di @theo su X documentano conflitti netti tra il suo ruolo di angel investor in startup concorrenti nel settore dello sviluppo software e la sua attività alla guida di T3 Code.
  [Apri il reperto completo](../../cases/it/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona) · [Post originale su X](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [Il registro commerciale da oltre 800.000 $ e il radar di calcolo da 31,7 trilioni di token al giorno](../../cases/it/08-800k-spend-and-31t-token-radar.md)** — `📌 Registro pubblico`
  La telemetria attiva per impostazione predefinita non è stata una svista ingegneristica: ha finanziato un radar di intelligence in tempo reale da 31,7 trilioni di token al giorno (pari a 10,19 milioni di $ al giorno di spesa API equivalente), scambiato con oltre 300.000 $ in token OpenAI di accesso anticipato gratuiti e attività di avvicinamento agli investitori.
  [Apri il reperto completo](../../cases/it/08-800k-spend-and-31t-token-radar.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar) · [Post originale su X](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [`yolo merges` interne vs. ostilità esterna della community e ban con `.github/VOUCHED.td`](../../cases/it/09-yolo-merges-vs-community-hostility.md)** — `📌 Registro pubblico`
  All'interno, T3 Code spediva 500 commit al giorno tramite cicli automatizzati di agent e ammetteva "yolo merges breaking shit" — mentre all'esterno diceva ai contributor "here's my advice: Don't", denunciava gli utenti tramite `.github/VOUCHED.td` e insultava chi apriva issue.
  [Apri il reperto completo](../../cases/it/09-yolo-merges-vs-community-hostility.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult) · [Post originale su X](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Scraping pubblico dei fork tramite `@bot`, derisione dei concorrenti e soppressione delle critiche](../../cases/it/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Registro pubblico`
  Mentre deride i rivali per aver copiato schemi di interfaccia, @theo ha risposto pubblicamente "Okay I'm stealing this" al fork di una sviluppatrice e ha inviato `@bot` 30 secondi dopo per raschiarne il codice — mentre attivava blocchi automatici ed esortava i follower a demonetizzare i critici.
  [Apri il reperto completo](../../cases/it/10-fork-scraping-bot-and-critics-suppression.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork) · [Post originale su X](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Legami con lo stack degli sponsor, exploit della quota 0% di Codex e l'ipocrisia del `CLIProxyAPI` a 10 account](../../cases/it/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Registro pubblico`
  Mentre predica conformità e rifiuta la commutazione integrata tra account per via dei rischi di ban, T3 Code incorpora nel proprio stack cloud gli sponsor YouTube di @theo (Clerk e Axiom), mentre @theo si è vantato di aver sfruttato il bug della quota 0% di Codex e ha pubblicato un Gist di pooling `CLIProxyAPI` a 10 account, linkato direttamente dalla FAQ di T3.
  [Apri il reperto completo](../../cases/it/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2023-05-sponsor-roster) · [Post originale su X](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [L'imbuto delle 77.000 stelle: starring con credenziali host a 30 secondi di inattività e bug irrisolto del repo arbitrario](../../cases/it/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Non risolto`
  Sei mesi dopo aver condannato le stelle di GitHub come un modo "to trick VCs into investing", @theo ha auto-approvato e auto-merged un toast in-app che scatta dopo 30 secondi di inattività e lancia `PUT user/starred/...` usando le credenziali GitHub dell'host — catapultando il repo da 30k a 77k stelle (con ~129 watcher) e lasciando irrisolto un bug che consente di mettere la stella a repository arbitrari.
  [Apri il reperto completo](../../cases/it/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Scheda interattiva](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars) · [Post originale su X](https://x.com/realchendahuang/status/2125416210120765799)

---

## Riscontri visivi principali

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## Guida rapida all'hardening e alla pulizia in 2 minuti

Se T3 Code è già installato sulla tua macchina, non affidarti solo alle variabili d'ambiente: AnalyticsService.ts:156 scrive un ID locale prima di verificare gli opt-out e DesktopShellEnvironment.ts omette OTEL_SDK_DISABLED. Combina flag d'ambiente, blocco degli host a livello di sistema operativo, compattazione SQLite offline e revoca dei token.

- [ ] Esporta DO_NOT_TRACK=1 e i kill switch legacy della telemetria, E blocca ingest.t3.codes con un sinkhole in /etc/hosts.
- [ ] Chiudi T3 Code, ispeziona statev2.sqlite, esegui VACUUM; offline oppure rimuovi completamente ~/.t3.
- [ ] Smetti di usare account personali Google AI / Antigravity tramite directory gestite da T3, per proteggere il tuo unico ricorso.
- [ ] Disattiva la pubblicazione dell'attività dell'agente, scollega le macchine T3 Connect, richiedi la cancellazione tramite Clerk + relay e revoca l'app OAuth GitHub di T3 Code.
- [ ] Non esporre mai t3 up --lan in chiaro senza TLS, evita token Bearer non-DPoP validi 30 giorni in CI e rimuovi SSH_AUTH_SOCK / GITHUB_TOKEN prima di aprire repository non attendibili.

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**Alternative consigliate dalla community:** Gli sviluppatori hanno segnalato Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash e Orca. Prima di adottare qualsiasi client, verifica che la telemetria sia disattivata per impostazione predefinita, che la cancellazione locale sia reale, che la delega alla CLI ufficiale avvenga senza spoofing degli header e che la crittografia E2E sia lato client.

---

## Resoconti della community e commenti indipendenti

I 20 reperti numerati (#00–#19) contengono esclusivamente codice, pull request, depositi ufficiali e post pubblici archiviati, tutti verificabili pubblicamente. I contributi della community e le accuse ricevute in messaggi privati sono tenuti separati in questa sede per chiarezza probatoria.

- **Issue #1 · «Il caso contro Theo» (@opserx)** — Archivio testuale del commento della community inviato a questo repository il 25 novembre 2026, accompagnato da note di precisione sulle fonti primarie per le PR #42450 e PR #41237. ([Leggi la Issue #1 archiviata](../community/issue-1-the-case-against-theo.md))
- **Denunce via messaggio privato e contributi in corso** — Diversi sviluppatori hanno inviato resoconti privati delle proprie esperienze con @theo e T3 Code. Per mantenere standard di verifica rigorosi, le segnalazioni private restano separate dal registro principale dei reperti #00–#19, a meno che non siano corroborate in modo indipendente da elementi pubblici. Invia riscontri verificabili o conferme di correzioni upstream tramite Pull Request o GitHub Issue. ([Politica di invio e verifica](../../CONTRIBUTING.md))

---

## Dossier tecnici approfonditi e indici principali

Per diff riga per riga del codice sorgente, SQL integrale e cataloghi completi con riferimenti incrociati, consulta gli archivi di riferimento conservati:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 riscontri visivi (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 fonti primarie (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Monitoraggio continuo e contributi

Questo repository è mantenuto attivamente. Correzioni fattuali, correzioni upstream appena integrate con prova di commit/PR o nuove prove primarie sono benvenute tramite Pull Request o GitHub Issue — vedi CONTRIBUTING.md.
