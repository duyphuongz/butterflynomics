// Copy và dữ liệu minh họa riêng của landing. Chữ dùng chung toàn site nằm ở config/siteContent.ts.
// Copy lấy nguyên văn từ docs/design/landing-reference.body.html; placeholder đã thay theo prompt 001.

import type { Evidence, GraphEdge, GraphNode, ReportRow, Rich } from '@/types/content.types'

export const hero = {
  label: 'GraphRAG cho tin kinh tế Mỹ',
  title: 'Một tin kinh tế. Cả một chuỗi tác động.',
  lead: 'Butterflynomics đọc một sự kiện như thuế quan, lãi suất hay lệnh cấm vận, rồi lần theo từng mắt xích: sự kiện chạm vào ngành nào, ngành ấy kéo theo doanh nghiệp nào, và mỗi liên kết dựa trên bằng chứng gì.',
  slogan: 'First the panic. Then the pattern.',
  form: {
    ariaLabel: 'Phân tích một bài báo',
    label: 'Dán link hoặc nội dung bài báo',
    placeholder: 'https://… hoặc dán đoạn văn bản',
    submit: 'Phân tích',
    hint: 'Hỗ trợ bài báo tiếng Anh về thị trường Mỹ. Mỗi lần phân tích mất khoảng dự kiến 30–60 giây.',
    noticeTitle: 'Chưa có bản demo',
    notice: 'Bản demo đang được phát triển.',
    noticeLink: 'Theo dõi tiến độ trên GitHub',
  },
  graphTitle: 'Bản đồ lan truyền',
}

export const how = {
  label: 'Cách hoạt động',
  title: 'Từ một bài báo đến một bản đồ có bằng chứng',
  lead: 'Bốn bước, mỗi bước để lại dấu vết có thể kiểm tra lại.',
  steps: [
    {
      n: '01',
      title: 'Đọc sự kiện',
      body: [
        'Tách bài báo thành sự kiện có cấu trúc: loại sự kiện, đối tượng bị nhắm tới, mức độ, thời điểm hiệu lực.',
      ] as Rich,
    },
    {
      n: '02',
      title: 'Liên kết thực thể',
      body: [
        'Gắn sự kiện vào ',
        {
          term: 'đồ thị tri thức',
          def: 'Mạng lưới quan hệ giữa ngành, sản phẩm, công ty.',
        },
        ' dựng từ báo cáo ',
        {
          term: '10-K',
          def: 'Báo cáo thường niên bắt buộc của công ty niêm yết Mỹ.',
        },
        '.',
      ] as Rich,
    },
    {
      n: '03',
      title: 'Lần theo kênh truyền dẫn',
      body: [
        'Đi qua từng cạnh của đồ thị: chuỗi cung ứng, tỉ trọng doanh thu theo khu vực, đầu vào sản xuất. Cạnh nào cũng có chiều và trọng số.',
      ] as Rich,
    },
    {
      n: '04',
      title: 'Viết báo cáo kèm trích dẫn',
      body: [
        'Tổng hợp thành bản phân tích có mã trích dẫn tới đoạn tài liệu gốc, kèm mục giới hạn và độ tin cậy.',
      ] as Rich,
    },
  ],
}

export const report = {
  label: 'Bản phân tích mẫu',
  title: 'Mỗi con số trỏ về một đoạn tài liệu',
  lead: [
    'Bảng xếp hạng ',
    { term: 'phơi nhiễm', def: 'Mức độ một công ty dính dáng tới cú sốc.' },
    ' không đứng một mình. Bấm vào mã trích dẫn để mở đúng đoạn trong báo cáo gốc đã sinh ra con số đó.',
  ] as Rich,
  sampleNote: '◆ Số liệu trong bảng là ví dụ minh họa cho giao diện.',
  caption: 'Bị ảnh hưởng bởi thuế linh kiện bán dẫn',
  columns: {
    company: 'Doanh nghiệp',
    channel: 'Kênh truyền dẫn',
    direction: 'Chiều',
    score: 'Điểm',
    magnitude: 'Độ lớn',
    source: 'Nguồn',
  },
}

