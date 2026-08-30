# Rebuild Guide

Every component in `COMPONENTS.md` carries a "Rebuild Notes" field with implementation guidance. This document organizes that guidance into a build order and per-category summary. For a component's full prop/event/accessibility contract, see `docs/COMPONENTS.md`; this file surfaces only the rebuild-specific instructions.

## Build order (dependency-driven, per `docs/MODULES.md`)

1. **PlayCanvas Bridge** — `PCProvider` first (wraps the entire app; single source of truth for the PlayCanvas instance via `zustand`), then the "public" PlayCanvas hooks (`useEntity`, `useScript`, `useEvent`, `useSync`, `useTransition`, `useInput`, `useNetwork`) that every other hook builds on.
2. **Primitives** — `Box` first (foundational; everything composes it), then `Flex`/`Grid`/`Text` (all extend `Box`), then the remaining primitives.
3. **Domain sync hooks** — one `use<Domain>Sync` hook per feature module, per `docs/API.md`.
4. **Feature modules** — HUD, Inventory, Puzzle, Dialogue, Objectives, Timer, Navigation, Feedback, Modal, Overlay, Settings, Debug/DevTools, Editor, Loading, Error, Responsive, Accessibility, General — each depends only on Primitives (plus the verified cross-module edges in `docs/MODULES.md`).

## Primitives

- **Box**: replace raw `<div>` with `Box`; prefer `asChild` for semantic HTML.
- **Flex**: extends `Box`; use for all flex layouts, avoid manual flex utilities.
- **Grid**: use for inventory grids and puzzle layouts; avoid nested flex for grid-like layouts; virtualize past ~200 cells.
- **Text**: supports rich text via `dangerouslySetInnerHTML` (caller sanitizes); use for all typography; prefer semantic `as`.
- **Button**: always use `react-aria`; avoid a raw `<button>`; use `onPress`, not `onClick`.
- **Icon**: use Lucide for standard icons; support custom SVG via `children`; to add a custom icon set, provide a `name`-to-SVG lookup keyed the same way as Lucide (kebab-case), and log unresolved names as a dev warning rather than throwing.
- **Slot**: critical for polymorphic components; use sparingly to avoid extra wrappers.
- **Input**: support both controlled and uncontrolled usage for all user text entry.
- **Checkbox**: use Radix Checkbox for keyboard/screen-reader support; use the dedicated `Toggle` for switch-style controls.
- **ScrollArea**: build on `react-use`'s `useScroll` for scroll detection; implement a custom `useScrollToBottom` for chat/history auto-scroll.
- **TreeView**: enable virtualization above 1000 nodes; used by `Inspector`; supports lazy loading via `loadChildren`.
- **RadioGroup**: use Radix RadioGroup for roving-tabindex keyboard behavior.
- **Divider**: replaces ad-hoc `Box` border styling for section breaks.
- **Accordion**: uses Radix Accordion; generalizes the collapse behavior `Objectives` used ad hoc.

## HUD

- **HUD**: contains all HUD components; manages the z-index stack; drive positioning via `position`/`offset`.
- **Health**: use `useAnimation` for smooth transitions; usable for player or enemy health.
- **Energy**: extends `Progress` directly (not `Health`) to avoid duplication, with custom colors layered on top.
- **Crosshair**: update via `requestAnimationFrame`; keep centered and unclickable (`pointer-events-none`).
- **Compass**: recompute on PlayCanvas transform changes; memoize angle calculations.
- **AmmoIndicator**: update `current` per shot from the weapon script; drive `isReloading`/`reloadProgress` from the reload action.
- **DamageNumbers**: cap `maxConcurrent` and use `stacking="combine"` for fast multi-hit weapons; recycle DOM nodes rather than remounting per event.
- **StatusEffects**: feed `remaining` from a per-frame or per-second tick; reuse `Badge` for stack counts.

## Inventory

