# #13 · शून्य GitHub Security Advisories, चुपचाप दिए गए high-severity पैच और जल्दबाज़ी में लिखा `SECURITY.md`

> X पर चीनी सोर्स-कोड ऑडिटरों को खारिज करते हुए T3 Code ने चुपचाप high-severity कमज़ोरियों के फ़िक्स merge किए — जिनमें secret-store path traversal, क्रॉस-डोमेन token लीक और अविश्वसनीय repo से कमांड चलना शामिल है — और प्रकाशित GitHub Security Advisories की संख्या 0 बनी रही।

<!-- section:claim -->
## क्या दावा किया गया

- 24 नवंबर को `@theo` ने X पर चीनी भाषा में किए गए तकनीकी ऑडिट को *"the biggest fucking cesspit"* से आया बताकर खारिज कर दिया और उन्हें पढ़ने वाले डेवलपर्स का अपमान किया ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877))।
- जल्दबाज़ी में किए गए `SECURITY.md` संशोधनों (`PR #38812`, `PR #41942`) ने व्यापक host access और unencrypted transport को स्वीकार्य, इरादे के अनुसार तय सीमाएँ बताया।

<!-- section:evidence -->
## साक्ष्य क्या दिखाते हैं

- **शून्य प्रकाशित Security Advisories (`0`):** `ca81b7b9` तक `pingdotgg/t3code` के [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) पेज पर **शून्य** प्रकाशित advisory दर्ज हैं — यानी मौजूदा desktop/server उपयोगकर्ताओं को कोई औपचारिक CVE चेतावनी या अपग्रेड warning नहीं मिली।
- **high-severity कमज़ोरियाँ चुपचाप ठीक की गईं:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): डिवाइस approval से पहले relay `jti`/`nonce` के ज़रिए `ServerSecretStore` में path traversal।
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): क्रॉस-डोमेन एंटरप्राइज़ GitHub/GitLab token लीक।
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) और [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): बिना sandbox वाले desktop browser preview का अलगाव और worktree layout कमांड की पुष्टि।
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): desktop में Clerk token फ़ाइल की अनुमतियाँ सिर्फ़ owner तक सीमित।
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): करीब 3,000 लाइनों का पैच, जिसने आख़िरकार अविश्वसनीय repository configs से कमांड चलाने से पहले पुष्टि का prompt जोड़ा (साथ में पहले के चुपचाप किए गए फ़िक्स `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`)।
- **स्थानीय स्तर पर मौजूद, अनसुलझे सुरक्षा दोष:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (external path traversal/symlinks) और [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (Windows का `externalLauncher.ts`, जो `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` चलाता है और जिसे AVG/Avast ने `IDP.HELU.PSE96` के रूप में फ़्लैग किया) अब तक merge नहीं हुए हैं।
- **`SECURITY.md` architecture मज़बूत करने के बजाय ज़िम्मेदारी की सीमा घटाता है:** यह साफ़-साफ़ घोषित करता है कि workspace के बाहर OS-व्यापी `filesystem:read`, iOS/LAN पर plain HTTP transport, और compromised relay signing key के ज़रिए पूरी host मशीन पर कब्ज़ा *intended design boundaries* हैं।

<!-- section:status -->
## अपस्ट्रीम स्थिति (`ca81b7b9`)

- **अब भी अनसुलझा:** प्रकाशित GitHub Security Advisories अब भी **0** पर हैं; `Issue #26489` और `PR #30997` अब तक ठीक नहीं हुए; `SECURITY.md` OS-व्यापी reads और plain HTTP को आज भी इरादे के अनुसार स्वीकार्य व्यवहार बताता है।

<!-- section:visuals -->
## दृश्य साक्ष्य

![PR #39483 चुपचाप ServerSecretStore path traversal ठीक करता हुआ, बिना कोई Security Advisory प्रकाशित किए](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997: एंटीवायरस द्वारा फ़्लैग किए गए Windows Base64 PowerShell लॉन्च के लिए खुला फ़िक्स](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md OS-व्यापी reads, iOS plain HTTP और relay-key से मशीन पर कब्ज़े को इरादे के अनुसार तय सीमाएँ बताता हुआ](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## प्राथमिक स्रोत

- [मूल X जाँच (भाग 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 प्रकाशित)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [गहन तकनीकी डोज़ियर 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
