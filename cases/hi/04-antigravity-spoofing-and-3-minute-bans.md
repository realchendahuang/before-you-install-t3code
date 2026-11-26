# #04 · Google Antigravity हेडर स्पूफ़िंग, फ़र्ज़ी `SSH_CONNECTION` और 3 मिनट में अकाउंट बैन

> अपने FAQ में ToS अनुपालन की गारंटी देने के बावजूद, T3 Code OS कीरिंग से क्रेडेंशियल निकालता है, `v1internal` के सामने Google के इंटरनल हेडर (`antigravity/hub/2.24.0`) स्पूफ़ करता है, और फ़र्ज़ी `SSH_CONNECTION` वैल्यू इंजेक्ट करता है — जिससे निजी Google सब्सक्रिप्शन तेज़ी से बैन की चपेट में आ जाते हैं।

<!-- section:claim -->
## क्या दावा किया गया

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) ने भुगतान करने वाले सब्सक्राइबर्स को भरोसा दिलाया: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- जब बैन हुए यूज़र्स ने [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) दायर किया, तो एक मेंटेनर ने Antigravity के बैकएंड को हिट करने या टोकन दोबारा इस्तेमाल करने से इनकार किया — और X पर `@theo` ने थर्ड-पार्टी प्रॉक्सी को दोष दिया (`"Not with cliproxy right?"`)।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **OS क्रेडेंशियल एक्सट्रैक्शन और स्पूफ़ किए गए `v1internal` कॉल:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) लोकल फ़ाइलों, `@napi-rs/keyring` या Windows Credential Manager (`advapi32.dll` पर `ffi-rs` के ज़रिए `CredReadW`) से Google OAuth टोकन निकालता है, `antigravity/hub/2.24.0` हार्डकोड करता है, और सीधे Google के निजी `v1internal` एंडपॉइंट पर `POST` करता है। Google के कर्मचारियों ने [आधिकारिक फ़ोरम](https://discuss.ai.google.dev/t/185992) पर पुष्टि की कि [Google Antigravity ToS](https://antigravity.google/terms) की धारा 6 थर्ड-पार्टी टूल्स को क्रेडेंशियल निकालकर या दोबारा इस्तेमाल करके बैकएंड एंडपॉइंट्स को सीधे क्वेरी करने से रोकती है।
- **फ़र्ज़ी `SSH_CONNECTION` और अकाउंट्स के बीच लीकेज:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) एक फ़र्ज़ी `SSH_CONNECTION` एनवायरनमेंट वैरिएबल (`"127.0.0.1 0 127.0.0.1 0"`) इंजेक्ट करता है, ताकि Google की CLI OS कीचेन आइसोलेशन से हटकर प्लेनटेक्स्ट फ़ाइलों पर चली जाए। जब Google ने 24 नवंबर को अपनी CLI अपडेट की, तो [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) ने पुष्टि की कि Account A के प्रॉम्प्ट चुपचाप Account B को रूट हो रहे थे।
- **नया $20 अकाउंट 3 मिनट में बैन (`Issue #41536`):** बिना किसी प्रॉक्सी वाला एक बिल्कुल नया $20 का Google AI सब्सक्रिप्शन — जो सिर्फ़ T3-मैनेज्ड Antigravity इस्तेमाल कर रहा था — सेटअप के 3 मिनट बाद, अपने पहले ही मैसेज पर बैन कर दिया गया। मेंटेनर्स ने बिना कोई यूज़र चेतावनी जोड़े इस इश्यू को डुप्लिकेट बताकर बंद कर दिया।
- **नेटिव क्लाइंट और CLIProxyAPI स्पूफ़िंग:** `@theo` ने खुद [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) मर्ज किया जो `"zed"` का रूप धारण करता है, जबकि मर्ज किए गए [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) ने [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) की हब पोलिंग को स्पूफ़ किए गए `claude-code/2.1.273`, `grok-cli/1.0.77` और `antigravityUserAgent` हेडर के साथ जोड़ दिया।

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी सक्रिय:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) ने Google के `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) अकाउंट वेरिफ़िकेशन लिंक दिखाने के लिए [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) जोड़ा — जो Google की सक्रिय एन्फ़ोर्समेंट की पुष्टि करता है — वहीं स्पूफ़िंग और टोकन-एक्सट्रैक्शन के चारों रास्ते अब भी चालू हैं।

<!-- section:visuals -->
## दृश्य साक्ष्य

![antigravityUsageLimits.ts में स्पूफ़ किए गए Google हेडर हार्डकोड करना और v1internal को कॉल करना](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts द्वारा OS कीचेन स्टोरेज को बायपास करने के लिए SSH_CONNECTION फ़र्ज़ करना](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 में दर्ज: बिना प्रॉक्सी वाला नया $20 अकाउंट 3 मिनट में बैन](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 द्वारा स्पूफ़ किए गए CLIProxyAPI हब पोलिंग को T3 Code में नेटिव रूप से जोड़ना](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ में ToS की गारंटी](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [गहन तकनीकी डोज़ियर 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
