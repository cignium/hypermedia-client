// __tests__/day-tests.js
jest.unmock('../src/components/elements/inputs/date/day')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Day from '../src/components/elements/inputs/date/day'

describe('Day with min/max date', () => {
  let day
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => day.props.children[1].props.value
  const lastChildrenValue = () => day.props.children[day.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Day value={date} onCommit={commitSpy} property={property} />
    )
    day = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 09:30', () => {
    const date = new Date(Date.UTC(2012, 2, 10, 9, 30))

    describe('and with minDate 2012-03-05 10:30', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-03-05T10:30:00+00:00' })
      })

      it('have 5 as second option', () => {
        expect(secondChildrenValue()).toEqual(5)
      })

      it('have 31 as last option', () => {
        expect(lastChildrenValue()).toEqual(31)
      })

      describe('And changing day to 5', () => {
        it('sets the hour to 10', () => {
          day.props.onChange({ target: { value: 5 }})
          expect(newDate().getUTCHours()).toEqual(10)
        })
      })
    })
    
    describe('and with maxDate 2012-03-11 08:30', () => {
      beforeEach(() => {
        renderComponent(date, { maxDate: '2012-03-11T08:30:00+00:00' })
      })

      it('have 1 as second option', () => {
        expect(secondChildrenValue()).toEqual(1)
      })

      it('have 11 as last option', () => {
        expect(lastChildrenValue()).toEqual(11)
      })

      describe('And changing day to 11', () => {
        it('resets hour to 00', () => {
          day.props.onChange({ target: { value: 11 }})
          expect(newDate().getUTCHours()).toEqual(0)
        })
      })
    })

    describe('and with minDate 2012-03-05 10:30 and with maxDate 2012-03-11 08:30', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-03-05T10:30:00+00:00', maxDate: '2012-03-11T08:30:00+00:00' })
      })

      it('have 5 as second option', () => {
        expect(secondChildrenValue()).toEqual(5)
      })

      it('have 11 as last option', () => {
        expect(lastChildrenValue()).toEqual(11)
      })
    })
  })
})
