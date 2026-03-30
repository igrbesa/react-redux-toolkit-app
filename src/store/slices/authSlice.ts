import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../../services/auth/authService'

type AuthState = {
  token: string | null
}

const initialState: AuthState = {
  token: authService.isAuthenticated() ? 'fake-jwt-token' : null,
}

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (credentials: { username: string; password: string }) => {
    return authService.login(credentials.username, credentials.password)
  },
)

export const signOutThunk = createAsyncThunk('auth/signOut', async () => {
  authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    clearToken(state) {
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.token = action.payload
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.token = null
      })
  },
})

export const { setToken, clearToken } = authSlice.actions
export const authReducer = authSlice.reducer

