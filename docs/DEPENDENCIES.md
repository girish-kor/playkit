# Dependencies

Every external package named in a component's or hook's "Dependencies" field in `COMPONENTS.md`, consolidated. `package.json` now exists (see "Version pin summary" below for the actual pinned versions); `@use-gesture/react` and `react-use` are the only two packages `COMPONENTS.md` itself constrains to a version range — every other pin below was chosen at scaffold time, not mandated by the spec.

## Core (used by nearly every component)

- **`react`** — every component.
- **`tailwind-merge`**, **`clsx`** — class-name assembly for every styled component (see `docs/DESIGN-SYSTEM.md`).

## Radix UI primitives (accessible interaction behavior)

| Package | Used by |
|---|---|
| `@radix-ui/react-slot` | `Box`, `Slot`, and every component supporting `asChild` |
| `@radix-ui/react-checkbox` | `Checkbox` |
| `@radix-ui/react-radio-group` | `RadioGroup` |
| `@radix-ui/react-tabs` | `Tabs` |
| `@radix-ui/react-accordion` | `Accordion` |
| `@radix-ui/react-popover` | `Popover`, `ColorPicker` |
| `@radix-ui/react-tooltip` | `Tooltip`, `ItemTip`, `ItemComparison` |
| `@radix-ui/react-focus-trap` | `Dialogue`, `Modal`, `FocusTrap` |
| `@radix-ui/react-dialog` | `Modal` |
| `@radix-ui/react-context-menu` | `ContextMenu` |
| `@radix-ui/react-hover-card` | `HoverCard` |
| `@radix-ui/react-dropdown-menu` | `DropdownMenu` (a distinct Radix primitive from `@radix-ui/react-context-menu` — different trigger/positioning semantics upstream; do not substitute one for the other) |
| `@radix-ui/react-switch` | `Toggle` |
| `@radix-ui/react-slider` | `Slider`, `AccessibilitySlider` |
| `@radix-ui/react-select` | `Select` |

## Accessibility / interaction libraries

- **`react-aria`** — `useButton` (`Button`), `useMenu` (`NavMenu`, `SidebarMenu`).

## Drag, gesture, and touch

- **`@dnd-kit/core`** — `Inventory`, `ItemSlot`, `EquipmentSlots`, `LootContainer`, `ObjectPuzzle`, `Palette`. Requires sensors configured via `useSensor`/`useSensors` at the `DndContext` level (e.g. `useSensor(PointerSensor, { activationConstraint: { distance: 8 } })`) — without an activation constraint, clicks on slots/items can be misinterpreted as drag starts. Not virtualized by default; for dozens of draggable items or more (`ObjectPuzzle`), paginate or window-render rather than mounting every draggable.
- **`@use-gesture/react@^10`** (version-pinned) — `Joystick`, `CombinationLock`, `PatternLock`.

## Icons and effects

- **`lucide-react`** — `Icon` (default icon set), `Crosshair` (icon or custom SVG), `DevTools`, `Rating`.
- **`canvas-confetti`** — `Confetti` (or an internal canvas-based particle renderer, noted in `COMPONENTS.md` as an alternative).

## State

- **`zustand`** — `Puzzle`, `Settings`, `PCProvider` only. SSR caveat: a module-scope `create()` call is unsafe for server rendering (state leaks between requests); use a per-request/per-provider store factory if server-rendered. See `docs/STATE-MANAGEMENT.md`.

## Scrolling

- **`react-use@^17`** (version-pinned) — pins the `useScroll` hook consumed by `ScrollArea`; verify compatibility against whatever `react-use` version is actually installed, since the pin is on the specific hook's behavior, not the whole package's API surface.

## Routing (optional)

- **`react-router-dom`** — optional dependency of `NavMenu`, `SidebarMenu`, and the `useTransition`/`Back`/`Breadcrumb` navigation path (`useNavigate` used "if react-router available"). `NavMenu`/`SidebarMenu` do not integrate with any router themselves beyond this optional hook call — they emit `onNavigate(path)` with an opaque, unvalidated `path` string; wiring it into `react-router-dom` or an equivalent is the consumer's responsibility.

## React built-ins listed as dependencies

`COMPONENTS.md` lists specific React built-in hooks as "Dependencies" on some components, following the document's own convention of naming exactly what a component imports: **`useMemo`** — `Inventory`, `SliderPuzzle`, `MemoryMatch` (in `MemoryMatch`'s case, to shuffle pairs once per instance, not on every render).

## Version pin summary

`package.json` now exists; every dependency below is pinned to the latest version
available on the npm registry at scaffold time (checked directly against the registry,
not assumed). `@use-gesture/react` and `react-use` still carry the two version
constraints `COMPONENTS.md` itself specifies (`^10`, `^17`); every other package's pin
is a new record, not something `COMPONENTS.md` mandated a specific version for.

