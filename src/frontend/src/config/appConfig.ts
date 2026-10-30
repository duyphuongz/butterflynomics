// Cấu hình cấp ứng dụng: URL ngoài do tác giả cung cấp, đường dẫn các route.
export const GITHUB_URL = 'https://github.com/duyphuongz'
export const LINKEDIN_URL = 'https://linkedin.com/in/duyphuongz'

/** Nguồn duy nhất cho đường dẫn route; AppRoutes và liên kết nội bộ đều dùng. */
export const ROUTES = {
  home: '/',
  login: '/dang-nhap',
  signup: '/dang-ky',
} as const
