var config = require('eslint-config-louffee/_base')({ isBrowser: false })

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'promise/no-native': 'off',
    'jest/no-jest-import': 'off',
  },
}
