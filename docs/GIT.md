# Git

This repository has no `.git` directory and no commit history as of this writing (verified: `git status` reports "not a git repository"). This document establishes the branching, commit, and PR rules to follow from the first commit onward — it is a standard to adopt, not a description of existing history.

## Branching

- `main` is the default, always-releasable branch. No other long-lived branch is defined; this is a component-library repository without separate deploy environments requiring their own branches (see `docs/DEPLOYMENT.md`).
- Feature/fix work happens on short-lived branches off `main`, merged via pull request — never pushed directly to `main`.
- Branch names identify the category and component/doc being touched where applicable (e.g. `inventory/craftingpanel-fix`, `docs/accessibility-update`), matching the category taxonomy in `docs/FOLDER-STRUCTURE.md`.

## Commits

- Commit messages describe *why*, not *what* — the diff already shows what changed.
- A commit that changes a component's documented Props/API, Events, or Accessibility contract in `docs/COMPONENTS.md` must update `docs/COMPONENTS.md` (and any dependent doc — `docs/API.md`, `docs/ACCESSIBILITY.md`, etc.) in the same commit or PR, never as a follow-up — this repository's docs are generated from and must stay synchronized with the component spec (`docs/RULES.md` § Maintainability).
- Never rewrite history on `main` (no force-push, no rebase of already-merged commits).

## Pull requests

- One logical change per PR — a bug fix does not carry unrelated refactors (`docs/CODING-STANDARDS.md`'s scope discipline applies at the PR level too).
- A PR touching a component must reference which category/module (`docs/MODULES.md`) it belongs to and confirm no new cross-module edge was introduced without updating `docs/MODULES.md` first.
- A PR is not mergeable until the gates in `docs/CI-CD.md` pass.

## Tags/releases

Tag format and cadence follow `docs/VERSIONING.md`. A tag is only created after the corresponding `docs/CHANGELOG.md` entry is merged.
