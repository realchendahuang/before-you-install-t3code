# #01 · होमपेज पर "No Telemetry" के वादे के पीछे डिफ़ॉल्ट टेलीमेट्री

> जबकि इसके होमपेज ने "No telemetry. Unless you opt in. Full stop." का वादा किया था, T3 Code ने डिफ़ॉल्ट PostHog ट्रैकिंग सक्षम की, कच्ची प्रतियाँ क्लोज़्ड-सोर्स `ingest.t3.codes` के ज़रिए रूट कीं, बाहरी `~/.codex` और `~/.claude.json` क्रेडेंशियल्स को हैश किया, और समुदाय के चार ऑप्ट-आउट PR अस्वीकार किए।

<!-- section:claim -->
## क्या दावा किया गया था

- T3 Code के होमपेज ने प्रमुखता से वादा किया था: *"No telemetry / Unless you opt in. Full stop."*
- इसे सार्वजनिक रूप से निजता-प्राथमिक, ओपन-सोर्स लोकल AI कोडिंग क्लाइंट के रूप में पेश किया गया।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **"No telemetry" के वादे के तहत डिफ़ॉल्ट ट्रैकिंग तैनात की गई (`PR #174` → `3bdaa6e1`):** 6 मार्च 2026 को [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) ने बिना सहमति संवाद, बिना सेटिंग्स UI टॉगल और बिना टेलीमेट्री दस्तावेज़ के डिफ़ॉल्ट रूप से चालू PostHog एनालिटिक्स सक्षम किया। तीन महीने से अधिक बाद, 18 जून को, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) ने एक रीडिज़ाइन के दौरान उपयोगकर्ताओं को बिना कुछ बताए चुपचाप होमपेज से *"No telemetry"* का वादा हटा दिया।
- **क्लोज़्ड-सोर्स फ़र्स्ट-पार्टी डेटा रिटेंशन (`PR #15028`):** अक्टूबर 2026 में, टेलीमेट्री बैच (`FLUSH_INTERVAL_MS = 10_000`) T3 के क्लोज़्ड-सोर्स एंडपॉइंट [`https://ingest.t3.codes/`](https://ingest.t3.codes/) के ज़रिए रूट किए गए। `AnalyticsService.ts` की पंक्ति 1 पुष्टि करती है कि सर्वर PostHog पर आगे भेजने से पहले हर इवेंट की कच्ची प्रति रखता है।
- **क्रॉस-टूल क्रेडेंशियल रीडिंग और बिना सॉल्ट वाला SHA-256 (`PR #21506`):** बेसलाइन `9d3195b4` में `Identify.ts` ने `~/.codex/auth.json` (OpenAI के `user_id` JWT क्लेम को डिकोड करते हुए) और `~/.claude.json` (`oauthAccount.accountUuid`) को T3 Connect उपयोगकर्ता IDs के साथ पढ़ा, और अलग-अलग मशीनों को एक ही व्यक्ति से जोड़ने के लिए बिना सॉल्ट वाले SHA-256 डाइजेस्ट (`telemetryId.ts`) निकाले। चूँकि T3 के पास Clerk IDs सादे टेक्स्ट में हैं, बिना सॉल्ट वाले डाइजेस्ट नियतात्मक रूप से रिवर्स किए जा सकते हैं।
- **बारीक उपयोग कैप्चर:** `ProviderUsageAnalytics.ts` और `FeatureUsage.ts` ने प्रोवाइडर, कस्टम मॉडल, रीज़निंग एफ़र्ट, परमिशन मोड, टोकन संख्या, प्रोजेक्ट/थ्रेड संख्या, OS/WSL मेटाडेटा और **35 अलग-अलग UI/कमांड क्रियाएँ** रिपोर्ट कीं।
- **समुदाय के चार ऑप्ट-आउट PR अस्वीकार:** 23 जून को मेंटेनर Julius ने [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) को (`not planned`) बंद किया: *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) चुपचाप बंद किया गया, और समुदाय के चार ऑप्ट-आउट PR (`#13458`, `#16763`, `#21248`, `#27077` — 147 पासिंग टेस्ट, बॉट द्वारा स्वीकृत) को `unwanted` के रूप में अस्वीकार कर दिया गया।

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **आंशिक रूप से पैच किया गया:** सार्वजनिक रूप से उजागर होने के बाद (2.26M+ व्यूज़), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) ने `~/.codex/auth.json` और `~/.claude.json` की रीडिंग हटा दी; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) ने गैर-कैटलॉग मॉडलों को `custom:<driver>` के रूप में मास्क किया; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) और [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) ने CI और `DO_NOT_TRACK` ऑप्ट-आउट जोड़े।
- **अभी भी खुला:** `AnalyticsService.ts:156` ऑप्ट-आउट जाँचने से पहले अब भी डिस्क पर स्थानीय इंस्टॉल ID लिखता है; `DesktopShellEnvironment.ts` अब भी `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED` को फ़ॉरवर्ड करना छोड़ता है; `ingest.t3.codes` क्लोज़्ड-सोर्स ही बना हुआ है; सेटिंग्स UI में कोई टॉगल मौजूद नहीं है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![कमिट 3bdaa6e1 द्वारा "No telemetry / Unless you opt in. Full stop." का होमपेज वादा चुपचाप हटाया जाना](../../evidence/02-no-telemetry-removed.png)

![बिना सॉल्ट वाले SHA-256 क्रॉस-डिवाइस एट्रिब्यूशन के लिए Identify.ts का ~/.codex/auth.json और ~/.claude.json पढ़ना](../../evidence/03-identify-codex-claude.png)

![Issue #1397 को not planned के रूप में बंद किया गया: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 को 147 पासिंग टेस्ट के बावजूद unwanted के रूप में अस्वीकार किया गया](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## प्राथमिक स्रोत

- [X पर मूल जाँच (भाग 1 · 2.26M+ व्यूज़)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [कमिट `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [ऑडिट के बाद का PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [गहन तकनीकी डोज़ियर 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
