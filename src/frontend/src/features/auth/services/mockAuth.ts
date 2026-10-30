import { DEMO_ACCOUNT } from '@/features/auth/content'

/** Mock đăng nhập/đăng ký: không gọi mạng, chỉ so với tài khoản minh họa. */
export const MOCK_DELAY_MS = 500

export function mockLogin(email: string, password: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password)
    }, MOCK_DELAY_MS)
  })
}

/** Chỉ từ chối email của tài khoản minh họa (coi như đã tồn tại); không lưu gì. */
export function mockSignup(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(email !== DEMO_ACCOUNT.email), MOCK_DELAY_MS)
  })
}
