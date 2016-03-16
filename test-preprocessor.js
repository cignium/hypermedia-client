const babel = require('babel-core')
const jestPreset = require('babel-preset-jest')

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src.replace(/^import.*\.css'$/gm, ''), {
        auxiliaryCommentBefore: 'istanbul ignore next',
        filename,
        presets: [jestPreset],
        retainLines: true,
      }).code
    }
    return src
  },
}
