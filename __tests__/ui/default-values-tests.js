const assert = require('assert')

describe('Default values form', () => {
  before(() => {
    browser.url('default.html')
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

  it('has a multi select element with correct default value', () => {
    const values = browser.elements('#multi-select .Select-value .Select-value-label').value
    const strings = values.map(element => element.getText().trim())

    assert.equal(strings.length, 2)
    assert.equal(strings.includes('Två'), true)
    assert.equal(strings.includes('Fyra'), true)
  })

  it('has a single select element with correct default value', () => {
    assert.equal(browser.getText('#single-select .Select-value .Select-value-label').trim(), 'Dos')
  })

  it('has a number element with correct default value', () => {
    assert.equal(browser.getValue('.ct-number-input'), 42)
  })

  it('has a text element with the correct default value', () => {
    assert.equal(browser.getValue('#text'), 'Me gusta el gato blanco')
  })

  it('has a text element in a section with the correct default value', () => {
    assert.equal(browser.getValue('.ct-nested.ct-section .ct-text-input'), 'Me gusta el perro')
  })
})
