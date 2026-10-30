import type { InputHTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string }

/** DS chưa có checkbox: dùng ô gốc của trình duyệt, tô navy qua accent-color. */
export function Checkbox({ label, className, ...rest }: Props) {
  return (
    <label className="body inline-flex items-center gap-ds-2 self-start">
      <input {...rest} type="checkbox" className={cx('m-0 accent-navy', className)} />
      {label}
    </label>
  )
}
