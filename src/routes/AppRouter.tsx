import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { MyTodosPage } from '../pages/MyTodosPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SignInPage } from '../pages/SignInPage'
import { ROUTES } from '../shared/constants/routes'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.todos} element={<MyTodosPage />} />
          <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

