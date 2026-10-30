import { Fragment } from 'react'
import { Term } from '@/components/common/Term'
import type { Rich } from '@/types/content.types'

export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === 'string' ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Term key={i} definition={part.def}>
            {part.term}
          </Term>
        ),
      )}
    </>
  )
}
