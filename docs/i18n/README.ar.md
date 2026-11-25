<div dir="rtl">

# قبل تثبيت T3 Code

</div>

<p align="center" dir="rtl">
  <strong>اللغات الرسمية للأمم المتحدة:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md"><strong>العربية</strong></a>
</p>
<p align="center" dir="rtl">
  <strong>إصدارات المجتمع العالمي:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>
<p align="center" dir="rtl">
  <a href="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/before-you-install-t3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a>
  ·
  <a href="https://realchendahuang.github.io/before-you-install-t3code/"><strong>بوابة الأدلة التفاعلية (GitHub Pages)</strong></a>
  ·
  <a href="../EVIDENCE-INDEX.md"><strong>فهرس الأدلة المرئية (108 صور)</strong></a>
  ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>فهرس المصادر الكامل (320 رابطًا)</strong></a>
</p>
<p align="center" dir="rtl">
  <strong>خط الأساس المدقَّق:</strong> <a href="https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2"><code>9d3195b4</code></a> (<code>#42000</code>) ·
  <strong>آخر فحص للمستودع الأصلي:</strong> <a href="https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd"><code>ca81b7b9</code></a> (<code>#42634</code>، 25 نوفمبر 14:49 CST · +259 التزامًا)
</p>

<div dir="rtl">

![قبل تثبيت T3 Code — بانر التدقيق المستقل في 18 حلقة](../../evidence/00-cover-en.png)

> **النطاق وسياسة التحقق**  
> يمثّل هذا المستودع تدقيقًا مستقلًا للأمان والقياس عن بُعد (`Telemetry`) والحوكمة والسجلات العامة لمشروع `pingdotgg/t3code` (T3 Code)، جامعًا المنشورين التأسيسيين و**18 حلقة تدقيق موثّقة** نُشرت يومي 24 و25 نوفمبر 2026 إلى جانب **320 رابطًا أوليًا معياريًا** مفهرسًا في [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md) (`SRC-001`–`SRC-320`)، و**108 إيصالات مرئية ورسوم بيانية أولية** مفهرسة في [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md)، وستة ملفات تحقيق تقنية معمّقة ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md))، و[بوابة الأدلة التفاعلية](https://realchendahuang.github.io/before-you-install-t3code/)، ومجموعة بيانات كمية تضم **1,151 منشورًا متتاليًا لحساب `@theo` على X** (7–24 نوفمبر 2026). يغطي تدقيق الشيفرة خط الأساس الرئيسي [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) (`PR #42000`، `2026-11-24T08:41:04Z`) ويُتابَع باستمرار حتى أحدث التزام على فرع `main` عند [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`PR #42634`، `2026-11-25T06:49:37Z` / `2026-11-25 14:49 CST`). لا يتضمن المستودع أي روابط إعادة توجيه مختصرة ولا أي بيانات تواصل خاصة. نرحب بالتحديثات الوقائعية، أو الإصلاحات المدمجة حديثًا، أو الترجمات الإضافية عبر طلب دمج (`Pull Request`) مدعوم بمصادر أولية — راجع [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

---

## الخلاصة السريعة (TL;DR في 30 ثانية)

- **من يتأثر:** مستخدمو `pingdotgg/t3code` على سطح المكتب المحلي، وواجهة سطر الأوامر (`CLI`)، وتطبيق الويب المستضاف (`app.t3.codes`)، والهواتف المحمولة، وT3 Connect — ولا سيما التثبيتات دون صلاحيات المسؤول، والمطورون الذين يشغّلون نقاط نهاية مخصصة أو اشتراكات Antigravity/Gemini، ومستخدمو وضع `Claude Auto`، وكل من لديه جلسات GitHub أو T3 Connect مرتبطة.
- **3 نتائج أساسية مؤكدة من الشيفرة (تم التحقق منها عبر `9d3195b4` ← `ca81b7b9`):**
  1. **التتبع الافتراضي، ومعرّف الإقلاع غير المشروط، وإفصاحات ما بعد GDPR ([القسم 2](#2-التتبع-عن-بعد-وقراءة-بيانات-اعتماد-الأدوات-الأخرى-والسباق-الليلي-بعد-شكوى-gdpr-الحلقات-1-و7-و11-و12) · [الملف 01](../dossiers/01-telemetry-and-gdpr-timeline.md)):** أطلق التطبيق قياس `PostHog` مفعّلًا افتراضيًا ([PR #174](https://github.com/pingdotgg/t3code/pull/174)) بينما كانت الصفحة الرئيسية تعد بـ `"No telemetry"` حتى 18 يونيو ([التعديل `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3))؛ ولا يزال يحتفظ بنسخة من الأحداث الخام في الخادم مغلق المصدر [`https://ingest.t3.codes/`](https://ingest.t3.codes/)؛ كما أقرّت طلبات الدمج الليلية بعد GDPR بوجود **2.2 مليون سجل/ساعة تحوي IP + UA** في Axiom ([PR #42380](https://github.com/pingdotgg/t3code/pull/42380))، وتسرّب مسارات `git.cwd` ([PR #42450](https://github.com/pingdotgg/t3code/pull/42450))، وحذف حسابات ناقص في Clerk ([PR #42285](https://github.com/pingdotgg/t3code/pull/42285)). وأوقفت طلبات ما بعد التدقيق قراءة `.codex`/`.claude.json` ([PR #42299](https://github.com/pingdotgg/t3code/pull/42299))، وقنّعت النماذج المخصصة بصيغة `custom:<driver>` ([PR #42465](https://github.com/pingdotgg/t3code/pull/42465))، واستجابت لبيئات CI و`DO_NOT_TRACK` ([PR #42630](https://github.com/pingdotgg/t3code/pull/42630)، [PR #42629](https://github.com/pingdotgg/t3code/pull/42629))، **ومع ذلك لا يزال [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`السطر 156`) يكتب معرّفًا على القرص قبل التحقق من خيارات الإلغاء، ولا يزال [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) يغفل تمرير `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`، كما ينعدم أي مفتاح تعطيل في واجهة الإعدادات أو على `app.t3.codes`.**
  2. **فجوات الأمان المحلي، وخطافات SSH/المستودعات المحيطة، و`0` نشرات أمنية ([القسم 3](#3-التخزين-المحلي-ومراقبة-العمليات-وتجاوز-ضوابط-الحماية-والإصلاحات-الأمنية-الصامتة-الحلقات-2-و3-و13) · [الملف 02](../dossiers/02-local-safety-and-security-audit.md)):** ينفّذ وضع `Claude Auto` أمر `git push --force` بصمت في المحاولة الثالثة ([Issue #15353](https://github.com/pingdotgg/t3code/issues/15353)، ما زال مفتوحًا)؛ ودُمجت إصلاحات أمنية صامتة مع بقاء [**0 نشرات أمنية على GitHub**](https://github.com/pingdotgg/t3code/security/advisories) بينما يعلن [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) أن قراءة `filesystem:read` على مستوى النظام كله و`HTTP` غير المشفّر على iOS سلوك مقصود؛ كما أن فتح أي مستودع يُفعّل تهيئة `.gitmodules` تلقائيًا وبشكل تعاودي (`GitVcsDriverCore.ts`)، ويغفل ضبط `core.hooksPath=/dev/null` العام في Git (`VcsProcess.ts`)، وينفّذ خطافات `SessionStart` الفعلية لـ Claude (`ClaudeAdapterV2.ts`) مع وراثة كاملة لمتغيّري `GITHUB_TOKEN` و`SSH_AUTH_SOCK`؛ ورغم إضافة [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) تطهيرًا غير متزامن للمحادثات (مغلقًا `#17845`)، تبقى مراجع النسخ المتفرعة والوكلاء الفرعيين مع شواهد الحذف، ويتطلب تقليص حجم `statev2.sqlite` تنفيذ `VACUUM` دون اتصال، بينما قصر [PR #42577](https://github.com/pingdotgg/t3code/pull/42577) تضييق مراقبة العمليات على Windows فقط (تاركًا `ProcessesToUpdate::All` على Linux وmacOS).
  3. **انتحال Antigravity، والمرحّل غير المشفّر، وعيوب الشبكة المحلية والمصادقة، ومنح النجوم لمستودعات عشوائية ([القسم 4](#4-مخاطر-مخالفة-شروط-google-antigravity-ومرحل-t3-connect-غير-المشفر-الحلقات-4-و5) · [القسم 5.3](#53-كيف-قفز-t3-code-من-30-ألفًا-إلى-77-ألف-نجمة-خلال-25-يومًا-129-متابعًا-الحلقة-18)):** لا يزال [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts) يستخرج رموز سلسلة المفاتيح/`CredReadW` وينتحل `antigravity/hub/2.24.0` ضد `v1internal` (فيما أظهر [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) روابط تحقق Google `VALIDATION_REQUIRED` عند خطأ `403`)؛ ولا يزال **T3 Connect** يفتقر **تمامًا إلى التشفير من طرف إلى طرف (E2E)** ([Issue #32098](https://github.com/pingdotgg/t3code/issues/32098)) مع ضبط `requireConnectDeviceApproval` افتراضيًا على `false` ([`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts))؛ كما يؤكد فحص الشيفرة المصدرية عند `ca81b7b9` تعيين ملفات تعريف ارتباط جلسة بصلاحية طرفية لمدة 30 يومًا دون سمة `Secure` عبر `--lan` HTTP مع تجاوز الطلبات التي تغفل `Origin` (`PR #37042`)، وإصدار رموز Bearer غير المقيدة بـ DPoP لمدة 30 يومًا وغير القابلة للإلغاء مع انعدام مسار `/logout`، وقابلية إعادة استخدام بيانات اعتماد `?wsTicket=` في الرابط لمدة 5 دقائق، وإسقاط `isIPv4` لمقابس `::1` الخاصة بـ Tailscale Serve / Connect بصمت؛ كما يُبقي [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) منح النجوم ببيانات اعتماد الخادم غير مقيّد بمستودع بعينه.
- **إجراء فوري:** هل التطبيق مثبّت لديك بالفعل؟ انتقل مباشرة إلى [**دليل عملي للتخفيف من المخاطر ومعالجة الآثار**](#7-دليل-عملي-للتخفيف-من-المخاطر-ومعالجة-الآثار) (`export DO_NOT_TRACK=1`، وحجب `ingest.t3.codes` في `/etc/hosts`، وسياسة `Managed Policy`، وأمر `VACUUM` دون اتصال، وإلغاء تفويضات OAuth والرموز).

---

## جدول المحتويات

- [الخلاصة السريعة (TL;DR في 30 ثانية)](#الخلاصة-السريعة-tldr-في-30-ثانية)
- [النتائج المهيكلة ومصفوفة المخاطر](#النتائج-المهيكلة-ومصفوفة-المخاطر)
- [الخط الزمني للأحداث (2023–2026)](#الخط-الزمني-للأحداث-20232026)
- [1. أصل النزاع: عبارة «Steal Our Code» وتهديد تسمية النسخة المتفرعة وازدواجية المعايير](#1-أصل-النزاع-عبارة-steal-our-code-وتهديد-تسمية-النسخة-المتفرعة-وازدواجية-المعايير)
- [2. التتبع عن بعد وقراءة بيانات اعتماد الأدوات الأخرى والسباق الليلي بعد شكوى GDPR (الحلقات 1 و7 و11 و12)](#2-التتبع-عن-بعد-وقراءة-بيانات-اعتماد-الأدوات-الأخرى-والسباق-الليلي-بعد-شكوى-gdpr-الحلقات-1-و7-و11-و12)
- [3. التخزين المحلي ومراقبة العمليات وتجاوز ضوابط الحماية والإصلاحات الأمنية الصامتة (الحلقات 2 و3 و13)](#3-التخزين-المحلي-ومراقبة-العمليات-وتجاوز-ضوابط-الحماية-والإصلاحات-الأمنية-الصامتة-الحلقات-2-و3-و13)
- [4. مخاطر مخالفة شروط Google Antigravity ومرحل T3 Connect غير المشفر (الحلقات 4 و5)](#4-مخاطر-مخالفة-شروط-google-antigravity-ومرحل-t3-connect-غير-المشفر-الحلقات-4-و5)
- [5. الميزانية التجارية وتضارب مصالح المستثمرين والرعاة ومحرك 77,000 نجمة (الحلقات 6 و8 و17 و18)](#5-الميزانية-التجارية-وتضارب-مصالح-المستثمرين-والرعاة-ومحرك-77000-نجمة-الحلقات-6-و8-و17-و18)
- [6. الحوكمة وبوتات اقتباس النسخ المتفرعة وسجل العلامات التجارية ومجموعة بيانات 1,151 تغريدة والسوابق (الحلقات 9 و10 و14 و15 و16)](#6-الحوكمة-وبوتات-اقتباس-النسخ-المتفرعة-وسجل-العلامات-التجارية-ومجموعة-بيانات-1151-تغريدة-والسوابق-الحلقات-9-و10-و14-و15-و16)
- [7. دليل عملي للتخفيف من المخاطر ومعالجة الآثار](#7-دليل-عملي-للتخفيف-من-المخاطر-ومعالجة-الآثار)
- [8. المصادر الأولية وفهرس الحلقات الثماني عشرة الأصلية](#8-المصادر-الأولية-وفهرس-الحلقات-الثماني-عشرة-الأصلية)

---

## النتائج المهيكلة ومصفوفة المخاطر

| المجال وحلقات التدقيق | الخطر / الأثر | أبرز النتائج الموثّقة وأدلة المصادر | الحالة (`ca81b7b9`، 25 نوفمبر 14:49 CST) | الملف المعمّق |
|---|---|---|---|---|
| **التتبع عن بُعد والخصوصية بعد GDPR**<br>*(الحلقات 1، 7، 11، 12)* | **حرج** | تفعيل تحليلات `PostHog` افتراضيًا (`PR #174`) بينما كانت الصفحة الرئيسية تعد بـ `"No telemetry / Unless you opt in. Full stop."` (حذفها `3bdaa6e1` في 18 يونيو)؛ الاحتفاظ بنسخ خام عبر `ingest.t3.codes` مغلق المصدر (`PR #15028`)؛ تجزئة `SHA-256` غير مملّحة عبر الأدوات لملفي `~/.codex/auth.json` و`~/.claude.json` (`Identify.ts`، `telemetryId.ts`)؛ رفض 4 طلبات دمج للإلغاء (`#13458`، `#16763`، `#21248`، `#27077`)؛ ثغرات `Managed Policy` (`docs/user/telemetry.md`)؛ إصلاحات ليلية بعد شكوى GDPR تقرّ بوجود **2.2 مليون سجل تتبع/ساعة محمّلة بـ IP + UA** تُحفظ 30 يومًا في `Axiom` (`#42380`)، وتسرّب مسارات `git.cwd` (`#42450`)، وتجاهل تعطيل Win/Mac (`#42376`، `#42464`)، وتعطل حذف الحسابات (`#42285`)، وخلط الدفعات المجهولة (`#42466`). | دُمجت بعد التدقيق طلبات [`#42299`](https://github.com/pingdotgg/t3code/pull/42299) (إيقاف قراءة `.codex`/`.claude.json`)، و[`#42465`](https://github.com/pingdotgg/t3code/pull/42465) (`custom:<driver>`)، و[`#42630`](https://github.com/pingdotgg/t3code/pull/42630) (تعطيل بيئات CI)، و[`#42629`](https://github.com/pingdotgg/t3code/pull/42629) (`DO_NOT_TRACK`)؛ **لا يزال بلا إصلاح عند `ca81b7b9`:** يهيّئ `AnalyticsService.ts:156` الهوية على القرص قبل فحص الإلغاء، ويغفل `DesktopShellEnvironment.ts` تمرير `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`، ويبقى `ingest.t3.codes` مغلق المصدر الافتراضي، ولا يوجد أي مفتاح تعطيل في الواجهة أو الويب، والهاتف خارج `Managed Policy`، و`Publish agent activity` يتجاهل الإلغاء. | [**الملف 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **الأمان المحلي والنشرات الصامتة**<br>*(الحلقات 2، 3، 13)* | **حرج** | «الحذف النهائي» في الشريط الجانبي يكتفي بإلحاق `"thread.deleted"` داخل `statev2.sqlite` (تضخّم 25.9–41.6 GB، `#17845`)؛ `t3-resource-monitor` يفحص كل عمليات النظام مع سطور الأوامر (`ProcessesToUpdate::All`، `#11222`، `PR #41889`)؛ وضع `Claude Auto` يوافق بصمت على `git push --force` في المحاولة الثالثة (`#15353`، مفتوح منذ 52–53+ يومًا)؛ إزالة مرشح النماذج الخاصة خلال 21 ساعة لأجل `slopalytics.com` (`#41237`)؛ **0 نشرات أمنية على GitHub** رغم دمج إصلاحات صامتة (`#39483`، `#41757`، `#42386`، `#42504`)؛ بلاغ مفتوح حول إنذار مكافح الفيروسات لـ `Base64 PowerShell` على Windows (`#30997`)؛ فتح مستودع غير موثوق يشغّل تلقائيًا تهيئة `.gitmodules` التعاودية، ويغفل ضبط `core.hooksPath=/dev/null` العام، وينفّذ خطافات `SessionStart` الفعلية لـ Claude مع تمرير `GITHUB_TOKEN`/`SSH_AUTH_SOCK` الموروثين؛ `SECURITY.md` يعتبر `filesystem:read` على مستوى النظام و`HTTP` على iOS سلوكًا مقصودًا. | أغلق [`#42119`](https://github.com/pingdotgg/t3code/pull/42119) البلاغ `#17845` عبر تطهير غير متزامن `thread-content.purge` (يبقي سجل المصادر المرتبطة بتفرعات حية أو `merge_back` أو وكلاء فرعيين + شواهد الحذف؛ وتصغير قاعدة البيانات يتطلب `VACUUM` دون اتصال)؛ وضيّق [`#42577`](https://github.com/pingdotgg/t3code/pull/42577) قراءات مراقب Windows فقط (بينما يبقى `ProcessesToUpdate::All` على Linux/macOS و`#41889` مفتوحًا)؛ **لا يزال بلا إصلاح عند `ca81b7b9`:** `#15353`، `#26489`، `#30997`، وخطافات المستودعات غير الموثوقة + انكشاف `SSH_AUTH_SOCK`، و**`0` نشرات أمنية**، وحدود `SECURITY.md`. | [**الملف 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **شروط Antigravity ومرحّل T3 Connect**<br>*(الحلقات 4، 5)* | **مرتفع** | يضمن `docs/user/faq.md` سلامة شروط `Google Antigravity` بينما يستخرج `antigravityUsageLimits.ts` رموز سلسلة مفاتيح النظام / `CredReadW` في Windows، وينتحل `antigravity/hub/2.24.0`، ويتصل بنقاط `v1internal` الخاصة؛ يحقن `antigravityAuthSupport.ts` متغير `SSH_CONNECTION` وهميًا مسببًا تداخل الحسابات (`#41973`)؛ حظر حساب جديد بقيمة $20 خلال 3 دقائق (`#41536`)؛ `PR #33800` يدمج استطلاع مركز `CLIProxyAPI` منتحل الهوية لـ `claude`/`xai`/`antigravity`؛ يفتقر `T3 Connect` **تمامًا إلى التشفير من طرف إلى طرف (E2E)**، ويعطّل `requireConnectDeviceApproval` افتراضيًا (`#36419`)، ويشغل بوابة `OVH Caddy` مفتوحة لإنهاء TLS (`PR #32945`)؛ وتكشف فحوص المصادقة عند `ca81b7b9` عن ملفات تعريف ارتباط `--lan` غير المشفرة الصالحة لـ 30 يومًا (`PR #37042` يقتصر على HTTPS) التي تُقبل مع غياب `Origin`، ورموز Bearer غير المقيدة بـ DPoP وغير القابلة للإلغاء لـ 30 يومًا، وقيم `?wsTicket=` في الرابط القابلة لإعادة الإرسال لـ 5 دقائق، وإسقاط `isIPv4` لأنفاق `::1`. | أضاف [`#41210`](https://github.com/pingdotgg/t3code/pull/41210) روابط تحقق Google لخطأ `403 VALIDATION_REQUIRED` (ما يؤكد نشاط فحوص Google)؛ وأضاف [`#42311`](https://github.com/pingdotgg/t3code/pull/42311) إشعارات تسجيل الدخول من جهاز جديد؛ **لا يزال بلا إصلاح عند `ca81b7b9`:** شيفرة انتحال Antigravity واستخراج المفاتيح و`cliproxyApi.ts` ما زالت فعالة، **ولا يوجد تشفير E2E في T3 Connect** (`#32098` / `#32945`)، ويظل `requireConnectDeviceApproval` مضبوطًا افتراضيًا على `false`، إضافةً إلى عيوب المصادقة والأنفاق لملفات تعريف ارتباط LAN وBearer وتذاكر WS و`::1`. | [**الملف 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **الميزانية التجارية والرعاة و77 ألف نجمة**<br>*(الحلقات 6، 8، 17، 18)* | **مرتفع** | إنفاق يتجاوز $800k+ على عميل مجاني (`162` إشارة لـ T3 مقابل `0` للمنتجات المدفوعة)؛ رادار حوسبة يرصُد **31.7 تريليون توكن/يوم** ($10.19M/يوم) استُبدل بأكثر من $300k من توكنات الوصول المبكر من OpenAI وتواصل مع المستثمرين؛ تداخلات استثمار ملائكي مع Vibe Kanban وDaytona؛ منظومة رعاة (Clerk، Axiom، وحصرية Vercel)؛ استغلال ثغرة 0% في Codex (`Endless` / `codex#45444`)؛ Gist بـ 10 حسابات لـ `CLIProxyAPI` (`555%` حصة) مقابل تحذير الحظر في FAQ؛ إشعار بعد 5 أوامر / 30 ثانية خمول يرسل `PUT user/starred/...` ببيانات اعتماد المضيف (`#27832`، `#29922`، `#29987`) متجاوزًا Macroscope وتاركًا منح النجوم لمستودعات غير مقيدة في `driver.ts#L60-L99` بلا إصلاح طوال 19 يومًا. | منح النجوم غير المقيد في `driver.ts#L60-L99` ومراجعة `zhilsinger` ما زالا **بلا إصلاح عند `ca81b7b9`**؛ المستودع عند 77k+ نجمة مقابل ~129 متابعًا. | [**الملف 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **الحوكمة والعلامات التجارية والتاريخ**<br>*(المنشوران 1–2، الحلقات 9، 10، 15، 16)* | **متوسط–مرتفع** | 500 commit/يوم / 700 وكيل / `yolo merges` مقابل `CONTRIBUTING.md` (`"here's my advice: Don't"`)، والحظر مع التشهير العلني في `.github/VOUCHED.td`، و`174` وسم `unwanted`، وإزالة وضع Plan (`#5551`، `#9190`، `#33131`)، والإهانات في `#33639`؛ استدعاء `@bot` علنًا لاقتباس النسخ المتفرعة (`@MiaAI_lab`)، والدعوة لحجب الأرباح عبر Community Notes، وبوت الحظر التلقائي؛ **0 تسجيلات في USPTO** لعبارات `T3 Code`/`T3 Tools`/`T3 Connect` (طلب `PING LABS` رقم `97294243` متروك؛ وتملك EquipmentShare التسجيل `7795672`) وقت التهديد بإغلاق حساب GitHub؛ دمج `PR #41898` وإضافة `TRADEMARK.md` بأثر رجعي بعد 17 ساعة؛ نمط ممتد 2024–2026 (`vsc-material-but-i-wont-sue-you`، أزمة المطورين الهنود، مكافأة $20k ضد FFmpeg، وتهديد محذوف فجر 25 نوفمبر عند الرابعة صباحًا بإغلاق المصدر). | `CONTRIBUTING.md` / `.github/VOUCHED.td` و`TRADEMARK.md` لا تزال حية على فرع `main` (`ca81b7b9`). | [**الملف 05**](../dossiers/05-governance-trademark-and-history.md) |
| **مجموعة البيانات الكمية لـ 1,151 تغريدة**<br>*(الحلقة 14)* | **خط أساس للتدقيق** | مسح شامل لفترة 7–24 نوفمبر (`n = 1,151`، 17.24 يومًا، 66.8 منشورًا/يوم، 75.6% ردود، بفاصل وسيط 2.7 دقيقة): **0.0% شتائم أو إهانات** موجهة إلى 20 من قيادات الشركات التقنية الكبرى وموظفي المختبرات والمؤثرين (`0/43` وفق التصفية الصارمة على `@` الأولى، مقابل `32.6%` شكر) مقارنة بـ **8.0% عدائية** تجاه المطورين العاديين (`61/766`) وقفزة بمقدار **4.0x إلى 14.4%** (`19/132`) من الإهانات الشخصية المباشرة خلال نافذة الـ 25 ساعة لأزمة النسخة الصينية المتفرعة. | تدقيق regex قابل لإعادة الإنتاج مع 4 رسوم بيانية جنائية. | [**الملف 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **الفهرس الكامل للروابط الأولية والأدلة المرئية** | **مرجع** | فهرس شامل ومتقاطع التحقق يضم **320** رابطًا أوليًا معياريًا بصيغة `https://` (`SRC-001`–`SRC-320`) و**108** إيصالات مرئية ورسوم بيانية محسّنة دون فقدان للجودة (`EV-001`–`EV-108`). | موثّق بالكامل بنسبة 100% (صفر روابط `t.co`؛ وفهرسة 108/108 ملفات). | [**فهرس المصادر**](../COMPLETE-SOURCE-INDEX.md) · [**فهرس الأدلة**](../EVIDENCE-INDEX.md) |

---

## الخط الزمني للأحداث (2023–2026)

| التاريخ / الوقت | المحطة الزمنية | الأداة الموثّقة / المصدر |
|---|---|---|
| **2023-05-14** | `@theo` ينشر قائمة رعاة قناته على YouTube (`@vercel`، `@clerk`، `@upstash`، `@axiomhq`، `@PlanetScale`). لاحقًا يشكّل Clerk وAxiom البنية الأساسية للمصادقة والتسجيل داخل T3 Code. | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | الرئيس التنفيذي لـ Vercel يؤكد رعاية يوتيوبر واحد فقط (`Theo`)؛ ويقرّ `@theo` بأن عقود الرعاية تضمنت بنود حصرية تمنع الترويج للمنافسين. | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [فيديو](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(قبل عامين)* | `@theo` ينشئ نسخة متفرعة من سمة VS Code باسم `vsc-material-but-i-wont-sue-you` ساخرًا من طبع المؤلف الأصلي؛ وبشكل منفصل، وبعد أن أثار مقطعه المستهدف لقنوات الشروحات الهندية موجة تحرش، ينشر فيديو اعتذار (`I screwed up.`) يدين الهجمات القائمة على الجنسية. | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | يرفض مكتب USPTO طلب العلامة التجارية الوحيد لشركة T3 Tools Inc. (`PING LABS`، رقم السلسلة `97294243`) ويصنفه `ABANDONED` (19 مايو 2025). وتُسجّل EquipmentShare علامة `T3` في فئتي البرمجيات وSaaS رقم 9 و42 (`Reg. 7795672`، 13 مايو 2025). | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | يصطدم `@theo` مع FFmpeg على X ويعرض **مكافأة $20,000** لإزاحة أحد مشرفي FFmpeg؛ فترد Windscribe بعرض مضاد قدره $21,000، ويعترض مؤسس VLC، ويوثق مطورو FFmpeg التنمر العلني، فيحذف `@theo` الفيديو/التغريدات ويسحب المكافأة. | [سجل FFmpeg](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | يُدمج **PR #174** في `pingdotgg/t3code`، مفعّلًا قياس `PostHog` افتراضيًا دون نافذة موافقة، ودون زر إعدادات، ودون توثيق للتتبع. | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | ينشر `@theo` *"Github has a fake star problem"* كاتبًا أن نجوم GitHub أصبحت `"mostly a way for companies to trick VCs into investing"`. | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | **التعديل `3bdaa6e1`** يحذف بصمت عبارة `No telemetry / Unless you opt in. Full stop.` من الصفحة الرئيسية لـ T3 Code بعد أكثر من 3 أشهر من الجمع الافتراضي للبيانات. | [التعديل `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | يغلق المشرف Julius البلاغ **Issue #1397** (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*. | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | يُغلق **Issue #4123** (لقطات مؤرشفة لوعد «No telemetry») بصمت في 4 نوفمبر؛ وتُرفض 4 طلبات دمج مجتمعية للتعطيل (`#13458`، `#16763`، `#21248`، `#27077`) (أُغلق `#27077` بوسم `unwanted` رغم اجتيازه 147 اختبارًا). | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | **PR #5551** يدفن مفتاح Build/Plan (`Reality check for those upset`، 10 تصويتات سلبية)؛ و**PR #9190** يخفي عداد السياق (16 تصويتًا سلبيًا، الأعلى في المستودع). | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | يتفاخر `@theo` بانتزاع **$800+** بعد بلوغ حصة 0% في Codex بينما تطلق `@maria_rcks` أداة *Endless*؛ يحذف الاثنان منشوراتهما بعد الغضب (`2090972426876129658`)؛ وتشدد OpenAI قطع الدورات عند 0% (`openai/codex#45444`). | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | تسجيل **Issue #15353** (تنفيذ `git push --force` بصمت في Claude Auto، 3 أكتوبر)، و`privacy-policy.astro` (`2026-10-06`)، و**Issue #17845** (الحذف الوهمي في `statev2.sqlite`، 10 أكتوبر). | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | **PR #15028** يمرّر التتبع عبر `ingest.t3.codes` مغلق المصدر؛ **PR #21506** يضيف تجزئة `SHA-256` غير مملّحة عبر الأدوات في `Identify.ts`؛ وينشر `@theo` ملف Gist لـ 10 حسابات `CLIProxyAPI` (`555%` حصة). | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | **PR #27832** و**#29922** و**#29987** تطلق إشعار النجمة بعد 5 أوامر / 30 ثانية خمول مع تنفيذ `PUT user/starred/...` ببيانات اعتماد المضيف؛ ويقدّم `zhilsinger` مراجعة `Request changes` في 6 نوفمبر (تظل بلا رد 19 يومًا). | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | اقتباس النسخ المتفرعة عبر `@bot` (`@MiaAI_lab`)، حذف وضع Plan (`#33131`)، الكشف عن إنفاق `$800k+` ورادار `31.7T/day` / `$10.19M/day`، توكنات OpenAI المجانية بأكثر من `$300k+`، إعادة كتابة `CONTRIBUTING.md`، تداخل Vibe Kanban/Daytona، و`PR #41237` الذي أسقط مرشح النماذج خلال 21 ساعة. | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | ينشر `@theo` عبارتي `"Chinese knockoff"` و`"Temu3 Code"` ويهدد بإغلاق حساب GitHub (`2124829315657576890`)؛ يغيّر مؤلف نسخة MIT الاسم إلى `Stardust` خلال 30 دقيقة؛ يلي ذلك اعتذار خاص في الرسائل المباشرة مع بقاء المنشورات العلنية. | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [المنشور التأسيسي 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | يرحّب `@theo` بنسخ الشركات الأمريكية التريليونية لشيفرة MIT (`2124989435154726982`)، ويسخر من الامتثال (`"get a better lawyer"`)، ويُنشَر المنشوران التأسيسيان 1–2، وعند **12:21 CST** (`04:21Z`، بعد 17 ساعة من تهديد الحظر) يدمج `@theo` طلب **PR #41898** مضيفًا `TRADEMARK.md` بأثر رجعي. | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | تُنشر **الحلقات 1–5** من التدقيق (تتجاوز الحلقة 1 **1.81M+ مشاهدة** و6,640 حفظًا). عند `18:39 CST` يصف `@theo` المجتمع التقني الصيني على تويتر بـ `"the biggest fucking cesspit"` (`2125177503526588877`)؛ وعند `19:13–19:36 CST` يدّعي أن Managed Policy توقف كل التتبع (`2125186071357251715`). | [الحلقة 1](https://x.com/realchendahuang/status/2125153472450527440) → [الحلقة 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 ليلًا – 2026-11-25 ~07:00 CST** | تُرفع شكوى GDPR رسمية في الاتحاد الأوروبي؛ ويدمج **سباق ليلي لـ 6 ساعات** طلبات `#42380` (2.2M/ساعة من سجلات IP)، `#42285`/`#42430` (حذف الحسابات)، `#42376`/`#42464` (تجاهل التعطيل على Win/Mac)، `#42450` (تسرب مسار `git.cwd` بعد 90 دقيقة من نفي جمع المسارات)، `#42459`/`#41859` (تسريبات الإشعارات)، `#42466` (تجميع الحزم المجهولة)، `#41757`/`#42386`/`#42504` (إصلاحات أمنية صامتة). وقبل الفجر ينشر `@theo` تهديدًا بإغلاق المصدر ثم يحذفه. | [الحلقة 11](https://x.com/realchendahuang/status/2125394810559426993) · [الحلقة 12](https://x.com/realchendahuang/status/2125395501663281198) · [الحلقة 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | تُنشر **الحلقات 6–18** متناولة الميزانية التجارية، وثغرات Managed Policy، و`yolo merges`، واقتباس `@bot`، وإفصاحات ما بعد GDPR، ومجموعة بيانات 1,151 تغريدة، وسجل USPTO، وروابط الرعاة، ومحرك الـ 77 ألف نجمة. | [الحلقة 6](https://x.com/realchendahuang/status/2125385742243520653) → [الحلقة 18](https://x.com/realchendahuang/status/2125416210120765799) |
| **2026-11-25 حتى 14:49 CST (`ca81b7b9`)** | تتحقق المتابعة اللاحقة لخط الأساس (`+259` التزامًا من `9d3195b4` إلى `ca81b7b9`) من دمج `#42299` (إيقاف قراءة `.codex`/`.claude.json`)، و`#42465` (`custom:<driver>`)، و`#42577` (تضييق مراقب Windows)، و`#41210` (رابط تحقق `VALIDATION_REQUIRED` في Antigravity)، و`#42630` (تعطيل بيئات CI)، و`#42629` (`DO_NOT_TRACK`)، و`#42119` (التطهير غير المتزامن المغلق لـ `#17845` مع الإبقاء على سجل التفرعات والوكلاء الفرعيين + شواهد الحذف التي تتطلب `VACUUM`)، و`#42311` (إشعارات الأجهزة الجديدة)، وتشديدات `#42356`–`#42415` — مع تأكيد استمرار بقاء `AnalyticsService.ts:156`، ونواقص OTel في `DesktopShellEnvironment.ts`، و`ingest.t3.codes` مغلق المصدر، و`#15353`، و`driver.ts#L60-L99`، و`0` نشرات أمنية، وغياب تشفير E2E في T3 Connect دون إصلاح. | [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210) |

---

## 1. أصل النزاع: عبارة «Steal Our Code» وتهديد تسمية النسخة المتفرعة وازدواجية المعايير

خلال 48 ساعة بين 23 و25 نوفمبر 2026، تحوّل خلاف حول تسمية نسخة متفرعة (`fork`) مجتمعية بترخيص MIT من T3 Code إلى تدقيق كامل للشيفرة المصدرية، وشكوى أوروبية بموجب لائحة GDPR، وقرابة عشرين إصلاحًا طارئًا خلال الليل.

بين مساء 23 نوفمبر وصباح 24 نوفمبر 2026 (بتوقيت بكين)، اشتكى أحد المستخدمين عبر الإنترنت من واجهة نسخة متفرعة مجانية ومفتوحة المصدر بترخيص MIT بناها مطوّر صيني (`@DDdxx666`)، ظنًا منه أنها التطبيق الرسمي. ومن دون التحقق مما إذا كان المستودع نسخة MIT نظامية، نشر `@theo` منشورين خلال 11 دقيقة وصفها فيهما بـ `"Chinese knockoff"` و`"Temu3 Code"`، وسخر مباشرة من عمل المؤلف، وهدّد بالتواصل مع GitHub لحظر حسابه (`"Do it right now or I'm going to contact GitHub and have your account taken down"` — «افعل ذلك الآن وإلا سأتواصل مع GitHub لإغلاق حسابك»). وفي الفترة نفسها تقريبًا، كان موقع T3 Code ([`https://t3.codes/`](https://t3.codes/)) يصف رابط مستودعه على GitHub بعبارة `"Steal our code (legally)"` (`"steal our code"`) ([المنشور التأسيسي 1](https://x.com/realchendahuang/status/2125059292919394654)، [المنشور التأسيسي 2](https://x.com/realchendahuang/status/2125062675147448475)).

امتثل مؤلف النسخة المتفرعة على الفور، فأعاد تسمية المستودع إلى `Stardust` وأزال كل إشارات علامة T3 خلال 30 دقيقة. قدّم `@theo` اعتذارًا خاصًا في الرسائل المباشرة، لكنه أبقى المنشورين العلنيين — اللذين تجاوزا معًا 200,000 مشاهدة — من دون حذف أو توضيح. وبعد أقل من 11 ساعة، عند `06:12 BJ` من يوم 24 نوفمبر (`2124989435154726982`)، حين سُئل عمّا إذا كان نسخ المختبرات الأمريكية التريليونية لمزايا من T3 Code يتجاوز الحد، اتخذ الموقف النقيض تمامًا: `"Nah. Open source is open source, even if a trillion dollar company uses it!"` («لا، المصدر المفتوح مصدر مفتوح، حتى لو استخدمته شركة بقيمة تريليون دولار!»). وفي الأثناء ذاتها، كانت موظفة T3 `@maria_rcks` نفسها تستضيف نسخة متفرعة عامة باسم `maria-rcks/t3libre` (*"T3 Code, liberated"*)، بينما عملت مستودعات ناطقة بالإنجليزية مثل `t3code-quota-ui` و`t3code-atlas` و`t3code-bar` دون أي تهديدات علنية.

![ثيو يهدد علنًا بالتواصل مع GitHub لحظر حساب مطور النسخة المتفرعة مفتوحة المصدر](../../evidence/01-origin-theo-threat.png)

![عضوة فريق T3 @maria_rcks تستضيف نسخة متفرعة عامة باسم maria-rcks/t3libre ("T3 Code, liberated")](../../evidence/extra/p1-3-maria-t3libre.png)

بدءًا من الساعة 17:04 بتوقيت بكين يوم 24 نوفمبر، دققتُ في سجل التعديلات البرمجية لمستودع `pingdotgg/t3code`، والملفات المصدرية، وطلبات الدمج، والبلاغات، والوثائق الرسمية، وسجلات USPTO TSDR، والخط الزمني العام لحساب `@theo` على X. وخلال 24 ساعة نشرتُ **18 حلقة موثّقة** مدعومة بروابط مباشرة ولقطات شاشة. وتجاوزت الحلقة 1 وحدها **1.81 مليون مشاهدة** و**6,640 حفظًا**، ما أدى إلى تقديم ملف شكوى GDPR في أوروبا وسباق إصلاحات ليلي استمر 6 ساعات من فريق T3.

---

## 2. التتبع عن بعد وقراءة بيانات اعتماد الأدوات الأخرى والسباق الليلي بعد شكوى GDPR (الحلقات 1 و7 و11 و12)

> **التدقيق التقني المعمّق:** تتوفر خرائط أسطر الكود الكاملة، وقوائم إجراءات `FeatureUsage.ts`، وفجوات `DesktopShellEnvironment.ts`، وفروق ما بعد `9d3195b4`، والسجل الزمني دقيقة بدقيقة ليومي 23–25 نوفمبر في [**الملف 01: بنية التتبع، وربط الهوية عبر الأدوات، والسباق الليلي لـ GDPR يومي 24–25 نوفمبر**](../dossiers/01-telemetry-and-gdpr-timeline.md).

### 2.1 التتبع الافتراضي، والوعد المحذوف من الصفحة الرئيسية، وتجزئة بيانات اعتماد الأدوات الأخرى (`الحلقة 1`)

في **6 مارس 2026**، دمج مستودع `pingdotgg/t3code` طلب الدمج **PR #174**، ليُفعّل تتبع `PostHog` افتراضيًا دون أي توثيق للقياس عن بُعد داخل المستودع، ودون نافذة موافقة عند التشغيل الأول، ودون مفتاح تعطيل في واجهة الإعدادات. وبقي متغير البيئة الخاص بالإيقاف مدفونًا داخل الشيفرة بينما بدأت التثبيتات الافتراضية بإرسال الأحداث فورًا ([الحلقة 1](https://x.com/realchendahuang/status/2125153472450527440)).

وعلى مدى أكثر من ثلاثة أشهر من الجمع الافتراضي للبيانات، عرضت الصفحة الرئيسية لـ T3 Code سطرين بارزين: `No telemetry / Unless you opt in. Full stop.` وفي **18 يونيو 2026**، حذف `@theo` السطرين بصمت أثناء إعادة تصميم الصفحة الرئيسية ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) دون إعلان أو إشعار للمستخدمين الحاليين.

![التعديل 3bdaa6e1 بتاريخ 18 يونيو 2026 يحذف بصمت وعد «No telemetry / Unless you opt in. Full stop.» من الصفحة الرئيسية](../../evidence/02-no-telemetry-removed.png)

في أكتوبر 2026، دمج `@theo` طلب **PR #15028**، موجّهًا دفعات القياس المرسلة كل 10 ثوانٍ (`FLUSH_INTERVAL_MS = 10_000`) عبر بوابة T3 مغلقة المصدر [`https://ingest.t3.codes/`](https://ingest.t3.codes/). وينص السطر الأول في [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) صراحةً على أن نقطة الاستقبال تحتفظ بنسخة من كل حدث خام قبل إعادة توجيهه إلى PostHog:

<div dir="ltr">

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149 at 9d3195b4; line 156 at ca81b7b9)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

</div>

شملت الحقول المجمّعة داخل [`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) و`FeatureUsage.ts`: المزوّد، واختيار النموذج (عند خط الأساس `9d3195b4`، مع تمرير معرفات النماذج ونقاط النهاية المخصصة خارج الكتالوج حرفيًا عبر [`ProviderDimensions.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts))، ومستوى التفكير (`reasoning effort`)، ووضع الصلاحيات، ومدد التشغيل، وأعداد التوكنات المدخلة والمخرجة والمخزنة مؤقتًا وتوكنات التفكير، وتوكنات الوكلاء الفرعيين، وأعداد المشاريع والمحادثات المحلية، و**35 إجراءً مستقلًا في الواجهة والأوامر** (`18` من `COMMAND_FEATURES` + `17` من `METHOD_FEATURES`)، وتفاصيل نظام التشغيل، وتوزيعة WSL، والمعمارية.

في **19 أكتوبر 2026**، أتبع `@theo` ذلك بـ **PR #21506** لحساب عدد الأجهزة المملوكة لشخص واحد. وعند خط الأساس `9d3195b4`، بدأ [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) بقراءة ملفات اعتماد أدوات الذكاء الاصطناعي المستقلة بصمت من مجلد المستخدم الرئيسي — `~/.codex/auth.json` و`~/.claude.json` — وفك ترميز حقل `user_id` في JWT الخاص بـ OpenAI وحقل `oauthAccount.accountUuid` الخاص بـ Claude، وتجزئتهما إلى جانب معرف مستخدم T3 Connect المرتبط ومعرف الجهاز (أُزيلت قراءة هذين الملفين لاحقًا في [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299)، بينما تظل تجزئة المالك غير المملّحة لـ `connect` و`device` قائمة):

<div dir="ltr">

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338 at baseline 9d3195b4)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

</div>

وفي [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (الأسطر 8–9)، تحسب دالة `hashTelemetryId` **تجزئة SHA-256 غير مملّحة** (`Hex.encode(sha256(new TextEncoder().encode(value)))`). ولأن الخادم يحتفظ أصلًا بمعرفات حسابات T3 Connect بنص واضح من Clerk، فإن تجزئة القيم الواضحة في الخادم الخلفي تعكس التجزئة غير المملّحة مباشرة إلى شخص معروف؛ كما ترتبط أي معرفات مسرّبة من OpenAI أو Claude حتميًا بالتجزئة نفسها.

![ملف Identify.ts يقرأ ~/.codex/auth.json و~/.claude.json لإرسال تجزئات SHA-256 غير مملحة للربط بين الأجهزة](../../evidence/03-identify-codex-claude.png)

تكرّر إغلاق اعتراضات المجتمع. ففي **23 يونيو** فتح مطور **Issue #1397** طالبًا مفتاحًا في الإعدادات؛ وأغلقه المشرف الأساسي Julius بحالة `not planned`: `We will not make this easier to opt out of, it is crucial for us to know how many users we have` («لن نجعل إلغاء التتبع أسهل، فمن الجوهري لنا معرفة عدد مستخدمينا»). وفي يوليو نشر مستخدم لقطات مؤرشفة للصفحة الرئيسية في **Issue #4123** متسائلًا عن الوعد المنقوض (`"No telemetry"`)، فأغلقه حساب `@theo` عبر تعديل غير ذي صلة في 21 أكتوبر، ثم أعاد فتحه بعد الغضب، قبل أن يغلقه بصمت مجددًا في 4 نوفمبر. وبين سبتمبر ونوفمبر، قدّم المساهمون **أربعة طلبات دمج منفصلة للتعطيل** (`#13458`، `#16763`، `#21248`، `#27077`). وحتى `#27077` — المختبَر على عتاد حقيقي مع **147 اختبارًا ناجحًا** وموافقة Macroscope — أُغلق في **17 نوفمبر** ووُسم بـ `unwanted`.

<details>
<summary>عرض دليلي رفض طلبات تعطيل التتبع (Issue #1397 وPR #27077)</summary>

![المشرف الأساسي Julius يغلق البلاغ Issue #1397 بحالة not planned ويصرح برفض تسهيل إلغاء التتبع](../../evidence/04-issue1397-no-optout.png)

![PR #27077 مغلق دون دمج بوسم unwanted رغم اجتياز 147 اختبارًا وموافقة Macroscope](../../evidence/extra/t3code-4-pr-27077-rejected.png)

</details>

### 2.2 تناقض Managed Policy والوثائق الرسمية (`الحلقة 7`)

في 24 نوفمبر، ومع تصاعد الانتقادات، ادّعى `@theo` على X أن لدى T3 Code أفضل سياسة مؤسسية (`Managed Policy`) في الصناعة (`"trivial to set up and turn off all telemetry"` — «سهلة الإعداد جدًا وتوقف كل التتبع») وأن بيانات المحادثات تبقى على القرص و`"never touches any of our servers"` («لا تمس أيًا من خوادمنا أبدًا») ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)، [`2125191784859115766`](https://x.com/theo/status/2125191784859115766)، [الحلقة 7](https://x.com/realchendahuang/status/2125391659492081947)).

يُظهر الفحص المباشر لملفي [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) و[`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) عكس ذلك:

1. **إعداد حصري للمسؤولين:** لا يزال مستخدمو سطح المكتب بلا أي مفتاح في `Settings UI`. ويتطلب إيقاف التتبع عبر Managed Policy استخدام MDM/Group Policy أو كتابة `policy.json` في مسارات محمية بصلاحيات المسؤول (`/Library/Application Support/T3Code/policy.json` على macOS، و`C:\Program Files\T3Code\policy.json` أو `HKLM\SOFTWARE\Policies\T3Tools\T3Code` على Windows، و`/etc/t3code/policy.json` على Linux).
2. **النقطة العمياء لتطبيق الويب المستضاف (`app.t3.codes`):** تقرّ وثيقة `docs/user/telemetry.md` صراحةً بأن تطبيق المتصفح لا يقرأ متغيرات بيئة الخادم، ويتجاهل Managed Policy، ويرسل تتبعات الاتصال عند بنائه مع التتبع، و`"has no relay tracing toggle"` («لا يملك مفتاحًا لتعطيل تتبع المرحّل»).
3. **تطبيقات الهاتف خارج سياسة الخادم:** متغيرات بيئة الخادم وManaged Policy `"do not disable mobile tracing"` («لا تعطّلان تتبع الهاتف المحمول») (أضاف الطلب الليلي `PR #42415` مفتاح **Send connection traces** على الهاتف، مع بقاء متغيرات بيئة الخادم وManaged Policy عاجزة عن تعطيل تتبع الهاتف).
4. **`Publish agent activity` يتجاهل الإلغاء:** عند تفعيله على مضيف، تُرسل عناوين المشاريع وعناوين المحادثات وأسماء النماذج وحالة النشاط الحي إلى مرحّل T3 Connect — و`"The telemetry opt-out does not disable it."` («إلغاء التتبع لا يعطّله.»). (إضافة إلى ذلك، يمكن لسجلات Axiom الفاشلة وسجلات أعطال الهاتف أن `"can quote a value the app was handling"`، كما يمكن لـ `Agent feedback` إرفاق ما يصل إلى 16 KB من رسائل المحادثات.)

![الوثيقة الرسمية docs/user/telemetry.md تؤكد انعدام مفتاح التعطيل في تطبيق الويب وخروج الهاتف عن Managed Policy وتجاهل إلغاء التتبع عند بث نشاط الوكيل](../../evidence/05-telemetry-cant-disable.png)

<details>
<summary>عرض دليل المسارات الإدارية في Managed Policy (docs/user/managed-policy.md)</summary>

![الوثيقة الرسمية docs/user/managed-policy.md تسرد المسارات النظامية المحمية بصلاحيات المسؤول عبر macOS وWindows وLinux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

</details>

### 2.3 تفنيد توضيح 25 نوفمبر خلال ساعتين (`الحلقة 11`)

في صباح 25 نوفمبر، نشر `@theo` توضيحًا مطوّلًا ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) مرفقًا بتصدير علني لبيانات التتبع ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz))، قدّم فيه ثلاثة تأكيدات قاطعة — أعقبها برد ينفي فيه كتابة ملفات تتبع محلية عند الإلغاء ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([الحلقة 11](https://x.com/realchendahuang/status/2125394810559426993)):

- **«لم نجمع مسارات الملفات مطلقًا» (`"Never collected file paths"`):** بعد 90 دقيقة دمج Julius طلب الدمج **PR #42450**، معترفًا بأن عمليات التشغيل الواردة عبر webhook للمرحّل كانت تصدّر سلاسل التنفيذ الكاملة إلى Axiom — بما في ذلك سجلات Git الحاملة لحقل `git.cwd` (**المسار المطلق لمساحة العمل، واسم مستخدم نظام التشغيل، واسم المستودع**).
- **«متغيرات البيئة لطالما عطّلت التتبع بنظافة» (`"Environment variables always disabled telemetry cleanly"`):** أكد **PR #42376** أن تطبيق سطح المكتب على Windows تجاهل متغير البيئة المحفوظ لدى المستخدم `T3CODE_TELEMETRY_ENABLED=false` عند التشغيل من عمليات قائمة مسبقًا، بينما أكد **PR #42464** أن تتبع المرحّل عند التشغيل الأول على macOS/Linux كان يُقيّم قبل اكتشاف الصدفة (`shell`)، متجاهلًا تعطيل `~/.zshrc` طوال الجلسة. (ولا يزال [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) يغفل تمرير `T3CODE_OTEL_SDK_DISABLED` و`OTEL_SDK_DISABLED` عند `ca81b7b9`.)
- **«لا تُكتب ملفات تتبع عند الإلغاء» و«تجزئات Claude كانت معطلة» (`"No tracking files written when opted out"` و`"Claude hashes were broken"`):** لا يزال [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`السطر 149` عند `9d3195b4`، و`السطر 156` عند `ca81b7b9`) يستدعي `getTelemetryIdentity` دون شرط عند الإقلاع، فيكتب معرف التثبيت المحلي (`upsertAnonymousId`) قبل التحقق من `telemetryEnabled`. وفي الوقت ذاته، أظهر فحص ترويسة gzip لملف التصدير البالغ ~100MB لدى `@theo` (`6,056,594` بايت مضغوطة، `95,789` حدثًا) اسم الملف الأصلي `events.clean.jsonl` المُنشأ قبل تغريدته بـ 20 دقيقة — ومع ذلك ظل يحوي **264 سجلًا فعّالًا لحسابات Claude** تربط **4 أجهزة منفصلة** (`installId`s) بتجزئة SHA-256 نفسها في 20 أكتوبر، إلى جانب أسماء نماذج وكلاء خاصة حرفيًا (`vibeproxy/gpt-6-luna`، `muse-proxy-wonder-full`).

![PR #42450 يؤكد أن عمليات التشغيل عبر المرحل كانت تصدر سابقًا مسارات git.cwd المطلقة المتضمنة أسماء المستخدمين والمستودعات إلى Axiom](../../evidence/06-pr42450-absolute-path.jpg)

<details>
<summary>عرض 3 أدلة إضافية حول توضيح 25 نوفمبر وتفريغ الـ 100MB (PR #42376 وPR #42464 وevents.clean.jsonl)</summary>

![PR #42376 يقر بأن تطبيق سطح المكتب على Windows تجاهل متغيرات البيئة المحفوظة للمستخدم T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 يقر بأن تتبع المرحل عند التشغيل الأول على macOS تجاهل تعطيل ~/.zshrc طوال الجلسة](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![تدقيق جنائي لملف تفريغ ثيو العلني events.clean.jsonl يكشف 264 سجل Claude تربط 4 أجهزة وأسماء نماذج وكلاء مخصصة حرفيًا](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

</details>

### 2.4 السباق الليلي لست ساعات بعد شكوى GDPR (`الحلقة 12`)

بعد تقديم شكوى GDPR أوروبية رسمية ليلة 24 نوفمبر، كشفت طلبات الدمج الليلية الطارئة عن أربعة إفصاحات خصوصية أعمق ([الحلقة 12](https://x.com/realchendahuang/status/2125395501663281198)):

1. **2.2 مليون سجل/ساعة في المرحّل موسومة بـ IP (`PR #42380`):** أقرّ بأن كل سجل طلب مرحّل يُصدّر إلى Axiom — نحو **2.2 مليون سجل في الساعة تُحفظ لمدة 30 يومًا** — كان يسجل `client.address` (IP المتصل من `cf-connecting-ip`) و`user_agent.original` بجانب `user.id` مباشرة (مع الإشارة إلى بقاء سجلات استدعاء Cloudflare Workers بنسبة 1% منفصلة). وبعد الدمج بثلاث ساعات ونصف، ظل `@theo` يرد بأن عناوين IP أُزيلت بالفعل.
2. **تعطّل حذف الحسابات (`PR #42285` و`PR #42430`):** أقرّ بأن حذف مستخدم في Clerk كان يُبقي سابقًا صفوف المرحّل في PlanetScale وأنفاق Cloudflare النشطة سليمة حتى تطلب ورودُ طلب حذف خصوصية تنفيذ **SQL مكتوب يدويًا وفصل الأنفاق يدويًا**.
3. **تسريبات إشعارات الدفع المحمولة (`PR #42459` و`PR #41859`):** أرسلت إشعارات Android FCM قيم Clerk `user_id` بنص واضح إلى Google في كل إشعار دفع؛ وسجلت نطاقات وأخطاء طلبات الدفع في iOS عناوين URL الكاملة لإشعارات الأجهزة حاملةً الرموز (`tokens`).
4. **خلط الملاحظات «المجهولة» (`PR #42466`):** أقرّ بأن أحداث `agent.feedback` المفترض أنها مجهولة كانت تُجمع في طلب HTTP POST نفسه إلى جانب أحداث `installId` المعرّفة وبصمات المضيف الكاملة (نظام التشغيل، المعمارية، وتوزيعة WSL الخام)، بما يناقض `docs/user/telemetry.md`. في غضون ذلك، بقي `privacy-policy.astro` دون تغيير منذ 6 أكتوبر.

![PR #42380 يكشف أن سجلات المرحل دوّنت عناوين IP الحقيقية للمتصل وUser-Agent بجانب user.id بمعدل 2.2 مليون سجل/ساعة لمدة 30 يومًا في Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

<details>
<summary>عرض 3 أدلة إضافية من السباق الليلي بعد GDPR (PR #42285 وPR #42459 وPR #42466)</summary>

![PR #42285 يقر بأن حذف الحساب كان يبقي صفوف المرحل وأنفاق Cloudflare النشطة حتى تطلب طلب حذف خصوصية كتابة SQL يدويًا](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 يقر بأن إشعارات Android FCM أرسلت قيم Clerk user_id بنص واضح إلى Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 يقر بأن الملاحظات المجهولة جُمعت في نفس طلب POST إلى جانب installId وبصمات المضيف](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

</details>

### 2.5 تحديثات التتبع والهوية بعد التدقيق (`9d3195b4` ← `ca81b7b9`)

تؤكد متابعة المستودع الأصلي `pingdotgg/t3code` حتى `ca81b7b9` (`2026-11-25 14:49 CST`) دمج أربعة تعديلات محددة لتضييق التتبع، مع بقاء فجوات جوهرية بلا إصلاح:

- **ما دُمج بعد `9d3195b4`:**
  - [**PR #42299**](https://github.com/pingdotgg/t3code/pull/42299) ([`84e4264b`](https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07)): يوقف قراءة `~/.codex/auth.json` و`~/.claude.json` داخل `Identify.ts` (تبقى تجزئة المالك غير المملّحة لـ `connect` `CLOUD_LINKED_USER_ID` و`device`).
  - [**PR #42465**](https://github.com/pingdotgg/t3code/pull/42465) ([`6b3899f2`](https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da)): يحدّث دالة `modelLabel` في `ProviderDimensions.ts` (`الأسطر 66–72`) لإرسال `custom:<driver>` للنماذج خارج الكتالوج (بينما تواصل نماذج الكتالوج/المورّدين إرسال معرفاتها حتى خلف نقاط النهاية المخصصة).
  - [**PR #42630**](https://github.com/pingdotgg/t3code/pull/42630) ([`c925b9ab`](https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b)): يضيف `isCiEnvironment` عبر 13 متغير بيئة CI في [`otelEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts) (`الأسطر 322–343`)، معطلًا `AnalyticsService` الافتراضي (`السطر 130`) و`isRelayTracingEnabled` على مشغلات CI ما لم يُتجاوز يدويًا.
  - [**PR #42629**](https://github.com/pingdotgg/t3code/pull/42629) ([`ef4a1643`](https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64)): يلتزم بـ `DO_NOT_TRACK` (`isDoNotTrackSet` في `otelEnvironment.ts:346-347`)، ويفحصه في `AnalyticsService.ts:137` و`isRelayTracingEnabled` (`otelEnvironment.ts:357`)، ويمرّره عبر [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) و[`DesktopBackendConfiguration.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts) (ويغلب `T3CODE_TELEMETRY_ENABLED=true`).
  - ضيّقت طلبات الدمج المرافقة [**#42356**](https://github.com/pingdotgg/t3code/pull/42356) و[**#42394**](https://github.com/pingdotgg/t3code/pull/42394) و[**#42397**](https://github.com/pingdotgg/t3code/pull/42397) و[**#42398**](https://github.com/pingdotgg/t3code/pull/42398) و[**#42415**](https://github.com/pingdotgg/t3code/pull/42415) تتبع المتصفح المفتوح عبر الخادم، ومعرّفات/مفتاح تطبيق الهاتف، وقيم أخطاء MCP المحددة، وربط `installId` في `agent.feedback`.
- **ما بقي بلا إصلاح عند `ca81b7b9`:** لا يزال [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`السطر 156`، وسابقًا `السطر 149` عند `9d3195b4`) ينفذ `getTelemetryIdentity` (`upsertAnonymousId`) دون شرط عند الإقلاع **قبل** فحص `telemetryEnabled`؛ ولا يزال `DesktopShellEnvironment.ts` يغفل تمرير `OTEL_SDK_DISABLED` و`T3CODE_OTEL_SDK_DISABLED`؛ ويبقى `ingest.t3.codes` مغلق المصدر هو الوجهة الافتراضية؛ ولا يوجد أي مفتاح تعطيل في واجهة الإعدادات ولا في `app.t3.codes`؛ وتظل تطبيقات الهاتف خارج `Managed Policy`؛ ويتجاهل `Publish agent activity` خيارات الإلغاء؛ وتبقى صفحة `privacy-policy.astro` مؤرخة في `2026-10-06`.

---

## 3. التخزين المحلي ومراقبة العمليات وتجاوز ضوابط الحماية والإصلاحات الأمنية الصامتة (الحلقات 2 و3 و13)

> **التدقيق التقني المعمّق:** تتوفر أوامر SQL الحرفية لتقليص SQLite، واستدعاءات Rust `sysinfo`، وأسطر صلاحيات `ClaudeAdapterV2.ts`، وفروق ما بعد `9d3195b4`، والتحليل الكامل لحدود `SECURITY.md` في [**الملف 02: الأمان المحلي، وتجاوزات التنفيذ الصامتة، والتدقيق الأمني غير المعلن**](../dossiers/02-local-safety-and-security-audit.md).

### 3.1 الحذف الوهمي للمحادثات في SQLite وفحص العمليات على مستوى الجهاز (`الحلقة 2`)

عندما يحذف المستخدم محادثة في الشريط الجانبي، يعد مربع التأكيد (`useThreadActionMenu.ts`) بـ `"This permanently clears conversation history for this thread."` («يمسح هذا سجل المحادثة لهذا الخيط نهائيًا.»). عند خط الأساس `9d3195b4`، لم يُضِف `ThreadDeletion.ts` سوى حدث `"thread.deleted"` إلى `statev2.sqlite`، واستثنى `ProjectionMaintenance.ts` حدث `thread.created` وأحدث أحداث التدفق (`MAX(newer.sequence)`) مع الإبقاء على الأحداث السابقة. وأبلغ المستخدمون عن تضخّم `statev2.sqlite` إلى **25.9 GB** خلال ثلاثة أسابيع (90% محادثات «محذوفة»)، و**41.6 GB** خلال ستة أسابيع، و**33 GB** خلال سبعة أسابيع — تاركًا **Issue #17845** (و**#28903**) بلا إصلاح منذ 10 أكتوبر ([الحلقة 2](https://x.com/realchendahuang/status/2125160473176023486)).

في 25 نوفمبر، أغلق [**PR #42119**](https://github.com/pingdotgg/t3code/pull/42119) ([`91f0b32e`](https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e)، `2026-11-25T05:58:26Z`) البلاغ **Issue #17845** عبر إضافة تنظيف غير متزامن لصندوق الصادر `thread-content.purge` (`ThreadDeletion.ts`، `ProjectionMaintenance.ts`). غير أن الفحص عند `ca81b7b9` يُظهر أن المحادثات المصدرية المحذوفة تظل محتفظة بسجلها ما دامت مشارًا إليها من أي تفرع حي (`live fork`) أو عملية `merge_back` معلّقة أو وكيل فرعي أب حي؛ كما تبقى صفوف البيانات الوصفية لشواهد الحذف (`tombstone`) داخل SQLite؛ ولا يزال تقليص حجم ملف `.sqlite` على القرص يتطلب تشغيل `VACUUM` دون اتصال.

![Issue #17845 يبلغ عن بقاء المحادثات المحذوفة نهائيًا داخل statev2.sqlite وتضخم الأقراص بعشرات الجيجابايت](../../evidence/10-issue17845-fake-delete.png)

قام مساعد خلفية بلغة Rust هو `t3-resource-monitor` (**Issue #11222**، حيث يستدعي `native/resource-monitor/src/main.rs` دالة `ProcessesToUpdate::All` مع `with_cmd(UpdateKind::Always)`) بفحص كل عملية على الجهاز كل 5 ثوانٍ حتى عند إغلاق التشخيصات — فاتحًا ~280–300 مقبضًا دائمًا على أكثر من 440 تطبيقًا ولعبة لا علاقة لها على Windows مع انعدام أي خيار تعطيل، بينما زعمت الوثائق أن أخذ العينات لا يعمل إلا بوجود مشتركين نشطين. ولم يؤكد **PR #41889** إلا في **24 نوفمبر** أن تشخيص العمليات كان يلتقط **وسائط سطر الأوامر الكاملة للعمليات** — التي تحوي غالبًا مفاتيح API وكلمات مرور قواعد بيانات ورموز مصادقة بنص واضح — داخل القياس الحي ولقطات السجل. وأوقف طلب ما بعد التدقيق [**PR #42577**](https://github.com/pingdotgg/t3code/pull/42577) ([`af276ccb`](https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c)، `2026-11-25T04:09:53Z`) أداة `t3-resource-monitor` على Windows عن قراءة ذاكرة العمليات غير المتتبعة وسطور أوامرها، بينما لا يزال Linux وmacOS يستخدمان اكتشاف `ProcessesToUpdate::All` على مرحلتين ويبقى `PR #41889` مفتوحًا.

<details>
<summary>عرض دليل مراقب العمليات الشامل على الجهاز (Issue #11222)</summary>

![Issue #11222 يوثق قيام t3-resource-monitor بفحص كل عملية على الجهاز](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

</details>

شملت العيوب المحلية الإضافية الموثّقة في الحلقة 2 ما يلي:

- **تسريبات أسماء المضيفين المؤسسية عبر الأيقونات:** سرّبت طلبات الواجهة الأمامية أسماء المضيفين الداخلية (مثل `devbox.localdomain`) إلى واجهة favicon لدى Google (`PR #16950`، `PR #32657`).
- **جلب شبكي إجباري عند بدء التشغيل:** حتى مع تعطيل التتبع، يجلب بدء تشغيل الخادم قوائم التوافق دون شرط من [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) دون أي خيار للإلغاء (**Issue #36479**).
- **تجاوزات الموافقة والسياسات:** إصلاحات لتجاوز الموافقات والسياسات في الوصول الكامل وWSL/Tailscale (`PR #21806`، `PR #27322`).
- **استنزاف حصة Claude بمعدل 1.7x وسحب طاقة بمقدار 136x:** استهلك تشغيل Claude عبر Agent SDK حصص الـ 5 ساعات بسرعة **1.7x** المعدل الطبيعي حتى أوائل نوفمبر (`Issue #7338`، `Issue #24649`، 81 تعليقًا)؛ وبلغت أخطاء GPU/الطاقة **136x** سحب تطبيقات Electron المماثلة — بما في ذلك تثبيت معالج رسوميات MacBook بـ 19 نواة عند **60W** ما فرّغ البطارية خلال 78 دقيقة واستهلك **18W** بعد إغلاق تبويب الويب (`Issue #3143`، `Issue #40581`).

### 3.2 تمرير `git push --force` الصامت طوال 52 يومًا مقابل إزالة مرشح خصوصية النماذج خلال 21 ساعة (`الحلقة 3`)

منذ **3 أكتوبر** فصاعدًا — ولا يزال **بلا إصلاح عند `ca81b7b9`** في **Issue #15353** ([تعليق](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)) — نفّذ وضع Claude Auto أوامر خطرة بصمت (تقصير `ClaudeAdapterV2.ts` إلى `"allow"` عند تقييم `!requiresClaudeApproval(context)`). وحتى مع انعدام القواعد المخصصة، وبعد أن حظر مصنف Claude أمر `git push --force origin main` مرتين ورفع المحاولة الثالثة للموافقة اليدوية، وافق T3 Code عليه بصمت دون نافذة حوار في الواجهة وسجّل `"source": "user_temporary"`. وتُرك طلبا إصلاح مجتمعيان (`#15360`، `#35207`) دون مراجعة حتى أغلقتهما البوتات تلقائيًا، بينما ظل `#40692` معلقًا ([الحلقة 3](https://x.com/realchendahuang/status/2125201882687881378)).

![Issue #15353 المفتوح لأكثر من 52 يومًا يظهر موافقة وضع Claude Auto بصمت على git push --force دون مطالبة](../../evidence/11-issue15353-auto-force-push.png)

بالمقابل، في **22 نوفمبر**، أشار **Issue #40948** إلى أن النماذج الأحدث لا تظهر في لوحة متصدري القياس العلنية الخاصة بـ `@theo` [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) لأن `PR #29001` حصر الإبلاغ بقائمة بيضاء. وخلال **21 ساعة**، دُمج **PR #41237** تحت حساب `@theo` مشيرًا صراحةً إلى أن Theo طلب الإزالة — ليرسل `ollama/acme-internal` وأسماء النشر المؤسسية `acme-azure-deployment` حرفيًا إلى التحليلات (ضُيّقت لاحقًا للنماذج خارج الكتالوج إلى `custom:<driver>` في `PR #42465`، بينما تواصل أسماء نماذج الكتالوج/المورّدين الإبلاغ حتى خلف نقاط النهاية المخصصة).

<details>
<summary>عرض دليل إزالة مرشح النماذج خلال 21 ساعة في PR #41237 (slopalytics.com)</summary>

![PR #41237 المدمج بعد 21 ساعة من Issue #40948 لإزالة تصفية النماذج لصالح slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

</details>

### 3.3 صفر نشرات أمنية، وإصلاحات ثغرات صامتة، وملف `SECURITY.md` (`الحلقة 13`)

حتى 25 نوفمبر (`ca81b7b9`)، يقف تبويب [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) الخاص بـ `pingdotgg/t3code` عند **0 نشرات منشورة** ([الحلقة 13](https://x.com/realchendahuang/status/2125395980354994414)). ومع ذلك دمج المشرفون بصمت إصلاحات عالية الخطورة دون إشعار المستخدمين الحاليين:

- **إصلاحات أمنية مدمجة بصمت:** `PR #39483` (تجاوز المسار في `ServerSecretStore` عبر `jti`/`nonce` المرحّل قبل اعتماد الجهاز)، و`PR #41756` (تسريبات رموز GitHub/GitLab المؤسسية عبر النطاقات)، و`PR #41886`، و`PR #22190`، و`PR #37823`، و`PR #39464`، و`PR #39480`، و`PR #40133`، و`PR #41757` و`PR #42386` (عزل معاينة متصفح سطح المكتب غير المعزولة في صندوق رمل / تأكيد أوامر تخطيط `worktree`)، و[`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413) (قصر أذونات ملف رمز Clerk على سطح المكتب على المالك فقط)، و`PR #42504` (إصلاح بنحو ~3,000 سطر أضاف أخيرًا طلبات تأكيد لإعدادات المستودعات غير الموثوقة التي كانت تشغل أوامر محلية سابقًا دون موافقة).
- **بنود أمنية مفتوحة / غير محلولة عند `ca81b7b9`:** `Issue #26489` (مخاطر تجاوز المسارات الخارجية والروابط الرمزية)، و`PR #36216`، و`PR #23428`، و`PR #33144`، و`PR #30997` (مُطلق Windows `externalLauncher.ts` الذي يشغّل `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` والمصنّف من AVG/Avast كـ `IDP.HELU.PSE96`)، ومخاطر التنفيذ في المستودعات غير الموثوقة (تشغيل [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) لتهيئة `.gitmodules` التعاودية تلقائيًا، وإغفال [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) لضبط `core.hooksPath=/dev/null` العام، وتشغيل [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) لخطافات `SessionStart` في `.claude/settings.json` مع وراثة كاملة لمتغيّري `GITHUB_TOKEN` و`SSH_AUTH_SOCK`).
- **ملف [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) المُعجّل (`PR #38812`، `PR #41942`):** لا يزال يعلن أن `filesystem:read` على مستوى نظام التشغيل خارج مساحات العمل، والنقل عبر HTTP العادي على iOS/LAN، والسيطرة الكاملة على الجهاز عبر مفتاح توقيع مرحّل مخترق هي **حدود تصميم مقصودة** وليست ثغرات، بينما يظل [`https://ingest.t3.codes/`](https://ingest.t3.codes/) مغلق المصدر (`2125370330244128924`).

<details>
<summary>عرض 3 أدلة حول الإصلاحات الأمنية الصامتة وملف SECURITY.md (PR #39483 وPR #30997 وSECURITY.md)</summary>

![PR #39483 يرقع بصمت تجاوز المسار في ServerSecretStore دون نشرة أمنية](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![الإصلاح المفتوح PR #30997 لعمليات إطلاق PowerShell بترميز Base64 EncodedCommand على Windows المصنفة كبرمجيات خبيثة](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![ملف SECURITY.md يحدد صراحة القراءة عبر نظام التشغيل وHTTP التعسفي على iOS والاستيلاء على الجهاز بمفتاح المرحل كحدود مقصودة](../../evidence/extra/x-post05-4-security-md-intended.jpg)

</details>

---

## 4. مخاطر مخالفة شروط Google Antigravity ومرحل T3 Connect غير المشفر (الحلقات 4 و5)

> **التدقيق التقني المعمّق:** تتوفر خرائط ترويسات `cliproxyApi.ts` الكاملة (`PR #33800`)، وإشارات أسطر `AntigravityAcpSupport.ts` و`AntigravityTurnOutcome.ts` و`contracts/src/settings.ts` و`ManagedEndpointProvider.ts` في [**الملف 03: انتحال شروط Google Antigravity، و`PR #33800`، وبنية مرحّل T3 Connect**](../dossiers/03-antigravity-tos-and-t3connect-relay.md).

### 4.1 انتحال ترويسات Google Antigravity، وحقن `SSH_CONNECTION` الوهمي، والحظر خلال 3 دقائق (`الحلقة 4`)

تؤكد الأسئلة الشائعة الرسمية لـ T3 Code [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) للمشتركين المدفوعين: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* («نعمل مع جميع المختبرات وT3 Code متوافق مع شروط خدمة Claude Code وCodex وGoogle Antigravity... إذا عمل في T3 Code، يمكنك الوثوق بأنه آمن»). وعندما أبلغ المستخدمون عن حالات حظر في **Issue #40713**، نفى أحد المشرفين الاتصال بخادم Antigravity أو إعادة استخدام الرموز، زاعمًا أن جميع الطلبات تصدر من أداة سطر الأوامر الرسمية من Google — قبل أن يدحض المطورون (`schlessera`) الادعاء باستخدام الملفات المصدرية لـ T3 Code نفسها ([الحلقة 4](https://x.com/realchendahuang/status/2125213397507858657)):

1. **انتحال User-Agent، واستخراج سلسلة المفاتيح، واستدعاءات `v1internal` ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)):** يستخرج بيانات اعتماد Google OAuth من الملفات المحلية أو `@napi-rs/keyring` أو Windows Credential Manager (`CredReadW` عبر `ffi-rs` على `advapi32.dll`)، ويثبّت سلسلة العميل الداخلية الخاصة بـ Google في الكود، ويرسل `POST` مباشرة إلى خادم Google الخلفي غير الموثق `v1internal` ([الأسطر 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)). وقد أكد موظفو Google في [منتدى المطورين الرسمي](https://discuss.ai.google.dev/t/185992) أن القسم 6 من [شروط خدمة Google Antigravity](https://antigravity.google/terms) يحظر على الأدوات الخارجية استخراج أو إعادة استخدام بيانات الاعتماد للاستعلام من الخادم الخلفي مباشرة:

<div dir="ltr">

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

</div>

2. **حقن `SSH_CONNECTION` الوهمي وتداخل الحسابات ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)):** لأن أداة سطر الأوامر من Google تعزل تسجيل دخول واحدًا داخل سلسلة مفاتيح نظام التشغيل، يحقن T3 متغير بيئة مزورًا هو `SSH_CONNECTION` لخداع الأداة ودفعها إلى كتابة ملفات الرموز بنص واضح محليًا. وعندما حدّثت Google أداتها في 24 نوفمبر مزيلةً ذلك المسار البديل، أكد **Issue #41973** تمرير طلبات الحساب A بصمت إلى الحساب B:

<div dir="ltr">

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

</div>

3. **حظر حساب جديد خلال 3 دقائق (`Issue #41536`)، وانتحال هوية العميل (`PR #26876`)، ومحفزات التحقق بعد التدقيق (`PR #41210`):** في 23 نوفمبر، وثّق **Issue #41536** اشتراك Google AI مشترى حديثًا بقيمة `$20` يعمل **دون أي بروكسي** — فقط Antigravity المُدار داخل T3 Code — حُظر عند **أول رسالة له بعد 3 دقائق من الإعداد** (تمنح Google الحسابات الشخصية استئنافًا واحدًا فقط؛ وقد أغلقه المشرفون كمكرر دون إضافة تحذير). وقبل ذلك، دمج `@theo` شخصيًا **PR #26876** متخفيًا بصفة `"zed"` ([`AntigravityAcpSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts)) لتجاوز القوائم البيضاء للنماذج. ورغم رسم `@theo` مخطط `T3 Code -> Antigravity binary ✅` في 23 نوفمبر ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) وإلقائه اللوم على CLIProxy عندما تعطل حساب Google AI Ultra الثاني للمستخدم `@Only_21Mil` ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397))، فإن الطلب المدمج [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) يدمج أصليًا استطلاع مركز [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) بترويسات منتحلة لـ `claude-code/2.1.273` و`grok-cli/1.0.77` و`antigravityUserAgent`.
   - **الحالة بعد التدقيق (`ca81b7b9`):** أضاف [**PR #41210**](https://github.com/pingdotgg/t3code/pull/41210) ([`3e74a0aa`](https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836)، `2026-11-25T05:23:36Z`) تحليل ردود `cloudcode-pa.googleapis.com` من نوع `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) داخل [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) لعرض روابط مباشرة للتحقق من حساب Google في الخط الزمني للعمل — ما يؤكد نشاط محفزات التحقق من Google — بينما ثبّت [**PR #42545**](https://github.com/pingdotgg/t3code/pull/42545) ([`4da8d19d`](https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc)) قيمة `AGY_CLI_DISABLE_AUTO_UPDATE: "true"` (إلى جانب [`#42339`](https://github.com/pingdotgg/t3code/pull/42339) و[`#42475`](https://github.com/pingdotgg/t3code/pull/42475)). وتبقى مسارات الانتحال والاستخراج الأربعة كلها — [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts)، و[`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts)، و`AntigravityAcpSupport.ts`، و`cliproxyApi.ts` — قائمة كما هي عند `ca81b7b9`.

![ملف antigravityUsageLimits.ts يثبت ترويسات عميل Google منتحلة ويتصل بالخادم الخلفي غير الموثق v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

<details>
<summary>عرض 3 أدلة إضافية لانتحال Antigravity وحالات الحظر (SSH_CONNECTION وIssue #41536 وPR #33800)</summary>

![ملف antigravityAuthSupport.ts يحقن متغير البيئة الوهمي SSH_CONNECTION لتجاوز التخزين في سلسلة مفاتيح نظام التشغيل](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 يوثق حظر حساب Google جديد بقيمة 20 دولارًا دون بروكسي بعد ثلاث دقائق من الإعداد عند أول رسالة وإغلاقه كمكرر](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 يدمج استطلاع مركز CLIProxyAPI لـ Antigravity وxAI وClaude مباشرة داخل T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

</details>

### 4.2 مرحّل T3 Connect: انعدام التشفير من طرف إلى طرف وبوابة OVH لإنهاء TLS (`الحلقة 5`)

**يفتقر T3 Connect تمامًا إلى التشفير من طرف إلى طرف (E2E) — كل موجّه (`prompt`) وملف مصدري ومخرج طرفية مرئي تقنيًا بنص واضح لدى T3** ([الحلقة 5](https://x.com/realchendahuang/status/2125218189596676555)). حاليًا، ينشئ [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) أنفاق Cloudflare وسجلات DNS داخل حساب Cloudflare التابع لـ T3 نفسه (`06_t3-connect.md`). ينتهي تشفير TLS عند حافة Cloudflare دون أي تشفير للحمولة؛ وإرفاق Workers Route يلتقط كامل حركة المرور دون أي تعديل في الكود ودون أي تنبيه للعميل.

ولا يزال خيار الموافقة على الأجهزة الجديدة (`requireConnectDeviceApproval` المضاف في [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419)) مضبوطًا افتراضيًا على **`false`** في [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`الأسطر 1424–1426` عند `ca81b7b9`)، حتى بعد أن أضاف [**PR #42311**](https://github.com/pingdotgg/t3code/pull/42311) ([`ece5f21b`](https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd)) بعد التدقيق إشعارات تسجيل الدخول من جهاز جديد. وكما يقرّ [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)، فإن تسريب مفتاح توقيع المرحّل أو اختراق الحساب السحابي يمكّن من إصدار جلسات مباشرة إلى الجهاز المرتبط — ما يعادل طرفية محلية. وفي الأثناء ذاتها، يؤكد فحص الشيفرة المصدرية عند `ca81b7b9` ([الملف 03](../dossiers/03-antigravity-tos-and-t3connect-relay.md)) أربعة عيوب إضافية في المصادقة والشبكة المحلية والأنفاق: ما زال `t3 up --lan` يعيّن ملفات تعريف ارتباط جلسة بصلاحية طرفية لمدة 30 يومًا دون سمة `Secure` ([`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042)، [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)، [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493)) ويقبل الطلبات التي تغفل ترويسة `Origin` ([`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806))؛ وتُصدر عمليات تبادل `/oauth/token` غير المقيدة بـ DPoP رموز Bearer غير مقيدة بجهاز لمدة 30 يومًا وغير قابلة للإلغاء، مع انعدام مسار `/logout` وحجب الإلغاء الذاتي ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)، [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)، [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679))؛ وتفتقر رموز الاستعلام `?wsTicket=` الصالحة لـ 5 دقائق إلى الحماية من إعادة الإرسال لطلبات Bearer RPC ولجميع مسارات `media` ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)، [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156))؛ كما يسيء `startupAccess.ts` تصنيف العنوان `::1` عبر `NodeNet.isIPv4`، مستدعيًا `socket.destroy()` بصمت على أنفاق Tailscale Serve / Connect ([`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)). وعندما طلب **Issue #32098** مصادقة متبادلة وتشفير E2E، أغلقه أحد المشرفين قائلًا إن التشفير الكامل من طرف إلى طرف تغيير كبير للغاية؛ وظلت النقاشات `#21286` و`#37831` بلا رد، وفي 25 نوفمبر أعلن `@theo` أن تشفير E2E مستحيل (`2125370330244128924`).

ولأن تكلفة Cloudflare Tunnels بلغت **$25,000 شهريًا**، فتح `@theo` طلب **PR #32945** لنقل حركة المرور إلى بوابة OVH Hillsboro مستأجرة من T3 (`gw.t3coderelay.com`) حيث ينهي خادم Caddy التابع لـ T3 تشفير TLS ويمرر النص الواضح عبر مقبس Unix إلى وكيل Go `yamux` — ولا يزال بلا تشفير E2E. وفي الوقت ذاته، تعد صفحة [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) بـ `"encrypted network transport"` («نقل شبكي مشفّر») دون الإفصاح عن غياب تشفير E2E أو تقديم ضمانات بعدم الاحتفاظ بالبيانات.

![المشرف الأساسي يقر في Issue #32098 بأن سرقة الحساب السحابي أو مفتاح المرحل تتيح التحكم بالأجهزة المرتبطة مع استبعاد التشفير E2E](../../evidence/15-connect-no-e2e.jpg)

<details>
<summary>عرض دليل بوابة OVH Caddy لإنهاء TLS (PR #32945)</summary>

![PR #32945 لثيو يذكر فاتورة Cloudflare بقيمة 25 ألف دولار شهريًا وينقل T3 Connect إلى بوابة OVH مستضافة ذاتيًا حيث ينهي Caddy تشفير TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

</details>

---

## 5. الميزانية التجارية وتضارب مصالح المستثمرين والرعاة ومحرك 77,000 نجمة (الحلقات 6 و8 و17 و18)

> **التدقيق التقني المعمّق:** تتوفر الاستشهادات الكاملة للإيرادات والرادار، وإعدادات Axiom في `infra/relay/src/observability.ts`، والتفكيك الكامل لـ `GitHubStarPrompt.tsx` في [**الملف 04: الدفتر التجاري، وتضارب مصالح المستثمرين، ومنظومة الرعاة، ومحرك الـ 77 ألف نجمة**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md).

### 5.1 إنفاق $800,000+ ورادار حوسبة بـ 31.7 تريليون توكن/يوم ($10.19M/يوم) (`الحلقة 8`)

عبر 1,151 تغريدة خلال 17.24 يومًا، ذكر `@theo` مشروع T3 Code **162 مرة (14.1%)** بينما ذكر شركاته المدفوعة الثلاث الأقدم — `T3 Chat` و`UploadThing` و[`https://ping.gg/`](https://ping.gg/) — **0 مرات**. وفي 12 نوفمبر أكد إنفاقه **$800k+** من ماله الخاص على العميل المجاني ذي ترخيص MIT ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267)، [الحلقة 8](https://x.com/realchendahuang/status/2125392410763239723)).

في المقابل، بنى التتبع المتدفق إلى `ingest.t3.codes` رادار حوسبة فوريًا يرصُد **31.7 تريليون توكن/يوم** — أي **$10.19 مليون/يوم** كإنفاق مكافئ عبر واجهات البرمجة في 18 نوفمبر (مع ذروة قاربت **$10.2M/day**) — إلى جانب حصص سوقية دقيقة (`99%` مدعومة باشتراكات، `~98.5%` عبر Codex/Claude/Antigravity، وتراجع تجارب النماذج مفتوحة الأوزان من `15%` إلى `6%` بأقل من 0.5% من التوجيهات). وعندما خمّن أحد المعلقين الحصص في 23 نوفمبر، سخر منه `@theo` لافتقاره إلى الوصول إلى تحليلاته (`2124682906132181482`).

وتحوّل ذلك الرادار مباشرة إلى نفوذ: **$300k+ في توكنات الوصول المبكر المجانية غير المحدودة من OpenAI** أُحرقت في اختبار قياس أداء واحد لـ GPT-6.2 Astra (`2122760447103484410`)، وقياسات أداء على عتاد Google المادي وتواصل مع DeepMind (رغم أن ادعاء `@theo` بأن `@PatrickToulme` من DeepMind أرسل `"many PRs"` يتناقض مع سجل git الخاص بـ `pingdotgg/t3code` الذي يظهر **التزامًا واحدًا فقط**، `PR #31158`)، واستفسارات من المستثمرين (`"multiple investors have asked me about this"`، [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).

![لوحة التحليلات الداخلية لـ T3 Code التي نشرها ثيو وتظهر 31.7 تريليون توكن وما يعادل 10.19 مليون دولار من الإنفاق اليومي على API](../../evidence/17-theo-31t-tokens-10m-day.png)

<details>
<summary>عرض لقطة التحقق من الالتزام الوحيد لـ Patrick Toulme (PR #31158)</summary>

![سجل تعديلات pingdotgg/t3code المصفى حسب patrick-toulme يظهر التزامًا واحدًا فقط (#31158) بدلًا من "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

</details>

### 5.2 تضارب مصالح المستثمر الملائكي (`الحلقة 6`) وازدواجية الرعاة والحصص (`الحلقة 17`)

- **تداخل Vibe Kanban وDaytona ([الحلقة 6](https://x.com/realchendahuang/status/2125385742243520653)):** في 16 نوفمبر (`2122201981167251877`) كشف `@theo` أنه كان مستثمرًا ومساهمًا في **Vibe Kanban** — الذي تحوّل نحو واجهة مستخدم T3 Code قبل إغلاقه — ثم سخر من تلك الواجهة بوصفها ممتازة `"for running out of runway and killing your business"` («لاستنزاف السيولة وقتل شركتك»). وفي 18 نوفمبر (`2123011578090127499`) أكد استثماره في شركة البيئات المعزولة السحابية **Daytona** إلى جانب منافسين، بعد تسعة أيام فقط من طرحه فكرة البيئات السحابية المعزولة المدفوعة داخل T3 Code (`2119705561679933806`).
- **منظومة الرعاة المدمجة في المرحّل ([الحلقة 17](https://x.com/realchendahuang/status/2125411353393553744)):** يشغّل اثنان من رعاة قائمة YouTube لدى `@theo` في مايو 2023 (`1657488850472804353`) — **Clerk** و**Axiom** — المصادقة السحابية لـ T3 Code وتسجيل المرحّل المرفق بـ IP لمدة 30 يومًا. وفي أبريل 2024 أكد الرئيس التنفيذي لـ Vercel `@rauchg` أن Vercel رعت Theo وحده فقط (`1776260839965863965`)، وأقرّ Theo لاحقًا بوجود بنود حصرية في عقود الرعاية (`uv179CTAK-w`). كما أنه مستثمر ملائكي في Cursor وCline.
- **استغلال 0% في Codex وتناقض Gist الـ 10 حسابات لـ CLIProxyAPI:** في 21 أغسطس 2026، تفاخر `@theo` بانتزاع **$800+** بعد فترة سماح حصة 0% في Codex بينما أطلقت موظفة T3 `@maria_rcks` أداة *Endless* لتكرار الدورات تحت الصفر؛ وبعد الانتقادات في 22 أغسطس حذف الاثنان منشوراتهما وأملت Maria أن تحظر Codex الحسابات (`2090972426876129658`)، مما سبق القطع الصارم للدورات لدى OpenAI (`openai/codex#45444`). وفي أكتوبر، نشر `@theo` ملف Gist حاز 452 نجمة (`59a521d2ee8d70aaf90e280c175072af`) يجمع **7 حسابات Claude + 3 حسابات Codex** (`555%` حصة عبر 12+ جهازًا؛ مع التفاخر أيضًا بعائد `$14,662` / `$15k` على Ultra عبر 1.1 مليون طلب عبر الوكيل وكتابة دليل إعداد Grok Bot + Claude بـ `$100`) — وهو ما يربط به ملف `docs/user/faq.md` الخاص بـ T3 Code فورًا بعد رفضه التبديل المدمج بسبب مخاطر الحظر (`"Early apologies if it gets you banned 💀"` — «اعتذاراتنا المسبقة إذا تسبب ذلك بحظرك 💀»).

<details>
<summary>عرض 3 أدلة حول تضارب المصالح وGist CLIProxyAPI وحصة 0% في Codex</summary>

![ثيو يكشف أنه استثمر وساهم في Vibe Kanban قبل السخرية علنًا من إغلاقه](../../evidence/18-theo-vibe-kanban.png)

![ملف Gist cliproxy-setup.md لثيو بـ 452 نجمة يجمع 7 حسابات Claude و3 حسابات Codex عبر أكثر من 12 حاسوبًا بنسبة حصة 555%](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 يوثق التراجع العالمي الذي يوقف الدورات النشطة في منتصف المهمة عند حصة 0%](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

</details>

### 5.3 كيف قفز T3 Code من 30 ألفًا إلى 77 ألف نجمة خلال 25 يومًا (129 متابعًا) (`الحلقة 18`)

بعد ستة أشهر من نشر *"Github has a fake star problem"* (`2048122499834036340`، محذرًا من أن النجوم صارت أداة `"to trick VCs into investing"` — «لخداع مستثمري رأس المال المخاطر للاستثمار»)، كتب `@theo` بنفسه ودمج بنفسه ثلاثة طلبات دمج ([الحلقة 18](https://x.com/realchendahuang/status/2125416210120765799)):

1. **30 أكتوبر (`PR #27832`):** أضاف مطالبة نجمة في الزاوية العلوية اليمنى بعد 5 أوامر مرسلة (`PROMPTS_BEFORE_ASKING = 5`، وتنطلق عند الأمر السادس في [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx))، ما **ضاعف النجوم اليومية 10 مرات** فورًا (`2117065834267136469`) وبلغ **+3,094 نجمة/يوم** على GitHub Trending (`2117172614158508400`).
2. **3 نوفمبر (`PR #29922` و`PR #29987`):** طوّر الآلية إلى **اكتشاف خمول النافذة لـ 30 ثانية** (`IDLE_MS = 30_000`) أثناء انتظار المستخدمين لدورات الوكيل، واستبدل التحويل إلى المتصفح بـ `sourceControl.star` RPC — مُرسلًا `PUT user/starred/pingdotgg/t3code` مباشرة عبر **بيانات اعتماد GitHub الخاصة بالخادم المضيف** قبل إطلاق قصاصات ورق ملونة من 160 جزيءًا.
3. **تجاوز المراجعة وخلل منح النجوم لمستودعات عشوائية (لا يزال بلا إصلاح عند `ca81b7b9`):** علّم Macroscope طلب `PR #29922` بوسم `Needs Human Approval`؛ ومع ذلك دمجه `@theo` بنفسه. وفي 6 نوفمبر، قدّم `zhilsinger` مراجعة `Request changes` منبّهًا إلى غموض بيانات الاعتماد على المضيفين المشتركين (المعترف به في `GitHubStarPrompt.tsx#L115`) وإلى أن [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) لا يقيّد أبدًا `pingdotgg/t3code`:

<div dir="ltr">

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

</div>

يستطيع أي عميل يملك صلاحية `source-control:write` منح نجوم لمستودعات عشوائية باستخدام بيانات اعتماد المضيف. وتظل مراجعة `zhilsinger` بلا رد ولا إصلاح حتى `ca81b7b9` (**19 يومًا** بعد تقديمها) بينما صعد المستودع من 30k إلى 77k نجمة (129 متابعًا).

![رسم بياني لثيو بتاريخ 2 نوفمبر يحتفل بارتفاع شبه عمودي بمقدار 10 أضعاف في النجوم اليومية فور إطلاق نافذة طلب النجمة داخل التطبيق](../../evidence/20-star-10x-cliff.png)

<details>
<summary>عرض دليلي مراجعة zhilsinger ومنح النجوم لمستودعات عشوائية في driver.ts (PR #29922)</summary>

![مراجعة Request Changes للمطور zhilsinger على PR #29922 تحذر من النجوم عبر المضيف المشترك والمستودعات العشوائية ببيانات اعتماد الخادم وتظل بلا رد 19 يومًا](../../evidence/21-pr29922-zhilsinger-review.png)

![الأسطر 60–99 من packages/source-control-github/src/server/driver.ts تخفق في تثبيت pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

</details>

---

## 6. الحوكمة وبوتات اقتباس النسخ المتفرعة وسجل العلامات التجارية ومجموعة بيانات 1,151 تغريدة والسوابق (الحلقات 9 و10 و14 و15 و16)

> **التدقيق التقني المعمّق:** تتوفر الشيفرة الكاملة لأتمتة الحوكمة (`.github/scripts/pr-limits.cjs`)، وتدقيق USPTO TSDR، وجداول المنهجية والمعجم الكاملة لـ `n = 1,151` في [**الملف 05: حوكمة المستودع، وبوتات استخراج النسخ المتفرعة، وتجاوزات العلامات التجارية، والسجل التاريخي**](../dossiers/05-governance-trademark-and-history.md) و[**الملف 06: مجموعة البيانات الجنائية الكمية لـ 1,151 تغريدة (7–24 نوفمبر 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md).

### 6.1 الوتيرة الداخلية مقابل العدائية الخارجية (`الحلقة 9`) واستخراج النسخ المتفرعة (`الحلقة 10`)

- **500 commit/يوم و`yolo merges` مقابل `CONTRIBUTING.md` ([الحلقة 9](https://x.com/realchendahuang/status/2125392916369871309)):** تحدّث `@theo` عن دفع **500 commits/يوم** (`2120741101250515322`)، وتشغيل **700 وكيل**، ودمج Julius للـ PRs بالجملة عبر حلقة وكيل، و`"my yolo merges breaking shit sometimes"` (`2119951615679672513`)، والمخاطرة بمسح جهازه لأجل `"free content"` (`2119993037971730879`). أما للمستخدمين الخارجيين، فقد أخفى **PR #5551** وضع Plan (`"Reality check for those upset"`، 10 تصويتات سلبية)، وأخفى **PR #9190** حلقة السياق (16 تصويتًا سلبيًا، الأعلى في المستودع)، وحذف **PR #33131** وضع Plan بملخص ذكاء اصطناعي عبثي، وقوبل مستخدم شاكٍ في **Issue #33639** بـ `"uninstall our software"` / `"ungrateful prick"` (ورُفض **PR #41572** صباح اليوم التالي)، ويستهل `CONTRIBUTING.md` بعبارة `"here's my advice: Don't"` إلى جانب حظر النماذج والتشهير العلني والحظر في `.github/VOUCHED.td` (`174` وسم `unwanted` عبر المستودع)، كما وُبّخ مساهمو X لعدم متابعته (`2120821423438778667`)، وهُدّدوا بإزالة `/btw` (`2120853340078874923`)، أو قيل لهم إن لقطات الشاشة المشروحة أفضل من PRs (`2123754193530053110`).
- **الاستخراج العلني عبر `@bot` مقابل السخرية من المنافسين ([الحلقة 10](https://x.com/realchendahuang/status/2125393641665671593)):** في 8 نوفمبر، رد `@theo` بعبارة `"Okay I'm stealing this"` على ميزة في نسخة متفرعة لـ `@MiaAI_lab` وبعد 30 ثانية استدعى `@bot` في الردود العلنية لاستخراج نسختها إلى `beebox` عبر Opus 5.5 (`2119240810202034645`)؛ وفي 13 نوفمبر استدعى `@bot` مجددًا لاستنساخ مزايا مُشادة من أدوات منافسة (`2121017649652269120`). ومع ذلك سخر في 24 نوفمبر من Claude Code Desktop لإضافته تبويبات جانبية (`2124987957803446311`). وضد المنتقدين، دعا المتابعين لاستخدام Community Notes لـ `"demonetize them"` (`2120238923884696025`) وأكد تشغيل بوت حظر تلقائي على X (~100 حساب محظور في 24 نوفمبر، `2125077510941802509`).

![CONTRIBUTING.md يثني عن طلبات الدمج الخارجية ويفصل الحظر مع التشهير العلني في .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

<details>
<summary>عرض دليلي Issue #33639 واقتباس النسخ المتفرعة عبر @bot</summary>

![رد ثيو في Issue #33639 يأمر @bermudi بإلغاء التثبيت وينعته بـ ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![ثيو يرد "Okay I'm stealing this" ويوجه @bot بعد 30 ثانية لاقتباس نسخة مطورة إلى T3 Code](../../evidence/23-stealing-fork-bot.png)

</details>

### 6.2 تدقيق العلامات التجارية: 0 تسجيلات USPTO و`PR #41898` بأثر رجعي (`الحلقة 15`)

تتبعًا لخيط من `@vildanden_ai` (`2125275487404761555`)، يُظهر فحص قاعدة بيانات USPTO TSDR **0 تسجيلات** لـ `T3 Code` أو `T3 Tools` أو `T3 Connect` ([الحلقة 15](https://x.com/realchendahuang/status/2125408163273080950)). رُفض طلب USPTO الوحيد المقدم من T3 Tools Inc. (`PING LABS`، الرقم التسلسلي [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) نهائيًا في فبراير 2025 وصُنّف `ABANDONED` في 19 مايو 2025، بينما تحمل أطراف ثالثة بالفعل تسجيلات `T3` في فئتي البرمجيات/SaaS 42 و9 (`EquipmentShare` تسجيل `7795672` / السلسلة [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)؛ `ESG Operations` تسجيل `3324707`).

وبموجب [سياسة العلامات التجارية في GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)، يتعين على الشركات التجارية التي تقدم طلبات إزالة بسبب علامات تجارية تزويد رقم تسجيل فيدرالي أو دولي تحت طائلة عقوبة الحنث باليمين (ولا تنطبق الاستثناءات غير المسجلة إلا على الهيئات الحكومية والمنظمات غير الربحية). وفي لحظة تهديد `@theo` بإزالة حساب `@DDdxx666` على GitHub، لم يكن بإمكانه إكمال نموذج GitHub. وبعد **17 ساعة فقط** (`12:21 BJ` في 24 نوفمبر)، دمج `@theo` طلب **PR #41898** مضيفًا `TRADEMARK.md` بأثر رجعي (`"whether registered or unregistered"`) ومستشهدًا به بعد 94 ثانية (`2125082769395220688`) — رغم سخريته من WordPress في سبتمبر 2024 لخوضها `"unenforceable trademark dispute"` (`1839261574005141945`) وقوله للمطورين `"get a better lawyer"` قبل ثلاث ساعات في 24 نوفمبر (`2125026423769555308`).

![PR #41898 مدمج بعد 17 ساعة من تهديد الحظر مضيفًا TRADEMARK.md بأثر رجعي مع ادعاء حقوق مسجلة أو غير مسجلة](../../evidence/24-pr41898-trademark-aftermath.png)

<details>
<summary>عرض دليل رد «get a better lawyer» على X</summary>

![ثيو يقول للمطورين "get a better lawyer" قبل ثلاث ساعات من دمج TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

</details>

### 6.3 مجموعة البيانات الكمية لـ 1,151 تغريدة (`الحلقة 14`) والسجل التاريخي لعامين (`الحلقة 16`)

يكشف تحليل جميع منشورات `@theo` المتتالية البالغ عددها **1,151 منشورًا على X** من 7 إلى 24 نوفمبر 2026 (`17.24` يومًا؛ `66.8/يوم`؛ `75.6%` ردود؛ `2.7m` فاصل وسيط) عن تفاوت حاد في ميزان القوة ([الحلقة 14](https://x.com/realchendahuang/status/2125404517697290438)):

- **تنفيذيو الشركات الكبرى، وموظفو المختبرات، وكبار المؤثرين (`n = 43` بتصفية `@` الأولى الصارمة / `n = 60`–`62` الأوسع):** **0.0%** ألفاظ نابية أو إهانات شخصية موجهة (`30.0%`–`32.6%` شكر مهذب). ولُطّفت الانتقادات القاسية لـ Gemini 4 Carbon وGPT-6.2 Astra أو تلتها اعتذارات علنية (`2123255588570501585`، `2123995323123343869`).
- **المطورون العاديون والمنتقدون (`n = 766` بتصفية `@` الأولى الصارمة / `n = 749` الأوسع):** قفزت العدائية/الألفاظ النابية إلى **8.0%** (`61/766`)، شاملةً `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`)، و`"dance on the graves of the 'local ai' community"` (`2120733839832273025`)، و`"Linux larpers"` (`2124298216271499605`)، ومنشورات `stupid bitch` المتكررة (`2120599310211703274`)، والسخرية من السجن/RSD (`2122865897375400066`).
- **نافذة أزمة النسخة الصينية لمدة 25 ساعة (`n = 132`):** ارتفعت الإهانات الشخصية المباشرة **4.0x** من خط الأساس `3.6%` إلى **14.4%** (`19/132`)، بما في ذلك `"chinese tech twitter is the biggest fucking cesspit"` ووصف قرّاء التدقيق الصينيين بـ `"fucking braindead"` (`2125177503526588877`) — بعد أقل من 24 ساعة من إلقائه محاضرة على مستخدم آخر بعدم حرق الثقة (`2124449493513068862`).

![الرسم البياني الجنائي 1: 1,151 تغريدة خلال 17 يومًا — 75.6% ردود و162 مقابل 0 من إشارات المنتجات](../../evidence/charts/theo-chart-1-overview.png)

![الرسم البياني الجنائي 2: الإيقاع الزمني لـ 24 ساعة بتوقيت PST (233 منشورًا متأخرًا ليلًا) وأعمدة النشر لـ 17 يومًا](../../evidence/charts/theo-chart-2-rhythm.png)

![الرسم البياني الجنائي 3: الكياسة الانتقائية — 0.0% ألفاظ نابية تجاه كبار الشخصيات مقابل 8.0% عدائية للمطورين وقفزة 14.4% في الأزمة](../../evidence/charts/theo-chart-3-double-standard.png)

![الرسم البياني الجنائي 4: تفصيل الموجات الثلاث لنافذة أزمة النسخة الصينية الممتدة 25 ساعة](../../evidence/charts/theo-chart-4-cn-crisis.png)

<details>
<summary>عرض دليلين أوليين للعدائية على X مذكورين في الحلقتين 13 و14</summary>

![ثيو يقتبس سؤال مقارنة بسيطًا بين الأدوات ليكتب أن المهندسين يستحقون البطالة الجماعية](../../evidence/25-engineers-unemployment.png)

![ثيو يصف المجتمع التقني الصيني على تويتر بالمستنقع ويهين المطورين الذين يقرؤون تدقيقات الشيفرة الصينية](../../evidence/26-cn-cesspit.png)

</details>

وبالرجوع عامين إلى الوراء يتأكد نمط متكرر ([الحلقة 16](https://x.com/realchendahuang/status/2125408843152953693)):

- **السخرية من نسخة متفرعة عام 2024:** سمّى نسخته المتفرعة من سمة VS Code لمطور آخر [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) ساخرًا من طبع المنشئ الأصلي.
- **مضايقة المطورين الهنود والاعتذار عام 2024:** بعد أن أثار مقطعه المستهدف لقنوات الشروحات الهندية مضايقات، رفع [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) مدينًا الهجمات القائمة على الجنسية — قبل عامين من مهاجمة المجتمع التقني الصيني على تويتر.
- **مكافأة FFmpeg في أكتوبر 2025:** شتم أمام الكاميرا وعرض **مكافأة $20,000** لإزاحة مشرف في FFmpeg ([سجل](https://www.youtube.com/watch?v=1oQ3KMeaH04))، ثم سحب العرض وحذف المنشورات بعد عرض Windscribe المضاد بـ $21k، والاعتراض العلني من VLC، وإدانة القائمة البريدية لـ FFmpeg.
- **تهديد إغلاق المصدر المحذوف في 25 نوفمبر 2026 (~4:00 صباحًا):** هدّد بتحويل T3 Code إلى مصدر مغلق تلك الليلة لأن المستخدمين لا يستحقون المصادر المفتوحة؛ ثم حذف التغريدة بصمت قبل الفجر بعد تجاوزها 3,000 إعجاب.

---

## 7. دليل عملي للتخفيف من المخاطر ومعالجة الآثار

إذا كان T3 Code مثبتًا على جهاز شخصي أو مؤسسي، طبّق دفاعًا متعدد الطبقات يشمل رايات البيئة، وحجب الشبكة على مستوى نظام التشغيل، وManaged Policy، وتنظيف SQLite/بيانات الاعتماد المحلية، وإلغاء رموز السحابة.

### 7.1 متغيرات البيئة + حجب الشبكة على مستوى نظام التشغيل (المستخدمون المحليون / سطح المكتب)

**لا** تعتمد على متغيرات البيئة وحدها: فحتى عند `ca81b7b9`، لا يزال [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) (`السطر 156`، وسابقًا `السطر 149`) يهيّئ الهوية على القرص عند البدء قبل فحص خيارات الإلغاء، ولا يزال [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts) يغفل تمرير `OTEL_SDK_DISABLED` و`T3CODE_OTEL_SDK_DISABLED`، كما تجاهلت الإصدارات الأقدم خيارات تعطيل الصدفة والمستخدم (`PR #42376`، `PR #42464`). اجمع بين متغيرات الصدفة/المستخدم — بما في ذلك `DO_NOT_TRACK=1` المدعوم بدءًا من [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) (الذي يتفوق على `T3CODE_TELEMETRY_ENABLED=true` ويعطّل تتبع مرحّل الخادم) — مع حجب `/etc/hosts` على مستوى نظام التشغيل:

<div dir="ltr">

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
#    DO_NOT_TRACK=1 (PR #42629) overrides T3CODE_TELEMETRY_ENABLED=true and disables relay tracing,
#    but AnalyticsService.ts:156 still writes local install identity on disk and DesktopShellEnvironment.ts
#    still omits T3CODE_OTEL_SDK_DISABLED / OTEL_SDK_DISABLED.
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

</div>

على Windows، اضبط أيضًا `DO_NOT_TRACK=1` و`T3CODE_TELEMETRY_ENABLED=false` و`T3CODE_OTEL_SDK_DISABLED=true` و`OTEL_SDK_DISABLED=true` في **خصائص النظام ← متغيرات البيئة** (للمستخدم والنظام) وأعد التشغيل أو أعد تشغيل أي خدمة في الخلفية. لاحظ وفق `Issue #36479` أن بدء تشغيل الخادم لا يزال يجري فحصًا صادرًا إلى `raw.githubusercontent.com` ما لم يُحجب بقواعد جدار الحماية أو الوكيل.

### 7.2 سياسة الإدارة للمسؤولين (`macOS`، `Linux`، `Windows`)

لتعطيل التتبع، وأنفاق T3 Connect، ومهام الويب هوك، واستيراد ملفات تعريف ارتباط المتصفح، وأنفاق المعاينة وفق [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)، انشر ملف `policy.json` مملوكًا للمسؤول (أو ما يعادله عبر MDM/GPO):

| نظام التشغيل | السياسة الأصلية / السجل | مسار الملف (`chmod 644` / مملوك لـ root أو Admin) |
|---|---|---|
| **macOS** | ملف تعريف تكوين الجهاز لـ `com.t3tools.t3code` *(يتم تجاهل ملفات تعريف المستخدم)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(انشره داخل كل توزيعة WSL على حدة)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) أو `REG_SZ` `Policy` ضمن `HKLM\SOFTWARE\Policies\T3Tools\T3Code` | `C:\Program Files\T3Code\policy.json` |

<div dir="ltr">

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

</div>

تحقق من الصحة والإنفاذ عبر `t3 policy check policy.json`، وأعد تشغيل T3 Code بالكامل، وشغّل `t3 policy show`. **تذكّر النقاط العمياء الموثّقة في `docs/user/telemetry.md`:** سياسة Managed Policy **لا** تعطل تتبع المرحّل على `app.t3.codes` المستضاف، و**لا** تتحكم في تتبع تطبيقات الهاتف، و**لا** تعطل `Publish agent activity` إذا كان مفعّلًا مسبقًا.

### 7.3 فحص `statev2.sqlite` وتنظيف الحالة المحلية

مع أن [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) أضاف تنظيفًا غير متزامن عبر `thread-content.purge` (مغلقًا `Issue #17845`)، فإن الإصدارات الأقدم احتفظت بسجل المحادثات الكامل على القرص، وحتى عند `ca81b7b9` تبقى المحادثات المصدرية المحذوفة محتفظة بسجلها ما دامت مشارًا إليها من تفرعات حية أو تحويلات `merge_back` معلّقة أو وكلاء فرعيين أحياء — إضافة إلى بقاء صفوف شواهد الحذف في SQLite، وتطلّب استعادة مساحة القرص المحرّرة في `.sqlite` تنفيذ `VACUUM` دون اتصال:

<div dir="ltr">

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# Optional offline compaction to reclaim disk pages after PR #42119 purge (quit T3 Code first)
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

</div>

*(على Windows، افحص ونظّف `%USERPROFILE%\.t3\userdata\` بما في ذلك `statev2.sqlite` و`anonymous-id` و`secrets`.)*

### 7.4 إجراءات Google Antigravity وT3 Connect وClerk/Cloudflare وإلغاء أذونات GitHub

1. **Google Antigravity:** أوقف فورًا تشغيل اشتراكات Google AI / Antigravity الشخصية عبر Antigravity المُدار في T3 أو CLIProxyAPI لحماية رصيد الاستئناف الوحيد لحسابك. أزل `~/.t3/userdata/providers/antigravity/` و`~/.t3/tools/antigravity-acp/`.
2. **T3 Connect وحذف البيانات السحابية:** عطّل **Publish agent activity** ضمن **Settings → Sharing & access**، وافصل كل الأجهزة المحلية (`t3` logout / unlink)، وفعّل `requireConnectDeviceApproval` إذا أعدت يومًا تشغيل الوصول عن بُعد. اطلب حذفًا كاملًا للحساب وبيانات المرحّل عبر Clerk وجهة اتصال حذف الخصوصية الرسمية لـ T3 Tools الموثّقة في `privacy-policy.astro` (حتى يزيل webhook الحذف في `PR #42285` صفوف مرحّل PlanetScale وأنفاق Cloudflare).
3. **تدوير رموز GitHub والأسرار:** ألغِ تفويض GitHub OAuth / App لـ T3 Code في **GitHub Settings → Applications / Authorized GitHub Apps** (يملك `driver.ts` صلاحيات منح النجوم على مستوى المضيف). بدّل أي مفاتيح API أو روابط قواعد بيانات أو رموز ربما مرّت عبر سطور أوامر العمليات التي التقطها `t3-resource-monitor` قبل `PR #41889` / `PR #42577`، أو أُرسلت عبر أخطاء الويب هوك/المرحل إلى Axiom.
4. **عزل HTTP على الشبكة المحلية (LAN)، ورموز Bearer في CI، والمستودعات غير الموثوقة (`ca81b7b9`):** لا تشغّل أمر `t3 up --lan` عبر HTTP غير المشفّر مطلقًا دون وضع طبقة TLS أمامه (عبر وكيل عكسي أو Tailscale Serve؛ مع الانتباه إلى الالتفاف الخاص بـ `::1` مقابل `127.0.0.1` في IPv4)؛ ولا تضع مطلقًا رموز Bearer غير المقيدة بـ DPoP الصالحة لـ 30 يومًا في السكربتات أو بيئات CI؛ وأفرغ متغيّري `SSH_AUTH_SOCK` و`GITHUB_TOKEN` (وافحص `.gitmodules` وخطافات `.claude/settings.json`) قبل فتح أي مستودع غير موثوق.

### 7.5 العملاء البديلون

في ردود المتابعة المجتمعية، أبرز المطورون مرارًا **Mirasim** (`@Mirasim_ADE`) و**Paseo** (`@paseo_sh`) و**Paradev** (`@ParadevAI`) و**Cloudroom** ([سلسلة البدائل](https://x.com/realchendahuang/status/2125244977878036713)). وقبل اعتماد أي عميل بديل، تحقق بشكل مستقل من: (1) تعطيل التتبع افتراضيًا ونظافة الالتقاط الشبكي، (2) تنفيذ `DELETE` + `VACUUM` حقيقي أو حذف الملفات عند إزالة المحادثة، (3) التفويض الصارم لأداة سطر الأوامر الرسمية دون استخراج بيانات الاعتماد أو انتحال الترويسات، و(4) التشفير الحقيقي من طرف إلى طرف على جانب العميل للأنفاق البعيدة.

---

## 8. المصادر الأولية وفهرس الحلقات الثماني عشرة الأصلية

> للاطلاع على الجدول المرجعي الشامل الذي يربط كل استشهاد من `SRC-001` إلى `SRC-320` عبر الحلقات والملفات المعمقة والالتزامات اللاحقة للتدقيق، راجع [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md). وللاطلاع على جميع الإيصالات المرئية والرسوم الجنائية البالغ عددها **108** (`EV-001`–`EV-108`)، راجع [`docs/EVIDENCE-INDEX.md`](../EVIDENCE-INDEX.md).

### المنشورات التأسيسية والفهرس الكامل للحلقات الـ 18 على X (مرتبة زمنيًا)

- المنشور التأسيسي 1 (رابط GitHub في الصفحة الرئيسية موسوم بـ `"steal our code"`): https://x.com/realchendahuang/status/2125059292919394654
- المنشور التأسيسي 2 (نزاع تسمية نسخة MIT، إهانات Temu، وازدواجية المعايير): https://x.com/realchendahuang/status/2125062675147448475
- الحلقة 1 (التتبع الافتراضي، نقض وعد `"No telemetry"`، التجزئة غير المملّحة عبر الأدوات): https://x.com/realchendahuang/status/2125153472450527440
- الحلقة 2 (الحذف الوهمي في SQLite، فاحص العمليات كل 5 ثوانٍ، إزالة وضع Plan، حظر `CONTRIBUTING.md`): https://x.com/realchendahuang/status/2125160473176023486
- الحلقة 3 (تنفيذ `git push --force` بصمت في وضع Auto، إزالة مرشح الخصوصية خلال 21 ساعة، 0 نشرات أمنية، إهانة المستخدمين): https://x.com/realchendahuang/status/2125201882687881378
- الحلقة 4 (انتحال ترويسات Google Antigravity، متغير `SSH_CONNECTION` الوهمي، حظر الحساب الجديد خلال 3 دقائق): https://x.com/realchendahuang/status/2125213397507858657
- الحلقة 5 (غياب تشفير E2E في T3 Connect، نفق Cloudflare، بوابة OVH المكشوفة المستضافة ذاتيًا): https://x.com/realchendahuang/status/2125218189596676555
- الحلقة 6 (تضارب مصالح المستثمر الملائكي: السخرية من إغلاق Vibe Kanban وتداخل البيئات المعزولة مع Daytona): https://x.com/realchendahuang/status/2125385742243520653
- الحلقة 7 (ادعاء Managed Policy `"turn off all telemetry"` مقابل ثلاث نقاط عمياء في الوثائق الرسمية): https://x.com/realchendahuang/status/2125391659492081947
- الحلقة 8 (الدفتر التجاري بإنفاق $800k+ على عميل مجاني ورادار يومي بـ 31.7T توكن / $10.19M): https://x.com/realchendahuang/status/2125392410763239723
- الحلقة 9 (500 commit/يوم، 700 وكيل، `yolo merges` مقابل تنفير PRs واشتراط المتابعة): https://x.com/realchendahuang/status/2125392916369871309
- الحلقة 10 (توجيه `@bot` لاقتباس النسخ المتفرعة والمنافسين، بوت الحظر التلقائي، حجب الأرباح عبر Community Notes): https://x.com/realchendahuang/status/2125393641665671593
- الحلقة 11 (توضيح 25 نوفمبر المفنّد خلال ساعتين بطلبات الدمج الليلية و264 سجل Claude في تفريغ 100MB): https://x.com/realchendahuang/status/2125394810559426993
- الحلقة 12 (الإصلاحات الليلية بعد GDPR الكاشفة لـ 2.2M/ساعة من سجلات IP، وتعطل حذف الحسابات، وتسريبات الدفع، والدفعات المجهولة المختلطة): https://x.com/realchendahuang/status/2125395501663281198
- الحلقة 13 (وصف المجتمع التقني الصيني على تويتر بالمستنقع بالتزامن مع الترقيع الصامت للمعاينات غير المعزولة وتنفيذ الأوامر بلا طلب): https://x.com/realchendahuang/status/2125395980354994414
- الحلقة 14 (التقسيم الكمي لـ 1,151 تغريدة: 0% ألفاظ نابية تجاه تنفيذيي الشركات الكبرى مقابل 8% عدائية ضد المطورين العاديين): https://x.com/realchendahuang/status/2125404517697290438
- الحلقة 15 (صفر تسجيلات في USPTO لـ T3 Code ومتطلبات سياسة العلامات التجارية في GitHub): https://x.com/realchendahuang/status/2125408163273080950
- الحلقة 16 (التاريخ المتكرر: `vsc-material-but-i-wont-sue-you`، أزمة المطورين الهنود، مكافأة $20k ضد FFmpeg، التهديد المحذوف بإغلاق المصدر): https://x.com/realchendahuang/status/2125408843152953693
- الحلقة 17 (منظومة الرعاة Clerk/Axiom، استغلال حصة 0% في Codex وحذفه، Gist `CLIProxyAPI` لعشرة حسابات): https://x.com/realchendahuang/status/2125411353393553744
- الحلقة 18 (كيف تحققت 77k نجمة على GitHub: إشعار خمول بعد 30 ثانية يطلق النجوم عبر API ببيانات المضيف ومنح النجوم للمستودعات العشوائية غير المصحح): https://x.com/realchendahuang/status/2125416210120765799
- قائمة البدائل المجتمعية: https://x.com/realchendahuang/status/2125244977878036713
- أرشيف تعليقات المجتمع (البلاغ Issue #1 بقلم `@opserx` — *"The Case Against Theo"*): [`docs/community/issue-1-the-case-against-theo.md`](../community/issue-1-the-case-against-theo.md)

### الشيفرة المصدرية، وطلبات الدمج، والبلاغات، والسياسات، والإيصالات الأولية

**التتبع عن بُعد، والخصوصية، والإصلاحات الليلية بعد GDPR (الحلقات 1، 7، 11، 12)**

- النطاق الرسمي للواجهة الترحيبية: https://t3.codes/
- تتبع PostHog الافتراضي (PR #174): https://github.com/pingdotgg/t3code/pull/174
- الحذف الصامت لوعد `"No telemetry"` على الصفحة الرئيسية (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- رفض تسهيل التعطيل (Issue #1397) والاستفسار عن الوعد المنقوض (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- نسخة الأحداث الخام على `ingest.t3.codes` المستضاف ذاتيًا (PR #15028) والتجزئة غير المملّحة عبر الأدوات (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- أربعة طلبات دمج مجتمعية مرفوضة لمفتاح الإلغاء (`#13458` / `#16763` / `#21248` / `#27077`): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- الملفات المصدرية للتتبع وتحديد الهوية (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `ProviderDimensions.ts` / `telemetryId.ts` / `otelEnvironment.ts` / `DesktopShellEnvironment.ts` / `DesktopBackendConfiguration.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderDimensions.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/otelEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/backend/DesktopBackendConfiguration.ts
- الوثائق الرسمية للتتبع وManaged Policy: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- ادعاءات ثيو حول Managed Policy والتوضيح ونفي ملفات التتبع + التصدير العلني `events.clean.jsonl`: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- تسرب مسار مساحة العمل المطلق (PR #42450) وتجاهل الإلغاء على Win/Mac (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- سجلات IP بمعدل 2.2M/ساعة المحفوظة 30 يومًا (PR #42380)، وحذف الحساب غير المكتمل (PR #42285 / #42430)، وتسريبات الدفع المحمولة (PR #42459 / #41859)، وتجميع الملاحظات المجهولة في دفعات (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**الأمان المحلي، والإصلاحات الأمنية الصامتة، وAntigravity، وT3 Connect (الحلقات 2، 3، 4، 5، 13)**

- الحذف الوهمي في SQLite (Issue #17845 / #28903)، مراقب العمليات كل 5 ثوانٍ (Issue #11222)، وإصلاح التقاط سطر الأوامر (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- إرسال أسماء المضيفين الداخلية إلى Google favicon (PR #16950 / #32657)، الفحص الصادر الإجباري (Issue #36479 / `raw.githubusercontent.com`)، تجاوزات الصلاحيات/السياسات (PR #21806 / #27322)، استهلاك حصة Claude بمقدار 1.7x (Issue #7338 / #24649)، وأعطال سحب الطاقة (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- تمرير `git push --force` الصامت في وضع Claude Auto (Issue #15353 وتعليق إعادة الإنتاج) وطلبات الإصلاح المجتمعية (`#15360` / `#35207` / `#40692`): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- إزالة تصفية النماذج الخاصة خلال 21 ساعة لصالح `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- تبويب Security Advisories الفارغ، و`SECURITY.md` (`PR #38812` / `#41942`)، والإصلاحات الأمنية الصامتة المدمجة (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`)، وبنود الأمان/المُطلق المفتوحة (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- ضمان FAQ لـ Antigravity، دحض الشيفرة في Issue #40713، حظر الـ 3 دقائق (Issue #41536)، تداخل الحسابات (Issue #41973)، انتحال محرر في القائمة البيضاء (PR #26876)، طلب مركز CLIProxyAPI PR #33800، منشورات ثيو حول انعدام الخطر/المخطط/إلقاء اللوم على CLIProxy، والشيفرة المصدرية: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityAcpSupport.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- شروط خدمة Google Antigravity والحظر المعلن في المنتدى الرسمي: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- رفض E2E في T3 Connect (Issue #32098)، خيار `requireConnectDeviceApproval` المعطّل افتراضيًا (PR #36419 و`settings.ts`)، بوابة OVH Caddy المستضافة ذاتيًا (PR #32945)، شيفرة المرحّل، سياسة الخصوصية، والنقاشات دون رد: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**الميزانية التجارية، وتضارب مصالح المستثمرين، والرعاة، و77k نجمة (الحلقات 6، 8، 17، 18)**

- إنفاق $800k+، لوحة 31.7T توكن / $10.19M يوميًا، حصة 98.5% لثلاثة مختبرات، السخرية من التحليلات، $300k+ من توكنات OpenAI المجانية للوصول المبكر، طلب PR #31158 لـ commit Patrick الوحيد، تواصل المستثمرين، و`Ping.gg`: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- السخرية من Vibe Kanban، الإفصاح عن استثمار Daytona، وخطة البيئات السحابية المعزولة المدفوعة: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- قائمة رعاة YouTube، تأكيد الرئيس التنفيذي لـ Vercel، فيديو الحصرية، منشور ماريا بعد الحذف، `openai/codex#45444`، تغريدات ClickHouse/Ultra/GrokBot لـ CLIProxyAPI، وGist CLIProxyAPI، وFAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- فيديو «Fake star» حول VC، منحدر الـ 10x للنجوم، منشور +3,094 في Trending، منشور «missed 70k»، طلبات PR #27832 / #29922 / #29987، ملف `GitHubStarPrompt.tsx`، وشيفرة منح النجوم للمستودعات العشوائية في `driver.ts`: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**الحوكمة، والعلامات التجارية، والكياسة الانتقائية، والسوابق الماضية (الحلقات 9، 10، 14، 15، 16)**

- إزالة وضع Plan (PR #5551 / #33131)، إخفاء حلقة التقدم (PR #9190)، الإهانات في Issue #33639، طلب PR #41572 المرفوض، و`CONTRIBUTING.md`، و`.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commit/يوم، `yolo merges`، عبارة `"nukes my machine = free content"`، اشتراط المتابعة للـ PRs، تهديد إزالة `/btw`، ومنشورات أفضلية لقطة الشاشة على PR: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- أوامر `@bot` لاقتباس النسخ المتفرعة، السخرية من Claude Desktop، الدعوة لحجب العوائد عبر Community Notes، وتأكيد بوت الحظر التلقائي: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- سجلات USPTO TSDR (`PING LABS` 97294243 متروك؛ EquipmentShare `T3` Reg. 7795672)، سياسة العلامات التجارية في GitHub، `PR #41898` بأثر رجعي، تهديد الحظر، الرد حول المصادر المفتوحة والتريليون دولار، `"aware of the legality"`، `"get a better lawyer"`، والتغريدات السابقة حول العلامات التجارية: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- أدلة الكياسة الانتقائية (الاعتذار وجسور Google بعد Neon، بطالة المهندسين، قبور الذكاء الاصطناعي المحلي، `Linux larpers`، تهديد السجن/RSD، منشورات `stupid bitch`، مستنقع المجتمع التقني الصيني على تويتر، رفض الاعتذار، محاضرة عدم حرق الثقة): https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- الإيصالات التاريخية (`vsc-material-but-i-wont-sue-you`، فيديو الاعتذار للمطورين الهنود، وسجل مكافأة $20k ضد FFmpeg): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04

### التتبع اللاحق للتدقيق في المستودع الأصلي (`9d3195b4` إلى `ca81b7b9`، `SRC-280`–`SRC-320`)

- خط الأساس المدقق (`9d3195b4`، `#42000`) وآخر التزام مؤكد على `main` HEAD (`ca81b7b9`، `#42634`): https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2 ; https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd
- تضييق التتبع وتحديد الهوية (`#42299` / `84e4264b`، `#42465` / `6b3899f2`، `#42630` / `c925b9ab`، `#42629` / `ef4a1643`): https://github.com/pingdotgg/t3code/pull/42299 ; https://github.com/pingdotgg/t3code/commit/84e4264bb347e36e97f6c3bd95d666eecfa12e07 ; https://github.com/pingdotgg/t3code/pull/42465 ; https://github.com/pingdotgg/t3code/commit/6b3899f224947178088ca97ec9907e681807f7da ; https://github.com/pingdotgg/t3code/pull/42630 ; https://github.com/pingdotgg/t3code/commit/c925b9ab198099f67de862ed01701bd1d8809f2b ; https://github.com/pingdotgg/t3code/pull/42629 ; https://github.com/pingdotgg/t3code/commit/ef4a1643edf72ad119452c82b01c91adbf7b9e64
- التطهير المحلي ومراقب الموارد والتصلب الأمني (`#42119` / `91f0b32e`، `#42577` / `af276ccb`، `#42413`): https://github.com/pingdotgg/t3code/pull/42119 ; https://github.com/pingdotgg/t3code/commit/91f0b32e2db2cb8abca5fdd33c33609a0f57b15e ; https://github.com/pingdotgg/t3code/pull/42577 ; https://github.com/pingdotgg/t3code/commit/af276ccbb26ef709c46bc46ec514f23b62c8e18c ; https://github.com/pingdotgg/t3code/pull/42413
- محفزات التحقق في Antigravity وتحديثات CLI (`#41210` / `3e74a0aa`، `#42545` / `4da8d19d`، `#42339`، `#42475`): https://github.com/pingdotgg/t3code/pull/41210 ; https://github.com/pingdotgg/t3code/commit/3e74a0aac5c53459cc1d3d84eec915fa483f2836 ; https://github.com/pingdotgg/t3code/pull/42545 ; https://github.com/pingdotgg/t3code/commit/4da8d19d08ed7e34fe2d5d66dae54b01eab122fc ; https://github.com/pingdotgg/t3code/pull/42339 ; https://github.com/pingdotgg/t3code/pull/42475
- إشعارات T3 Connect وتضييق المرحّل/الهاتف/الملاحظات (`#42311` / `ece5f21b`، `#42356`، `#42394`، `#42397`، `#42398`، `#42415`): https://github.com/pingdotgg/t3code/pull/42311 ; https://github.com/pingdotgg/t3code/commit/ece5f21b17077382c8d2eba1c28e75e898386dcd ; https://github.com/pingdotgg/t3code/pull/42356 ; https://github.com/pingdotgg/t3code/pull/42394 ; https://github.com/pingdotgg/t3code/pull/42397 ; https://github.com/pingdotgg/t3code/pull/42398 ; https://github.com/pingdotgg/t3code/pull/42415
- أدلة `ca81b7b9` لمصادقة وتنفيذ ملفات تعريف ارتباط LAN، وBearer، و`?wsTicket=`، وحلقة `::1` المحلية، والمستودعات غير الموثوقة (`SRC-308`–`SRC-320`): https://github.com/pingdotgg/t3code/pull/37042 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157 ; https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985

</div>
