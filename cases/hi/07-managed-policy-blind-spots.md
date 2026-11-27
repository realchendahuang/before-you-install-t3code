# #07 · मैनेज्ड पॉलिसी का विरोधाभास: चार प्रलेखित टेलीमेट्री ब्लाइंड स्पॉट

> @theo ने दावा किया था कि T3 Code के पास "best corporate managed policy system" है, जिससे "trivial to turn off all telemetry" हो जाता है — जिसका सीधा खंडन T3 Code के अपने `docs/user/telemetry.md` और `docs/user/managed-policy.md` से होता है।

<!-- section:claim -->
## क्या दावा किया गया

- 24 नवंबर को 19:13 CST पर, `@theo` ने उपयोगकर्ता opt-out टॉगल न होने की बात को यह कहकर टाल दिया: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715))।
- आधे घंटे बाद उन्होंने आगे कहा कि बातचीत का डेटा *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766))।

<!-- section:evidence -->
## साक्ष्य क्या दर्शाते हैं

T3 Code का अपना आधिकारिक दस्तावेज़ीकरण ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) और [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) चार ठोस ब्लाइंड स्पॉट दर्ज करता है:

- **केवल एडमिन के लिए डिप्लॉयमेंट (व्यक्तिगत UI में शून्य स्विच):** डेस्कटॉप उपयोगकर्ताओं के पास Settings में कोई टॉगल नहीं है। Managed Policy के लिए MDM/GPO या एडमिन-संरक्षित OS पाथ (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, या `/etc/t3code/policy.json`) ज़रूरी हैं, जो गैर-एडमिन डेस्कटॉप उपयोगकर्ताओं के लिए पूरी तरह दुर्गम हैं।
- **होस्टेड वेब ऐप (`app.t3.codes`) पॉलिसी को अनदेखा करता है:** ब्राउज़र ऐप सर्वर एनवायरनमेंट वेरिएबल और Managed Policy को अनदेखा करता है, ट्रेसिंग के साथ बिल्ड होने पर कनेक्शन ट्रेस भेजता है, और *"has no relay tracing toggle."*
- **मोबाइल ऐप सर्वर पॉलिसी से बाहर हैं:** आधिकारिक दस्तावेज़ पुष्टि करते हैं कि सर्वर env vars और Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` opt-out को अनदेखा करता है:** यह प्रोजेक्ट शीर्षक, थ्रेड शीर्षक, मॉडल नाम और लाइव स्टेटस T3 Connect पर अपलोड करता है — और दस्तावेज़ स्पष्ट रूप से कहते हैं: *"The telemetry opt-out does not disable it."* इसके अलावा, विफल Axiom spans/crash logs *"can quote a value the app was handling"*, और `Agent feedback` 16 KB तक के बातचीत संदेश संलग्न कर सकता है।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी खुला:** रात भर में [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) ने ऐप के भीतर मोबाइल ट्रेस टॉगल जोड़ा, लेकिन Managed Policy अब भी मोबाइल ट्रेसिंग बंद नहीं कर सकती, होस्टेड `app.t3.codes` में अब भी शून्य opt-out टॉगल है, `Publish agent activity` अब भी टेलीमेट्री opt-out को अनदेखा करता है, और डेस्कटॉप Settings UI में कोई टॉगल मौजूद नहीं है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![आधिकारिक docs/user/telemetry.md जो पुष्टि करता है कि app.t3.codes में कोई टॉगल नहीं है, मोबाइल Managed Policy को अनदेखा करता है, और एजेंट गतिविधि opt-out को अनदेखा करती है](../../evidence/05-telemetry-cant-disable.png)

![आधिकारिक docs/user/managed-policy.md जो macOS, Windows और Linux में एडमिन-संरक्षित सिस्टम पाथ की सूची देता है](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo की 24 नवंबर की पोस्ट, जिसमें दावा है कि Managed Policy से सारी टेलीमेट्री बंद करना तुच्छ है](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` का Managed Policy दावा (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` का "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [गहन तकनीकी डोज़ियर 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
