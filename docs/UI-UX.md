# UI/UX Patterns

Source: interaction behavior verified in `COMPONENTS.md`.

## Input method coverage

Every interactive component documents keyboard, pointer, and (where relevant) touch behavior together rather than treating them as separate concerns:
- Keyboard: `Button` (Enter/Space via `useButton`), `Checkbox` (Space toggles, no Enter response — matches native checkbox), `RadioGroup` (arrow keys move selection, Tab enters/exits as one stop), `Tabs`/`Accordion`/`TreeView` (arrow-key navigation), `Popover`/`ItemTip` (Escape closes, focus moves in on open and returns to trigger on close).
- Pointer: click/hover/drag events inherited from `Box` on every primitive (`onClick`, `onMouseEnter/Leave`, `onDragStart/End/Over/Leave/Enter`, `onDrop`, `onWheel`, `onPointerDown/Up/Move`).
- Touch: `Joystick` (multi-touch, `touchAction` default `'none'`), `Input`'s `capture` prop for mobile camera hints on `type="file"`.

## Preferred event handler naming

`Button` and touch/interaction-heavy components expose `onPress` as the preferred activation handler over the inherited `onClick`; using `onClick` on `Button` triggers a development-only `console.warn` deprecation notice once per component instance (stripped from production builds) — `onClick` remains inherited from `Box` but is discouraged specifically on `Button`.

## Controlled vs. uncontrolled

Stateful components consistently offer both modes via a `value`/`defaultValue` (or `checked`/`defaultChecked`, `activeTab`/`defaultTab`, `expanded`/`defaultExpanded`, `isOpen`/`defaultOpen`) pair: the controlled prop wins and the default prop is ignored when both are supplied. Verified on `Checkbox`, `Tabs`, `Accordion`, `Popover`, `TreeView` (`expanded`/`defaultExpanded`).

## Hover-intent vs. focus-immediate disclosure

`ItemTip` (and by the same documented rule, other hover-triggered overlays) delays opening on mouse hover by a `delay` (default 300ms) but must open immediately on keyboard focus with no delay, per WCAG 2.1.1 keyboard-operability — the focus path is explicitly not gated behind the same timer as the hover path.

## Placement and collision

Floating UI (`Popover`, `ItemTip`, `ItemComparison`) exposes `side`/`position` plus `align`, with an `'auto'` mode (`ItemTip`, `ItemComparison`) that "picks the side with the most available viewport space, flipping away from the trigger's edge to avoid clipping."

## Trigger models for floating panels

Three distinct, non-interchangeable trigger models are documented: hover-only (`Tooltip`, `HoverCard`, `ItemTip`), click-toggle (`Popover`), and right-click (`ContextMenu`) — `Popover`'s own documentation states it is "distinct from `ContextMenu` (right-click) and `Tooltip`/`HoverCard` (hover)."

## Feedback timing defaults

Verified default durations/delays: `Overlay` fade 200ms; `Health`/`Energy` animation 300ms; `ItemTip` hover delay 300ms; `ScrollArea.scrollEndDebounce` 150ms; `InteractionPrompt.fadeDuration` 150ms; `AmmoIndicator`/combat text `DamageNumbers.duration` 800ms.

## Progressive disclosure

`Accordion` generalizes a pattern first used ad hoc by `Objectives` for per-section collapse (verified: "generalizing the collapsible behavior already used ad hoc by `Objectives`"), with `type="single"` (one section open) or `type="multiple"`.

## Responsive layout rule

Typed layout props (`Flex.direction`/`align`/`justify`/`gap`) generate only base (non-responsive) Tailwind classes; breakpoint-specific behavior is applied by passing breakpoint-prefixed Tailwind utilities directly through `className` (e.g. `md:flex-row`), not through a separate responsive-prop API.

## Safe-area and viewport awareness

`HUD.safeArea` (default `true`) applies safe-area insets; `Responsive`, `Touch`, `OrientationLock` (Responsive module) and `useViewport`/`useViewportSync`/`useIsTouchDevice` hooks are the dedicated surface for viewport/orientation/touch-capability–driven UI changes, rather than components independently querying `window`.
