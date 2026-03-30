import { Link } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routes'

export function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <Link to={ROUTES.dashboard}>Go to dashboard</Link>
    </section>
  )
}

