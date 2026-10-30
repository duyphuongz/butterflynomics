import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

export type BadgeKind = 'negative' | 'positive' | 'neutral' | 'caution' | 'speculative'

const META: Record<BadgeKind, { glyph: string; text: string; cls?: string }> = {
  // app-tag--*: màu tạm do tác giả chọn, xem styles/overrides.css.
  negative: { glyph: '▼', text: 'Bất lợi', cls: 'bn-badge--negative app-tag--negative' },
  positive: { glyph: '▲', text: 'Có lợi', cls: 'bn-badge--positive app-tag--positive' },
  neutral: { glyph: '●', text: 'Trung tính', cls: 'app-tag--neutral' },
  caution: { glyph: '◆', text: 'Cảnh báo', cls: 'bn-badge--caution' },
  speculative: { glyph: '?', text: 'Suy đoán', cls: 'bn-badge--speculative' },
}

/** Luôn glyph + chữ, không bao giờ chỉ màu. `children` thay chữ mặc định. */
export function Badge({ kind, children }: { kind: BadgeKind; children?: ReactNode }) {
  const m = META[kind]
  return (
    <span className={cx('bn-badge', m.cls)}>
      <span aria-hidden="true">{m.glyph}</span>
      <span>{children ?? m.text}</span>
    </span>
  )
}
