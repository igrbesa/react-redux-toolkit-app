import { useEffect, useState } from 'react'
import { fetchTodos } from '../services/todos/todoService'
import {
  computeCompletedPeriodStats,
  type CompletedPeriodStats,
} from '../services/todos/todoStats'

type LoadState =
  | { status: 'idle' | 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; stats: CompletedPeriodStats }

export function DashboardPage() {
  const [state, setState] = useState<LoadState>({ status: 'idle' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    fetchTodos()
      .then((res) => {
        if (cancelled) return
        const stats = computeCompletedPeriodStats(res.data)
        setState({ status: 'ready', stats })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : 'Failed to load todos.'
        setState({ status: 'error', message })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="dashboard-page">
      <h2>Dashboard</h2>
      <p>You are now signed in.</p>

      <div className="dashboard-stats-section">
        <h3>Completed items</h3>
        <p className="dashboard-stats-hint">
          Loaded via <code>GET /todos</code> with the auth token. Period counts
          use inferred dates when the API does not include completion times.
        </p>

        {state.status === 'loading' || state.status === 'idle' ? (
          <p className="dashboard-stats-loading">Loading stats…</p>
        ) : null}

        {state.status === 'error' ? (
          <p className="form-error" role="alert">
            {state.message}
          </p>
        ) : null}

        {state.status === 'ready' ? (
          <ul className="dashboard-stats-grid">
            <li className="dashboard-stat-card">
              <span className="dashboard-stat-label">Today</span>
              <span className="dashboard-stat-value" aria-live="polite">
                {state.stats.today}
              </span>
            </li>
            <li className="dashboard-stat-card">
              <span className="dashboard-stat-label">Last 7 days</span>
              <span className="dashboard-stat-value" aria-live="polite">
                {state.stats.last7Days}
              </span>
            </li>
            <li className="dashboard-stat-card">
              <span className="dashboard-stat-label">This month</span>
              <span className="dashboard-stat-value" aria-live="polite">
                {state.stats.thisMonth}
              </span>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  )
}
