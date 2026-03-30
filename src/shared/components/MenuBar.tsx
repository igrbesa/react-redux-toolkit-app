import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function MenuBar() {
  return (
    <nav className="menu-bar">
      <NavLink to={ROUTES.dashboard}>Dashboard</NavLink>
      <NavLink to={ROUTES.todos}>My Todos</NavLink>
    </nav>
  )
}

