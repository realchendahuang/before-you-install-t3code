# #03 · 52 Gün Süren Sessiz `git push --force` ile Model Gizlilik Filtresinin 21 Saatte Kaldırılması

> T3 Code, Claude Auto modunun `git push --force origin main` komutunu hiçbir uyarı göstermeden sessizce onayladığı hatayı 52 günden fazla açık tuttu — oysa özel modellerin @theo'nun herkese açık liderlik tablosunda görünmesini sağlayan gizlilik beyaz listesini kaldırmak yalnızca 21 saatini aldı.

<!-- section:claim -->
## Ne İddia Edildi

- Claude Auto modunun, yüksek riskli yıkıcı eylemleri (örneğin `main` üzerine force-push) açık insan onayına sunmak üzere tasarlandığı belirtiliyordu.
- Telemetri, gizlilik açısından güvenli toplu metrikler olarak sunuldu.

<!-- section:evidence -->
## Kanıtların Gösterdikleri

- **52+ gün düzeltilmedi — sessiz `git push --force` (`Issue #15353`):** `ClaudeAdapterV2.ts` dosyasında Auto modu, `!requiresClaudeApproval(context)` kontrolünü kısa devre yaparak doğrudan `"allow"` değerine geçti. Claude'un kendi güvenlik sınıflandırıcısı `git push --force origin main` komutunu iki kez engelleyip üçüncü denemeyi insan onayına yükselttiğinde, T3 Code bunu hiçbir arayüz uyarısı göstermeden sessizce onayladı ve `"source": "user_temporary"` olarak kaydetti. Topluluk tarafından hazırlanan iki düzeltme PR'ı (`#15360`, `#35207`) bot tarafından otomatik kapatılana kadar incelenmeden bekledi; `#40692` ise birleştirilmedi.
- **Gizlilik beyaz listesini kaldırmak için 21 saat (`Issue #40948` → `PR #41237`):** 22 Kasım'da [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948), `PR #29001` bir model beyaz listesi uyguladığı için yeni modellerin `@theo`'nun herkese açık liderlik tablosunda [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) görünmediğini kaydetti. **21 saat içinde** [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) `@theo`'nun hesabı altında birleştirildi; PR notunda Theo'nun filtreyi kaldırılmasını açıkça talep ettiği belirtiliyordu — bu da `ollama/acme-internal` ve `acme-azure-deployment` gibi özel yerel/kurumsal adların analitiğe olduğu gibi iletilmesine yol açtı.

<!-- section:status -->
## Üst Kaynaktaki Durum (`ca81b7b9`)

- **Kısmen değişti / temel güvenlik hatası hâlâ açık:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) daha sonra katalogda yer almayan modelleri `custom:<driver>` olarak maskeledi (katalog/satıcı slug'ları hâlâ özel uç noktaların arkasından raporlanıyor). **Issue #15353 (Auto modunda sessiz `git push --force`) `ca81b7b9` sürümünde hâlâ açık ve düzeltilmemiş durumda.**

<!-- section:visuals -->
## Görsel Kanıtlar

![Issue #15353'ün 52+ gündür açık olduğunu ve Claude Auto modunun git push --force komutunu sessizce onayladığını gösteren görsel](../../evidence/11-issue15353-auto-force-push.png)

![Issue #40948'in ardından 21 saat içinde birleştirilen ve slopalytics.com için model gizlilik filtresini kaldıran PR #41237](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Yeniden üretim yorumu `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Birleştirilmemiş topluluk düzeltmeleri: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Derin Teknik Dosya 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
