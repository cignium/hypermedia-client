const assert = require('assert')

describe('Disabled and Hidden form', () => {
  before(() => {
    browser.url('hidden.html')
    return browser.waitForExist('.ct-document-header-text', 30000)
  })

  it('can load the form and find the header', () => {
    assert.equal(browser.getText('.ct-document-header-text'), 'Disabled And Hidden')
  })

  it('has an enabled text element', () => {
    const test = browser.getAttribute('#disabled', 'readonly')
    assert.ok(browser.getAttribute('#disabled', 'readonly') == null)
  })

  it('has a visible text element', () => {
    assert.ok(browser.isExisting('#hidden'))
  })

  it('disables the textfield when the disabled expression is truthy', () => {
    browser.click('#disable')

    return browser.waitUntil(() => {
      return browser.getAttribute('#disabled', 'readonly') !== null
    }, 3000)
  })

  it('hides the textfield when the hidden expression is truthy', () => {
    browser.click('#hide')

    return browser.waitUntil(() => {
      return !browser.isExisting('#hidden')
    }, 3000)
  })
})
