# Temu3 Code · Voordat je T3 Code installeert

<p align="center">
  <em>20 gedocumenteerde zaken, 109 gearchiveerde screenshots en 3,5 jaar publieke posts en commits van pingdotgg/t3code. Nul telemetrie.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=nl"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=nl"><strong>✉ Tmail-inbox</strong></a> ·
  <a href="https://temu3code.com/?lang=nl#x-receipts"><strong>📸 12 originele X-screenshots</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=nl"><strong>🃏 61 memes</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 screenshots</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 bronnen</strong></a>
</p>

<p align="center">
  <strong>Talen (18):</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md"><strong>Nederlands</strong></a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

> [!IMPORTANT]
> **Onafhankelijk onderzoek naar het openbare dossier · 18 talen**
>
> Geen telemetrie. Geen raciale discriminatie. Elke onderstaande bewering is verankerd in letterlijke openbare uitspraken, repository-commits, pull requests, USPTO-dossiers en gearchiveerde schermafbeeldingen.
>
> - **Geverifieerde bewijsstukken:** 20 bewijsstukken (#00–#19)
> - **Primair bewijs:** 109 visuele bewijzen · 327 canonieke URL's
> - **Upstream-controle:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Beveiligingsadviezen:** 0 gepubliceerde GitHub Security Advisories

<!-- origin-story:start -->
> [!TIP]
> **Waarom "Temu3 Code"?**
>
> Op 23 november 2026, tien minuten nadat hij de gratis MIT-fork van een Chinese developer een "Chinese knockoff" noemde, gaf @theo ons de naam op X: "Temu3 Code" (84k weergaven).
>
> Een oprichter met nul USPTO-handelsmerken die gratis branding weggeeft, sla je niet af. We registreerden temu3code.com, zetten de publieke audit hier neer en lieten PostHog weg. Bedankt voor de naam, Theo. Alles hier is CC0 1.0, dus fork erop los. [Bekijk de naamgevingspost van @theo ↗](https://x.com/theo/status/2124825920808829077)
<!-- origin-story:end -->
---

## Hoe het gebeurde in 60 seconden

Een enkel naamconflict over een communityfork onder de MIT-licentie legde een patroon bloot van raciale dubbele maatstaven, verborgen telemetrie, stille beveiligingspatches en onopgeloste architectuurrisico's.

1. **De discriminerende aanleiding** *(23 nov. 2026)* — Nadat een gebruiker de gratis MIT-fork van een Chinese ontwikkelaar aanzag voor de officiële T3 Code, noemde @theo die een 'Chinese knockoff' en 'Temu3 Code' en dreigde met een GitHub-accountban — terwijl hij 0 USPTO-merken bezat en elf uur later publiekelijk verwelkomde dat Amerikaanse labs met biljoenenbudgetten MIT-code kopieerden.
2. **De broncode opengelegd** *(24 nov. 2026)* — Regel-voor-regelonderzoek van pingdotgg/t3code onthulde standaard ingeschakelde PostHog-telemetrie achter een homepagebelofte van 'No telemetry', closed-source retentie van gebeurtenissen op ingest.t3.codes, ongezouten SHA-256-uitlezingen van ~/.codex en ~/.claude.json, een 41,6 GB grote schijnverwijdering van SQLite, een 52 dagen durende stille git push --force-bug, spoofing van Google Antigravity-headers en T3 Connect met platte tekst en zero-E2E.
3. **Meer dan 2,26 miljoen weergaven, EU-GDPR-klacht en zes uur durend paniekoffensief** *(24–25 nov., nacht)* — Deel 1 overschreed 2,26 miljoen weergaven en leidde tot een EU-GDPR-klacht. Nood-PR's midden in de nacht gaven per ongeluk toe dat IP- en User-Agent-logboeken met 2,2 miljoen vermeldingen per uur 30 dagen in Axiom werden bewaard, dat absolute paden naar git.cwd-werkruimtes weglekten, dat accountverwijdering niet werkte en dat opt-outs op Windows/macOS werden genegeerd.
4. **Wat vandaag nog openstaat** *(25 nov. (`ca81b7b9`) & doorlopend)* — Het volgen van +259 commits tot en met ca81b7b9 bevestigde gedeeltelijke telemetriepatches — naast nog steeds niet opgeloste schrijfacties van een opstart-ID, geen schakelaar in de UI, 0 GitHub Security Advisories, niet vastgepinde starring van willekeurige repositories, shellcookies voor --lan in platte tekst die 30 dagen geldig zijn, niet-intrekbare Bearer-tokens en blootstelling van SSH_AUTH_SOCK bij niet-vertrouwde repositories (#19).

---

## Alle 20 geverifieerde bewijsstukken (#00–#19)

Elk onderstaand bewijsstuk linkt naar het eigen, tabelvrije gelokaliseerde bewijsbestand in deze repository en naar de deelbare visuele kaart op het webportaal. Doorlopende tracking gaat sequentieel verder (#20, #21, ...).

### Deel I · Raciale discriminatie, dubbele maatstaven en patroon

*Van 'Chinese knockoff' en 'Temu3 Code' tot dreigementen met verwijdering met 0 USPTO-merken, naar een kwantitatieve uitsplitsing van 1.151 berichten (0,0% grof taalgebruik bij VIP's vs. 8,0% vijandigheid jegens ontwikkelaars vs. 14,4% anti-Chinese crisispiek) en een patroon dat zich twee jaar herhaalt.*

- **#00 · [Herkomstgeschil: "Steal Our Code", dreigementen over forknaamgeving en racistische dubbele standaarden](../../cases/nl/00-origin-fork-dispute-and-double-standard.md)** — `📌 Openbaar dossier`
  Binnen 11 minuten bestempelde @theo de gratis MIT-fork van een Chinese ontwikkelaar als een "Chinese knockoff" en "Temu3 Code" en dreigde hij met een GitHub-accountverbod — om minder dan 11 uur later publiekelijk toe te juichen dat bedrijven van biljoen dollar Amerikaanse MIT-code kopiëren.
  [Open volledig bewijsstuk](../../cases/nl/00-origin-fork-dispute-and-double-standard.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [Kwantitatieve dataset van 1.151 tweets: selectieve hoffelijkheid en 4,0× anti-Chinese crisisuitbarsting](../../cases/nl/14-1151-tweet-quantitative-double-standard.md)** — `📌 Openbaar dossier`
  Een uitputtende kwantitatieve analyse van 1.151 opeenvolgende @theo-posts op X (7–24 november 2026) toont een schrijnende machtsasymmetrie aan: 0,0% scheldwoorden richting 20 bigtech-bestuurders en labmedewerkers tegenover 8,0% vijandigheid richting gewone ontwikkelaars — een stijging met factor 4,0 naar 14,4% tijdens het 25 uur durende Chinese-forkconflict.
  [Open volledig bewijsstuk](../../cases/nl/14-1151-tweet-quantitative-double-standard.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [Nul USPTO-merken achter de GitHub-ban-dreiging & 17 uur later retroactief `TRADEMARK.md`](../../cases/nl/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Openbaar dossier`
  Toen @theo dreigde GitHub te contacteren om het account van een Chinese ontwikkelaar te laten verwijderen wegens "trademark infringement", had T3 Tools Inc. 0 USPTO-registraties voor `T3 Code`, `T3 Tools` of `T3 Connect` — en merge-de hij 17 uur later retroactief `TRADEMARK.md`.
  [Open volledig bewijsstuk](../../cases/nl/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [Twee jaar historisch patroon: nationalistische backlash, een FFmpeg-bounty van $20.000 en verwijderde dreigementen](../../cases/nl/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Openbaar dossier`
  De uitbarsting rond de Chinese fork in november 2026 was geen geïsoleerde misstap — openbare archieven uit 2024 tot 2026 documenteren een zich herhalende cyclus van nationalistisch gerichte intimidatie, pestgedrag in open source, spot met de UI's van andere ontwikkelaars en verwijderingen na de backlash.
  [Open volledig bewijsstuk](../../cases/nl/16-two-year-pattern-of-bullying-and-deletions.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125408843152953693)

### Deel II · Misleidende telemetrie en privacyschendingen

*Hoe 'No telemetry. Full stop.' standaard PostHog-uploads verborg, closed-source retentie op ingest.t3.codes, het hashen van inloggegevens van andere tools, blinde vlekken in Managed Policy en IP-gelabelde Axiom-logboeken van 2,2 miljoen per uur.*

- **#01 · [Standaardtelemetrie achter een homepage-belofte van "geen telemetrie"](../../cases/nl/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Gedeeltelijk gepatcht`
  Terwijl de homepage beloofde "No telemetry. Unless you opt in. Full stop.", zette T3 Code standaard PostHog-tracking aan, leidde het ruwe kopieën via het closed-source `ingest.t3.codes`, hashte het externe inloggegevens uit `~/.codex` en `~/.claude.json`, en verwierp het vier opt-out-PR's uit de community.
  [Open volledig bewijsstuk](../../cases/nl/01-default-telemetry-and-cross-tool-tracking.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [De managed-policy-tegenspraak: vier gedocumenteerde blinde vlekken in telemetrie](../../cases/nl/07-managed-policy-blind-spots.md)** — `🔴 Niet opgelost`
  @theo beweerde dat T3 Code het "best corporate managed policy system" had, waardoor het "trivial to turn off all telemetry" zou zijn — rechtstreeks weersproken door T3 Code's eigen `docs/user/telemetry.md` en `docs/user/managed-policy.md`.
  [Open volledig bewijsstuk](../../cases/nl/07-managed-policy-blind-spots.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [Verduidelijking van 25 nov binnen 2 uur weersproken door overnight-PR's & 100 MB dump](../../cases/nl/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Gedeeltelijk gepatcht`
  Op de ochtend van 25 november gaf @theo drie allesomvattende privacyverzekeringen en publiceerde hij een telemetriedump van 100 MB — alle drie de beweringen werden binnen twee uur weersproken door de PR's van zijn eigen team en door de gzip-dump zelf.
  [Open volledig bewijsstuk](../../cases/nl/11-nov25-clarification-contradicted-in-2-hours.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [Zes uur durende nachtelijke blitz na de GDPR: 2,2 miljoen IP-logs per uur & kapotte accountverwijdering](../../cases/nl/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Gedeeltelijk gepatcht`
  Nadat op 24 november een formele EU-GDPR-klacht was ingediend, brachten zes uur aan noodpatches midden in de nacht onbedoeld vier diepere privacydisclosures aan het licht — met als koploper 2,2 miljoen per uur aan met IP gelabelde Axiom-spans die 30 dagen werden bewaard.
  [Open volledig bewijsstuk](../../cases/nl/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125395501663281198)

### Deel III · Productdefecten en kritieke beveiligingsfouten

*Een 41,6 GB grote schijnverwijdering van SQLite, het scannen van OS-processen in 5 seconden, een 52 dagen durende stille git push --force, spoofing van de Google Antigravity-ToS die tot bans van 3 minuten leidde, T3 Connect met platte tekst en zero-E2E, 0 Security Advisories en kwetsbaarheden in LAN/Bearer/SSH_AUTH_SOCK in ca81b7b9.*

- **#02 · [Schijnverwijdering van SQLite-threads (41,6 GB opgeblazen data) & scans van alle OS-processen elke 5 seconden](../../cases/nl/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Gedeeltelijk gepatcht`
  Een klik op "permanent verwijderen" liet de volledige gespreksgeschiedenis intact in `statev2.sqlite` (waardoor lokale schijven opzwollen tot 41,6 GB), terwijl een achtergrondmonitor in Rust elke 5 seconden elk OS-proces en de volledige commandoregel scande, zonder enige mogelijkheid om dat uit te zetten.
  [Open volledig bewijsstuk](../../cases/nl/02-fake-sqlite-delete-and-process-scanner.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 dagen stilzwijgende `git push --force` tegenover 21 uur voor het verwijderen van het privacyfilter voor modellen](../../cases/nl/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Niet opgelost`
  Meer dan 52 dagen liet T3 Code een bug openstaan waarbij Claude Auto mode stilzwijgend `git push --force origin main` goedkeurde zonder om bevestiging te vragen — en toch had het maar 21 uur nodig om een privacystoplijst te verwijderen, zodat privémodellen op de openbare leaderboard van @theo verschenen.
  [Open volledig bewijsstuk](../../cases/nl/03-silent-force-push-vs-21h-filter-removal.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity-headerspoofing, nep-`SSH_CONNECTION` en accountbans binnen 3 minuten](../../cases/nl/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Niet opgelost`
  Ondanks de garantie in de FAQ dat alles binnen de ToS valt, leest T3 Code inloggegevens uit de OS-sleutelhanger, vervalst het Google's interne headers (`antigravity/hub/2.24.0`) richting `v1internal` en injecteert het nepwaarden voor `SSH_CONNECTION` — waarmee persoonlijke Google-abonnementen worden blootgesteld aan snelle bans.
  [Open volledig bewijsstuk](../../cases/nl/04-antigravity-spoofing-and-3-minute-bans.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: geen end-to-endversleuteling en een gateway die TLS in plaintext termineert](../../cases/nl/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Niet opgelost`
  Elke prompt, elk bronbestand en elke terminalstream die via T3 Connect loopt, eindigt in plaintext binnen de infrastructuur die door T3 wordt beheerd — zonder enige end-to-endversleuteling en met apparaatgoedkeuring die standaard uit staat.
  [Open volledig bewijsstuk](../../cases/nl/05-t3-connect-zero-e2e-plaintext-relay.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [Nul gepubliceerde GitHub Security Advisories, stilzwijgend doorgevoerde patches voor ernstige kwetsbaarheden en een overhaast `SECURITY.md`](../../cases/nl/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Niet opgelost`
  Terwijl T3 Code op X Chinese auditors van broncode wegzette, voerde het stilzwijgend oplossingen door voor ernstige kwetsbaarheden — waaronder path traversal in de geheimenopslag, tokenlekken tussen domeinen en commando-uitvoering vanuit niet-vertrouwde repositories — terwijl het aantal gepubliceerde GitHub Security Advisories op 0 bleef staan.
  [Open volledig bewijsstuk](../../cases/nl/13-zero-security-advisories-and-silent-patches.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Kritieke audit van auth en repo-uitvoering: 30 dagen plaintext LAN-shell, tokens die niet ingetrokken kunnen worden & blootstelling van `SSH_AUTH_SOCK`](../../cases/nl/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Niet opgelost`
  Regel-voor-regel verificatie van de nieuwste `main` HEAD (`ca81b7b9`, 25 nov 14:49 CST) bevestigde vijf actieve beveiligings- en betrouwbaarheidsfouten: 30 dagen geldige plaintext `--lan`-shellcookies met een bypass wanneer `Origin` ontbreekt, Bearer-tokens van 30 dagen die niet ingetrokken kunnen worden, herspeelbare `?wsTicket=`-URL's, `isIPv4` dat `::1`-tunnels sloopt, en niet-vertrouwde repositories die hooks/submodules uitvoeren met overgeërfde `SSH_AUTH_SOCK` en `GITHUB_TOKEN`.
  [Open volledig bewijsstuk](../../cases/nl/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125494234614788390)

### Deel IV · Commerciële manipulatie en intimidatie van de gemeenschap

*De radar voor dagelijkse compute van $800k+ / 31,7T tokens, belangenconflicten van angel-investeerders (Vibe Kanban, Daytona), overlappende sponsorstacks, het starren van hostcredentials na 30 seconden inactiviteit, goed voor 77k sterren, het scrapen van forks door @bot en bans via .github/VOUCHED.td.*

- **#06 · [Belangenconflicten van angel-investeerders: spot met de Vibe Kanban-shutdown & overlap met Daytona](../../cases/nl/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Openbaar dossier`
  Naast codedefecten documenteren de publieke X-posts van @theo scherpe conflicten tussen zijn rol als angel-investeerder in concurrerende developer-startups en zijn exploitatie van T3 Code.
  [Open volledig bewijsstuk](../../cases/nl/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [Het bedrijfsgrootboek van $800.000+ en de dagelijkse compute-radar van 31,7 biljoen tokens](../../cases/nl/08-800k-spend-and-31t-token-radar.md)** — `📌 Openbaar dossier`
  Altijd ingeschakelde telemetrie was geen technische vergissing: ze financierde een realtime inlichtingenradar van 31,7 biljoen tokens per dag ($10,19 mln/dag aan equivalente API-uitgaven), die werd betaald met $300k+ aan gratis OpenAI early-access tokens en investeerdersbenadering.
  [Open volledig bewijsstuk](../../cases/nl/08-800k-spend-and-31t-token-radar.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [Interne `yolo merges` versus vijandigheid van buitenaf & bans via `.github/VOUCHED.td`](../../cases/nl/09-yolo-merges-vs-community-hostility.md)** — `📌 Openbaar dossier`
  Intern leverde T3 Code 500 commits per dag via geautomatiseerde agent-loops en gaf het toe dat "yolo merges breaking shit" — terwijl het naar buiten toe tegen bijdragers zei "here's my advice: Don't", gebruikers aan de schandpaal nagelde via `.github/VOUCHED.td` en melders van issues beledigde.
  [Open volledig bewijsstuk](../../cases/nl/09-yolo-merges-vs-community-hostility.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Publiek `@bot`-fork-scraping, spot met concurrenten & onderdrukking van critici](../../cases/nl/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Openbaar dossier`
  Terwijl hij rivalen bespotte omdat ze UI-patronen kopieerden, antwoordde @theo publiekelijk "Okay I'm stealing this" op de fork van een ontwikkelaar en stuurde 30 seconden later `@bot` eropaf om haar code te scrapen — terwijl hij auto-blockers inzette en volgers opriep critici te demonetiseren.
  [Open volledig bewijsstuk](../../cases/nl/10-fork-scraping-bot-and-critics-suppression.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Verbindingen in de sponsorstack, Codex-exploit met 0%-quotum & de hypocrisie van 10 accounts in `CLIProxyAPI`](../../cases/nl/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Openbaar dossier`
  T3 Code predikt naleving van de regels en weigert ingebouwde accountwisseling vanwege banrisico's, maar verweeft tegelijk de YouTube-sponsors van @theo (Clerk en Axiom) in zijn cloudstack — terwijl @theo opschepte over het misbruiken van Codex' 0%-quotumbug en een Gist publiceerde over het bundelen van 10 accounts in `CLIProxyAPI`, waarnaar T3's eigen FAQ rechtstreeks linkt.
  [Open volledig bewijsstuk](../../cases/nl/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [De 77.000-sterrenfunnel: Sterren voor hostreferenties na 30 seconden inactiviteit en een onopgeloste bug voor willekeurige repo's](../../cases/nl/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Niet opgelost`
  Zes maanden nadat hij GitHub-sterren had veroordeeld als een manier om "VC's om de tuin te leiden zodat ze investeren", heeft @theo eigenhandig een in-app melding met 30 seconden inactiviteit samengevoegd die `PUT user/starred/...` uitvoert met de GitHub-referenties van de host. Daarmee schoot de repo van 30k naar 77k sterren (met ongeveer 129 watchers), terwijl een bug waarmee je willekeurige repo's kunt sterren onopgelost bleef.
  [Open volledig bewijsstuk](../../cases/nl/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Interactieve kaart](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=nl) · [Oorspronkelijke X-post](https://x.com/realchendahuang/status/2125416210120765799)

---

## Belangrijkste visuele bewijzen

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## Draaiboek voor beveiliging en opschoning in 2 minuten

Als T3 Code al op uw machine is geïnstalleerd, vertrouw dan niet alleen op omgevingsvariabelen — AnalyticsService.ts:156 schrijft een lokale ID voordat opt-outs worden gecontroleerd, en DesktopShellEnvironment.ts laat OTEL_SDK_DISABLED weg. Combineer omgevingsflags, blokkering via OS-hosts, offline SQLite-compactie en intrekking van tokens.

- [ ] Export DO_NOT_TRACK=1 en de verouderde telemetrie-noodschakelaars, EN laat ingest.t3.codes in /etc/hosts naar een sinkhole wijzen.
- [ ] Stop T3 Code, inspecteer statev2.sqlite, voer offline VACUUM; uit of verwijder ~/.t3 volledig.
- [ ] Stop met het gebruiken van persoonlijke Google AI-/Antigravity-accounts via T3-beheerde mappen om uw enige bezwaarmogelijkheid te beschermen.
- [ ] Schakel 'Publish agent activity' uit, ontkoppel T3 Connect-machines, vraag verwijdering aan bij Clerk + relay en trek de GitHub OAuth-app van T3 Code in.
- [ ] Stel t3 up --lan nooit bloot in platte tekst zonder TLS, vermijd 30 dagen geldige niet-DPoP Bearer-tokens in CI en verwijder SSH_AUTH_SOCK / GITHUB_TOKEN uit de omgeving voordat u niet-vertrouwde repositories opent.

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

**Door de gemeenschap aanbevolen alternatieven:** Ontwikkelaars noemden Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash en Orca. Controleer vóór adoptie van elke client of telemetrie standaard uit staat, of lokale verwijdering daadwerkelijk plaatsvindt, of officiële CLI-delegatie zonder headerspoofing werkt en of end-to-end-versleuteling aan de clientzijde aanwezig is.

---

## Meldingen uit de gemeenschap en onafhankelijk commentaar

De 20 genummerde bewijsstukken (#00–#19) bevatten uitsluitend openbaar verifieerbare code, pull requests, officiële registraties en gearchiveerde openbare berichten. Bijdragen uit de gemeenschap en beweringen uit privéberichten staan hier apart, met het oog op bewijsklarheid.

- **Issue #1 · 'De zaak tegen Theo' (@opserx)** — Letterlijk gearchiveerd commentaar uit de gemeenschap dat op 25 november 2026 bij deze repository werd ingediend, aangevuld met precisienotities uit primaire bronnen over PR #42450 en PR #41237. ([Lees gearchiveerde Issue #1](../community/issue-1-the-case-against-theo.md))
- **Klachten uit privéberichten en doorlopende inzendingen** — Meerdere ontwikkelaars hebben privéverslagen gestuurd over hun ervaringen met @theo en T3 Code. Om strikte verificatienormen te handhaven, blijven privérapporten gescheiden van het primaire bewijsstukkenregister #00–#19, tenzij ze onafhankelijk worden bevestigd door openbare artefacten. Dien verifieerbare bevindingen of bevestigingen van upstream-fixes in via een Pull Request of GitHub Issue. ([Beleid voor inzending en verificatie](../../CONTRIBUTING.md))

---

## Diepgaande technische dossiers en hoofdindexen

Voor regel-voor-regel-diffs van de broncode, letterlijke SQL en volledige catalogi met kruisverwijzingen kunt u de bewaarde referentiearchieven verkennen:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 visuele bewijzen (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 primaire bronnen (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Doorlopende tracking en bijdragen

Deze repository wordt actief onderhouden. Feitelijke correcties, nieuw samengevoegde upstream-fixes met commit-/PR-bewijs of nieuw primair bewijs zijn welkom via een Pull Request of GitHub Issue — zie CONTRIBUTING.md.
