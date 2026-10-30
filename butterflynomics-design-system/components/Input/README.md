Ô nhập một dòng và nhiều dòng: cao 24, 28 hoặc 32px, viền mảnh vẽ bằng bóng nội, rê chuột đổi viền sang `navy`, nhãn `label` phía trên, gợi ý và lỗi bằng `caption`.

**Bạn cung cấp:** `<label>` gắn với ô qua `for`/`id`, văn bản gợi ý (`placeholder` chỉ là ví dụ, không thay nhãn), và thông báo lỗi nêu nguyên nhân kèm hướng xử lý.

**Dùng:** `bn-textarea` cho ô dán nội dung bài báo (chữ 15px như văn bản báo cáo); `bn-input` cho link và tham số, cỡ mặc định 28px, `bn-input--sm` 24px, `bn-input--lg` 32px cho ô dán link nổi bật ở trang chủ. Ô nhập số dùng thêm `bn-mono` và căn phải. Trạng thái lỗi đặt `aria-invalid="true"` và thêm `bn-error` ngay dưới ô, kèm `aria-describedby`.

**Không:** dùng màu đỏ một mình để báo lỗi (luôn có câu chữ); ô nhập không có nhãn; bỏ vòng focus; thêm `border` (viền ô vẽ bằng bóng nội).
