# Temu3 Code — T3 Code をインストールする前に

<p align="center">
  <em>pingdotgg/t3code に関する、独立した証拠優先の公開記録 — 人種的二重基準、欺瞞的なテレメトリー、重大なセキュリティ欠陥、商業的操作を記録する。</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=ja"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=ja"><strong>✉ Tmail 受信箱</strong></a> ·
  <a href="https://temu3code.com/?lang=ja#x-receipts"><strong>📸 X の原典ショット12点</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=ja"><strong>🃏 ミーム61点</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>記録109件</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>情報源327件</strong></a>
</p>

<p align="center">
  <strong>言語（18）：</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md"><strong>日本語</strong></a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

![T3 Code をインストールする前に](../../evidence/00-cover-en.png)

> [!IMPORTANT]
> **独立した公開記録調査 · 18言語**
>
> テレメトリーはない。人種差別はない。以下の主張はすべて、逐語的な公開発言、リポジトリのコミット、プルリクエスト、USPTO提出書類、アーカイブされたスクリーンショットに基づいている。
>
> - **検証済み証拠:** 20件の証拠（#00–#19）
> - **一次証拠:** 視覚証拠109点 · 正規URL 327件
> - **上流確認:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **セキュリティアドバイザリ:** GitHub公開アドバイザリ 0件

---

## 60秒でわかる経緯

コミュニティによるMITフォークの名をめぐる一度の紛争が、人種的二重基準、隠れたテレメトリー、無言のセキュリティパッチ、未修正のアーキテクチャ上のリスクという一連の構図を明らかにした。

1. **差別の火種** *(2026年11月23日)* — あるユーザーが中国人開発者による無料のMITフォークを公式T3 Codeと誤認した後、@theoはそれを「中国製の模倣品」および「Temu3 Code」と呼び、GitHubアカウントの停止を脅した——USPTO商標登録0件のまま、11時間後には兆ドル規模の米国ラボがMITコードをコピーすることを公に歓迎していたにもかかわらず。
2. **ソースコードを開く** *(2026年11月24日)* — pingdotgg/t3code を一行ずつ精査した結果、ホームページの「テレメトリーなし」という約束の裏で初期設定で有効になるPostHogテレメトリー、ingest.t3.codes におけるクローズドソースのイベント保持、~/.codex と ~/.claude.json のソルトなしSHA-256読み取り、41.6 GBのSQLite削除偽装、52日間にわたる無言の git push --force バグ、Google Antigravityのヘッダー詐称、E2E暗号化なしの平文T3 Connectが明らかになった。
3. **226万回超の閲覧、EU GDPR申立て、6時間のパニック対応** *(2026年11月24～25日 夜間)* — 第1部は226万回の閲覧を超え、EU GDPRの申立てを引き起こした。夜間の緊急PRは、Axiomに30日間保持される毎時220万件のIP＋User-Agentログ、git.cwdの絶対ワークスペースパスの漏えい、機能しないアカウント削除、Windows/macOSのオプトアウト無視を、意図せず認めていた。
4. **現在も未解決のもの** *(2026年11月25日（ca81b7b9）以降、継続中)* — ca81b7b9 までの259コミットを追跡した結果、テレメトリーの部分的な修正が確認された一方で、未修正の起動時ID書き込み、UIトグルなし、GitHubセキュリティアドバイザリ0件、任意リポジトリをピン留めせずにスターさせる挙動、平文で30日間有効な --lan シェルクッキー、取り消し不能なBearerトークン、信頼できないリポジトリでの SSH_AUTH_SOCK 露出（#19）が残っている。

---

## 検証済み証拠20件（#00–#19）

以下の各証拠は、このリポジトリ内にある専用の、表を使用しないローカライズ版証拠ファイルと、Webポータル上の共有可能なビジュアルカードにリンクしている。継続的な追跡は（#20、#21、…）へと順次続く。

### 第1部 · 人種差別、二重基準、そして反復する構図

*USPTO商標0件のまま「中国製の模倣品」や「Temu3 Code」と呼んで削除を迫った件から、1,151件のツイートの量的分布（VIPへの暴言0.0％対開発者への敵意8.0％対反中国的な危機的急増14.4％）、そして2年間にわたる反復的な履歴まで。*

