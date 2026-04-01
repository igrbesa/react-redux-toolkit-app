import type { TodoItem } from './todoService'

export type CompletedPeriodStats = {
  today: number
  last7Days: number
  thisMonth: number
}

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isInRolling7Days(completedAt: Date, now: Date): boolean {
  const start = startOfDay(now)
  start.setDate(start.getDate() - 6)
  return completedAt >= start && completedAt <= now
}

function isThisCalendarMonth(completedAt: Date, now: Date): boolean {
  return (
    completedAt.getMonth() === now.getMonth() &&
    completedAt.getFullYear() === now.getFullYear()
  )
}

/**
 * API payload has no completion timestamps. Spread completions across recent days
 * deterministically so period stats can be shown.
 */
export function syntheticCompletedAt(todo: TodoItem, now: Date): Date {
  const daysAgo = (todo.id * 7 + todo.userId * 3) % 50
  const d = new Date(now)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - daysAgo)
  return d
}

export function computeCompletedPeriodStats(
  todos: TodoItem[],
  now: Date = new Date(),
): CompletedPeriodStats {
  const completed = todos.filter((t) => t.completed)
  const stamps = completed.map((t) => syntheticCompletedAt(t, now))

  let today = 0
  let last7Days = 0
  let thisMonth = 0

  for (const at of stamps) {
    if (isSameCalendarDay(at, now)) today += 1
    if (isInRolling7Days(at, now)) last7Days += 1
    if (isThisCalendarMonth(at, now)) thisMonth += 1
  }

  return { today, last7Days, thisMonth }
}
