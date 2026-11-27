# #09 · आंतरिक `yolo merges` बनाम बाहरी सामुदायिक शत्रुता और `.github/VOUCHED.td` प्रतिबंध

> भीतर की ओर, T3 Code ने स्वचालित एजेंट लूप के ज़रिए प्रतिदिन 500 कमिट शिप किए और खुद माना कि "yolo merges breaking shit" — जबकि बाहर की ओर योगदानकर्ताओं से कहा गया "here's my advice: Don't", उपयोगकर्ताओं को `.github/VOUCHED.td` के ज़रिए निंदित किया गया, और इश्यू दर्ज करने वालों का अपमान किया गया।

<!-- section:claim -->
## क्या दावा किया गया

- T3 Code खुद को एक तेज़ रफ़्तार, समुदाय को गले लगाने वाला ओपन-सोर्स प्रोजेक्ट बताता है, जिसे इंजीनियरों ने इंजीनियरों के लिए बनाया है।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **भीतर लापरवाह मर्ज गति:** `@theo` ने सार्वजनिक रूप से **प्रतिदिन 500 कमिट** शिप करने की बात कही ([`2120741101250515322`](https://x.com/theo/status/2120741101250515322)), **700 समवर्ती एजेंट** चलाए, स्वचालित एजेंट लूप से सामुदायिक PR बैच में मर्ज किए, यह स्वीकार किया कि *"my yolo merges breaking shit sometimes"* ([`2119951615679672513`](https://x.com/theo/status/2119951615679672513)), और यह मज़ाक किया कि मशीन मिटने का जोखिम लेना *"free content"* के बराबर है ([`2119993037971730879`](https://x.com/theo/status/2119993037971730879))।
- **शत्रुतापूर्ण गवर्नेंस और सार्वजनिक निंदा-आधारित प्रतिबंध:** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) की शुरुआत ही *"here's my advice: Don't"* से होती थी, जिसके पीछे [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) की निंदा-आधारित स्वतः-प्रतिबंध व्यवस्था और अस्वीकृत सामुदायिक PRs पर लगे **174 `unwanted` लेबल** थे।
- **एकपक्षीय फ़ीचर हटाना और उपयोगकर्ताओं का अपमान:** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) ने Build/Plan टॉगल को दबा दिया (*"Reality check for those upset"*, 10 डाउनवोट), [`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) ने context usage रिंग छिपा दी (16 डाउनवोट, रिपॉज़िटरी में सर्वाधिक), और [`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) ने Plan मोड को पूरी तरह हटा दिया, साथ में एक स्वयं-विरोधाभासी AI सारांश दिया। [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) में `@theo` ने उपयोगकर्ता `@bermudi` से कहा *"uninstall our software"* और उन्हें *"ungrateful prick"* कहा — अगली सुबह उनका फ़ॉलो-अप [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) अस्वीकार कर दिया।
- **X पर फ़ॉलोअर आधारित गेटकीपिंग:** योगदानकर्ताओं को `@theo` को फ़ॉलो न करने पर डाँटा गया ([`2120821423438778667`](https://x.com/theo/status/2120821423438778667)), `/btw` हटा देने की धमकी दी गई ([`2120853340078874923`](https://x.com/theo/status/2120853340078874923)), और कहा गया कि एक एनोटेटेड स्क्रीनशॉट भेजना PR जमा करने से बेहतर है ([`2123754193530053110`](https://x.com/theo/status/2123754193530053110))।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी मौजूद:** `CONTRIBUTING.md` और `.github/VOUCHED.td` `ca81b7b9` पर `main` में अब भी लाइव हैं।

<!-- section:visuals -->
## दृश्य साक्ष्य

![CONTRIBUTING.md बाहरी PRs को हतोत्साहित करता हुआ और .github/VOUCHED.td में सार्वजनिक निंदा-आधारित प्रतिबंधों का दस्तावेज़ीकरण करता हुआ](../../evidence/22-contributing-vouched-ban.png)

![Issue #33639 में Theo का जवाब, जिसमें उपयोगकर्ता से सॉफ़्टवेयर अनइंस्टॉल करने को कहा गया और उसे ungrateful prick कहा गया](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo यह स्वीकार करते हुए कि "my yolo merges breaking shit sometimes"](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 9)](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 टिप्पणी](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [प्रतिदिन 500 कमिट (`2120741101250515322`)](https://x.com/theo/status/2120741101250515322) · [`yolo merges` (`2119951615679672513`)](https://x.com/theo/status/2119951615679672513) · [मशीन मिटना = free content (`2119993037971730879`)](https://x.com/theo/status/2119993037971730879)
- [गहन तकनीकी डोज़ियर 05](../../docs/dossiers/05-governance-trademark-and-history.md)
