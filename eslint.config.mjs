/**
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin'))
        .default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort'))
        .default,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': 'warn',
    },
  },
]

export default config
