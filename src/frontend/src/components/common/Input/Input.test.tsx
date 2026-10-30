import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('nhãn gắn với ô nhập', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toHaveClass('bn-input')
  })

  it('gợi ý được mô tả cho ô, không đánh dấu lỗi', () => {
    render(<Input label="Mật khẩu" hint="Tối thiểu 8 ký tự." />)
    const input = screen.getByLabelText('Mật khẩu')
    expect(input).toHaveAccessibleDescription('Tối thiểu 8 ký tự.')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('lỗi đặt aria-invalid; cả lỗi và gợi ý đều được mô tả cho ô', () => {
    render(<Input label="Email" hint="Gợi ý." error="Nhập email." />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription(/Nhập email\./)
    expect(input).toHaveAccessibleDescription(/Gợi ý\./)
    expect(screen.getByText('Nhập email.')).toHaveClass('bn-error')
  })

  it('cỡ lg thêm lớp bn-input--lg', () => {
    render(<Input label="Link" size="lg" />)
    expect(screen.getByLabelText('Link')).toHaveClass('bn-input', 'bn-input--lg')
  })
})
