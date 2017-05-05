const assert = require('assert')

describe('All type of controls form', () => {
  it('can load the form and find the header', () => {
    browser.url('index.html')
    const selector = '.ct-document-header-text'
    browser.waitForExist(selector, 30000)

    assert.equal(browser.getText(selector), 'All type of controls form')
  })
})
