import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it.each([
    ['positive', '▲', 'app-tag--positive'],
    ['neutral', '●', 'app-tag--neutral'],
    ['negative', '▼', 'app-tag--negative'],
  ] as const)('%s có glyph và lớp màu tạm', (kind, glyph, cls) => {
    const { container } = render(<Badge kind={kind} />)
    const el = container.querySelector('.bn-badge')!
    expect(el).toHaveClass(cls)
    expect(el.textContent).toMatch(new RegExp(`^${glyph}`))
  })
})
