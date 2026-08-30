# Accessibility

Every rule below is verified directly from `COMPONENTS.md`'s "Accessibility" fields. Interactive behavior is delegated to `react-aria` (`useButton`, `useMenu`) or the matching `@radix-ui/react-*` primitive wherever one is named in a component's Dependencies — never hand-rolled (see `docs/CODING-STANDARDS.md`).

## Required accessible names (enforced, not just recommended)

- `Button` with `variant="icon-only"` throws a development-time `console.error` if `aria-label` is missing — not a silent failure.
- `Image.alt` and `Avatar.alt` are required props specifically to force a deliberate choice; decorative images must pass `alt=""` explicitly rather than omitting the prop.
- `PatternLock`'s pointer-drag-only interaction has no native keyboard equivalent and **must** ship a keyboard-accessible alternative (a sequential dot-selection mode toggle) — stated as a requirement, not an optional enhancement, unlike `TerrainPainter`'s pointer-only paint action, which is accepted as-is because its surrounding mode/brush controls remain keyboard accessible.

## Decorative vs. meaningful content

- `Icon`: decorative icons (meaning already conveyed by adjacent text) omit `aria-label` and render `aria-hidden="true"`; meaningful icons (the icon is the sole conveyor of information) set `aria-label` and `role="img"`; an interactive icon (`onClick`) should be wrapped in/replaced by `Button variant="icon-only"` instead of relying on `Icon`'s own semantics.
- `Badge`: `aria-hidden="true"` by default since it usually duplicates information conveyed elsewhere; set `aria-label` explicitly when the badge is the only conveyor (e.g. `"3 unread notifications"`).
- `DamageNumbers`: `aria-hidden="true"` — purely visual effect; the underlying value change is already announced via `Health`'s own `aria-live` region.
- `Crosshair`: `role="none"` by default (decorative, `pointer-events-none`); only use `role="img"` with a meaningful `aria-label` if a custom `render` makes it convey information not otherwise exposed.
- `Grid`: `role="none"` by default because it is a layout-only primitive; set `role="grid"` explicitly (and manage `aria-selected`/keyboard navigation on children) only when the grid is interactively navigable.
- `Skeleton`: `aria-hidden="true"`; the parent container should carry `aria-busy="true"`.

## Role corrections (current, authoritative — not historical trivia)

These reflect the component's current documented behavior, verified as revisions from an earlier design:
- `Puzzle`: `role="region"` (previously `role="group"`).
- `CodePuzzle`: `role="textbox"` on the assembled digit-group (previously `role="group"`).
- `ObjectPuzzle`: `role="grid"` for the slots container, each slot `role="gridcell"` (previously `role="list"`).
- `Objectives`: `role="navigation"` with `aria-label="Objectives"` (previously a generic `role="list"`) — active objectives function as navigable current goals.
- `Choice`: `role="menuitem"` (previously `role="button"`) — a `Choice` is one item in `Dialogue`'s choice menu.

## `aria-live` escalation rules

- `Health`: `aria-live="polite"` normally, escalated to `aria-live="assertive"` while health is at or below the critical threshold, so urgent drops interrupt the screen reader immediately.
- `Toast`: `role="alert"` for `error`/`warning` types (interrupts), `role="status"` for `info`/`success`; `aria-live="polite"` regardless of role — anything needing assertive-level urgency should route through `Modal`/`Confirm` instead, not `Toast`.
- `AlertBanner`: same role split as `Toast`, but `aria-live="assertive"` only for `error`; `warning`/`info`/`success` stay `"polite"` — a persistent banner announcing itself repeatedly would be disruptive if always assertive.
- `ErrorBoundary`/`ErrorMsg`: `role="alert"`, `aria-live="assertive"` unconditionally — these represent actual failures.
- `OrientationLock`: `role="alert"`, `aria-live="assertive"` when the orientation mismatches — an actionable blocker; its fallback prompt's text instruction is the primary accessible content, not the rotate icon.
- `ScreenReader`: `priority: 'polite' | 'assertive'` only — a formerly-available `'live'` value has been removed.
- `LiveRegion`: distinct from `ScreenReader` — announces changes to its `children`'s actual DOM content automatically (MutationObserver-style via `useAnnounce`), rather than requiring an explicit `message` prop; `atomic` defaults `true`, `relevant` defaults `['additions', 'text']`, `visuallyHidden` defaults `false` (renders visibly and announces on change; `true` = `sr-only` while remaining in the accessibility tree).

