# #11 · 25 नवंबर का स्पष्टीकरण रातों-रात आए PR और 100 MB डंप से 2 घंटे के भीतर खारिज

> 25 नवंबर की सुबह, @theo ने गोपनीयता के तीन व्यापक आश्वासन दिए और 100 MB का टेलीमेट्री डंप जारी किया — तीनों दावे दो घंटे के भीतर उनकी ही टीम के PR और उसी gzip किए गए डंप से खारिज हो गए।

<!-- section:claim -->
## क्या दावा किया गया था

अपने 25 नवंबर की सुबह के स्पष्टीकरण ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) और अनुवर्ती उत्तर ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) में, `@theo` ने उपयोगकर्ताओं को आश्वस्त किया:
- T3 Code ने *"never collected file paths."*
- पर्यावरण चर *"always disabled telemetry cleanly."*
- ऑप्ट-आउट किए गए इंस्टॉल शून्य स्थानीय ट्रैकिंग फ़ाइलें लिखते हैं, और Claude owner hashes *"broken."* थे।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **विरोधाभास 1 — `git.cwd` पूर्ण वर्कस्पेस पाथ लीक (`PR #42450`):** पोस्ट के लगभग 90 मिनट बाद, कोर मेंटेनर Julius ने [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450) मर्ज किया, जिसमें स्वीकार किया गया कि relay-delivered webhook रन ने पूरे execution spans Axiom को निर्यात किए — जिनमें `git.cwd` वाले Git spans शामिल थे (**पूर्ण निरपेक्ष वर्कस्पेस पाथ, OS उपयोगकर्ता नाम, और रिपॉज़िटरी नाम**)।
- **विरोधाभास 2 — टूटे Windows और macOS ऑप्ट-आउट (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) ने स्वीकार किया कि Windows डेस्कटॉप ने पहले से मौजूद प्रोसेस से लॉन्च होने पर सहेजे गए `T3CODE_TELEMETRY_ENABLED=false` उपयोगकर्ता पर्यावरण चर को नज़रअंदाज़ किया। [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) ने स्वीकार किया कि macOS/Linux first-launch relay tracing shell discovery से पहले आरंभ हो गया, जिससे पूरे सत्र के लिए `~/.zshrc` ऑप्ट-आउट नज़रअंदाज़ हो गए।
- **विरोधाभास 3 — बिना शर्त डिस्क राइट और `events.clean.jsonl` में 264 लाइव Claude रिकॉर्ड:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`ca81b7b9` पर `line 156`) अभी भी स्टार्टअप पर बिना शर्त `getTelemetryIdentity` कॉल करता है, और `telemetryEnabled` जाँचने से पहले स्थानीय इंस्टॉल UUID (`upsertAnonymousId`) लिखता है। इस बीच, `@theo` के सार्वजनिक एक्सपोर्ट (`6,056,594` बाइट संपीड़ित, `95,789` इवेंट) के gzip हेडर में मूल फ़ाइल नाम `events.clean.jsonl` दिखा, जो पोस्ट करने से 20 मिनट पहले जनरेट हुआ था — फिर भी इसमें **264 लाइव Claude owner रिकॉर्ड** थे, जो **4 अलग-अलग मशीनों** (`installId`s) को एक SHA-256 hash से जोड़ते थे, साथ ही वर्बेटिम निजी प्रॉक्सी मॉडल (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`) भी थे।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **आंशिक रूप से पैच किया गया:** `PR #42450`, `PR #42376`, और `PR #42464` रातों-रात मर्ज हो गए।
- **अभी भी खुला:** `AnalyticsService.ts:156` ऑप्ट-आउट जाँचने से पहले अभी भी स्थानीय अनाम ID बिना शर्त लिखता है, और `DesktopShellEnvironment.ts` अभी भी `T3CODE_OTEL_SDK_DISABLED` और `OTEL_SDK_DISABLED` को फ़ॉरवर्ड करना छोड़ देता है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![PR #42450 स्वीकार करता है कि relay-ट्रिगर रन ने git.cwd निरपेक्ष वर्कस्पेस पाथ Axiom को निर्यात किए](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 स्वीकार करता है कि Windows डेस्कटॉप ने सहेजे गए T3CODE_TELEMETRY_ENABLED=false env vars को नज़रअंदाज़ किया](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 स्वीकार करता है कि macOS first-launch relay tracing ने ~/.zshrc ऑप्ट-आउट नज़रअंदाज़ किए](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![events.clean.jsonl का फ़ोरेंसिक ऑडिट जो 4 मशीनों और निजी प्रॉक्सी मॉडल ID को जोड़ते 264 Claude रिकॉर्ड दर्शाता है](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` 25 नवंबर का स्पष्टीकरण (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [अनुवर्ती उत्तर (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [सार्वजनिक gzipped डंप](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [गहन तकनीकी डोज़ियर 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
