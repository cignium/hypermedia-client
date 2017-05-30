// __tests__/year-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/year')
jest.unmock('../src/components/elements/inputs/date/date-util')

import { createRenderer } from 'react-test-renderer/shallow'
import Year from '../src/components/elements/inputs/date/year'
import { createDate } from '../src/components/elements/inputs/date/date-util'

describe('Year with min/max date', () => {
  let year
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => year.props.children[1].props.value
  const lastChildrenValue = () => year.props.children[year.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]
  const currentYear = new Date().getFullYear()

  function renderComponent(date, property) {
    const renderer = createRenderer()
    renderer.render(
      <Year value={date} onCommit={commitSpy} minDate={property.minDate} maxDate={property.maxDate} />
    )

    year = renderer.getRenderOutput()
  }

  describe('with no date', () => {
    describe('and minDate 2012-02-10', () => {
      const minDate = createDate('2012-02-10')

      beforeEach(() => {
        renderComponent(null, { minDate })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')
      })

      it('has minDate year as the second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getFullYear())
      })

      it('has +100 years as the last option', () => {
        expect(lastChildrenValue()).toEqual(currentYear + 100)
      })
    })

    describe('and maxDate 2015-02-10', () => {
      const maxDate = createDate('2015-02-10')

      beforeEach(() => {
        renderComponent(null, { maxDate })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')
      })

      it('has -100 years as the second option', () => {
        expect(secondChildrenValue()).toEqual(currentYear - 100)
      })

      it('has maxDate year as the last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getFullYear())
      })
    })

    describe('and minDate 2012-02-10 and maxDate 2015-02-10', () => {
      const minDate = createDate('2012-02-10')
      const maxDate = createDate('2015-02-10')

      beforeEach(() => {
        renderComponent(null, { minDate, maxDate })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')
      })

      it('has minDate year as the second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getFullYear())
      })

      it('has maxDate year as the last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getFullYear())
      })

      describe('and setting year to minDate year', () => {
        it('returns to day and month of minDate', () => {
          year.props.onChange({ target: { value: minDate.getFullYear() }})
          expect(newDate().getDate()).toEqual(minDate.getDate())
          expect(newDate().getMonth()).toEqual(minDate.getMonth())
        })
      })

      describe('and setting year to maxDate year', () => {
        it('returns the first of January', () => {
          year.props.onChange({ target: { value: maxDate.getFullYear() } })
          expect(newDate().getDate()).toEqual(1)
          expect(newDate().getMonth()).toEqual(0)
        })
      })
    })
  })
})
