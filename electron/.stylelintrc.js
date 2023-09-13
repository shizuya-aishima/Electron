module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
    'property-no-vendor-prefix': null,
    'color-hex-length': 'long',
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
  },
};