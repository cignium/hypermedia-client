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

    return browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-text-input')
    }, 10000)
  })

  it('accepts a valid number value', () => {
    const numberInput = browser.element('.ct-number-input')
    numberInput.clearElement()
    numberInput.setValue('42')
    blur()

    return browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-number-input')
    }, 10000)
  })

  it('accepts a valid date value', () => {
    browser.selectByValue('.ct-date-picker .ct-year', 2017)

    return browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-date-picker')
    }, 10000)
  })

  it('accepts a valid date time value', () => {
    browser.selectByValue('.ct-datetime-picker .ct-year', 1999)

    return browser.waitUntil(() => {
      return !browser.isExisting('.ct-input-invalid.ct-datetime-picker')
    }, 10000)
  })

  it('can be submitted when valid', () => {
    return browser.isExisting('.ct-action=Submit')
  })

  it('submits the form', () => {
    return browser.click('.ct-action=Submit')
  })

  it('can display interpolated value', () => {
    return browser.waitUntil(() => {
      return browser.getText('.ct-document-header-text') == 'Paragraph'
    }, 10000)
      .then(() => assert.equal(browser.getText('.ct-content div#embedded-div'), 'Tjipp'))
  })

  it('submits the form', () => {
    return browser.click('.ct-action=Submit')
  })

  // it.only('does not accept numeric input for alpabetic text format', () => {
  //   return browser.waitForExist('#alphabetic')
  //     .then(() => {
  //       const alphaInput = browser.element('#alphabetic')
  //       alphaInput.clearElement()
  //       alphaInput.setValue('A')
  //       alphaInput.addValue('4')
  //       alphaInput.addValue('2')
  //       alphaInput.addValue('b')

  //       assert.equal(browser.getValue('#alphabetic'), 'Ab')
  //     })
  // })

  // it.only('does not accept alphabetic input for numeric text format', () => {
  //   return browser.waitForExist('#numeric')
  //     .then(() => {
  //       const alphaInput = browser.element('#numeric')
  //       alphaInput.clearElement()
  //       alphaInput.setValue('1')
  //       alphaInput.addValue('A')
  //       alphaInput.addValue('2')
  //       alphaInput.addValue('b')

  //       assert.equal(browser.getValue('#numeric'), '12')
  //     })
  // })

  // it.only('does only accept Acord format', () => {
  //   return browser.waitForExist('#acord')
  //     .then(() => {
  //       const alphaInput = browser.element('#acord')
  //       alphaInput.clearElement()
  //       alphaInput.setValue('.,-\'')
  //       alphaInput.addValue('a')
  //       alphaInput.addValue('2')
  //       alphaInput.addValue('B')
  //       alphaInput.addValue('.,-\'')

  //       assert.equal(browser.getValue('#acord'), 'aB.,-\'')
  //     })
  // })
})
