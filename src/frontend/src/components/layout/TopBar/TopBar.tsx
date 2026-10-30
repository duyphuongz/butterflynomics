import type { ReactNode } from 'react'
import { Wordmark } from '@/components/common/Wordmark'

type Props = {
  brandHref: string
  brandLabel: string
  navLabel: string
  links: Array<{ href: string; label: string }>
  action: ReactNode
}

/** Cao 48px (DS). Dưới md ẩn các mục nav, giữ wordmark và nút. */
export function TopBar({ brandHref, brandLabel, navLabel, links, action }: Props) {
  return (
    <header className="bn-topbar bn-on-inverse">
      <a className="bn-topbar__brand" href={brandHref} aria-label={brandLabel}>
        <Wordmark />
      </a>
      <nav aria-label={navLabel} className="hidden md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="bn-topbar__end flex items-center gap-ds-2">{action}</div>
    </header>
  )
}
