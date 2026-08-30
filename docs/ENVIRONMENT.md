# Environment

This document states what is verifiably required by the specification. `package.json`, `.nvmrc`, `tsconfig.json`, and a lockfile now exist as of the base scaffold (see "Established" below); no `.env`/environment-config file has been added, since none is required.

## Runtime dependencies implied by the specification

`COMPONENTS.md` requires a React application (React version unspecified — no version is pinned anywhere in the source) with:
- A PlayCanvas application instance and scene, provided to the tree via `PCProvider` (`pcApp: any`, `pcScene: any` — the PlayCanvas engine version is not specified anywhere in `COMPONENTS.md`).
- Tailwind CSS (v4, CSS-first config) configured with, at minimum, the spacing/color/typography scales referenced throughout `docs/DESIGN-SYSTEM.md`. This library ships Tailwind class-name *strings* in its JS output, not compiled CSS — the consuming app's own Tailwind build is what generates the CSS; see `src/styles.css` and `docs/BUILD.md` for the `@source` directive a consumer needs so its build scans this package's `dist/` output.
- The full dependency set in `docs/DEPENDENCIES.md`.

## Environment-variable-driven behavior

The only environment-variable dependency documented anywhere in `COMPONENTS.md` is `DevTools.enabled`, which defaults to `process.env.NODE_ENV !== 'production'`. See `docs/ERROR-HANDLING.md` and `docs/CONFIGURATION.md` for its documented SSR/bundler caveat: in a browser-only bundler runtime where `process.env` is stripped from the client bundle, referencing it can throw; pass `enabled` explicitly in that case. No other `NODE_ENV`-, build-mode-, or environment-variable-gated behavior is documented.

## Established (base scaffold)

- **Package manager**: npm (see `package.json`'s `engines.node: ">=20"`; no other package
  manager is mandated). Node.js **>=20** required; `.nvmrc` pins `20` for local version
  managers (nvm/fnm/volta-style tooling).
- **`package.json`**: exists, `name: "game-ui-components"`, `version: "0.1.0"` per
  `docs/VERSIONING.md`. `react`/`react-dom` are `peerDependencies` (`>=18`), not bundled
  — this is a component library, the consuming app supplies React. `react-router-dom` is
  an optional peer, matching its optional-dependency status in `docs/DEPENDENCIES.md`.
- **`tsconfig.json`**: exists (`strict: true`, `jsx: "react-jsx"`,
  `moduleResolution: "Bundler"`, `noEmit: true` — emission is owned by the build tool,
  see `docs/BUILD.md`).
- **Lockfile**: `package-lock.json` (npm). Actual dependency versions pinned are
  recorded in `docs/DEPENDENCIES.md`'s version table.
- No `.env`/`.env.example` was added — this remains accurate: no environment-variable
  schema beyond `NODE_ENV` is documented anywhere in `COMPONENTS.md`.

## Superseded

The four bullet points this section originally listed (no `package.json`, no
`tsconfig.json`, no `.env`/`.env.example`, no lockfile) are now covered by "Established
(base scaffold)" above. This heading is kept only so any existing link to
`docs/ENVIRONMENT.md#not-yet-established` has somewhere to land.
