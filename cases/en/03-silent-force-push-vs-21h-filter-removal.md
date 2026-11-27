# #03 · 52-Day Silent `git push --force` vs. 21-Hour Removal of Model Privacy Filter

> For 52+ days, T3 Code left a bug open where Claude Auto mode silently approved `git push --force origin main` without prompting — yet needed only 21 hours to remove a privacy whitelist so private models appeared on @theo's public leaderboard.

<!-- section:claim -->
## What Was Claimed

- Claude Auto mode is designed to escalate high-risk destructive actions (such as force-pushing `main`) for explicit human approval.
- Telemetry was portrayed as privacy-safe aggregate metrics.

<!-- section:evidence -->
## What the Evidence Shows

- **52+ days unfixed — silent `git push --force` (`Issue #15353`):** In `ClaudeAdapterV2.ts`, Auto mode short-circuited `!requiresClaudeApproval(context)` straight to `"allow"`. When Claude's own safety classifier blocked `git push --force origin main` twice and escalated the third attempt for human confirmation, T3 Code silently approved it with zero UI prompt and logged `"source": "user_temporary"`. Two community fix PRs (`#15360`, `#35207`) sat unreviewed until bot auto-close; `#40692` remained unmerged.
- **21 hours to strip a privacy whitelist (`Issue #40948` → `PR #41237`):** On November 22, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) noted that newer models were missing from `@theo`'s public leaderboard [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) because `PR #29001` enforced a model whitelist. Within **21 hours**, [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) merged under `@theo`'s account noting Theo explicitly requested removing the filter — causing private local/enterprise names like `ollama/acme-internal` and `acme-azure-deployment` to be transmitted verbatim to analytics.

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Partially changed / core safety bug still open:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) later masked non-catalog models as `custom:<driver>` (catalog/vendor slugs still report behind custom endpoints). **Issue #15353 (silent `git push --force` in Auto mode) remains open and unfixed at `ca81b7b9`.**

<!-- section:visuals -->
## Visual Evidence

![Issue #15353 open 52+ days showing Claude Auto mode silently approving git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 merged 21 hours after Issue #40948 removing the model privacy filter for slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Reproduction comment `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Unmerged community fixes: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
