module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        'trailingComma': 'all',
        'tabWidth': 12,
        'semi': false,
        'singleQuote': true,
        'bracketSpacing': true,
        'eslintIntegration': true,
        'printWidth': 120
      }
    ]
  },
}
