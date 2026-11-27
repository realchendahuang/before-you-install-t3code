# #12 · GDPR Sonrası Altı Saatlik Gece Operasyonu: Saatte 2,2 Milyon IP Kaydı ve Bozuk Hesap Silme

> 24 Kasım'da resmî bir AB GDPR şikâyeti yapıldıktan sonra, altı saat süren acil gece yamaları dört daha derin gizlilik ihlalini istemeden ortaya çıkardı — bunların başında 30 gün boyunca saklanan, saatte 2,2 milyon IP etiketli Axiom span'ı geliyordu.

<!-- section:claim -->
## Ne İddia Edildi

- `PR #42380` birleştirildikten 3,5 saat sonra bile `@theo`, arayan tarafların IP'lerinin çoktan kaldırıldığını alenen yanıtladı.
- Resmî belgeler (`docs/user/telemetry.md`), `agent.feedback` raporlarının anonim olduğunu ve hesap silmenin kullanıcı verilerini temiz bir şekilde kaldırdığını vaat ediyordu.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **Saatte 2,2 milyon IP + User-Agent relay span'ı (`PR #42380`):** Axiom'a aktarılan her relay istek span'ı — yaklaşık **saatte 2,2 milyon span, 30 gün saklanıyor** — `client.address` (`cf-connecting-ip`'den gelen gerçek arayan IP'si) ve `user_agent.original` değerlerini doğrudan `user.id` ile birlikte kaydediyordu (Cloudflare'in %1'lik Workers logları ayrı kalmak kaydıyla).
- **Bozuk Clerk hesap silme (`PR #42285` ve `PR #42430`):** Clerk'te bir kullanıcı hesabını silmek daha önce PlanetScale relay satırlarını ve etkin Cloudflare tünellerini arka planda çalışır hâlde bırakıyordu — ta ki gerçek bir kullanıcı gizlilik silme talebi mühendisleri **elle yazılmış SQL ve manuel tünel sökümü** çalıştırmaya zorlayana kadar.
- **Mobil push token'ı ve kullanıcı-ID sızıntıları (`PR #42459` ve `PR #41859`):** Android FCM push yükleri her bildirimde Google'a düz metin Clerk `user_id` değerleri gönderiyordu; iOS APNs span'ları ve hata logları, push token'ları taşıyan tam cihaz push URL'lerini yakalıyordu.
- **Karışık "anonymous" geri bildirim partileri (`PR #42466`):** Sözde anonim `agent.feedback` olayları, kimliği belirli `installId` olayları ve tam ana makine parmak izleri (işletim sistemi, mimari, ham WSL dağıtımı) ile tam olarak aynı HTTP POST içinde partileniyordu; bu da `docs/user/telemetry.md` ile doğrudan çelişiyordu.

<!-- section:status -->
## Üst Kaynak Durumu (`ca81b7b9`)

- **Kısmen yamalandı:** Acil PR'lar `#42380`, `#42285`, `#42430`, `#42459`, `#41859` ve `#42466` gece süren GDPR sprint'i sırasında birleştirildi.
- **Hâlâ açık:** `privacy-policy.astro` `2026-10-06` tarihinden bu yana değişmedi, kapalı kaynak `ingest.t3.codes` ham olay kopyalarını bağımsız denetlenebilirlik olmaksızın tutuyor ve önceki 30 günlük Axiom saklama pencereleri etkilenen kullanıcılara hiçbir zaman resmen açıklanmadı.

<!-- section:visuals -->
## Görsel Kanıtlar

![PR #42380'in saatte ~2,2 milyon relay span'ının gerçek arayan IP'sini ve User-Agent'ı Axiom'da 30 gün boyunca user.id yanında kaydettiğini ortaya koyması](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285'in hesap silmenin daha önce PlanetScale satırlarını ve etkin Cloudflare tünellerini geride bıraktığını kabul etmesi](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459'un Android FCM push'larının Google'a ham Clerk user_id değerleri gönderdiğini kabul etmesi](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466'nın anonim geri bildirimin installId ve ana makine parmak izleriyle birlikte partilendiğini kabul etmesi](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Derin Teknik Dosya 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
