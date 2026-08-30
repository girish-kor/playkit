# Versioning

No version number, package manifest, or release has ever been recorded for this repository — it currently contains only the specification (`COMPONENTS.md`) and this documentation set. This document establishes the versioning policy to apply from the first published version onward.

## Policy: Semantic Versioning

Given `COMPONENTS.md`'s already-observed practice of explicitly marking removed props/variants inline (e.g. "Note: `'radio-group'` variant REMOVED," "former `isCountdown` boolean prop REMOVED") rather than silently dropping them, this project already follows semantic-versioning discipline in spirit — formalize it as SemVer (`MAJOR.MINOR.PATCH`):

- **MAJOR** — any change that breaks a documented contract in `docs/COMPONENTS.md`: a removed/renamed prop, event, or hook; a changed default value; a changed ARIA role where the change is not itself a documented correction; a changed hook signature or return shape.
- **MINOR** — a new component, hook, prop, event, or variant added without changing any existing documented contract.
- **PATCH** — a behavior fix that brings an implementation into conformance with its already-documented `COMPONENTS.md` contract, or a documentation-only correction with no behavior change.

## Deprecation before removal

Every verified removal in `COMPONENTS.md` is recorded inline at the site of the replacement (e.g. `Toggle`'s removed `'checkbox'` variant note pointing to the dedicated `Checkbox` component). Follow the same pattern: a prop/variant/hook slated for removal must be documented as deprecated, with its replacement named, for at least one MINOR release before removal in a MAJOR release.

## Scope of what is versioned

The version applies to the component/hook contract surface documented in `docs/COMPONENTS.md` and `docs/API.md`. Internal implementation changes that do not alter any documented field are not version-relevant on their own (though they may still warrant a PATCH release if they fix a conformance bug).

## Not yet established

No first version has been tagged; no `package.json` `version` field exists. The first published version should be `0.1.0` (pre-1.0, contract not yet stable) until the component/hook surface in `docs/COMPONENTS.md` is implemented and considered stable, at which point `1.0.0` marks the first stability commitment.
