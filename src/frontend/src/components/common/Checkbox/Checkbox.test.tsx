import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('bấm vào chữ cũng chọn được (nhãn bọc ô)', async () => {
    render(<Checkbox label="Lưu mật khẩu" />)
    const box = screen.getByRole('checkbox', { name: 'Lưu mật khẩu' })
    expect(box).not.toBeChecked()
    await userEvent.click(screen.getByText('Lưu mật khẩu'))
    expect(box).toBeChecked()
  })

  it('dùng được bằng phím Space', async () => {
    render(<Checkbox label="Lưu mật khẩu" />)
    const box = screen.getByRole('checkbox')
    box.focus()
    await userEvent.keyboard(' ')
    expect(box).toBeChecked()
  })
})
