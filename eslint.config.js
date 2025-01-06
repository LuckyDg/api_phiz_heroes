module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
];
