import globals from 'globals';
import js from '@eslint/js';
import typescript from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {
    ignores: ['node_modules', 'coverage', 'html', 'dist', 'typedoc', 'scripts'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // js
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  // ts
  ...typescript.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  ...typescript.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {},
  },

  // prettier
  prettier,
]);