- **#00 · [起源をめぐる論争：「コードを盗め」、フォーク命名への脅迫、そして人種による二重基準](../../cases/ja/00-origin-fork-dispute-and-double-standard.md)** — `📌 公開記録`
  わずか11分のうちに、@theo は中国人開発者による無料のMITフォークを「Chinese knockoff」「Temu3 Code」とレッテル貼りし、GitHubアカウントの停止を脅した——そして11時間も経たないうちに、兆ドル規模の米国企業がMITコードをコピーすることを公に歓迎した。
  [証拠全体を開く](../../cases/ja/00-origin-fork-dispute-and-double-standard.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [1,151件のツイート定量データセット：選択的な丁寧さと4.0倍の反中クライシス急増](../../cases/ja/14-1151-tweet-quantitative-double-standard.md)** — `📌 公開記録`
  2026年11月7日〜24日の @theo の X 投稿1,151件（連続）を網羅的に定量分析した結果、極めて鮮明な権力の非対称性が証明された。ビッグテック幹部およびラボ関係者20名に対する暴言率は0.0%、一方で一般開発者への敵意は8.0%——さらに25時間に及ぶ中国フォーク論争の最中には4.0倍の14.4%へと急増した。
  [証拠全体を開く](../../cases/ja/14-1151-tweet-quantitative-double-standard.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [GitHub アカウント削除脅迫の背後に USPTO 商標登録ゼロ、そして 17 時間後の遡及的な `TRADEMARK.md`](../../cases/ja/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 公開記録`
  @theo が「商標侵害」を理由に GitHub に連絡して中国人開発者のアカウントを削除させると脅したとき、T3 Tools Inc. は `T3 Code`、`T3 Tools`、`T3 Connect` について USPTO の登録を 0 件しか持っておらず、しかも 17 時間後に `TRADEMARK.md` を遡及的にマージした。
  [証拠全体を開く](../../cases/ja/15-zero-uspto-trademarks-and-retroactive-policy.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [2年にわたる歴史的パターン：国籍をめぐる反発、FFmpegへの2万ドル懸賞、削除された脅迫](../../cases/ja/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 公開記録`
  2026年11月に中国フォークをめぐって起きた爆発は、一度きりの失態ではなかった——2024年から2026年までの公開記録は、国籍を標的にした嫌がらせ、オープンソースを舞台にしたいじめ、他の開発者のUIを嘲笑う行為、そして反発後の削除という、繰り返されるサイクルを記録している。
  [証拠全体を開く](../../cases/ja/16-two-year-pattern-of-bullying-and-deletions.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125408843152953693)

### 第2部 · 欺瞞的なテレメトリーとプライバシー侵害

*「テレメトリーは一切ない」という表明が、初期設定のPostHog送信、クローズドソースの ingest.t3.codes 保持、ツール間の認証情報ハッシュ化、Managed Policyの盲点、毎時220万件のIPタグ付きAxiomログをいかに隠していたか。*

- **#01 · [「テレメトリーなし」というホームページの約束の裏で有効化されていたデフォルトのテレメトリー](../../cases/ja/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 一部修正済み`
  ホームページで「No telemetry. Unless you opt in. Full stop.」と約束していたにもかかわらず、T3 Code はデフォルトで PostHog の追跡を有効化し、生のコピーをクローズドソースの `ingest.t3.codes` 経由で流し、外部の `~/.codex` と `~/.claude.json` の認証情報をハッシュ化し、さらにコミュニティによるオプトアウト PR 4件を拒否していた。
  [証拠全体を開く](../../cases/ja/01-default-telemetry-and-cross-tool-tracking.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [マネージドポリシーの矛盾：文書化された4つのテレメトリ盲点](../../cases/ja/07-managed-policy-blind-spots.md)** — `🔴 未修正`
  `@theo` は、T3 Code に「最高の企業向けマネージドポリシーシステム」があり、「すべてのテレメトリを切るのは簡単」だと主張した。しかしこれは、T3 Code 自身の `docs/user/telemetry.md` と `docs/user/managed-policy.md` によって真っ向から否定されている。
  [証拠全体を開く](../../cases/ja/07-managed-policy-blind-spots.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [11月25日の説明、2時間以内に一夜のPR群と100MBダンプで矛盾が露呈](../../cases/ja/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 一部修正済み`
  11月25日の朝、@theo はプライバシーに関する包括的な保証を3つ示し、100 MB のテレメトリーダンプを公開した。しかし、その3つの主張はいずれも2時間以内に、彼自身のチームによるPR群とgzip圧縮されたダンプそのものによって覆された。
  [証拠全体を開く](../../cases/ja/11-nov25-clarification-contradicted-in-2-hours.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [GDPR施行後6時間の深夜緊急対応：毎時220万件のIPログと機能しないアカウント削除](../../cases/ja/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 一部修正済み`
  11月24日にEU GDPRの正式な苦情申立てが提出された後、深夜に緊急パッチを6時間にわたって適用した結果、さらに深いプライバシー開示が4件、意図せず明るみに出た。その中心は、30日間保持されるIPタグ付きAxiomスパンが毎時220万件に達していたことだ。
  [証拠全体を開く](../../cases/ja/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125395501663281198)

### 第3部 · 製品欠陥と重大なセキュリティ欠陥

*41.6 GBのSQLite削除偽装、5秒間隔のOSプロセス走査、52日間の無言の git push --force、3分間の利用停止を招くGoogle Antigravityの利用規約詐称、E2E暗号化なしの平文T3 Connect、セキュリティアドバイザリ0件、そして ca81b7b9 におけるLAN/Bearer/SSH_AUTH_SOCKの脆弱性。*

- **#02 · [偽のSQLiteスレッド削除（41.6 GBの肥大化）と5秒ごとのOS全プロセススキャン](../../cases/ja/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 一部修正済み`
  「完全に削除」をクリックしても、会話履歴のすべてが `statev2.sqlite` の中にそのまま残っていた（ローカルディスクを41.6 GBまで肥大化）。一方、バックグラウンドのRust製モニターは、オプトアウトの手段が一切ないまま、5秒ごとにOSの全プロセスとコマンドライン全体をスキャンしていた。
  [証拠全体を開く](../../cases/ja/02-fake-sqlite-delete-and-process-scanner.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52日間の沈黙の `git push --force` と、モデル・プライバシー・フィルターを外すまでの21時間](../../cases/ja/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 未修正`
  52日以上もの間、T3 Code は、Claude Auto モードがプロンプトを出さずに `git push --force origin main` を黙って承認してしまうバグをオープンのまま放置していた。一方で、プライバシー・ホワイトリストを撤廃し、プライベートなモデルが @theo の公開リーダーボードに表示されるようにするまでに要したのは、わずか21時間だった。
  [証拠全体を開く](../../cases/ja/03-silent-force-push-vs-21h-filter-removal.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity のヘッダー偽装、偽造された `SSH_CONNECTION`、そして3分でのアカウントBAN](../../cases/ja/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 未修正`
  FAQでToS遵守を保証しているにもかかわらず、T3 CodeはOSのキーリングから認証情報を抜き出し、Google内部向けヘッダー（`antigravity/hub/2.24.0`）を`v1internal`に対して偽装し、さらに偽の`SSH_CONNECTION`値を注入している——個人のGoogleサブスクリプションを急速なBANへと晒しながら。
  [証拠全体を開く](../../cases/ja/04-antigravity-spoofing-and-3-minute-bans.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect：エンドツーエンド暗号化ゼロ、平文TLS終端ゲートウェイ](../../cases/ja/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 未修正`
  T3 Connectを経由するすべてのプロンプト、ソースファイル、ターミナルストリームは、T3が管理するインフラ内で平文のまま終端する——エンドツーエンド暗号化は皆無で、デバイス承認もデフォルトでオフだ。
  [証拠全体を開く](../../cases/ja/05-t3-connect-zero-e2e-plaintext-relay.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [GitHubセキュリティアドバイザリは0件、高深刻度修正は無言のまま、`SECURITY.md` は急ごしらえ](../../cases/ja/13-zero-security-advisories-and-silent-patches.md)** — `🔴 未修正`
  Xで中国語圏のソースコード監査者たちを一蹴する傍ら、T3 Codeは高深刻度の脆弱性修正——シークレットストアのパストラバーサル、クロスドメインのトークン漏洩、信頼できないリポジトリからのコマンド実行——を静かにマージし続け、公開済みのGitHubセキュリティアドバイザリは0件のまま据え置いていた。
  [証拠全体を開く](../../cases/ja/13-zero-security-advisories-and-silent-patches.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` 認証・リポジトリ実行 重大監査：30日間の平文LANシェル、失効不能トークン、`SSH_AUTH_SOCK` 露出](../../cases/ja/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 未修正`
  最新の `main` HEAD（`ca81b7b9`、11月25日 14:49 CST）を一行ずつ検証した結果、現役のセキュリティおよび信頼性の欠陥が5件確認された。30日間有効な平文 `--lan` シェルクッキーと `Origin` 欠落時のバイパス、失効不能な30日間有効の Bearer トークン、再生可能な `?wsTicket=` URL、`::1` トンネルを破壊する `isIPv4`、そして信頼できないリポジトリが `SSH_AUTH_SOCK` と `GITHUB_TOKEN` を継承したままフックやサブモジュールを実行する問題である。
  [証拠全体を開く](../../cases/ja/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125494234614788390)

### 第4部 · 商業的操作とコミュニティへの威圧

*日次80万ドル超／31.7兆トークンの計算資源レーダー、エンジェル投資家との利益相反（Vibe Kanban、Daytona）、スポンサー構成の重複、30秒間アイドル状態になるとホスト認証情報を使ってスターを付ける挙動が77kスターを押し上げたこと、@botによるフォークのスクレイピング、.github/VOUCHED.td による追放。*

- **#06 · [エンジェル投資家の利益相反：Vibe Kanban終了の嘲笑とDaytonaとの重なり](../../cases/ja/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 公開記録`
  コードの欠陥にとどまらず、@theoのX上の公開投稿は、競合する開発者向けスタートアップへのエンジェル投資家としての立場と、T3 Codeの運営との間の鋭い利益相反を記録している。
  [証拠全体を開く](../../cases/ja/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [80万ドル超のビジネス台帳と1日31.7兆トークンの計算資源レーダー](../../cases/ja/08-800k-spend-and-31t-token-radar.md)** — `📌 公開記録`
  デフォルト有効のテレメトリはエンジニアリング上の見落としではなかった。それは、無料の OpenAI アーリーアクセストークン30万ドル超と投資家への働きかけと引き換えに運用されていた、1日31.7兆トークン（1日あたり1,019万ドル相当の API 支出）のリアルタイム情報レーダーを支えていた。
  [証拠全体を開く](../../cases/ja/08-800k-spend-and-31t-token-radar.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [内部の `yolo merges` と、外部コミュニティへの敵意、そして `.github/VOUCHED.td` による追放](../../cases/ja/09-yolo-merges-vs-community-hostility.md)** — `📌 公開記録`
  内部では、T3 Code が自動エージェントループによって1日500コミットを出荷し、"yolo merges breaking shit" と自ら認めていた。その一方で外部には、コントリビューターに「here's my advice: Don't」と告げ、`.github/VOUCHED.td` でユーザーを告発し、Issue の報告者を侮辱していた。
  [証拠全体を開く](../../cases/ja/09-yolo-merges-vs-community-hostility.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [公開 `@bot` によるフォークの無断取得、競合への嘲笑、批評家の抑圧](../../cases/ja/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 公開記録`
  競合他社がUIパターンを模倣していると嘲笑する一方で、`@theo` は開発者のフォークに公開返信で「Okay I'm stealing this」と述べ、30秒後に `@bot` を送り込んで彼女のコードを無断取得した。さらに自動ブロッカーを導入し、フォロワーに批評家の収益化を停止させるよう促していた。
  [証拠全体を開く](../../cases/ja/10-fork-scraping-bot-and-critics-suppression.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [スポンサー企業のスタックへの依存、Codex 0%枠の悪用、そして10アカウント`CLIProxyAPI`の偽善](../../cases/ja/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 公開記録`
  コンプライアンスを唱え、BANリスクを理由に組み込みのアカウント切り替えを拒みながら、T3 Codeは@theoのYouTubeスポンサー（ClerkとAxiom）をクラウドスタックに組み込んでいる。一方で@theoはCodexの0%枠バグを悪用したと自慢し、T3のFAQから直接リンクされた10アカウントの`CLIProxyAPI`プーリングGistを公開していた。
  [証拠全体を開く](../../cases/ja/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [7万7,000スターの漏斗：30秒アイドル時にホスト認証情報でスターを付けさせる仕組みと、放置された任意リポジトリ・バグ](../../cases/ja/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 未修正`
  GitHubのスターを「to trick VCs into investing」の手段だと断じたあの投稿から6か月。@theo は、ホストのGitHub認証情報を使って `PUT user/starred/...` を発火させる、アプリ内の30秒アイドル・トーストを自らマージした。これでリポジトリは3万から7万7,000スターへと跳ね上がった（ウォッチャーは約129人）。一方、任意のリポジトリにスターを付けてしまうバグは未修正のまま残された。
  [証拠全体を開く](../../cases/ja/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [インタラクティブカード](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=ja) · [Xの元投稿](https://x.com/realchendahuang/status/2125416210120765799)

---

## 主要な視覚証拠

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## 2分でできる強化とクリーンアップの手引き

T3 Code がすでに自分のマシンにインストールされている場合、環境変数だけに頼ってはならない。AnalyticsService.ts:156 はオプトアウトを確認する前にローカルIDを書き込み、DesktopShellEnvironment.ts は OTEL_SDK_DISABLED を省略している。環境フラグ、OSのhostsによるブロック、オフラインでのSQLiteコンパクション、トークン失効を組み合わせること。

- [ ] export DO_NOT_TRACK=1 と旧来のテレメトリー停止スイッチを設定し、さらに /etc/hosts で ingest.t3.codes をシンクホールする。
- [ ] T3 Code を終了し、statev2.sqlite を確認してオフラインで VACUUM; を実行するか、~/.t3 を完全に削除する。
- [ ] T3管理下のディレクトリ経由で個人のGoogle AI / Antigravityアカウントを実行するのをやめ、一度きりの異議申立ての機会を守る。
- [ ] Publish agent activity を無効化し、T3 Connect のマシン連携を解除し、Clerkとリレーに削除を申請し、T3 Code のGitHub OAuthアプリを取り消す。
- [ ] TLSなしで平文の t3 up --lan を公開しない。CIでは30日間有効な非DPoPのBearerトークンを避ける。信頼できないリポジトリを開く前に SSH_AUTH_SOCK / GITHUB_TOKEN を除去する。

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**コミュニティ推奨の代替手段:** 開発者らは Mirasim (@Mirasim_ADE)、Paseo (@paseo_sh)、Paradev (@ParadevAI)、Cloudroom、Conductor、Emdash、Orca を挙げた。どのクライアントを採用する前にも、テレメトリーが初期設定で無効であること、真のローカル削除、ヘッダー詐称のない公式CLI委譲、クライアント側のE2E暗号化を確認すること。

---

## コミュニティ報告と独立論評

番号付きの20件の証拠（#00–#19）には、公開的に検証可能なコード、プルリクエスト、公式提出書類、アーカイブされた公開投稿のみを収録している。コミュニティからの投稿や私的メッセージでの主張は、証拠関係の明確さを保つため、ここで分けて扱う。

- **Issue #1 · 「Theoへの告発」 (@opserx)** — 2026年11月25日にこのリポジトリへ提出されたコミュニティ論評の逐語アーカイブ。PR #42450 と PR #41237 に関する一次資料の精査メモを併記。 ([アーカイブされたIssue #1を読む](../community/issue-1-the-case-against-theo.md))
- **私的メッセージでの不満と継続投稿** — 複数の開発者が、@theo と T3 Code に関する経験を私的に寄せている。厳格な検証基準を維持するため、私的な報告は、公開された成果物によって独立に裏付けられない限り、一次証拠記録 #00–#19 から分離したままとする。検証可能な発見や上流での修正確認は、プルリクエストまたはGitHub Issueで提出してほしい。 ([投稿と検証の方針](../../CONTRIBUTING.md))

---

## 詳細な技術ドシエとマスター索引

ソースコードの行単位の差分、原文のままのSQL、完全な相互参照カタログについては、保存済みの参照アーカイブを参照してほしい：

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [視覚証拠109点 (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [一次資料327件 (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### 継続的な追跡と投稿

このリポジトリは現在も活発に維持されている。事実に基づく訂正、コミット／PRの証拠を伴う新たにマージされた上流の修正、新たな一次証拠を、プルリクエストまたはGitHub Issueで歓迎する。CONTRIBUTING.md を参照。
