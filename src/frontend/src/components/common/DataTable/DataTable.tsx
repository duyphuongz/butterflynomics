import type { ReactNode } from 'react'

type Props = {
  caption: string
  head: Array<{ label: string; numeric?: boolean }>
  children: ReactNode
}

/** Khung bảng DS: caption, th scope="col", cột số mono căn phải. Hàng do cha cung cấp. */
export function DataTable({ caption, head, children }: Props) {
  return (
    <table className="bn-table min-w-[560px]">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h.label} scope="col" className={h.numeric ? 'num' : undefined}>
              {h.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}
