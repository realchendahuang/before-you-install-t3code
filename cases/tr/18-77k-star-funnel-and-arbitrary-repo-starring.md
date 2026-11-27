# #18 · 77.000 Yıldızlık Huni: 30 Saniyelik Hareketsizlikte Sunucu Kimlik Bilgileriyle Yıldız Verme ve Düzeltilmeyen Herhangi Bir Depoya Yıldız Verme Hatası

> GitHub yıldızlarını "to trick VCs into investing" için bir araç olarak kınayan @theo, altı ay sonra uygulama içinde 30 saniyelik hareketsizlikte çıkan ve `PUT user/starred/...` isteğini sunucunun GitHub kimlik bilgileriyle gönderen bir bildirimi kendi birleştirdi; depoyu 30 binden 77 bin yıldıza fırlatırken (yaklaşık 129 izleyiciyle) herhangi bir depoya yıldız verme hatasını düzeltmeden bıraktı.

<!-- section:claim -->
## Ne İddia Edildi

- 26 Nisan 2026'da `@theo`, *"Github has a fake star problem"* başlıklı yazısını yayımladı ve GitHub yıldızlarının *"mostly a way for companies to trick VCs into investing"* hâline geldiğini yazdı ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- 24 Kasım'da 74,6 bin yıldızdayken, *"completely missed crossing 70k"* dedi ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **Uygulama içi hareketsizlik bildirimiyle günlük yıldızlarda 10 katlık uçurum (`PR #27832`, `#29922`, `#29987`):** Depo 30.000 yıldıza 8+ ayda ulaştıktan sonra `@theo`, 30 Ekim'de [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) numaralı değişikliği kendisi yazıp kendisi birleştirdi; bu değişiklik 5 komut istemi gönderildikten sonra (`PROMPTS_BEFORE_ASKING = 5`) bir yıldız bildirimi ekledi ve günlük yıldız sayısını hemen **10 katına** çıkardı (GitHub Trending'de günde `+3,094` yıldız). 3 Kasım'da [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) ve [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987), kullanıcılar yapay zekâ yanıtlarını beklerken **30 saniyelik pencere hareketsizlik algılaması** (`IDLE_MS = 30_000`) ekledi ve tarayıcı yönlendirmesini, doğrudan **sunucunun `gh` CLI / `GH_TOKEN` kimlik bilgileri** üzerinden `PUT user/starred/pingdotgg/t3code` isteği gönderen sunucu taraflı `sourceControl.star` RPC'siyle değiştirdi; ardından 160 parçacıklı konfeti geldi.
- **İncelemenin atlatılması ve paylaşılan sunucularda hesap belirsizliği:** Macroscope, tarayıcıdaki kullanıcı ile sunucu kimlik bilgileri arasındaki uyuşmazlık nedeniyle `PR #29922`'yi *Needs Human Approval* olarak işaretledi; `@theo` yine de kendisi birleştirdi. Paylaşılan veya uzak sunucularda *Star*'a tıklamak, sunucunun GitHub kimlik bilgilerine sahip olan hesabı kullanarak depoya sessizce yıldız verir ve kullanıcıya hangi hesabın kullanıldığını söylemez.
- **Düzeltilmeyen herhangi bir depoya yıldız verme hatası (`driver.ts#L60-L99`):** 6 Kasım'da geliştirici `zhilsinger`, [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) dosyasının `pingdotgg/t3code` ile sabitlenmeksizin herhangi bir `owner/repo` dizesini kabul ettiğini belirterek `Request changes` incelemesi açtı; bu, `source-control:write` izni olan her istemcinin sunucu kimlik bilgilerini kullanarak herhangi bir GitHub deposuna yıldız vermesine olanak tanıyor.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Üst Akış Durumu (`ca81b7b9`)

- **Hâlâ açık:** `driver.ts#L60-L99` dosyasındaki sabitlenmemiş, herhangi bir depoya yıldız verme ve `zhilsinger`'ın 6 Kasım tarihli `Request changes` incelemesi 19 gün sonra yanıtsız ve düzeltilmemiş durumda (77 bin+ yıldıza karşı yaklaşık 129 izleyici).

<!-- section:visuals -->
## Görsel Kanıtlar

![Theo'nun 2 Kasım'da, uygulama içi bildirimi yayına aldıktan hemen sonra neredeyse dikey 10 katlık yıldız uçurumunu kutlayan grafiği](../../evidence/20-star-10x-cliff.png)

![Geliştirici zhilsinger'ın PR #29922 üzerindeki, 19 gündür yanıtsız kalan Request Changes incelemesi](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 dosyasının pingdotgg/t3code ile sabitlemeden herhangi bir owner/repo dizesini kabul etmesi](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10 katlık uçurum (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [Trending'de günde +3,094 (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Deep Technical Dossier 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
