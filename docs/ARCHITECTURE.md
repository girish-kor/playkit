# Architecture

Source: `COMPONENTS.md` (sole specification document in this repository).

## Purpose

"Provide a reusable, accessible, PlayCanvas-integrated React component library for building in-game UI (HUD, inventory, dialogue, puzzles, settings, dev tools, etc.) with consistent Tailwind styling, keyboard/screen-reader support, and bidirectional PlayCanvas scene sync across both DevMode and PlayMode." (`COMPONENTS.md`, lines 3–7, verbatim.)

## Layers

1. **Primitives layer** — `Box`, `Flex`, `Grid`, `Text`, `Button`, `Icon`, `Slot`, `Input`, `Label`, `Checkbox`, `ScrollArea`, `Card`, `Image`, `Tabs`, `TreeView`, `Overlay`, `Joystick`, `RadioGroup`, `Badge`, `Avatar`, `Popover`, `Divider`, `Accordion`. `Box` is the foundational layout container; every other primitive and every feature component composes it directly or transitively.
2. **Feature/domain layer** — one module per game-UI concern (HUD, Inventory, Puzzle, Dialogue, Objectives, Timer, Navigation, Feedback, Modal, Overlay, Settings, Debug/DevTools, Editor, Loading, Error, Responsive, Accessibility, General). Each composes only Primitives (and, per `docs/MODULES.md`, a small set of verified cross-module edges) — never PlayCanvas APIs directly.
3. **PlayCanvas Bridge layer** — `PCProvider` plus the hook set documented under "Hooks Documentation" in `COMPONENTS.md` (`useEntity`, `useSync`, `useHealthSync`, `useInventorySync`, etc.). This is the only layer permitted to touch the PlayCanvas scene graph.

## DevMode / PlayMode

Every component in `COMPONENTS.md` carries a `DevMode/PlayMode` field; all components verified so far are marked `Both`, meaning the same component renders identically whether the PlayCanvas application is in its editor/development context or its running/play context. Mode-specific behavior is not implemented in components themselves — it is a property of which PlayCanvas entities/data a given hook resolves against at runtime.

## Binding model

Components that integrate with PlayCanvas expose a `pcEntity` (or `pcCamera`, `pcAction`, `pcProperty`) string prop identifying a PlayCanvas entity/script member by ID. This ID is:
- Not validated at render time (no compile-time or mount-time check that the entity exists).
- Resolved by a dedicated hook (e.g. `useEntity`, `useSync`, `useHealthSync`).
- A silent no-op if unresolved — the binding does nothing until an entity with that ID appears in the scene (verified for `Box`, `Slot`; stated to apply the same way across other `pcEntity` consumers).

This means a component is fully renderable and usable as pure React/DOM UI with zero PlayCanvas present; the PlayCanvas link is strictly additive and opt-in per instance.

## Sync hook pattern

Domain state that must move between the PlayCanvas scene and React state uses a dedicated `use<Domain>Sync` hook per domain (e.g. `useHealthSync`, `useEnergySync`, `useInventorySync`, `useSlotSync`, `useTextSync`, `useIconSync`, `useTextureSync`, `useBadgeSync`, `useAvatarSync`, `useSettingSync`/`useSettingsSync`). `Health` is documented as bidirectionally synced via `useHealthSync`; `Input`/`Checkbox`/`RadioGroup` sync one direction (React → PlayCanvas) via `useSync`, debounced 100ms by default. This is the enforced Inversion-of-Control seam described in `docs/MODULES.md`: no component file imports PlayCanvas APIs directly; every touchpoint is a hook call.

## Composition mechanism

`asChild` polymorphism (`Box`, and any component exposing `asChild`) is implemented via `Slot` (`@radix-ui/react-slot`), which renders no DOM element of its own and merges all props (including a `pcEntity` binding) onto its single child. This lets a `Box`-derived component render as a semantically different native element (e.g. a `<button>`) without an extra wrapper node.

## Accessibility architecture

Interactive primitives delegate keyboard/focus/ARIA behavior to established libraries rather than reimplementing it: `react-aria`'s `useButton` for `Button`; `@radix-ui/react-checkbox`, `@radix-ui/react-tabs`, `@radix-ui/react-radio-group`, `@radix-ui/react-accordion`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip` for their respective components. `FocusTrap` (Accessibility module) is reused by `Modal` and `Popover` (when `modal`) rather than each implementing its own trap.

## Performance architecture

Two recurring mechanisms, applied per-component where the data volume warrants it:
- **Throttling/debouncing** of high-frequency PlayCanvas reads/writes (e.g. `useSync`'s 100ms debounce; `Crosshair`'s raycaster throttled to 33ms/30Hz by default via `throttleRate`).
- **Virtualization**, enabled automatically past a documented threshold (`TreeView`: >1000 nodes; `Inventory`: configurable `virtualizationThreshold`, default 100 slots; `Grid`: recommended past ~200 cells, not automatic).

## Styling architecture

Tailwind CSS utility classes generated per-prop (e.g. `Flex`'s `direction`/`align`/`justify`/`gap` map to `flex-{direction}`, `items-{align}`, etc.), composed with `clsx` and de-duplicated/overridden safely with `tailwind-merge`. Responsive and state-variant styling not covered by a typed prop is applied by passing Tailwind classes directly via `className` (verified for `Flex`: "for responsive layouts, pass breakpoint-prefixed utilities directly via `className`").
