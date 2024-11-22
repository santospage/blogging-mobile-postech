import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': ['error', { code: 80 }],
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': ['error', { code: 80 }],
    },
  },
];
