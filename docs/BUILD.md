# Build

Built with [tsup](https://tsup.egoist.dev/) (esbuild-based). This document defines the
required build standard, and records the actual choices made to satisfy it — see
`docs/CI-CD.md` for how these are enforced as gates.

## Requirements the build must satisfy

Derived from verified content elsewhere in this doc set, not invented:
1. Compile TypeScript-style prop/hook signatures as documented in `docs/API.md` and
   `docs/COMPONENTS.md` — every prop, hook parameter, and return shape in
   `COMPONENTS.md` is written in TypeScript notation, implying a TypeScript build step.
   **Satisfied by**: `tsconfig.json` (strict mode) + `tsup`'s `dts: true` option, which
   emits `dist/index.d.ts`/`dist/devtools.d.ts` alongside the JS output.
2. Process Tailwind CSS utility classes per `docs/DESIGN-SYSTEM.md` — the component set
   generates classes dynamically from typed props (e.g. `Flex`'s `gap-{n}`), so the
   build's CSS pipeline must not purge classes it cannot statically detect via its
   content-scanning config. **Satisfied by**: this library does not compile or ship CSS
   at all — it ships Tailwind class-name *strings* as plain JS values (see
   `src/styles.css`'s header comment). The content-scanning concern this requirement
   describes applies to the *consuming application's* Tailwind build, which must add an
   explicit `@source` directive for this package's `dist/` output (Tailwind v4 excludes
   `node_modules` from its automatic content detection by default):
   ```css
   @import "tailwindcss";
   @source "../node_modules/playkit/dist";
   ```
   Once real component implementations land, every prop→class mapping must go through a
   literal lookup (an object/switch keyed by the enum value), never a template-string
   class name built from an arbitrary runtime value — only literal mappings are
   guaranteed visible to a consumer's content scanner.
3. Exclude Debug/DevTools-category components (`DevTools`, `Inspector`, `Property`,
   `Console`, `PerformanceMonitor`, `AssetViewer`) from production output — stated as
   non-negotiable in `docs/LOGGING.md`. **Satisfied by**: a separate build entry point.
   `src/index.ts` (the `"."` export, i.e. the production entry point) never imports the
   `devtools` category; `src/devtools.ts` (the `"./devtools"` export) does, and is the
   only supported way to reach those six components. `scripts/verify-devtools-excluded.mjs`
   asserts this against the *built* `dist/index.js`, not just the source graph.
4. Produce a package entry point re-exporting every component and hook, per the layout
   in `docs/FOLDER-STRUCTURE.md`. **Satisfied by**: `src/index.ts` (barrel re-exports of
   every category except `devtools`, plus `src/hooks` and the non-colliding types from
   `src/types.ts` — see `src/index.ts`'s comment on the `Objective` name collision
   between the Objectives-category component and the `docs/DATA-MODELS.md` data shape).

## Actual build configuration

- **Tool**: `tsup` (`tsup.config.ts`). Two entries: `src/index.ts` → `dist/index.{js,cjs}`
  and `src/devtools.ts` → `dist/devtools.{js,cjs}`.
- **Output formats**: ESM and CJS, both with `.d.ts` declarations. Because
  `package.json` sets `"type": "module"`, tsup emits the ESM build as `.js` and the CJS
  build as `.cjs` (not `.mjs`/`.js`) — `package.json`'s `exports` map and
  `scripts/verify-devtools-excluded.mjs` both point at these actual filenames.
- **Externals**: `react`, `react-dom`, `react/jsx-runtime`, `react-router-dom`,
  `playcanvas` are never bundled (they're peer dependencies / caller-supplied, per
  `docs/DEPENDENCIES.md` and `docs/ARCHITECTURE.md`'s binding model).
- **Target**: `es2020`.
- **Commands**: `npm run build` (one-off), `npm run dev` (`tsup --watch`).
