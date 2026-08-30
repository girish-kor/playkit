import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Mechanically-enforceable subset of docs/CODING-STANDARDS.md and docs/ACCESSIBILITY.md.
// Rules that depend on COMPONENTS.md's per-component contract (documented defaults,
// exact ARIA roles, module-boundary edges from docs/MODULES.md) are NOT lintable
// generically and stay enforced by code review per docs/CONTRIBUTING.md.
export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Enum-like props are closed string-literal unions (docs/CODING-STANDARDS.md);
      // an explicit `any` silently defeats that at the type level.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // This library's entire purpose (docs/ARCHITECTURE.md's "PlayCanvas Bridge
      // layer") is reading an imperative external engine's CURRENT state on mount and
      // subscribing to its changes -- exactly the "sync to an external system" case
      // react-hooks/set-state-in-effect's underlying react.dev guidance carves out as
      // legitimate, but the rule itself can't distinguish that from the prop-derived-
      // state anti-pattern it targets. Kept as a warning (not off) so a genuinely
      // avoidable case still gets flagged for review.
      'react-hooks/set-state-in-effect': 'warn',

      // Several puzzle components (docs/COMPONENTS.md's Puzzle category) shuffle their
      // board/tiles/pairs exactly once per instance via a lazy `useState(() => ...)`
      // or `useMemo` initializer (e.g. MemoryMatch's pair shuffle, SliderPuzzle's
      // scramble) -- a standard, safe React pattern the rule can't distinguish from
      // calling Math.random()/Date.now() on every render, which would be a real bug.
      // Kept as a warning so a genuinely-every-render impurity is still flagged.
      'react-hooks/purity': 'warn',

      // Class assembly must go through clsx + tailwind-merge, never raw concatenation
      // (docs/DESIGN-SYSTEM.md) -- caught in review, not lint, but keep template-string
      // className concatenation visible as a warning.
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > BinaryExpression[operator='+']",
          message:
            'Assemble className via clsx()/tailwind-merge, not string concatenation (docs/DESIGN-SYSTEM.md).',
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    // Root-level tooling configs and one-off Node scripts (not part of the published
    // package, so docs/CODING-STANDARDS.md's component/hook rules don't apply here).
    files: ['*.config.{js,mjs,cjs,ts}', 'scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  prettierConfig,
);
