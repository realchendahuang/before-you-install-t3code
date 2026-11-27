# #18 · Cỗ Máy Phễu 77.000 Sao: Gắn Sao Bằng Thông Tin Đăng Nhập Máy Chủ Khi Nhàn Rỗi 30 Giây & Lỗi Gắn Sao Kho Bất Kỳ Chưa Được Sửa

> Sáu tháng sau khi lên án sao GitHub là cách "to trick VCs into investing", @theo tự merge một toast trong ứng dụng kích hoạt sau 30 giây nhàn rỗi, gọi `PUT user/starred/...` bằng thông tin đăng nhập GitHub của máy chủ — đẩy repo từ 30k lên 77k sao (chỉ với ~129 watcher) trong khi vẫn để nguyên lỗi gắn sao cho kho bất kỳ.

<!-- section:claim -->
## Điều Đã Được Tuyên Bố

- Ngày 26 tháng 4 năm 2026, `@theo` xuất bản *"Github has a fake star problem"*, viết rằng sao GitHub đã trở thành *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Ngày 24 tháng 11, khi repo đạt 74,6k sao, anh ta tuyên bố mình *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Bằng Chứng Cho Thấy Gì

- **Vực thẳm 10× sao mỗi ngày nhờ toast nhàn rỗi trong ứng dụng (`PR #27832`, `#29922`, `#29987`):** Sau hơn 8 tháng mới chạm 30.000 sao, `@theo` tự viết và tự merge [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) vào ngày 30 tháng 10, thêm một toast gắn sao sau 5 lần gửi prompt (`PROMPTS_BEFORE_ASKING = 5`), lập tức **nhân 10** số sao mỗi ngày (`+3,094` sao/ngày trên GitHub Trending). Ngày 3 tháng 11, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) và [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) thêm **cơ chế phát hiện nhàn rỗi trong cửa sổ 30 giây** (`IDLE_MS = 30_000`) trong lúc người dùng chờ các lượt AI, đồng thời thay chuyển hướng trình duyệt bằng một RPC `sourceControl.star` phía máy chủ, gọi thẳng `PUT user/starred/pingdotgg/t3code` thông qua **thông tin đăng nhập `gh` CLI / `GH_TOKEN` của máy chủ host**, kèm màn confetti 160 hạt.
- **Vượt qua review & sự mờ mịt tài khoản trên máy chủ dùng chung:** Macroscope gắn cờ `PR #29922` là *Needs Human Approval* vì sự lệch pha giữa người dùng trình duyệt và thông tin đăng nhập máy chủ; `@theo` vẫn tự merge. Trên các máy chủ dùng chung hoặc máy chủ từ xa, bấm *Star* sẽ âm thầm gắn sao repo bằng tài khoản GitHub của bất kỳ ai sở hữu thông tin đăng nhập máy chủ, mà không cho người dùng biết tài khoản nào đã được dùng.
- **Lỗi gắn sao kho bất kỳ chưa được sửa (`driver.ts#L60-L99`):** Ngày 6 tháng 11, lập trình viên `zhilsinger` gửi `Request changes`, chỉ ra rằng [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) chấp nhận bất kỳ chuỗi `owner/repo` nào mà không ghim `pingdotgg/t3code` — cho phép bất kỳ client nào có quyền `source-control:write` gắn sao các kho GitHub tùy ý bằng thông tin đăng nhập của máy chủ.

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
## Trạng Thái Upstream (`ca81b7b9`)

- **Vẫn còn mở:** `driver.ts#L60-L99` cho phép gắn sao kho bất kỳ không ghim, cùng review `Request changes` ngày 6 tháng 11 của `zhilsinger`, vẫn chưa được trả lời và chưa được sửa sau 19 ngày (77k+ sao so với ~129 watcher).

<!-- section:visuals -->
## Bằng Chứng Hình Ảnh

![Biểu đồ ngày 2 tháng 11 của Theo ăn mừng vực thẳm 10x gần như dựng đứng ngay sau khi tung prompt trong ứng dụng](../../evidence/20-star-10x-cliff.png)

![Review Request Changes của lập trình viên zhilsinger trên PR #29922 không được trả lời suốt 19 ngày](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 chấp nhận chuỗi owner/repo tùy ý mà không ghim pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Nguồn Sơ Cấp

- [Điều tra gốc trên X (Phần 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [Vực thẳm 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [Trending +3,094/ngày (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Hồ sơ Kỹ thuật Chuyên sâu 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
