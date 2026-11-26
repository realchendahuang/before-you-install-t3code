# #04 · انتحال ترويسات Google Antigravity، وتزوير `SSH_CONNECTION`، وحظر الحسابات في 3 دقائق

> رغم أنه يضمن في أسئلته الشائعة الالتزام بشروط الخدمة، فإن T3 Code يستخرج بيانات الاعتماد من سلسلة مفاتيح نظام التشغيل، وينتحل ترويسات Google الداخلية (`antigravity/hub/2.24.0`) عند مخاطبة `v1internal`، ويحقن قيمًا مزوّرة لـ `SSH_CONNECTION` — بما يعرّض اشتراكات Google الشخصية للحظر السريع.

<!-- section:claim -->
## ما الذي جرى الادعاء به

- أكّد ملف [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) للمشتركين الذين يدفعون: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- وعندما قدّم المستخدمون المحظورون [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713)، نفى أحد المشرفين الوصول إلى خوادم Antigravity الخلفية أو إعادة استخدام الرموز — وعلى منصة X، ألقى `@theo` اللوم على وسطاء بروكسي من أطراف ثالثة (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## ما تُظهره الأدلة

- **استخراج بيانات الاعتماد من نظام التشغيل واستدعاءات `v1internal` المنتحلة:** يستخرج [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) رموز Google OAuth من ملفات محلية، أو من `@napi-rs/keyring`، أو من Windows Credential Manager (`CredReadW` عبر `ffi-rs` على `advapi32.dll`)، ويثبّت في الكود قيمة `antigravity/hub/2.24.0`، ثم يرسل `POST` مباشرة إلى نقطة النهاية الخاصة `v1internal` التابعة لـ Google. وقد أكّد موظفو Google في [المنتدى الرسمي](https://discuss.ai.google.dev/t/185992) أن المادة 6 من [شروط خدمة Google Antigravity](https://antigravity.google/terms) تمنع أدوات الطرف الثالث من استخراج بيانات الاعتماد أو إعادة استخدامها لاستعلام نقاط النهاية الخلفية مباشرة.
- **تزوير `SSH_CONNECTION` وتسريب البيانات بين الحسابات:** يحقن [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) متغيّر بيئة `SSH_CONNECTION` مزوّرًا (`"127.0.0.1 0 127.0.0.1 0"`) لخداع واجهة سطر أوامر Google كي تتجاوز عزل سلسلة مفاتيح نظام التشغيل وتتحوّل إلى ملفات نصية مكشوفة. وعندما حدّثت Google واجهة سطر الأوامر لديها في 24 نوفمبر، أكّد [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) أن الطلبات الصادرة من الحساب A كانت تُوجَّه بصمت إلى الحساب B.
- **حساب جديد بـ 20 دولارًا يُحظر في 3 دقائق (`Issue #41536`):** اشتراك جديد تمامًا في Google AI بقيمة 20 دولارًا، بلا أي وسيط بروكسي، ويستخدم فقط Antigravity المُدار عبر T3، تعرّض للحظر من أول رسالة، بعد 3 دقائق من الإعداد. وقد أغلق المشرفون البلاغ باعتباره مكررًا، من دون إضافة أي تحذير للمستخدمين.
- **انتحال العميل الأصلي وCLIProxyAPI:** دمج `@theo` شخصيًا [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) متنكّرًا في هيئة `"zed"`، في حين ربط [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) المدموج استطلاع الـ hub في [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) بترويسات منتحلة: `claude-code/2.1.273` و`grok-cli/1.0.77` و`antigravityUserAgent`.

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## حالة المستودع الأصلي (`ca81b7b9`)

- **ما زال قائمًا:** أضاف [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) الملف [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) لعرض روابط التحقق من الحساب التي ترسلها Google مع الخطأ `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — ما يؤكد أن Google تُطبّق قيودها فعليًا — بينما تظل مسارات الانتحال الأربعة واستخراج الرموز جميعها عاملة.

<!-- section:visuals -->
## الأدلة المصوّرة

![antigravityUsageLimits.ts يثبّت ترويسات Google المنتحلة في الكود ويستدعي v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts يزوّر SSH_CONNECTION لتجاوز التخزين في سلسلة مفاتيح نظام التشغيل](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 يوثّق حسابًا جديدًا بـ 20 دولارًا بلا بروكسي حُظر في 3 دقائق](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 يدمج استطلاع hub الخاص بـ CLIProxyAPI المزوّر أصليًا داخل T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## المصادر الأساسية

- [تحقيق X الأصلي (الجزء 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [ضمان شروط الخدمة في الأسئلة الشائعة](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [شروط خدمة Google Antigravity](https://antigravity.google/terms) · [منتدى مطوّري Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [الملف التقني المعمّق 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
