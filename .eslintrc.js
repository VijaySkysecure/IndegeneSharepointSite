module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    // Disable rules that might cause issues
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-undef': 'off'
  }
};

