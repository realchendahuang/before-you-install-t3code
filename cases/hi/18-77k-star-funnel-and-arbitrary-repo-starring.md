# #18 · 77,000-स्टार का फ़नल: 30-सेकंड आइडल पर होस्ट-क्रेडेंशियल से स्टारिंग और अनफ़िक्स्ड आर्बिट्ररी-रेपो बग

> GitHub स्टार्स को "to trick VCs into investing" का ज़रिया कहकर निंदा करने के छह महीने बाद, @theo ने खुद ही ऐप के अंदर एक 30-सेकंड-आइडल टोस्ट सेल्फ-मर्ज कर दिया, जो होस्ट के GitHub क्रेडेंशियल्स इस्तेमाल करके `PUT user/starred/...` फ़ायर करता है — और रेपो को 30k से 77k स्टार्स तक पहुँचा दिया (करीब ~129 वॉचर्स के साथ), जबकि एक आर्बिट्ररी-रेपो स्टारिंग बग अनफ़िक्स्ड ही रहा।

<!-- section:claim -->
## क्या दावा किया गया

- 26 अप्रैल, 2026 को `@theo` ने *"Github has a fake star problem"* प्रकाशित किया, जिसमें लिखा कि GitHub स्टार्स अब *"mostly a way for companies to trick VCs into investing"* बन गए हैं ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340))।
- 24 नवंबर को, 74.6k स्टार्स पर, उन्होंने दावा किया कि वे *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538))।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **ऐप के अंदर आइडल टोस्ट से रोज़ाना स्टार्स में 10× की गिरावट-जैसी छलांग (`PR #27832`, `#29922`, `#29987`):** 30,000 स्टार्स तक पहुँचने में 8+ महीने लगाने के बाद, `@theo` ने 30 अक्टूबर को खुद [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) लिखा और सेल्फ-मर्ज किया, जिसमें 5 प्रॉम्प्ट भेजने के बाद स्टार टोस्ट जोड़ा गया (`PROMPTS_BEFORE_ASKING = 5`), और तुरंत रोज़ाना स्टार्स **10×** हो गए (GitHub Trending पर `+3,094` स्टार्स/दिन)। 3 नवंबर को, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) और [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) ने **30-सेकंड विंडो आइडल डिटेक्शन** (`IDLE_MS = 30_000`) जोड़ा, जो तब सक्रिय होता है जब उपयोगकर्ता AI टर्न के इंतज़ार में होते हैं, और ब्राउज़र रीडायरेक्ट की जगह एक सर्वर-साइड `sourceControl.star` RPC लगाया, जो सीधे **होस्ट सर्वर के `gh` CLI / `GH_TOKEN` क्रेडेंशियल्स** के ज़रिए `PUT user/starred/pingdotgg/t3code` फ़ायर करता है, और उसके बाद 160-कणों वाला कॉन्फ़ेटी।
- **रिव्यू बायपास और शेयर्ड-होस्ट अकाउंट की अस्पष्टता:** Macroscope ने `PR #29922` को ब्राउज़र-यूज़र बनाम सर्वर-क्रेडेंशियल के मेलमिलाप न होने पर *Needs Human Approval* के रूप में फ़्लैग किया; `@theo` ने फिर भी सेल्फ-मर्ज कर दिया। शेयर्ड या रिमोट होस्ट्स पर, *Star* पर क्लिक करने से रेपो को चुपचाप उसी अकाउंट से स्टार कर दिया जाता है जिसके पास सर्वर के GitHub क्रेडेंशियल्स हैं — बिना उपयोगकर्ता को बताए कि कौन-सा अकाउंट इस्तेमाल हुआ।
- **अनफ़िक्स्ड आर्बिट्ररी-रेपो स्टारिंग बग (`driver.ts#L60-L99`):** 6 नवंबर को डेवलपर `zhilsinger` ने `Request changes` दर्ज करते हुए इशारा किया कि [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) किसी भी `owner/repo` स्ट्रिंग को स्वीकार कर लेता है, बिना `pingdotgg/t3code` पर पिन किए — जिससे `source-control:write` वाला कोई भी क्लाइंट होस्ट क्रेडेंशियल्स का इस्तेमाल करके मनचाहे GitHub रेपो को स्टार कर सकता है।

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी खुला:** `driver.ts#L60-L99` में अनपिन्ड आर्बिट्ररी-रेपो स्टारिंग और `zhilsinger` का 6 नवंबर वाला `Request changes` रिव्यू 19 दिन बाद भी अनुत्तरित और अनफ़िक्स्ड है (77k+ स्टार्स बनाम ~129 वॉचर्स)।

<!-- section:visuals -->
## दृश्य साक्ष्य

![Theo का 2 नवंबर का चार्ट, जो ऐप-में-प्रॉम्प्ट शिप करने के ठीक बाद आए लगभग-खड़ी 10x स्टार क्लिफ़ का जश्न मनाता है](../../evidence/20-star-10x-cliff.png)

![डेवलपर zhilsinger का PR #29922 पर Request Changes रिव्यू, जो 19 दिनों तक अनुत्तरित रहा](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 मनचाहे owner/repo स्ट्रिंग्स स्वीकार करता हुआ, बिना pingdotgg/t3code पर पिन किए](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10x क्लिफ़ (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/दिन Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [गहन तकनीकी डोज़ियर 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
