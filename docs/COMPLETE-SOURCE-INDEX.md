# Complete Primary Source Index

[Back to README](../README.md) · [Contributing](../CONTRIBUTING.md)

> **Scope & Verification Policy**  
> This index catalogs every direct primary URL referenced across the root [README.md](../README.md), all six technical dossiers ([`docs/dossiers/`](./dossiers/01-telemetry-and-gdpr-timeline.md)), the 18-part primary-evidence archive (`canonical_refs.txt`, resolved X shortlinks, `all_18_posts.txt`, and `missing_posts_full.json`), and the Nov 25 `9d3195b4` → `ca81b7b9` upstream re-audit. All shortened X redirect links have been expanded to their canonical `https://` destinations. Zero shortened redirect URLs appear in this repository.

---

## 1. Origin Posts & 18-Part Primary X Publication Index

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-001` | Origin 1 | X Post (2026-11-24 10:49 CST) | https://x.com/realchendahuang/status/2125059292919394654 | T3 Code homepage GitHub link labeled "steal our code" despite MIT license (`t3.codes`). |
| `SRC-002` | Origin 2 | X Post (2026-11-24 11:03 CST) | https://x.com/realchendahuang/status/2125062675147448475 | MIT fork naming dispute, "Chinese knockoff" / "Temu3 Code" posts, GitHub ban threat, and double standard vs. trillion-dollar US labs. |
| `SRC-003` | Part 1 | X Post (2026-11-24 17:04 CST) | https://x.com/realchendahuang/status/2125153472450527440 | Default PostHog telemetry (PR #174), deleted homepage "No telemetry" pledge (`3bdaa6e1`), `ingest.t3.codes`, unsalted `~/.codex/auth.json` + `~/.claude.json` hashing (`Identify.ts`), 4 rejected opt-out PRs. |
| `SRC-004` | Part 2 | X Reply (2026-11-24 17:31 CST) | https://x.com/realchendahuang/status/2125160473176023486 | Fake SQLite deletion (`#17845`/`#28903`), 5s `t3-resource-monitor` scanner (`#11222`, PR `#41889`), favicon hostname leaks, 1.7x quota burn, 136x power draw, Plan mode removal (`#5551`/`#33131`), `CONTRIBUTING.md` & `.github/VOUCHED.td` bans. |
| `SRC-005` | Part 3 | X Post (2026-11-24 20:16 CST) | https://x.com/realchendahuang/status/2125201882687881378 | Claude Auto mode silent `git push --force` (`#15353`), 21h removal of private model filter for `slopalytics.com` (`#41237`), 0 GitHub Security Advisories despite silent security patches, Issue `#33639` user insults. |
| `SRC-006` | Part 4 | X Post (2026-11-24 21:02 CST) | https://x.com/realchendahuang/status/2125213397507858657 | Google Antigravity FAQ guarantee vs. `antigravityUsageLimits.ts` `v1internal` header spoofing, fake `SSH_CONNECTION` in `antigravityAuthSupport.ts`, `#40713`, `#41536` 3-minute ban, `#41973` cross-account leak, PR `#26876` Zed spoof. |
| `SRC-007` | Part 5 | X Post (2026-11-24 21:21 CST) | https://x.com/realchendahuang/status/2125218189596676555 | T3 Connect missing E2E encryption, Cloudflare Tunnel (`ManagedEndpointProvider.ts`), $25k/mo OVH Caddy gateway (`#32945`), default-off device approval, `SECURITY.md` trust assumptions, `#32098`. |
| `SRC-008` | Community | X Post (2026-11-24) | https://x.com/realchendahuang/status/2125244977878036713 | Community-discussed client alternatives thread (Mirasim, Paseo, Paradev, Cloudroom). |
| `SRC-009` | Part 6 | X Post (2026-11-25 08:27 CST) | https://x.com/realchendahuang/status/2125385742243520653 | Angel-investor conflicts: Vibe Kanban investment/shutdown mockery and Daytona vs. paid T3 cloud-sandbox overlap. |
| `SRC-010` | Part 7 | X Reply (2026-11-25 08:50 CST) | https://x.com/realchendahuang/status/2125391659492081947 | Rebuttal to `@theo`'s Managed Policy & "never touches our servers" claims using `docs/user/telemetry.md` and `docs/user/managed-policy.md`. |
| `SRC-011` | Part 8 | X Post (2026-11-25 08:53 CST) | https://x.com/realchendahuang/status/2125392410763239723 | $800k+ spend on free client, 31.7T tokens / $10.19M daily dashboard, 98.5% lab-share radar, $300k+ free OpenAI early-access tokens, investor outreach. |
| `SRC-012` | Part 9 | X Post (2026-11-25 08:55 CST) | https://x.com/realchendahuang/status/2125392916369871309 | 500 commits/day, 700 agents, `yolo merges` ("nukes my machine = free content") vs. follower-gatekeeping PRs, `/btw` takeaway threat, screenshot-over-PR remarks. |
| `SRC-013` | Part 10 | X Reply (2026-11-25 08:58 CST) | https://x.com/realchendahuang/status/2125393641665671593 | Public `@bot` commands to scrape `@MiaAI_lab`'s fork and rival tools vs. mocking Claude Desktop tabs, Community Notes demonetization call, and auto-blocker bot. |
| `SRC-014` | Part 11 | X Post (2026-11-25 09:03 CST) | https://x.com/realchendahuang/status/2125394810559426993 | Nov 25 clarification contradicted within 2h by PR `#42450` (`git.cwd`), `#42376` (Win opt-out ignored), `#42464` (macOS shell opt-out ignored), `AnalyticsService.ts#L152`, and 264 Claude records in the 100MB export. |
| `SRC-015` | Part 12 | X Post (2026-11-25 09:05 CST) | https://x.com/realchendahuang/status/2125395501663281198 | Post-GDPR 6h overnight blitz: PR `#42380` (2.2M/hr IP + UA spans kept 30 days in Axiom), `#42285`/`#42430` (account deletion left DB rows & tunnels), `#42459`/`#41859` (push leaks), `#42466` (mixed anonymous batches). |
| `SRC-016` | Part 13 | X Post (2026-11-25 09:07 CST) | https://x.com/realchendahuang/status/2125395980354994414 | "Chinese tech Twitter cesspit" outburst alongside 0 GitHub Security Advisories, silent fixes for unsandboxed previews (`#41757`/`#42386`) and unprompted repo commands (`#42504`), closed-source `ingest.t3.codes`. |
| `SRC-017` | Part 14 | X Post (2026-11-25 09:41 CST) | https://x.com/realchendahuang/status/2125404517697290438 | 1,151-tweet quantitative audit: 0% profanity toward 20 big-tech/KOL figures (60 replies) vs. 8.0% hostility toward ordinary developers (749 replies), rising to 14.4% in crisis window. |
| `SRC-018` | Part 15 | X Post (2026-11-25 09:56 CST) | https://x.com/realchendahuang/status/2125408163273080950 | USPTO search showing 0 `T3 Code`/`T3 Tools`/`T3 Connect` registrations, abandoned `PING LABS` (`97294243`), third-party `T3` marks (`7795672`/`3324707`), GitHub Trademark Policy, retroactive PR `#41898`. |
| `SRC-019` | Part 16 | X Post (2026-11-25 09:58 CST) | https://x.com/realchendahuang/status/2125408843152953693 | Historical record: `vsc-material-but-i-wont-sue-you`, Indian dev apology video (`o2CSJYXJBpc`), $20k FFmpeg bounty (`1oQ3KMeaH04`), deleted Nov 25 4AM closed-source threat. |
| `SRC-020` | Part 17 | X Post (2026-11-25 10:08 CST) | https://x.com/realchendahuang/status/2125411353393553744 | Sponsor stack (Clerk, Axiom, Vercel exclusivity), Codex 0% quota exploit & deletion (`codex#45444`), 10-account CLIProxyAPI Gist vs. FAQ ban warning. |
| `SRC-021` | Part 18 | X Post (2026-11-25 10:28 CST) | https://x.com/realchendahuang/status/2125416210120765799 | 30k to 77k stars in 25 days (129 watchers): 5-prompt & 30s idle toast firing server-credential `PUT user/starred/...`, PR `#29922` Macroscope/zhilsinger unaddressed review, `driver.ts#L60-L99` arbitrary-repo bug. |

---

