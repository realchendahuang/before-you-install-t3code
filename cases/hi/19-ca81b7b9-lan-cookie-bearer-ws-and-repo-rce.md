# #19 · `ca81b7b9` गंभीर प्रमाणीकरण एवं रेपो निष्पादन ऑडिट: 30-दिन का प्लेनटेक्स्ट LAN शेल, रद्द न किए जा सकने वाले टोकन और `SSH_AUTH_SOCK` का खुला जोखिम

> नवीनतम `main` HEAD (`ca81b7b9`, 25 नवंबर 14:49 CST) की पंक्ति-दर-पंक्ति जाँच ने पाँच सक्रिय सुरक्षा और विश्वसनीयता दोषों की पुष्टि की: 30-दिन की प्लेनटेक्स्ट `--lan` शेल कुकीज़ जिनमें `Origin` अनुपस्थित होने पर बायपास मौजूद है, रद्द न किए जा सकने वाले 30-दिन के Bearer टोकन, रीप्ले-योग्य `?wsTicket=` URL, `isIPv4` द्वारा `::1` टनल का खात्मा, और अविश्वसनीय रेपोज़ द्वारा विरासत में मिले `SSH_AUTH_SOCK` व `GITHUB_TOKEN` के साथ हुक्स/सबमॉड्यूल चलाया जाना।

<!-- section:claim -->
## क्या दावा किया गया

- 24–25 नवंबर की रात भर चले पैचिंग अभियान के बाद T3 Code को साफ़-सुथरा और रोज़मर्रा के इंजीनियरिंग उपयोग के लिए सुरक्षित बताया गया।
- `SECURITY.md` डिफ़ॉल्ट सत्र को पूर्ण OS-उपयोगकर्ता शेल नियंत्रण के रूप में परिभाषित करता है, साथ ही यह दावा करता है कि लोकल/LAN सीमाएँ ठीक से प्रबंधित हैं।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

सीधे अपस्ट्रीम कमिट [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) के विरुद्ध सत्यापित:

- **1. 30-दिन की प्लेनटेक्स्ट `--lan` शेल कुकीज़ + `Origin` अनुपस्थित होने पर बायपास:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) 30-दिन का डिफ़ॉल्ट सत्र TTL सेट करता है (जो `SECURITY.md` के अनुसार पूर्ण OS शेल एक्सेस के बराबर है)। [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) ने `Secure` एट्रिब्यूट केवल `https:` के लिए जोड़ा, जिससे `t3 up --lan` की HTTP कुकीज़ सादे टेक्स्ट में ही भेजी जाती रहीं ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221))। इससे भी बुरा, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) जब भी `Origin` अनुपस्थित हो, `true` लौटाता है — यानी LAN पर एक भी पैकेट स्निफ़ कर लेने वाला कोई भी व्यक्ति बिना `Origin` के किसी नॉन-ब्राउज़र स्क्रिप्ट से वह कुकी रीप्ले कर सकता है और चुपचाप 30 दिनों तक होस्ट शेल एक्सेस बनाए रख सकता है।
- **2. रद्द न किए जा सकने वाले 30-दिन के नॉन-DPoP Bearer टोकन और कोई `/logout` रूट नहीं:** `/oauth/token` DPoP प्रमाण दिए जाने पर ही जीवनकाल घटाकर 1 घंटा करता है; अन्यथा यह एक अनबाउंड **30-दिन का Bearer टोकन** जारी करता है ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186))। HTTP कॉन्ट्रैक्ट में **कोई भी `/logout` एंडपॉइंट परिभाषित नहीं है** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), और `revokeClientSession` स्पष्ट रूप से `current_session_revoke_not_allowed` के साथ स्व-निरसन को रोकता है ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511))।
- **3. 5 मिनट के रीप्ले-योग्य `?wsTicket=` URL टोकन:** WebSocket टिकट क्वेरी स्ट्रिंग में यात्रा करते हैं (`?wsTicket=`, जो प्रॉक्सी/एक्सेस लॉग में दर्ज हो जाते हैं) और उनका TTL 5 मिनट का होता है। [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) सिग्नेचर, समाप्ति, ऑडियंस और निरसन की जाँच करता है, पर **एकबार-उपयोग वाला `jti` रीप्ले स्टोर नहीं है** — जिससे 5 मिनट के भीतर Bearer RPC और सभी `media` टिकटों को असीमित बार रीप्ले किया जा सकता है ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622))।
- **4. पूर्ण `SSH_AUTH_SOCK` और `GITHUB_TOKEN` के साथ अविश्वसनीय रेपोज़ का निष्पादन:** वर्कट्री सेटअप स्वचालित रूप से `git submodule update --init --recursive` चलाता है, जब भी `.gitmodules` मौजूद हो ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) एक वैश्विक `core.hooksPath=/dev/null` गार्ड नहीं लगाता; और [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) `.claude/settings.json` के `SessionStart` हुक्स को सिंक्रोनस रूप से चलाता है — ये सभी होस्ट के पूर्ण `process.env` को विरासत में लेते हैं, जिसमें `GITHUB_TOKEN` और `SSH_AUTH_SOCK` शामिल हैं (जिनका प्रभाव-क्षेत्र हर उस रिमोट रेपो और प्रोडक्शन सर्वर तक फैला है जिसके लिए आपका SSH एजेंट साइन कर सकता है)।
- **5. `isIPv4` द्वारा `::1` लूपबैक टनल को चुपचाप नष्ट करना:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) लाइन 39 पर लूपबैक अनुमति-सूची में `::1` जोड़ता है, फिर लाइन 73 पर `NodeNet.isIPv4` कॉल करता है — जिससे IPv6 लूपबैक Tailscale Serve और T3 Connect सॉकेट बाहरी ट्रैफ़िक के रूप में गलत वर्गीकृत हो जाते हैं और `socket.destroy()` कॉल हो जाता है।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **`ca81b7b9` पर सभी 5 समस्याएँ अभी भी अनसुलझी हैं:** `main` HEAD (`2026-11-25 14:49 CST`) पर पंक्ति-दर-पंक्ति पुष्टि, साथ ही **0 प्रकाशित GitHub Security Advisories** (जिसमें `PR #39483` में 20 नवंबर को किया गया मौन path-traversal फ़िक्स भी शामिल है)।

<!-- section:visuals -->
## दृश्य साक्ष्य

![http.ts#L215-L241: प्लेनटेक्स्ट --lan HTTP पर बिना Secure के 30-दिन की शेल कुकीज़ भेजना](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819: Origin हेडर अनुपस्थित होने पर हर बार true लौटाना](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521: बिना लॉगआउट रूट के, वर्तमान-सत्र के स्व-निरसन को रोकना](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205: विरासत में मिले SSH_AUTH_SOCK और GITHUB_TOKEN के तहत रिकर्सिव सबमॉड्यूल इनिट चलाना](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110: NodeNet.isIPv4 के ज़रिए IPv6 ::1 लूपबैक टनल को अस्वीकार करना](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X ऑडिट पोस्ट — भाग 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [भाग 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [कमिट `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [गहन तकनीकी डोज़ियर 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
