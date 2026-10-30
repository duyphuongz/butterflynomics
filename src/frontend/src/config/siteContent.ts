// Nội dung dùng chung toàn site: nav, footer, tuyên bố giới hạn, 404.
import { GITHUB_URL, LINKEDIN_URL, ROUTES } from '@/config/appConfig'
import type { Rich } from '@/types/content.types'

export const LIMIT_STATEMENT =
  'Butterflynomics là công cụ phân tích và học tập. Kết quả không phải lời khuyên đầu tư và không dự đoán giá cổ phiếu.'

export const SAMPLE_LABEL = '◆ Ví dụ minh họa, không phải dữ liệu thật'

export const nav = {
  brandLabel: 'Butterflynomics, về đầu trang',
  ariaLabel: 'Điều hướng chính',
  links: [
    { href: '#cach-hoat-dong', label: 'Cách hoạt động' },
    { href: '#bao-cao', label: 'Bản phân tích mẫu' },
    { href: '#nguyen-tac', label: 'Nguyên tắc' },
    { href: '#pham-vi', label: 'Phạm vi' },
  ],
  login: { href: ROUTES.login, label: 'Đăng nhập' },
  signup: { href: ROUTES.signup, label: 'Đăng ký' },
  homeLabel: 'Butterflynomics, về trang chủ',
}

export const footer = {
  noticeTitle: 'Giới hạn của công cụ',
  tagline:
    'Đọc một tin kinh tế, lần theo chuỗi tác động lên ngành và doanh nghiệp Mỹ, mỗi bước kèm bằng chứng.',
  taglineCta: { href: '#bat-dau', label: 'Phân tích một bài báo' },
  columns: [
    {
      id: 'ft-product',
      title: 'Sản phẩm',
      links: [{ href: '#bat-dau', label: 'Phân tích một bài báo' }],
    },
    {
      id: 'ft-method',
      title: 'Phương pháp',
      links: [
        { href: '#cach-hoat-dong', label: 'Cách hoạt động' },
        { href: '#pham-vi', label: 'Độ phủ dữ liệu' },
        { href: '#nguyen-tac', label: 'Giới hạn của phân tích' },
      ],
    },
    {
      id: 'ft-project',
      title: 'Dự án',
      links: [{ href: GITHUB_URL, label: 'Mã nguồn' }],
    },
  ],
  copyright: '© 2026 Nguyễn Phương Duy. Dự án cá nhân, mã nguồn mở.',
  contactLabel: 'Liên hệ',
  contact: [
    { href: GITHUB_URL, label: 'GitHub' },
    { href: LINKEDIN_URL, label: 'LinkedIn' },
  ],
  dataSource: [
    'Dữ liệu doanh nghiệp lấy từ báo cáo ',
    { term: '10-K', def: 'Báo cáo thường niên bắt buộc của công ty niêm yết Mỹ.' },
    ' nộp cho ',
    { term: 'SEC', def: 'Ủy ban Chứng khoán Mỹ.' },
    '.',
  ] as Rich,
  themeLabel: 'Màu',
  themeLight: 'Mặc định',
  themeCb: 'Dễ phân biệt màu',
}

export const notFound = {
  title: 'Không tìm thấy trang này',
  body: 'Địa chỉ không tồn tại. Quay về trang chủ.',
  home: 'Về trang chủ',
}
