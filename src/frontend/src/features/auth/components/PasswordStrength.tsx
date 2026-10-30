import { signup } from '@/features/auth/content'
import { passwordStrength } from '@/features/auth/validation'
import { cx } from '@/utils/cx'

const STEPS = [1, 2, 3, 4] as const

/** Thanh 4 nấc navy (không dùng đỏ/xanh lá: hai màu đó dành cho chiều tác động), luôn kèm chữ. */
export function PasswordStrength({ value }: { value: string }) {
  const level = passwordStrength(value)
  if (level === 0) return null
  const text = signup.strengthLevels[level - 1]
  return (
    <div className="flex items-center gap-ds-3">
      <div aria-hidden="true" className="grid flex-1 grid-cols-4 gap-ds-1">
        {STEPS.map((s) => (
          <span
            key={s}
            data-filled={s <= level || undefined}
            className={cx('block h-2', s <= level ? 'bg-navy' : 'bg-sunken')}
          />
        ))}
      </div>
      <p className="bn-hint m-0 min-w-[120px] text-right" aria-live="polite">
        {signup.strengthLabel}: <span className="text-ink">{text}</span>
      </p>
    </div>
  )
}
