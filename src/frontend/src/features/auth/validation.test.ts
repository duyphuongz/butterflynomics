import { describe, expect, it } from 'vitest'
import { missingPasswordRules, passwordStrength } from './validation'

describe('missingPasswordRules', () => {
  it('đủ yêu cầu thì không thiếu gì', () => {
    expect(missingPasswordRules('Abcdef!1')).toEqual([])
  })

  it('liệt kê đúng yêu cầu còn thiếu', () => {
    expect(missingPasswordRules('Abcdefgh')).toEqual(['ký tự đặc biệt'])
    expect(missingPasswordRules('abcdef!1')).toEqual(['chữ viết hoa'])
    expect(missingPasswordRules('Ab!1')).toEqual(['tối thiểu 8 ký tự'])
  })

  it('chữ có dấu tiếng Việt không tính là ký tự đặc biệt, nhưng chữ hoa có dấu thì tính là hoa', () => {
    expect(missingPasswordRules('đăngnhập')).toEqual(['chữ viết hoa', 'ký tự đặc biệt'])
    expect(missingPasswordRules('Ăngnhập!')).toEqual([])
  })
})

describe('passwordStrength', () => {
  it('0 khi rỗng', () => expect(passwordStrength('')).toBe(0))
  it('chưa đủ yêu cầu thì tối đa 2', () => {
    expect(passwordStrength('abc')).toBe(1)
    expect(passwordStrength('abcdefgh12')).toBe(2)
  })
  it('đủ yêu cầu thì 3, thêm số và chữ thường thì 4', () => {
    expect(passwordStrength('ABCDEFG!')).toBe(3)
    expect(passwordStrength('Abcdef!1')).toBe(4)
  })
})
