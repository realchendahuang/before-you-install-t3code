# T3 Code इंस्टॉल करने से पहले

<p align="center">
  <em>pingdotgg/t3code का एक स्वतंत्र, साक्ष्य-प्राथमिक सार्वजनिक लेखा-जोखा — नस्लीय दोहरे मानदंडों, भ्रामक टेलीमेट्री, गंभीर सुरक्षा खामियों और व्यावसायिक हेरफेर का दस्तावेजीकरण।</em>
</p>

<p align="center">
  <a href="https://temu3code.com/"><strong>🌐 इंटरैक्टिव दृश्य जाँच खोलें (18 भाषाएँ)</strong></a>
  ·
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 दृश्य प्रमाण</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 प्राथमिक स्रोत</strong></a>
</p>

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
  <strong>वैश्विक सामुदायिक संस्करण:</strong>
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

![T3 Code इंस्टॉल करने से पहले](../../evidence/00-cover-en.png)

> [!IMPORTANT]
> **स्वतंत्र सार्वजनिक-अभिलेख जाँच · 18 भाषाएँ**
>
> कोई टेलीमेट्री नहीं। कोई नस्लीय भेदभाव नहीं। नीचे का हर दावा शब्दशः सार्वजनिक बयानों, रिपॉज़िटरी कमिट्स, पुल रिक्वेस्ट, USPTO फाइलिंग और संग्रहित स्क्रीनशॉट से जुड़ा है।
>
> - **सत्यापित प्रदर्श:** 20 प्रदर्श (#00–#19)
> - **प्राथमिक साक्ष्य:** 109 दृश्य प्रमाण · 327 canonical URL
> - **अपस्ट्रीम जाँच:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **सुरक्षा एडवाइज़री:** 0 प्रकाशित GitHub एडवाइज़री

---

## यह 60 सेकंड में कैसे हुआ

एक सामुदायिक MIT फ़ोर्क पर नामकरण के एक विवाद ने नस्लीय दोहरे मानदंडों, छिपी टेलीमेट्री, खामोश सुरक्षा पैच और अनसुलझे आर्किटेक्चरल जोखिमों का एक पैटर्न उजागर किया।

1. **भेदभावपूर्ण चिंगारी** *(23 नवंबर 2026)* — एक उपयोगकर्ता ने चीनी डेवलपर के मुफ़्त MIT फ़ोर्क को आधिकारिक T3 Code समझ लिया, तो @theo ने उसे "चीनी नकल" और "Temu3 Code" कहा और GitHub खाता प्रतिबंध की धमकी दी — जबकि उनके पास 0 USPTO ट्रेडमार्क थे और 11 घंटे बाद उन्होंने सार्वजनिक रूप से खरबों-डॉलर की अमेरिकी लैब्स द्वारा MIT कोड कॉपी किए जाने का स्वागत किया।
2. **सोर्स कोड खोलना** *(24 नवंबर 2026)* — pingdotgg/t3code की पंक्ति-दर-पंक्ति जाँच से पता चला: "No telemetry" होमपेज वादे के पीछे डिफ़ॉल्ट-ऑन PostHog टेलीमेट्री भेजी जा रही थी; ingest.t3.codes पर बंद-स्रोत इवेंट रिटेंशन; ~/.codex और ~/.claude.json की बिना सॉल्ट वाली SHA-256 रीडिंग्स; 41.6 GB की फ़र्ज़ी SQLite डिलीशन; 52 दिनों तक चुपचाप रहने वाला git push --force बग; Google Antigravity हेडर स्पूफ़िंग; और शून्य-E2E प्लेनटेक्स्ट T3 Connect।
3. **2.26M+ व्यूज़, EU GDPR शिकायत और 6 घंटे की आपातकालीन तेज़ कार्रवाई** *(24–25 नवंबर, रातभर)* — पार्ट 1 ने 22.6 लाख व्यूज़ पार किए और EU GDPR शिकायत को जन्म दिया। रातभर में आपातकालीन रूप से भेजे गए PRs ने अनजाने में स्वीकार किया कि Axiom में 30 दिनों तक 2.2M/घंटा IP + User-Agent लॉग रखे जाते हैं, absolute git.cwd वर्कस्पेस पाथ लीक होते हैं, खाता डिलीशन टूटा हुआ है, और Windows/macOS opt-outs को नज़रअंदाज़ किया जाता है।
4. **आज भी क्या अनसुलझा है** *(25 नवंबर (`ca81b7b9`) और जारी)* — ca81b7b9 तक +259 कमिट्स को ट्रैक करने से आंशिक टेलीमेट्री पैच की पुष्टि हुई — साथ ही अनसुधारित स्टार्टअप ID राइट्स, शून्य UI टॉगल, 0 GitHub Security Advisories, बिना पिन किए मनमाने रिपॉज़िटरी को स्टार करना, 30 दिनों तक चलने वाले प्लेनटेक्स्ट --lan शेल कुकीज़, रद्द न किए जा सकने वाले Bearer टोकन, और अविश्वसनीय रिपॉज़िटरी खोलने पर SSH_AUTH_SOCK एक्सपोज़र (#19) अनसुलझे रहे।

---

## सभी 20 सत्यापित प्रदर्श (#00–#19)

नीचे प्रत्येक प्रदर्श इस रिपॉज़िटरी में अपनी समर्पित, तालिका-रहित स्थानीयकृत प्रदर्श फ़ाइल और वेब पोर्टल पर अपने साझा करने योग्य दृश्य कार्ड से जुड़ा है। चालू ट्रैकिंग क्रमिक रूप से जारी रहेगी (#20, #21, ...)।

### भाग I · नस्लीय भेदभाव, दोहरे मानदंड और पैटर्न

*0 USPTO ट्रेडमार्क होने के बावजूद "चीनी नकल" और "Temu3 Code" टेकडाउन धमकियों से लेकर 1,151-ट्वीट मात्रात्मक विभाजन (0.0% VIP अपशब्द बनाम 8.0% डेवलपर शत्रुता बनाम 14.4% चीन-विरोधी संकट-वृद्धि) और दो वर्षों में बार-बार दोहराए गए इतिहास तक।*

- **#00 · [मूल विवाद: "Steal Our Code", फोर्क के नामकरण पर धमकियाँ और नस्लीय दोहरे मानदंड](../../cases/hi/00-origin-fork-dispute-and-double-standard.md)** — `📌 सार्वजनिक अभिलेख`
  केवल 11 मिनट के भीतर, @theo ने एक चीनी डेवलपर के मुफ़्त MIT फोर्क को "Chinese knockoff" और "Temu3 Code" कहा और GitHub अकाउंट बंद कराने की धमकी दी — और फिर 11 घंटे से भी कम समय बाद खरबों डॉलर की अमेरिकी कंपनियों द्वारा MIT कोड की नकल करने का सार्वजनिक रूप से स्वागत किया।
  [पूरा प्रदर्श खोलें](../../cases/hi/00-origin-fork-dispute-and-double-standard.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [1,151-ट्वीट मात्रात्मक डेटासेट: चुनिंदा विनम्रता और 4.0× चीन-विरोधी संकट उछाल](../../cases/hi/14-1151-tweet-quantitative-double-standard.md)** — `📌 सार्वजनिक अभिलेख`
  **7–24 नवंबर, 2026** की 1,151 लगातार `@theo` X पोस्टों का संपूर्ण मात्रात्मक विश्लेषण एक स्पष्ट शक्ति-असंतुलन साबित करता है: 20 बिग-टेक अधिकारियों और लैब कर्मचारियों के प्रति 0.0% अपशब्द बनाम आम डेवलपर्स के प्रति 8.0% शत्रुता — जो 25 घंटे के चीनी-फोर्क विवाद के दौरान 4.0× बढ़कर 14.4% हो गई।
  [पूरा प्रदर्श खोलें](../../cases/hi/14-1151-tweet-quantitative-double-standard.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [GitHub बैन की धमकी के पीछे USPTO में शून्य ट्रेडमार्क, और 17 घंटे बाद पूर्वव्यापी `TRADEMARK.md`](../../cases/hi/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 सार्वजनिक अभिलेख`
  जब @theo ने "trademark infringement" के आधार पर एक चीनी डेवलपर का GitHub अकाउंट बंद कराने की धमकी दी, तब T3 Tools Inc. के पास `T3 Code`, `T3 Tools` या `T3 Connect` के लिए USPTO में 0 रजिस्ट्रेशन थे — और ठीक 17 घंटे बाद `TRADEMARK.md` पूर्वव्यापी रूप से merge कर दिया गया।
  [पूरा प्रदर्श खोलें](../../cases/hi/15-zero-uspto-trademarks-and-retroactive-policy.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [दो वर्षों का ऐतिहासिक पैटर्न: राष्ट्रीयता-आधारित बैकलैश, $20k FFmpeg बाउंटी और मिटाई गई धमकियाँ](../../cases/hi/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 सार्वजनिक अभिलेख`
  नवंबर 2026 का चीनी-फोर्क विवाद कोई अलग-थलग चूक नहीं था — 2024 से 2026 तक के सार्वजनिक रिकॉर्ड राष्ट्रीयता-लक्षित उत्पीड़न, ओपन-सोर्स बुलिंग, अन्य डेवलपर्स के UI का मज़ाक उड़ाने और बैकलैश के बाद की डिलीशन के एक दोहराए जाने वाले चक्र का दस्तावेज़ीकरण करते हैं।
  [पूरा प्रदर्श खोलें](../../cases/hi/16-two-year-pattern-of-bullying-and-deletions.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125408843152953693)

### भाग II · भ्रामक टेलीमेट्री और गोपनीयता उल्लंघन

*कैसे "No telemetry. Full stop." ने डिफ़ॉल्ट PostHog अपलोड, बंद-स्रोत ingest.t3.codes रिटेंशन, क्रॉस-टूल क्रेडेंशियल हैशिंग, Managed Policy के अंधे क्षेत्र और 2.2M/घंटा IP-टैग वाले Axiom लॉग छिपाए।*

- **#01 · [होमपेज पर "No Telemetry" के वादे के पीछे डिफ़ॉल्ट टेलीमेट्री](../../cases/hi/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 आंशिक रूप से पैच किया गया`
  जबकि इसके होमपेज ने "No telemetry. Unless you opt in. Full stop." का वादा किया था, T3 Code ने डिफ़ॉल्ट PostHog ट्रैकिंग सक्षम की, कच्ची प्रतियाँ क्लोज़्ड-सोर्स `ingest.t3.codes` के ज़रिए रूट कीं, बाहरी `~/.codex` और `~/.claude.json` क्रेडेंशियल्स को हैश किया, और समुदाय के चार ऑप्ट-आउट PR अस्वीकार किए।
  [पूरा प्रदर्श खोलें](../../cases/hi/01-default-telemetry-and-cross-tool-tracking.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [मैनेज्ड पॉलिसी का विरोधाभास: चार प्रलेखित टेलीमेट्री ब्लाइंड स्पॉट](../../cases/hi/07-managed-policy-blind-spots.md)** — `🔴 अनसुधारित`
  @theo ने दावा किया था कि T3 Code के पास "best corporate managed policy system" है, जिससे "trivial to turn off all telemetry" हो जाता है — जिसका सीधा खंडन T3 Code के अपने `docs/user/telemetry.md` और `docs/user/managed-policy.md` से होता है।
  [पूरा प्रदर्श खोलें](../../cases/hi/07-managed-policy-blind-spots.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [25 नवंबर का स्पष्टीकरण रातों-रात आए PR और 100 MB डंप से 2 घंटे के भीतर खारिज](../../cases/hi/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 आंशिक रूप से पैच किया गया`
  25 नवंबर की सुबह, @theo ने गोपनीयता के तीन व्यापक आश्वासन दिए और 100 MB का टेलीमेट्री डंप जारी किया — तीनों दावे दो घंटे के भीतर उनकी ही टीम के PR और उसी gzip किए गए डंप से खारिज हो गए।
  [पूरा प्रदर्श खोलें](../../cases/hi/11-nov25-clarification-contradicted-in-2-hours.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [जीडीपीआर के बाद छह घंटे की रातभर ब्लिट्ज़: 2.2 मिलियन/घंटा आईपी लॉग्स और टूटा हुआ अकाउंट डिलीशन](../../cases/hi/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 आंशिक रूप से पैच किया गया`
  24 नवंबर को यूरोपीय संघ में औपचारिक जीडीपीआर शिकायत दर्ज होने के बाद, रातभर में लगाए गए छह घंटे के आपातकालीन पैचों ने अनजाने में चार और गहरे प्राइवेसी खुलासे सामने ला दिए — जिनमें सबसे बड़ा था 30 दिनों तक रखे गए, आईपी-टैग वाले 2.2 मिलियन प्रति घंटा Axiom स्पैन।
  [पूरा प्रदर्श खोलें](../../cases/hi/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125395501663281198)

### भाग III · उत्पाद दोष और गंभीर सुरक्षा खामियाँ

*41.6 GB की फ़र्ज़ी SQLite डिलीशन, 5-सेकंड की OS प्रोसेस स्कैनिंग, 52 दिन चुपचाप चलने वाला git push --force, 3 मिनट के बैन कराने वाली Google Antigravity ToS स्पूफ़िंग, शून्य-E2E प्लेनटेक्स्ट T3 Connect, 0 Security Advisories, और ca81b7b9 की LAN/Bearer/SSH_AUTH_SOCK कमज़ोरियाँ।*

- **#02 · [नकली SQLite थ्रेड डिलीशन (41.6 GB का फुलाव) और 5 सेकंड में पूरे OS का प्रोसेस स्कैनिंग](../../cases/hi/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 आंशिक रूप से पैच किया गया`
  "हमेशा के लिए डिलीट करें" पर क्लिक करने से भी `statev2.sqlite` में पूरा बातचीत इतिहास बरकरार रहा (जिससे स्थानीय डिस्क 41.6 GB तक फूल गईं), जबकि एक बैकग्राउंड Rust मॉनिटर हर 5 सेकंड में हर OS प्रोसेस और पूरी कमांड लाइन को स्कैन करता रहा, बिना किसी ऑप्ट-आउट के।
  [पूरा प्रदर्श खोलें](../../cases/hi/02-fake-sqlite-delete-and-process-scanner.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 दिनों तक ख़ामोश `git push --force` बनाम मॉडल प्राइवेसी फ़िल्टर हटाने में 21 घंटे](../../cases/hi/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 अनसुधारित`
  52+ दिनों तक T3 Code में एक बग खुला रहा जहाँ Claude Auto मोड बिना कोई प्रॉम्प्ट दिखाए ख़ामोशी से `git push --force origin main` मंज़ूर कर देता था — वहीं एक प्राइवेसी व्हाइटलिस्ट हटाने में उसे सिर्फ़ 21 घंटे लगे, ताकि निजी मॉडल @theo के सार्वजनिक लीडरबोर्ड पर दिखने लगें।
  [पूरा प्रदर्श खोलें](../../cases/hi/03-silent-force-push-vs-21h-filter-removal.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity हेडर स्पूफ़िंग, फ़र्ज़ी `SSH_CONNECTION` और 3 मिनट में अकाउंट बैन](../../cases/hi/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 अनसुधारित`
  अपने FAQ में ToS अनुपालन की गारंटी देने के बावजूद, T3 Code OS कीरिंग से क्रेडेंशियल निकालता है, `v1internal` के सामने Google के इंटरनल हेडर (`antigravity/hub/2.24.0`) स्पूफ़ करता है, और फ़र्ज़ी `SSH_CONNECTION` वैल्यू इंजेक्ट करता है — जिससे निजी Google सब्सक्रिप्शन तेज़ी से बैन की चपेट में आ जाते हैं।
  [पूरा प्रदर्श खोलें](../../cases/hi/04-antigravity-spoofing-and-3-minute-bans.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: शून्य एंड-टू-एंड एन्क्रिप्शन और प्लेनटेक्स्ट TLS-टर्मिनेशन गेटवे](../../cases/hi/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 अनसुधारित`
  T3 Connect से होकर गुज़रने वाला हर प्रॉम्प्ट, सोर्स फ़ाइल और टर्मिनल स्ट्रीम T3-नियंत्रित इंफ्रास्ट्रक्चर के भीतर प्लेनटेक्स्ट में समाप्त होता है — शून्य एंड-टू-एंड एन्क्रिप्शन और डिफ़ॉल्ट रूप से बंद डिवाइस अप्रूवल के साथ।
  [पूरा प्रदर्श खोलें](../../cases/hi/05-t3-connect-zero-e2e-plaintext-relay.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [शून्य GitHub Security Advisories, चुपचाप दिए गए high-severity पैच और जल्दबाज़ी में लिखा `SECURITY.md`](../../cases/hi/13-zero-security-advisories-and-silent-patches.md)** — `🔴 अनसुधारित`
  X पर चीनी सोर्स-कोड ऑडिटरों को खारिज करते हुए T3 Code ने चुपचाप high-severity कमज़ोरियों के फ़िक्स merge किए — जिनमें secret-store path traversal, क्रॉस-डोमेन token लीक और अविश्वसनीय repo से कमांड चलना शामिल है — और प्रकाशित GitHub Security Advisories की संख्या 0 बनी रही।
  [पूरा प्रदर्श खोलें](../../cases/hi/13-zero-security-advisories-and-silent-patches.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` गंभीर प्रमाणीकरण एवं रेपो निष्पादन ऑडिट: 30-दिन का प्लेनटेक्स्ट LAN शेल, रद्द न किए जा सकने वाले टोकन और `SSH_AUTH_SOCK` का खुला जोखिम](../../cases/hi/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 अनसुधारित`
  नवीनतम `main` HEAD (`ca81b7b9`, 25 नवंबर 14:49 CST) की पंक्ति-दर-पंक्ति जाँच ने पाँच सक्रिय सुरक्षा और विश्वसनीयता दोषों की पुष्टि की: 30-दिन की प्लेनटेक्स्ट `--lan` शेल कुकीज़ जिनमें `Origin` अनुपस्थित होने पर बायपास मौजूद है, रद्द न किए जा सकने वाले 30-दिन के Bearer टोकन, रीप्ले-योग्य `?wsTicket=` URL, `isIPv4` द्वारा `::1` टनल का खात्मा, और अविश्वसनीय रेपोज़ द्वारा विरासत में मिले `SSH_AUTH_SOCK` व `GITHUB_TOKEN` के साथ हुक्स/सबमॉड्यूल चलाया जाना।
  [पूरा प्रदर्श खोलें](../../cases/hi/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125494234614788390)

### भाग IV · व्यावसायिक हेरफेर और सामुदायिक धमकाना

*800k+ डॉलर / 31.7T-टोकन वाला दैनिक कंप्यूट रडार, एंजल-निवेशक हितों का टकराव (Vibe Kanban, Daytona), प्रायोजक स्टैक का ओवरलैप, 30-सेकंड आइडल पर होस्ट-क्रेडेंशियल से स्टार करना जिससे 77k स्टार मिले, @bot द्वारा फ़ोर्क-स्क्रैपिंग, और .github/VOUCHED.td प्रतिबंध।*

- **#06 · [एंजल-निवेशक हितों का टकराव: Vibe Kanban के बंद होने पर मज़ाक और Daytona से ओवरलैप](../../cases/hi/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 सार्वजनिक अभिलेख`
  कोड में खामियों से आगे बढ़कर, @theo की सार्वजनिक X पोस्टें उनके प्रतिस्पर्धी डेवलपर स्टार्टअप्स में एंजल निवेशक की भूमिका और T3 Code चलाने के बीच के तीखे टकरावों को दर्ज करती हैं।
  [पूरा प्रदर्श खोलें](../../cases/hi/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [$800,000+ का बिज़नेस लेजर और 31.7-ट्रिलियन-टोकन प्रतिदिन का कंप्यूट रडार](../../cases/hi/08-800k-spend-and-31t-token-radar.md)** — `📌 सार्वजनिक अभिलेख`
  डिफ़ॉल्ट रूप से चालू टेलीमेट्री कोई इंजीनियरिंग चूक नहीं थी: इसने 31.7T टोकन/दिन ($10.19M/दिन के बराबर API खर्च) वाले एक रीयल-टाइम इंटेलिजेंस रडार को फंड किया, जिसे $300k+ के मुफ़्त OpenAI अर्ली-एक्सेस टोकन और निवेशकों तक पहुँच में बदला गया।
  [पूरा प्रदर्श खोलें](../../cases/hi/08-800k-spend-and-31t-token-radar.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [आंतरिक `yolo merges` बनाम बाहरी सामुदायिक शत्रुता और `.github/VOUCHED.td` प्रतिबंध](../../cases/hi/09-yolo-merges-vs-community-hostility.md)** — `📌 सार्वजनिक अभिलेख`
  भीतर की ओर, T3 Code ने स्वचालित एजेंट लूप के ज़रिए प्रतिदिन 500 कमिट शिप किए और खुद माना कि "yolo merges breaking shit" — जबकि बाहर की ओर योगदानकर्ताओं से कहा गया "here's my advice: Don't", उपयोगकर्ताओं को `.github/VOUCHED.td` के ज़रिए निंदित किया गया, और इश्यू दर्ज करने वालों का अपमान किया गया।
  [पूरा प्रदर्श खोलें](../../cases/hi/09-yolo-merges-vs-community-hostility.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [सार्वजनिक `@bot` से फ़ोर्क-स्क्रैपिंग, प्रतिद्वंद्वियों का उपहास और आलोचकों का दमन](../../cases/hi/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 सार्वजनिक अभिलेख`
  प्रतिद्वंद्वियों द्वारा UI पैटर्न कॉपी करने का उपहास करते हुए, @theo ने एक डेवलपर के फ़ोर्क पर सार्वजनिक रूप से "Okay I'm stealing this" कहा और ठीक 30 सेकंड बाद उसका कोड स्क्रैप करने के लिए `@bot` भेज दिया — साथ ही ऑटो-ब्लॉकर तैनात किए और फ़ॉलोअर्स से आलोचकों का मॉनिटाइज़ेशन बंद कराने की अपील की।
  [पूरा प्रदर्श खोलें](../../cases/hi/10-fork-scraping-bot-and-critics-suppression.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [स्पॉन्सर स्टैक बाइंडिंग्स, Codex 0% कोटा एक्सप्लॉइट और 10-अकाउंट `CLIProxyAPI` पाखंड](../../cases/hi/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 सार्वजनिक अभिलेख`
  अनुपालन का उपदेश देते हुए और बैन के जोखिम के चलते बिल्ट-इन अकाउंट स्विचिंग से इनकार करते हुए, T3 Code अपने क्लाउड स्टैक में @theo के YouTube स्पॉन्सर (Clerk और Axiom) एम्बेड करता है — जबकि @theo खुद Codex के 0% कोटा बग का फायदा उठाने का डींग मार चुका है और उसने 10-अकाउंट वाला `CLIProxyAPI` पूलिंग Gist प्रकाशित किया था, जिसका सीधा लिंक T3 के FAQ में दिया गया है।
  [पूरा प्रदर्श खोलें](../../cases/hi/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2023-05-sponsor-roster) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [77,000-स्टार का फ़नल: 30-सेकंड आइडल पर होस्ट-क्रेडेंशियल से स्टारिंग और अनफ़िक्स्ड आर्बिट्ररी-रेपो बग](../../cases/hi/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 अनसुधारित`
  GitHub स्टार्स को "to trick VCs into investing" का ज़रिया कहकर निंदा करने के छह महीने बाद, @theo ने खुद ही ऐप के अंदर एक 30-सेकंड-आइडल टोस्ट सेल्फ-मर्ज कर दिया, जो होस्ट के GitHub क्रेडेंशियल्स इस्तेमाल करके `PUT user/starred/...` फ़ायर करता है — और रेपो को 30k से 77k स्टार्स तक पहुँचा दिया (करीब ~129 वॉचर्स के साथ), जबकि एक आर्बिट्ररी-रेपो स्टारिंग बग अनफ़िक्स्ड ही रहा।
  [पूरा प्रदर्श खोलें](../../cases/hi/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [इंटरैक्टिव कार्ड](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars) · [मूल X पोस्ट](https://x.com/realchendahuang/status/2125416210120765799)

---

## मुख्य दृश्य प्रमाण

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## 2 मिनट की हार्डनिंग और सफ़ाई गाइड

यदि T3 Code आपकी मशीन पर पहले से इंस्टॉल है, तो केवल environment variables पर निर्भर न रहें — AnalyticsService.ts:156 opt-outs की जाँच से पहले एक स्थानीय ID लिखता है और DesktopShellEnvironment.ts में OTEL_SDK_DISABLED शामिल नहीं है। environment flags, OS hosts ब्लॉकिंग, ऑफ़लाइन SQLite कम्पैक्शन और टोकन रद्द करने को मिलाएँ।

- [ ] DO_NOT_TRACK=1 और legacy टेलीमेट्री kill switches एक्सपोर्ट करें, और /etc/hosts में ingest.t3.codes को sinkhole करें।
- [ ] T3 Code बंद करें, statev2.sqlite की जाँच करें, ऑफ़लाइन VACUUM; चलाएँ, या ~/.t3 को पूरी तरह हटा दें।
- [ ] अपनी एकमात्र अपील बचाने के लिए T3-प्रबंधित डायरेक्टरीज़ के ज़रिए व्यक्तिगत Google AI / Antigravity खाते चलाना बंद करें।
- [ ] Publish agent activity बंद करें, T3 Connect मशीनें अनलिंक करें, Clerk + relay डिलीशन का अनुरोध करें, और T3 Code के GitHub OAuth ऐप को रद्द करें।
- [ ] बिना TLS के प्लेनटेक्स्ट t3 up --lan कभी उजागर न करें, CI में 30 दिनों के non-DPoP Bearer टोकन से बचें, और अविश्वसनीय रिपॉज़िटरी खोलने से पहले SSH_AUTH_SOCK / GITHUB_TOKEN साफ़ करें।

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

**सामुदायिक रूप से अनुशंसित विकल्प:** डेवलपर्स ने Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash और Orca को रेखांकित किया। किसी भी क्लाइंट को अपनाने से पहले डिफ़ॉल्ट-ऑफ टेलीमेट्री, वास्तविक स्थानीय डिलीशन, हेडर स्पूफ़िंग के बिना आधिकारिक CLI प्रत्यायोजन और क्लाइंट-साइड E2E एन्क्रिप्शन सत्यापित करें।

---

## सामुदायिक रिपोर्टें और स्वतंत्र टिप्पणी

20 क्रमांकित प्रदर्श (#00–#19) में सख्ती से केवल सार्वजनिक रूप से सत्यापन योग्य कोड, पुल रिक्वेस्ट, आधिकारिक फाइलिंग और संग्रहित सार्वजनिक पोस्ट शामिल हैं। साक्ष्य-संबंधी स्पष्टता के लिए सामुदायिक सबमिशन और निजी संदेशों के आरोप यहाँ अलग रखे गए हैं।

- **Issue #1 · "Theo के विरुद्ध मामला" (@opserx)** — 25 नवंबर 2026 को इस रिपॉज़िटरी में जमा सामुदायिक टिप्पणी का शब्दशः संग्रह, साथ में PR #42450 और PR #41237 पर प्राथमिक-स्रोत सटीकता नोट्स। ([संग्रहित Issue #1 पढ़ें](../community/issue-1-the-case-against-theo.md))
- **निजी-संदेश शिकायतें और जारी सबमिशन** — कई डेवलपर्स ने @theo और T3 Code के साथ अपने अनुभवों के निजी विवरण भेजे हैं। कड़े सत्यापन मानकों को बनाए रखने के लिए, निजी रिपोर्टें प्राथमिक #00–#19 प्रदर्श-अभिलेख से अलग रहती हैं, जब तक कि सार्वजनिक आर्टिफ़ैक्ट्स से स्वतंत्र रूप से पुष्टि न हो जाए। सत्यापन योग्य निष्कर्ष या अपस्ट्रीम फ़िक्स की पुष्टि Pull Request या GitHub Issue के माध्यम से भेजें। ([सबमिशन और सत्यापन नीति](../../CONTRIBUTING.md))

---

## गहरे तकनीकी डोज़ियर और मास्टर इंडेक्स

पंक्ति-दर-पंक्ति सोर्स कोड डिफ़, शब्दशः SQL और पूर्ण क्रॉस-रेफ़रेंस कैटलॉग के लिए संरक्षित संदर्भ अभिलेख देखें:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 दृश्य प्रमाण (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 प्राथमिक स्रोत (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### निरंतर ट्रैकिंग और योगदान

यह रिपॉज़िटरी सक्रिय रूप से अनुरक्षित है। तथ्यात्मक सुधार, commit/PR प्रमाण के साथ नए मर्ज किए गए अपस्ट्रीम फ़िक्स, या नए प्राथमिक साक्ष्य Pull Request या GitHub Issue के माध्यम से स्वागतयोग्य हैं — CONTRIBUTING.md देखें।
