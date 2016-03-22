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
  const months = []
  const language = window.navigator.userLanguage || window.navigator.language
  const formatter = new Intl.DateTimeFormat(language, { month: 'long' })
  const current = new Date(2016, 0)

  for (let i = 0; i < 12; i++) {
    months.push({ label: formatter.format(current), value: i })
    current.setMonth(i + 1)
  }

  return months
}

export function allYears() {
  const years = []
  let current = new Date().getUTCFullYear() - 100
  for (let i = 0; i <= 200; i++) {
    years.push(current++)
  }

  return years
}
