import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { App } from '@/App'
import { applyTheme, readTheme } from '@/utils/theme'

// Áp theme đã lưu trước khi render để không nhấp nháy.
applyTheme(readTheme(), false)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