- **Inventory**: each slot renders `ItemSlot`; supports drag-drop; virtualize above `virtualizationThreshold` (default 100).
- **ItemSlot**: uses `@dnd-kit/core` for touch/accessible drag; manages drop-target highlighting.
- **EquipmentSlots**: reuses `ItemSlot` per equipment slot; validate `slotType` compatibility in the consumer, not inside the component.
- **ItemComparison**: reuses `ItemTip`'s stat-row rendering; compute deltas from `statKeys` (or auto-derived numeric fields) in a shared stat-diff util.
- **CraftingPanel**: compute `canCraft` by diffing `ingredients` against `inventory`; drive `craftProgress` from a timer for non-instant crafts.
- **LootContainer**: reuses `Inventory` for both the container and player panels; `variant="loot"` hides deposit UI entirely rather than disabling it.

## Puzzle

- **Puzzle**: every other puzzle type extends this; use `zustand` for global puzzle state (per-request store factory if server-rendered).
- **CodePuzzle**: manage focus with `useRef`; support paste; auto-advance between digits.
- **SequencePuzzle**: for >100 steps, key by index and memoize per-step visuals or paginate.
- **SliderPuzzle**: former `onMove` prop removed — use `onTileMove`.
- **ObjectPuzzle**: paginate/window-render above dozens of draggable objects (`@dnd-kit/core` is not virtualized by default).
- **MathPuzzle**: never evaluate the problem/expression internally — that's the consumer's job, keeping the component parser-free.
- **WordPuzzle**: crossword mode is the most involved (clue numbering, across/down linking); anagram/letter-grid share selection/validation logic.
- **MemoryMatch**: shuffle once per instance via `useMemo`, not on every render; never leak hidden icon identity via ARIA before a flip.
- **CombinationLock**: mirror `Slider`'s keyboard pattern (Up/Down or Left/Right) on each wheel.
- **PatternLock**: pointer-drag interaction requires a keyboard-accessible alternative (sequential dot-selection mode) — not optional.

## Dialogue

