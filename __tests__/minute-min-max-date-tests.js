// __tests__/minute-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/minute')
jest.unmock('../src/components/elements/inputs/date/date-util')

import { createRenderer } from 'react-test-renderer/shallow'
import Minute from '../src/components/elements/inputs/date/minute'
import { createDateTime } from '../src/components/elements/inputs/date/date-util'

describe('Minute with min/max date', () => {
  let minute
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => minute.props.children[1].props.value
  const lastChildrenValue = () => minute.props.children[minute.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property) {
    const renderer = createRenderer()
    renderer.render(
      <Minute value={date} onCommit={commitSpy} minDate={property.minDate} maxDate={property.maxDate} />
    )
    minute = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 11:30', () => {
    const date = createDateTime('2012-03-10T11:30:00+00:00')

    describe('and with minDate 2012-03-10 11:30', () => {
      const minDate = createDateTime('2012-03-10T11:30:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate })
      })

      it('have minDate minutes as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getMinutes())
      })

      it('have 59 as last option', () => {
        expect(lastChildrenValue()).toEqual(59)
      })
    })

    describe('and with maxDate 2012-03-10 11:30', () => {
      const maxDate = createDateTime('2012-03-10T11:30:00+00:00')

      beforeEach(() => {
        renderComponent(date, { maxDate })
      })

      it('have 00 as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have maxDate minutes as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getMinutes())
      })
    })

    describe('and with minDate 2012-03-10 11:30 and maxDate 2012-03-10 11:45', () => {
      const minDate = createDateTime('2012-03-10T11:30:00+00:00')
      const maxDate = createDateTime('2012-03-10T11:45:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate , maxDate })
      })

      it('have minDate minutes as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getMinutes())
      })

      it('have maxDate minutes as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getMinutes())
      })
    })
  })
})
