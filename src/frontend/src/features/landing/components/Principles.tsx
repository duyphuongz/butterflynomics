import { principles } from '@/features/landing/content'
import { container, ruleTop, sectionPad } from '@/utils/layout'

export function Principles() {
  return (
    <section id="nguyen-tac" aria-labelledby="principles-title" className="border-t border-border">
      <div className={`${container} ${sectionPad} flex flex-col gap-ds-6`}>
        <div className="flex max-w-measure flex-col gap-ds-2">
          <p className="bn-label m-0">{principles.label}</p>
          <h2 id="principles-title" className="h1 m-0">
            {principles.title}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-ds-5">
          {principles.items.map((p) => (
            <article key={p.title} className={`${ruleTop} flex flex-col gap-ds-2 pt-ds-4`}>
              <h3 className="h2 m-0">{p.title}</h3>
              <p className="body m-0 text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
