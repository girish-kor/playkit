# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) categories (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`); versions per `docs/VERSIONING.md`.

No version has been released yet. This file is seeded only with what is verifiably true right now: the specification exists, the documentation set exists, and no code has shipped.

## [Unreleased]

### Added

- Base project scaffold: `package.json`, `tsconfig.json`, `tsup`/`vitest`/`eslint`/`prettier` config, and the full `src/` folder structure from `docs/FOLDER-STRUCTURE.md` (107 component stub files across 20 categories, 75 hook stub files, `src/types.ts`, `src/index.ts`, `src/devtools.ts`). No component/hook behavior is implemented yet — every stub throws "not implemented"; see `docs/REBUILD-GUIDE.md` for the implementation order.
- `npm run ci` (typecheck, lint, format:check, test, build, verify:devtools-excluded) implementing the gates in `docs/CI-CD.md` as runnable scripts; `.github/workflows/**` itself is out of scope for this change.
- `scripts/verify-devtools-excluded.mjs` and a matching export-surface smoke test (`src/__tests__/exports.test.tsx`) enforcing that the Debug/DevTools category is only reachable via the separate `game-ui-components/devtools` entry point (`docs/BUILD.md`, `docs/LOGGING.md`).

- `COMPONENTS.md`: full specification for 107 components across 20 categories and 76 hooks (verified counts, cross-checked against the document's own Index).
- `docs/*.md`: complete documentation set (architecture, coding standards, design system, UI/UX, state management, API, data models, dependencies, folder structure, modules, security, accessibility, performance, testing, error handling, logging, configuration, environment, build, deployment, CI/CD, git, contributing, versioning, changelog, troubleshooting, validation, rebuild guide, rules, glossary, README).

### Notes

Prior to any implementation, `COMPONENTS.md` itself already documents several inline deprecations from an earlier, unrecorded design iteration (e.g. `Toggle`'s removed `'checkbox'` variant, `Select`'s removed `'radio-group'` variant, `Timer`'s removed `isCountdown` prop, `ContextMenu`'s removed `'custom'` variant, `Confirm`'s removed `danger` prop, `ScreenReader`'s removed `'live'` priority value, `Responsive`'s removed `'tv'` variant, `LoadScreen`'s removed `'animated'` variant, `FocusTrap`'s removed `'non-modal'` variant, `Toast`'s removed `'loading'` type, `Spinner`'s removed `'progress-bar'` variant, `HoverCard`'s removed `'preview'` variant, `Inspector`'s removed `'filtered'` variant, `SliderPuzzle`'s removed `onMove` prop, `NavMenu`'s removed separate `orientation` prop, `Settings`'s removed `'full-page'` variant, `Touch`'s removed `'custom'` variant). These predate this changelog and are recorded here for traceability only — they are not versioned releases, since no version history exists prior to this document.
