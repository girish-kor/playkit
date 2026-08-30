# Testing

No test files, test runner, or test configuration exist in this repository. This document defines the required testing standard for when implementation begins, derived entirely from what `COMPONENTS.md` makes testable per component: its `State`, `Events`, `Variants`, `Accessibility`, and `Performance` fields.

## Coverage requirement

A component's test suite is incomplete unless it exercises:
1. Every event listed in that component's `Events:` field in `COMPONENTS.md`, including alias events that fire alongside a primary one (e.g. `Checkbox.onCheckedChange` must be asserted alongside `onChange`, not instead of it).
2. Every documented default value for every optional prop.
3. Both the controlled and uncontrolled mode of every component that exposes a `value`/`default*` pair (see `docs/STATE-MANAGEMENT.md`), verifying the controlled prop wins when both are supplied.
4. The documented ARIA role and required `aria-*` attributes from that component's `Accessibility:` field (see `docs/ACCESSIBILITY.md`) — including role transitions (e.g. `Grid`'s `role="none"` → `role="grid"` when made interactive, `Rating`'s read-only vs. interactive role derivation).
5. Every attempt-vs-success callback pair (see `docs/ERROR-HANDLING.md`) with both outcomes exercised, not only the success path.
6. Documented threshold/derived-state transitions (e.g. `Health.onLow`/`onCritical` at their threshold boundaries, `AmmoIndicator.onLowAmmo`, `Energy.onEmpty`/`onMax`).

## PlayCanvas bridge isolation

Every component's PlayCanvas integration goes through a hook (`docs/API.md`); component tests must be able to run with `pcEntity` omitted or unresolved and assert the documented no-op behavior (silent, no crash — see `docs/ERROR-HANDLING.md`'s "PlayCanvas bridge hooks never throw" convention) without requiring a live PlayCanvas application. Hook-level tests (for `useSync`, `useHealthSync`, etc.) are the correct place to verify actual PlayCanvas read/write behavior, mocking `pc.Application`/`pc.Entity` — component tests should not need a real PlayCanvas instance.

## Deterministic tests for time- and frame-driven behavior

Components documented as `requestAnimationFrame`-driven (`useAnimation`, `useTimer`, `Health`/`Energy`'s `animated` tweening, `Dialogue`'s typewriter via `useTypewriter`) must be tested with a controllable/fake timer or rAF shim rather than real wall-clock waits, since `COMPONENTS.md` itself notes tween duration can stretch under frame drops — tests need to control frame timing, not depend on it.

## Debounce/throttle assertions

Every documented debounce/throttle default (`docs/PERFORMANCE.md`) must have a corresponding test asserting the interval is honored — e.g. that `useSync`'s default 100ms debounce coalesces rapid `setValue` calls into a single PlayCanvas write, and that `Crosshair`'s raycast fires no more often than its `throttleRate`.

## Test identifiers

`Box` and its descendants document a `data-testid?: string` prop (and generic `data-*` passthrough); implementation must forward `data-testid` to the rendered DOM node unchanged, and tests should prefer querying by `data-testid` over implementation-detail selectors (class names, DOM structure) for exactly this reason.

## Reduced-motion and accessibility-preference testing

Components that branch on `prefers-reduced-motion`/`prefers-contrast` (`Overlay`, `A11y`, `Confetti`) must be tested under both the reduced and non-reduced states, since `COMPONENTS.md` documents materially different rendered output (skipped transitions, `reducedMotionFallback` content) for each.

## Validation-path testing

Every prop documented as "not validated at runtime" in `COMPONENTS.md` (see `docs/VALIDATION.md` for the full catalog — e.g. `SliderPuzzle.tiles`, `Icon.name`, `pcEntity` on any binding prop) must have a test confirming the component degrades as documented (silent no-op, fallback rendering, or runtime-only failure) rather than crashing, since the specification explicitly defers validation to the caller or to runtime in these cases.

## DevMode-only components

`DevTools`, `Inspector`, `Property`, `Console`, `PerformanceMonitor`, `AssetViewer` must have a test asserting they render nothing (or are excluded) when `enabled`/the production condition is `false`, given the explicit "never ship to production" rebuild guidance in `docs/LOGGING.md`.
