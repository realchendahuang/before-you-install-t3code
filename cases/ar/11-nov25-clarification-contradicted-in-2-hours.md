# #11 · توضيح 25 نوفمبر يُنقض خلال ساعتين عبر طلبات دمج ليلية وملف تفريغ بحجم 100 ميغابايت

> في صباح 25 نوفمبر، قدّم @theo ثلاث تطمينات عريضة بشأن الخصوصية، وأصدر ملف تفريغ لبيانات القياس (telemetry) بحجم 100 ميغابايت — وقد نُقضت الادعاءات الثلاثة كلها في غضون ساعتين بفضل طلبات الدمج التي قدّمها فريقه نفسه وملف التفريغ المضغوط بـ gzip ذاته.

<!-- section:claim -->
## ما الذي جرى الادعاء به

في توضيحه الصباحي بتاريخ 25 نوفمبر ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) وردّه اللاحق ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924))، أكّد `@theo` للمستخدمين:
- أن `T3 Code` *"never collected file paths."*
- أن متغيّرات البيئة *"always disabled telemetry cleanly."*
- أن عمليات التثبيت التي يختار أصحابها عدم المشاركة لا تكتب أي ملفات تتبّع محلية، وأن بصمات مالك Claude كانت *"broken."*

<!-- section:evidence -->
## ما الذي تُظهره الأدلة

- **التناقض الأول — تسريب مسار مساحة العمل المطلق عبر `git.cwd` (`PR #42450`):** بعد نحو 90 دقيقة من المنشور، دمج المشرف الأساسي Julius [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450)، معترفًا بأن عمليات التشغيل التي تُسلَّم عبر relay من الـ webhooks صدّرت نطاقات تنفيذ كاملة إلى Axiom — بما فيها نطاقات Git التي تحتوي على `git.cwd` (**مسار مساحة العمل المطلق الكامل، واسم مستخدم نظام التشغيل، واسم المستودع**).
- **التناقض الثاني — تعطيل جمع البيانات المعطوب في Windows وmacOS (`PR #42376`، `PR #42464`):** اعترف [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) بأن تطبيق Windows المكتبي تجاهل متغيّرات بيئة المستخدم المحفوظة `T3CODE_TELEMETRY_ENABLED=false` عند تشغيله من عمليات كانت موجودة مسبقًا. واعترف [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) بأن تتبّع relay عند أول تشغيل على macOS/Linux كان يُهيَّأ قبل اكتشاف الـ shell، متجاهلًا اختيارات عدم المشاركة في `~/.zshrc` طوال الجلسة.
- **التناقض الثالث — كتابة غير مشروطة على القرص و264 سجلًا حيًّا لـ Claude داخل `events.clean.jsonl`:** لا يزال [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` at `ca81b7b9`) يستدعي `getTelemetryIdentity` دون شرط عند بدء التشغيل، فيكتب UUID الخاص بالتثبيت المحلي (`upsertAnonymousId`) قبل التحقق من `telemetryEnabled`. وفي الوقت نفسه، أظهرت ترويسة gzip لملف التصدير العام الخاص بـ `@theo` (`6,056,594` بايت بعد الضغط، و`95,789` حدثًا) اسم ملف أصلي هو `events.clean.jsonl` جرى توليده قبل 20 دقيقة من النشر — ومع ذلك كان لا يزال يحتوي على **264 سجلًا حيًّا لمالك Claude** تربط **4 أجهزة منفصلة** (معرّفات `installId`) بتجزئة SHA-256 واحدة، إلى جانب نماذج proxy خاصة منقولة حرفيًا (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## حالة الإصلاح في المصدر (`ca81b7b9`)

- **مُرقَّع جزئيًا:** دُمجت `PR #42450` و`PR #42376` و`PR #42464` خلال الليل.
- **لا يزال مفتوحًا:** لا يزال `AnalyticsService.ts:156` يكتب المعرّف المجهول المحلي دون شرط قبل التحقق من اختيارات عدم المشاركة، ولا يزال `DesktopShellEnvironment.ts` يغفل تمرير `T3CODE_OTEL_SDK_DISABLED` و`OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## الأدلة المرئية

![PR #42450 يعترف بأن العمليات التي يطلقها relay صدّرت مسارات مساحة العمل المطلقة git.cwd إلى Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 يعترف بأن تطبيق Windows المكتبي تجاهل متغيّرات البيئة المحفوظة T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 يعترف بأن تتبّع relay عند أول تشغيل على macOS تجاهل اختيارات عدم المشاركة في ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![تدقيق جنائي لملف events.clean.jsonl يكشف عن 264 سجلًا لـ Claude تربط 4 أجهزة ومعرّفات نماذج proxy خاصة](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## المصادر الأولية

- [التحقيق الأصلي على X (الجزء 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [توضيح `@theo` في 25 نوفمبر (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [الردّ اللاحق (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [ملف التفريغ العام المضغوط بـ gzip](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [الملف التقني المفصّل 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
