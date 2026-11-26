# #07 · Mâu thuẫn Managed Policy: Bốn điểm mù telemetry được chính tài liệu ghi nhận

> `@theo` khẳng định T3 Code sở hữu "best corporate managed policy system" khiến việc "trivial to turn off all telemetry" trở nên dễ dàng — điều này bị chính `docs/user/telemetry.md` và `docs/user/managed-policy.md` của T3 Code phủ định trực tiếp.

<!-- section:claim -->
## Điều đã được tuyên bố

- Lúc 19:13 CST ngày 24 tháng 11, `@theo` gạt bỏ chuyện thiếu công tắc cho người dùng tự chọn từ chối: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Nửa giờ sau, ông nói thêm rằng dữ liệu hội thoại *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Bằng chứng cho thấy gì

Tài liệu chính thức của chính T3 Code ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) và [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) ghi nhận bốn điểm mù cụ thể:

- **Triển khai chỉ dành cho quản trị viên (không có công tắc cá nhân nào):** Người dùng desktop không có công tắc nào trong Settings. Managed Policy đòi hỏi MDM/GPO hoặc các đường dẫn hệ điều hành được quản trị viên bảo vệ (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, hoặc `/etc/t3code/policy.json`), hoàn toàn không thể truy cập với người dùng desktop không có quyền quản trị.
- **Hosted Web App (`app.t3.codes`) bỏ qua policy:** Ứng dụng trình duyệt bỏ qua biến môi trường của server và Managed Policy, phát ra connection trace khi được build kèm tracing, và *"has no relay tracing toggle."*
- **Các ứng dụng mobile nằm ngoài policy của server:** Tài liệu chính thức xác nhận biến môi trường server và Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` bỏ qua lựa chọn từ chối:** Tải lên tên dự án, tên thread, tên model và trạng thái trực tiếp lên T3 Connect — và tài liệu nói rõ: *"The telemetry opt-out does not disable it."* Ngoài ra, các span/crash log Axiom bị lỗi *"can quote a value the app was handling"*, và `Agent feedback` có thể đính kèm tới 16 KB tin nhắn hội thoại.

<!-- section:status -->
## Trạng thái upstream (`ca81b7b9`)

- **Vẫn còn mở:** Trong đêm, [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) đã bổ sung công tắc mobile trace trong ứng dụng, nhưng Managed Policy vẫn không thể tắt mobile tracing, `app.t3.codes` hosted vẫn không có công tắc từ chối nào, `Publish agent activity` vẫn bỏ qua lựa chọn từ chối telemetry, và không có công tắc nào trong Settings UI trên desktop.

<!-- section:visuals -->
## Bằng chứng hình ảnh

![Tài liệu chính thức docs/user/telemetry.md xác nhận app.t3.codes không có công tắc, mobile bỏ qua Managed Policy, và agent activity bỏ qua lựa chọn từ chối](../../evidence/05-telemetry-cant-disable.png)

![Tài liệu chính thức docs/user/managed-policy.md liệt kê các đường dẫn hệ thống được quản trị viên bảo vệ trên macOS, Windows và Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Bài đăng ngày 24 tháng 11 của Theo khẳng định Managed Policy khiến việc tắt toàn bộ telemetry trở nên dễ dàng](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Nguồn gốc chính

- [Điều tra gốc trên X (Phần 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Tuyên bố Managed Policy của `@theo` (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Hồ sơ kỹ thuật chuyên sâu 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
