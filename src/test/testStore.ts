import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../store/slices/authSlice'

export function createTestStore(preloadedToken: string | null = null) {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: { token: preloadedToken },
    },
  })
}

