import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routes'
import { useAppSelector } from '../store/hooks'

export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token)
  if (!token) {
    return <Navigate to={ROUTES.signIn} replace />
  }

  return <Outlet />
}

