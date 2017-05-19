const assert = require('assert')

describe('Default values form', () => {
  before(() => {
    browser.url('index.html')
    return browser.waitForExist('.ct-document-header-text', 30000)
  })

  it('can load the form and find the header', () => {
    assert.equal(browser.getText('.ct-document-header-text'), 'Default values')
  })

  it('checkbox default value is true', () => {
    assert.equal(browser.isSelected('#checkbox'), true)
  })

  it('has a date element with correct default value', () => {
    assert.equal(browser.getValue('.ct-date-picker .ct-month'), 4)
    assert.equal(browser.getValue('.ct-date-picker .ct-day'), 19)
    assert.equal(browser.getValue('.ct-date-picker .ct-year'), 1982)
  })

  it('has a date time element with correct default value', () => {
    assert.equal(browser.getValue('.ct-datetime-picker .ct-month'), 4)
    assert.equal(browser.getValue('.ct-datetime-picker .ct-day'), 20)
    assert.equal(browser.getValue('.ct-datetime-picker .ct-year'), 1987)
    assert.equal(browser.getValue('.ct-datetime-picker .ct-hour'), 1)
    assert.equal(browser.getValue('.ct-datetime-picker .ct-minute'), 37)
    assert.equal(browser.getText('.ct-datetime-picker .ct-am-pm'), 'PM')
  })
})
