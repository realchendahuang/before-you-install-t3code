# #09 · Dahili `yolo merges` ile Dışarıya Dönük Topluluk Düşmanlığı ve `.github/VOUCHED.td` Yasakları

> Şirket içinde T3 Code, otomatik ajan döngüleriyle günde 500 commit gönderiyor ve "yolo merges breaking shit" ifadesini kabul ediyordu — dışarıya dönük olarak ise katkıda bulunanlara "here's my advice: Don't" diyor, kullanıcıları `.github/VOUCHED.td` üzerinden kınıyor ve hata bildirenleri aşağılıyordu.

<!-- section:claim -->
## İddia Edilen

- T3 Code kendisini hızlı hareket eden, topluluğu kucaklayan, mühendisler tarafından mühendisler için geliştirilmiş bir açık kaynak projesi olarak pazarlıyor.

<!-- section:evidence -->
## Kanıtların Gösterdiği

- **Dahili birleştirmelerde sorumsuz hız:** `@theo` kamuoyu önünde **günde 500 commit** gönderdiğini ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), **700 eşzamanlı ajan** çalıştırdığını, topluluk PR'larını otomatik bir ajan döngüsü üzerinden toplu hâlde birleştirdiğini, *"my yolo merges breaking shit sometimes"* sözünü kabul ettiğini ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)) ve makinenin silinmesi riskini *"free content"* ile eşdeğer görerek şaka yaptığını ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879)) açıkladı.
- **Düşmanca yönetişim ve kamuya açık kınama yasakları:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) *"here's my advice: Don't"* ifadesiyle başlıyor; bunun arkasında [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) kınama temelli otomatik yasaklar ve reddedilen topluluk PR'larına dağıtılmış **174 `unwanted` etiketi** duruyor.
- **Tek taraflı özellik kaldırmaları ve kullanıcı hakaretleri:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) Build/Plan anahtarını gömerek örttü (*"Reality check for those upset"*, 10 olumsuz oy), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) bağlam kullanım halkasını gizledi (16 olumsuz oy, depo genelinde en yüksek), [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) ise Plan modunu kendisiyle çelişen bir yapay zekâ özetiyle tamamen sildi. [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) içinde `@theo`, `@bermudi` adlı kullanıcıya *"uninstall our software"* dedi ve ona *"ungrateful prick"* diye hitap etti — ertesi sabah da kullanıcının takip niteliğindeki [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) başvurusunu reddetti.
- **X'te takipçi bekçiliği:** Katkıda bulunanlar `@theo`'yu takip etmedikleri için azarlandı ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), `/btw` özelliğinin kaldırılmasıyla tehdit edildi ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)) ve kendilerine açıklamalı bir ekran görüntüsünün PR göndermekten daha iyi olduğu söylendi ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110)).

<!-- section:status -->
## Upstream Durumu (`ca81b7b9`)

- **Hâlâ yürürlükte:** `CONTRIBUTING.md` ve `.github/VOUCHED.td`, `ca81b7b9` sürümünde `main` dalında yürürlükte kalmaya devam ediyor.

<!-- section:visuals -->
## Görsel Kanıtlar

![CONTRIBUTING.md'nin dışarıdan gelen PR'ları caydırması ve .github/VOUCHED.td içindeki kamuya açık kınama yasaklarını belgelemesi](../../evidence/22-contributing-vouched-ban.png)

![Theo'nun Issue #33639'daki yanıtı: bir kullanıcıya yazılımı kaldırmasını söylüyor ve ona nankör bir pislik diyor](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo'nun "my yolo merges breaking shit sometimes" itirafı](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 yorumu](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [Günde 500 commit (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [Makine silme = bedava içerik (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [Derin Teknik Dosya 05](../../docs/dossiers/05-governance-trademark-and-history.md)
