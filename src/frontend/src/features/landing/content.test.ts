import { describe, expect, it } from 'vitest'
import { evidence, graph, reportRows } from './content'

// Bất biến của dữ liệu minh họa: mọi cạnh và mọi hàng xếp hạng có bằng chứng.
describe('Nội dung landing', () => {
  const ids = new Set(evidence.map((e) => e.id))

  it('mọi cạnh đồ thị trỏ về bằng chứng có thật', () => {
    graph.edges.forEach((e) => expect(ids.has(e.evidenceId)).toBe(true))
  })

  it('mọi hàng bảng mẫu trỏ về bằng chứng có thật', () => {
    reportRows.forEach((r) => expect(ids.has(r.evidenceId)).toBe(true))
  })

  it('mọi bằng chứng có nhãn minh họa', () => {
    evidence.forEach((e) => expect(e.quote).toMatch(/minh họa/i))
  })
})
