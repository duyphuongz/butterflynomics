import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

type Variant = 'default' | 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

type Common = { variant?: Variant; size?: Size }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function btnClass(variant: Variant = 'default', size: Size = 'md', extra?: string) {
  return cx(
    'bn-btn',
    variant !== 'default' && `bn-btn--${variant}`,
    size !== 'md' && `bn-btn--${size}`,
    extra,
  )
}

export function Button(props: AsButton | AsLink) {
  const { variant, size, className, ...rest } = props
  const cls = btnClass(variant, size, className)
  if ('href' in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />
  }
  const { type = 'button', ...btn } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return <button type={type} {...btn} className={cls} />
}
