import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import a11y from 'eslint-plugin-jsx-a11y';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  js.configs.recommended, // ESLint's recommended rules
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/', 'dist/', 'build/', '.next/'], // Ignore these directories
    languageOptions: {
      parser: typescriptParser, // TypeScript parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Define global variables for browser and Node.js environments
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },
    plugins: {
      react,
      'jsx-a11y': a11y,
      '@typescript-eslint': typescript,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Prettier integration
      ...prettier.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // Enforce single quotes
          trailingComma: 'all', // Add trailing commas
          semi: true, // Use semicolons
        },
      ],

      // General JavaScript/TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',

      // React/JSX-specific rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],

      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
