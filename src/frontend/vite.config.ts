import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const dir = path.dirname(fileURLToPath(import.meta.url))
const ds = path.resolve(dir, '../../butterflynomics-design-system')

/**
 * Design System bundle.css bắt đầu bằng một mảnh @import bị cắt (lỗi DS-1, xem docs/specs/001).
 * Tailwind tự gộp @import nên không đi qua transform của Vite; ta nhúng bản đã cắt mảnh hỏng
 * vào index.css ngay trong bộ nhớ. Không sửa tệp nguồn của Design System.
 */
function dsBundleFix(): Plugin {
  const tokensMarker = /@import\s+['"]@ds\/tokens\.css['"][^;]*;/
  const fontImport = /@import\s+url\([^)]*fonts\.css[^)]*\);?/
  const marker = /@import\s+['"]@ds\/components\/bundle\.css['"][^;]*;/
  return {
    name: 'ds-bundle-fix',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0].replaceAll(path.sep, '/')
      if (!file.endsWith('/src/styles/globals.css') || !marker.test(code)) return null
      let css = readFileSync(path.join(ds, 'components/bundle.css'), 'utf8')
      if (!/^\s*(@|\/\*|\.|:|\[)/.test(css)) css = css.replace(/^[^\n]*\n/, '')
      const tokens = readFileSync(path.join(ds, 'tokens.css'), 'utf8').replace(fontImport, '')
      return code
        .replace(marker, () => `@layer ds {\n${css}\n}`)
        .replace(tokensMarker, () => `@layer ds {\n${tokens}\n}`)
    },
  }
}

/** Favicon lấy trực tiếp từ mark.svg của Design System, không tạo bản sao trong repo. */
function dsFavicon(): Plugin {
  const markFile = path.join(ds, 'assets/Logo/butterflynomics-mark.svg')
  return {
    name: 'ds-favicon',
    configureServer(server) {
      server.middlewares.use('/favicon.svg', (_req, res) => {
        res.setHeader('Content-Type', 'image/svg+xml')
        res.end(readFileSync(markFile))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'favicon.svg', source: readFileSync(markFile) })
    },
  }
}

export default defineConfig({
  plugins: [dsBundleFix(), dsFavicon(), react(), tailwindcss()],
  resolve: { alias: { '@ds': ds, '@': path.resolve(dir, 'src') } },
  server: {
    fs: { allow: [dir, ds] },
    // Trong Docker trên Windows, thư mục mount không phát sự kiện thay đổi tệp nên cần polling.
    watch: process.env.VITE_USE_POLLING === 'true' ? { usePolling: true, interval: 300 } : undefined,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
    globals: true,
  },
})
