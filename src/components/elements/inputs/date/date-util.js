export function lastDayInMonth(year, month) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}
