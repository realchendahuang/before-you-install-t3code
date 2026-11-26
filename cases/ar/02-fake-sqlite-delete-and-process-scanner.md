# #02 · حذف سلاسل SQLite الزائف (تضخّم 41.6 GB) ومسح كل عمليات نظام التشغيل كل 5 ثوانٍ

> النقر على «الحذف النهائي» كان يترك سجل المحادثة كاملًا داخل `statev2.sqlite` (مما ينفخ الأقراص المحلية إلى 41.6 GB)، في الوقت الذي كان فيه مُراقِب خلفي مكتوب بـ Rust يمسح كل عمليات نظام التشغيل وسطر الأوامر الكامل كل 5 ثوانٍ، دون أي خيار للانسحاب.

<!-- section:claim -->
## ما الذي قيل

- كان مربّع تأكيد الحذف في الشريط الجانبي (`useThreadActionMenu.ts`) يقول للمستخدمين صراحةً: *"This permanently clears conversation history for this thread."*
- كان T3 Code يُسوَّق على أنه مساحة عمل برمجية محلية نظيفة وسريعة.

<!-- section:evidence -->
## ما تُظهره الأدلة

- **حذف نهائي زائف (`Issue #17845`، `#28903`):** عند الأساس `9d3195b4`، كان حذف سلسلة يقتصر على إضافة حدث `"thread.deleted"` إلى `statev2.sqlite` مع ترك الرسائل السابقة ومخرجات الأدوات وآثار الاستدلال سليمة على القرص. وقد وثّق المستخدمون تضخّم `statev2.sqlite` إلى **25.9 GB** في 3 أسابيع (90% منها سلاسل «محذوفة»)، و**41.6 GB** في 6 أسابيع، و**33 GB** في 7 أسابيع.
- **مسح عمليات وسطور أوامر على مستوى الجهاز بالكامل (`Issue #11222`، `PR #41889`):** كان المساعد الخلفي `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) يشغّل `ProcessesToUpdate::All` مع `with_cmd(UpdateKind::Always)` كل 5 ثوانٍ حتى مع إغلاق التشخيصات — محتفظًا بـ 280–300 مقبضًا دائمًا عبر أكثر من 440 تطبيقًا ولعبة غير ذات صلة على Windows. وفي 24 نوفمبر، أكّد [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) أن التشخيصات كانت تلتقط **سطوح أوامر العمليات الكاملة** (التي غالبًا ما تحمل مفاتيح API بنص صريح، وكلمات مرور قواعد البيانات، ورموزًا) داخل اللقطات والقياسات عن بُعد.
- **تسريب أسماء مضيفات الشركات وجلب إلزامي عند بدء التشغيل:** كانت طلبات الأيقونات المفضّلة (favicon) في الواجهة الأمامية تسرّب أسماء مضيفين داخلية (مثل `devbox.localdomain`) إلى خدمة الأيقونات المفضّلة لدى Google (`PR #16950`، `PR #32657`)، في حين كان بدء تشغيل الخادم يجلب بلا شرط بيانات توافق من `raw.githubusercontent.com` دون أي خيار للانسحاب (`Issue #36479`).
- **استهلاك حادّ للحصص وأخطاء في الطاقة:** كان تشغيل Claude عبر Agent SDK يستهلك حصص الـ 5 ساعات بسرعة **1.7x** فوق المعدل الطبيعي (`Issue #7338`، `Issue #24649`، 81 تعليقًا)، بينما سجّلت تراجعات GPU استهلاكًا يصل إلى **136x** من طاقة Electron المماثلة — مثبِّتةً GPU في جهاز MacBook عند **60W** (نفاد البطارية في 78 دقيقة) و**18W** بعد إغلاق تبويب الويب (`Issue #3143`، `Issue #40581`).

<!-- section:status -->
## الحالة في المصدر (`ca81b7b9`)

- **مُعالَج جزئيًا:** أضاف [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) عملية `thread-content.purge` غير متزامنة (مغلقًا `#17845`)، وقلّص [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) نطاق قراءات مُراقِب العمليات على Windows.
- **لا يزال مفتوحًا:** السلاسل المصدرية المحذوفة ما زالت تحتفظ بالسجل ما دامت مُشارًا إليها من تفرّعات حيّة، أو في انتظار `merge_back`، أو من وكلاء فرعيين أحياء؛ وتبقى صفوف الشواهد (tombstone) في SQLite، ولا يزال استعادة مساحة القرص تتطلب `VACUUM` بلا اتصال؛ ويحتفظ Linux وmacOS باكتشاف `ProcessesToUpdate::All`، كما يبقى `PR #41889` مفتوحًا.

<!-- section:visuals -->
## الأدلة البصرية

![Issue #17845 توثّق تضخّم السلاسل المحذوفة نهائيًا لـ statev2.sqlite إلى عشرات الجيغابايتات](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 توثّق قيام t3-resource-monitor بمسح كل عملية في نظام التشغيل كل 5 ثوانٍ](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [الملف التقني المفصّل 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
