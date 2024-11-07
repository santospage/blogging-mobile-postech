module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'max-len': ['error', {code: 80}],
  },
};
