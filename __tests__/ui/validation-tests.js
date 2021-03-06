const assert = require('assert')
const blur = () => {
  browser.click('.ct-document-header-text')
}

describe('Validations form', () => {
  before(() => {
    browser.url('validations.html')
    return browser.waitForExist('.ct-document-header-text', 30000)
  })

  it('can load the form and find the header', () => {
    assert.equal(browser.getText('.ct-document-header-text'), 'Validations')
  })

  it('has a text element with errors', () => {
    assert.ok(browser.isExisting('.ct-input-invalid.ct-text-input'))
  })

  it('has a number element with errors', () => {
    assert.ok(browser.isExisting('.ct-input-invalid.ct-number-input'))
  })

  it('has a date element with errors', () => {
    assert.ok(browser.isExisting('.ct-input-invalid.ct-date-picker'))
  })

  it('has a datetime element with errors', () => {
    assert.ok(browser.isExisting('.ct-input-invalid.ct-datetime-picker'))
  })

  it('can not be submitted when invalid', () => {
    assert.equal(browser.isExisting('.ct-action=Submit'), false)
  })

  it('accepts a valid text value', () => {
    browser.setValue('.ct-text-input', 'Tjipp')
    blur()

    browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-text-input')
    }, 10000)
  })

  it('accepts a valid number value', () => {
    const numberInput = browser.element('.ct-number-input')
    numberInput.clearElement()
    numberInput.setValue('42')
    blur()

    browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-number-input')
    }, 10000)
  })

  it('accepts a valid date value', () => {
    browser.selectByValue('.ct-date-picker .ct-year', 2017)

    browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-date-picker')
    }, 10000)
  })

  it('accepts a valid date time value', () => {
    browser.selectByValue('.ct-datetime-picker .ct-year', 1999)

    browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-datetime-picker')
    }, 10000)
  })

  it('can be submitted when valid', () => {
    browser.isExisting('.ct-action=Submit')
  })

  it('submits the form', () => {
    browser.click('.ct-action=Submit')
  })

  it('can display interpolated value', () => {
    return browser.waitUntil(() => {
      return browser.getText('.ct-document-header-text') == 'Paragraph'
    }, 10000)

    assert.equal(browser.getText('.ct-content div#embedded-div'), 'Tjipp')
  })
})
