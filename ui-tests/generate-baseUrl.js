const fs = require('fs')
const url = process.env.UI_TEST_URL

if (!url) {
  throw 'Environment variable UI_TEST_URL must be set.'
}

const template = `const baseUrl = '${url}'`

fs.writeFile('ui-tests/baseUrl.js', template, 'utf8', err => {
  if (err) throw err
  console.log(`generated baseUrl (${url})`)
})
