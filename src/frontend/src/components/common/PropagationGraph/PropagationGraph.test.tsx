import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { Evidence, GraphEdge, GraphNode } from '@/types/content.types'
import { PropagationGraph } from './PropagationGraph'

// Dữ liệu cố định của riêng test: component không phụ thuộc vào nội dung của features/.
const nodes: GraphNode[] = [
  { id: 'ev', kind: 'event', label: 'Sự kiện thử', score: 0.9 },
  { id: 's1', kind: 'sector', label: 'Ngành thử', score: 0.5 },
  { id: 'c1', kind: 'company', label: 'Công ty thử', score: 0.3 },
]
const edges: GraphEdge[] = [
  { from: 'ev', to: 's1', direction: 0, weight: 0.5, evidenceId: 'e1' },
  { from: 's1', to: 'c1', direction: -1, weight: 0.2, evidenceId: 'e2' },
]
const evidence: Evidence[] = [
  { id: 'e1', code: '[1]', quote: 'Trích dẫn 1', source: 'Nguồn 1', date: '01/2026' },
  { id: 'e2', code: '[2]', quote: 'Trích dẫn 2', source: 'Nguồn 2', date: '01/2026' },
]

const renderGraph = () =>
  render(
    <PropagationGraph
      title="Đồ thị thử"
      nodes={nodes}
      edges={edges}
      evidence={evidence}
      legend={{
        exposure: 'Phơi nhiễm:',
        exposureRange: 'thấp đến cao',
        positive: '▲ Có lợi',
        negative: '▼ Bất lợi',
        neutral: 'Cấu trúc',
        thickness: 'Độ dày = trọng số',
      }}
      tableCaption="Bảng thử"
      tableHead={{
        from: 'Từ',
        to: 'Đến',
        direction: 'Chiều',
        weight: 'Trọng số',
        evidence: 'Nguồn',
      }}
      directionLabel={{ '1': '▲ Có lợi', '-1': '▼ Bất lợi', '0': '● Cấu trúc' }}
    />,
  )

describe('PropagationGraph', () => {
  it('render đúng số nút, cạnh và có chú giải', () => {
    const { container } = renderGraph()
    expect(container.querySelectorAll('svg [data-node]')).toHaveLength(nodes.length)
    expect(container.querySelectorAll('path[data-edge]')).toHaveLength(edges.length)
    expect(container.querySelectorAll('path.bn-edge')).toHaveLength(edges.length)
    expect(container.querySelector('.bn-legend')).toBeInTheDocument()
    expect(container.querySelectorAll('table tbody tr')).toHaveLength(edges.length)
  })

  it('bấm cạnh bằng bàn phím mở hộp bằng chứng, Esc đóng và trả focus', async () => {
    const { container } = renderGraph()
    const edge = container.querySelector('path[data-edge]') as SVGElement
    edge.focus()
    await userEvent.keyboard('{Enter}')
    expect(edge).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('.bn-evidence')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(container.querySelector('.bn-evidence')).not.toBeInTheDocument()
    expect(edge).toHaveFocus()
  })
})
