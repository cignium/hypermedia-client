export function allMinutes(lowerLimit, upperLimit) {
  let minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push(i)
  }

  if (lowerLimit || lowerLimit === 0) {
    minutes = minutes.filter(minute => minute >= lowerLimit)
  }

  if (upperLimit || upperLimit === 0) {
    minutes = minutes.filter(minute => minute <= upperLimit)
  }

  return minutes
}

export function getAvailableMinutes(minDate, maxDate, year, month, day, hour) {
  if (!year && !month && !day && !hour && !minDate && !maxDate) {
    return allMinutes()
  }

  const isMaxHour = maxDate &&
                      maxDate.getFullYear() == year &&
                      maxDate.getMonth() == month &&
                      maxDate.getDate() == day &&
                      maxDate.getHours() == hour

  const isMinHour = minDate &&
                      minDate.getFullYear() == year &&
                      minDate.getMonth() == month &&
                      minDate.getDate() == day &&
                      minDate.getHours() == hour

  const lowerLimit = isMinHour && minDate.getMinutes()
  const upperLimit = isMaxHour && maxDate.getMinutes()

  return allMinutes(lowerLimit, upperLimit)
}

export function calculateMinutes(minDate, maxDate, year, month, day, hour, currentMinutes) {
  const availableMinutes = getAvailableMinutes(minDate, maxDate, year, month, day, hour)

  if (availableMinutes.find(minutes => minutes == currentMinutes)) {
    return currentMinutes
  }

  return availableMinutes.length > 0 ? availableMinutes[0] : ''
}

export function allHours(lowerLimit, upperLimit) {
  let hours = []

  for (let i = 0; i < 24; i++) {
    hours.push(i)
  }

  if (lowerLimit || lowerLimit === 0) {
    hours = hours.filter(hour => hour >= lowerLimit)
  }

  if (upperLimit || upperLimit === 0) {
    hours = hours.filter(hour => hour <= upperLimit)
  }

  return hours
}

export function getAvailableHours(minDate, maxDate, year, month, day) {
  if (!year && !month && !day && !minDate && !maxDate) {
    return allHours()
  }

  const isMaxDay = maxDate &&
                      maxDate.getFullYear() == year &&
                      maxDate.getMonth() == month &&
                      maxDate.getDate() == day

  const isMinDay = minDate &&
                      minDate.getFullYear() == year &&
                      minDate.getMonth() == month &&
                      minDate.getDate() == day

  const lowerLimit = isMinDay && minDate.getHours()
  const upperLimit = isMaxDay && maxDate.getHours()

  return allHours(lowerLimit, upperLimit)
}

export function calculateHours(minDate, maxDate, year, month, day, currentHours) {
  const availableHours = getAvailableHours(minDate, maxDate, year, month, day)

  if (availableHours.find(hours => hours == currentHours)) {
    return currentHours
  }

  return availableHours.length > 0 ? availableHours[0] : ''
}

export function lastDayInMonth(year, month) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}

export function allDays(year, month, lowerLimit, upperLimit) {
  let days = []

  const lastDay = !year && !month ? 31 : lastDayInMonth(year, month)

  for (let i = 1; i <= lastDay; i++) {
    days.push(i)
  }

  if (lowerLimit || lowerLimit === 0) {
    days = days.filter(day => day >= lowerLimit)
  }

  if (upperLimit || upperLimit === 0) {
    days = days.filter(day => day <= upperLimit)
  }

  return days
}

export function getAvailableDays(minDate, maxDate, year, month) {
  if (!year && !month && !minDate && !maxDate) {
    return allDays()
  }

  const isMaxMonth = maxDate &&
                      maxDate.getFullYear() == year &&
                      maxDate.getMonth() == month
  const isMinMonth = minDate &&
                      minDate.getFullYear() == year &&
                      minDate.getMonth() == month

  const lowerLimit = isMinMonth && minDate.getDate()
  const upperLimit = isMaxMonth && maxDate.getDate()

  return allDays(year, month, lowerLimit, upperLimit)
}

export function calculateDay(minDate, maxDate, year, month, currentDay) {
  const availableDays = getAvailableDays(minDate, maxDate, year, month)
  const day = validateDay(year, month, currentDay)

  if (availableDays.find(d => d == day)) {
    return day
  }

  return availableDays.length > 0 ? availableDays[0] : ''
}

export function allMonths(lowerLimit, upperLimit) {
  let months = [
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

  if (lowerLimit || lowerLimit === 0) {
    months = months.filter(month => month.value >= lowerLimit)
  }

  if (upperLimit || upperLimit === 0) {
    months = months.filter(month => month.value <= upperLimit)
  }

  return months
}

export function getAvailableMonths(minDate, maxDate, year) {
  if (!year && !minDate && !maxDate) {
    return allMonths()
  }

  const isMaxYear = maxDate && maxDate.getFullYear() == year
  const isMinYear = minDate && minDate.getFullYear() == year

  const lowerLimit = isMinYear && minDate.getMonth()
  const upperLimit = isMaxYear && maxDate.getMonth()

  return allMonths(lowerLimit, upperLimit)
}

export function calculateMonth(minDate, maxDate, year, currentMonth) {
  const availableMonths = getAvailableMonths(minDate, maxDate, year)

  if (availableMonths.find(month => month.value == currentMonth)) {
    return currentMonth
  }

  return availableMonths.length > 0 ? availableMonths[0].value : ''
}

export function allYears(lowerLimit, upperLimit) {
  const years = []

  for (let i = lowerLimit; i <= upperLimit; i++) {
    years.push(i)
  }

  return years
}

export function getAvailableYears(minDate, maxDate) {
  const defaultSize = 100
  const currentYear = new Date().getFullYear()
  const defaultLowerLimit = currentYear - defaultSize
  const defaultUpperLimit = currentYear + defaultSize

  if (!minDate && !maxDate) {
    return allYears(defaultLowerLimit, defaultUpperLimit)
  }

  const lowerLimit = minDate ? minDate.getFullYear() : defaultLowerLimit
  const upperLimit = maxDate ? maxDate.getFullYear() : defaultUpperLimit

  return allYears(lowerLimit, upperLimit)
}

export function createDateTime(value) {
  if (!value) {
    return null
  }

  return new Date(value)
}

export function createDate(value) {
  if (!value) {
    return null
  }

  const dateParts = value.split('-')

  return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]))
}

export function validateDay(year, month, day) {
  const daysInMonth = lastDayInMonth(year, month)
  return day > daysInMonth ? daysInMonth : day
}
