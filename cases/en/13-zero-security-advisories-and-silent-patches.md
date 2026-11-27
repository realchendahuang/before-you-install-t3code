# #13 · Zero GitHub Security Advisories, Silent High-Severity Patches & Rushed `SECURITY.md`

> While dismissing Chinese source-code auditors on X, T3 Code quietly merged high-severity vulnerability fixes — including secret-store path traversal, cross-domain token leaks, and untrusted-repo command execution — while keeping published GitHub Security Advisories at 0.

<!-- section:claim -->
## What Was Claimed

- On November 24, `@theo` dismissed Chinese-language technical audits on X as coming from *"the biggest fucking cesspit"* and insulted developers reading them ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Rushed `SECURITY.md` revisions (`PR #38812`, `PR #41942`) framed broad host access and unencrypted transport as acceptable intended boundaries.

<!-- section:evidence -->
## What the Evidence Shows

- **Zero published Security Advisories (`0`):** As of `ca81b7b9`, `pingdotgg/t3code`'s [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) page lists **zero** published advisories — giving existing desktop/server users zero formal CVE alerts or upgrade warnings.
- **High-severity vulnerabilities fixed silently:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): `ServerSecretStore` path traversal via relay `jti`/`nonce` prior to device approval.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): Cross-domain enterprise GitHub/GitLab token leaks.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) & [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): Unsandboxed desktop browser preview isolation and worktree layout command confirmation.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): Owner-only desktop Clerk token file permissions.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): ~3,000-line patch finally adding confirmation prompts before executing commands from untrusted repository configs (alongside earlier silent fixes `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Open local security defects:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (external path traversal/symlinks) and [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (Windows `externalLauncher.ts` running `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, flagged by AVG/Avast as `IDP.HELU.PSE96`) remain unmerged.
- **`SECURITY.md` narrows responsibility instead of hardening architecture:** Explicitly declares OS-wide `filesystem:read` outside workspaces, plain HTTP transport on iOS/LAN, and full host machine takeover via a compromised relay signing key as *intended design boundaries*.

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Still open:** Published GitHub Security Advisories remain at **0**; `Issue #26489` and `PR #30997` remain unfixed; `SECURITY.md` continues to classify OS-wide reads and plain HTTP as intended behavior.

<!-- section:visuals -->
## Visual Evidence

![PR #39483 silently fixing ServerSecretStore path traversal without publishing a Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 open fix for Windows Base64 PowerShell launches flagged by antivirus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md classifying OS-wide reads, iOS plain HTTP, and relay-key machine takeover as intended boundaries](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 published)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
