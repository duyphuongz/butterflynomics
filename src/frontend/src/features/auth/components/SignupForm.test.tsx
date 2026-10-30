import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DEMO_ACCOUNT, signup } from '@/features/auth/content'
import { SignupForm } from './SignupForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>,
  )
}

async function fill(email: string, password: string, confirm: string) {
  if (email) await userEvent.type(screen.getByLabelText(signup.email), email)
  if (password)
    await userEvent.type(screen.getByLabelText(signup.password, { exact: true }), password)
  if (confirm) await userEvent.type(screen.getByLabelText(signup.confirm), confirm)
}

const submit = () => userEvent.click(screen.getByRole('button', { name: signup.submit }))

describe('SignupForm', () => {
  it('có ba ô nhập và đúng một nút primary', () => {
    const { container } = renderForm()
    expect(screen.getByLabelText(signup.email)).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(signup.password, { exact: true })).toHaveAttribute(
      'type',
      'password',
    )
    expect(screen.getByLabelText(signup.confirm)).toHaveAttribute('type', 'password')
    expect(container.querySelectorAll('.bn-btn--primary')).toHaveLength(1)
  })

  it('gửi rỗng báo lỗi cả ba ô và focus ô đầu tiên', async () => {
    renderForm()
    await submit()
    expect(screen.getByLabelText(signup.email)).toHaveFocus()
    expect(screen.getByText(signup.errors.emailEmpty)).toBeInTheDocument()
    expect(screen.getByText(signup.errors.passwordEmpty)).toBeInTheDocument()
    expect(screen.getByText(signup.errors.confirmEmpty)).toBeInTheDocument()
  })

  it('mật khẩu nhập lại không khớp', async () => {
    renderForm()
    await fill('moi@vidu.com', 'Abc!2345', 'Abc!9999')
    await submit()
    const confirm = screen.getByLabelText(signup.confirm)
    expect(confirm).toHaveAccessibleDescription(signup.errors.confirmMismatch)
    expect(confirm).toHaveFocus()
  })

  it('mật khẩu yếu báo thiếu yêu cầu nào và chặn gửi', async () => {
    renderForm()
    await fill('moi@vidu.com', 'abc', 'abc')
    await submit()
    const password = screen.getByLabelText(signup.password, { exact: true })
    expect(password).toHaveAttribute('aria-invalid', 'true')
    expect(
      screen.getByText('Mật khẩu còn thiếu: tối thiểu 8 ký tự, chữ viết hoa, ký tự đặc biệt.'),
    ).toBeInTheDocument()
    expect(password).toHaveFocus()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('thanh độ mạnh cập nhật theo từng ký tự gõ', async () => {
    const { container } = renderForm()
    const filled = () => container.querySelectorAll('[data-filled]').length
    expect(screen.queryByText(/Độ mạnh/)).not.toBeInTheDocument()
    const input = screen.getByLabelText(signup.password, { exact: true })
    await userEvent.type(input, 'abc')
    expect(filled()).toBe(1)
    expect(screen.getByText(/Độ mạnh/)).toHaveTextContent('Độ mạnh: Yếu')
    await userEvent.type(input, 'D!12')
    expect(screen.getByText(/Độ mạnh/)).toHaveTextContent('Độ mạnh: Trung bình')
    await userEvent.type(input, 'x')
    expect(filled()).toBe(4)
    expect(screen.getByText(/Độ mạnh/)).toHaveTextContent('Độ mạnh: Mạnh')
  })

  it('email của tài khoản minh họa coi như đã tồn tại', async () => {
    renderForm()
    await fill(DEMO_ACCOUNT.email, 'Abc!2345', 'Abc!2345')
    await submit()
    expect(await screen.findByRole('status')).toHaveTextContent(signup.takenTitle)
  })

  it('email mới đăng ký thành công (minh họa)', async () => {
    renderForm()
    await fill('moi@vidu.com', 'Abc!2345', 'Abc!2345')
    await submit()
    const status = await screen.findByRole('status')
    expect(status).toHaveTextContent(signup.successTitle)
    expect(screen.getByRole('link', { name: signup.successLink })).toHaveAttribute(
      'href',
      '/dang-nhap',
    )
  })
})
