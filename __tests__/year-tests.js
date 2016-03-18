// __tests__/year-tests.js
jest.unmock('../src/components/elements/inputs/date/year')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Year from '../src/components/elements/inputs/date/year'

describe('Year', () => {
  let year
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Year value={date} onCommit={commitSpy} />
    )

    year = renderer.getRenderOutput()
  }

  describe('with no date', () => {
    beforeEach(() => {
      renderComponent(null)
    })

    it('sets no value', () => {
      expect(year.props.value).toBe('')
    })

    it('has -100 years as the second option', () => {
      const currentYear = new Date().getFullYear()
      expect(year.props.children[1].props.value).toEqual(currentYear -100)
    })

    it('has +100 years as the last option', () => {
      const currentYear = new Date().getFullYear()
      expect(year.props.children[year.props.children.length - 1].props.value).toEqual(currentYear + 100)
    })

    describe('And setting year to 2013', () => {
      it('returns the first of January 2013', () => {
        year.props.onChange({ target: { value: 2013 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2013-01-01')
      })
    })
  })

  describe('with date 2012-02-29', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2012, 1, 29)))
    })

    it('sets the value to 2012', () => {
      expect(year.props.value).toEqual(2012)
    })

    describe('And changing year to 2013', () => {
      it('returns the 28th of February 2013 (not leap year)', () => {
        year.props.onChange({ target: { value: 2013 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2013-02-28')
      })
    })
  })

  describe('with date 2013-01-31', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2013, 0, 31)))
    })

    it('sets the value to 2013', () => {
      expect(year.props.value).toEqual(2013)
    })

    describe('And changing year to 2014', () => {
      it('returns the same day in 2014', () => {
        year.props.onChange({ target: { value: 2014 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2014-01-31')
      })
    })
  })
})
