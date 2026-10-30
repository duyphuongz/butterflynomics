import { useId } from 'react'
import type { Evidence, GraphEdge, GraphNode } from '@/types/content.types'
import { EvidenceBox } from '@/components/common/Citation'
import { useEvidence } from '@/hooks/useEvidence'

type Legend = {
  exposure: string
  exposureRange: string
  positive: string
  negative: string
  neutral: string
  thickness: string
}

type Props = {
  title: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  evidence: Evidence[]
  legend: Legend
  tableCaption: string
  tableHead: { from: string; to: string; direction: string; weight: string; evidence: string }
  directionLabel: Record<string, string>
}

const COL = {
  event: { x: 0, w: 120, h: 64 },
  sector: { x: 180, w: 160, h: 44 },
  company: { x: 400, w: 200, h: 44 },
} as const
const ROW_Y = [35, 105, 175, 245]
const MID_Y = 140
const WIDTH = 600
const HEIGHT = 280
const MAX_CHARS = { event: 16, sector: 16, company: 22 } as const

const MINUS = '−'

function level(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score <= 0.2) return 1
  if (score <= 0.4) return 2
  if (score <= 0.6) return 3
  if (score <= 0.8) return 4
  return 5
}

function wrap(text: string, max: number): string[] {
  const out: string[] = []
  let line = ''
  for (const w of text.split(' ')) {
    if (line && (line + ' ' + w).length > max) {
      out.push(line)
      line = w
    } else line = line ? line + ' ' + w : w
  }
  if (line) out.push(line)
  return out
}

function signed(dir: 1 | -1 | 0, weight: number) {
  const n = weight.toFixed(2)
  return dir === -1 ? `${MINUS}${n}` : dir === 1 ? `+${n}` : n
}

function geometry(nodes: GraphNode[]) {
  const counters = { sector: 0, company: 0 }
  const map = new Map<string, { x: number; w: number; h: number; y: number; cy: number }>()
  for (const n of nodes) {
    const c = COL[n.kind]
    const cy = n.kind === 'event' ? MID_Y : ROW_Y[counters[n.kind]++]
    map.set(n.id, { x: c.x, w: c.w, h: c.h, y: cy - c.h / 2, cy })
  }
  return map
}

