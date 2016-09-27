// __tests__/date-picker-tests.js
jest.unmock('../src/components/elements/inputs/date/datetime-picker')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import DateTimePicker from '../src/components/elements/inputs/date/datetime-picker'

describe('Basic date time picker with value 2012-01-31 14:35:00', () => {
  let dateTimePicker

  beforeEach(() => {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <DateTimePicker value='2012-01-31T14:35:00+00:00' />
    )
    dateTimePicker = renderer.getRenderOutput()
  })

  it('sets the year to 2012', () => {
    const year = dateTimePicker.props.children[3]
    expect(year.props.value.getUTCFullYear()).toEqual(2012)
  })

  it('sets the month to 0', () => {
    const month = dateTimePicker.props.children[4]
    expect(month.props.value.getUTCMonth()).toEqual(0)
  })

  it('sets the day to 31', () => {
    const day = dateTimePicker.props.children[5]
    expect(day.props.value.getUTCDate()).toEqual(31)
  })

  it('sets the hour to 14', () => {
    const hour = dateTimePicker.props.children[6]
    expect(hour.props.value.getUTCHours()).toEqual(14)
  })

  it('sets the minutes to 35', () => {
    const minutes = dateTimePicker.props.children[8]
    expect(minutes.props.value.getUTCMinutes()).toEqual(35)
  })
})
