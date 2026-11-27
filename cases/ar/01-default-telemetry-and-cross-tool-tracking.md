# #01 · تتبّع افتراضي خلف وعد صفحة رئيسية بـ«لا تتبّع»

> بينما وعدت صفحتها الرئيسية بـ«No telemetry. Unless you opt in. Full stop.»، فعّلت T3 Code تتبّع PostHog افتراضيًا، ووجّهت نسخًا خام عبر `ingest.t3.codes` مغلق المصدر، وشفّرت بيانات اعتماد خارجية في `~/.codex` و`~/.claude.json`، ورفضت أربع طلبات سحب مجتمعية لإلغاء التتبّع.

<!-- section:claim -->
## ما الذي قيل

- وعدت الصفحة الرئيسية لـ T3 Code بشكل بارز: *«No telemetry / Unless you opt in. Full stop.»*
- قُدّم علنًا كعميل برمجة ذكاء اصطناعي محلي مفتوح المصدر يضع الخصوصية أولًا.

<!-- section:evidence -->
## ما الذي تُظهره الأدلة

- **تتبّع افتراضي أُطلق تحت تعهّد «No telemetry» (`PR #174` → `3bdaa6e1`):** في 6 مارس 2026، فعّل [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) تحليلات PostHog في وضع التشغيل الافتراضي دون نافذة موافقة، ودون مفتاح تبديل في واجهة الإعدادات، ودون أي وثائق للتتبّع. وبعد أكثر من ثلاثة أشهر، في 18 يونيو، حذف [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) بصمت وعد الصفحة الرئيسية *«No telemetry»* خلال إعادة تصميم، دون أي إشعار للمستخدمين.
- **احتفاظ داخلي مغلق المصدر (`PR #15028`):** في أكتوبر 2026، جرى تمرير دُفعات التتبّع (`FLUSH_INTERVAL_MS = 10_000`) عبر نقطة نهاية T3 مغلقة المصدر [`https://ingest.t3.codes/`](https://ingest.t3.codes/). ويؤكّد السطر الأول من `AnalyticsService.ts` أن الخادم يحتفظ بنسخة خام من كل حدث قبل تمريره إلى PostHog.
- **قراءة بيانات اعتماد عبر الأدوات وتشفير SHA-256 غير مملّح (`PR #21506`):** قرأ الملف `Identify.ts` عند خط الأساس `9d3195b4` الملفَّين `~/.codex/auth.json` (بفكّ ترميز ادّعاء JWT الخاص بـ `user_id` من OpenAI) و`~/.claude.json` (`oauthAccount.accountUuid`) إلى جانب معرّفات مستخدمي T3 Connect، مع حساب ملخّصات SHA-256 غير مملّحة (`telemetryId.ts`) لربط أجهزة منفصلة بشخص واحد. ولأن T3 تحتفظ بمعرّفات Clerk نصية صريحة، فإن الملخّصات غير المملّحة قابلة للعكس بشكل حتمي.
- **التقاط استخدام تفصيلي:** أبلغ `ProviderUsageAnalytics.ts` و`FeatureUsage.ts` عن المزوّدين، والنماذج المخصّصة، وجهد الاستدلال، ووضع الأذونات، وأعداد الرموز، وأعداد المشاريع/الخيوط، وبيانات OS/WSL الوصفية، و**35 إجراءً مختلفًا في الواجهة/الأوامر**.
- **رفض أربع طلبات سحب مجتمعية لإلغاء التتبّع:** في 23 يونيو، أغلق المشرف Julius [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *«We will not make this easier to opt out of, it is crucial for us to know how many users we have.»* وأُغلق [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) بصمت، ورُفضت أربع طلبات سحب مجتمعية لإلغاء التتبّع (`#13458`، `#16763`، `#21248`، `#27077` — 147 اختبارًا ناجحًا، ومعتمدة من الروبوت) بوصفها `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## حالة المستودع الأصلي (`ca81b7b9`)

- **مُعالَج جزئيًا:** بعد الكشف العلني (أكثر من 2.26 مليون مشاهدة)، أزال [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) عمليات قراءة `~/.codex/auth.json` و`~/.claude.json`؛ وحجب [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) النماذج غير المدرجة في الكتالوج تحت اسم `custom:<driver>`؛ وأضاف [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) و[`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) خيارات إلغاء التتبّع عبر CI و`DO_NOT_TRACK`.
- **لا يزال قائمًا:** لا يزال `AnalyticsService.ts:156` يكتب معرّف تثبيت محلي على القرص قبل التحقق من خيارات إلغاء التتبّع؛ ولا يزال `DesktopShellEnvironment.ts` يغفل تمرير `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`؛ ويبقى `ingest.t3.codes` مغلق المصدر؛ ولا يوجد أي مفتاح تبديل في واجهة الإعدادات.

<!-- section:visuals -->
## أدلة بصرية

![الالتزام 3bdaa6e1 يحذف بصمت وعد الصفحة الرئيسية «No telemetry / Unless you opt in. Full stop.»](../../evidence/02-no-telemetry-removed.png)

![Identify.ts يقرأ ~/.codex/auth.json و~/.claude.json من أجل إسناد غير مملّح بـ SHA-256 عبر الأجهزة](../../evidence/03-identify-codex-claude.png)

![الإصدار #1397 مُغلق بوصفه غير مخطط له: «We will not make this easier to opt out of»](../../evidence/04-issue1397-no-optout.png)

![PR #27077 مرفوض بوصفه غير مرغوب فيه رغم 147 اختبارًا ناجحًا](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 1 · أكثر من 2.26 مليون مشاهدة)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 بعد التدقيق](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [الملف التقني العميق 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
