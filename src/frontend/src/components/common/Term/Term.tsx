import { useId, useState, type ReactNode } from 'react'

/** Thuật ngữ: gạch chấm, mở khi hover và focus, đóng bằng Esc. */
export function Term({ children, definition }: { children: ReactNode; definition: string }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline">
      <span
        className="bn-term"
        tabIndex={0}
        aria-describedby={id}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        hidden={!open}
        className="bn-term-pop absolute top-full left-0 z-10 mt-ds-1 w-max"
      >
        {definition}
      </span>
    </span>
  )
}
