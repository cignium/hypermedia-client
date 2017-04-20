// __tests__/day-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/day')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Day from '../src/components/elements/inputs/date/day'
import { createDateTime } from '../src/components/elements/inputs/date/date-util'

describe('Day with min/max date', () => {
  let day
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => day.props.children[1].props.value
  const lastChildrenValue = () => day.props.children[day.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Day value={date} onCommit={commitSpy} minDate={property.minDate} maxDate={property.maxDate} />
    )
    day = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 09:30', () => {
    const date = createDateTime('2012-03-05T09:30:00+00:00')

    describe('and with minDate 2012-03-05 10:30', () => {
      const minDate = createDateTime('2012-03-05T10:30:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate })
      })

      it('have minDate day as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getDate())
      })

      it('have 31 as last option', () => {
        expect(lastChildrenValue()).toEqual(31)
      })

      describe('And changing day to 5', () => {
        it('sets to minDate hour', () => {
          day.props.onChange({ target: { value: 5 } })
          expect(newDate().getHours()).toEqual(minDate.getHours())
        })
      })
    })

    describe('and with maxDate 2012-03-11 08:30', () => {
      const maxDate = createDateTime('2012-03-11T08:30:00+00:00')

      beforeEach(() => {
        renderComponent(date, { maxDate })
      })

      it('have 1 as second option', () => {
        expect(secondChildrenValue()).toEqual(1)
      })

      it('have maxDate day as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getDate())
      })

      describe('And changing day to maxDate day', () => {
        it('resets hour to 00', () => {
          day.props.onChange({ target: { value: maxDate.getDate() }})
          expect(newDate().getHours()).toEqual(0)
        })
      })
    })

    describe('and with minDate 2012-03-05 10:30 and with maxDate 2012-03-11 08:30', () => {
      const minDate = createDateTime('2012-03-05T10:30:00+00:00')
      const maxDate = createDateTime('2012-03-11T08:30:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate, maxDate })
      })

      it('have minDate day as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getDate())
      })

      it('have maxDate day as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getDate())
      })
    })
  })
})
