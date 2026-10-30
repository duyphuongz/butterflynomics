// Kiểu dữ liệu dùng chung cho nội dung và các component.

/** Đoạn văn có thể chứa thuật ngữ: chuỗi thường hoặc { term, def } (bọc bằng Term). */
export type Rich = Array<string | { term: string; def: string }>

export type Evidence = {
  id: string
  code: string
  quote: string
  source: string
  date: string
}

export type GraphNode = {
  id: string
  kind: 'event' | 'sector' | 'company'
  label: string
  /** Điểm phơi nhiễm 0–1 */
  score: number
}

export type GraphEdge = {
  from: string
  to: string
  /** +1 có lợi, −1 bất lợi, 0 cấu trúc */
  direction: 1 | -1 | 0
  /** Trọng số 0–1, quyết định độ dày nét */
  weight: number
  evidenceId: string
}

export type ReportKind = 'positive' | 'negative' | 'speculative'

export type ReportRow = {
  company: string
  ticker: string
  channel: string
  kind: ReportKind
  /** Điểm có dấu */
  score: number
  evidenceId: string
}
