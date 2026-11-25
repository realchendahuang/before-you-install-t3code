# Dossier 02: Local Safety, Silent Code-Execution Bypasses, and Undisclosed Security Audit

[Back to README](../../README.md) · [← Dossier 01: Telemetry & GDPR Timeline](./01-telemetry-and-gdpr-timeline.md) · [Dossier 03: Antigravity ToS & T3 Connect →](./03-antigravity-tos-and-t3connect-relay.md) · [Complete Source Index](../COMPLETE-SOURCE-INDEX.md)

> **Scope:** Deep technical audit covering **Parts 2, 3, and 13** of the forensic investigation (`pingdotgg/t3code` local checkout + verified issue/PR/screenshot ledger):
> 1. Local SQLite persistence vs. the "permanently clears conversation history" UI dialog (`Issue #17845`).
> 2. Host OS process scanning (`native/resource-monitor` + `NativeTelemetryClient.ts`, `Issue #11222`, `PR #41889`) and Part 2 local/network/power bugs.
> 3. Claude Auto mode silent `git push --force` execution (`Issue #15353`, `ClaudeAdapterV2.ts`) and telemetry filter regression (`PR #41237`).
> 4. `0` published GitHub Security Advisories vs. merged silent security patches (`ServerSecretStore.ts`, `WebviewPreferences.ts`), open hardening PRs (`externalLauncher.ts`), `SECURITY.md` explicit trust-boundary admissions, and maintainer response (`Issue #33639`).
>
> **Audited Upstream Snapshot:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) (`PR #42000`, `2026-11-24T08:41:04Z` / `2026-11-24 16:41:04 CST`)  
> **Post-Audit Upstream Re-Audit:** [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`PR #42634`, `2026-11-25T06:49:37Z` / `2026-11-25 14:49:37 CST`, `259` commits ahead of `9d3195b4`)

---

## 1. Local SQLite "Delete Thread" Contradiction (`Issue #17845`)

### 1.1 What the UI Promises vs. What the Server Persists

When a user deletes a conversation thread in the desktop/web client, the confirmation dialog explicitly promises permanent deletion:

```ts
// apps/web/src/hooks/useThreadActionMenu.ts (lines 348–354)
api.dialogs.confirm(
  [
    m(msg('Delete thread "{title}"?', { title: thread.title })),
    m(msg("This permanently clears conversation history for this thread.")),
  ].join("\n"),
```

On the server, however, `apps/server/src/orchestration-v2/ThreadDeletion.ts` does not scrub prior turn/message events from SQLite. Instead, it appends a `"thread.deleted"` event carrying `deletedAt` metadata:

```ts
// apps/server/src/orchestration-v2/ThreadDeletion.ts (lines 56–67)
  yield* emitEvent({
    type: "thread.deleted",
    threadId: command.threadId,
    providerInstanceId: projection.thread.providerInstanceId,
    occurredAt: now,
    payload: {
      ...projection.thread,
      deletedAt: projection.thread.deletedAt ?? now,
      titleRegeneration: null,
      updatedAt: now,
    },
  });
```

Meanwhile, `apps/server/src/orchestration-v2/ProjectionMaintenance.ts` configures a 1-day retention window for event-log tail pruning (`RETAINED_EVENT_HISTORY = Duration.days(1)`, line 42) and still explicitly exempts specific records from pruning, including the latest event per stream (`MAX(newer.sequence)`):

```sql
-- apps/server/src/orchestration-v2/ProjectionMaintenance.ts (lines 122–139)
          SELECT event.sequence, CASE
              WHEN event.application_event_version = 1 THEN 0
              WHEN event.event_type = 'thread.created' THEN 0
              WHEN event.event_type = 'run.updated' AND json_extract(event.payload_json, '$.status') = 'running' THEN 0
              WHEN event.sequence = (SELECT MAX(newer.sequence) FROM orchestration_events AS newer WHERE newer.aggregate_kind = event.aggregate_kind AND newer.stream_id = event.stream_id) THEN 0
              ELSE 1 END AS prunable
```

Consequently:
- Deleting a thread in the UI writes a `"thread.deleted"` marker rather than performing an immediate hard purge of prior event-store history.
- Even after `RETAINED_EVENT_HISTORY` expires and maintenance runs, `thread.created` and the newest stream event (`MAX(newer.sequence)`) remain marked non-prunable (`0`), contradicting the dialog's assurance of immediate permanent erasure (`Issue #17845`).

