# #15 · GitHub Yasak Tehdidinin Ardında Sıfır USPTO Markası ve 17 Saat Sonra Geriye Dönük `TRADEMARK.md`

> @theo, bir Çinli geliştiricinin hesabını "marka ihlali" gerekçesiyle kapatması için GitHub'a başvurmakla tehdit ettiğinde, T3 Tools Inc.'in `T3 Code`, `T3 Tools` veya `T3 Connect` için USPTO nezdinde 0 tescili vardı — ve `TRADEMARK.md` dosyası 17 saat sonra geriye dönük olarak birleştirildi.

<!-- section:claim -->
## Ne İddia Edildi

- 23 Kasım'da `@theo`, MIT fork'unun yazarını marka ihlaliyle suçladı ve GitHub hesabının kapatılmasıyla tehdit etti ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- `TRADEMARK.md` dosyasını birleştirmeden üç saat önce, soru soran geliştiricilere *"get a better lawyer"* dedi ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — üstelik Eylül 2024'te *"unenforceable trademark dispute"* yüzünden WordPress'le alay etmiş olmasına rağmen ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **T3 markaları için sıfır USPTO tescili:** Doğrudan USPTO TSDR doğrulaması (`@vildanden_ai`'nin ipucunu takip ederek, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)), `T3 Code`, `T3 Tools` veya `T3 Connect` için **0 tescil** olduğunu gösteriyor. T3 Tools Inc.'in tek USPTO başvurusu (`PING LABS`, Seri No. [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) Şubat 2025'te reddedildi ve 19 Mayıs 2025'te `ABANDONED` olarak işaretlendi. Bu arada, ilgisiz üçüncü taraflar Sınıf 9 ve 42'de aktif `T3` yazılım/SaaS tescillerine sahip (`EquipmentShare`, Reg. `7795672` / Seri No. [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`).
- **GitHub Marka Politikası şartı:** [GitHub'ın Marka Politikası](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) uyarınca ticari marka kaldırma talepleri, yalan yere yemin etme yaptırımı (penalty of perjury) altında federal veya uluslararası bir tescil numarası gerektirir. `@theo`, `@DDdxx666`'ın hesabını kapatmakla tehdit ettiği anda GitHub'ın formunu dolduramıyordu.
- **17 saatlik geriye dönük `TRADEMARK.md` (`PR #41898`):** **24 Kasım'da 12:21 CST'de** — yasak tehdidinden 17 saat sonra — `@theo`, *"whether registered or unregistered"* ifadesiyle hak iddia eden `TRADEMARK.md` dosyasını ekleyen [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898)'i birleştirdi ve 94 saniye sonra X'te buna atıf yaptı ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## Upstream Durumu (`ca81b7b9`)

- **Kamuya açık kayıt:** Geriye dönük `TRADEMARK.md` hâlâ `main` üzerinde duruyor; USPTO TSDR kayıtları T3 Tools Inc.'in `T3 Code` için 0 tescili olduğunu göstermeye devam ediyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![PR #41898, yasak tehdidinden 17 saat sonra `TRADEMARK.md` dosyasını geriye dönük olarak ekleyerek birleştirildi](../../evidence/24-pr41898-trademark-aftermath.png)

![`TRADEMARK.md`, "whether registered or unregistered" ifadesiyle münhasır hak iddia ediyor](../../evidence/extra/p1-2b-trademark-md.png)

![Theo, `TRADEMARK.md` dosyasını birleştirmeden üç saat önce geliştiricilere "get a better lawyer" diyor](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub Marka Politikası](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [94 saniye sonra geriye dönük atıf (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [WordPress alayı (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [Derin Teknik Dosya 05](../../docs/dossiers/05-governance-trademark-and-history.md)
