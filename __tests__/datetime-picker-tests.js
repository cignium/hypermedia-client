// __tests__/date-picker-tests.js
jest.unmock('../src/components/elements/inputs/date/datetime-picker')
jest.unmock('../node_modules/moment/moment.js')

import { createRenderer } from 'react-test-renderer/shallow'
import DateTimePicker from '../src/components/elements/inputs/date/datetime-picker'

describe('Basic date time picker with value 2012-01-31 14:35:00', () => {
  let dateTimePicker

  function getComponent(which) {
    if (which === 'Year') {
      return dateTimePicker.props.children.props.children[0]
    }
    if (which === 'Month') {
      return dateTimePicker.props.children.props.children[1]
    }
    if (which === 'Day') {
      return dateTimePicker.props.children.props.children[2]
    }
    if (which === 'Hour') {
      return dateTimePicker.props.children.props.children[3]
    }
    if (which === 'Minute') {
      return dateTimePicker.props.children.props.children[5]
    }
  }

  beforeEach(() => {
    const renderer = createRenderer()
    renderer.render(
      <DateTimePicker value='2012-01-31T14:35:00+00:00' />
    )
    dateTimePicker = renderer.getRenderOutput()
  })

  it('sets the year to 2012', () => {
    const year = getComponent('Year')
    expect(year.props.value.getUTCFullYear()).toEqual(2012)
  })

  it('sets the month to 0', () => {
    const month = getComponent('Month')
    expect(month.props.value.getUTCMonth()).toEqual(0)
  })

  it('sets the day to 31', () => {
    const day = getComponent('Day')
    expect(day.props.value.getUTCDate()).toEqual(31)
  })

  it('sets the hour to 14', () => {
    const hour = getComponent('Hour')
    expect(hour.props.value.getUTCHours()).toEqual(14)
  })

  it('sets the minutes to 35', () => {
    const minutes = getComponent('Minute')
    expect(minutes.props.value.getUTCMinutes()).toEqual(35)
  })
})
