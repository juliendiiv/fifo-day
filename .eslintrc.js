module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': 'off',
    'react/function-component-definition': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
