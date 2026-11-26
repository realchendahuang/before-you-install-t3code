# #13 · Nul gepubliceerde GitHub Security Advisories, stilzwijgend doorgevoerde patches voor ernstige kwetsbaarheden en een overhaast `SECURITY.md`

> Terwijl T3 Code op X Chinese auditors van broncode wegzette, voerde het stilzwijgend oplossingen door voor ernstige kwetsbaarheden — waaronder path traversal in de geheimenopslag, tokenlekken tussen domeinen en commando-uitvoering vanuit niet-vertrouwde repositories — terwijl het aantal gepubliceerde GitHub Security Advisories op 0 bleef staan.

<!-- section:claim -->
## Wat werd beweerd

- Op 24 november bestempelde `@theo` op X technische audits in het Chinees als afkomstig uit *"the biggest fucking cesspit"* en beledigde hij ontwikkelaars die ze lazen ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Overhaaste herzieningen van `SECURITY.md` (`PR #38812`, `PR #41942`) presenteerden brede hosttoegang en onversleuteld transport als aanvaardbare grenzen die zo bedoeld waren.

<!-- section:evidence -->
## Wat het bewijs aantoont

- **Nul gepubliceerde Security Advisories (`0`):** Op commit `ca81b7b9` vermeldt de pagina [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) van `pingdotgg/t3code` **nul** gepubliceerde adviezen — waardoor bestaande desktop- en servergebruikers geen formele CVE-meldingen of upgradewaarschuwingen krijgen.
- **Ernstige kwetsbaarheden stilzwijgend verholpen:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal in `ServerSecretStore` via de `jti`/`nonce` van de relay, vóór goedkeuring van het apparaat.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): het lekken van enterprise GitHub/GitLab-tokens tussen domeinen.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) & [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): isolatie van de niet-gesandboxte preview van de desktopbrowser en bevestiging van commando's voor de worktree-indeling.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): bestandsrechten voor het Clerk-token van de desktop, uitsluitend voor de eigenaar.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): een patch van circa 3.000 regels die eindelijk bevestigingsprompts toevoegt voordat commando's uit configuraties van niet-vertrouwde repositories worden uitgevoerd (naast eerdere stilzwijgende oplossingen `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Lokale beveiligingsgebreken die nog openstaan:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal via externe paden en symbolische koppelingen) is onopgelost, en [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (`externalLauncher.ts` op Windows, dat `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` uitvoert en door AVG/Avast wordt gemarkeerd als `IDP.HELU.PSE96`) is nog steeds niet samengevoegd.
- **`SECURITY.md` beperkt de verantwoordelijkheid in plaats van de architectuur te versterken:** OS-brede `filesystem:read` buiten workspaces, onversleuteld HTTP-verkeer op iOS/LAN, en volledige overname van de hostmachine via een gecompromitteerde ondertekeningssleutel van de relay worden expliciet bestempeld als *bewust bedoelde ontwerpgrenzen*.

<!-- section:status -->
## Upstreamstatus (`ca81b7b9`)

- **Nog open:** het aantal gepubliceerde GitHub Security Advisories blijft op **0** staan; `Issue #26489` en `PR #30997` blijven onopgelost; `SECURITY.md` blijft OS-brede leesacties en onversleuteld HTTP als bedoeld gedrag aanmerken.

<!-- section:visuals -->
## Visueel bewijs

![PR #39483 verhelpt stilzwijgend path traversal in ServerSecretStore zonder een Security Advisory te publiceren](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997: openstaande oplossing voor via Base64 gestarte PowerShell op Windows, door antivirus gemarkeerd](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md classificeert OS-brede leesacties, onversleuteld HTTP op iOS en overname van de machine via een relaysleutel als bedoelde grenzen](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 gepubliceerd)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Diepgaand technisch dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
