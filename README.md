# Play Kit

A reusable, accessible, PlayCanvas-integrated React component library for building in-game UI — HUD, inventory, dialogue, puzzles, settings, dev tools — with consistent Tailwind styling, keyboard/screen-reader support, and bidirectional PlayCanvas scene sync across both DevMode and PlayMode. (Purpose statement verbatim from `COMPONENTS.md`.)

## Status

Scaffold stage. `COMPONENTS.md` (the specification) and its full `docs/` set are complete. The base project setup now exists on top of that spec — `package.json`, TypeScript, the `tsup` build, `vitest`/`eslint`/`prettier`, and the complete `src/` folder structure from `docs/FOLDER-STRUCTURE.md` (one file per component/hook, in the right category, matching the taxonomy exactly). **No component or hook behavior is implemented yet** — every file in `src/components/` and `src/hooks/` is a stub that throws `"<Name> is not implemented yet"`, so the export surface, types, and build/test/lint pipeline can all be verified before real implementation work starts. No CI *workflow file* has been added (see `docs/CI-CD.md`), though every gate it needs to run is now a working npm script.

```sh
npm install
npm run ci        # typecheck, lint, format:check, test, build, verify:devtools-excluded
```

See `docs/ENVIRONMENT.md`, `docs/BUILD.md`, `docs/CI-CD.md`, and `docs/DEPENDENCIES.md`
for exactly what was established and why each tooling choice was made.

## Contents

- **[`COMPONENTS.md`](COMPONENTS.md)** — the specification: 107 components across 20 categories, 76 hooks, props, events, variants, PlayCanvas integration, accessibility, and performance behavior for each.
- **[`docs/`](docs/)** — the full engineering documentation set derived from the specification:

| Doc | Covers |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Layering, PlayCanvas binding model, sync hook pattern |
| [COMPONENTS.md](docs/COMPONENTS.md) | Canonical copy of the root specification |
| [CODING-STANDARDS.md](docs/CODING-STANDARDS.md) | Naming, prop API, composition, styling, SOLID/DRY/KISS mapping |
| [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Tailwind color/size/variant conventions |
| [UI-UX.md](docs/UI-UX.md) | Interaction, disclosure, and trigger-model patterns |
| [STATE-MANAGEMENT.md](docs/STATE-MANAGEMENT.md) | Local state, controlled/uncontrolled, zustand scope, PlayCanvas sync |
| [API.md](docs/API.md) | Every hook's signature and consumers |
| [DATA-MODELS.md](docs/DATA-MODELS.md) | Every inline type shape (`Item<T>`, `TreeNode<T>`, etc.) |
| [DEPENDENCIES.md](docs/DEPENDENCIES.md) | Full external package catalog |
| [FOLDER-STRUCTURE.md](docs/FOLDER-STRUCTURE.md) | Required source layout |
| [MODULES.md](docs/MODULES.md) | Module boundaries and allowed cross-module edges |
| [SECURITY.md](docs/SECURITY.md) | XSS surface, cross-origin handling, network trust |
| [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | ARIA roles, keyboard, focus, live-region rules |
| [PERFORMANCE.md](docs/PERFORMANCE.md) | Throttle/debounce/virtualization defaults |
| [TESTING.md](docs/TESTING.md) | Required test coverage standard |
| [ERROR-HANDLING.md](docs/ERROR-HANDLING.md) | Failure callbacks, retry/lockout, fallback content |
| [LOGGING.md](docs/LOGGING.md) | Debug/DevTools category, dev-only logging surface |
| [CONFIGURATION.md](docs/CONFIGURATION.md) | Settings container and per-setting sync model |
| [ENVIRONMENT.md](docs/ENVIRONMENT.md) | Runtime requirements; what's not yet established |
| [BUILD.md](docs/BUILD.md) | Build requirements; what's not yet established |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Release-artifact model; what's not yet established |
| [CI-CD.md](docs/CI-CD.md) | Required merge/release gates |
| [GIT.md](docs/GIT.md) | Branching, commit, and PR policy |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribution workflow |
| [VERSIONING.md](docs/VERSIONING.md) | SemVer policy |
| [CHANGELOG.md](docs/CHANGELOG.md) | Keep a Changelog log |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Documented gotchas and their causes |
| [VALIDATION.md](docs/VALIDATION.md) | Validated vs. deliberately unvalidated inputs |
| [REBUILD-GUIDE.md](docs/REBUILD-GUIDE.md) | Build order and per-component rebuild notes |
| [RULES.md](docs/RULES.md) | ACID/MVC/SOLID/DRY/KISS/SoC/IoC/DI enforcement mapping |
| [GLOSSARY.md](docs/GLOSSARY.md) | Terminology |

## Start here

- Implementing a component: `docs/REBUILD-GUIDE.md` → `docs/COMPONENTS.md` (its full contract) → `docs/CODING-STANDARDS.md`.
- Reviewing a change: `docs/RULES.md`, `docs/CONTRIBUTING.md`, `docs/CI-CD.md`.
- Understanding the PlayCanvas bridge: `docs/ARCHITECTURE.md`, `docs/API.md`.
