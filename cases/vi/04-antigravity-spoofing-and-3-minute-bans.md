# #04 · Google Antigravity giả mạo header, `SSH_CONNECTION` giả & tài khoản bị ban trong 3 phút

> Dù cam kết tuân thủ ToS trong FAQ của mình, T3 Code vẫn trích xuất thông tin đăng nhập từ keyring của hệ điều hành, giả mạo header nội bộ của Google (`antigravity/hub/2.24.0`) khi gọi `v1internal`, và chèn các giá trị `SSH_CONNECTION` giả — khiến các gói đăng ký Google cá nhân có nguy cơ bị ban nhanh chóng.

<!-- section:claim -->
## Những gì đã được tuyên bố

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) khẳng định với các thuê bao trả phí: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Khi những người dùng bị ban mở [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), một maintainer phủ nhận việc gọi backend của Antigravity hoặc tái sử dụng token — và trên X, `@theo` đổ lỗi cho các proxy bên thứ ba (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Bằng chứng cho thấy gì

- **Trích xuất thông tin đăng nhập từ hệ điều hành & các lệnh gọi `v1internal` giả mạo:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) trích xuất token Google OAuth từ các tệp cục bộ, `@napi-rs/keyring`, hoặc Windows Credential Manager (`CredReadW` qua `ffi-rs` trên `advapi32.dll`), hard-code `antigravity/hub/2.24.0`, và `POST` trực tiếp tới endpoint `v1internal` riêng tư của Google. Nhân viên Google xác nhận trên [diễn đàn chính thức](https://discuss.ai.google.dev/t/185992) rằng Mục 6 của [Google Antigravity ToS](https://antigravity.google/terms) cấm các công cụ bên thứ ba trích xuất hoặc tái sử dụng thông tin đăng nhập để truy vấn trực tiếp các endpoint backend.
- **`SSH_CONNECTION` giả mạo & rò rỉ chéo tài khoản:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) chèn một biến môi trường `SSH_CONNECTION` giả (`"127.0.0.1 0 127.0.0.1 0"`) để lừa CLI của Google thoát khỏi cơ chế cô lập keychain của hệ điều hành và chuyển sang các tệp văn bản thuần. Khi Google cập nhật CLI vào ngày 24 tháng 11, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) xác nhận các prompt từ Tài khoản A âm thầm được chuyển sang Tài khoản B.
- **Tài khoản $20 mới toanh bị ban trong 3 phút (`Issue #41536`):** Một gói đăng ký Google AI $20 hoàn toàn mới, không dùng proxy nào — chỉ dùng Antigravity do T3 quản lý — đã bị ban ngay ở tin nhắn đầu tiên, 3 phút sau khi thiết lập. Các maintainer đóng issue với lý do trùng lặp mà không thêm bất kỳ cảnh báo nào cho người dùng.
- **Giả mạo client gốc & CLIProxyAPI:** `@theo` đích thân merge [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) để giả danh `"zed"`, trong khi [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) đã được merge nối [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) với cơ chế polling hub dùng các header giả mạo `claude-code/2.1.273`, `grok-cli/1.0.77`, và `antigravityUserAgent`.

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
## Trạng thái upstream (`ca81b7b9`)

- **Vẫn còn hiệu lực:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) đã thêm [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) để hiển thị các liên kết xác minh tài khoản khi Google trả `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — xác nhận việc Google đang thực thi mạnh — trong khi cả bốn đường dẫn giả mạo và trích xuất token vẫn còn tồn tại.

<!-- section:visuals -->
## Bằng chứng hình ảnh

![antigravityUsageLimits.ts hard-code các header Google giả mạo và gọi v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts giả tạo SSH_CONNECTION để vượt qua lưu trữ keychain của hệ điều hành](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 ghi lại một tài khoản $20 mới, không proxy, bị ban trong 3 phút](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 tích hợp sẵn cơ chế polling hub CLIProxyAPI giả mạo vào T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Nguồn chính

- [Điều tra gốc trên X (Phần 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Cam kết ToS trong FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Diễn đàn nhà phát triển Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Hồ sơ kỹ thuật chuyên sâu 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
