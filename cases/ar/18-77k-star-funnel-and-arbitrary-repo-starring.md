# #18 · قمع الـ77,000 نجمة: منح النجوم ببيانات اعتماد المضيف بعد 30 ثانية خمول وخطأ تنجيم المستودعات العشوائية غير المُصلَح

> بعد ستة أشهر من إدانته لنجوم GitHub بوصفها وسيلة "to trick VCs into investing"، دمج @theo بنفسه نافذة منبثقة داخل التطبيق تظهر بعد 30 ثانية من الخمول وتُطلق `PUT user/starred/...` باستخدام بيانات اعتماد GitHub الخاصة بالمضيف — فقفز المستودع من 30 ألف نجمة إلى 77 ألف نجمة (مع نحو 129 متابعًا) بينما بقي خطأ تنجيم المستودعات العشوائية دون إصلاح.

<!-- section:claim -->
## ما الذي قيل

- في 26 أبريل 2026، نشر `@theo` مقالًا بعنوان *"Github has a fake star problem"*، كتب فيه أن نجوم GitHub باتت *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- وفي 24 نوفمبر، وعند 74.6 ألف نجمة، زعم أنه *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## ما تُظهره الأدلة

- **انحدار النجوم اليومي بمقدار 10 أضعاف عبر نافذة الخمول داخل التطبيق (`PR #27832`، `#29922`، `#29987`):** بعد أن استغرق الوصول إلى 30,000 نجمة أكثر من 8 أشهر، كتب `@theo` بنفسه ودمج بنفسه [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) في 30 أكتوبر، مضيفًا نافذة منبثقة لتقييم النجمة بعد 5 أوامر مُرسلة (`PROMPTS_BEFORE_ASKING = 5`)، ما ضاعف النجوم اليومية **10 أضعاف** على الفور (`+3,094` نجمة/يوم على GitHub Trending). وفي 3 نوفمبر، أضاف [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) و[`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) **كشف الخمول في نافذة مدتها 30 ثانية** (`IDLE_MS = 30_000`) بينما ينتظر المستخدمون دورات الذكاء الاصطناعي، واستبدلا إعادة التوجيه في المتصفح بطلب RPC من جانب الخادم هو `sourceControl.star` يُطلق `PUT user/starred/pingdotgg/t3code` مباشرة عبر **بيانات اعتماد `gh` CLI / `GH_TOKEN` الخاصة بخادم المضيف**، يعقبه تأثير احتفالي (confetti) من 160 جسيمًا.
- **تجاوز المراجعة وغموض الحساب على المضيفات المشتركة:** أشار Macroscope إلى `PR #29922` بوسم *Needs Human Approval* بسبب عدم تطابق مستخدم المتصفح مع بيانات اعتماد الخادم؛ ومع ذلك دمجها `@theo` بنفسه. وعلى المضيفات المشتركة أو البعيدة، فإن النقر على *Star* يمنح النجمة للمستودع بصمت باستخدام حساب مَن يملك بيانات اعتماد GitHub الخاصة بالخادم، دون إخبار المستخدم بالحساب الذي استُخدم.
- **خطأ تنجيم المستودعات العشوائية غير المُصلَح (`driver.ts#L60-L99`):** في 6 نوفمبر، قدّم المطوّر `zhilsinger` مراجعة `Request changes` مشيرًا إلى أن [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) يقبل أي سلسلة `owner/repo` دون تثبيت `pingdotgg/t3code` — ما يتيح لأي عميل يملك `source-control:write` تنجيم مستودعات GitHub عشوائية باستخدام بيانات اعتماد المضيف.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## حالة المستودع الأصلي (`ca81b7b9`)

- **لا يزال مفتوحًا:** خطأ `driver.ts#L60-L99` الخاص بتنجيم المستودعات العشوائية دون تثبيت، ومراجعة `Request changes` التي قدّمها `zhilsinger` في 6 نوفمبر، لا يزالان دون رد ودون إصلاح بعد 19 يومًا (أكثر من 77 ألف نجمة مقابل نحو 129 متابعًا).

<!-- section:visuals -->
## الأدلة البصرية

![مخطط Theo في 2 نوفمبر يحتفل بانحدار شبه عمودي بمقدار 10 أضعاف في النجوم مباشرة بعد إطلاق النافذة المنبثقة داخل التطبيق](../../evidence/20-star-10x-cliff.png)

![مراجعة Request changes التي قدّمها المطوّر zhilsinger على PR #29922، دون رد منذ 19 يومًا](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 يقبل سلاسل owner/repo عشوائية دون تثبيت pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## المصادر الأولية

- [تحقيق X الأصلي (الجزء 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [انحدار 10 أضعاف (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [‏+3,094/يوم على Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [الملف التقني المتعمق 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
