import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { signInThunk } from '../store/slices/authSlice'
import { ROUTES } from '../shared/constants/routes'

export function SignInPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await dispatch(signInThunk({ username, password })).unwrap()
      navigate(ROUTES.dashboard)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed')
    }
  }

  return (
    <div className="signin-wrapper">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

