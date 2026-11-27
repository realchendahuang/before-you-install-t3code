# #13 · صفر من التنبيهات الأمنية على GitHub، وترقيعات صامتة للثغرات عالية الخطورة، و`SECURITY.md` مُتعجَّل

> بينما كان يستهين بالمدقّقين الصينيين لمصدر الشيفرة على منصة X، دمج T3 Code بهدوء إصلاحات لثغرات عالية الخطورة — من بينها تجاوز المسار في مخزن الأسرار، وتسريب الرموز عبر النطاقات، وتنفيذ أوامر من مستودعات غير موثوقة — مع إبقاء التنبيهات الأمنية المنشورة على GitHub عند 0.

<!-- section:claim -->
## ما الذي قيل

- في 24 نوفمبر، استهان `@theo` على منصة X بالتدقيقات التقنية المكتوبة بالصينية ووصفها بأنها صادرة عن *"the biggest fucking cesspit"*، وأهان المطوّرين الذين يقرأونها ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- صاغت مراجعات `SECURITY.md` المتعجَّلة (`PR #38812`، `PR #41942`) الوصول الواسع إلى المضيف والنقل غير المشفَّر بوصفهما حدودًا مقصودة ومقبولة.

<!-- section:evidence -->
## ما تُظهره الأدلة

- **صفر تنبيهات أمنية منشورة (`0`):** حتى `ca81b7b9`، تعرض صفحة [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) الخاصة بـ `pingdotgg/t3code` **صفر** تنبيهات منشورة — أي أن مستخدمي سطح المكتب/الخادم الحاليين لا يتلقّون أي تحذيرات رسمية عبر CVE أو تنبيهات بالترقية.
- **ثغرات عالية الخطورة جرى إصلاحها بصمت:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): تجاوز المسار (path traversal) في `ServerSecretStore` عبر `jti`/`nonce` الخاص بالـ relay قبل الموافقة على الجهاز.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): تسريب رموز GitHub/GitLab للمؤسسات عبر النطاقات.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) و[`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): عزل معاينة المتصفح على سطح المكتب خارج بيئة العزل، وتأكيد أوامر تخطيط worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): أذونات ملف رمز Clerk على سطح المكتب مقصورة على المالك.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): ترقيع بحجم ~3,000 سطر يضيف أخيرًا مطالبات تأكيد قبل تنفيذ أوامر من إعدادات مستودعات غير موثوقة (إلى جانب إصلاحات صامتة سابقة `#22190`، `#37823`، `#39464`، `#39480`، `#40133`، `#41886`).
- **عيوب أمنية محلية ما زالت مفتوحة:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (تجاوز المسار/الروابط الرمزية الخارجية) و[`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (ملف `externalLauncher.ts` على Windows يشغّل `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`، وقد صنّفه AVG/Avast بأنه `IDP.HELU.PSE96`) لا يزالان غير مدموجين.
- **`SECURITY.md` يقلّص نطاق المسؤولية بدلًا من تحصين البنية:** يعلن صراحةً أن `filesystem:read` على مستوى نظام التشغيل خارج مساحات العمل، ونقل HTTP غير المشفَّر على iOS/الشبكة المحلية، والسيطرة الكاملة على جهاز المضيف عبر مفتاح توقيع relay مخترق، كلها *حدود تصميم مقصودة*.

<!-- section:status -->
## الحالة في المستودع الأصلي (`ca81b7b9`)

- **ما زال مفتوحًا:** التنبيهات الأمنية المنشورة على GitHub لا تزال عند **0**؛ و`Issue #26489` و`PR #30997` لا يزالان دون إصلاح؛ ويواصل `SECURITY.md` تصنيف القراءات على مستوى نظام التشغيل وHTTP غير المشفَّر كسلوك مقصود.

<!-- section:visuals -->
## الأدلة المرئية

![PR #39483 يصلح بصمت تجاوز المسار في ServerSecretStore دون نشر تنبيه أمني](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 إصلاح مفتوح لتشغيل PowerShell بترميز Base64 على Windows صنّفه مكافح الفيروسات](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md يصنّف القراءات على مستوى نظام التشغيل، وHTTP غير المشفَّر على iOS، والسيطرة على الجهاز عبر مفتاح relay، كحدود مقصودة](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## المصادر الأساسية

- [تحقيق X الأصلي (الجزء 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 منشور)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [الملف التقني المفصّل 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
