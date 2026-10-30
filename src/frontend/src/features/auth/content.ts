// Nội dung trang đăng nhập và đăng ký. Tài khoản dưới đây là minh họa, chưa có máy chủ.

export const DEMO_ACCOUNT = { email: 'demo@butterflynomics.dev', password: 'demo1234' }

export const demoNotice = {
  title: '◆ Ví dụ minh họa, không phải dữ liệu thật',
  body: `Chưa kết nối máy chủ; không có dữ liệu nào được gửi đi. Tài khoản minh họa: ${DEMO_ACCOUNT.email} / ${DEMO_ACCOUNT.password}.`,
}

export const fieldErrors = {
  emailEmpty: 'Nhập email.',
  emailInvalid: 'Email không hợp lệ. Kiểm tra lại địa chỉ.',
  passwordEmpty: 'Nhập mật khẩu.',
}

export const login = {
  title: 'Đăng nhập',
  formLabel: 'Đăng nhập',
  email: 'Email',
  password: 'Mật khẩu',
  remember: 'Lưu mật khẩu',
  submit: 'Đăng nhập',
  errors: fieldErrors,
  successTitle: 'Đăng nhập thành công (minh họa)',
  successBody: 'Chưa có trang sau đăng nhập.',
  successLink: 'Về trang chủ',
  failTitle: 'Không đăng nhập được',
  failBody: 'Email hoặc mật khẩu không đúng. Kiểm tra lại rồi thử lần nữa.',
  switchText: 'Chưa có tài khoản?',
  switchLink: 'Đăng ký',
}

export const passwordRules = {
  minLength: 'tối thiểu 8 ký tự',
  upper: 'chữ viết hoa',
  special: 'ký tự đặc biệt',
}

export const signup = {
  title: 'Đăng ký',
  formLabel: 'Đăng ký',
  email: 'Email',
  password: 'Mật khẩu',
  confirm: 'Nhập lại mật khẩu',
  submit: 'Đăng ký',
  passwordHint: 'Tối thiểu 8 ký tự, có chữ viết hoa và ký tự đặc biệt.',
  strengthLabel: 'Độ mạnh',
  strengthLevels: ['Yếu', 'Trung bình', 'Khá', 'Mạnh'],
  errors: {
    ...fieldErrors,
    passwordWeak: 'Mật khẩu còn thiếu: ',
    confirmEmpty: 'Nhập lại mật khẩu.',
    confirmMismatch: 'Mật khẩu nhập lại không khớp. Kiểm tra lại.',
  },
  successTitle: 'Đăng ký thành công (minh họa)',
  successBody: 'Tài khoản chưa được lưu vì chưa kết nối máy chủ.',
  successLink: 'Đến trang đăng nhập',
  takenTitle: 'Không đăng ký được',
  takenBody: 'Email này đã được đăng ký. Đăng nhập hoặc dùng email khác.',
  switchText: 'Đã có tài khoản?',
  switchLink: 'Đăng nhập',
}
