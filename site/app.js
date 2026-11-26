(function () {
  "use strict";

  var REPO_BLOB = "https://github.com/realchendahuang/before-you-install-t3code/blob/main/";

  var RISK_MATRIX = [
    {
      id: "telemetry-gdpr",
      domain: "Telemetry & Post-GDPR Privacy",
      partsLabel: "Parts 1, 7, 11, 12",
      partFilters: ["Part 1", "Part 7", "Part 11", "Part 12"],
      severity: "critical",
      severityLabel: "Critical",
      findings:
        'Default-on PostHog analytics (PR #174) while homepage promised "No telemetry / Unless you opt in. Full stop." (deleted in 3bdaa6e1 on Jun 18); raw event copies retained at closed-source ingest.t3.codes (PR #15028); unsalted SHA-256 cross-tool hashing of ~/.codex/auth.json & ~/.claude.json (Identify.ts); 4 rejected opt-out PRs (#13458, #16763, #21248, #27077); Managed Policy blind spots (docs/user/telemetry.md); overnight GDPR PRs admitting 2.2M/hr IP + UA spans kept 30 days in Axiom (#42380), git.cwd path leaks (#42450), ignored Win/Mac opt-outs (#42376, #42464), broken account deletion (#42285), and mixed anonymous batches (#42466).',
      status:
        "Post-audit ca81b7b9 (Nov 25 14:49 CST): PR #42299 stopped reading ~/.codex/auth.json & ~/.claude.json in Identify.ts, #42465 masks non-catalog models as custom:<driver>, #42630 disables CI defaults, and #42629 honors DO_NOT_TRACK=1; AnalyticsService.ts:156 still writes startup ID unconditionally, DesktopShellEnvironment.ts omits OTEL_SDK_DISABLED, app.t3.codes has no toggle, and ingest.t3.codes remains closed-source.",
      dossierTitle: "Dossier 01 · Telemetry & GDPR",
      dossierUrl: REPO_BLOB + "docs/dossiers/01-telemetry-and-gdpr-timeline.md"
    },
    {
      id: "local-safety",
      domain: "Local Safety & Silent Advisories",
      partsLabel: "Parts 2, 3, 13",
      partFilters: ["Part 2", "Part 3", "Part 13"],
      severity: "critical",
      severityLabel: "Critical",
      findings:
        'Sidebar "permanent delete" only appends "thread.deleted" in statev2.sqlite (25.9–41.6 GB bloat, #17845); t3-resource-monitor scans all OS processes with command lines (ProcessesToUpdate::All, #11222, PR #41889); Claude Auto mode silently approves git push --force on 3rd attempt (#15353, 52+ days open); 21h removal of private model filter for slopalytics.com (#41237); 0 GitHub Security Advisories despite silent patches (#39483, #41757, #42386, #42504); open Windows Base64 PowerShell AV issue (#30997); opening untrusted repos auto-runs recursive .gitmodules init, lacks global core.hooksPath=/dev/null, and runs live Claude SessionStart hooks with inherited GITHUB_TOKEN/SSH_AUTH_SOCK; SECURITY.md declares OS-wide filesystem:read and iOS HTTP intentional.',
      status:
        "Post-audit ca81b7b9: PR #42119 closed #17845 with async purge (keeps live fork/merge-back/subagent history + tombstones; requires offline VACUUM to shrink file) & #42577 narrowed Windows process-monitor reads (Linux/macOS ProcessesToUpdate::All & #41889 stay open); #15353, #26489, #30997, and repo hook/SSH_AUTH_SOCK inheritance remain open with 0 Security Advisories.",
      dossierTitle: "Dossier 02 · Local Safety & Security",
      dossierUrl: REPO_BLOB + "docs/dossiers/02-local-safety-and-security-audit.md"
    },
    {
      id: "antigravity-connect",
      domain: "Antigravity ToS & T3 Connect Relay",
      partsLabel: "Parts 4, 5",
      partFilters: ["Part 4", "Part 5"],
      severity: "high",
      severityLabel: "High",
      findings:
        "docs/user/faq.md guarantees Google Antigravity ToS safety while antigravityUsageLimits.ts extracts OS keyring/Windows CredReadW tokens, spoofs antigravity/hub/2.24.0, and hits private v1internal endpoints; antigravityAuthSupport.ts injects fake SSH_CONNECTION causing cross-account routing (#41973); fresh $20 account banned in 3 minutes (#41536); PR #33800 wires spoofed claude/xai/antigravity CLIProxyAPI hub polling; T3 Connect has zero E2E encryption, default-off requireConnectDeviceApproval (#36419), and an open OVH Caddy gateway (PR #32945); ca81b7b9 also exposes 30-day plaintext --lan cookies (PR #37042) accepted without Origin, unrevocable 30-day non-DPoP Bearer tokens, replayable 5-min URL ?wsTicket= tokens, and NodeNet.isIPv4 dropping ::1 tunnels.",
      status:
        "Post-audit ca81b7b9: PR #41210 added Google VALIDATION_REQUIRED verification links on failed turns (confirming triggers); antigravityUsageLimits.ts, fake SSH_CONNECTION, zed fallback, cliproxyApi.ts, zero T3 Connect E2E (#32098), default-false requireConnectDeviceApproval, and --lan cookie / Bearer / ?wsTicket= / ::1 bugs remain active.",
      dossierTitle: "Dossier 03 · Antigravity & Connect",
      dossierUrl: REPO_BLOB + "docs/dossiers/03-antigravity-tos-and-t3connect-relay.md"
    },
    {
      id: "business-77k",
      domain: "Business Ledger, Sponsors & 77k Stars",
      partsLabel: "Parts 6, 8, 17, 18",
      partFilters: ["Part 6", "Part 8", "Part 17", "Part 18"],
      severity: "high",
      severityLabel: "High",
      findings:
        "$800k+ spend on free client (162 T3 mentions vs 0 for paid products); 31.7T tokens/day ($10.19M/day) compute radar traded for $300k+ OpenAI early-access tokens & VC outreach; angel overlaps with Vibe Kanban & Daytona; sponsor stack (Clerk, Axiom, Vercel exclusivity); Codex 0% exploit (Endless / codex#45444); 10-account CLIProxyAPI Gist (555% quota) vs FAQ ban warning; 5-prompt / 30s-idle toast firing host-credential PUT user/starred/... (#27832, #29922, #29987), bypassing Macroscope & leaving driver.ts#L60-L99 unpinned repo starring unfixed for 19 days.",
      status:
        "Verified at ca81b7b9: driver.ts#L60-L99 unpinned starring & zhilsinger review remain unaddressed; repo at 77k+ stars vs ~129 watchers.",
      dossierTitle: "Dossier 04 · Business & 77k Stars",
      dossierUrl: REPO_BLOB + "docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md"
    },
    {
      id: "governance-trademark",
      domain: "Governance, Trademarks & History",
      partsLabel: "Origins 1–2, Parts 9, 10, 15, 16",
      partFilters: ["Origin", "Part 9", "Part 10", "Part 15", "Part 16"],
      severity: "medium-high",
      severityLabel: "Medium-High",
      findings:
        '500 commits/day / 700 agents / yolo merges vs. CONTRIBUTING.md ("here\'s my advice: Don\'t"), .github/VOUCHED.td denouncement auto-bans, 174 unwanted labels, Plan mode removal (#5551, #9190, #33131), and #33639 insults; public @bot fork-scraping (@MiaAI_lab), Community Notes demonetization call, and auto-blocker; 0 USPTO registrations for T3 Code/T3 Tools/T3 Connect (PING LABS 97294243 abandoned; EquipmentShare 7795672 registered) when threatening GitHub takedown; retroactive PR #41898 TRADEMARK.md 17h later; 2024–2026 pattern (vsc-material-but-i-wont-sue-you, Indian dev backlash, $20k FFmpeg bounty, deleted Nov 25 4AM closed-source threat).',
      status:
        "CONTRIBUTING.md / .github/VOUCHED.td & TRADEMARK.md remain live on main at ca81b7b9.",
      dossierTitle: "Dossier 05 · Governance & Trademark",
      dossierUrl: REPO_BLOB + "docs/dossiers/05-governance-trademark-and-history.md"
    },
    {
      id: "tweet-dataset",
      domain: "1,151-Tweet Quantitative Dataset",
      partsLabel: "Part 14",
      partFilters: ["Part 14", "Charts"],
      severity: "baseline",
      severityLabel: "Baseline",
      findings:
        "Exhaustive Nov 7–24 corpus (n = 1,151, 17.24 days, 66.8 posts/day, 75.6% replies, 2.7m median gap): 0.0% profanity/insults directed at 20 big-tech executives/staff/KOLs (0/43 strict primary-@, 32.6% gratitude) vs. 8.0% hostility toward ordinary developers (61/766) and a 4.0x surge to 14.4% (19/132) in direct personal insults during the 25-hour Chinese-fork crisis window.",
      status:
        "Reproducible regex audit (9d3195b4 / ca81b7b9) with 4 interactive forensic charts and archived PNG charts.",
      dossierTitle: "Dossier 06 · 1,151-Tweet Dataset",
      dossierUrl: REPO_BLOB + "docs/dossiers/06-tweet-forensic-dataset-1151.md"
    },
    {
      id: "source-index",
      domain: "Complete Primary URL & Evidence Catalogs",
      partsLabel: "SRC-001..SRC-320 & EV-001..EV-108",
      partFilters: ["All"],
      severity: "baseline",
      severityLabel: "Baseline",
      findings:
        "Full cross-referenced catalog of all 320 canonical https:// URLs across README.md, the 6 deep dossiers, post-audit ca81b7b9 tracking, canonical_refs.txt, tco_resolved.json, all_18_posts.txt, and missing_posts_full.json, paired with the 108-asset Evidence Index.",
      status:
        "100% canonicalized direct HTTPS links (320 URLs, zero t.co links) and 108/108 indexed visual receipts.",
      dossierTitle: "Complete Source Index (320)",
      dossierUrl: REPO_BLOB + "docs/COMPLETE-SOURCE-INDEX.md",
      extraUrlTitle: "Evidence Index (108)",
      extraUrl: REPO_BLOB + "docs/EVIDENCE-INDEX.md",
      fullSpan: true
    }
  ];

  var CHARTS = {
    chart1: {
      src: "./charts/theo-chart-1-overview.html",
      png: "./evidence/charts/theo-chart-1-overview.png",
      desc: "Chart 1 · Corpus Structure & Product Focus (n = 1,151: 75.6% replies, 2.7m median gap, 162 T3 mentions vs. 0 for legacy paid products)."
    },
    chart2: {
      src: "./charts/theo-chart-2-rhythm.html",
      png: "./evidence/charts/theo-chart-2-rhythm.png",
      desc: "Chart 2 · 24-Hour PST Cadence & 17-Day Trajectory (233 posts 00–04 PST; 0 posts 08–09 PST; spikes align with releases & fights)."
    },
    chart3: {
      src: "./charts/theo-chart-3-double-standard.html",
      png: "./evidence/charts/theo-chart-3-double-standard.png",
      desc: "Chart 3 · Selective Politeness Split (0.0% VIP hostility vs. 8.0% developer hostility and 14.4% crisis surge)."
    },
    chart4: {
      src: "./charts/theo-chart-4-cn-crisis.html",
      png: "./evidence/charts/theo-chart-4-cn-crisis.png",
      desc: "Chart 4 · 25-Hour Chinese-Fork Crisis Timeline (132 posts across 3 waves; 4.0× personal insult surge)."
    }
  };

  var D1 = REPO_BLOB + "docs/dossiers/01-telemetry-and-gdpr-timeline.md";
  var D2 = REPO_BLOB + "docs/dossiers/02-local-safety-and-security-audit.md";
  var D3 = REPO_BLOB + "docs/dossiers/03-antigravity-tos-and-t3connect-relay.md";
  var D4 = REPO_BLOB + "docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md";
  var D5 = REPO_BLOB + "docs/dossiers/05-governance-trademark-and-history.md";
  var D6 = REPO_BLOB + "docs/dossiers/06-tweet-forensic-dataset-1151.md";

  var EVIDENCE_RECEIPTS = [
    {
      path: "./evidence/00-cover-en.png",
      part: "Origin",
      parts: ["Origin"],
      title: "Audit Cover Banner (English)",
      caption: "Before You Install T3 Code — 18-part independent audit banner.",
      dossier: REPO_BLOB + "README.md"
    },
    {
      path: "./evidence/00-cover-zh.png",
      part: "Origin",
      parts: ["Origin"],
      title: "Audit Cover Banner (Chinese Editions)",
      caption: "Chinese-language audit banner archived for zh-CN / zh-TW editions.",
      dossier: REPO_BLOB + "docs/i18n/README.zh-CN.md"
    },
    {
      path: "./evidence/01-origin-theo-threat.png",
      part: "Origin",
      parts: ["Origin", "Part 15"],
      title: "Public GitHub Account Takedown Threat",
      caption: "Theo's Nov 23, 2026 post demanding an MIT fork author rename immediately or have their GitHub account taken down.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2124829315657576890"
    },
    {
      path: "./evidence/extra/p1-3-maria-t3libre.png",
      part: "Origin",
      parts: ["Origin", "Part 15"],
      title: "Employee Public Fork maria-rcks/t3libre",
      caption: "T3 team member @maria_rcks hosting a public fork named maria-rcks/t3libre ('T3 Code, liberated') without takedown threats.",
      dossier: D5
    },
    {
      path: "./evidence/extra/p1-4-github-t3code-search.png",
      part: "Origin",
      parts: ["Origin", "Part 15"],
      title: "GitHub Search for English-Named t3code Forks",
      caption: "GitHub search results showing numerous English-language forks and tools using t3code / T3 Code in their names.",
      dossier: D5
    },
    {
      path: "./evidence/extra/p1-5-x-get-better-lawyer.png",
      part: "Part 15",
      parts: ["Origin", "Part 15"],
      title: '"Get a better lawyer" Tweet (3h Before TRADEMARK.md)',
      caption: "Theo mocking compliance reviews 3 hours before merging TRADEMARK.md and issuing trademark claims.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2125026423769555308"
    },
    {
      path: "./evidence/02-no-telemetry-removed.png",
      part: "Part 1",
      parts: ["Part 1"],
      title: 'Commit 3bdaa6e1 Deletes "No telemetry" Promise',
      caption: 'Commit 3bdaa6e1 on June 18, 2026 silently deleting "No telemetry / Unless you opt in. Full stop." after 3+ months of default collection.',
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3"
    },
    {
      path: "./evidence/03-identify-codex-claude.png",
      part: "Part 1",
      parts: ["Part 1"],
      title: "Identify.ts Cross-Tool Credential Hashing",
      caption: "Identify.ts reading ~/.codex/auth.json and ~/.claude.json to transmit unsalted SHA-256 owner hashes across tools.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts"
    },
    {
      path: "./evidence/extra/t3code-5-pr-21506-theo-owner-tracking.png",
      part: "Part 1",
      parts: ["Part 1"],
      title: "PR #21506 Cross-Install Owner Tracking",
      caption: "PR #21506 authored by t3dotgg introducing installId and cross-tool owner attribution.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/21506"
    },
    {
      path: "./evidence/04-issue1397-no-optout.png",
      part: "Part 1",
      parts: ["Part 1"],
      title: "Issue #1397 Closed as Not Planned",
      caption: "Maintainer Julius closing Issue #1397 and stating they will not make opting out easier.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/1397"
    },
    {
      path: "./evidence/extra/t3code-4-pr-27077-rejected.png",
      part: "Part 1",
      parts: ["Part 1"],
      title: "PR #27077 Rejected as Unwanted (147 Passing Tests)",
      caption: "Community opt-out PR #27077 closed unmerged as unwanted despite 147 passing tests and Macroscope approval.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/27077"
    },
    {
      path: "./evidence/05-telemetry-cant-disable.png",
      part: "Part 7",
      parts: ["Part 1", "Part 7"],
      title: "docs/user/telemetry.md Documented Blind Spots",
      caption: "Official docs confirming hosted web app has no toggle, mobile is outside Managed Policy, and Publish agent activity ignores opt-outs.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md"
    },
    {
      path: "./evidence/extra/p5-1-x-theo-managed-policy.png",
      part: "Part 7",
      parts: ["Part 7"],
      title: "Theo Managed Policy Claim (Nov 24 19:13 CST)",
      caption: 'Theo claiming Managed Policy is trivial to configure and "turns off all telemetry".',
      dossier: D1,
      sourceUrl: "https://x.com/theo/status/2125186071357251715"
    },
    {
      path: "./evidence/extra/p5-2-x-theo-never-touches-servers.png",
      part: "Part 7",
      parts: ["Part 7"],
      title: '"Never touches any of our servers" Claim',
      caption: "Theo claiming on Nov 24 at 19:36 CST that conversation data never touches T3 servers.",
      dossier: D1,
      sourceUrl: "https://x.com/theo/status/2125191784859115766"
    },
    {
      path: "./evidence/extra/p5-4-doc-managed-policy-paths.png",
      part: "Part 7",
      parts: ["Part 7"],
      title: "docs/user/managed-policy.md Admin Paths",
      caption: "Official Managed Policy docs requiring admin/root paths across macOS, Windows HKLM, and Linux.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md"
    },
    {
      path: "./evidence/06-pr42450-absolute-path.jpg",
      part: "Part 11",
      parts: ["Part 11"],
      title: "PR #42450 git.cwd Absolute Path Leak",
      caption: "Merged 90m after denial: confirms relay webhook runs exported git.cwd workspace paths, usernames, and repo names to Axiom.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42450"
    },
    {
      path: "./evidence/extra/x-post11-2-pr42376-windows-optout.jpg",
      part: "Part 11",
      parts: ["Part 11"],
      title: "PR #42376 Ignored Windows Opt-Out Env Var",
      caption: "PR #42376 admitting Windows desktop ignored saved T3CODE_TELEMETRY_ENABLED=false user environment variables.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42376"
    },
    {
      path: "./evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg",
      part: "Part 11",
      parts: ["Part 11"],
      title: "PR #42464 Ignored macOS ~/.zshrc Opt-Out",
      caption: "PR #42464 admitting macOS first-launch relay tracing ignored ~/.zshrc opt-outs for the entire session.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42464"
    },
    {
      path: "./evidence/extra/x-post11-4-dump-264-claude-records.jpg",
      part: "Part 11",
      parts: ["Part 11"],
      title: "100MB Dump Audit: 264 Live Claude Records",
      caption: "Forensic check of events.clean.jsonl showing 264 Claude records linking 4 machines plus verbatim private proxy model names.",
      dossier: D1,
      sourceUrl: "https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz"
    },
    {
      path: "./evidence/08-pr42380-220w-ip-axiom.jpg",
      part: "Part 12",
      parts: ["Part 12"],
      title: "PR #42380: 2.2M/hr IP + UA Spans in Axiom",
      caption: "PR #42380 revealing relay spans logged real caller IPs and User-Agent next to user.id at ~2.2M spans/hour for 30 days.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42380"
    },
    {
      path: "./evidence/09-pr42285-delete-account-leftover.jpg",
      part: "Part 12",
      parts: ["Part 12"],
      title: "PR #42285 Broken Account Deletion",
      caption: "PR #42285 admitting Clerk deletion left PlanetScale relay rows and active Cloudflare tunnels until manual SQL cleanup.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42285"
    },
    {
      path: "./evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg",
      part: "Part 12",
      parts: ["Part 12"],
      title: "PR #42459 Android FCM Plaintext user_id Leak",
      caption: "PR #42459 confirming Android FCM notifications previously transmitted plaintext Clerk user_id values to Google.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42459"
    },
    {
      path: "./evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg",
      part: "Part 12",
      parts: ["Part 12"],
      title: "PR #42466 Mixed Anonymous Feedback Batches",
      caption: "PR #42466 admitting anonymous agent.feedback events were batched in the same POST alongside installId and host fingerprints.",
      dossier: D1,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/42466"
    },
    {
      path: "./evidence/10-issue17845-fake-delete.png",
      part: "Part 2",
      parts: ["Part 2"],
      title: "Issue #17845 Fake SQLite Thread Deletion",
      caption: "Permanently deleted sidebar threads remain in statev2.sqlite, causing 25.9–41.6 GB disk bloat.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/17845"
    },
    {
      path: "./evidence/extra/t3code-9-issue-11222-process-spy.png",
      part: "Part 2",
      parts: ["Part 2"],
      title: "Issue #11222 Full-Machine Process Scanner",
      caption: "t3-resource-monitor scanning every OS process every 5s with command-line arguments and ~280–300 persistent handles.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/11222"
    },
    {
      path: "./evidence/extra/t3code-6-pr-5551-reality-check.png",
      part: "Part 2",
      parts: ["Part 2", "Part 9"],
      title: 'PR #5551 Hiding Build/Plan ("Reality check")',
      caption: "PR #5551 burying the Build/Plan toggle with a telemetry chart captioned 'Reality check for those upset' (10 downvotes).",
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/5551"
    },
    {
      path: "./evidence/extra/t3code-7-pr-33131-ai-brainrot.png",
      part: "Part 2",
      parts: ["Part 2", "Part 9"],
      title: "PR #33131 Deleting Plan Mode",
      caption: "PR #33131 deleting Plan mode with an AI summary claiming it could revert 'if usage data says to keep it'.",
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/33131"
    },
    {
      path: "./evidence/22-contributing-vouched-ban.png",
      part: "Part 2",
      parts: ["Part 2", "Part 9"],
      title: "CONTRIBUTING.md & .github/VOUCHED.td Bans",
      caption: 'CONTRIBUTING.md ("here\'s my advice: Don\'t") routing PR disputes to public denouncement bans in .github/VOUCHED.td.',
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md"
    },
    {
      path: "./evidence/11-issue15353-auto-force-push.png",
      part: "Part 3",
      parts: ["Part 3", "Part 13"],
      title: "Issue #15353 Silent git push --force",
      caption: "Claude Auto mode silently approves git push --force origin main on 3rd attempt with no UI confirmation (52+ days open).",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/15353"
    },
    {
      path: "./evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png",
      part: "Part 3",
      parts: ["Part 3"],
      title: "PR #41237 Drops Model Filter in 21 Hours",
      caption: "PR #41237 merged 21h after Issue #40948 dropping model privacy filtering for slopalytics.com.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/41237"
    },
    {
      path: "./evidence/extra/t3code-13-pr-39483-secret-traversal.png",
      part: "Part 3",
      parts: ["Part 3", "Part 13"],
      title: "PR #39483 Silent ServerSecretStore Path Traversal Fix",
      caption: "Silently patches ServerSecretStore jti/nonce path traversal before device approval without a Security Advisory.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/39483"
    },
    {
      path: "./evidence/extra/t3code-14-pr-30997-powershell-av.png",
      part: "Part 3",
      parts: ["Part 3", "Part 13"],
      title: "PR #30997 Base64 PowerShell AV Flag",
      caption: "Open PR addressing externalLauncher.ts spawning PowerShell -ExecutionPolicy Bypass -EncodedCommand flagged by AV.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/30997"
    },
    {
      path: "./evidence/extra/t3code-12-issue-33639-theo-insult.png",
      part: "Part 3",
      parts: ["Part 3", "Part 9"],
      title: "Issue #33639 Maintainer Insult to User",
      caption: "Theo telling complaining user @bermudi to uninstall and calling him an 'ungrateful prick' (PR #41572 rejected next morning).",
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545"
    },
    {
      path: "./evidence/extra/x-post05-4-security-md-intended.jpg",
      part: "Part 13",
      parts: ["Part 3", "Part 5", "Part 13"],
      title: "SECURITY.md Intended Trust Boundaries",
      caption: "SECURITY.md declaring OS-wide filesystem reads, plain iOS HTTP, and full machine takeover via relay key compromise as intended.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/SECURITY.md"
    },
    {
      path: "./evidence/26-cn-cesspit.png",
      part: "Part 13",
      parts: ["Part 13", "Part 14", "Part 16"],
      title: 'Nov 24 "Chinese Tech Twitter Cesspit" Outburst',
      caption: 'Theo calling Chinese tech Twitter "the biggest fucking cesspit" and Chinese audit readers "fucking braindead".',
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2125177503526588877"
    },
    {
      path: "./evidence/12-antigravity-v1internal-spoof.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "antigravityUsageLimits.ts Spoofed Header & v1internal",
      caption: "Hardcodes antigravity/hub/2.24.0 User-Agent and hits undocumented Google v1internal endpoints with OS-extracted tokens.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45"
    },
    {
      path: "./evidence/extra/t3code-18b-code-v1internal-call.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "antigravityUsageLimits.ts Direct v1internal POST",
      caption: "Direct HttpClientRequest.post(`${endpoint}/v1internal:${operation}`) using OS keyring/CredReadW bearer token.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476"
    },
    {
      path: "./evidence/13-antigravity-ssh-spoof.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "antigravityAuthSupport.ts Forged SSH_CONNECTION",
      caption: "Injects fake SSH_CONNECTION='127.0.0.1 0 127.0.0.1 0' to bypass Google CLI keyring isolation (caused #41973 cross-talk).",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236"
    },
    {
      path: "./evidence/14-issue41536-fresh-ban.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "Issue #41536: Fresh $20 Account Banned in 3 Minutes",
      caption: "Zero-proxy fresh $20 Google AI subscription banned on first message 3 minutes after setup; closed as duplicate.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/41536"
    },
    {
      path: "./evidence/extra/t3code-16-faq-tos-guarantee.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "docs/user/faq.md Antigravity ToS Guarantee",
      caption: 'Official FAQ assuring users: "T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... you can trust it is safe."',
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription"
    },
    {
      path: "./evidence/extra/t3code-17-issue-40713-lie-and-bust.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "Issue #40713 Maintainer Denial Challenged",
      caption: "Maintainer claiming T3 Code never calls Antigravity backend directly before users posted exact source paths.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/40713"
    },
    {
      path: "./evidence/extra/t3code-17b-issue-40713-schlessera-bust.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "Issue #40713 Developer schlessera Code Rebuttal",
      caption: "Developer schlessera refuting maintainer claims with direct source links to antigravityUsageLimits.ts.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/40713"
    },
    {
      path: "./evidence/extra/t3code-20-pr-26876-spoof-zed.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: "PR #26876 Client Masquerading as Zed",
      caption: "PR #26876 merged by t3dotgg renaming client identifier to 'zed' to bypass Antigravity model whitelists.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/26876"
    },
    {
      path: "./evidence/extra/p2-2-pr33800-cliproxy-agy.png",
      part: "Part 4",
      parts: ["Part 4", "Part 17"],
      title: "PR #33800 CLIProxyAPI Hub Integration",
      caption: "Merged PR #33800 natively wiring CLIProxyAPI hub polling for Antigravity, xAI, and Claude into T3 Code.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/33800"
    },
    {
      path: "./evidence/extra/p2-1a-cliproxy-claude.png",
      part: "Part 4",
      parts: ["Part 4", "Part 17"],
      title: "cliproxyApi.ts Spoofed Claude Code Headers",
      caption: "cliproxyApi.ts sending hardcoded claude-code/2.1.273 and Antigravity headers during hub quota polling.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts"
    },
    {
      path: "./evidence/extra/p2-1b-cliproxy-xai-agy.png",
      part: "Part 4",
      parts: ["Part 4", "Part 17"],
      title: "cliproxyApi.ts Spoofed xAI & Antigravity Polling",
      caption: "cliproxyApi.ts lines 348–393 polling xAI (grok-cli/1.0.77) and Antigravity v1internal quotas.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts"
    },
    {
      path: "./evidence/extra/p2-5-x-theo-not-cliproxy.png",
      part: "Part 4",
      parts: ["Part 4"],
      title: '"Not with cliproxy right?" Reply to Disabled Account',
      caption: "Theo blaming CLIProxy when user @Only_21Mil reported a second disabled Google AI Ultra account on Nov 23.",
      dossier: D3,
      sourceUrl: "https://x.com/theo/status/2124703048140517397"
    },
    {
      path: "./evidence/15-connect-no-e2e.jpg",
      part: "Part 5",
      parts: ["Part 5"],
      title: "Issue #32098 T3 Connect Lacks E2E Encryption",
      caption: "Maintainer confirms compromised relay key or cloud account can control linked machines and closes E2E request.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926"
    },
    {
      path: "./evidence/extra/x-post05-3-managed-endpoint-provider.jpg",
      part: "Part 5",
      parts: ["Part 5"],
      title: "ManagedEndpointProvider.ts Cloudflare Tunneling",
      caption: "ManagedEndpointProvider.ts provisioning Cloudflare Tunnels & DNS records inside T3's own Cloudflare account.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts"
    },
    {
      path: "./evidence/16-pr32945-ovh-caddy-gateway.jpg",
      part: "Part 5",
      parts: ["Part 5"],
      title: "PR #32945 OVH Hillsboro Caddy Plaintext Gateway",
      caption: "Theo's PR citing $25k/mo Cloudflare Tunnel cost and moving to self-hosted OVH Caddy TLS termination (zero E2E).",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/32945"
    },
    {
      path: "./evidence/18-theo-vibe-kanban.png",
      part: "Part 6",
      parts: ["Part 6"],
      title: "Vibe Kanban Investor Overlap & Shutdown Mockery",
      caption: "Theo disclosing he invested in and contributed to Vibe Kanban before publicly mocking its shutdown.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2122201981167251877"
    },
    {
      path: "./evidence/extra/p4-2-x-theo-daytona-investor.png",
      part: "Part 6",
      parts: ["Part 6"],
      title: "Daytona & Cloud-Sandbox Angel Overlap",
      caption: "Theo confirming on Nov 18 his angel investments in Daytona and most of its cloud-sandbox competitors.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2123011578090127499"
    },
    {
      path: "./evidence/extra/p4-3-x-theo-paid-cloud-sandboxes.png",
      part: "Part 6",
      parts: ["Part 6"],
      title: "Paid Cloud Sandboxes Proposal inside T3 Code",
      caption: "Theo floating paid cloud sandboxes inside T3 Code on Nov 9, nine days before the Daytona disclosure.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2119705561679933806"
    },
    {
      path: "./evidence/extra/p6-1-x-theo-800k-cost.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "$800k+ Out-of-Pocket Client Spend Disclosure",
      caption: "Theo stating on Nov 12, 2026 that T3 Code has cost $800k+ to build as a free client.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2120729779511124267"
    },
    {
      path: "./evidence/17-theo-31t-tokens-10m-day.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "31.7T Tokens / $10.19M Daily Compute Radar",
      caption: "Theo's internal T3 Code analytics dashboard showing 31.7 trillion tokens and $10.19M equivalent daily API spend.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2122860770329608290"
    },
    {
      path: "./evidence/extra/p6-5-x-theo-98pct-usage.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "~98.5% Three-Lab Usage Split Disclosure",
      caption: "Theo disclosing ~98.5% of all T3 Code usage comes from Codex, Claude, and Antigravity.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2123965784888377541"
    },
    {
      path: "./evidence/extra/p6-3-x-theo-my-analytics.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "Mocking Outsider Without Analytics Access",
      caption: "Theo mocking a commenter for guessing shares without access to his internal T3 Code analytics.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2124682906132181482"
    },
    {
      path: "./evidence/extra/p6-4-x-theo-investors.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "Investor Acquisition Inquiries Reply",
      caption: 'Theo telling @maria_rcks on Nov 21 that "multiple investors have asked me about this".',
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2123885732330885417"
    },
    {
      path: "./evidence/extra/p3-1-x-theo-patrick-many-prs.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: 'Claiming DeepMind Engineer Landed "Many PRs"',
      caption: 'Theo claiming Google DeepMind\'s Patrick Toulme "has landed many PRs on T3 Code".',
      dossier: D4
    },
    {
      path: "./evidence/extra/p3-2-patrick-only-1-commit.png",
      part: "Part 8",
      parts: ["Part 8"],
      title: "Git Log Shows Only 1 Patrick Toulme Commit",
      caption: "pingdotgg/t3code main commit log filtered by patrick-toulme showing only 1 commit (PR #31158).",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/31158"
    },
    {
      path: "./evidence/extra/p7-1-x-theo-nukes-machine.png",
      part: "Part 9",
      parts: ["Part 9"],
      title: '"If it nukes my machine that\'s free content"',
      caption: "Theo writing on Nov 10, 2026: 'I need results fast because I have to film, and if it nukes my machine that's free content'.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2119993037971730879"
    },
    {
      path: "./evidence/extra/p7-2-x-theo-yolo-merges.png",
      part: "Part 9",
      parts: ["Part 9"],
      title: '"My yolo merges breaking shit sometimes"',
      caption: "Theo telling nightly build users on Nov 10, 2026 to expect 'my yolo merges breaking shit sometimes'.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2119951615679672513"
    },
    {
      path: "./evidence/extra/p7-3-x-theo-unfollow-pr.png",
      part: "Part 9",
      parts: ["Part 9"],
      title: "Gatekeeping Contributor Over X Follow",
      caption: "Theo turning away an eager contributor with CONTRIBUTING.md on Nov 12 because they didn't follow him.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2120821423438778667"
    },
    {
      path: "./evidence/extra/p7-4-x-theo-take-it-away.png",
      part: "Part 9",
      parts: ["Part 9"],
      title: "Threatening to Remove /btw From Users",
      caption: "Theo warning critics on Nov 12: 'I already caved for y'all with /btw, be careful. I am not afraid to take it away.'",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2120853340078874923"
    },
    {
      path: "./evidence/extra/p7-5-x-theo-pic-over-pr.png",
      part: "Part 9",
      parts: ["Part 9"],
      title: '"Annotated Screenshot Over a PR Any Day"',
      caption: "Theo stating on Nov 20, 2026 that he would take an annotated screenshot over an open-source PR 'literally any day'.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2123754193530053110"
    },
    {
      path: "./evidence/23-stealing-fork-bot.png",
      part: "Part 10",
      parts: ["Part 10"],
      title: '"Okay I\'m stealing this" + @bot Fork Scraping',
      caption: "Theo replying 'Okay I'm stealing this' and tagging @bot 30s later to scrape @MiaAI_lab's fork onto beebox.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2119240810202034645"
    },
    {
      path: "./evidence/extra/p8-4b-x-theo-copy-other-tools.png",
      part: "Part 10",
      parts: ["Part 10"],
      title: "@bot Clones Rival Tools' Praised Features",
      caption: "Theo dispatching @bot on Nov 13, 2026 to break every praised feature from rival tools into separate T3 Code threads.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2121017649652269120"
    },
    {
      path: "./evidence/extra/p8-4c-x-theo-mock-copying.png",
      part: "Part 10",
      parts: ["Part 10"],
      title: "Mocking Claude Code Desktop Sidebar Tabs",
      caption: "Theo mocking Claude Code Desktop's sidebar tabs on Nov 24, 2026 after dispatching @bot against rivals.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2124987957803446311"
    },
    {
      path: "./evidence/extra/p8-2-x-theo-demonetize-cn.png",
      part: "Part 10",
      parts: ["Part 10"],
      title: "Community Notes Demonetization Call",
      caption: "Theo calling on followers on Nov 11, 2026 to use Community Notes to demonetize critics.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2120238923884696025"
    },
    {
      path: "./evidence/extra/p8-3-x-theo-autoblocker.png",
      part: "Part 10",
      parts: ["Part 10"],
      title: "Automated X Blocker Bot (~100 Accounts/Day)",
      caption: "Theo confirming on Nov 24, 2026 that his X account runs an auto-blocker bot and blocked ~100 accounts that day.",
      dossier: D5,
      sourceUrl: "https://x.com/theo/status/2125077510941802509"
    },
    {
      path: "./evidence/charts/theo-chart-1-overview.png",
      part: "Charts",
      parts: ["Charts", "Part 14"],
      title: "Forensic Chart 1 · 1,151-Tweet Overview (PNG)",
      caption: "1,151 tweets over 17.24 days: 75.6% replies, 2.7m median gap, and 162 T3 Code vs. 0 legacy product mentions.",
      dossier: D6
    },
    {
      path: "./evidence/charts/theo-chart-2-rhythm.png",
      part: "Charts",
      parts: ["Charts", "Part 14"],
      title: "Forensic Chart 2 · Circadian & Daily Cadence (PNG)",
      caption: "233 posts during 00:00–04:59 PST, 0 posts during 08:00–09:59 PST, and 17-day posting curve.",
      dossier: D6
    },
    {
      path: "./evidence/charts/theo-chart-3-double-standard.png",
      part: "Charts",
      parts: ["Charts", "Part 14"],
      title: "Forensic Chart 3 · Selective Politeness Split (PNG)",
      caption: "0.0% profanity toward 20 VIP/big-tech handles vs. 8.0% hostility toward ordinary developers and 14.4% in crisis.",
      dossier: D6
    },
    {
      path: "./evidence/charts/theo-chart-4-cn-crisis.png",
      part: "Charts",
      parts: ["Charts", "Part 14"],
      title: "Forensic Chart 4 · 25-Hour Crisis Timeline (PNG)",
      caption: "132 posts across 3 escalation waves, 81.8% replies, and 4.0× personal insult surge.",
      dossier: D6
    },
    {
      path: "./evidence/25-double-standard-chart-zh.png",
      part: "Charts",
      parts: ["Charts", "Part 14"],
      title: "Double-Standard Comparison Graphic (Chinese)",
      caption: "Archived Chinese-language visualization of the 0% VIP vs. 8.0% developer vs. 14.4% crisis split.",
      dossier: D6
    },
    {
      path: "./evidence/extra/p9-1-x-theo-google-bridges.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: '"Happy I didn\'t burn bridges" (Nov 21)',
      caption: "Theo celebrating not burning bridges with Google after Neon launched, days after criticizing Gemini 4 Carbon.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2123995323123343869"
    },
    {
      path: "./evidence/25-engineers-unemployment.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: '"Engineers deserve the mass unemployment"',
      caption: "Theo quote-tweeting a basic tool comparison question to tell 386k+ viewers engineers deserve mass unemployment.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2124470530590011704"
    },
    {
      path: "./evidence/extra/p9-3-x-theo-local-ai-graves.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: '"Dance on the graves of local AI"',
      caption: "Theo vowing on Nov 12, 2026 to 'dance on the graves of the local ai community'.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2120733839832273025"
    },
    {
      path: "./evidence/extra/p9-4-x-theo-linux-larpers.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: '"Linux larpers tend to dislike real devs"',
      caption: "Theo dismissing Linux users as 'Linux larpers' on Nov 22, 2026.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2124298216271499605"
    },
    {
      path: "./evidence/extra/p9-5b-x-theo-stupid-bitch.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: 'Repeated "stupid bitch" Attack & Retweet',
      caption: "Theo repeating 'stupid bitch' against a female critic on Nov 12, 2026 with 'no regret in saying such'.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2120599310211703274"
    },
    {
      path: "./evidence/extra/p9-5-x-theo-jail-rsd.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: "Jail Threat & Medical RSD Mockery",
      caption: "Theo threatening a Threads critic with jail while mocking their RSD diagnosis on Nov 18, 2026.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2122865897375400066"
    },
    {
      path: "./evidence/extra/p9-7-x-theo-burning-trust.png",
      part: "Part 14",
      parts: ["Part 14"],
      title: '"Burning the trust" Lecture (24h Before Crisis)',
      caption: "Theo lecturing another user on Nov 22 against 'burning the trust of everyone around you' 24h before the crisis.",
      dossier: D6,
      sourceUrl: "https://x.com/theo/status/2124449493513068862"
    },
    {
      path: "./evidence/24-pr41898-trademark-aftermath.png",
      part: "Part 15",
      parts: ["Part 15", "Part 16"],
      title: "PR #41898 Retroactive TRADEMARK.md (17h After Threat)",
      caption: "Merged at 12:21 BJ on Nov 24 (~17 hours after the ban threat), generated via Gemini 4 Neon in Antigravity.",
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/41898"
    },
    {
      path: "./evidence/extra/p1-2b-trademark-md.png",
      part: "Part 15",
      parts: ["Part 15"],
      title: 'TRADEMARK.md "Registered or Unregistered" Claims',
      caption: "TRADEMARK.md added in PR #41898 claiming rights over T3 Code / T3 marks despite 0 USPTO registrations.",
      dossier: D5,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md"
    },
    {
      path: "./evidence/extra/x-post17-1-theo-youtube-sponsors.jpg",
      part: "Part 17",
      parts: ["Part 17"],
      title: "2023 Sponsor List (Clerk, Axiom, Vercel, PlanetScale)",
      caption: "Theo's May 14, 2023 tweet listing sponsors Vercel, Clerk, Upstash, Axiom, and PlanetScale.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/1657488850472804353"
    },
    {
      path: "./evidence/extra/x-post17-5-rauchg-vercel-sponsor.jpg",
      part: "Part 17",
      parts: ["Part 17"],
      title: "Vercel CEO Confirms Sponsoring Only Theo",
      caption: "Guillermo Rauch confirming on April 5, 2024 that Vercel sponsored a single YouTuber (Theo).",
      dossier: D4,
      sourceUrl: "https://x.com/rauchg/status/1776260839965863965"
    },
    {
      path: "./evidence/extra/x-post17-2-maria-endless-deleted.jpg",
      part: "Part 17",
      parts: ["Part 17"],
      title: "T3 Employee @maria_rcks Post After Deleting Endless",
      caption: "Aug 22, 2026 tweet after deleting Endless 0% Codex exploit and hoping Codex bans accounts that used it.",
      dossier: D4,
      sourceUrl: "https://x.com/maria_rcks/status/2090972426876129658"
    },
    {
      path: "./evidence/extra/x-post17-3-codex-45444-regression.jpg",
      part: "Part 17",
      parts: ["Part 17"],
      title: "openai/codex#45444 Hard 0% Quota Cutoff",
      caption: "GitHub issue documenting OpenAI tightening Codex so active turns terminate mid-task at 0% quota.",
      dossier: D4,
      sourceUrl: "https://github.com/openai/codex/issues/45444"
    },
    {
      path: "./evidence/19-cliproxy-gist-555pct.jpg",
      part: "Part 17",
      parts: ["Part 17"],
      title: "Theo's 452-Star CLIProxyAPI Gist (555% Quota)",
      caption: "Pooling 7 Claude + 3 Codex accounts across 12+ machines via CLIProxyAPI while FAQ warns users of bans.",
      dossier: D4,
      sourceUrl: "https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af"
    },
    {
      path: "./evidence/extra/p2-3-x-theo-cliproxy-clickhouse.png",
      part: "Part 17",
      parts: ["Part 4", "Part 17"],
      title: "ClickHouse CLIProxy Request Logs Tweet",
      caption: "Theo instructing @bot on Nov 8 to dig through his CLIProxy logs in ClickHouse.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2119193502852755520"
    },
    {
      path: "./evidence/extra/p2-4-x-theo-grokbot-tutorial.png",
      part: "Part 17",
      parts: ["Part 4", "Part 17"],
      title: "Grok Bot + $100 Claude T3 MCP Routing Guide",
      caption: "Theo's Nov 10, 2026 4-step guide routing Grok Bot to Opus 5.5 through a $100 Claude plan and T3 Code.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2119994608516276256"
    },
    {
      path: "./evidence/extra/p2-4b-x-theo-15k-ultra.png",
      part: "Part 17",
      parts: ["Part 4", "Part 17"],
      title: "$14,662 / 73x Yield on $200 Claude Ultra Plan",
      caption: "Theo's Nov 10 graphic claiming $14,662 in Opus 5.5 value from 1.1M proxied requests on a $200 Ultra plan.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2119960608816988596"
    },
    {
      path: "./evidence/extra/p10-1-x-theo-apr25-trick-vcs.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: '"GitHub has a fake star problem" (Apr 2026)',
      caption: "Theo arguing GitHub stars became 'mostly a way for companies to trick VCs into investing' 6 months earlier.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2048122499834036340"
    },
    {
      path: "./evidence/20-star-10x-cliff.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "10x Daily Star Spike After In-App Prompt",
      caption: "Theo's Nov 2 chart celebrating a near-vertical 10x spike immediately after shipping the Star prompt.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2117065834267136469"
    },
    {
      path: "./evidence/extra/p10-3-x-theo-nov2-trending.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "+3,094 Stars/Day on GitHub Trending",
      caption: "Theo's Nov 2 GitHub Trending screenshot highlighting 3,094 stars in a single day.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2117172614158508400"
    },
    {
      path: "./evidence/extra/p3-3-pr29922-one-click-star.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "PR #29922 Self-Merged One-Click Server Star",
      caption: "PR #29922 adding 30-second idle detection and server-credential one-click starring RPC.",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/29922"
    },
    {
      path: "./evidence/extra/p10-4a-pr29922-macroscope.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "Macroscope Flagged PR #29922 (Bypassed)",
      caption: "Macroscope bot flagging PR #29922 as 'Needs Human Approval' over server vs. user GitHub account mismatch.",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/29922"
    },
    {
      path: "./evidence/21-pr29922-zhilsinger-review.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "zhilsinger Request Changes Unanswered 19 Days",
      caption: "Developer zhilsinger warning about shared-host starring and arbitrary-repo starring via server credentials.",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/pull/29922"
    },
    {
      path: "./evidence/extra/p3-4-code-star-prompt.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "GitHubStarPrompt.tsx Source Implementation",
      caption: "Frontend component implementing PROMPTS_BEFORE_ASKING = 5, IDLE_MS = 30_000, and starInPlace RPC + confetti.",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx"
    },
    {
      path: "./evidence/extra/p10-5-gh-driver-arbitrary-repo.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: "driver.ts#L60-L99 Arbitrary-Repo Starring Bug",
      caption: "starredPath never pins pingdotgg/t3code, letting any source-control:write client star arbitrary repos via host credentials.",
      dossier: D4,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99"
    },
    {
      path: "./evidence/extra/p10-6-x-theo-nov24-missed-70k.png",
      part: "Part 18",
      parts: ["Part 18"],
      title: 'Claiming He "Entirely Missed" Crossing 70k Stars',
      caption: "Theo's Nov 24 tweet at 74.6k stars claiming he 'entirely missed' breaking 70k.",
      dossier: D4,
      sourceUrl: "https://x.com/theo/status/2124992724223029538"
    },
    {
      path: "./evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "http.ts#L215-L241 Plaintext --lan Cookie Lacks Secure",
      caption: "PR #37042 only sets Secure when url.protocol === 'https:', sending 30-day shell cookies in cleartext over t3 up --lan HTTP.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221"
    },
    {
      path: "./evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "EnvironmentAuth.ts#L798-L819 Missing Origin Bypass",
      caption: "isBrowserOriginAllowed returns true when the Origin header is omitted, letting any non-browser script replay stolen cookies.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806"
    },
    {
      path: "./evidence/extra/ca81b7b9-a1-a4-a5-ttl-and-wsclaims.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "SessionStore.ts#L491-L522 30d Shell TTL & 5m WS Ticket",
      caption: "DEFAULT_SESSION_TTL = 30 days, DEFAULT_WEBSOCKET_TOKEN_TTL = 5 minutes, and WebSocketClaims with no single-use jti.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493"
    },
    {
      path: "./evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "EnvironmentAuth.ts#L1506-L1521 Self-Revocation Blocked",
      caption: "Non-DPoP /oauth/token exchanges fall back to 30-day unbound Bearer tokens; no /logout route exists and revokeClientSession rejects self-revocation.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511"
    },
    {
      path: "./evidence/extra/ca81b7b9-a4-ws-ticket-reuse-url.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "EnvironmentAuth.ts#L1553-L1585 URL ?wsTicket= Replay Window",
      caption: "WS tickets travel in URL ?wsTicket= query strings and omit replay guards for Bearer RPC and all media route tickets.",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622"
    },
    {
      path: "./evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png",
      part: "Part 5",
      parts: ["Part 5", "Part 13"],
      title: "startupAccess.ts#L71-L110 NodeNet.isIPv4 Kills ::1 Tunnels",
      caption: "Line 39 permits IPv6 ::1 loopback, yet isPrivateNetworkAddress runs NodeNet.isIPv4 and terminates Tailscale Serve / Connect via socket.destroy().",
      dossier: D3,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108"
    },
    {
      path: "./evidence/extra/ca81b7b9-a6-submodule-recursive.png",
      part: "Part 13",
      parts: ["Part 13", "Part 2"],
      title: "GitVcsDriverCore.ts#L6144-L6205 Recursive Submodules & Env",
      caption: "Worktree creation auto-runs git submodule update --init --recursive while children inherit host GITHUB_TOKEN and SSH_AUTH_SOCK.",
      dossier: D2,
      sourceUrl: "https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205"
    }
  ];

  var PART_PILLS = [
    "All",
    "Origin",
    "Part 1",
    "Part 2",
    "Part 3",
    "Part 4",
    "Part 5",
    "Part 6",
    "Part 7",
    "Part 8",
    "Part 9",
    "Part 10",
    "Part 11",
    "Part 12",
    "Part 13",
    "Part 14",
    "Part 15",
    "Part 16",
    "Part 17",
    "Part 18",
    "Charts"
  ];

  var state = {
    riskFilter: "all",
    activeChart: "chart1",
    galleryPart: "All",
    galleryQuery: "",
    filteredReceipts: EVIDENCE_RECEIPTS.slice(),
    lightboxIdx: -1,
    lightboxExtra: null,
    zoomed: false,
    lang: "en",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light"
  };

  var UI_I18N = {
    zh: {
      brandTitle: "安装 T3 Code 之前",
      navVerdict: "核心结论",
      navFindings: "风险矩阵",
      navTimeline: "时间线",
      navCharts: "取证图表",
      navReceipts: "108 张实证",
      navMitigation: "止损手册",
      navRepo: "GitHub 仓库",
      subbarPath: "独立审计档案 / pingdotgg/t3code",
      subbarStatus: "审计基线 9d3195b4 → 上游复核 ca81b7b9（11 月 25 日 14:49 CST · +259 提交）",
      heroKicker: "源码、遥测、安全与公开记录独立审计",
      heroTitle: "安装 T3 Code 之前",
      heroLead:
        "针对 <code>pingdotgg/t3code</code> 的独立源码、遥测、治理、商标与量化审计档案 —— 完整汇总 2 篇导火索原帖、18 弹审计报告、6 份深度技术卷宗、320 条一手规范化链接、108 张原始实证截图与 1,151 条连续 X 推文数据集。",
      metaRiskLabel: "高危审计域",
      metaRiskValue: "2 项严重 · 2 项高危 · 0 条安全公告",
      metaArchiveLabel: "一手实证规模",
      metaArchiveValue: "320 条原始链接 · 108 张实证 · 6 份卷宗",
      metaCommitLabel: "上游源码追踪",
      metaCommitValue: "9d3195b4 (#42000) → ca81b7b9 (#42634)",
      ctaMatrix: "查看风险矩阵",
      ctaMitigation: "2 分钟止损手册",
      ctaEvidence: "108 张证据总表",
      ctaSources: "320 条来源总表",
      coverInspect: "点击查看原图",
      tldrTitle: "30 秒结论速览",
      tldrMeta: "主基线 <code>9d3195b4</code> 复核至 <code>ca81b7b9</code>（新增 259 提交 · 11 月 25 日 14:49 CST）",
      tldr1Tag: "严重 · 遥测隐私",
      tldr1Title: "默认开启遥测与每小时 220 万条 IP 跨度",
      tldr1Body:
        "3 月 6 日（<code>PR #174</code>）在官网宣称“无遥测”期间默认启用 PostHog。GDPR 后通宵 PR 自承 Axiom 每小时记录 220 万条 IP+UA（<code>#42380</code>）与 <code>git.cwd</code> 路径泄露（<code>#42450</code>）。即便合入 <code>#42299</code> 与 <code>#42629</code>（<code>DO_NOT_TRACK</code>），<code>AnalyticsService.ts:156</code> 启动仍先写盘且 <code>ingest.t3.codes</code> 维持闭源。",
      tldr2Tag: "严重 · 本地安全",
      tldr2Title: "SQLite 假删除与 52 天静默强推",
      tldr2Body:
        "删除对话仅追加标记使 <code>statev2.sqlite</code> 膨至 41.6 GB（<code>#17845</code>）；<code>#42119</code> 补上异步清理后仍留存分支/子代理历史与墓碑行，瘦身仍需离线 <code>VACUUM</code>。Auto 模式静默 <code>git push --force</code>（<code>#15353</code>）、未受信任仓库自动初始化 <code>.gitmodules</code> 与 <code>SessionStart</code> 钩子以及 0 条安全公告均未解决。",
      tldr3Tag: "高危 · 鉴权与中继",
      tldr3Title: "Antigravity 请求头伪装与明文中继",
      tldr3Body:
        "<code>antigravityUsageLimits.ts</code> 伪造 <code>antigravity/hub/2.24.0</code> 直连 <code>v1internal</code>，<code>#41210</code> 反证 Google <code>VALIDATION_REQUIRED</code> 风控拦截。T3 Connect 零端到端加密（<code>#32098</code>），<code>ca81b7b9</code> 另存 <code>--lan</code> 明文 Cookie、不可吊销 30 天 Bearer、可重放 <code>?wsTicket=</code> 与 <code>::1</code> 断连缺陷。",
      tldr4Tag: "高危 · 商业账本",
      tldr4Title: "80 万美元投入与 7.7 万星漏斗",
      tldr4Body:
        "<code>ingest.t3.codes</code> 撑起日跑 31.7 万亿 token（$10.19M/天）算力雷达，换取 OpenAI 免费额度与 VC 接洽。发呆 30 秒弹窗动用宿主机凭据发 <code>PUT user/starred/...</code>，<code>driver.ts#L60-L99</code> 任意仓库点星漏洞至今未修。",
      tldr5Tag: "审计基线 · 语料",
      tldr5Title: "0 条 USPTO 商标与 1,151 推文双标",
      tldr5Body:
        "威胁封号时 <code>T3 Code</code> 在 USPTO 注册商标为 0（17 小时后补写 <code>TRADEMARK.md</code>）。1,151 条连续推文统计：对大厂 VIP 粗口率 0.0% vs. 普通开发者 8.0% 敌意与危机期 14.4% 人身攻击。",
      langUnLabel: "联合国官方语言（6）：",
      langCommunityLabel: "全球社区语言版本（12）：",
      riskSub: "跨 9d3195b4 至 ca81b7b9 结构化查证",
      riskHeading: "风险矩阵与六份深度卷宗",
      riskDesc:
        "按风险等级筛选查证结果、核对截至 <code>ca81b7b9</code>（11 月 25 日 14:49 CST）的上游修复进展，或直接打开 6 份深度技术卷宗、<a href=\"https://github.com/realchendahuang/before-you-install-t3code/blob/main/docs/EVIDENCE-INDEX.md\" target=\"_blank\" rel=\"noopener noreferrer\">108 张证据总索引</a>与<a href=\"https://github.com/realchendahuang/before-you-install-t3code/blob/main/docs/COMPLETE-SOURCE-INDEX.md\" target=\"_blank\" rel=\"noopener noreferrer\">320 条一手来源总索引</a>。",
      filterAll: "全部 (7)",
      filterCrit: "严重 (2)",
      filterHigh: "高危 (2)",
      filterMed: "中高 (1)",
      filterBase: "基线 (2)",
      timelineSub: "时间轴与上游源码复核",
      timelineHeading: "审计与上游修复时间线",
      timelineDesc: "从默认启用 PostHog、11 月 24–25 日通宵 GDPR 补丁战到最新 <code>ca81b7b9</code>（基线后 +259 提交）的关键节点。",
      tlColDate: "日期 / 窗口",
      tlColMilestone: "关键里程碑",
      tlColOutcome: "源码核实与上游结果",
      tl1Title: "默认 PostHog 遥测与静默删除官网承诺",
      tl2Title: "闭源上报网关、跨工具哈希与求星弹窗",
      tl3Title: "Fork 命名风波、18 弹审计与通宵 GDPR 补丁",
      tl4Title: "#42299 撤除 Codex/Claude 读取；#42465 脱敏自定义模型",
      tl5Title: "收窄 Windows 进程监控、Google 验证链接与异步 SQLite 清理",
      tl6Title: "CI 自动关闭 (#42630)、DO_NOT_TRACK (#42629) 与遗留缺口",
      chartsSub: "量化语料库 · n = 1,151（2026 年 11 月 7–24 日）",
      chartsHeading: "1,151 条推文交互式取证图表",
      chartsDesc: "在页面内直接探索四张可交互取证图表，支持一键切换中英文、随主站同步浅/深色主题与悬停读数。",
      chartTab1: "语料结构与产品重心",
      chartTab2: "24 小时作息与日频波动",
      chartTab3: "选择性礼貌双标实锤",
      chartTab4: "25 小时中文区危机拆解",
      chartInspectPng: "查看归档 PNG 原图",
      chartOpenStandalone: "独立页面打开",
      chartDossier: "阅读卷宗 06",
      receiptsSub: "一手视觉实证总库",
      receiptsHeading: "108 张实证截图检索画廊",
      receiptsDesc:
        "按关键词、源码文件名、PR 或 Issue 编号即时检索，或按审计弹数筛选。点击任意实证卡片即可全屏放大核验，也可查阅 <a href=\"https://github.com/realchendahuang/before-you-install-t3code/blob/main/docs/EVIDENCE-INDEX.md\" target=\"_blank\" rel=\"noopener noreferrer\">108 项完整 Markdown 编目（<code>docs/EVIDENCE-INDEX.md</code>）</a>。",
      mitigationSub: "面向 ca81b7b9 的纵深止损与清理指引",
      mitigationHeading: "快速止损操作手册",
      mitigationDesc:
        "尽管 <code>PR #42629</code> 已支持 <code>DO_NOT_TRACK=1</code>，但 <code>DesktopShellEnvironment.ts</code> 仍漏传 <code>OTEL_SDK_DISABLED</code> 且 <code>AnalyticsService.ts:156</code> 启动仍先写盘。请结合环境变量、hosts 拉黑、Managed Policy、离线 <code>VACUUM</code> 与令牌吊销综合处理。",
      pbTabPolicy: "管理员 Managed Policy",
      pbUnix1Title: "1. 环境变量关闭（<code>DO_NOT_TRACK=1</code>）与系统层 hosts 阻断",
      pbUnix1Desc: "在 <code>~/.zshrc</code> 或 <code>~/.bashrc</code> 中同时导出 <code>DO_NOT_TRACK=1</code>（<code>PR #42629</code> / <code>v0.1.12</code>）与旧版关闭变量（macOS 同步执行 <code>launchctl setenv</code>），并在 <code>/etc/hosts</code> 同时拦截 <code>ingest.t3.codes</code> 与构建期注入的 <code>us-east-1.aws.edge.axiom.co</code>，随后彻底重启 T3 Code。",
      pbUnix2Title: "2. 排查 statev2.sqlite 膨胀、运行离线 <code>VACUUM</code> 并清除 Antigravity 目录",
      pbUnix2Desc: "<code>PR #42119</code> 随 <code>v0.1.12</code> 发布。<code>v0.1.11</code> 及更早版本单独跑 <code>VACUUM;</code> 不会清除软删除对话、<code>orchestration_events</code> 事件流或 <code>FTS5</code> 索引——请先升级到 <code>v0.1.12+</code> 让 <code>thread-content.purge</code> 同步清理投影表与事件存储后再离线 <code>VACUUM;</code>，或直接备份设置后删除 <code>statev2.sqlite</code> / <code>~/.t3</code>。",
      pbWin1Title: "1. 持久化用户/系统环境变量（<code>DO_NOT_TRACK=1</code>）与 Windows hosts 拦截",
      pbWin1Desc: "以管理员身份运行 PowerShell 写入全部关闭变量并同时拉黑 <code>ingest.t3.codes</code> 与 <code>us-east-1.aws.edge.axiom.co</code>，完成后重启电脑或后台进程。",
      pbWin2Title: "2. Windows 状态目录清理、SQLite <code>VACUUM</code> 与 GitHub OAuth 吊销",
      pbWin2Desc: "核查 <code>%USERPROFILE%\\.t3\\userdata\\</code>，清理 Antigravity 目录，并在 GitHub 设置中吊销 T3 Code 应用授权。",
      pbPolTitle: "管理员受管策略（<code>policy.json</code>）",
      pbPolDesc: "以 root 或管理员权限部署至下方受保护路径，再用 <code>t3 policy check policy.json</code> 与 <code>t3 policy show</code> 校验。",
      pbColMdm: "原生策略 / MDM / 注册表",
      pbColPath: "管理员受保护路径",
      pbWarnCallout:
        "<strong><code>v0.1.12</code> / <code>ca81b7b9</code> 盲区与严格校验警示：</strong> <code>managedPolicyFile.ts</code> 启用了 <code>{ onExcessProperty: \"error\" }</code> 且强制要求非空 <code>\"organization\"</code>——漏写或多写未识别字段会导致 T3 Code 拒启。Managed Policy 仍无法关闭 <code>app.t3.codes</code> 托管页、移动端追踪或已启用的 <code>Publish agent activity</code>（<code>AgentAwarenessRelay.ts</code> 仍会上报项目名、标题与步骤摘要），且启动仍先写盘。请手动在 <em>Settings → Sharing &amp; access</em> 关闭该项、解绑机器并申请 Clerk 删号。",
      footerColophon:
        "CC0 1.0 公有领域 · pingdotgg/t3code 独立安全、遥测与公开记录审计档案（基线 9d3195b4 → 上游 ca81b7b9）。零统计埋点、零第三方追踪脚本、零短链跳转。",
      footerGroupDossiers: "六份深度技术卷宗",
      footerGroupIndexes: "总索引与实证图表",
      footerGroupRepo: "仓库与自动门禁",
      footerScopeTitle: "核验与勘误原则",
      footerScopeBody:
        "本站每一项结论均锚定可公开查证的 Git 提交、PR、Issue、官方文档、USPTO 商标库或归档原图。欢迎附一手出处通过 Pull Request 提交事实更新与上游修复同步。"
    }
  };

  var EN_SNAPSHOT = {};

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var RISK_MATRIX_ZH = {
    "telemetry-gdpr": {
      domain: "遥测与 GDPR 举报后隐私",
      severityLabel: "严重",
      findings:
        "官网挂着「No telemetry / Unless you opt in. Full stop.」期间默认启用 PostHog（PR #174，3bdaa6e1 于 6 月 18 日删去承诺）；原始事件留存于闭源 ingest.t3.codes（PR #15028）；无盐 SHA-256 跨工具读取 ~/.codex/auth.json 与 ~/.claude.json（Identify.ts）；连拒 4 个退出 PR（#13458、#16763、#21248、#27077）；Managed Policy 存在盲区；GDPR 后通宵 PR 自承 Axiom 每小时留存 220 万条 IP+UA 跨度达 30 天（#42380）、git.cwd 绝对路径泄露（#42450）、Win/Mac 退出失效（#42376、#42464）、删号不删库（#42285）及匿名反馈混包（#42466）。",
      status:
        "PR #42299 已停止读取 .codex/.claude.json，#42465 将非目录模型脱敏为 custom:<driver>，#42630 与 #42629 响应 CI 及 DO_NOT_TRACK=1；但 AnalyticsService.ts:156 启动仍先写盘，DesktopShellEnvironment.ts 漏传 OTEL_SDK_DISABLED，app.t3.codes 无开关，ingest.t3.codes 维持闭源。",
      dossierTitle: "卷宗 01 · 遥测与 GDPR"
    },
    "local-safety": {
      domain: "本地安全与静默安全公告",
      severityLabel: "严重",
      findings:
        "侧边栏「永久删除」仅追加 thread.deleted 使 statev2.sqlite 膨至 25.9–41.6 GB（#17845）；t3-resource-monitor 扫描全机进程与命令行参数（#11222、PR #41889）；Claude Auto 第 3 次重试静默放行 git push --force（#15353，悬置 52+ 天）；21 小时撤除 slopalytics.com 模型过滤（#41237）；高危补丁静默合入但 GitHub 安全公告为 0；Windows Base64 PowerShell 报毒未修（#30997）；打开未受信任仓库自动递归初始化 .gitmodules、缺全局 core.hooksPath=/dev/null 并带 GITHUB_TOKEN/SSH_AUTH_SOCK 运行 SessionStart 钩子。",
      status:
        "PR #42119 新增异步清理（但活跃分支/子代理关联历史与墓碑行仍留存，瘦身需离线 VACUUM）；#42577 仅收窄 Windows 监控（Linux/macOS 维持 ProcessesToUpdate::All）；#15353、#26489、#30997、仓库钩子风险与 0 条安全公告仍未解决。",
      dossierTitle: "卷宗 02 · 本地安全与公告"
    },
    "antigravity-connect": {
      domain: "Antigravity 服务条款与 T3 Connect 中继",
      severityLabel: "高危",
      findings:
        "官方 FAQ 担保合乎 Google Antigravity 服务条款，但 antigravityUsageLimits.ts 提取系统钥匙串/Windows CredReadW 令牌并伪造 antigravity/hub/2.24.0 直连 v1internal；antigravityAuthSupport.ts 注入假 SSH_CONNECTION 引发跨号串流（#41973）；全新 $20 账号 3 分钟封号（#41536）；PR #33800 原生接入 CLIProxyAPI 伪装轮询；T3 Connect 零端到端加密（#32098）并计划迁往 OVH Caddy 明文网关（#32945）；ca81b7b9 另存 --lan 明文 Cookie、不可吊销 30 天 Bearer、可重放 ?wsTicket= 与 ::1 断连。",
      status:
        "PR #41210 新增 Google VALIDATION_REQUIRED 验证链接（反证风控触发）；全部 Antigravity 伪装与提取路径、零端到端加密、默认关闭 requireConnectDeviceApproval 以及局域网/Bearer/WS/::1 缺陷仍在生效。",
      dossierTitle: "卷宗 03 · Antigravity 与中继"
    },
    "business-77k": {
      domain: "商业账本、赞助商与 7.7 万星漏斗",
      severityLabel: "高危",
      findings:
        "自掏 $800k+ 打造免费客户端（提及 T3 162 次 vs 老付费业务 0 次）；日跑 31.7 万亿 token（$10.19M/天）算力雷达换取 $300k+ OpenAI 内测额度与 VC 接洽；天使投资与 Vibe Kanban、Daytona 冲突；Clerk/Axiom 赞助底座与 Vercel 排他条款；Codex 0% 薅羊毛与 10 账号 CLIProxyAPI Gist（555% 额度）；发呆 30 秒弹窗动用宿主机凭据发 PUT user/starred/...（#27832、#29922、#29987），绕过 Macroscope 审查并放任 driver.ts#L60-L99 任意点星漏洞 19 天未修。",
      status:
        "ca81b7b9 实测 driver.ts#L60-L99 任意仓库点星与 zhilsinger 审查意见仍未处理；仓库达 7.7 万+ 星而 watcher 仅约 129 人。",
      dossierTitle: "卷宗 04 · 商业与 7.7 万星"
    },
    "governance-trademark": {
      domain: "社区治理、商标记录与历史言行",
      severityLabel: "中高",
      findings:
        "内部日均 500 commits / 700 agents / yolo merges，对外却以 CONTRIBUTING.md 劝退（\"here's my advice: Don't\"）、.github/VOUCHED.td 拉黑秒关、174 个 unwanted 标签、删除 Plan mode（#5551、#9190、#33131）并在 #33639 辱骂用户；公开派 @bot 扒人 Fork（@MiaAI_lab）并挂自动拉黑脚本；威胁封号时 T3 Code 在 USPTO 注册商标为 0，17 小时后补写 TRADEMARK.md（#41898）；延续 2024–2026 多次风波模式。",
      status:
        "CONTRIBUTING.md、.github/VOUCHED.td 与事后补写的 TRADEMARK.md 仍在 main（ca81b7b9）生效。",
      dossierTitle: "卷宗 05 · 治理与商标"
    },
    "tweet-dataset": {
      domain: "1,151 条连续推文量化数据集",
      severityLabel: "审计基线",
      findings:
        "11 月 7–24 日连续语料全量分析（n = 1,151，17.24 天，日均 66.8 条，回复占 75.6%，间隔中位数 2.7 分钟）：对 20 位大厂高管/实验室员工/头部 KOL 针对性粗口与人身攻击率为 0.0%（0/43，礼貌致谢 32.6%），对普通开发者敌意率升至 8.0%（61/766），中文二改 25 小时危机窗口直接人身攻击暴涨 4.0 倍至 14.4%（19/132）。",
      status:
        "可复现正则审计（9d3195b4 / ca81b7b9），附 4 张可交互图表与归档静态 PNG。",
      dossierTitle: "卷宗 06 · 1,151 推文数据集"
    },
    "source-index": {
      domain: "320 条一手 URL 与 108 项视觉总目",
      severityLabel: "总索引",
      findings:
        "完整交叉编目 README.md、6 份深度卷宗与 ca81b7b9 审计后追踪引用的全部 320 条规范化 https:// 原始链接（SRC-001..SRC-320），配套 108 张无损优化视觉凭证总表（EV-001..EV-108）。",
      status:
        "100% 规范化直链（零 t.co 短链）且 108/108 视觉资产全覆盖编目。",
      dossierTitle: "完整来源总表 (320)",
      extraUrlTitle: "证据图总表 (108)"
    }
  };

  /* 1. Risk Matrix (Anthropic Editorial Dispatch Cards) */
  function renderRiskMatrix() {
    var grid = document.getElementById("riskGrid");
    if (!grid) return;

    var isZh = state.lang === "zh";
    var items = RISK_MATRIX.filter(function (row) {
      return state.riskFilter === "all" || row.severity === state.riskFilter;
    });

    grid.innerHTML = items
      .map(function (row) {
        var zh = isZh ? RISK_MATRIX_ZH[row.id] : null;
        var domain = zh ? zh.domain : row.domain;
        var sevLabel = zh ? zh.severityLabel : row.severityLabel;
        var findings = zh ? zh.findings : row.findings;
        var status = zh ? zh.status : row.status;
        var dossierTitle = zh ? zh.dossierTitle : row.dossierTitle;
        var extraTitle = zh && zh.extraUrlTitle ? zh.extraUrlTitle : (row.extraUrlTitle || "Reference");
        var spanCls = row.fullSpan && state.riskFilter === "all" ? " full-span" : "";
        var sevCls = "sev-" + row.severity;
        var swatchCls = "swatch-" + row.severity;
        var primaryPart = row.partFilters[0] || "All";
        var extraBtn = row.extraUrl
          ? '<a class="btn btn-sm claude-spring-press" href="' + escapeHtml(row.extraUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(extraTitle) + "</a>"
          : "";
        var statusPrefix = isZh ? "上游复核（ca81b7b9 · 11 月 25 日 14:49 CST）：" : "Status at ca81b7b9 (Nov 25, 14:49 CST): ";
        var filterBtnLabel = isZh ? "筛选相关实证 (" + primaryPart + ")" : "Filter receipts (" + primaryPart + ")";
        return (
          '<article class="risk-card' + spanCls + '">' +
            '<div>' +
              '<div class="dispatch-swatch-bar ' + swatchCls + '" aria-hidden="true">' +
                '<div class="s1"></div><div class="s2"></div><div class="s3"></div>' +
              "</div>" +
              '<div class="risk-top">' +
                '<div>' +
                  '<h3 class="risk-domain">' + escapeHtml(domain) + "</h3>" +
                  '<div class="risk-parts">' + escapeHtml(row.partsLabel) + "</div>" +
                "</div>" +
                '<span class="sev-badge ' + sevCls + '">' + escapeHtml(sevLabel) + "</span>" +
              "</div>" +
              '<p class="risk-findings" style="margin-top:12px;">' + escapeHtml(findings) + "</p>" +
            "</div>" +
            '<div>' +
              '<div class="risk-status"><strong>' + escapeHtml(statusPrefix) + "</strong>" + escapeHtml(status) + "</div>" +
              '<div class="risk-actions" style="margin-top:12px;">' +
                '<button type="button" class="btn btn-sm btn-stone claude-spring-press js-jump-receipts" data-part="' + escapeHtml(primaryPart) + '">' + escapeHtml(filterBtnLabel) + "</button>" +
                '<div class="risk-actions-right">' +
                  extraBtn +
                  '<a class="btn btn-sm btn-primary claude-spring-press" href="' + escapeHtml(row.dossierUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(dossierTitle) + "</a>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.querySelectorAll(".js-jump-receipts").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var part = btn.getAttribute("data-part") || "All";
        setGalleryPart(part);
        var target = document.getElementById("receipts");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initRiskFilters() {
    document.querySelectorAll("[data-risk-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.riskFilter = btn.getAttribute("data-risk-filter");
        document.querySelectorAll("[data-risk-filter]").forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        renderRiskMatrix();
      });
    });
  }

  /* 2. Forensic Charts Tab Viewer */
  function setActiveChart(chartKey) {
    var cfg = CHARTS[chartKey];
    if (!cfg) return;
    state.activeChart = chartKey;

    var frame = document.getElementById("chartFrame");
    var desc = document.getElementById("chartDesc");
    var standalone = document.getElementById("chartStandaloneLink");
    var pngBtn = document.getElementById("chartPngBtn");

    if (frame && frame.getAttribute("src") !== cfg.src) {
      frame.setAttribute("src", cfg.src);
    }
    if (desc) desc.textContent = cfg.desc;
    if (standalone) standalone.setAttribute("href", cfg.src);
    if (pngBtn) pngBtn.setAttribute("data-png", cfg.png);

    document.querySelectorAll("[data-chart-tab]").forEach(function (tab) {
      var active = tab.getAttribute("data-chart-tab") === chartKey;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function initCharts() {
    document.querySelectorAll("[data-chart-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveChart(tab.getAttribute("data-chart-tab"));
      });
    });

    var pngBtn = document.getElementById("chartPngBtn");
    if (pngBtn) {
      pngBtn.addEventListener("click", function () {
        var pngPath = pngBtn.getAttribute("data-png");
        var idx = EVIDENCE_RECEIPTS.findIndex(function (r) { return r.path === pngPath; });
        if (idx >= 0) {
          state.filteredReceipts = EVIDENCE_RECEIPTS.slice();
          openLightboxIndex(idx);
        }
      });
    }

    window.addEventListener("message", function (event) {
      if (event && event.data && event.data.type === "t3-chart-height") {
        var frame = document.getElementById("chartFrame");
        var h = Number(event.data.height);
        if (frame && Number.isFinite(h) && h > 320 && h < 1800) {
          frame.style.height = (h + 16) + "px";
        }
      }
    });
  }

  /* 3. 108-Receipt Evidence Gallery + Lightbox */
  function partCount(part) {
    if (part === "All") return EVIDENCE_RECEIPTS.length;
    return EVIDENCE_RECEIPTS.filter(function (r) { return r.parts.indexOf(part) !== -1; }).length;
  }

  function renderPartPills() {
    var container = document.getElementById("partPills");
    if (!container) return;

    container.innerHTML = PART_PILLS.map(function (part) {
      var count = partCount(part);
      var active = state.galleryPart === part ? " active" : "";
      return (
        '<button type="button" class="part-pill' + active + '" data-part="' + escapeHtml(part) + '">' +
          escapeHtml(part) + " (" + count + ")" +
        "</button>"
      );
    }).join("");

    container.querySelectorAll(".part-pill").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setGalleryPart(btn.getAttribute("data-part"));
      });
    });
  }

  function setGalleryPart(part) {
    state.galleryPart = part || "All";
    renderPartPills();
    renderGallery();
  }

  function filterReceipts() {
    var q = state.galleryQuery.trim().toLowerCase();
    state.filteredReceipts = EVIDENCE_RECEIPTS.filter(function (item) {
      var matchPart = state.galleryPart === "All" || item.parts.indexOf(state.galleryPart) !== -1;
      if (!matchPart) return false;
      if (!q) return true;
      var hay = (item.title + " " + item.caption + " " + item.path + " " + item.parts.join(" ")).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function renderGallery() {
    filterReceipts();
    var grid = document.getElementById("galleryGrid");
    var counter = document.getElementById("galleryCount");
    if (!grid || !counter) return;

    counter.textContent = "Showing " + state.filteredReceipts.length + " of " + EVIDENCE_RECEIPTS.length + " receipts";

    if (state.filteredReceipts.length === 0) {
      grid.innerHTML =
        '<div class="empty-state">' +
          '<p style="margin:0 0 12px;">No evidence receipts match your current filter.</p>' +
          '<button type="button" class="btn btn-sm btn-primary" id="resetGalleryBtn">Reset Filters</button>' +
        "</div>";
      var resetBtn = document.getElementById("resetGalleryBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          state.galleryPart = "All";
          state.galleryQuery = "";
          var input = document.getElementById("gallerySearch");
          if (input) input.value = "";
          renderPartPills();
          renderGallery();
        });
      }
      return;
    }

    grid.innerHTML = state.filteredReceipts
      .map(function (item, idx) {
        var relName = item.path.replace(/^\.\/evidence\//, "");
        return (
          '<article class="receipt-card" data-idx="' + idx + '" tabindex="0" role="button" aria-label="Inspect receipt: ' + escapeHtml(item.title) + '">' +
            '<div class="receipt-thumb-wrap">' +
              '<img class="receipt-thumb" src="' + escapeHtml(item.path) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" decoding="async" />' +
              '<span class="receipt-part-badge">' + escapeHtml(item.part) + "</span>" +
            "</div>" +
            '<div class="receipt-body">' +
              '<h3 class="receipt-title">' + escapeHtml(item.title) + "</h3>" +
              '<p class="receipt-caption">' + escapeHtml(item.caption) + "</p>" +
              '<div class="receipt-meta">' + escapeHtml(relName) + "</div>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.querySelectorAll(".receipt-card").forEach(function (card) {
      var open = function () {
        var idx = Number(card.getAttribute("data-idx"));
        openLightboxIndex(idx);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function renderLightboxItem(item, indexText) {
    var modal = document.getElementById("lightboxModal");
    var stage = document.getElementById("lightboxStage");
    var img = document.getElementById("lightboxImg");
    var partBadge = document.getElementById("lightboxPart");
    var pathBadge = document.getElementById("lightboxPath");
    var countBadge = document.getElementById("lightboxCounter");
    var titleEl = document.getElementById("lightboxTitle");
    var capEl = document.getElementById("lightboxCaption");
    var linksEl = document.getElementById("lightboxLinks");
    var zoomBtn = document.getElementById("lightboxZoomBtn");

    if (!modal || !img) return;
    state.zoomed = false;
    if (stage) stage.classList.remove("zoomed");
    if (zoomBtn) zoomBtn.textContent = "Zoom 100%";

    img.src = item.path;
    img.alt = item.title;
    if (partBadge) partBadge.textContent = item.parts.join(" · ");
    if (pathBadge) pathBadge.textContent = item.path.replace(/^\.\//, "");
    if (countBadge) countBadge.textContent = indexText;
    if (titleEl) titleEl.textContent = item.title;
    if (capEl) capEl.textContent = item.caption;

    if (linksEl) {
      var isZh = state.lang === "zh";
      var html = '<a href="' + escapeHtml(item.path) + '" target="_blank" rel="noopener noreferrer">' + (isZh ? "打开原图" : "Open raw image") + "</a>";
      if (item.dossier) {
        html += '<a href="' + escapeHtml(item.dossier) + '" target="_blank" rel="noopener noreferrer">' + (isZh ? "阅读关联卷宗" : "Read related dossier") + "</a>";
      }
      if (item.sourceUrl) {
        html += '<a href="' + escapeHtml(item.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + (isZh ? "查看一手原出处" : "Canonical primary source") + "</a>";
      }
      linksEl.innerHTML = html;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function openLightboxIndex(idx) {
    if (!state.filteredReceipts.length) return;
    var wrapped = (idx + state.filteredReceipts.length) % state.filteredReceipts.length;
    state.lightboxIdx = wrapped;
    var item = state.filteredReceipts[wrapped];
    renderLightboxItem(item, (wrapped + 1) + " / " + state.filteredReceipts.length);
  }

  function closeLightbox() {
    var modal = document.getElementById("lightboxModal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.lightboxIdx = -1;
  }

  function toggleLightboxZoom() {
    var stage = document.getElementById("lightboxStage");
    var btn = document.getElementById("lightboxZoomBtn");
    if (!stage) return;
    state.zoomed = !state.zoomed;
    stage.classList.toggle("zoomed", state.zoomed);
    if (btn) btn.textContent = state.zoomed ? "Fit screen" : "Zoom 100%";
  }

  function initGalleryAndLightbox() {
    renderPartPills();
    renderGallery();

    var search = document.getElementById("gallerySearch");
    if (search) {
      search.addEventListener("input", function () {
        state.galleryQuery = search.value || "";
        renderGallery();
      });
    }

    var coverCard = document.getElementById("heroCoverCard");
    if (coverCard) {
      var openCover = function () {
        state.filteredReceipts = EVIDENCE_RECEIPTS.slice();
        openLightboxIndex(state.lang === "zh" ? 1 : 0);
      };
      coverCard.addEventListener("click", openCover);
      coverCard.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCover();
        }
      });
    }

    var closeBtn = document.getElementById("lightboxCloseBtn");
    var prevBtn = document.getElementById("lightboxPrevBtn");
    var nextBtn = document.getElementById("lightboxNextBtn");
    var zoomBtn = document.getElementById("lightboxZoomBtn");
    var img = document.getElementById("lightboxImg");
    var modal = document.getElementById("lightboxModal");

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", function () { openLightboxIndex(state.lightboxIdx - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { openLightboxIndex(state.lightboxIdx + 1); });
    if (zoomBtn) zoomBtn.addEventListener("click", toggleLightboxZoom);
    if (img) img.addEventListener("click", toggleLightboxZoom);
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeLightbox();
      });
    }

    document.addEventListener("keydown", function (e) {
      var isOpen = modal && modal.classList.contains("open");
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightboxIndex(state.lightboxIdx - 1);
      if (e.key === "ArrowRight") openLightboxIndex(state.lightboxIdx + 1);
    });
  }

  /* 4. Mitigation Playbook Tabs & Copy */
  function copyText(text, btn) {
    var finish = function () {
      var orig = btn.textContent;
      btn.textContent = state.lang === "zh" ? "已复制" : "Copied";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = orig;
        btn.classList.remove("copied");
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(function () { fallbackCopy(text, finish); });
    } else {
      fallbackCopy(text, finish);
    }
  }

  function fallbackCopy(text, onSuccess) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); onSuccess(); } catch (err) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function initPlaybook() {
    document.querySelectorAll("[data-playbook-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-playbook-tab");
        document.querySelectorAll("[data-playbook-tab]").forEach(function (t) {
          var active = t === tab;
          t.classList.toggle("active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        document.querySelectorAll("[data-playbook-panel]").forEach(function (panel) {
          panel.classList.toggle("active", panel.getAttribute("data-playbook-panel") === key);
        });
      });
    });

    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-copy-target");
        var codeEl = targetId ? document.getElementById(targetId) : null;
        if (codeEl) copyText(codeEl.textContent, btn);
      });
    });
  }

  /* 5. Claude Polarity Toggle, Bilingual Switch & Signature Footer Accordions */
  function syncChartFrame() {
    var frame = document.getElementById("chartFrame");
    if (!frame || !frame.contentWindow) return;
    try {
      frame.contentWindow.postMessage(
        { type: "t3-theme", theme: state.theme, lang: state.lang },
        "*"
      );
    } catch (e) { /* ignore cross-origin */ }
  }

  function applyTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    var isDark = state.theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    try { localStorage.setItem("byit3-theme", state.theme); } catch (e) {}

    var btn = document.getElementById("themeToggleBtn");
    var sun = document.getElementById("themeIconSun");
    var moon = document.getElementById("themeIconMoon");
    var label = document.getElementById("themeToggleLabel");
    if (btn) btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    if (sun) sun.style.display = isDark ? "" : "none";
    if (moon) moon.style.display = isDark ? "none" : "";
    if (label) {
      if (state.lang === "zh") {
        label.textContent = isDark ? "浅色" : "深色";
      } else {
        label.textContent = isDark ? "Light" : "Dark";
      }
    }
    syncChartFrame();
  }

  function initThemeToggle() {
    try {
      var qpTheme = new URLSearchParams(window.location.search).get("theme");
      if (qpTheme === "dark" || qpTheme === "light") state.theme = qpTheme;
    } catch (e) {}
    applyTheme(state.theme);
    var btn = document.getElementById("themeToggleBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        applyTheme(state.theme === "dark" ? "light" : "dark");
      });
    }
    var frame = document.getElementById("chartFrame");
    if (frame) {
      frame.addEventListener("load", syncChartFrame);
    }
  }

  function applyLanguage(lang) {
    state.lang = lang === "zh" ? "zh" : "en";
    var isZh = state.lang === "zh";
    document.documentElement.lang = isZh ? "zh-CN" : "en";
    document.body.classList.toggle("tn-prose-cjk", isZh);
    try { localStorage.setItem("byit3-lang", state.lang); } catch (e) {}

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      if (!(key in EN_SNAPSHOT)) {
        EN_SNAPSHOT[key] = el.innerHTML;
      }
      if (isZh && UI_I18N.zh[key]) {
        el.innerHTML = UI_I18N.zh[key];
      } else if (key in EN_SNAPSHOT) {
        el.innerHTML = EN_SNAPSHOT[key];
      }
    });

    var langLabel = document.getElementById("langToggleLabel");
    if (langLabel) langLabel.textContent = isZh ? "EN" : "中文";

    var coverImg = document.getElementById("heroCoverImg");
    var coverPath = document.getElementById("heroCoverPath");
    if (coverImg) {
      coverImg.src = isZh ? "./evidence/00-cover-zh.png" : "./evidence/00-cover-en.png";
    }
    if (coverPath) {
      coverPath.textContent = isZh ? "evidence/00-cover-zh.png" : "evidence/00-cover-en.png";
    }

    var search = document.getElementById("gallerySearch");
    if (search) {
      search.placeholder = isZh
        ? "搜索 108 张实证（如 42450、Identify.ts、antigravity、wsTicket、SSH_AUTH_SOCK、driver.ts）..."
        : "Search 108 receipts (e.g. 42450, Identify.ts, antigravity, wsTicket, SSH_AUTH_SOCK, driver.ts)...";
    }

    applyTheme(state.theme);
    renderRiskMatrix();
    syncChartFrame();
  }

  function initLanguageToggle() {
    var savedLang = "en";
    try {
      var qpLang = new URLSearchParams(window.location.search).get("lang");
      var stored = localStorage.getItem("byit3-lang");
      if (qpLang === "zh" || qpLang === "en") savedLang = qpLang;
      else if (stored === "zh" || stored === "en") savedLang = stored;
    } catch (e) {}

    applyLanguage(savedLang);
    var btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(state.lang === "zh" ? "en" : "zh");
      });
    }
  }

  function initFooterAccordions() {
    var triggers = document.querySelectorAll("[data-acc-trigger]");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var key = trigger.getAttribute("data-acc-trigger");
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        triggers.forEach(function (t) {
          var k = t.getAttribute("data-acc-trigger");
          var nextOpen = k === key ? !isOpen : false;
          t.setAttribute("aria-expanded", nextOpen ? "true" : "false");
          var panel = document.querySelector('[data-acc-panel="' + k + '"]');
          if (panel) panel.setAttribute("data-open", nextOpen ? "true" : "false");
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initRiskFilters();
    initCharts();
    setActiveChart("chart1");
    initGalleryAndLightbox();
    initPlaybook();
    initThemeToggle();
    initLanguageToggle();
    initFooterAccordions();
  });
})();
