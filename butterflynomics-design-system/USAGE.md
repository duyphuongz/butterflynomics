# Cách dùng thư mục này

Thư mục này là bản xuất của Design System Butterflynomics, tự đủ, không cần mạng.

## Nạp vào một trang web

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<body class="bn"> ... </body>
```

- `tokens.css` chứa biến màu, khoảng cách, góc, viền, bóng, cỡ chữ (`--ink`, `--navy`, `--space-4`, `--control-md`...) và lớp kiểu chữ (`.display`, `.h1`, `.body`, `.data`...). Nó cũng nạp font từ `fonts/fonts.css`.
- `components/bundle.css` chứa lớp thành phần có tiền tố `bn-` (`bn-btn`, `bn-input`, `bn-badge`, `bn-table`, `bn-cite`, `bn-term`, `bn-notice`, `bn-topbar`, các lớp đồ thị `bn-node`, `bn-edge`). Đặt class `bn` lên phần tử gốc của trang.
- Theme mặc định là `light`. Để dùng bản an toàn cho mù màu, đặt `data-theme="light-cb"` lên `<html>` hoặc phần tử gốc.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `README.md` | Brand book: quy tắc màu, chữ, nút, đồ thị, logo, giọng văn |
| `tokens.json` | Nguồn của mọi token (tokens.css được sinh từ file này) |
| `tokens.css` | Biến CSS và lớp kiểu chữ |
| `components/bundle.css` | Kiểu của các thành phần |
| `components/<Tên>/README.md` | Hướng dẫn dùng từng thành phần |
| `components/<Tên>/preview.html` | Xem trực tiếp thành phần; mở bằng trình duyệt |
| `components/Cover/preview.html` | Bìa của hệ thống |
| `assets/Logo/` | Wordmark, bản đảo màu, ký hiệu vuông (SVG) |
| `fonts/` | IBM Plex Sans, IBM Plex Mono, Source Serif 4 (woff2, giấy phép OFL trong `fonts/licenses/`) |
| `index.html` | Trang mục lục mở nhanh các bản xem |

## Sửa token

Sửa `tokens.json` rồi cập nhật `tokens.css` cho khớp. Tệp `tokens.css` trong thư mục này được sinh từ `tokens.json`; mọi giá trị nên đổi ở `tokens.json` trước.

## Thành phần chưa có

Thanh trượt kịch bản giả định, thanh tiến độ phân tích, khung biểu đồ CAR, bộ biểu tượng giao diện, theme tối.
