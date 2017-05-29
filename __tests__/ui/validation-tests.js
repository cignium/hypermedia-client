const assert = require('assert')

describe('Validations form', () => {
  before(() => {
    browser.url('index.html')
    browser.waitForExist('.ct-document-header-text', 30000)
    browser.click('.ct-action')

    return browser.waitUntil(() => {
      return browser.getText('.ct-document-header-text') == 'Validations'
    }, 10000)
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

  it('can not be submitted when invalid', () => {
    assert.equal(browser.isExisting('.ct-action'), false)
  })

  it('can be submitted when valid', () => {
    browser.setValue('.ct-text-input', 'Tjipp')
    const numberInput = browser.element('.ct-number-input')
    numberInput.clearElement()
    numberInput.setValue('42')
    browser.keys('\uE004')

    browser.waitForExist('ct-action', 10000)
  })
})
