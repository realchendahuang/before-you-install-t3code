# #03 · 52 दिनों तक ख़ामोश `git push --force` बनाम मॉडल प्राइवेसी फ़िल्टर हटाने में 21 घंटे

> 52+ दिनों तक T3 Code में एक बग खुला रहा जहाँ Claude Auto मोड बिना कोई प्रॉम्प्ट दिखाए ख़ामोशी से `git push --force origin main` मंज़ूर कर देता था — वहीं एक प्राइवेसी व्हाइटलिस्ट हटाने में उसे सिर्फ़ 21 घंटे लगे, ताकि निजी मॉडल @theo के सार्वजनिक लीडरबोर्ड पर दिखने लगें।

<!-- section:claim -->
## क्या दावा किया गया

- Claude Auto मोड इस तरह डिज़ाइन किया गया है कि वह उच्च-जोखिम वाली विनाशकारी कार्रवाइयों (जैसे `main` पर फ़ोर्स-पुश) को स्पष्ट मानवीय मंज़ूरी के लिए एस्केलेट करे।
- टेलीमेट्री को प्राइवेसी-सुरक्षित एग्रीगेट मेट्रिक्स के रूप में पेश किया गया था।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **52+ दिनों तक अनसुलझा — ख़ामोश `git push --force` (`Issue #15353`):** `ClaudeAdapterV2.ts` में Auto मोड ने `!requiresClaudeApproval(context)` को शॉर्ट-सर्किट करके सीधे `"allow"` कर दिया। जब Claude का अपना सेफ़्टी क्लासिफ़ायर `git push --force origin main` को दो बार ब्लॉक कर चुका था और तीसरी कोशिश मानवीय पुष्टि के लिए एस्केलेट कर दी थी, तब T3 Code ने बिना किसी UI प्रॉम्प्ट के उसे ख़ामोशी से मंज़ूर कर दिया और `"source": "user_temporary"` लॉग किया। दो कम्युनिटी फ़िक्स PR (`#15360`, `#35207`) बॉट के ऑटो-क्लोज़ होने तक बिना समीक्षा के पड़े रहे; `#40692` अनमर्ज्ड रहा।
- **प्राइवेसी व्हाइटलिस्ट हटाने में 21 घंटे (`Issue #40948` → `PR #41237`):** 22 नवंबर को, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) में दर्ज किया गया कि नए मॉडल `@theo` के सार्वजनिक लीडरबोर्ड [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) से ग़ायब थे, क्योंकि `PR #29001` ने मॉडल व्हाइटलिस्ट लागू किया था। **21 घंटे के भीतर** [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) `@theo` के अकाउंट से मर्ज हो गया, जिसमें कहा गया कि Theo ने फ़िल्टर हटाने का स्पष्ट अनुरोध किया था — जिसके कारण `ollama/acme-internal` और `acme-azure-deployment` जैसे निजी लोकल/एंटरप्राइज़ नाम एनालिटिक्स तक शब्दशः भेज दिए गए।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **आंशिक रूप से बदला गया / मुख्य सेफ़्टी बग अब भी खुला:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) ने बाद में ग़ैर-कैटलॉग मॉडल्स को `custom:<driver>` के रूप में मास्क किया (कैटलॉग/विक्रेता स्लग अब भी custom endpoints के पीछे रिपोर्ट होते हैं)। **Issue #15353 (Auto मोड में ख़ामोश `git push --force`) `ca81b7b9` पर अब भी खुला और अनसुलझा है।**

<!-- section:visuals -->
## दृश्य साक्ष्य

![Issue #15353 52+ दिनों से खुला, जो दिखाता है कि Claude Auto मोड ख़ामोशी से git push --force मंज़ूर कर रहा है](../../evidence/11-issue15353-auto-force-push.png)

![Issue #40948 के 21 घंटे बाद PR #41237 मर्ज, जिसने slopalytics.com के लिए मॉडल प्राइवेसी फ़िल्टर हटा दिया](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [रिप्रोडक्शन कमेंट `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [अनमर्ज्ड कम्युनिटी फ़िक्स: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [गहन तकनीकी डोज़ियर 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
