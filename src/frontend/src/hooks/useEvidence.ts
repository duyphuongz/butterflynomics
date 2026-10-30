import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Trạng thái hộp bằng chứng dùng chung cho Citation và cạnh đồ thị.
 * Đóng bằng Esc hoặc click ra ngoài; Esc trả focus về phần tử đã mở.
 */
export function useEvidence() {
  const [openId, setOpenId] = useState<string | null>(null)
  const trigger = useRef<Element | null>(null)
  const box = useRef<HTMLDivElement | null>(null)

  const toggle = useCallback((id: string, el: Element) => {
    setOpenId((cur) => {
      if (cur === id) return null
      trigger.current = el
      return id
    })
  }, [])

  const close = useCallback((restoreFocus: boolean) => {
    setOpenId(null)
    if (restoreFocus) (trigger.current as HTMLElement | null)?.focus()
  }, [])

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (box.current?.contains(t)) return
      if (t instanceof Element && t.closest('[data-evidence-trigger]')) return
      close(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [openId, close])

  return { openId, toggle, close, box }
}
