# Performance

Every throttle/debounce/virtualization/memoization number verified in `COMPONENTS.md`. These defaults are contractual (see `docs/CODING-STANDARDS.md` § "Performance discipline") — do not weaken them without a spec update.

## Debounce defaults (PlayCanvas write-through)

| Hook/Component | Default | Rule |
|---|---|---|
| `useSync` | 100ms | Must stay enabled for high-frequency writes (e.g. every keystroke on `Input`); do not pass `debounce: 0`. |
| `useScript` | 100ms | Raise to 250–500ms for frequent-but-non-realtime state; lower toward `0` only when every intermediate value must reach PlayCanvas. |
| `useEvent` | 0ms (no debounce) | Raise only for rapid-burst events (per-frame/per-collision); keep at `0` for discrete, infrequent events (e.g. "puzzle solved"). |
| `ScrollArea.scrollEndDebounce` | 150ms | Delay before `onScrollEnd` fires after the last scroll event. |
| `ScreenReader`/`LiveRegion` | 100ms | Announcement debounce via `useAnnounce`. |

## Throttle defaults

| Component/Hook | Default | Notes |
|---|---|---|
| `Crosshair.throttleRate` | 33ms (~30Hz) | Raycast throttle; lower (e.g. 16ms/~60Hz) for more responsive detection at higher CPU cost, raise (50–100ms) on lower-end devices or scenes with expensive raycast targets. |
| `Minimap` render-to-texture | 10–15Hz (recommended, not a hard default) | Rendering a live top-down camera every frame is comparatively expensive, especially wasteful for the small `'corner'` variant. |
| `Compass` (`usePlayerRotation`) | No stated default; throttle recommended | Recomputes on every player transform change (as often as every frame during continuous rotation); throttle the hook's update rate or sample via `requestAnimationFrame`/interval if profiling shows frame-time impact, mirroring `Crosshair`'s pattern. |

## Virtualization thresholds

| Component | Threshold | Behavior |
|---|---|---|
| `TreeView` | >1000 nodes | `virtualization` defaults `true` above this count, `false` at or below it. |
| `Inventory` | `virtualizationThreshold` (default 100 slots) | `virtualization` defaults `true` once `slots` exceeds this; configurable per device performance budget. |
| `Grid` | ~200 cells (recommended, not automatic) | No built-in auto-virtualization; pair with windowing once cell count exceeds roughly 200, and memoize cell content to avoid re-renders from unrelated sibling changes. |
| `ObjectPuzzle` (`@dnd-kit/core`) | "dozens+" objects | Not virtualized by default; paginate or window-render rather than mounting every draggable. |
| `ContextMenu` | `maxItems` (default 50) | `virtualize` defaults `false`; recommended (opt-in, not automatic) once item count exceeds `maxItems`. |

## Per-frame callback discipline

`HUD.onRender`/`HUD.onUpdate` fire every frame (up to display refresh rate); handlers must avoid allocations, state updates, or synchronous layout reads, or must explicitly throttle/sample (e.g. run heavier logic every Nth frame) to avoid frame drops.

## Animation timing under load

`Health`/`Energy`'s `animated` prop drives `useAnimation`'s `requestAnimationFrame`-based tweening; under sustained frame drops, tween duration can visually stretch beyond `animationDuration` since it is frame-driven, not time-guaranteed. For cases where exact timing matters (e.g. synced to a hit-flash), use `animated={false}` and drive the value directly.

## Drag-and-drop activation

`@dnd-kit/core` consumers (`Inventory`, `ItemSlot`, `EquipmentSlots`, `LootContainer`, `ObjectPuzzle`, `Palette`) must configure sensors with an activation constraint (e.g. `useSensor(PointerSensor, { activationConstraint: { distance: 8 } })`) at the `DndContext` level — without one, ordinary clicks on slots/items can be misinterpreted as drag starts.

## Unthrottled-by-design events

`ScrollArea.onScroll` fires on every native scroll event (potentially dozens of times per second during a drag/fling) and is not throttled internally; consumers doing non-trivial work per call should throttle/debounce it themselves (e.g. `requestAnimationFrame` coalescing). `onReachEnd`/`onReachStart` are cheap to leave unthrottled since they only fire at the scroll edges.

## Text/value sync cost

`Text`'s `useTextSync` writes to the PlayCanvas `TextComponent` on every `children` change; for frequently-updating text (a live counter, streamed dialogue), debounce or batch upstream rather than passing a new value every render, since each sync touches the PlayCanvas scene graph.

## Dialogue typewriter

`Dialogue`'s typewriter tick defaults to 30 characters/second; very high speeds collapse to effectively instant. Prefer `autoAdvance`/skip controls over pushing speed higher, and reuse a single `Dialogue` instance across lines (update `text`) rather than remounting per line.

## Puzzle collections

`SequencePuzzle`: for sequences above roughly 100 steps, key steps stably by index and memoize per-step visuals, or cap/paginate — the default layout renders all steps simultaneously via flex-wrap.

## DevMode-only tooling cost

- `DevTools`: console-patching/scene-polling interception is active only while the panel is fully **open** — closing (not merely minimizing) detaches all listeners for zero ongoing per-frame cost in normal play; minimizing keeps it mounted and listening.
- `PerformanceMonitor.updateInterval` defaults 500ms — sampling faster than the display needs wastes cycles measuring the measurer; keep it at 500ms or higher outside active performance investigation, and always exclude `PerformanceMonitor` (and `DevTools`) from production builds.
- `Inspector`: `TreeView`'s own >1000-node virtualization threshold applies; `Inspector` adds no additional virtualization below that, so low-hundreds-entity scenes (still under the threshold) will see increased render cost — prefer collapsing deep hierarchies and using `filter`/`showHidden={false}`.

## State-layer SSR cost

`zustand` stores (`Puzzle`, `Settings`, `PCProvider`) created at module scope are unsafe for server-side rendering — state leaks between requests; use a per-request/per-provider store factory if server-rendered.

## Load-time UX floor

`LoadScreen.minLoadTime` defaults 1000ms, guarding against a jarring flash for near-instant loads; keep it in roughly the 500–1500ms range — much higher artificially delays play, much lower reintroduces the flash it exists to prevent.

## Input deadzone tuning

`useInput.deadzone` defaults 0.1; typical range 0.1–0.2, raise to 0.25+ for drift-prone controllers, lower to 0.05 only for high-precision aiming needs. `Joystick.deadzone` follows the same convention (default 0.1).
