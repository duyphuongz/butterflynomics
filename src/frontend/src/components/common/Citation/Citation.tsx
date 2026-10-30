import type { RefObject } from 'react'
import type { Evidence } from '@/types/content.types'
import { SAMPLE_LABEL } from '@/config/siteContent'
import { cx } from '@/utils/cx'

type CiteProps = {
  code: string
  controls: string
  open: boolean
  speculative?: boolean
  onToggle: (el: HTMLButtonElement) => void
}

/** Mã trích dẫn: nút có aria-expanded, mở hộp bằng chứng do cha render. */
export function Citation({ code, controls, open, speculative, onToggle }: CiteProps) {
  return (
    <button
      type="button"
      data-evidence-trigger
      className={cx('bn-cite', speculative && 'bn-cite--speculative')}
      aria-expanded={open}
      aria-controls={open ? controls : undefined}
      aria-label={`Mở bằng chứng ${code}`}
      onClick={(e) => onToggle(e.currentTarget)}
    >
      {code}
    </button>
  )
}

type BoxProps = {
  id: string
  evidence: Evidence
  boxRef: RefObject<HTMLDivElement | null>
}

/** Hộp bằng chứng: đoạn trích, nguồn, ngày, đều có nhãn minh họa. */
export function EvidenceBox({ id, evidence, boxRef }: BoxProps) {
  return (
    <div
      id={id}
      ref={boxRef}
      role="region"
      aria-label={`Bằng chứng ${evidence.code}`}
      className="bn-evidence"
    >
      <div className="bn-evidence__src">
        <span className="bn-mono">{evidence.code}</span> {evidence.source}, {evidence.date}
      </div>
      <p className="bn-evidence__quote">{evidence.quote}</p>
      <p className="bn-hint m-0">{SAMPLE_LABEL}</p>
    </div>
  )
}
