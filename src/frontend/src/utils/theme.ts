export type Theme = 'light' | 'light-cb'

const KEY = 'bn-theme'

export function readTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'light-cb') return v
  } catch {
    /* localStorage có thể bị chặn */
  }
  return 'light'
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme)
  if (!persist) return
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* bỏ qua: vẫn đổi theme trong phiên */
  }
}
