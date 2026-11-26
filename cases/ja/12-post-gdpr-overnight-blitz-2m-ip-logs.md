# #12 · GDPR施行後6時間の深夜緊急対応：毎時220万件のIPログと機能しないアカウント削除

> 11月24日にEU GDPRの正式な苦情申立てが提出された後、深夜に緊急パッチを6時間にわたって適用した結果、さらに深いプライバシー開示が4件、意図せず明るみに出た。その中心は、30日間保持されるIPタグ付きAxiomスパンが毎時220万件に達していたことだ。

<!-- section:claim -->
## 主張されていた内容

- `PR #42380` がマージされてから3.5時間が経過した後でも、`@theo` は発信元IPがすでに削除済みだと公に返信していた。
- 公式ドキュメント（`docs/user/telemetry.md`）は、`agent.feedback` レポートが匿名であり、アカウント削除によってユーザーデータが完全に消去されると約束していた。

<!-- section:evidence -->
## 証拠が示す内容

- **毎時220万件のIP＋User-Agentリレースパン（`PR #42380`）：** Axiomへエクスポートされたすべてのリレーリクエストスパン——**毎時約220万スパン、30日間保持**——は、`user.id` と並べて `client.address`（`cf-connecting-ip` からの実際の発信元IP）と `user_agent.original` を記録していた（CloudflareのWorkersログ1%は別途分離されたまま）。
- **機能しないClerkアカウント削除（`PR #42285` ＆ `PR #42430`）：** 以前はClerkでユーザーアカウントを削除しても、PlanetScaleのリレー行と稼働中のCloudflareトンネルが裏で残っていた。実際のユーザーによるプライバシー削除要求が発生するまで、エンジニアは**手書きのSQLと手動でのトンネル撤去**を強いられた。
- **モバイルプッシュトークンとユーザーIDの漏洩（`PR #42459` ＆ `PR #41859`）：** AndroidのFCMプッシュペイロードは、通知のたびにClerkの `user_id` 値を平文でGoogleへ送信していた。iOSのAPNsスパンとエラーログは、プッシュトークンを含む完全なデバイスプッシュURLを記録していた。
- **「匿名」フィードバックの混在バッチ（`PR #42466`）：** 匿名とされていた `agent.feedback` イベントは、識別可能な `installId` イベントや完全なホストフィンガープリント（OS、アーキテクチャ、生のWSLディストリビューション）とまったく同じHTTP POST内でバッチ処理されていた。これは `docs/user/telemetry.md` と真っ向から矛盾する。

<!-- section:status -->
## 上流のステータス（`ca81b7b9`）

- **部分的にパッチ済み：** 緊急PR `#42380`、`#42285`、`#42430`、`#42459`、`#41859`、`#42466` は、深夜のGDPR緊急対応の間にマージされた。
- **未解決：** `privacy-policy.astro` は `2026-10-06` 以降変更されておらず、クローズドソースの `ingest.t3.codes` は独立した監査が不可能なまま生のイベントコピーを保持しており、過去の30日間のAxiom保持期間は影響を受けたユーザーに正式に開示されていない。

<!-- section:visuals -->
## 視覚的証拠

![PR #42380：Axiomに30日間、user.idの隣に実際の発信元IPとUser-Agentを記録した毎時約220万件のリレースパンを明らかにする](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285：アカウント削除が以前、PlanetScaleの行と稼働中のCloudflareトンネルを残していたことを認める](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459：AndroidのFCMプッシュがClerkの生のuser_id値をGoogleへ送信していたことを認める](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466：匿名フィードバックがinstallIdやホストフィンガープリントと一緒にバッチ処理されていたことを認める](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## 一次情報源

- [元のX調査（Part 12）](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [詳細技術ドシエ01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
