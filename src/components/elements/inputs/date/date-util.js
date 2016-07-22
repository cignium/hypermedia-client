export function allMinutes() {
  const minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push(i)
  }

  return minutes
}

export function allHours() {
  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(i)
  }

  return hours
}

export function lastDayInMonth(year, month) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}

export function allDays(date) {
  const days = []
  if (!date) {
    return days
  }

  const lastDay = lastDayInMonth(date.getUTCFullYear(), date.getUTCMonth())
  for (let i = 1; i <= lastDay; i++) {
    days.push(i)
  }

  return days
}

export function allMonths() {
  return [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ]
}

export function allYears() {
  const years = []
  let current = new Date().getUTCFullYear() - 100
  for (let i = 0; i <= 200; i++) {
    years.push(current++)
  }

  return years
}
