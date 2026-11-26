# #11 · Làm rõ ngày 25/11 bị phủ định trong vòng 2 giờ bởi các PR qua đêm và bản dump 100 MB

> Sáng ngày 25 tháng 11, @theo đưa ra ba cam kết rộng rãi về quyền riêng tư và công bố bản dump telemetry 100 MB — cả ba tuyên bố đều bị chính các PR của nhóm ông và bản dump nén gzip phủ định trong vòng hai giờ.

<!-- section:claim -->
## Điều gì đã được tuyên bố

Trong phần làm rõ buổi sáng ngày 25 tháng 11 ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) và phản hồi tiếp theo ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` trấn an người dùng:
- T3 Code *"never collected file paths."*
- Các biến môi trường *"always disabled telemetry cleanly."*
- Các bản cài đặt đã chọn từ chối không ghi bất kỳ tệp theo dõi cục bộ nào, và hash chủ sở hữu Claude đã bị *"broken."*

<!-- section:evidence -->
## Bằng chứng cho thấy gì

- **Mâu thuẫn 1 — rò rỉ đường dẫn workspace tuyệt đối `git.cwd` (`PR #42450`):** Khoảng 90 phút sau bài đăng, maintainer cốt lõi Julius đã merge [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), thừa nhận các lần chạy webhook do relay chuyển giao đã xuất toàn bộ execution span lên Axiom — bao gồm cả các span Git chứa `git.cwd` (**đường dẫn workspace tuyệt đối đầy đủ, tên người dùng OS và tên repository**).
- **Mâu thuẫn 2 — Các lựa chọn từ chối bị hỏng trên Windows và macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) thừa nhận ứng dụng desktop Windows đã bỏ qua các biến môi trường người dùng `T3CODE_TELEMETRY_ENABLED=false` đã lưu khi được khởi chạy từ các tiến trình đã tồn tại từ trước. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) thừa nhận việc tracing relay lần khởi chạy đầu trên macOS/Linux đã khởi tạo trước khi phát hiện shell, bỏ qua các lựa chọn từ chối trong `~/.zshrc` cho toàn bộ phiên.
- **Mâu thuẫn 3 — Ghi đĩa vô điều kiện và 264 bản ghi Claude đang hoạt động trong `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` tại `ca81b7b9`) vẫn gọi `getTelemetryIdentity` vô điều kiện khi khởi động, ghi UUID cài đặt cục bộ (`upsertAnonymousId`) trước khi kiểm tra `telemetryEnabled`. Trong khi đó, header gzip của bản xuất công khai của `@theo` (`6,056,594` byte sau nén, `95,789` sự kiện) cho thấy tên tệp gốc `events.clean.jsonl` được tạo 20 phút trước khi đăng — vậy mà nó vẫn chứa **264 bản ghi chủ sở hữu Claude đang hoạt động** nối **4 máy riêng biệt** (`installId`s) với một hash SHA-256 cùng các mô hình proxy riêng tư nguyên văn (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Trạng thái upstream (`ca81b7b9`)

- **Đã vá một phần:** `PR #42450`, `PR #42376` và `PR #42464` đã được merge qua đêm.
- **Vẫn còn mở:** `AnalyticsService.ts:156` vẫn ghi ID ẩn danh cục bộ vô điều kiện trước khi kiểm tra các lựa chọn từ chối, và `DesktopShellEnvironment.ts` vẫn bỏ qua việc chuyển tiếp `T3CODE_OTEL_SDK_DISABLED` và `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Bằng chứng hình ảnh

![PR #42450 thừa nhận các lần chạy do relay kích hoạt đã xuất đường dẫn workspace tuyệt đối git.cwd lên Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 thừa nhận ứng dụng desktop Windows đã bỏ qua các biến môi trường T3CODE_TELEMETRY_ENABLED=false đã lưu](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 thừa nhận việc tracing relay lần khởi chạy đầu trên macOS đã bỏ qua các lựa chọn từ chối trong ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Kiểm tra pháp chứng events.clean.jsonl cho thấy 264 bản ghi Claude liên kết 4 máy và các ID mô hình proxy riêng tư](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Nguồn chính

- [Điều tra gốc trên X (Phần 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Phần làm rõ ngày 25/11 của `@theo` (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Phản hồi tiếp theo (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Bản dump nén gzip công khai](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Hồ sơ kỹ thuật chuyên sâu 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