export const principles = {
  label: 'Nguyên tắc',
  title: 'Im lặng để thấy mô hình',
  items: [
    {
      title: 'Mọi cạnh có bằng chứng',
      body: 'Không có liên kết nào xuất hiện trên bản đồ nếu không trỏ được về một đoạn tài liệu gốc. Bấm cạnh để mở hộp bằng chứng.',
    },
    {
      title: 'Nói giới hạn trước',
      body: 'Mỗi báo cáo luôn có ba mục: điều gì có thể làm phân tích này sai, độ phủ và độ tin cậy, cần theo dõi tiếp.',
    },
    {
      title: 'Không khuyến nghị đầu tư',
      body: 'Butterflynomics giải thích cơ chế truyền dẫn, không dự đoán giá và không nói nên mua hay bán.',
    },
  ],
}

export const scope = {
  label: 'Phạm vi hiện tại',
  title: 'Bắt đầu hẹp, làm cho đúng',
  lead: 'Bản đầu tiên tập trung vào một thị trường và một nhóm sự kiện, để mỗi kết luận đều kiểm chứng được.',
  items: [
    { term: 'Thị trường', value: 'Cổ phiếu Mỹ', mono: false },
    { term: 'Nền tảng', value: 'Web', mono: false },
    { term: 'Nguồn dữ liệu', value: 'Báo cáo 10-K, tin tức', mono: false },
    { term: 'Loại sự kiện', value: 'Thuế quan, kiểm soát xuất khẩu, lãi suất', mono: false },
    { term: 'Số công ty trong đồ thị', value: '~80', note: ' (mục tiêu MVP)', mono: true },
    { term: 'Trạng thái', value: 'Đang phát triển', mono: false },
  ],
}

export const cta = {
  title: 'Tin tiếp theo, đừng đoán. Lần theo nó.',
  lead: 'Dán một bài báo và xem chuỗi tác động hiện ra kèm bằng chứng.',
  source: 'Xem mã nguồn',
}

// ---- Dữ liệu minh họa -------------------------------------------------------

const ILLUSTRATIVE = 'Đoạn trích minh họa cho giao diện, không phải trích dẫn thật.'

export const evidence: Evidence[] = [
  {
    id: 'e1',
    code: '[1]',
    quote: `${ILLUSTRATIVE} Nội dung nói về nhu cầu thay thế linh kiện nhập khẩu bằng sản xuất trong nước.`,
    source: 'Tài liệu minh họa 1, phần chuỗi cung ứng',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e2',
    code: '[2]',
    quote: `${ILLUSTRATIVE} Nội dung nói về chi phí đầu vào tăng sau khi áp thuế linh kiện.`,
    source: 'Tài liệu minh họa 2, phần chi phí đầu vào',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e3',
    code: '[3]',
    quote: `${ILLUSTRATIVE} Nội dung nói về giá bán lẻ tăng và nhu cầu giảm.`,
    source: 'Tài liệu minh họa 3, phần bán lẻ',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e4',
    code: '[4]',
    quote: `${ILLUSTRATIVE} Liên kết thực thể yếu: tên nhà cung cấp chỉ khớp một phần.`,
    source: 'Tài liệu minh họa 4, phần nhà cung cấp',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e5',
    code: '[5]',
    quote: `${ILLUSTRATIVE} Nội dung nói về nhóm hàng điện tử tiêu dùng chịu thuế mới.`,
    source: 'Tài liệu minh họa 5, danh mục hàng hóa',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e6',
    code: '[6]',
    quote: `${ILLUSTRATIVE} Nội dung nói về kênh bán lẻ điện máy nhập thiết bị đã gắn linh kiện chịu thuế.`,
    source: 'Tài liệu minh họa 6, danh mục hàng hóa',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e7',
    code: '[7]',
    quote: `${ILLUSTRATIVE} Nội dung nói về ngành sản xuất chip trong nước thuộc đối tượng được thay thế hàng nhập.`,
    source: 'Tài liệu minh họa 7, danh mục hàng hóa',
    date: '01/2026 (minh họa)',
  },
  {
    id: 'e8',
    code: '[8]',
    quote: `${ILLUSTRATIVE} Nội dung nói về thiết bị công nghiệp, liên hệ với sự kiện còn mờ.`,
    source: 'Tài liệu minh họa 8, danh mục hàng hóa',
    date: '01/2026 (minh họa)',
  },
]

