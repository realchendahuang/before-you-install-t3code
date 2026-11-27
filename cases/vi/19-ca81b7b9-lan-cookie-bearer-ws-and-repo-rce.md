# #19 · `ca81b7b9` Kiểm toán nghiêm trọng về xác thực & thực thi trong repo: shell LAN dạng văn bản thuần kéo dài 30 ngày, token không thể thu hồi & phơi nhiễm `SSH_AUTH_SOCK`

> Kiểm tra từng dòng trên HEAD mới nhất của `main` (`ca81b7b9`, 25/11 14:49 CST) xác nhận năm lỗ hổng bảo mật và độ tin cậy vẫn đang hoạt động: cookie shell `--lan` dạng văn bản thuần kéo dài 30 ngày với cơ chế bỏ qua khi thiếu `Origin`, token Bearer 30 ngày không thể thu hồi, URL `?wsTicket=` có thể phát lại, `isIPv4` vô hiệu hóa tunnel `::1`, và các repository không đáng tin cậy thực thi hook/submodule với `SSH_AUTH_SOCK` và `GITHUB_TOKEN` được kế thừa.

<!-- section:claim -->
## Những gì đã được tuyên bố

- Sau đợt vá qua đêm ngày 24–25 tháng 11, T3 Code được trình bày như đã được dọn dẹp và an toàn để sử dụng kỹ thuật hằng ngày.
- `SECURITY.md` định nghĩa một phiên mặc định là toàn quyền điều khiển shell dưới người dùng OS, đồng thời tuyên bố ranh giới cục bộ/LAN được quản lý đúng cách.

<!-- section:evidence -->
## Những gì bằng chứng cho thấy

Được xác minh trực tiếp với commit upstream [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. Cookie shell `--lan` dạng văn bản thuần kéo dài 30 ngày + bỏ qua kiểm tra khi thiếu `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) đặt TTL mặc định của phiên là 30 ngày (tương đương toàn quyền truy cập shell OS theo `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) chỉ thêm thuộc tính `Secure` cho `https:`, khiến cookie HTTP của `t3 up --lan` được truyền dưới dạng văn bản thuần ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Tệ hơn, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) trả về `true` mỗi khi `Origin` không được cung cấp — vì vậy bất kỳ ai bắt được một gói tin LAN duy nhất đều có thể phát lại cookie từ một script không phải trình duyệt mà không cần `Origin`, rồi âm thầm nắm quyền truy cập shell máy chủ trong 30 ngày.
- **2. Token Bearer 30 ngày không thể thu hồi, không dùng DPoP & không có route `/logout`:** `/oauth/token` chỉ rút ngắn thời hạn xuống 1 giờ khi có bằng chứng DPoP; nếu không, nó phát hành **token Bearer 30 ngày không được ràng buộc** ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Hợp đồng HTTP định nghĩa **không có endpoint `/logout` nào** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), và `revokeClientSession` chặn rõ ràng việc tự thu hồi phiên hiện tại bằng `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Token URL `?wsTicket=` kéo dài 5 phút có thể phát lại:** Ticket WebSocket di chuyển trong chuỗi truy vấn (`?wsTicket=`, rơi vào log proxy/truy cập) với TTL 5 phút. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) kiểm tra chữ ký, thời hạn, đối tượng và thu hồi mà **không có kho phát lại `jti` dùng một lần** — cho phép phát lại không giới hạn RPC Bearer và mọi ticket `media` trong vòng 5 phút ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Repository không đáng tin cậy chạy với toàn bộ `SSH_AUTH_SOCK` & `GITHUB_TOKEN`:** Thiết lập worktree tự động chạy `git submodule update --init --recursive` mỗi khi `.gitmodules` tồn tại ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) bỏ qua lớp bảo vệ toàn cục `core.hooksPath=/dev/null`; và [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) chạy hook `SessionStart` trong `.claude/settings.json` một cách đồng bộ — tất cả đều kế thừa toàn bộ `process.env` của máy chủ, bao gồm `GITHUB_TOKEN` và `SSH_AUTH_SOCK` (phạm vi ảnh hưởng trải rộng đến mọi repository từ xa và máy chủ production mà SSH agent của bạn có thể ký thay).
- **5. `isIPv4` âm thầm phá hủy tunnel loopback `::1`:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) thêm `::1` vào danh sách cho phép loopback ở dòng 39, rồi gọi `NodeNet.isIPv4` ở dòng 73 — phân loại sai socket Tailscale Serve và T3 Connect loopback IPv6 là lưu lượng bên ngoài và gọi `socket.destroy()`.

<!-- section:status -->
## Trạng thái upstream (`ca81b7b9`)

- **Cả 5 vấn đề vẫn chưa được sửa tại `ca81b7b9`:** Đã xác nhận từng dòng trên HEAD của `main` (`2026-11-25 14:49 CST`), cùng với **0 GitHub Security Advisory nào được công bố** (bao gồm bản vá path traversal âm thầm ngày 20/11 trong `PR #39483`).

<!-- section:visuals -->
## Bằng chứng trực quan

![http.ts#L215-L241 gửi cookie shell 30 ngày không có Secure qua HTTP --lan dạng văn bản thuần](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 trả về true mỗi khi header Origin không được cung cấp](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 chặn tự thu hồi phiên hiện tại và không có route logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 chạy khởi tạo submodule đệ quy dưới SSH_AUTH_SOCK và GITHUB_TOKEN được kế thừa](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 từ chối tunnel loopback IPv6 ::1 thông qua NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Nguồn chính

- [Bài kiểm toán gốc trên X — Phần 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Phần 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Hồ sơ kỹ thuật chuyên sâu 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
