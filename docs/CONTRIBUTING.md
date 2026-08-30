# Contributing

## Before making a change

1. Read `docs/RULES.md` and `docs/CODING-STANDARDS.md` — every contribution is expected to satisfy both.
2. Identify which category/module (`docs/MODULES.md`) the change belongs to. A change that crosses a module boundary not already listed in `docs/MODULES.md` requires updating `COMPONENTS.md`/`docs/MODULES.md` first, in the same PR.
3. Check `docs/COMPONENTS.md` for the component's current, authoritative contract before changing its behavior — an implementation must match every documented field (Purpose, Props/API, State, Events, Variants, PlayCanvas Integration, Tailwind/UI Behavior, Dependencies, Composition, Accessibility, Rebuild Notes) exactly, or the spec must be updated alongside the code.

## Making the change

- Follow the naming, prop-API, composition, styling, and performance rules in `docs/CODING-STANDARDS.md`.
- Follow the accessibility delegation rule: use `react-aria`/the matching `@radix-ui/react-*` primitive wherever one is already named in the component's Dependencies field — do not hand-roll keyboard/focus/ARIA behavior a named library already provides.
- Match every documented default value, debounce/throttle number, and virtualization threshold exactly (`docs/PERFORMANCE.md`) unless the change is specifically to that default, in which case update `docs/PERFORMANCE.md` and `COMPONENTS.md` together.
- Add tests per the coverage requirement in `docs/TESTING.md` before requesting review.

## Submitting

- Follow the branching and PR rules in `docs/GIT.md`.
- Update `docs/CHANGELOG.md` for any change to a public prop, event, hook, or accessibility contract, per `docs/VERSIONING.md`.
- Ensure the gates in `docs/CI-CD.md` pass.

## Documentation-only contributions

A correction to any file in `docs/` follows the same PR process, but does not require a `docs/CHANGELOG.md` entry unless it corrects a factual error about the shipped component's actual behavior (in which case it is effectively a documentation-of-a-bug and should be paired with either a code fix or an explicit note that the code, not the doc, is wrong).
