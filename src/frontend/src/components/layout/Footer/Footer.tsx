import wordmark from '@ds/assets/Logo/butterflynomics-wordmark.svg?url'
import { Notice } from '@/components/common/Notice'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LIMIT_STATEMENT, footer } from '@/config/siteContent'
import { RichText } from '@/components/common/RichText'
import { container } from '@/utils/layout'

const linkCls = 'hover:text-navy hover:underline'

export function Footer() {
  return (
    <footer className="border-t-(length:--stroke-rule) border-rule bg-surface">
      <div className={`${container} flex flex-col gap-ds-6 pt-ds-7 pb-ds-6`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-ds-5 gap-y-ds-6">
          {footer.columns.map((col) => (
            <nav key={col.id} aria-labelledby={col.id} className="flex flex-col gap-ds-4">
              <h2 id={col.id} className="bn-label m-0 text-ink">
                {col.title}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-ds-3 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={`body ${linkCls}`}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="flex flex-col gap-ds-4">
            <p className="h3 m-0">{footer.tagline}</p>
            <a
              href={footer.taglineCta.href}
              className="body-strong inline-flex items-center gap-ds-2 text-navy hover:underline"
            >
              {footer.taglineCta.label}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              >
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={wordmark} alt="Butterflynomics" className="block h-6 w-auto" />
        </div>

        <div className="flex flex-col gap-ds-4 border-t border-border pt-ds-5">
          <div className="flex flex-wrap items-center justify-between gap-ds-4">
            <p className="small m-0 text-muted">{footer.copyright}</p>
            <ul
              aria-label={footer.contactLabel}
              className="button m-0 flex list-none flex-wrap gap-ds-5 p-0"
            >
              {footer.contact.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-navy hover:underline">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Notice kind="plain" title={footer.noticeTitle} className="max-w-measure">
            {LIMIT_STATEMENT}
          </Notice>
          <p className="caption m-0 max-w-measure text-muted">
            <RichText value={footer.dataSource} />
          </p>

          <ThemeToggle label={footer.themeLabel} light={footer.themeLight} cb={footer.themeCb} />
        </div>
      </div>
    </footer>
  )
}
