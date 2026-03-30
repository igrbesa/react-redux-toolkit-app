import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SignInPage } from './SignInPage'
import { createTestStore } from '../test/testStore'

describe('SignInPage', () => {
  it('stores token and navigates to dashboard', async () => {
    const user = userEvent.setup()
    const store = createTestStore(null)

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/sign-in']}>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/dashboard" element={<p>Dashboard</p>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    await user.type(screen.getByLabelText('Username'), 'john')
    await user.type(screen.getByLabelText('Password'), 'secret')
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(localStorage.getItem('auth_token')).toBe('fake-jwt-token')
  })
})

