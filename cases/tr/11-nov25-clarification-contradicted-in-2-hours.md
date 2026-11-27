# #11 · 25 Kasım Açıklaması, Gece Yarısı PR'ları ve 100 MB'lık Döküm Tarafından 2 Saat İçinde Çürütüldü

> 25 Kasım sabahı @theo üç kapsamlı gizlilik güvencesi verdi ve 100 MB'lık bir telemetri dökümü yayınladı — üç iddianın tamamı, kendi ekibinin PR'ları ve gzip'lenmiş dökümün kendisi tarafından iki saat içinde çürütüldü.

<!-- section:claim -->
## Ne İddia Edildi

25 Kasım sabahı yaptığı açıklamada ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) ve ardından gelen yanıtta ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` kullanıcılara şu güvenceleri verdi:
- T3 Code *"never collected file paths."* (dosya yollarını hiç toplamadı)
- Ortam değişkenleri *"always disabled telemetry cleanly."* (telemetriyi her zaman temiz biçimde devre dışı bırakıyordu)
- Opt-out yapan kurulumlar yerel olarak sıfır izleme dosyası yazıyordu ve Claude sahip hash'leri *"broken."* (bozuk) durumdaydı.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **Çelişki 1 — `git.cwd` mutlak çalışma alanı yolu sızıntısı (`PR #42450`):** Gönderiden yaklaşık 90 dakika sonra çekirdek geliştirici Julius, [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450) numaralı değişikliği birleştirerek relay üzerinden iletilen webhook çalıştırmalarının tüm yürütme span'lerini Axiom'a aktardığını kabul etti — buna `git.cwd` içeren Git span'leri de dahildi (**tam mutlak çalışma alanı yolu, işletim sistemi kullanıcı adı ve depo adı**).
- **Çelişki 2 — Bozuk Windows ve macOS opt-out'ları (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376), Windows masaüstü uygulamasının önceden var olan süreçlerden başlatıldığında kayıtlı `T3CODE_TELEMETRY_ENABLED=false` kullanıcı ortam değişkenlerini yok saydığını kabul etti. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) ise macOS/Linux'ta ilk başlatmada relay izlemesinin, kabuk keşfinden önce başlatıldığını ve oturumun tamamı boyunca `~/.zshrc` opt-out'larını yok saydığını kabul etti.
- **Çelişki 3 — Koşulsuz disk yazmaları ve `events.clean.jsonl` içinde 264 canlı Claude kaydı:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`ca81b7b9` sürümünde `line 156`) hâlâ başlangıçta `getTelemetryIdentity` fonksiyonunu koşulsuz çağırıyor ve `telemetryEnabled` kontrolünden önce yerel kurulum UUID'sini (`upsertAnonymousId`) yazıyor. Bu arada, `@theo`'nun herkese açık dışa aktarımının gzip başlığı (`6,056,594` bayt sıkıştırılmış, `95,789` olay), paylaşımdan 20 dakika önce üretilmiş `events.clean.jsonl` adlı özgün bir dosya adı gösteriyordu — ancak dosya hâlâ **264 canlı Claude sahip kaydı** içeriyor, **4 ayrı makineyi** (`installId`) tek bir SHA-256 hash'ine bağlıyor ve yanında birebir özel proxy modellerini (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`) barındırıyordu.

<!-- section:status -->
## Upstream Durumu (`ca81b7b9`)

- **Kısmen yamalandı:** `PR #42450`, `PR #42376` ve `PR #42464` gece boyunca birleştirildi.
- **Hâlâ açık:** `AnalyticsService.ts:156` hâlâ opt-out'ları kontrol etmeden önce yerel anonim kimliği koşulsuz yazıyor ve `DesktopShellEnvironment.ts` hâlâ `T3CODE_OTEL_SDK_DISABLED` ile `OTEL_SDK_DISABLED` değişkenlerini iletmiyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![PR #42450'nin relay ile tetiklenen çalıştırmaların git.cwd mutlak çalışma alanı yollarını Axiom'a aktardığını kabul etmesi](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376'nın Windows masaüstünün kayıtlı T3CODE_TELEMETRY_ENABLED=false ortam değişkenlerini yok saydığını kabul etmesi](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464'ün macOS'ta ilk başlatmadaki relay izlemesinin ~/.zshrc opt-out'larını yok saydığını kabul etmesi](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![events.clean.jsonl üzerinde 264 Claude kaydının 4 makineyi ve özel proxy model kimliklerini birbirine bağladığını ortaya koyan adli inceleme](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` 25 Kasım açıklaması (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Takip yanıtı (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Herkese açık gzip'li döküm](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Derin Teknik Dosya 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
