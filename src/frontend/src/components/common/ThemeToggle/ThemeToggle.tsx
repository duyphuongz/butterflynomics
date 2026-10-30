import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { applyTheme, readTheme, type Theme } from '@/utils/theme'

type Props = { label: string; light: string; cb: string }

export function ThemeToggle({ label, light, cb }: Props) {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme | null) ?? readTheme(),
  )
  const choose = (t: Theme) => {
    applyTheme(t)
    setTheme(t)
  }
  return (
    <div className="flex flex-wrap items-center gap-ds-2">
      <span className="bn-label">{label}</span>
      <div className="bn-btn-group" role="group" aria-label={label}>
        <Button size="sm" aria-pressed={theme === 'light'} onClick={() => choose('light')}>
          {light}
        </Button>
        <Button size="sm" aria-pressed={theme === 'light-cb'} onClick={() => choose('light-cb')}>
          {cb}
        </Button>
      </div>
    </div>
  )
}
