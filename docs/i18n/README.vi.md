# Temu3 Code — Trước khi cài T3 Code

<p align="center">
  <em>Một hồ sơ công khai độc lập, lấy chứng cứ làm trọng tâm về pingdotgg/t3code — ghi lại tiêu chuẩn kép về chủng tộc, telemetry gây nhầm lẫn, lỗ hổng bảo mật nghiêm trọng và thao túng thương mại.</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=vi"><strong>🌐 temu3code.com</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=vi"><strong>✉ Hộp thư Tmail</strong></a> ·
  <a href="https://temu3code.com/?lang=vi#x-receipts"><strong>📸 12 ảnh chụp X gốc</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=vi"><strong>🃏 61 meme</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 bằng chứng</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 nguồn</strong></a>
</p>

<p align="center">
  <strong>Ngôn ngữ (18):</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md"><strong>Tiếng Việt</strong></a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

> [!IMPORTANT]
> **Điều tra hồ sơ công khai độc lập · 18 ngôn ngữ**
>
> Không telemetry. Không phân biệt chủng tộc. Mọi luận điểm dưới đây đều được neo vào phát ngôn công khai nguyên văn, commit trong kho mã, pull request, hồ sơ USPTO và ảnh chụp màn hình đã lưu trữ.
>
> - **Hồ sơ đã xác minh:** 20 hồ sơ (#00–#19)
> - **Chứng cứ sơ cấp:** 109 ảnh chứng cứ · 327 URL chuẩn
> - **Kiểm tra upstream:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **Cảnh báo bảo mật:** 0 cảnh báo bảo mật GitHub được công bố

<!-- origin-story:start -->
> [!TIP]
> **Vì sao là "Temu3 Code"?**
>
> Ngày 23/11/2026 — 10 phút sau khi gọi bản fork MIT miễn phí của một nhà phát triển Trung Quốc là "Chinese knockoff" — @theo hào phóng tặng tên thương hiệu của chúng tôi trên X: "Temu3 Code" (84k lượt xem).
>
> Thương hiệu miễn phí từ một nhà sáng lập chưa đăng ký bất kỳ nhãn hiệu nào với USPTO thì quá tốt để bỏ phí — nên chúng tôi đã đăng ký temu3code.com, đưa toàn bộ public audit vào và bỏ luôn telemetry PostHog. Cảm ơn buổi tư vấn đặt tên miễn phí, Theo. (CC0 1.0 — muốn thì cứ fork ngược lại chúng tôi.) — [Xem tweet đặt tên của @theo ↗](https://x.com/theo/status/2124825920808829077)
<!-- origin-story:end -->
---

## Chuyện đã diễn ra trong 60 giây

Một tranh chấp đặt tên duy nhất quanh bản fork MIT của cộng đồng đã phơi ra một mô thức gồm tiêu chuẩn kép về chủng tộc, telemetry ẩn, các bản vá bảo mật âm thầm và rủi ro kiến trúc chưa được khắc phục.

1. **Tia lửa phân biệt đối xử** *(23 tháng 11, 2026)* — Sau khi một người dùng nhầm bản fork MIT miễn phí của một nhà phát triển Trung Quốc là T3 Code chính thức, @theo gọi đó là “Chinese knockoff” và “Temu3 Code” rồi đe dọa cấm tài khoản GitHub — dù không nắm giữ thương hiệu USPTO nào và 11 giờ sau công khai hoan nghênh việc các phòng thí nghiệm Mỹ thuộc những công ty nghìn tỷ USD sao chép mã MIT.
2. **Mở mã nguồn** *(24 tháng 11, 2026)* — Việc rà soát từng dòng pingdotgg/t3code cho thấy telemetry PostHog bật mặc định được phát hành sau lời hứa “Không telemetry” trên trang chủ, việc lưu giữ sự kiện mã đóng tại ingest.t3.codes, đọc SHA-256 không muối các tệp ~/.codex và ~/.claude.json, lỗi xóa SQLite giả tạo 41,6 GB, lỗi git push --force âm thầm kéo dài 52 ngày, giả mạo header Google Antigravity và T3 Connect dạng văn bản thuần, không E2E.
3. **Hơn 2,26 triệu lượt xem, đơn GDPR của EU và 6 giờ dồn dập trong hoảng loạn** *(Đêm 24–25 tháng 11)* — Phần 1 vượt 2,26 triệu lượt xem và dẫn tới một khiếu nại GDPR tại EU. Các PR khẩn cấp trong đêm đã vô tình thừa nhận nhật ký IP + User-Agent 2,2 triệu/giờ được lưu 30 ngày trong Axiom, rò rỉ đường dẫn tuyệt đối của workspace git.cwd, chức năng xóa tài khoản bị hỏng và việc phớt lờ lựa chọn từ chối trên Windows/macOS.
4. **Những gì vẫn còn bỏ ngỏ đến nay** *(25 tháng 11 (`ca81b7b9`) và đang tiếp diễn)* — Theo dõi +259 commit đến ca81b7b9 đã xác nhận các bản vá telemetry một phần — cùng với việc ghi ID lúc khởi động chưa được khắc phục, không có nút bật/tắt trên giao diện, 0 cảnh báo bảo mật GitHub, gắn sao kho tùy ý không ghim phiên bản, cookie shell --lan 30 ngày dạng văn bản thuần, token Bearer không thể thu hồi và việc lộ SSH_AUTH_SOCK khi mở kho không tin cậy (#19).

---

## Tất cả 20 hồ sơ đã xác minh (#00–#19)

Mỗi hồ sơ dưới đây liên kết đến tệp hồ sơ bản địa hóa chuyên biệt, không dùng bảng, trong kho này và thẻ hình ảnh có thể chia sẻ trên cổng web. Việc theo dõi tiếp diễn sẽ tiếp tục tuần tự (#20, #21, ...).

### Phần I · Phân biệt chủng tộc, tiêu chuẩn kép và mô thức

*Từ các đe dọa gỡ bỏ gắn với “Chinese knockoff” và “Temu3 Code” trong khi không có thương hiệu USPTO nào, đến phân tách định lượng 1.151 tweet (0,0% lời tục tĩu nhắm vào VIP so với 8,0% thù địch nhắm vào nhà phát triển so với 14,4% mức gia tăng chống người Trung Quốc trong khủng hoảng) và lịch sử tái diễn trong hai năm.*

- **#00 · [Tranh chấp nguồn gốc: "Steal our code", đe dọa đặt tên fork & tiêu chuẩn kép về sắc tộc](../../cases/vi/00-origin-fork-dispute-and-double-standard.md)** — `📌 Hồ sơ công khai`
  Chỉ trong vòng 11 phút, @theo đã gắn nhãn bản fork MIT miễn phí của một lập trình viên Trung Quốc là "Chinese knockoff" và "Temu3 Code", đồng thời đe dọa khóa tài khoản GitHub — rồi chưa đầy 11 giờ sau, công khai hoan nghênh các công ty Mỹ trị giá nghìn tỷ đô sao chép mã MIT.
  [Mở toàn bộ hồ sơ](../../cases/vi/00-origin-fork-dispute-and-double-standard.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [Bộ dữ liệu định lượng 1.151 tweet: Sự lịch sự có chọn lọc & làn sóng chống Trung Quốc tăng 4,0 lần trong cuộc khủng hoảng](../../cases/vi/14-1151-tweet-quantitative-double-standard.md)** — `📌 Hồ sơ công khai`
  Phân tích định lượng toàn diện 1.151 bài đăng liên tiếp của @theo trên X (7–24/11/2026) chứng minh sự bất đối xứng quyền lực rõ rệt: 0,0% lời lẽ tục tĩu nhắm vào 20 giám đốc điều hành big-tech và nhân sự phòng lab, so với 8,0% thái độ thù địch nhắm vào các lập trình viên bình thường — tăng vọt 4,0 lần lên 14,4% trong cuộc tranh chấp bản fork Trung Quốc kéo dài 25 giờ.
  [Mở toàn bộ hồ sơ](../../cases/vi/14-1151-tweet-quantitative-double-standard.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [Không có bất kỳ nhãn hiệu USPTO nào đằng sau lời đe dọa cấm tài khoản GitHub & `TRADEMARK.md` hồi tố sau 17 giờ](../../cases/vi/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 Hồ sơ công khai`
  Khi @theo dọa liên hệ GitHub để lấy xuống tài khoản của một lập trình viên Trung Quốc với lý do "xâm phạm nhãn hiệu", T3 Tools Inc. không sở hữu bất kỳ đăng ký USPTO nào cho `T3 Code`, `T3 Tools` hay `T3 Connect` — và đã hợp nhất `TRADEMARK.md` một cách hồi tố 17 giờ sau đó.
  [Mở toàn bộ hồ sơ](../../cases/vi/15-zero-uspto-trademarks-and-retroactive-policy.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [Mô thức lịch sử hai năm: Phản ứng dữ dội nhắm vào quốc tịch, tiền thưởng FFmpeg 20.000 USD & những lời đe dọa bị xóa](../../cases/vi/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 Hồ sơ công khai`
  Vụ bùng nổ liên quan đến bản fork Trung Quốc vào tháng 11/2026 không phải là một sơ suất đơn lẻ — các hồ sơ công khai từ 2024 đến 2026 ghi lại một chu kỳ lặp đi lặp lại gồm quấy rối nhắm vào quốc tịch, bắt nạt trong cộng đồng mã nguồn mở, chế giễu giao diện của các lập trình viên khác, và xóa bài sau khi dư luận phản ứng.
  [Mở toàn bộ hồ sơ](../../cases/vi/16-two-year-pattern-of-bullying-and-deletions.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125408843152953693)

### Phần II · Telemetry gây nhầm lẫn và các vi phạm quyền riêng tư

*Cách câu “Không telemetry. Chấm hết.” che giấu việc tải lên PostHog mặc định, lưu giữ dữ liệu mã đóng tại ingest.t3.codes, băm thông tin xác thực xuyên công cụ, điểm mù của Managed Policy và nhật ký Axiom gắn IP 2,2 triệu/giờ.*

- **#01 · [Telemetry mặc định đằng sau lời hứa "No telemetry" trên trang chủ](../../cases/vi/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 Đã vá một phần`
  Trong khi trang chủ cam kết "No telemetry. Unless you opt in. Full stop.", T3 Code lại bật theo dõi PostHog mặc định, chuyển các bản sao thô qua `ingest.t3.codes` (mã nguồn đóng), băm các thông tin xác thực bên ngoài trong `~/.codex` và `~/.claude.json`, và từ chối bốn PR xin tắt thu thập từ cộng đồng.
  [Mở toàn bộ hồ sơ](../../cases/vi/01-default-telemetry-and-cross-tool-tracking.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [Mâu thuẫn Managed Policy: Bốn điểm mù telemetry được chính tài liệu ghi nhận](../../cases/vi/07-managed-policy-blind-spots.md)** — `🔴 Chưa khắc phục`
  `@theo` khẳng định T3 Code sở hữu "best corporate managed policy system" khiến việc "trivial to turn off all telemetry" trở nên dễ dàng — điều này bị chính `docs/user/telemetry.md` và `docs/user/managed-policy.md` của T3 Code phủ định trực tiếp.
  [Mở toàn bộ hồ sơ](../../cases/vi/07-managed-policy-blind-spots.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [Làm rõ ngày 25/11 bị phủ định trong vòng 2 giờ bởi các PR qua đêm và bản dump 100 MB](../../cases/vi/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 Đã vá một phần`
  Sáng ngày 25 tháng 11, @theo đưa ra ba cam kết rộng rãi về quyền riêng tư và công bố bản dump telemetry 100 MB — cả ba tuyên bố đều bị chính các PR của nhóm ông và bản dump nén gzip phủ định trong vòng hai giờ.
  [Mở toàn bộ hồ sơ](../../cases/vi/11-nov25-clarification-contradicted-in-2-hours.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [Cuộc đột kích xuyên đêm sáu tiếng sau GDPR: Nhật ký IP 2,2 triệu/giờ & việc xóa tài khoản hỏng](../../cases/vi/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 Đã vá một phần`
  Sau khi một đơn khiếu nại GDPR chính thức của EU được nộp vào ngày 24 tháng 11, sáu tiếng vá khẩn cấp xuyên đêm đã vô tình làm lộ thêm bốn điểm công bố riêng tư sâu hơn — dẫn đầu là 2,2 triệu span Axiom gắn thẻ IP mỗi giờ, được lưu giữ trong 30 ngày.
  [Mở toàn bộ hồ sơ](../../cases/vi/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125395501663281198)

### Phần III · Lỗi sản phẩm và các lỗ hổng bảo mật nghiêm trọng

*Lỗi xóa SQLite giả tạo 41,6 GB, quét tiến trình hệ điều hành mỗi 5 giây, git push --force âm thầm kéo dài 52 ngày, giả mạo ToS Google Antigravity khiến tài khoản bị cấm trong 3 phút, T3 Connect dạng văn bản thuần không E2E, 0 cảnh báo bảo mật và các lỗ hổng LAN/Bearer/SSH_AUTH_SOCK ở ca81b7b9.*

- **#02 · [Xóa Thread SQLite Giả Tạo (Phình Dữ Liệu 41.6 GB) & Quét Toàn Bộ Tiến Trình Hệ Điều Hành Mỗi 5 Giây](../../cases/vi/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 Đã vá một phần`
  Việc bấm "permanently delete" vẫn để nguyên toàn bộ lịch sử hội thoại bên trong `statev2.sqlite` (khiến đĩa cục bộ phình lên 41.6 GB), trong khi một monitor Rust chạy nền quét mọi tiến trình hệ điều hành và toàn bộ dòng lệnh mỗi 5 giây mà không có bất kỳ tùy chọn tắt nào.
  [Mở toàn bộ hồ sơ](../../cases/vi/02-fake-sqlite-delete-and-process-scanner.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [52 ngày `git push --force` âm thầm so với 21 giờ gỡ bỏ bộ lọc quyền riêng tư mô hình](../../cases/vi/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 Chưa khắc phục`
  Trong hơn 52 ngày, T3 Code để một lỗi tồn tại: chế độ Auto của Claude âm thầm phê duyệt `git push --force origin main` mà không hề nhắc — vậy mà chỉ mất 21 giờ để gỡ bỏ một danh sách trắng quyền riêng tư, để các mô hình riêng tư xuất hiện trên bảng xếp hạng công khai của @theo.
  [Mở toàn bộ hồ sơ](../../cases/vi/03-silent-force-push-vs-21h-filter-removal.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [Google Antigravity giả mạo header, `SSH_CONNECTION` giả & tài khoản bị ban trong 3 phút](../../cases/vi/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 Chưa khắc phục`
  Dù cam kết tuân thủ ToS trong FAQ của mình, T3 Code vẫn trích xuất thông tin đăng nhập từ keyring của hệ điều hành, giả mạo header nội bộ của Google (`antigravity/hub/2.24.0`) khi gọi `v1internal`, và chèn các giá trị `SSH_CONNECTION` giả — khiến các gói đăng ký Google cá nhân có nguy cơ bị ban nhanh chóng.
  [Mở toàn bộ hồ sơ](../../cases/vi/04-antigravity-spoofing-and-3-minute-bans.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect: Không có mã hóa đầu-cuối & cổng gateway chấm dứt TLS dưới dạng văn bản thuần](../../cases/vi/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 Chưa khắc phục`
  Mọi prompt, tệp nguồn và luồng terminal đi qua T3 Connect đều kết thúc dưới dạng văn bản thuần bên trong hạ tầng do T3 kiểm soát — không có mã hóa đầu-cuối và tính năng phê duyệt thiết bị mặc định tắt.
  [Mở toàn bộ hồ sơ](../../cases/vi/05-t3-connect-zero-e2e-plaintext-relay.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [Không có cảnh báo bảo mật GitHub nào, vá lỗ hổng nghiêm trọng trong im lặng & `SECURITY.md` vội vã](../../cases/vi/13-zero-security-advisories-and-silent-patches.md)** — `🔴 Chưa khắc phục`
  Trong lúc các kiểm toán viên mã nguồn Trung Quốc bị gạt bỏ trên X, T3 Code lặng lẽ hợp nhất các bản vá lỗ hổng nghiêm trọng — gồm path traversal trong kho lưu trữ bí mật, rò rỉ token xuyên miền và thực thi lệnh từ repo không đáng tin cậy — đồng thời vẫn giữ số Cảnh báo Bảo mật GitHub được công bố ở mức 0.
  [Mở toàn bộ hồ sơ](../../cases/vi/13-zero-security-advisories-and-silent-patches.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` Kiểm toán nghiêm trọng về xác thực & thực thi trong repo: shell LAN dạng văn bản thuần kéo dài 30 ngày, token không thể thu hồi & phơi nhiễm `SSH_AUTH_SOCK`](../../cases/vi/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 Chưa khắc phục`
  Kiểm tra từng dòng trên HEAD mới nhất của `main` (`ca81b7b9`, 25/11 14:49 CST) xác nhận năm lỗ hổng bảo mật và độ tin cậy vẫn đang hoạt động: cookie shell `--lan` dạng văn bản thuần kéo dài 30 ngày với cơ chế bỏ qua khi thiếu `Origin`, token Bearer 30 ngày không thể thu hồi, URL `?wsTicket=` có thể phát lại, `isIPv4` vô hiệu hóa tunnel `::1`, và các repository không đáng tin cậy thực thi hook/submodule với `SSH_AUTH_SOCK` và `GITHUB_TOKEN` được kế thừa.
  [Mở toàn bộ hồ sơ](../../cases/vi/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125494234614788390)

### Phần IV · Thao túng thương mại và bắt nạt cộng đồng

*Radar tính toán hằng ngày trị giá hơn 800 nghìn USD / 31,7T token, xung đột lợi ích với nhà đầu tư thiên thần (Vibe Kanban, Daytona), chồng lấn trong danh sách nhà tài trợ, việc gắn sao bằng thông tin xác thực máy chủ sau 30 giây nhàn rỗi tạo ra 77.000 sao, @bot quét fork và các lệnh cấm trong .github/VOUCHED.td.*

- **#06 · [Xung đột lợi ích của nhà đầu tư thiên thần: Chế giễu việc Vibe Kanban đóng cửa & sự trùng lặp với Daytona](../../cases/vi/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 Hồ sơ công khai`
  Ngoài các khiếm khuyết về mã nguồn, những bài đăng công khai trên X của @theo còn ghi lại các xung đột gay gắt giữa vai trò nhà đầu tư thiên thần của anh trong những startup phát triển phần mềm cạnh tranh và việc anh vận hành T3 Code.
  [Mở toàn bộ hồ sơ](../../cases/vi/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [Sổ cái kinh doanh 800.000 USD+ & Radar tính toán 31,7 nghìn tỷ token mỗi ngày](../../cases/vi/08-800k-spend-and-31t-token-radar.md)** — `📌 Hồ sơ công khai`
  Telemetry bật mặc định không phải là một sơ suất kỹ thuật: nó nuôi một radar tình báo thời gian thực 31,7T token/ngày (tương đương 10,19 triệu USD/ngày chi phí API), đổi lấy 300 nghìn USD+ token OpenAI early-access miễn phí và các cuộc tiếp cận nhà đầu tư.
  [Mở toàn bộ hồ sơ](../../cases/vi/08-800k-spend-and-31t-token-radar.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [Chuyện `yolo merges` nội bộ đối lập với thái độ thù địch với cộng đồng bên ngoài & các lệnh cấm trong `.github/VOUCHED.td`](../../cases/vi/09-yolo-merges-vs-community-hostility.md)** — `📌 Hồ sơ công khai`
  Bên trong, T3 Code tung ra 500 commit/ngày thông qua các vòng lặp agent tự động và tự nhận *"my yolo merges breaking shit"* — trong khi bên ngoài lại nói với người đóng góp *"here's my advice: Don't"*, tố cáo người dùng qua `.github/VOUCHED.td`, và lăng mạ những người mở issue.
  [Mở toàn bộ hồ sơ](../../cases/vi/09-yolo-merges-vs-community-hostility.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [Công khai dùng `@bot` cào fork, chế giễu đối thủ & đàn áp người chỉ trích](../../cases/vi/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 Hồ sơ công khai`
  Trong lúc chế giễu các đối thủ vì sao chép mẫu giao diện UI, @theo công khai trả lời "Okay I'm stealing this" trước bản fork của một nữ lập trình viên và 30 giây sau điều `@bot` đi cào mã của cô — đồng thời triển khai các công cụ tự động chặn và kêu gọi người theo dõi cắt nguồn thu nhập của những người chỉ trích.
  [Mở toàn bộ hồ sơ](../../cases/vi/10-fork-scraping-bot-and-critics-suppression.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [Ràng buộc với dàn nhà tài trợ, chiêu trục lợi hạn mức 0% của Codex & sự đạo đức giả quanh `CLIProxyAPI` 10 tài khoản](../../cases/vi/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 Hồ sơ công khai`
  Trong khi rao giảng về việc tuân thủ và từ chối tích hợp tính năng chuyển đổi tài khoản vì nguy cơ bị khóa, T3 Code lại nhúng các nhà tài trợ YouTube của @theo (Clerk và Axiom) vào stack đám mây của mình, trong khi @theo từng khoe đã lợi dụng lỗi hạn mức 0% của Codex và công bố một Gist gộp 10 tài khoản `CLIProxyAPI` được liên kết trực tiếp từ FAQ của T3.
  [Mở toàn bộ hồ sơ](../../cases/vi/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [Cỗ Máy Phễu 77.000 Sao: Gắn Sao Bằng Thông Tin Đăng Nhập Máy Chủ Khi Nhàn Rỗi 30 Giây & Lỗi Gắn Sao Kho Bất Kỳ Chưa Được Sửa](../../cases/vi/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 Chưa khắc phục`
  Sáu tháng sau khi lên án sao GitHub là cách "to trick VCs into investing", @theo tự merge một toast trong ứng dụng kích hoạt sau 30 giây nhàn rỗi, gọi `PUT user/starred/...` bằng thông tin đăng nhập GitHub của máy chủ — đẩy repo từ 30k lên 77k sao (chỉ với ~129 watcher) trong khi vẫn để nguyên lỗi gắn sao cho kho bất kỳ.
  [Mở toàn bộ hồ sơ](../../cases/vi/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [Thẻ tương tác](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=vi) · [Bài đăng X gốc](https://x.com/realchendahuang/status/2125416210120765799)

---

## Ảnh chứng cứ chính

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/charts/theo-chart-3-double-standard.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## Cẩm nang gia cố và dọn dẹp trong 2 phút

Nếu T3 Code đã được cài trên máy, đừng chỉ dựa vào biến môi trường — AnalyticsService.ts:156 ghi một ID cục bộ trước khi kiểm tra lựa chọn từ chối và DesktopShellEnvironment.ts bỏ qua OTEL_SDK_DISABLED. Hãy kết hợp cờ môi trường, chặn qua hosts của hệ điều hành, nén SQLite ngoại tuyến và thu hồi token.

- [ ] Đặt DO_NOT_TRACK=1 và các công tắc tắt telemetry cũ, đồng thời chặn ingest.t3.codes trong /etc/hosts.
- [ ] Thoát T3 Code, kiểm tra statev2.sqlite, chạy VACUUM; ở chế độ ngoại tuyến hoặc xóa hoàn toàn ~/.t3.
- [ ] Ngừng chạy các tài khoản Google AI / Antigravity cá nhân qua các thư mục do T3 quản lý để bảo vệ cơ hội kháng nghị duy nhất của bạn.
- [ ] Tắt hoạt động của Publish agent, hủy liên kết các máy T3 Connect, yêu cầu Clerk + relay xóa dữ liệu và thu hồi ứng dụng GitHub OAuth của T3 Code.
- [ ] Không bao giờ để lộ t3 up --lan dạng văn bản thuần khi không có TLS, tránh token Bearer không DPoP có thời hạn 30 ngày trong CI, và xóa SSH_AUTH_SOCK / GITHUB_TOKEN trước khi mở kho không tin cậy.

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**Các lựa chọn thay thế được cộng đồng đề xuất:** Các nhà phát triển đã nêu bật Mirasim (@Mirasim_ADE), Paseo (@paseo_sh), Paradev (@ParadevAI), Cloudroom, Conductor, Emdash và Orca. Trước khi dùng bất kỳ ứng dụng khách nào, hãy xác minh telemetry mặc định tắt, xóa cục bộ thực sự, chuyển giao cho CLI chính thức mà không giả mạo header và mã hóa đầu-cuối phía máy khách.

---

## Báo cáo cộng đồng và bình luận độc lập

20 hồ sơ được đánh số (#00–#19) chỉ chứa mã, pull request, hồ sơ chính thức và bài đăng công khai đã lưu trữ có thể kiểm chứng công khai. Các đóng góp cộng đồng và cáo buộc từ tin nhắn riêng được tách riêng ở đây để bảo đảm tính rõ ràng của chứng cứ.

- **Issue #1 · “Vụ việc chống lại Theo” (@opserx)** — Bản lưu nguyên văn bình luận cộng đồng được gửi tới kho này ngày 25 tháng 11 năm 2026, kèm ghi chú độ chính xác từ nguồn sơ cấp về PR #42450 và PR #41237. ([Đọc Issue #1 đã lưu trữ](../community/issue-1-the-case-against-theo.md))
- **Khiếu nại từ tin nhắn riêng và các đóng góp đang tiếp diễn** — Nhiều nhà phát triển đã gửi lời kể riêng về trải nghiệm của họ với @theo và T3 Code. Để duy trì tiêu chuẩn xác minh nghiêm ngặt, các báo cáo riêng tư vẫn được tách khỏi hồ sơ chứng cứ sơ cấp #00–#19 trừ khi được xác nhận độc lập bằng tài liệu công khai. Hãy gửi phát hiện có thể kiểm chứng hoặc xác nhận bản sửa upstream qua Pull Request hoặc GitHub Issue. ([Chính sách gửi và xác minh](../../CONTRIBUTING.md))

---

## Hồ sơ kỹ thuật chuyên sâu và chỉ mục tổng

Để xem diff mã nguồn từng dòng, SQL nguyên văn và danh mục đối chiếu chéo đầy đủ, hãy khám phá các kho lưu trữ tham chiếu được bảo tồn:

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 ảnh chứng cứ (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 nguồn sơ cấp (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### Theo dõi liên tục và đóng góp

Kho này được duy trì tích cực. Hoan nghênh các đính chính dựa trên sự thật, bản sửa upstream mới được hợp nhất kèm bằng chứng commit/PR hoặc chứng cứ sơ cấp mới qua Pull Request hoặc GitHub Issue — xem CONTRIBUTING.md.
