# #19 · `ca81b7b9` تدقيق حاسم للمصادقة وتنفيذ المستودعات: قشرة shell نصية عبر LAN لمدة 30 يومًا، رموز غير قابلة للإلغاء، وتعريض `SSH_AUTH_SOCK`

> أكد التحقق سطرًا بسطر من أحدث HEAD على `main` (`ca81b7b9`، 25 نوفمبر 14:49 CST) وجود خمس عيوب أمنية وموثوقية نشطة: ملفات تعريف ارتباط shell بنص صريح عبر `--lan` لمدة 30 يومًا مع تجاوز عند غياب `Origin`، ورموز Bearer غير قابلة للإلغاء لمدة 30 يومًا، وعناوين URL قابلة لإعادة التشغيل عبر `?wsTicket=`، و`isIPv4` تقتل أنفاق `::1`، ومستودعات غير موثوقة تنفّذ hooks/submodules مع وراثة `SSH_AUTH_SOCK` و`GITHUB_TOKEN`.

<!-- section:claim -->
## ما الذي تم الادعاء به

- بعد موجة الترقيع الليلية في 24–25 نوفمبر، قُدّم T3 Code على أنه نُظّف وأصبح آمنًا للاستخدام الهندسي اليومي.
- يُعرّف `SECURITY.md` الجلسة الافتراضية بأنها تحكم كامل بقشرة shell لمستخدم نظام التشغيل، بينما يدّعي أن حدود الشبكة المحلية/LAN تُدار بشكل سليم.

<!-- section:evidence -->
## ما تُظهره الأدلة

تم التحقق مباشرة من commit المنبع [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. ملفات تعريف ارتباط shell بنص صريح لمدة 30 يومًا عبر `--lan` + تجاوز عند غياب `Origin`:** يضبط [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) مدة جلسة افتراضية تبلغ 30 يومًا (أي ما يعادل وصولًا كاملًا إلى shell نظام التشغيل وفق `SECURITY.md`). أضاف [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) سمة `Secure` فقط من أجل `https:`، تاركًا ملفات تعريف ارتباط HTTP الخاصة بـ `t3 up --lan` تُنقل بنص صريح ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). والأسوأ أن [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) يعيد `true` كلما غاب `Origin` — لذا يمكن لأي شخص يعترض حزمة LAN واحدة أن يعيد إرسال ملف تعريف الارتباط من سكربت غير متصفح دون `Origin`، ويحتفظ بصمت بوصول shell إلى المضيف لمدة 30 يومًا.
- **2. رموز Bearer غير مرتبطة بـ DPoP وغير قابلة للإلغاء لمدة 30 يومًا + غياب مسار `/logout`:** لا يقلّص `/oauth/token` العمر إلى ساعة واحدة إلا عند تقديم إثبات DPoP؛ وإلا فإنه يصدر **رمز Bearer لمدة 30 يومًا** غير مرتبط ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). يحدد عقد HTTP **صفر نقطة نهاية `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679))، كما أن `revokeClientSession` يمنع صراحةً الإلغاء الذاتي عبر `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. رموز URL لمدة 5 دقائق عبر `?wsTicket=` قابلة لإعادة التشغيل:** تنتقل تذاكر WebSocket في سلاسل الاستعلام (`?wsTicket=`، لتستقر في سجلات proxy/access) بمدة صلاحية 5 دقائق. يتحقق [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) من التوقيع والانتهاء والجمهور والإلغاء **دون مخزن `jti` يمنع إعادة التشغيل بعد استخدام واحد** — ما يسمح بإعادة تشغيل غير محدودة لـ Bearer RPC ولكل تذاكر `media` خلال 5 دقائق ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. مستودعات غير موثوقة تعمل بوصول كامل إلى `SSH_AUTH_SOCK` و`GITHUB_TOKEN`:** يشغّل إعداد worktree تلقائيًا `git submodule update --init --recursive` كلما وُجد `.gitmodules` ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205))؛ ويغفل [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) عن حارس عام `core.hooksPath=/dev/null`؛ ويشغّل [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) خطافات `SessionStart` في `.claude/settings.json` بشكل متزامن — وكلها ترث `process.env` الكامل للمضيف بما في ذلك `GITHUB_TOKEN` و`SSH_AUTH_SOCK` (الذي يمتد نطاق تأثيره إلى كل مستودع بعيد وخادم إنتاج يستطيع وكيل SSH لديك التوقيع لصالحه).
- **5. `isIPv4` تدمر بصمت أنفاق loopback `::1`:** يضيف [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) `::1` إلى قائمة السماح للـ loopback في السطر 39، ثم يستدعي `NodeNet.isIPv4` في السطر 73 — فيصنّف مقابس Tailscale Serve وT3 Connect الخاصة بـ IPv6 loopback خطأً كحركة خارجية، ويستدعي `socket.destroy()`.

<!-- section:status -->
## حالة المنبع (`ca81b7b9`)

- **جميع المشكلات الخمس لا تزال دون إصلاح فعلي عند `ca81b7b9`:** تم التأكد سطرًا بسطر على HEAD الخاص بـ `main` (`2026-11-25 14:49 CST`)، إلى جانب **صفر استشارات أمنية منشورة على GitHub** (بما في ذلك إصلاح path-traversal الصامت في 20 نوفمبر ضمن `PR #39483`).

<!-- section:visuals -->
## الأدلة البصرية

![http.ts#L215-L241 يرسل ملفات تعريف ارتباط shell لمدة 30 يومًا دون Secure عبر HTTP نصي صريح باستخدام --lan](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 يعيد true كلما غاب ترويسة Origin](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 يمنع الإلغاء الذاتي للجلسة الحالية مع غياب مسار logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 يشغّل تهيئة submodule متكررة تحت SSH_AUTH_SOCK وGITHUB_TOKEN الموروثين](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 يرفض أنفاق IPv6 ::1 loopback عبر NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## المصادر الأولية

- [منشور التدقيق الأصلي على X — الجزء 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [الجزء 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [الملف التقني المفصّل 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
