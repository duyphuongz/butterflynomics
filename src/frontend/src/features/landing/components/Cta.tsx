import { Button } from '@/components/common'
import { GITHUB_URL } from '@/config/appConfig'
import { cta } from '@/features/landing/content'
import { container, ruleTop, sectionPad } from '@/utils/layout'

export function Cta() {
  return (
    <section aria-labelledby="cta-title" className={`${container} ${sectionPad}`}>
      <div className={`${ruleTop} flex flex-wrap items-end justify-between gap-ds-5 pt-ds-6`}>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-ds-2">
          <h2 id="cta-title" className="display m-0">
            {cta.title}
          </h2>
          <p className="body m-0 text-muted">{cta.lead}</p>
        </div>
        <Button href={GITHUB_URL}>{cta.source}</Button>
      </div>
    </section>
  )
}
