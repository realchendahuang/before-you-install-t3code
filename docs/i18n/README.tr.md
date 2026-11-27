# Temu3 Code — T3 Code'u Yüklemeden Önce

<p align="center">
  <em>pingdotgg/t3code üzerine bağımsız, kanıt öncelikli bir kamu kaydı — ırksal çifte standartları, aldatıcı telemetriyi, kritik güvenlik açıklarını ve ticari manipülasyonu belgeliyor.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=tr"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=tr"><strong>✉ Tmail Gelen Kutusu</strong></a> ·
  <a href="https://temu3code.com/?lang=tr#x-receipts"><strong>📸 12 Orijinal X Görüntüsü</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=tr"><strong>🃏 61 Mem</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 Kanıt</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 Kaynak</strong></a>
</p>

<p align="center">
  <strong>Diller (18):</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md"><strong>Türkçe</strong></a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

> [!IMPORTANT]
> **Bağımsız Kamu Kaydı İncelemesi · 18 Dil**
>
> Telemetri yok. Irksal ayrımcılık yok. Aşağıdaki her iddia, birebir alıntılanan kamuya açık açıklamalara, depo commit'lerine, pull request'lere, USPTO başvurularına ve arşivlenmiş ekran görüntülerine dayandırılmıştır.
>
> - **Doğrulanmış sergiler:** 20 Sergi (#00–#19)
> - **Birincil kanıt:** 109 Görsel Kanıt · 327 Kanonik URL
> - **Upstream kontrolü:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Güvenlik bildirimleri:** Yayımlanmış 0 GitHub Güvenlik Bildirimi

<!-- origin-story:start -->
> [!TIP]
> **Neden "Temu3 Code"?**
>
> 23 Kasım 2026’da — bir Çinli geliştiricinin ücretsiz MIT çatalına "Chinese knockoff" dedikten tam 10 dakika sonra — @theo X’te marka adımızı cömertçe bağışladı: "Temu3 Code" (84 bin görüntülenme).
>
> USPTO’da markası olmayan bir kurucunun bedava isimlendirmesi değerini görmek için fazla iyi — bu yüzden temu3code.com’u kaydettik, kamu denetimini buraya taşıdık ve PostHog telemetrisini dışarıda bıraktık. Ücretsiz isimlendirme danışmanlığın için teşekkürler, Theo. (CC0 1.0 — istersen bizi geri çatallayın.) — [@theo’nun isimlendirme tweet’ini görüntüle ↗](https://x.com/theo/status/2124825920808829077)
<!-- origin-story:end -->
---

## 60 Saniyede Nasıl Oldu

Topluluğun MIT lisanslı bir fork'u üzerinden çıkan tek bir adlandırma tartışması; ırksal çifte standart, gizli telemetri, sessiz güvenlik yamaları ve giderilmemiş mimari risklerden oluşan bir örüntüyü ortaya çıkardı.

1. **Ayrımcı kıvılcım** *(23 Kasım 2026)* — Bir kullanıcının Çinli bir geliştiricinin ücretsiz MIT fork'unu resmî T3 Code sanmasının ardından @theo, projeyi "Chinese knockoff" ve "Temu3 Code" olarak niteledi ve GitHub hesabının kapatılmasıyla tehdit etti — oysa 0 USPTO tescilli markası vardı ve 11 saat sonra trilyon dolarlık ABD laboratuvarlarının MIT kodunu kopyalamasını alenen memnuniyetle karşıladı.
2. **Kaynak kodunun açılması** *(24 Kasım 2026)* — pingdotgg/t3code üzerinde satır satır yapılan inceleme; "No telemetry" vaadi verilen ana sayfanın arkasında varsayılan olarak açık gelen PostHog telemetrisini, ingest.t3.codes'ta kapalı kaynaklı etkinlik saklamayı, ~/.codex ve ~/.claude.json dosyalarının tuzsuz SHA-256 ile okunmasını, 41,6 GB'lık sahte SQLite silme işlemini, 52 gün boyunca sessiz kalan bir git push --force hatasını, Google Antigravity başlık taklidini ve uçtan uca şifrelemesiz düz metin T3 Connect'i ortaya koydu.
3. **2,26M+ görüntülenme, AB GDPR başvurusu ve 6 saatlik panik atağı** *(24–25 Kasım, gece boyunca)* — Birinci bölüm 2,26 milyon görüntülenmeyi aştı ve bir AB GDPR şikâyetini tetikledi. Gece boyunca acil açılan PR'ler, istemeden de olsa Axiom'da 30 gün saklanan saatte 2,2 milyon IP + User-Agent kaydını, mutlak git.cwd çalışma alanı yolu sızıntılarını, bozuk hesap silmeyi ve yok sayılan Windows/macOS devre dışı bırakma tercihlerini kabul etti.
4. **Bugün hâlâ açık olanlar** *(25 Kasım (`ca81b7b9`) ve sonrası)* — ca81b7b9'a kadar +259 commit'in izlenmesi kısmi telemetri yamalarını doğruladı — ancak giderilmemiş başlangıç ID yazımları, arayüzde hiçbir açma-kapama anahtarı olmaması, 0 GitHub Güvenlik Bildirimi, sabitlenmemiş rastgele depo yıldızlama, düz metin 30 günlük --lan shell çerezleri, iptal edilemeyen Bearer token'ları ve güvenilmeyen depolarda SSH_AUTH_SOCK açığa çıkması (#19) sürüyor.

---

## 20 Doğrulanmış Serginin Tamamı (#00–#19)

Aşağıdaki her sergi, bu depodaki kendine ait, tablo içermeyen yerelleştirilmiş sergi dosyasına ve web portalındaki paylaşılabilir görsel kartına bağlantı verir. Süregelen takip sırasıyla devam edecektir (#20, #21, ...).

### Bölüm I · Irksal Ayrımcılık, Çifte Standartlar ve Örüntü

*0 USPTO tescilli markasıyla "Chinese knockoff" ve "Temu3 Code" kaldırma tehditlerinden, 1.151 gönderilik nicel bir ayrıştırmaya (VIP'lerde %0,0 küfür, geliştiricilere %8,0 düşmanlık, kriz döneminde %14,4 Çin karşıtı artış) ve iki yıla yayılan tekrarlayan bir geçmişe.*

- **#00 · [Köken Tartışması: "Steal Our Code", Fork Adlandırma Tehditleri ve Irksal Çifte Standart](../../cases/tr/00-origin-fork-dispute-and-double-standard.md)** — `📌 Kamu Kaydı`
  11 dakika içinde @theo, Çinli bir geliştiricinin ücretsiz MIT fork'unu "Chinese knockoff" ve "Temu3 Code" olarak damgaladı ve bir GitHub hesabının kapatılmasıyla tehdit etti — ardından 11 saatten kısa bir süre sonra, trilyon dolarlık ABD şirketlerinin MIT kodunu kopyalamasını kamuoyu önünde memnuniyetle karşıladı.
  [Serginin tamamını aç](../../cases/tr/00-origin-fork-dispute-and-double-standard.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [1.151 Tweetlik Nicel Veri Seti: Seçici Kibarlık ve 4,0 Katlı Çin Karşıtı Kriz Dalgası](../../cases/tr/14-1151-tweet-quantitative-double-standard.md)** — `📌 Kamu Kaydı`
  1.151 ardışık `@theo` X gönderisinin (7–24 Kasım 2026) kapsamlı nicel analizi, çarpıcı bir güç asimetrisini kanıtlıyor: 20 büyük teknoloji yöneticisine ve laboratuvar çalışanına yönelik %0,0 küfür, sıradan geliştiricilere yönelik %8,0 düşmanlığa karşı; bu oran 25 saatlik Çin fork'u anlaşmazlığı sırasında 4,0 kat artarak %14,4'e fırladı.
  [Serginin tamamını aç](../../cases/tr/14-1151-tweet-quantitative-double-standard.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [GitHub Yasak Tehdidinin Ardında Sıfır USPTO Markası ve 17 Saat Sonra Geriye Dönük `TRADEMARK.md`](../../cases/tr/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Kamu Kaydı`
  @theo, bir Çinli geliştiricinin hesabını "marka ihlali" gerekçesiyle kapatması için GitHub'a başvurmakla tehdit ettiğinde, T3 Tools Inc.'in `T3 Code`, `T3 Tools` veya `T3 Connect` için USPTO nezdinde 0 tescili vardı — ve `TRADEMARK.md` dosyası 17 saat sonra geriye dönük olarak birleştirildi.
  [Serginin tamamını aç](../../cases/tr/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [İki Yıllık Tarihsel Örüntü: Milliyetçi Tepkiler, 20 Bin Dolarlık FFmpeg Ödülü ve Silinen Tehditler](../../cases/tr/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Kamu Kaydı`
  Kasım 2026'daki Çinli fork patlaması izole bir öfke nöbeti değildi — 2024'ten 2026'ya uzanan kamuya açık kayıtlar; milliyet hedefli taciz, açık kaynak zorbalığı, diğer geliştiricilerin arayüzleriyle dalga geçme ve tepkilerin ardından gelen silme işlemlerinden oluşan tekrarlayan bir döngüyü belgeliyor.
  [Serginin tamamını aç](../../cases/tr/16-two-year-pattern-of-bullying-and-deletions.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125408843152953693)

### Bölüm II · Aldatıcı Telemetri ve Gizlilik İhlalleri

*"No telemetry. Full stop." ifadesinin varsayılan PostHog yüklemelerini, kapalı kaynaklı ingest.t3.codes saklamasını, araçlar arası kimlik bilgisi hash'lemesini, Managed Policy kör noktalarını ve saatte 2,2 milyon IP etiketli Axiom kaydını nasıl gizlediği.*

- **#01 · ["Telemetri Yok" Ana Sayfa Vaadinin Arkasındaki Varsayılan Telemetri](../../cases/tr/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Kısmen Yamalanmış`
  Ana sayfası "No telemetry. Unless you opt in. Full stop." vaadinde bulunurken T3 Code, varsayılan PostHog izlemeyi etkinleştirdi, ham kopyaları kapalı kaynak `ingest.t3.codes` üzerinden yönlendirdi, harici `~/.codex` ve `~/.claude.json` kimlik bilgilerini hash'ledi ve topluluktan gelen dört devre dışı bırakma PR'ını reddetti.
  [Serginin tamamını aç](../../cases/tr/01-default-telemetry-and-cross-tool-tracking.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [Managed Policy Çelişkisi: Dört Belgelenmiş Telemetri Kör Noktası](../../cases/tr/07-managed-policy-blind-spots.md)** — `🔴 Giderilmemiş`
  @theo, T3 Code'un "best corporate managed policy system"e sahip olduğunu söyleyerek "trivial to turn off all telemetry" iddiasında bulundu — T3 Code'un kendi `docs/user/telemetry.md` ve `docs/user/managed-policy.md` belgeleri bunu doğrudan çürütüyor.
  [Serginin tamamını aç](../../cases/tr/07-managed-policy-blind-spots.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [25 Kasım Açıklaması, Gece Yarısı PR'ları ve 100 MB'lık Döküm Tarafından 2 Saat İçinde Çürütüldü](../../cases/tr/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Kısmen Yamalanmış`
  25 Kasım sabahı @theo üç kapsamlı gizlilik güvencesi verdi ve 100 MB'lık bir telemetri dökümü yayınladı — üç iddianın tamamı, kendi ekibinin PR'ları ve gzip'lenmiş dökümün kendisi tarafından iki saat içinde çürütüldü.
  [Serginin tamamını aç](../../cases/tr/11-nov25-clarification-contradicted-in-2-hours.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [GDPR Sonrası Altı Saatlik Gece Operasyonu: Saatte 2,2 Milyon IP Kaydı ve Bozuk Hesap Silme](../../cases/tr/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Kısmen Yamalanmış`
  24 Kasım'da resmî bir AB GDPR şikâyeti yapıldıktan sonra, altı saat süren acil gece yamaları dört daha derin gizlilik ihlalini istemeden ortaya çıkardı — bunların başında 30 gün boyunca saklanan, saatte 2,2 milyon IP etiketli Axiom span'ı geliyordu.
  [Serginin tamamını aç](../../cases/tr/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125395501663281198)

### Bölüm III · Ürün Kusurları ve Kritik Güvenlik Açıkları

*41,6 GB'lık sahte SQLite silme işlemi, 5 saniyelik işletim sistemi süreç taraması, 52 gün sessiz kalan git push --force, 3 dakikalık yasaklamalara yol açan Google Antigravity kullanım koşulu taklidi, uçtan uca şifrelemesiz düz metin T3 Connect, 0 Güvenlik Bildirimi ve ca81b7b9'daki LAN/Bearer/SSH_AUTH_SOCK açıkları.*

- **#02 · [Sahte SQLite Konu Silme (41,6 GB Şişme) ve 5 Saniyede Bir Tüm İşletim Sistemi Süreç Taraması](../../cases/tr/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Kısmen Yamalanmış`
  "Kalıcı olarak sil" seçeneğine tıklamak, konuşma geçmişinin tamamını `statev2.sqlite` içinde olduğu gibi bırakıyor (yerel diskleri 41,6 GB'a kadar şişiriyor); bu sırada arka planda çalışan bir Rust izleyici, hiçbir devre dışı bırakma seçeneği olmadan her 5 saniyede bir tüm işletim sistemi süreçlerini ve tam komut satırlarını tarıyordu.
  [Serginin tamamını aç](../../cases/tr/02-fake-sqlite-delete-and-process-scanner.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 Gün Süren Sessiz `git push --force` ile Model Gizlilik Filtresinin 21 Saatte Kaldırılması](../../cases/tr/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Giderilmemiş`
  T3 Code, Claude Auto modunun `git push --force origin main` komutunu hiçbir uyarı göstermeden sessizce onayladığı hatayı 52 günden fazla açık tuttu — oysa özel modellerin @theo'nun herkese açık liderlik tablosunda görünmesini sağlayan gizlilik beyaz listesini kaldırmak yalnızca 21 saatini aldı.
  [Serginin tamamını aç](../../cases/tr/03-silent-force-push-vs-21h-filter-removal.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity Başlık Sahtekârlığı, Sahte `SSH_CONNECTION` ve 3 Dakikada Hesap Banları](../../cases/tr/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Giderilmemiş`
  T3 Code, SSS'inde kullanım koşullarına uyduğunu garanti etmesine rağmen işletim sistemi anahtarlığındaki (keyring) kimlik bilgilerini çıkarıyor, `v1internal` karşısında Google'ın dahili başlıklarını (`antigravity/hub/2.24.0`) taklit ediyor ve sahte `SSH_CONNECTION` değerleri enjekte ediyor — kişisel Google aboneliklerini hızlı banlara maruz bırakıyor.
  [Serginin tamamını aç](../../cases/tr/04-antigravity-spoofing-and-3-minute-bans.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: Uçtan Uca Şifreleme Yok ve Düz Metin TLS Sonlandıran Geçit](../../cases/tr/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Giderilmemiş`
  T3 Connect üzerinden geçen her prompt, kaynak dosyası ve terminal akışı, T3'ün kontrolündeki altyapı içinde düz metin olarak sonlanıyor — uçtan uca şifreleme yok ve cihaz onayı varsayılan olarak kapalı.
  [Serginin tamamını aç](../../cases/tr/05-t3-connect-zero-e2e-plaintext-relay.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [GitHub'da Sıfır Güvenlik Danışması, Sessizce Yapılan Yüksek Önem Dereceli Yamalar ve Aceleyle Hazırlanmış `SECURITY.md`](../../cases/tr/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Giderilmemiş`
  T3 Code, X'te Çinli kaynak kodu denetçilerini küçümserken — gizli anahtar deposunda yol aşımı, alanlar arası token sızıntıları ve güvenilmeyen depolardan komut çalıştırma dahil — yüksek önem dereceli güvenlik açığı düzeltmelerini sessizce birleştirdi; yayımlanmış GitHub Güvenlik Danışmalarını ise 0'da tuttu.
  [Serginin tamamını aç](../../cases/tr/13-zero-security-advisories-and-silent-patches.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Kritik Kimlik Doğrulama ve Depo Yürütme Denetimi: 30 Günlük Düz Metin LAN Kabuğu, İptal Edilemeyen Token'lar ve `SSH_AUTH_SOCK` Maruziyeti](../../cases/tr/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Giderilmemiş`
  En son `main` HEAD'inin (`ca81b7b9`, 25 Kasım 14:49 CST) satır satır doğrulanması, beş aktif güvenlik ve güvenilirlik kusurunu teyit etti: `Origin` başlığı eksik olduğunda atlatılabilen 30 günlük düz metin `--lan` kabuk çerezleri, iptal edilemeyen 30 günlük Bearer token'ları, yeniden oynatılabilir `?wsTicket=` URL'leri, `::1` tünellerini öldüren `isIPv4` ve devralınan `SSH_AUTH_SOCK` ile `GITHUB_TOKEN` eşliğinde hook'ları/submodule'leri çalıştıran güvenilmeyen depolar.
  [Serginin tamamını aç](../../cases/tr/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125494234614788390)

### Bölüm IV · Ticari Manipülasyon ve Topluluk Zorbalığı

*800 bin doları aşan / 31,7T token'lık günlük hesaplama radarı, melek yatırımcı çatışmaları (Vibe Kanban, Daytona), sponsor yığını örtüşmeleri, 77 bin yıldızı getiren 30 saniyelik boşta kalma sonrası ana makine kimlik bilgisiyle yıldızlama, @bot fork kazıması ve .github/VOUCHED.td yasakları.*

- **#06 · [Melek Yatırımcı Çatışmaları: Vibe Kanban'ın Kapanışıyla Dalga Geçme ve Daytona Örtüşmesi](../../cases/tr/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Kamu Kaydı`
  Kod hatalarının ötesinde, @theo'nun X'teki herkese açık paylaşımları, rakip geliştirici girişimlerindeki melek yatırımcı rolü ile T3 Code'u işletmesi arasındaki keskin çatışmaları belgeliyor.
  [Serginin tamamını aç](../../cases/tr/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [800.000 Doları Aşan İş Defteri ve Günlük 31,7 Trilyon Token'lık Hesaplama Radarı](../../cases/tr/08-800k-spend-and-31t-token-radar.md)** — `📌 Kamu Kaydı`
  Varsayılan olarak açık gelen telemetri bir mühendislik ihmali değildi: 300 bin doları aşkın ücretsiz OpenAI erken erişim tokenı ve yatırımcı ilgisi karşılığında takas edilen, günlük 31,7 trilyon token'lık (günlük 10,19 milyon dolar eşdeğeri API harcaması) gerçek zamanlı bir istihbarat radarını finanse ediyordu.
  [Serginin tamamını aç](../../cases/tr/08-800k-spend-and-31t-token-radar.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [Dahili `yolo merges` ile Dışarıya Dönük Topluluk Düşmanlığı ve `.github/VOUCHED.td` Yasakları](../../cases/tr/09-yolo-merges-vs-community-hostility.md)** — `📌 Kamu Kaydı`
  Şirket içinde T3 Code, otomatik ajan döngüleriyle günde 500 commit gönderiyor ve "yolo merges breaking shit" ifadesini kabul ediyordu — dışarıya dönük olarak ise katkıda bulunanlara "here's my advice: Don't" diyor, kullanıcıları `.github/VOUCHED.td` üzerinden kınıyor ve hata bildirenleri aşağılıyordu.
  [Serginin tamamını aç](../../cases/tr/09-yolo-merges-vs-community-hostility.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Kamuya Açık `@bot` ile Fork Kazıma, Rakip Alayı ve Eleştirmen Susturma](../../cases/tr/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Kamu Kaydı`
  `@theo`, rakiplerini arayüz kalıplarını kopyalamakla alaya alırken, bir geliştiricinin fork'una kamuya açık şekilde "Okay I'm stealing this" diye yanıt verdi ve 30 saniye sonra onun kodunu kazıması için `@bot`'u görevlendirdi — bu sırada otomatik engelleyicileri devreye alıyor ve takipçilerini eleştirmenleri demonetize etmeye çağırıyordu.
  [Serginin tamamını aç](../../cases/tr/10-fork-scraping-bot-and-critics-suppression.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Sponsor Yığını Bağlantıları, Codex %0 Kota İstismarı ve 10 Hesaplı `CLIProxyAPI` İkiyüzlülüğü](../../cases/tr/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Kamu Kaydı`
  T3 Code, uyumluluk vaazı verirken ve yasaklanma riskleri nedeniyle yerleşik hesap değiştirmeyi reddederken, @theo'nun YouTube sponsorlarını (Clerk ve Axiom) bulut yığınına gömüyor; @theo ise Codex'in %0 kota hatasını istismar etmekle övünmüş ve doğrudan T3'ün SSS'sinden bağlantı verilen 10 hesaplı bir `CLIProxyAPI` havuzlama Gist'i yayımlamıştı.
  [Serginin tamamını aç](../../cases/tr/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [77.000 Yıldızlık Huni: 30 Saniyelik Hareketsizlikte Sunucu Kimlik Bilgileriyle Yıldız Verme ve Düzeltilmeyen Herhangi Bir Depoya Yıldız Verme Hatası](../../cases/tr/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Giderilmemiş`
  GitHub yıldızlarını "to trick VCs into investing" için bir araç olarak kınayan @theo, altı ay sonra uygulama içinde 30 saniyelik hareketsizlikte çıkan ve `PUT user/starred/...` isteğini sunucunun GitHub kimlik bilgileriyle gönderen bir bildirimi kendi birleştirdi; depoyu 30 binden 77 bin yıldıza fırlatırken (yaklaşık 129 izleyiciyle) herhangi bir depoya yıldız verme hatasını düzeltmeden bıraktı.
  [Serginin tamamını aç](../../cases/tr/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Etkileşimli kart](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=tr) · [Orijinal X gönderisi](https://x.com/realchendahuang/status/2125416210120765799)

---

## Öne Çıkan Görsel Kanıtlar

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## 2 Dakikalık Sıkılaştırma ve Temizlik Rehberi

T3 Code makinenizde zaten kuruluysa yalnızca ortam değişkenlerine güvenmeyin — AnalyticsService.ts:156, devre dışı bırakma tercihlerini kontrol etmeden önce yerel bir ID yazar ve DesktopShellEnvironment.ts, OTEL_SDK_DISABLED değişkenini atlar. Ortam bayraklarını, işletim sistemi hosts engellemesini, çevrimdışı SQLite sıkıştırmasını ve token iptalini birlikte uygulayın.

- [ ] DO_NOT_TRACK=1 ve eski telemetri kapatma anahtarlarını dışa aktarın VE /etc/hosts içinde ingest.t3.codes adresini kara deliğe yönlendirin.
- [ ] T3 Code'u kapatın, statev2.sqlite dosyasını inceleyin, çevrimdışı VACUUM; çalıştırın ya da ~/.t3 dizinini tamamen silin.
- [ ] Tek itiraz hakkınızı korumak için kişisel Google AI / Antigravity hesaplarını T3 tarafından yönetilen dizinler üzerinden çalıştırmayı bırakın.
- [ ] Publish agent activity özelliğini kapatın, T3 Connect makinelerinin bağlantısını kaldırın, Clerk + relay silme talebinde bulunun ve T3 Code'un GitHub OAuth uygulamasının yetkisini iptal edin.
- [ ] Düz metin t3 up --lan komutunu TLS olmadan asla dışa açmayın, CI ortamında 30 günlük DPoP'siz Bearer token'larından kaçının ve güvenilmeyen depoları açmadan önce SSH_AUTH_SOCK / GITHUB_TOKEN değişkenlerini temizleyin.

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

**Topluluğun Önerdiği Alternatifler:** Geliştiriciler Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash ve Orca'yı öne çıkardı. Herhangi bir istemciyi benimsemeden önce varsayılan olarak kapalı telemetriyi, gerçek yerel silmeyi, başlık taklidi olmadan resmî CLI devrini ve istemci tarafında uçtan uca şifrelemeyi doğrulayın.

---

## Topluluk Raporları ve Bağımsız Yorumlar

Numaralandırılmış 20 sergi (#00–#19) yalnızca kamuya açık biçimde doğrulanabilir kod, pull request, resmî başvuru ve arşivlenmiş kamuya açık gönderiler içerir. Topluluk bildirimleri ve özel mesaj iddiaları, kanıt netliği için burada ayrı tutulmuştur.

- **Issue #1 · "Theo'ya Karşı Dosya" (@opserx)** — 25 Kasım 2026'da bu depoya iletilen topluluk yorumlarının birebir arşivi; PR #42450 ve PR #41237 üzerine birincil kaynak hassasiyet notlarıyla birlikte. ([Arşivlenmiş Issue #1'i oku](../community/issue-1-the-case-against-theo.md))
- **Özel Mesaj Şikâyetleri ve Süregelen Bildirimler** — Birden fazla geliştirici, @theo ve T3 Code ile ilgili deneyimlerini özel mesajla iletti. Sıkı doğrulama standartlarını korumak için özel raporlar, kamuya açık belgelerle bağımsız olarak desteklenmedikçe birincil #00–#19 sergi kaydından ayrı tutulur. Doğrulanabilir bulguları veya upstream düzeltme teyitlerini Pull Request ya da GitHub Issue üzerinden iletin. ([Bildirim ve doğrulama politikası](../../CONTRIBUTING.md))

---

## Derin Teknik Dosyalar ve Ana Dizinler

Satır satır kaynak kodu diff'leri, birebir SQL ve eksiksiz çapraz referanslı kataloglar için korunmuş başvuru arşivlerini inceleyin:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 Görsel Kanıt (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 Birincil Kaynak (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Sürekli Takip ve Katkılar

Bu depo etkin biçimde sürdürülmektedir. Olgusal düzeltmeler, commit/PR kanıtıyla yeni birleştirilmiş upstream düzeltmeleri veya yeni birincil kanıtlar Pull Request ya da GitHub Issue yoluyla memnuniyetle karşılanır — CONTRIBUTING.md dosyasına bakın.
