# #05 · T3 Connect: Uçtan Uca Şifreleme Yok ve Düz Metin TLS Sonlandıran Geçit

> T3 Connect üzerinden geçen her prompt, kaynak dosyası ve terminal akışı, T3'ün kontrolündeki altyapı içinde düz metin olarak sonlanıyor — uçtan uca şifreleme yok ve cihaz onayı varsayılan olarak kapalı.

<!-- section:claim -->
## Ne İddia Edildi

- 24 Kasım'da `@theo`, konuşma verilerinin *"lives on your machine. It never touches any of our servers"* olduğunu belirtti ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`), uçtan uca şifrelemenin yokluğunu açıklamaksızın *"encrypted network transport"* vaat ediyor.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

- **T3'ün relay'i içinde düz metin görünürlüğü (`ManagedEndpointProvider.ts`):** T3 Connect, Cloudflare Tünellerini T3'ün kendi Cloudflare hesabı içinde oluşturuyor (`docs/internals/06_t3-connect.md`). Taşıma katmanı TLS'i Cloudflare'in edge noktasında sonlanıyor ve istemciden istemciye hiçbir yük şifrelemesi bulunmuyor; bu da bir Cloudflare Workers Route eklenmesinin her prompt'u, dosyayı ve terminal akışını düz metin olarak açığa çıkardığı anlamına geliyor.
- **E2E şifrelemenin kapsam dışı ilan edilmesi (`Issue #32098`):** Geliştiriciler karşılıklı kimlik doğrulama ve uçtan uca şifreleme talep ettiğinde, bir bakım sorumlusu [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) kaydını değişiklik için fazla büyük bulup kapattı; Discussions `#21286` ve `#37831` yanıtsız kaldı. 25 Kasım'da `@theo`, E2E şifrelemenin imkânsız olduğunu açıkladı ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **T3 tarafından işletilen OVH Caddy geçidine taşınma (`PR #32945`):** Cloudflare Tunnel faturaları **aylık $25.000** düzeyine ulaştıktan sonra `@theo`, T3'ün kiraladığı OVH Hillsboro sunucusuna (`gw.t3coderelay.com`) taşınmak için [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) kaydını açtı. Burada T3'ün kendi Caddy örneği TLS'i sonlandırıyor ve düz metni bir Unix socket üzerinden Go ile yazılmış `yamux` proxy'sine aktarıyor — hâlâ E2E şifreleme yok.
- **Cihaz onayının varsayılan olarak kapalı olması (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` ayarı [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) dosyasında hâlâ varsayılan olarak `false` (`lines 1424–1426`). `SECURITY.md`'nin de kabul ettiği gibi, ele geçirilmiş bir bulut hesabı veya sızdırılmış bir relay imzalama anahtarı, kabuk yetkisine eşdeğer host erişimi sağlıyor.

<!-- section:status -->
## Üst Akış Durumu (`ca81b7b9`)

- **Hâlâ açık:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) oturum açma bildirimlerini ekledi, ancak **T3 Connect'te hâlâ sıfır uçtan uca şifreleme var**, `requireConnectDeviceApproval` varsayılan olarak `false` kalmaya devam ediyor ve `privacy-policy.astro` `2026-10-06` tarihinden bu yana değişmedi.

<!-- section:visuals -->
## Görsel Kanıtlar

![Issue #32098, çalınan bir bulut hesabının veya relay anahtarının E2E şifreleme olmadan bağlı makineleri kontrol edebildiğini doğruluyor](../../evidence/15-connect-no-e2e.jpg)

![PR #32945, T3 Connect'i Caddy'nin TLS'i sonlandırdığı kendi barındırılan OVH geçidine taşıyor](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts, Cloudflare Tünellerini T3'ün kendi hesabı içinde oluşturuyor](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X İncelemesi (Bölüm 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 yorumu](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Derin Teknik Dosya 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
