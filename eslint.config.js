// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
{
  rules: {
    // --- Naming ---
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'function',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase'],
      },
    ],

    // --- Spacing ---
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'function', next: 'function' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-trailing-spaces': 'error',

    // --- Basic formatting ---
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
    'max-len': ['error', { code: 115 }],
  },
},  
  {
    ignores: ['dist/*'],
  },
]);
