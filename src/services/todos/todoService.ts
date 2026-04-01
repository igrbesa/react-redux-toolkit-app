import { httpClient } from '../http/httpClient'

export type TodoItem = {
  userId: number
  id: number
  title: string
  completed: boolean
}

/** Full list from GET /todos — Authorization header is set by httpClient when a token exists. */
export function fetchTodos() {
  return httpClient.get<TodoItem[]>('/todos')
}