## 2. Telemetry, Cross-Tool Identification & Post-GDPR Overnight Patches (Parts 1, 7, 11, 12)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-022` | Part 1 | PR #174 | https://github.com/pingdotgg/t3code/pull/174 | Merged 2026-03-06; enabled default PostHog telemetry without UI toggle or first-run consent prompt. |
| `SRC-023` | Part 1 | Commit `3bdaa6e1` | https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3 | Quietly removed `No telemetry / Unless you opt in. Full stop.` from the homepage on 2026-06-18 during redesign. |
| `SRC-024` | Part 1 | Issue #1397 | https://github.com/pingdotgg/t3code/issues/1397 | Closed as `not planned` on 2026-06-23 by Julius: "We will not make this easier to opt out of, it is crucial for us to know how many users we have". |
| `SRC-025` | Part 1 | Issue #4123 | https://github.com/pingdotgg/t3code/issues/4123 | User inquiry citing archived "No telemetry" screenshots; closed via unrelated fix Oct 21, reopened after backlash, re-closed Nov 4. |
| `SRC-026` | Part 1 | PR #15028 | https://github.com/pingdotgg/t3code/pull/15028 | Routed 10-second batched telemetry through `ingest.t3.codes` storing raw event copies before PostHog forwarding. |
| `SRC-027` | Part 1 | PR #21506 | https://github.com/pingdotgg/t3code/pull/21506 | Added `installId` and `install.owner_observed` unsalted SHA-256 cross-tool attribution (`connect`, `openai`, `claude`, `device`) on Oct 19–20. |
| `SRC-028` | Part 1 | PR #13458 | https://github.com/pingdotgg/t3code/pull/13458 | Community telemetry opt-out toggle PR #1 rejected without merge. |
| `SRC-029` | Part 1 | PR #16763 | https://github.com/pingdotgg/t3code/pull/16763 | Community telemetry opt-out toggle PR #2 rejected without merge. |
| `SRC-030` | Part 1 | PR #21248 | https://github.com/pingdotgg/t3code/pull/21248 | Community telemetry opt-out toggle PR #3 rejected without merge. |
| `SRC-031` | Part 1 | PR #27077 | https://github.com/pingdotgg/t3code/pull/27077 | Hardware-verified opt-out PR (147 passing tests, approved by Macroscope) closed by Julius on Nov 17 as `unwanted`. |
| `SRC-032` | Part 1 / 11 | `AnalyticsService.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts | Telemetry batching & opt-out checks (`HostProcess.Environment` / `T3CODE_TELEMETRY_ENABLED`); calls `getTelemetryIdentity` unconditionally. |
| `SRC-033` | Part 11 | `AnalyticsService.ts#L152` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 | Exact line site where `getTelemetryIdentity` (L149) and `deliveryRef` / `recordedOwnersRef` initialize regardless of opt-out flag. |
| `SRC-034` | Part 1 | `Identify.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts | Reads `~/.codex/auth.json` (`user_id` claim) and `~/.claude.json` (`oauthAccount.accountUuid`) to emit unsalted SHA-256 owner hashes. |
| `SRC-035` | Part 1 | `ProviderUsageAnalytics.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts | Reports provider, model ID, permission mode, run duration, and token/cached-token metrics per turn/request. |
| `SRC-036` | Part 1 | `telemetryId.ts` | https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts | Shared `hashTelemetryId` helper computing unsalted SHA-256 hex digests across clients and server. |
| `SRC-037` | Part 11 | Public Telemetry Dump (`.gz`) | https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz | ~6.06 MB gzip archive (`events.clean.jsonl`, 95,789 events) published by `@theo` on Nov 25; contained 264 Claude owner records linking 4 machines and private proxy model IDs. |
| `SRC-038` | Part 1 / 7 / 13 | Ingestion Gateway | https://ingest.t3.codes/ | Closed-source T3 telemetry ingestion host storing raw event copies before forwarding to PostHog. |
| `SRC-039` | Part 1 / 7 | `docs/user/telemetry.md` | https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md | Official telemetry doc confirming hosted browser app has no opt-out toggle, mobile ignores Managed Policy, and `Publish agent activity` ignores opt-outs. |
| `SRC-040` | Part 7 | `docs/user/managed-policy.md` | https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md | Requires admin-protected `policy.json` (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json`, `/etc/t3code/policy.json`), HKLM registry, or MDM. |
| `SRC-041` | Part 7 | `@theo` X Post | https://x.com/theo/status/2125186071357251715 | Claims T3 Code has the "best corporate managed policy system" to "turn off all telemetry" trivially (2026-11-24 19:13 CST). |
| `SRC-042` | Part 7 | `@theo` X Post | https://x.com/theo/status/2125191784859115766 | Claims "the conversation data he's referring to lives on your machine. It never touches any of our servers." |
| `SRC-043` | Part 11 | `@theo` X Clarification | https://x.com/theo/status/2125332390239494211 | Morning Nov 25 clarification denying file-path collection, claiming env vars always worked & Claude hashes were broken, linking `events.clean.jsonl` dump. |
| `SRC-044` | Part 11 / 13 | `@theo` X Reply | https://x.com/theo/status/2125370330244128924 | Denies writing local tracking IDs when opted out, defends closed-source `ingest.t3.codes`, and states T3 Connect E2E encryption is impossible. |
| `SRC-045` | Part 11 | PR #42450 | https://github.com/pingdotgg/t3code/pull/42450 | Merged ~90 min after `@theo`'s post; admits webhook relay runs exported full execution spans to Axiom including `git.cwd` absolute workspace paths & OS usernames. |
| `SRC-046` | Part 11 | PR #42376 | https://github.com/pingdotgg/t3code/pull/42376 | Admits Windows desktop ignored saved `T3CODE_TELEMETRY_ENABLED=false` user environment variable when launched from pre-existing process. |
| `SRC-047` | Part 11 | PR #42464 | https://github.com/pingdotgg/t3code/pull/42464 | Admits first-launch macOS/Linux desktop relay tracing exported spans to Axiom ignoring `~/.zshrc` opt-out for the entire session. |
| `SRC-048` | Part 12 | PR #42380 | https://github.com/pingdotgg/t3code/pull/42380 | Discloses relay spans exported ~2.2M/hr to Axiom (30-day retention) logged caller real IP addresses and User-Agent next to `user.id`. |
| `SRC-049` | Part 12 | PR #42285 | https://github.com/pingdotgg/t3code/pull/42285 | Discloses Clerk account deletion previously left relay DB rows & active Cloudflare tunnels intact until manual SQL cleanup on a deletion request. |
| `SRC-050` | Part 12 | PR #42430 | https://github.com/pingdotgg/t3code/pull/42430 | Companion overnight account-deletion cleanup PR for relay records and live tunnels. |
| `SRC-051` | Part 12 | PR #42459 | https://github.com/pingdotgg/t3code/pull/42459 | Fixes Android FCM push payloads sending plaintext Clerk `user_id` to Google on every notification, switching to per-device `sha256("<userId>:<deviceId>")`. |
| `SRC-052` | Part 12 | PR #41859 | https://github.com/pingdotgg/t3code/pull/41859 | `fix(relay): APNs request spans and errors no longer record the request URL` — stops leaking iOS device push token URLs into error logs & telemetry. |
| `SRC-053` | Part 12 | PR #42466 | https://github.com/pingdotgg/t3code/pull/42466 | Admits anonymous `agent.feedback` events were batched in the same POST with `installId` and full host fingerprints (OS, arch, WSL distro), contradicting `telemetry.md`. |
| `SRC-054` | Part 1 | `Identify.ts` OpenAI Claim Key | https://api.openai.com/auth | JWT claim namespace (`claims["https://api.openai.com/auth"].user_id`) decoded in `Identify.ts` (`9d3195b4`) to extract OpenAI `user_id` across devices. |
| `SRC-055` | Part 1 | Ingest Host Config Constant | https://ingest.t3.codes | Bare closed-source `posthogHost` default string in `AnalyticsService.ts` (`lines 74–76`) retaining raw copies before PostHog forwarding. |
| `SRC-056` | Part 1 | `FeatureUsage.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/FeatureUsage.ts | Tracks `18` `COMMAND_FEATURES` and `17` `METHOD_FEATURES` (`35` distinct UI/command actions). |
| `SRC-057` | Part 1 / 3 | `ProviderDimensions.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts | Normalizes provider/model telemetry labels (raw pass-through at `9d3195b4`; masked to `custom:<driver>` in `PR #42465`). |
| `SRC-058` | Part 1 / 11 | `DesktopShellEnvironment.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts | Desktop login-shell/profile env loader; forwards `T3CODE_TELEMETRY_ENABLED` and `DO_NOT_TRACK` (`#42629`) while omitting `T3CODE_OTEL_SDK_DISABLED` and `OTEL_SDK_DISABLED`. |
| `SRC-059` | Post-Audit | `DesktopBackendConfiguration.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts | WSL environment forwarder (`WSL_FORWARDED_ENV_NAMES`) carrying `DO_NOT_TRACK`, `T3CODE_TELEMETRY_ENABLED`, `T3CODE_OTEL_SDK_DISABLED`, and `OTEL_SDK_DISABLED`. |
| `SRC-060` | Post-Audit | `otelEnvironment.ts` | https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts | Shared OTel/telemetry kill-switch helper defining `isCiEnvironment` (`#42630`), `isDoNotTrackSet` (`#42629`), and `isRelayTracingEnabled`. |

---

## 3. Local Safety, Silent Security Fixes, Antigravity & T3 Connect (Parts 2, 3, 4, 5, 13)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-061` | Part 2 | Issue #17845 | https://github.com/pingdotgg/t3code/issues/17845 | Filed Oct 10; sidebar "permanent delete" leaves all chat rows in `statev2.sqlite` (25.9–41.6 GB bloat reported). |
| `SRC-062` | Part 2 | Issue #28903 | https://github.com/pingdotgg/t3code/issues/28903 | Companion disk-bloat / fake SQLite thread-deletion report. |
| `SRC-063` | Part 2 | Issue #11222 | https://github.com/pingdotgg/t3code/issues/11222 | `t3-resource-monitor` polls every OS process every 5s with ~280–290 permanent handles (440+ procs on Windows), zero opt-out, contradicting `resource-telemetry.md`. |
| `SRC-064` | Part 2 | PR #41889 | https://github.com/pingdotgg/t3code/pull/41889 | Merged Nov 24; admits process diagnostics previously recorded full process command-line arguments (exposing tokens/passwords) in live telemetry & snapshots. |
| `SRC-065` | Part 2 | PR #16950 | https://github.com/pingdotgg/t3code/pull/16950 | Earlier patch addressing leakage of internal/local hostnames via Google's favicon lookup API. |
| `SRC-066` | Part 2 | PR #32657 | https://github.com/pingdotgg/t3code/pull/32657 | Follow-up patch stopping internal hostnames (e.g. `devbox.localdomain`) from leaking to Google favicon API. |
| `SRC-067` | Part 2 | Issue #36479 | https://github.com/pingdotgg/t3code/issues/36479 | Mandatory outbound manifest request on startup cannot be disabled via telemetry opt-out or Managed Policy. |
| `SRC-068` | Part 2 | Outbound Manifest Host | https://raw.githubusercontent.com/ | Host contacted unconditionally on server startup to pull compatibility manifests per Issue #36479. |
| `SRC-069` | Part 2 | PR #21806 | https://github.com/pingdotgg/t3code/pull/21806 | Patch addressing permission/approval and policy bypass behavior. |
| `SRC-070` | Part 2 | PR #27322 | https://github.com/pingdotgg/t3code/pull/27322 | Patch addressing managed-policy bypass across WSL / Tailscale environments. |
| `SRC-071` | Part 2 | Issue #7338 | https://github.com/pingdotgg/t3code/issues/7338 | Initial report of Claude 5-hour quota burning ~1.7x faster via Anthropic Agent SDK inside T3 Code. |
| `SRC-072` | Part 2 | Issue #24649 | https://github.com/pingdotgg/t3code/issues/24649 | Tracking issue for Claude 5h 1.7x quota drain (81-comment thread, resolved around v0.1.7 in early Nov). |
| `SRC-073` | Part 2 | Issue #3143 | https://github.com/pingdotgg/t3code/issues/3143 | Reports 136x abnormal idle/active power consumption compared to comparable Electron apps. |
| `SRC-074` | Part 2 | Issue #40581 | https://github.com/pingdotgg/t3code/issues/40581 | Reports MacBook 19-core GPU pinned at 60W (draining battery in 78 min) and 18W background drain after closing the web tab. |
| `SRC-075` | Part 3 / 13 | Issue #15353 | https://github.com/pingdotgg/t3code/issues/15353 | Open since Oct 3 (52+ days): Claude Auto mode silently approves `git push --force` on 3rd attempt after 2 classifier blocks, logging as user-approved. |
| `SRC-076` | Part 3 | Issue #15353 Comment | https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 | Specific reproduction comment confirming silent approval of `git push --force` without prompting. |
| `SRC-077` | Part 3 | PR #15360 | https://github.com/pingdotgg/t3code/pull/15360 | Community fix PR #1 for Issue #15353 left unreviewed and auto-closed by bot. |
| `SRC-078` | Part 3 | PR #35207 | https://github.com/pingdotgg/t3code/pull/35207 | Community fix PR #2 for Issue #15353 left unreviewed and auto-closed by bot. |
| `SRC-079` | Part 3 | PR #40692 | https://github.com/pingdotgg/t3code/pull/40692 | Third fix PR for Issue #15353 pending merge. |
| `SRC-080` | Part 3 | Slopalytics Site | https://slopalytics.com/ | `@theo`'s public model telemetry leaderboard site fed by T3 Code analytics. |
| `SRC-081` | Part 3 | Slopalytics Usage Feed | https://slopalytics.com/data/t3-usage.json | Public JSON feed backing `slopalytics.com` receiving T3 Code model usage telemetry. |
| `SRC-082` | Part 3 | PR #29001 | https://github.com/pingdotgg/t3code/pull/29001 | Earlier model-name whitelist filter designed to stop leaking custom/private model identifiers. |
| `SRC-083` | Part 3 | Issue #40948 | https://github.com/pingdotgg/t3code/issues/40948 | Nov 22 issue noting newer models disappeared from `slopalytics.com` due to the model whitelist filter. |
| `SRC-084` | Part 3 | PR #41237 | https://github.com/pingdotgg/t3code/pull/41237 | Merged 21h later under `t3dotgg`; drops model filter so `ollama/acme-internal` and `acme-azure-deployment` report verbatim to analytics. |
| `SRC-085` | Part 3 / 13 | GitHub Security Advisories | https://github.com/pingdotgg/t3code/security/advisories | Repository Security Advisories tab showing **0 published advisories** despite silent patches for high-severity credential/RCE risks. |
| `SRC-086` | Part 3 / 5 / 13 | `SECURITY.md` | https://github.com/pingdotgg/t3code/blob/main/SECURITY.md | Declares full-OS-account `filesystem:read`, plain HTTP on iOS/LAN, and full machine takeover via compromised relay signing key as intended design boundaries. |
| `SRC-087` | Part 3 | PR #41942 | https://github.com/pingdotgg/t3code/pull/41942 | Commit `2b2da5e7`: `docs(security): clarify intended behaviour and triage steps`, rushing out `SECURITY.md` boundary exemptions. |
| `SRC-088` | Part 3 | PR #38812 | https://github.com/pingdotgg/t3code/pull/38812 | Prior `SECURITY.md` update referenced alongside PR `#41942` in Part 3. |
| `SRC-089` | Part 3 | PR #22190 | https://github.com/pingdotgg/t3code/pull/22190 | Silent security/credential-handling fix merged without a published GitHub Security Advisory (Part 3). |
| `SRC-090` | Part 3 | PR #37823 | https://github.com/pingdotgg/t3code/pull/37823 | Silent security/credential-handling fix merged without a published GitHub Security Advisory (Part 3). |
| `SRC-091` | Part 3 | PR #39464 | https://github.com/pingdotgg/t3code/pull/39464 | Silent security/credential-handling fix merged without a published GitHub Security Advisory (Part 3). |
| `SRC-092` | Part 3 | PR #39480 | https://github.com/pingdotgg/t3code/pull/39480 | Silent security/credential-handling fix merged without a published GitHub Security Advisory (Part 3). |
| `SRC-093` | Part 3 | PR #39483 | https://github.com/pingdotgg/t3code/pull/39483 | Silent fix for `ServerSecretStore` path traversal (`jti`/`nonce` could write files outside secrets directory before device approval). |
| `SRC-094` | Part 3 | PR #40133 | https://github.com/pingdotgg/t3code/pull/40133 | Silent security/credential-handling fix merged without a published GitHub Security Advisory (Part 3). |
| `SRC-095` | Part 3 | PR #41756 | https://github.com/pingdotgg/t3code/pull/41756 | Commit `f30874fe`: `fix: remote logins and webhook tokens stay with their own host and reader` (silent fix, 0 advisories). |
| `SRC-096` | Part 3 | PR #41886 | https://github.com/pingdotgg/t3code/pull/41886 | Commit `8dc01892`: `fix(server): answering a secret request with a reference needs provider management` (silent fix, 0 advisories). |
| `SRC-097` | Part 3 / 13 | PR #41757 | https://github.com/pingdotgg/t3code/pull/41757 | Commit `5e62206e`: isolates desktop preview pages in their own JS world and limits popups after unsandboxed preview exposure. |
| `SRC-098` | Part 13 | PR #42386 | https://github.com/pingdotgg/t3code/pull/42386 | Follow-up silent desktop preview sandbox/popup isolation patch. |
| `SRC-099` | Part 13 | PR #42504 | https://github.com/pingdotgg/t3code/pull/42504 | ~3,000-line silent patch adding confirmation prompts for untrusted repo configs that previously executed local commands unprompted. |
| `SRC-100` | Part 3 | Issue #26489 | https://github.com/pingdotgg/t3code/issues/26489 | Open local security defect cited in Part 3 (external path traversal / symlink / launcher risks). |
| `SRC-101` | Part 3 | PR #36216 | https://github.com/pingdotgg/t3code/pull/36216 | Unmerged security fix PR cited in Part 3 alongside `#26489`. |
| `SRC-102` | Part 3 | PR #23428 | https://github.com/pingdotgg/t3code/pull/23428 | Unmerged security fix PR cited in Part 3. |
| `SRC-103` | Part 3 | PR #30997 | https://github.com/pingdotgg/t3code/pull/30997 | Unmerged fix replacing base64 `-EncodedCommand` PowerShell launcher (`externalLauncher.ts`) flagged by Windows AV (`IDP.HELU.PSE96`). |
| `SRC-104` | Part 3 | PR #33144 | https://github.com/pingdotgg/t3code/pull/33144 | Unmerged security fix PR cited in Part 3. |
| `SRC-105` | Part 4 | `faq.md` (Ban Guarantee) | https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription | States "No. We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe." |
| `SRC-106` | Part 4 | Issue #40713 | https://github.com/pingdotgg/t3code/issues/40713 | Antigravity ToS ban report; maintainer denied calling Antigravity backend directly, refuted in replies (`schlessera`) citing `antigravityUsageLimits.ts`. |
| `SRC-107` | Part 4 | `antigravityUsageLimits.ts#L20-L45` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 | Defines spoofed `antigravity/hub/2.24.0 (aidev_client; ...; cl=963137146)` User-Agent and `daily-cloudcode-pa.googleapis.com` endpoints. |
| `SRC-108` | Part 4 | `antigravityUsageLimits.ts#L445-L476` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 | Sends direct `POST ${endpoint}/v1internal:retrieveUserQuotaSummary` and `fetchAvailableModels` with extracted user `accessToken` and spoofed User-Agent. |
| `SRC-109` | Part 13 | `antigravityUsageLimits.ts#L450-L454` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L450-L454 | Exact `HttpClientRequest.post` and `setHeaders` lines injecting Bearer token and spoofed `antigravityUserAgent`. |
| `SRC-110` | Part 4 | Issue #41536 | https://github.com/pingdotgg/t3code/issues/41536 | Fresh $20 Google AI sub with zero proxies banned on first message 3 minutes after T3-managed Antigravity install; closed as duplicate without warning. |
| `SRC-111` | Part 4 | `antigravityAuthSupport.ts#L230-L236` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 | Injects fake `SSH_CONNECTION: "127.0.0.1 0 127.0.0.1 0"` + `AGY_ACP_FORCE_FILE_STORAGE: "1"` to force Google CLI out of OS keyring into plaintext files. |
| `SRC-112` | Part 13 | `antigravityAuthSupport.ts#L232-L236` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L232-L236 | Exact lines injecting fake `SSH_CONNECTION` and `AGY_ACP_FORCE_FILE_STORAGE` on `oauth-personal`. |
| `SRC-113` | Part 4 | Issue #41973 | https://github.com/pingdotgg/t3code/issues/41973 | Nov 24 Google CLI update dropped SSH fallback, breaking T3 multi-account isolation and routing Account A prompts silently to Account B. |
| `SRC-114` | Part 4 | PR #26876 | https://github.com/pingdotgg/t3code/pull/26876 | Merged personally by `t3dotgg`; renamed T3 Code client identifier to `zed` so Google's allowlisted backend logged T3 requests as Zed. |
| `SRC-115` | Part 4 | Google Antigravity ToS | https://antigravity.google/terms | Official Google Antigravity Terms of Service governing authorized clients and credential access. |
| `SRC-116` | Part 4 | Google Developer Forum #185992 | https://discuss.ai.google.dev/t/185992 | Google staff post confirming Section 6 ToS prohibits third-party tools from extracting/reusing credentials to call Antigravity backend directly. |
| `SRC-117` | Part 5 | Issue #32098 Comment | https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 | Maintainer added opt-in device approval (default off), stated full E2E encryption was too large to include, and closed the security issue. |
| `SRC-118` | Part 5 | PR #32945 | https://github.com/pingdotgg/t3code/pull/32945 | `@theo`'s proposal citing $25k/month Cloudflare Tunnel cost and migrating T3 Connect to self-hosted OVH Caddy TLS termination + Go proxy (still zero E2E). |
| `SRC-119` | Part 5 | `06_t3-connect.md` | https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md | Architecture doc confirming `requireConnectDeviceApproval` mitigates compromised relay signing keys, while relay remains a trusted broker without E2E payload encryption. |
| `SRC-120` | Part 5 | `ManagedEndpointProvider.ts` | https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts | Provisions Cloudflare Tunnels and proxied CNAME hostnames inside T3's own Cloudflare account. |
| `SRC-121` | Part 5 | `privacy-policy.astro` | https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro | Effective/updated `2026-10-06`; lacks any disclosure of missing E2E encryption on T3 Connect or non-retention guarantee for relayed traffic. |
| `SRC-122` | Part 5 | Discussion #21286 | https://github.com/pingdotgg/t3code/discussions/21286 | Unanswered community discussion requesting E2E encryption for T3 Connect. |
| `SRC-123` | Part 5 | Discussion #37831 | https://github.com/pingdotgg/t3code/discussions/37831 | Second unanswered community discussion requesting E2E encryption for T3 Connect. |
| `SRC-124` | Part 4 / 17 | PR #33800 | https://github.com/pingdotgg/t3code/pull/33800 | Merged PR wiring CLIProxyAPI hub polling for `claude`, `xai`, and `antigravity` (`v1internal:retrieveUserQuotaSummary` + spoofed `User-Agent`). |
| `SRC-125` | Part 4 / 17 | `cliproxyApi.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts | Server module implementing `CliproxyHub` usage-limit polling and pooled quota parsing for Codex, Claude, Grok, and Antigravity. |
| `SRC-126` | Part 4 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124264935505199294 | States "There is zero risk to using Gemini subs in T3 Code." |
| `SRC-127` | Part 4 | `@theo` X Post (Nov 23) | https://x.com/theo/status/2124665075638411641 | Diagram claiming `T3 Code -> Antigravity binary -> Google API` is compliant while `fake antigravity shim` is non-compliant. |
| `SRC-128` | Part 4 | `@theo` X Reply (Nov 23) | https://x.com/theo/status/2124703048140517397 | Replies ~2.5 hours (`2h 31m`) later (`11:14:16` vs. `08:43:23` CST) to `@Only_21Mil`'s Antigravity ban report asking "Not with cliproxy right?" and tagging `@PatrickToulme`. |
| `SRC-129` | Part 5 | PR #36419 | https://github.com/pingdotgg/t3code/pull/36419 | Merged PR introducing opt-in `requireConnectDeviceApproval` setting (defaulting to `false` in schema). |
| `SRC-130` | Part 3 / 9 | Issue #33639 | https://github.com/pingdotgg/t3code/issues/33639 | Root issue requesting optional context-window indicator where `t3dotgg` told `@bermudi` to uninstall and called him an "ungrateful prick". |
| `SRC-131` | Part 5 | Issue #32098 | https://github.com/pingdotgg/t3code/issues/32098 | Root security issue confirming T3 Connect lacks E2E encryption and closing the request (`juliusmarminge`). |
| `SRC-132` | Part 4 | `antigravityUsageLimits.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts | Full module path spoofing `antigravity/hub/2.24.0`, scraping OS keyring/`CredReadW` tokens, and calling `v1internal` endpoints directly. |
| `SRC-133` | Part 4 | `antigravityAuthSupport.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts | Full module path injecting fake `SSH_CONNECTION` on `oauth-personal` and `AGY_CLI_DISABLE_AUTO_UPDATE: "true"` (`#42545`). |
| `SRC-134` | Part 4 | `AntigravityAcpSupport.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts | Antigravity ACP runtime support retaining `{ name: "zed", version: "0.0.0" }` fallback below `1.5.1`. |
| `SRC-135` | Post-Audit | `AntigravityTurnOutcome.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts | Parses `cloudcode-pa.googleapis.com` HTTP `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) payloads (`#41210`) and quota reset errors (`#42339`). |
| `SRC-136` | Part 5 | `settings.ts` | https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts | Settings contract schema where `requireConnectDeviceApproval` remains defaulted to `false` (`lines 1424–1426` at `ca81b7b9`). |

---

## 4. Business Ledger, Investor Conflicts, Sponsors & 77k Stars Funnel (Parts 6, 8, 17, 18)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-137` | Part 8 | Ping.gg Homepage | https://ping.gg/ | Auto-linked reference in Part 8 noting `Ping.gg`, `T3 Chat`, and `UploadThing` had 0 mentions across `@theo`'s 1,151 tweets. |
| `SRC-138` | Part 8 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120729779511124267 | States T3 Code is "an free open source tool that has cost me $800k+ to make". |
| `SRC-139` | Part 8 | `@theo` X Post (Nov 18) | https://x.com/theo/status/2122860770329608290 | Posts internal analytics dashboard showing 31.7T tokens/day ($10.19M equivalent daily API spend). |
| `SRC-140` | Part 8 | `@theo` X Post (Nov 21) | https://x.com/theo/status/2123965784888377541 | Discloses ~98.5% of all T3 Code usage comes from Codex, Claude, and Antigravity. |
| `SRC-141` | Part 8 | `@theo` X Post (Nov 23) | https://x.com/theo/status/2124682906132181482 | Mocks commenter guessing model share: "I'm sorry, I didn't realize you had access to my analytics and could see things I don't." |
| `SRC-142` | Part 8 | `@theo` X Post (Nov 18) | https://x.com/theo/status/2122760447103484410 | Long GPT-6.2 Astra review thanking OpenAI for unlimited free early-access tokens ($300k+ burned on one benchmark). |
| `SRC-143` | Part 6 | `@theo` X Post (Nov 16) | https://x.com/theo/status/2122201981167251877 | Discloses being an investor and contributor to Vibe Kanban before mocking its shutdown and UI as a way to burn cash and kill a startup. |
| `SRC-144` | Part 6 | `@theo` X Post (Nov 18) | https://x.com/theo/status/2123011578090127499 | Confirms investing in cloud-sandbox startup Daytona alongside competitors. |
| `SRC-145` | Part 6 | `@theo` X Post (Nov 9) | https://x.com/theo/status/2119705561679933806 | Discusses shipping cloud sandboxes as a paid T3 Code feature 9 days before Daytona investor disclosure. |
| `SRC-146` | Part 17 | `@theo` X Post (May 2023) | https://x.com/theo/status/1657488850472804353 | Lists YouTube sponsors: `@vercel`, `@clerk` (used for T3 auth), `@upstash`, `@axiomhq` (used for T3 2.2M/hr IP logs), `@PlanetScale`. |
| `SRC-147` | Part 17 | `@rauchg` X Post (Apr 2024) | https://x.com/rauchg/status/1776260839965863965 | Vercel CEO Guillermo Rauch states: "our devrel team is 4 people and we sponsor one YouTuber (Theo)." |
| `SRC-148` | Part 17 | YouTube Video | https://www.youtube.com/watch?v=uv179CTAK-w | `@theo` video acknowledging prior Vercel sponsorship contract carried exclusivity clauses barring competitor promotions. |
| `SRC-149` | Part 17 | `@maria_rcks` X Post (Aug 2026) | https://x.com/maria_rcks/status/2090972426876129658 | T3 employee deletes Endless repo after Codex 0% quota exploit controversy and writes "hopefully the codex team can check for this and ban the accounts". |
| `SRC-150` | Part 17 | `openai/codex#45444` | https://github.com/openai/codex/issues/45444 | Regression issue confirming OpenAI tightened Codex to hard-interrupt active turns immediately at 0% quota. |
| `SRC-151` | Part 17 | `cliproxy-setup.md` Gist | https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af | `@theo`'s 452-star guide pooling 7 Claude + 3 Codex accounts across 12+ machines via CLIProxyAPI (showing 555% pooled quota). |
| `SRC-152` | Part 17 | `faq.md` (Multi-Account) | https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider | Refuses built-in auto-switcher due to ToS ban risk, then links directly to `@theo`'s CLIProxyAPI guide/video + built-in hub quota aggregator. |
| `SRC-153` | Part 17 | `docs/user/faq.md` (Root) | https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md | Complete FAQ file documenting subscription safety guarantee, multi-account CLIProxyAPI advice, and "Does my code go to T3 servers?". |
| `SRC-154` | Part 18 | `sourceControl.star` RPC Ref | https://sourcecontrol.star/ | Auto-parsed domain artifact in Post 18 text from unescaped `sourceControl.star` RPC name added in PR `#29922` (not an external website). |
| `SRC-155` | Part 18 | `@theo` X Post (Apr 2026) | https://x.com/theo/status/2048122499834036340 | "Github has a fake star problem" 36-minute video arguing stars became a tool for startups to trick VCs. |
| `SRC-156` | Part 18 | `@theo` X Post (Nov 2) | https://x.com/theo/status/2117065834267136469 | Star-history graph celebrating a 10x vertical spike immediately after shipping the in-app `Star prompt`. |
| `SRC-157` | Part 18 | `@theo` X Post (Nov 2) | https://x.com/theo/status/2117172614158508400 | GitHub Trending screenshot pointing at `+3,094` stars in a single day. |
| `SRC-158` | Part 18 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2124992724223029538 | Screenshot at 74.6k stars claiming he "completely missed crossing 70k". |
| `SRC-159` | Part 18 | PR #29922 | https://github.com/pingdotgg/t3code/pull/29922 | Adds 30s idle star toast and one-click server-credential `PUT user/starred/pingdotgg/t3code` (`sourceControl.star`); self-merged over Macroscope & unanswered `zhilsinger` `Request changes`. |
| `SRC-160` | Part 18 | `driver.ts#L60-L99` | https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99 | `starredPath` only checks 2 segments without `.` / `..`, failing to pin `pingdotgg/t3code` and allowing any `source-control:write` client to star arbitrary repos via host credentials. |
| `SRC-161` | Part 8 | PR #31158 | https://github.com/pingdotgg/t3code/pull/31158 | Single commit (`d14f87f`, Nov 6, 2026) by DeepMind's `@patrick-toulme` (`feat(antigravity): identify as T3 Code to agy acp 1.5.1+`). |
| `SRC-162` | Part 8 | `@theo` X Reply (Nov 21) | https://x.com/theo/status/2123885732330885417 | Replies to `@maria_rcks` acquisition joke confirming multiple investors reached out to inquire about T3. |
| `SRC-163` | Part 17 | `@theo` X Post (Nov 8) | https://x.com/theo/status/2119193502852755520 | Instructs `@bot` to "Dig through my cliproxy logs in clickhouse to see if things changed". |
| `SRC-164` | Part 17 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119960608816988596 | Boasts `$200 Claude Ultra plan gets you $15,000 of Opus 5.5 in a month` (`$14,662` across 1.1M proxied Anthropic requests). |
| `SRC-165` | Part 17 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119994608516276256 | 4-step tutorial instructing Grok Bot users to route tasks through a `$100` Claude plan + T3 Code MCP connector for Opus 5.5. |
| `SRC-166` | Part 18 | PR #27832 | https://github.com/pingdotgg/t3code/pull/27832 | Oct 30 PR authored and self-merged by `t3dotgg` adding the 5-prompt (`PROMPTS_BEFORE_ASKING = 5`) GitHub star toast. |
| `SRC-167` | Part 18 | PR #29987 | https://github.com/pingdotgg/t3code/pull/29987 | Nov 3 follow-up PR refining the idle/one-click GitHub star prompt funnel alongside PR `#29922`. |
| `SRC-168` | Part 18 | `GitHubStarPrompt.tsx` | https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx | Frontend star prompt implementation (`PROMPTS_BEFORE_ASKING = 5`, `IDLE_MS = 30_000`, `starInPlace` RPC + confetti). |
| `SRC-169` | Part 18 | `SourceControlSignIn.ts` | https://github.com/pingdotgg/t3code/blob/main/apps/server/src/sourceControl/SourceControlSignIn.ts | Server source-control sign-in implementation supporting host-credential GitHub REST actions. |
| `SRC-170` | Part 18 | `clientRpcPermissions.ts#L61` | https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/clientRpcPermissions.ts#L61 | Maps `WS_METHODS.sourceControlStar` to `AuthSourceControlWriteScope` (`"source-control:write"`). |
| `SRC-171` | Part 17 | `usage.md#connect-a-cliproxyapi-hub` | https://github.com/pingdotgg/t3code/blob/main/docs/user/usage.md#connect-a-cliproxyapi-hub | Official T3 Code documentation explaining how to attach a pooled CLIProxyAPI hub. |
| `SRC-172` | Part 17 | `infra/relay/src/Config.ts` | https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/Config.ts | Relay config requiring sponsor Clerk credentials (`clerkSecretKey`, `clerkPublishableKey`, `clerkJwtAudience`). |
| `SRC-173` | Part 17 | `infra/relay/src/observability.ts` | https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/observability.ts | Provisions sponsor Axiom datasets (`t3-code-relay-traces`, `t3-code-mobile-logs`, `t3-code-mobile-metrics`) with 30-day retention. |
| `SRC-174` | Part 8 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120752365896941930 | Claims ~28 trillion tokens/day pass through T3 Code while tagging `@grok` against OpenRouter and OpenCode. |
| `SRC-175` | Part 8 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120732020036993066 | Discloses open-weight models represent `<0.5%` of T3 Code traffic. |
| `SRC-176` | Part 8 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120733998406402091 | Discloses `6%` of users ever tried an open-weight model (down from `15%` a month earlier). |
| `SRC-177` | Part 8 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120740371412164669 | States prompts sent to open-weight models in T3 Code are `sub-0.5%`. |
| `SRC-178` | Part 8 | `@theo` X Post (Nov 20) | https://x.com/theo/status/2123526492881916357 | Thanks Google/Neon for provisioning `"a quiet bare-metal box without KVM steal"` for benchmarking. |
| `SRC-179` | Part 8 | `@theo` X Post (Nov 21) | https://x.com/theo/status/2123915184695906388 | Cites `~$10.2m/day` peak API spend equivalent across T3 Code telemetry. |
| `SRC-180` | Part 8 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124266892991115362 | Claims DeepMind engineer `@PatrickToulme` `"has landed many PRs on T3 Code"` despite `1` commit in `main` log (`#31158`). |
| `SRC-181` | Part 8 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124284420060578088 | Discloses `"99% of T3 Code usage is with subscriptions (including gemini!)"`. |
| `SRC-182` | Part 17 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119962809333346662 | Companion CLIProxyAPI post attaching `$14,662` (`73x`) graphic across 1.1M proxied Anthropic requests. |
| `SRC-183` | Part 17 | `@theo` X Retweet (Nov 13) | https://x.com/theo/status/2121002278022943086 | Retweets `@orcdev` praising T3 Code for pooling `6` Claude, `1` Codex, and `1` Cursor account in one app. |

---

## 5. Governance, Trademarks, Selective Politeness & Historical Record (Parts 9, 10, 14, 15, 16)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-184` | Part 2 | PR #5551 | https://github.com/pingdotgg/t3code/pull/5551 | Aug 6–7 PR hiding Build/Plan toggle in legacy settings with telemetry chart captioned "Reality check for those upset" (10 downvotes). |
| `SRC-185` | Part 2 | PR #9190 | https://github.com/pingdotgg/t3code/pull/9190 | Sep 2 PR hiding composer context-window progress ring by default (16 downvotes, repo's highest). |
| `SRC-186` | Part 2 | PR #33131 | https://github.com/pingdotgg/t3code/pull/33131 | Nov 9 PR removing Plan mode completely with self-contradictory AI summary claiming removal was isolated to revert "if usage data says to keep it". |
| `SRC-187` | Part 3 | Issue #33639 Comment | https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 | `t3dotgg` tells complaining user `@bermudi` to uninstall, threatens repo ban, calls them "ungrateful prick who is lazy as shit", and declares "I do not care about your opinions". |
| `SRC-188` | Part 3 | PR #41572 | https://github.com/pingdotgg/t3code/pull/41572 | Community PR integrating context meter into send button without taking composer space; rejected the next morning. |
| `SRC-189` | Part 2 / 9 | `CONTRIBUTING.md` | https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md | States "If you're looking for things to contribute, here's my advice: Don't", bans Gemini/Muse Wonder PRs, and routes disputes ("a fight over a closure") to `.github/VOUCHED.td` denouncements. |
| `SRC-190` | Part 2 | `.github/VOUCHED.td` | https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td | Trust & denouncement list (`-github:username reason`) whose entries trigger instant auto-closure of future PRs/issues. |
| `SRC-191` | Part 9 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119993037971730879 | Writes "I need results fast because I have to film, and if it nukes my machine that's free content." |
| `SRC-192` | Part 9 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119951615679672513 | Tells users to stay on nightly only if they don't mind "my yolo merges breaking shit sometimes." |
| `SRC-193` | Part 9 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120741101250515322 | Describes shipping 500 commits/day and running 700 agents / Julius auto-merge loop. |
| `SRC-194` | Part 9 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2119958282022568059 | Claims ~70% of feature requests are user prompt-writing skill issues. |
| `SRC-195` | Part 9 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120821423438778667 | Replies to PR offer with `CONTRIBUTING.md` screenshot and scolds developer for not following him first. |
| `SRC-196` | Part 9 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120853340078874923 | Warns critics: "I already caved for y'all with /btw, be careful. I am not afraid to take it away." |
| `SRC-197` | Part 9 | `@theo` X Post (Nov 20) | https://x.com/theo/status/2123754193530053110 | States a screenshot with arrows drawn on it beats a PR so he and Claude can merge it same night. |
| `SRC-198` | Part 10 | `@theo` X Post (Nov 8) | https://x.com/theo/status/2119240810202034645 | Public `@bot` command 30s after "Okay I'm stealing this" to locate `@MiaAI_lab`'s fork and implement it via Opus 5.5 on `beebox`. |
| `SRC-199` | Part 10 | `@theo` X Post (Nov 13) | https://x.com/theo/status/2121017649652269120 | Dispatches `@bot` publicly to split praised features from rival tools into separate implementation threads for T3 Code. |
| `SRC-200` | Part 10 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2124987957803446311 | Quote-tweets Claude Code Desktop sidebar tabs mocking how fast Anthropic is copying T3 Code features. |
| `SRC-201` | Part 10 | `@theo` X Post (Nov 11) | https://x.com/theo/status/2120238923884696025 | Calls on followers with Community Notes access to demonetize critics of his team. |
| `SRC-202` | Part 10 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2125077510941802509 | Confirms X account runs an auto-blocker bot ("My bot blocked you for harassment") alongside anti-Chinese remarks to `@DLKFZWilliam2`. |
| `SRC-203` | Part 15 | USPTO TSDR (`97294243`) | https://tsdr.uspto.gov/statusview/sn97294243 | T3 Tools Inc.'s sole USPTO filing (`PING LABS`, filed March 2022); finally refused Feb 2025 and marked `ABANDONED` May 19, 2025. |
| `SRC-204` | Part 15 | USPTO TSDR (`90644500`) | https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch | Active third-party `T3` registration in software/SaaS classes 9 & 42 held by EquipmentShare (Reg. `7795672`, May 13, 2025). |
| `SRC-205` | Part 15 | GitHub Trademark Policy | https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy | Requires commercial filers to supply a federal or international registration number and registry under penalty of perjury; unregistered exceptions exclude for-profit companies. |
| `SRC-206` | Part 15 / 16 | PR #41898 | https://github.com/pingdotgg/t3code/pull/41898 | Commit `0aeb7921` merged 2026-11-24 12:21:35 CST (~17 hours after GitHub ban threat) retroactively introducing `TRADEMARK.md`. |
| `SRC-207` | Part 2 / 15 | `TRADEMARK.md` | https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md | Claims exclusive rights to `T3 Code`, `T3 Connect`, `T3 Tools`, and `T3` wordmark "whether registered or unregistered" and threatens takedowns & legal action. |
| `SRC-208` | Part 15 | `@theo` X Post (Nov 23) | https://x.com/theo/status/2124829315657576890 | Public threat demanding MIT fork author `@DDdxx666` rename immediately or have their GitHub account taken down. |
| `SRC-209` | Part 15 | `@vildanden_ai` X Post | https://x.com/vildanden_ai/status/2125275487404761555 | Trademark analysis lead checking USPTO records and GitHub Trademark Policy eligibility. |
| `SRC-210` | Part 15 | `@theo` X Post (Sep 2024) | https://x.com/theo/status/1839261574005141945 | Historical tweet mocking WordPress for launching an "unenforceable trademark dispute". |
| `SRC-211` | Part 14 | `@theo` X Post (Nov 21) | https://x.com/theo/status/2123995323123343869 | Expresses relief he hadn't burned bridges with Google after Neon launch following earlier Gemini 4 Carbon criticism. |
| `SRC-212` | Part 14 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124470530590011704 | Quote-tweets basic Gemini 4 tool comparison to 380k followers: "Engineers deserve the mass unemployment they have coming." |
| `SRC-213` | Part 14 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120733839832273025 | Writes "I'm going to dance on the graves of the 'local ai' community." |
| `SRC-214` | Part 14 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124298216271499605 | Writes "Linux larpers tend to dislike real devs." |
| `SRC-215` | Part 14 | `@theo` X Post (Nov 18) | https://x.com/theo/status/2122865897375400066 | Threatens Threads critic with jail while mocking their RSD diagnosis. |
| `SRC-216` | Part 14 | `@theo` X Post (Nov 11) | https://x.com/theo/status/2120599310211703274 | Repeats calling a female critic `stupid bitch` with zero regret (part of Nov 11–12 3-post sequence). |
| `SRC-217` | Part 13 / 14 / 16 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2125177503526588877 | Calls "chinese tech twitter... the biggest fucking cesspit I've ever waded into" and readers of Chinese audits "fucking braindead" (18:39 CST). |
| `SRC-218` | Part 14 | `@theo` X Post (Nov 22) | https://x.com/theo/status/2124449493513068862 | Lectures 24h before crisis: "burning the trust of everyone around you is pretty much never the best path to get what you want." |
| `SRC-219` | Part 16 | `vsc-material-but-i-wont-sue-you` | https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you | 2024 repo where `@theo` forked a VS Code Material theme while mocking the original author's temperament in the repo name/description. |
| `SRC-220` | Part 16 | YouTube Video (`I screwed up.`) | https://www.youtube.com/watch?v=o2CSJYXJBpc | Apology video two years prior after targeting Indian tutorial channels sparked harassment of Indian developers. |
| `SRC-221` | Part 16 | YouTube Video (FFmpeg Bounty) | https://www.youtube.com/watch?v=1oQ3KMeaH04 | Full record of Oct 2025 FFmpeg clash, $20k maintainer-removal bounty, Windscribe $21k counter-offer, VLC rebuke, and post deletion. |
| `SRC-222` | Origin 2 / Part 15 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2124989435154726982 | Replies on trillion-dollar US labs copying T3 Code: "Nah. Open source is open source, even if a trillion dollar company uses it!" |
| `SRC-223` | Part 15 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125026423769555308 | Mocks enterprise AI merge compliance checks: "if your lawyer pushed back on using agents to merge because of some dumb regulation, get a better lawyer." |
| `SRC-224` | Part 15 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125082769395220688 | Links newly merged `TRADEMARK.md` ~94s after `PR #41898` landed, stating it was written so AI agents know branding use is unlawful. |
| `SRC-225` | Part 14 | `@theo` X Post (Nov 19) | https://x.com/theo/status/2123255588570501585 | Apologizes to Google upon Gemini 4 Neon launch ("I'm so sorry Google. I didn't recognize your game") 7 days after bashing Carbon. |
| `SRC-226` | Part 14 / 16 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125193393450226024 | Refuses to apologize during Nov 24 crisis: "I'm not apologizing. I've done nothing wrong". |
| `SRC-227` | Origin 1 | `apps/marketing/src/i18n/en.ts#L32` | https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/i18n/en.ts#L32 | Marketing i18n source defining `"Steal our code (legally)"` on T3 Code's homepage GitHub link. |
| `SRC-228` | Part 2 / 9 | `.github/scripts/pr-limits.cjs` | https://github.com/pingdotgg/t3code/blob/main/.github/scripts/pr-limits.cjs | Automation script reading `.github/VOUCHED.td` to post ban notices and auto-close PRs from denounced accounts. |
| `SRC-229` | Part 2 / 9 | `.github/workflows/issue-vouch.yml` | https://github.com/pingdotgg/t3code/blob/main/.github/workflows/issue-vouch.yml | GitHub Actions workflow auto-closing issues opened by accounts denounced in `.github/VOUCHED.td`. |
| `SRC-230` | Origin 2 / Part 1 | `@theo` X Post (Nov 23) | https://x.com/theo/status/2124823227570745504 | First quote-tweet calling MIT fork UI `"a Chinese knockoff of T3 Code"` (`19:11:49 CST`). |
| `SRC-231` | Origin 2 / Part 1 | `@theo` X Post (Nov 23) | https://x.com/theo/status/2124825920808829077 | Follow-up self-quote 10m 42s later: `"Temu3 Code"` (`19:22:31 CST`). |
| `SRC-232` | Part 1 / 15 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125026248321872335 | Dismisses compliance limits on agent merges as `"really vague and dumb"` (`08:38 CST`). |
| `SRC-233` | Part 9 | `@theo` X Post (Nov 10) | https://x.com/theo/status/2120131740471861485 | Recounts Julius running `"a massive agent loop"` to batch-merge contributor PRs. |
| `SRC-234` | Part 9 | `@theo` X Post (Nov 16) | https://x.com/theo/status/2122203951701585972 | Contrasts managing 1 video editor vs. `"knowing what my 700 agents did last week"`. |
| `SRC-235` | Part 10 | `@theo` X Reply (Nov 8) | https://x.com/theo/status/2119240683680944172 | Replies `"Okay I'm stealing this"` to `@MiaAI_lab`'s fork feature 30s before dispatching `@bot`. |
| `SRC-236` | Part 10 | `@theo` X Post (Nov 16) | https://x.com/theo/status/2122243989579632770 | Mocks `@agent_wrapper` for borrowing T3 Code UI/code. |
| `SRC-237` | Part 10 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2125120041092108678 | Reports running auto-blocker script: `"Blocked like 100 slop accounts today."` |
| `SRC-238` | Part 14 | `@theo` X Post (Nov 11) | https://x.com/theo/status/2120238201705226498 | First post in Nov 11–12 sequence calling a female critic `"stupid bitch move"`. |
| `SRC-239` | Part 14 | `@theo` X Post (Nov 11) | https://x.com/theo/status/2120240569989624225 | Second post in sequence repeating `"stupid bitch"` against a female critic. |
| `SRC-240` | Part 14 | `@theo` X Post (Nov 12) | https://x.com/theo/status/2120596827980665018 | Calls Gemini 4 Carbon `"slow, awkward, stupid"`, then softens praise toward Google's team. |
| `SRC-241` | Part 14 | `@theo` X Reply (Nov 12) | https://x.com/theo/status/2120757007523447144 | Insults developer defending Qwen 3.8: `"If I was as dumb as you..."`. |
| `SRC-242` | Part 14 | `@theo` X Reply (Nov 18) | https://x.com/theo/status/2122838455483031925 | First reply in Nov 18 Threads confrontation threatening jail while mocking RSD. |
| `SRC-243` | Part 14 | `@theo` X Quote (Nov 19) | https://x.com/theo/status/2123166069905105319 | Follow-up quoting Astra review, calling GPT-6.2 Astra `"incredibly capable"` and praising OpenAI early access. |
| `SRC-244` | Part 14 | `@theo` X Post (Nov 21) | https://x.com/theo/status/2123906522728272178 | Asserts `"the average developer isn't very smart"`. |
| `SRC-245` | Part 14 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2125019705270477102 | Writes `"We already have all the high quality users, not surprised the low quality ones are now following"`. |
| `SRC-246` | Part 14 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125177947376300110 | Copy-paste Chinese reply #1 (`18:41:21 CST`): `"完了，又伤害中国人民的感情了。"`. |
| `SRC-247` | Part 14 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125178474759618748 | Copy-paste Chinese reply #2 (`18:43:26 CST`): `"完了，又伤害中国人民的感情了。"`. |
| `SRC-248` | Part 14 | `@theo` X Post (Nov 24) | https://x.com/theo/status/2125182476943556955 | Attacks audit author (`18:59:21 CST`): `"He deserves zero attention for his lies and slander."`. |
| `SRC-249` | Part 14 | `@theo` X Reply (Nov 24) | https://x.com/theo/status/2125194026253255092 | Copy-paste Chinese reply #3 (`19:45:14 CST`): `"完了，又伤害中国人民的感情了。"`. |

---

## 6. Official Sites, X Profile Anchors & Archived Post Media (`tco_resolved.json` / `missing_posts_full.json`)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-250` | Origin 1 | Official T3 Code Site | https://t3.codes/ | Official T3 Code landing domain (linked in Origin 1 and `TRADEMARK.md`). |
| `SRC-251` | Archive | `@theo` X Profile | https://x.com/theo | Profile anchor referenced across archived X posts (`missing_posts_full.json`). |
| `SRC-252` | Archive | `@maria_rcks` X Profile | https://x.com/maria_rcks | Profile anchor referenced in Post 08 (`missing_posts_full.json`). |
| `SRC-253` | Archive | `@vildanden_ai` X Profile | https://x.com/vildanden_ai | Profile anchor referenced in Post 15 (`missing_posts_full.json`). |
| `SRC-254` | Origin 1 | X Photo Attachment URL | https://twitter.com/realchendahuang/status/2125059292919394654/photo/1 | Auto-resolved photo permalink from Origin 1 (`all_18_posts.txt`). |
| `SRC-255` | Part 8 | X Photo Attachment URL | https://twitter.com/realchendahuang/status/2125392410763239723/photo/1 | Auto-resolved photo permalink from Part 8 (`all_18_posts.txt`). |
| `SRC-256` | Part 11 | X Photo Attachment URL | https://twitter.com/realchendahuang/status/2125394810559426993/photo/1 | Auto-resolved photo permalink from Part 11 (`all_18_posts.txt`). |
| `SRC-257` | Part 12 | X Photo Attachment URL | https://twitter.com/realchendahuang/status/2125395501663281198/photo/1 | Auto-resolved photo permalink from Part 12 (`all_18_posts.txt`). |
| `SRC-258` | Part 5 | X Media Image 1 | https://pbs.twimg.com/media/HX5Kh7ZbEAAWfQs?format=jpg&name=large | Post 05 screenshot 1 — archived locally at `evidence/15-connect-no-e2e.jpg`. |
| `SRC-259` | Part 5 | X Media Image 2 | https://pbs.twimg.com/media/HX5KkenawAAovwu?format=jpg&name=large | Post 05 screenshot 2 — archived locally at `evidence/16-pr32945-ovh-caddy-gateway.jpg`. |
| `SRC-260` | Part 5 | X Media Image 3 | https://pbs.twimg.com/media/HX5KmppbEAEIuEs?format=jpg&name=large | Post 05 screenshot 3 (`ManagedEndpointProvider.ts`) — archived locally at `evidence/extra/x-post05-3-managed-endpoint-provider.jpg`. |
| `SRC-261` | Part 5 | X Media Image 4 | https://pbs.twimg.com/media/HX5KrB0aAAA5drH?format=jpg&name=large | Post 05 screenshot 4 (`SECURITY.md`) — archived locally at `evidence/extra/x-post05-4-security-md-intended.jpg`. |
| `SRC-262` | Part 8 | X Media Image 1 | https://pbs.twimg.com/media/HX7o-eha8AA4q4S?format=jpg&name=large | Post 08 screenshot 1 (`missing_posts_full.json` attached media). |
| `SRC-263` | Part 8 | X Media Image 2 | https://pbs.twimg.com/media/HX7pAygbQAAB8YJ?format=jpg&name=900x900 | Post 08 screenshot 2 (`missing_posts_full.json` attached media). |
| `SRC-264` | Part 8 | X Media Image 3 | https://pbs.twimg.com/media/HX7pCtObwAAHnfj?format=jpg&name=large | Post 08 screenshot 3 (`missing_posts_full.json` attached media). |
| `SRC-265` | Part 8 | X Media Image 4 | https://pbs.twimg.com/media/HX7pFI-b0AAP-1S?format=jpg&name=large | Post 08 screenshot 4 (`missing_posts_full.json` attached media). |
| `SRC-266` | Part 8 | X Media Image 5 | https://pbs.twimg.com/media/HX7pHPMaoAA58nP?format=jpg&name=large | Post 08 screenshot 5 (`missing_posts_full.json` attached media). |
| `SRC-267` | Part 11 | X Media Image 1 | https://pbs.twimg.com/media/HX7rOqgbAAAUU31?format=jpg&name=medium | Post 11 screenshot 1 (`PR #42450`) — archived locally at `evidence/06-pr42450-absolute-path.jpg`. |
| `SRC-268` | Part 11 | X Media Image 2 | https://pbs.twimg.com/media/HX7rP4_aIAAPWbP?format=jpg&name=medium | Post 11 screenshot 2 (`PR #42376`) — archived locally at `evidence/extra/x-post11-2-pr42376-windows-optout.jpg`. |
| `SRC-269` | Part 11 | X Media Image 3 | https://pbs.twimg.com/media/HX7rSD-bkAAgX6q?format=jpg&name=medium | Post 11 screenshot 3 (`PR #42464`) — archived locally at `evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg`. |
| `SRC-270` | Part 11 | X Media Image 4 | https://pbs.twimg.com/media/HX7rTssacAAl6pC?format=jpg&name=medium | Post 11 screenshot 4 (100MB dump CLI audit) — archived locally at `evidence/extra/x-post11-4-dump-264-claude-records.jpg`. |
| `SRC-271` | Part 12 | X Media Image 1 | https://pbs.twimg.com/media/HX7r3CLaAAA4622?format=jpg&name=medium | Post 12 screenshot 1 (`PR #42380`) — archived locally at `evidence/08-pr42380-220w-ip-axiom.jpg`. |
| `SRC-272` | Part 12 | X Media Image 2 | https://pbs.twimg.com/media/HX7r5CWaIAIKVFb?format=jpg&name=medium | Post 12 screenshot 2 (`PR #42285`) — archived locally at `evidence/09-pr42285-delete-account-leftover.jpg`. |
| `SRC-273` | Part 12 | X Media Image 3 | https://pbs.twimg.com/media/HX7r6nBa8AAGPfQ?format=jpg&name=medium | Post 12 screenshot 3 (`PR #42459`) — archived locally at `evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg`. |
| `SRC-274` | Part 12 | X Media Image 4 | https://pbs.twimg.com/media/HX7r8D4a8AEs0SC?format=jpg&name=medium | Post 12 screenshot 4 (`PR #42466`) — archived locally at `evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg`. |
| `SRC-275` | Part 17 | X Media Image 1 | https://pbs.twimg.com/media/HX757XRaEAAIY3J?format=jpg&name=medium | Post 17 screenshot 1 (Theo 2023 sponsor tweet) — archived locally at `evidence/extra/x-post17-1-theo-youtube-sponsors.jpg`. |
| `SRC-276` | Part 17 | X Media Image 2 | https://pbs.twimg.com/media/HX759AjasAA0h87?format=jpg&name=medium | Post 17 screenshot 2 (`@maria_rcks` Aug 2026 tweet) — archived locally at `evidence/extra/x-post17-2-maria-endless-deleted.jpg`. |
| `SRC-277` | Part 17 | X Media Image 3 | https://pbs.twimg.com/media/HX75-j5aUAAi4-W?format=jpg&name=medium | Post 17 screenshot 3 (`openai/codex#45444`) — archived locally at `evidence/extra/x-post17-3-codex-45444-regression.jpg`. |
| `SRC-278` | Part 17 | X Media Image 4 | https://pbs.twimg.com/media/HX76AdMakAApZ42?format=jpg&name=medium | Post 17 screenshot 4 (`cliproxy-setup.md` Gist) — archived locally at `evidence/19-cliproxy-gist-555pct.jpg`. |
| `SRC-279` | Part 17 | X Media Image 5 | https://pbs.twimg.com/media/HX76CV4bIAAUvS7?format=jpg&name=medium | Post 17 screenshot 5 (`@rauchg` Apr 2024 tweet) — archived locally at `evidence/extra/x-post17-5-rauchg-vercel-sponsor.jpg`. |

---

## 7. Upstream Audit Snapshots & Post-Audit Tracking (`9d3195b4` to `ca81b7b9`)

| Ref | Part | Artifact | Direct URL | Verification Summary |
|---|---|---|---|---|
| `SRC-280` | Snapshot | Baseline Commit `9d3195b4` (`#42000`) | https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 | Primary baseline snapshot audited across the original investigation (`2026-11-24T08:41:04Z`). |
| `SRC-281` | Snapshot | Post-Audit HEAD `ca81b7b9` (`#42634`) | https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd | Latest verified upstream `main` commit (`2026-11-25T06:49:37Z`, `259` commits ahead of `9d3195b4`). |
| `SRC-282` | Post-Audit | PR #42299 | https://github.com/pingdotgg/t3code/pull/42299 | `fix(server): analytics no longer reads or sends Codex and Claude account IDs` (merged `2026-11-24T20:46:02Z`). |
| `SRC-283` | Post-Audit | Commit `84e4264b` (`#42299`) | https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07 | Exact commit removing `~/.codex/auth.json` and `~/.claude.json` reads from `Identify.ts` while retaining `connect`/`device` owner hashing. |
| `SRC-284` | Post-Audit | PR #42465 | https://github.com/pingdotgg/t3code/pull/42465 | `fix(server): analytics report custom models as custom:<provider>, not their names` (merged `2026-11-24T23:10:38Z`). |
| `SRC-285` | Post-Audit | Commit `6b3899f2` (`#42465`) | https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da | Exact commit updating `ProviderDimensions.ts` `modelLabel` to emit `custom:<driver>` for non-catalog models. |
| `SRC-286` | Post-Audit | PR #42630 | https://github.com/pingdotgg/t3code/pull/42630 | `feat(server): CI runners don't need telemetry` (merged `2026-11-25T05:27:52Z`). |
| `SRC-287` | Post-Audit | Commit `c925b9ab` (`#42630`) | https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b | Exact commit adding `isCiEnvironment` across 13 CI env vars in `otelEnvironment.ts` and `AnalyticsService.ts`. |
| `SRC-288` | Post-Audit | PR #42629 | https://github.com/pingdotgg/t3code/pull/42629 | `fix(telemetry): honor DO_NOT_TRACK` (merged `2026-11-25T05:46:55Z`). |
| `SRC-289` | Post-Audit | Commit `ef4a1643` (`#42629`) | https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64 | Exact commit wiring `isDoNotTrackSet`, `DesktopShellEnvironment.ts` forwarding, and `otelEnvironment.ts` enforcement. |
| `SRC-290` | Post-Audit | PR #41210 | https://github.com/pingdotgg/t3code/pull/41210 | `fix(antigravity): link directly to Google account verification on failed turns` (merged `2026-11-25T05:23:36Z`). |
| `SRC-291` | Post-Audit | Commit `3e74a0aa` (`#41210`) | https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836 | Exact commit parsing `cloudcode-pa.googleapis.com` `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) payloads in `AntigravityTurnOutcome.ts`. |
| `SRC-292` | Post-Audit | PR #42119 | https://github.com/pingdotgg/t3code/pull/42119 | `fix(server): deleting a thread actually removes its history` (merged `2026-11-25T05:58:26Z`, closing `Issue #17845`). |
| `SRC-293` | Post-Audit | Commit `91f0b32e` (`#42119`) | https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e | Exact commit adding `thread-content.purge` outbox cleanup in `ThreadDeletion.ts` and `ProjectionMaintenance.ts`. |
| `SRC-294` | Post-Audit | PR #42577 | https://github.com/pingdotgg/t3code/pull/42577 | `fix(resource-monitor): Windows stops reading memory and command lines of untracked processes` (merged `2026-11-25T04:09:53Z`). |
| `SRC-295` | Post-Audit | Commit `af276ccb` (`#42577`) | https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c | Exact commit narrowing Windows `t3-resource-monitor` memory/cmd collection while Linux/macOS two-stage discovery remains. |
| `SRC-296` | Post-Audit | PR #42545 | https://github.com/pingdotgg/t3code/pull/42545 | `fix(server): Antigravity CLI auto-update is actually disabled` (merged `2026-11-25T03:09:49Z`). |
| `SRC-297` | Post-Audit | Commit `4da8d19d` (`#42545`) | https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc | Exact commit switching `AGY_CLI_DISABLE_AUTO_UPDATE` from `"1"` to `"true"` in `antigravityAuthSupport.ts`. |
| `SRC-298` | Post-Audit | PR #42311 | https://github.com/pingdotgg/t3code/pull/42311 | `feat(connect): tell people when a new T3 Connect device signs in` (merged `2026-11-24T18:44:13Z`). |
| `SRC-299` | Post-Audit | Commit `ece5f21b` (`#42311`) | https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd | Exact commit adding new-device sign-in notices while leaving `requireConnectDeviceApproval` default `false`. |
| `SRC-300` | Post-Audit | PR #42356 | https://github.com/pingdotgg/t3code/pull/42356 | `fix(connect): respect relay tracing opt-outs and remove machine details` (`2026-11-24T21:12:51Z`). |
| `SRC-301` | Post-Audit | PR #42394 | https://github.com/pingdotgg/t3code/pull/42394 | `fix(mobile): analytics uses its own random device id` (`2026-11-24T20:19:23Z`). |
| `SRC-302` | Post-Audit | PR #42397 | https://github.com/pingdotgg/t3code/pull/42397 | `fix(server): MCP tool analytics send only closed error codes and delivery values` (`2026-11-24T21:29:31Z`). |
| `SRC-303` | Post-Audit | PR #42398 | https://github.com/pingdotgg/t3code/pull/42398 | `fix(server): agent feedback no longer links to the install` (`2026-11-24T20:52:12Z`). |
| `SRC-304` | Post-Audit | PR #42413 | https://github.com/pingdotgg/t3code/pull/42413 | `fix(desktop): use Clerk's owner-only token file mode` (`2026-11-24T23:02:32Z`). |
| `SRC-305` | Post-Audit | PR #42415 | https://github.com/pingdotgg/t3code/pull/42415 | `feat(mobile): connection traces get their own switch` (`2026-11-24T21:38:18Z`). |
| `SRC-306` | Post-Audit | PR #42339 | https://github.com/pingdotgg/t3code/pull/42339 | `fix(server): Antigravity quota failures keep the 'Resets in' reset time` (`2026-11-24T19:02:16Z`). |
| `SRC-307` | Post-Audit | PR #42475 | https://github.com/pingdotgg/t3code/pull/42475 | `fix(server): Antigravity model refresh explains why setup is broken` (`2026-11-24T23:14:32Z`). |
| `SRC-308` | `ca81b7b9` Auth Audit | PR #37042 | https://github.com/pingdotgg/t3code/pull/37042 | Nov 15 patch adding `Secure` cookie flag on HTTPS only, leaving `t3 up --lan` plain HTTP cookies without `Secure`. |
| `SRC-309` | `ca81b7b9` Auth Audit | `SessionStore.ts#L492-L493` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493 | Sets `DEFAULT_SESSION_TTL = Duration.days(30)` (OS shell equivalent) and `DEFAULT_WEBSOCKET_TOKEN_TTL = Duration.minutes(5)`. |
| `SRC-310` | `ca81b7b9` Auth Audit | `http.ts#L215-L221` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221 | Issues cookie `Secure` flag strictly on `https:`, omitting `Secure` under plaintext `--lan` HTTP. |
| `SRC-311` | `ca81b7b9` Auth Audit | `EnvironmentAuth.ts#L798-L806` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806 | `isBrowserOriginAllowed` returns `true` when `Origin` header is omitted, enabling non-browser cookie replay. |
| `SRC-312` | `ca81b7b9` Auth Audit | `EnvironmentAuth.ts#L1175-L1186` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186 | Issues 1h token with DPoP `proofKeyThumbprint`, otherwise falls back to an unbound 30-day `bearer-access-token`. |
| `SRC-313` | `ca81b7b9` Auth Audit | `EnvironmentAuth.ts#L1506-L1511` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511 | `revokeClientSession` blocks self-revocation with `ServerAuthForbiddenOperationError` (`current_session_revoke_not_allowed`). |
| `SRC-314` | `ca81b7b9` Auth Audit | `environmentHttp.ts#L595-L679` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679 | Environment HTTP auth route contracts lacking any logout endpoint. |
| `SRC-315` | `ca81b7b9` Auth Audit | `EnvironmentAuth.ts#L1553-L1622` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622 | Appends WebSocket tickets in URL `?wsTicket=`, requiring DPoP only on DPoP-bound `rpc` tickets while skipping replay protection on Bearer `rpc` and all `media` tickets. |
| `SRC-316` | `ca81b7b9` Auth Audit | `SessionStore.ts#L1086-L1156` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156 | `verifyWebSocketToken` checks signature, expiry, audience, and revocation without any single-use `jti` replay store. |
| `SRC-317` | `ca81b7b9` Auth Audit | `startupAccess.ts#L71-L108` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108 | `isPrivateNetworkAddress` checks `NodeNet.isIPv4`, misclassifying IPv6 loopback `::1` and triggering `socket.destroy()` on Tailscale Serve / Connect tunnels. |
| `SRC-318` | `ca81b7b9` Repo Audit | `GitVcsDriverCore.ts#L6144-L6205` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205 | Worktree creation automatically runs `git submodule update --init --recursive` whenever `.gitmodules` exists. |
| `SRC-319` | `ca81b7b9` Repo Audit | `VcsProcess.ts#L145-L157` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157 | General Git runner enforces `safe.bareRepository=explicit` without globally setting `core.hooksPath=/dev/null`, while inheriting host `process.env` (`SSH_AUTH_SOCK`, `GITHUB_TOKEN`). |
| `SRC-320` | `ca81b7b9` Repo Audit | `ClaudeAdapterV2.ts#L5982-L5985` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985 | Live Claude sessions load `user`/`project`/`local` settings and run `.claude/settings.json` `SessionStart` hooks synchronously. |

---

## 8. Community Commentary & External Submissions

| Ref | Source | Contributor | Direct URL | Archive & Notes |
|---|---|---|---|---|
| `SRC-321` | Community Issue #1 | `@opserx` | https://github.com/realchendahuang/before-you-install-t3code/issues/1 | Verbatim archive of *"The Case Against Theo"* (`2026-11-25T06:53:49Z`), stored at [`docs/community/issue-1-the-case-against-theo.md`](./community/issue-1-the-case-against-theo.md) with primary-source precision notes on `PR #42450` and `PR #41237`. |
| `SRC-322` | `v0.1.12` Release Audit | Release `v0.1.12` | https://github.com/pingdotgg/t3code/releases/tag/v0.1.12 | Stable release (`2026-11-25T07:36:07Z`) tagging `ca81b7b9`; top-level highlights omit all privacy/telemetry/SQLite/security fixes while auto-generated changelog truncates at `PR #42196`. |
| `SRC-323` | `ca81b7b9` Hardening | `publicConfig.ts#L19-L21` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/cloud/publicConfig.ts#L19-L21 | Declares build-time `__T3CODE_BUILD_RELAY_CLIENT_OTLP_TRACES_URL__` / dataset / token macros (resolving to `us-east-1.aws.edge.axiom.co` in shipped desktop builds). |
| `SRC-324` | `ca81b7b9` Hardening | `relay.ts#L119-L131` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/relay.ts#L119-L131 | `RelayAgentActivityState` schema enumerating `projectTitle`, `threadTitle`, `phase`, `headline`, `detail`, `modelTitle`, `updatedAt`, and `deepLink` sent to T3 Connect relay. |
| `SRC-325` | `ca81b7b9` Hardening | `AgentAwarenessRelay.ts#L506-L579` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/relay/AgentAwarenessRelay.ts#L506-L579 | Server publisher dispatching `RelayAgentActivityState` whenever `publishAgentActivity` is enabled, bypassing `T3CODE_TELEMETRY_ENABLED`, `DO_NOT_TRACK`, and Managed Policy `limits.telemetry`. |
| `SRC-326` | `ca81b7b9` Hardening | `managedPolicy.ts#L129-L137` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/managedPolicy.ts#L129-L137 | `ManagedPolicyDocument` schema requiring non-empty `organization: TrimmedNonEmptyString`. |
| `SRC-327` | `ca81b7b9` Hardening | `managedPolicyFile.ts#L51-L57` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/shared/src/managedPolicyFile.ts#L51-L57 | Strict Managed Policy decoder (`{ onExcessProperty: "error" }`), failing closed and blocking startup on missing `organization` or unknown fields. |
| `SRC-328` | `ca81b7b9` ACP Audit | `AcpRegistrySessions.ts` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/provider/AcpRegistrySessions.ts | Generic `acpRegistry` session driver proving T3 Code can run official `agy acp` over standard JSON-RPC without `v1internal` spoofing, fake `SSH_CONNECTION`, or keyring scraping. |
| `SRC-329` | `ca81b7b9` ACP Audit | `builtInDrivers.ts` | https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/provider/builtInDrivers.ts | Built-in provider driver registry exposing `acpRegistry` alongside the built-in Antigravity driver. |
| `SRC-330` | Migration Audit | `v0.1.11` Migration `102` | https://github.com/pingdotgg/t3code/blob/v0.1.11/apps/server/src/persistence/Migrations/102_ThreadItemCounts.ts | Latest SQLite migration in official `v0.1.11` (`102`), baseline for fork upgrade/collision checks. |
| `SRC-331` | Migration Audit | `v0.1.12` Migration `117` | https://github.com/pingdotgg/t3code/blob/v0.1.12/apps/server/src/persistence/Migrations/117_WorkflowMailSender.ts | Latest SQLite migration in official `v0.1.12` (`117`). |
| `SRC-332` | Fork Audit | `m3code` `antigravityUsageLimits.ts` | https://github.com/MiaAI-Lab/m3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts | Confirms `MiaAI-Lab/m3code` retains upstream Antigravity `v1internal`/keyring code despite stripping telemetry. |
| `SRC-333` | Fork Audit | `m3code` Migration `138` | https://github.com/MiaAI-Lab/m3code/blob/main/apps/server/src/persistence/Migrations/138_WorkflowRunTags.ts | Confirms `MiaAI-Lab/m3code` renumbered SQLite migrations (`103` reassigned, upstream `103` moved to `126`, reaching `138`), making shared `~/.t3` unsafe. |
| `SRC-334` | Fork Audit | `stardust` `antigravityUsageLimits.ts` | https://github.com/zds-xiaoxin/stardust/blob/main/apps/server/src/provider/antigravityUsageLimits.ts | Confirms `zds-xiaoxin/stardust` retains upstream Antigravity `v1internal`/keyring code. |
| `SRC-335` | Fork Audit | `stardust` Migration `105` | https://github.com/zds-xiaoxin/stardust/blob/main/apps/server/src/persistence/Migrations/105_TaskFolders.ts | Confirms `zds-xiaoxin/stardust` advances SQLite schema to `105` (one-way upgrade relative to official `v0.1.11`). |
| `SRC-336` | Alternatives Audit | `paseo-antigravity` `usage.ts` | https://github.com/robbin/paseo-antigravity/blob/main/server/usage.ts | Official-CLI quota polling (`agy` `/usage --output-format json`) without spoofing `antigravity/hub` or `v1internal`. |
| `SRC-337` | Alternatives Audit | `robbin/paseo-antigravity` | https://github.com/robbin/paseo-antigravity | Open-source Antigravity plugin for Paseo using official `agy acp` and CLI `/usage`. |
| `SRC-338` | Alternatives Audit | `getpaseo/paseo` | https://github.com/getpaseo/paseo | Open-source multi-agent client with end-to-end encrypted remote transport. |
| `SRC-339` | Alternatives Audit | `stablyai/orca` | https://github.com/stablyai/orca | MIT-licensed multi-agent desktop client with E2EE remote access, in-app telemetry opt-out UI, and `DO_NOT_TRACK=1` support. |