export const graph = {
  title: 'Đồ thị lan truyền minh họa từ sự kiện thuế qua ngành tới doanh nghiệp',
  nodes: [
    {
      id: 'ev',
      kind: 'event',
      label: 'Mỹ áp thuế mới lên linh kiện bán dẫn nhập khẩu',
      score: 0.9,
    },
    { id: 's1', kind: 'sector', label: 'Điện tử tiêu dùng', score: 0.7 },
    { id: 's2', kind: 'sector', label: 'Bán lẻ điện máy', score: 0.5 },
    { id: 's3', kind: 'sector', label: 'Sản xuất chip nội địa', score: 0.7 },
    { id: 's4', kind: 'sector', label: 'Thiết bị công nghiệp', score: 0.1 },
    { id: 'c1', kind: 'company', label: 'Hãng lắp ráp thiết bị A', score: 0.5 },
    { id: 'c2', kind: 'company', label: 'Chuỗi bán lẻ B', score: 0.3 },
    { id: 'c3', kind: 'company', label: 'Xưởng đúc C', score: 0.5 },
    { id: 'c4', kind: 'company', label: 'Nhà cung cấp D', score: 0.1 },
  ] satisfies GraphNode[],
  edges: [
    { from: 'ev', to: 's1', direction: 0, weight: 0.7, evidenceId: 'e5' },
    { from: 'ev', to: 's2', direction: 0, weight: 0.5, evidenceId: 'e6' },
    { from: 'ev', to: 's3', direction: 0, weight: 0.7, evidenceId: 'e7' },
    { from: 'ev', to: 's4', direction: 0, weight: 0.1, evidenceId: 'e8' },
    { from: 's1', to: 'c1', direction: -1, weight: 0.27, evidenceId: 'e2' },
    { from: 's2', to: 'c2', direction: -1, weight: 0.12, evidenceId: 'e3' },
    { from: 's3', to: 'c3', direction: 1, weight: 0.31, evidenceId: 'e1' },
    { from: 's4', to: 'c4', direction: 0, weight: 0.04, evidenceId: 'e4' },
  ] satisfies GraphEdge[],
  legend: {
    exposure: 'Phơi nhiễm:',
    exposureRange: 'thấp đến cao',
    positive: '▲ Có lợi, nét liền',
    negative: '▼ Bất lợi, nét đứt',
    neutral: 'Quan hệ cấu trúc, nét xám',
    thickness: 'Độ dày nét = trọng số cạnh',
  },
  tableCaption: 'Dữ liệu tương đương của bản đồ lan truyền',
  tableHead: {
    from: 'Từ',
    to: 'Đến',
    direction: 'Chiều',
    weight: 'Trọng số',
    evidence: 'Bằng chứng',
  },
  directionLabel: { '1': '▲ Có lợi', '-1': '▼ Bất lợi', '0': '● Cấu trúc' } as Record<
    string,
    string
  >,
}

export const reportRows: ReportRow[] = [
  {
    company: 'Xưởng đúc C',
    ticker: 'CTYC',
    channel: 'Thay thế hàng nhập khẩu',
    kind: 'positive',
    score: 0.31,
    evidenceId: 'e1',
  },
  {
    company: 'Hãng lắp ráp thiết bị A',
    ticker: 'CTYA',
    channel: 'Chi phí đầu vào tăng',
    kind: 'negative',
    score: -0.27,
    evidenceId: 'e2',
  },
  {
    company: 'Chuỗi bán lẻ B',
    ticker: 'CTYB',
    channel: 'Giá bán lẻ, nhu cầu giảm',
    kind: 'negative',
    score: -0.12,
    evidenceId: 'e3',
  },
  {
    company: 'Nhà cung cấp D',
    ticker: 'CTYD',
    channel: 'Liên kết thực thể yếu',
    kind: 'speculative',
    score: 0.04,
    evidenceId: 'e4',
  },
]
