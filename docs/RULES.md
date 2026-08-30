# Rules

Cross-cutting engineering rules enforced across this repository, each grounded in behavior verified in `COMPONENTS.md`. Every rule below is binding; a change that violates one requires updating `COMPONENTS.md` and the referenced doc first.

## ACID (applied to component state operations, not a database)

- **Atomicity** — Multi-step state changes complete fully or not at all. `CraftingPanel.onCraft` either succeeds (ingredients deducted, output produced, `onCraftComplete`) or fails via `onCraftFail(recipeId, reason: 'missing-ingredients' | 'error')` with no partial ingredient deduction implied by the spec. `Inventory.onDrop(from, to)` is a single swap operation, not two independent slot writes.
- **Consistency** — Derived state has one source of truth. `Label.variant` "is derived automatically from the `required`/`optional` props ... `required`/`optional` are the source of truth for both behavior and the `variant` styling — set `required`/`optional`, not `variant`." Any prop documented as "derived from" another prop must never be settable in a way that contradicts its source.
- **Isolation** — A `pcEntity` binding that doesn't yet resolve is a no-op, not an error or a stale write; concurrent PlayCanvas-side and React-side updates to the same synced value (`Health` via `useHealthSync`) must not corrupt each other. Virtualization (`docs/PERFORMANCE.md`) must not alter the logical state shape it renders from.
- **Durability** — State that must survive independent of a given render (health, inventory contents, equipped items) is owned by the PlayCanvas-side sync target via its `use<Domain>Sync` hook, not by transient component state alone; unmounting the component must not lose that state.

## MVC (mapped to this architecture's layers)

Model = PlayCanvas scene graph/entities (source of truth for synced domains). View = the component/Primitives layer (`docs/ARCHITECTURE.md`). Controller = the hooks layer (`docs/API.md`) — every read/write between Model and View passes through a hook; a component (View) must never mutate the PlayCanvas scene graph (Model) directly.

## SOLID, DRY, KISS, SoC, IoC, DI

See `docs/CODING-STANDARDS.md` § "Enforcement mapping" for the full, evidence-cited mapping of each principle to verified `COMPONENTS.md` behavior.

## Modularity

Module boundaries are the `## Category:` groupings in `COMPONENTS.md`; the allowed cross-module dependency edges are enumerated exhaustively in `docs/MODULES.md`. Adding an import that crosses a module boundary not already listed there is prohibited until `COMPONENTS.md` and `docs/MODULES.md` are updated to declare it.

## Scalability

- Large collections must use the documented virtualization thresholds (`TreeView` >1000 nodes, `Inventory` via `virtualizationThreshold` default 100, `Grid` recommended past ~200 cells) — see `docs/PERFORMANCE.md`.
- High-frequency PlayCanvas reads/writes must use the documented throttle/debounce defaults (`useSync` 100ms, `Crosshair.throttleRate` 33ms default) rather than firing unthrottled.

## Maintainability

- A component's `COMPONENTS.md` entry (Purpose, Props/API, State, Events, Variants, PlayCanvas Integration, Tailwind/UI Behavior, Dependencies, Composition, Accessibility, Rebuild Notes) is the single specification a maintainer needs; an implementation diverging from any field without updating the spec first is a defect.
- Naming and prop-API conventions in `docs/CODING-STANDARDS.md` must hold for every new component so the library stays predictable across ~100+ components.

## Security

See `docs/SECURITY.md`. Binding rule: the only documented raw-HTML injection point (`Text.dangerouslySetInnerHTML`) requires caller-side sanitization; no other component may accept raw HTML without the same explicit contract.

## Accessibility

See `docs/ACCESSIBILITY.md`. Binding rule: interactive behavior is delegated to `react-aria`/`@radix-ui/react-*` wherever named in a component's Dependencies field, never hand-rolled; every component with an icon-only or otherwise non-textual accessible name enforces a required `aria-label` (verified: `Button` with `variant="icon-only"` throws a dev-time console error if `aria-label` is missing).

## Performance

See `docs/PERFORMANCE.md`. Binding rule: documented default throttle/debounce/virtualization values must not be weakened (e.g. `useSync`'s debounce must not be set to `0`) without a corresponding spec and doc update.

## Testing

See `docs/TESTING.md`. Binding rule: every documented `State:`, `Events:`, and `Accessibility` field is a required test target — a component's test suite is incomplete if it does not exercise every event listed in `COMPONENTS.md` and assert the documented ARIA role/attributes.

## Coding standards

See `docs/CODING-STANDARDS.md` for the full rule set (naming, prop API, composition, styling, performance discipline).
