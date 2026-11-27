# #13 · GitHub'da Sıfır Güvenlik Danışması, Sessizce Yapılan Yüksek Önem Dereceli Yamalar ve Aceleyle Hazırlanmış `SECURITY.md`

> T3 Code, X'te Çinli kaynak kodu denetçilerini küçümserken — gizli anahtar deposunda yol aşımı, alanlar arası token sızıntıları ve güvenilmeyen depolardan komut çalıştırma dahil — yüksek önem dereceli güvenlik açığı düzeltmelerini sessizce birleştirdi; yayımlanmış GitHub Güvenlik Danışmalarını ise 0'da tuttu.

<!-- section:claim -->
## Ne İddia Edildi

- 24 Kasım'da `@theo`, X'teki Çince teknik denetimlerin kaynağını *"the biggest fucking cesspit"* olarak göstererek bunları küçümsedi ve bu denetimleri okuyan geliştiricilere hakaret etti ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Aceleyle hazırlanmış `SECURITY.md` revizyonları (`PR #38812`, `PR #41942`), geniş ana makine erişimini ve şifrelenmemiş aktarımı kabul edilebilir, amaçlanan sınırlar olarak sundu.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **Yayımlanmış Güvenlik Danışması sayısı sıfır (`0`):** `ca81b7b9` itibarıyla `pingdotgg/t3code` deposunun [GitHub Güvenlik Danışmaları](https://github.com/pingdotgg/t3code/security/advisories) sayfası **sıfır** yayımlanmış danışma listeliyor; bu da mevcut masaüstü/sunucu kullanıcılarına hiçbir resmî CVE uyarısı veya yükseltme uyarısı sunmuyor.
- **Yüksek önem dereceli güvenlik açıkları sessizce düzeltildi:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): Cihaz onayından önce relay `jti`/`nonce` aracılığıyla `ServerSecretStore` yol aşımı.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): Kurumsal GitHub/GitLab tokenlarının alanlar arası sızıntısı.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) ve [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): Sandbox'sız masaüstü tarayıcı önizlemesinin izolasyonu ve worktree düzeni için komut onayı.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): Masaüstü Clerk token dosyasında yalnızca sahibe özel izinler.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): Nihayet güvenilmeyen depo yapılandırmalarından komut çalıştırmadan önce onay istemleri ekleyen yaklaşık 3.000 satırlık yama (daha önceki sessiz düzeltmeler `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886` ile birlikte).
- **Açık yerel güvenlik kusurları:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (harici yol aşımı/sembolik bağlantılar) açık; [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (Windows'ta `externalLauncher.ts` dosyasının `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` çalıştırması ve AVG/Avast tarafından `IDP.HELU.PSE96` olarak işaretlenmesi) ise hâlâ birleştirilmedi.
- **`SECURITY.md` mimariyi sağlamlaştırmak yerine sorumluluğu daraltıyor:** Çalışma alanları dışında işletim sistemi genelinde `filesystem:read`, iOS/LAN üzerinde düz HTTP aktarımı ve ele geçirilmiş bir relay imzalama anahtarı üzerinden ana makinenin tamamen ele geçirilmesini açıkça *amaçlanan tasarım sınırları* olarak ilan ediyor.

<!-- section:status -->
## Üst Kaynak Durumu (`ca81b7b9`)

- **Hâlâ açık:** Yayımlanmış GitHub Güvenlik Danışmaları **0** olarak kalıyor; `Issue #26489` ve `PR #30997` düzeltilmedi; `SECURITY.md` işletim sistemi genelindeki okumaları ve düz HTTP'yi amaçlanan davranış olarak sınıflandırmaya devam ediyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![PR #39483'ün bir Güvenlik Danışması yayımlamadan ServerSecretStore yol aşımını sessizce düzeltmesi](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![Antivirüs tarafından işaretlenen Windows Base64 PowerShell başlatmaları için PR #30997'deki açık düzeltme](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md'nin işletim sistemi genelindeki okumaları, iOS'ta düz HTTP'yi ve relay anahtarı üzerinden makine ele geçirmeyi amaçlanan sınırlar olarak sınıflandırması](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Güvenlik Danışmaları (0 adet yayımlanmış)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Ayrıntılı Teknik Dosya 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
