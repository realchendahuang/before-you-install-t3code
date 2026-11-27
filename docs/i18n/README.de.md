# Temu3 Code — Bevor du T3 Code installierst

<p align="center">
  <em>Ein unabhängiger, evidenzbasierter öffentlicher Beleg zu pingdotgg/t3code — dokumentiert rassistische Doppelstandards, irreführende Telemetrie, kritische Sicherheitslücken und kommerzielle Manipulation.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=de"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=de"><strong>✉ Tmail-Posteingang</strong></a> ·
  <a href="https://temu3code.com/?lang=de#x-receipts"><strong>📸 12 Original-X-Screenshots</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=de"><strong>🃏 61 Memes</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 Belege</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 Quellen</strong></a>
</p>

<p align="center">
  <strong>Sprachen (18):</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md"><strong>Deutsch</strong></a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

> [!IMPORTANT]
> **Unabhängige Untersuchung im öffentlichen Interesse · 18 Sprachen**
>
> Keine Telemetrie. Keine rassistische Diskriminierung. Jede der folgenden Aussagen ist an wörtlich zitierte öffentliche Äußerungen, Repository-Commits, Pull Requests, USPTO-Einreichungen und archivierte Screenshots gebunden.
>
> - **Verifizierte Exponate:** 20 Exponate (#00–#19)
> - **Primärbelege:** 109 Bildbelege · 327 kanonische URLs
> - **Upstream-Abgleich:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Sicherheits-Advisories:** 0 veröffentlichte GitHub-Advisories

<!-- origin-story:start -->
> [!TIP]
> **Warum „Temu3 Code“?**
>
> Am 23. November 2026 — 10 Minuten nachdem er den kostenlosen MIT-Fork eines chinesischen Entwicklers als „Chinese knockoff“ bezeichnet hatte —Spendete @theo großzügig unseren Markennamen auf X: „Temu3 Code“ (84k Aufrufe).
>
> Kostenloses Branding von einem Gründer mit 0 USPTO-Marken ist zu gut, um es zu vergeuden — also haben wir temu3code.com registriert, das öffentliche Audit übernommen und die PostHog-Telemetrie weggelassen. Danke für die kostenlose Naming-Beratung, Theo. (CC0 1.0 — fork uns ruhig zurück.) — [@theos Naming-Tweet ansehen ↗](https://x.com/theo/status/2124825920808829077)
<!-- origin-story:end -->
---

## Wie es kam — in 60 Sekunden

Ein einzelner Namensstreit um einen MIT-Fork aus der Community legte ein Muster offen: rassistische Doppelstandards, versteckte Telemetrie, stilles Nachbessern bei der Sicherheit und unbehobene architektonische Risiken.

1. **Der diskriminierende Auslöser** *(23. Nov. 2026)* — Nachdem ein Nutzer den kostenlosen MIT-Fork eines chinesischen Entwicklers für offiziellen T3 Code hielt, nannte @theo ihn einen „Chinese knockoff“ und „Temu3 Code“ und drohte mit der Sperrung des GitHub-Kontos — obwohl er 0 USPTO-Marken hält und elf Stunden später öffentlich US-Labore im Billionen-Dollar-Bereich willkommen hieß, die MIT-Code kopieren.
2. **Der Blick in den Quellcode** *(24. Nov. 2026)* — Die zeilenweise Prüfung von pingdotgg/t3code brachte standardmäßig aktive PostHog-Telemetrie zutage, die hinter dem Versprechen „No telemetry“ auf der Startseite ausgeliefert wurde; dazu Closed-Source-Aufbewahrung von Events bei ingest.t3.codes, ungesalzene SHA-256-Lesezugriffe auf ~/.codex und ~/.claude.json, eine nur vorgetäuschte Löschung von 41,6 GB SQLite-Daten, einen 52 Tage lang unbemerkten git push --force-Bug, Header-Spoofing für Google Antigravity und ein T3 Connect ohne jede E2E-Verschlüsselung im Klartext.
3. **Über 2,26 Mio. Aufrufe, GDPR-Beschwerde und eine sechsstündige Eilaktion** *(24.–25. Nov., über Nacht)* — Teil 1 überschritt 2,26 Millionen Aufrufe und löste eine GDPR-Beschwerde in der EU aus. Nächtliche Eil-PRs räumten versehentlich ein, dass IP- und User-Agent-Logs mit 2,2 Mio. Einträgen pro Stunde 30 Tage lang in Axiom gespeichert werden, dass absolute Workspace-Pfade aus git.cwd nach außen gelangen, dass die Kontolöschung defekt ist und dass Opt-outs unter Windows und macOS ignoriert werden.
4. **Was heute offen bleibt** *(25. Nov. (`ca81b7b9`) und laufend)* — Die Verfolgung von +259 Commits bis ca81b7b9 bestätigte teilweise Telemetrie-Patches — zugleich blieben unkorrigiert: ID-Schreibvorgänge beim Start, kein Schalter in der Oberfläche, 0 GitHub Security Advisories, das ungeprüfte Sternen beliebiger Repositories, 30 Tage gültige --lan-Shell-Cookies im Klartext, nicht widerrufbare Bearer-Tokens und die Exposition von SSH_AUTH_SOCK bei nicht vertrauenswürdigen Repositories (#19).

---

## Alle 20 verifizierten Exponate (#00–#19)

Jedes der folgenden Exponate verweist auf seine eigene, tabellenfreie lokalisierte Exponatdatei in diesem Repository und auf seine teilbare visuelle Karte im Webportal. Die laufende Dokumentation wird fortlaufend ergänzt (#20, #21, ...).

### Teil I · Rassistische Diskriminierung, Doppelstandards und System

*Von „Chinese knockoff“ und „Temu3 Code“ samt Sperrdrohung bei 0 USPTO-Marken bis zu einer quantitativen Auswertung von 1.151 Tweets (0,0 % vulgäre Sprache bei VIPs vs. 8,0 % Feindseligkeit gegenüber Entwicklern vs. 14,4 % Anstieg antichinesischer Krisenrhetorik) und einer über zwei Jahre wiederkehrenden Geschichte.*

- **#00 · [Herkunftsstreit: „Steal our code“, Fork-Namensdrohungen & rassistische Doppelstandards](../../cases/de/00-origin-fork-dispute-and-double-standard.md)** — `📌 Öffentlicher Beleg`
  Innerhalb von 11 Minuten stempelte @theo den kostenlosen MIT-Fork eines chinesischen Entwicklers als „Chinese knockoff“ und „Temu3 Code“ ab und drohte mit der Sperrung eines GitHub-Kontos – um weniger als 11 Stunden später öffentlich Billionen-Dollar-Unternehmen aus den USA willkommen zu heißen, die MIT-Code kopieren.
  [Vollständiges Exponat öffnen](../../cases/de/00-origin-fork-dispute-and-double-standard.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [Quantitativer Datensatz aus 1.151 Tweets: selektive Höflichkeit und 4,0-facher Anstieg antichinesischer Attacken in der Krise](../../cases/de/14-1151-tweet-quantitative-double-standard.md)** — `📌 Öffentlicher Beleg`
  Eine erschöpfende quantitative Analyse von 1.151 aufeinanderfolgenden X-Posts von @theo (7.–24. November 2026) belegt eine krude Machtasymmetrie: 0,0 % Profanität gegenüber 20 Big-Tech-Executives und Lab-Mitarbeitern gegenüber 8,0 % Feindseligkeit gegenüber gewöhnlichen Entwicklern – ein Anstieg um das 4,0-Fache auf 14,4 % während des 25-stündigen Streits um den chinesischen Fork.
  [Vollständiges Exponat öffnen](../../cases/de/14-1151-tweet-quantitative-double-standard.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [Keine einzige USPTO-Marke hinter der GitHub-Sperrdrohung & 17 Stunden später rückwirkend `TRADEMARK.md`](../../cases/de/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Öffentlicher Beleg`
  Als @theo damit drohte, sich wegen „trademark infringement“ an GitHub zu wenden, um das Konto eines chinesischen Entwicklers sperren zu lassen, hielt T3 Tools Inc. **0** USPTO-Registrierungen für `T3 Code`, `T3 Tools` oder `T3 Connect` — und 17 Stunden später wurde `TRADEMARK.md` rückwirkend per Merge hinzugefügt.
  [Vollständiges Exponat öffnen](../../cases/de/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [Zweijähriges historisches Muster: Angriffe wegen Nationalität, 20.000-Dollar-FFmpeg-Bounty und gelöschte Drohungen](../../cases/de/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Öffentlicher Beleg`
  Der Ausbruch im November 2026 im Zusammenhang mit dem chinesischen Fork war keine einmalige Entgleisung — öffentliche Aufzeichnungen aus den Jahren 2024 bis 2026 dokumentieren einen wiederkehrenden Zyklus aus gezielter Belästigung wegen Nationalität, Mobbing im Open-Source-Bereich, Spott über die Benutzeroberflächen anderer Entwickler und Löschungen nach Gegenreaktionen.
  [Vollständiges Exponat öffnen](../../cases/de/16-two-year-pattern-of-bullying-and-deletions.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125408843152953693)

### Teil II · Irreführende Telemetrie und Datenschutzverstöße

*Wie „No telemetry. Full stop.“ standardmäßige PostHog-Uploads verbarg, die Closed-Source-Aufbewahrung bei ingest.t3.codes, das Hashing von Zugangsdaten über verschiedene Tools hinweg, blinde Flecken der Managed Policy und Axiom-Logs mit 2,2 Mio. IP-markierten Einträgen pro Stunde.*

- **#01 · [Standard-Telemetrie hinter dem „No telemetry“-Versprechen der Startseite](../../cases/de/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Teilweise gepatcht`
  Während die Startseite „No telemetry. Unless you opt in. Full stop.“ versprach, aktivierte T3 Code standardmäßig PostHog-Tracking, leitete Rohkopien über das quelloffene… nein: über das **closed-source** `ingest.t3.codes`, hashte externe Zugangsdaten aus `~/.codex` und `~/.claude.json` und lehnte vier Opt-out-PRs aus der Community ab.
  [Vollständiges Exponat öffnen](../../cases/de/01-default-telemetry-and-cross-tool-tracking.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [Der Widerspruch in der Managed-Policy: Vier dokumentierte Telemetrie-Blindstellen](../../cases/de/07-managed-policy-blind-spots.md)** — `🔴 Unbehoben`
  @theo behauptete, T3 Code habe das „best corporate managed policy system“, das es „trivial“ mache, „all telemetry“ abzuschalten — dem widersprechen T3 Codes eigene `docs/user/telemetry.md` und `docs/user/managed-policy.md` unmittelbar.
  [Vollständiges Exponat öffnen](../../cases/de/07-managed-policy-blind-spots.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [Die Klarstellung vom 25. November wurde binnen zwei Stunden durch über Nacht eingegangene PRs und einen 100-MB-Dump widerlegt](../../cases/de/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Teilweise gepatcht`
  Am Morgen des 25. November gab @theo drei weitreichende Datenschutz-Zusicherungen und veröffentlichte einen 100 MB großen Telemetrie-Dump — alle drei Behauptungen wurden binnen zwei Stunden durch die PRs seines eigenen Teams und den gzip-komprimierten Dump selbst widerlegt.
  [Vollständiges Exponat öffnen](../../cases/de/11-nov25-clarification-contradicted-in-2-hours.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [Sechs-Stunden-Blitz über Nacht nach der DSGVO-Beschwerde: 2,2 Mio. IP-Logs pro Stunde & kaputte Kontolöschung](../../cases/de/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Teilweise gepatcht`
  Nachdem am 24. November eine förmliche EU-DSGVO-Beschwerde eingereicht worden war, brachten sechs Stunden nächtlicher Notfall-Patches unbeabsichtigt vier tieferliegende Datenschutz-Offenlegungen ans Licht — angeführt von 2,2 Millionen pro Stunde mit IP-Adressen versehenen Axiom-Spans, die 30 Tage lang aufbewahrt werden.
  [Vollständiges Exponat öffnen](../../cases/de/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125395501663281198)

### Teil III · Produktmängel und kritische Sicherheitslücken

*Vorgetäuschte Löschung von 41,6 GB SQLite-Daten, Scannen von OS-Prozessen im Fünf-Sekunden-Takt, 52 Tage unbemerkter git push --force, ToS-Spoofing für Google Antigravity mit dreiminütigen Sperren als Folge, T3 Connect ohne E2E-Verschlüsselung im Klartext, 0 Security Advisories und die LAN-/Bearer-/SSH_AUTH_SOCK-Schwachstellen in ca81b7b9.*

- **#02 · [Gefälschtes Löschen von SQLite-Threads (41,6 GB Ballast) & 5-Sekunden-Scans aller OS-Prozesse](../../cases/de/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Teilweise gepatcht`
  Ein Klick auf „endgültig löschen“ ließ die vollständige Konversationshistorie in `statev2.sqlite` unangetastet (lokale Festplatten schwollen auf 41,6 GB an), während ein Hintergrund-Monitor in Rust alle 5 Sekunden jeden OS-Prozess und jede vollständige Kommandozeile scannte – ohne jede Opt-out-Möglichkeit.
  [Vollständiges Exponat öffnen](../../cases/de/02-fake-sqlite-delete-and-process-scanner.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 Tage stilles `git push --force` gegen 21 Stunden für die Entfernung des Modell-Datenschutzfilters](../../cases/de/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Unbehoben`
  Über 52 Tage ließ T3 Code einen Bug offen, bei dem der Claude-Auto-Modus `git push --force origin main` stillschweigend genehmigte, ohne nachzufragen — für die Entfernung einer Datenschutz-Whitelist, die private Modelle auf @theos öffentlichem Leaderboard sichtbar machte, brauchte es dagegen nur 21 Stunden.
  [Vollständiges Exponat öffnen](../../cases/de/03-silent-force-push-vs-21h-filter-removal.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity: Header-Spoofing, gefälschte `SSH_CONNECTION` und Kontosperren binnen drei Minuten](../../cases/de/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Unbehoben`
  Obwohl die FAQ die Einhaltung der Nutzungsbedingungen zusichern, liest T3 Code Zugangsdaten aus dem OS-Schlüsselbund aus, spoofed interne Google-Header (`antigravity/hub/2.24.0`) gegen `v1internal` und injiziert gefälschte `SSH_CONNECTION`-Werte — und setzt damit persönliche Google-Abos schnellen Sperrungen aus.
  [Vollständiges Exponat öffnen](../../cases/de/04-antigravity-spoofing-and-3-minute-bans.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: Keine Ende-zu-Ende-Verschlüsselung & Klartext-Gateway mit TLS-Terminierung](../../cases/de/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Unbehoben`
  Jeder Prompt, jede Quelldatei und jeder Terminal-Stream, der durch T3 Connect läuft, endet im Klartext innerhalb der von T3 kontrollierten Infrastruktur — ohne jede Ende-zu-Ende-Verschlüsselung und mit standardmäßig deaktivierter Gerätefreigabe.
  [Vollständiges Exponat öffnen](../../cases/de/05-t3-connect-zero-e2e-plaintext-relay.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [Null GitHub Security Advisories, stille Patches für Schwachstellen hoher Schwere und überstürzte `SECURITY.md`](../../cases/de/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Unbehoben`
  Während `@theo` auf X chinesische Quellcode-Prüfer abtat, führte T3 Code stillschweigend Fixes für Schwachstellen hoher Schwere zusammen – darunter Path Traversal im Secret-Store, domänenübergreifende Token-Lecks und Befehlsausführung aus nicht vertrauenswürdigen Repositories – und beließ die veröffentlichten GitHub Security Advisories bei 0.
  [Vollständiges Exponat öffnen](../../cases/de/13-zero-security-advisories-and-silent-patches.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Kritisches Audit zu Authentifizierung und Repo-Ausführung: 30 Tage Klartext-LAN-Shell, nicht widerrufbare Tokens & `SSH_AUTH_SOCK`-Exposition](../../cases/de/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Unbehoben`
  Die zeilenweise Verifikation des neuesten `main`-HEAD (`ca81b7b9`, 25. Nov., 14:49 CST) bestätigte fünf aktive Sicherheits- und Zuverlässigkeitsmängel: 30 Tage gültige Klartext-Shell-Cookies für `--lan` mit Bypass bei fehlendem `Origin`, nicht widerrufbare 30-Tage-Bearer-Tokens, wiederverwendbare `?wsTicket=`-URLs, `isIPv4`, das `::1`-Tunnel zunichtemacht, und nicht vertrauenswürdige Repositories, die Hooks/Submodule mit vererbtem `SSH_AUTH_SOCK` und `GITHUB_TOKEN` ausführen.
  [Vollständiges Exponat öffnen](../../cases/de/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125494234614788390)

### Teil IV · Kommerzielle Manipulation und Druck auf die Community

*Der Radar für tägliche Rechenleistung von über 800.000 US-Dollar bzw. 31,7 Billionen Tokens, Interessenkonflikte mit Angel-Investoren (Vibe Kanban, Daytona), Überschneidungen im Sponsor-Stack, das Sternen von Host-Zugangsdaten nach 30 Sekunden Leerlauf als Treiber für 77.000 Stars, Fork-Scraping per @bot und Sperren über .github/VOUCHED.td.*

- **#06 · [Interessenkonflikte als Angel-Investor: Spott über das Vibe-Kanban-Aus & die Daytona-Überschneidung](../../cases/de/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Öffentlicher Beleg`
  Jenseits von Codefehlern dokumentieren die öffentlichen X-Posts von @theo scharfe Konflikte zwischen seiner Rolle als Angel-Investor in konkurrierenden Developer-Startups und seinem Betrieb von T3 Code.
  [Vollständiges Exponat öffnen](../../cases/de/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [Die Geschäftsbücher über 800.000 $+ und das tägliche Compute-Radar von 31,7 Billionen Tokens](../../cases/de/08-800k-spend-and-31t-token-radar.md)** — `📌 Öffentlicher Beleg`
  Die standardmäßig aktive Telemetrie war kein Versehen der Entwickler: Sie finanzierte ein Echtzeit-Aufklärungsradar über 31,7 Billionen Tokens pro Tag (API-Ausgaben im Gegenwert von 10,19 Mio. $ pro Tag), das gegen über 300.000 $ an kostenlosen OpenAI-Frühzugangs-Tokens und Investorenkontakte eingetauscht wurde.
  [Vollständiges Exponat öffnen](../../cases/de/08-800k-spend-and-31t-token-radar.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [Interne `yolo merges` vs. externe Feindseligkeit der Community & `.github/VOUCHED.td`-Bans](../../cases/de/09-yolo-merges-vs-community-hostility.md)** — `📌 Öffentlicher Beleg`
  Intern lieferte T3 Code 500 Commits pro Tag über automatisierte Agent-Loops und räumte "yolo merges breaking shit" ein — während man extern Beitragenden sagte "here's my advice: Don't", Nutzer über `.github/VOUCHED.td` denunzierte und Issue-Melder beleidigte.
  [Vollständiges Exponat öffnen](../../cases/de/09-yolo-merges-vs-community-hostility.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Öffentliches Fork-Scraping durch `@bot`, Verspottung von Wettbewerbern und Unterdrückung von Kritikern](../../cases/de/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Öffentlicher Beleg`
  Während er Rivalen dafür verspottete, UI-Muster zu kopieren, antwortete @theo öffentlich „Okay I'm stealing this“ auf den Fork einer Entwicklerin und entsandte 30 Sekunden später `@bot`, um ihren Code zu scrapen – während er Auto-Blocker einsetzte und seine Follower aufforderte, Kritikern die Monetarisierung zu entziehen.
  [Vollständiges Exponat öffnen](../../cases/de/10-fork-scraping-bot-and-critics-suppression.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Sponsor-Stack-Verflechtungen, Codex-0%-Quota-Exploit & die Heuchelei um `CLIProxyAPI` mit 10 Konten](../../cases/de/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Öffentlicher Beleg`
  Während T3 Code Compliance predigt und integriertes Account-Switching mit Verweis auf Ban-Risiken ablehnt, bettet es @theos YouTube-Sponsoren (Clerk und Axiom) in seinen Cloud-Stack ein – während @theo damit prahlte, Codex' 0%-Quota-Bug auszunutzen, und einen `CLIProxyAPI`-Pooling-Gist mit 10 Konten veröffentlichte, der direkt aus T3s FAQ verlinkt ist.
  [Vollständiges Exponat öffnen](../../cases/de/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [Der 77.000-Sterne-Trichter: Sterne per Host-Zugangsdaten bei 30-Sekunden-Inaktivität & ungefixter Arbitrary-Repo-Bug](../../cases/de/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Unbehoben`
  Ein halbes Jahr, nachdem er GitHub-Sterne als Mittel verurteilt hatte, „to trick VCs into investing“, hat @theo eigenhändig einen In-App-Toast zusammengeführt, der nach 30 Sekunden Inaktivität `PUT user/starred/...` mit den GitHub-Zugangsdaten des Hosts abfeuert — und das Repo damit von 30k auf 77k Sterne katapultiert (bei rund 129 Watchern), während ein Bug zum Sternen beliebiger Repos ungefixt blieb.
  [Vollständiges Exponat öffnen](../../cases/de/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Interaktive Karte](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=de) · [Originalbeitrag auf X](https://x.com/realchendahuang/status/2125416210120765799)

---

## Zentrale Bildbelege

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## Härtung und Bereinigung in zwei Minuten

Wenn T3 Code bereits auf Ihrem Rechner installiert ist, verlassen Sie sich nicht allein auf Umgebungsvariablen — AnalyticsService.ts:156 schreibt eine lokale ID, bevor Opt-outs geprüft werden, und DesktopShellEnvironment.ts lässt OTEL_SDK_DISABLED aus. Kombinieren Sie Umgebungsflags, das Blockieren über die Hosts-Datei des Betriebssystems, Offline-VACUUM der SQLite-Datenbank und den Widerruf von Tokens.

- [ ] DO_NOT_TRACK=1 und die alten Telemetrie-Kill-Switches setzen UND ingest.t3.codes in /etc/hosts ins Leere leiten.
- [ ] T3 Code beenden, statev2.sqlite prüfen, offline VACUUM; ausführen oder ~/.t3 vollständig entfernen.
- [ ] Keine persönlichen Google-AI-/Antigravity-Konten mehr über von T3 verwaltete Verzeichnisse betreiben, um Ihren einzigen Einspruch zu schützen.
- [ ] Publish agent activity deaktivieren, T3-Connect-Rechner trennen, Löschung bei Clerk und beim Relay beantragen und die GitHub-OAuth-App von T3 Code widerrufen.
- [ ] t3 up --lan niemals ohne TLS im Klartext exponieren, 30 Tage gültige Bearer-Tokens ohne DPoP in CI vermeiden und SSH_AUTH_SOCK / GITHUB_TOKEN bereinigen, bevor Sie nicht vertrauenswürdige Repositories öffnen.

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

**Von der Community empfohlene Alternativen:** Entwickler hoben Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash und Orca hervor. Prüfen Sie vor der Wahl eines Clients, ob Telemetrie standardmäßig aus ist, ob lokale Daten wirklich gelöscht werden, ob die offizielle CLI ohne Header-Spoofing delegiert und ob clientseitige E2E-Verschlüsselung besteht.

---

## Community-Berichte und unabhängiger Kommentar

Die 20 nummerierten Exponate (#00–#19) enthalten ausschließlich öffentlich überprüfbaren Code, Pull Requests, amtliche Einreichungen und archivierte öffentliche Posts. Community-Einsendungen und Aussagen aus privaten Nachrichten werden hier aus Gründen der Beweiskraft getrennt geführt.

- **Issue #1 · „The Case Against Theo“ (@opserx)** — Wörtliches Archiv der Community-Kommentare, die am 25. November 2026 in diesem Repository eingereicht wurden, ergänzt um quellengenaue Anmerkungen zu PR #42450 und PR #41237. ([Archiviertes Issue #1 lesen](../community/issue-1-the-case-against-theo.md))
- **Beschwerden aus privaten Nachrichten und laufende Einsendungen** — Mehrere Entwickler haben private Berichte über ihre Erfahrungen mit @theo und T3 Code geschickt. Um strengen Prüfstandards zu genügen, bleiben private Meldungen vom primären Exponatbestand #00–#19 getrennt, solange sie nicht durch öffentliche Artefakte unabhängig bestätigt sind. Überprüfbare Befunde oder Bestätigungen von Upstream-Korrekturen können per Pull Request oder GitHub Issue eingereicht werden. ([Richtlinie für Einsendungen und Prüfung](../../CONTRIBUTING.md))

---

## Technische Tiefendossiers und Hauptindizes

Zeilenweise Quellcode-Diffs, wörtliches SQL und vollständige, querverwiesene Kataloge finden Sie in den erhaltenen Referenzarchiven:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 Bildbelege (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 Primärquellen (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Laufende Dokumentation und Beiträge

Dieses Repository wird aktiv gepflegt. Sachliche Korrekturen, neu zusammengeführte Upstream-Korrekturen mit Commit-/PR-Nachweis oder neue Primärbelege sind per Pull Request oder GitHub Issue willkommen — siehe CONTRIBUTING.md.
