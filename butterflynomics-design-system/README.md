*First the panic. Then the pattern.*

Butterflynomics trông như một terminal dữ liệu in trên giấy trắng: đen, trắng, một màu navy duy nhất, số liệu thẳng hàng, không trang trí. Tin kinh tế đã đủ ồn; giao diện phải im lặng để người đọc thấy mô hình.

## Nguyên tắc nền

- Bắt đầu mọi trang từ `surface` (trắng). Chữ chính `ink`, chữ phụ `ink-muted`. Không dùng nền tối cho nội dung; nền tối chỉ dành cho thanh trên cùng (`surface-inverse`) và chú thích thuật ngữ nổi.
- `navy` là màu nhấn duy nhất của thương hiệu. Dùng cho một nút chính mỗi màn hình, liên kết, mã trích dẫn và phần tử đang được chọn. Không dùng `navy` làm nền mảng lớn.
- Đỏ và xanh lá chỉ mang một nghĩa: chiều tác động. `negative` là bất lợi, `positive` là có lợi. Không dùng chúng để trang trí, làm nút, hay báo lỗi hệ thống.
- Mọi bản phân tích kết thúc bằng một dòng tuyên bố giới hạn ở cỡ `caption`: "Butterflynomics là công cụ phân tích và học tập. Kết quả không phải lời khuyên đầu tư và không dự đoán giá cổ phiếu."

## Màu

- Nền: `surface` cho trang và thẻ; `surface-subtle` cho hàng khi rê chuột và khối phụ; `surface-sunken` cho tiêu đề nhóm và đường ray thanh điểm.
- Đường kẻ: `border` (1px, trang trí) giữa các hàng; `border-strong` cho viền điều khiển (ô nhập, nút phụ); `rule` (2px, `stroke-rule`) làm đường kẻ đậm trên đầu bảng và đầu mỗi khối báo cáo.
- Cảnh báo dùng `caution` trên `caution-tint`: độ phủ thấp, liên kết thực thể yếu, nhận định suy đoán.
- Đồ thị dùng thang `exposure-1` đến `exposure-5` (navy nhạt đến đậm) cho độ lớn phơi nhiễm *(mức độ một công ty dính dáng tới một cú sốc)*. Thang này chỉ để tô nút, không dùng ở chỗ khác.
- Có hai theme. `light` là mặc định. `light-cb` đổi `positive` sang xanh dương và `negative` sang cam đậm, để người khó phân biệt đỏ và xanh lá vẫn đọc được; bật nó qua `data-theme="light-cb"` và cung cấp công tắc ở phần cài đặt.
- Mọi cặp chữ trên nền trong bảng token đạt tối thiểu 4.5:1 ở cả hai theme. Viền điều khiển, vòng focus và cạnh đồ thị đạt 3:1. Không tự chế cặp màu ngoài bảng token.

## Chữ

- Tiêu đề dùng serif *(chữ có chân, như chữ báo in)*: `display`, `h1`, `h2`, `h3`, font Source Serif 4. Tiêu đề không viết hoa toàn bộ.
- Thân và giao diện dùng sans *(chữ không chân)*: `body`, `body-strong`, `small`, `label`, `caption`, font IBM Plex Sans.
- Số liệu dùng mono *(mỗi ký tự cùng độ rộng)*: `data-lg`, `data`, `data-sm`, font IBM Plex Mono. Mọi cột số, mã chứng khoán, điểm phơi nhiễm, mã trích dẫn đặt bằng mono và căn phải, để chữ số thẳng hàng. Số nằm trong câu văn thì giữ sans và bật `font-variant-numeric: lining-nums tabular-nums slashed-zero` (số thẳng hàng, số 0 có gạch để không nhầm với chữ O).
- Nhãn nút và nội dung ô nhập dùng `button` (13px, đậm vừa); cỡ nhỏ 12px, cỡ lớn 14px.
- `label` luôn viết hoa toàn bộ bằng CSS (`text-transform: uppercase`), không gõ hoa trong nội dung.
- Cả ba font hỗ trợ tiếng Việt. Giữ line-height trong bảng token (không thấp hơn 1.33) để dấu của chữ hoa không đè dòng trên.
- Font được tải từ Google Fonts qua `bundle.css`. Khi triển khai thật, tự host các file woff2 và khai báo trong `type.fonts`.

