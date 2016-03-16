// __tests__/date-picker-tests.js
jest.unmock('../src/components/elements/inputs/date/date-picker')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DatePicker from '../src/components/elements/inputs/date/date-picker'

describe('Basic date picker with value 2012-01-31', () => {
  let datePicker

  beforeEach(() => {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <DatePicker value='2012-01-31' />
    )
    datePicker = renderer.getRenderOutput()
  })

  it('sets the year to 2012', () => {
    const year = datePicker.props.children[0]
    expect(year.props.value.getFullYear()).toEqual(2012)
  })

  it('sets the month to 0', () => {
    const month = datePicker.props.children[1]
    expect(month.props.value.getMonth()).toEqual(0)
  })

  it('sets the day to 31', () => {
    const day = datePicker.props.children[2]
    expect(day.props.value.getDate()).toEqual(31)
  })
})
