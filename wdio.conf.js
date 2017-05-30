const browserstack = require('browserstack-local')
const request = require('request')
const errors = []
const user = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME'
const key = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY'

exports.config = {
  debug: process.env.CI ? false : true,
  user,
  key,

  updateJob: false,
  specs: [
    './__tests__/ui/*-tests.js',
  ],
  exclude: [],
  maxInstances: 2,

  capabilities: [{
    browser: 'chrome',
    name: 'chrome_tests',
    build: process.env.CI ?
      'hypermedia-client #' +  process.env.TRAVIS_BUILD_NUMBER :
      'hypermedia-client-local',
    'browserstack.local': true,
  }, {
    browser: 'firefox',
    name: 'firefox_tests',
    build: process.env.CI ?
      'hypermedia-client #' +  process.env.TRAVIS_BUILD_NUMBER :
      'hypermedia-client-local',
    'browserstack.local': true,
  }],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:3004',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    if (process.env.CI) {
      console.log('On CI. Skipping local connection because Travis CI will handle this.')
      return
    }
    console.log('Connecting local')
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local()
      exports.bs_local.start({'key': exports.config.key, 'force': true }, error => {
        if (error) {
          console.log(error)
          return reject(error)
        }
        console.log('Connected. Now testing...')

        resolve()
      })
    })
  },

  afterTest: test => {
    if (!test.passed) {
      errors.push(`${test.fullTitle} failed with error: '${test.err.message}'`)
    }
  },

  after: (result, capabilities, specs) => {
    if (result != 0) {
      console.log('Failing session with id: ' + browser.sessionId)
      request({
        uri: `https://${user}:${key}@www.browserstack.com/automate/sessions/${browser.sessionId}.json`,
        method:'PUT',
        form:{ 'status':'error','reason': session.errors.join(' | ') },
      })
    }
  },

  // Code to stop browserstack local after end of test
  onComplete: (exitCode, config, capabilities) => {
    console.log('Exited with code: ' + exitCode)

    if (process.env.CI) {
      console.log('On CI. No local connection to close.')
      return
    }

    console.log('Closing local connection')
    exports.bs_local.stop(() => {})
  },
}
