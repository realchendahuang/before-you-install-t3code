# #15 · GitHub बैन की धमकी के पीछे USPTO में शून्य ट्रेडमार्क, और 17 घंटे बाद पूर्वव्यापी `TRADEMARK.md`

> जब @theo ने "trademark infringement" के आधार पर एक चीनी डेवलपर का GitHub अकाउंट बंद कराने की धमकी दी, तब T3 Tools Inc. के पास `T3 Code`, `T3 Tools` या `T3 Connect` के लिए USPTO में 0 रजिस्ट्रेशन थे — और ठीक 17 घंटे बाद `TRADEMARK.md` पूर्वव्यापी रूप से merge कर दिया गया।

<!-- section:claim -->
## क्या दावा किया गया

- 23 नवंबर को `@theo` ने MIT fork के लेखक पर trademark infringement का आरोप लगाया और GitHub अकाउंट बंद कराने की धमकी दी ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890))।
- `TRADEMARK.md` merge करने से तीन घंटे पहले, उन्होंने सवाल उठाने वाले डेवलपर्स से कहा कि *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — जबकि सितंबर 2024 में उन्होंने खुद WordPress का मज़ाक बनाया था, एक *"unenforceable trademark dispute"* को लेकर ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945))।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **T3 मार्क्स के लिए USPTO में शून्य रजिस्ट्रेशन:** USPTO TSDR से सीधे सत्यापन ( `@vildanden_ai` के एक सुराग के आधार पर, [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) दिखाता है कि `T3 Code`, `T3 Tools` या `T3 Connect` के लिए **0 रजिस्ट्रेशन** हैं। T3 Tools Inc. की एकमात्र USPTO फाइलिंग (`PING LABS`, Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) को फरवरी 2025 में खारिज कर दिया गया था और 19 मई 2025 को `ABANDONED` अंकित कर दिया गया। इसके विपरीत, असंबंधित तीसरे पक्षों के पास Class 9 और 42 में सक्रिय `T3` सॉफ़्टवेयर/SaaS रजिस्ट्रेशन हैं (`EquipmentShare`, Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations`, Reg. `3324707`)।
- **GitHub Trademark Policy की शर्त:** [GitHub's Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy) के तहत, व्यावसायिक trademark takedown अनुरोधों के लिए संघीय या अंतरराष्ट्रीय रजिस्ट्रेशन नंबर देना अनिवार्य है, और यह perjury के दंड के अधीन है। जिस पल `@theo` ने `@DDdxx666` का अकाउंट बंद कराने की धमकी दी, उस पल वे GitHub का फ़ॉर्म पूरा नहीं कर सकते थे।
- **17 घंटे बाद पूर्वव्यापी `TRADEMARK.md` (`PR #41898`):** **24 नवंबर को 12:21 CST** पर — बैन की धमकी के 17 घंटे बाद — `@theo` ने [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) merge किया, जिसमें `TRADEMARK.md` जोड़ा गया था और उसमें *"whether registered or unregistered"* तक के अधिकारों का दावा किया गया, और 94 सेकंड बाद उन्होंने X पर इसका हवाला दिया ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688))।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **सार्वजनिक रिकॉर्ड:** पूर्वव्यापी `TRADEMARK.md` अब भी `main` पर मौजूद है; USPTO TSDR रिकॉर्ड अब भी `T3 Code` के लिए T3 Tools Inc. के 0 रजिस्ट्रेशन दिखाते हैं।

<!-- section:visuals -->
## दृश्य साक्ष्य

![PR #41898 बैन की धमकी के 17 घंटे बाद merge हुआ, जिसमें पूर्वव्यापी रूप से TRADEMARK.md जोड़ा गया](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md जो "whether registered or unregistered" तक विशेष अधिकारों का दावा करता है](../../evidence/extra/p1-2b-trademark-md.png)

![Theo TRADEMARK.md merge करने से तीन घंटे पहले डेवलपर्स से कहते हुए "get a better lawyer"](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub Trademark Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [94 सेकंड बाद पूर्वव्यापी हवाला (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [WordPress का मज़ाक (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [गहन तकनीकी डोज़ियर 05](../../docs/dossiers/05-governance-trademark-and-history.md)
