# #05 · T3 Connect: انعدام التشفير التام من طرف إلى طرف وبوابة إنهاء TLS بالنص الصريح

> كل أمر توجيهي وملف مصدري وبث طرفية يمر عبر T3 Connect ينتهي بنص صريح داخل بنية تحتية تسيطر عليها T3 — دون أي تشفير تام من طرف إلى طرف، ومع موافقة أجهزة معطّلة افتراضيًا.

<!-- section:claim -->
## ما الذي جرى الادعاء به

- في 24 نوفمبر، صرّح `@theo` بأن بيانات المحادثة *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- تَعِد صفحة [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) بـ *"encrypted network transport"* دون الإفصاح عن غياب التشفير التام من طرف إلى طرف.

<!-- section:evidence -->
## ما تُظهره الأدلة

- **رؤية النص الصريح داخل مُرحّل T3 (`ManagedEndpointProvider.ts`):** يُهيّئ T3 Connect أنفاق Cloudflare داخل حساب Cloudflare الخاص بـ T3 (`docs/internals/06_t3-connect.md`). وينتهي TLS الخاص بالنقل عند حافة Cloudflare دون أي تشفير للحِمل بين العميل والعميل، ما يعني أن ربط Cloudflare Workers Route يكشف كل أمر توجيهي وملف وبث طرفية بنص صريح.
- **رفض التشفير التام من طرف إلى طرف باعتباره خارج النطاق (`Issue #32098`):** عندما طلب المطوّرون مصادقة متبادلة وتشفيرًا تامًا من طرف إلى طرف، أغلق أحد المشرفين [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) بحجة أنه تغيير أكبر من اللازم؛ وبقيت المناقشتان `#21286` و`#37831` دون رد. وفي 25 نوفمبر، أعلن `@theo` أن التشفير التام من طرف إلى طرف غير ممكن ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **الانتقال إلى بوابة OVH Caddy التي تديرها T3 (`PR #32945`):** بعد أن بلغت فواتير Cloudflare Tunnel **25,000 دولار شهريًا**، فتح `@theo` [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) للانتقال إلى خادم OVH في هيلزبورو مستأجَر من T3 (`gw.t3coderelay.com`)، حيث تُنهي نسخة Caddy الخاصة بـ T3 بروتوكول TLS وتُمرّر النص الصريح عبر مقبس Unix إلى وكيل `yamux` مكتوب بـ Go — وما زال ذلك دون تشفير تام من طرف إلى طرف.
- **موافقة الأجهزة معطّلة افتراضيًا (`PR #36419`، `settings.ts`):** لا يزال `requireConnectDeviceApproval` افتراضيًا `false` في [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). وكما يقرّ `SECURITY.md`، فإن اختراق حساب سحابي أو تسريب مفتاح توقيع المُرحّل يمنح صلاحية وصول إلى المضيف تعادل صلاحية shell.

<!-- section:status -->
## الحالة في المستودع الأصلي (`ca81b7b9`)

- **لا يزال مفتوحًا:** أضاف [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) إشعارات تسجيل الدخول، لكن **T3 Connect لا يزال بلا أي تشفير تام من طرف إلى طرف**، ويظل `requireConnectDeviceApproval` بقيمة `false` افتراضيًا، وتبقى `privacy-policy.astro` دون تغيير منذ `2026-10-06`.

<!-- section:visuals -->
## الأدلة المرئية

![Issue #32098 يؤكد أن حسابًا سحابيًا مسروقًا أو مفتاح مُرحّل مسرَّبًا يمكنه التحكم في الأجهزة المرتبطة دون تشفير تام من طرف إلى طرف](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 ينقل T3 Connect إلى بوابة OVH مُستضافة ذاتيًا حيث تُنهي Caddy بروتوكول TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts يهيّئ أنفاق Cloudflare داخل حساب T3 الخاص](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [تعليق Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [الملف التقني المعمّق 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
