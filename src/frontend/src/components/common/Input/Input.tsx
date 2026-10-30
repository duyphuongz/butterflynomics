import { useId, type InputHTMLAttributes, type Ref } from 'react'
import { cx } from '@/utils/cx'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  size?: 'sm' | 'md' | 'lg'
  hint?: string
  error?: string
  inputRef?: Ref<HTMLInputElement>
}

export function Input({
  label,
  size = 'md',
  hint,
  error,
  id,
  inputRef,
  className,
  ...rest
}: Props) {
  const auto = useId()
  const inputId = id ?? auto
  const hintId = hint ? `${inputId}-hint` : undefined
  const errId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined
  return (
    <div className="bn-field">
      <label htmlFor={inputId} className="bn-label text-ink">
        {label}
      </label>
      <input
        {...rest}
        ref={inputRef}
        id={inputId}
        className={cx('bn-input', size !== 'md' && `bn-input--${size}`, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {error && (
        <p id={errId} className="bn-error m-0">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="bn-hint m-0">
          {hint}
        </p>
      )}
    </div>
  )
}
