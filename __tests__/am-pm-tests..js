// __tests__/minute-tests.js
jest.unmock('../src/components/elements/inputs/date/am-pm')
jest.unmock('../src/components/elements/inputs/date/date-util')
jest.unmock('../node_modules/moment/moment.js')

import TestUtils from 'react-addons-test-utils'
import AmPm from '../src/components/elements/inputs/date/am-pm'

describe('AM/PM', () => {
  let amPm
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <AmPm value={date} onCommit={commitSpy} />
    )
    amPm = renderer.getRenderOutput()
  }

  describe('with null date time', () => {
    beforeEach(() => {
      renderComponent(null)
    })

    it('disables button', () => {
      expect(amPm.props.disabled).toEqual(true)
    })

    it('set text to AM', () => {
      expect(amPm.props.children).toEqual('AM')
    })
  })

  describe('with date time 2012-02-01 5:25', () => {
    beforeEach(() => {
      renderComponent(new Date(2012, 1, 1, 5, 25))
    })

    it('sets the label to AM', () => {
      expect(amPm.props.children).toEqual('AM')
    })

    it('changes to PM when clicked', () => {
      amPm.props.onClick()
      const newDate = commitSpy.calls.mostRecent().args[0]
      expect(newDate.format('A')).toEqual('PM')
    })
  })

  describe('with date time 2012-02-01 20:25', () => {
    beforeEach(() => {
      renderComponent(new Date(2012, 1, 1, 20, 25))
    })

    it('sets the label to PM', () => {
      expect(amPm.props.children).toEqual('PM')
    })

    it('changes to AM when clicked', () => {
      amPm.props.onClick()
      const newDate = commitSpy.calls.mostRecent().args[0]
      expect(newDate.format('A')).toEqual('AM')
    })
  })
})
