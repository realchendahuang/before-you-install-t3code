# #15 · لا علامات تجارية مسجّلة في USPTO تقف خلف تهديد حظر GitHub و`TRADEMARK.md` بأثر رجعي بعد 17 ساعة

> حين هدّد @theo بالتواصل مع GitHub لتعليق حساب مطوّر صيني بدعوى "انتهاك العلامة التجارية"، كانت T3 Tools Inc. تملك صفر تسجيلات في USPTO لـ `T3 Code` أو `T3 Tools` أو `T3 Connect` — ثم أضافت `TRADEMARK.md` بأثر رجعي بعد 17 ساعة.

<!-- section:claim -->
## ما الذي قيل

- في 23 نوفمبر، اتّهم `@theo` مؤلف النسخة المتفرّعة بموجب MIT بانتهاك العلامة التجارية وهدّد بتعليق حسابه على GitHub ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- قبل ثلاث ساعات من دمج `TRADEMARK.md`، قال لمطوّرين سألوه إن عليه *"get a better lawyer"* ([`2125026423769555308`](https://x.com/theo/status/2125026423769555308)) — رغم أنه سخر من WordPress في سبتمبر 2024 بسبب *"unenforceable trademark dispute"* ([`1839261574005141945`](https://x.com/theo/status/1839261574005141945)).

<!-- section:evidence -->
## ما تُظهره الأدلة

- **صفر تسجيلات في USPTO لعلامات T3:** التحقّق المباشر من قاعدة USPTO TSDR (بعد خيط قاده `@vildanden_ai`، [`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)) يُظهر **0 تسجيلات** لـ `T3 Code` أو `T3 Tools` أو `T3 Connect`. طلب T3 Tools Inc. الوحيد لدى USPTO (`PING LABS`، الرقم التسلسلي [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) رُفض في فبراير 2025 ووُسم بـ `ABANDONED` في 19 مايو 2025. وفي المقابل، تملك أطراف ثالثة لا علاقة لها بالشركة تسجيلات سارية لعلامة `T3` في البرمجيات/SaaS ضمن الفئتين 9 و42 (`EquipmentShare`، التسجيل `7795672` / الرقم التسلسلي [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)؛ `ESG Operations`، التسجيل `3324707`).
- **شرط سياسة العلامات التجارية في GitHub:** بموجب [سياسة العلامات التجارية في GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)، تتطلّب طلبات إزالة العلامات التجارية لأغراض تجارية رقم تسجيل فيدرالي أو دولي تحت طائلة الحنث باليمين. وفي اللحظة التي هدّد فيها `@theo` بتعليق حساب `@DDdxx666`، لم يكن بإمكانه إكمال نموذج GitHub.
- **`TRADEMARK.md` بأثر رجعي بعد 17 ساعة (`PR #41898`):** في **12:21 بتوقيت الصين (CST) يوم 24 نوفمبر** — أي بعد 17 ساعة من تهديد الحظر — دمج `@theo` [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) الذي يُدخل `TRADEMARK.md` بادّعاء حقوق *"whether registered or unregistered"*، ثم استشهد به على X بعد 94 ثانية ([`2125082769395220688`](https://x.com/theo/status/2125082769395220688)).

<!-- section:status -->
## حالة المستودع الأصلي (`ca81b7b9`)

- **السجل العام:** يبقى `TRADEMARK.md` بأثر رجعي على `main`؛ وتواصل سجلات USPTO TSDR إظهار 0 تسجيلات لـ T3 Tools Inc. لـ `T3 Code`.

<!-- section:visuals -->
## الأدلة المصوّرة

![PR #41898 مدموج بعد 17 ساعة من تهديد الحظر، مضيفًا TRADEMARK.md بأثر رجعي](../../evidence/24-pr41898-trademark-aftermath.png)

![TRADEMARK.md يدّعي حقوقًا حصرية "whether registered or unregistered"](../../evidence/extra/p1-2b-trademark-md.png)

![Theo يقول للمطوّرين "get a better lawyer" قبل ثلاث ساعات من دمج TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 15)](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243` (PING LABS — ABANDONED)](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500` (EquipmentShare `T3`)](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [سياسة العلامات التجارية في GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [الاستشهاد بأثر رجعي بعد 94 ثانية (`2125082769395220688`)](https://x.com/theo/status/2125082769395220688) · ["Get a better lawyer" (`2125026423769555308`)](https://x.com/theo/status/2125026423769555308) · [السخرية من WordPress (`1839261574005141945`)](https://x.com/theo/status/1839261574005141945)
- [الملف التقني المعمّق 05](../../docs/dossiers/05-governance-trademark-and-history.md)