export function PropagationGraph({
  title,
  nodes,
  edges,
  evidence,
  legend,
  tableCaption,
  tableHead,
  directionLabel,
}: Props) {
  const uid = useId()
  const ev = useEvidence()
  const geo = geometry(nodes)
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const evById = new Map(evidence.map((e) => [e.id, e]))
  const openEdge = ev.openId ? edges.find((e) => `${e.from}-${e.to}` === ev.openId) : undefined
  const openEvidence = openEdge ? evById.get(openEdge.evidenceId) : undefined
  const boxId = `${uid}-evidence`

  const edgeName = (e: GraphEdge) => `${byId.get(e.from)?.label} đến ${byId.get(e.to)?.label}`

  return (
    <div>
      <div className="overflow-x-auto" role="group" aria-label={title} tabIndex={0}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          className="block min-w-[560px]"
          role="img"
          aria-label={title}
        >
          <title>{title}</title>
          {edges.map((e) => {
            const a = geo.get(e.from)!
            const b = geo.get(e.to)!
            const x1 = a.x + a.w
            const x2 = b.x
            const mx = (x1 + x2) / 2
            const d = `M${x1} ${a.cy} C${mx} ${a.cy} ${mx} ${b.cy} ${x2} ${b.cy}`
            const cls = e.direction === 1 ? 'positive' : e.direction === -1 ? 'negative' : 'neutral'
            const key = `${e.from}-${e.to}`
            const isOpen = ev.openId === key
            const code = evById.get(e.evidenceId)?.code ?? ''
            const toggle = (el: Element) => ev.toggle(key, el)
            return (
              <g key={key}>
                <path
                  className={`bn-edge bn-edge--${cls}`}
                  style={{
                    strokeWidth: `calc(var(--stroke-edge-min) + (var(--stroke-edge-max) - var(--stroke-edge-min)) * ${e.weight})`,
                  }}
                  d={d}
                />
                {e.direction !== 0 && (
                  <text
                    className={`bn-edge-label bn-edge-label--${cls}`}
                    x={mx}
                    y={(a.cy + b.cy) / 2 - 6}
                    textAnchor="middle"
                  >
                    {signed(e.direction, e.weight)}
                  </text>
                )}
                <path
                  d={d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  data-evidence-trigger
                  data-edge={key}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? boxId : undefined}
                  aria-label={`Cạnh từ ${edgeName(e)}, ${directionLabel[String(e.direction)]} ${signed(e.direction, e.weight)}. Mở bằng chứng ${code}`}
                  onClick={(evt) => toggle(evt.currentTarget)}
                  onKeyDown={(evt) => {
                    if (evt.key === 'Enter' || evt.key === ' ') {
                      evt.preventDefault()
                      toggle(evt.currentTarget)
                    }
                  }}
                />
              </g>
            )
          })}
          {nodes.map((n) => {
            const g = geo.get(n.id)!
            const lv = level(n.score)
            const inv = lv >= 4
            const lines = wrap(n.label, MAX_CHARS[n.kind])
            const first = g.cy - ((lines.length - 1) * 16) / 2 + 4
            return (
              <g key={n.id} data-node={n.id}>
                <title>{`${n.label}, phơi nhiễm ${n.score.toFixed(2)}`}</title>
                <rect
                  className={`bn-node bn-node--${lv}${n.kind === 'event' ? ' bn-node--selected' : ''}`}
                  x={g.x}
                  y={g.y}
                  width={g.w}
                  height={g.h}
                />
                <text className={`bn-node-text${inv ? ' bn-node-text--inverse' : ''}`}>
                  {lines.map((l, i) => (
                    <tspan key={i} x={g.x + 10} y={first + i * 16}>
                      {l}
                    </tspan>
                  ))}
                </text>
                {n.kind !== 'event' && (
                  <text
                    className={`bn-node-score${inv ? ' bn-node-score--inverse' : ''}`}
                    x={g.x + g.w - 8}
                    y={g.cy + 4}
                    textAnchor="end"
                  >
                    {n.score.toFixed(2)}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {openEvidence && (
        <div className="mt-ds-3">
          <EvidenceBox id={boxId} evidence={openEvidence} boxRef={ev.box} />
        </div>
      )}

      <div className="bn-legend mt-ds-3">
        <span className="bn-legend__item">
          {legend.exposure}
          {[1, 2, 3, 4, 5].map((n) => (
            <svg key={n} width="14" height="14" aria-hidden="true">
              <rect className={`bn-node bn-node--${n}`} x="0.5" y="0.5" width="13" height="13" />
            </svg>
          ))}
          {legend.exposureRange}
        </span>
        <span className="bn-legend__item">
          <svg width="32" height="8" aria-hidden="true">
            <line
              className="bn-edge bn-edge--positive"
              x1="0"
              x2="32"
              y1="4"
              y2="4"
              style={{ strokeWidth: 3 }}
            />
          </svg>
          {legend.positive}
        </span>
        <span className="bn-legend__item">
          <svg width="32" height="8" aria-hidden="true">
            <line
              className="bn-edge bn-edge--negative"
              x1="0"
              x2="32"
              y1="4"
              y2="4"
              style={{ strokeWidth: 3 }}
            />
          </svg>
          {legend.negative}
        </span>
        <span className="bn-legend__item">
          <svg width="32" height="8" aria-hidden="true">
            <line
              className="bn-edge bn-edge--neutral"
              x1="0"
              x2="32"
              y1="4"
              y2="4"
              style={{ strokeWidth: 2 }}
            />
          </svg>
          {legend.neutral}
        </span>
        <span className="bn-legend__item">{legend.thickness}</span>
      </div>

      <div className="sr-only">
        <table>
          <caption>{tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{tableHead.from}</th>
              <th scope="col">{tableHead.to}</th>
              <th scope="col">{tableHead.direction}</th>
              <th scope="col">{tableHead.weight}</th>
              <th scope="col">{tableHead.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {edges.map((e) => (
              <tr key={`${e.from}-${e.to}`}>
                <td>{byId.get(e.from)?.label}</td>
                <td>{byId.get(e.to)?.label}</td>
                <td>{directionLabel[String(e.direction)]}</td>
                <td>{signed(e.direction, e.weight)}</td>
                <td>{evById.get(e.evidenceId)?.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
