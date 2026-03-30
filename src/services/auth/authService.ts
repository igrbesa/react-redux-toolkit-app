import { tokenStorage } from '../storage/tokenStorage'
import { httpClient } from '../http/httpClient'

const FAKE_TOKEN = 'fake-jwt-token'

export const authService = {
  login(username: string, password: string) {
    if (!username.trim() || !password.trim()) {
      throw new Error('Username and password are required.')
    }

    tokenStorage.setToken(FAKE_TOKEN)
    return FAKE_TOKEN
  },
  logout() {
    tokenStorage.clearToken()
  },
  isAuthenticated() {
    return Boolean(tokenStorage.getToken())
  },
  getTodos() {
    return httpClient.get('/todos?_limit=5')
  },
}

