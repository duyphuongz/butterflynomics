import { scope } from '@/features/landing/content'
import { container, ruleTop, sectionPad } from '@/utils/layout'

export function Scope() {
  return (
    <section
      id="pham-vi"
      aria-labelledby="scope-title"
      className="border-y border-border bg-subtle"
    >
      <div className={`${container} ${sectionPad} grid gap-ds-7 lg:grid-cols-[1fr_2fr]`}>
        <div className="flex min-w-0 flex-col gap-ds-2">
          <p className="bn-label m-0">{scope.label}</p>
          <h2 id="scope-title" className="h1 m-0">
            {scope.title}
          </h2>
          <p className="body m-0 text-muted">{scope.lead}</p>
        </div>
        <dl
          className={`${ruleTop} m-0 grid min-w-0 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-ds-5`}
        >
          {scope.items.map((i) => (
            <div key={i.term} className="border-b border-border py-ds-4">
              <dt className="bn-label">{i.term}</dt>
              <dd className={`m-0 mt-ds-1 ${i.mono ? 'data-lg' : 'body-strong'}`}>
                {i.value}
                {'note' in i && <span className="body text-muted">{i.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
