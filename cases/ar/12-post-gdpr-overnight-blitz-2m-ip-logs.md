# #12 · ست ساعات من هجوم ليلي سريع بعد GDPR: سجلات IP بمعدل 2.2 مليون/ساعة وحذف حساب معطّل

> بعد تقديم شكوى رسمية بموجب GDPR الأوروبي في 24 نوفمبر، كشفت ست ساعات من الترقيعات الطارئة الليلية عن غير قصد أربعة إفصاحات أعمق عن الخصوصية — في مقدمتها spans من Axiom موسومة بعناوين IP بمعدل 2.2 مليون في الساعة، محتفظ بها 30 يوماً.

<!-- section:claim -->
## ما الذي قيل

- حتى بعد 3.5 ساعات من دمج `PR #42380`، ردّ `@theo` علناً بأن عناوين IP الخاصة بالمتصلين قد حُذفت بالفعل.
- وعدت الوثائق الرسمية (`docs/user/telemetry.md`) بأن تقارير `agent.feedback` مجهولة الهوية، وأن حذف الحساب يزيل بيانات المستخدم إزالة نظيفة.

<!-- section:evidence -->
## ما تُظهره الأدلة

- **2.2 مليون span في الساعة لعناوين IP وUser-Agent في الترحيل (`PR #42380`):** كل span لطلب ترحيل يُصدَّر إلى Axiom — نحو **2.2 مليون span في الساعة، محتفظ بها 30 يوماً** — كان يسجّل `client.address` (عنوان IP الحقيقي للمتصل من `cf-connecting-ip`) و`user_agent.original` مباشرة إلى جانب `user.id` (مع بقاء سجلات Cloudflare Workers بنسبة 1% منفصلة).
- **حذف حساب Clerk المعطّل (`PR #42285` و`PR #42430`):** كان حذف حساب مستخدم في Clerk يترك سابقاً صفوف ترحيل PlanetScale وأنفاق Cloudflare النشطة تعمل في الخلفية — إلى أن أجبر طلب حذف فعلي لبيانات مستخدم المهندسين على تشغيل **SQL مكتوب يدوياً وتفكيك يدوي للأنفاق**.
- **تسريب رموز الإشعارات ومعرّفات المستخدمين على الجوال (`PR #42459` و`PR #41859`):** كانت حمولات إشعارات FCM على Android ترسل قيم `user_id` الخاصة بـClerk بنص صريح إلى Google مع كل إشعار؛ بينما التقطت spans وسجلات الأخطاء الخاصة بـAPNs على iOS عناوين URL كاملة لإشعارات الجهاز تحمل رموز الإشعارات.
- **دفعات ملاحظات "anonymous" مختلطة (`PR #42466`):** كانت أحداث `agent.feedback` المفترض أنها مجهولة تُجمَّع داخل طلب HTTP POST نفسه بالضبط إلى جانب أحداث `installId` المعرّفة وبصمات كاملة للمضيف (نظام التشغيل، المعمارية، توزيعة WSL الخام)، بما يناقض `docs/user/telemetry.md` مباشرة.

<!-- section:status -->
## حالة المستودع الأصلي (`ca81b7b9`)

- **مُرقَّع جزئياً:** دُمجت طلبات الدمج الطارئة `#42380` و`#42285` و`#42430` و`#42459` و`#41859` و`#42466` خلال سباق GDPR الليلي.
- **لا يزال مفتوحاً:** بقي `privacy-policy.astro` دون تغيير منذ `2026-10-06`، ويحتفظ `ingest.t3.codes` مغلق المصدر بنسخ خام من الأحداث دون إمكانية تدقيق مستقلة، ولم تُفصح نوافذ الاحتفاظ السابقة لمدة 30 يوماً في Axiom رسمياً للمستخدمين المتأثرين قط.

<!-- section:visuals -->
## الأدلة المرئية

![PR #42380 يكشف أن spans الترحيل بمعدل ~2.2 مليون/ساعة سجّلت عنوان IP الحقيقي للمتصل وUser-Agent إلى جانب user.id لمدة 30 يوماً في Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 يعترف بأن حذف الحساب كان يترك سابقاً صفوف PlanetScale وأنفاق Cloudflare النشطة خلفه](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 يعترف بأن إشعارات FCM على Android أرسلت قيم user_id الخام من Clerk إلى Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 يعترف بأن الملاحظات المجهولة جُمعت في دفعات إلى جانب installId وبصمات المضيف](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [الملف التقني المفصّل 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
