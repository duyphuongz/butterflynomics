import { Badge, Citation, DataTable, EvidenceBox, Scorebar } from '@/components/common'
import { useEvidence } from '@/hooks/useEvidence'
import { evidence, report, reportRows } from '@/features/landing/content'
import { RichText } from '@/components/common/RichText'
import { container, sectionPad } from '@/utils/layout'

const MINUS = '−'
const evById = new Map(evidence.map((e) => [e.id, e]))

export function SampleReport() {
  const ev = useEvidence()
  const openEvidence = ev.openId ? evById.get(ev.openId) : undefined
  const boxId = 'report-evidence'
  const c = report.columns

  return (
    <section
      id="bao-cao"
      aria-labelledby="report-title"
      className={`${container} ${sectionPad} grid items-start gap-ds-7 lg:grid-cols-[1fr_2fr]`}
    >
      <div className="flex min-w-0 flex-col gap-ds-4">
        <p className="bn-label m-0">{report.label}</p>
        <h2 id="report-title" className="h1 m-0">
          {report.title}
        </h2>
        <p className="body m-0 text-muted">
          <RichText value={report.lead} />
        </p>
        <p className="bn-badge bn-badge--caution m-0 h-auto self-start whitespace-normal py-ds-2">
          {report.sampleNote}
        </p>
      </div>
      <div className="min-w-0">
        <div className="overflow-x-auto" role="group" tabIndex={0} aria-label={report.caption}>
          <DataTable
            caption={report.caption}
            head={[
              { label: c.company },
              { label: c.channel },
              { label: c.direction },
              { label: c.score, numeric: true },
              { label: c.magnitude },
              { label: c.source, numeric: true },
            ]}
          >
            {reportRows.map((r) => {
              const text =
                r.kind === 'negative'
                  ? 'text-negative'
                  : r.kind === 'positive'
                    ? 'text-positive'
                    : 'text-muted'
              const value =
                r.kind === 'negative'
                  ? `${MINUS}${Math.abs(r.score).toFixed(2)}`
                  : r.kind === 'positive'
                    ? `+${r.score.toFixed(2)}`
                    : r.score.toFixed(2)
              const ref = evById.get(r.evidenceId)!
              return (
                <tr key={r.ticker}>
                  <td>
                    <b className="font-semibold">{r.company}</b>{' '}
                    <span className="tkr text-muted">{r.ticker}</span>
                  </td>
                  <td className="text-muted">{r.channel}</td>
                  <td>
                    <Badge kind={r.kind} />
                  </td>
                  <td className={`num ${text}`}>{value}</td>
                  <td>
                    <Scorebar score={r.score} kind={r.kind} />
                  </td>
                  <td className="num">
                    <Citation
                      code={ref.code}
                      controls={boxId}
                      open={ev.openId === ref.id}
                      speculative={r.kind === 'speculative'}
                      onToggle={(el) => ev.toggle(ref.id, el)}
                    />
                  </td>
                </tr>
              )
            })}
          </DataTable>
        </div>
        {openEvidence && (
          <div className="mt-ds-3">
            <EvidenceBox id={boxId} evidence={openEvidence} boxRef={ev.box} />
          </div>
        )}
      </div>
    </section>
  )
}
