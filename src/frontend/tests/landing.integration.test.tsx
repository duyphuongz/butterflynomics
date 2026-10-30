import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LIMIT_STATEMENT } from '@/config/siteContent'
import { hero } from '@/features/landing/content'
import { routes } from '@/routes/AppRoutes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

describe('Trang chủ', () => {
  it('render đủ TopBar, các section và footer', () => {
    const { container } = renderAt('/')
    expect(container.querySelector('header.bn-topbar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(hero.title)
    for (const id of ['cach-hoat-dong', 'bao-cao', 'nguyen-tac', 'pham-vi', 'bat-dau']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument()
    }
    expect(container.querySelector('footer')).toHaveTextContent(LIMIT_STATEMENT)
    expect(container.querySelector('.bn-notice--plain')).toBeInTheDocument()
  })

  it('chỉ có đúng một nút bn-btn--primary', () => {
    const { container } = renderAt('/')
    expect(container.querySelectorAll('.bn-btn--primary')).toHaveLength(1)
  })

  it('form hiện thông báo trạng thái khi submit và không gọi mạng', async () => {
    renderAt('/')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: hero.form.submit }))
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Bản demo đang được phát triển.')
    expect(within(status).getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/duyphuongz',
    )
  })

  it('mọi hàng bảng có mã trích dẫn và mọi Badge có glyph', () => {
    const { container } = renderAt('/')
    const rows = container.querySelectorAll('#bao-cao tbody tr')
    expect(rows).toHaveLength(4)
    rows.forEach((r) => expect(r.querySelector('.bn-cite')).toBeInTheDocument())
    container.querySelectorAll('.bn-badge:not(.bn-badge--caution)').forEach((b) => {
      expect(b.textContent).toMatch(/^[▲▼●◆?]/)
    })
  })

  it('TopBar có Đăng nhập rồi Đăng ký ở bên phải, không còn Dùng thử', () => {
    const { container } = renderAt('/')
    const end = container.querySelector('.bn-topbar__end') as HTMLElement
    const links = within(end).getAllByRole('link')
    expect(links.map((l) => l.textContent)).toEqual(['Đăng nhập', 'Đăng ký'])
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['/dang-nhap', '/dang-ky'])
    expect(within(end).queryByText('Dùng thử')).not.toBeInTheDocument()
  })

  it('trang đăng ký có logo về trang chủ, không có TopBar', () => {
    const { container } = renderAt('/dang-ky')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Đăng ký')
    expect(container.querySelector('header.bn-topbar')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.bn-btn--primary')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Butterflynomics, về trang chủ' })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('chuyển qua lại giữa đăng nhập và đăng ký', async () => {
    renderAt('/dang-nhap')
    expect(screen.getByText('Chưa có tài khoản?')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Đăng ký' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Đăng ký')
    expect(screen.getByText('Đã có tài khoản?')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Đăng nhập' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Đăng nhập')
  })

  it('TopBar có nút Đăng nhập dẫn tới trang đăng nhập', async () => {
    const { container } = renderAt('/')
    const link = within(container.querySelector('header.bn-topbar') as HTMLElement).getByRole(
      'link',
      { name: 'Đăng nhập' },
    )
    await userEvent.click(link)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Đăng nhập')
    expect(container.querySelectorAll('.bn-btn--primary')).toHaveLength(1)
    expect(container.querySelector('header.bn-topbar')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Butterflynomics, về trang chủ' })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('404 cho đường dẫn lạ', () => {
    renderAt('/khong-co')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Không tìm thấy trang này')
  })
})

describe('Citation trong bảng mẫu', () => {
  it('mở và đóng bằng bàn phím, focus quay về mã', async () => {
    const { container } = renderAt('/')
    const cite = container.querySelector('#bao-cao .bn-cite') as HTMLButtonElement
    cite.focus()
    await userEvent.keyboard('{Enter}')
    expect(cite).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('.bn-evidence')).toHaveTextContent('minh họa')
    await userEvent.keyboard('{Escape}')
    expect(cite).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('.bn-evidence')).not.toBeInTheDocument()
    expect(cite).toHaveFocus()
  })

  it('click ra ngoài đóng hộp', async () => {
    const { container } = renderAt('/')
    const cite = container.querySelector('#bao-cao .bn-cite') as HTMLButtonElement
    await userEvent.click(cite)
    expect(container.querySelector('.bn-evidence')).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(container.querySelector('.bn-evidence')).not.toBeInTheDocument()
  })
})

describe('Term', () => {
  it('mở khi focus, đóng bằng Esc', async () => {
    const { container } = renderAt('/')
    const term = container.querySelector('.bn-term') as HTMLElement
    const pop = document.getElementById(term.getAttribute('aria-describedby')!)!
    expect(term).toHaveAttribute('tabindex', '0')
    expect(pop).not.toBeVisible()
    act(() => term.focus())
    expect(pop).toBeVisible()
    await userEvent.keyboard('{Escape}')
    expect(pop).not.toBeVisible()
  })
})
