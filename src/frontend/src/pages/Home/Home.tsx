import { Link } from 'react-router-dom'
import { btnClass } from '@/components/common'
import { Footer, TopBar } from '@/components/layout'
import { nav } from '@/config/siteContent'
import { Cta, Hero, HowItWorks, Principles, SampleReport, Scope } from '@/features/landing'

export function Home() {
  return (
    <>
      <TopBar
        brandHref="#top"
        brandLabel={nav.brandLabel}
        navLabel={nav.ariaLabel}
        links={nav.links}
        action={
          <>
            <Link to={nav.login.href} className={btnClass('inverse', 'sm', 'app-btn-login')}>
              {nav.login.label}
            </Link>
            <Link to={nav.signup.href} className={btnClass('inverse', 'sm')}>
              {nav.signup.label}
            </Link>
          </>
        }
      />
      <main id="top">
        <Hero />
        <HowItWorks />
        <SampleReport />
        <Principles />
        <Scope />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
