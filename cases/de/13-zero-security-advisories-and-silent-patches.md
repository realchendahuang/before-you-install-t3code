# #13 · Null GitHub Security Advisories, stille Patches für Schwachstellen hoher Schwere und überstürzte `SECURITY.md`

> Während `@theo` auf X chinesische Quellcode-Prüfer abtat, führte T3 Code stillschweigend Fixes für Schwachstellen hoher Schwere zusammen – darunter Path Traversal im Secret-Store, domänenübergreifende Token-Lecks und Befehlsausführung aus nicht vertrauenswürdigen Repositories – und beließ die veröffentlichten GitHub Security Advisories bei 0.

<!-- section:claim -->
## Was behauptet wurde

- Am 24. November tat `@theo` chinesischsprachige technische Audits auf X als Produkt *"the biggest fucking cesspit"* ab und beleidigte Entwickler, die sie lasen ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Überstürzte `SECURITY.md`-Überarbeitungen (`PR #38812`, `PR #41942`) stellten weitreichenden Host-Zugriff und unverschlüsselten Transport als akzeptable, beabsichtigte Grenzen dar.

<!-- section:evidence -->
## Was die Belege zeigen

- **Null veröffentlichte Security Advisories (`0`):** Stand `ca81b7b9` listet die Seite [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) von `pingdotgg/t3code` **null** veröffentlichte Advisories – bestehende Desktop- und Server-Nutzer erhalten damit keinerlei formale CVE-Warnungen oder Upgrade-Hinweise.
- **Schwachstellen hoher Schwere stillschweigend behoben:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): Path Traversal in `ServerSecretStore` über Relay-`jti`/`nonce` vor der Gerätefreigabe.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): Domänenübergreifende Lecks von Enterprise-GitHub-/GitLab-Tokens.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) & [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): Isolation der ungesandboxeten Desktop-Browser-Vorschau und Bestätigung von Befehlen im Worktree-Layout.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): Dateiberechtigungen für die Clerk-Token-Datei des Desktops nur für den Eigentümer.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): rund 3.000 Zeilen umfassender Patch, der endlich Bestätigungsabfragen vor der Ausführung von Befehlen aus nicht vertrauenswürdigen Repository-Konfigurationen einfügt (neben früheren stillen Fixes `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Offene lokale Sicherheitsmängel:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (externes Path Traversal/Symlinks) und [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (Windows-`externalLauncher.ts`, das `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` ausführt und von AVG/Avast als `IDP.HELU.PSE96` markiert wird) sind weiterhin nicht gemergt.
- **`SECURITY.md` verengt die Verantwortung, statt die Architektur zu härten:** Die Datei erklärt ausdrücklich systemweite `filesystem:read`-Zugriffe außerhalb von Workspaces, unverschlüsselten HTTP-Transport unter iOS/im LAN und die vollständige Übernahme des Host-Rechners über einen kompromittierten Relay-Signaturschlüssel zu *beabsichtigten Design-Grenzen*.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Weiterhin offen:** Veröffentlichte GitHub Security Advisories stehen weiterhin bei **0**; `Issue #26489` und `PR #30997` bleiben ungefixt; `SECURITY.md` klassifiziert systemweite Lesezugriffe und unverschlüsseltes HTTP weiterhin als beabsichtigtes Verhalten.

<!-- section:visuals -->
## Visuelle Belege

![PR #39483 behebt stillschweigend Path Traversal in ServerSecretStore, ohne ein Security Advisory zu veröffentlichen](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997: offener Fix für Windows-Base64-PowerShell-Starts, die von Antivirensoftware markiert werden](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md stuft systemweite Lesezugriffe, unverschlüsseltes HTTP unter iOS und die Übernahme des Rechners über den Relay-Schlüssel als beabsichtigte Grenzen ein](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 veröffentlicht)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
