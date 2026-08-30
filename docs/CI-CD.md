# CI/CD

No GitHub Actions workflow or other CI/CD configuration exists in this repository as of this writing. This document defines the required gate policy for when one is added to this GitHub repository; it does not describe an existing pipeline.

## Required gates before merge

Derived from the standards already established in this doc set — a CI pipeline's job is to mechanically enforce them, not to invent new ones:
1. Type-check against the TypeScript-style contracts in `docs/API.md`/`docs/COMPONENTS.md` (see `docs/BUILD.md`).
2. Run the test suite defined by `docs/TESTING.md`'s coverage requirements.
3. Lint against `docs/CODING-STANDARDS.md`'s naming, prop-API, and composition rules.
4. Verify no Debug/DevTools-category component is reachable from the production entry point (`docs/LOGGING.md`, `docs/BUILD.md`).
5. Verify `docs/CHANGELOG.md` has a corresponding entry for any change that alters a component's public prop/event/hook contract (`docs/VERSIONING.md`).

## Required gates before release

1. All of the above, on the release commit/tag.
2. A successful build per `docs/BUILD.md`.
3. Version bump per `docs/VERSIONING.md` matches the nature of the change (patch/minor/major).

## Not yet established

No CI provider configuration, workflow file, secrets, or branch-protection rule exists yet. When a workflow is added under `.github/workflows/`, it must implement the gates above, and this document should be updated to reference the actual workflow file(s) by name.
