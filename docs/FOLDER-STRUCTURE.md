# Folder Structure

Source of truth: `COMPONENTS.md` category taxonomy (Index, and `## Category:` headings). The `src/` tree below now exists as of the base scaffold, one directory per category and one file per component/hook, matching the taxonomy exactly — but every component/hook file is currently a stub that throws "not implemented yet" (see `docs/REBUILD-GUIDE.md` for the real implementation order, and each stub file's own comment for the exact spec section to implement it from).

## Required top-level layout

- `docs/` — this documentation set.
- `src/`
  - `components/`
    - `primitives/` — Box, Flex, Grid, Text, Button, Icon, Slot, Input, Label, Checkbox, ScrollArea, Card, Image, Tabs, TreeView, Overlay, Joystick, RadioGroup, Badge, Avatar, Popover, Divider, Accordion
    - `hud/` — HUD, Health, Energy, Crosshair, Compass, Minimap, AmmoIndicator, InteractionPrompt, DamageNumbers, StatusEffects
    - `inventory/` — Inventory, ItemSlot, ItemTip, EquipmentSlots, ItemComparison, CraftingPanel, LootContainer
    - `puzzle/` — Puzzle, CodePuzzle, SequencePuzzle, SliderPuzzle, ObjectPuzzle, MathPuzzle, WordPuzzle, MemoryMatch, CombinationLock, PatternLock
    - `dialogue/` — Dialogue, Choice, History, Subtitle
    - `objectives/` — Objectives, Objective
    - `timer/` — Timer, Stopwatch
    - `navigation/` — NavMenu, Back, Breadcrumb, SidebarMenu
    - `feedback/` — Toast, Spinner, Progress, AlertBanner, Confetti, LoadingDots
    - `modal/` — Modal, Confirm
    - `overlay/` — Tooltip, ContextMenu, HoverCard, DropdownMenu
    - `settings/` — Settings, Toggle, Slider, Select, Keybinds, ColorPicker, AccessibilitySlider
    - `devtools/` — DevTools, Inspector, Property, Console, PerformanceMonitor, AssetViewer
    - `editor/` — Editor, Palette, TerrainPainter, LightingControls
    - `loading/` — LoadScreen, Skeleton
    - `error/` — ErrorBoundary, ErrorMsg
    - `responsive/` — Responsive, Touch, OrientationLock
    - `accessibility/` — A11y, FocusTrap, SkipLink, ScreenReader, LiveRegion
    - `general/` — Stepper, Rating, Tag
    - `playcanvas-bridge/` — PCProvider
  - `hooks/` — one file per hook listed in `COMPONENTS.md` under Hooks Documentation (`useEntity`, `useScript`, `useEvent`, `useSync`, `useTransition`, `useInput`, `useNetwork`, `useTimer`, `useTimerSync`, `useStopwatch`, `useStopwatchSync`, `useToast`, `useAnnounce`, `useScrollToBottom`, `useAnimation`, `useLoadingProgress`, `usePuzzleBridge`, `usePuzzleSubmit`, `useSettingSync`, `useSettingsSync`, `useKeybindSync`, `useObjectiveSync`, `useObjectiveProgress`, `useDialogueSync`, `useDialogueChoice`, `useDialogueHistory`, `useInventorySync`, `useSlotSync`, `useHealthSync`, `useEnergySync`, `useLoadingSync`, `useProgressSync`, `useTouchBridge`, `useRaycaster`, `usePlayerRotation`, `useCameraProjection`, `useTextSync`, `useIconSync`, `useTextureSync`, `useAction`, `useItemData`, `useHoverData`, `useDevAPI`, `useSceneInspector`, `usePropertyEditor`, `useEditorBridge`, `usePrefabLibrary`, `useConsoleBridge`, `useErrorReporter`, `useConfirm`, `useModalSync`, `useNotificationListener`, `useA11ySync`, `useViewportSync`, `useIsTouchDevice`, `useKeyboardListener`, `useTypewriter`, `useSequenceSubmit`, `useSliderSync`, `useObjectPuzzleSync`, `useTooltipSync`, `useContextMenu`, `useSkeleton`, `useViewport`, `useBadgeSync`, `useAvatarSync`, `useAccordionSync`, `useMinimapSync`, `useAmmoSync`, `useInteractionPromptSync`, `useStatusEffectSync`, `useEquipmentSync`, `useCraftingSync`, `useLootSync`, `useStepperSync`); react-aria's `useMenu`/`useButton` are re-exported, not implemented here.
  - `index.ts` (package entry point, `"."` export) — re-exports every component and hook EXCEPT the `devtools` category (see `docs/BUILD.md` requirement #3).
  - `devtools.ts` (`"./devtools"` export) — re-exports only the `devtools` category; the sole supported way to reach `DevTools`/`Inspector`/`Property`/`Console`/`PerformanceMonitor`/`AssetViewer`.
  - `types.ts` — the shared inline type shapes from `docs/DATA-MODELS.md` (`Item<T>`, `TreeNode<T>`, etc.), not tied to any one category.

## Rules

1. One component per file; filename matches the component name exactly as it appears in `COMPONENTS.md` (`## Component: X`).
2. A component's file lives in the directory matching its `## Category:` heading; a component is never split across categories.
3. A category directory contains only the components listed for it in the Index (lines 13–33 of `COMPONENTS.md`) and, where stated in a component's "Composition" field, the primitives it composes are imported from `primitives/`, never duplicated locally.
4. Hooks live in `src/hooks/`, flat (no per-category hook subfolders), because hooks are shared across categories (e.g. `useSync` is used by `Input`, `Checkbox`, `RadioGroup`).
5. No file in `src/components/` may re-implement a PlayCanvas binding hook inline; binding logic is confined to `src/hooks/`, per each component's "PlayCanvas Integration" field.
