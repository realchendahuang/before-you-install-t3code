# #01 · 「テレメトリーなし」というホームページの約束の裏で有効化されていたデフォルトのテレメトリー

> ホームページで「No telemetry. Unless you opt in. Full stop.」と約束していたにもかかわらず、T3 Code はデフォルトで PostHog の追跡を有効化し、生のコピーをクローズドソースの `ingest.t3.codes` 経由で流し、外部の `~/.codex` と `~/.claude.json` の認証情報をハッシュ化し、さらにコミュニティによるオプトアウト PR 4件を拒否していた。

<!-- section:claim -->
## 何が謳われていたか

- T3 Code のホームページは目立つ形でこう約束していた：*"No telemetry / Unless you opt in. Full stop."*
- プライバシー優先のオープンソースなローカル AI コーディングクライアントとして、公然と打ち出されていた。

<!-- section:evidence -->
## 証拠が示すもの

- **「テレメトリーなし」の誓約のもとに出荷されたデフォルト追跡（`PR #174` → `3bdaa6e1`）：** 2026年3月6日、[`PR #174`](https://github.com/pingdotgg/t3code/pull/174) は、同意ダイアログも設定 UI のトグルもテレメトリーのドキュメントもないまま、デフォルトで有効な PostHog アナリティクスを導入した。3か月余り後の6月18日、[`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) はリデザインの最中に *"No telemetry"* というホームページの約束を、ユーザーへの通知を一切出さずにひっそりと削除した。
- **クローズドソースによる一次保有（`PR #15028`）：** 2026年10月、テレメトリーのバッチ（`FLUSH_INTERVAL_MS = 10_000`）は T3 のクローズドソースのエンドポイント [`https://ingest.t3.codes/`](https://ingest.t3.codes/) を経由するようになった。`AnalyticsService.ts` の1行目は、サーバーが PostHog へ転送する前に、あらゆるイベントの生のコピーを保持していることを裏づけている。
- **ツールをまたぐ認証情報の読み取りとソルトなしの SHA-256（`PR #21506`）：** ベースライン `9d3195b4` の `Identify.ts` は、T3 Connect のユーザー ID と並べて `~/.codex/auth.json`（OpenAI の `user_id` JWT クレームをデコード）と `~/.claude.json`（`oauthAccount.accountUuid`）を読み取り、ソルトなしの SHA-256 ダイジェスト（`telemetryId.ts`）を計算して、別々のマシンを同一人物へ結びつけていた。T3 は平文の Clerk ID を保持しているため、ソルトなしのダイジェストは決定的に逆算できる。
- **詳細な利用状況の収集：** `ProviderUsageAnalytics.ts` と `FeatureUsage.ts` は、プロバイダー、カスタムモデル、reasoning effort、パーミッションモード、トークン数、プロジェクト／スレッド数、OS／WSL のメタデータ、そして **35 種類の UI／コマンド操作** を送信していた。
- **コミュニティによるオプトアウト PR 4件が拒否：** 6月23日、メンテナーの Julius は [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) を（`not planned` として）クローズした：*"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) は静かにクローズされ、コミュニティのオプトアウト PR 4件（`#13458`、`#16763`、`#21248`、`#27077` — テスト147件が通過し、ボットも承認）は `unwanted` として拒否された。

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## 上流の状況（`ca81b7b9`）

- **部分的に修正済み：** 公に露見した後（226万回以上閲覧）、[`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) が `~/.codex/auth.json` と `~/.claude.json` の読み取りを削除した。[`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) はカタログ外のモデルを `custom:<driver>` としてマスクした。[`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) と [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) は CI と `DO_NOT_TRACK` によるオプトアウトを追加した。
- **未解決：** `AnalyticsService.ts:156` は今もオプトアウトを確認する前にローカルのインストール ID をディスクへ書き込んでいる。`DesktopShellEnvironment.ts` は今も `OTEL_SDK_DISABLED`／`T3CODE_OTEL_SDK_DISABLED` の転送を欠いている。`ingest.t3.codes` はクローズドソースのままだ。設定 UI のトグルは皆無である。

<!-- section:visuals -->
## 視覚的証拠

![コミット 3bdaa6e1 が "No telemetry / Unless you opt in. Full stop." というホームページの約束をひっそりと削除](../../evidence/02-no-telemetry-removed.png)

![Identify.ts がソルトなし SHA-256 によるクロスデバイス帰属のために ~/.codex/auth.json と ~/.claude.json を読み取る](../../evidence/03-identify-codex-claude.png)

![Issue #1397 が not planned としてクローズ："We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![147件のテストが通過したにもかかわらず PR #27077 が unwanted として拒否される](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## 一次情報源

- [X での元調査（Part 1 · 226万回以上閲覧）](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [監査後の PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [詳細技術ドシエ 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
