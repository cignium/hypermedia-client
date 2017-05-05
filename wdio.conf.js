const browserstack = require('browserstack-local')

exports.config = {
  user: 'niklasrans2',
  key: 'xE59xLWy3ZTekp28atTu',

  updateJob: false,
  specs: [
    './__tests__/ui/*-tests.js',
  ],
  exclude: [],

  capabilities: [{
    browser: 'chrome',
    name: 'single_test',
    build: process.env.CI ?
      'hypermedia-client #' +  process.env.TRAVIS_BUILD_NUMBER + '.' + process.env.TRAVIS_JOB_NUMBER :
      'hypermedia-client-local',
    'browserstack.local': true,
  }],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:3004',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
  },

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    if (process.env.CI) {
      console.log('On CI. Skipping local connection.')
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

  // Code to stop browserstack local after end of test
  onComplete: (capabilties, specs) => {
    if (process.env.CI) {
      console.log('On CI. No local connection to close.')
      return
    }
    console.log('Closing local connection')
    exports.bs_local.stop(() => {})
  },
}
