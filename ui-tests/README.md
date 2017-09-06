# BrowserStack UI Tests

* BrowserStack: <a href="https://www.browserstack.com">https://www.browserstack.com</a>
* WebDriverIO: <a href="http://webdriver.io/">http://webdriver.io/</a>
* MochaJS: <a href="https://mochajs.org/">https://mochajs.org/</a>
* LM Application Designer: <a href="https://lm-staging-designer.cignium.com/design/staging/regression/">https://lm-staging-designer.cignium.com/design/staging/regression/</a>

## Environment Variable
The environment variable **UI_TEST_URL** must be set for all the scenarios described below.
* Set the environment variable **UI_TEST_URL** to the root URL of the application you want to test against. Should be *https://cignium-lm-staging.azurewebsites.net/run/staging/regression/prod* if you are not testing against a custom application.

## Running tests locally
* Run the command **npm run test-ui-local**. This will start the local webserver that hosts the Hypermedia Client and run the test suites.

## Inspecting the rendered forms
If you want to inspect the rendered forms in the browser you can start the local webserver without running any tests.
* Run the command **npm run start-ui-test-server**. This will start the local server without running any tests. The different processes can then be accessed via *http://localhost:3004/\<test html file>*, e.g. *http://localhost:3004/validations.html* for the validation tests. The different html files can be located in the same folder as this file.

## Debugging tests (VS Code)
* Start the local server by running **npm run start-ui-test-server**
* Open the file you want to debug (e.g. *default-values-tests.js*) and set a breakpoint.
* Press F5. The debugger will run the test suite for the file you have open when you press F5.