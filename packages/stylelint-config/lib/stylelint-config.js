'use strict';

module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
  ],
  rules: {
    'alpha-value-notation': 'percentage',
    'string-quotes': 'single',
    'font-family-name-quotes': 'always-unless-keyword',
    'order/properties-alphabetical-order': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'selector-class-pattern': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['use'] }],
  },
  ignoreFiles: ['**/*.tsx'],
};
