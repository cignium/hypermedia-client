// __tests__/day-tests.js
jest.unmock('../src/components/elements/inputs/date/day')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Day from '../src/components/elements/inputs/date/day'

describe('Day', () => {
  let day
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Day value={date} onCommit={commitSpy} />
    )
    day = renderer.getRenderOutput()
  }

  function getFirstOption() {
    return day.props.children[1].props.value
  }

  function getLastOption() {
    return day.props.children[day.props.children.length - 1].props.value
  }

  describe('with date 2012-02-01', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2012, 1, 1)))
    })

    it('sets the value to 1', () => {
      expect(day.props.value).toEqual(1)
    })

    it('has 1 as the first option', () => {
      expect(getFirstOption()).toEqual(1)
    })

    it('has 29 as the last option (leap year)', () => {
      expect(getLastOption()).toEqual(29)
    })

    describe('And changing day to 15', () => {
      it('returns the 15th of February', () => {
        day.props.onChange({ target: { value: 15 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2012-02-15')
      })
    })
  })

  describe('with date 2013-02-01', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2013, 1, 1)))
    })

    it('sets the value to 1', () => {
      expect(day.props.value).toEqual(1)
    })

    it('has 1 as the first option', () => {
      expect(getFirstOption()).toEqual(1)
    })

    it('has 28 as the last option', () => {
      expect(getLastOption()).toEqual(28)
    })

    describe('And changing day to 28', () => {
      it('returns the 15th of February', () => {
        day.props.onChange({ target: { value: 28 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2013-02-28')
      })
    })
  })

  describe('with date 2013-01-01', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2013, 0, 1)))
    })

    it('has 1 as the first option', () => {
      expect(getFirstOption()).toEqual(1)
    })

    it('has 31 as the last option', () => {
      expect(getLastOption()).toEqual(31)
    })
  })

  describe('with date 2013-04-01', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2013, 3, 1)))
    })

    it('has 1 as the first option', () => {
      expect(getFirstOption()).toEqual(1)
    })

    it('has 30 as the last option', () => {
      expect(getLastOption()).toEqual(30)
    })
  })
})
