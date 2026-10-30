import { fieldErrors, passwordRules } from '@/features/auth/content'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Unicode để chữ có dấu tiếng Việt không bị tính là ký tự đặc biệt.
const UPPER_RE = /\p{Lu}/u
const LOWER_RE = /\p{Ll}/u
const DIGIT_RE = /\p{N}/u
const SPECIAL_RE = /[^\p{L}\p{N}\s]/u

export const PASSWORD_MIN = 8

/** Trả câu lỗi cho email (đã trim), hoặc undefined nếu hợp lệ. */
export function emailError(value: string): string | undefined {
  if (!value) return fieldErrors.emailEmpty
  if (!EMAIL_RE.test(value)) return fieldErrors.emailInvalid
  return undefined
}

/** Các yêu cầu bắt buộc của mật khẩu đăng ký mà giá trị còn thiếu. */
export function missingPasswordRules(value: string): string[] {
  const missing: string[] = []
  if (value.length < PASSWORD_MIN) missing.push(passwordRules.minLength)
  if (!UPPER_RE.test(value)) missing.push(passwordRules.upper)
  if (!SPECIAL_RE.test(value)) missing.push(passwordRules.special)
  return missing
}

/** Độ mạnh 0–4. 0 khi rỗng; chỉ đạt 3–4 khi đủ yêu cầu bắt buộc. */
export function passwordStrength(value: string): 0 | 1 | 2 | 3 | 4 {
  if (!value) return 0
  const points = [
    value.length >= PASSWORD_MIN,
    UPPER_RE.test(value),
    LOWER_RE.test(value),
    DIGIT_RE.test(value),
    SPECIAL_RE.test(value),
    value.length >= 12,
  ].filter(Boolean).length
  if (missingPasswordRules(value).length > 0) return points >= 3 ? 2 : 1
  return points >= 5 ? 4 : 3
}