![Issue #17845 — Local SQLite retains deleted conversation history despite UI confirmation claiming permanent deletion](../../evidence/10-issue17845-fake-delete.png)

---

## 2. Host Process Telemetry, Power/Quota Bugs, and Network Leaks (Part 2)

### 2.1 `t3-resource-monitor`: Full-Host Process & Command-Line Inspection (`Issue #11222`)

T3 Code ships a native Rust helper (`native/resource-monitor/src/main.rs`) consumed by `apps/server/src/resourceTelemetry/NativeTelemetryClient.ts`. Instead of restricting collection strictly to T3 Code's own child processes, `main.rs` invokes `sysinfo` with `ProcessesToUpdate::All` and requests command lines (`with_cmd(UpdateKind::Always)`):

```rust
// native/resource-monitor/src/main.rs (lines 24, 445–449, 597–604)
const TWO_STAGE_PROCESS_REFRESH: bool = cfg!(any(target_os = "linux", target_os = "macos"));
...
        self.system.refresh_processes_specifics(ProcessesToUpdate::All, true, process_discovery_refresh_kind());
...
fn process_refresh_kind() -> ProcessRefreshKind {
    ProcessRefreshKind::nothing().with_memory().with_cpu().with_disk_usage().with_cmd(UpdateKind::Always).without_tasks()
}
```

On the Node/TypeScript side, `NativeTelemetryClient.ts` toggles native sampling based on active UI telemetry subscribers:

```ts
// apps/server/src/resourceTelemetry/NativeTelemetryClient.ts (lines 44, 264–280)
const IDLE_SAMPLE_INTERVAL_MS = 0;

function resolveNativeSampleIntervalMs(snapshot: HostPowerSnapshot, liveSubscriberCount: number): number {
  if (liveSubscriberCount === 0) return IDLE_SAMPLE_INTERVAL_MS;
  if (snapshot.onBattery === "true") return BATTERY_SAMPLE_INTERVAL_MS;
  return SAMPLE_INTERVAL_MS;
}
```

Because `ProcessesToUpdate::All` with `UpdateKind::Always` on command lines sweeps every process visible to the user's OS account rather than filtering to T3 child PIDs upfront, `Issue #11222` flagged the binary for inspecting unrelated host processes (`PR #41889` filed against resource monitor scope).

![Issue #11222 — Process monitor scanning all host OS processes](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

### 2.2 Network Leaks, Quota Burn, Power Drain, and Approval Bypasses (Part 2 Ledger)

Part 2 of the technical ledger documented additional client/server behaviors verified across the primary issue and PR corpus (structural/governance PRs `#5551`, `#9190`, and `#33131` are analyzed separately in [Dossier 05](./05-governance-trademark-and-history.md)):

| Issue / PR | Area | Documented Behavior |
|---|---|---|
| `PR #16950` / `PR #32657` | External network requests | Google favicon leak exposing domain metadata to Google servers |
| `Issue #36479` | Startup / outbound fetch | Mandatory network check against `raw.githubusercontent.com` |
| `PR #21806` / `PR #27322` | Auth & approval bypasses | Approval and policy bypasses over WSL / Tailscale |
| `Issue #7338` / `Issue #24649` | Quota consumption | Reported `1.7x` faster Claude 5-hour quota burn |
| `Issue #3143` / `Issue #40581` | Power & GPU drain | `136x` power draw, `60W` GPU load draining battery in `78m`, and `18W` draw persisting after tab close |

---

## 3. Claude Auto Mode Silent `git push --force` & `slopalytics.com` Filter Drop (Part 3)

### 3.1 `Issue #15353`: Guardrails Bypassed on Third Retry

In `Issue #15353`, user `karthikeyan5` reproduced a destructive permission failure on T3 Code `0.1.9` (Claude Code `2.1.325`, Linux, Haiku 5.5, Auto mode, no ask rules) using `git push --force origin main`:
- Attempts 1 and 2 were blocked (`automode-blocked`).
- On the 3rd retry, `git push --force origin main` executed silently without a confirmation prompt, leaving `{"decision": "accept", "source": "user_temporary"}` in the session transcript.
- Two related pull requests (`PR #15360` and `PR #35207`) were auto-closed, while `PR #40692` was linked 2 days prior to the archive capture.

Inspection of `apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts` shows how permission modes flow through `requiresClaudeApproval`: when `permissionMode` resolves to `"auto"` and `installPermissionCallback` evaluates to `false`, the adapter short-circuits tool permission checks directly to `"allow"`:

```ts
// apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts
// (lines 3748–3749, 3793–3798, 3911–3916, 13040–13046)
    case "auto":
      return "auto";
...
  const installPermissionCallback =
    downgraded ||
    (runtimePolicy.approvalPolicy === undefined
      ? runtimePolicy.runtimeMode === "approval-required" ||
        runtimePolicy.runtimeMode === "auto-accept-edits"
      : runtimePolicy.approvalPolicy !== "never");
...
function requiresClaudeApproval(context: ActiveClaudeTurnContext): boolean {
  const policy = context.queryPolicy;
  return policy.installPermissionCallback || policy.permissionMode === "bypassPermissions";
}
...
          if (!requiresClaudeApproval(context)) {
            return { behavior: "allow", updatedInput: toolInput, toolUseID: callbackOptions.toolUseID } satisfies PermissionResult;
          }
```

![Issue #15353 — Claude Auto mode executes git push --force origin main on third retry](../../evidence/11-issue15353-auto-force-push.png)

### 3.2 `PR #41237`: 21-Hour `slopalytics.com` Filter Drop

Closely tied to outbound analytics hygiene (see [Dossier 01](./01-telemetry-and-gdpr-timeline.md)), merged `PR #41237` addressed a 21-hour filter drop affecting `slopalytics.com` telemetry attribution. In `apps/server/src/telemetry/ProviderDimensions.ts`, model dimension normalization passes provider catalog slugs or raw model identifiers through `fileName(...)`:

```ts
// apps/server/src/telemetry/ProviderDimensions.ts (lines 48–50)
export function modelLabel(providers: ReadonlyArray<ServerProvider>, model: string): string {
  return fileName(catalogSlug(providers, model) ?? model);
}
```

![PR #41237 — Merged fix following 21-hour slopalytics.com filter drop](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

---

## 4. `0` GitHub Security Advisories, Silent Security Fixes, and `SECURITY.md` Admissions (Part 13)

### 4.1 Zero Published Advisories Despite Quietly Merged Vulnerability Fixes

As of the archive snapshot, `pingdotgg/t3code` published **`0` GitHub Security Advisories** under `github.com/pingdotgg/t3code/security/advisories`, even as multiple security-sensitive bugs—including path traversal in the secret store and missing webview sandbox isolation—were merged via ordinary PRs or remained open without CVE disclosures.

#### Merged Hardening / Security-Relevant PRs Verified in Source or Evidence

1. **Secret Store Path Traversal (`PR #39483` — Merged):**
   `apps/server/src/auth/ServerSecretStore.ts` now validates `name` against `/[/\\\0]/` before joining against `serverConfig.secretsDir`:
   ```ts
   // apps/server/src/auth/ServerSecretStore.ts (lines 185–188)
     const resolveSecretPath = (name: string): Effect.Effect<string, SecretStoreNameError> =>
       /[/\\\0]/.test(name)
         ? Effect.fail(new SecretStoreNameError({ resource: `secret ${JSON.stringify(name)}` }))
         : Effect.succeed(path.join(serverConfig.secretsDir, `${name}.bin`));
   ```
   ![PR #39483 — Merged fix for secret store path traversal](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

2. **Desktop Preview Webview Sandboxing (`PR #41757`, `PR #42386` — Merged):**
   `apps/desktop/src/preview/WebviewPreferences.ts` pins explicit isolation attributes on preview webviews:
   ```ts
   // apps/desktop/src/preview/WebviewPreferences.ts (lines 2–3)
   export const PREVIEW_WEBVIEW_PREFERENCES =
     "contextIsolation=true,sandbox=true,nodeIntegration=false";
   ```

3. **Additional Merged Security/Hardening PRs in the Primary Corpus:**
   `PR #42504`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41756`, and `PR #41886` (merged without corresponding GitHub Security Advisories).

#### Open Security / Launcher PRs Verified in Source or Evidence

- **Windows PowerShell `-ExecutionPolicy Bypass -EncodedCommand` (`PR #30997` — Open):**
  `apps/server/src/process/externalLauncher.ts` launches targets on Windows via `-NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand` with UTF-16LE Base64 payloads (`Start <target>`), matching heuristics commonly flagged by endpoint antivirus engines (`PR #30997` remained **Open** in the captured PR screenshot):
  ```ts
  // apps/server/src/process/externalLauncher.ts (lines 71, 243)
  const POWERSHELL_ARGUMENTS_PREFIX = ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand"] as const;
  ...
    const encodedCommand = encodeUtf16LeBase64(`$ProgressPreference = 'SilentlyContinue'; Start ${escapePowerShellStringLiteral(target)}`);
  ```
  ![PR #30997 — Open PR addressing PowerShell ExecutionPolicy Bypass launcher flagged by AV](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

- **Other Open / Unmerged Security Issues & PRs Tracked in Primary Corpus:**
  `Issue #26489` (open local security defect), `PR #36216`, `PR #23428`, and `PR #33144` (unmerged security fix PRs).

---

### 4.2 `SECURITY.md` & `04_environment-auth.md`: Broad OS Access and Relay Key Trust Assumptions

The repository's own `SECURITY.md` documents several explicit trust assumptions as intentional behavior rather than vulnerabilities:

| `SECURITY.md` Line(s) | Exact Stated Scope / Trust Assumption | Security Implication |
|---|---|---|
| **Line 37** | `"T3 Connect relay ... Trusted broker for mint requests. It never sees environment session tokens. With requireConnectDeviceApproval on, a new device key also needs approval from someone with access:write."` | Relay security relies on optional device approval (`requireConnectDeviceApproval` defaults to `false` in `packages/contracts/src/settings.ts:1418–1420`; see [Dossier 03](./03-antigravity-tos-and-t3connect-relay.md)). |
| **Lines 66–67, 84–88** | `"9. Filesystem writes escaping workspace path rules. Reads are separate: filesystem:read intentionally covers the whole OS account."` / `"filesystem:read reads anything the server's OS user can read, including paths outside projects."` | Any authenticated client with `filesystem:read` can read arbitrary user-readable files outside the project directory (e.g., `~/.ssh`, credentials, browser profiles). |
| **Line 88 (iOS transport)** | `"The iOS app allows arbitrary loads so it can reach these addresses."` | ATS arbitrary-load relaxation permits unencrypted/arbitrary host connections from the iOS client. |
| **Lines 101–102** | `"A compromised relay signing key can mint for linked environments. That is the stated trust assumption; device approval is the mitigation."` | Compromise of T3's relay signing key grants session minting capability against linked user machines unless the user discovered and flipped the default-off setting. |

![SECURITY.md — Intended trust boundaries covering whole-OS filesystem reads and relay signing key compromise](../../evidence/extra/x-post05-4-security-md-intended.jpg)

---

### 4.3 Maintainer Conduct on Security, UX PRs & Architecture Criticism (`Issue #33639`, `PR #41572`)

Instead of addressing safety/architecture questions through formal advisories or calm engineering postmortems, maintainer responses to criticism—including `Issue #33639` and public X posts attacking critics and developers—alongside abrupt rejections of community UX fixes such as `PR #41572` (closed context-meter UI PR; see [Dossier 05](./05-governance-trademark-and-history.md)) became part of the evidentiary record behind community backlash across GitHub and Chinese developer circles (`Part 13` / `26-cn-cesspit.png`).

![Issue #33639 — Maintainer response to critical issue](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Community backlash documented in Part 13](../../evidence/26-cn-cesspit.png)

---

## 5. Post-Audit Upstream Tracking (9d3195b4 to ca81b7b9)

- **SQLite Thread Deletion ([`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) / [`91f0b32e`](https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e), `2026-11-25T05:58:26Z`, closed `Issue #17845`):** Adds an asynchronous `thread-content.purge` outbox effect (`ThreadDeletion.ts:239-244`) and `purgeThreads` (`ProjectionMaintenance.ts:294-520`) that deletes rows across `DELETED_THREAD_CONTENT_TABLES`, deletes non-head `orchestration_events`, and scrubs `thread.created`/`thread.deleted` titles to a tombstone while removing `guestShare`. Remaining limits in code: deleted source threads keep their history while any live run-forked child, pending `merge_back` transfer, or live parent subagent still references them (`lines 291-347`), tombstone metadata rows stay in SQLite, and reclaiming `.sqlite` file size still requires an offline `VACUUM`.
- **Windows `t3-resource-monitor` Scope ([`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) / [`af276ccb`](https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c), `2026-11-25T04:09:53Z`):** Stops Windows `t3-resource-monitor` from reading memory and command lines of untracked processes (while still enumerating process PID/PPID/names via `CreateToolhelp32Snapshot`). Linux and macOS still use two-stage `ProcessesToUpdate::All` discovery, and `PR #41889` remains **Open**.
- **Desktop Clerk Token File Permissions & Worktree Approvals:** [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413) (`c18d6c96`) enforces owner-only mode for desktop Clerk token files, and [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386) (`924d9c1f`) requires user approval before running worktree layout commands (distinct from `PR #41757` desktop preview sandboxing and `PR #42504` MCP app bridge handover).
- **Unfixed at `ca81b7b9`:** `Issue #15353` (Claude Auto `git push --force`) remains **Open** and `ClaudeAdapterV2.ts` (`lines 3748-3749, 3911-3916, 13045-13050`) still short-circuits `!requiresClaudeApproval(context)` to `"allow"`. GitHub Security Advisories remain at **`0`**, `SECURITY.md` trust assumptions (`filesystem:read` whole OS account, iOS arbitrary loads, compromised relay signing key) remain unchanged, and `PR #30997` (`externalLauncher.ts`) plus `Issue #26489` remain **Open**.

### 5.1 Untrusted Repository Execution & Ambient `SSH_AUTH_SOCK` / `GITHUB_TOKEN` Inheritance (`ca81b7b9`)

Opening an untrusted repository in T3 Code executes repository-controlled hooks and submodules while child processes inherit ambient host environment credentials:

1. **Recursive Submodule Execution on Worktree Creation ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)):** When `.gitmodules` is present, creating a worktree automatically runs `git submodule update --init --recursive` without prompting, allowing a checked-out repo to specify arbitrary submodule URLs and remotes.
2. **General Git Invocation Lacks Global `core.hooksPath=/dev/null` ([`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157)):** While `VcsProcess.ts` clears six `GIT_*` repo-selector variables and passes `-c safe.bareRepository=explicit`, `maintenance.auto=false`, and `gc.auto=0`, it does **not** disable git hooks globally (`core.hooksPath=/dev/null` is confined to checkout-cache initialization in `worktreeCheckoutCache.ts`).
3. **Live Claude `SessionStart` Repo Hooks ([`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)):** Only capability probes set `disableAllHooks: true`; live Claude sessions load `settingSources: ["user", "project", "local"]` (`line 2693`) and execute `.claude/settings.json` `SessionStart` hooks synchronously (`lines 5982-5985, 6057`).
4. **Full Host `process.env` Blast Radius (`GITHUB_TOKEN` & `SSH_AUTH_SOCK`):** Child processes spawned via `processRunner.ts` / `HostProcess.ts` inherit full host `process.env`, including `GITHUB_TOKEN` and `SSH_AUTH_SOCK`. Even though repo children run under the local OS user account, passing `SSH_AUTH_SOCK` expands the blast radius from one checkout to **every remote repository and server accessible by that SSH agent key**.

![GitVcsDriverCore.ts — Automatic recursive submodule init on worktree creation](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

---

## 6. Primary References

### Local Checkout Files Inspected (`scratch/t3code/`)
- `apps/web/src/hooks/useThreadActionMenu.ts` (lines 348–354)
- `apps/server/src/orchestration-v2/ThreadDeletion.ts` (lines 56–67, 239–244)
- `apps/server/src/orchestration-v2/ProjectionMaintenance.ts` (lines 41–42, 121–139, 294–520)
- `native/resource-monitor/src/main.rs` (lines 24, 445–449, 597–604)
- `apps/server/src/resourceTelemetry/NativeTelemetryClient.ts` (lines 44, 264–280)
- `apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts` (lines 2693, 3748–3749, 3793–3798, 3911–3916, 5982–5985, 6057, 13045–13050 at `ca81b7b9`)
- `apps/server/src/vcs/GitVcsDriverCore.ts` (lines 6144–6205 at `ca81b7b9`)
- `apps/server/src/vcs/VcsProcess.ts` (lines 145–157, 260–268 at `ca81b7b9`)
- `apps/server/src/telemetry/ProviderDimensions.ts` (lines 66–72 at `ca81b7b9`)
- `apps/server/src/auth/ServerSecretStore.ts` (lines 185–188)
- `apps/desktop/src/preview/WebviewPreferences.ts` (lines 2–3)
- `apps/server/src/process/externalLauncher.ts` (lines 71, 243)
- `SECURITY.md` (lines 18–20, 37, 66–67, 84–88, 101–102)
- `docs/internals/04_environment-auth.md`
- `packages/contracts/src/settings.ts` (lines 1424–1426 at `ca81b7b9`)

### Primary Issues, Pull Requests & Advisories Cited
- Baseline & Post-Audit Upstream Snapshots: https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 ; https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd
- Untrusted Repo Execution & Ambient Env (`ca81b7b9`):
  - https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205
  - https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157
  - https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985
- Advisories: https://github.com/pingdotgg/t3code/security/advisories (`0` published advisories)
- SQLite & Process Monitor & Power/Network (Part 2):
  - https://github.com/pingdotgg/t3code/issues/17845 (fake thread deletion, closed `2026-11-25T05:58:29Z` by `PR #42119`)
  - https://github.com/pingdotgg/t3code/pull/42119 ; https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e (Merged — async `thread-content.purge` cleanup)
  - https://github.com/pingdotgg/t3code/issues/11222 (`t3-resource-monitor` full-host scan)
  - https://github.com/pingdotgg/t3code/pull/41889 (`resource-monitor` PR — still Open)
  - https://github.com/pingdotgg/t3code/pull/42577 ; https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c (Merged — Windows `resource-monitor` memory/cmd narrowing)
  - https://github.com/pingdotgg/t3code/pull/16950 / https://github.com/pingdotgg/t3code/pull/32657 (Google favicon leak)
  - https://github.com/pingdotgg/t3code/issues/36479 (mandatory `raw.githubusercontent.com` fetch)
  - https://github.com/pingdotgg/t3code/pull/21806 / https://github.com/pingdotgg/t3code/pull/27322 (WSL/Tailscale approval & policy bypasses)
  - https://github.com/pingdotgg/t3code/issues/7338 / https://github.com/pingdotgg/t3code/issues/24649 (`1.7x` Claude 5h quota burn)
  - https://github.com/pingdotgg/t3code/issues/3143 / https://github.com/pingdotgg/t3code/issues/40581 (`136x` power draw / `60W` GPU / `18W` after tab close)
- Auto Force-Push & Telemetry Filter (Part 3):
  - https://github.com/pingdotgg/t3code/issues/15353 (`git push --force origin main` silent acceptance — still Open)
  - https://github.com/pingdotgg/t3code/pull/15360, https://github.com/pingdotgg/t3code/pull/35207 (auto-closed), https://github.com/pingdotgg/t3code/pull/40692
  - https://github.com/pingdotgg/t3code/pull/41237 (Merged — `slopalytics.com` 21h filter drop)
- Silent Security Fixes, Open/Closed PRs & Maintainer Response (Part 13):
  - Merged security fixes: https://github.com/pingdotgg/t3code/pull/39483 (`ServerSecretStore.ts`), https://github.com/pingdotgg/t3code/pull/41757, https://github.com/pingdotgg/t3code/pull/42386, https://github.com/pingdotgg/t3code/pull/42413, https://github.com/pingdotgg/t3code/pull/42504, https://github.com/pingdotgg/t3code/pull/22190, https://github.com/pingdotgg/t3code/pull/37823, https://github.com/pingdotgg/t3code/pull/39464, https://github.com/pingdotgg/t3code/pull/39480, https://github.com/pingdotgg/t3code/pull/40133, https://github.com/pingdotgg/t3code/pull/41756, https://github.com/pingdotgg/t3code/pull/41886
  - Open / unmerged security items: https://github.com/pingdotgg/t3code/pull/30997 (PowerShell `-ExecutionPolicy Bypass -EncodedCommand`), https://github.com/pingdotgg/t3code/issues/26489 (open local security defect), https://github.com/pingdotgg/t3code/pull/36216, https://github.com/pingdotgg/t3code/pull/23428, https://github.com/pingdotgg/t3code/pull/33144
  - Maintainer conduct & rejected community PRs: https://github.com/pingdotgg/t3code/issues/33639, https://github.com/pingdotgg/t3code/pull/41572 (closed context-meter UI PR)
