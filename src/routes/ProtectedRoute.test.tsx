import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProtectedRoute } from './ProtectedRoute'
import { createTestStore } from '../test/testStore'

describe('ProtectedRoute', () => {
  it('redirects unauthenticated user to sign-in', () => {
    const store = createTestStore(null)

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/sign-in" element={<p>Sign In Page</p>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<p>Dashboard</p>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText('Sign In Page')).toBeInTheDocument()
  })
})

