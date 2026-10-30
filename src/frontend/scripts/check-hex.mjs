// Thất bại nếu frontend/src còn mã hex màu ngoài comment.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../src', import.meta.url))
const exts = new Set(['.ts', '.tsx', '.css', '.html'])
const hex = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9A-Za-z_-])/
const bad = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (exts.has(extname(p))) check(p)
  }
}

// Ngoại lệ duy nhất: biến --app-* trong overrides.css (giải pháp tạm đã được tác giả duyệt).
const overrides = join(root, 'styles', 'overrides.css')
const appVar = /^\s*--app-[\w-]+\s*:/

function check(file) {
  const allowAppVars = file === overrides
  const text = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) =>
    m.replace(/[^\n]/g, ' '),
  )
  text.split('\n').forEach((line, i) => {
    const code = line.replace(/^\s*\/\/.*$/, '').replace(/(^|[^:])\/\/.*$/, '$1')
    if (allowAppVars && appVar.test(code)) return
    if (hex.test(code)) bad.push(`${file}:${i + 1}: ${line.trim()}`)
  })
}

walk(root)
if (bad.length) {
  console.error('Mã hex không được phép trong src:\n' + bad.join('\n'))
  process.exit(1)
}
console.log('check:hex ok')
