import { Outlet } from 'react-router-dom'
import { MenuBar } from '../shared/components/MenuBar'
import { TopBar } from '../shared/components/TopBar'

export function MainLayout() {
  return (
    <div className="layout-shell">
      <TopBar />
      <div className="layout-body">
        <MenuBar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

