# Glossary

Terms as defined or used in `COMPONENTS.md`.

**DevMode** — The PlayCanvas application context corresponding to the editor/development environment. Every component declares `DevMode/PlayMode: Both`, meaning it renders identically in both contexts; mode-specific behavior comes from which entities/data a hook resolves against, not from the component itself.

**PlayMode** — The PlayCanvas application context corresponding to the running/played game.

**`pcEntity`** — A string prop identifying a PlayCanvas entity by ID for a component to bind to. Not validated at render time; resolution is deferred, and an ID that never resolves to a live entity is a silent no-op.

**`pcCamera`** — A string prop identifying a PlayCanvas camera entity, used for screen/world projection (`HUD`, `Minimap`) or raycasting context.

**`pcAction`** — A string prop naming a PlayCanvas script method to invoke (`Button`).

**`pcProperty`** — A string prop naming a PlayCanvas script property to read/write (`Input`, `Checkbox`).

**Sync hook** — A hook named `use<Domain>Sync` (e.g. `useHealthSync`, `useInventorySync`) that mediates state transfer between a component and the PlayCanvas scene graph, in one direction (write-through) or bidirectionally.

**`asChild`** — A boolean prop pattern that, when `true`, causes a component to render `Slot` instead of its own default element, merging its props onto the single child element supplied instead of wrapping it.

**`Slot`** — The composition primitive (wrapping `@radix-ui/react-slot`) that implements `asChild`; renders no DOM element of its own.

**Controlled prop** — A prop (e.g. `checked`, `activeTab`, `value`) that, when supplied, makes the component fully caller-driven for that piece of state; its `default*` counterpart is then ignored.

**Uncontrolled mode** — Operating a component via its `default*` prop (e.g. `defaultChecked`, `defaultTab`) instead of its controlled counterpart, letting the component manage that state internally.

**Virtualization** — Rendering only the currently visible subset of a large list/grid/tree (`TreeView`, `Inventory`, `Grid`) rather than mounting every item, enabled automatically past a documented threshold.

**Throttle rate** — A minimum interval (ms) between repeated expensive operations (e.g. `Crosshair.throttleRate`, default 33ms/~30Hz for raycasting).

**Debounce** — Delaying an effect until input activity pauses for a given duration (e.g. `useSync`'s default 100ms write debounce to PlayCanvas).

**Deadzone** — The normalized input-magnitude threshold below which joystick/analog input is clamped to zero (`Joystick.deadzone`, default `0.1`).

**Variant** — A component's closed set of named visual styles, exposed via a `variant` prop (e.g. `Button.variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon-only'`).

**Composition (field)** — The `COMPONENTS.md` field naming exactly which other components/hooks/libraries a given component is built from; authoritative for module dependency direction (`docs/MODULES.md`).

**Rebuild Notes (field)** — The `COMPONENTS.md` field per component giving implementation guidance for rebuilding it from scratch; aggregated in `docs/REBUILD-GUIDE.md`.

**Item&lt;T&gt;** — The generic item data shape used by `Inventory`, `ItemSlot`, `ItemTip`, `ItemComparison`, `EquipmentSlots`, `CraftingPanel`; generic over an optional `data: T` payload for custom fields with type safety.

**TreeNode&lt;T&gt;** — The generic node shape used by `TreeView`; generic over an optional `data: T` payload.

**Paperdoll layout** — `EquipmentSlots.layout="paperdoll"`: a body-silhouette arrangement using each slot's `position`, as opposed to `'list'`/`'grid'` flow layouts.

**Hover-intent delay** — The deliberate pause (`ItemTip.delay`, default 300ms) before a hover-triggered tooltip opens, bypassed entirely for keyboard-focus triggering per WCAG 2.1.1.

**Radial variant** — A layout for showing hold-to-interact progress as a ring around a key glyph rather than a separate bar (`InteractionPrompt.variant="radial"`).

**Combine stacking** — `DamageNumbers.stacking="combine"`: merging rapid same-type floating-number events on the same target into a single running total instead of spawning overlapping numbers.
