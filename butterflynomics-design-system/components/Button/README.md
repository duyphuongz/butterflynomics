Nút hành động: cao 24, 28 hoặc 32px, bốn kiểu (chính navy, mặc định viền, phụ nền xám, ghost), thêm nút bật/tắt và nhóm nút.

**Bạn cung cấp:** nhãn là động từ ngắn ("Phân tích", "Đặt lại", "Xem bằng chứng"); `disabled` khi chưa đủ điều kiện; `aria-pressed` cho nút bật/tắt; `aria-busy="true"` khi đang xử lý (nhãn tự thêm dấu "…", không có hoạt ảnh); `aria-label` cho nút chỉ có biểu tượng.

**Dùng:**
- `bn-btn--primary`: hành động chính duy nhất của màn hình (Phân tích).
- `bn-btn` (mặc định, viền `border-strong`): hành động phụ cùng hàng với nút chính. Rê chuột đổi viền sang `navy`; nhấn tô `navy-tint`.
- `bn-btn--secondary` (nền `surface-sunken`, không viền): hành động phụ trong khối đã có nhiều đường kẻ.
- `bn-btn--ghost` (không nền, chữ `ink-muted`): hành động nhẹ trong bảng và thanh công cụ; rê chuột hiện nền và chữ chuyển sang `ink`.
- `bn-btn--inverse`: chỉ trên thanh `surface-inverse`, vì `navy` không đọc được trên nền đen.
- Cỡ: `bn-btn--sm` (24px, `control-sm`), mặc định 28px (`control-md`), `bn-btn--lg` (32px, `control-lg`). Nút biểu tượng thêm `bn-btn--icon` (vuông, rộng bằng cao).
- Nhóm nút: bọc trong `bn-btn-group`; nút đang chọn đặt `aria-pressed="true"` (viền và nền `navy`). Dùng cho chọn một trong vài chế độ (Cơ bản / Chuyên sâu, cửa sổ ngày).

**Không:** hai nút chính trong cùng một màn hình; nút chỉ có biểu tượng mà không có `aria-label`; đỏ hoặc xanh lá làm nền nút (hai màu này dành cho chiều tác động); nhãn viết hoa toàn bộ hoặc có dấu chấm than; thêm viền bằng `border` (viền nút vẽ bằng bóng nội để trạng thái không làm nút nhảy kích thước).
