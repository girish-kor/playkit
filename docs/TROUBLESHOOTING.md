# Troubleshooting

Known gotchas, verified directly from prose warnings and caveats in `COMPONENTS.md`. No issue tracker or incident history exists for this repository yet — this is a preemptive list of documented pitfalls, not a record of reported bugs.

## "My `pcEntity` binding does nothing"

Expected behavior, not a bug: `pcEntity`/`pcCamera`/`pcAction`/`pcProperty` are not validated at render time. If the ID doesn't currently resolve to a live PlayCanvas entity, the binding is a silent no-op until an entity with that ID appears in the scene. Check the entity actually exists in the scene graph and that the ID string matches exactly (see `docs/VALIDATION.md`).

## "Drag-and-drop starts on a plain click"

`@dnd-kit/core` consumers (`Inventory`, `ItemSlot`, `EquipmentSlots`, `LootContainer`, `ObjectPuzzle`, `Palette`) require an activation constraint configured on the sensor (`useSensor(PointerSensor, { activationConstraint: { distance: 8 } })`) at the `DndContext` level. Without it, small accidental pointer movement during a click is misread as a drag start.

## "Health/Energy bar animation looks slow or stutters under load"

`animated`-driven tweening (`useAnimation`) is `requestAnimationFrame`-based, not time-guaranteed — under sustained frame drops, the visual duration can stretch beyond `animationDuration`. If exact timing matters (e.g. synced to a hit-flash), set `animated={false}` and drive the value directly instead of debugging the tween.

## "Input feels laggy / PlayCanvas writes are dropped under rapid typing"

This is the intended trade-off, not a defect: `useSync`'s default 100ms debounce coalesces rapid writes to avoid flooding the PlayCanvas scene graph. Do not pass `debounce: 0` to "fix" perceived lag — that reintroduces the flooding problem the debounce exists to prevent.

## "Icon renders blank / nothing shows"

`Icon.name` is a plain `string`, not a compile-time-checked union — a typo or unregistered name only fails at runtime (renders nothing, or a placeholder). Verify the name against the registered icon set (Lucide's kebab-case naming, or your custom registry).

## "Tooltip/ItemTip won't open on keyboard focus" (or opens with an unwanted delay)

Hover-triggered overlays gate opening behind a hover-intent delay (`ItemTip.delay` 300ms default, `Tooltip.openDelay` 200ms default) — but per WCAG 2.1.1, keyboard focus must open the overlay immediately, with no delay. If a custom implementation gates the focus path behind the same timer as hover, that is a defect against the documented contract, not expected behavior.

## "Sliding tile / combination puzzle enters an unsolvable state"

`SliderPuzzle.tiles` must be a permutation of `0..size²-1`; this is **not** checked at runtime, and `parityCheck` only verifies solvability of an already-valid permutation — it does not detect an invalid array. If a puzzle is unsolvable, check the caller-supplied `tiles` array for validity before suspecting the component.

## "DevTools/PerformanceMonitor throws `process is not defined`"

`DevTools.enabled` defaults to `process.env.NODE_ENV !== 'production'`. In a browser-only bundler runtime where `process.env` is stripped from the client bundle, referencing it can throw a `ReferenceError`. Pass `enabled` explicitly in that environment rather than relying on the default.

## "DevTools still costs frame time when minimized"

Console-patching and scene-polling interception detach only when DevTools is fully **closed** — minimizing keeps it mounted and listening. For production-representative performance profiling, close it fully rather than minimizing it.

## "Confirm's confirm button gets stuck loading" / "modal won't close after an async action fails"

If `Confirm.onConfirm`'s returned promise rejects, `Confirm` is documented to catch it, call `onConfirmError`, keep the modal open, and clear `loading` automatically — it should never rethrow or leave the button stuck. If an implementation exhibits a stuck loading state, that is a defect against this documented contract.

## "Skip link does nothing when activated"

`SkipLink.targetId` is not validated against the live DOM. If no element with that ID exists, the native anchor jump (`href="#${targetId}"`) is simply a no-op — verify the target element's `id` matches exactly.

## "Grid/TreeView is slow with many items"

Virtualization is threshold-gated, not universal: `TreeView` auto-enables above 1000 nodes; `Inventory` auto-enables above `virtualizationThreshold` (default 100 slots); `Grid` has **no** automatic virtualization — pair it with windowing manually once cell count exceeds roughly 200 (see `docs/PERFORMANCE.md`).

## "Zustand state bleeds between users/requests in SSR"

`Puzzle`, `Settings`, and `PCProvider` all use `zustand`; a store created at module scope is unsafe for server-side rendering because it is shared across requests. Use a per-request/per-provider store factory when server-rendering any of these three.

## "MemoryMatch spoils the puzzle for screen-reader users"

By design, a tile's `aria-label` must never reveal the hidden icon's identity before it is flipped. If an implementation's `aria-label` includes the icon name for a face-down tile, that is a defect against the documented accessibility contract, not a missing feature.
