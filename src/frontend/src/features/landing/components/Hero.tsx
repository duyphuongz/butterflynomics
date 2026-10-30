import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button, Notice, PropagationGraph } from '@/components/common'
import { GITHUB_URL } from '@/config/appConfig'
import { SAMPLE_LABEL } from '@/config/siteContent'
import { evidence, graph, hero } from '@/features/landing/content'
import { container } from '@/utils/layout'

export function Hero() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const focusForm = () => {
      if (window.location.hash === '#bat-dau') inputRef.current?.focus()
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href="#bat-dau"]')
      if (a) setTimeout(() => inputRef.current?.focus(), 0)
    }
    window.addEventListener('hashchange', focusForm)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', focusForm)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section aria-labelledby="hero-title" className={`${container} pt-ds-8 pb-ds-7`}>
      <div className="grid items-start gap-ds-7 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-ds-5">
          <p className="bn-label m-0">{hero.label}</p>
          <h1 id="hero-title" className="display m-0">
            {hero.title}
          </h1>
          <p className="body m-0 max-w-[560px] text-muted">{hero.lead}</p>
          <p className="h3 m-0">{hero.slogan}</p>
          <form
            id="bat-dau"
            aria-label={hero.form.ariaLabel}
            onSubmit={onSubmit}
            className="mt-ds-2 flex max-w-[560px] flex-col gap-ds-2"
          >
            <div className="flex flex-col gap-ds-1">
              <label htmlFor="bn-url" className="bn-label text-ink">
                {hero.form.label}
              </label>
              <div className="flex flex-wrap gap-ds-2">
                <div className="min-w-0 flex-[1_1_260px]">
                  <input
                    id="bn-url"
                    ref={inputRef}
                    type="text"
                    className="bn-input bn-input--lg"
                    placeholder={hero.form.placeholder}
                    aria-describedby="bn-url-hint"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg">
                  {hero.form.submit}
                </Button>
              </div>
            </div>
            <p id="bn-url-hint" className="bn-hint m-0">
              {hero.form.hint}
            </p>
            {submitted && (
              <Notice role="status" title={hero.form.noticeTitle}>
                {hero.form.notice}{' '}
                <a className="bn-link" href={GITHUB_URL}>
                  {hero.form.noticeLink}
                </a>
                .
              </Notice>
            )}
          </form>
        </div>

        <figure
          aria-labelledby="map-cap"
          className="m-0 min-w-0 border-t-(length:--stroke-rule) border-rule"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-ds-2 py-ds-3">
            <span id="map-cap" className="bn-label text-ink">
              {hero.graphTitle}
            </span>
            <span className="bn-badge bn-badge--caution">{SAMPLE_LABEL}</span>
          </div>
          <PropagationGraph
            title={graph.title}
            nodes={graph.nodes}
            edges={graph.edges}
            evidence={evidence}
            legend={graph.legend}
            tableCaption={graph.tableCaption}
            tableHead={graph.tableHead}
            directionLabel={graph.directionLabel}
          />
        </figure>
      </div>
    </section>
  )
}
