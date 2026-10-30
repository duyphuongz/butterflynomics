Thanh trên cùng nền đen `surface-inverse`: wordmark đảo màu bên trái, bốn mục điều hướng, nút chính phía phải.

**Bạn cung cấp:** `butterflynomics-wordmark-inverse.svg` (nhúng inline hoặc `<img>`), danh sách mục điều hướng (Tin nóng, Phân tích, Sổ dự đoán, Kiểm chứng) với `aria-current="page"` trên mục đang mở, và một nút `bn-btn--inverse`.

**Dùng:** cao 48px, cố định ở đầu trang. Mục điều hướng viết hoa bằng CSS, mục hiện tại trắng có gạch chân 2px. Đặt class `bn-on-inverse` lên thanh để vòng focus chuyển sang `focus-ring-inverse`.

**Không:** nút `navy` trên thanh (không đọc được trên nền đen); thêm mục thứ năm; chữ tìm kiếm hay hồ sơ người dùng (MVP không có tài khoản).
