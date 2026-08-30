# Dependencies

Every external package named in a component's or hook's "Dependencies" field in `COMPONENTS.md`, consolidated. No `package.json` exists in this repository — the version pins below are the only ones stated anywhere in the source spec; every other package is named without a version.

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

Only two packages carry an explicit version constraint anywhere in `COMPONENTS.md`: `@use-gesture/react@^10` and `react-use@^17`. Every other package listed above has no stated version — pin an exact version when the actual `package.json` for this repository is created, and record it here.
