Bản đồ lan truyền: đồ thị từ sự kiện gốc qua ngành tới công ty, nút tô theo điểm phơi nhiễm, cạnh tô theo chiều tác động.

**Bạn cung cấp:** danh sách nút (loại, nhãn, điểm phơi nhiễm 0 đến 1), danh sách cạnh (nguồn, đích, chiều +1 hoặc −1, trọng số, mã bằng chứng), và nút đang chọn.

**Dùng:** nút tô `bn-node--1` đến `--5` theo điểm (0 đến 0.2, đến 0.4, đến 0.6, đến 0.8, đến 1); nhãn nút `bn-node-text`, đổi sang `--inverse` ở mức 4 và 5. Cạnh `bn-edge--positive` (nét liền), `--negative` (nét đứt), `--neutral`; độ dày `stroke-width` nội suy từ `stroke-edge-min` đến `stroke-edge-max` theo trọng số. Cạnh có chiều có nhãn số có dấu `bn-edge-label`. Luôn kèm chú giải `bn-legend`. Bấm cạnh mở `Citation` hộp bằng chứng.

**Không:** cạnh không có bằng chứng; dùng màu đỏ hoặc xanh lá cho nút (nút chỉ có thang navy); bỏ chú giải; cố hiển thị hơn khoảng 30 nút một lúc (thu gọn bằng nhóm ngành).
