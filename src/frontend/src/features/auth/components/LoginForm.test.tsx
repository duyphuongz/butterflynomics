import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DEMO_ACCOUNT, login } from '@/features/auth/content'
import { LoginForm } from './LoginForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )
}

async function fill(email: string, password: string) {
  if (email) await userEvent.type(screen.getByLabelText(login.email), email)
  if (password) await userEvent.type(screen.getByLabelText(login.password), password)
}

describe('LoginForm', () => {
  it('có ô email, mật khẩu, lưu mật khẩu và đúng một nút primary', () => {
    const { container } = renderForm()
    expect(screen.getByLabelText(login.email)).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(login.password)).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: login.remember })).not.toBeChecked()
    expect(container.querySelectorAll('.bn-btn--primary')).toHaveLength(1)
  })

  it('gửi rỗng báo lỗi bằng chữ và focus ô đầu tiên', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: login.submit }))
    const email = screen.getByLabelText(login.email)
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(login.errors.emailEmpty)
    expect(screen.getByLabelText(login.password)).toHaveAccessibleDescription(
      login.errors.passwordEmpty,
    )
    expect(email).toHaveFocus()
  })

  it('email sai định dạng', async () => {
    renderForm()
    await fill('abc', 'x')
    await userEvent.click(screen.getByRole('button', { name: login.submit }))
    expect(screen.getByText(login.errors.emailInvalid)).toBeInTheDocument()
  })

  it('sai tài khoản minh họa hiện thông báo không đăng nhập được', async () => {
    renderForm()
    await fill(DEMO_ACCOUNT.email, 'sai-mat-khau')
    await userEvent.click(screen.getByRole('button', { name: login.submit }))
    expect(await screen.findByRole('status')).toHaveTextContent(login.failTitle)
  })

  it('đúng tài khoản minh họa, có lưu: nhớ email cho lần sau', async () => {
    const first = renderForm()
    await fill(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password)
    await userEvent.click(screen.getByRole('checkbox', { name: login.remember }))
    await userEvent.click(screen.getByRole('button', { name: login.submit }))
    expect(await screen.findByRole('status')).toHaveTextContent(login.successTitle)
    first.unmount()

    renderForm()
    expect(screen.getByLabelText(login.email)).toHaveValue(DEMO_ACCOUNT.email)
    expect(screen.getByLabelText(login.password)).toHaveValue('')
    expect(screen.getByRole('checkbox', { name: login.remember })).toBeChecked()
  })
})
