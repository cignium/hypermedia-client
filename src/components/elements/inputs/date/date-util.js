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
  const current = new Date(Date.UTC(2016, 0))

  for (let i = 0; i < 12; i++) {
    months.push({ label: formatter.format(current), value: i })
    current.setUTCMonth(i + 1)
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
