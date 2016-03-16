// __tests__/month-tests.js
jest.unmock('../src/components/elements/inputs/date/month')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Month from '../src/components/elements/inputs/date/month'

describe('Month', () => {
  let month
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Month value={date} onCommit={commitSpy} />
    )

    month = renderer.getRenderOutput()
  }

  describe('with date 2012-01-31', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2012, 0, 31)))
    })

    it('sets the value to January', () => {
      expect(month.props.value).toEqual(0)
    })

    describe('And changing month to February', () => {
      it('returns the last day in February that year (leap year)', () => {
        month.props.onChange({ value: 1 })
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2012-02-29')
      })
    })

    describe('And changing month to January', () => {
      it('returns the last day in January', () => {
        month.props.onChange({ value: 0 })
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2012-01-31')
      })
    })
  })

  describe('with date 2013-01-31', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2013, 0, 31)))
    })

    it('sets the value to January', () => {
      expect(month.props.value).toEqual(0)
    })

    describe('And changing month to February', () => {
      it('returns the last day in February that year', () => {
        month.props.onChange({ value: 1 })
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[0]).toEqual('2013-02-28')
      })
    })
  })
})