| Package | Pinned | Notes |
|---|---|---|
| `react`, `react-dom` | `>=18` (peerDependencies) | Not bundled — consumer-supplied, per `docs/ARCHITECTURE.md`. |
| `react-router-dom` | `>=6` (optional peerDependency) | Matches its optional/consumer-wired status (docs/DEPENDENCIES.md § Routing). |
| `tailwind-merge` | `^3.6.0` | |
| `clsx` | `^2.1.1` | |
| `@radix-ui/react-slot` | `^1.3.3` | |
| `@radix-ui/react-checkbox` | `^1.3.11` | |
| `@radix-ui/react-radio-group` | `^1.4.7` | |
| `@radix-ui/react-tabs` | `^1.1.21` | |
| `@radix-ui/react-accordion` | `^1.2.20` | |
| `@radix-ui/react-popover` | `^1.1.23` | |
| `@radix-ui/react-tooltip` | `^1.2.16` | |
| `@radix-ui/react-dialog` | `^1.1.23` | |
| `@radix-ui/react-context-menu` | `^2.3.7` | |
| `@radix-ui/react-hover-card` | `^1.1.23` | |
| `@radix-ui/react-dropdown-menu` | `^2.1.24` | |
| `@radix-ui/react-switch` | `^1.3.7` | |
| `@radix-ui/react-slider` | `^1.4.7` | |
| `@radix-ui/react-select` | `^2.3.7` | |
| `@radix-ui/react-focus-trap` | **not pinned — does not exist on the npm registry** (verified: `npm view @radix-ui/react-focus-trap` returns 404). See "Unresolvable dependency" below; not added to `package.json`. |
| `react-aria` | `^3.51.0` | `useButton`, `useMenu` only (`docs/API.md`). |
| `@dnd-kit/core` | `^6.3.1` | |
| `@use-gesture/react` | `^10.3.1` | Matches `COMPONENTS.md`'s own `^10` pin. |
| `lucide-react` | `^1.37.0` | |
| `canvas-confetti` | `^1.9.4` (+ `@types/canvas-confetti ^1.9.0` dev dep) | |
| `zustand` | `^5.0.15` | Scoped to `Puzzle`, `Settings`, `PCProvider` only — see `docs/STATE-MANAGEMENT.md`. |
| `react-use` | `^17.6.1` | Matches `COMPONENTS.md`'s own `^17` pin. |
| `playcanvas` | `^2.21.4` (devDependency only, for local type-checking/testing against a real `pc.*` surface) | Not a runtime dependency of the package itself — the consumer supplies the PlayCanvas app instance via `PCProvider`, per `docs/ARCHITECTURE.md`. |

Build/test/lint tooling (not part of `COMPONENTS.md`'s dependency set, but required to
build/verify it — see `docs/BUILD.md`, `docs/CI-CD.md`): `typescript`, `tsup`, `vitest`
+ `@vitejs/plugin-react` + `jsdom`, `@testing-library/react`/`jest-dom`/`user-event`,
`eslint` (pinned to the 9.x line — `eslint-plugin-jsx-a11y` and `eslint-plugin-react`
had not yet released support for ESLint 10 at scaffold time) with `typescript-eslint`,
`eslint-plugin-react`/`react-hooks`/`jsx-a11y`, `eslint-config-prettier`, `prettier`,
`tailwindcss` v4 + `@tailwindcss/postcss`. Exact versions are in `package.json`.

## Unresolvable dependency: `@radix-ui/react-focus-trap`

`COMPONENTS.md` names `@radix-ui/react-focus-trap` as a dependency of `Dialogue`,
`Modal`, and `FocusTrap`. That package does not exist on the npm registry — Radix UI's
focus-trapping behavior ships internally inside `@radix-ui/react-dialog`/`react-popover`
(via `@radix-ui/react-focus-scope` and `@radix-ui/react-focus-guards`, neither of which
is documented as a direct dependency anywhere in `COMPONENTS.md`), not as a standalone
consumable package under that name. This is preserved here as a documented discrepancy
rather than silently substituted with a different package — per this repository's own
convention of recording rather than "fixing" a spec inconsistency without a spec update
(see `docs/API.md`'s `useSequenceSubmit`/`usePuzzleSubmit` naming-inconsistency note for
the same convention applied elsewhere). Resolving it (either `COMPONENTS.md` names the
correct package, or `FocusTrap`/`Modal`/`Dialogue` are implemented directly on
`@radix-ui/react-focus-scope`) is a decision for whoever implements those three
components, not something to guess here.
