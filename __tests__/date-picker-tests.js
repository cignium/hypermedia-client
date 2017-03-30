// __tests__/date-picker-tests.js
jest.unmock('../src/components/elements/inputs/date/datetime-picker')
jest.unmock('../node_modules/moment/moment.js')

import TestUtils from 'react-addons-test-utils'
import DatePicker from '../src/components/elements/inputs/date/datetime-picker'

describe('Basic date picker with value 2012-01-31', () => {
  let datePicker

  function getComponent(which) {
    if (which === 'Year') {
      return datePicker.props.children.props.children[0]
    }
    if (which === 'Month') {
      return datePicker.props.children.props.children[1]
    }
    if (which === 'Day') {
      return datePicker.props.children.props.children[2]
    }
  }

  beforeEach(() => {
    const renderer = TestUtils.createRenderer()
    renderer.render(<DatePicker value='2012-01-31' />)
    datePicker = renderer.getRenderOutput()
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
    const day =  getComponent('Day')
    expect(day.props.value.getUTCDate()).toEqual(31)
  })
})
