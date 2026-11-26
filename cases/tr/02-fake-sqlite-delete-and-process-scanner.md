# #02 · Sahte SQLite Konu Silme (41,6 GB Şişme) ve 5 Saniyede Bir Tüm İşletim Sistemi Süreç Taraması

> "Kalıcı olarak sil" seçeneğine tıklamak, konuşma geçmişinin tamamını `statev2.sqlite` içinde olduğu gibi bırakıyor (yerel diskleri 41,6 GB'a kadar şişiriyor); bu sırada arka planda çalışan bir Rust izleyici, hiçbir devre dışı bırakma seçeneği olmadan her 5 saniyede bir tüm işletim sistemi süreçlerini ve tam komut satırlarını tarıyordu.

<!-- section:claim -->
## Ne İddia Edildi

- Kenar çubuğundaki silme onay penceresi (`useThreadActionMenu.ts`) kullanıcılara açıkça şunu söylüyordu: *"This permanently clears conversation history for this thread."*
- T3 Code, temiz ve hızlı bir yerel kodlama çalışma alanı olarak pazarlanıyordu.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **Sahte kalıcı silme (`Issue #17845`, `#28903`):** `9d3195b4` başlangıç sürümünde bir konuyu silmek, `statev2.sqlite` dosyasına yalnızca bir `"thread.deleted"` olayı ekliyor; önceki mesajları, araç çıktılarını ve akıl yürütme izlerini diskte olduğu gibi bırakıyordu. Kullanıcılar `statev2.sqlite` dosyasının 3 haftada **25,9 GB**'a (konuların %90'ı "silinmiş"), 6 haftada **41,6 GB**'a ve 7 haftada **33 GB**'a şiştiğini belgeledi.
- **Tüm makinede süreç ve komut satırı taraması (`Issue #11222`, `PR #41889`):** Arka plan yardımcı programı `t3-resource-monitor` (`native/resource-monitor/src/main.rs`), tanılama kapalıyken bile her 5 saniyede bir `ProcessesToUpdate::All` ile `with_cmd(UpdateKind::Always)` çalıştırıyor ve Windows'ta 440'tan fazla ilgisiz uygulama/oyun üzerinde 280–300 kalıcı tanıtıcı tutuyordu. 24 Kasım'da [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889), tanılamanın **tam süreç komut satırlarını** (çoğu zaman düz metin API anahtarları, veritabanı parolaları ve token'lar taşıyan) anlık görüntülere ve telemetriye aktardığını doğruladı.
- **Kurumsal makine adı sızıntıları ve zorunlu başlangıç isteği:** Ön yüzün favicon istekleri, dahili makine adlarını (örneğin `devbox.localdomain`) Google'ın favicon servisine sızdırıyordu (`PR #16950`, `PR #32657`); sunucu başlangıcı ise hiçbir devre dışı bırakma seçeneği olmadan `raw.githubusercontent.com` üzerinden uyumluluk manifestlerini koşulsuz çekiyordu (`Issue #36479`).
- **Ciddi kota tüketimi ve güç hataları:** Claude'u Agent SDK üzerinden çalıştırmak, 5 saatlik kotaları normal hızın **1,7 katı** tüketiyordu (`Issue #7338`, `Issue #24649`, 81 yorum); GPU regresyonları ise karşılaştırılabilir bir Electron uygulamasının **136 katına** kadar güç çekiyor, bir MacBook GPU'sunu **60W**'ta (78 dakikalık pil tüketimi) ve web sekmesi kapatıldıktan sonra **18W**'ta sabitliyordu (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Üst Kaynaktaki Durum (`ca81b7b9`)

- **Kısmen yamalandı:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) eşzamansız `thread-content.purge` ekledi (`#17845` kapatıldı) ve [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) Windows süreç izleyicisindeki okumaları daralttı.
- **Hâlâ açık:** Silinen kaynak konular, canlı çatallar, bekleyen `merge_back` veya canlı alt ajanlar tarafından referans verildiği sürece geçmişi tutmaya devam ediyor; mezar taşı satırları SQLite içinde kalıyor ve disk alanını geri kazanmak hâlâ çevrimdışı `VACUUM` gerektiriyor; Linux ve macOS `ProcessesToUpdate::All` keşfini sürdürüyor ve `PR #41889` açık durumda.

<!-- section:visuals -->
## Görsel Kanıtlar

![Issue #17845, kalıcı olarak silinen konuların statev2.sqlite dosyasını onlarca gigabayta şişirdiğini belgeliyor](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222, t3-resource-monitor'un her 5 saniyede bir tüm işletim sistemi süreçlerini taradığını belgeliyor](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Derin Teknik Dosya 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