## Hình khối và mật độ

- Thẻ, bảng, khối thông báo và thanh trên cùng giữ góc vuông (`radius-0`). Điều khiển và nhãn nhỏ (nút, ô nhập, nhãn trạng thái, mã trích dẫn) bo nhẹ `radius-1` (4px). Không bo lớn hơn. `radius-round` chỉ dành cho chấm trạng thái và nút tròn trong đồ thị.
- Chiều cao điều khiển theo ba bậc: `control-sm` 24px (trong bảng, thanh công cụ), `control-md` 28px (mặc định), `control-lg` 32px (ô dán link và nút Phân tích nổi bật). Viền nút và ô nhập vẽ bằng bóng nội 1px (không dùng `border`), để rê chuột, focus, lỗi đổi màu viền mà kích thước không nhảy.
- Viền mảnh: `stroke-hairline` (1px) cho viền và đường kẻ hàng. Bóng đổ chỉ có `shadow-popover`, dành riêng cho thứ nổi lên trên trang (chú thích thuật ngữ, hộp bằng chứng). Thẻ và bảng phẳng.
- Thẻ (`bn-panel`) không có viền màu một bên; thay vào đó dùng đường kẻ đậm `rule` trên đầu thẻ.
- Mật độ vừa phải: bảng và đồ thị dày, văn bản báo cáo thoáng. Cột chữ của bản phân tích rộng tối đa `measure-report`; vùng nội dung tối đa `page-max`; khoảng cách theo thang `space-1` đến `space-8`, mặc định `space-4` trong thẻ và `space-6` giữa các mục.
- Không dùng gradient, hình mờ, ảnh minh họa, emoji.

## Nút

- Bốn kiểu, theo mức nhấn giảm dần: `bn-btn--primary` (navy đặc, một nút mỗi màn hình), `bn-btn` (nền trắng, viền `border-strong`), `bn-btn--secondary` (nền `surface-sunken`, không viền), `bn-btn--ghost` (không nền, chữ `ink-muted`).
- Rê chuột đổi viền nút sang `navy`; nhấn tô `navy-tint`. Nút được chọn trong nhóm đặt `aria-pressed="true"`: viền `navy` và nền `navy-tint`.
- Trạng thái xảy ra tức thì, không chuyển cảnh. Đang xử lý đặt `aria-busy="true"`: nhãn tự có dấu "…", không có hoạt ảnh.
- Nhóm hai đến bốn nút liền nhau dùng `bn-btn-group`, chỉ bo góc ở hai đầu.

## Chiều tác động: bất lợi và có lợi

Không bao giờ để màu gánh nghĩa một mình.

- Nhãn và ô số luôn có ký hiệu cùng chữ: `▼ Bất lợi` (`negative`), `▲ Có lợi` (`positive`), `● Trung tính`, `◆ Cảnh báo` (`caution`), `? Suy đoán` (nét đứt).
- Số có dấu: `+0.31`, `−0.27` (dùng dấu trừ U+2212). Màu theo dấu.
- Thanh điểm (`bn-scorebar`) kèm số bên cạnh, không đứng một mình.
- Cạnh đồ thị: có lợi là nét liền, bất lợi là nét đứt, quan hệ không có chiều là nét xám liền.
- Đỏ và xanh lá trong theme `light` có độ sáng gần nhau; chính vì vậy các quy tắc trên là bắt buộc, không phải gợi ý.

## Bản đồ lan truyền

- Nút sự kiện gốc tô `exposure-5`. Nút ngành và công ty tô theo điểm phơi nhiễm, từ `exposure-1` đến `exposure-5`. Nhãn nút dùng `ink` trên mức 1 đến 3, dùng `on-navy` trên mức 4 đến 5.
- Cạnh có chiều tô `edge-positive` hoặc `edge-negative`; độ dày cạnh theo trọng số, từ `stroke-edge-min` đến `stroke-edge-max`. Cạnh cấu trúc tô `edge-neutral`.
- Nút đang chọn có viền `stroke-rule`. Bấm cạnh mở hộp bằng chứng (`bn-evidence`); mọi cạnh phải có bằng chứng.
- Mỗi đồ thị đi kèm chú giải (`bn-legend`) ghi rõ thang màu, nét liền và nét đứt.

