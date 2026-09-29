import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    ignores: ['dist', 'build', 'node_modules', 'eslint.config.mjs', '**/*.d.ts']
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    extends: [...tseslint.configs.recommendedTypeChecked],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },

      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports
    },

    rules: {
      // TYPESCRIPT
      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',

      '@typescript-eslint/no-unused-vars': 'off',

      // UNUSED
      'unused-imports/no-unused-imports': 'warn',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      // CONSOLE
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],

      // REACT HOOKS
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  {
    files: ['**/*.js', '**/*.mjs'],

    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
);
