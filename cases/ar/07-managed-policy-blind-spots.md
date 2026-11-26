# #07 · تناقض Managed Policy: أربع نقاط عمياء موثّقة في القياس عن بُعد

> ادّعى `@theo` أن T3 Code يمتلك "best corporate managed policy system" يجعل "trivial to turn off all telemetry" — وهو ما تنفيه مباشرةً وثائق T3 Code نفسها `docs/user/telemetry.md` و`docs/user/managed-policy.md`.

<!-- section:claim -->
## ما الذي قيل

- في 24 نوفمبر الساعة 19:13 بتوقيت CST، تجاهل `@theo` غياب مفاتيح إلغاء الاشتراك للمستخدمين: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- وبعد نصف ساعة، أضاف أن بيانات المحادثة *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## ما الذي تُظهره الأدلة

توثّق وثائق T3 Code الرسمية نفسها ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) و[`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) أربع نقاط عمياء ملموسة:

- **نشر بصلاحيات المسؤول فقط (لا يوجد أي مفتاح شخصي في الواجهة):** لا يملك مستخدمو تطبيق سطح المكتب أي مفتاح في الإعدادات. تتطلّب Managed Policy وجود MDM/GPO أو مسارات نظام محمية بصلاحيات المسؤول (`/Library/Application Support/T3Code/policy.json`، `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`، أو `/etc/t3code/policy.json`)، وهي مسارات يتعذّر تمامًا على مستخدمي سطح المكتب من غير المسؤولين الوصول إليها.
- **تطبيق الويب المستضاف (`app.t3.codes`) يتجاهل السياسة:** يتجاهل تطبيق المتصفح متغيّرات بيئة الخادم وManaged Policy، ويُصدر آثار الاتصال عندما يُبنى مع تفعيل التتبّع، و*"has no relay tracing toggle."*
- **تطبيقات الجوال خارج سياسة الخادم:** تؤكّد الوثائق الرسمية أن متغيّرات بيئة الخادم وManaged Policy *"do not disable mobile tracing."*
- **`Publish agent activity` يتجاهل إلغاء الاشتراك:** يرفع عناوين المشاريع وعناوين المحادثات وأسماء النماذج والحالة الحيّة إلى T3 Connect — وتنصّ الوثائق صراحةً: *"The telemetry opt-out does not disable it."* وإضافةً إلى ذلك، فإن مقاطع Axiom الفاشلة وسجلات الأعطال *"can quote a value the app was handling"*، ويمكن لـ`Agent feedback` إرفاق ما يصل إلى 16 KB من رسائل المحادثة.

<!-- section:status -->
## حالة المستودع الأعلى (`ca81b7b9`)

- **لا يزال مفتوحًا:** أضاف [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) خلال الليل مفتاحًا للتتبّع داخل تطبيق الجوال، لكن Managed Policy لا يزال عاجزًا عن تعطيل تتبّع الجوال، ولا يزال `app.t3.codes` المستضاف بلا أي مفتاح لإلغاء الاشتراك، ولا يزال `Publish agent activity` يتجاهل عمليات إلغاء اشتراك القياس عن بُعد، ولا يوجد أي مفتاح في واجهة إعدادات سطح المكتب.

<!-- section:visuals -->
## الأدلة البصرية

![وثائق docs/user/telemetry.md الرسمية تؤكّد أن app.t3.codes بلا مفتاح، وأن الجوال يتجاهل Managed Policy، وأن نشاط الوكيل يتجاهل إلغاء الاشتراك](../../evidence/05-telemetry-cant-disable.png)

![وثائق docs/user/managed-policy.md الرسمية تسرد مسارات نظام محمية بصلاحيات المسؤول عبر macOS وWindows وLinux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![منشور Theo في 24 نوفمبر الذي يزعم أن Managed Policy يجعل تعطيل كل أشكال القياس عن بُعد أمرًا تافهًا](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` ادّعاء Managed Policy (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [الملف التقني المعمّق 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
