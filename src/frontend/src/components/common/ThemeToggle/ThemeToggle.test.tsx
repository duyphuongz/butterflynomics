import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

const setup = () => render(<ThemeToggle label="Màu" light="Mặc định" cb="Dễ phân biệt màu" />)

describe('ThemeToggle', () => {
  it('đổi data-theme và lưu localStorage', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: 'Dễ phân biệt màu' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light-cb')
    expect(localStorage.getItem('bn-theme')).toBe('light-cb')
    await userEvent.click(screen.getByRole('button', { name: 'Mặc định' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('vẫn hoạt động khi localStorage lỗi', async () => {
    const original = Storage.prototype.setItem
    Storage.prototype.setItem = () => {
      throw new Error('blocked')
    }
    try {
      setup()
      await userEvent.click(screen.getByRole('button', { name: 'Dễ phân biệt màu' }))
      expect(document.documentElement).toHaveAttribute('data-theme', 'light-cb')
    } finally {
      Storage.prototype.setItem = original
    }
  })
})
