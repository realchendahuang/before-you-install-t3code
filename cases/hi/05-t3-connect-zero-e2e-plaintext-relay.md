# #05 · T3 Connect: शून्य एंड-टू-एंड एन्क्रिप्शन और प्लेनटेक्स्ट TLS-टर्मिनेशन गेटवे

> T3 Connect से होकर गुज़रने वाला हर प्रॉम्प्ट, सोर्स फ़ाइल और टर्मिनल स्ट्रीम T3-नियंत्रित इंफ्रास्ट्रक्चर के भीतर प्लेनटेक्स्ट में समाप्त होता है — शून्य एंड-टू-एंड एन्क्रिप्शन और डिफ़ॉल्ट रूप से बंद डिवाइस अप्रूवल के साथ।

<!-- section:claim -->
## क्या दावा किया गया

- 24 नवंबर को `@theo` ने कहा कि बातचीत का डेटा *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766))।
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) *"encrypted network transport"* का वादा करता है, लेकिन एंड-टू-एंड एन्क्रिप्शन के अभाव का खुलासा नहीं करता।

<!-- section:evidence -->
## साक्ष्य क्या दर्शाते हैं

- **T3 के रिले के भीतर प्लेनटेक्स्ट दृश्यता (`ManagedEndpointProvider.ts`):** T3 Connect, T3 के अपने Cloudflare अकाउंट के भीतर Cloudflare Tunnels प्रोविज़न करता है (`docs/internals/06_t3-connect.md`)। ट्रांसपोर्ट TLS Cloudflare के एज पर टर्मिनेट होता है और क्लाइंट-से-क्लाइंट पेलोड एन्क्रिप्शन शून्य है, यानी Cloudflare Workers Route जोड़ने पर हर प्रॉम्प्ट, फ़ाइल और टर्मिनल स्ट्रीम प्लेनटेक्स्ट में उजागर हो जाता है।
- **E2E एन्क्रिप्शन को दायरे से बाहर बताकर खारिज किया गया (`Issue #32098`):** जब डेवलपर्स ने mutual auth और एंड-टू-एंड एन्क्रिप्शन का अनुरोध किया, तो एक मेंटेनर ने [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) को बहुत बड़ा बदलाव बताकर बंद कर दिया; Discussions `#21286` और `#37831` अनुत्तरित रहे। 25 नवंबर को `@theo` ने E2E एन्क्रिप्शन को असंभव घोषित किया ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924))।
- **T3-संचालित OVH Caddy गेटवे पर माइग्रेशन (`PR #32945`):** Cloudflare Tunnel के बिल **$25,000/month** तक पहुँचने के बाद, `@theo` ने [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) खोलकर T3 के किराए के OVH Hillsboro सर्वर (`gw.t3coderelay.com`) पर जाने की योजना बनाई, जहाँ T3 का अपना Caddy इंस्टेंस TLS टर्मिनेट करता है और प्लेनटेक्स्ट को Unix socket के ज़रिए Go `yamux` प्रॉक्सी तक भेजता है — अब भी E2E एन्क्रिप्शन के बिना।
- **डिफ़ॉल्ट रूप से बंद डिवाइस अप्रूवल (`PR #36419`, `settings.ts`):** [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) में `requireConnectDeviceApproval` अब भी डिफ़ॉल्ट रूप से `false` है (`lines 1424–1426`)। जैसा कि `SECURITY.md` स्वीकार करता है, किसी समझौता-ग्रस्त क्लाउड अकाउंट या लीक हुई रिले साइनिंग की के ज़रिए होस्ट पर shell के बराबर पहुँच मिल जाती है।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी खुला:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) ने साइन-इन सूचनाएँ जोड़ीं, लेकिन **T3 Connect में अब भी शून्य एंड-टू-एंड एन्क्रिप्शन है**, `requireConnectDeviceApproval` डिफ़ॉल्ट रूप से `false` बना हुआ है, और `privacy-policy.astro` `2026-10-06` से अपरिवर्तित है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![Issue #32098 यह पुष्टि करता हुआ कि चोरी हुआ क्लाउड अकाउंट या रिले की, E2E एन्क्रिप्शन के बिना, लिंक्ड मशीनों को नियंत्रित कर सकते हैं](../../evidence/15-connect-no-e2e.jpg)

![PR #32945, T3 Connect को सेल्फ़-होस्टेड OVH गेटवे पर ले जाता हुआ जहाँ Caddy TLS टर्मिनेट करता है](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts, T3 के अपने अकाउंट के भीतर Cloudflare Tunnels प्रोविज़न करता हुआ](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 टिप्पणी](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [गहन तकनीकी डोज़ियर 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
