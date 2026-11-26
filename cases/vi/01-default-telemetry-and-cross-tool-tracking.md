# #01 · Telemetry mặc định đằng sau lời hứa "No telemetry" trên trang chủ

> Trong khi trang chủ cam kết "No telemetry. Unless you opt in. Full stop.", T3 Code lại bật theo dõi PostHog mặc định, chuyển các bản sao thô qua `ingest.t3.codes` (mã nguồn đóng), băm các thông tin xác thực bên ngoài trong `~/.codex` và `~/.claude.json`, và từ chối bốn PR xin tắt thu thập từ cộng đồng.

<!-- section:claim -->
## Những gì đã được tuyên bố

- Trang chủ T3 Code đặt lời hứa nổi bật: *"No telemetry / Unless you opt in. Full stop."*
- Được giới thiệu công khai như một ứng dụng client lập trình AI chạy cục bộ, mã nguồn mở, đặt quyền riêng tư lên hàng đầu.

<!-- section:evidence -->
## Bằng chứng cho thấy gì

- **Theo dõi mặc định được phát hành dưới lời cam kết "No telemetry" (`PR #174` → `3bdaa6e1`):** Ngày 6 tháng 3 năm 2026, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) bật tính năng phân tích PostHog ở trạng thái mặc định, không có hộp thoại xin đồng ý, không có công tắc trong giao diện cài đặt và không có tài liệu nào về telemetry. Hơn ba tháng sau, ngày 18 tháng 6, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) lặng lẽ xóa lời hứa *"No telemetry"* trên trang chủ trong một lần thiết kế lại, không hề thông báo cho người dùng.
- **Lưu trữ phía first-party bằng mã nguồn đóng (`PR #15028`):** Tháng 10 năm 2026, các lô telemetry (`FLUSH_INTERVAL_MS = 10_000`) được định tuyến qua endpoint mã nguồn đóng của T3: [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Dòng 1 của `AnalyticsService.ts` xác nhận máy chủ giữ một bản sao thô của mọi sự kiện trước khi chuyển tiếp sang PostHog.
- **Đọc thông tin xác thực chéo giữa các công cụ & SHA-256 không muối (`PR #21506`):** Baseline `9d3195b4` của `Identify.ts` đọc `~/.codex/auth.json` (giải mã claim `user_id` trong JWT của OpenAI) và `~/.claude.json` (`oauthAccount.accountUuid`) cùng với ID người dùng T3 Connect, rồi tính các digest SHA-256 không muối (`telemetryId.ts`) để liên kết nhiều máy khác nhau về cùng một người. Vì T3 giữ ID Clerk ở dạng plaintext, các digest không muối có thể bị đảo ngược một cách tất định.
- **Ghi nhận việc sử dụng ở mức chi tiết:** `ProviderUsageAnalytics.ts` và `FeatureUsage.ts` báo cáo nhà cung cấp, model tùy chỉnh, mức reasoning effort, chế độ quyền, số token, số project/thread, metadata OS/WSL và **35 hành động UI/command riêng biệt**.
- **Bốn PR xin tắt thu thập từ cộng đồng bị từ chối:** Ngày 23 tháng 6, maintainer Julius đóng [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) bị đóng im lặng, và bốn PR xin tắt thu thập từ cộng đồng (`#13458`, `#16763`, `#21248`, `#27077` — 147 test đều pass, được bot phê duyệt) bị từ chối với nhãn `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Trạng thái upstream (`ca81b7b9`)

- **Đã vá một phần:** Sau khi bị phơi bày công khai (hơn 2,26 triệu lượt xem), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) đã loại bỏ việc đọc `~/.codex/auth.json` và `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) đã che các model ngoài danh mục dưới dạng `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) và [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) đã thêm cơ chế opt-out qua CI và `DO_NOT_TRACK`.
- **Vẫn còn tồn tại:** `AnalyticsService.ts:156` vẫn ghi một install ID cục bộ xuống đĩa trước khi kiểm tra opt-out; `DesktopShellEnvironment.ts` vẫn không chuyển tiếp `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` vẫn là mã nguồn đóng; không có bất kỳ công tắc nào trong giao diện Settings.

<!-- section:visuals -->
## Bằng chứng hình ảnh

![Commit 3bdaa6e1 lặng lẽ xóa lời hứa "No telemetry / Unless you opt in. Full stop." trên trang chủ](../../evidence/02-no-telemetry-removed.png)

![Identify.ts đọc ~/.codex/auth.json và ~/.claude.json để quy gán thiết bị chéo bằng SHA-256 không muối](../../evidence/03-identify-codex-claude.png)

![Issue #1397 bị đóng với trạng thái not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 bị từ chối với nhãn unwanted dù 147 test đều pass](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Nguồn gốc chính

- [Điều tra gốc trên X (Phần 1 · hơn 2,26 triệu lượt xem)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 sau kiểm toán](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Hồ sơ kỹ thuật chi tiết 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
