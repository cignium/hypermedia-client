// __tests__/minute-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/minute')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Minute from '../src/components/elements/inputs/date/minute'

describe('Minute with min/max date', () => {
  let minute
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => minute.props.children[1].props.value
  const lastChildrenValue = () => minute.props.children[minute.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0]

  function renderComponent(date, property) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Minute value={date} onCommit={commitSpy} property={property} />
    )
    minute = renderer.getRenderOutput()
  }

  describe('and with date 2012-03-10 11:30', () => {
    const date = new Date(Date.UTC(2012, 2, 10, 11, 30))

    describe('and with minDate 2012-03-10 11:30', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-03-10T11:30:00+00:00' })
      })

      it('have 30 as second option', () => {
        expect(secondChildrenValue()).toEqual(30)
      })

      it('have 59 as last option', () => {
        expect(lastChildrenValue()).toEqual(59)
      })
    })
    
    describe('and with maxDate 2012-03-10 11:30', () => {
      beforeEach(() => {
        renderComponent(date, { maxDate: '2012-03-10T11:30:00+00:00' })
      })

      it('have 00 as second option', () => {
        expect(secondChildrenValue()).toEqual(0)
      })

      it('have 30 as last option', () => {
        expect(lastChildrenValue()).toEqual(30)
      })
    })

    describe('and with minDate 2012-03-10 11:30 and maxDate 2012-03-10 11:45', () => {
      beforeEach(() => {
        renderComponent(date, { minDate: '2012-03-10T11:30:00+00:00', maxDate: '2012-03-10T11:45:00+00:00' })
      })

      it('have 30 as second option', () => {
        expect(secondChildrenValue()).toEqual(30)
      })

      it('have 45 as last option', () => {
        expect(lastChildrenValue()).toEqual(45)
      })
    })
  })
})