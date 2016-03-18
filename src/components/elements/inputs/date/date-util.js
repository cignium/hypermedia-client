export function getFormattedDate(date) {
  if (!date)
    return null

  const utcDate = new Date()
  utcDate.setFullYear(date.getFullYear())
  utcDate.setMonth(date.getMonth())
  utcDate.setDate(date.getDate())
  return utcDate.toISOString().split('T')[0]
}

export function lastDayInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function allDays(date) {
  const days = []
  if (!date) {
    return days
  }

  const lastDay = lastDayInMonth(date.getFullYear(), date.getMonth())
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
  let current = new Date().getFullYear() - 100
  for (let i = 0; i <= 200; i++) {
    years.push(current++)
  }

  return years
}
