import { how } from '@/features/landing/content'
import { RichText } from '@/components/common/RichText'
import { container, hairline, ruleTop, sectionPad } from '@/utils/layout'

export function HowItWorks() {
  return (
    <section
      id="cach-hoat-dong"
      aria-labelledby="how-title"
      className="border-y border-border bg-subtle"
    >
      <div className={`${container} ${sectionPad} flex flex-col gap-ds-6`}>
        <div className="flex max-w-measure flex-col gap-ds-2">
          <p className="bn-label m-0">{how.label}</p>
          <h2 id="how-title" className="h1 m-0">
            {how.title}
          </h2>
          <p className="body m-0 text-muted">{how.lead}</p>
        </div>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-ds-5 p-0">
          {how.steps.map((s) => (
            <li
              key={s.n}
              className={`${ruleTop} ${hairline} flex flex-col gap-ds-2 bg-surface p-ds-4`}
            >
              <span className="data-lg text-navy">{s.n}</span>
              <h3 className="h3 m-0">{s.title}</h3>
              <p className="body m-0 text-muted">
                <RichText value={s.body} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
