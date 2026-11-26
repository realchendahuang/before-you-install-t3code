# #07 · Managed Policy Çelişkisi: Dört Belgelenmiş Telemetri Kör Noktası

> @theo, T3 Code'un "best corporate managed policy system"e sahip olduğunu söyleyerek "trivial to turn off all telemetry" iddiasında bulundu — T3 Code'un kendi `docs/user/telemetry.md` ve `docs/user/managed-policy.md` belgeleri bunu doğrudan çürütüyor.

<!-- section:claim -->
## Ne İddia Edildi

- 24 Kasım saat 19:13 CST'te `@theo`, eksik kullanıcı opt-out anahtarlarını geçiştirdi: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Yarım saat sonra, konuşma verilerinin *"never touches any of our servers"* olduğunu sözlerine ekledi ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Kanıtların Gösterdikleri

T3 Code'un kendi resmî belgeleri ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) ve [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) dört somut kör noktayı belgeliyor:

- **Yalnızca yönetici dağıtımı (kişisel arayüzde sıfır anahtar):** Masaüstü kullanıcılarının Ayarlar'da hiçbir anahtarı yok. Managed Policy, MDM/GPO veya yönetici korumalı işletim sistemi yolları gerektiriyor (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code` veya `/etc/t3code/policy.json`); bu yollar yönetici olmayan masaüstü kullanıcıları için tamamen erişilemez durumda.
- **Barındırılan Web Uygulaması (`app.t3.codes`) politikayı yok sayıyor:** Tarayıcı uygulaması sunucu ortam değişkenlerini ve Managed Policy'yi yok sayıyor, izleme (tracing) ile derlendiğinde bağlantı izleri yayıyor ve *"has no relay tracing toggle."*
- **Mobil uygulamalar sunucu politikasının dışında kalıyor:** Resmî belgeler şunu doğruluyor: sunucu ortam değişkenleri ve Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` opt-out'ları yok sayıyor:** Proje başlıklarını, thread başlıklarını, model adlarını ve canlı durumu T3 Connect'e yüklüyor — ve belgeler açıkça şöyle diyor: *"The telemetry opt-out does not disable it."* Ayrıca, başarısız Axiom span'ları/çökme günlükleri *"can quote a value the app was handling"* ve `Agent feedback` 16 KB'a kadar konuşma mesajı ekleyebiliyor.

<!-- section:status -->
## Upstream Durumu (`ca81b7b9`)

- **Hâlâ açık:** Gece boyunca eklenen [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) uygulama içi bir mobil izleme anahtarı getirdi, ancak Managed Policy hâlâ mobil izlemeyi devre dışı bırakamıyor, barındırılan `app.t3.codes` hâlâ sıfır opt-out anahtarına sahip, `Publish agent activity` hâlâ telemetri opt-out'larını yok sayıyor ve masaüstü Ayarlar arayüzünde hiçbir anahtar bulunmuyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![Resmî docs/user/telemetry.md belgesi: app.t3.codes'ta anahtar yok, mobil Managed Policy'yi yok sayıyor ve agent activity opt-out'ları yok sayıyor](../../evidence/05-telemetry-cant-disable.png)

![Resmî docs/user/managed-policy.md belgesi: macOS, Windows ve Linux genelinde yönetici korumalı sistem yollarını listeliyor](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo'nun 24 Kasım gönderisi: Managed Policy'nin tüm telemetriyi kapatmayı kolaylaştırdığı iddiası](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` Managed Policy iddiası (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Derin Teknik Dosya 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
