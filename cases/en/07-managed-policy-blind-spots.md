# #07 · The Managed Policy Contradiction: Four Documented Telemetry Blind Spots

> @theo claimed T3 Code had the "best corporate managed policy system" making it "trivial to turn off all telemetry" — directly contradicted by T3 Code's own `docs/user/telemetry.md` and `docs/user/managed-policy.md`.

<!-- section:claim -->
## What Was Claimed

- On November 24 at 19:13 CST, `@theo` brushed off missing user opt-out toggles: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Half an hour later, he added that conversation data *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## What the Evidence Shows

T3 Code's own official documentation ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) and [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) documents four concrete blind spots:

- **Admin-only deployment (zero personal UI switch):** Desktop users have no Settings toggle. Managed Policy requires MDM/GPO or admin-protected OS paths (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, or `/etc/t3code/policy.json`), completely inaccessible to non-admin desktop users.
- **Hosted Web App (`app.t3.codes`) ignores policy:** The browser app ignores server environment variables and Managed Policy, emits connection traces when built with tracing, and *"has no relay tracing toggle."*
- **Mobile apps sit outside server policy:** Official docs confirm server env vars and Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` ignores opt-outs:** Uploads project titles, thread titles, model names, and live status to T3 Connect — and docs explicitly state: *"The telemetry opt-out does not disable it."* Additionally, failed Axiom spans/crash logs *"can quote a value the app was handling"*, and `Agent feedback` can attach up to 16 KB of conversation messages.

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Still open:** Overnight [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) added an in-app mobile trace toggle, but Managed Policy still cannot disable mobile tracing, hosted `app.t3.codes` still has zero opt-out toggle, `Publish agent activity` still ignores telemetry opt-outs, and no desktop Settings UI toggle exists.

<!-- section:visuals -->
## Visual Evidence

![Official docs/user/telemetry.md confirming app.t3.codes has no toggle, mobile ignores Managed Policy, and agent activity ignores opt-outs](../../evidence/05-telemetry-cant-disable.png)

![Official docs/user/managed-policy.md listing admin-protected system paths across macOS, Windows, and Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo's Nov 24 post claiming Managed Policy makes turning off all telemetry trivial](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` Managed Policy claim (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
