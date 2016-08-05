// __tests__/year-min-max-date-tests.js
jest.unmock('../src/components/elements/inputs/date/year')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Year from '../src/components/elements/inputs/date/year'

describe('Year with min/max date', () => {
  let year
  const commitSpy = jasmine.createSpy('OnCommit')
  const secondChildrenValue = () => year.props.children[1].props.value
  const lastChildrenValue = () => year.props.children[year.props.children.length - 1].props.value
  const newDate = () => commitSpy.calls.mostRecent().args[0].toISOString().split('T')[0]
  const currentYear = new Date().getFullYear()

  function renderComponent(date, property) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Year value={date} onCommit={commitSpy} property={property} />
    )

    year = renderer.getRenderOutput()
  }

  describe('with no date', () => {
    

    describe('and minDate 2012-02-10', () => {
      beforeEach(() => {
        renderComponent(null, { minDate: '2012-02-10T00:00:00+00:00' })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')  
      })

      it('has 2012 as the second option', () => {
        expect(secondChildrenValue()).toEqual(2012)  
      })

      it('has +100 years as the last option', () => {
        expect(lastChildrenValue()).toEqual(currentYear + 100)  
      })
    })
    
    describe('and maxDate 2015-02-10', () => {
      beforeEach(() => {
        renderComponent(null, { maxDate: '2015-02-10T00:00:00+00:00' })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')  
      })

      it('has -100 years as the second option', () => {
        expect(secondChildrenValue()).toEqual(currentYear - 100)  
      })

      it('has 2015 as the last option', () => {
        expect(lastChildrenValue()).toEqual(2015)  
      })
    })

    describe('and minDate 2012-02-10 and maxDate 2015-02-10', () => {
      beforeEach(() => {
        renderComponent(null, { minDate: '2012-02-10T00:00:00+00:00', maxDate: '2015-02-10T00:00:00+00:00' })
      })

      it('has no value', () => {
        expect(year.props.value).toBe('')  
      })

      it('has 2012 as the second option', () => {
        expect(secondChildrenValue()).toEqual(2012)  
      })

      it('has 2015 as the last option', () => {
        expect(lastChildrenValue()).toEqual(2015)  
      })

      describe('and setting year to 2012', () => {
        it('returns the 10th of February 2012', () => {
          year.props.onChange({ target: { value: 2012 }})
          expect(newDate()).toEqual('2012-02-10')
        })
      })

      describe('and setting year to 2015', () => {
        it('returns the first of January 2015', () => {
          year.props.onChange({ target: { value: 2015 }})
          expect(newDate()).toEqual('2015-01-01')
        })
      })
    })
  })
})