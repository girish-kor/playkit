# Modules

Module boundaries as verified from `COMPONENTS.md`'s category taxonomy and each component's "Composition"/"Dependencies" fields. Each category (`## Category: X` in `COMPONENTS.md`) is one module boundary.

## Module list and responsibility

- **Primitives** — Box, Flex, Grid, Text, Button, Icon, Slot, Input, Label, Checkbox, ScrollArea, Card, Image, Tabs, TreeView, Overlay, Joystick, RadioGroup, Badge, Avatar, Popover, Divider, Accordion. Every other module composes from this module (verified: every non-Primitives component's "Composition" field names `Box`, `Flex`, `Grid`, `Text`, `Button`, `Icon`, or another Primitive). Primitives has no dependency on any other module.
- **HUD** — HUD, Health, Energy, Crosshair, Compass, Minimap, AmmoIndicator, InteractionPrompt, DamageNumbers, StatusEffects. Depends on Primitives only. `DamageNumbers` and `InteractionPrompt` are documented as typically driven by `Health`/`Crosshair` callbacks (`onDamage`, `onHeal`, `onTargetChange`) but this is a data-flow relationship, not an import dependency — no HUD component's "Composition" field names another HUD component as a compositional dependency except where explicitly stated.
- **Inventory** — Inventory, ItemSlot, ItemTip, EquipmentSlots, ItemComparison, CraftingPanel, LootContainer. Internal composition: `Inventory` composes `Grid` and `ItemSlot`; `EquipmentSlots` composes `ItemSlot`; `ItemComparison` reuses `ItemTip`'s stat-row rendering; `CraftingPanel` composes `ItemSlot`. Depends on Primitives.
- **Puzzle** — Puzzle, CodePuzzle, SequencePuzzle, SliderPuzzle, ObjectPuzzle, MathPuzzle, WordPuzzle, MemoryMatch, CombinationLock, PatternLock. Depends on Primitives.
- **Dialogue** — Dialogue, Choice, History, Subtitle. Depends on Primitives.
- **Objectives** — Objectives, Objective. Depends on Primitives.
- **Timer** — Timer, Stopwatch. Depends on Primitives.
- **Navigation** — NavMenu, Back, Breadcrumb, SidebarMenu. Depends on Primitives.
- **Feedback** — Toast, Spinner, Progress, AlertBanner, Confetti, LoadingDots. Depends on Primitives. `Health`/`Energy` (HUD module) depend on `Progress` (Feedback module) — verified: `Health`'s and `Energy`'s "Composition" fields name `Progress`. This is the one verified cross-module dependency edge running from HUD → Feedback.
- **Modal** — Modal, Confirm. Depends on Primitives and on Overlay's `Overlay` component (`Modal` is documented as using `Overlay` for its backdrop).
- **Overlay** — Tooltip, ContextMenu, HoverCard, DropdownMenu. Depends on Primitives.
- **Settings** — Settings, Toggle, Slider, Select, Keybinds, ColorPicker, AccessibilitySlider. Depends on Primitives.
- **Debug/DevTools** — DevTools, Inspector, Property, Console, PerformanceMonitor, AssetViewer. Depends on Primitives; `Inspector` uses `TreeView` (Primitives module).
- **Editor** — Editor, Palette, TerrainPainter, LightingControls. Depends on Primitives.
- **Loading** — LoadScreen, Skeleton. Depends on Primitives.
- **Error** — ErrorBoundary, ErrorMsg. Depends on Primitives.
- **Responsive** — Responsive, Touch, OrientationLock. Depends on Primitives.
- **Accessibility** — A11y, FocusTrap, SkipLink, ScreenReader, LiveRegion. Depends on Primitives. Cross-cutting: `Popover` (Primitives) and `Modal` (Modal module) are documented as using `FocusTrap` when modal focus-trapping is required.
- **General** — Stepper, Rating, Tag. Depends on Primitives.
- **PlayCanvas Bridge** — PCProvider. Depended on by every other module through the hooks in `src/hooks/` (see `docs/API.md`); PCProvider itself has no dependency on any component module.

## Dependency direction rule (acyclic)

Primitives → (every other module) → PlayCanvas Bridge (via hooks only, never via direct component import). The only verified same-layer cross-module edges are: HUD→Feedback (`Health`/`Energy` use `Progress`), Modal→Overlay (`Modal` uses `Overlay`), Modal/Primitives→Accessibility (`Modal`/`Popover` use `FocusTrap`), Debug/DevTools→Primitives (`Inspector` uses `TreeView`). No other cross-module edges are documented in `COMPONENTS.md`. Introducing a new cross-module import that is not one of these edges is a boundary violation unless the corresponding component's "Composition" field in `COMPONENTS.md` is first updated to declare it.

## Inversion of Control / Dependency Injection boundary

The PlayCanvas Bridge module is the single point where the component tree is decoupled from the PlayCanvas scene graph. Every component that touches PlayCanvas does so exclusively through a `pcEntity`/`pcCamera`/`pcAction`/`pcProperty` prop resolved by a hook (`useEntity`, `useSync`, `useHealthSync`, etc.), never by importing PlayCanvas APIs directly into a component file. This is the enforced IoC seam: swapping the PlayCanvas runtime for a different backend requires changing only `src/hooks/`, not `src/components/`.
