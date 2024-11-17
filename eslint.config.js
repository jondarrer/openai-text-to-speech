const globals = require('globals');

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 13,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },

    rules: {},
  },
  {
    files: ['**/*.js'],
    ignores: ['**/*.spec.js'],

    rules: {
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.spec.js'],

    rules: {
      'max-lines': 'off',
      'no-useless-escape': 'off',
    },
  },
];
