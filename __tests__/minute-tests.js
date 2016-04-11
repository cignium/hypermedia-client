// __tests__/minute-tests.js
jest.unmock('../src/components/elements/inputs/date/minute')
jest.unmock('../src/components/elements/inputs/date/date-util')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Minute from '../src/components/elements/inputs/date/minute'

describe('Minute', () => {
  let minute
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = TestUtils.createRenderer()
    renderer.render(
      <Minute value={date} onCommit={commitSpy} />
    )
    minute = renderer.getRenderOutput()
  }

  function getFirstOption() {
    return minute.props.children[1].props.value
  }

  function getLastOption() {
    return minute.props.children[minute.props.children.length - 1].props.value
  }

  describe('with date time 2012-02-01 5:25', () => {
    beforeEach(() => {
      renderComponent(new Date(Date.UTC(2012, 1, 1, 5, 25)))
    })

    it('sets the value to 25', () => {
      expect(minute.props.value).toEqual(25)
    })

    it('has 0 as the first option', () => {
      expect(getFirstOption()).toEqual(0)
    })

    it('has 59 as the last option', () => {
      expect(getLastOption()).toEqual(59)
    })

    describe('And changing minutes to 15', () => {
      it('sets the minutes to 15', () => {
        minute.props.onChange({ target: { value: 15 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.toISOString().split('T')[1]).toEqual('05:15:00.000Z')
      })
    })
  })
})