- **Dialogue**: reuse a single instance across lines (update `text`) rather than remounting per line; prefer `autoAdvance`/skip over raising `typingSpeed`.
- **Choice**: plain text only, no rich content.
- **History**: use `useScrollToBottom`; timestamps normalize to `Date` internally.
- **Subtitle**: distinct from `Dialogue` — no choices, `autoAdvance` defaults `true` (opposite of `Dialogue`'s default), and does not trap focus.

## Objectives

- **Objectives**: `progress` is a raw count against `maxProgress`, not pre-normalized, unless `maxProgress` is omitted (then treated as a 0–1 fraction).
- **Objective**: `aria-level` nests one level deeper than its parent for subtasks.

## Timer

- **Timer**: former `isCountdown` boolean prop removed from the public API — use `mode`; the internal `useTimer` hook keeps its own separate `isCountdown` option.
- **Stopwatch**: extends `Timer` + `Button`; recorded lap times always carry ms precision internally regardless of what `showMilliseconds` displays.

## Navigation

- **NavMenu**: does not integrate with any router itself — emits `onNavigate(path)` with an opaque path string; the consumer wires it into `react-router-dom` or an equivalent. Former separate `orientation` prop removed — `variant` now controls both orientation and style.
- **Back**: `variant="icon-only"` is the default; for `variant="text-only"`, always pass `label` explicitly.
- **Breadcrumb**: collapses middle items into an ellipsis past `maxVisible`.
- **SidebarMenu**: shares `NavItem` typing and `useTransition`/`useMenu` with `NavMenu`; collapsed items keep their `aria-label` in the accessibility tree.

## Feedback

- **Toast**: former `'loading'` type removed — use `Spinner` for loading states instead.
- **Spinner**: former `'progress-bar'` variant removed — use `Progress` for a determinate bar.
- **Progress**: `animated` is a separate boolean orthogonal to `variant`, not a variant itself.
- **AlertBanner**: use for connection loss/maintenance-style persistent status, not transient confirmations (use `Toast` for those).
- **Confetti**: purely decorative — never gate gameplay-critical feedback ("you won") behind it alone; pair with a `Toast`/`Modal` announcement.
- **LoadingDots**: use inline within text/buttons where `Spinner` would be visually too heavy; identical ARIA semantics to `Spinner` despite the simpler visual.

## Modal

- **Modal**: original scroll position and overflow style are captured on open and restored automatically on close — no extra prop needed.
- **Confirm**: former `danger` boolean removed — use `variant`.

## Overlay

- **ContextMenu**: former `'custom'` variant removed — use `renderItem` for custom item rendering; virtualize once item count passes `maxItems` (default 50, opt-in).
- **HoverCard**: former `'preview'` variant removed as redundant — pass any `ReactNode` via `content` regardless of variant.
- **DropdownMenu**: uses a distinct Radix primitive from `ContextMenu` — do not substitute one implementation for the other.

## Settings

- **Settings**: former `'full-page'` variant removed — use `variant="modal"` plus `Modal`'s own `variant="full-screen"` for the equivalent.
- **Toggle**: former `'checkbox'` variant removed — use the dedicated `Checkbox` component.
- **Select**: former `'radio-group'` variant removed — use `variant="button-group"`, or the dedicated `RadioGroup` primitive.
- **AccessibilitySlider**: kept as a separate component from `Slider` specifically to force preview-first UX for accessibility settings.

## Debug/DevTools (all DevMode only — never ship to production)

- **DevTools**: only fully detaches listeners when closed, not minimized.
- **Inspector**: former `'filtered'` variant removed — use the `filter` prop.
- **PerformanceMonitor**: keep `updateInterval` at 500ms or higher outside active investigation; exclude from production builds.
- **AssetViewer**: `showUnusedOnly` is for leak-finding by comparing reference counts to zero.

## Editor (all DevMode only)

- **Editor**: internally uses "Gizmo" controls for 3D manipulation, not separately documented as a public component.
- **TerrainPainter**: paint interaction is pointer-only by design (consistent with other direct-manipulation Editor tools); mode/brush controls remain keyboard accessible; undo/redo goes through `Editor`'s own handlers.
- **LightingControls**: reuses `usePropertyEditor` (the same hook as `Property`) as a specialized form.

## Loading

- **LoadScreen**: former `'animated'` variant removed — apply CSS animation via `className` directly, since it's an orthogonal visual effect.
- **Skeleton**: `'card'`/`'avatar'` are not primitives — compose multiple `Skeleton` primitives (e.g. a circle plus stacked text lines in `Flex`) rather than expecting one variant to produce a whole composite shape.

## Error

- **ErrorMsg**: used by both `ErrorBoundary` and network-error paths.

## Responsive

- **Responsive**: former `'tv'` variant removed — use `variant="desktop"` with a custom `breakpoints` map (higher `xl`/`2xl` thresholds) instead.
- **Touch**: former `'custom'` variant removed — use `children` for custom layout; only render on touch devices.
- **OrientationLock**: `attemptLock` only works within a user-gesture-initiated fullscreen on most browsers — treat the built-in fallback prompt as the reliable primary path, `attemptLock` as best-effort only.

## Accessibility

- **FocusTrap**: former `'non-modal'` variant removed; `'auto'` exists mainly for future extensibility, currently behaving like `'modal'` whenever active.
- **ScreenReader**: former `'live'` priority value removed — use `'polite'`; used for puzzle clues, objective updates, dialogue; debounced.
- **LiveRegion**: use for chat/History logs, live objective progress text, and score counters where updates happen outside explicit user action.

## General

- **Rating**: role/behavior are derived from interactivity (whether `onChange` is passed) rather than duplicated markup.
- **Tag**: keep separate from `Badge` — `Tag` is inline/removable, `Badge` is an overlay indicator.

## PlayCanvas Bridge

- **PCProvider**: wraps the entire app; single source of truth for the PlayCanvas instance; handles its lifecycle; `scripts` in `config` must load, in order, before the app starts so any `pcAction`/`useScript` reference elsewhere is guaranteed registered by `onReady`.
