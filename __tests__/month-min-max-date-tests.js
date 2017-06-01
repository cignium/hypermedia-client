// __tests__/month-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/month')
jest.unmock('../src/components/elements/inputs/date/date-util')

import { createRenderer } from 'react-test-renderer/shallow'
import Month from '../src/components/elements/inputs/date/month'
import { createDate } from '../src/components/elements/inputs/date/date-util'

describe('Month with min/max date', () => {
  let month
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => month.props.children[1].props.value
  const lastChildrenValue = () => month.props.children[month.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property) {
    const renderer = createRenderer()
    renderer.render(
      <Month value={date} onCommit={commitSpy} minDate={property.minDate} maxDate={property.maxDate} />
    )

    month = renderer.getRenderOutput()
  }

  describe('with date 2012-03-27', () => {
    const date = createDate('2012-03-27T00:00:00+00:00')

    describe('and with minDate 2012-02-28', () => {
      const minDate = createDate('2012-02-28T00:00:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate })
      })

      it('have minDate month as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getMonth())
      })

      it('have December as last option', () => {
        expect(lastChildrenValue()).toEqual(11)
      })

      describe('And changing month to minDate month', () => {
        it('returns to minDate', () => {
          month.props.onChange({ target: { value: minDate.getMonth() }})
          expect(newDate()).toEqual(minDate)
        })
      })
    })

    describe('and with maxDate 2012-04-26', () => {
      const maxDate = createDate('2012-04-26T00:00:00+00:00')

      beforeEach(() => {
        renderComponent(date, { maxDate })
      })

      it('have January as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have maxDate month as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getMonth())
      })

      describe('And changing month to maxDate month', () => {
        it('resets to 1st of maxDate month', () => {
          month.props.onChange({ target: { value: maxDate.getMonth() }})
          expect(newDate().getDate()).toEqual(1)
          expect(newDate().getMonth()).toEqual(maxDate.getMonth())
        })
      })
    })

    describe('and with minDate 2012-02-28 and maxDate 2012-04-26', () => {
      const minDate = createDate('2012-02-28')
      const maxDate = createDate('2012-04-26')

      beforeEach(() => {
        renderComponent(date, { minDate, maxDate })
      })

      it('have minDate month as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getMonth())
      })

      it('have maxDate month as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getMonth())
      })
    })
  })
})
