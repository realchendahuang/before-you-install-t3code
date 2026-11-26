# #01 · "Telemetri Yok" Ana Sayfa Vaadinin Arkasındaki Varsayılan Telemetri

> Ana sayfası "No telemetry. Unless you opt in. Full stop." vaadinde bulunurken T3 Code, varsayılan PostHog izlemeyi etkinleştirdi, ham kopyaları kapalı kaynak `ingest.t3.codes` üzerinden yönlendirdi, harici `~/.codex` ve `~/.claude.json` kimlik bilgilerini hash'ledi ve topluluktan gelen dört devre dışı bırakma PR'ını reddetti.

<!-- section:claim -->
## Ne İddia Edildi

- T3 Code ana sayfası göze çarpacak biçimde şunu vaat ediyordu: *"No telemetry / Unless you opt in. Full stop."*
- Kamuoyuna gizlilik öncelikli, açık kaynaklı yerel bir yapay zekâ kodlama istemcisi olarak sunuldu.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **"Telemetri yok" taahhüdü altında varsayılan olarak gönderilen izleme (`PR #174` → `3bdaa6e1`):** 6 Mart 2026'da [`PR #174`](https://github.com/pingdotgg/t3code/pull/174), onay iletişim kutusu, ayarlar arayüzünde anahtar ve telemetri belgesi olmaksızın varsayılan açık PostHog analitiğini etkinleştirdi. Üç aydan fazla bir süre sonra, 18 Haziran'da [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3), bir yeniden tasarım sırasında *"No telemetry"* ana sayfa vaadini kullanıcıya hiçbir bildirimde bulunmadan sessizce sildi.
- **Kapalı kaynak birinci taraf saklama (`PR #15028`):** Ekim 2026'da telemetri partileri (`FLUSH_INTERVAL_MS = 10_000`) T3'ün kapalı kaynak uç noktası [`https://ingest.t3.codes/`](https://ingest.t3.codes/) üzerinden yönlendirildi. `AnalyticsService.ts` dosyasının 1. satırı, sunucunun her olayın ham bir kopyasını PostHog'a iletmeden önce sakladığını doğruluyor.
- **Araçlar arası kimlik bilgisi okuma ve tuzsuz SHA-256 (`PR #21506`):** Temel sürüm `9d3195b4`'teki `Identify.ts`, T3 Connect kullanıcı kimliklerinin yanı sıra `~/.codex/auth.json` (OpenAI'nin `user_id` JWT claim'i çözülerek) ve `~/.claude.json` (`oauthAccount.accountUuid`) dosyalarını okudu; ayrı makineleri tek bir kişiye bağlamak için tuzsuz SHA-256 özetleri hesapladı (`telemetryId.ts`). T3 düz metin Clerk kimliklerini tuttuğu için tuzsuz özetler deterministik olarak geri çevrilebiliyor.
- **Ayrıntılı kullanım kaydı:** `ProviderUsageAnalytics.ts` ve `FeatureUsage.ts`; sağlayıcıları, özel modelleri, akıl yürütme eforunu, izin modunu, token sayılarını, proje/thread sayılarını, işletim sistemi/WSL üst verilerini ve **35 farklı arayüz/komut eylemini** raporladı.
- **Topluluktan gelen dört devre dışı bırakma PR'ı reddedildi:** 23 Haziran'da bakımcı Julius, [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) kaydını (`not planned`) kapattı: *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) sessizce kapatıldı ve topluluktan gelen dört devre dışı bırakma PR'ı (`#13458`, `#16763`, `#21248`, `#27077` — 147 geçen test, bot onayı) `unwanted` olarak reddedildi.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Üst Akış Durumu (`ca81b7b9`)

- **Kısmen yamalandı:** Kamuoyuna çıkmasının ardından (2,26M+ görüntüleme), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) `~/.codex/auth.json` ve `~/.claude.json` okumalarını kaldırdı; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) katalog dışı modelleri `custom:<driver>` olarak maskeledi; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) ve [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) CI ve `DO_NOT_TRACK` devre dışı bırakma seçeneklerini ekledi.
- **Hâlâ açık:** `AnalyticsService.ts:156` devre dışı bırakma ayarlarını kontrol etmeden önce hâlâ diske yerel bir kurulum kimliği yazıyor; `DesktopShellEnvironment.ts` hâlâ `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED` aktarımını atlıyor; `ingest.t3.codes` kapalı kaynak olmayı sürdürüyor; Ayarlar arayüzünde hiçbir anahtar bulunmuyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![Commit 3bdaa6e1'in "No telemetry / Unless you opt in. Full stop." ana sayfa vaadini sessizce silmesi](../../evidence/02-no-telemetry-removed.png)

![Identify.ts'in tuzsuz SHA-256 ile cihazlar arası atıf için ~/.codex/auth.json ve ~/.claude.json dosyalarını okuması](../../evidence/03-identify-codex-claude.png)

![Issue #1397'nin not planned olarak kapatılması: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077'nin 147 geçen teste rağmen unwanted olarak reddedilmesi](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 1 · 2,26M+ görüntüleme)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [Denetim sonrası PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Derin Teknik Dosya 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
