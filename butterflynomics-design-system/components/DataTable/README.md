Bảng xếp hạng phơi nhiễm: đường kẻ đậm `rule` ở đầu, nhãn cột `label`, số mono căn phải, hàng được chọn nền `navy-tint`.

**Bạn cung cấp:** `<caption>` (tiêu đề bảng), dữ liệu theo hàng, và với mỗi hàng điểm có dấu, chiều tác động, kênh truyền dẫn và mã trích dẫn dẫn tới bằng chứng.

**Dùng:** cột số dùng class `num` (mono, căn phải); mã chứng khoán dùng `tkr`. Chiều tác động thể hiện bằng ba thứ cùng lúc: số có dấu, thanh điểm (`bn-scorebar--negative` hoặc `--positive`) và nhãn `Badge`. Hàng đang chọn đặt `aria-selected="true"`. Mật độ mặc định: đệm dọc 10px.

**Không:** cột chỉ có màu; số căn trái; zebra stripe; tô nền cả hàng bằng đỏ hoặc xanh lá; bỏ cột trích dẫn (mọi dòng xếp hạng phải trỏ về bằng chứng).
