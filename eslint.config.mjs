import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**']
  },
  {
    files: ['src/env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  }
)
