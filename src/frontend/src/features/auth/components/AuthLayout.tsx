import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/appConfig'
import wordmark from '@ds/assets/Logo/butterflynomics-wordmark.svg?url'
import { Notice } from '@/components/common'
import { nav } from '@/config/siteContent'
import { demoNotice } from '@/features/auth/content'
import { ruleTop } from '@/utils/layout'

type Props = {
  title: string
  children: ReactNode
  /** Dòng chuyển qua trang còn lại (đăng nhập ↔ đăng ký). */
  switchTo: { text: string; label: string; href: string }
}

/** Khung chung của trang đăng nhập/đăng ký: logo giữa, tiêu đề, nhãn minh họa, form. */
export function AuthLayout({ title, children, switchTo }: Props) {
  return (
    <main className="px-ds-5 py-ds-8">
      <div className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-ds-7">
        <Link to={ROUTES.home} aria-label={nav.homeLabel} className="block">
          <img src={wordmark} alt="" className="block h-8 w-auto" />
        </Link>
        <section
          aria-labelledby="auth-title"
          className={`${ruleTop} flex w-full flex-col gap-ds-5 pt-ds-4`}
        >
          <h1 id="auth-title" className="h1 m-0">
            {title}
          </h1>
          <Notice kind="caution" title={demoNotice.title}>
            {demoNotice.body}
          </Notice>
          {children}
          <p className="body m-0 border-t border-border pt-ds-4 text-center text-muted">
            {switchTo.text}{' '}
            <Link className="bn-link" to={switchTo.href}>
              {switchTo.label}
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
