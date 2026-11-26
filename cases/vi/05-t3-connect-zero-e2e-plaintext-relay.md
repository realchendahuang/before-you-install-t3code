# #05 · T3 Connect: Không có mã hóa đầu-cuối & cổng gateway chấm dứt TLS dưới dạng văn bản thuần

> Mọi prompt, tệp nguồn và luồng terminal đi qua T3 Connect đều kết thúc dưới dạng văn bản thuần bên trong hạ tầng do T3 kiểm soát — không có mã hóa đầu-cuối và tính năng phê duyệt thiết bị mặc định tắt.

<!-- section:claim -->
## Điều đã được tuyên bố

- Ngày 24 tháng 11, `@theo` tuyên bố dữ liệu hội thoại *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) cam kết *"encrypted network transport"* mà không đề cập đến việc thiếu mã hóa đầu-cuối.

<!-- section:evidence -->
## Bằng chứng cho thấy điều gì

- **Khả năng nhìn thấy văn bản thuần bên trong relay của T3 (`ManagedEndpointProvider.ts`):** T3 Connect khởi tạo Cloudflare Tunnel bên trong chính tài khoản Cloudflare của T3 (`docs/internals/06_t3-connect.md`). TLS trên đường truyền kết thúc tại edge của Cloudflare, không có bất kỳ mã hóa payload nào giữa các client, nghĩa là chỉ cần gắn một Cloudflare Workers Route là mọi prompt, tệp và luồng terminal đều lộ ra dưới dạng văn bản thuần.
- **Mã hóa đầu-cuối bị từ chối với lý do ngoài phạm vi (`Issue #32098`):** Khi các nhà phát triển yêu cầu xác thực lẫn nhau và mã hóa đầu-cuối, một maintainer đã đóng [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) với lý do thay đổi quá lớn; Discussions `#21286` và `#37831` không có phản hồi. Ngày 25 tháng 11, `@theo` tuyên bố mã hóa đầu-cuối là bất khả thi ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Chuyển sang gateway OVH Caddy do T3 vận hành (`PR #32945`):** Sau khi hóa đơn Cloudflare Tunnel lên tới **$25,000/tháng**, `@theo` mở [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) để chuyển sang một máy chủ OVH Hillsboro do T3 thuê (`gw.t3coderelay.com`), tại đó instance Caddy của chính T3 chấm dứt TLS và chuyển tiếp văn bản thuần qua Unix socket tới một proxy `yamux` viết bằng Go — vẫn không có mã hóa đầu-cuối.
- **Phê duyệt thiết bị mặc định tắt (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` vẫn mặc định là `false` trong [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Như `SECURITY.md` thừa nhận, một tài khoản cloud bị xâm phạm hoặc khóa ký relay bị rò rỉ sẽ cấp quyền truy cập máy chủ tương đương quyền shell.

<!-- section:status -->
## Trạng thái phía upstream (`ca81b7b9`)

- **Vẫn đang mở:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) đã bổ sung thông báo đăng nhập, nhưng **T3 Connect vẫn không có mã hóa đầu-cuối**, `requireConnectDeviceApproval` vẫn mặc định là `false`, và `privacy-policy.astro` vẫn không thay đổi kể từ `2026-10-06`.

<!-- section:visuals -->
## Bằng chứng trực quan

![Issue #32098 xác nhận rằng một tài khoản cloud bị đánh cắp hoặc khóa relay bị rò rỉ có thể điều khiển các máy đã liên kết mà không cần mã hóa đầu-cuối](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 chuyển T3 Connect sang gateway OVH tự vận hành, nơi Caddy chấm dứt TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts khởi tạo Cloudflare Tunnel bên trong chính tài khoản của T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Nguồn gốc chính

- [Điều tra gốc trên X (Phần 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Bình luận Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Hồ sơ kỹ thuật chuyên sâu 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
