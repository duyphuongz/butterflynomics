import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, btnClass } from './Button'

describe('Button', () => {
  it('mặc định là <button type="button">, cỡ md không thêm lớp', () => {
    render(<Button>Đặt lại</Button>)
    const btn = screen.getByRole('button', { name: 'Đặt lại' })
    expect(btn).toHaveAttribute('type', 'button')
    expect(btn).toHaveClass('bn-btn')
    expect(btn.className).not.toMatch(/bn-btn--md/)
  })

  it('có href thì render <a> để điều hướng', () => {
    render(
      <Button href="#bat-dau" variant="inverse" size="sm">
        Dùng thử
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Dùng thử' })
    expect(link).toHaveAttribute('href', '#bat-dau')
    expect(link).toHaveClass('bn-btn', 'bn-btn--inverse', 'bn-btn--sm')
  })

  it('btnClass ghép biến thể, cỡ và lớp thêm', () => {
    expect(btnClass('primary', 'lg', 'x')).toBe('bn-btn bn-btn--primary bn-btn--lg x')
    expect(btnClass()).toBe('bn-btn')
  })
})
