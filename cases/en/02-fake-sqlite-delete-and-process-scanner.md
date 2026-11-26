# #02 · Fake SQLite Thread Deletion (41.6 GB Bloat) & 5-Second Full-OS Process Scanning

> Clicking "permanently delete" left full conversation history intact inside `statev2.sqlite` (bloating local disks to 41.6 GB), while a background Rust monitor scanned every OS process and full command line every 5 seconds with zero opt-out.

<!-- section:claim -->
## What Was Claimed

- The sidebar deletion confirmation dialog (`useThreadActionMenu.ts`) explicitly told users: *"This permanently clears conversation history for this thread."*
- T3 Code was marketed as a clean, fast local coding workspace.

<!-- section:evidence -->
## What the Evidence Shows

- **Fake permanent deletion (`Issue #17845`, `#28903`):** At baseline `9d3195b4`, deleting a thread only appended a `"thread.deleted"` event to `statev2.sqlite` while leaving prior messages, tool outputs, and reasoning traces intact on disk. Users documented `statev2.sqlite` ballooning to **25.9 GB** in 3 weeks (90% "deleted" threads), **41.6 GB** in 6 weeks, and **33 GB** in 7 weeks.
- **Full-machine process & command-line scanning (`Issue #11222`, `PR #41889`):** Background helper `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) ran `ProcessesToUpdate::All` with `with_cmd(UpdateKind::Always)` every 5 seconds even with diagnostics closed — holding 280–300 persistent handles across 440+ unrelated apps/games on Windows. On November 24, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) confirmed diagnostics captured **full process command lines** (often carrying plaintext API keys, database passwords, and tokens) into snapshots and telemetry.
- **Corporate hostname leaks & mandatory startup fetch:** Frontend favicon requests leaked internal hostnames (such as `devbox.localdomain`) to Google's favicon service (`PR #16950`, `PR #32657`), while server startup unconditionally fetched compatibility manifests from `raw.githubusercontent.com` with no opt-out (`Issue #36479`).
- **Severe quota burn & power bugs:** Driving Claude via Agent SDK burned 5-hour quotas at **1.7x** normal speed (`Issue #7338`, `Issue #24649`, 81 comments), while GPU regressions drew up to **136x** comparable Electron power — pinning a MacBook GPU at **60W** (78-minute battery drain) and **18W** after closing the web tab (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Partially patched:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) added asynchronous `thread-content.purge` (closing `#17845`), and [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) narrowed Windows process-monitor reads.
- **Still open:** Deleted source threads still keep history while referenced by live forks, pending `merge_back`, or live subagents; tombstone rows stay in SQLite and reclaiming disk space still requires offline `VACUUM`; Linux and macOS keep `ProcessesToUpdate::All` discovery, and `PR #41889` remains open.

<!-- section:visuals -->
## Visual Evidence

![Issue #17845 documenting permanently deleted threads bloating statev2.sqlite to tens of gigabytes](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 documenting t3-resource-monitor scanning every OS process every 5 seconds](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
