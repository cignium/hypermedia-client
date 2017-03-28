// __tests__/hour-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/hour')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Hour from '../src/components/elements/inputs/date/hour'

describe('Hour with min/max date', () => {
  let hour
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => hour.props.children[1].props.value
  const lastChildrenValue = () => hour.props.children[hour.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property, format) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Hour value={date} onCommit={commitSpy} property={property} />
    )
    hour = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 11:30', () => {
    const date = new Date(2012, 2, 10, 11, 30)

    describe('and with minDate 2012-03-10 10:31 and 12 hour format', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: new Date(2012,2,10,10,31).toISOString() })
      })

      it('have 10 as second option', () => {
        expect(secondChildrenValue()).toEqual(10)
      })

      it('have 12 as last option', () => {
        expect(lastChildrenValue()).toEqual(12)
      })

      describe('And changing hour to 10', () => {
        it('sets the minutes to 31', () => {
          hour.props.onChange({ target: { value: 10 }})
          expect(newDate().getUTCMinutes()).toEqual(31)
        })
      })
    })

    describe('and with maxDate 2012-03-10 12:29', () => {
      beforeEach(() => {
        renderComponent(date, { maxDate: new Date(2012,2,10,12,29).toISOString() })
      })

      it('have 00 as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have 12 as last option', () => {
        expect(lastChildrenValue()).toEqual(12)
      })

      describe('And changing hour to 12', () => {
        it('resets minutes to 00', () => {
          hour.props.onChange({ target: { value: 12 }})
          expect(newDate().getUTCMinutes()).toEqual(0)
        })
      })
    })

    describe('and with minDate 2012-03-10 10:31 and maxDate 2012-03-10 12:29', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: new Date(2012,2,10,10,31).toISOString(), maxDate: new Date(2012,2,10,12,29).toISOString() })
      })

      it('have 10 as second option', () => {
        expect(secondChildrenValue()).toEqual(10)
      })

      it('have 12 as last option', () => {
        expect(lastChildrenValue()).toEqual(12)
      })
    })
  })
})
