// __tests__/month-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/month')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Month from '../src/components/elements/inputs/date/month'

describe('Month with min/max date', () => {
  let month
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => month.props.children[1].props.value
  const lastChildrenValue = () => month.props.children[month.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0].toISOString().split('T')[0]

  function renderComponent(date, property) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Month value={date} onCommit={commitSpy} property={property} />
    )

    month = renderer.getRenderOutput()
  }

  describe('with date 2012-03-27', () => {
    const date = new Date(Date.UTC(2012, 2, 27))

    describe('and with minDate 2012-02-28', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-02-28T00:00:00+00:00' })
      })

      it('have February as second option', () => {
        expect(secondChildrenValue()).toEqual(1)
      })

      it('have December as last option', () => {
        expect(lastChildrenValue()).toEqual(11)
      })

      describe('And changing month to February', () => {
        it('returns 28th February', () => {
          month.props.onChange({ target: { value: 1 }})
          expect(newDate()).toEqual('2012-02-28')
        })
      })
    })

    describe('and with maxDate 2012-04-26', () => {
      beforeEach(() => {
        renderComponent(date, { maxDate: '2012-04-26T00:00:00+00:00' })
      })

      it('have January as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have April as last option', () => {
        expect(lastChildrenValue()).toEqual(3)
      })

      describe('And changing month to April', () => {
        it('resets to 1st April', () => {
          month.props.onChange({ target: { value: 3 }})
          expect(newDate()).toEqual('2012-04-01')
        })
      })
    })

    describe('and with minDate 2012-02-28 and maxDate 2012-04-26', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-02-28T00:00:00+00:00', maxDate: '2012-04-26T00:00:00+00:00' })
      })

      it('have February as second option', () => {
        expect(secondChildrenValue()).toEqual(1)
      })

      it('have April as last option', () => {
        expect(lastChildrenValue()).toEqual(3)
      })
    })
  })
})
