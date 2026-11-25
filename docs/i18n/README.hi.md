# T3 Code इंस्टॉल करने से पहले

<p align="center">
  <strong>संयुक्त राष्ट्र की आधिकारिक भाषाएँ:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>वैश्विक समुदाय संस्करण:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md"><strong>हिन्दी</strong></a>
</p>

![T3 Code इंस्टॉल करने से पहले — 18-भाग स्वतंत्र ऑडिट बैनर](../../evidence/00-cover-en.png)

> **दायरा और सत्यापन नीति**  
> यह रिपॉज़िटरी `pingdotgg/t3code` (T3 Code) का एक स्वतंत्र सुरक्षा, टेलीमेट्री, शासन व्यवस्था और सार्वजनिक-अभिलेख ऑडिट है, जो 24–25 नवंबर 2026 को प्रकाशित 2 मूल पोस्ट और **18 प्रलेखित ऑडिट भागों** को **180+ कैनोनिकल प्राथमिक स्रोत URL** (GitHub कमिट्स, पुल रिक्वेस्ट, इश्यू, अक्षरशः स्रोत फ़ाइलें, आधिकारिक दस्तावेज़, USPTO TSDR रिकॉर्ड और संग्रहीत सार्वजनिक पोस्ट), छह गहन तकनीकी डॉसियर ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)), और **1,151 क्रमिक `@theo` X पोस्ट** (7–24 नवंबर 2026) के मात्रात्मक डेटासेट के साथ संकलित करता है। इसमें कोई छोटा रीडायरेक्ट URL और कोई निजी संपर्क विवरण शामिल नहीं है। प्राथमिक उद्धरणों के साथ तथ्यात्मक अद्यतन, नए मर्ज किए गए सुधार या अतिरिक्त अनुवाद Pull Request के माध्यम से स्वागत योग्य हैं — देखें [`CONTRIBUTING.md`](../../CONTRIBUTING.md) और [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md)

---

## विषय-सूची

