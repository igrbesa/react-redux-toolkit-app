import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { signOutThunk } from '../../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

export function TopBar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(signOutThunk())
    navigate(ROUTES.signIn)
  }

  return (
    <header className="top-bar">
      <h1>React Redux Starter</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

