# Data Models

Every inline type shape declared in `COMPONENTS.md`, verbatim. None of these are backed by a schema file, database, or ORM — they are TypeScript-style prop/return shapes documented inline per component or hook. Fields marked `?` are optional.

## Generic item/node types

- **`Item<T = unknown>`** (used by `Inventory`, `ItemSlot`, `ItemTip`, `ItemComparison`, `EquipmentSlots`, `CraftingPanel`, `LootContainer`, `useInventorySync`, `useSlotSync`, `useItemData`, `useEquipmentSync`, `useLootSync`): `{ id: string, name: string, icon?: string, description?: string, stackable?: boolean, maxStack?: number, quantity?: number, equipped?: boolean, data?: T }`.
- **`TreeNode<T = unknown>`** (used by `TreeView`): `{ id: string, label: string, children?: TreeNode<T>[], icon?: ReactNode, disabled?: boolean, isLoading?: boolean, data?: T }`.
- **`Prefab<T = any>`** (used by `Editor.palette`, `Palette.prefabs`, `usePrefabLibrary`): `{ id: string, name: string, thumbnail?: string, data: T, category?: string }`.

## Dialogue

- **`Speaker`** (`Dialogue.speaker`): `{ name: string, avatar?: string, color?: string }`. A plain `string` passed as `speaker` is treated as `{ name: speaker }`.
- **`DialogueLine`** (`useDialogueSync`'s `lines: DialogueLine[]`): shape not declared anywhere in `COMPONENTS.md`. Treat as opaque; do not invent fields.
- History `entries`: `{ text: string, timestamp: Date | string, speaker?: string }[]` — `timestamp` is normalized to `Date` internally and formatted per locale by default; pass a pre-formatted string in `text` for a custom format.

## Objectives

- **`Objective`** (`Objectives.objectives`, `Objective.objective`, `useObjectiveSync`): `{ id: string, name: string, description?: string, progress?: number, maxProgress?: number, subtasks?: { id: string, name: string, completed: boolean, progress?: number }[] }`. `progress` is a raw count against `maxProgress` (e.g. `progress: 3, maxProgress: 10`) — **not** pre-normalized to 0–1; when `maxProgress` is omitted, `progress` itself is treated as a 0–1 fraction.

## Navigation

- **`NavItem`** (`NavMenu.items`, `SidebarMenu.items`): `{ id: string, label: string, path?: string, icon?: ReactNode, children?: NavItem[], disabled?: boolean }`. `path` is an opaque string passed to `onNavigate`/`onBack`, never validated as a route by the component.

## Menus

- **`ContextMenuItem`** (shared by `ContextMenu.items` and `DropdownMenu.items`): `{ id: string, label: string, icon?: ReactNode, children?: ContextMenuItem[], disabled?: boolean, separator?: boolean, shortcut?: string }`. `shortcut` is display-only text — it does not register a global key handler.

## Settings

- **`SettingsCategory`** (`Settings.categories`): `{ id: string, label: string, settings: SettingDef[] }`.
- **`SettingDef`**: `{ key: string, label: string, description?: string, type: 'toggle' | 'slider' | 'select' | 'keybind', default: any, min?: number, max?: number, step?: number, options?: Array<{ label: string, value: any }>, keybinding?: { defaultKey: string } }`. `type: 'keybind'` renders via the dedicated `Keybinds` component internally (a single-binding instance), seeded by `keybinding.defaultKey`.
- **`KeyBinding`** (`Keybinds.bindings`, `useKeybindSync`): `{ action: string, key: string, label?: string, modifiers?: Array<'ctrl' | 'shift' | 'alt' | 'meta'> }`.

## Editor / Debug

- **`PropertyDef`** (`Property.properties`): `{ key: string, label: string, type: 'string' | 'number' | 'boolean' | 'color' | 'vector', options?: any[], min?: number, max?: number, step?: number }`. When `type: 'vector'`, the runtime value is `{ x: number, y: number, z?: number, w?: number }` — the number of numeric inputs rendered (2/3/4) is inferred from which components are present on the value itself.

## Puzzle

- **`ObjectType`** (`ObjectPuzzle.objects`): `{ id: string, name: string, description?: string, icon?: string, position?: { x: number, y: number, z: number } }` — `position` is the object's world-space starting position.
- **`SlotType`** (`ObjectPuzzle.slots`): `{ id: string, position: { x: number, y: number, z: number }, label?: string, occupied?: boolean }` — `occupied` is derivable from `placedObjects` state but is exposable directly.
- Crossword `clues` entry (`WordPuzzle`): `{ word: string, clue: string, position: { row: number, col: number }, direction: 'across' | 'down' }`.

## Combat / status

- **`Recipe`** (`CraftingPanel.recipes`, `useCraftingSync`): `{ id: string, name: string, icon?: string, ingredients: { itemId: string, quantity: number }[], output: { itemId: string, quantity: number }, craftTime?: number }`.
- **`StatusEffect`** (`StatusEffects.effects`, `useStatusEffectSync`): `{ id: string, name: string, icon: string, type: 'buff' | 'debuff' | 'neutral', duration?: number, remaining?: number, stacks?: number }`.
- `DamageNumbers.events`: `{ id: string, amount: number, type: 'damage' | 'heal' | 'critical' | 'miss', position?: { x: number, y: number, z: number } }[]`.

## Touch / input

- **`TouchControl`** (`Touch.controls`): `{ id: string, type: 'joystick' | 'button', position?: { x: number, y: number } | 'relative' | 'absolute', label?: string, size?: number }`. `id` doubles as the React list key and must be unique within the array.

## Notification

- **`Toast`/`ToastInput`** (`useToast`'s `toasts: Toast[]` / `addToast(toast: ToastInput)`): field-level shape not spelled out beyond the `Toast` component's own props (`message`, `type`, `duration`, etc.); `COMPONENTS.md` does not explicitly declare `ToastInput` as a subset of `Toast`'s props — treat that equivalence as inferred, not verified, if it matters to an implementation.

## World-space position convention

Every `position: { x, y, z }` field across the library (`Compass.markers`, `Minimap.markers`, `ObjectType.position`, `SlotType.position`, `DamageNumbers.events[].position`) is a PlayCanvas world-space coordinate matching `pc.Vec3`'s shape, in scene units — never a screen-space pixel position. Screen-space positions are always separately typed as `{ x, y }` (e.g. `TouchControl.position`, `useCameraProjection`'s return, `useMinimapSync.projectMarker`'s return).
