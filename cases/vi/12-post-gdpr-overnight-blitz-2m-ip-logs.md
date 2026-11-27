# #12 · Cuộc đột kích xuyên đêm sáu tiếng sau GDPR: Nhật ký IP 2,2 triệu/giờ & việc xóa tài khoản hỏng

> Sau khi một đơn khiếu nại GDPR chính thức của EU được nộp vào ngày 24 tháng 11, sáu tiếng vá khẩn cấp xuyên đêm đã vô tình làm lộ thêm bốn điểm công bố riêng tư sâu hơn — dẫn đầu là 2,2 triệu span Axiom gắn thẻ IP mỗi giờ, được lưu giữ trong 30 ngày.

<!-- section:claim -->
## Những gì đã được tuyên bố

- Thậm chí 3,5 giờ sau khi `PR #42380` được merge, `@theo` vẫn trả lời công khai rằng IP của người gọi đã được loại bỏ.
- Tài liệu chính thức (`docs/user/telemetry.md`) cam kết rằng các báo cáo `agent.feedback` là ẩn danh và việc xóa tài khoản sẽ loại bỏ sạch dữ liệu người dùng.

<!-- section:evidence -->
## Những gì bằng chứng cho thấy

- **Span relay IP + User-Agent 2,2 triệu/giờ (`PR #42380`):** Mọi span của request relay được xuất sang Axiom — khoảng **2,2 triệu span mỗi giờ, lưu giữ 30 ngày** — đều ghi lại `client.address` (IP thực của người gọi lấy từ `cf-connecting-ip`) và `user_agent.original` ngay bên cạnh `user.id` (trong khi 1% log Workers của Cloudflare vẫn được tách riêng).
- **Việc xóa tài khoản Clerk bị hỏng (`PR #42285` & `PR #42430`):** Trước đây, khi xóa một tài khoản người dùng trong Clerk, các dòng dữ liệu relay trên PlanetScale và các tunnel Cloudflare đang hoạt động vẫn tiếp tục chạy ngầm — cho đến khi một yêu cầu xóa dữ liệu riêng tư thực tế của người dùng buộc các kỹ sư phải chạy **SQL viết tay và gỡ tunnel thủ công**.
- **Rò rỉ token push di động & user-ID (`PR #42459` & `PR #41859`):** Các payload push FCM trên Android truyền giá trị `user_id` dạng văn bản thuần của Clerk tới Google trong mỗi thông báo; các span APNs trên iOS và log lỗi ghi lại toàn bộ URL push của thiết bị, mang theo cả push token.
- **Các lô phản hồi "ẩn danh" bị trộn lẫn (`PR #42466`):** Những sự kiện `agent.feedback` được cho là ẩn danh lại được gom vào đúng cùng một HTTP POST với các sự kiện `installId` đã định danh và dấu vân tay máy chủ đầy đủ (OS, kiến trúc, bản phân phối WSL nguyên bản), trực tiếp mâu thuẫn với `docs/user/telemetry.md`.

<!-- section:status -->
## Trạng thái phía upstream (`ca81b7b9`)

- **Đã vá một phần:** Các PR khẩn cấp `#42380`, `#42285`, `#42430`, `#42459`, `#41859` và `#42466` đã được merge trong đợt chạy nước rút GDPR xuyên đêm.
- **Vẫn còn bỏ ngỏ:** `privacy-policy.astro` không thay đổi kể từ `2026-10-06`, dịch vụ mã nguồn đóng `ingest.t3.codes` vẫn giữ các bản sao sự kiện thô mà không thể kiểm toán độc lập, và các cửa sổ lưu giữ Axiom 30 ngày trước đó chưa bao giờ được thông báo chính thức cho những người dùng bị ảnh hưởng.

<!-- section:visuals -->
## Bằng chứng hình ảnh

![PR #42380 cho thấy khoảng 2,2 triệu span relay mỗi giờ ghi lại IP người gọi thực và User-Agent bên cạnh user.id trong 30 ngày trên Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 thừa nhận việc xóa tài khoản trước đây để lại các dòng PlanetScale và tunnel Cloudflare đang hoạt động](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 thừa nhận các push FCM trên Android gửi giá trị user_id thô của Clerk tới Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 thừa nhận phản hồi ẩn danh bị gom chung lô với installId và dấu vân tay máy chủ](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Nguồn gốc chính

- [Điều tra gốc trên X (Phần 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Hồ sơ kỹ thuật chuyên sâu 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
