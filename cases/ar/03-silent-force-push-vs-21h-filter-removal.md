# #03 · 52 يومًا من الصمت أمام `git push --force` مقابل 21 ساعة لإزالة مرشّح خصوصية النماذج

> على مدى أكثر من 52 يومًا، أبقى T3 Code خللًا مفتوحًا كان فيه وضع Claude Auto يوافق بصمت على `git push --force origin main` دون أي تنبيه — في حين لم يحتج سوى 21 ساعة لإزالة قائمة بيضاء للخصوصية حتى تظهر النماذج الخاصة على لوحة الصدارة العامة لـ @theo.

<!-- section:claim -->
## ما الذي قيل

- صُمّم وضع Claude Auto لتصعيد الإجراءات التدميرية عالية الخطورة (مثل الدفع القسري إلى `main`) لطلب موافقة بشرية صريحة.
- جرى تصوير القياسات عن بُعد (telemetry) على أنها مؤشرات مجمّعة آمنة من ناحية الخصوصية.

<!-- section:evidence -->
## ما تُظهره الأدلة

- **أكثر من 52 يومًا دون إصلاح — `git push --force` صامت (`Issue #15353`):** في `ClaudeAdapterV2.ts`، كان وضع Auto يتجاوز `!requiresClaudeApproval(context)` مباشرةً إلى `"allow"`. وحين اعترض مصنّف الأمان الخاص بـ Claude على `git push --force origin main` مرتين، ثم صعّد المحاولة الثالثة لطلب تأكيد بشري، وافق عليها T3 Code بصمت دون أي تنبيه في واجهة المستخدم وسجّل `"source": "user_temporary"`. وبقي طلبا إصلاح من المجتمع (`#15360`، `#35207`) دون مراجعة حتى أغلقهما البوت تلقائيًا؛ وظل `#40692` دون دمج.
- **21 ساعة لإزالة قائمة بيضاء للخصوصية (`Issue #40948` → `PR #41237`):** في 22 نوفمبر، أشار [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) إلى أن نماذج أحدث كانت غائبة عن لوحة الصدارة العامة لـ `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) لأن `PR #29001` كان يفرض قائمة بيضاء للنماذج. وفي غضون **21 ساعة**، دُمج [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) تحت حساب `@theo` مع ملاحظة أن Theo طلب صراحةً إزالة المرشّح — ما أدى إلى نقل أسماء محلية/مؤسسية خاصة مثل `ollama/acme-internal` و`acme-azure-deployment` حرفيًا إلى التحليلات.

<!-- section:status -->
## الحالة في المستودع الأصلي (`ca81b7b9`)

- **تغيير جزئي / خلل الأمان الجوهري لا يزال مفتوحًا:** لاحقًا أخفى [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) النماذج غير المدرجة في الكتالوج تحت وسم `custom:<driver>` (ولا تزال معرّفات الكتالوج/المورّد تُبلَّغ عبر نقاط نهاية مخصّصة). **ولا يزال `Issue #15353` (`git push --force` الصامت في وضع Auto) مفتوحًا وغير مُصلَح عند `ca81b7b9`.**

<!-- section:visuals -->
## الأدلة البصرية

![Issue #15353 مفتوح منذ أكثر من 52 يومًا ويُظهر وضع Claude Auto يوافق بصمت على git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 دُمج بعد 21 ساعة من Issue #40948 لإزالة مرشّح خصوصية النماذج الخاص بـ slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## المصادر الأولية

- [التحقيق الأصلي على X (الجزء 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [تعليق إعادة الإنتاج `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [إصلاحات مجتمعية غير مدموجة: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [الملف التقني المعمّق 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