- [संरचित निष्कर्ष और जोखिम मैट्रिक्स](#संरचित-निष्कर्ष-और-जोखिम-मैट्रिक्स)
- [कालानुक्रमिक समयरेखा (2023–2026)](#कालानुक्रमिक-समयरेखा-20232026)
- [1. मूल विवाद: "Steal Our Code", फ़ोर्क नामकरण की धमकी और दोहरा मापदंड](#1-मूल-विवाद-steal-our-code-फ़ोर्क-नामकरण-की-धमकी-और-दोहरा-मापदंड)
- [2. टेलीमेट्री, क्रॉस-टूल क्रेडेंशियल रीडिंग और GDPR के बाद की रातोंरात मुहिम (भाग 1, 7, 11, 12)](#2-टेलीमेट्री-क्रॉस-टूल-क्रेडेंशियल-रीडिंग-और-gdpr-के-बाद-की-रातोंरात-मुहिम-भाग-1-7-11-12)
- [3. स्थानीय स्टोरेज, प्रोसेस मॉनिटरिंग, गार्डरेल बायपास और अघोषित सुरक्षा पैच (भाग 2, 3, 13)](#3-स्थानीय-स्टोरेज-प्रोसेस-मॉनिटरिंग-गार्डरेल-बायपास-और-अघोषित-सुरक्षा-पैच-भाग-2-3-13)
- [4. Google Antigravity ToS जोखिम और बिना एन्क्रिप्शन वाला T3 Connect रिले (भाग 4, 5)](#4-google-antigravity-tos-जोखिम-और-बिना-एन्क्रिप्शन-वाला-t3-connect-रिले-भाग-4-5)
- [5. व्यावसायिक लेखा-जोखा, निवेशक हितों का टकराव, प्रायोजक और 77,000-स्टार फ़नल (भाग 6, 8, 17, 18)](#5-व्यावसायिक-लेखा-जोखा-निवेशक-हितों-का-टकराव-प्रायोजक-और-77000-स्टार-फ़नल-भाग-6-8-17-18)
- [6. शासन व्यवस्था, फ़ोर्क-स्क्रैपिंग बॉट्स, ट्रेडमार्क रिकॉर्ड, 1,151-ट्वीट डेटासेट और इतिहास (भाग 9, 10, 14, 15, 16)](#6-शासन-व्यवस्था-फ़ोर्क-स्क्रैपिंग-बॉट्स-ट्रेडमार्क-रिकॉर्ड-1151-ट्वीट-डेटासेट-और-इतिहास-भाग-9-10-14-15-16)
- [7. व्यावहारिक जोखिम न्यूनीकरण और सुधार प्लेबुक](#7-व्यावहारिक-जोखिम-न्यूनीकरण-और-सुधार-प्लेबुक)
- [8. प्राथमिक स्रोत और 18-भाग मूल पोस्ट सूचकांक](#8-प्राथमिक-स्रोत-और-18-भाग-मूल-पोस्ट-सूचकांक)

---

## संरचित निष्कर्ष और जोखिम मैट्रिक्स

| डोमेन और ऑडिट भाग | जोखिम / प्रभाव | मुख्य प्रलेखित निष्कर्ष और स्रोत प्रमाण | स्थिति (25 नवंबर 2026) | गहन डॉसियर |
|---|---|---|---|---|
| **टेलीमेट्री और GDPR के बाद की गोपनीयता**<br>*(भाग 1, 7, 11, 12)* | **अत्यंत गंभीर (Critical)** | डिफ़ॉल्ट PostHog एनालिटिक्स (`PR #174`) जबकि होमपेज पर `"No telemetry / Unless you opt in. Full stop."` का वादा था (`3bdaa6e1` ने 18 जून को इसे हटाया); क्लोज़्ड-सोर्स `ingest.t3.codes` के माध्यम से कच्चे ईवेंट्स का भंडारण (`PR #15028`); `~/.codex/auth.json` और `~/.claude.json` की अनसॉल्टेड SHA-256 क्रॉस-टूल हैशिंग (`Identify.ts`, `telemetryId.ts`); 4 अस्वीकृत ऑप्ट-आउट PR (`#13458`, `#16763`, `#21248`, `#27077`); Managed Policy की कमियाँ (`docs/user/telemetry.md`); रातोंरात मर्ज हुए GDPR PR जिनमें Axiom में 30 दिनों तक रखे गए **2.2M/घंटा IP + UA स्पैन** (`#42380`), `git.cwd` पाथ लीक (`#42450`), अनदेखे किए गए Win/Mac ऑप्ट-आउट (`#42376`, `#42464`), टूटा हुआ खाता विलोपन (`#42285`), और मिश्रित गुमनाम बैच (`#42466`) स्वीकार किए गए। | आंशिक रातोंरात पैच; `AnalyticsService.ts` अभी भी स्टार्टअप पर डिस्क पहचान बनाता है; होस्टेड वेब ऐप में अभी भी कोई टॉगल नहीं है; `ingest.t3.codes` अभी भी क्लोज़्ड-सोर्स है | [**डॉसियर 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **स्थानीय सुरक्षा और मूक परामर्श (Silent Advisories)**<br>*(भाग 2, 3, 13)* | **अत्यंत गंभीर (Critical)** | साइडबार का "permanent delete" केवल `statev2.sqlite` में `"thread.deleted"` जोड़ता है (25.9–41.6 GB का फैलाव, `#17845`); `t3-resource-monitor` कमांड लाइनों के साथ सभी OS प्रोसेस को स्कैन करता है (`ProcessesToUpdate::All`, `#11222`, `PR #41889`); Claude Auto मोड तीसरे प्रयास में `git push --force` को चुपचाप स्वीकृत कर देता है (`#15353`, 52–53+ दिनों से खुला); `slopalytics.com` के लिए प्राइवेट मॉडल फ़िल्टर को 21 घंटे में हटा दिया गया (`#41237`); मूक सुधारों (`#39483`, `#41757`, `#42386`, `#42504`) के बावजूद **0 GitHub Security Advisories**; खुला Windows Base64 PowerShell AV इश्यू (`#30997`); `SECURITY.md` OS-व्यापी `filesystem:read` और iOS HTTP को जानबूझकर बनाया गया डिज़ाइन घोषित करता है। | `#17845`, `#15353`, `#26489`, `#30997` अनसुलझे / खुले हैं; `0` प्रकाशित Security Advisories | [**डॉसियर 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **Antigravity ToS और T3 Connect रिले**<br>*(भाग 4, 5)* | **उच्च (High)** | `docs/user/faq.md` Google Antigravity ToS सुरक्षा की गारंटी देता है, जबकि `antigravityUsageLimits.ts` OS कीरिंग/Windows `CredReadW` से टोकन निकालता है, `antigravity/hub/2.24.0` की स्पूफ़िंग करता है, और निजी `v1internal` एंडपॉइंट्स पर हिट करता है; `antigravityAuthSupport.ts` नकली `SSH_CONNECTION` इंजेक्ट करता है जिससे क्रॉस-अकाउंट रूटिंग होती है (`#41973`); नया $20 का खाता 3 मिनट में बैन हो गया (`#41536`); `PR #33800` स्पूफ़ किए गए `claude`/`xai`/`antigravity` CLIProxyAPI हब पोलिंग को जोड़ता है; T3 Connect में **शून्य E2E एन्क्रिप्शन**, डिफ़ॉल्ट रूप से बंद `requireConnectDeviceApproval` (`#36419`), और एक खुला OVH Caddy TLS-टर्मिनेशन गेटवे (`PR #32945`) है। | Antigravity स्पूफ़िंग कोड अभी भी सक्रिय है; T3 Connect E2E एन्क्रिप्शन को स्पष्ट रूप से अस्वीकार किया गया (`#32098`, 25 नव. का उत्तर) | [**डॉसियर 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **व्यावसायिक लेखा-जोखा, प्रायोजक और 77k स्टार्स**<br>*(भाग 6, 8, 17, 18)* | **उच्च (High)** | मुफ़्त क्लाइंट पर $800k+ खर्च (भुगतान किए गए उत्पादों के `0` उल्लेखों के मुकाबले `162` T3 उल्लेख); $300k+ OpenAI अर्ली-एक्सेस टोकन और VC संपर्क के बदले **31.7T टोकन/दिन** ($10.19M/दिन) का कंप्यूट रडार; Vibe Kanban और Daytona के साथ एंजेल-निवेशक टकराव; प्रायोजक स्टैक (Clerk, Axiom, Vercel विशिष्टता); Codex 0% दोहन (`Endless` / `codex#45444`); 10-खाते वाला `CLIProxyAPI` Gist (`555%` कोटा) बनाम FAQ बैन चेतावनी; 5-प्रॉम्प्ट / 30-सेकंड आइडल टोस्ट जो होस्ट क्रेडेंशियल से `PUT user/starred/...` चलाता है (`#27832`, `#29922`, `#29987`), Macroscope को बायपास करता है और `driver.ts#L60-L99` में अनपिन्ड रेपो स्टारिंग को 19 दिनों तक ठीक नहीं करता। | `driver.ts` अनपिन्ड स्टारिंग और `zhilsinger` की समीक्षा 19 दिनों बाद भी ठीक नहीं हुई; रेपो ~129 वॉचर्स के मुकाबले 77k+ स्टार्स पर है | [**डॉसियर 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **शासन व्यवस्था, ट्रेडमार्क और इतिहास**<br>*(मूल 1–2, भाग 9, 10, 15, 16)* | **मध्यम–उच्च (Medium–High)** | प्रतिदिन 500 कमिट / 700 एजेंट / `yolo merges` बनाम `CONTRIBUTING.md` (`"here's my advice: Don't"`), `.github/VOUCHED.td` सार्वजनिक निंदा ऑटो-बैन, `174` `unwanted` लेबल, Plan मोड हटाना (`#5551`, `#9190`, `#33131`), और `#33639` अपमान; सार्वजनिक `@bot` फ़ोर्क-स्क्रैपिंग (`@MiaAI_lab`), Community Notes विमुद्रीकरण आह्वान, और ऑटो-ब्लॉकर; GitHub टेकडाउन की धमकी देते समय `T3 Code`/`T3 Tools`/`T3 Connect` के लिए **0 USPTO पंजीकरण** (`PING LABS` `97294243` परित्यक्त; EquipmentShare `7795672` पंजीकृत); 17 घंटे बाद पूर्वव्यापी `PR #41898` `TRADEMARK.md`; 2024–2026 पैटर्न (`vsc-material-but-i-wont-sue-you`, भारतीय डेवलपर से माफ़ी, $20k FFmpeg बाउंटी, 25 नव. सुबह 4 बजे हटाई गई क्लोज़्ड-सोर्स धमकी)। | `CONTRIBUTING.md` / `.github/VOUCHED.td` और `TRADEMARK.md` अभी भी `main` पर लाइव हैं | [**डॉसियर 05**](../dossiers/05-governance-trademark-and-history.md) |
| **1,151-ट्वीट मात्रात्मक डेटासेट**<br>*(भाग 14)* | **ऑडिट आधाररेखा (Audit Baseline)** | 7–24 नवंबर का संपूर्ण संकलन (`n = 1,151`, 17.24 दिन, 66.8 पोस्ट/दिन, 75.6% उत्तर, 2.7 मिनट माध्य अंतराल): 20 बड़ी टेक कंपनियों के अधिकारियों/कर्मचारियों/KOLs के प्रति **0.0% अभद्र भाषा/अपमान** (`0/43` सख्त प्राथमिक-`@`, `32.6%` आभार) बनाम सामान्य डेवलपर्स के प्रति **8.0% शत्रुता** (`61/766`) और 25-घंटे के चीनी-फ़ोर्क संकट के दौरान सीधे व्यक्तिगत अपमानों में **4.0x उछाल से 14.4%** (`19/132`) तक वृद्धि। | 4 फ़ोरेंसिक चार्ट के साथ पुनरुत्पादनीय रेगेक्स ऑडिट | [**डॉसियर 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **संपूर्ण प्राथमिक URL कैटलॉग** | **संदर्भ (Reference)** | इस पोर्टल, `canonical_refs.txt`, `tco_resolved.json`, `all_18_posts.txt`, और `missing_posts_full.json` में मौजूद प्रत्येक कैनोनिकल `https://` URL का पूर्ण क्रॉस-रेफरेंस कैटलॉग। | 100% कैनोनिकलाइज़्ड (शून्य `t.co` लिंक) | [**स्रोत सूचकांक**](../COMPLETE-SOURCE-INDEX.md) |

---

## कालानुक्रमिक समयरेखा (2023–2026)

| तिथि / समय | मील का पत्थर | सत्यापन योग्य प्रमाण / स्रोत |
|---|---|---|
| **2023-05-14** | `@theo` ने अपनी YouTube प्रायोजक सूची (`@vercel`, `@clerk`, `@upstash`, `@axiomhq`, `@PlanetScale`) प्रकाशित की। Clerk और Axiom बाद में T3 Code के भीतर मुख्य ऑथ और लॉगिंग बुनियादी ढाँचा बनते हैं। | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | Vercel के CEO ने पुष्टि की कि वे केवल एक ही YouTuber (`Theo`) को प्रायोजित करते हैं; `@theo` ने स्वीकार किया कि प्रायोजक अनुबंधों में प्रतिस्पर्धी प्रचार को रोकने वाले विशिष्टता (exclusivity) खंड शामिल थे। | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [वीडियो](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(2 वर्ष पहले)* | `@theo` ने मूल लेखक के स्वभाव का मज़ाक उड़ाते हुए एक VS Code थीम को `vsc-material-but-i-wont-sue-you` के रूप में फ़ोर्क किया; अलग से, भारतीय ट्यूटोरियल चैनलों को निशाना बनाने वाले उनके वीडियो से उत्पीड़न भड़कने के बाद, उन्होंने राष्ट्रीयता-आधारित हमलों की निंदा करते हुए एक माफ़ी वीडियो (`I screwed up.`) प्रकाशित किया। | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | USPTO ने T3 Tools Inc. के एकमात्र ट्रेडमार्क आवेदन (`PING LABS`, सीरियल `97294243`) को अस्वीकार कर दिया और इसे `ABANDONED` (19 मई 2025) चिह्नित किया। EquipmentShare ने सॉफ़्टवेयर/SaaS वर्ग 9 और 42 में `T3` पंजीकृत कराया (`Reg. 7795672`, 13 मई 2025)। | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` X पर FFmpeg से भिड़ गए और एक FFmpeg मेंटेनर को बाहर करने के लिए **$20,000 बाउंटी** की पेशकश की; Windscribe ने $21,000 का प्रति-प्रस्ताव रखा, VLC के संस्थापक ने विरोध किया, FFmpeg डेवलपर्स ने सार्वजनिक बदमाशी का दस्तावेज़ीकरण किया, और `@theo` ने वीडियो/ट्वीट हटा दिए व बाउंटी वापस ले ली। | [FFmpeg रिकॉर्ड](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | `pingdotgg/t3code` में **PR #174** मर्ज हुआ, जिसने बिना किसी सहमति संवाद, बिना सेटिंग्स UI टॉगल और बिना टेलीमेट्री दस्तावेज़ों के डिफ़ॉल्ट-ऑन PostHog टेलीमेट्री सक्षम की। | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` ने *"Github has a fake star problem"* प्रकाशित किया, जिसमें लिखा कि GitHub स्टार्स `"mostly a way for companies to trick VCs into investing"` हैं। | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | **Commit `3bdaa6e1`** ने 3+ महीनों के डिफ़ॉल्ट टेलीमेट्री संग्रहण के बाद T3 Code के होमपेज से `No telemetry / Unless you opt in. Full stop.` को चुपचाप हटा दिया। | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | मेंटेनर Julius ने **Issue #1397** को बंद (`not planned`) कर दिया: *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*। | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | **Issue #4123** (संग्रहीत "No telemetry" स्क्रीनशॉट) 4 नवंबर को चुपचाप बंद कर दिया गया; 4 सामुदायिक ऑप्ट-आउट PR (`#13458`, `#16763`, `#21248`, `#27077`) अस्वीकार किए गए (`#27077` को 147 पास परीक्षणों के बावजूद `unwanted` कहकर बंद किया गया)। | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | **PR #5551** ने Build/Plan टॉगल को दबा दिया (`Reality check for those upset`, 10 डाउनवोट); **PR #9190** ने कॉन्टेक्स्ट मीटर को छिपा दिया (16 डाउनवोट, रेपो का उच्चतम)। | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` ने Codex के 0% कोटे से आगे **$800+** निकालने की डींग मारी जबकि `@maria_rcks` ने *Endless* जारी किया; विरोध के बाद दोनों ने पोस्ट हटा दिए (`2090972426876129658`); OpenAI ने 0% टर्न कटऑफ कड़े किए (`openai/codex#45444`)। | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | **Issue #15353** (Claude Auto द्वारा मूक `git push --force`, 3 अक्तू.), `privacy-policy.astro` (`2026-10-06`), और **Issue #17845** (`statev2.sqlite` नकली विलोपन, 10 अक्तू.) दर्ज किए गए। | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | **PR #15028** ने टेलीमेट्री को क्लोज़्ड-सोर्स `ingest.t3.codes` से रूट किया; **PR #21506** ने `Identify.ts` में अनसॉल्टेड SHA-256 क्रॉस-टूल एट्रिब्यूशन जोड़ा; `@theo` ने अपना 10-खातों वाला `CLIProxyAPI` Gist (`555%` कोटा) प्रकाशित किया। | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | **PR #27832**, **#29922**, और **#29987** ने 5-प्रॉम्प्ट / 30-सेकंड आइडल स्टार टोस्ट शिप किया जो होस्ट क्रेडेंशियल से `PUT user/starred/...` चलाता है; `zhilsinger` ने 6 नवंबर को `Request changes` दर्ज किया (19 दिनों तक अनुत्तरित)। | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | `@bot` फ़ोर्क-स्क्रैपिंग (`@MiaAI_lab`), Plan मोड का हटाया जाना (`#33131`), `$800k+` खर्च और `31.7T/day` / `$10.19M/day` रडार का खुलासा, `$300k+` OpenAI मुफ़्त टोकन, `CONTRIBUTING.md` का पुनर्लेखन, Vibe Kanban/Daytona टकराव, `PR #41237` द्वारा 21 घंटे में मॉडल फ़िल्टर हटाना। | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` ने `"Chinese knockoff"` और `"Temu3 Code"` पोस्ट किया और GitHub खाता टेकडाउन की धमकी दी (`2124829315657576890`); MIT फ़ोर्क के लेखक ने 30 मिनट के भीतर नाम बदलकर `Stardust` कर दिया; निजी DM में माफ़ी माँगी गई, सार्वजनिक पोस्ट बने रहे। | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [मूल 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` ने ट्रिलियन-डॉलर अमेरिकी कंपनियों द्वारा MIT कोड कॉपी करने का स्वागत किया (`2124989435154726982`), अनुपालन का मज़ाक उड़ाया (`"get a better lawyer"`), मूल 1–2 प्रकाशित हुए, और **12:21 CST** (`04:21Z`, बैन की धमकी के 17 घंटे बाद) पर `@theo` ने पूर्वव्यापी रूप से `TRADEMARK.md` जोड़ते हुए **PR #41898** मर्ज किया। | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | ऑडिट के **भाग 1–5** प्रकाशित हुए (भाग 1 **1.81M+ व्यूज़**, 6,640 बुकमार्क तक पहुँचा)। `18:39 CST` पर `@theo` ने चीनी टेक ट्विटर को `"the biggest fucking cesspit"` कहा (`2125177503526588877`); `19:13–19:36 CST` पर दावा किया कि Managed Policy सभी टेलीमेट्री बंद कर देती है (`2125186071357251715`)। | [भाग 1](https://x.com/realchendahuang/status/2125153472450527440) → [भाग 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 रात – 2026-11-25 ~07:00 CST** | औपचारिक EU GDPR शिकायत दर्ज; **6-घंटे के रातोंरात स्प्रिंट** में `#42380` (2.2M/घंटा IP स्पैन), `#42285`/`#42430` (खाता विलोपन), `#42376`/`#42464` (अनदेखे Win/Mac ऑप्ट-आउट), `#42450` (`git.cwd` पाथ लीक, Theo द्वारा पाथ संग्रहण से इनकार करने के 90 मिनट बाद), `#42459`/`#41859` (पुश लीक), `#42466` (गुमनाम बैचिंग), `#41757`/`#42386`/`#42504` (मूक सुरक्षा सुधार) मर्ज किए गए। सूर्योदय से पहले `@theo` ने क्लोज़्ड-सोर्स करने की धमकी पोस्ट करके हटा दी। | [भाग 11](https://x.com/realchendahuang/status/2125394810559426993) · [भाग 12](https://x.com/realchendahuang/status/2125395501663281198) · [भाग 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | ऑडिट के **भाग 6–18** प्रकाशित हुए, जिनमें व्यावसायिक लेखा-जोखा, Managed Policy की कमियाँ, `yolo merges`, `@bot` स्क्रैपिंग, GDPR के बाद के खुलासे, 1,151-ट्वीट डेटासेट, USPTO रिकॉर्ड, प्रायोजक संबंध और 77k स्टार इंजन शामिल हैं। | [भाग 6](https://x.com/realchendahuang/status/2125385742243520653) → [भाग 18](https://x.com/realchendahuang/status/2125416210120765799) |

---

## 1. मूल विवाद: "Steal Our Code", फ़ोर्क नामकरण की धमकी और दोहरा मापदंड

23–25 नवंबर 2026 के 48 घंटों में, T3 Code के एक सामुदायिक MIT फ़ोर्क के नामकरण पर हुआ विवाद एक पूर्ण स्रोत-कोड ऑडिट, एक यूरोपीय GDPR शिकायत और लगभग 20 रातोंरात आपातकालीन पैच में बदल गया।

23 नवंबर की शाम और 24 नवंबर 2026 की सुबह (बीजिंग समय) के बीच, एक उपयोगकर्ता ने एक चीनी डेवलपर (`@DDdxx666`) द्वारा बनाए गए मुफ़्त, ओपन-सोर्स MIT फ़ोर्क को आधिकारिक ऐप समझकर उसके UI की ऑनलाइन शिकायत की। यह जाँचे बिना कि रिपॉज़िटरी एक वैध MIT फ़ोर्क थी या नहीं, `@theo` ने 11 मिनट के भीतर दो बार पोस्ट करके इसे `"Chinese knockoff"` और `"Temu3 Code"` कहा, लेखक के काम का सीधे मज़ाक उड़ाया और लेखक का खाता बैन करवाने के लिए GitHub से संपर्क करने की धमकी दी (`"Do it right now or I'm going to contact GitHub and have your account taken down"`)। लगभग उसी समय, T3 Code की वेबसाइट ([`https://t3.codes/`](https://t3.codes/)) ने अपने GitHub रिपॉज़िटरी लिंक पर `"Steal our code (legally)"` (`"steal our code"`) लेबल लगा रखा था ([मूल 1](https://x.com/realchendahuang/status/2125059292919394654), [मूल 2](https://x.com/realchendahuang/status/2125062675147448475))।

फ़ोर्क के लेखक ने तुरंत अनुपालन किया—30 मिनट के भीतर रिपॉज़िटरी का नाम बदलकर `Stardust` कर दिया और सभी T3 ब्रांडिंग हटा दी। `@theo` ने निजी DM में माफ़ी माँगी, फिर भी दोनों सार्वजनिक पोस्ट—जिनके कुल व्यूज़ 200,000 से अधिक हो चुके थे—बिना हटाए या स्पष्टीकरण दिए लाइव छोड़ दिए। 11 घंटे से भी कम समय बाद, 24 नवंबर को `06:12 BJ` पर (`2124989435154726982`), जब उनसे पूछा गया कि क्या T3 Code से फ़ीचर्स कॉपी करने वाली ट्रिलियन-डॉलर अमेरिकी लैब्स ने सीमा पार की है, तो उन्होंने ठीक उल्टा रुख अपनाया: `"Nah. Open source is open source, even if a trillion dollar company uses it!"` इस बीच, T3 की कर्मचारी `@maria_rcks` स्वयं `maria-rcks/t3libre` (*"T3 Code, liberated"*) नाम का एक सार्वजनिक फ़ोर्क होस्ट कर रही थीं, और `t3code-quota-ui`, `t3code-atlas`, तथा `t3code-bar` जैसे अंग्रेज़ी-भाषी रेपो बिना किसी सार्वजनिक धमकी के चल रहे थे।

![Theo द्वारा सार्वजनिक रूप से ओपन-सोर्स फ़ोर्क लेखक को बैन कराने के लिए GitHub से संपर्क करने की धमकी](../../evidence/01-origin-theo-threat.png)

![T3 टीम की सदस्य @maria_rcks द्वारा maria-rcks/t3libre ("T3 Code, liberated") नामक सार्वजनिक फ़ोर्क होस्ट करना](../../evidence/extra/p1-3-maria-t3libre.png)

24 नवंबर को बीजिंग समय के अनुसार 17:04 बजे से, मैंने `pingdotgg/t3code` के कमिट इतिहास, स्रोत फ़ाइलों, PRs, Issues, आधिकारिक दस्तावेज़ों, USPTO TSDR रिकॉर्ड और `@theo` की सार्वजनिक X टाइमलाइन का ऑडिट किया। 24 घंटों में, मैंने प्रत्यक्ष लिंक और स्क्रीनशॉट के प्रमाण के साथ **18 प्रलेखित भाग** प्रकाशित किए। अकेले भाग 1 ने **1.81 मिलियन व्यूज़** और **6,640 बुकमार्क** पार कर लिए, जिससे यूरोप में GDPR शिकायत दर्ज हुई और T3 टीम को 6 घंटे तक रातोंरात पैचिंग स्प्रिंट चलाना पड़ा।

---

## 2. टेलीमेट्री, क्रॉस-टूल क्रेडेंशियल रीडिंग और GDPR के बाद की रातोंरात मुहिम (भाग 1, 7, 11, 12)

> **गहन तकनीकी ऑडिट:** पूर्ण स्रोत लाइन मैपिंग, `FeatureUsage.ts` क्रिया सूचियाँ, `DesktopShellEnvironment.ts` कमियाँ, और मिनट-दर-मिनट 23–25 नवंबर लॉग [**डॉसियर 01: टेलीमेट्री आर्किटेक्चर, क्रॉस-टूल पहचान जोड़ना और 24–25 नवंबर GDPR रातोंरात स्प्रिंट**](../dossiers/01-telemetry-and-gdpr-timeline.md) में मौजूद हैं।

### 2.1 डिफ़ॉल्ट टेलीमेट्री, हटाया गया होमपेज वादा और क्रॉस-टूल क्रेडेंशियल हैशिंग (`भाग 1`)

**6 मार्च 2026** को, `pingdotgg/t3code` ने **PR #174** मर्ज किया, जिसमें बिना किसी रिपॉज़िटरी टेलीमेट्री दस्तावेज़, बिना पहली बार चलाने के सहमति प्रॉम्प्ट और बिना सेटिंग्स UI टॉगल के PostHog टेलीमेट्री को डिफ़ॉल्ट रूप से सक्षम कर दिया गया। ऑप्ट-आउट एनवायरनमेंट वेरिएबल कोड में दबा रहा जबकि डिफ़ॉल्ट इंस्टॉलेशन ने तुरंत ईवेंट्स भेजना शुरू कर दिया ([भाग 1](https://x.com/realchendahuang/status/2125153472450527440))।

तीन महीने से अधिक के डिफ़ॉल्ट संग्रहण के दौरान, T3 Code होमपेज पर स्पष्ट रूप से दो पंक्तियाँ प्रदर्शित होती रहीं: `No telemetry / Unless you opt in. Full stop.` **18 जून 2026** को, `@theo` ने होमपेज रीडिज़ाइन के दौरान बिना किसी घोषणा या मौजूदा उपयोगकर्ताओं को सूचना दिए चुपचाप दोनों पंक्तियाँ हटा दीं ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3))।

![18 जून 2026 को commit 3bdaa6e1 द्वारा होमपेज के "No telemetry / Unless you opt in. Full stop." वादे को चुपचाप हटाना](../../evidence/02-no-telemetry-removed.png)

अक्तूबर 2026 में, `@theo` ने **PR #15028** मर्ज किया, जिसने 10-सेकंड के बैच किए गए टेलीमेट्री अपलोड (`FLUSH_INTERVAL_MS = 10_000`) को T3 के क्लोज़्ड-सोर्स गेटवे [`https://ingest.t3.codes/`](https://ingest.t3.codes/) से रूट किया। [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) की पंक्ति 1 स्पष्ट रूप से कहती है कि इनजेस्ट एंडपॉइंट PostHog को आगे भेजने से पहले प्रत्येक कच्चे ईवेंट की एक प्रति रखता है:

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

[`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) और `FeatureUsage.ts` में एकत्र किए गए फ़ील्ड्स में प्रदाता, मॉडल चयन (`ProviderDimensions.ts` के माध्यम से गैर-कैटलॉग कस्टम मॉडल/एंडपॉइंट ID को अक्षरशः भेजते हुए), रीज़निंग प्रयास, अनुमति मोड, रन अवधि, इनपुट/आउटपुट/कैश किए गए/रीज़निंग टोकन गिनती, चाइल्ड-एजेंट टोकन, स्थानीय प्रोजेक्ट/थ्रेड गिनती, **35 विशिष्ट UI/कमांड क्रियाएँ** (`18` `COMMAND_FEATURES` + `17` `METHOD_FEATURES`), OS विवरण, WSL डिस्ट्रो और आर्किटेक्चर शामिल थे।

**19 अक्तूबर 2026** को, `@theo` ने यह गिनने के लिए **PR #21506** जोड़ा कि एक ही व्यक्ति के पास कितनी मशीनें हैं। [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) ने उपयोगकर्ता की होम डायरेक्टरी में अलग AI टूल्स की क्रेडेंशियल फ़ाइलों—`~/.codex/auth.json` और `~/.claude.json`—को चुपचाप पढ़ना शुरू किया, OpenAI `user_id` JWT क्लेम और Claude `oauthAccount.accountUuid` को डिकोड किया, और लिंक किए गए T3 Connect उपयोगकर्ता ID तथा डिवाइस ID के साथ उन्हें हैश किया:

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

और [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (पंक्तियाँ 8–9) में, `hashTelemetryId` एक **अनसॉल्टेड SHA-256 डाइजेस्ट** (`Hex.encode(sha256(new TextEncoder().encode(value)))`) की गणना करता है। चूँकि सर्वर के पास पहले से ही Clerk से प्राप्त प्लेनटेक्स्ट T3 Connect खाता ID मौजूद हैं, इसलिए बैकएंड पर प्लेनटेक्स्ट मानों को हैश करने से अनसॉल्टेड डाइजेस्ट सीधे किसी ज्ञात व्यक्ति से जुड़ जाता है; लीक हुई तृतीय-पक्ष OpenAI या Claude ID भी उसी हैश से निश्चित रूप से जुड़ जाती हैं।

![Identify.ts द्वारा क्रॉस-डिवाइस एट्रिब्यूशन के लिए अनसॉल्टेड SHA-256 हैश भेजने हेतु ~/.codex/auth.json और ~/.claude.json को पढ़ना](../../evidence/03-identify-codex-claude.png)

सामुदायिक विरोध को बार-बार दबाया गया। **23 जून** को, एक डेवलपर ने सेटिंग्स टॉगल का अनुरोध करते हुए **Issue #1397** खोला; कोर मेंटेनर Julius ने इसे `not planned` कहकर बंद कर दिया: `We will not make this easier to opt out of, it is crucial for us to know how many users we have`। जुलाई में, एक उपयोगकर्ता ने टूटे हुए वादे (`"No telemetry"`) पर सवाल उठाते हुए **Issue #4123** में संग्रहीत होमपेज स्क्रीनशॉट पोस्ट किए, जिसे `@theo` के खाते ने 21 अक्तूबर को एक असंबद्ध कमिट के माध्यम से बंद किया, विरोध के बाद फिर से खोला, और 4 नवंबर को फिर से चुपचाप बंद कर दिया। सितंबर और नवंबर के बीच, योगदानकर्ताओं ने **चार अलग ऑप्ट-आउट PR** (`#13458`, `#16763`, `#21248`, `#27077`) सबमिट किए। यहाँ तक कि `#27077`—जो वास्तविक हार्डवेयर पर **147 पास परीक्षणों** के साथ सत्यापित और Macroscope द्वारा अनुमोदित था—को भी **17 नवंबर** को बंद कर दिया गया और `unwanted` टैग कर दिया गया।

![कोर मेंटेनर Julius द्वारा Issue #1397 को not planned के रूप में बंद करना और यह कहना कि वे ऑप्ट आउट करना आसान नहीं बनाएंगे](../../evidence/04-issue1397-no-optout.png)

![147 पास परीक्षणों और Macroscope अनुमोदन के बावजूद बिना मर्ज किए unwanted के रूप में बंद किया गया PR #27077](../../evidence/extra/t3code-4-pr-27077-rejected.png)

### 2.2 Managed Policy और दस्तावेज़ीकरण विरोधाभास (`भाग 7`)

24 नवंबर को, जब आलोचना बढ़ी, तो `@theo` ने X पर दावा किया कि T3 Code के पास उद्योग में सबसे अच्छी कॉर्पोरेट Managed Policy है (`"trivial to set up and turn off all telemetry"`) और बातचीत का डेटा डिस्क पर रहता है तथा `"never touches any of our servers"` ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715), [`2125191784859115766`](https://x.com/theo/status/2125191784859115766), [भाग 7](https://x.com/realchendahuang/status/2125391659492081947))।

[`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) और [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) का प्रत्यक्ष निरीक्षण इसके ठीक विपरीत दिखाता है:
1. **केवल एडमिन द्वारा कॉन्फ़िगरेशन:** डेस्कटॉप उपयोगकर्ताओं के पास अभी भी सेटिंग्स UI में कोई टॉगल नहीं है। Managed Policy के माध्यम से टेलीमेट्री अक्षम करने के लिए MDM/Group Policy की आवश्यकता होती है या एडमिन-संरक्षित पथों (macOS पर `/Library/Application Support/T3Code/policy.json`, Windows पर `C:\Program Files\T3Code\policy.json` या `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, Linux पर `/etc/t3code/policy.json`) में `policy.json` लिखना पड़ता है।
2. **होस्टेड वेब ऐप (`app.t3.codes`) ब्लाइंड स्पॉट:** `docs/user/telemetry.md` स्पष्ट रूप से स्वीकार करता है कि ब्राउज़र ऐप सर्वर एनवायरनमेंट वेरिएबल्स नहीं पढ़ता, Managed Policy को अनदेखा करता है, ट्रेसिंग के साथ बिल्ड होने पर कनेक्शन ट्रेस भेजता है, और `"has no relay tracing toggle"`।
3. **सर्वर नीति से बाहर मोबाइल ऐप्स:** सर्वर एनवायरनमेंट वेरिएबल्स और Managed Policy `"do not disable mobile tracing"`।
4. **`Publish agent activity` ऑप्ट-आउट को अनदेखा करता है:** जब होस्ट पर सक्षम किया जाता है, तो प्रोजेक्ट शीर्षक, थ्रेड शीर्षक, मॉडल नाम और लाइव गतिविधि स्थिति T3 Connect रिले पर जाती है — और `"The telemetry opt-out does not disable it."` (इसके अतिरिक्त, विफल Axiom स्पैन और मोबाइल क्रैश लॉग `"can quote a value the app was handling"`, जबकि `Agent feedback` 16 KB तक के वार्तालाप संदेश संलग्न कर सकता है।)

![आधिकारिक docs/user/telemetry.md इस बात की पुष्टि करते हुए कि होस्टेड वेब ऐप में कोई टॉगल नहीं है, मोबाइल Managed Policy से बाहर है, और एजेंट गतिविधि प्रकाशन टेलीमेट्री ऑप्ट-आउट को अनदेखा करता है](../../evidence/05-telemetry-cant-disable.png)

![macOS, Windows, और Linux में एडमिन-संरक्षित सिस्टम पथों को सूचीबद्ध करता आधिकारिक docs/user/managed-policy.md](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

### 2.3 25 नवंबर के स्पष्टीकरण का 2 घंटे के भीतर खंडन (`भाग 11`)

25 नवंबर की सुबह, `@theo` ने एक सार्वजनिक टेलीमेट्री निर्यात ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)) के साथ एक लंबा स्पष्टीकरण ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) पोस्ट किया, जिसमें तीन दृढ़ आश्वासन दिए गए — जिसके बाद एक उत्तर में ऑप्ट-आउट होने पर स्थानीय ट्रैकिंग लेखन से इनकार किया गया ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([भाग 11](https://x.com/realchendahuang/status/2125394810559426993)):

- **"Never collected file paths":** 90 मिनट बाद, Julius ने **PR #42450** मर्ज किया, जिसमें स्वीकार किया गया कि रिले-डिलीवर किए गए वेबहुक रन पूरे निष्पादन स्पैन को Axiom में निर्यात करते थे — जिसमें `git.cwd` (**पूर्ण वर्कस्पेस पाथ, OS उपयोगकर्ता नाम, और रिपॉज़िटरी नाम**) ले जाने वाले Git स्पैन शामिल थे।
- **"Environment variables always disabled telemetry cleanly":** **PR #42376** ने पुष्टि की कि पहले से मौजूद प्रोसेस से लॉन्च किए जाने पर Windows डेस्कटॉप ने सहेजे गए उपयोगकर्ता `T3CODE_TELEMETRY_ENABLED=false` एनवायरनमेंट वेरिएबल्स को अनदेखा कर दिया, जबकि **PR #42464** ने पुष्टि की कि macOS/Linux फर्स्ट-लॉन्च रिले ट्रेसिंग शेल डिस्कवरी से पहले मूल्यांकित हुई, जिससे पूरे रन के लिए `~/.zshrc` ऑप्ट-आउट अनदेखे रहे। (`DesktopShellEnvironment.ts` अभी भी `T3CODE_OTEL_SDK_DISABLED` को फ़ॉरवर्ड करना छोड़ देता है।)
- **"No tracking files written when opted out" और "Claude hashes were broken":** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (पंक्ति 149) अभी भी स्टार्टअप पर बिना शर्त `getTelemetryIdentity` को कॉल करता है, स्थानीय इंस्टॉल ID लिखता है और `~/.codex/auth.json` तथा `~/.claude.json` को पढ़कर हैश करता है। इस बीच, `@theo` के ~100MB निर्यात (`6,056,594` बाइट्स संपीड़ित, `95,789` ईवेंट) के gzip हेडर की जाँच से उनके ट्वीट से 20 मिनट पहले उत्पन्न एक मूल फ़ाइल नाम `events.clean.jsonl` सामने आया — फिर भी इसमें 20 अक्तूबर को ठीक उसी SHA-256 हैश से **4 अलग मशीनों** (`installId`) को जोड़ने वाले **264 लाइव Claude खाता रिकॉर्ड**, साथ ही अक्षरशः निजी प्रॉक्सी मॉडल (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`) मौजूद थे।

![PR #42450 इस बात की पुष्टि करते हुए कि रिले-ट्रिगर किए गए रन पहले उपयोगकर्ता नाम और रेपो नाम वाले git.cwd पूर्ण वर्कस्पेस पाथ Axiom में निर्यात करते थे](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 यह स्वीकार करते हुए कि Windows डेस्कटॉप ने सहेजे गए उपयोगकर्ता T3CODE_TELEMETRY_ENABLED=false एनवायरनमेंट वेरिएबल्स को अनदेखा किया](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 यह स्वीकार करते हुए कि macOS फर्स्ट-लॉन्च रिले ट्रेसिंग ने पूरे सत्र के लिए ~/.zshrc ऑप्ट-आउट को अनदेखा किया](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Theo के सार्वजनिक events.clean.jsonl डंप का फ़ोरेंसिक ऑडिट जिसमें 4 मशीनों को जोड़ते 264 Claude रिकॉर्ड और अक्षरशः कस्टम प्रॉक्सी मॉडल दिख रहे हैं](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

### 2.4 छह घंटे का पोस्ट-GDPR रातोंरात स्प्रिंट (`भाग 12`)

24 नवंबर की रात को एक औपचारिक EU GDPR शिकायत दर्ज होने के बाद, रातोंरात आपातकालीन PRs ने चार और गहरे गोपनीयता खुलासे सामने लाए ([भाग 12](https://x.com/realchendahuang/status/2125395501663281198)):

1. **2.2M/घंटा IP-टैग्ड रिले स्पैन (`PR #42380`):** स्वीकार किया कि Axiom को निर्यात किया गया प्रत्येक रिले अनुरोध स्पैन—लगभग **2.2 मिलियन स्पैन प्रति घंटा, 30 दिनों तक संग्रहीत**—`user.id` के ठीक बगल में `client.address` (`cf-connecting-ip` से कॉलर IP) और `user_agent.original` लॉग करता था (यह भी नोट करते हुए कि Cloudflare के 1% Workers इनवोकेशन लॉग अलग रहे)। मर्ज होने के साढ़े तीन घंटे बाद भी, `@theo` उत्तर दे रहे थे कि IP पहले ही हटा दिए गए थे।
2. **टूटा हुआ खाता विलोपन (`PR #42285` और `PR #42430`):** स्वीकार किया कि Clerk में किसी उपयोगकर्ता को हटाने से पहले PlanetScale रिले पंक्तियाँ और सक्रिय Cloudflare टनल यथावत रह जाती थीं, जब तक कि एक आने वाले गोपनीयता विलोपन अनुरोध के लिए **हाथ से लिखे SQL और मैन्युअल टनल टियरडाउन** की आवश्यकता नहीं पड़ी।
3. **मोबाइल पुश लीक (`PR #42459` और `PR #41859`):** Android FCM सूचनाएँ हर पुश पर Google को प्लेनटेक्स्ट Clerk `user_id` मान भेजती थीं; iOS पुश अनुरोध स्पैन/त्रुटियाँ टोकन ले जाने वाले पूर्ण डिवाइस पुश URL लॉग करती थीं।
4. **मिश्रित "गुमनाम" फ़ीडबैक (`PR #42466`):** स्वीकार किया कि कथित तौर पर गुमनाम `agent.feedback` ईवेंट्स को पहचाने गए `installId` ईवेंट्स और पूर्ण होस्ट फ़िंगरप्रिंट्स (OS, आर्किटेक्चर, कच्चा WSL डिस्ट्रो) के साथ उसी HTTP POST में बैच किया गया था, जो `docs/user/telemetry.md` का खंडन करता है। इस बीच, `privacy-policy.astro` 6 अक्तूबर से अपरिवर्तित रहा।

![PR #42380 यह खुलासा करते हुए कि रिले स्पैन ने Axiom में 30 दिनों तक 2.2M स्पैन/घंटा की दर से user.id के बगल में वास्तविक कॉलर IP पते और User-Agent लॉग किए](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 यह स्वीकार करते हुए कि खाता विलोपन पहले रिले पंक्तियों और सक्रिय Cloudflare टनल को पीछे छोड़ देता था जब तक कि एक गोपनीयता विलोपन अनुरोध के लिए हस्तलिखित SQL की आवश्यकता नहीं पड़ी](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 यह स्वीकार करते हुए कि Android FCM पुश ने Google को कच्चे Clerk user_id मान भेजे](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 यह स्वीकार करते हुए कि गुमनाम फ़ीडबैक को installId और होस्ट फ़िंगरप्रिंट्स के साथ उसी POST में बैच किया गया था](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

---

## 3. स्थानीय स्टोरेज, प्रोसेस मॉनिटरिंग, गार्डरेल बायपास और अघोषित सुरक्षा पैच (भाग 2, 3, 13)

> **गहन तकनीकी ऑडिट:** अक्षरशः SQLite प्रूनिंग SQL, Rust `sysinfo` कॉल, `ClaudeAdapterV2.ts` अनुमति पंक्तियाँ, और पूर्ण `SECURITY.md` सीमा विश्लेषण [**डॉसियर 02: स्थानीय सुरक्षा, मूक कोड-निष्पादन बायपास, और अघोषित सुरक्षा ऑडिट**](../dossiers/02-local-safety-and-security-audit.md) में मौजूद हैं।

### 3.1 नकली SQLite थ्रेड विलोपन और पूर्ण-मशीन प्रोसेस स्कैनिंग (`भाग 2`)

जब कोई उपयोगकर्ता साइडबार में किसी थ्रेड को हटाता है, तो पुष्टिकरण संवाद (`useThreadActionMenu.ts`) वादा करता है: `"This permanently clears conversation history for this thread."` वास्तव में, `ThreadDeletion.ts` केवल `statev2.sqlite` में एक `"thread.deleted"` ईवेंट जोड़ता है, और `ProjectionMaintenance.ts` पिछले ईवेंट्स को बनाए रखते हुए `thread.created` तथा नवीनतम स्ट्रीम ईवेंट्स (`MAX(newer.sequence)`) को छूट देता है। उपयोगकर्ताओं ने रिपोर्ट किया कि `statev2.sqlite` तीन सप्ताह में **25.9 GB** (90% "हटाए गए" थ्रेड्स), छह सप्ताह में **41.6 GB**, और सात सप्ताह में **33 GB** तक फूल गया — जिससे **Issue #17845** (और **#28903**) 10 अक्तूबर से अनसुलझा पड़ा रहा ([भाग 2](https://x.com/realchendahuang/status/2125160473176023486))।

![Issue #17845 जो रिपोर्ट करता है कि स्थायी रूप से हटाए गए थ्रेड्स statev2.sqlite के अंदर बने रहते हैं और डिस्क को दसियों गीगाबाइट तक फुला देते हैं](../../evidence/10-issue17845-fake-delete.png)

एक बैकग्राउंड Rust हेल्पर, `t3-resource-monitor` (**Issue #11222**, `with_cmd(UpdateKind::Always)` के साथ `ProcessesToUpdate::All` को कॉल करने वाला `native/resource-monitor/src/main.rs`), डायग्नोस्टिक्स बंद होने पर भी हर 5 सेकंड में मशीन पर प्रत्येक प्रोसेस को स्कैन करता था — Windows पर शून्य ऑप्ट-आउट के साथ 440+ असंबद्ध ऐप्स और गेम्स पर ~280–300 स्थायी हैंडल खोलते हुए, जबकि दस्तावेज़ दावा करते थे कि सैंपलिंग केवल सक्रिय सब्सक्राइबर्स होने पर ही चलती है। केवल **24 नवंबर** को **PR #41889** ने पुष्टि की कि प्रोसेस डायग्नोस्टिक्स लाइव टेलीमेट्री और हिस्ट्री स्नैपशॉट्स में **पूर्ण प्रोसेस कमांड-लाइन तर्कों**—जिनमें अक्सर प्लेनटेक्स्ट API कुंजियाँ, डेटाबेस पासवर्ड और ऑथ टोकन होते हैं—को कैप्चर कर रहा था।

![मशीन पर हर प्रोसेस को स्कैन करते हुए t3-resource-monitor का दस्तावेज़ीकरण करने वाला Issue #11222](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

भाग 2 में सत्यापित अतिरिक्त स्थानीय दोषों में शामिल हैं:
- **कॉर्पोरेट होस्टनाम फ़ेविकॉन लीक:** फ्रंटएंड अनुरोधों ने आंतरिक होस्टनाम (उदा. `devbox.localdomain`) Google के फ़ेविकॉन API पर लीक किए (`PR #16950`, `PR #32657`)।
- **अनिवार्य स्टार्टअप नेटवर्क फ़ेच:** टेलीमेट्री अक्षम होने पर भी, सर्वर स्टार्टअप बिना किसी ऑप्ट-आउट के [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) से संगतता मैनिफ़ेस्ट को बिना शर्त फ़ेच करता है (**Issue #36479**)।
- **अनुमोदन और नीति बायपास:** पूर्ण-पहुँच और WSL/Tailscale अनुमोदन/नीति बायपास सुधार (`PR #21806`, `PR #27322`)।
- **1.7x Claude कोटा खपत और 136x बिजली की खपत:** Agent SDK के माध्यम से Claude को चलाने पर नवंबर की शुरुआत तक 5-घंटे का कोटा सामान्य गति से **1.7x** तेज़ी से समाप्त हुआ (`Issue #7338`, `Issue #24649`, 81 टिप्पणियाँ); GPU/पावर बग्स ने समतुल्य Electron खपत की **136x** खपत की — जिसमें एक MacBook का 19-कोर GPU **60W** पर अटक गया जिससे बैटरी 78 मिनट में ख़त्म हो गई और वेब टैब बंद करने के बाद भी **18W** खर्च होता रहा (`Issue #3143`, `Issue #40581`)।

### 3.2 52-दिन का मूक `git push --force` बनाम मॉडल गोपनीयता फ़िल्टर को 21 घंटे में हटाना (`भाग 3`)

**3 अक्तूबर** से—**Issue #15353** ([टिप्पणी](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)) में **52–53 दिनों** से अधिक समय तक—Claude Auto मोड ने खतरनाक कमांड्स को चुपचाप निष्पादित किया (`requiresClaudeApproval` के false होने पर `ClaudeAdapterV2.ts` `"allow"` पर शॉर्ट-सर्किट हो जाता था)। शून्य कस्टम नियमों के साथ भी, जब Claude के क्लासिफ़ायर ने `git push --force origin main` को दो बार ब्लॉक किया और तीसरे प्रयास को मैन्युअल अनुमोदन के लिए ऊपर भेजा, तो T3 Code ने बिना किसी UI संवाद के इसे चुपचाप स्वीकृत कर दिया और `"source": "user_temporary"` लॉग किया। दो सामुदायिक फ़िक्स PR (`#15360`, `#35207`) बॉट्स द्वारा स्वतः बंद किए जाने तक बिना समीक्षा के पड़े रहे, जबकि `#40692` लंबित रहा ([भाग 3](https://x.com/realchendahuang/status/2125201882687881378))।

![52 दिनों से अधिक समय से खुला Issue #15353 जो दिखाता है कि Claude Auto मोड बिना पूछे चुपचाप git push --force को स्वीकृत कर देता है](../../evidence/11-issue15353-auto-force-push.png)

इसके विपरीत, **22 नवंबर** को **Issue #40948** ने नोट किया कि नए मॉडल `@theo` के सार्वजनिक टेलीमेट्री लीडरबोर्ड [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) पर दिखाई नहीं दे रहे थे क्योंकि `PR #29001` ने रिपोर्टिंग को एक श्वेतसूची तक सीमित कर दिया था। **21 घंटों** के भीतर, `@theo` के खाते के तहत **PR #41237** मर्ज हुआ, जिसमें स्पष्ट रूप से उल्लेख किया गया कि Theo ने इस हटाने का अनुरोध किया था — जिससे `ollama/acme-internal` और एंटरप्राइज़ `acme-azure-deployment` नाम अक्षरशः एनालिटिक्स को भेजे जाने लगे।

![Issue #40948 के 21 घंटे बाद मर्ज किया गया PR #41237 जो slopalytics.com के लिए मॉडल फ़िल्टरिंग को हटाता है](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

### 3.3 शून्य सुरक्षा परामर्श, मूक भेद्यता पैच और `SECURITY.md` (`भाग 13`)

25 नवंबर तक, `pingdotgg/t3code` का [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) टैब **0 प्रकाशित परामर्शों** पर खड़ा है ([भाग 13](https://x.com/realchendahuang/status/2125395980354994414))। फिर भी मेंटेनरों ने मौजूदा उपयोगकर्ताओं को सूचित किए बिना उच्च-गंभीरता वाले पैच चुपचाप मर्ज किए:
- **मर्ज किए गए मूक सुरक्षा सुधार:** `PR #39483` (डिवाइस अनुमोदन से पहले रिले `jti`/`nonce` के माध्यम से `ServerSecretStore` पाथ ट्रैवर्सल), `PR #41756` (क्रॉस-डोमेन एंटरप्राइज़ GitHub/GitLab टोकन लीक), `PR #41886`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41757` और `PR #42386` (अनसैंडबॉक्स्ड डेस्कटॉप ब्राउज़र पूर्वावलोकन और पॉपअप आइसोलेशन), और `PR #42504` (~3,000-पंक्तियों का पैच जिसने अंततः अविश्वसनीय रेपो कॉन्फ़िग्स के लिए पुष्टिकरण प्रॉम्प्ट जोड़े जो पहले बिना अनुमोदन के स्थानीय कमांड चलाते थे)।
- **अनसुलझे / खुले सुरक्षा आइटम:** `Issue #26489` (बाहरी पाथ ट्रैवर्सल/सिमलिंक जोखिम), `PR #36216`, `PR #23428`, `PR #33144`, और `PR #30997` (Windows लॉन्चर `externalLauncher.ts` जो `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` चलाता है जिसे AVG/Avast द्वारा `IDP.HELU.PSE96` के रूप में फ़्लैग किया गया)।
- **जल्दबाज़ी में बनाया गया [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) (`PR #38812`, `PR #41942`):** वर्कस्पेस के बाहर OS-व्यापी `filesystem:read`, iOS/LAN पर सादे HTTP परिवहन, और समझौता किए गए रिले साइनिंग की के माध्यम से पूर्ण मशीन टेकओवर को भेद्यता के बजाय **इच्छित डिज़ाइन सीमाएँ** घोषित करता है, जबकि [`https://ingest.t3.codes/`](https://ingest.t3.codes/) क्लोज़्ड-सोर्स बना हुआ है (`2125370330244128924`)।

![बिना Security Advisory जारी किए ServerSecretStore पाथ ट्रैवर्सल को चुपचाप पैच करता PR #39483](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![मैलवेयर के रूप में फ़्लैग किए गए Windows Base64 EncodedCommand PowerShell लॉन्च के लिए खुला सुधार PR #30997](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md जो स्पष्ट रूप से OS-व्यापी रीड्स, iOS मनमाने HTTP और रिले-कुंजी मशीन टेकओवर को इच्छित सीमाओं के रूप में चिह्नित करता है](../../evidence/extra/x-post05-4-security-md-intended.jpg)

---

## 4. Google Antigravity ToS जोखिम और बिना एन्क्रिप्शन वाला T3 Connect रिले (भाग 4, 5)

> **गहन तकनीकी ऑडिट:** पूर्ण `cliproxyApi.ts` हेडर मैप्स (`PR #33800`), `AntigravityAcpSupport.ts`, `contracts/src/settings.ts`, और `ManagedEndpointProvider.ts` पंक्ति संदर्भ [**डॉसियर 03: Google Antigravity ToS स्पूफ़िंग, `PR #33800`, और T3 Connect रिले आर्किटेक्चर**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) में मौजूद हैं।

### 4.1 Google Antigravity हेडर स्पूफ़िंग, नकली `SSH_CONNECTION` और 3-मिनट के बैन (`भाग 4`)

T3 Code का आधिकारिक [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) भुगतान करने वाले उपयोगकर्ताओं को आश्वस्त करता है: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* जब उपयोगकर्ताओं ने **Issue #40713** में बैन की सूचना दी, तो एक मेंटेनर ने Antigravity के बैकएंड को कॉल करने या टोकन के पुन: उपयोग से इनकार किया और दावा किया कि सभी अनुरोध Google के आधिकारिक CLI से उत्पन्न हुए हैं — इससे पहले कि डेवलपर्स (`schlessera`) ने T3 Code की अपनी स्रोत फ़ाइलों का उपयोग करके इस दावे का खंडन किया ([भाग 4](https://x.com/realchendahuang/status/2125213397507858657)):

1. **स्पूफ़्ड User-Agent, कीचेन निष्कर्षण और `v1internal` कॉल्स ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)):** स्थानीय फ़ाइलों, `@napi-rs/keyring`, या Windows Credential Manager (`advapi32.dll` पर `ffi-rs` के माध्यम से `CredReadW`) से Google OAuth क्रेडेंशियल निकालता है, Google की आंतरिक क्लाइंट स्ट्रिंग को हार्डकोड करता है, और सीधे Google के अप्रलेखित `v1internal` बैकएंड पर `POST` भेजता है ([पंक्तियाँ 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476))। Google के कर्मचारियों ने [आधिकारिक डेवलपर फ़ोरम](https://discuss.ai.google.dev/t/185992) पर पुष्टि की कि [Google Antigravity ToS](https://antigravity.google/terms) का अनुभाग 6 तृतीय-पक्ष टूल्स को बैकएंड से सीधे पूछताछ करने के लिए क्रेडेंशियल निकालने या पुन: उपयोग करने से प्रतिबंधित करता है:

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

2. **नकली `SSH_CONNECTION` इंजेक्शन और खाता क्रॉस-टॉक ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)):** चूँकि Google का CLI एक लॉगिन को OS कीचेन के अंदर अलग रखता है, इसलिए T3 CLI को स्थानीय स्तर पर प्लेनटेक्स्ट टोकन फ़ाइलें लिखने के लिए धोखा देने हेतु एक जाली `SSH_CONNECTION` एनवायरनमेंट वेरिएबल इंजेक्ट करता है। जब Google ने 24 नवंबर को उस फ़ॉलबैक को हटाते हुए अपना CLI अपडेट किया, तो **Issue #41973** ने पुष्टि की कि खाता A के प्रॉम्प्ट चुपचाप खाता B पर रूट हो गए:

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **नए खाते पर 3-मिनट का बैन (`Issue #41536`) और क्लाइंट स्पूफ़िंग (`PR #26876`):** 23 नवंबर को, **Issue #41536** ने दस्तावेज़ित किया कि **शून्य प्रॉक्सी** चलाने वाले—केवल T3 Code के भीतर प्रबंधित Antigravity का उपयोग करने वाले—नए खरीदे गए `$20` Google AI सब्सक्रिप्शन को **सेटअप के 3 मिनट बाद, उसके पहले ही संदेश** पर बैन कर दिया गया (Google व्यक्तिगत खातों को केवल एक अपील का अवसर देता है; मेंटेनरों ने चेतावनी जोड़े बिना इसे डुप्लिकेट कहकर बंद कर दिया)। इससे पहले, `@theo` ने व्यक्तिगत रूप से मॉडल श्वेतसूचियों को बायपास करने के लिए T3 Code को `"zed"` के रूप में छद्मवेश देने वाला **PR #26876** (`AntigravityAcpSupport.ts`) मर्ज किया था। और `@theo` द्वारा 23 नवंबर को `T3 Code -> Antigravity binary ✅` आरेख बनाने ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) तथा उपयोगकर्ता `@Only_21Mil` का दूसरा Google AI Ultra खाता अक्षम होने पर CLIProxy को दोष देने के बावजूद ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397)), मर्ज किया गया [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) मूल रूप से स्पूफ़ किए गए `claude-code/2.1.273`, `grok-cli/1.0.77`, और `antigravityUserAgent` हेडर्स के साथ [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) हब पोलिंग को जोड़ता है।

![antigravityUsageLimits.ts द्वारा स्पूफ़ किए गए Google क्लाइंट हेडर्स को हार्डकोड करना और अप्रलेखित v1internal बैकएंड को कॉल करना](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts द्वारा OS कीचेन स्टोरेज को बायपास करने के लिए नकली SSH_CONNECTION एनवायरनमेंट वेरिएबल इंजेक्ट करना](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 जो बिना प्रॉक्सी वाले नए $20 Google खाते को सेटअप के तीन मिनट बाद पहले ही संदेश पर बैन किए जाने और डुप्लिकेट के रूप में बंद किए जाने का दस्तावेज़ीकरण करता है](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 जो Antigravity, xAI और Claude के लिए CLIProxyAPI हब पोलिंग को सीधे T3 Code में जोड़ता है](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

### 4.2 T3 Connect: शून्य एंड-टू-एंड एन्क्रिप्शन और OVH TLS-टर्मिनेशन गेटवे (`भाग 5`)

**T3 Connect में शून्य एंड-टू-एंड एन्क्रिप्शन है — प्रत्येक प्रॉम्प्ट, स्रोत फ़ाइल और टर्मिनल आउटपुट तकनीकी रूप से T3 को प्लेनटेक्स्ट में दिखाई देता है** ([भाग 5](https://x.com/realchendahuang/status/2125218189596676555))। वर्तमान में, [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) T3 के अपने Cloudflare खाते के भीतर Cloudflare Tunnels और DNS रिकॉर्ड प्रावधानित करता है (`06_t3-connect.md`)। शून्य पेलोड एन्क्रिप्शन के साथ TLS Cloudflare के एज पर समाप्त हो जाता है; Workers Route संलग्न करने से बिना किसी कोड संपादन और बिना किसी क्लाइंट अलर्ट के सारा ट्रैफ़िक कैप्चर हो जाता है।

नए-डिवाइस अनुमोदन ([`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419) में जोड़ा गया `requireConnectDeviceApproval`) डिफ़ॉल्ट रूप से **`false`** पर सेट है। जैसा कि [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) स्वीकार करता है, एक लीक हुई रिले साइनिंग कुंजी या समझौता किया गया क्लाउड खाता सीधे लिंक की गई मशीन पर सत्र बना सकता है — जो एक स्थानीय शेल के बराबर है। जब **Issue #32098** ने म्यूचुअल ऑथ और E2E एन्क्रिप्शन का अनुरोध किया, तो एक मेंटेनर ने यह कहते हुए इसे बंद कर दिया कि पूर्ण E2E बहुत बड़ा बदलाव है; चर्चाएँ `#21286` और `#37831` अनुत्तरित रहीं, और 25 नवंबर को `@theo` ने E2E एन्क्रिप्शन को असंभव घोषित कर दिया (`2125370330244128924`)।

चूँकि Cloudflare Tunnels का खर्च **$25,000 प्रति माह** तक पहुँच गया था, इसलिए `@theo` ने ट्रैफ़िक को T3 द्वारा किराए पर लिए गए OVH Hillsboro गेटवे (`gw.t3coderelay.com`) पर माइग्रेट करने के लिए **PR #32945** खोला, जहाँ T3 का अपना Caddy TLS समाप्त करता है और एक Unix सॉकेट पर प्लेनटेक्स्ट को Go `yamux` प्रॉक्सी को अग्रेषित करता है — अभी भी शून्य E2E एन्क्रिप्शन के साथ। इस बीच, [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) अनुपस्थित E2E एन्क्रिप्शन का खुलासा किए बिना या गैर-प्रतिधारण (non-retention) गारंटी दिए बिना `"encrypted network transport"` का वादा करता है।

![कोर मेंटेनर द्वारा Issue #32098 में स्वीकार करना कि चोरी हुआ क्लाउड खाता या रिले कुंजी लिंक की गई मशीनों को नियंत्रित कर सकती है जबकि E2E एन्क्रिप्शन को बाहर रखा गया](../../evidence/15-connect-no-e2e.jpg)

![Theo का PR #32945 जो $25k मासिक Cloudflare बिल का उल्लेख करता है और T3 Connect को स्व-होस्टेड OVH गेटवे पर ले जाता है जहाँ Caddy TLS समाप्त करता है](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

---

## 5. व्यावसायिक लेखा-जोखा, निवेशक हितों का टकराव, प्रायोजक और 77,000-स्टार फ़नल (भाग 6, 8, 17, 18)

> **गहन तकनीकी ऑडिट:** पूर्ण राजस्व/रडार उद्धरण, `infra/relay/src/observability.ts` Axiom कॉन्फ़िग, और संपूर्ण `GitHubStarPrompt.tsx` विश्लेषण [**डॉसियर 04: व्यावसायिक लेखा-जोखा, निवेशक हितों का टकराव, प्रायोजक स्टैक और 77k-स्टार इंजन**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) में मौजूद हैं।

### 5.1 $800,000+ खर्च और 31.7T-टोकन/दिन ($10.19M/दिन) कंप्यूट रडार (`भाग 8`)

17.24 दिनों में 1,151 ट्वीट्स में, `@theo` ने T3 Code का उल्लेख **162 बार (14.1%)** किया, जबकि अपने तीन पुराने भुगतान वाले व्यवसायों—`T3 Chat`, `UploadThing`, और [`https://ping.gg/`](https://ping.gg/)—का उल्लेख **0 बार** किया। 12 नवंबर को, उन्होंने मुफ़्त MIT क्लाइंट पर अपनी जेब से **$800k+** खर्च करने की पुष्टि की ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267), [भाग 8](https://x.com/realchendahuang/status/2125392410763239723))।

बदले में, `ingest.t3.codes` में प्रवाहित होने वाली टेलीमेट्री ने एक रीयल-टाइम कंप्यूट रडार बनाया जो 18 नवंबर को **31.7 ट्रिलियन टोकन/दिन**—समतुल्य API खर्च में **$10.19 मिलियन/दिन** (लगभग **$10.2M/दिन** के शिखर पर)—तथा सटीक बाज़ार हिस्सेदारी (`99%` सब्सक्रिप्शन-समर्थित, Codex/Claude/Antigravity में `~98.5%`, ओपन-वेट परीक्षण हिस्सेदारी `15%` से गिरकर `6%` और 0.5% से कम प्रॉम्प्ट्स) को ट्रैक करता था। जब एक टिप्पणीकार ने 23 नवंबर को हिस्सेदारी का अनुमान लगाया, तो `@theo` ने उनके एनालिटिक्स तक पहुँच न होने के लिए उनका मज़ाक उड़ाया (`2124682906132181482`)।

यह रडार सीधे लाभ में बदल गया: एकल GPT-6.2 Astra बेंचमार्क पर खर्च किए गए **$300k+ के असीमित मुफ़्त OpenAI अर्ली-एक्सेस टोकन** (`2122760447103484410`), Google बेयर-मेटल बेंचमार्किंग और DeepMind जुड़ाव (हालाँकि `@theo` का यह दावा कि DeepMind के `@PatrickToulme` ने `"many PRs"` मर्ज किए, `pingdotgg/t3code` के git लॉग के विपरीत है जो **1 कमिट**, `PR #31158` दिखाता है), और निवेशकों की पूछताछ (`"multiple investors have asked me about this"`, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417))।

![Theo का आंतरिक T3 Code एनालिटिक्स डैशबोर्ड जो 31.7 ट्रिलियन टोकन और $10.19M समतुल्य दैनिक API खर्च दिखाता है](../../evidence/17-theo-31t-tokens-10m-day.png)

![patrick-toulme द्वारा फ़िल्टर किया गया pingdotgg/t3code कमिट इतिहास जो "many PRs" के बजाय केवल 1 कमिट (#31158) दिखाता है](../../evidence/extra/p3-2-patrick-only-1-commit.png)

### 5.2 एंजेल-निवेशक टकराव (`भाग 6`) और प्रायोजक/कोटा पाखंड (`भाग 17`)

- **Vibe Kanban और Daytona टकराव ([भाग 6](https://x.com/realchendahuang/status/2125385742243520653)):** 16 नवंबर (`2122201981167251877`) को, `@theo` ने खुलासा किया कि वे **Vibe Kanban** के निवेशक और योगदानकर्ता थे—जो बंद होने से पहले T3 Code के UI की ओर मुड़ा था—फिर उन्होंने उस UI का मज़ाक उड़ाते हुए कहा कि यह `"for running out of runway and killing your business"` के लिए बढ़िया है। 18 नवंबर (`2123011578090127499`) को, उन्होंने T3 Code के भीतर सशुल्क क्लाउड सैंडबॉक्स की चर्चा करने (`2119705561679933806`) के ठीक नौ दिन बाद प्रतिस्पर्धियों के साथ क्लाउड-सैंडबॉक्स कंपनी **Daytona** में निवेश करने की पुष्टि की।
- **रिले में एम्बेडेड प्रायोजक स्टैक ([भाग 17](https://x.com/realchendahuang/status/2125411353393553744)):** `@theo` की मई 2023 YouTube प्रायोजक सूची (`1657488850472804353`) के दो प्रायोजक—**Clerk** और **Axiom**—T3 Code के क्लाउड ऑथ और 30-दिन के IP-टैग्ड रिले लॉगिंग को संचालित करते हैं। अप्रैल 2024 में, Vercel के CEO `@rauchg` ने पुष्टि की कि Vercel केवल Theo को प्रायोजित करता है (`1776260839965863965`), और Theo ने बाद में प्रायोजक विशिष्टता खंडों को स्वीकार किया (`uv179CTAK-w`)। वे Cursor और Cline में भी एक एंजेल निवेशक हैं।
- **Codex 0% दोहन और 10-खाते वाला CLIProxyAPI विरोधाभास:** 21 अगस्त 2026 को, `@theo` ने Codex के 0% कोटा ग्रेस विंडो से आगे **$800+** निकालने की डींग मारी जबकि T3 की कर्मचारी `@maria_rcks` ने शून्य से आगे टर्न लूप करने के लिए *Endless* शिप किया; 22 अगस्त को विरोध के बाद, दोनों ने पोस्ट हटा दिए और Maria ने आशा जताई कि Codex खातों को बैन कर देगा (`2090972426876129658`), जिसके बाद OpenAI ने हार्ड-कटऑफ रिग्रेशन (`openai/codex#45444`) लागू किया। अक्तूबर में, `@theo` ने **7 Claude + 3 Codex खातों** को पूल करते हुए 452-स्टार वाला एक Gist (`59a521d2ee8d70aaf90e280c175072af`, 12+ मशीनों पर `555%` कोटा; साथ ही 1.1M प्रॉक्सी अनुरोधों में `$14,662` / `$15k` Ultra उपज की डींग और Grok Bot + `$100` Claude सेटअप ट्यूटोरियल लिखना) प्रकाशित किया — जिसे T3 Code का अपना `docs/user/faq.md` बैन के जोखिम के कारण बिल्ट-इन स्विचिंग से इनकार करने के ठीक बाद लिंक करता है (`"Early apologies if it gets you banned 💀"`)।

![Theo द्वारा सार्वजनिक रूप से Vibe Kanban के बंद होने का मज़ाक उड़ाने से पहले उसमें निवेश और योगदान करने का खुलासा](../../evidence/18-theo-vibe-kanban.png)

![Theo का 452-स्टार वाला cliproxy-setup.md Gist जो 12+ कंप्यूटरों में 555% कोटे पर 7 Claude और 3 Codex खातों को पूल करता है](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 जो 0% कोटे पर कार्य के बीच सक्रिय टर्न रोकने वाले वैश्विक रिग्रेशन का दस्तावेज़ीकरण करता है](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

### 5.3 T3 Code 25 दिनों में 30k से 77k स्टार्स पर कैसे पहुँचा (129 वॉचर्स) (`भाग 18`)

*"Github has a fake star problem"* (`2048122499834036340`, जिसमें चेतावनी दी गई थी कि स्टार्स `"to trick VCs into investing"` का एक उपकरण बन गए हैं) प्रकाशित करने के छह महीने बाद, `@theo` ने स्वयं तीन PR लिखे और स्वयं मर्ज किए ([भाग 18](https://x.com/realchendahuang/status/2125416210120765799)):
1. **30 अक्तू. (`PR #27832`):** भेजे गए 5 प्रॉम्प्ट के बाद शीर्ष-दाएँ कोने में एक स्टार प्रॉम्प्ट जोड़ा ([`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) में `PROMPTS_BEFORE_ASKING = 5`, जो 6ठे प्रॉम्प्ट पर ट्रिगर होता है), जिससे तुरंत दैनिक स्टार्स **10x** हो गए (`2117065834267136469`) और GitHub Trending पर **+3,094 स्टार्स/दिन** तक पहुँच गए (`2117172614158508400`)।
2. **3 नव. (`PR #29922` और `PR #29987`):** जब उपयोगकर्ता एजेंट टर्न की प्रतीक्षा कर रहे होते हैं तो **30-सेकंड विंडो आइडल डिटेक्शन** (`IDLE_MS = 30_000`) में अपग्रेड किया, और ब्राउज़र रीडायरेक्ट को `sourceControl.star` RPC से बदल दिया — जो 160-कणों वाला कंफ़ेटी चलाने से पहले सीधे **होस्ट सर्वर के GitHub क्रेडेंशियल** के माध्यम से `PUT user/starred/pingdotgg/t3code` फ़ायर करता है।
3. **बायपास की गई समीक्षा और मनमाना-रेपो स्टारिंग बग:** Macroscope ने `PR #29922` को `Needs Human Approval` के रूप में फ़्लैग किया; `@theo` ने फिर भी स्वयं मर्ज कर दिया। 6 नवंबर को, `zhilsinger` ने साझा-होस्ट क्रेडेंशियल अपारदर्शिता (`GitHubStarPrompt.tsx#L115` में स्वीकार किया गया) और इस तथ्य को नोट करते हुए `Request changes` दर्ज किया कि [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) कभी भी `pingdotgg/t3code` को पिन नहीं करता है:

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

`source-control:write` वाला कोई भी क्लाइंट होस्ट के क्रेडेंशियल का उपयोग करके मनमाने रिपॉज़िटरी को स्टार कर सकता है। `zhilsinger` की समीक्षा **19 दिनों** तक शून्य प्रतिक्रिया के साथ अनदेखी पड़ी रही जबकि रेपो 30k से 77k स्टार्स (129 वॉचर्स) पर पहुँच गया।

![Theo का 2 नवंबर का चार्ट जो इन-ऐप स्टार प्रॉम्प्ट शिप करने के तुरंत बाद दैनिक स्टार्स में लगभग लंबवत 10x उछाल का जश्न मनाता है](../../evidence/20-star-10x-cliff.png)

![डेवलपर zhilsinger की PR #29922 पर Request Changes समीक्षा जो साझा-होस्ट स्टारिंग और सर्वर क्रेडेंशियल के माध्यम से मनमाने-रेपो स्टारिंग के बारे में चेतावनी देती है और 19 दिनों तक अनुत्तरित रही](../../evidence/21-pr29922-zhilsinger-review.png)

![packages/source-control-github/src/server/driver.ts की पंक्तियाँ 60–99 जो pingdotgg/t3code को पिन करने में विफल रहती हैं](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

---

## 6. शासन व्यवस्था, फ़ोर्क-स्क्रैपिंग बॉट्स, ट्रेडमार्क रिकॉर्ड, 1,151-ट्वीट डेटासेट और इतिहास (भाग 9, 10, 14, 15, 16)

> **गहन तकनीकी ऑडिट:** पूर्ण शासन स्वचालन कोड (`.github/scripts/pr-limits.cjs`), USPTO TSDR ऑडिट, और संपूर्ण `n = 1,151` कार्यप्रणाली व शाब्दिक तालिकाएँ [**डॉसियर 05: रिपॉज़िटरी शासन व्यवस्था, फ़ोर्क-स्क्रैपिंग बॉट्स, ट्रेडमार्क अतिरेक और ऐतिहासिक अभिलेख**](../dossiers/05-governance-trademark-and-history.md) और [**डॉसियर 06: 1,151-ट्वीट मात्रात्मक फ़ोरेंसिक डेटासेट (7–24 नवंबर 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md) में मौजूद हैं।

### 6.1 आंतरिक गति बनाम बाहरी शत्रुता (`भाग 9`) और फ़ोर्क-स्क्रैपिंग (`भाग 10`)

- **500 कमिट्स/दिन और `yolo merges` बनाम `CONTRIBUTING.md` ([भाग 9](https://x.com/realchendahuang/status/2125392916369871309)):** `@theo` ने **500 कमिट्स/दिन** शिप करने (`2120741101250515322`), **700 एजेंट्स** चलाने, Julius द्वारा एक एजेंट लूप के माध्यम से PRs को बैच-मर्ज करने, `"my yolo merges breaking shit sometimes"` (`2119951615679672513`), और `"free content"` के लिए मशीन वाइप होने का जोखिम उठाने (`2119993037971730879`) का वर्णन किया। बाहरी उपयोगकर्ताओं के लिए, **PR #5551** ने Plan मोड को दबा दिया (`"Reality check for those upset"`, 10 डाउनवोट), **PR #9190** ने कॉन्टेक्स्ट रिंग छिपा दी (16 डाउनवोट, रेपो का उच्चतम), **PR #33131** ने एक बेतुके AI सारांश के साथ Plan मोड हटा दिया, **Issue #33639** में शिकायत करने वाले उपयोगकर्ता को `"uninstall our software"` / `"ungrateful prick"` मिला (और अगली सुबह **PR #41572** अस्वीकार हो गया), `CONTRIBUTING.md` की शुरुआत `.github/VOUCHED.td` में मॉडल बैन और सार्वजनिक निंदा बैन (रेपो में 174 `unwanted` लेबल) के साथ `"here's my advice: Don't"` से हुई, और X योगदानकर्ताओं को उन्हें फ़ॉलो न करने के लिए डाँटा गया (`2120821423438778667`), `/btw` हटाने की धमकी दी गई (`2120853340078874923`), या कहा गया कि एनोटेटेड स्क्रीनशॉट PRs से बेहतर हैं (`2123754193530053110`)।
- **सार्वजनिक `@bot` स्क्रैपिंग बनाम प्रतिस्पर्धी मज़ाक ([भाग 10](https://x.com/realchendahuang/status/2125393641665671593)):** 8 नवंबर को, `@theo` ने `@MiaAI_lab` के फ़ोर्क फ़ीचर पर `"Okay I'm stealing this"` उत्तर दिया और 30 सेकंड बाद सार्वजनिक उत्तरों में `@bot` को भेजकर Opus 5.5 के माध्यम से उनके फ़ोर्क को `beebox` पर स्क्रैप करवाया (`2119240810202034645`); 13 नवंबर को, उन्होंने प्रतिद्वंद्वी टूल्स से प्रशंसित फ़ीचर्स क्लोन करने के लिए फिर से `@bot` को भेजा (`2121017649652269120`)। फिर भी 24 नवंबर को उन्होंने साइडबार टैब्स जोड़ने के लिए Claude Code Desktop का मज़ाक उड़ाया (`2124987957803446311`)। आलोचकों के ख़िलाफ़, उन्होंने फ़ॉलोअर्स से `"demonetize them"` के लिए Community Notes का उपयोग करने का आह्वान किया (`2120238923884696025`) और एक X ऑटो-ब्लॉकर बॉट चलाने की पुष्टि की (24 नव. को ~100 खाते ब्लॉक किए गए, `2125077510941802509`)।

![CONTRIBUTING.md जो बाहरी PRs को हतोत्साहित करता है और .github/VOUCHED.td में सार्वजनिक निंदा बैन का विवरण देता है](../../evidence/22-contributing-vouched-ban.png)

![Issue #33639 में Theo का उत्तर जिसमें @bermudi को अनइंस्टॉल करने के लिए कहा गया और उसे कृतघ्न कहा गया](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo द्वारा "Okay I'm stealing this" उत्तर देना और 30 सेकंड बाद एक डेवलपर के फ़ोर्क को T3 Code में स्क्रैप करने के लिए @bot को भेजना](../../evidence/23-stealing-fork-bot.png)

### 6.2 ट्रेडमार्क ऑडिट: 0 USPTO पंजीकरण और पूर्वव्यापी `PR #41898` (`भाग 15`)

`@vildanden_ai` (`2125275487404761555`) से मिले एक सुराग के बाद, USPTO TSDR डेटाबेस की जाँच से पता चलता है कि `T3 Code`, `T3 Tools`, या `T3 Connect` के लिए **0 पंजीकरण** हैं ([भाग 15](https://x.com/realchendahuang/status/2125408163273080950))। T3 Tools Inc. का एकमात्र USPTO आवेदन (`PING LABS`, सीरियल [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) अंततः फ़रवरी 2025 में अस्वीकार कर दिया गया और 19 मई 2025 को `ABANDONED` चिह्नित किया गया, जबकि तृतीय पक्षों के पास पहले से ही वर्ग 42 और 9 में `T3` सॉफ़्टवेयर/SaaS पंजीकरण मौजूद हैं (`EquipmentShare` Reg. `7795672` / सीरियल [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations` Reg. `3324707`)।

[GitHub की ट्रेडमार्क नीति](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) के तहत, ट्रेडमार्क टेकडाउन दर्ज करने वाली वाणिज्यिक कंपनियों को झूठी गवाही के दंड के अधीन एक संघीय या अंतर्राष्ट्रीय पंजीकरण संख्या प्रदान करनी होती है (अपंजीकृत अपवाद केवल सरकारी निकायों और गैर-लाभकारी संस्थाओं पर लागू होते हैं)। जिस क्षण `@theo` ने `@DDdxx666` के GitHub खाते को हटाने की धमकी दी, वे GitHub का फ़ॉर्म भरने में असमर्थ थे। केवल **17 घंटे बाद** (24 नवंबर को `12:21 BJ`), `@theo` ने पूर्वव्यापी रूप से `TRADEMARK.md` (`"whether registered or unregistered"`) जोड़ते हुए **PR #41898** मर्ज किया और 94 सेकंड बाद इसका हवाला दिया (`2125082769395220688`) — सितंबर 2024 में `"unenforceable trademark dispute"` के लिए WordPress का मज़ाक उड़ाने (`1839261574005141945`) और तीन घंटे पहले 24 नवंबर को डेवलपर्स से `"get a better lawyer"` कहने (`2125026423769555308`) के बावजूद।

![बैन की धमकी के 17 घंटे बाद मर्ज किया गया PR #41898, जो पंजीकृत या अपंजीकृत अधिकारों का दावा करते हुए पूर्वव्यापी रूप से TRADEMARK.md जोड़ता है](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md मर्ज करने से तीन घंटे पहले Theo द्वारा डेवलपर्स को "get a better lawyer" कहना](../../evidence/extra/p1-5-x-get-better-lawyer.png)

### 6.3 1,151-ट्वीट मात्रात्मक डेटासेट (`भाग 14`) और दो-वर्षीय ऐतिहासिक रिकॉर्ड (`भाग 16`)

7 नवंबर से 24 नवंबर 2026 तक सभी **1,151 क्रमिक `@theo` X पोस्ट** (`17.24` दिन; `66.8/दिन`; `75.6%` उत्तर; `2.7 मिनट` माध्य अंतराल) का विश्लेषण एक चरम शक्ति विषमता को मापता है ([भाग 14](https://x.com/realchendahuang/status/2125404517697290438)):
- **बड़ी टेक कंपनियों के अधिकारी, लैब कर्मचारी और शीर्ष KOLs (`n = 43` सख्त प्राथमिक-`@` / `n = 60`–`62` व्यापक):** **0.0%** लक्षित गाली-गलौज या व्यक्तिगत अपमान (`30.0%`–`32.6%` विनम्र धन्यवाद)। Gemini 4 Carbon और GPT-6.2 Astra की कठोर आलोचनाओं को नरम किया गया या उनके बाद सार्वजनिक माफ़ी माँगी गई (`2123255588570501585`, `2123995323123343869`)।
- **सामान्य डेवलपर्स और आलोचक (`n = 766` सख्त प्राथमिक-`@` / `n = 749` व्यापक):** शत्रुता/गाली-गलौज बढ़कर **8.0%** (`61/766`) हो गई, जिसमें `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`), `"dance on the graves of the 'local ai' community"` (`2120733839832273025`), `"Linux larpers"` (`2124298216271499605`), बार-बार `stupid bitch` पोस्ट (`2120599310211703274`), और जेल/RSD मज़ाक (`2122865897375400066`) शामिल हैं।
- **25-घंटे की चीनी-फ़ोर्क संकट विंडो (`n = 132`):** सीधे व्यक्तिगत अपमान `3.6%` आधाररेखा से **4.0x** उछलकर **14.4%** (`19/132`) हो गए, जिसमें `"chinese tech twitter is the biggest fucking cesspit"` कहना और चीनी ऑडिट पाठकों को `"fucking braindead"` कहना (`2125177503526588877`) शामिल है — एक अन्य उपयोगकर्ता को विश्वास न जलाने का उपदेश देने (`2124449493513068862`) के 24 घंटे से भी कम समय बाद।

![फ़ोरेंसिक चार्ट 1: 17 दिनों में 1,151 ट्वीट — 75.6% उत्तर और 162 बनाम 0 उत्पाद उल्लेख](../../evidence/charts/theo-chart-1-overview.png)

![फ़ोरेंसिक चार्ट 2: 24-घंटे की PST लय (233 देर-रात पोस्ट) और 17-दिन के पोस्टिंग बार](../../evidence/charts/theo-chart-2-rhythm.png)

![फ़ोरेंसिक चार्ट 3: चयनात्मक विनम्रता — 0.0% VIP अपशब्द बनाम 8.0% डेवलपर शत्रुता और 14.4% संकट उछाल](../../evidence/charts/theo-chart-3-double-standard.png)

![फ़ोरेंसिक चार्ट 4: 25-घंटे की चीनी-फ़ोर्क संकट विंडो का तीन-तरंग विभाजन](../../evidence/charts/theo-chart-4-cn-crisis.png)

![Theo द्वारा एक सामान्य टूल तुलना प्रश्न को कोट-ट्वीट करके लिखना कि इंजीनियर बड़े पैमाने पर बेरोज़गारी के लायक हैं](../../evidence/25-engineers-unemployment.png)

![Theo द्वारा चीनी टेक ट्विटर को गटर कहना और चीनी कोड ऑडिट पढ़ने वाले डेवलपर्स का अपमान करना](../../evidence/26-cn-cesspit.png)

दो वर्ष पीछे मुड़कर देखने पर एक आवर्ती पैटर्न की पुष्टि होती है ([भाग 16](https://x.com/realchendahuang/status/2125408843152953693)):
- **2024 फ़ोर्क मज़ाक:** मूल निर्माता के स्वभाव का मज़ाक उड़ाते हुए एक अन्य डेवलपर की VS Code थीम के अपने फ़ोर्क का नाम [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) रखा।
- **2024 भारतीय डेवलपर उत्पीड़न और माफ़ी:** भारतीय ट्यूटोरियल चैनलों को निशाना बनाने वाले उनके वीडियो से उत्पीड़न भड़कने के बाद, उन्होंने चीनी टेक ट्विटर पर हमला करने से दो साल पहले, राष्ट्रीयता-आधारित हमलों की निंदा करते हुए [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) अपलोड किया।
- **अक्तूबर 2025 FFmpeg बाउंटी:** कैमरे पर गाली दी और एक FFmpeg मेंटेनर को बाहर करने के लिए **$20,000 बाउंटी** की पेशकश की ([रिकॉर्ड](https://www.youtube.com/watch?v=1oQ3KMeaH04)), फिर Windscribe के $21k प्रति-प्रस्ताव, VLC के सार्वजनिक विरोध, और FFmpeg मेलिंग-लिस्ट की निंदा के बाद इसे वापस ले लिया व पोस्ट हटा दिए।
- **25 नवंबर 2026 (~4:00 AM) हटाई गई क्लोज़्ड-सोर्स धमकी:** उस रात T3 Code को क्लोज़्ड-सोर्स करने की धमकी दी क्योंकि उपयोगकर्ता ओपन सोर्स के लायक नहीं थे; 3,000 लाइक्स पार करने के बाद सूर्योदय से पहले ट्वीट को चुपचाप हटा दिया।

---

## 7. व्यावहारिक जोखिम न्यूनीकरण और सुधार प्लेबुक

यदि किसी व्यक्तिगत या कॉर्पोरेट मशीन पर T3 Code इंस्टॉल है, तो एनवायरनमेंट फ़्लैग, OS-स्तरीय नेटवर्क ब्लॉकिंग, Managed Policy, स्थानीय SQLite/क्रेडेंशियल स्वच्छता और क्लाउड टोकन निरसन में गहन रक्षा (defense-in-depth) लागू करें।

### 7.1 एनवायरनमेंट वेरिएबल्स + OS-स्तरीय नेटवर्क ब्लॉकिंग (स्थानीय / डेस्कटॉप उपयोगकर्ता)

केवल एनवायरनमेंट वेरिएबल्स पर **निर्भर न रहें** (`PR #42376`, `PR #42464`, और `DesktopShellEnvironment.ts` `T3CODE_OTEL_SDK_DISABLED` को फ़ॉरवर्ड करना छोड़ देते हैं, जबकि `AnalyticsService.ts:149` अभी भी स्टार्टअप पर डिस्क पर पहचान आरंभ करता है)। शेल/उपयोगकर्ता वेरिएबल्स को OS-स्तरीय `/etc/hosts` ब्लॉक के साथ मिलाएँ:

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

Windows पर, **System Properties → Environment Variables** (User और System) में `T3CODE_TELEMETRY_ENABLED=false`, `T3CODE_OTEL_SDK_DISABLED=true`, और `OTEL_SDK_DISABLED=true` भी कॉन्फ़िगर करें तथा किसी भी बैकग्राउंड सेवा को रीबूट/रीस्टार्ट करें। `Issue #36479` के अनुसार ध्यान रखें कि फ़ायरवॉल/प्रॉक्सी नियमों द्वारा ब्लॉक न किए जाने पर सर्वर स्टार्टअप अभी भी `raw.githubusercontent.com` पर एक आउटबाउंड जाँच करता है।

### 7.2 प्रशासक Managed Policy (`macOS`, `Linux`, `Windows`)

[`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) के अनुसार टेलीमेट्री, T3 Connect टनल, वेबहुक कार्य, ब्राउज़र कुकी आयात और प्रीव्यू टनल को लॉक करने के लिए एक एडमिनिस्ट्रेटर-स्वामित्व वाली `policy.json` (या MDM/GPO समकक्ष) परिनियोजित करें:

| OS | मूल नीति / रजिस्ट्री | फ़ाइल पथ (`chmod 644` / root या Admin स्वामित्व) |
|---|---|---|
| **macOS** | `com.t3tools.t3code` के लिए Device Configuration Profile *(उपयोगकर्ता प्रोफ़ाइल अनदेखी की जाती हैं)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(प्रत्येक WSL डिस्ट्रो के अंदर अलग से परिनियोजित करें)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) या `HKLM\SOFTWARE\Policies\T3Tools\T3Code` के तहत `REG_SZ` `Policy` | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

`t3 policy check policy.json` से सत्यापित करें और प्रवर्तन जांचें, T3 Code को पूरी तरह से पुनरारंभ करें, और `t3 policy show` चलाएँ। **`docs/user/telemetry.md` में प्रलेखित ब्लाइंड स्पॉट्स याद रखें:** Managed Policy होस्ट किए गए `app.t3.codes` पर रिले ट्रेसिंग को **अक्षम नहीं करती**, मोबाइल ऐप ट्रेसिंग को **नियंत्रित नहीं करती**, और यदि पहले से चालू है तो `Publish agent activity` को **अक्षम नहीं करती**।

### 7.3 `statev2.sqlite` निरीक्षण और स्थानीय स्थिति साफ़ करना

चूँकि UI में थ्रेड्स हटाने से पिछले ईवेंट `~/.t3/userdata/statev2.sqlite` के अंदर बने रहते हैं (`Issue #17845`):

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

*(Windows पर, `statev2.sqlite`, `anonymous-id`, और `secrets` सहित `%USERPROFILE%\.t3\userdata\` का निरीक्षण करें और साफ़ करें।)*

### 7.4 Google Antigravity, T3 Connect, Clerk/Cloudflare और GitHub निरसन

1. **Google Antigravity:** अपने खाते के एकमात्र अपील अवसर की सुरक्षा के लिए T3-प्रबंधित Antigravity या CLIProxyAPI के माध्यम से व्यक्तिगत Google AI / Antigravity सब्सक्रिप्शन चलाना तुरंत बंद करें। `~/.t3/userdata/providers/antigravity/` और `~/.t3/tools/antigravity-acp/` को हटा दें।
2. **T3 Connect और क्लाउड डेटा विलोपन:** **Settings → Sharing & access** के अंतर्गत **Publish agent activity** को अक्षम करें, सभी स्थानीय मशीनों को अनलिंक करें (`t3` logout / unlink), और यदि आप कभी रिमोट एक्सेस को फिर से सक्षम करें तो `requireConnectDeviceApproval` चालू करें। `privacy-policy.astro` में प्रलेखित Clerk और T3 Tools के आधिकारिक गोपनीयता विलोपन संपर्क के माध्यम से पूर्ण खाता और रिले विलोपन का अनुरोध करें (ताकि `PR #42285` का Clerk डिलीशन वेबहुक PlanetScale रिले पंक्तियों और Cloudflare टनल को हटा दे)।
3. **GitHub टोकन और सीक्रेट रोटेशन:** **GitHub Settings → Applications / Authorized GitHub Apps** में T3 Code के GitHub OAuth / App प्राधिकरण को निरस्त करें (`driver.ts` के पास होस्ट-स्तरीय स्टारिंग अनुमतियाँ हैं)। किसी भी API कुंजी, डेटाबेस URL, या टोकन को रोटेट करें जो `PR #41889` से पहले `t3-resource-monitor` द्वारा प्रोसेस कमांड लाइनों पर कैप्चर किए गए हों, या Axiom को भेजे गए वेबहुक/रिले त्रुटियों के माध्यम से गए हों।

### 7.5 वैकल्पिक क्लाइंट

सामुदायिक अनुवर्ती उत्तरों में, डेवलपर्स ने अक्सर **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`), और **Cloudroom** को प्रमुखता दी ([विकल्प थ्रेड](https://x.com/realchendahuang/status/2125244977878036713))। किसी भी प्रतिस्थापन क्लाइंट को अपनाने से पहले स्वतंत्र रूप से सत्यापित करें: (1) डिफ़ॉल्ट-ऑफ़ टेलीमेट्री और साफ़ नेटवर्क कैप्चर, (2) थ्रेड हटाने पर वास्तविक `DELETE` + `VACUUM` या फ़ाइल विलोपन, (3) क्रेडेंशियल निष्कर्षण या हेडर स्पूफ़िंग के बिना सख्त आधिकारिक CLI डेलिगेशन, और (4) रिमोट टनल के लिए वास्तविक क्लाइंट-साइड एंड-टू-एंड एन्क्रिप्शन।

---

## 8. प्राथमिक स्रोत और 18-भाग मूल पोस्ट सूचकांक

> सभी भागों और स्क्रीनशॉट में प्रत्येक `SRC-001` से `SRC-206+` उद्धरण को मैप करने वाली मास्टर सारणीबद्ध संदर्भ शीट के लिए देखें [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md)

### मूल पोस्ट और संपूर्ण 18-भाग X सूचकांक (कालानुक्रमिक)

- मूल 1 (`"steal our code"` लेबल वाला होमपेज GitHub लिंक): https://x.com/realchendahuang/status/2125059292919394654
- मूल 2 (MIT फ़ोर्क नामकरण विवाद, Temu अपमान, और दोहरा मापदंड): https://x.com/realchendahuang/status/2125062675147448475
- भाग 1 (डिफ़ॉल्ट टेलीमेट्री, टूटा हुआ `"No telemetry"` वादा, अनसॉल्टेड क्रॉस-टूल हैशिंग): https://x.com/realchendahuang/status/2125153472450527440
- भाग 2 (SQLite नकली विलोपन, 5-सेकंड प्रोसेस स्कैनर, Plan मोड हटाना, `CONTRIBUTING.md` बैन): https://x.com/realchendahuang/status/2125160473176023486
- भाग 3 (Auto मोड मूक `git push --force`, 21-घंटे में गोपनीयता फ़िल्टर हटाना, 0 परामर्श, उपयोगकर्ताओं का अपमान): https://x.com/realchendahuang/status/2125201882687881378
- भाग 4 (Google Antigravity हेडर स्पूफ़िंग, नकली `SSH_CONNECTION`, नए खाते पर 3-मिनट का बैन): https://x.com/realchendahuang/status/2125213397507858657
- भाग 5 (T3 Connect में अनुपस्थित E2E एन्क्रिप्शन, Cloudflare Tunnel, स्व-होस्टेड OVH प्लेनटेक्स्ट गेटवे): https://x.com/realchendahuang/status/2125218189596676555
- भाग 6 (एंजेल-निवेशक टकराव: Vibe Kanban शटडाउन मज़ाक और Daytona सैंडबॉक्स टकराव): https://x.com/realchendahuang/status/2125385742243520653
- भाग 7 (Managed Policy `"turn off all telemetry"` दावा बनाम आधिकारिक दस्तावेज़ों के तीन ब्लाइंड स्पॉट): https://x.com/realchendahuang/status/2125391659492081947
- भाग 8 ($800k+ मुफ़्त-क्लाइंट व्यावसायिक लेखा-जोखा और 31.7T-टोकन / $10.19M दैनिक रडार): https://x.com/realchendahuang/status/2125392410763239723
- भाग 9 (500 कमिट्स/दिन, 700 एजेंट्स, `yolo merges` बनाम PRs को हतोत्साहित करना और फ़ॉलोअर गेटकीपिंग): https://x.com/realchendahuang/status/2125392916369871309
- भाग 10 (फ़ोर्क और प्रतिद्वंद्वियों को स्क्रैप करने के लिए `@bot` भेजना, ऑटो-ब्लॉकर बॉट, Community Notes विमुद्रीकरण): https://x.com/realchendahuang/status/2125393641665671593
- भाग 11 (25 नव. का स्पष्टीकरण रातोंरात PRs और 100MB डंप में 264 Claude रिकॉर्ड्स द्वारा 2 घंटे में खंडित): https://x.com/realchendahuang/status/2125394810559426993
- भाग 12 (GDPR के बाद के रातोंरात सुधार जिनमें 2.2M/घंटा IP लॉग, टूटा खाता विलोपन, पुश लीक, मिश्रित गुमनाम बैच सामने आए): https://x.com/realchendahuang/status/2125395501663281198
- भाग 13 (चीनी टेक ट्विटर को गटर कहते हुए चुपचाप अनसैंडबॉक्स्ड पूर्वावलोकन और बिना पूछे कमांड निष्पादन पैच करना): https://x.com/realchendahuang/status/2125395980354994414
- भाग 14 (1,151-ट्वीट मात्रात्मक विभाजन: बड़ी-टेक अधिकारियों के प्रति 0% गाली बनाम सामान्य डेवलपर्स के प्रति 8% शत्रुता): https://x.com/realchendahuang/status/2125404517697290438
- भाग 15 (T3 Code के लिए USPTO शून्य पंजीकरण और GitHub ट्रेडमार्क नीति आवश्यकताएँ): https://x.com/realchendahuang/status/2125408163273080950
- भाग 16 (आवर्ती इतिहास: `vsc-material-but-i-wont-sue-you`, भारतीय डेवलपर प्रतिक्रिया, $20k FFmpeg बाउंटी, हटाई गई क्लोज़्ड-सोर्स धमकी): https://x.com/realchendahuang/status/2125408843152953693
- भाग 17 (प्रायोजक स्टैक Clerk/Axiom, Codex 0% कोटा दोहन व विलोपन, 10-खाते वाला `CLIProxyAPI` Gist): https://x.com/realchendahuang/status/2125411353393553744
- भाग 18 (77k GitHub स्टार्स कैसे बने: होस्ट-क्रेडेंशियल API स्टार्स चलाने वाला 30-सेकंड आइडल टोस्ट और अनफ़िक्स्ड मनमाना-रेपो स्टारिंग): https://x.com/realchendahuang/status/2125416210120765799
- सामुदायिक विकल्प सूची: https://x.com/realchendahuang/status/2125244977878036713

### स्रोत कोड, PRs, Issues, नीतियाँ, और प्राथमिक प्रमाण

**टेलीमेट्री, गोपनीयता, और पोस्ट-GDPR रातोंरात पैच (भाग 1, 7, 11, 12)**

- आधिकारिक लैंडिंग डोमेन: https://t3.codes/
- डिफ़ॉल्ट PostHog टेलीमेट्री (PR #174): https://github.com/pingdotgg/t3code/pull/174
- होमपेज के `"No telemetry"` वादे को चुपचाप हटाना (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- ऑप्ट-आउट आसान बनाने से इनकार (Issue #1397) और टूटे-वादे की जाँच (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- स्व-होस्टेड `ingest.t3.codes` कच्चे-ईवेंट की प्रति (PR #15028) और क्रॉस-टूल अनसॉल्टेड हैशिंग (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- चार अस्वीकृत सामुदायिक ऑप्ट-आउट टॉगल PRs (`#13458` / `#16763` / `#21248` / `#27077`): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- टेलीमेट्री और पहचान स्रोत फ़ाइलें (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `telemetryId.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts
- आधिकारिक टेलीमेट्री और Managed Policy दस्तावेज़: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Theo की Managed Policy, स्पष्टीकरण, और कोई-ट्रैकिंग-फ़ाइल-नहीं के दावे + सार्वजनिक `events.clean.jsonl` निर्यात: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- पूर्ण वर्कस्पेस पाथ लीक (PR #42450) और Win/Mac अनदेखे ऑप्ट-आउट (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- 30 दिनों तक रखे गए 2.2M/घंटा IP लॉग (PR #42380), अधूरा खाता विलोपन (PR #42285 / #42430), मोबाइल पुश लीक (PR #42459 / #41859), और गुमनाम फ़ीडबैक बैचिंग (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**स्थानीय सुरक्षा, मूक सुरक्षा पैच, Antigravity, और T3 Connect (भाग 2, 3, 4, 5, 13)**

- नकली SQLite विलोपन (Issue #17845 / #28903), 5-सेकंड प्रोसेस मॉनिटर (Issue #11222), और कमांड-लाइन कैप्चर सुधार (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Google फ़ेविकॉन पर भेजे गए आंतरिक होस्टनाम (PR #16950 / #32657), अनिवार्य आउटबाउंड जाँच (Issue #36479 / `raw.githubusercontent.com`), अनुमति/नीति बायपास (PR #21806 / #27322), 1.7x Claude कोटा खपत (Issue #7338 / #24649), और बिजली खपत बग्स (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- Claude Auto मोड मूक `git push --force` (Issue #15353 और पुनरुत्पादन टिप्पणी) और सामुदायिक फ़िक्स PRs (`#15360` / `#35207` / `#40692`): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- `slopalytics.com` के लिए प्राइवेट मॉडल फ़िल्टरिंग को 21 घंटे में हटाना (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- खाली Security Advisories टैब, `SECURITY.md` (`PR #38812` / `#41942`), मर्ज किए गए मूक सुरक्षा सुधार (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`), और खुले सुरक्षा/लॉन्चर आइटम (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Antigravity FAQ गारंटी, Issue #40713 कोड खंडन, 3-मिनट का बैन (Issue #41536), खाता क्रॉस-टॉक (Issue #41973), श्वेतसूचीबद्ध संपादक स्पूफ़ (PR #26876), CLIProxyAPI हब PR #33800, Theo के शून्य-जोखिम/आरेख/CLIProxy टालमटोल पोस्ट, और स्रोत कोड: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Google Antigravity सेवा की शर्तें और आधिकारिक फ़ोरम प्रतिबंध: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- T3 Connect E2E अस्वीकृति (Issue #32098), डिफ़ॉल्ट-ऑफ़ `requireConnectDeviceApproval` (PR #36419), स्व-होस्टेड OVH Caddy गेटवे (PR #32945), रिले कोड, गोपनीयता नीति, और अनुत्तरित चर्चाएँ: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**व्यावसायिक लेखा-जोखा, निवेशक हितों का टकराव, प्रायोजक, और 77k स्टार्स (भाग 6, 8, 17, 18)**

- $800k+ खर्च, 31.7T-टोकन / $10.19M दैनिक डैशबोर्ड, 98.5% तीन-लैब हिस्सेदारी, एनालिटिक्स पलटवार, $300k+ मुफ़्त OpenAI अर्ली-एक्सेस टोकन, Patrick 1-कमिट PR #31158, निवेशक संपर्क, और `Ping.gg`: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- Vibe Kanban मज़ाक, Daytona निवेश प्रकटीकरण, और सशुल्क क्लाउड-सैंडबॉक्स योजना: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- YouTube प्रायोजक सूची, Vercel CEO पुष्टि, विशिष्टता वीडियो, Maria की विलोपन पोस्ट, `openai/codex#45444`, CLIProxyAPI ClickHouse/Ultra/GrokBot ट्वीट्स, CLIProxyAPI Gist, और FAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- "Fake star" VC वीडियो, 10x स्टार क्लिफ़, +3,094 ट्रेंडिंग पोस्ट, "missed 70k" पोस्ट, PR #27832 / #29922 / #29987, `GitHubStarPrompt.tsx`, और `driver.ts` मनमाना-रेपो स्टारिंग कोड: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**शासन व्यवस्था, ट्रेडमार्क, चयनात्मक विनम्रता, और पिछली घटनाएँ (भाग 9, 10, 14, 15, 16)**

- Plan मोड हटाना (PR #5551 / #33131), छिपी हुई प्रगति रिंग (PR #9190), Issue #33639 अपमान, अस्वीकृत PR #41572, `CONTRIBUTING.md`, और `.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 कमिट्स/दिन, `yolo merges`, `"nukes my machine = free content"`, फ़ॉलोअर-गेटकीपिंग PRs, `/btw` धमकी, और PR के बजाय स्क्रीनशॉट पोस्ट: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- फ़ोर्क-स्क्रैपिंग `@bot` आदेश, Claude Desktop मज़ाक, Community Notes विमुद्रीकरण आह्वान, और ऑटो-ब्लॉकर पुष्टि: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- USPTO TSDR रिकॉर्ड (`PING LABS` 97294243 परित्यक्त; EquipmentShare `T3` Reg. 7795672), GitHub ट्रेडमार्क नीति, पूर्वव्यापी `PR #41898`, बैन धमकी, ट्रिलियन-डॉलर ओपन-सोर्स उत्तर, `"aware of the legality"`, `"get a better lawyer"`, और पिछले ट्रेडमार्क ट्वीट्स: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- चयनात्मक विनम्रता प्रमाण (Google Neon माफ़ी व पुल, इंजीनियर बेरोज़गारी, स्थानीय AI कब्रें, Linux larpers, जेल/RSD धमकी, `stupid bitch` पोस्ट, चीनी टेक ट्विटर गटर, कोई माफ़ी नहीं, विश्वास न जलाने का उपदेश): https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- ऐतिहासिक प्रमाण (`vsc-material-but-i-wont-sue-you`, भारतीय डेवलपर माफ़ी वीडियो, $20k FFmpeg बाउंटी रिकॉर्ड): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04
