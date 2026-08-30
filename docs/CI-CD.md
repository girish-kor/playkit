# CI/CD

No GitHub Actions workflow (or other CI provider config) has been added to this
repository yet — `.github/workflows/**` is intentionally out of scope for this change
(see `.claude/settings.json`'s permission rules). What now exists is the full set of
npm scripts a workflow would call; wiring them into an actual `.github/workflows/*.yml`
is the remaining step, and this document should be updated to name that file once added.

## Required gates before merge

Derived from the standards already established in this doc set — a CI pipeline's job is
to mechanically enforce them, not to invent new ones. Each gate below is already a
runnable npm script:

1. Type-check against the TypeScript-style contracts in `docs/API.md`/`docs/COMPONENTS.md`
   (see `docs/BUILD.md`). **`npm run typecheck`** (`tsc --noEmit`).
2. Run the test suite defined by `docs/TESTING.md`'s coverage requirements.
   **`npm run test`** (`vitest run`). Currently one scaffold-level export-surface smoke
   test (`src/__tests__/exports.test.tsx`); the full per-component coverage `docs/TESTING.md`
   describes is added alongside each component's real implementation.
3. Lint against `docs/CODING-STANDARDS.md`'s naming, prop-API, and composition rules.
   **`npm run lint`** (`eslint .`) plus **`npm run format:check`** (`prettier --check .`).
   Only the mechanically-checkable subset is covered by `eslint.config.js` — module-
   boundary edges (`docs/MODULES.md`) and per-component documented defaults still need
   human review per `docs/CONTRIBUTING.md`.
4. Verify no Debug/DevTools-category component is reachable from the production entry
   point (`docs/LOGGING.md`, `docs/BUILD.md`). **`npm run build && npm run verify:devtools-excluded`**
   (`scripts/verify-devtools-excluded.mjs`, checked against the built `dist/index.js`).
5. Verify `docs/CHANGELOG.md` has a corresponding entry for any change that alters a
   component's public prop/event/hook contract (`docs/VERSIONING.md`). **Not automated**
   — this stays a manual PR-review checklist item per `docs/CONTRIBUTING.md`, since
   "does this diff change a public contract" isn't mechanically decidable from the diff
   alone.

`npm run ci` runs gates 1–4 in sequence (typecheck → lint → format:check → test → build
→ verify:devtools-excluded) and is the single command a workflow file should invoke.

## Required gates before release

1. All of the above, on the release commit/tag.
2. A successful build per `docs/BUILD.md` (`npm run build`).
3. Version bump per `docs/VERSIONING.md` matches the nature of the change (patch/minor/major).

## Not yet established

- No CI provider workflow file, secrets, or branch-protection rule exists yet.
- No publish step exists (see `docs/DEPLOYMENT.md`) — `npm run ci` stops after building
  and verifying, it does not publish anywhere.

When a workflow is added under `.github/workflows/`, it must call `npm run ci` (plus a
publish step per `docs/DEPLOYMENT.md` for releases), and this document should be
updated to reference the actual workflow file(s) by name.
