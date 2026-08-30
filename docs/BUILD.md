# Build

No build tool, bundler config, or build script exists in this repository as of this writing — it contains only `COMPONENTS.md` and `docs/*.md`. This document defines the required build standard for when a build system is introduced; it does not describe an existing pipeline.

## Requirements the build must satisfy

Derived from verified content elsewhere in this doc set, not invented:
1. Compile TypeScript-style prop/hook signatures as documented in `docs/API.md` and `docs/COMPONENTS.md` — every prop, hook parameter, and return shape in `COMPONENTS.md` is written in TypeScript notation, implying a TypeScript build step, though no `tsconfig.json` exists yet (see `docs/ENVIRONMENT.md`).
2. Process Tailwind CSS utility classes per `docs/DESIGN-SYSTEM.md` — the component set generates classes dynamically from typed props (e.g. `Flex`'s `gap-{n}`), so the build's CSS pipeline must not purge classes it cannot statically detect via its content-scanning config; verify dynamic class generation patterns against whatever Tailwind build tooling is chosen.
3. Exclude Debug/DevTools-category components (`DevTools`, `Inspector`, `Property`, `Console`, `PerformanceMonitor`, `AssetViewer`) from production output — stated as non-negotiable in `docs/LOGGING.md`.
4. Produce a package entry point re-exporting every component and hook, per the layout in `docs/FOLDER-STRUCTURE.md`.

## Not yet established

No bundler (esbuild, Rollup, Vite, webpack, tsup, etc.) is named anywhere in `COMPONENTS.md`. No build script, target (ESM/CJS/UMD), or output directory convention exists. Choosing and documenting these is a prerequisite to a real build pipeline; do not assume a specific tool here without first establishing it (e.g. via a `package.json` and build config) and updating this document to match.