## Never spoil information via ARIA

`MemoryMatch`: a tile's `aria-label` reflects face-down/face-up/matched state but never reveals the hidden icon's identity before it is flipped.

## Read-only vs. interactive role derivation

- `Rating`: `role="img"` with a descriptive `aria-label` (e.g. `"Rated 4 out of 5"`) when read-only; `role="radiogroup"`/`role="radio"` with `aria-checked` when interactive — derived from whether `onChange` is passed, not a separate prop.
- `Tag`: no role when static; `role="button"` with `aria-pressed` when `onClick` is provided; its remove control is a real `Button` with `aria-label="Remove ${label}"`, never a bare icon.

## Focus management

- `FocusTrap.initialFocus` (a CSS selector string or element) is not validated — a no-match selector or an out-of-trap element silently falls back to the first focusable descendant rather than throwing. Used by `Modal`, `Dialogue`, `ContextMenu`.
- `Popover`/`ItemTip`: focus moves into the panel on open and returns to the trigger on close; Escape closes.
- `SidebarMenu`: collapsed items retain their `aria-label` even though visible text is hidden — not removed from the accessibility tree. This is a distinct pattern from `DevTools`, whose `aria-hidden` is applied only when actually minimized/inactive: **visually-collapsed-but-functional keeps accessibility exposure; actually-inactive removes it.** Do not conflate the two "hidden" states.

## Hover vs. keyboard-focus disclosure timing

`ItemTip`/`Tooltip`: hover-triggered opening is delayed (`ItemTip.delay` default 300ms; `Tooltip.openDelay` default 200ms) as a hover-intent debounce, but keyboard focus must open the tooltip immediately, with no delay, per WCAG 2.1.1 — the focus path must never be gated behind the same timer used for mouse hover.

## Reduced motion

`prefers-reduced-motion: reduce` is respected by: `Overlay` (fade transition skipped/instant), `A11y`'s `reducedMotion` preference (auto-detected, overridable), and `Confetti` (`reducedMotionFallback: 'static-message' | 'none'`, default `'static-message'`). **Rule:** `Confetti` must never be the sole carrier of gameplay-critical feedback (e.g. "you won") regardless of `reducedMotionFallback` — pair it with a `Toast`/`Modal` announcement so the outcome is conveyed even when the particle effect is skipped or reduced to a static message.

## Keyboard interaction patterns

- `Button`: Enter/Space via `useButton`.
- `Checkbox`: Space toggles (and clears `indeterminate`); does not respond to Enter, matching native checkbox behavior.
- `RadioGroup`: arrow keys move selection (native radio behavior); Tab enters/exits the group as a single stop.
- `Tabs`/`Accordion`/`TreeView`: arrow-key navigation between items/headers/nodes.
- `CombinationLock`: each wheel is `role="slider"` with `aria-valuenow`/`min`/`max`; Up/Down or Left/Right adjusts it, matching `Slider`'s keyboard pattern.

## Dev-tooling accessibility bar

`PerformanceMonitor` states explicitly that DevMode-only components (`DevTools`, `Inspector`, `Property`, `Console`, `PerformanceMonitor`, `AssetViewer`) have a lower accessibility bar than user-facing components, but values must still be exposed as text (not canvas-only rendering) for assistive-tech use during development — this is a stated, bounded exception, not a license to skip accessibility for the Debug/DevTools category entirely.

## Grid/tree ARIA position attributes

`TreeView`: `aria-level` is 1-indexed depth (a root node is `aria-level="1"`). `ItemSlot`: `aria-rowindex`/`aria-colindex` driven by `rowIndex`/`colIndex` (0-based props, 1-indexed ARIA attributes per convention). `SliderPuzzle`: `aria-rowcount`/`aria-colcount` set to `size`.
