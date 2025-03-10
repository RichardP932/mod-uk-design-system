module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'arrow-body-style': 0,
    camelCase: 0,
    curly: ['error', 'all'],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': 0,
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'prettier/prettier': 0,
    'react/button-has-type': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': [1],
    // https://github.com/benmosher/eslint-plugin-import/issues/1615
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
        'd.ts': 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
      },
    },
  },
}
