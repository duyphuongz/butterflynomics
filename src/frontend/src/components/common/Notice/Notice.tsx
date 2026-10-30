import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

type Props = {
  title: string
  kind?: 'default' | 'caution' | 'plain'
  role?: 'status'
  children: ReactNode
  className?: string
}

export function Notice({ title, kind = 'default', role, children, className }: Props) {
  return (
    <div
      role={role}
      className={cx('bn-notice', kind !== 'default' && `bn-notice--${kind}`, className)}
    >
      <p className="bn-notice__title">{title}</p>
      <p>{children}</p>
    </div>
  )
}
