import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/appConfig'
import { notFound } from '@/config/siteContent'
import { container } from '@/utils/layout'

export function NotFound() {
  return (
    <main className={`${container} flex flex-col gap-ds-4 py-ds-8`}>
      <h1 className="display m-0">{notFound.title}</h1>
      <p className="body m-0 text-muted">{notFound.body}</p>
      <p className="m-0">
        <Link className="bn-link" to={ROUTES.home}>
          {notFound.home}
        </Link>
      </p>
    </main>
  )
}