## Logo

- Logo là wordmark Butterflynomics đặt bằng chữ đậm, trong đó dấu chấm của chữ "i" được thay bằng một con bướm hình học bốn tam giác. Con bướm tô `navy` trên nền sáng; không đặt nó ở chỗ nào khác ngoài logo, ký hiệu `mark` và favicon.
- Dùng `butterflynomics-wordmark.svg` trên nền sáng và `butterflynomics-wordmark-inverse.svg` trên `surface-inverse`. Dùng `butterflynomics-mark.svg` (vuông, đen, bướm trắng) cho favicon và chỗ hẹp.
- Chừa quanh logo ít nhất bằng chiều cao chữ "B". Chiều cao tối thiểu của wordmark là 16px.
- Không kéo giãn, đổi màu, thêm hiệu ứng, hoặc đặt con bướm làm họa tiết nền.

## Giọng văn

Trung tính, ngắn gọn, nói thẳng như một công cụ phân tích. Câu mệnh lệnh cho nút và nhãn; câu khẳng định cho báo cáo.

- Viết hoa theo kiểu câu tiếng Việt: chỉ chữ đầu và tên riêng. "Dán link hoặc nội dung bài báo", không phải "Dán Link Hoặc Nội Dung Bài Báo".
- Nút là động từ ngắn: "Phân tích", "Đặt lại", "Xem bằng chứng", "Mở tài liệu gốc".
- Không dấu chấm than, không emoji, không lời chào, không "Rất tiếc". Lỗi nói nguyên nhân rồi hướng xử lý: "Không đọc được nội dung từ link này. Dán trực tiếp văn bản bài báo."
- Nói giới hạn trước khi bị hỏi. Mẫu có sẵn: "Chưa có mô hình truyền dẫn cho loại sự kiện này, không xếp hạng phơi nhiễm." Mục luôn có trong báo cáo: "Điều gì có thể làm phân tích này sai", "Độ phủ và độ tin cậy", "Cần theo dõi tiếp".
- Không bao giờ viết ngôn ngữ khuyến nghị đầu tư ("nên mua", "nên bán", "giá sẽ tăng").
- Thuật ngữ chuyên ngành đi kèm chú thích ngắn ở lần xuất hiện đầu bằng thành phần `Term`: di chuột vào để xem. Chú thích dài tối đa một câu.
- Số dùng dấu chấm thập phân (`0.27`), phần trăm có ký hiệu `%`, ngày dạng `10/10/2026`.

## Chuyển động

Gần như không có. Trạng thái đổi tức thì (rê chuột, chọn, mở hộp). Không hoạt ảnh vào trang, không số nhảy, không hiệu ứng lan tỏa. Ngoại lệ duy nhất: thanh tiến độ phân tích có thể cập nhật theo từng bước xử lý, không có chuyển cảnh.

## Biểu tượng

Ký hiệu trạng thái dùng glyph chữ (▲ ▼ ● ◆ ?). Biểu tượng giao diện khác (tìm kiếm, mở rộng, đóng, tải về) dùng nét 1.5px, đầu nét vuông, tô `ink` hoặc `ink-muted`, kích thước 16px; bộ biểu tượng này chưa được đóng gói trong hệ thống. Không dùng emoji, không dùng biểu tượng hai màu.

## Trợ năng

- Vòng focus bàn phím: 2px `focus-ring`, cách phần tử 2px; trên `surface-inverse` dùng `focus-ring-inverse`.
- Mọi biểu đồ và đồ thị có bảng dữ liệu tương đương hoặc nhãn văn bản cho từng nút.
- Chú thích thuật ngữ mở được bằng bàn phím (focus) chứ không chỉ rê chuột.
