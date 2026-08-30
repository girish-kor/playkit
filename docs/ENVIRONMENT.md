# Environment

No `package.json`, `.nvmrc`, `.env`, or environment-config file exists in this repository — it currently contains only `COMPONENTS.md` and `docs/*.md`. This document states what is verifiably required by the specification, and explicitly flags what is not yet established rather than inventing it.

## Runtime dependencies implied by the specification

`COMPONENTS.md` requires a React application (React version unspecified — no version is pinned anywhere in the source) with:
- A PlayCanvas application instance and scene, provided to the tree via `PCProvider` (`pcApp: any`, `pcScene: any` — the PlayCanvas engine version is not specified anywhere in `COMPONENTS.md`).
- Tailwind CSS configured with, at minimum, the spacing/color/typography scales referenced throughout `docs/DESIGN-SYSTEM.md` (no `tailwind.config` file exists yet to verify exact theme values against).
- The full dependency set in `docs/DEPENDENCIES.md`.

## Environment-variable-driven behavior

The only environment-variable dependency documented anywhere in `COMPONENTS.md` is `DevTools.enabled`, which defaults to `process.env.NODE_ENV !== 'production'`. See `docs/ERROR-HANDLING.md` and `docs/CONFIGURATION.md` for its documented SSR/bundler caveat: in a browser-only bundler runtime where `process.env` is stripped from the client bundle, referencing it can throw; pass `enabled` explicitly in that case. No other `NODE_ENV`-, build-mode-, or environment-variable-gated behavior is documented.

## Not yet established (do not assume)

- No `package.json` — package manager, Node.js version, and script definitions are undecided.
- No `tsconfig.json` — TypeScript is implied by every prop signature in `COMPONENTS.md` being written in TypeScript-like notation, but no compiler configuration exists.
- No `.env`/`.env.example` — no environment-variable schema beyond `NODE_ENV` is documented.
- No lockfile — dependency version resolution is undecided beyond the two explicit pins in `docs/DEPENDENCIES.md` (`@use-gesture/react@^10`, `react-use@^17`).

When these are created, this document must be updated to record the actual versions and variables in use — do not backfill this section with assumed values in the meantime.
