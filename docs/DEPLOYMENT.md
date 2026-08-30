# Deployment

No deployment target, package registry, or release pipeline exists for this repository as of this writing. This is a component library, not a deployable application — its "deployment" is publishing a versioned package for consumption by game projects that embed it alongside their own PlayCanvas application, not deploying a running service.

## What deployment means for this project

Per `docs/ARCHITECTURE.md`, this library has no server and no backend (see `docs/SECURITY.md`'s "Out of scope" section) — there is no environment (staging/production URL, container, server) to deploy *to* in the usual sense. The deployable artifact is the built package described in `docs/BUILD.md`, consumed by a downstream game project.

## Requirements a release must satisfy (derived, not invented)

1. Follow the versioning policy in `docs/VERSIONING.md` before any release.
2. Exclude Debug/DevTools-category components from what ships (`docs/BUILD.md`, `docs/LOGGING.md`).
3. Match the change entry recorded in `docs/CHANGELOG.md` for that version.

## Not yet established

No package registry (npm, a private registry, a monorepo-internal workspace reference) is named anywhere in `COMPONENTS.md`. No CI-triggered publish step exists (see `docs/CI-CD.md`). Do not assume a specific registry or publish mechanism until one is actually configured; update this document once it is.
