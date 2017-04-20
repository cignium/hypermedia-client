// __tests__/hour-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/hour')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Hour from '../src/components/elements/inputs/date/hour'
import { createDateTime } from '../src/components/elements/inputs/date/date-util'

describe('Hour with min/max date', () => {
  let hour
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => hour.props.children[1].props.value
  const lastChildrenValue = () => hour.props.children[hour.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property, format) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Hour value={date} onCommit={commitSpy} minDate={property.minDate} maxDate={property.maxDate} />
    )
    hour = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 11:30', () => {
    const date = createDateTime('2012-03-10T11:30:00+00:00')

    describe('and with minDate 2012-03-10 10:31 and 12 hour format', () => {
      const minDate = createDateTime('2012-03-10T10:31:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate })
      })

      it('have minDate hours as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getHours())
      })

      it('have 12 as last option', () => {
        expect(lastChildrenValue()).toEqual(12)
      })

      describe('And changing to minDate hours', () => {
        it('sets the minutes to minDate minutes', () => {
          hour.props.onChange({ target: { value: minDate.getHours() }})
          expect(newDate().getUTCMinutes()).toEqual(minDate.getMinutes())
        })
      })
    })

    describe('and with maxDate 2012-03-10 11:29', () => {
      const maxDate = createDateTime('2012-03-10T11:29:00+00:00')

      beforeEach(() => {
        renderComponent(date, { maxDate })
      })

      it('have 00 as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have maxDate hour as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getHours())
      })

      describe('And changing to maxDate hours', () => {
        it('resets minutes to 00', () => {
          hour.props.onChange({ target: { value: maxDate.getHours() }})
          expect(newDate().getMinutes()).toEqual(0)
        })
      })
    })

    describe('and with minDate 2012-03-10 10:31 and maxDate 2012-03-10 11:29', () => {
      const minDate = createDateTime('2012-03-10T10:31:00+00:00')
      const maxDate = createDateTime('2012-03-10T11:29:00+00:00')

      beforeEach(() => {
        renderComponent(date, { minDate, maxDate })
      })

      it('have minDate hours as second option', () => {
        expect(secondChildrenValue()).toEqual(minDate.getHours())
      })

      it('have maxDate hours as last option', () => {
        expect(lastChildrenValue()).toEqual(maxDate.getHours())
      })
    })
  })
})
