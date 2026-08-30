# State Management

Source: `State:`, `Events:`, and PlayCanvas Integration fields verified in `COMPONENTS.md`. State is local component state plus the PlayCanvas scene graph as an external source of truth, connected by dedicated sync hooks. `zustand` is the one external state-management dependency documented, and it is scoped to exactly three components: `Puzzle`, `Settings`, `PCProvider` — no other component in the library lists `zustand` as a dependency. No Redux/MobX/Jotai reference exists anywhere in `COMPONENTS.md`.

## Zustand scope and SSR caveat

`Puzzle` uses `zustand` for its cross-instance/global puzzle state; `Settings` uses it for the settings-category state tree; `PCProvider` uses it as the single source of truth for the PlayCanvas app/scene instance. Documented caveat (`Puzzle`): "Zustand stores created at module scope are unsafe for SSR (state leaks between requests) — create per-request/per-provider via a store factory if server-rendered." This rule applies to all three zustand consumers, not only `Puzzle`.

## Local component state

Each stateful component declares an explicit `State:` field enumerating exactly what it tracks internally, e.g.: `Button` — `isPressed`, `isHovered`, `isFocused`; `Input` — `value`, `isFocused`; `Checkbox` — `checked`, `isIndeterminate`, `isFocused`; `Tabs` — `activeTab`; `TreeView` — `expanded`, `selected`; `Inventory` — `selectedSlot`, `items`, `isOpen`. State is scoped to the owning component; no cross-component shared client-state store is documented.

## Controlled/uncontrolled duality

Every component with meaningful state exposes a controlled prop (e.g. `checked`, `activeTab`, `expanded`, `isOpen`, `value`) and a matching `default*` prop for uncontrolled use; the controlled prop, when supplied, makes the corresponding `default*` prop ignored (verified explicitly for `Checkbox.defaultChecked`, `Tabs.defaultTab`, `Accordion.defaultExpanded`, `Popover.defaultOpen`, `TreeView.defaultExpanded`).

## Change-notification pattern

State changes surface through explicit callback props rather than a subscription/store API: `onChange`, `on<Domain>Change` (`onValueChange`, `onCheckedChange`, `onTabChange`), and domain-specific transition callbacks (`onHeal`/`onDamage` on `Health`, `onRegenStart`/`onRegenStop` on `Energy`, `onEmpty`/`onMax`/`onLow`/`onCritical` threshold callbacks). Some components fire two differently-named callbacks with identical signatures for naming-convention parity with other libraries (e.g. `Checkbox.onCheckedChange` alongside `onChange`; `Tabs.onTabChange` alongside `onChange`) — both fire together, they are not alternatives.

## PlayCanvas as external state source

Two sync directions are documented, both mediated exclusively by `use<Domain>Sync` hooks (never by direct PlayCanvas API calls inside a component):
- **React → PlayCanvas** (write-through): `Input`/`Checkbox`/`RadioGroup` via `useSync`, debounced 100ms by default; the debounce is explicitly required to remain enabled ("don't pass `debounce: 0`") to avoid flooding the PlayCanvas scene graph on every keystroke.
- **Bidirectional**: `Health` via `useHealthSync` (health can change from PlayCanvas-side gameplay logic and from React-side UI, both reflected).

`pcEntity`/`pcCamera`/`pcAction`/`pcProperty` identify the PlayCanvas-side binding target by string ID; resolution is deferred and silently no-ops if the ID doesn't currently resolve to a live entity (verified on `Box`, `Slot`; the same resolution model is used by every other `pcEntity` consumer).

## Derived/threshold state

Several components compute derived boolean/event state from a single numeric value rather than requiring the caller to track it separately: `Health.lowThreshold` (default `0.25 * maxValue`) drives `onLow`; a separate, undocumented-exact-value critical threshold drives `onCritical`; `AmmoIndicator.lowAmmoThreshold` (default `0.25` of `magazineSize`) drives `onLowAmmo`. These are computed internally from props already passed in, not fetched from an external store.

## Large-collection state

`Inventory`, `TreeView`, and `Grid` hold their item/node list as a flat prop-driven array (`items`, `data`) with `virtualization` as an internal rendering optimization (see `docs/PERFORMANCE.md`) — virtualization does not change the state shape, only which rows are mounted.

## Optimistic/async state

`CraftingPanel.onCraft` may return `void | Promise<void>`, with `craftProgress` (0–1) as separate state for a timed craft and `onCraftComplete`/`onCraftFail` as the resolution callbacks — the component does not manage the async operation itself, it exposes progress/resolution as props the caller drives.
