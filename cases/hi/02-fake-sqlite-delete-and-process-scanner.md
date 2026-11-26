# #02 · नकली SQLite थ्रेड डिलीशन (41.6 GB का फुलाव) और 5 सेकंड में पूरे OS का प्रोसेस स्कैनिंग

> "हमेशा के लिए डिलीट करें" पर क्लिक करने से भी `statev2.sqlite` में पूरा बातचीत इतिहास बरकरार रहा (जिससे स्थानीय डिस्क 41.6 GB तक फूल गईं), जबकि एक बैकग्राउंड Rust मॉनिटर हर 5 सेकंड में हर OS प्रोसेस और पूरी कमांड लाइन को स्कैन करता रहा, बिना किसी ऑप्ट-आउट के।

<!-- section:claim -->
## क्या दावा किया गया था

- साइडबार का डिलीशन कन्फर्मेशन डायलॉग (`useThreadActionMenu.ts`) उपयोगकर्ताओं से स्पष्ट रूप से कहता था: *"This permanently clears conversation history for this thread."*
- T3 Code को एक साफ-सुथरे, तेज़ लोकल कोडिंग वर्कस्पेस के रूप में प्रचारित किया गया था।

<!-- section:evidence -->
## साक्ष्य क्या दर्शाते हैं

- **नकली स्थायी डिलीशन (`Issue #17845`, `#28903`):** बेसलाइन `9d3195b4` पर, किसी थ्रेड को डिलीट करने से केवल `statev2.sqlite` में एक `"thread.deleted"` इवेंट जुड़ता था, जबकि पिछले संदेश, टूल आउटपुट और रीज़निंग ट्रेस डिस्क पर बरकरार रहते थे। उपयोगकर्ताओं ने दर्ज किया कि `statev2.sqlite` 3 हफ्तों में **25.9 GB** (90% "डिलीट किए गए" थ्रेड), 6 हफ्तों में **41.6 GB**, और 7 हफ्तों में **33 GB** तक फूल गया।
- **पूरी मशीन का प्रोसेस और कमांड-लाइन स्कैनिंग (`Issue #11222`, `PR #41889`):** बैकग्राउंड हेल्पर `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) हर 5 सेकंड में `ProcessesToUpdate::All` को `with_cmd(UpdateKind::Always)` के साथ चलाता था, तब भी जब डायग्नोस्टिक्स बंद थे — Windows पर 440+ असंबंधित ऐप्स/गेम्स में 280–300 लगातार हैंडल बनाए रखते हुए। 24 नवंबर को, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) ने पुष्टि की कि डायग्नोस्टिक्स **पूरी प्रोसेस कमांड लाइनें** (जिनमें अक्सर सादे टेक्स्ट में API कीज़, डेटाबेस पासवर्ड और टोकन होते हैं) स्नैपशॉट और टेलीमेट्री में कैप्चर कर रहे थे।
- **कॉर्पोरेट होस्टनेम लीक और अनिवार्य स्टार्टअप फ़ेच:** फ्रंटएंड के favicon अनुरोध आंतरिक होस्टनेम (जैसे `devbox.localdomain`) को Google की favicon सेवा तक लीक कर रहे थे (`PR #16950`, `PR #32657`), जबकि सर्वर स्टार्टअप बिना किसी ऑप्ट-आउट के `raw.githubusercontent.com` से संगतता मैनिफेस्ट अनिवार्य रूप से फ़ेच करता था (`Issue #36479`)।
- **गंभीर कोटा बर्न और पावर बग:** Agent SDK के ज़रिए Claude चलाने से 5-घंटे के कोटे सामान्य गति से **1.7x** पर खर्च हो रहे थे (`Issue #7338`, `Issue #24649`, 81 टिप्पणियाँ), जबकि GPU रिग्रेशन तुलनीय Electron पावर का **136x** तक खींच रहे थे — MacBook की GPU को **60W** पर पिन करना (78 मिनट में बैटरी खत्म) और वेब टैब बंद करने के बाद **18W** तक (`Issue #3143`, `Issue #40581`)।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **आंशिक रूप से पैच किया गया:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) ने अतुल्यकालिक `thread-content.purge` जोड़ा (जिससे `#17845` बंद हुआ), और [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) ने Windows प्रोसेस-मॉनिटर रीड्स को सीमित किया।
- **अभी भी खुला:** डिलीट किए गए स्रोत थ्रेड अब भी इतिहास रखते हैं जब तक कि उन्हें लाइव फ़ोर्क्स, लंबित `merge_back`, या लाइव सबएजेंट्स संदर्भित करते हैं; टॉम्बस्टोन पंक्तियाँ SQLite में बनी रहती हैं और डिस्क स्थान पुनः प्राप्त करने के लिए अभी भी ऑफ़लाइन `VACUUM` की आवश्यकता होती है; Linux और macOS में `ProcessesToUpdate::All` डिस्कवरी बनी हुई है, और `PR #41889` अभी भी खुला है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![Issue #17845, जिसमें दर्ज है कि स्थायी रूप से डिलीट किए गए थ्रेड statev2.sqlite को दसियों गीगाबाइट तक फुला रहे थे](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222, जिसमें दर्ज है कि t3-resource-monitor हर 5 सेकंड में हर OS प्रोसेस को स्कैन करता है](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [गहन तकनीकी डोसियर 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
