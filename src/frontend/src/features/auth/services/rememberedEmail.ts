/** "Lưu mật khẩu" chỉ nhớ email; mật khẩu để trình duyệt tự lưu. */
const REMEMBER_KEY = 'bn-login-email'

export function readRememberedEmail(): string {
  try {
    return localStorage.getItem(REMEMBER_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveRememberedEmail(email: string | null) {
  try {
    if (email) localStorage.setItem(REMEMBER_KEY, email)
    else localStorage.removeItem(REMEMBER_KEY)
  } catch {
    /* storage lỗi: chỉ mất tính năng ghi nhớ */
  }
}
