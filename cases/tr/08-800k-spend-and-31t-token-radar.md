# #08 · 800.000 Doları Aşan İş Defteri ve Günlük 31,7 Trilyon Token'lık Hesaplama Radarı

> Varsayılan olarak açık gelen telemetri bir mühendislik ihmali değildi: 300 bin doları aşkın ücretsiz OpenAI erken erişim tokenı ve yatırımcı ilgisi karşılığında takas edilen, günlük 31,7 trilyon token'lık (günlük 10,19 milyon dolar eşdeğeri API harcaması) gerçek zamanlı bir istihbarat radarını finanse ediyordu.

<!-- section:claim -->
## Ne İddia Edildi

- T3 Code, tamamen tutkuyla yapılmış, ücretsiz, MIT lisanslı bir açık kaynak aracı olarak sunuldu; telemetri ise yalnızca *"know how many users we have"* amacına hizmet eden basit bir sayım olarak savunuldu.
- `@theo` ayrıca DeepMind'dan `@PatrickToulme`'in T3 Code'a *"many PRs"* gönderdiğini iddia etti.

<!-- section:evidence -->
## Kanıtlar Neyi Gösteriyor

- **800 bin doları aşan harcama ve ücretli ürünlerden tamamen kopuş:** 7–24 Kasım arasındaki **1.151 ardışık X gönderisinin** tamamında `@theo`, T3 Code'dan **162 kez (%14,1)** söz ederken eski ücretli ürünlerine (`T3 Chat`, `UploadThing`, `ping.gg`) **hiç değinmedi (0 kez)**; aynı dönemde ücretsiz istemciye cebinden **800 bin doları aşkın** harcama yaptığını kamuya açık biçimde doğruladı ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)).
- **Günlük 31,7 trilyon token'lık (günlük 10,19 milyon dolar) analitik radarı:** Kapalı kaynaklı `ingest.t3.codes` üzerinden tutulan ham olaylar, **günlük 31,7 trilyon token** (18 Kasım'da **günlük 10,19 milyon dolar** eşdeğeri API harcaması, **günlük 10,2 milyon dolara** yakın zirve) ve ince taneli laboratuvar pay dağılımlarını (`99%` abonelik destekli, Codex/Claude/Antigravity genelinde `~98.5%`, açık ağırlıklı pay `15%`'ten `6%`'ya düşüyor) izleyen dahili bir panoyu besliyordu. 23 Kasım'da bir yorumcu pazar payları üzerine tahmin yürüttüğünde `@theo`, analitiklerine erişimi olmadığı için onunla alay etti ([`2124682906132181482`](https://x.com/theo/status/2124682906132181482)).
- **Kullanıcı telemetrisini laboratuvar ayrıcalıklarına ve VC kaldıracına dönüştürmek:** `@theo`, bir GPT-6.2 Astra kıyaslamasında **sınırsız ücretsiz OpenAI erken erişim tokenından 300 bin doları aşkın** harcadığını ([`2122760447103484410`](https://x.com/theo/status/2122760447103484410)), Google çıplak metal kıyaslamaları yürüttüğünü ve yatırımcı taleplerini karşıladığını (*"multiple investors have asked me about this"*, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)) kamuya açık biçimde belirtti.
- **Abartılı laboratuvar işbirliği:** `patrick-toulme` ile filtrelenen Git commit geçmişi, *"many PRs"* değil, tam olarak **1 commit** gösteriyor ([`PR #31158`](https://github.com/pingdotgg/t3code/pull/31158)).

<!-- section:status -->
## Üst Akış Durumu (`ca81b7b9`)

- **Kamuya açık kayıt / etkin iş modeli:** `ingest.t3.codes`, `ca81b7b9` sürümünde kapalı kaynak ve varsayılan olarak etkin kalıyor; aynı birinci taraf analitik hattını beslemeyi sürdürüyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![Theo'nun 31,7 trilyon tokenı ve günlük 10,19 milyon dolar eşdeğeri API harcamasını gösteren dahili T3 Code panosu](../../evidence/17-theo-31t-tokens-10m-day.png)

![Theo'nun T3 Code'a 800 bin doları aşkın harcama yaptığını açıklaması](../../evidence/extra/p6-1-x-theo-800k-cost.png)

![patrick-toulme'den "many PRs" yerine yalnızca 1 commit (#31158) geldiğini gösteren Git commit kaydı](../../evidence/extra/p3-2-patrick-only-1-commit.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 8)](https://x.com/realchendahuang/status/2125392410763239723)
- [800 bin doları aşan harcama (`2120729779511124267`)](https://x.com/theo/status/2120729779511124267) · [31,7T / 10,19M dolarlık pano (`2122860770329608290`)](https://x.com/theo/status/2122860770329608290) · [Laboratuvar pay dağılımı (`2123965784888377541`)](https://x.com/theo/status/2123965784888377541)
- [Analitiklerle alay (`2124682906132181482`)](https://x.com/theo/status/2124682906132181482) · [300 bin doları aşan OpenAI tokenı (`2122760447103484410`)](https://x.com/theo/status/2122760447103484410) · [Yatırımcı talepleri (`2123885732330885417`)](https://x.com/theo/status/2123885732330885417)
- [PR #31158](https://github.com/pingdotgg/t3code/pull/31158) · [Derin Teknik Dosya 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
