# #19 · `ca81b7b9` Kritik Kimlik Doğrulama ve Depo Yürütme Denetimi: 30 Günlük Düz Metin LAN Kabuğu, İptal Edilemeyen Token'lar ve `SSH_AUTH_SOCK` Maruziyeti

> En son `main` HEAD'inin (`ca81b7b9`, 25 Kasım 14:49 CST) satır satır doğrulanması, beş aktif güvenlik ve güvenilirlik kusurunu teyit etti: `Origin` başlığı eksik olduğunda atlatılabilen 30 günlük düz metin `--lan` kabuk çerezleri, iptal edilemeyen 30 günlük Bearer token'ları, yeniden oynatılabilir `?wsTicket=` URL'leri, `::1` tünellerini öldüren `isIPv4` ve devralınan `SSH_AUTH_SOCK` ile `GITHUB_TOKEN` eşliğinde hook'ları/submodule'leri çalıştıran güvenilmeyen depolar.

<!-- section:claim -->
## Ne İddia Edildi

- 24–25 Kasım gece yamalama maratonunun ardından T3 Code, temizlenmiş ve günlük mühendislik kullanımı için güvenli olarak sunuldu.
- `SECURITY.md`, varsayılan bir oturumu tam işletim sistemi kullanıcısı kabuk kontrolü olarak tanımlarken yerel/LAN sınırlarının düzgün yönetildiğini iddia ediyor.

<!-- section:evidence -->
## Kanıtlar Ne Gösteriyor

Doğrudan üst kaynak commit'ine karşı doğrulandı: [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. 30 günlük düz metin `--lan` kabuk çerezleri + `Origin` eksikliğinde atlatma:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493), 30 günlük varsayılan oturum TTL'i belirliyor (`SECURITY.md`'ye göre tam işletim sistemi kabuk erişimine eşdeğer). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042), `Secure` özniteliğini yalnızca `https:` için ekledi; bu da `t3 up --lan` HTTP çerezlerinin düz metin olarak iletilmesine yol açıyor ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Daha kötüsü, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) `Origin` atlandığında her zaman `true` döndürüyor — böylece tek bir LAN paketini koklayan herkes, `Origin` başlığı olmadan tarayıcı dışı bir betikten çerezi yeniden oynatabilir ve sessizce 30 günlük ana makine kabuk erişimini elinde tutabilir.
- **2. İptal edilemeyen 30 günlük DPoP'suz Bearer token'ları ve `/logout` rotası yok:** `/oauth/token`, yaşam süresini yalnızca DPoP kanıtı sağlandığında 1 saate düşürüyor; aksi halde bağlanmamış bir **30 günlük Bearer token'ı** düzenliyor ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). HTTP sözleşmesi **sıfır `/logout` uç noktası** tanımlıyor ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)) ve `revokeClientSession`, `current_session_revoke_not_allowed` ile kendi kendini iptal etmeyi açıkça engelliyor ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Yeniden oynatılabilir 5 dakikalık `?wsTicket=` URL token'ları:** WebSocket biletleri, 5 dakikalık TTL ile sorgu dizelerinde (`?wsTicket=`, proxy/erişim günlüklerine düşerek) yol alıyor. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) imzayı, son kullanma tarihini, audience'ı ve iptali **tek kullanımlık `jti` yeniden oynatma deposu olmadan** kontrol ediyor — 5 dakika içinde Bearer RPC ve tüm `media` biletlerinin sınırsız yeniden oynatılmasına izin veriyor ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Tam `SSH_AUTH_SOCK` ve `GITHUB_TOKEN` ile çalışan güvenilmeyen depolar:** Worktree kurulumu, `.gitmodules` var olduğunda `git submodule update --init --recursive` komutunu otomatik olarak çalıştırıyor ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) global bir `core.hooksPath=/dev/null` korumasını atlıyor; ve [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) `.claude/settings.json` içindeki `SessionStart` hook'larını eşzamanlı çalıştırıyor — hepsi, `GITHUB_TOKEN` ve `SSH_AUTH_SOCK` dahil tam ana makine `process.env`'ini devralıyor (bunların etki alanı, SSH ajanınızın imzalayabildiği her uzak depoya ve üretim sunucusuna uzanıyor).
- **5. `isIPv4`'ün `::1` loopback tünellerini sessizce yok etmesi:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108), 39. satırda `::1`'i loopback izin listesine ekliyor, ardından 73. satırda `NodeNet.isIPv4` çağırıyor — IPv6 loopback Tailscale Serve ve T3 Connect soketlerini dış trafik olarak yanlış sınıflandırıp `socket.destroy()` çağırıyor.

<!-- section:status -->
## Üst Kaynak Durumu (`ca81b7b9`)

- **`ca81b7b9` konumunda 5 sorunun tamamı hâlâ düzeltilmedi:** `main` HEAD'de (`2026-11-25 14:49 CST`) satır satır doğrulandı; ayrıca (`PR #39483` içindeki 20 Kasım sessiz path-traversal düzeltmesi dahil) **yayımlanmış 0 GitHub Güvenlik Danışmanlığı** mevcut.

<!-- section:visuals -->
## Görsel Kanıtlar

![http.ts#L215-L241 düz metin --lan HTTP üzerinden Secure olmadan 30 günlük kabuk çerezleri gönderiyor](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 Origin başlığı atlandığında her zaman true döndürüyor](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 logout rotası olmadan mevcut oturumun kendi kendini iptal etmesini engelliyor](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 devralınan SSH_AUTH_SOCK ve GITHUB_TOKEN altında özyinelemeli submodule init çalıştırıyor](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 NodeNet.isIPv4 aracılığıyla IPv6 ::1 loopback tünellerini reddediyor](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Birincil Kaynaklar

- [Orijinal X Denetim Gönderisi — Bölüm 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Bölüm 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Derin Teknik Dosya 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
