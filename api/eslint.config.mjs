import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },

    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierConfig.rules, // Disabling rules that conflict with Prettier
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore variables prefixed with underscore
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Turn off explicit module boundary types
    },
  },
];
