# GAME UI COMPONENTS LIBRARY

**Main Aim:** Provide a reusable, accessible, PlayCanvas-integrated React
component library for building in-game UI (HUD, inventory, dialogue,
puzzles, settings, dev tools, etc.) with consistent Tailwind styling,
keyboard/screen-reader support, and bidirectional PlayCanvas scene sync
across both DevMode and PlayMode.

---

## Index

- **[Primitives](#category-primitives)** — [Box](#component-box), [Flex](#component-flex), [Grid](#component-grid), [Text](#component-text), [Button](#component-button), [Icon](#component-icon), [Slot](#component-slot), [Input](#component-input), [Label](#component-label), [Checkbox](#component-checkbox), [ScrollArea](#component-scrollarea), [Card](#component-card), [Image](#component-image), [Tabs](#component-tabs), [TreeView](#component-treeview), [Overlay](#component-overlay), [Joystick](#component-joystick), [RadioGroup](#component-radiogroup), [Badge](#component-badge), [Avatar](#component-avatar), [Popover](#component-popover), [Divider](#component-divider), [Accordion](#component-accordion)
- **[HUD](#category-hud)** — [HUD](#component-hud), [Health](#component-health), [Energy](#component-energy), [Crosshair](#component-crosshair), [Compass](#component-compass), [Minimap](#component-minimap), [AmmoIndicator](#component-ammoindicator), [InteractionPrompt](#component-interactionprompt), [DamageNumbers](#component-damagenumbers), [StatusEffects](#component-statuseffects)
- **[Inventory](#category-inventory)** — [Inventory](#component-inventory), [ItemSlot](#component-itemslot), [ItemTip](#component-itemtip), [EquipmentSlots](#component-equipmentslots), [ItemComparison](#component-itemcomparison), [CraftingPanel](#component-craftingpanel), [LootContainer](#component-lootcontainer)
- **[Puzzle](#category-puzzle)** — [Puzzle](#component-puzzle), [CodePuzzle](#component-codepuzzle), [SequencePuzzle](#component-sequencepuzzle), [SliderPuzzle](#component-sliderpuzzle), [ObjectPuzzle](#component-objectpuzzle), [MathPuzzle](#component-mathpuzzle), [WordPuzzle](#component-wordpuzzle), [MemoryMatch](#component-memorymatch), [CombinationLock](#component-combinationlock), [PatternLock](#component-patternlock)
- **[Dialogue](#category-dialogue)** — [Dialogue](#component-dialogue), [Choice](#component-choice), [History](#component-history), [Subtitle](#component-subtitle)
- **[Objectives](#category-objectives)** — [Objectives](#component-objectives), [Objective](#component-objective)
- **[Timer](#category-timer)** — [Timer](#component-timer), [Stopwatch](#component-stopwatch)
- **[Navigation](#category-navigation)** — [NavMenu](#component-navmenu), [Back](#component-back), [Breadcrumb](#component-breadcrumb), [SidebarMenu](#component-sidebarmenu)
- **[Feedback](#category-feedback)** — [Toast](#component-toast), [Spinner](#component-spinner), [Progress](#component-progress), [AlertBanner](#component-alertbanner), [Confetti](#component-confetti), [LoadingDots](#component-loadingdots)
- **[Modal](#category-modal)** — [Modal](#component-modal), [Confirm](#component-confirm)
- **[Overlay](#category-overlay)** — [Tooltip](#component-tooltip), [ContextMenu](#component-contextmenu), [HoverCard](#component-hovercard), [DropdownMenu](#component-dropdownmenu)
- **[Settings](#category-settings)** — [Settings](#component-settings), [Toggle](#component-toggle), [Slider](#component-slider), [Select](#component-select), [Keybinds](#component-keybinds), [ColorPicker](#component-colorpicker), [AccessibilitySlider](#component-accessibilityslider)
- **[Debug/DevTools](#category-debugdevtools)** — [DevTools](#component-devtools), [Inspector](#component-inspector), [Property](#component-property), [Console](#component-console), [PerformanceMonitor](#component-performancemonitor), [AssetViewer](#component-assetviewer)
- **[Editor](#category-editor)** — [Editor](#component-editor), [Palette](#component-palette), [TerrainPainter](#component-terrainpainter), [LightingControls](#component-lightingcontrols)
- **[Loading](#category-loading)** — [LoadScreen](#component-loadscreen), [Skeleton](#component-skeleton)
- **[Error](#category-error)** — [ErrorBoundary](#component-errorboundary), [ErrorMsg](#component-errormsg)
- **[Responsive](#category-responsive)** — [Responsive](#component-responsive), [Touch](#component-touch), [OrientationLock](#component-orientationlock)
- **[Accessibility](#category-accessibility)** — [A11y](#component-a11y), [FocusTrap](#component-focustrap), [SkipLink](#component-skiplink), [ScreenReader](#component-screenreader), [LiveRegion](#component-liveregion)
- **[General](#category-general)** — [Stepper](#component-stepper), [Rating](#component-rating), [Tag](#component-tag)
- **[PlayCanvas Bridge](#category-playcanvas-bridge)** — [PCProvider](#component-pcprovider)

- **[Hooks](#hooks-documentation)** — [useEntity](#hook-useentity), [useScript](#hook-usescript), [useEvent](#hook-useevent), [useSync](#hook-usesync), [useTransition](#hook-usetransition), [useInput](#hook-useinput), [useNetwork](#hook-usenetwork), [useTimer](#hook-usetimer), [useTimerSync](#hook-usetimersync), [useStopwatch](#hook-usestopwatch), [useStopwatchSync](#hook-usestopwatchsync), [useToast](#hook-usetoast), [useAnnounce](#hook-useannounce), [useScrollToBottom](#hook-usescrolltobottom), [useAnimation](#hook-useanimation), [useLoadingProgress](#hook-useloadingprogress), [usePuzzleBridge](#hook-usepuzzlebridge), [usePuzzleSubmit](#hook-usepuzzlesubmit), [useSettingSync](#hook-usesettingsync), [useSettingsSync](#hook-usesettingssync), [useKeybindSync](#hook-usekeybindsync), [useObjectiveSync](#hook-useobjectivesync), [useObjectiveProgress](#hook-useobjectiveprogress), [useDialogueSync](#hook-usedialoguesync), [useDialogueChoice](#hook-usedialoguechoice), [useDialogueHistory](#hook-usedialoguehistory), [useInventorySync](#hook-useinventorysync), [useSlotSync](#hook-useslotsync), [useHealthSync](#hook-usehealthsync), [useEnergySync](#hook-useenergysync), [useLoadingSync](#hook-useloadingsync), [useProgressSync](#hook-useprogresssync), [useTouchBridge](#hook-usetouchbridge), [useRaycaster](#hook-useraycaster), [usePlayerRotation](#hook-useplayerrotation), [useCameraProjection](#hook-usecameraprojection), [useTextSync](#hook-usetextsync), [useIconSync](#hook-useiconsync), [useTextureSync](#hook-usetexturesync), [useAction](#hook-useaction), [useItemData](#hook-useitemdata), [useHoverData](#hook-usehoverdata), [useDevAPI](#hook-usedevapi), [useSceneInspector](#hook-usesceneinspector), [usePropertyEditor](#hook-usepropertyeditor), [useEditorBridge](#hook-useeditorbridge), [usePrefabLibrary](#hook-useprefablibrary), [useConsoleBridge](#hook-useconsolebridge), [useErrorReporter](#hook-useerrorreporter), [useConfirm](#hook-useconfirm), [useModalSync](#hook-usemodalsync), [useNotificationListener](#hook-usenotificationlistener), [useA11ySync](#hook-usea11ysync), [useViewportSync](#hook-useviewportsync), [useIsTouchDevice](#hook-useistouchdevice), [useKeyboardListener](#hook-usekeyboardlistener), [useTypewriter](#hook-usetypewriter), [useSequenceSubmit](#hook-usesequencesubmit), [useSliderSync](#hook-useslidersync), [useObjectPuzzleSync](#hook-useobjectpuzzlesync), [useTooltipSync](#hook-usetooltipsync), [useContextMenu](#hook-usecontextmenu), [useSkeleton](#hook-useskeleton), [useViewport](#hook-useviewport), [useBadgeSync](#hook-usebadgesync), [useAvatarSync](#hook-useavatarsync), [useAccordionSync](#hook-useaccordionsync), [useMinimapSync](#hook-useminimapsync), [useAmmoSync](#hook-useammosync), [useInteractionPromptSync](#hook-useinteractionpromptsync), [useStatusEffectSync](#hook-usestatuseffectsync), [useEquipmentSync](#hook-useequipmentsync), [useCraftingSync](#hook-usecraftingsync), [useLootSync](#hook-uselootsync), [useStepperSync](#hook-usesteppersync), [useMenu (from react-aria)](#hook-usemenu-from-react-aria), [useButton (from react-aria)](#hook-usebutton-from-react-aria)

---

## Category: Primitives

### Component: Box

- **Purpose:** Foundational layout container with optional PlayCanvas entity
  binding and `asChild` polymorphism.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `as?: ElementType` – HTML element to render as (default: `'div'`).
  - `className?: string` – Tailwind CSS classes.
  - `children?: ReactNode` – Child elements.
  - `pcEntity?: string` – PlayCanvas entity ID to bind to. Not validated at
    render time; if the ID does not resolve to an existing entity, binding
    silently no-ops until the entity appears.
  - `syncTransform?: boolean` – Sync position/rotation/scale every frame.
  - `asChild?: boolean` – Render `Slot` instead of the element from `as`,
    merging props onto the single child element (default: `false`, meaning
    `Box` renders its own element per `as`).
  - `ref?: React.Ref<HTMLElement>` – DOM ref (forwarded).
  - `variant?: 'solid' | 'outline' | 'ghost' | 'transparent'` (default:
    `'solid'`) – Visual style; maps to Tailwind background/border classes.
  - `role?: string` – ARIA role.
  - `aria-label?: string` – Accessible label.
  - `aria-labelledby?: string` – References element providing label.
  - `aria-describedby?: string` – References element providing description.
  - `aria-hidden?: boolean` – Hides from screen readers.
  - `aria-disabled?: boolean` – Indicates disabled state.
  - `aria-expanded?: boolean` – Indicates expanded state.
  - `aria-controls?: string` – Controls another element.
  - `data-testid?: string` – Test identifier.
  - `style?: React.CSSProperties` – Inline styles (merged with className).
  - `data-*?: any` – Supports any custom data attributes.
  - `tabIndex?: number` – Override tab index.
- **Events:**
  - `onClick?: (e: React.MouseEvent) => void`
  - `onContextMenu?: (e: React.MouseEvent) => void`
  - `onDoubleClick?: (e: React.MouseEvent) => void`
  - `onMouseEnter?: (e: React.MouseEvent) => void`
  - `onMouseLeave?: (e: React.MouseEvent) => void`
  - `onFocus?: (e: React.FocusEvent) => void`
  - `onBlur?: (e: React.FocusEvent) => void`
  - `onKeyDown?: (e: React.KeyboardEvent) => void`
  - `onKeyUp?: (e: React.KeyboardEvent) => void`
  - `onDragStart?: (e: React.DragEvent) => void`
  - `onDragEnd?: (e: React.DragEvent) => void`
  - `onDragOver?: (e: React.DragEvent) => void`
  - `onDragLeave?: (e: React.DragEvent) => void`
  - `onDragEnter?: (e: React.DragEvent) => void`
  - `onDrop?: (e: React.DragEvent) => void`
  - `onWheel?: (e: React.WheelEvent) => void`
  - `onPointerDown?: (e: React.PointerEvent) => void`
  - `onPointerUp?: (e: React.PointerEvent) => void`
  - `onPointerMove?: (e: React.PointerEvent) => void`
  - `onTransitionEnd?: (e: React.TransitionEvent) => void`
  - `onAnimationStart?: (e: React.AnimationEvent) => void`
  - `onAnimationEnd?: (e: React.AnimationEvent) => void`
  - `onAnimationIteration?: (e: React.AnimationEvent) => void`
- **Variants:** `solid`, `outline`, `ghost`, `transparent` (via `variant` prop).
- **PlayCanvas Integration:** Binds to PlayCanvas entity transform via
  `useEntity` if `pcEntity` provided; syncs position, rotation, scale on each
  frame if `syncTransform`. **Performance:** Use `syncTransform` only for
  frequently moving entities; consider throttling or batching via `useFrame` for
  many entities.
- **Tailwind/UI Behavior:** All Tailwind utilities via `className`; responsive
  modifiers; uses `clsx` and `tailwind-merge`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@radix-ui/react-slot`.
- **Composition:** Uses `Slot` from Radix to implement `asChild`; passes ref and
  props to child. If both `asChild` and `pcEntity` are used, the entity binding
  applies to the child element. Example: `<Box asChild pcEntity="player-hud"><button>Interact</button></Box>`
  renders the `<button>` directly (no extra wrapper `<div>`) with `pcEntity`
  binding applied to it.
- **Accessibility:** Accepts ARIA roles; keyboard focusable when interactive;
  supports all standard aria attributes.
- **Rebuild Notes:** Replace raw `<div>` with `Box`; prefer `asChild` for
  semantic HTML.

---

### Component: Flex

- **Purpose:** Layout primitive for flexbox with gap, alignment, and direction
  control.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'` (default:
    `'row'`).
  - `align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'` (default:
    `'stretch'`).
  - `justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'`
    (default: `'start'`).
  - `gap?: number | string` – Spacing between items. Numeric values must be a
    valid Tailwind spacing scale step (e.g., `0`–`96` in the default theme) and
    map to `gap-{n}`; string values are passed through as an arbitrary value
    (e.g., `'[10px]'`) and are not validated against the theme. For separate
    row/column gaps use `gapX` and `gapY`.
  - `gapX?: number | string` – Horizontal gap (maps to `gap-x-{n}`).
  - `gapY?: number | string` – Vertical gap (maps to `gap-y-{n}`).
  - `wrap?: boolean | 'wrap-reverse'` – Enable flex wrapping; `'wrap-reverse'`
    for reverse wrap (default: `false`).
  - `flex?: string | number` – Shorthand for `flex-grow`, `flex-shrink`,
    `flex-basis` (e.g., `'1'`, `'auto'`, `'none'`). Maps directly to Tailwind's
    `flex-{value}` utility; numeric values are stringified first (`1` becomes
    `flex-1`), so only values with a matching Tailwind utility take effect —
    arbitrary numbers fall back to inline `flex` style.
  - `flexGrow?: number` – CSS `flex-grow`.
  - `flexShrink?: number` – CSS `flex-shrink`.
  - `flexBasis?: string | number` – CSS `flex-basis`.
  - `order?: number` – CSS `order` property.
  - `alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'`
    – Overrides the item's own cross-axis alignment within a parent `Flex`.
  - `justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch'` – Overrides
    the item's own alignment on the justify axis (grid/flex contexts).
  - `alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around'`
    – Aligns flex lines.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `className?: string` – Additional Tailwind classes.
  - `children?: ReactNode`.
  - `syncTransform?: boolean` – Sync with PlayCanvas transform.
  - `role?: string` – ARIA role.
  - `aria-label?: string` – Accessible label.
- **Props & Events:** Inherits all `Box` props and events (including `as`,
  `pcEntity`, `syncTransform`, `asChild`, ARIA props, and all pointer/keyboard
  events); none are overridden — `Flex`-specific props (`direction`, `align`,
  `justify`, `gap`, etc.) are additive and take precedence only in that they
  are applied after `Box`'s base classes in the generated `className`.
- **Variants:** `row`, `col`, `row-reverse`, `col-reverse`, `wrap`, `no-wrap`
  (via `direction` and `wrap` props).
- **PlayCanvas Integration:** Same as `Box`; forwards `pcEntity` and
  `syncTransform`.
- **Tailwind/UI Behavior:** Generates `flex`, `flex-{direction}`,
  `items-{align}`, `justify-{justify}`, `gap-{gap}`, `flex-wrap` (or
  `flex-wrap-reverse`), `flex-{flex}`. For responsive layouts, pass
  breakpoint-prefixed utilities directly via `className` (e.g.,
  `className="md:flex-row flex-col"`); the typed props (`direction`, `align`,
  `justify`, `gap`, etc.) only generate the base (non-responsive) classes.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** Same as `Box`.
- **Rebuild Notes:** Extends `Box`; use for all flex layouts; avoid manual flex
  utilities.

---

### Component: Grid

- **Purpose:** Primitive for CSS grid with column/row definitions.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `cols?: number | string` – Number of columns. Numeric values map to
    `grid-cols-{n}` (Tailwind's fixed-column utilities, 1–12). String values
    are passed through as an arbitrary value, e.g. `'auto-fill'` alone is not
    a valid Tailwind class on its own — use the full arbitrary-value syntax
    `'[repeat(auto-fill,minmax(120px,1fr))]'` to get `grid-cols-[repeat(auto-fill,minmax(120px,1fr))]`.
  - `rows?: number | string` – Number of rows. Same rules as `cols`: numeric
    maps to `grid-rows-{n}`; string values must be full arbitrary-value syntax
    to produce a valid `grid-rows-[...]` class.
  - `gap?: number | string` – Grid gap (Tailwind spacing scale).
  - `autoColumns?: string` – `auto-cols-{value}` (e.g., `'minmax(0, 1fr)'`).
  - `autoRows?: string` – `auto-rows-{value}`.
  - `flow?: 'row' | 'col' | 'row-dense' | 'col-dense'` – Grid flow.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `className?: string` – Additional Tailwind classes.
  - `children?: ReactNode`.
  - `syncTransform?: boolean` – Sync with PlayCanvas transform.
  - `role?: string` – ARIA role. Default is `'none'` because `Grid` is a
    layout-only primitive by default and `role="none"` (formerly
    `presentation`) prevents assistive technology from announcing a generic
    grid semantic that doesn't apply to non-interactive content — this is
    intentional and matches WAI-ARIA guidance, not a conflict. Set to
    `'grid'` explicitly (and manage `aria-selected`/keyboard navigation on
    children) only when the grid is interactively navigable.
  - `aria-label?: string` – Accessible label.
  - `placeItems?: 'start' | 'end' | 'center' | 'stretch'` – Aligns grid items
    within their cells.
  - `placeContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'`
    – Aligns the entire grid within the container.
  - `justifyItems?: 'start' | 'end' | 'center' | 'stretch'` – Aligns grid
    items along the inline (row) axis within their cells; maps to
    `justify-items-{value}`.
  - `colSpan?: number | 'full'` – Applied to a `Grid` child to span multiple
    columns; maps to `col-span-{n}` or `col-span-full`.
  - `rowSpan?: number | 'full'` – Applied to a `Grid` child to span multiple
    rows; maps to `row-span-{n}` or `row-span-full`.
- **Props & Events:** Inherits all `Box` props and events.
- **Variants:** `cols-{n}`, `rows-{n}`, `gap-{n}` (via props).
- **PlayCanvas Integration:** Same as `Box`; forwards `pcEntity` and
  `syncTransform`.
- **Tailwind/UI Behavior:** Generates `grid`, `grid-cols-{cols}`,
  `grid-rows-{rows}`, `gap-{gap}`, `auto-cols-{autoColumns}`,
  `auto-rows-{autoRows}`, `grid-flow-{flow}`, `place-items-{placeItems}`,
  `place-content-{placeContent}`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** Same as `Box`; for interactive grids, set `role="grid"` and
  manage `aria-selected` on cells.
- **Performance:** For large grids (hundreds of cells, e.g. big inventories or
  puzzle boards), avoid rendering all cells unconditionally — pair `Grid` with
  windowing/virtualization (see `Inventory`'s `virtualization` prop) once cell
  count exceeds roughly 200, and memoize cell content to avoid re-renders when
  unrelated siblings change.
- **Rebuild Notes:** Use for inventory grids, puzzle layouts, etc.; avoid nested
  flex for grid-like layouts.

---

### Component: Text

- **Purpose:** Typography primitive with size, weight, color, alignment, and
  PlayCanvas text sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `as?: ElementType` – HTML element (default: `'span'`).
  - `size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'`
    (default: `'base'`) – Each value maps 1:1 to the matching Tailwind class,
    e.g. `'xs'` → `text-xs`, `'base'` → `text-base`, `'2xl'` → `text-2xl`.
  - `weight?: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'`
    (default: `'normal'`).
  - `color?: string` – Text color. Must be a Tailwind text-color class (e.g.,
    `'text-white'`, `'text-red-500'`); raw CSS color values (`'#fff'`,
    `'red'`) are not supported and should be applied via `style` instead.
  - `fontFamily?: 'sans' | 'serif' | 'mono'` – Font family; maps to
    `font-{fontFamily}`.
  - `align?: 'left' | 'center' | 'right' | 'justify'` – Text alignment.
  - `transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'`
    – Text transform.
  - `tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'` –
    Letter spacing.
  - `leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'` –
    Predefined line height; maps to `leading-{leading}`.
  - `lineHeight?: number | string` – Numeric or arbitrary line-height value
    (e.g., `1.5`, `'24px'`) for cases the predefined `leading` scale doesn't
    cover; applied via `style` and takes precedence over `leading` when set.
  - `truncate?: boolean` – Truncate text with ellipsis.
  - `lineClamp?: number` – Number of lines to show before truncating.
  - `ellipsis?: 'clip' | 'ellipsis'` – Control overflow text.
  - `selectable?: boolean` – Allow text selection (default: `true`).
  - `pcEntity?: string` – PlayCanvas entity with TextComponent.
  - `children?: ReactNode` – Text content.
  - `className?: string` – Additional Tailwind classes.
  - `htmlFor?: string` – When `as="label"`, associates with input.
  - `role?: string` – ARIA role.
  - `aria-label?: string` – Accessible label.
  - `aria-describedby?: string` – References description element.
  - `fontStyle?: 'normal' | 'italic' | 'oblique'` – Font style.
  - `textDecoration?: 'none' | 'underline' | 'line-through' | 'overline'` – Text
    decoration.
  - `whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'` –
    Whitespace handling.
  - `dangerouslySetInnerHTML?: { __html: string }` – Renders raw HTML for rich
    text (e.g., inline formatting from a CMS), mirroring React's native prop.
    Bypasses `children`; the caller is responsible for sanitizing the HTML
    before passing it in to avoid XSS.
- **Props & Events:** Inherits all `Box` props and events; note that `Text`
  overrides `Box`'s `as` default of `'div'` with `'span'`, since `Text` is
  typically used inline.
- **Variants:** `heading`, `body`, `caption`, `label`, `code` (via `as` and
  combination of props).
- **PlayCanvas Integration:** Syncs text content to PlayCanvas TextComponent via
  `useTextSync` if `pcEntity`; updates on children change. **Performance:**
  `useTextSync` writes to the PlayCanvas TextComponent on every `children`
  change; for text that updates frequently (e.g., a live counter or streamed
  dialogue), debounce or batch updates upstream rather than passing a new
  value every render, since each sync touches the PlayCanvas scene graph.
- **Tailwind/UI Behavior:** `text-{size}`, `font-{weight}`, `text-{color}`,
  `text-{align}`, `uppercase` etc., `truncate`, `line-clamp-{n}`,
  `tracking-{tracking}`, `leading-{leading}`, `select-none` if not selectable,
  `font-{fontStyle}`, `underline`, `whitespace-{whiteSpace}`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** ARIA role based on `as`; if `as="label"`, sets `htmlFor`;
  supports `aria-label`, `aria-describedby`.
- **Rebuild Notes:** Supports rich text; use for all typography; prefer semantic
  `as`.

---

### Component: Button

- **Purpose:** Accessible button with loading state and PlayCanvas action
  triggering.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `as?: ElementType` – HTML element (default: `'button'`).
  - `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon-only'`
    (default: `'primary'`). When `variant="icon-only"`, `aria-label` is
    required — the component throws a development-time console error (not a
    silent failure) if `aria-label` is missing, since there is no visible
    text to derive an accessible name from.
  - `size?: 'sm' | 'md' | 'lg'` (default: `'md'`).
  - `loading?: boolean` – Show loading spinner, disable interactions, and set
    `aria-busy="true"` on the button element while `true`.
  - `disabled?: boolean` – Disable button.
  - `fullWidth?: boolean` – Button spans full width.
  - `autoFocus?: boolean` – Auto-focus on mount.
  - `tabIndex?: number` – Override tab index.
  - `pcAction?: string` – PlayCanvas script method name.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `onPress?: () => void` – Preferred click handler (use this instead of
    `onClick`).
  - `isSelected?: boolean` – Marks the button as selected/active for toggle
    button groups; sets `aria-pressed` and applies selected styling.
  - `isPressed?: boolean` – Controlled pressed state for toggle buttons
    (overrides internal press state; pairs with `isSelected`).
  - `href?: string` – When set, renders `as="a"` semantics (an anchor-like
    button) and navigates to this URL on activation.
  - `target?: string` – Anchor `target` (e.g., `'_blank'`); only applies when
    `href` is set.
  - `rel?: string` – Anchor `rel` (e.g., `'noopener noreferrer'`); only
    applies when `href` is set — recommended whenever `target="_blank"`.
  - `children?: ReactNode` – Button content.
  - `className?: string` – Additional Tailwind classes.
  - `aria-label?: string` – Required for `icon-only`.
  - `role?: string` – ARIA role (default: `'button'`).
  - `aria-disabled?: boolean` – Indicates disabled state.
  - `aria-pressed?: boolean` – Indicates pressed state for toggle buttons.
  - `aria-expanded?: boolean` – Indicates expanded state.
  - `aria-controls?: string` – Controls another element.
  - `type?: 'button' | 'submit' | 'reset'` – Button type for forms.
  - `form?: string` – Associates button with a form ID.
  - `formAction?: string` – URL for form submission.
  - `formMethod?: 'get' | 'post'` – HTTP method for form submission.
  - `formTarget?: string` – Target for form submission.
  - `formEncType?: string` – Encoding type for form submission.
  - `loadingText?: string` – Accessible text shown while loading; when set and
    `loading` is `true`, it replaces `aria-label` (or the button's accessible
    name) so screen readers announce the loading state instead of stale label
    text.
  - `startIcon?: ReactNode` – Icon element displayed before children.
  - `endIcon?: ReactNode` – Icon element displayed after children.
- **State:** `isPressed`, `isHovered`, `isFocused`.
- **Events:**
  - `onPress?: () => void`
  - `onHoverStart?: () => void`
  - `onHoverEnd?: () => void`
  - `onFocus?: (e: React.FocusEvent) => void`
  - `onBlur?: (e: React.FocusEvent) => void`
  - `onKeyDown?: (e: React.KeyboardEvent) => void`
  - `onKeyUp?: (e: React.KeyboardEvent) => void`
  - **Note:** `onClick` is inherited from `Box` but is discouraged; use
    `onPress` for accessibility. In development, using `onClick` will trigger a
    `console.warn` deprecation notice the first time it's used per component
    instance (stripped from production builds); `onPress` remains fully
    functional and is not itself deprecated.
  - **Performance:** Avoid attaching expensive work directly in `onPress`
    (network calls, heavy state recalculation) without debouncing/throttling
    or a `loading` guard — react-aria's `useButton` does not debounce presses,
    so rapid repeat activation (e.g., held Enter/Space or fast repeat taps)
    will fire `onPress` once per interaction. Set `loading` (or `disabled`)
    while an async `onPress` handler is in flight to prevent duplicate calls.
- **Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`,
  `icon-only`.
- **PlayCanvas Integration:** Triggers PlayCanvas script method via `useAction`
  if `pcAction` and `pcEntity`; passes event data.
- **Tailwind/UI Behavior:** Background, text, border,
  hover/focus/active/disabled states; `loading` adds spinner and changes
  opacity.
- **Dependencies:** `react-aria` (useButton), `tailwind-merge`, `clsx`.
- **Composition:** Uses `useButton` from react-aria; composes `Box`.
- **Accessibility:** `role="button"`, `aria-label` (required for icon-only),
  `aria-disabled`, `aria-pressed` (also driven by `isSelected`/`isPressed`),
  `aria-busy="true"` while `loading`; keyboard Enter/Space; focus visible
  styles.
- **Rebuild Notes:** Always use react-aria; avoid raw `<button>`; use `onPress`.

---

### Component: Icon

- **Purpose:** SVG icon wrapper with size/color control and PlayCanvas icon
  sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `name: string` – Icon name from Lucide or custom set. Typed as a plain
    `string`, not a union of Lucide icon names, so an unrecognized name is
    only caught at runtime (renders nothing, or falls back to a placeholder)
    rather than at compile time; when using a custom set, ensure `name`
    matches a key registered with that set.
  - `size?: number | string` – Icon size (Tailwind scale, e.g., `5` for
    `w-5 h-5`; default: `5`). Any Tailwind spacing-scale number is valid
    (`4` → `w-4 h-4`, `6` → `w-6 h-6`, etc.); string values are treated as an
    arbitrary Tailwind size (e.g., `'[18px]'` → `w-[18px] h-[18px]`).
  - `color?: string` – Icon color (Tailwind color class, default:
    `'currentColor'`); applied to `stroke` for outline icons and `fill` for
    solid icons unless `strokeColor`/`fill` override it.
  - `strokeWidth?: number` – Stroke width (for outline icons; default: `2`).
  - `strokeColor?: string` – Stroke color (Tailwind color class), independent
    of `color`/`fill` — useful for outline icons that need a different stroke
    than fill color (default: falls back to `color`).
  - `fill?: string` – Fill color (for solid variant).
  - `rotate?: number` – Rotation in degrees (e.g., `90`, `180`); applied via
    `transform: rotate(...)`.
  - `mirror?: boolean` – Horizontally flip the icon (`transform: scaleX(-1)`);
    useful for directional icons in RTL layouts (default: `false`).
  - `pcEntity?: string` – PlayCanvas entity with IconComponent.
  - `children?: ReactNode` – Custom SVG content (overrides `name`).
  - `className?: string` – Additional Tailwind classes.
  - `onClick?: () => void` – Click handler (makes interactive).
  - `variant?: 'outline' | 'solid' | 'mini'` (default: `'outline'`).
  - `aria-label?: string` – Accessible label (required for interactive icons).
  - `role?: string` – ARIA role (`'img'` for decorative, `'button'` for
    interactive).
  - `title?: string` – SVG `<title>` for tooltips.
  - `viewBox?: string` – Custom viewBox for SVG (default: `'0 0 24 24'`).
  - `strokeLinecap?: 'round' | 'butt' | 'square'` – Stroke linecap.
  - `strokeLinejoin?: 'round' | 'miter' | 'bevel'` – Stroke linejoin.
- **Events:** `onClick`.
- **Variants:** `outline`, `solid`, `mini` (via `variant` prop).
- **PlayCanvas Integration:** Syncs icon name and color via `useIconSync`;
  updates on change.
- **Tailwind/UI Behavior:** `w-{size}`, `h-{size}`, `text-{color}`,
  `flex-shrink-0`, `stroke-{strokeWidth}` (if using Lucide).
- **Dependencies:** `lucide-react` (or custom set), `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** Decorative icons (the common case — an icon next to
  text that already conveys the meaning) should omit `aria-label` and render
  with `aria-hidden="true"` so screen readers skip them entirely. Meaningful
  icons (the icon is the only conveyor of information, e.g. a standalone
  status glyph) must set `aria-label` and use `role="img"` so screen readers
  announce it. If the icon is interactive (has `onClick`), don't rely on Icon's
  own semantics at all — wrap it in or replace it with the `Button` component
  (`variant="icon-only"`) so it gets `role="button"`, keyboard support, and a
  required `aria-label`.
- **Rebuild Notes:** Use Lucide for standard icons; support custom SVG via
  `children`; prefer `size` as Tailwind scale number. To integrate a custom
  icon set, provide a `name`-to-SVG lookup map with the same keys as Lucide's
  naming convention (kebab-case) and pass it via the icon provider/config so
  `name` resolves consistently across both sets; unresolved names should log a
  development warning rather than throwing.

---

### Component: Slot

- **Purpose:** Composition primitive for `asChild` pattern, forwarding refs and
  props.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `children: ReactNode` – Child element to render. Must be a single valid
    React element (not a fragment, string, or array); `Slot` does not itself
    expose an `asChild` prop because `Slot` _is_ the `asChild` mechanism —
    components that support `asChild` render `<Slot>` in place of their own
    element when `asChild` is `true`, and `Slot` always merges into its one
    child.
  - `pcEntity?: string` – PlayCanvas entity ID (applies to child). Not
    validated against the live scene graph; an unresolved ID is a silent
    no-op until the entity exists, same as `Box`'s `pcEntity`.
  - `ref?: React.Ref<HTMLElement>` – DOM ref (forwarded to child). `Slot` must
    be defined with `React.forwardRef` (it wraps `@radix-ui/react-slot`,
    which requires this) — a custom child component receiving props from
    `Slot` must also forward its ref for the merged ref to reach the
    underlying DOM node.
  - `mergeProps?: boolean` – If `true`, merges props with child's existing props
    (default: `true`). Props from Slot take precedence in case of conflict.
- **PlayCanvas Integration:** Passes ref to child for PlayCanvas binding via
  `useEntity`.
- **Tailwind/UI Behavior:** No styling.
- **Dependencies:** `@radix-ui/react-slot`.
- **Composition:** Does not render its own DOM element; forwards all props to
  child. Example with a custom component:
  `<Slot onClick={handleClick} pcEntity="lever"><CustomLever label="Pull" /></Slot>`
  — `CustomLever` must accept and forward `onClick`, `pcEntity`-derived
  props, and `ref` (via `React.forwardRef`) to its root DOM element for the
  merge to work.
- **Accessibility:** ARIA attributes should be applied directly to child
  elements; not inherited through Slot wrapper.
- **Rebuild Notes:** Critical for polymorphic components; use sparingly to avoid
  extra wrappers.

---

### Component: Input

- **Purpose:** Accessible input field with PlayCanvas value sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `value?: string | number | readonly string[]` – Input value. `string` and
    `number` cover most types; `readonly string[]` only applies when
    `type="file"` with `multiple` (mirrors the native `<input>` value type for
    file lists) — for all other types, pass `string`/`number`.
  - `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void` – Value change
    handler (native event-based).
  - `onValueChange?: (value: string) => void` – Convenience change handler that
    receives the new value directly instead of the event object; fires
    alongside `onChange`.
  - `onInput?: (e: React.FormEvent<HTMLInputElement>) => void` – Native
    `input` event, fired synchronously on every keystroke/composition update
    (before `onChange`'s React-batched value).
  - `onInvalid?: (e: React.FormEvent<HTMLInputElement>) => void` – Fired when
    native constraint validation (e.g., `pattern`, `required`, `max`) fails.
  - `onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void`.
  - `onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void`.
  - `onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void`.
  - `type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'date' | 'file'`
    (default: `'text'`).
  - `autoFocus?: boolean` – Auto-focus on mount (default: `false`).
  - `htmlSize?: number` – Native `size` attribute (visible character width);
    named `htmlSize` (not `size`) to avoid colliding with the `size` height
    variant prop below.
  - `multiple?: boolean` – For `type="file"`, allow selecting multiple files.
  - `accept?: string` – For `type="file"`, comma-separated list of accepted
    MIME types/extensions (e.g., `'image/png,.jpg'`).
  - `capture?: boolean | 'user' | 'environment'` – For `type="file"` on mobile,
    hints which camera to use for direct capture.
  - `placeholder?: string`.
  - `disabled?: boolean`.
  - `readOnly?: boolean`.
  - `required?: boolean`.
  - `maxLength?: number`.
  - `pattern?: string` – Validation regex.
  - `autoComplete?: 'on' | 'off' | 'username' | 'current-password' | ...` –
    Autocomplete hint.
  - `autoCorrect?: 'on' | 'off'`.
  - `spellCheck?: boolean`.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `pcProperty?: string` – PlayCanvas script property name.
  - `className?: string`.
  - `aria-label?: string`.
  - `variant?: 'default' | 'outline' | 'ghost' | 'filled'` (default:
    `'default'`).
  - `size?: 'sm' | 'md' | 'lg'` – Input height variant.
  - `aria-describedby?: string`.
  - `aria-invalid?: boolean`.
  - `aria-required?: boolean`.
  - `aria-autocomplete?: 'none' | 'inline' | 'list' | 'both'`.
  - `name?: string` – Form field name.
  - `id?: string` – Element ID.
  - `prefix?: ReactNode` – Content before input (e.g., icon).
  - `suffix?: ReactNode` – Content after input.
  - `error?: string` – Validation error message. When set (non-empty),
    `Input` automatically applies `aria-invalid="true"` and error styling
    without needing to also pass `aria-invalid` explicitly; passing
    `aria-invalid` directly overrides this automatic behavior.
  - `inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'`
    – Mobile keyboard type.
  - `enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'`
    – Mobile keyboard enter key label.
  - `list?: string` – ID of datalist for suggestions.
  - `min?: number | string` – Minimum value; `number` for `type="number"`,
    `string` (`'YYYY-MM-DD'`) for `type="date"`.
  - `max?: number | string` – Maximum value; `number` for `type="number"`,
    `string` (`'YYYY-MM-DD'`) for `type="date"`.
  - `step?: number` – Step increment for number/date inputs.
- **State:** `value`, `isFocused`.
- **Events:** `onChange`, `onValueChange`, `onInput`, `onInvalid`, `onFocus`,
  `onBlur`, `onKeyDown`.
- **Variants:** `default`, `outline`, `ghost`, `filled` (via `variant` prop).
- **PlayCanvas Integration:** Syncs value via `useSync` if `pcEntity` and
  `pcProperty` provided. **Performance:** `useSync` debounces writes to
  PlayCanvas at 100ms by default (see `useSync`'s `debounce` prop); for inputs
  that sync on every keystroke, keep this debounce enabled (don't pass
  `debounce: 0`) to avoid flooding the PlayCanvas scene graph with writes.
- **Tailwind/UI Behavior:** `bg-gray-800`, `text-white`, `border`, `rounded`,
  `px-3`, `py-2`, `focus:ring-2`; size variants adjust padding.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `role="textbox"`, `aria-label`, `aria-describedby`;
  supports `aria-invalid` (auto-set when `error` is provided), `aria-required`,
  `aria-autocomplete`.
- **Rebuild Notes:** Use for all user text entry; support
  controlled/uncontrolled.

---

### Component: Label

- **Purpose:** Accessible label for form elements with optional `htmlFor`.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `htmlFor?: string` – ID of associated form element. `Label` always renders
    a native `<label>` (via `Text` with `as="label"` — there is no separate
    `as` override on `Label` itself), so `htmlFor` is the only association
    mechanism exposed; use `aria-labelledby` on the input instead if you need
    a label that isn't a `<label>` element.
  - `children: ReactNode` – Label content.
  - `className?: string`.
  - `variant?: 'default' | 'required' | 'optional'` (default: `'default'`) –
    Purely visual; derived automatically from the `required`/`optional`
    props and should not be set independently of them. `required`/`optional`
    are the source of truth for both behavior (rendering the indicator) and
    the `variant` styling — set `required`/`optional`, not `variant`, and the
    matching variant is applied for you.
  - `required?: boolean` – Marks as required; also drives `variant="required"`.
  - `optional?: boolean` – Marks as optional; also drives `variant="optional"`.
  - `hidden?: boolean` – Visually hide label but keep accessible.
  - `requiredIndicator?: ReactNode` – Custom indicator for required fields
    (default: `'*'`).
- **State:** None.
- **Events:** None.
- **Variants:** `default`, `required`, `optional` (via `variant` prop, derived
  from `required`/`optional`).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `block`, `text-sm`, `font-medium`, `mb-1`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Text` with `as="label"`.
- **Accessibility:** Automatically associates with input via `htmlFor`
  (native `for`/`id` relationship). If the labeled control is a composite
  component that doesn't expose a plain `id` on its root input (e.g., a
  custom `Select`), associate via `aria-labelledby` on the control pointing
  at this `Label`'s `id` instead of relying on `htmlFor`.
- **Rebuild Notes:** Use with `Input`, `Select`, `Toggle`, etc.

---

### Component: Checkbox

- **Purpose:** Accessible checkbox with indeterminate state and PlayCanvas sync.
  For toggle switch, use `Toggle` component.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `checked?: boolean` – Checked state (controlled).
  - `defaultChecked?: boolean` – Initial checked state for uncontrolled mode
    (ignored if `checked` is provided).
  - `indeterminate?: boolean` – Indeterminate state (sets
    `aria-checked="mixed"`).
  - `onChange?: (checked: boolean) => void` – Change handler.
  - `onCheckedChange?: (checked: boolean) => void` – Alias for `onChange`
    matching Radix's naming convention; identical signature, fires alongside
    `onChange`.
  - `onFocus?: (e: React.FocusEvent) => void`.
  - `onBlur?: (e: React.FocusEvent) => void`.
  - `disabled?: boolean`.
  - `readOnly?: boolean`.
  - `required?: boolean`.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `pcProperty?: string` – PlayCanvas script property name.
  - `label?: string` – Checkbox label.
  - `className?: string`.
  - `aria-label?: string`.
  - `aria-describedby?: string`.
  - `aria-invalid?: boolean`.
  - `name?: string` – Form field name.
  - `value?: string` – Value when checked (for forms).
  - `form?: string` – ID of associated form.
  - `onIndeterminateChange?: (indeterminate: boolean) => void` – Called when
    indeterminate state changes.
- **State:** `checked`, `isIndeterminate`, `isFocused`.
- **Events:** `onChange`, `onCheckedChange`, `onFocus`, `onBlur`,
  `onIndeterminateChange`.
- **Variants:** (only `'default'` via `variant` prop) – use `Toggle` for switch
  style.
- **PlayCanvas Integration:** Syncs via `useSync` if `pcEntity` and
  `pcProperty`.
- **Tailwind/UI Behavior:** `w-4 h-4`, `rounded`, `border`, `bg-gray-700`,
  `checked:bg-blue-600`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`,
  `@radix-ui/react-checkbox`.
- **Composition:** Composes `Box` and `Label`.
- **Accessibility:** `role="checkbox"`, `aria-checked` (true/false/mixed for
  indeterminate), `aria-label`, `aria-disabled`, `aria-readonly`. When
  `indeterminate` is `true`, the box renders a dash/minus glyph (not the
  checkmark) so the mixed state is visually distinguishable, not just exposed
  via `aria-checked="mixed"`. Keyboard: `Tab` moves focus to the checkbox;
  `Space` toggles `checked` (and clears `indeterminate`); it does not respond
  to `Enter`, matching native checkbox behavior.
- **Rebuild Notes:** Use Radix Checkbox for keyboard and screen reader support.
  For switch/toggle, use the dedicated `Toggle` component.

---

### Component: ScrollArea

- **Purpose:** Container with custom scrollbar and optional auto‑scroll.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `orientation?: 'vertical' | 'horizontal' | 'both'` (default: `'vertical'`).
  - `autoScroll?: boolean` – Auto-scroll to bottom when content changes.
  - `scrollToBottom?: boolean` – Programmatically scroll to bottom (overrides
    autoScroll for one-time).
  - `className?: string`.
  - `children?: ReactNode`.
  - `variant?: 'default' | 'thin' | 'hidden'` (default: `'default'`).
  - `overscrollBehavior?: 'auto' | 'contain' | 'none'`.
  - `scrollBehavior?: 'auto' | 'smooth'` (default: `'auto'`).
  - `scrollbarPlacement?: 'overlay' | 'inline'` (default: `'inline'`).
  - `onScroll?: (e: React.UIEvent<HTMLDivElement>) => void`.
  - `onScrollEnd?: () => void` – Called when scrolling stops.
  - `scrollEndDebounce?: number` – Debounce time in ms before `onScrollEnd`
    fires after the last scroll event (default: `150`).
  - `role?: string` – ARIA role (default: `'region'`).
  - `aria-label?: string`.
  - `scrollbarWidth?: number` – Custom scrollbar width in pixels; a raw pixel
    number, not a Tailwind scale value — there is no type-level validation, so
    an out-of-range or negative value is passed through as-is to the
    generated inline style.
  - `scrollbarColor?: string` – Custom scrollbar color. Must be a Tailwind
    color class (e.g., `'bg-gray-600'`), not a raw CSS color; unlike
    `scrollbarWidth`, this is class-based so an invalid value simply fails to
    match any Tailwind utility rather than erroring.
  - `onReachEnd?: () => void` – Called when scrolled to the end (within
    `scrollThreshold` pixels of the end).
  - `onReachStart?: () => void` – Called when scrolled to the start (within
    `scrollThreshold` pixels of the start).
  - `scrollThreshold?: number` – Distance in pixels from the start/end at
    which `onReachStart`/`onReachEnd` fire (default: `0`, meaning exactly at
    the edge).
- **Methods (via `ref`):**
  - `scrollTo(options: ScrollToOptions | { top?: number, left?: number }): void`
    – Scroll to an absolute position.
  - `scrollBy(options: ScrollToOptions | { top?: number, left?: number }): void`
    – Scroll by a relative offset.
  - `scrollIntoView(child: HTMLElement, options?: ScrollIntoViewOptions): void`
    – Scroll a descendant element into view within the scroll area.
- **State:** `isScrolling`, `scrollPosition`.
- **Events:** `onScroll`, `onScrollEnd`, `onReachEnd`, `onReachStart`.
- **Variants:** `default`, `thin`, `hidden` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `overflow-auto`, `scrollbar-thin`,
  `scrollbar-track-gray-800`, `scrollbar-thumb-gray-600`; `variant="hidden"`
  hides scrollbar but remains scrollable (use `scrollbar-hide`).
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `react-use@^17` (pins
  the `useScroll` hook; verify against the installed `react-use` version),
  `useScrollToBottom` (internal).
- **Composition:** Composes `Box`.
- **Accessibility:** `role="region"`, `aria-label`; keyboard accessible.
- **Performance:** `onScroll` fires on every native scroll event, which can be
  dozens of times per second during a drag/fling; throttle or debounce
  consumers of `onScroll` (e.g., with `requestAnimationFrame` coalescing) if
  they do non-trivial work per call. `onReachEnd`/`onReachStart` are cheap to
  use unthrottled since they only fire at edges; `onScrollEnd` already
  debounces via `scrollEndDebounce`.
- **Rebuild Notes:** Uses `react-use/useScroll` for scroll detection; implements
  custom `useScrollToBottom` hook for auto-scroll to bottom in chat/history;
  custom scrollbar styling.

---

### Component: Card

- **Purpose:** Container with background, rounded corners, and shadow.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `variant?: 'default' | 'outline' | 'elevated' | 'hoverable'` (default:
    `'default'`). `'hoverable'` only controls the visual hover treatment
    (shadow lift on `:hover`); it is independent of `clickable`, which
    controls interactivity (cursor, `onClick`, keyboard focus). Use
    `clickable` alone for a card that's actionable without a hover lift, and
    `variant="hoverable"` alone for a purely visual hover effect on a
    non-interactive card — combine both for the common "clickable card with a
    hover lift" case.
  - `padding?: 'none' | 'sm' | 'md' | 'lg'` (default: `'md'`).
  - `clickable?: boolean` – Adds hover effects, cursor pointer, keyboard focus
    support, and enables `onClick`.
  - `onClick?: (e: React.MouseEvent) => void` – Click handler; only fires (and
    the card is only made keyboard-focusable/actionable) when `clickable` is
    `true`.
  - `header?: ReactNode` – Content rendered in a dedicated header slot above
    the main content, visually separated (e.g., border-bottom).
  - `footer?: ReactNode` – Content rendered in a dedicated footer slot below
    the main content, visually separated (e.g., border-top).
  - `actions?: ReactNode` – Content rendered in an actions slot, typically
    aligned to the top-right or bottom-right (e.g., icon buttons).
  - `loading?: boolean` – Shows skeleton loading state.
  - `className?: string`.
  - `children?: ReactNode`.
  - `role?: string` – ARIA role (default: `'region'` when the card has a
    `header`/title, since a labeled region is the common case for cards that
    group related content; omit or override `role` for purely decorative or
    list-item cards where `'region'` would over-announce).
  - `aria-label?: string`.
  - `aria-labelledby?: string` – When `header` contains a title element (e.g.,
    a heading), point this at that element's `id` so the card's accessible
    name matches its visible title instead of requiring a redundant
    `aria-label`.
  - `elevation?: number` – Shadow depth (e.g., `1`–`8` maps to `shadow-{n}`).
  - `borderColor?: string` – Tailwind border color class for outline variant.
  - `radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` – Border radius (default:
    `'md'`).
- **Props & Events:** Inherits all `Box` props and events.
- **Variants:** `default`, `outline`, `elevated`, `hoverable` (via `variant`
  prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `bg-gray-800`, `rounded-lg`, `shadow`, `p-4`, etc.;
  `hoverable` adds `hover:shadow-lg transition-shadow`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `role="region"` when appropriate, paired with
  `aria-labelledby` referencing the `header` title element (or `aria-label`
  when there's no visible title). When `clickable`, the card is focusable
  (`tabIndex={0}`) and responds to Enter/Space like a button.
- **Rebuild Notes:** Use for item previews, dialogue boxes, settings panels.

---

### Component: Image

- **Purpose:** Optimized image with fallback and PlayCanvas texture sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `src: string` – Image source URL (required).
  - `alt: string` – Alternative text (required).
  - `width?: number | string` – Image width.
  - `height?: number | string` – Image height.
  - `objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'` (default:
    `'cover'`). `'none'` is a standard CSS `object-fit` value (renders the
    image at its intrinsic size, ignoring the container) — not to be confused
    with omitting the property.
  - `objectPosition?: string` – e.g., `'center'`, `'top'`.
  - `pcEntity?: string` – PlayCanvas entity with texture property.
  - `className?: string`.
  - `variant?: 'rounded' | 'circle' | 'thumbnail'` (default: `'rounded'`).
  - `onLoad?: () => void` – Fires when the currently resolved image (from
    `src`, or whichever candidate `srcSet`/`sizes` picks) finishes loading;
    re-fires if the browser re-resolves `srcSet` to a different candidate
    (e.g., after a viewport/DPR change) and that candidate finishes loading.
  - `onError?: () => void` – Fires if the resolved image — from `src` or any
    `srcSet` candidate the browser selects — fails to load; does not
    differentiate which candidate failed.
  - `fallback?: string` – Fallback image URL.
  - `placeholder?: string` – Placeholder image URL (blur-up).
  - `lazy?: boolean | 'lazy' | 'eager'` – Native lazy loading (default: `'lazy'`
    if true).
  - `srcSet?: string` – For responsive images.
  - `sizes?: string`.
  - `decoding?: 'sync' | 'async' | 'auto'` (default: `'async'`).
  - `role?: string` – ARIA role (default: `'img'`).
  - `crossOrigin?: 'anonymous' | 'use-credentials' | ''` – CORS setting.
  - `referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`
    – Referrer policy (native `ReferrerPolicy` values).
  - `onLoadStart?: () => void` – Called when loading starts.
  - `blurDataURL?: string` – Base64 blur-up placeholder shown behind the image
    until it loads, similar to `@next/image`'s `placeholder="blur"` pattern —
    generate a small (e.g., 10px-wide) base64-encoded thumbnail at build time
    and pass it here rather than computing it at runtime.
  - `priority?: boolean` – Mark as LCP priority (adds `fetchpriority="high"`).
    For cross-origin images, also add a `<link rel="preconnect">` (and
    ideally `<link rel="preload" as="image">`) for the image's domain in the
    document head — `priority` alone does not establish an early connection.
- **State:** `isLoaded`, `error`.
- **Events:** `onLoad`, `onError`, `onLoadStart`.
- **Variants:** `rounded`, `circle`, `thumbnail` (via `variant` prop).
- **PlayCanvas Integration:** Can set PlayCanvas texture via `useTextureSync`.
- **Tailwind/UI Behavior:** `w-{width}`, `h-{height}`, `object-{fit}`,
  `object-{position}`, `rounded-*`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `alt` text required; `role="img"`. For purely decorative
  images (no informational content — e.g., background flourishes), pass
  `alt=""` (empty string, not omitted) so screen readers skip it; `alt` stays
  a required prop specifically to force this to be a deliberate choice rather
  than an oversight.
- **Rebuild Notes:** Use native img element with fallback support; implement
  lazy loading for performance.

---

### Component: Tabs

- **Purpose:** Tab navigation for grouping content.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `tabs: { id: string, label: string, content: ReactNode, disabled?: boolean, lazy?: boolean, closable?: boolean }[]`
    – Tab definitions. `lazy` (default: inherits `mountOnEnter`) defers
    mounting that individual tab's `content` until first selected, overriding
    the component-level `mountOnEnter` per tab. `closable` shows a close
    affordance on that tab (see `canClose`/`onTabClose`).
  - `activeTab?: string` – Currently active tab ID (controlled).
  - `defaultTab?: string` – Initial active tab ID for uncontrolled mode
    (ignored if `activeTab` is provided; defaults to the first non-disabled
    tab if omitted).
  - `onChange?: (id: string) => void` – Tab change handler.
  - `onTabChange?: (id: string) => void` – Alias for `onChange`; identical
    signature, fires alongside it.
  - `canClose?: boolean` – Globally enables the close affordance on all tabs
    (overridden per-tab by `tabs[].closable` when set).
  - `onTabClose?: (id: string) => void` – Called when a tab's close button is
    activated; the caller is responsible for removing it from `tabs`.
  - `orientation?: 'horizontal' | 'vertical'` (default: `'horizontal'`) –
    Also sets `aria-orientation` on the underlying `role="tablist"` element
    (this wiring is automatic; there's no separate prop needed to propagate
    it to ARIA).
  - `className?: string`.
  - `variant?: 'default' | 'pills' | 'underline'` (default: `'default'`).
  - `mountOnEnter?: boolean` – Only mount tab panel when selected (default:
    `true`).
  - `unmountOnExit?: boolean` – Unmount tab panel when not selected (default:
    `true`).
  - `tabPanelClassName?: string` – Additional classes for panel.
  - `aria-label?: string`.
  - `tabListClassName?: string` – Additional classes for the tab list.
  - `tabClassName?: string` – Additional classes for individual tabs.
  - `panelClassName?: string` – Additional classes for panels.
  - `onTabFocus?: (id: string) => void` – Called when a tab receives focus.
- **State:** `activeTab`.
- **Events:** `onChange`, `onTabChange`, `onTabFocus`, `onTabClose`.
- **Variants:** `default`, `pills`, `underline` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `flex`, `border-b`, `gap-2`, active `bg-primary`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@radix-ui/react-tabs`.
- **Composition:** Composes `Box`, `Button`, `Text`.
- **Accessibility:** `role="tablist"`, `aria-selected`, `aria-orientation`,
  keyboard arrow navigation.
- **Rebuild Notes:** Use Radix Tabs for accessibility; used in Settings,
  DevTools.

---

### Component: TreeView

- **Purpose:** Hierarchical tree view with expand/collapse.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `data: TreeNode<T = unknown>[]` where
    `TreeNode<T> = { id: string, label: string, children?: TreeNode<T>[], icon?: ReactNode, disabled?: boolean, isLoading?: boolean, data?: T }`
    – `TreeNode` is generic over an optional `data` payload so consumers can
    attach custom node data (e.g., an entity reference) with type safety
    instead of stuffing it into `id`/`label`.
  - `expanded?: string[]` – Array of expanded node IDs; each entry must match
    a `TreeNode.id` in `data` (no runtime cross-check is performed — an ID
    that doesn't exist in the tree is silently ignored).
  - `defaultExpanded?: string[]` – Initial expanded node IDs for uncontrolled
    mode (ignored if `expanded` is provided).
  - `onToggle?: (id: string) => void` – Toggle handler.
  - `onSelect?: (id: string) => void` – Selection handler (updates
    `selected`).
  - `onItemClick?: (id: string, node: TreeNode) => void` – Fired on any click
    on a node row, independent of selection logic (`onSelect` only fires when
    selection actually changes).
  - `onItemDoubleClick?: (id: string, node: TreeNode) => void` – Double-click
    handler for a node row.
  - `onItemContextMenu?: (e: React.MouseEvent, id: string, node: TreeNode) => void`
    – Right-click handler for a node row.
  - `selected?: string` – Selected node ID.
  - `className?: string`.
  - `variant?: 'default' | 'compact' | 'with-icons'` (default: `'default'`).
  - `aria-label?: string`.
  - `virtualization?: boolean` – Enable virtualization for large trees (default:
    `true` when >1000 nodes; otherwise `false`).
  - `onExpand?: (id: string) => void` – Called when a node expands.
  - `onCollapse?: (id: string) => void` – Called when a node collapses.
  - `multiSelect?: boolean` – Allow multiple selection (default: `false`).
  - `renderItem?: (node: TreeNode, props: { depth: number, expanded: boolean, selected: boolean }) => ReactNode`
    – Custom rendering for each node.
  - `onDragDrop?: (sourceId: string, targetId: string) => void` – Drag-drop
    reorder callback.
  - `filter?: string` – Filter text to highlight matching nodes.
  - `loadChildren?: (id: string) => Promise<TreeNode[]>` – Lazy load children.
  - `onLoadChildren?: (id: string, children: TreeNode[]) => void` – Fired
    after `loadChildren`'s promise resolves, with the loaded children; use
    this to react to lazy-load completion without threading state through
    `loadChildren` itself.
  - `expandAll?: () => void` – Expand all nodes.
  - `collapseAll?: () => void` – Collapse all nodes.
- **State:** `expanded`, `selected`.
- **Events:** `onToggle`, `onSelect`, `onExpand`, `onCollapse`, `onDragDrop`,
  `onItemClick`, `onItemDoubleClick`, `onItemContextMenu`, `onLoadChildren`.
- **Variants:** `default`, `compact`, `with-icons` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `pl-4`, `border-l`, `hover:bg-gray-700`, selected
  `bg-gray-700`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Button`, `Icon`, `Text`.
- **Accessibility:** `role="tree"`, `role="treeitem"`, `aria-level` (1-indexed
  depth of the node within the tree — a root-level node is `aria-level="1"`),
  `aria-expanded`, `aria-controls`, keyboard arrow navigation.
- **Rebuild Notes:** Used in Inspector; supports lazy loading. Enable
  virtualization for trees with >1000 nodes; without virtualization, performance
  degrades with large datasets.

---

### Component: Overlay

- **Purpose:** Semi‑transparent overlay for modals and dialogs.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `isOpen: boolean` – Overlay visibility.
  - `onClick?: () => void` – Click handler (usually close).
  - `onOpen?: () => void` – Called when the overlay transitions to open.
  - `onClose?: () => void` – Called when the overlay transitions to closed
    (preferred over inferring closure from `onClick`).
  - `onOpenChange?: (open: boolean) => void` – Called with the new open state
    on any transition; convenient for controlled usage.
  - `onOverlayClick?: (e: React.MouseEvent) => void` – Fired specifically for
    a click on the overlay backdrop itself (as opposed to `onClick`, which is
    the general-purpose handler usually wired to close).
  - `onEscape?: (e: KeyboardEvent) => void` – Called when Escape is pressed
    while the overlay is open.
  - `className?: string`.
  - `children?: ReactNode` – Content to overlay.
  - `variant?: 'dark' | 'blur' | 'transparent'` (default: `'dark'`).
  - `zIndex?: number` – Override z-index (default: `40`).
  - `transitionDuration?: number` – Fade duration in ms (default: `200`).
  - `aria-label?: string`.
  - `onTransitionStart?: () => void` – Called when transition starts.
  - `onTransitionEnd?: () => void` – Called when transition ends.
  - `portal?: boolean` – Render in a portal (default: `true`).
- **State:** `isOpen`.
- **Events:** `onClick`, `onOpen`, `onClose`, `onOpenChange`, `onOverlayClick`,
  `onEscape`, `onTransitionStart`, `onTransitionEnd`.
- **Variants:** `dark`, `blur`, `transparent` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `fixed inset-0 z-40 bg-black/50 backdrop-blur-sm`;
  variants adjust background. Respects `prefers-reduced-motion: reduce` — the
  fade transition (`transitionDuration`) is skipped/instant for users with
  that preference set, consistent with the `A11y` component's `reducedMotion`
  handling.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `aria-hidden="true"` when closed; `aria-modal="true"`
  when open (paired with focus trapping in consumers like `Modal`); click
  outside to close.
- **Rebuild Notes:** Used by Modal; click to close.

---

### Component: Joystick

- **Purpose:** Touch joystick for mobile controls.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `size?: number` – Joystick size in pixels (default: `120`).
  - `deadzone?: number` – Deadzone threshold (0–1, default: `0.1`). Normalized
    values below threshold are clamped to zero.
  - `onMove?: (x: number, y: number) => void` – Movement handler (normalized -1
    to 1, with deadzone applied).
  - `onStart?: () => void` – Touch start handler.
  - `onEnd?: () => void` – Touch end handler.
  - `className?: string`.
  - `variant?: 'default' | 'mini' | 'with-border'` (default: `'default'`).
  - `aria-label?: string`.
  - `disabled?: boolean`.
  - `invertX?: boolean` – Invert horizontal axis.
  - `invertY?: boolean` – Invert vertical axis.
  - `returnToCenter?: boolean` – Return knob to center on release (default:
    `true`).
  - `touchAction?: 'auto' | 'none' | 'pan-x' | 'pan-y'` – CSS touch-action
    (default: `'none'`).
  - `axisLock?: 'x' | 'y' | null` – Lock movement to a single axis.
  - `sensitivity?: number` – Sensitivity multiplier (default: `1`).
  - `onDirectionChange?: (direction: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | null) => void`
    – Called when 8-directional output changes (4 cardinal + 4 diagonal
    directions, or `null` when centered/within the deadzone).
  - `onAngleChange?: (angleDegrees: number) => void` – Called when the stick
    angle changes, in degrees (`0`–`360`, `0` = right, counter-clockwise).
  - `onMagnitudeChange?: (magnitude: number) => void` – Called when the stick
    displacement magnitude changes (`0`–`1`, post-deadzone).
  - `onDrag?: (x: number, y: number) => void` – Called continuously during a
    drag operation, mirroring `onMove` but named for parity with drag-based
    consumers.
  - `onDragStart?: () => void` – Called when a drag operation begins (fires
    alongside `onStart`).
  - `onDragEnd?: () => void` – Called when a drag operation ends (fires
    alongside `onEnd`).
- **State:** `isActive`, `position`.
- **Events:** `onMove`, `onStart`, `onEnd`, `onDirectionChange`,
  `onAngleChange`, `onMagnitudeChange`, `onDrag`, `onDragStart`, `onDragEnd`.
- **Variants:** `default`, `mini`, `with-border` (via `variant` prop).
- **PlayCanvas Integration:** Sends movement via `useTouchBridge`.
- **Tailwind/UI Behavior:** `rounded-full`, `bg-white/20`, `touch-none`, inner
  knob.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@use-gesture/react@^10`.
- **Composition:** Composes `Box`.
- **Accessibility:** `role="slider"`, `aria-label="Joystick"`, `aria-valuenow`
  (current position magnitude), `aria-valuemin="0"`, `aria-valuemax="1"`.
- **Rebuild Notes:** Used in Touch component; supports multi-touch.

---

### Component: RadioGroup

- **Purpose:** Group of mutually exclusive options, distinct from `Select`'s
  dropdown and `Toggle`'s binary switch.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `options: { label: string, value: string | number, disabled?: boolean }[]`
    – Options.
  - `value: string | number | null` – Selected value.
  - `onChange: (value: string | number) => void`.
  - `name?: string` – Radio group name (groups native inputs).
  - `pcEntity?: string` – PlayCanvas setting key.
  - `orientation?: 'horizontal' | 'vertical'` (default: `'vertical'`).
  - `variant?: 'default' | 'button-group' | 'card'` (default: `'default'`).
  - `disabled?: boolean` – Disable entire group.
  - `className?: string`.
  - `aria-label?: string`.
  - `onFocus?: (e: React.FocusEvent) => void`.
  - `onBlur?: (e: React.FocusEvent) => void`.
- **State:** `value`, `focusedIndex`.
- **Events:** `onChange`, `onFocus`, `onBlur`.
- **Variants:** `default`, `button-group`, `card` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** `flex`, `flex-col`/`flex-row` (via `orientation`),
  `gap-2`; each option `w-4 h-4 rounded-full border-2`; checked
  `border-blue-500 bg-blue-500`.
- **Dependencies:** `react`, `@radix-ui/react-radio-group`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`, `Label`; uses Radix RadioGroup.
- **Accessibility:** `role="radiogroup"`, each option `role="radio"` with
  `aria-checked`; keyboard arrow keys move selection (native radio behavior);
  Tab enters/exits the group as one stop.
- **Rebuild Notes:** Use Radix RadioGroup for roving-tabindex keyboard
  behavior; replaces the removed `'radio-group'` variant on `Select`.

---

### Component: Badge

- **Purpose:** Small numeric/status indicator overlaid on icons or content
  (notification counts, item quantities, buff timers).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `content?: string | number` – Badge content; omit for a bare dot
    indicator.
  - `max?: number` – Caps numeric `content` display (e.g., `99` renders
    `"99+"` for values above it).
  - `variant?: 'solid' | 'outline' | 'dot'` (default: `'solid'`). `'dot'`
    ignores `content` and renders a plain indicator dot.
  - `color?: 'default' | 'success' | 'warning' | 'error' | 'info'` (default:
    `'default'`).
  - `size?: 'sm' | 'md' | 'lg'` (default: `'md'`).
  - `placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'`
    (default: `'top-right'`) – `'inline'` renders in normal flow instead of
    absolutely positioned over `children`.
  - `children?: ReactNode` – Element the badge is overlaid on; omit for a
    standalone/inline badge.
  - `pcEntity?: string` – PlayCanvas badge-source entity (e.g., a buff-timer
    script).
  - `className?: string`.
  - `aria-label?: string` – Accessible label, since numeric-only badges are
    otherwise ambiguous to screen readers (e.g., `"3 unread notifications"`).
  - `showZero?: boolean` – Render when `content` is `0` (default: `false`).
- **State:** `isVisible`.
- **Events:** None (purely presentational).
- **Variants:** `solid`, `outline`, `dot` (via `variant` prop).
- **PlayCanvas Integration:** Reads a numeric/status value via `useBadgeSync`
  if `pcEntity` is set.
- **Tailwind/UI Behavior:** `absolute`, `-top-1`, `-right-1`, `rounded-full`,
  `bg-red-500`, `text-white`, `text-xs`, `px-1.5`, `min-w-[1.25rem]`; `'dot'`
  variant `w-2 h-2 p-0`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box` and `Text`; wraps `children` in a `relative`
  container when `placement` is not `'inline'`.
- **Accessibility:** Purely visual by default (`aria-hidden="true"`) since the
  badge usually duplicates information already conveyed elsewhere (e.g., an
  inventory count); set `aria-label` explicitly when the badge is the only
  conveyor of that information.
- **Rebuild Notes:** Use for notification counts, item stack counts, and
  buff/debuff timers; compose with `Icon` for status glyphs.

---

### Component: Avatar

- **Purpose:** Circular (or square) portrait image with fallback initials and
  status indicator.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `src?: string` – Image URL.
  - `alt: string` – Alternative text (required, same rationale as `Image`'s
    `alt`).
  - `name?: string` – Display name used to derive fallback initials (e.g.,
    `"Ada Lovelace"` → `"AL"`) when `src` is missing or fails to load.
  - `fallback?: ReactNode` – Custom fallback content, overriding the
    derived-initials default.
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number` (default: `'md'`) –
    Named presets map to Tailwind scale; a `number` is raw pixels.
  - `variant?: 'circle' | 'rounded' | 'square'` (default: `'circle'`).
  - `status?: 'online' | 'offline' | 'away' | 'busy' | 'none'` (default:
    `'none'`) – Renders a small status dot.
  - `statusPosition?: 'top-right' | 'bottom-right'` (default: `'bottom-right'`).
  - `pcEntity?: string` – PlayCanvas entity providing a live portrait/status
    (e.g., a party member).
  - `className?: string`.
  - `onError?: () => void` – Fires if `src` fails to load, triggering the
    initials/fallback path.
  - `onClick?: () => void`.
- **State:** `hasError`, `isLoaded`.
- **Events:** `onError`, `onClick`.
- **Variants:** `circle`, `rounded`, `square` (via `variant` prop).
- **PlayCanvas Integration:** Reads portrait/status via `useAvatarSync` if
  `pcEntity`.
- **Tailwind/UI Behavior:** `rounded-full` (or `rounded-lg`/`rounded-none`),
  `w-{size} h-{size}`, `object-cover`, `bg-gray-700`, `text-white`, `flex
  items-center justify-center` for the initials fallback; status dot
  `absolute w-2.5 h-2.5 rounded-full ring-2 ring-gray-900`, colored per
  `status`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Image` for the `src` path and `Text` for the
  initials fallback.
- **Accessibility:** `role="img"`, `aria-label="${alt}"`; the status dot is
  decorative (`aria-hidden="true"`) unless `status` is otherwise unavailable
  to the user (e.g., pair with `aria-label` describing status when the avatar
  is the sole indicator).
- **Rebuild Notes:** Falls back to initials derived from `name` on image
  error; used for player/NPC portraits, party lists, and leaderboard rows.

---

### Component: Popover

- **Purpose:** Floating panel triggered by click (as opposed to
  `Tooltip`/`HoverCard`'s hover-only triggering) for menus, quick actions, or
  info panels.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `content: ReactNode` – Popover content.
  - `children: ReactNode` – Trigger element.
  - `isOpen?: boolean` – Controlled open state.
  - `defaultOpen?: boolean` – Initial open state for uncontrolled mode
    (ignored if `isOpen` is provided).
  - `onOpenChange?: (open: boolean) => void`.
  - `side?: 'top' | 'bottom' | 'left' | 'right'` (default: `'bottom'`).
  - `align?: 'start' | 'center' | 'end'` (default: `'center'`).
  - `trigger?: 'click' | 'manual'` (default: `'click'`) – `'manual'` disables
    the built-in click-to-toggle and relies entirely on
    `isOpen`/`onOpenChange`.
  - `closeOnOutsideClick?: boolean` (default: `true`).
  - `closeOnEscape?: boolean` (default: `true`).
  - `pcEntity?: string` – PlayCanvas popover entity.
  - `modal?: boolean` – Trap focus and block interaction outside while open
    (default: `false`).
  - `className?: string`.
  - `onOpen?: () => void`.
  - `onClose?: () => void`.
  - `aria-label?: string`.
  - `showArrow?: boolean` – Show arrow pointer (default: `true`).
- **State:** `isOpen`.
- **Events:** `onOpenChange`, `onOpen`, `onClose`.
- **Variants:** (placement via `side`/`align`).
- **PlayCanvas Integration:** Optional scene-triggered open via `useModalSync`
  if `pcEntity` is set.
- **Tailwind/UI Behavior:** `absolute`, `z-50`, `bg-gray-800`, `border`,
  `rounded-lg`, `shadow-xl`, `p-4`; `transform` for positioning.
- **Dependencies:** `react`, `@radix-ui/react-popover`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`; wraps trigger via `Slot`; uses `FocusTrap`
  when `modal` is `true`.
- **Accessibility:** `role="dialog"` (non-modal by default); `aria-expanded`
  on the trigger reflecting `isOpen`; `aria-haspopup="dialog"`; focus moves
  into the popover on open and returns to the trigger on close; Escape closes.
- **Rebuild Notes:** Uses Radix Popover; distinct from `ContextMenu`
  (right-click) and `Tooltip`/`HoverCard` (hover); use for click-triggered
  menus/panels.

---

### Component: Divider

- **Purpose:** Horizontal or vertical separator line, with an optional inline
  label.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `orientation?: 'horizontal' | 'vertical'` (default: `'horizontal'`).
  - `label?: ReactNode` – Optional content rendered inline on the divider
    (e.g., `"or"`).
  - `labelPosition?: 'start' | 'center' | 'end'` (default: `'center'`).
  - `variant?: 'solid' | 'dashed' | 'dotted'` (default: `'solid'`).
  - `color?: string` – Tailwind border-color class (default:
    `'border-gray-700'`).
  - `spacing?: 'sm' | 'md' | 'lg'` – Margin around the divider (default:
    `'md'`).
  - `className?: string`.
  - `role?: string` – ARIA role (default: `'separator'`).
  - `aria-orientation?: 'horizontal' | 'vertical'` – Mirrors `orientation`
    automatically; only needed if overriding.
- **State:** None.
- **Events:** None.
- **Variants:** `solid`, `dashed`, `dotted` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `border-t` (or `border-l` for vertical),
  `border-{color}`, `my-{spacing}` (or `mx-{spacing}`); with `label`, renders
  as a flex row with two border segments flanking the label.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box` and, when `label` is set, `Text`.
- **Accessibility:** `role="separator"`, `aria-orientation` matching
  `orientation`; purely decorative when unlabeled (no accessible name
  required).
- **Rebuild Notes:** Replaces ad-hoc `Box` border styling; use for section
  breaks in `Settings`, `Inventory` categories, and menus.

---

### Component: Accordion

- **Purpose:** Collapsible sections with a header and expandable content,
  generalizing the collapsible behavior already used ad hoc by `Objectives`.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: { id: string, header: ReactNode, content: ReactNode, disabled?: boolean }[]`
    – Accordion sections.
  - `type?: 'single' | 'multiple'` (default: `'single'`) – `'single'` allows
    only one section open at a time; `'multiple'` allows any number open
    simultaneously.
  - `expanded?: string[]` – Currently expanded section IDs (controlled).
  - `defaultExpanded?: string[]` – Initial expanded IDs for uncontrolled mode
    (ignored if `expanded` is provided).
  - `collapsible?: boolean` – In `type="single"` mode, allow closing the last
    open section entirely (default: `true`).
  - `onToggle?: (id: string) => void`.
  - `onChange?: (expanded: string[]) => void` – Called with the full
    expanded-ID list after any toggle.
  - `pcEntity?: string` – PlayCanvas accordion entity.
  - `variant?: 'default' | 'bordered' | 'ghost'` (default: `'default'`).
  - `className?: string`.
  - `aria-label?: string`.
  - `mountOnExpand?: boolean` – Only mount a section's `content` when first
    expanded (default: `false`, mirroring `Tabs`'s `mountOnEnter`).
- **State:** `expanded`.
- **Events:** `onToggle`, `onChange`.
- **Variants:** `default`, `bordered`, `ghost` (via `variant` prop).
- **PlayCanvas Integration:** Optional scene-driven expand/collapse via
  `useAccordionSync` if `pcEntity` is set.
- **Tailwind/UI Behavior:** `divide-y`, `divide-gray-700`; header `flex
  items-center justify-between p-3 hover:bg-gray-800`; content `p-3` with
  `grid-rows-[0fr]`/`grid-rows-[1fr]` transition for smooth height animation.
- **Dependencies:** `react`, `@radix-ui/react-accordion`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`, `Text`, `Icon` (chevron), `Button` (header
  trigger).
- **Accessibility:** Each header is a `Button` with
  `aria-expanded`/`aria-controls` pointing at its content panel
  (`role="region"`, `aria-labelledby` back at the header); keyboard
  Enter/Space toggles; arrow-key navigation between headers.
- **Rebuild Notes:** Uses Radix Accordion; generalizes `Objectives`'s
  per-section collapse; use for settings groups, FAQs, and inventory
  categories.

---

## Category: HUD

### Component: HUD

- **Purpose:** Root HUD overlay (fixed, world‑space, or screen‑space).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `position?: 'fixed' | 'world-space' | 'screen-space'` (default: `'fixed'`) –
    Positioning mode. `'world-space'` requires `pcCamera` to be set — without
    it, the HUD cannot compute a screen projection and falls back to
    `'fixed'` behavior at `(0, 0)`; this is not enforced at the type level, so
    pass `pcCamera` whenever `position="world-space"`.
  - `offset?: { x?: number, y?: number }` – Position offset (for `'fixed'`).
    Applied in the direction implied by `alignment` — e.g. with
    `alignment="top-right"`, a positive `offset.x` moves the HUD further
    left (inward from the right edge), not further right off-screen.
  - `alignment?: 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'`
    – Alignment within viewport (default: `'top-left'`).
  - `pcCamera?: string` – PlayCanvas camera entity ID for world projection.
  - `zIndex?: number` – Z-index for stacking (default: `10`).
  - `safeArea?: boolean` – Apply safe-area insets (default: `true`).
  - `className?: string`.
  - `children?: ReactNode`.
  - `onVisibilityChange?: (visible: boolean) => void`.
  - `onClickOutside?: () => void`.
  - `onOpen?: () => void` – Called when the HUD becomes visible.
  - `onClose?: () => void` – Called when the HUD becomes hidden.
  - `onToggle?: (visible: boolean) => void` – Called on any visibility toggle,
    with the resulting visibility.
  - `onMount?: () => void` – Called once after the HUD mounts.
  - `onUnmount?: () => void` – Called once before the HUD unmounts.
  - `aria-label?: string`.
  - `onResize?: (size: { width: number, height: number }) => void` – Called when
    HUD resizes.
  - `onRender?: () => void` – Called each frame (for performance monitoring).
  - `onUpdate?: (dt: number) => void` – Called each frame update with delta
    time in seconds; use for lightweight per-frame HUD logic that doesn't
    need a full render callback.
  - `transition?: boolean` – Enable smooth transitions for visibility changes.
- **State:** `isVisible`, `visibility`.
- **Events:** `onVisibilityChange`, `onClickOutside`, `onResize`, `onRender`,
  `onUpdate`, `onOpen`, `onClose`, `onToggle`, `onMount`, `onUnmount`.
- **Variants:** `fixed`, `world-space`, `screen-space` (via `position`).
- **PlayCanvas Integration:** Maps screen to world via `useCameraProjection` if
  `pcCamera`.
- **Tailwind/UI Behavior:** `fixed`, `inset-*`, `transform`, `translate`; `z-*`;
  `backdrop-blur`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box` and `Flex`; manages z-index stack via context.
- **Performance:** `onRender` and `onUpdate` fire every frame (up to display
  refresh rate); keep their handlers cheap (avoid allocations, state
  updates, or synchronous layout reads) or explicitly throttle/sample them
  (e.g., run heavier logic every Nth frame) to avoid frame drops.
- **Accessibility:** `role="region"` by default; consider a more specific
  role (e.g., `'toolbar'`, `'status'`) or a descriptive `aria-label` based on
  the HUD's actual content (health, inventory, objectives, etc.) rather than
  leaving the generic default — `role="region"` alone under-communicates
  purpose to screen reader users; `aria-hidden` when not visible.
- **Rebuild Notes:** Contains all HUD components; manages z-index stack; use
  `position` and `offset`.

---

### Component: Health

- **Purpose:** Player health indicator with smooth animations and PlayCanvas
  health sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `maxValue: number` – Maximum health value.
  - `currentValue: number` – Current health value.
  - `showText?: boolean` – Show numeric value.
  - `pcEntity?: string` – PlayCanvas health entity.
  - `color?: string` – Health bar color. Accepts any Tailwind background-color
    class, not just the default — pass a dynamic value (e.g., computed from
    current percentage, such as green above 50%, yellow above 25%, red below)
    to reflect health state; default: `'bg-red-500'`.
  - `animated?: boolean` – Enable smooth animations (default: `true`).
  - `variant?: 'horizontal' | 'vertical' | 'circular' | 'segmented'` (default:
    `'horizontal'`).
  - `segments?: number` – Number of segments for `segmented` variant (default:
    `10`).
  - `lowThreshold?: number` – Value below which health appears low (default:
    `0.25 * maxValue`, which may be fractional, e.g. `25` for `maxValue={100}`
    or `12.5` for `maxValue={50}` — compared directly against `currentValue`
    without rounding).
  - `animationDuration?: number` – Duration in ms (default: `300`).
  - `className?: string`.
  - `onValueChange?: (value: number) => void`.
  - `onMaxValueChange?: (maxValue: number) => void` – Called when `maxValue`
    itself changes (e.g., a max-health upgrade), separate from
    `onValueChange` for `currentValue`.
  - `onEmpty?: () => void`.
  - `onMax?: () => void`.
  - `aria-label?: string`.
  - `onLow?: () => void` – Called when health drops below `lowThreshold`.
  - `onLowThresholdChange?: (threshold: number) => void` – Called when
    `lowThreshold` changes (e.g., recomputed after a `maxValue` change).
  - `onCritical?: () => void` – Called when health is near zero (e.g., <= 10%).
  - `onCriticalThresholdChange?: (threshold: number) => void` – Called when
    the critical threshold changes.
  - `onHeal?: (amount: number) => void` – Called when `currentValue` increases
    from its previous value, with the delta.
  - `onDamage?: (amount: number) => void` – Called when `currentValue`
    decreases from its previous value, with the delta.
  - `showIcon?: boolean` – Show a heart/stamina icon.
  - `flashOnLow?: boolean` – Flash the bar when low (default: `true`).
- **State:** `value`, `isAnimated`.
- **Events:** `onValueChange`, `onMaxValueChange`, `onEmpty`, `onMax`, `onLow`,
  `onLowThresholdChange`, `onCritical`, `onCriticalThresholdChange`, `onHeal`,
  `onDamage`.
- **Variants:** `horizontal`, `vertical`, `circular`, `segmented` (via `variant`
  prop).
- **PlayCanvas Integration:** Bidirectional sync via `useHealthSync`.
- **Tailwind/UI Behavior:** `bg-{color}`, `w-full`, `h-*`, `rounded-*`,
  `transition-all` with `duration-300`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useAnimation`.
- **Composition:** Composes `Box`, `Text`, and `Progress`.
- **Performance:** `animated` drives `useAnimation`'s
  `requestAnimationFrame`-based tweening; under sustained frame drops (heavy
  scene load), the tween duration can visually stretch beyond
  `animationDuration` since it's frame-driven rather than time-guaranteed —
  for health bars where exact timing matters (e.g., synced to a hit-flash),
  consider `animated={false}` and driving the value directly.
- **Accessibility:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax`; `aria-live="polite"` normally, switched to
  `aria-live="assertive"` while health is at or below the critical threshold
  (`onCritical`) so urgent drops interrupt the screen reader immediately.
- **Rebuild Notes:** Uses `useAnimation` for smooth transitions; can be used for
  player or enemy health.

---

### Component: Energy

- **Purpose:** Secondary resource indicator (stamina, mana, etc.) with
  customizable color.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `maxValue: number` – Maximum energy value.
  - `currentValue: number` – Current energy value.
  - `showText?: boolean` – Show numeric value.
  - `pcEntity?: string` – PlayCanvas energy entity.
  - `color?: string` – Energy bar color (Tailwind color class, default:
    `'bg-blue-500'`).
  - `animated?: boolean` – Enable smooth animations (default: `true`).
  - `variant?: 'horizontal' | 'vertical' | 'circular' | 'segmented'` (default:
    `'horizontal'`).
  - `segments?: number` – Number of segments for `segmented` variant (default:
    `10`).
  - `animationDuration?: number` – Duration in ms (default: `300`).
  - `className?: string`.
  - `onValueChange?: (value: number) => void` – Called on any change to
    `currentValue`, regardless of cause (manual set, spend, or regen). This
    does not conflict with `onRegen`: `onValueChange` is the general-purpose
    change handler, while `onRegen` fires specifically for automatic
    regeneration ticks — both fire together during regen, so use whichever
    matches your use case (or both).
  - `onEmpty?: () => void`.
  - `onMax?: () => void`.
  - `onDeplete?: (amount: number) => void` – Called when `currentValue`
    decreases (spend), with the amount spent — the energy-specific
    counterpart to `Health`'s `onDamage`.
  - `aria-label?: string`.
  - `onRegen?: (value: number) => void` – Called on each regeneration tick
    with the new value, while `regenRate` is active.
  - `onRegenStart?: () => void` – Called when automatic regeneration begins
    (e.g., after energy is spent and the regen delay elapses).
  - `onRegenStop?: () => void` – Called when automatic regeneration stops
    (energy reaches `maxValue`, or regen is otherwise interrupted).
  - `regenRate?: number` – Automatic regeneration rate per second (if
    supported). When set, `Energy` regenerates `currentValue` toward
    `maxValue` at this rate once regeneration is active (see
    `onRegenStart`/`onRegenStop`); regeneration pauses while `currentValue`
    is being actively depleted and resumes after a brief delay.
- **State:** `value`, `isAnimated`.
- **Events:** `onValueChange`, `onEmpty`, `onMax`, `onDeplete`, `onRegen`,
  `onRegenStart`, `onRegenStop`.
- **Variants:** `horizontal`, `vertical`, `circular`, `segmented` (via `variant`
  prop).
- **PlayCanvas Integration:** Syncs via `useEnergySync`.
- **Tailwind/UI Behavior:** Same as `Health` but with custom color.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Extends `Progress` for rendering (bar, fill, sizing) –
  composes `Progress` directly, not `Health`, to avoid duplication. Note:
  `onEmpty`/`onMax`/`onDeplete`/`onRegen*` are `Energy`-specific additions
  layered on top, not inherited from `Progress` (which only has `onChange`,
  `onValueChange`, `onComplete`, `onMaxReached`, and `onMinReached`).
- **Accessibility:** Same as `Health`.
- **Rebuild Notes:** Use for stamina, mana, or secondary resources; extends
  `Progress` with custom colors.

---

### Component: Crosshair

- **Purpose:** Center reticle for interaction targeting, with raycaster support.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `type?: 'dot' | 'cross' | 'circle' | 'custom'` (default: `'cross'`). When
    `type="custom"`, provide `render` for the crosshair's visual content.
  - `render?: (state: { isHovering: boolean, isInteractable: boolean }) => ReactNode`
    – Custom render function used when `type="custom"`; receives current
    hover/interactable state to drive its own styling.
  - `color?: string` – Crosshair color (default: `'white'`).
  - `size?: number` – Crosshair size in pixels (default: `24`).
  - `pcEntity?: string` – PlayCanvas entity with raycaster component.
  - `className?: string`.
  - `aria-label?: string`.
  - `onTargetChange?: (target: { entity: any, distance: number } | null) => void`
    – Target change handler; fires on every target transition (acquired,
    changed, or cleared).
  - `onTargetEnter?: (target: { entity: any, distance: number }) => void` –
    Called when a target is first acquired (transition from no target to a
    target); a subset of `onTargetChange`.
  - `onTargetLeave?: () => void` – Called when the current target is lost
    (transition from a target to no target); a subset of `onTargetChange`.
  - `onInteract?: (target: { entity: any, distance: number } | null) => void`
    – Interaction handler (e.g., click), receiving the currently targeted
    entity (or `null` if none).
  - `throttleRate?: number` – Raycast throttle rate in ms (default: `33`,
    i.e. ~30Hz). Lower values (e.g., `16` for ~60Hz) give more responsive
    target detection at higher CPU cost; raise it (e.g., `50`–`100`) on
    lower-end devices or scenes with expensive raycast targets to reduce
    per-frame cost.
  - `raycastMask?: number` – Collision mask for raycast.
  - `showInteractionFeedback?: boolean` – Show visual feedback when target is
    interactable (default: `true`).
  - `showHitIndicator?: boolean` – Show hit effect on target (default: `true`).
  - `interactionRadius?: number` – Max distance for interaction.
  - `colorHover?: string` – Color when hovering an interactable target.
  - `onHoverStart?: (target: any) => void` – Called when hover starts.
  - `onHoverEnd?: () => void` – Called when hover ends.
- **State:** `isHovering`, `isInteractable`.
- **Events:** `onTargetChange`, `onTargetEnter`, `onTargetLeave`, `onInteract`,
  `onHoverStart`, `onHoverEnd`.
- **Variants:** `dot`, `cross`, `circle`, `custom` (via `type` prop).
- **PlayCanvas Integration:** Uses `useRaycaster` to detect hovered entity;
  sends interaction events. **Performance:** Raycaster runs every frame (gated
  by `throttleRate`); each raycast walks the scene's collidable entities, so
  in dense scenes prefer a higher `throttleRate` or a tighter `raycastMask`
  over lowering it further; default throttle to 30Hz (33ms).
- **Tailwind/UI Behavior:** `absolute`, `top-1/2`, `left-1/2`,
  `transform -translate-1/2`; `pointer-events-none`; color via `border-{color}`
  or `stroke-{color}`.
- **Dependencies:** `react`, `lucide-react` or custom SVG, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box` and `Icon`.
- **Accessibility:** `role="none"` (decorative — the crosshair is a purely
  visual aim indicator with `pointer-events-none` and conveys no information
  beyond what gameplay feedback already provides); non-interactive. Only use
  `role="img"` with a meaningful `aria-label` if a custom `render` makes the
  crosshair convey information not otherwise exposed (e.g., a status icon).
- **Rebuild Notes:** Updates via `requestAnimationFrame`; centered and
  unclickable.

---

### Component: Compass

- **Purpose:** Direction indicator with objective markers and player heading.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas player entity.
  - `markers?: { id: string, label: string, position: { x: number, y: number, z: number } }[]`
    – Objective markers. `position` is a PlayCanvas **world-space** coordinate
    (matching `pc.Vec3`'s `{x, y, z}` shape, in scene units) — not a
    screen-space pixel position; the compass projects it relative to the
    player entity's heading internally.
  - `headingOffset?: number` – Heading offset in degrees (default: `0`).
  - `className?: string`.
  - `variant?: 'circular' | 'horizontal' | 'minimal'` (default: `'horizontal'`).
    `'horizontal'` is a linear strip that scrolls left/right as the player
    turns (like a flight-sim heading tape); `'circular'` is a rotating dial
    (like a compass rose) — despite the name, `'circular'` still displays
    "horizontal" heading (0–360°) information, just laid out radially instead
    of linearly. `'minimal'` shows only the current heading value/marker
    without the strip or dial chrome.
  - `onMarkerSelect?: (id: string) => void` – Called when a marker is
    activated (click or Enter/Space on a focused marker).
  - `onMarkerClick?: (id: string) => void` – Alias for `onMarkerSelect`,
    named for parity with other components' `onClick`-style handlers;
    identical signature, fires alongside it.
  - `onMarkerHover?: (id: string) => void` – Called when a marker gains
    hover/focus.
  - `onMarkerLeave?: (id: string) => void` – Called when a marker loses
    hover/focus.
  - `onHeadingChange?: (heading: number) => void`.
  - `onNorthClick?: () => void` – Called when the north indicator is
    activated (e.g., to snap camera/heading to north).
  - `onHeadingLock?: (locked: boolean) => void` – Called when heading lock is
    toggled (freezes the displayed heading independent of player rotation).
  - `aria-label?: string`.
  - `showLabels?: boolean` – Show marker labels (default: `true`).
  - `showDistance?: boolean` – Show distance to markers (default: `false`).
  - `onHeadingStart?: () => void` – Called when player starts rotating.
  - `onHeadingEnd?: () => void` – Called when player stops rotating.
  - `showNorthIndicator?: boolean` – Show a north indicator (default: `true`).
  - `customNorthIcon?: ReactNode` – Custom north indicator element.
- **State:** `heading`, `activeMarkers`.
- **Events:** `onMarkerSelect`, `onMarkerClick`, `onMarkerHover`,
  `onMarkerLeave`, `onHeadingChange`, `onHeadingStart`, `onHeadingEnd`,
  `onNorthClick`, `onHeadingLock`.
- **Variants:** `circular`, `horizontal`, `minimal` (via `variant` prop).
- **PlayCanvas Integration:** Reads player rotation via `usePlayerRotation`;
  syncs marker positions. **Performance:** Recomputes on every player
  transform change, which can be as often as every frame during continuous
  rotation; throttle `usePlayerRotation`'s update rate (or wrap heading
  updates in a `requestAnimationFrame`/interval sampler) if profiling shows
  the compass contributing to frame time, similar to `Crosshair`'s
  `throttleRate` pattern.
- **Tailwind/UI Behavior:** `rounded-full`, `border-2`, `shadow-lg`;
  `transform: rotate`; markers positioned via `absolute` with `calc`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`, `Button`.
- **Accessibility:** `role="img"`, `aria-label="Compass"`; markers keyboard
  navigable; `aria-label` for each marker.
- **Rebuild Notes:** Updates on PC transform changes; use `useMemo` for angle
  calculations.

---

### Component: Minimap

- **Purpose:** 2D overhead view of the player's surroundings with position,
  heading, and markers — distinct from `Compass`, which is directional-only.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas player entity.
  - `pcCamera?: string` – PlayCanvas top-down/orthographic camera entity used
    to render the minimap texture.
  - `markers?: { id: string, label?: string, position: { x: number, y: number, z: number }, icon?: ReactNode, color?: string }[]`
    – World-space markers (objectives, NPCs, points of interest).
  - `zoom?: number` – Zoom level / world-units-per-pixel (default: `1`).
  - `rotateWithPlayer?: boolean` – Rotate the map so "up" always matches
    player heading, vs. a fixed north-up map (default: `false`).
  - `shape?: 'square' | 'circle'` (default: `'circle'`).
  - `size?: number` – Diameter/side length in pixels (default: `160`).
  - `variant?: 'corner' | 'fullscreen' | 'minimal'` (default: `'corner'`).
    `'fullscreen'` is the expanded map view (e.g., toggled with a keybind);
    `'minimal'` hides markers/labels, showing only the player dot and
    terrain.
  - `className?: string`.
  - `onMarkerClick?: (id: string) => void`.
  - `onMarkerHover?: (id: string | null) => void`.
  - `onZoomChange?: (zoom: number) => void`.
  - `onToggleFullscreen?: () => void` – Called when switching between
    `'corner'` and `'fullscreen'`.
  - `aria-label?: string`.
  - `showPlayerHeading?: boolean` – Show a heading cone/arrow on the player
    dot (default: `true`).
  - `fogOfWar?: boolean` – Only reveal explored areas (default: `false`).
- **State:** `zoom`, `isFullscreen`, `revealedAreas`.
- **Events:** `onMarkerClick`, `onMarkerHover`, `onZoomChange`,
  `onToggleFullscreen`.
- **Variants:** `corner`, `fullscreen`, `minimal` (via `variant` prop).
- **PlayCanvas Integration:** Renders the top-down `pcCamera`'s output via
  `useMinimapSync`; projects `markers`' world positions onto the 2D map the
  same way `Compass` projects heading. **Performance:** Rendering a live
  top-down camera view every frame is comparatively expensive — throttle the
  render-to-texture update rate (e.g., 10–15Hz) rather than every frame,
  especially for the small `'corner'` variant where visual fidelity loss is
  imperceptible.
- **Tailwind/UI Behavior:** `rounded-full` (or `rounded-lg` for `'square'`),
  `border-2`, `border-gray-700`, `overflow-hidden`, `bg-black/60`; markers
  `absolute` positioned via `calc`; player dot centered, fixed.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon` (markers), `Button` (fullscreen
  toggle).
- **Accessibility:** `role="img"`, `aria-label="Minimap"`; markers are
  keyboard-navigable buttons with their own `aria-label` when
  `onMarkerClick` is set; purely visual position/heading is not itself
  conveyed to screen readers (pair with `Objectives`/`Compass` text for
  that).
- **Rebuild Notes:** Distinct from `Compass` (heading-only); typically
  rendered as a corner HUD element with a fullscreen expand action.

---

### Component: AmmoIndicator

- **Purpose:** Displays current weapon ammunition (magazine and reserve) with
  icon and reload feedback.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `current: number` – Rounds in the current magazine.
  - `magazineSize: number` – Magazine capacity.
  - `reserve?: number` – Rounds held in reserve (omit if the weapon has no
    reserve pool, e.g. infinite/energy weapons).
  - `pcEntity?: string` – PlayCanvas weapon entity.
  - `icon?: string` – Icon name for the ammo type (default derived from
    `weaponType` if provided).
  - `weaponType?: string` – Label/icon hint (e.g., `'pistol'`, `'rifle'`).
  - `isReloading?: boolean` – Show reload animation/progress.
  - `reloadProgress?: number` – `0`–`1` reload completion, used when
    `isReloading` is `true`.
  - `variant?: 'numeric' | 'bar' | 'bullets'` (default: `'numeric'`).
    `'bullets'` renders `magazineSize` individual pips, filled up to
    `current` (best suited to small magazine sizes).
  - `className?: string`.
  - `onEmpty?: () => void` – Called when `current` reaches `0`.
  - `onReloadStart?: () => void`.
  - `onReloadComplete?: () => void`.
  - `onLowAmmo?: () => void` – Called when `current` drops at or below
    `lowAmmoThreshold`.
  - `lowAmmoThreshold?: number` – Fraction of `magazineSize` considered low
    (default: `0.25`).
  - `aria-label?: string`.
- **State:** `current`, `isReloading`, `reloadProgress`.
- **Events:** `onEmpty`, `onReloadStart`, `onReloadComplete`, `onLowAmmo`.
- **Variants:** `numeric`, `bar`, `bullets` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useAmmoSync`.
- **Tailwind/UI Behavior:** `flex`, `items-center`, `gap-1`, `font-mono`,
  `text-xl`; low-ammo state `text-red-500` and pulses; `'bullets'` variant
  renders small `w-1.5 h-3 rounded-sm` pips.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`, `Progress` (for
  `isReloading`).
- **Accessibility:** `role="status"`, `aria-label` defaulting to
  `"${current} of ${magazineSize} rounds"` (with reserve appended when
  present); `aria-live="polite"`, but only announced on reload/empty/low-ammo
  transitions rather than every shot, to avoid spamming screen readers during
  rapid fire.
- **Rebuild Notes:** Update `current` per shot from the weapon script; drive
  `isReloading`/`reloadProgress` from the reload action.

---

### Component: InteractionPrompt

- **Purpose:** Contextual UI showing the currently available interaction
  (e.g., "Press E to talk"), complementing `Crosshair`'s target detection
  with an actual on-screen prompt.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `target?: { entity: any, label: string, keyHint?: string, holdDuration?: number } | null`
    – The current interactable target; `null` hides the prompt. Typically fed
    from `Crosshair`'s `onTargetChange`.
  - `pcEntity?: string` – PlayCanvas entity providing the prompt (alternative
    to wiring `target` manually from `Crosshair`).
  - `keyHint?: string` – Override the key/button glyph shown (e.g., `'E'`,
    `'F'`); falls back to `target.keyHint`.
  - `holdDuration?: number` – If set, renders a fill/progress ring for a
    hold-to-interact action instead of a tap prompt; falls back to
    `target.holdDuration`.
  - `holdProgress?: number` – Current `0`–`1` hold progress (only relevant
    when `holdDuration` is set).
  - `variant?: 'default' | 'compact' | 'radial'` (default: `'default'`).
    `'radial'` renders the hold progress as a ring around the key glyph
    rather than a separate bar.
  - `position?: 'center' | 'below-crosshair'` (default: `'below-crosshair'`).
  - `className?: string`.
  - `onInteract?: () => void` – Called on activation (tap, or hold
    completion).
  - `onHoldStart?: () => void`.
  - `onHoldCancel?: () => void` – Called if a hold is released before
    `holdDuration` completes.
  - `aria-label?: string`.
  - `fadeDuration?: number` – Show/hide transition duration in ms (default:
    `150`).
- **State:** `isVisible`, `holdProgress`.
- **Events:** `onInteract`, `onHoldStart`, `onHoldCancel`.
- **Variants:** `default`, `compact`, `radial` (via `variant` prop).
- **PlayCanvas Integration:** Typically driven by `Crosshair`'s
  `onTargetChange`/`onInteract`; can also read directly via
  `useInteractionPromptSync` if `pcEntity` is set.
- **Tailwind/UI Behavior:** `absolute`, `left-1/2`, `-translate-x-1/2`,
  `bg-black/70`, `text-white`, `px-3 py-1.5 rounded-full`, `flex items-center
  gap-2`; key glyph `w-6 h-6 rounded border bg-gray-800 text-center`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Progress` (hold ring).
- **Accessibility:** `role="status"`, `aria-live="polite"`, `aria-label`
  defaulting to `"${label}, press ${keyHint}"`; purely supplementary to
  gameplay (not the primary way non-visual players would identify
  interactables, so pair with a broader accessible-interaction strategy if
  targeting screen-reader play).
- **Rebuild Notes:** Wire to `Crosshair`'s target events; supports both tap
  and hold-to-interact patterns.

---

### Component: DamageNumbers

- **Purpose:** Floating text that animates outward/upward when health or
  other tracked values change, giving immediate combat feedback.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity to anchor spawned numbers to
    (typically the damaged entity, projected to screen space via
    `useCameraProjection`).
  - `events?: { id: string, amount: number, type: 'damage' | 'heal' | 'critical' | 'miss', position?: { x: number, y: number, z: number } }[]`
    – Queue of number events to render; each is removed automatically after
    its animation completes (see `onEventComplete`).
  - `duration?: number` – Animation duration in ms (default: `800`).
  - `direction?: 'up' | 'random-arc'` (default: `'up'`) – `'random-arc'` adds
    slight per-event horizontal drift/rotation for a less mechanical feel.
  - `stacking?: 'stack' | 'combine'` (default: `'stack'`) – `'combine'`
    merges rapid same-type events on the same target into a single running
    total instead of spawning many overlapping numbers.
  - `combineWindow?: number` – Time window in ms for `stacking="combine"`
    (default: `250`).
  - `colorMap?: Partial<Record<'damage' | 'heal' | 'critical' | 'miss', string>>`
    – Tailwind text-color class per type (defaults: damage `text-red-400`,
    heal `text-green-400`, critical `text-yellow-300`, miss `text-gray-400`).
  - `criticalScale?: number` – Extra font-size multiplier for
    `type: 'critical'` (default: `1.5`).
  - `className?: string`.
  - `onEventComplete?: (id: string) => void` – Called when a given event's
    animation finishes; the caller should remove it from `events`.
  - `maxConcurrent?: number` – Caps simultaneously visible numbers, dropping
    the oldest (default: `50`).
  - `aria-label?: string`.
- **State:** `activeNumbers`.
- **Events:** `onEventComplete`.
- **Variants:** `damage`, `heal`, `critical`, `miss` (via each event's
  `type`).
- **PlayCanvas Integration:** Projects each event's world `position` (or the
  anchor `pcEntity`'s position) to screen space via `useCameraProjection`;
  typically driven by `Health`'s `onDamage`/`onHeal` callbacks.
- **Tailwind/UI Behavior:** `absolute`, `pointer-events-none`, `font-bold`,
  `select-none`; `animate-` keyframes for rise + fade; text-shadow for
  legibility over varied backgrounds.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box` and `Text`; typically mounted once at the
  `HUD` root and fed events from `Health`/`Energy`.
- **Accessibility:** `aria-hidden="true"` — purely a visual effect; the
  underlying value change should already be announced via `Health`'s own
  `aria-live` region, so `DamageNumbers` doesn't duplicate it.
- **Rebuild Notes:** Cap `maxConcurrent` and use `stacking="combine"` for
  fast multi-hit weapons to avoid overwhelming the screen; recycle DOM nodes
  rather than remounting per event for performance.

---

### Component: StatusEffects

- **Purpose:** Row/list of active buff/debuff icons with remaining-duration
  timers.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `effects: { id: string, name: string, icon: string, type: 'buff' | 'debuff' | 'neutral', duration?: number, remaining?: number, stacks?: number }[]`
    – Active effects; `duration`/`remaining` in seconds, omitted for a
    permanent effect (no timer ring is shown).
  - `pcEntity?: string` – PlayCanvas status-effect entity.
  - `variant?: 'row' | 'grid' | 'compact'` (default: `'row'`).
  - `maxVisible?: number` – Cap visible icons before overflowing into a "+N"
    indicator (default: unlimited).
  - `className?: string`.
  - `onEffectClick?: (id: string) => void`.
  - `onEffectHover?: (id: string | null) => void` – Typically used to show an
    `ItemTip`-style description tooltip.
  - `onEffectExpire?: (id: string) => void` – Called when an effect's
    `remaining` reaches `0`.
  - `aria-label?: string`.
  - `showStacks?: boolean` – Show a stack-count badge (via `Badge`) when
    `stacks > 1` (default: `true`).
  - `sortOrder?: 'default' | 'remaining' | 'type'` – Sorting (default:
    `'default'`, insertion order).
- **State:** `effects`.
- **Events:** `onEffectClick`, `onEffectHover`, `onEffectExpire`.
- **Variants:** `row`, `grid`, `compact` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useStatusEffectSync`.
- **Tailwind/UI Behavior:** `flex`, `gap-1`; each icon `w-8 h-8 rounded
  border-2`, colored by `type` (buff `border-green-500`, debuff
  `border-red-500`, neutral `border-gray-500`); timer as a radial
  `Progress`-style overlay counting down.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Badge` (stack count), `ItemTip`
  for the hover description.
- **Accessibility:** `role="list"`, each effect `role="listitem"` with
  `aria-label` (e.g., `"Poisoned, 4 seconds remaining"`); expiring effects
  are not announced individually by default (would be noisy) — pair with
  `ScreenReader`/`onEffectExpire` deliberately for effects where the
  transition matters gameplay-wise.
- **Rebuild Notes:** Feed `remaining` from a per-frame or per-second tick;
  use `Badge` for stack counts rather than reinventing a counter.

---

## Category: Inventory

### Component: Inventory

- **Purpose:** Grid-based inventory display with slot management and PlayCanvas
  sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `slots: number` – Total number of inventory slots.
  - `items?: Item<T = unknown>[]` where
    `Item<T> = { id: string, name: string, icon?: string, description?: string, stackable?: boolean, maxStack?: number, quantity?: number, equipped?: boolean, data?: T }`
    – Generic over an optional `data` payload for custom item fields (rarity,
    stats, etc.) with type safety; `equipped` marks the item as currently
    equipped (drives `ItemSlot`'s equipped indicator).
  - `columns?: number` – Number of grid columns (default: `4`; responsive via
    className).
  - `pcEntity?: string` – PlayCanvas inventory entity.
  - `className?: string`.
  - `virtualization?: boolean` – Enable virtualization for large inventories
    (default: `true` when `slots > virtualizationThreshold`; otherwise
    `false`).
  - `virtualizationThreshold?: number` – Slot count above which
    `virtualization` defaults to enabled (default: `100`); set explicitly to
    tune for devices with different performance budgets.
  - `variant?: 'fixed-grid' | 'scrollable' | 'paginated'` (default:
    `'fixed-grid'`).
  - `onSelect?: (slotIndex: number) => void`.
  - `onUse?: (slotIndex: number) => void`.
  - `onItemClick?: (slotIndex: number, item: Item) => void` – Fired on any
    click on a filled slot, independent of selection (`onSelect` only fires
    when selection changes and doesn't include the item data).
  - `onItemDoubleClick?: (slotIndex: number, item: Item) => void` –
    Double-click handler for a filled slot (e.g., "use" via double-click).
  - `onDragStart?: (slotIndex: number) => void` – Inventory-level drag-start
    handler; fires for any slot's drag start (in addition to `ItemSlot`'s own
    `onDragStart`, useful when you only hold a listener on `Inventory`).
  - `onDragEnd?: (slotIndex: number) => void` – Inventory-level drag-end
    handler, mirroring `onDragStart`.
  - `onDrop?: (from: number, to: number) => void`.
  - `onHover?: (slotIndex: number | null) => void`.
  - `aria-label?: string`.
  - `emptySlotRender?: (slotIndex: number) => ReactNode` – Custom empty slot
    content.
  - `sortable?: boolean` – Enable drag sorting (default: `true`).
  - `maxStack?: number` – Global max stack size (overrides item property).
  - `onSort?: (newOrder: number[]) => void` – Called after sorting.
  - `onFilter?: (filter: string) => void` – Called when filter changes.
  - `showEmptySlots?: boolean` – Render empty slots (default: `true`).
  - `dragPreview?: ReactNode` – Custom drag preview element.
  - `dropEffect?: 'move' | 'copy' | 'none'` – Drag drop effect (default:
    `'move'`).
  - `onOpen?: () => void` – Called when the inventory panel opens.
  - `onClose?: () => void` – Called when the inventory panel closes.
- **State:** `selectedSlot`, `items`, `isOpen`.
- **Events:** `onSelect`, `onUse`, `onItemClick`, `onItemDoubleClick`,
  `onDragStart`, `onDragEnd`, `onDrop`, `onHover`, `onSort`, `onFilter`,
  `onOpen`, `onClose`.
- **Variants:** `fixed-grid`, `scrollable`, `paginated` (via `variant` prop).
- **PlayCanvas Integration:** Syncs with PlayCanvas via `useInventorySync`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{columns}`, `gap-2`;
  `overflow-auto`; `p-2`; highlights selected slot.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useMemo`,
  `@dnd-kit/core`. **Performance:** `@dnd-kit/core` requires configuring
  sensors via its `useSensor`/`useSensors` hooks (e.g.,
  `useSensor(PointerSensor, { activationConstraint: { distance: 8 } })`) at
  the `DndContext` level to avoid drags starting on tiny accidental pointer
  moves — without an activation constraint, clicks on slots can be
  misinterpreted as drag starts.
- **Composition:** Composes `Grid` and `ItemSlot`.
- **Accessibility:** `role="grid"`, `aria-label="Inventory"`; keyboard arrow
  navigation; `aria-selected`.
- **Rebuild Notes:** Each slot renders `ItemSlot`; supports drag-drop; consider
  virtualization for >100 slots (or above `virtualizationThreshold`) for
  performance; without virtualization, rendering all slots may cause
  performance issues.

---

### Component: ItemSlot

- **Purpose:** Single inventory slot with drag-drop support and PlayCanvas slot
  sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `slotIndex: number` – Slot index.
  - `item?: Item<T>` – Item data (same generic `Item<T>` shape used by
    `Inventory`, allowing typed custom item data via `T`).
  - `selected?: boolean` – Selected state.
  - `pcEntity?: string` – PlayCanvas slot entity.
  - `disabled?: boolean` – Disable interactions.
  - `className?: string`.
  - `onSelect?: (slotIndex: number) => void`.
  - `onClick?: (slotIndex: number) => void` – Alias for `onSelect` for
    consumers expecting a plain click handler name; identical signature,
    fires alongside it.
  - `onDoubleClick?: (slotIndex: number) => void` – Double-click handler
    (e.g., "use" via double-click), separate from `onUse`.
  - `onUse?: (slotIndex: number) => void`.
  - `onDragStart?: (slotIndex: number) => void`.
  - `onDragEnd?: (slotIndex: number) => void`.
  - `onDragEnter?: (slotIndex: number) => void` – Called when a dragged item
    enters this slot as a potential drop target.
  - `onDragLeave?: (slotIndex: number) => void` – Called when a dragged item
    leaves this slot without dropping.
  - `onDrop?: (from: number, to: number, dropEffect: 'move' | 'copy' | 'none') => void` –
    Includes the resolved `dropEffect` (mirrors `Inventory`'s `dropEffect`
    prop) so handlers can distinguish a move from a copy.
  - `onHover?: (slotIndex: number | null) => void`.
  - `aria-label?: string`.
  - `dragHandle?: boolean` – Show drag handle (default: `false`).
  - `size?: 'sm' | 'md' | 'lg'` – Slot size (default: `'md'`).
  - `quantity?: number` – Override item quantity display.
  - `onContextMenu?: (e: React.MouseEvent, slotIndex: number) => void` –
    Right-click handler.
  - `showTooltip?: boolean` – Show tooltip on hover (default: `true`).
  - `equipped?: boolean` – Mark slot as equipped (adds visual indicator).
  - `rowIndex?: number` – 0-based row position within the parent `Inventory`
    grid; drives `aria-rowindex` (1-indexed per ARIA convention).
  - `colIndex?: number` – 0-based column position within the parent
    `Inventory` grid; drives `aria-colindex` (1-indexed per ARIA convention).
- **State:** `isDragging`, `isHovered`, `hasItem`.
- **Events:** `onSelect`, `onClick`, `onDoubleClick`, `onUse`, `onDragStart`,
  `onDragEnd`, `onDragEnter`, `onDragLeave`, `onDrop`, `onHover`,
  `onContextMenu`.
- **Variants:** `empty`, `filled`, `selected`, `disabled`.
- **PlayCanvas Integration:** Syncs via `useSlotSync`.
- **Tailwind/UI Behavior:** `w-16 h-16`, `border-2`, `rounded-lg`,
  `hover:bg-gray-700`, `selected:border-blue-500`; `transition-colors`.
- **Dependencies:** `react`, `@dnd-kit/core`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`; uses DnD context.
- **Accessibility:** `role="gridcell"`; `aria-selected` when `selected`;
  `aria-rowindex`/`aria-colindex` (from `rowIndex`/`colIndex`) so screen
  readers can announce grid position; `aria-label` with item name; supports
  keyboard selection and drag.
- **Rebuild Notes:** Uses `@dnd-kit/core` for modern touch and accessibility;
  supports touch; manages drop target highlighting.

---

### Component: ItemTip

- **Purpose:** Hover tooltip showing item details with optional pinning.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `item: Item<T>` – Item data to display (same generic `Item<T>` shape used
    by `Inventory`/`ItemSlot`).
  - `position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'` (default:
    `'top'`). `'auto'` picks the side with the most available viewport space,
    flipping away from the trigger's edge to avoid clipping.
  - `delay?: number` – Delay before showing in ms (default: `300`).
  - `children: ReactNode` – Trigger element.
  - `pcEntity?: string` – PlayCanvas tooltip entity.
  - `variant?: 'compact' | 'detailed' | 'with-image'` (default: `'detailed'`).
  - `onOpen?: () => void`.
  - `onClose?: () => void`.
  - `onToggle?: (open: boolean) => void` – Called on any open/close
    transition with the resulting state.
  - `onMouseEnter?: (e: React.MouseEvent) => void` – Fired when the pointer
    enters the trigger (before the `delay` timer resolves `onOpen`).
  - `onMouseLeave?: (e: React.MouseEvent) => void` – Fired when the pointer
    leaves the trigger.
  - `onFocus?: (e: React.FocusEvent) => void` – Fired when the trigger
    receives keyboard focus (tooltip should open immediately, without
    `delay`, per WCAG 2.1.1 keyboard-operability expectations).
  - `onBlur?: (e: React.FocusEvent) => void` – Fired when the trigger loses
    focus.
  - `onPin?: (pinned: boolean) => void`.
  - `pinnable?: boolean` – Allow pinning (default: `false`).
  - `isOpen?: boolean` – Controlled open state (overrides internal).
  - `closeDelay?: number` – Delay before closing in ms (default: `0`).
  - `maxWidth?: number | string` – Max width of tooltip (default: `'xs'`).
  - `showArrow?: boolean` – Show arrow pointer (default: `true`).
- **State:** `isVisible`, `isPinned`.
- **Events:** `onOpen`, `onClose`, `onToggle`, `onMouseEnter`, `onMouseLeave`,
  `onFocus`, `onBlur`, `onPin`.
- **Variants:** `compact`, `detailed`, `with-image` (via `variant` prop).
- **PlayCanvas Integration:** Reads item data via `useItemData`.
- **Tailwind/UI Behavior:** `absolute`, `z-50`, `bg-gray-900`, `text-white`,
  `rounded-md`, `shadow-lg`, `p-2`, `max-w-xs`; `transform` for positioning.
- **Dependencies:** `react`, `@radix-ui/react-tooltip`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box` and `Text`; wraps trigger via `Slot`.
- **Performance:** The default `delay` of `300`ms is a hover-intent debounce,
  not an accessibility barrier by itself — but per WCAG 2.1.1 (keyboard),
  keyboard focus must reveal the tooltip without waiting on `delay` (see
  `onFocus` above); don't gate the focus-triggered open behind the same timer
  used for mouse hover.
- **Accessibility:** `role="tooltip"`; the trigger element gets
  `aria-describedby` pointing at the tooltip's `id` (auto-generated,
  connecting the trigger to its description for screen readers); follows
  focus management — opens on both hover and keyboard focus, closes on Escape
  or blur.
- **Rebuild Notes:** Appears on hover/focus; auto-dismisses; pinning allows
  persistent display.

---

### Component: EquipmentSlots

- **Purpose:** Fixed slots for equipped items by body/gear location (head,
  chest, weapon, etc.), distinct from `Inventory`'s uniform grid.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `slots: { id: string, label: string, slotType: string, item?: Item, position?: { x: number, y: number } }[]`
    – Equipment slot definitions; `slotType` (e.g., `'head'`, `'chest'`,
    `'weapon'`) constrains which items are droppable there (validated by the
    consumer via `onEquip`'s return, not by `EquipmentSlots` itself).
    `position` allows a non-grid, silhouette-style layout (e.g., slots
    arranged around a character paperdoll).
  - `pcEntity?: string` – PlayCanvas equipment entity.
  - `layout?: 'paperdoll' | 'list' | 'grid'` (default: `'paperdoll'`).
    `'paperdoll'` uses each slot's `position` for a body-silhouette
    arrangement; `'list'`/`'grid'` ignore `position` in favor of a simple
    flow layout.
  - `className?: string`.
  - `onEquip?: (slotId: string, item: Item) => void`.
  - `onUnequip?: (slotId: string) => void`.
  - `onSlotClick?: (slotId: string) => void`.
  - `onSlotHover?: (slotId: string | null) => void`.
  - `onInvalidDrop?: (slotId: string, item: Item) => void` – Called when an
    item is dropped on a slot whose `slotType` it doesn't match (the consumer
    determines validity and calls this instead of `onEquip`).
  - `aria-label?: string`.
  - `showEmptySlotIcon?: boolean` – Show a silhouette icon per `slotType` in
    empty slots (default: `true`).
- **State:** `equippedItems`, `hoveredSlot`.
- **Events:** `onEquip`, `onUnequip`, `onSlotClick`, `onSlotHover`,
  `onInvalidDrop`.
- **Variants:** `paperdoll`, `list`, `grid` (via `layout` prop).
- **PlayCanvas Integration:** Syncs via `useEquipmentSync`.
- **Tailwind/UI Behavior:** `relative` (paperdoll) or `grid`/`flex`
  (list/grid); each slot reuses `ItemSlot`'s `w-16 h-16 border-2 rounded-lg`
  styling with a `slotType`-specific placeholder icon.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@dnd-kit/core`.
- **Composition:** Composes `Box`, `ItemSlot` (one per equipment slot),
  `Icon`.
- **Accessibility:** `role="grid"` (or `role="list"` for `layout="list"`),
  `aria-label="Equipment"`; each slot `role="gridcell"`/`role="listitem"`
  with `aria-label` naming its `slotType` and current item, or
  `"${label}, empty"`.
- **Rebuild Notes:** Reuses `ItemSlot` per equipment slot; validate
  `slotType` compatibility in the consumer's `onEquip` handler (or
  `onInvalidDrop` rejection path), not inside this component.

---

### Component: ItemComparison

- **Purpose:** Side‑by‑side tooltip comparing two items (e.g., equipped vs.
  hovered), extending `ItemTip`'s single-item display.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `primary: Item<T>` – The item being considered (e.g., hovered in
    `Inventory`).
  - `comparison: Item<T>` – The item being compared against (e.g., currently
    equipped in the same slot).
  - `statKeys?: string[]` – Ordered list of `data` keys to compare as stat
    rows; omit to auto-derive from the union of both items' numeric `data`
    fields.
  - `position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'` (default:
    `'right'`).
  - `pcEntity?: string` – PlayCanvas tooltip entity.
  - `variant?: 'side-by-side' | 'diff-only'` (default: `'side-by-side'`).
    `'diff-only'` renders a single item panel with inline +/- deltas against
    `comparison` rather than two full panels.
  - `className?: string`.
  - `children: ReactNode` – Trigger element (typically the hovered
    `ItemSlot`).
  - `onOpen?: () => void`.
  - `onClose?: () => void`.
  - `aria-label?: string`.
- **State:** `isVisible`.
- **Events:** `onOpen`, `onClose`.
- **Variants:** `side-by-side`, `diff-only` (via `variant` prop).
- **PlayCanvas Integration:** Reads both items via `useItemData`.
- **Tailwind/UI Behavior:** `absolute`, `z-50`, `bg-gray-900`, `rounded-md`,
  `shadow-lg`, `grid grid-cols-2 gap-4` (side-by-side) or single-column with
  `text-green-400`/`text-red-400` deltas (diff-only).
- **Dependencies:** `react`, `@radix-ui/react-tooltip`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`, `Text`, two internal `ItemTip`-style stat
  panels (or one, for `diff-only`).
- **Accessibility:** `role="tooltip"`; each stat row includes the delta as
  text (e.g., `"Damage: 42 (+7)"`) rather than color alone, so the
  comparison isn't color-dependent.
- **Rebuild Notes:** Reuses `ItemTip`'s stat-row rendering internally;
  compute deltas from `statKeys` (or auto-derived numeric fields) in the
  consumer or a shared stat-diff util.

---

### Component: CraftingPanel

- **Purpose:** Recipe list/grid with required ingredients, output preview,
  and craft action with progress feedback.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `recipes: { id: string, name: string, icon?: string, ingredients: { itemId: string, quantity: number }[], output: { itemId: string, quantity: number }, craftTime?: number }[]`
    – Available recipes.
  - `inventory: Item[]` – The player's current inventory, used to compute
    `canCraft`/missing-ingredient state per recipe.
  - `pcEntity?: string` – PlayCanvas crafting entity.
  - `selectedRecipe?: string` – Currently selected recipe ID (controlled).
  - `variant?: 'grid' | 'list'` (default: `'grid'`).
  - `className?: string`.
  - `onSelect?: (recipeId: string) => void`.
  - `onCraft: (recipeId: string) => void | Promise<void>` – Craft handler;
    can be async for a timed craft.
  - `craftProgress?: number` – `0`–`1` progress while a timed craft is in
    flight.
  - `onCraftComplete?: (recipeId: string) => void`.
  - `onCraftFail?: (recipeId: string, reason: 'missing-ingredients' | 'error') => void`.
  - `aria-label?: string`.
  - `searchable?: boolean` – Enable recipe search (default: `false`).
  - `onSearch?: (query: string) => void`.
  - `categories?: string[]` – Recipe category filter tabs.
  - `showLocked?: boolean` – Show recipes the player hasn't unlocked yet,
    greyed out (default: `true`).
- **State:** `selectedRecipe`, `isCrafting`, `craftProgress`.
- **Events:** `onSelect`, `onCraft`, `onCraftComplete`, `onCraftFail`,
  `onSearch`.
- **Variants:** `grid`, `list` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useCraftingSync`.
- **Tailwind/UI Behavior:** `grid grid-cols-2 gap-4` (recipe list + detail
  panel); ingredient rows `flex items-center gap-2`, insufficient quantity
  `text-red-400`; craft button disabled/`opacity-50` when `canCraft` is
  `false`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Grid`, `ItemSlot` (ingredients/output),
  `Button`, `Progress` (craft timer).
- **Accessibility:** `role="list"` for the recipe list, each recipe
  `role="listitem"`; the detail panel is `role="region"` with
  `aria-labelledby` the selected recipe's name; craft button reflects
  `aria-disabled` when ingredients are missing, with the reason surfaced via
  `aria-describedby`.
- **Rebuild Notes:** Compute `canCraft` by diffing `recipes[].ingredients`
  against `inventory`; drive `craftProgress` from a timer for non-instant
  crafts.

---

### Component: LootContainer

- **Purpose:** Secondary inventory grid shown when opening a chest, corpse,
  or container, with item-transfer support to the player's `Inventory`.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `isOpen: boolean` – Container visibility.
  - `items: Item[]` – Items currently in the container.
  - `containerName?: string` – Display title (e.g., `"Wooden Chest"`).
  - `pcEntity?: string` – PlayCanvas container entity.
  - `onClose: () => void`.
  - `onTake: (itemId: string, quantity?: number) => void` – Move a single
    item (or partial stack quantity) to the player's inventory.
  - `onTakeAll?: () => void`.
  - `onDeposit?: (itemId: string, quantity?: number) => void` – Move an item
    from the player's inventory into the container (for containers that
    support storage, not just one-time loot).
  - `variant?: 'loot' | 'storage'` (default: `'loot'`). `'loot'` is a
    one-directional take-only container (corpse, chest); `'storage'` is
    bidirectional (a player-owned stash/vault), enabling `onDeposit`.
  - `className?: string`.
  - `onItemHover?: (itemId: string | null) => void`.
  - `onEmpty?: () => void` – Called when the last item is taken and the
    container becomes empty.
  - `aria-label?: string`.
  - `autoCloseOnEmpty?: boolean` – Auto-close after the last item is taken
    (default: `false`).
  - `weightLimit?: number` – Optional carry-weight cap enforced by the
    consumer; `LootContainer` surfaces it via `onTake`'s rejection but
    doesn't compute weight itself.
- **State:** `items`, `isOpen`.
- **Events:** `onTake`, `onTakeAll`, `onDeposit`, `onItemHover`, `onEmpty`.
- **Variants:** `loot`, `storage` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useLootSync`.
- **Tailwind/UI Behavior:** Renders as a side-by-side pair of `Inventory`
  grids (container + player) inside a `Modal`; `bg-gray-900/95`,
  `rounded-lg`, `p-4`; drag between the two grids via shared DnD context.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@dnd-kit/core`.
- **Composition:** Composes `Modal`, `Inventory` (×2 — container and
  player), `Button` ("Take All").
- **Accessibility:** `role="dialog"`, `aria-label` defaulting to
  `containerName` or `"Container"`; each grid keeps `Inventory`'s own
  `role="grid"`/keyboard semantics; a keyboard-only "take" action (e.g.,
  Enter on a highlighted item) is available alongside drag, since
  `@dnd-kit/core` drag defaults may not suffice cross-grid without explicit
  wiring.
- **Rebuild Notes:** Reuses `Inventory` for both panels; `variant="loot"`
  hides `onDeposit`'s UI affordances entirely rather than just disabling
  them.

---

## Category: Puzzle

### Component: Puzzle

- **Purpose:** Abstract puzzle container with state management and PlayCanvas
  bridge.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `puzzleId: string` – Unique puzzle identifier.
  - `type: 'logic' | 'sequence' | 'pattern' | 'code' | 'physical'` – Puzzle
    type; `'physical'` denotes a puzzle driven primarily by PlayCanvas-side
    physical interaction (e.g., moving an object in 3D space) rather than a
    2D UI widget — `Puzzle` still renders the surrounding chrome/state, but
    the interaction itself happens in the scene and is reported back via
    `onStateChange`/`onAttempt`.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `initialState?: Record<string, S = any>` – Initial puzzle state, generic
    over a state shape `S` for type-safe custom puzzle state (defaults to
    `any` for backward compatibility with untyped usage).
  - `children?: ReactNode` – Puzzle content.
  - `solution?: S` – Expected solution (used for validation), typed to match
    `initialState`'s state shape `S` rather than `any`.
  - `maxAttempts?: number` – Maximum attempts before failure (default: `3`; `0`
    means unlimited).
  - `onSolve?: (solution: S) => void` – Solve handler (receives solution).
  - `onComplete?: (solution: S) => void` – Alias for `onSolve`, for consumers
    that prefer completion-oriented naming; identical signature, fires
    alongside it.
  - `onFail?: () => void` – Failure handler (final failure, e.g.
    `maxAttempts` exhausted).
  - `onAttemptFail?: (attempt: S) => void` – Called on each individual failed
    attempt (before `maxAttempts` is exhausted), with the failed attempt
    data — distinct from `onFail`, which only fires on the terminal failure.
  - `onError?: (error: Error) => void` – Called when `validateSolution` throws
    or its returned promise rejects.
  - `onReset?: () => void` – Reset handler.
  - `onStateReset?: () => void` – Called specifically when state is reset back
    to `initialState` (as opposed to `onReset`, which also covers
    attempt/timer resets).
  - `onStateChange?: (state: S) => void` – State change handler.
  - `onAttempt?: (attempt: S) => void` – Attempt handler.
  - `aria-label?: string`.
  - `validateSolution?: (state: S, solution: S) => boolean | Promise<boolean>`
    – Custom validation function.
  - `hint?: string | ((state: S) => string)` – Hint text or function.
  - `onHint?: (hint: string) => void` – Hint requested handler.
  - `timeLimit?: number` – Time limit in seconds (optional).
  - `autoReset?: boolean` – Auto-reset after completion/failure (default:
    `false`).
  - `onTimeout?: () => void` – Called when time limit expires.
  - `onTimeExpire?: () => void` – Alias for `onTimeout`; identical signature,
    fires alongside it.
  - `showHints?: boolean` – Show hints (default: `true`).
- **State:** `state`, `solution`, `attempts`.
- **Events:** `onSolve`, `onComplete`, `onFail`, `onAttemptFail`, `onError`,
  `onReset`, `onStateReset`, `onStateChange`, `onAttempt`, `onHint`,
  `onTimeout`, `onTimeExpire`.
- **Variants:** `logic`, `sequence`, `pattern`, `code`, `physical` (via `type`
  prop).
- **PlayCanvas Integration:** Binds via `usePuzzleBridge`; syncs state; listens
  for PC events.
- **Tailwind/UI Behavior:** Base styling; children define specific UI.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `zustand`. **Performance:**
  Zustand stores are created at module scope by default, which is unsafe for
  SSR (state would leak between requests on a server). Create the puzzle's
  Zustand store per-request/per-provider (e.g., via a store factory passed
  through context) rather than a shared module-level `create()` call if this
  component is ever rendered server-side.
- **Composition:** Composes `Box` and `Flex`; provides context.
- **Accessibility:** `role="region"`, `aria-label="${puzzleId} puzzle"` (more
  specific than the previous `role="group"`, since a puzzle is a distinct,
  independently-labeled section of the page rather than a plain form-control
  grouping); trap focus when active.
- **Rebuild Notes:** All puzzles extend this; uses Zustand for global state;
  handles reset/failure.

---

### Component: CodePuzzle

- **Purpose:** Number/letter code entry puzzle with validation.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `codeLength: number` – Number of code digits.
  - `correctCode: string | string[]` – Expected code, as a single string
    (`'1234'`) or an array of single-character strings (`['1','2','3','4']`,
    one element per digit slot — each element must be exactly one character
    matching `codeLength`'s indexed slot, not a multi-character substring).
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `maskInput?: boolean` – Mask input characters (default: `false`).
  - `autoSubmit?: boolean` – Auto-submit when length reached (default: `false`).
  - `className?: string`.
  - `variant?: 'numeric' | 'alphanumeric' | 'symbolic'` (default: `'numeric'`).
  - `allowPaste?: boolean` – Allow paste (default: `true`).
  - `clearOnInvalid?: boolean` – Clear input on invalid submission (default:
    `false`).
  - `onDigitEnter?: (digit: string) => void`.
  - `onDigitFocus?: (index: number) => void` – Called when a digit slot
    receives focus, with its index.
  - `onDigitBlur?: (index: number) => void` – Called when a digit slot loses
    focus, with its index.
  - `onPaste?: (pasted: string) => void` – Called when text is pasted into
    the code entry (only fires if `allowPaste` is `true`), with the pasted
    string before it's distributed across digit slots.
  - `onClear?: () => void`.
  - `onCodeChange?: (code: string) => void` – Alias for `onDigitEnter`, but
    receives the full assembled code string rather than a single digit;
    fires alongside `onDigitEnter` on each entry.
  - `onCodeComplete?: (code: string) => void` – Called once all `codeLength`
    slots are filled, with the full code — fires before validation/submit,
    regardless of correctness (unlike `onSuccess`/`onFailure`).
  - `onSubmit?: (code: string) => void`.
  - `onInvalid?: () => void`.
  - `aria-label?: string`.
  - `onSuccess?: () => void` – Called when correct code entered.
  - `onFailure?: () => void` – Called when incorrect code entered.
  - `shakeOnInvalid?: boolean` – Shake animation on invalid input (default:
    `true`).
  - `feedback?: ReactNode` – Custom feedback element.
- **State:** `enteredCode`, `isValid`, `attempts`, `isComplete`.
- **Events:** `onDigitEnter`, `onDigitFocus`, `onDigitBlur`, `onPaste`,
  `onClear`, `onCodeChange`, `onCodeComplete`, `onSubmit`, `onInvalid`,
  `onSuccess`, `onFailure`.
- **Variants:** `numeric`, `alphanumeric`, `symbolic` (via `variant` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`; receives
  validation.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{codeLength}`, `gap-2`; each
  input `w-12 h-12 text-center text-2xl`; invalid `border-red-500`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Puzzle`, `Flex`, `Input`, `Button`.
- **Accessibility:** `role="textbox"` on the assembled code-entry group
  (rather than the previous generic `role="group"`, since the digit slots
  together function as a single logical text input) with
  `aria-label="Code entry"`; each digit `Input` sets `aria-invalid="true"`
  when `onInvalid` fires, cleared on the next valid entry or `onClear`;
  auto‑focus first; each input also has its own `aria-label` (e.g., "Digit 1
  of 4"); announces validation errors.
- **Rebuild Notes:** Uses `useRef` for focus management; supports paste; handles
  auto‑advance.

---

### Component: SequencePuzzle

- **Purpose:** Pattern/sequence matching puzzle (e.g., Simon says).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `sequence: S[]` – Sequence to match, generic over the step type `S`
    (e.g., `number` for colors-by-index, or a custom step shape) instead of
    `any[]`.
  - `visuals?: ReactNode[]` – Visual representations for sequence items.
    `visuals[i]` is used for `sequence[i]`, so the array must be at least
    `sequence.length` long (extra entries are ignored) — mismatched length is
    not validated at runtime; a shorter `visuals` array falls back to a
    default rendering for the missing indices.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `delayBetweenSteps?: number` – Delay between sequence steps in ms (default:
    `500`).
  - `className?: string`.
  - `variant?: 'memory' | 'pattern' | 'rhythm'` (default: `'memory'`).
  - `showSequence?: boolean` – Show sequence visually (default: `true`).
  - `onSequenceStart?: () => void` – Called when the sequence begins playing
    back to the user.
  - `onSequenceEnd?: () => void` – Called when sequence playback finishes and
    input is enabled.
  - `onStep?: (step: S) => void`.
  - `onStepCorrect?: (step: S, index: number) => void` – Called when a user
    input step matches the expected sequence step.
  - `onStepIncorrect?: (step: S, index: number) => void` – Called when a user
    input step does not match — a per-step counterpart to `onFail`, which
    fires for the overall attempt.
  - `onComplete?: () => void`.
  - `onReset?: () => void`.
  - `onInput?: (step: S) => void`.
  - `onSequenceRepeat?: () => void` – Called when the sequence is replayed
    (via `allowReplay`), distinct from the initial `onSequenceStart`.
  - `aria-label?: string`.
  - `onFail?: () => void` – Called when user input is incorrect.
  - `showProgress?: boolean` – Show progress indicator (default: `true`).
  - `allowReplay?: boolean` – Allow replaying the sequence (default: `false`).
- **State:** `currentStep`, `userSequence`, `isPlaying`, `isCorrect`.
- **Events:** `onSequenceStart`, `onSequenceEnd`, `onStep`, `onStepCorrect`,
  `onStepIncorrect`, `onComplete`, `onReset`, `onInput`, `onSequenceRepeat`,
  `onFail`.
- **Variants:** `memory`, `pattern`, `rhythm` (via `variant` prop).
- **PlayCanvas Integration:** Sends via `useSequenceSubmit`; receives feedback.
- **Tailwind/UI Behavior:** `flex`, `flex-wrap`, `gap-4`; each step
  `w-16 h-16 rounded-full`; highlights current.
- **Performance:** For long sequences (>100 steps), avoid re-rendering the
  entire step list on every `onStep`/playback tick — key steps stably by
  index and memoize each step's visual so only the currently-highlighted
  step re-renders; consider capping `sequence.length` or paginating display
  for very long sequences, since the default layout renders all steps
  simultaneously via `flex-wrap`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Puzzle`, `Button`, `Icon`; uses `useTimer`.
- **Accessibility:** `role="group"`, `aria-label="Sequence puzzle"`; each step
  element has its own `aria-label` (e.g., "Step 3 of 8, red") so screen
  reader users can identify individual steps, not just the group; announce
  step changes via `ScreenReader`; keyboard accessible.
- **Rebuild Notes:** Uses `useTimer` for timed sequences; supports repeat and
  speed adjustment.

---

### Component: SliderPuzzle

- **Purpose:** Sliding tile puzzle (3x3, 4x4, etc.) with tile animations.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `size: 3 | 4 | 5` – Grid size (3x3, 4x4, 5x5). This is a TypeScript-level
    union, not a runtime-validated range — the type system rejects other
    literals at compile time, but a value coming from an untyped source
    (JSON, `any`) is not re-validated at runtime.
  - `tiles?: number[]` – Custom tile arrangement. Must be a permutation of
    `0..size^2-1` where `0` is empty; this is not validated at runtime, so an
    invalid/non-permutation array (duplicate or out-of-range values) can
    silently produce an unsolvable or broken board. If `parityCheck` is
    enabled, only _solvability_ is checked, not that the array is a valid
    permutation in the first place.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `imageUrl?: string` – Image for tile backgrounds (triggers `image-based`
    variant).
  - `className?: string`.
  - `onTileMove?: (from: number, to: number) => void` – Preferred handler.
  - `onTileClick?: (tileIndex: number) => void` – Alias for `onTileMove`
    named for the click/tap interaction itself, receiving only the clicked
    tile's index rather than the from/to pair; fires alongside `onTileMove`.
  - `onTileHover?: (tileIndex: number | null) => void` – Called when a tile
    gains or loses hover.
  - `onTileFocus?: (tileIndex: number) => void` – Called when a tile receives
    keyboard focus.
  - `onShuffle?: () => void`.
  - `onSolve?: () => void`.
  - `onSolved?: () => void` – Alias for `onSolve`; identical signature, fires
    alongside it.
  - `onMovesChange?: (moves: number) => void` – Called whenever the move
    counter changes; use this instead of deriving it from `onTileMove` calls.
  - `aria-label?: string`.
  - `animationDuration?: number` – Animation duration in ms (default: `200`;
    set `0` for instant). Instant (`0`) is intended for programmatic
    resets/tests or reduced-motion contexts — for interactive play, prefer a
    short non-zero duration (e.g., `100`–`200`ms) so users can visually track
    which tile moved, especially in `image-based` variant where an instant
    jump can be disorienting.
  - `scrambleCount?: number` – Number of shuffles (default: `100`).
  - `showMoves?: boolean` – Show move counter (default: `true`).
  - `parityCheck?: boolean` – Check if puzzle is solvable (default: `true`).
- **State:** `tilePositions`, `emptyIndex`, `isSolved`, `moveHistory`.
- **Events:** `onTileMove`, `onTileClick`, `onTileHover`, `onTileFocus`,
  `onShuffle`, `onSolve`, `onSolved`, `onMovesChange`.
- **Variants:** `3x3`, `4x4`, `5x5` (via `size`); `image-based` (via
  `imageUrl`).
- **PlayCanvas Integration:** Syncs via `useSliderSync`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{size}`, `gap-1`; tiles
  `aspect-square`, `bg-gray-200`, `border`, `transition-transform`; empty
  transparent.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useMemo`.
- **Composition:** Composes `Puzzle`, `Box`, and internal `Tile` with animation.
- **Accessibility:** `role="grid"`, `aria-label="Sliding puzzle"`,
  `aria-rowcount={size}`, `aria-colcount={size}`; keyboard arrow controls;
  `aria-label` on each tile.
- **Rebuild Notes:** Each tile uses `useAnimation`; shuffle uses random valid
  moves; check for solve state. Use `onTileMove` (the previously-deprecated
  `onMove` prop has been removed).

---

### Component: ObjectPuzzle

- **Purpose:** Find/pick/place objects in correct positions.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `objects: ObjectType[]` where
    `ObjectType = { id: string, name: string, description?: string, icon?: string, position?: { x: number, y: number, z: number } }`
    – `position` is the object's optional PlayCanvas world-space starting
    position (before being placed in a slot), used when rendering the object
    in-scene for `'auto-detect'`/3D variants.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `slots: SlotType[]` where
    `SlotType = { id: string, position: { x: number, y: number, z: number }, label?: string, occupied?: boolean }`
    – `occupied` reflects whether a slot currently holds a placed object
    (derived automatically from `placedObjects` state, but exposed on the
    type so consumers passing precomputed `slots` can seed it).
  - `className?: string`.
  - `variant?: 'drag-drop' | 'click-select' | 'auto-detect'` (default:
    `'drag-drop'`).
  - `onSelect?: (id: string) => void`.
  - `onPlace?: (objectId: string, slotId: string) => void`.
  - `onObjectDrop?: (objectId: string, slotId: string | null) => void` –
    Called on any drop attempt, including an invalid drop (`slotId: null`)
    that doesn't result in placement — `onPlace` only fires for successful
    placement.
  - `onPick?: (objectId: string) => void`.
  - `onObjectDragStart?: (objectId: string) => void` – Called when dragging an
    object begins.
  - `onObjectDragEnd?: (objectId: string) => void` – Called when dragging an
    object ends (drop or cancel).
  - `onSlotHover?: (slotId: string) => void` – Called when a dragged object
    hovers over a slot.
  - `onSlotLeave?: (slotId: string) => void` – Called when a dragged object
    leaves a slot without dropping.
  - `onComplete?: () => void`.
  - `aria-label?: string`.
  - `allowMultiplePerSlot?: boolean` – If true, multiple objects can be placed
    in same slot (default: `false`).
  - `onObjectHover?: (objectId: string | null) => void` – Called when hovering
    an object.
  - `onObjectSelect?: (objectId: string) => void` – Called when selecting an
    object.
  - `highlightSlots?: boolean` – Highlight available slots (default: `true`).
- **State:** `placedObjects`, `selectedObject`, `availableObjects`.
- **Events:** `onSelect`, `onPlace`, `onObjectDrop`, `onPick`,
  `onObjectDragStart`, `onObjectDragEnd`, `onSlotHover`, `onSlotLeave`,
  `onComplete`, `onObjectHover`, `onObjectSelect`.
- **Variants:** `drag-drop`, `click-select`, `auto-detect` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useObjectPuzzleSync`.
- **Tailwind/UI Behavior:** `flex`, `flex-col`, `gap-2`; objects as draggable
  cards or 3D; slots as drop zones.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@dnd-kit/core`.
  **Performance:** `@dnd-kit/core` renders sortable/droppable context for
  every object and slot; for puzzles with large object sets (dozens+), this
  is not virtualized by default — render only the currently-relevant objects
  (e.g., paginate an object bank, or windowed-render a long list) rather than
  mounting every draggable at once.
- **Composition:** Composes `Puzzle`, `Box`, `Button`, `DndContext`.
- **Accessibility:** `role="grid"` for the slots container (each slot a
  `role="gridcell"`) — more accurate than the previous `role="list"`, since
  slots form a 2D placement target, not a linear list; `aria-label="Object
puzzle"`; drag‑drop accessible via keyboard; each object has `aria-label`.
- **Rebuild Notes:** Supports both mouse drag and keyboard selection; uses
  `@dnd-kit/core`.

---

### Component: MathPuzzle

- **Purpose:** Arithmetic/equation puzzle with input validation.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `problem: string` – Displayed equation/problem text (e.g., `"7 × 6 + 3 = ?"`);
    rendering, not evaluation — `MathPuzzle` doesn't parse or evaluate
    `problem` itself.
  - `answer: number | number[]` – Correct answer, or an array of acceptable
    answers (e.g., for problems with multiple valid solutions).
  - `tolerance?: number` – Acceptable numeric deviation from `answer`
    (default: `0`, exact match); useful for problems involving rounding.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `inputType?: 'number' | 'expression'` (default: `'number'`) –
    `'expression'` accepts a free-form expression string (e.g., `"6*7"`)
    which the consumer evaluates via `onSubmit` rather than `MathPuzzle`
    doing arithmetic itself.
  - `className?: string`.
  - `variant?: 'single' | 'multi-step'` (default: `'single'`). `'multi-step'`
    presents a sequence of `problem`s (see `problems` below) that must each
    be solved to advance.
  - `problems?: { problem: string, answer: number | number[] }[]` – Used
    instead of `problem`/`answer` when `variant="multi-step"`.
  - `onSubmit?: (value: number | string) => void`.
  - `onSuccess?: () => void`.
  - `onFailure?: (attempt: number | string) => void`.
  - `onStepComplete?: (index: number) => void` – Called after each step in
    `'multi-step'` mode.
  - `aria-label?: string`.
  - `showKeypad?: boolean` – Show an on-screen numeric keypad, useful for
    touch/controller input (default: `false`).
  - `timeLimit?: number` – Optional per-problem time limit in seconds.
  - `onTimeout?: () => void`.
- **State:** `currentValue`, `currentStep`, `attempts`, `isComplete`.
- **Events:** `onSubmit`, `onSuccess`, `onFailure`, `onStepComplete`,
  `onTimeout`.
- **Variants:** `single`, `multi-step` (via `variant` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`; receives
  validation (same hook `CodePuzzle` uses).
- **Tailwind/UI Behavior:** `flex flex-col items-center gap-4`; problem text
  `text-2xl font-mono`; input `w-24 text-center text-2xl`; invalid
  `border-red-500` shake.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Puzzle`, `Input`, `Button`.
- **Accessibility:** `role="group"`, `aria-label="Math puzzle"`; input has
  `aria-label` describing the current problem; announces success/failure via
  `aria-live="polite"`.
- **Rebuild Notes:** `MathPuzzle` never evaluates `problem`/
  `inputType="expression"` itself — the consumer supplies `answer` (or
  evaluates the expression in `onSubmit`) to keep the component free of an
  embedded expression parser.

---

### Component: WordPuzzle

- **Purpose:** Anagram, crossword, or letter-grid word puzzle.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `mode: 'anagram' | 'crossword' | 'letter-grid'` – Puzzle mode.
  - `letters?: string[]` – Available letters for `'anagram'`/`'letter-grid'`
    modes.
  - `targetWords?: string[]` – Word(s) to find/form.
  - `grid?: string[][]` – 2D letter grid for `'letter-grid'`/`'crossword'`
    modes (`null`/empty-string cells represent blocked cells in crossword
    layouts).
  - `clues?: { word: string, clue: string, position: { row: number, col: number }, direction: 'across' | 'down' }[]`
    – Crossword clue definitions (only for `mode="crossword"`).
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `caseSensitive?: boolean` – Whether matching is case-sensitive (default:
    `false`).
  - `className?: string`.
  - `onWordFound?: (word: string) => void`.
  - `onWordSelect?: (cells: { row: number, col: number }[]) => void` –
    Called as the player drags/selects cells in `'letter-grid'` mode, before
    a valid word is confirmed.
  - `onComplete?: () => void` – Called when all `targetWords` are found.
  - `onInvalidWord?: (attempt: string) => void`.
  - `aria-label?: string`.
  - `showFoundWordsList?: boolean` – Show a checklist of found/remaining
    words (default: `true`).
  - `allowDiagonal?: boolean` – Allow diagonal selection in `'letter-grid'`
    mode (default: `false`).
  - `shuffleLetters?: boolean` – Randomize `letters` order on mount/reset for
    `'anagram'` mode (default: `true`).
- **State:** `foundWords`, `currentSelection`, `isComplete`.
- **Events:** `onWordFound`, `onWordSelect`, `onComplete`, `onInvalidWord`.
- **Variants:** `anagram`, `crossword`, `letter-grid` (via `mode` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{cols}`, `gap-1`; letter tiles
  `w-10 h-10 text-center uppercase font-bold border rounded`; found cells
  `bg-green-600/40`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Puzzle`, `Grid`, `Box`, `Text`, `Button`
  (anagram letter tiles).
- **Accessibility:** `role="grid"` for `'letter-grid'`/`'crossword'`,
  `role="group"` for `'anagram'`; each cell/tile has `aria-label` (e.g.,
  `"Row 2, Column 3, letter A"`); found/remaining word count announced via
  `aria-live="polite"`.
- **Rebuild Notes:** `'crossword'` is the most involved mode (clue
  numbering, across/down cell linking); `'anagram'` and `'letter-grid'`
  share most selection/validation logic.

---

### Component: MemoryMatch

- **Purpose:** Tile-flipping "concentration" memory game with match
  detection.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `pairs: { id: string, icon: ReactNode }[]` – Unique pairs; `MemoryMatch`
    duplicates and shuffles each into two tiles internally, so pass one
    entry per pair, not two.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `columns?: number` – Grid columns (default: derived from `pairs.length`
    to form a roughly square grid).
  - `flipBackDelay?: number` – Delay in ms before a non-matching pair flips
    back (default: `1000`).
  - `maxFlipped?: number` – Max simultaneously face-up unmatched tiles before
    input is blocked until they resolve (default: `2`, classic
    memory-match rules).
  - `className?: string`.
  - `variant?: 'default' | 'timed'` (default: `'default'`). `'timed'` adds a
    countdown (`timeLimit`) and fails via `onTimeout` if not completed in
    time.
  - `timeLimit?: number` – Seconds, only used when `variant="timed"`.
  - `onFlip?: (tileId: string) => void`.
  - `onMatch?: (pairId: string) => void`.
  - `onMismatch?: (tileIdA: string, tileIdB: string) => void`.
  - `onComplete?: (data: { moves: number, timeElapsed: number }) => void`.
  - `onTimeout?: () => void`.
  - `aria-label?: string`.
  - `previewDuration?: number` – Briefly reveal all tiles at the start
    before hiding them, in ms (default: `0`, no preview).
  - `showMoveCounter?: boolean` – Show a move counter (default: `true`).
- **State:** `flippedTiles`, `matchedPairs`, `moves`, `isComplete`.
- **Events:** `onFlip`, `onMatch`, `onMismatch`, `onComplete`, `onTimeout`.
- **Variants:** `default`, `timed` (via `variant` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{columns}`, `gap-2`; tiles
  `aspect-square rounded-lg bg-gray-700`, `transition-transform` for the flip
  (`rotateY`); matched tiles `opacity-50 pointer-events-none`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useMemo`.
- **Composition:** Composes `Puzzle`, `Grid`, `Box`, `Icon`.
- **Accessibility:** `role="grid"`, `aria-label="Memory match"`; each tile
  `role="gridcell"` with `aria-label` reflecting face-down/face-up/matched
  state (never revealing the hidden icon's identity to assistive tech before
  it's flipped, to avoid giving away the puzzle); keyboard arrow navigation
  plus Enter/Space to flip.
- **Rebuild Notes:** Shuffle `pairs` into tile positions on mount using
  `useMemo` seeded once per puzzle instance (not on every render, which
  would re-shuffle mid-game).

---

### Component: CombinationLock

- **Purpose:** Rotating-dial or multi-wheel combination lock interface,
  distinct from `CodePuzzle`'s direct digit entry.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `wheels: number` – Number of dial wheels.
  - `range?: { min: number, max: number }` – Value range per wheel (default:
    `{ min: 0, max: 9 }`).
  - `correctCombination: number[]` – Expected value per wheel, length
    `wheels`.
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `values?: number[]` – Current wheel values (controlled); defaults to
    all-`range.min` for uncontrolled mode.
  - `className?: string`.
  - `variant?: 'dial' | 'wheel-strip'` (default: `'dial'`). `'dial'` renders
    each wheel as a rotary knob; `'wheel-strip'` renders a
    vertically-scrolling numeral strip per wheel (odometer-style).
  - `onChange?: (values: number[]) => void`.
  - `onWheelChange?: (wheelIndex: number, value: number) => void`.
  - `onSubmit?: (values: number[]) => void` – Called on explicit confirm (if
    `autoCheck` is `false`).
  - `autoCheck?: boolean` – Check the combination continuously as wheels
    change rather than requiring an explicit submit (default: `true`).
  - `onSuccess?: () => void`.
  - `onFailure?: () => void`.
  - `aria-label?: string`.
  - `wrapAround?: boolean` – Whether incrementing past `range.max` wraps to
    `range.min` (default: `true`).
  - `dragSensitivity?: number` – Pixels of drag per increment for `'dial'`
    variant (default: `20`).
- **State:** `values`, `isUnlocked`.
- **Events:** `onChange`, `onWheelChange`, `onSubmit`, `onSuccess`,
  `onFailure`.
- **Variants:** `dial`, `wheel-strip` (via `variant` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`.
- **Tailwind/UI Behavior:** `flex gap-2`; dial `w-16 h-16 rounded-full
  border-4` with a rotation `transform`; wheel-strip `overflow-hidden h-12
  w-8` with a vertically-translated numeral column.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@use-gesture/react@^10`.
- **Composition:** Composes `Puzzle`, `Box`.
- **Accessibility:** `role="group"`, `aria-label="Combination lock"`; each
  wheel is `role="slider"` with `aria-valuenow`/`aria-valuemin`/
  `aria-valuemax`; keyboard Up/Down (or Left/Right) adjusts the focused
  wheel by one increment, matching `Slider`'s keyboard pattern.
- **Rebuild Notes:** Drag/scroll-to-rotate via `@use-gesture/react`, same
  dependency `Joystick` uses; keyboard arrows are the accessible fallback
  for drag interaction.

---

### Component: PatternLock

- **Purpose:** Android-style grid pattern-drawing lock.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `gridSize?: number` – Dots per side (default: `3`, a 3×3 grid).
  - `correctPattern: number[]` – Expected sequence of dot indices (row-major,
    `0`-indexed).
  - `pcEntity?: string` – PlayCanvas puzzle entity.
  - `minLength?: number` – Minimum number of dots required before a pattern
    can be submitted (default: `4`).
  - `className?: string`.
  - `variant?: 'default' | 'invisible'` (default: `'default'`). `'invisible'`
    hides the dot/line visuals during drawing (dots only appear on
    completion), for a higher-difficulty variant.
  - `onDotConnect?: (dotIndex: number) => void` – Called as each dot is
    connected while dragging.
  - `onPatternComplete?: (pattern: number[]) => void` – Called on pointer
    release, before validation.
  - `onSuccess?: () => void`.
  - `onFailure?: (attempt: number[]) => void`.
  - `aria-label?: string`.
  - `allowRetry?: boolean` – Allow immediately redrawing after a failed
    attempt (default: `true`).
  - `maxAttempts?: number` – Maximum attempts before lockout (default: `5`;
    `0` means unlimited).
  - `onLockout?: (lockoutSeconds: number) => void` – Called when
    `maxAttempts` is exhausted.
  - `lockoutDuration?: number` – Seconds to lock out input after
    `maxAttempts` exhausted (default: `30`).
- **State:** `currentPattern`, `isDrawing`, `attempts`, `isLockedOut`.
- **Events:** `onDotConnect`, `onPatternComplete`, `onSuccess`, `onFailure`,
  `onLockout`.
- **Variants:** `default`, `invisible` (via `variant` prop).
- **PlayCanvas Integration:** Submits via `usePuzzleSubmit`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-{gridSize}`, `gap-8`,
  `relative`; dots `w-4 h-4 rounded-full bg-gray-500`, connected
  `bg-blue-500`; an `<svg>` overlay draws the connecting lines as the
  pointer drags.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@use-gesture/react@^10`.
- **Composition:** Composes `Puzzle`, `Box`.
- **Accessibility:** A pointer-drag-only interaction has no native keyboard
  equivalent — provide a keyboard-accessible alternative input path (e.g.,
  an `aria-label`led sequential dot-selection mode toggled via a visible
  control) rather than gating the puzzle entirely behind pointer/touch drag;
  `role="application"` with instructions in `aria-describedby` explaining the
  alternate input mode.
- **Rebuild Notes:** Track pointer position against dot hit-boxes to detect
  connections mid-drag; the accessible keyboard-alternative mode is not
  optional — pattern-drag puzzles are otherwise entirely unusable without a
  pointer.

---

## Category: Dialogue

### Component: Dialogue

- **Purpose:** Character dialogue display with typewriter effect and choice
  handling.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `speaker?: string | Speaker` where
    `Speaker = { name: string, avatar?: string, color?: string }` – Speaker
    name, or a richer speaker object when per-speaker styling (`color`) or an
    avatar override distinct from the top-level `avatar` prop is needed; a
    plain `string` is treated as `{ name: speaker }`.
  - `avatar?: string` – Avatar image URL (overridden by `speaker.avatar` when
    `speaker` is a `Speaker` object).
  - `text: string` – Dialogue text. Plain text only — for rich text/inline
    HTML (bold, color spans, etc.), compose `Dialogue`'s content manually
    using `Text`'s `dangerouslySetInnerHTML`, since `Dialogue`'s typewriter
    effect operates on plain characters and doesn't parse markup.
  - `pcEntity?: string` – PlayCanvas dialogue entity.
  - `typingSpeed?: number` – Characters per second (default: `30`; per message
    can override).
  - `autoAdvance?: boolean` – Auto-advance to next line (default: `false`).
  - `autoAdvanceDelay?: number` – Delay before auto-advance in ms (default:
    `2000`).
  - `className?: string`.
  - `variant?: 'standard' | 'cinematic' | 'minimal' | 'with-avatar'` (default:
    `'standard'`).
  - `onOpen?: () => void` – Called when the dialogue box opens/mounts visibly.
  - `onComplete?: () => void` – Text complete handler.
  - `onSkip?: () => void` – Skip handler.
  - `onAdvance?: () => void` – Advance handler.
  - `onChoice?: (choice: string) => void` – Choice selection handler (receives
    choice text).
  - `onChoiceSelect?: (choice: { id?: string, text: string }) => void` –
    Richer alternative to `onChoice`, receiving a choice object (with `id`
    when available) instead of just the choice text; fires alongside
    `onChoice`.
  - `onChoiceHover?: (choice: string) => void` – Called when a choice gains
    hover/focus (mirrors `Choice`'s own `onHover`, surfaced at the `Dialogue`
    level).
  - `onChoiceFocus?: (choice: string) => void` – Called when a choice
    receives keyboard focus.
  - `onClose?: () => void`.
  - `aria-label?: string`.
  - `voiceOver?: boolean` – Enable text-to-speech (if supported).
  - `onTypingStart?: () => void` – Called when typing starts.
  - `onTextStart?: () => void` – Alias for `onTypingStart`; identical
    signature, fires alongside it.
  - `onTypingEnd?: () => void` – Called when typing ends.
  - `onTextEnd?: () => void` – Alias for `onTypingEnd`; identical signature,
    fires alongside it.
  - `showSkip?: boolean` – Show skip button (default: `true`).
  - `history?: any` – Optional history integration (pass `History` component).
- **State:** `isVisible`, `isTyping`, `displayedText`, `choices`.
- **Events:** `onOpen`, `onComplete`, `onSkip`, `onAdvance`, `onChoice`,
  `onChoiceSelect`, `onChoiceHover`, `onChoiceFocus`, `onClose`,
  `onTypingStart`, `onTextStart`, `onTypingEnd`, `onTextEnd`.
- **Variants:** `standard`, `cinematic`, `minimal`, `with-avatar` (via `variant`
  prop).
- **PlayCanvas Integration:** Pulls dialogue via `useDialogueSync`; sends
  choices via `useDialogueChoice`.
- **Tailwind/UI Behavior:** `bg-black/80`, `text-white`, `p-4`, `rounded-lg`,
  `border-2`, `max-w-2xl`, `backdrop-blur`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`,
  `@radix-ui/react-focus-trap`.
- **Composition:** Composes `Box`, `Text`, `Button`, and internal `Typewriter`;
  uses `FocusTrap`.
- **Performance:** `typingSpeed` (default `30` characters/second) drives a
  `requestAnimationFrame`/interval tick per character reveal; very high
  speeds (hundreds of cps) collapse into effectively-instant reveal, so
  prefer `autoAdvance`/skip over pushing `typingSpeed` higher for "fast"
  dialogue, and avoid re-mounting `Dialogue` on every line if `typingSpeed`
  is per-message — reuse the component instance and update `text` instead.
- **Accessibility:** `role="dialog"` by default; use `role="alertdialog"`
  instead (e.g., via `role` override) for dialogue that represents an urgent
  interruption requiring immediate acknowledgment, since `alertdialog`
  signals higher urgency than a standard `dialog`; `aria-label="Dialogue"`,
  `aria-live="polite"`; trap focus; choices are buttons.
- **Rebuild Notes:** Uses `useTypewriter`; auto‑advance configurable; supports
  skip and fast‑forward.

---

### Component: Choice

- **Purpose:** Choice button in dialogue tree, part of `Dialogue`.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `choice: string` – Choice text. Plain text only; for rich text, render a
    custom node via `Dialogue`'s composition instead — `Choice` does not
    accept `ReactNode`/`dangerouslySetInnerHTML` for `choice`.
  - `selected?: boolean` – Selected state.
  - `pcEntity?: string` – PlayCanvas choice ID.
  - `disabled?: boolean` – Disable choice.
  - `className?: string`.
  - `variant?: 'primary' | 'secondary' | 'destructive' | 'neutral'` (default:
    `'primary'`).
  - `onSelect?: (e?: React.SyntheticEvent) => void` – Called on activation
    (click, Enter, Space, or `hotkey`); the originating event is passed when
    available (`undefined` for programmatic/hotkey-triggered activation).
  - `onClick?: (e: React.MouseEvent) => void` – Alias for `onSelect` scoped
    to pointer activation only; fires alongside `onSelect`.
  - `onKeyDown?: (e: React.KeyboardEvent) => void` – Raw keydown handler,
    useful for custom key handling beyond the built-in Enter/Space/`hotkey`
    activation.
  - `onHover?: () => void`.
  - `onFocus?: () => void`.
  - `onBlur?: () => void`.
  - `aria-label?: string`.
  - `hotkey?: string` – Keyboard shortcut (e.g., `'1'`).
  - `autoFocus?: boolean` – Auto-focus when visible (default: `false`).
- **State:** `isHovered`, `isFocused`.
- **Events:** `onSelect`, `onClick`, `onKeyDown`, `onHover`, `onFocus`,
  `onBlur`.
- **Variants:** `primary`, `secondary`, `destructive`, `neutral` (via `variant`
  prop).
- **PlayCanvas Integration:** Sends choice via `useDialogueChoice`.
- **Tailwind/UI Behavior:** `bg-gray-700`, `hover:bg-gray-600`, `px-4`, `py-2`,
  `rounded-md`, `transition-colors`; selected `ring-2 ring-blue-500`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Button` and `Text`; uses react‑aria.
- **Accessibility:** `role="menuitem"` (more accurate than the previous
  `role="button"`, since `Choice` is normally one of a set of options in a
  `Dialogue`'s choice menu), `aria-label="${choice}"`; keyboard Enter/Space
  or `hotkey`; `aria-selected` when part of a single-select list, or
  `aria-checked` (true/false) when the choice set behaves like a toggleable
  set of options rather than a one-shot menu.
- **Rebuild Notes:** Part of `Dialogue`; uses react‑aria; can be standalone.

---

### Component: History

- **Purpose:** Scrollable history of dialogue lines with timestamps.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `entries: { text: string, timestamp: Date | string, speaker?: string }[]` –
    History entries. `timestamp` accepts either a `Date` object or an ISO
    string; `History` normalizes both to `Date` internally before display and
    formats with the locale's default date-time format — pass a pre-formatted
    `string` in `text` instead if you need custom timestamp formatting.
  - `maxEntries?: number` – Maximum entries to store (default: `100`; `0` means
    unlimited).
  - `pcEntity?: string` – PlayCanvas history entity.
  - `className?: string`.
  - `variant?: 'slide-in' | 'overlay' | 'sidebar'` (default: `'slide-in'`).
  - `onToggle?: () => void`.
  - `onClear?: () => void`.
  - `onEntryClick?: (entry: { text: string, timestamp: Date }, e: React.MouseEvent) => void`
    – Click handler; receives both the entry and the originating mouse event.
  - `onEntryHover?: (entry: { text: string, timestamp: Date } | null) => void`
    – Called when an entry gains or loses hover.
  - `onEntryFocus?: (entry: { text: string, timestamp: Date }) => void` –
    Called when an entry receives keyboard focus.
  - `aria-label?: string`.
  - `onExport?: (entries: any[]) => void` – Export history as JSON.
  - `searchable?: boolean` – Enable search (default: `false`).
  - `onSearch?: (query: string) => void` – Called when the search input
    changes (only relevant when `searchable` is `true`).
  - `filter?: (entry: any) => boolean` – Custom filter function.
  - `onFilter?: (visibleCount: number) => void` – Called whenever `filter` (or
    `onSearch`'s query) changes the set of visible entries, with the
    resulting visible count.
- **State:** `isOpen`, `entries`.
- **Events:** `onToggle`, `onClear`, `onEntryClick`, `onEntryHover`,
  `onEntryFocus`, `onExport`, `onSearch`, `onFilter`.
- **Variants:** `slide-in`, `overlay`, `sidebar` (via `variant` prop).
- **PlayCanvas Integration:** Reads history via `useDialogueHistory`.
- **Tailwind/UI Behavior:** `bg-black/90`, `text-white`, `p-4`, `max-h-64`,
  `overflow-y-auto`, `rounded-lg`, `scrollbar-thin`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useScrollToBottom`.
- **Composition:** Composes `Box`, `Text`, `ScrollArea`, `Button`.
- **Accessibility:** `role="log"`, `aria-label` defaulting to
  `"Dialogue history, ${entries.length} entries"` (announces the entry count
  so screen reader users know the log's size up front, not just its label);
  auto‑scroll to bottom via `useScrollToBottom`; `aria-live="off"`.
- **Rebuild Notes:** Uses `useScrollToBottom` hook; stores entries locally; can
  be cleared or exported.

---

### Component: Subtitle

- **Purpose:** Simplified, choice-free dialogue/subtitle view for cutscenes —
  full-screen or bottom-centered, with auto-advance and speaker styling,
  distinct from `Dialogue`'s full choice-tree UI.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `speaker?: string | { name: string, color?: string }` – Same shape
    convention as `Dialogue`'s `speaker`.
  - `text: string` – Subtitle text (plain text; same rich-text limitation as
    `Dialogue`'s `text`).
  - `pcEntity?: string` – PlayCanvas dialogue entity (typically shared with
    `Dialogue`/`useDialogueSync`).
  - `duration?: number` – Auto-advance duration in ms; overrides
    `autoAdvanceDelay`-style computation from text length when set
    explicitly.
  - `autoAdvance?: boolean` – Auto-advance to the next line (default: `true`,
    unlike `Dialogue`'s default of `false`, since cutscene subtitles are
    typically non-interactive).
  - `readingSpeed?: number` – Words per minute used to compute `duration`
    automatically when it's not set (default: `200`).
  - `variant?: 'bottom-bar' | 'fullscreen-centered'` (default:
    `'bottom-bar'`).
  - `className?: string`.
  - `onComplete?: () => void` – Called when the subtitle's display duration
    elapses.
  - `onSkip?: () => void`.
  - `showSpeakerName?: boolean` – Show the speaker's name above the text
    (default: `true`).
  - `aria-label?: string`.
  - `fadeTransition?: boolean` – Cross-fade between consecutive subtitles
    rather than a hard cut (default: `true`).
- **State:** `isVisible`, `progress`.
- **Events:** `onComplete`, `onSkip`.
- **Variants:** `bottom-bar`, `fullscreen-centered` (via `variant` prop).
- **PlayCanvas Integration:** Pulls lines via `useDialogueSync` (same hook as
  `Dialogue`), without wiring `useDialogueChoice` since `Subtitle` has no
  choices.
- **Tailwind/UI Behavior:** `bg-black/70`, `text-white`, `text-center`,
  `p-3`; `bottom-bar` is `fixed bottom-8 left-1/2 -translate-x-1/2`;
  `fullscreen-centered` is `fixed inset-0 flex items-center justify-center
  bg-black`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`.
- **Accessibility:** `role="status"`, `aria-live="polite"`; no
  typewriter/choice interaction to manage, so focus handling is simpler than
  `Dialogue` — doesn't trap focus since it's typically non-interactive
  during a cutscene.
- **Rebuild Notes:** Use for cutscenes and non-interactive story beats;
  switch to `Dialogue` as soon as branching choices are needed.

---

## Category: Objectives

### Component: Objectives

- **Purpose:** Main objectives display with progress and completion tracking.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `objectives: Objective[]` where
    `Objective = { id: string, name: string, description?: string, progress?: number, maxProgress?: number, subtasks?: { id: string, name: string, completed: boolean, progress?: number }[] }`
    – `progress` is a raw count against `maxProgress` (e.g., `progress: 3,
maxProgress: 10`, not a pre-normalized `0–1` fraction); when
    `maxProgress` is omitted, `progress` is treated as a `0–1` fraction
    instead. `subtasks[].progress` mirrors this for objectives whose
    subtasks themselves track partial progress rather than a plain
    complete/incomplete boolean.
  - `pcEntity?: string` – PlayCanvas objective entity.
  - `showCompleted?: boolean` – Show completed objectives (default: `true`).
  - `className?: string`.
  - `variant?: 'list' | 'compact' | 'sidebar' | 'timeline'` (default: `'list'`).
  - `sortOrder?: 'default' | 'progress' | 'alphabetical'` – Sorting (default:
    `'default'`, meaning insertion order — the order objectives appear in the
    `objectives` array, with no re-sorting applied).
  - `emptyState?: ReactNode` – Custom content when no objectives.
  - `onComplete?: (id: string) => void`.
  - `onObjectiveComplete?: (id: string) => void` – Alias for `onComplete`;
    identical signature, fires alongside it.
  - `onUpdate?: (id: string, progress: number) => void`.
  - `onObjectiveProgress?: (id: string, progress: number) => void` – Alias
    for `onUpdate`; identical signature, fires alongside it.
  - `onObjectiveAdd?: (objective: Objective) => void` – Called when a new
    objective is added to `objectives` (detected via array diff).
  - `onObjectiveRemove?: (id: string) => void` – Called when an objective is
    removed from `objectives`.
  - `onToggle?: (id: string) => void` – Expand/collapse.
  - `aria-label?: string`.
  - `groupBy?: 'status' | 'type' | 'none'` – Group objectives (default:
    `'none'`).
  - `onGroupChange?: (group: string) => void` – Called when the active group
    changes (e.g., a group is expanded/collapsed, or `groupBy` changes).
  - `onReorder?: (newOrder: string[]) => void` – Called after reordering.
  - `collapsible?: boolean` – Allow collapsing sections (default: `true`).
- **State:** `activeObjectives`, `completedObjectives`, `expanded`.
- **Events:** `onComplete`, `onObjectiveComplete`, `onUpdate`,
  `onObjectiveProgress`, `onObjectiveAdd`, `onObjectiveRemove`, `onToggle`,
  `onGroupChange`, `onReorder`.
- **Variants:** `list`, `compact`, `sidebar`, `timeline` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useObjectiveSync`.
- **Tailwind/UI Behavior:** `bg-gray-900/90`, `text-white`, `p-4`, `rounded-lg`;
  `flex-col`, `gap-2`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Flex`, `Objective`, `Progress`.
- **Accessibility:** `role="navigation"` (rather than the previous generic
  `role="list"`, since active objectives function as a navigable set of
  current goals) with `aria-label="Objectives"`; `aria-live="polite"` for
  progress; each item `role="listitem"` within the navigation landmark.
- **Rebuild Notes:** Uses `useObjectiveProgress`; supports reordering and
  filtering.

---

### Component: Objective

- **Purpose:** Single objective with progress indicator and subtask expansion.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `objective: Objective` – Objective data.
  - `isCompleted?: boolean` – Completed state.
  - `pcEntity?: string` – PlayCanvas objective ID.
  - `className?: string`.
  - `variant?: 'compact' | 'expanded' | 'with-subtasks'` (default: `'compact'`).
  - `onToggle?: (id: string) => void`.
  - `onClick?: (id: string) => void` – Called on click anywhere on the
    objective row (independent of `onToggle`, which is specifically for the
    expand/collapse chevron).
  - `onDoubleClick?: (id: string) => void` – Double-click handler for the
    objective row.
  - `onUpdateProgress?: (id: string, progress: number) => void`.
  - `onSubtaskComplete?: (subtaskId: string) => void`.
  - `onSubtaskToggle?: (subtaskId: string) => void` – Alias for
    `onSubtaskComplete`, named for parity with subtasks that can be
    un-completed (toggled) rather than only completed; identical signature,
    fires alongside it.
  - `onSubtaskClick?: (subtaskId: string) => void` – Called on click on a
    subtask row, independent of `onSubtaskToggle`'s checkbox-style toggle.
  - `aria-label?: string`.
  - `showProgress?: boolean` – Show progress bar (default: `true`).
  - `onExpand?: (id: string) => void` – Called when expanded.
  - `onCollapse?: (id: string) => void` – Called when collapsed.
- **State:** `progress`, `isExpanded`, `subtaskProgress`.
- **Events:** `onToggle`, `onClick`, `onDoubleClick`, `onUpdateProgress`,
  `onSubtaskComplete`, `onSubtaskToggle`, `onSubtaskClick`, `onExpand`,
  `onCollapse`.
- **Variants:** `compact`, `expanded`, `with-subtasks` (via `variant` prop).
- **PlayCanvas Integration:** Reads/writes via `useObjectiveProgress`.
- **Tailwind/UI Behavior:** `flex`, `items-center`, `gap-2`, `p-2`, `rounded`,
  `hover:bg-gray-800`; completed `opacity-50` and `line-through`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Progress`, `Icon` (chevron),
  `Button`.
- **Accessibility:** `role="listitem"`, `aria-label="${objective.name}"`,
  `aria-level` set to `1` for a top-level objective and `2` for a rendered
  subtask, so nested subtasks are announced as a level deeper within the
  parent `Objectives` navigation landmark; `aria-live="polite"`; expanded
  subtasks `role="list"`.
- **Rebuild Notes:** Supports expansion/collapse; uses `useMemo` for subtask
  calculations.

---

## Category: Timer

### Component: Timer

- **Purpose:** Countdown/up timer with pause/resume and PlayCanvas time sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `initialTime: number` – Initial time in seconds.
  - `mode?: 'countdown' | 'countup'` – Timer mode (default: `'countup'`).
    **Note:** The former `isCountdown` boolean prop has been removed from
    `Timer`'s public API; use `mode` instead (the internal `useTimer` hook
    still accepts its own `isCountdown` option — that's a separate,
    non-deprecated hook-level prop, not this component's).
  - `autoStart?: boolean` – Auto-start on mount (default: `false`).
  - `pcEntity?: string` – PlayCanvas timer entity.
  - `format?: 'mm:ss' | 'HH:mm:ss' | 'ss' | ((seconds: number) => string)` –
    Time display format (default: `'mm:ss'`); pass a function for a fully
    custom format not covered by the presets.
  - `variant?: 'digital' | 'circular' | 'analog'` – Visual style (default:
    `'digital'`).
  - `className?: string`.
  - `onTick?: (time: number) => void`.
  - `onTimeChange?: (time: number) => void` – Alias for `onTick`; identical
    signature, fires alongside it.
  - `onFinish?: () => void`.
  - `onPause?: () => void`.
  - `onStop?: () => void` – Alias for `onPause`; identical signature, fires
    alongside it.
  - `onResume?: (timestamp: number) => void` – Receives the `Date.now()`
    timestamp at which the timer resumed.
  - `onReset?: () => void`.
  - `onRestart?: () => void` – Called when the timer is reset and immediately
    restarted (as opposed to `onReset`, which may leave the timer stopped).
  - `onStart?: (timestamp: number) => void` – Receives the `Date.now()`
    timestamp at which the timer started.
  - `aria-label?: string`.
  - `timeDilation?: number` – Time speed multiplier (default: `1`; `0`
    effectively pauses). Values `> 1` speed up the timer (e.g., `2` for
    double speed, useful for "bullet time" or debug fast-forward); values
    between `0` and `1` slow it down (e.g., `0.5` for half speed, useful for
    slow-motion sequences); negative values are not supported.
  - `onTimeUpdate?: (time: number) => void` – Called every update with current
    time.
  - `showMilliseconds?: boolean` – Show milliseconds (default: `false`).
- **State:** `time`, `isRunning`, `isPaused`, `isFinished`, `progress`.
- **Events:** `onTick`, `onTimeChange`, `onFinish`, `onPause`, `onStop`,
  `onResume`, `onReset`, `onRestart`, `onStart`, `onTimeUpdate`.
- **Variants:** `countdown`, `countup` (via `mode`); `circular`, `digital`,
  `analog` (via `variant`).
- **PlayCanvas Integration:** Syncs via `useTimerSync` – bidirectional.
- **Tailwind/UI Behavior:** `font-mono`, `text-2xl`, `tabular-nums`; circular
  variant uses SVG; progress bar `h-2`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useTimer`.
- **Composition:** Composes `Box`, `Text`, `Icon`; uses `useTimer` with
  `requestAnimationFrame` (falls back to `setInterval` in background).
- **Accessibility:** `role="timer"`, `aria-label` defaulting to a description
  of the current formatted time (e.g., `"Timer: 02:30 remaining"`) so
  screen readers announce both the role and the value together, not just the
  bare role; `aria-live="polite"`; high contrast; announces significant
  changes.
- **Rebuild Notes:** Uses `useTimer` hook; syncs with PC on pause/resume;
  supports time dilation.

---

### Component: Stopwatch

- **Purpose:** Precise elapsed time display with lap functionality.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `format?: 'mm:ss' | 'HH:mm:ss' | 'ss' | ((seconds: number) => string)` –
    Time display format (default: `'mm:ss'`); pass a function for a fully
    custom format, same as `Timer`.
  - `pcEntity?: string` – PlayCanvas timer entity.
  - `variant?: 'simple' | 'with-laps' | 'split'` (default: `'simple'`).
  - `className?: string`.
  - `onStart?: () => void`.
  - `onStop?: () => void`.
  - `onLap?: (lapTime: number) => void` – Called on each lap, with the
    elapsed time (ms) at the moment the lap was recorded.
  - `onReset?: () => void`.
  - `onLapRecord?: (lapTime: number, lapIndex: number) => void` – Called when
    lap recorded.
  - `aria-label?: string`.
  - `maxLaps?: number` – Maximum laps to store (default: `Infinity`).
  - `averageLapTime?: number` – Computed average lap time.
  - `onAverageLap?: (averageLapTime: number) => void` – Called when
    `averageLapTime` recomputes (after each new lap).
  - `bestLap?: number` – Best lap time.
  - `onBestLap?: (lapTime: number, lapIndex: number) => void` – Called when a
    new lap becomes the best (lowest) recorded lap time.
  - `onLapReset?: () => void` – Called when laps are cleared.
  - `onLapClear?: () => void` – Alias for `onLapReset`; identical signature,
    fires alongside it.
- **State:** `elapsed`, `laps`, `isRunning`, `isPaused`.
- **Events:** `onStart`, `onStop`, `onLap`, `onReset`, `onLapRecord`,
  `onAverageLap`, `onBestLap`, `onLapReset`, `onLapClear`.
- **Variants:** `simple`, `with-laps`, `split` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useStopwatchSync`.
- **Tailwind/UI Behavior:** `font-mono`, `text-xl`, `tabular-nums`; lap list
  `overflow-auto`, `max-h-32`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useStopwatch`.
- **Composition:** Composes `Timer` and `Button`; adds lap management. Lap
  times are recorded at the resolution of the underlying
  `requestAnimationFrame` tick (effectively sub-16ms on a 60Hz display, but
  not a guaranteed hardware-timer precision) — `showMilliseconds` on the
  composed `Timer` controls whether that resolution is surfaced in the
  display, but the recorded `lapTime` values themselves always carry
  millisecond precision internally regardless of display formatting.
- **Accessibility:** `role="timer"`, `aria-label="Stopwatch"`; announces lap
  times.
- **Rebuild Notes:** Extends `Timer`; uses `useStopwatch` hook.

---

## Category: Navigation

### Component: NavMenu

- **Purpose:** Primary navigation between game screens/rooms with keyboard
  support.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: NavItem[]` where
    `NavItem = { id: string, label: string, path?: string, icon?: ReactNode, children?: NavItem[], disabled?: boolean }`
    – `path` is optional because not every item necessarily navigates (a
    parent item with only `children` may act purely as a submenu trigger).
    `NavMenu` itself does not integrate with any router; it calls `onNavigate`
    with the item's `path`, and the consumer is responsible for wiring that
    into `react-router-dom`'s `useNavigate` (or an equivalent) — `path` values
    are opaque strings to `NavMenu`, not validated routes.
  - `pcEntity?: string` – PlayCanvas navigation entity.
  - `className?: string`.
  - `activePath?: string` – Currently active path.
  - `variant?: 'horizontal' | 'vertical' | 'dropdown' | 'sidebar'` (default:
    `'horizontal'`). **Note:** The former `orientation` prop has been removed
    from the public API; `variant` now controls both layout orientation and
    style in one prop.
  - `onNavigate?: (path: string) => void`.
  - `onItemClick?: (item: NavItem) => void` – Alias for `onNavigate`, but
    receives the full `NavItem` rather than just its `path`; fires alongside
    `onNavigate`.
  - `onHover?: (path: string | null) => void`.
  - `onItemHover?: (item: NavItem | null) => void` – Alias for `onHover`,
    receiving the full `NavItem`; fires alongside `onHover`.
  - `onItemFocus?: (item: NavItem) => void` – Called when a nav item receives
    keyboard focus.
  - `onOpenChange?: (open: boolean) => void`.
  - `onMenuOpen?: () => void` – Called when a dropdown/sidebar submenu opens
    (relevant for `'dropdown'`/`'sidebar'` variants).
  - `onMenuClose?: () => void` – Called when a dropdown/sidebar submenu
    closes.
  - `aria-label?: string`.
  - `activeClassName?: string` – Additional class for active item (default:
    `'bg-primary'`).
  - `closeOnClick?: boolean` – Close menu on item click (mobile, default:
    `true`).
  - `keyboardShortcut?: string` – Keyboard shortcut to open menu (e.g., `'M'`).
- **State:** `activePath`, `isOpen`, `hoveredPath`.
- **Events:** `onNavigate`, `onItemClick`, `onHover`, `onItemHover`,
  `onItemFocus`, `onOpenChange`, `onMenuOpen`, `onMenuClose`.
- **Variants:** `horizontal`, `vertical`, `dropdown`, `sidebar` (via `variant`).
- **PlayCanvas Integration:** Triggers scene transitions via `useTransition`.
- **Tailwind/UI Behavior:** `flex`, `gap-2`, `p-2`; active `bg-primary`;
  `hover:`, `focus:`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `react-router-dom`
  (optional), `react-aria` (useMenu).
- **Composition:** Composes `Box`, `Button`, `Text`; uses `useMenu` from
  react‑aria.
- **Accessibility:** `role="navigation"`, `aria-label="Main navigation"`;
  keyboard arrow keys; each item `role="menuitem"`.
- **Rebuild Notes:** Uses `useMenu`; supports nested menus via `Dropdown`
  (internal subcomponent). Use `variant` to set both orientation and style
  (the former separate `orientation` prop has been removed).

---

### Component: Back

- **Purpose:** Navigate back to previous scene/state with loading indicator.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label?: string` – Button label.
  - `icon?: string` – Icon name (default: `'arrow-left'`).
  - `pcTarget?: string` – PlayCanvas target scene (if history not available).
    A plain `string`, not a typed enum of scene names — scene names are
    project-defined and not known at the component-library level, so there's
    no compile-time validation; an unresolved scene name is a runtime error
    from `useTransition`.
  - `className?: string`.
  - `onBack?: (data: { fromPath?: string, toPath?: string, viaHistory: boolean }) => void`
    – Called after navigating back, with basic navigation context (whether it
    used browser/router history vs. falling back to `pcTarget`).
  - `variant?: 'icon-only' | 'with-label' | 'text-only'` (default:
    `'icon-only'`). `'text-only'` renders `label` as the visible content with
    no icon; if `label` is not provided in this variant, the button falls
    back to `aria-label` (or `"Go back"`) as its text — always pass `label`
    explicitly when using `'text-only'` so the button isn't rendered empty.
  - `onBeforeBack?: () => void | boolean` – If returns `false`, prevents
    navigation.
  - `onConfirmBack?: () => void` – Called when the user confirms navigation
    in the `confirmBeforeBack` dialog.
  - `onCancelBack?: () => void` – Called when the user cancels navigation in
    the `confirmBeforeBack` dialog.
  - `aria-label?: string` – Overrides the default `"Go back"` accessible
    name; always customizable via this standard prop.
  - `loading?: boolean` – Loading state.
  - `confirmBeforeBack?: boolean` – Show confirmation dialog before back.
- **State:** `isHovered`, `isLoading`.
- **Events:** `onBack`, `onBeforeBack`, `onConfirmBack`, `onCancelBack`.
- **Variants:** `text-only`, `icon-only`, `with-label` (via `variant` prop).
- **PlayCanvas Integration:** Triggers scene transition via `useTransition`.
- **Tailwind/UI Behavior:** `absolute`, `top-4`, `left-4`, `z-50`;
  `bg-gray-800/80`, `hover:bg-gray-700`, `p-2`, `rounded-full`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Button`, `Icon`, `Text`; uses `useNavigate` if
  react‑router available.
- **Accessibility:** `role="button"`, `aria-label` defaulting to `"Go back"`
  but fully customizable via the `aria-label` prop; keyboard accessible.
- **Rebuild Notes:** Works with navigation history stack; falls back to default
  scene.

---

### Component: Breadcrumb

- **Purpose:** Trail of navigation path segments for deep menu structures.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: { id: string, label: string, path?: string }[]` – Breadcrumb
    trail, root-first; the last item is typically the current
    (non-clickable) location.
  - `pcEntity?: string` – PlayCanvas navigation entity.
  - `separator?: ReactNode` – Custom separator between items (default: a
    chevron `Icon`).
  - `className?: string`.
  - `onNavigate?: (path: string) => void` – Same `path`-opaque contract as
    `NavMenu`'s `onNavigate`.
  - `maxVisible?: number` – Collapse middle items into an ellipsis/menu when
    the trail exceeds this length (default: unlimited).
  - `onEllipsisClick?: () => void` – Called when the collapsed-items
    indicator is activated (e.g., to show the full trail in a `Popover`).
  - `aria-label?: string`.
- **State:** `items`.
- **Events:** `onNavigate`, `onEllipsisClick`.
- **Variants:** None.
- **PlayCanvas Integration:** Triggers scene transitions via `useTransition`
  (same as `NavMenu`).
- **Tailwind/UI Behavior:** `flex items-center gap-1 text-sm`; links
  `text-gray-400 hover:text-white`; current (last) item `text-white
  font-medium`, non-interactive.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Button` (`as="a"`, or plain text for the
  current item), `Icon` (separator).
- **Accessibility:** `role="navigation"` with `aria-label="Breadcrumb"`;
  rendered as an ordered list (`role="list"`) of items; the current item
  carries `aria-current="page"`.
- **Rebuild Notes:** Same `path`/router-agnostic contract as `NavMenu`; use
  for `Settings`/`Editor`/`Inspector` deep menu trails.

---

### Component: SidebarMenu

- **Purpose:** Vertical, collapsible navigation panel, distinct from
  `NavMenu`'s horizontal/dropdown orientation.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: NavItem[]` – Same `NavItem` shape as `NavMenu`.
  - `pcEntity?: string` – PlayCanvas navigation entity.
  - `activePath?: string` – Currently active path.
  - `collapsed?: boolean` – Collapsed (icon-only) state (controlled).
  - `defaultCollapsed?: boolean` – Initial collapsed state for uncontrolled
    mode.
  - `onCollapsedChange?: (collapsed: boolean) => void`.
  - `collapsible?: boolean` – Whether the sidebar can be collapsed at all
    (default: `true`).
  - `width?: number` – Expanded width in pixels (default: `240`).
  - `collapsedWidth?: number` – Collapsed width in pixels (default: `64`).
  - `className?: string`.
  - `onNavigate?: (path: string) => void`.
  - `onItemClick?: (item: NavItem) => void`.
  - `variant?: 'push' | 'overlay'` (default: `'push'`). `'push'` shifts
    adjacent layout content; `'overlay'` floats above content without
    affecting layout.
  - `aria-label?: string`.
  - `pinnable?: boolean` – Show a pin control to keep an `'overlay'` sidebar
    open (default: `false`).
- **State:** `activePath`, `collapsed`, `isPinned`.
- **Events:** `onCollapsedChange`, `onNavigate`, `onItemClick`.
- **Variants:** `push`, `overlay` (via `variant` prop).
- **PlayCanvas Integration:** Triggers scene transitions via `useTransition`.
- **Tailwind/UI Behavior:** `h-full flex flex-col`, `w-{width}` transitioning
  to `w-{collapsedWidth}`, `transition-[width]`; items `flex items-center
  gap-3 px-3 py-2 rounded hover:bg-gray-800`; collapsed state hides labels,
  keeping icons centered.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `react-router-dom`
  (optional), `react-aria` (useMenu).
- **Composition:** Composes `Box`, `Flex`, `Button`, `Icon`, `Text`; uses
  `useMenu` from react-aria (same as `NavMenu`).
- **Accessibility:** `role="navigation"`, `aria-label="Sidebar navigation"`;
  collapsed items retain their `aria-label` (not just a bare icon) since the
  visible text is hidden, not removed from the accessibility tree.
- **Rebuild Notes:** Shares `NavItem` typing and `useTransition` integration
  with `NavMenu`; use for `Settings`/`Editor`/`DevTools`-style persistent
  side navigation rather than in-game primary navigation.

---

## Category: Feedback

### Component: Toast

- **Purpose:** Non-modal notification system with types and auto‑dismiss.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `message: string` – Notification message.
  - `type?: 'info' | 'success' | 'warning' | 'error'` (default: `'info'`).
    **Note:** `'loading'` type is removed; use `Spinner` for loading.
  - `duration?: number` – Auto-dismiss duration in ms (default: `3000`; `0` for
    persistent).
  - `pcEntity?: string` – PlayCanvas notification entity.
  - `position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
    (default: `'bottom-right'`).
  - `className?: string`.
  - `onDismiss?: (reason: 'timeout' | 'user' | 'action') => void` – Includes
    why the toast was dismissed: `'timeout'` (auto-dismiss elapsed), `'user'`
    (explicit dismiss click/keyboard), or `'action'` (an action button was
    used to close it).
  - `onMouseEnter?: (e: React.MouseEvent) => void` – Pause dismiss; includes
    the originating event.
  - `onMouseLeave?: (e: React.MouseEvent) => void` – Resume dismiss; includes
    the originating event.
  - `aria-label?: string`.
  - `title?: string` – Optional title.
  - `action?: { label: string, onClick: () => void }` – Single action.
  - `actions?: Array<{ label: string, onClick: () => void }>` – Multiple actions
    (overrides `action`).
  - `stack?: 'top' | 'bottom'` – Stack direction (default: `'bottom'`).
  - `onAction?: (index: number, action: { label: string, onClick: () => void }) => void`
    – Called when an action is clicked, with both its index and the full
    action object.
  - `onOpen?: (timestamp: number) => void` – Called when toast opens, with
    the `Date.now()` timestamp.
  - `onClose?: (reason: 'timeout' | 'user' | 'action') => void` – Called when
    toast closes, with the same reason enum as `onDismiss`.
- **State:** `isVisible`, `isDismissing`, `timer`.
- **Events:** `onDismiss`, `onMouseEnter`, `onMouseLeave`, `onAction`, `onOpen`,
  `onClose`.
- **Variants:** `info`, `success`, `warning`, `error` (via `type` prop).
- **PlayCanvas Integration:** Syncs via `useNotificationListener`.
- **Tailwind/UI Behavior:** `p-4`, `rounded-lg`, `shadow-lg`, `border-l-4`;
  color‑coded; `animate-slide-in` and `animate-fade-out`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useToast`.
- **Composition:** Composes `Box`, `Icon`, `Text`, `Button` (dismiss); uses
  `useToast`.
- **Accessibility:** `role="alert"` for `type="error"`/`type="warning"`
  (urgent, interrupts screen reader output); `role="status"` for
  `type="info"`/`type="success"` (non-critical, announced politely without
  interrupting) — `aria-live="polite"` either way (use `Toast` sparingly for
  `assertive`-level urgency; prefer a `Modal`/`Confirm` for anything that
  truly must block); `aria-atomic="true"`; keyboard dismiss.
- **Rebuild Notes:** Uses `useToast` for stack; auto‑dismiss; pause on hover.

---

### Component: Spinner

- **Purpose:** Loading indicator with optional progress and PlayCanvas sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `size?: 'sm' | 'md' | 'lg' | number` – Size. The named presets map to
    Tailwind scale classes (`'sm'`→`w-4 h-4`, `'md'`→`w-6 h-6`,
    `'lg'`→`w-8 h-8`); a numeric value is treated as raw **pixels** (not a
    Tailwind scale step, unlike `Icon`'s `size`) and applied via inline
    `width`/`height` style — e.g. `size={32}` renders a 32px spinner.
  - `color?: string` – Spinner color (Tailwind class, default:
    `'text-blue-500'`).
  - `label?: string` – Accessible label (default: `'Loading'`).
  - `pcEntity?: string` – PlayCanvas loading entity.
  - `showProgress?: boolean` – Show progress percentage (default: `false`).
  - `variant?: 'circular' | 'dots' | 'pulse'` (default: `'circular'`). **Note:**
    `'progress-bar'` removed; use `Progress` component instead for a
    determinate bar. `'dots'` and `'pulse'` remain valid, unrelated
    alternatives — removing `'progress-bar'` doesn't affect them.
  - `className?: string`.
  - `onLoad?: () => void` – Called when the underlying content the spinner
    represents finishes loading (paired with `onComplete`, which fires when
    the spinner itself completes any progress animation).
  - `onError?: (error: Error) => void` – Called if loading fails while the
    spinner is shown.
  - `onCancel?: () => void` – Called when loading is cancelled (e.g., a
    cancel action tied to the spinner's context) before completion.
  - `onComplete?: () => void`.
  - `onProgress?: (progress: number) => void`.
  - `progress?: number` – Progress value (0-100).
- **State:** `isVisible`, `progress`.
- **Events:** `onLoad`, `onError`, `onCancel`, `onComplete`, `onProgress`.
- **Variants:** `circular`, `dots`, `pulse` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useLoadingSync`.
- **Tailwind/UI Behavior:** `animate-spin`, `rounded-full`, `border-*`,
  `border-t-*`; dots `animate-bounce`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`; uses `useLoadingProgress`.
- **Accessibility:** `role="status"`, `aria-label="${label}"`,
  `aria-busy="true"` while visible; `aria-live="polite"`; `aria-valuenow` if
  progress.
- **Rebuild Notes:** Shows progress percentage if available; size maps to
  Tailwind; color uses `text-{color}`.

---

### Component: Progress

- **Purpose:** Generic progress indicator used by Health, Energy, etc.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `value: number` – Current value.
  - `max: number` – Maximum value.
  - `label?: string` – Accessible label.
  - `color?: string` – Progress color (Tailwind background-color class,
    default: `'bg-blue-500'`). Not restricted to the default — pass any
    Tailwind class, including a value computed from theme tokens/CSS
    variables (e.g., `'bg-[var(--color-accent)]'`), to match the surrounding
    theme rather than hardcoding blue.
  - `animated?: boolean` – Enable animation (default: `true`).
  - `indeterminate?: boolean` – Indeterminate state.
  - `variant?: 'determinate' | 'indeterminate' | 'segmented'` (default:
    `'determinate'`). **Note:** `'animated'` is not a variant — it is
    intentionally a separate boolean prop (`animated`) because animation is
    orthogonal to determinate/indeterminate/segmented display mode (any
    variant can be animated or not).
  - `className?: string`.
  - `onComplete?: () => void`.
  - `onChange?: (value: number) => void`.
  - `onValueChange?: (value: number) => void` – Alias for `onChange`;
    identical signature, fires alongside it.
  - `onMaxReached?: () => void` – Called when `value` reaches `max`.
  - `onMinReached?: () => void` – Called when `value` reaches `0`.
  - `aria-label?: string`.
  - `height?: number` – Progress bar height in px (default: `8`).
  - `segments?: number` – Number of segments for `segmented` variant (default:
    `10`).
  - `showValue?: boolean` – Show numeric value (default: `false`).
- **State:** `value`, `isIndeterminate`.
- **Events:** `onComplete`, `onChange`, `onValueChange`, `onMaxReached`,
  `onMinReached`.
- **Variants:** `determinate`, `indeterminate`, `segmented` (via `variant`
  prop).
- **PlayCanvas Integration:** Syncs via `useProgressSync`.
- **Tailwind/UI Behavior:** `w-full`, `h-2`, `bg-gray-700`, `rounded-full`,
  `overflow-hidden`; inner bar `bg-{color}`, `transition-all`, `duration-300`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box` and `Text`.
- **Accessibility:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax`; `aria-label` defaulting to a value-inclusive description
  (e.g., `"${label}: ${value} of ${max}"`) when `label` is set, rather than
  just the bare `label` text.
- **Rebuild Notes:** Used by Health, Energy, Spinner; supports determinate and
  indeterminate.

---

### Component: AlertBanner

- **Purpose:** Persistent, non-auto-dismissing message for critical system
  status (e.g., "Connection lost"), distinct from `Toast`'s auto-dismiss
  behavior.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `message: string` – Banner message.
  - `type?: 'info' | 'warning' | 'error' | 'success'` (default: `'warning'`).
  - `pcEntity?: string` – PlayCanvas alert entity.
  - `position?: 'top' | 'bottom'` (default: `'top'`).
  - `dismissible?: boolean` – Show a dismiss control (default: `false`,
    since the whole point of `AlertBanner` vs. `Toast` is that critical
    alerts often shouldn't be casually dismissed).
  - `onDismiss?: () => void` – Only relevant when `dismissible` is `true`.
  - `action?: { label: string, onClick: () => void }` – Optional action
    (e.g., "Retry").
  - `className?: string`.
  - `icon?: ReactNode` – Custom icon (defaults to a type-appropriate `Icon`).
  - `aria-label?: string`.
  - `sticky?: boolean` – Pin to viewport edge regardless of scroll (default:
    `true`).
- **State:** `isVisible`.
- **Events:** `onDismiss`.
- **Variants:** `info`, `warning`, `error`, `success` (via `type` prop).
- **PlayCanvas Integration:** Syncs via `useNotificationListener` (same hook
  as `Toast`).
- **Tailwind/UI Behavior:** `w-full`, `px-4 py-2`, `flex items-center
  justify-between`; color-coded background per `type` (e.g., `bg-red-900/90`
  for error); `fixed top-0`/`bottom-0` when `sticky`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`, `Button` (action/dismiss).
- **Accessibility:** `role="alert"` for `error`/`warning`, `role="status"`
  for `info`/`success` (mirroring `Toast`'s split); `aria-live="assertive"`
  for `error`, `"polite"` otherwise, since a persistent banner announcing
  itself repeatedly would be disruptive if always assertive.
- **Rebuild Notes:** Use for connection loss, server maintenance notices,
  and other conditions the player must be aware of until resolved — not for
  transient confirmations (use `Toast` for those).

---

### Component: Confetti

- **Purpose:** Animated particle celebration effect for achievements, level
  completion, or puzzle solves.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `active: boolean` – Trigger the effect; a rising edge (`false` → `true`)
    starts a new burst.
  - `pcEntity?: string` – PlayCanvas celebration entity (for effects that
    should also trigger a scene-side particle system).
  - `duration?: number` – Effect duration in ms (default: `3000`).
  - `particleCount?: number` – Number of particles (default: `150`).
  - `colors?: string[]` – Particle colors (default: a preset rainbow
    palette).
  - `origin?: { x: number, y: number } | 'center' | 'top'` (default:
    `'top'`) – Screen-relative origin point (`x`/`y` as `0`–`1` fractions of
    viewport).
  - `spread?: number` – Horizontal spread in degrees (default: `70`).
  - `variant?: 'confetti' | 'fireworks' | 'stars'` (default: `'confetti'`).
  - `className?: string`.
  - `onComplete?: () => void` – Called when the effect finishes.
  - `gravity?: number` – Fall acceleration multiplier (default: `1`).
  - `reducedMotionFallback?: 'static-message' | 'none'` (default:
    `'static-message'`) – What to render instead of particles when
    `prefers-reduced-motion: reduce` is set.
- **State:** `isPlaying`.
- **Events:** `onComplete`.
- **Variants:** `confetti`, `fireworks`, `stars` (via `variant` prop).
- **PlayCanvas Integration:** Optionally triggers a matching PlayCanvas
  particle system via `useAction` if `pcEntity` is set.
- **Tailwind/UI Behavior:** `fixed inset-0 pointer-events-none z-[9998]`;
  particles rendered via `<canvas>` or absolutely-positioned divs with CSS
  `transform`/`opacity` keyframes.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `canvas-confetti` (or
  an internal canvas-based particle renderer).
- **Composition:** Composes `Box`; purely presentational, typically
  triggered by `Objectives`'s `onComplete` or `Puzzle`'s `onSolve`.
- **Accessibility:** `aria-hidden="true"`, `pointer-events-none`; respects
  `prefers-reduced-motion` by substituting `reducedMotionFallback` (a brief
  static success message) instead of animated particles, consistent with
  `A11y`'s `reducedMotion` handling.
- **Rebuild Notes:** Purely decorative — never gate gameplay-critical
  feedback (like "you won") behind `Confetti` alone; pair with a
  `Toast`/`Modal` announcement so the outcome is conveyed even with
  `reducedMotionFallback="none"` or the effect skipped.

---

### Component: LoadingDots

- **Purpose:** Minimal animated-ellipsis loading indicator, a lighter-weight
  alternative to `Spinner`.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `size?: 'sm' | 'md' | 'lg'` (default: `'md'`).
  - `color?: string` – Tailwind background-color class for the dots
    (default: `'bg-white'`).
  - `label?: string` – Accessible label (default: `'Loading'`).
  - `pcEntity?: string` – PlayCanvas loading entity.
  - `count?: number` – Number of dots (default: `3`).
  - `className?: string`.
  - `speed?: number` – Animation cycle duration in ms (default: `1000`).
- **State:** `isVisible`.
- **Events:** None.
- **Variants:** (size only, via `size` prop).
- **PlayCanvas Integration:** Syncs via `useLoadingSync` (same hook as
  `Spinner`).
- **Tailwind/UI Behavior:** `flex gap-1`; each dot `w-1.5 h-1.5 rounded-full`,
  `animate-bounce` with staggered `animation-delay` per dot.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `role="status"`, `aria-label="${label}"`,
  `aria-busy="true"`; visually simpler than `Spinner` but carries identical
  ARIA semantics.
- **Rebuild Notes:** Use inline within text/buttons (e.g., a "Saving…"
  button state) where `Spinner`'s circular form is visually heavier than
  needed.

---

## Category: Modal

### Component: Modal

- **Purpose:** Modal dialog with overlay, focus trap, and PlayCanvas visibility
  sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `isOpen: boolean` – Modal visibility.
  - `onClose: (reason?: 'overlay' | 'escape' | 'action') => void` – Close
    handler; `reason` is passed when known (overlay click, Escape key, or an
    explicit in-modal action) and omitted for programmatic closes.
  - `title?: string` – Modal title.
  - `description?: string` – Modal description.
  - `pcEntity?: string` – PlayCanvas modal entity.
  - `closeOnOverlayClick?: boolean` – Close on overlay click (default: `true`).
  - `closeOnEscape?: boolean` – Close on Escape key (default: `true`).
  - `variant?: 'standard' | 'full-screen' | 'slide-in' | 'center' | 'bottom-sheet' | 'drawer'`
    (default: `'standard'`). `'drawer'` slides in from a screen edge
    (left/right, configurable) and, unlike `'slide-in'` (which animates from
    the modal's resting position), stays edge-anchored and full-height —
    suited for persistent side panels rather than a centered dialog.
  - `children?: ReactNode`.
  - `className?: string`.
  - `onOpen?: (animation?: string) => void` – Called when the modal opens,
    with the name of the entry animation used (derived from `variant`, e.g.
    `'fade'`, `'slide'`).
  - `onOpenChange?: (open: boolean) => void` – Called on any open/close
    transition with the resulting state; convenient for controlled usage
    alongside `isOpen`.
  - `onOverlayClick?: (e: React.MouseEvent) => void` – Includes the
    originating click event.
  - `onEscape?: (e: KeyboardEvent) => void` – Includes the originating
    keydown event.
  - `onFocusOutside?: (e: FocusEvent) => void` – Called if focus attempts to
    move outside the modal while the focus trap is active (should not
    normally succeed, but surfaced for diagnostics/analytics).
  - `onAnimationEnd?: () => void`.
  - `aria-label?: string`.
  - `preventScroll?: boolean` – Prevent body scroll when open (default:
    `true`); the original scroll position and `overflow` style are captured
    on open and restored automatically on close — no extra prop is needed to
    opt into restoration, it's inherent to this behavior.
  - `portal?: boolean` – Render in portal (default: `true`).
  - `overlayClassName?: string` – Additional classes for overlay.
- **State:** `isOpen`, `isClosing`.
- **Events:** `onOpen`, `onClose`, `onOpenChange`, `onOverlayClick`,
  `onEscape`, `onFocusOutside`, `onAnimationEnd`.
- **Variants:** `standard`, `full-screen`, `slide-in`, `center`,
  `bottom-sheet`, `drawer` (via `variant` prop).
- **PlayCanvas Integration:** Syncs visibility via `useModalSync`.
- **Tailwind/UI Behavior:** `fixed`, `inset-0`, `z-50`, `bg-black/50`,
  `backdrop-blur-sm`; content `bg-gray-800`, `rounded-lg`, `shadow-xl`, `p-6`.
- **Dependencies:** `react`, `@radix-ui/react-dialog`, `tailwind-merge`, `clsx`,
  `@radix-ui/react-focus-trap`.
- **Composition:** Composes `Box`, `Overlay`, `Dialog` (Radix); uses
  `FocusTrap`.
- **Accessibility:** `role="dialog"` by default; switch to `role="alertdialog"`
  for modals that represent a critical warning or require explicit
  acknowledgment (the dedicated `Confirm` component already does this) —
  `aria-modal="true"`, `aria-labelledby`, `aria-describedby`; trap focus;
  escape and overlay click.
- **Rebuild Notes:** Uses Radix Dialog; manages focus restoration.

---

### Component: Confirm

- **Purpose:** Yes/No confirmation modal with danger/warning variants.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `title: string` – Confirmation title.
  - `message: string` – Confirmation message.
  - `confirmLabel?: string` – Confirm button label (default: `'Confirm'`).
  - `cancelLabel?: string` – Cancel button label (default: `'Cancel'`).
  - `pcEntity?: string` – PlayCanvas confirm entity.
  - `variant?: 'danger' | 'warning' | 'info' | 'success'` (default: `'danger'`).
    **Note:** `danger` prop is removed; use `variant`.
  - `onConfirm: () => void | Promise<void>` – Confirm handler (can be async).
    If the returned promise rejects, `Confirm` catches the rejection, calls
    `onConfirmError` with it, keeps the modal open, and clears `loading` — it
    does not rethrow or leave the confirm button stuck in a loading state.
  - `onConfirmError?: (error: Error) => void` – Called when `onConfirm`'s
    promise rejects (or throws synchronously); use this to show an inline
    error rather than letting the rejection go unhandled.
  - `onCancel: () => void` – Cancel handler.
  - `onConfirmCancel?: () => void` – Alias for `onCancel`, named for parity
    with `onConfirmError`/`onBeforeConfirm`; identical signature, fires
    alongside it.
  - `isOpen: boolean` – Modal visibility.
  - `onClose: () => void` – Close handler (called after confirm/cancel, after
    async confirm resolves).
  - `onAfterConfirm?: (result: void | Error) => void` – Called after the
    confirm action settles (if async): with `undefined` on success, or the
    caught `Error` if `onConfirm` rejected (fires alongside `onConfirmError`
    in the failure case).
  - `aria-label?: string`.
  - `loading?: boolean` – Confirm button loading state.
  - `onBeforeConfirm?: () => boolean | Promise<boolean>` – Called before
    confirm, can prevent.
  - `confirmButtonProps?: Partial<ButtonProps>` – Additional props for confirm
    button.
- **State:** `isOpen`, `isConfirming`.
- **Events:** `onConfirm`, `onConfirmError`, `onCancel`, `onConfirmCancel`,
  `onClose`, `onAfterConfirm`, `onBeforeConfirm`.
- **Variants:** `danger`, `warning`, `info`, `success` (via `variant` prop).
- **PlayCanvas Integration:** Sends result via `useConfirm`; PC can trigger.
- **Tailwind/UI Behavior:** Same as `Modal`; confirm button uses `variant`
  color; cancel `secondary`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Modal`, `Button`, `Text`.
- **Accessibility:** `role="alertdialog"`, `aria-labelledby`,
  `aria-describedby`; focus on confirm or cancel.
- **Rebuild Notes:** Composes `Modal`; supports async confirm (show loading).

---

## Category: Overlay

### Component: Tooltip

- **Purpose:** Hover/focus tooltip with placement and delay.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `content: ReactNode` – Tooltip content.
  - `children: ReactNode` – Trigger element.
  - `openDelay?: number` – Delay before showing in ms (default: `200`).
  - `closeDelay?: number` – Delay before closing in ms (default: `0`).
  - `pcEntity?: string` – PlayCanvas tooltip entity.
  - `side?: 'top' | 'bottom' | 'left' | 'right' | 'auto'` (default: `'top'`).
    `'auto'` picks the side with the most available viewport space (via
    Radix's collision detection), flipping away from clipped edges — same
    mechanism as `ItemTip`'s `position="auto"`.
  - `align?: 'start' | 'center' | 'end' | 'auto'` (default: `'center'`).
    `'auto'` shifts the tooltip along the cross-axis to stay within the
    viewport rather than overflowing, independent of `side`'s auto-flip.
  - `className?: string`.
  - `onOpen?: (e?: React.SyntheticEvent) => void` – Includes the triggering
    event (hover or focus) when available.
  - `onClose?: (e?: React.SyntheticEvent) => void` – Includes the triggering
    event when available.
  - `onOpenChange?: (open: boolean) => void`.
  - `onMouseEnter?: (e: React.MouseEvent) => void` – Fired when the pointer
    enters the trigger.
  - `onMouseLeave?: (e: React.MouseEvent) => void` – Fired when the pointer
    leaves the trigger.
  - `skipDelay?: boolean` – Skip delay for keyboard users.
  - `maxWidth?: number | string` – Max width (default: `'xs'`).
- **State:** `isVisible`, `isOpen`.
- **Events:** `onOpen`, `onClose`, `onOpenChange`, `onMouseEnter`,
  `onMouseLeave`.
- **Variants:** (placement via `side` prop).
- **PlayCanvas Integration:** Reads content via `useTooltipSync`.
- **Tailwind/UI Behavior:** `absolute`, `z-50`, `bg-gray-900`, `text-white`,
  `px-2`, `py-1`, `rounded`, `text-sm`, `shadow`; `transform` for positioning.
- **Dependencies:** `react`, `@radix-ui/react-tooltip`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box` and `Text`; wraps trigger via `Slot`.
- **Accessibility:** `role="tooltip"`; auto‑generated from `aria-describedby`;
  respects `prefers-reduced-motion`.
- **Rebuild Notes:** Uses Radix Tooltip; delay and placement configurable.

---

### Component: ContextMenu

- **Purpose:** Right‑click context menu with nested items and PlayCanvas
  integration.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: ContextMenuItem[]` where
    `ContextMenuItem = { id: string, label: string, icon?: ReactNode, children?: ContextMenuItem[], disabled?: boolean, separator?: boolean, shortcut?: string }`
    – `shortcut` renders a right-aligned keyboard shortcut hint (e.g.,
    `'Ctrl+C'`) next to the item's label; purely display, does not itself
    register a global key handler.
  - `pcEntity?: string` – PlayCanvas context menu entity.
  - `trigger: ReactNode` – Trigger element.
  - `className?: string`.
  - `variant?: 'standard' | 'nested'` (default: `'standard'`). **Note:**
    `'custom'` variant removed; for custom item rendering, use `renderItem`
    instead of a variant.
  - `renderItem?: (item: ContextMenuItem) => ReactNode` – Custom rendering
    for individual items, replacing the default label/icon/shortcut layout;
    this is the supported path for what the removed `'custom'` variant used
    to provide.
  - `onOpen?: (position: { x: number, y: number }) => void` – Includes the
    screen position the menu opened at.
  - `onClose?: (reason?: 'select' | 'escape' | 'outside') => void` – Includes
    why the menu closed, when known.
  - `onSelect?: (id: string, item: ContextMenuItem) => void` – Includes the
    full selected item, not just its `id`.
  - `onItemHover?: (id: string | null) => void` – Called when an item gains
    or loses hover/focus.
  - `aria-label?: string`.
  - `virtualize?: boolean` – Enable virtualization for large menus (default:
    `false`; recommended once item count exceeds `maxItems`).
  - `maxItems?: number` – Item count threshold above which `virtualize`
    should be enabled (default: `50`) — this is guidance for when to opt in,
    not an automatic switch; `virtualize` must still be set to `true`
    explicitly to take effect.
  - `onOpenChange?: (open: boolean) => void` – Called when open state changes.
  - `preventScroll?: boolean` – Prevent scrolling while open (default: `true`).
- **State:** `isOpen`, `position`.
- **Events:** `onOpen`, `onClose`, `onSelect`, `onItemHover`, `onOpenChange`.
- **Variants:** `standard`, `nested` (via `variant` prop).
- **PlayCanvas Integration:** Sends selection via `useContextMenu`; PC can
  trigger.
- **Tailwind/UI Behavior:** `fixed`, `z-50`, `bg-gray-800`, `border`,
  `rounded-md`, `shadow-lg`, `min-w-48`; items `px-4 py-2 hover:bg-gray-700`.
- **Dependencies:** `react`, `@radix-ui/react-context-menu`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`, `Text`, `Icon`; uses Radix ContextMenu.
- **Accessibility:** `role="menu"` with `aria-label` (falls back to a
  generated label like `"Context menu"` if not provided — always set
  `aria-label` explicitly to describe the menu's context, e.g. `"Item
actions"`); keyboard arrow navigation; each item `role="menuitem"`;
  supports disabled items.
- **Rebuild Notes:** Uses Radix; supports submenus; right‑click and long‑press
  on touch.

---

### Component: HoverCard

- **Purpose:** Rich preview on hover with optional image and PlayCanvas data.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `content: ReactNode` – Hover card content.
  - `children: ReactNode` – Trigger element.
  - `openDelay?: number` – Delay before showing in ms (default: `300`).
  - `closeDelay?: number` – Delay before closing in ms (default: `0`).
  - `pcEntity?: string` – PlayCanvas hover entity.
  - `side?: 'top' | 'bottom' | 'left' | 'right'` (default: `'top'`).
  - `align?: 'start' | 'center' | 'end'` (default: `'center'`).
  - `className?: string`.
  - `variant?: 'standard' | 'with-image'` (default: `'standard'`). **Note:**
    `'preview'` variant removed (redundant) — custom content isn't a variant
    concern in the first place: pass any `ReactNode` via `content` for fully
    custom hover-card content regardless of `variant`.
  - `onOpen?: (e?: React.SyntheticEvent) => void` – Includes the triggering
    event when available.
  - `onClose?: (e?: React.SyntheticEvent) => void` – Includes the triggering
    event when available.
  - `onOpenChange?: (open: boolean) => void`.
  - `onMouseEnter?: (e: React.MouseEvent) => void` – Fired when the pointer
    enters the trigger.
  - `onMouseLeave?: (e: React.MouseEvent) => void` – Fired when the pointer
    leaves the trigger.
  - `showArrow?: boolean` – Show arrow indicator (default: `true`).
- **State:** `isOpen`, `isHovered`.
- **Events:** `onOpen`, `onClose`, `onOpenChange`, `onMouseEnter`,
  `onMouseLeave`.
- **Variants:** `standard`, `with-image` (via `variant` prop).
- **PlayCanvas Integration:** Reads preview data via `useHoverData`.
- **Tailwind/UI Behavior:** `absolute`, `z-50`, `bg-gray-800`, `rounded-md`,
  `shadow-xl`, `p-4`, `max-w-xs`; `border`.
- **Dependencies:** `react`, `@radix-ui/react-hover-card`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Box`, `Card`, `Text`, `Image`.
- **Accessibility:** `role="dialog"` with `aria-label` (falls back to a
  generic label if omitted — set it explicitly to describe the previewed
  content, e.g. `"Item preview"`); managed via `aria-describedby`; focus
  management.
- **Rebuild Notes:** Used for item previews; similar to `Tooltip` but richer.

---

### Component: DropdownMenu

- **Purpose:** Generic click-triggered action menu anchored below a button
  (as opposed to `ContextMenu`'s right-click trigger or `Select`'s
  value-selection semantics).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `items: ContextMenuItem[]` – Same `ContextMenuItem` shape as
    `ContextMenu` (label, icon, children, disabled, separator, shortcut).
  - `trigger: ReactNode` – Trigger element.
  - `pcEntity?: string` – PlayCanvas dropdown entity.
  - `side?: 'top' | 'bottom' | 'left' | 'right'` (default: `'bottom'`).
  - `align?: 'start' | 'center' | 'end'` (default: `'start'`).
  - `isOpen?: boolean` – Controlled open state.
  - `onOpenChange?: (open: boolean) => void`.
  - `className?: string`.
  - `onSelect?: (id: string, item: ContextMenuItem) => void`.
  - `onOpen?: () => void`.
  - `onClose?: (reason?: 'select' | 'escape' | 'outside') => void`.
  - `renderItem?: (item: ContextMenuItem) => ReactNode` – Same custom-
    rendering escape hatch as `ContextMenu`.
  - `aria-label?: string`.
  - `closeOnSelect?: boolean` – Close after an item is selected (default:
    `true`).
- **State:** `isOpen`.
- **Events:** `onOpenChange`, `onSelect`, `onOpen`, `onClose`.
- **Variants:** None (placement via `side`/`align`).
- **PlayCanvas Integration:** Sends selection via `useContextMenu` (same
  hook as `ContextMenu`).
- **Tailwind/UI Behavior:** Identical panel styling to `ContextMenu`
  (`bg-gray-800 border rounded-md shadow-lg min-w-48`); items `px-4 py-2
  hover:bg-gray-700`.
- **Dependencies:** `react`, `@radix-ui/react-dropdown-menu`,
  `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Icon`; wraps `trigger` via
  `Slot`; uses Radix DropdownMenu (distinct from `ContextMenu`'s Radix
  ContextMenu primitive, since dropdown vs. context-menu have different
  trigger/positioning semantics upstream).
- **Accessibility:** `role="menu"` with `aria-label`; trigger gets
  `aria-haspopup="menu"` and `aria-expanded`; keyboard arrow navigation;
  Escape closes and returns focus to the trigger.
- **Rebuild Notes:** Shares `ContextMenuItem` typing with `ContextMenu` so
  item lists are interchangeable between click- and right-click-triggered
  menus.

---

## Category: Settings

### Component: Settings

- **Purpose:** Game settings UI container with tabs/sidebar and PlayCanvas sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `categories: SettingsCategory[]` where
    `SettingsCategory = { id: string, label: string, settings: SettingDef[] }`
    and
    `SettingDef = { key: string, label: string, description?: string, type: 'toggle' | 'slider' | 'select' | 'keybind', default: any, min?: number, max?: number, step?: number, options?: Array<{ label: string, value: any }>, keybinding?: { defaultKey: string } }`
    – `description` renders as helper text under `label` (same pattern as
    `Toggle`'s own `description` prop). `type: 'keybind'` renders using the
    `Keybinds` component internally (a single-binding instance), with
    `keybinding.defaultKey` seeding its default — see the `Keybinds`
    component for the underlying conflict-detection/listening behavior.
  - `pcEntity?: string` – PlayCanvas settings entity.
  - `isOpen: boolean` – Settings visibility.
  - `onOpen?: () => void` – Called when Settings opens.
  - `onClose: (reason?: 'save' | 'cancel' | 'overlay' | 'escape') => void` –
    Close handler; `reason` is included when known.
  - `variant?: 'sidebar' | 'tabs' | 'modal'` (default: `'modal'`). **Note:**
    `'full-page'` variant removed; use `variant="modal"` combined with
    `Modal`'s `variant="full-screen"` (passed through) for the equivalent
    full-page presentation.
  - `className?: string`.
  - `onChange?: (key: string, value: any) => void`.
  - `onSettingChange?: (setting: SettingDef, value: any) => void` – Richer
    alternative to `onChange`, receiving the full `SettingDef` instead of
    just its `key`; fires alongside `onChange`.
  - `onSave?: () => void` – Called when Save is clicked.
  - `onReset?: () => void` – Reset to defaults.
  - `onSettingReset?: (setting: SettingDef) => void` – Called when a single
    setting is reset to its default (as opposed to `onResetAll`, which resets
    every setting).
  - `onCategoryChange?: (categoryId: string) => void`.
  - `aria-label?: string`.
  - `onSearch?: (query: string) => void` – Called when search input changes.
  - `onResetAll?: () => void` – Reset all settings to defaults.
  - `showResetAll?: boolean` – Show reset all button (default: `true`).
- **State:** `activeCategory`, `isOpen`, `settings`, `isDirty`.
- **Events:** `onOpen`, `onChange`, `onSettingChange`, `onSave`, `onReset`,
  `onSettingReset`, `onClose`, `onCategoryChange`, `onSearch`, `onResetAll`.
- **Variants:** `sidebar`, `tabs`, `modal` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingsSync`.
- **Tailwind/UI Behavior:** `bg-gray-900/95`, `text-white`, `p-6`, `rounded-lg`;
  `flex`; tabs `border-b`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `zustand`.
- **Composition:** Composes `Modal`, `Flex`, `SettingsCategory` (internal),
  `Button`.
- **Accessibility:** `role="dialog"`, `aria-label="Settings"`; trap focus; each
  setting has accessible labels.
- **Rebuild Notes:** Uses Zustand; supports save/reset with confirmation; dirty
  state.

---

### Component: Toggle

- **Purpose:** Boolean setting with switch/checkbox and PlayCanvas sync.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label: string` – Toggle label.
  - `value: boolean` – Toggle value.
  - `pcEntity?: string` – PlayCanvas setting key.
  - `description?: string` – Description text.
  - `disabled?: boolean`.
  - `variant?: 'switch' | 'button-toggle'` (default: `'switch'`). **Note:**
    `'checkbox'` variant removed; use the dedicated `Checkbox` component for
    checkbox-style boolean input instead of trying to make `Toggle` look like
    one.
  - `onChange: (value: boolean) => void`.
  - `onToggle?: (value: boolean) => void` – Alias for `onChange`; identical
    signature, fires alongside it.
  - `onFocus?: (e: React.FocusEvent) => void`.
  - `onBlur?: (e: React.FocusEvent) => void`.
  - `className?: string`.
  - `aria-label?: string`.
  - `size?: 'sm' | 'md' | 'lg'` – Switch size (default: `'md'`).
- **State:** `value`, `isFocused`.
- **Events:** `onChange`, `onToggle`, `onFocus`, `onBlur`.
- **Variants:** `switch`, `button-toggle` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** `relative`, `inline-flex`, `w-11`, `h-6`,
  `rounded-full`, `transition-colors`; `bg-gray-600` -> `bg-blue-600` when
  checked.
- **Dependencies:** `react`, `@radix-ui/react-switch`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Switch` (Radix).
- **Accessibility:** `role="switch"`, `aria-checked="${value}"`,
  `aria-label="${label}"`; `aria-disabled`.
- **Rebuild Notes:** Uses Radix Switch; keyboard Space/Enter. For checkbox use
  `Checkbox` component.

---

### Component: Slider

- **Purpose:** Numeric setting with slider and optional input.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label: string` – Slider label.
  - `value: number` – Slider value.
  - `min: number` – Minimum value.
  - `max: number` – Maximum value.
  - `step?: number` – Step increment (default: `1`).
  - `pcEntity?: string` – PlayCanvas setting key.
  - `format?: (value: number) => string` – Value formatter (default: `String`).
  - `showInput?: boolean` – Show numeric input (default: `false`).
  - `variant?: 'horizontal' | 'vertical' | 'with-input'` (default:
    `'horizontal'`).
  - `onChange: (value: number) => void`.
  - `onValueChange?: (value: number) => void` – Alias for `onChange`;
    identical signature, fires alongside it.
  - `className?: string`.
  - `onCommit?: (value: number) => void` – Called on mouseup.
  - `onValueCommit?: (value: number) => void` – Alias for `onCommit`;
    identical signature, fires alongside it.
  - `onDragStart?: () => void` – Called when thumb dragging begins.
  - `onDragEnd?: () => void` – Called when thumb dragging ends (fires
    alongside `onCommit`/`onValueCommit`).
  - `onFocus?: (e: React.FocusEvent) => void`.
  - `onBlur?: (e: React.FocusEvent) => void`.
  - `aria-label?: string`.
  - `aria-valuetext?: string` – Custom value text for screen readers.
  - `marks?: number[]` – Tick marks positions.
  - `tooltip?: boolean` – Show tooltip on thumb (default: `true`).
- **State:** `value`, `isDragging`.
- **Events:** `onChange`, `onValueChange`, `onCommit`, `onValueCommit`,
  `onDragStart`, `onDragEnd`, `onFocus`, `onBlur`.
- **Variants:** `horizontal`, `vertical`, `with-input` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** `w-full`, `h-2`, `bg-gray-700`, `rounded-full`,
  `relative`; thumb `w-4 h-4 rounded-full bg-blue-500`.
- **Dependencies:** `react`, `@radix-ui/react-slider`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Slider` (Radix), `Input`.
- **Accessibility:** `role="slider"`, `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax`, `aria-valuetext`; `aria-label`; keyboard arrows.
- **Rebuild Notes:** Uses Radix Slider; commit on mouseup.

---

### Component: Select

- **Purpose:** Dropdown for choosing among options.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label: string` – Select label.
  - `value: string | number | null` – Selected value; `null` represents "no
    selection" (distinct from `''`/`0`, which are valid selectable values).
  - `options: { label: string, value: string | number, disabled?: boolean }[]` –
    Options.
  - `pcEntity?: string` – PlayCanvas setting key.
  - `placeholder?: string`.
  - `variant?: 'dropdown' | 'button-group'` (default: `'dropdown'`). **Note:**
    `'radio-group'` variant removed; use `variant="button-group"` for a
    similar all-options-visible, single-select presentation.
  - `onChange: (value: string | number | null) => void`.
  - `onSelect?: (value: string | number | null) => void` – Alias for
    `onChange`; identical signature, fires alongside it.
  - `disabled?: boolean`.
  - `className?: string`.
  - `onOpen?: () => void` – Called when the dropdown opens.
  - `onClose?: () => void` – Called when the dropdown closes.
  - `onOpenChange?: (open: boolean) => void`.
  - `aria-label?: string`.
  - `searchable?: boolean` – Enable search/filtering (default: `false`).
  - `onSearch?: (query: string) => void` – Called when search input changes.
  - `filter?: (option: { label: string, value: string | number }, query: string) => boolean`
    – Custom filter function.
- **State:** `value`, `isOpen`.
- **Events:** `onChange`, `onSelect`, `onOpen`, `onClose`, `onOpenChange`,
  `onSearch`.
- **Variants:** `dropdown`, `button-group` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** `w-full`, `px-3`, `py-2`, `bg-gray-700`,
  `rounded-md`, `border`; `hover:bg-gray-600`.
- **Dependencies:** `react`, `@radix-ui/react-select`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Select` (Radix), `Label`.
- **Accessibility:** `role="combobox"`, `aria-label="${label}"`,
  `aria-haspopup="listbox"`, `aria-expanded` (reflects `isOpen`); keyboard;
  searchable via custom.
- **Rebuild Notes:** Uses Radix Select; supports searchable; `button-group`
  variant renders all options visibly for radio-like selection.

---

### Component: Keybinds

- **Purpose:** Customizable keyboard controls with conflict detection.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `bindings: KeyBinding[]` where
    `KeyBinding = { action: string, key: string, label?: string, modifiers?: Array<'ctrl' | 'shift' | 'alt' | 'meta'> }`
    – `modifiers` lists required modifier keys held alongside `key` (e.g.,
    `key: 's', modifiers: ['ctrl']` for Ctrl+S); omit for a plain key
    binding.
  - `defaultBindings?: KeyBinding[]` – Default bindings for reset.
  - `pcEntity?: string` – PlayCanvas keybind entity.
  - `variant?: 'list' | 'grid' | 'compact' | 'table'` (default: `'list'`).
    `'table'` renders bindings as rows in a data table (action, key,
    modifiers as separate columns) — better suited than `'list'`/`'grid'`
    when many bindings need to be visually scanned/sorted.
  - `onChange: (bindings: KeyBinding[]) => void`.
  - `onBindingChange?: (binding: KeyBinding) => void` – Called for a single
    binding update, rather than the full `bindings` array `onChange`
    receives — convenient when you only care about the one binding that
    changed.
  - `onReset: () => void` – Resets to `defaultBindings`.
  - `className?: string`.
  - `onStartListening?: () => void`.
  - `onStopListening?: () => void`.
  - `onKeyDown?: (e: KeyboardEvent) => void` – Raw keydown while listening for
    a new binding (before it's resolved into a `KeyBinding`).
  - `onKeyUp?: (e: KeyboardEvent) => void` – Raw keyup while listening.
  - `onConflict?: (action: string, key: string, existingAction: string, resolve: (choice: 'keep' | 'overwrite') => void) => void`
    – Provides the conflicting binding along with a `resolve` callback: call
    `resolve('overwrite')` to reassign `key` to `action` (clearing it from
    `existingAction`), or `resolve('keep')` to leave the existing binding
    unchanged and reject the new one.
  - `aria-label?: string`.
  - `allowModifiers?: boolean` – Allow modifier keys (default: `true`).
  - `showConflicts?: boolean` – Show conflict warnings (default: `true`).
- **State:** `isListening`, `pendingAction`, `bindings`.
- **Events:** `onChange`, `onBindingChange`, `onReset`, `onStartListening`,
  `onStopListening`, `onKeyDown`, `onKeyUp`, `onConflict`.
- **Variants:** `list`, `grid`, `compact`, `table` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useKeybindSync`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-2`, `gap-2`, `p-2`; each binding
  has label and capture button.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Button`; uses `useKeyboardListener`.
- **Accessibility:** `role="group"`, `aria-label` defaulting to
  `"Keybindings, ${bindings.length} bindings"` (announces the count, not just
  the static label); focus; each binding has `aria-label`.
- **Rebuild Notes:** Uses `useKeyboardListener`; conflict detection; reset to
  defaults.

---

### Component: ColorPicker

- **Purpose:** User-facing color selection control (UI theme or character
  customization), distinct from the internal `ColorPicker` used by
  `Property` for dev-only entity editing.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `value: string` – Current color, as a hex string (`'#3b82f6'`) or
    `rgba()` string when `allowAlpha` is `true`.
  - `onChange: (color: string) => void`.
  - `pcEntity?: string` – PlayCanvas setting key.
  - `presets?: string[]` – Swatch presets shown above the picker.
  - `allowAlpha?: boolean` – Allow alpha-channel selection (default:
    `false`).
  - `format?: 'hex' | 'rgb' | 'hsl'` (default: `'hex'`) – Format used for the
    text input and `onChange` value.
  - `variant?: 'swatch' | 'wheel' | 'sliders'` (default: `'swatch'`).
    `'wheel'` is a full HSV color wheel + value slider; `'sliders'` exposes
    individual R/G/B (or H/S/L) sliders.
  - `className?: string`.
  - `onOpen?: () => void`.
  - `onClose?: () => void`.
  - `aria-label?: string`.
  - `label?: string` – Field label.
  - `disabled?: boolean`.
- **State:** `value`, `isOpen`.
- **Events:** `onChange`, `onOpen`, `onClose`.
- **Variants:** `swatch`, `wheel`, `sliders` (via `variant` prop).
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** Trigger swatch `w-8 h-8 rounded border-2`;
  popover panel `bg-gray-800 rounded-lg shadow-xl p-3`; presets as a `grid
  grid-cols-8 gap-1` of small swatches.
- **Dependencies:** `react`, `@radix-ui/react-popover`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Popover` (trigger + panel), `Label`, `Input`
  (hex/rgb text entry), `Slider` (component values).
- **Accessibility:** The trigger is `role="button"` with `aria-label`
  including the current color's human-readable name/hex value (not color
  alone); the hex/rgb `Input` provides a fully keyboard-operable,
  non-visual way to set an exact value alongside the (necessarily
  pointer-heavy) wheel/sliders.
- **Rebuild Notes:** User-facing counterpart to `Property`'s internal color
  editor; reuse `Slider`/`Input` for the numeric-entry paths rather than
  duplicating them.

---

### Component: AccessibilitySlider

- **Purpose:** Dedicated control for accessibility-scale settings (text
  size, UI scale, contrast/motion intensity), separate from general-purpose
  `Slider` usage.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label: string` – Setting label (e.g., `"Text Size"`).
  - `value: number` – Current value.
  - `min: number` – Minimum value.
  - `max: number` – Maximum value.
  - `step?: number` – Step increment (default: `1`).
  - `presetLabels?: string[]` – Named steps shown instead of raw numbers
    (e.g., `['Small', 'Medium', 'Large', 'Extra Large']`, one per reachable
    step) — when set, `format` is ignored in favor of the matching label.
  - `pcEntity?: string` – PlayCanvas setting key.
  - `previewText?: string` – Sample text rendered at the live value for
    immediate feedback (default: `'The quick brown fox'`), relevant for
    text-size-style settings.
  - `className?: string`.
  - `onChange: (value: number) => void`.
  - `onCommit?: (value: number) => void`.
  - `aria-label?: string`.
  - `aria-valuetext?: string` – Defaults to the matching `presetLabels`
    entry when set.
  - `resettable?: boolean` – Show a reset-to-default control (default:
    `true`).
  - `defaultValue?: number` – Value restored by the reset control.
- **State:** `value`.
- **Events:** `onChange`, `onCommit`.
- **Variants:** None.
- **PlayCanvas Integration:** Syncs via `useSettingSync`.
- **Tailwind/UI Behavior:** Same track/thumb styling as `Slider`; adds a
  live `previewText` sample below the track that scales with `value` when
  relevant.
- **Dependencies:** `react`, `@radix-ui/react-slider`, `tailwind-merge`,
  `clsx`.
- **Composition:** Composes `Slider`, `Label`, `Text` (preview), `Button`
  (reset).
- **Accessibility:** `role="slider"` (via composed `Slider`),
  `aria-valuetext` set to the current `presetLabels` entry so screen
  readers announce `"Large"` rather than a bare number; the live preview
  text itself is `aria-hidden` (it's a visual convenience, not new
  information beyond the announced value).
- **Rebuild Notes:** Distinct from `Slider` specifically to force a
  `previewText`/`presetLabels`-first UX for accessibility settings, where
  showing the *effect* of the value matters more than for a generic numeric
  setting.

---

## Category: Debug/DevTools

### Component: DevTools

- **Purpose:** Developer tools panel for debugging, only in DevMode.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `enabled?: boolean` – Enable DevTools (default:
    `process.env.NODE_ENV !== 'production'`). On the server (SSR), `NODE_ENV`
    is typically `'production'` in deployed environments, so this default
    resolves safely to `false` server-side; if `process.env` isn't available
    at all in your bundler's client runtime (some edge/browser-only bundlers
    strip it), pass `enabled` explicitly rather than relying on the default
    to avoid a `ReferenceError`.
  - `pcEntity?: string` – PlayCanvas dev entity.
  - `variant?: 'compact' | 'full' | 'floating' | 'docked'` (default:
    `'docked'`).
  - `floatingPosition?: { x: number, y: number }` – Initial position when
    `variant="floating"` (default: bottom-right corner); the panel remains
    draggable afterward regardless of this initial value.
  - `initialTab?: string` – Initial tab (default: `'console'`).
  - `className?: string`.
  - `onToggle?: () => void`.
  - `onClearLogs?: () => void`.
  - `onExecuteCommand?: (cmd: string) => void`.
  - `onTabChange?: (tab: string) => void`.
  - `aria-label?: string`.
  - `keyboardShortcut?: string` – Toggle shortcut (default: `'` (backtick)).
  - `onOpen?: (e?: React.SyntheticEvent) => void` – Called when DevTools
    opens; includes the triggering event when available (click or keyboard
    shortcut).
  - `onClose?: (e?: React.SyntheticEvent) => void` – Called when DevTools
    closes; includes the triggering event when available.
  - `onMinimize?: () => void` – Called when DevTools is minimized to its
    small bar.
  - `onMaximize?: () => void` – Called when DevTools is restored from
    minimized.
  - `showDevTools?: boolean` – Controlled visibility.
  - `console?: any` – Custom console implementation.
- **State:** `isOpen`, `activeTab`, `logs`, `isMinimized`.
- **Events:** `onToggle`, `onClearLogs`, `onExecuteCommand`, `onTabChange`,
  `onOpen`, `onClose`, `onMinimize`, `onMaximize`.
- **Variants:** `compact`, `full`, `floating`, `docked` (via `variant` prop).
- **PlayCanvas Integration:** Inspects scene via `useDevAPI`; intercepts console
  logs. **Performance:** Interception (console patching, scene polling for
  `Inspector`) is only active while DevTools is open — closing it (not just
  minimizing) fully detaches these listeners so there is no ongoing
  per-frame cost in normal play; note that _minimizing_ keeps DevTools
  mounted and listening, so prefer closing it entirely when profiling
  production-representative performance.
- **Tailwind/UI Behavior:** `fixed`, `bottom-0`, `left-0`, `right-0`, `h-64`,
  `bg-gray-900/95`, `z-[9999]`, `border-t-2`; minimized shows small bar.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `lucide-react`.
- **Composition:** Composes `Modal`, `Tabs`, `Console`, `Input`, `Inspector`.
- **Accessibility:** `role="region"`, `aria-label="Developer tools"`; hidden in
  production; `aria-hidden` when minimized.
- **Rebuild Notes:** Only renders in DevMode; toggled with keyboard shortcut.

---

### Component: Inspector

- **Purpose:** PlayCanvas entity tree inspector with search and property
  display.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `pcScene: any` – PlayCanvas scene object (will be typed as `pc.Scene`).
  - `pcEntity?: string` – PlayCanvas dev entity.
  - `filter?: string` – Filter text.
  - `variant?: 'tree' | 'flat'` (default: `'tree'`). **Note:** `'filtered'`
    variant removed; use `filter` prop.
  - `className?: string`.
  - `onSelect?: (entity: any) => void`.
  - `onEntityClick?: (entity: any) => void` – Alias for `onSelect`, named for
    parity with the click interaction rather than the selection outcome;
    fires alongside `onSelect`.
  - `onUpdate?: (entity: any, diff: any) => void`.
  - `onRefresh?: () => void`.
  - `onSearch?: (query: string) => void`.
  - `aria-label?: string`.
  - `onDoubleClick?: (entity: any) => void` – Called on double-click.
  - `onEntityDoubleClick?: (entity: any) => void` – Alias for `onDoubleClick`;
    identical signature, fires alongside it.
  - `onEntityHover?: (entity: any | null) => void` – Called when a tree row
    gains or loses hover.
  - `onEntityFocus?: (entity: any) => void` – Called when a tree row receives
    keyboard focus.
  - `onDrag?: (entity: any, event: any) => void` – Called on drag.
  - `showHidden?: boolean` – Show hidden entities (default: `false`).
- **State:** `selectedEntity`, `expandedEntities`, `entityData`.
- **Events:** `onSelect`, `onEntityClick`, `onUpdate`, `onRefresh`, `onSearch`,
  `onDoubleClick`, `onEntityDoubleClick`, `onEntityHover`, `onEntityFocus`,
  `onDrag`.
- **Variants:** `tree`, `flat` (via `variant` prop).
- **PlayCanvas Integration:** Reads hierarchy via `useSceneInspector`; watches
  changes.
- **Performance:** For scenes with large entity counts (hundreds+), the
  underlying `TreeView` is not virtualized by `Inspector` automatically —
  pass `TreeView`'s own `virtualization` behavior into account (it defaults
  to on above 1000 nodes) but for scenes in the low hundreds where it's still
  off by default, expect increased render cost; prefer collapsing deep
  hierarchies by default and using `filter`/`showHidden={false}` to reduce
  the rendered node count.
- **Tailwind/UI Behavior:** `overflow-auto`, `font-mono`, `text-sm`, `p-2`;
  selected highlighted; tree uses indentation.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `TreeView`, `Property`, `Input`.
- **Accessibility:** `role="tree"`, `aria-label="Scene inspector"`; keyboard
  navigation.
- **Rebuild Notes:** Part of `DevTools`; shows transform, components, scripts;
  can edit via `Property`.

---

### Component: Property

- **Purpose:** Edit PlayCanvas entity properties with appropriate inputs.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `entity: any` – PlayCanvas entity (will be typed as `pc.Entity` once the
    library ships proper PlayCanvas type bindings; treat as an opaque handle
    for now — don't rely on specific shape beyond what `usePropertyEditor`
    documents).
  - `properties: PropertyDef[]` where
    `PropertyDef = { key: string, label: string, type: 'string' | 'number' | 'boolean' | 'color' | 'vector', options?: any[], min?: number, max?: number, step?: number }`
    – for `type: 'vector'`, the property's runtime value is expected to be
    `{ x: number, y: number, z?: number, w?: number }` (2, 3, or 4-component,
    inferred from the value's own shape); `Property` renders one numeric
    input per present component.
  - `pcEntity?: string` – PlayCanvas dev entity.
  - `variant?: 'form' | 'grid' | 'compact'` (default: `'form'`).
  - `onChange: (key: string, value: any, property: PropertyDef) => void` –
    Includes the full `PropertyDef` alongside the key/value.
  - `onApply: (property?: PropertyDef) => void` – Includes the property that
    was applied when known (omitted for a bulk "Apply all").
  - `onRevert: (property?: PropertyDef) => void` – Includes the property that
    was reverted when known.
  - `className?: string`.
  - `onReset?: (property?: PropertyDef) => void` – Includes the property that
    was reset when known.
  - `aria-label?: string`.
  - `showReset?: boolean` – Show reset button for each property (default:
    `true`).
- **State:** `values`, `isDirty`.
- **Events:** `onChange`, `onApply`, `onRevert`, `onReset`.
- **Variants:** `form`, `grid`, `compact` (via `variant` prop).
- **PlayCanvas Integration:** Reads/writes via `usePropertyEditor`.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-2`, `gap-2`, `p-2`; inputs
  `bg-gray-800`, `text-white`, `rounded`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Input`, `Slider`, `Toggle`; includes
  internal `ColorPicker` component for color type properties.
- **Accessibility:** `role="form"`, `aria-label="Property editor"`; each field
  has label and input with `aria-label`.
- **Rebuild Notes:** Supports number, string, boolean, color, vector types.

---

### Component: Console

- **Purpose:** In‑game console with command history and filtering.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `maxLines?: number` – Maximum console lines (default: `1000`).
  - `filter?: 'all' | 'log' | 'warn' | 'error' | 'debug'` (default: `'all'`).
  - `pcEntity?: string` – PlayCanvas dev entity.
  - `variant?: 'dark' | 'light' | 'compact'` (default: `'dark'`).
  - `onCommand: (command: string) => void`.
  - `className?: string`.
  - `onClear?: () => void`.
  - `onFilterChange?: (filter: string) => void`.
  - `onCopy?: (text: string) => void`.
  - `aria-label?: string`.
  - `onExecute?: (command: string, result: any) => void` – Called when a
    command finishes executing, including its result (or thrown error).
  - `autocomplete?: (command: string) => string[]` – Autocomplete suggestions.
- **State:** `logs`, `filterLevel`, `commandHistory`.
- **Events:** `onCommand`, `onClear`, `onFilterChange`, `onCopy`, `onExecute`.
- **Variants:** `dark`, `light`, `compact` (via `variant` prop).
- **PlayCanvas Integration:** Intercepts PlayCanvas console via
  `useConsoleBridge`; also browser console.
- **Tailwind/UI Behavior:** `bg-black/90`, `text-white`, `font-mono`, `text-sm`,
  `overflow-auto`; entries `border-b`; levels have colors.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Input`, `Button`.
- **Accessibility:** `role="log"`, `aria-label="Console"`; `aria-live="polite"`;
  can be disabled.
- **Rebuild Notes:** Part of `DevTools`; `console.log` interception; supports
  eval‑like commands.

---

### Component: PerformanceMonitor

- **Purpose:** FPS, memory usage, and draw-call overlay for performance
  debugging.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `pcApp: any` – PlayCanvas application instance.
  - `metrics?: Array<'fps' | 'frameTime' | 'memory' | 'drawCalls' | 'triangles' | 'gpu'>`
    – Which metrics to display (default: `['fps', 'frameTime', 'drawCalls']`).
  - `variant?: 'compact' | 'graph' | 'detailed'` (default: `'compact'`).
    `'graph'` renders a scrolling history sparkline per metric; `'detailed'`
    adds per-metric breakdowns (e.g., draw calls by material).
  - `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
    (default: `'top-right'`).
  - `updateInterval?: number` – Sampling interval in ms (default: `500`);
    sampling faster than the display needs wastes cycles measuring the
    measurer.
  - `historyLength?: number` – Number of samples retained for `'graph'`
    variant (default: `60`).
  - `className?: string`.
  - `onThresholdExceeded?: (metric: string, value: number) => void` – Called
    when a metric crosses `thresholds[metric]`.
  - `thresholds?: Partial<Record<string, number>>` – Warning thresholds per
    metric (e.g., `{ fps: 30 }` to flag drops below 30fps).
  - `aria-label?: string`.
  - `draggable?: boolean` – Allow repositioning (default: `true`).
- **State:** `metrics`, `history`.
- **Events:** `onThresholdExceeded`.
- **Variants:** `compact`, `graph`, `detailed` (via `variant` prop).
- **PlayCanvas Integration:** Reads engine stats via `useDevAPI`.
  **Performance:** Sampling itself has a small but non-zero cost; keep
  `updateInterval` at `500`ms or higher outside of active perf investigation,
  and always ensure `PerformanceMonitor` is excluded from production builds
  — like `DevTools`, it should not ship.
- **Tailwind/UI Behavior:** `fixed`, `bg-black/80`, `text-green-400`,
  `font-mono`, `text-xs`, `p-2`, `rounded`; threshold-exceeded metrics flip
  to `text-red-400`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`; typically mounted inside
  `DevTools` as a tab or a standalone floating overlay.
- **Accessibility:** `role="status"`, `aria-label="Performance monitor"`;
  DevMode-only, so screen-reader support is a lower bar than user-facing
  components, but numeric values should still be exposed as text (not
  canvas-only) for any assistive-tech use during development.
- **Rebuild Notes:** Sample via `pc.Application`'s frame stats
  (`app.stats`); never bundle into production output.

---

### Component: AssetViewer

- **Purpose:** List of loaded PlayCanvas assets with size, type, and load
  status, for debugging asset usage.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `pcApp: any` – PlayCanvas application instance.
  - `filter?: 'all' | 'texture' | 'model' | 'audio' | 'script' | 'material'`
    (default: `'all'`).
  - `sortBy?: 'name' | 'size' | 'type' | 'loadTime'` (default: `'size'`).
  - `className?: string`.
  - `onSelect?: (asset: any) => void`.
  - `onPreview?: (asset: any) => void` – Called to request a preview (e.g.,
    render a texture thumbnail or play an audio clip).
  - `onUnload?: (asset: any) => void` – Force-unload an asset (dev-only
    diagnostic action).
  - `aria-label?: string`.
  - `showUnusedOnly?: boolean` – Filter to assets with zero active
    references (default: `false`), useful for finding leaks.
  - `groupBy?: 'type' | 'none'` (default: `'type'`).
- **State:** `assets`, `selectedAsset`, `totalSize`.
- **Events:** `onSelect`, `onPreview`, `onUnload`.
- **Variants:** None (filtering via `filter`/`groupBy`).
- **PlayCanvas Integration:** Reads the asset registry via `useDevAPI`.
- **Tailwind/UI Behavior:** `overflow-auto font-mono text-sm`; rows `flex
  justify-between px-2 py-1 border-b border-gray-800 hover:bg-gray-800`;
  total size summary pinned at the top.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `TreeView` (grouped view) or a flat list,
  `Text`, `Button` (unload action); typically mounted inside `DevTools`.
- **Accessibility:** `role="table"` (or `role="tree"` when
  `groupBy="type"`), `aria-label="Asset viewer"`; DevMode-only.
- **Rebuild Notes:** Read from `pc.Application.assets`; `showUnusedOnly`
  compares each asset's reference count against zero, useful for catching
  orphaned loads before shipping.

---

## Category: Editor

### Component: Editor

- **Purpose:** In‑game editor for placing, moving, rotating, scaling objects.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `palette: Prefab<T = any>[]` where
    `Prefab<T> = { id: string, name: string, thumbnail?: string, data: T, category?: string }`
    – Generic over the prefab's `data` payload shape (defaults to `any` for
    backward compatibility); pass a specific `T` for type-safe prefab data.
  - `pcEntity?: string` – PlayCanvas editor entity.
  - `variant?: '2d' | '3d' | 'snap-grid' | 'none'` (default: `'3d'`). `'none'`
    disables the visual grid/gizmo chrome entirely (free transform, no
    snapping UI) for cases where the consumer renders its own manipulation
    affordances.
  - `onPlace: (prefab: Prefab) => void`.
  - `onDelete: (entity: any) => void` – Includes the deleted entity.
  - `onTransform: (transform: { position: any, rotation: any, scale: any }, oldTransform: any) => void`
    – Receives old and new transforms.
  - `className?: string`.
  - `onUndo?: () => void`.
  - `onRedo?: () => void`.
  - `aria-label?: string`.
  - `snapSize?: number` – Grid snap size (default: `1`).
  - `snapRotation?: number` – Rotation snap in degrees (default: `15`).
  - `showGrid?: boolean` – Show grid (default: `true`).
  - `showSnap?: boolean` – Show snap indicators (default: `true`).
  - `onToolChange?: (tool: string) => void` – Called when active tool changes
    (e.g., move/rotate/scale/place tool).
  - `onSelect?: (entity: any) => void` – Called when an in-scene object is
    selected for editing — distinct from `onToolChange`, which tracks the
    active _tool_, not the selected _object_.
  - `onDeselect?: () => void` – Called when the current selection is cleared.
- **State:** `selectedTool`, `selectedObject`, `isEditing`, `history`.
- **Events:** `onPlace`, `onDelete`, `onTransform`, `onUndo`, `onRedo`,
  `onToolChange`, `onSelect`, `onDeselect`.
- **Variants:** `2d`, `3d`, `snap-grid`, `none` (via `variant` prop).
- **PlayCanvas Integration:** Uses `useEditorBridge`.
- **Tailwind/UI Behavior:** `fixed`, `bottom-4`, `right-4`, `z-50`,
  `bg-gray-800`, `rounded-lg`, `shadow-xl`, `p-2`; toolbar `flex`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Flex`, `Button`, `Icon`, `Palette`;
  internally uses `Gizmo` controls for 3D manipulation.
- **Accessibility:** `role="toolbar"`, `aria-label="Editor tools"`; keyboard
  shortcuts.
- **Rebuild Notes:** Only DevMode; supports Gizmo controls via PC; undo/redo.

---

### Component: Palette

- **Purpose:** Drag‑drop prefab palette for editor with search and categories.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `prefabs: Prefab[]` – Available prefabs; each `Prefab.category` (from the
    shared `Prefab` type defined under `Editor`) determines which category
    group it's shown under.
  - `categories?: string[]` – Category filter — restricts which of the
    prefabs' `category` values are shown as filter tabs/chips; omit to derive
    the list automatically from `prefabs[].category`.
  - `pcEntity?: string` – PlayCanvas editor entity.
  - `variant?: 'grid' | 'list' | 'compact'` (default: `'grid'`).
  - `onSelect: (prefab: Prefab) => void`.
  - `onDragStart: (prefab: Prefab) => void`.
  - `onSearch: (query: string) => void`.
  - `className?: string`.
  - `onCategoryChange?: (category: string) => void`.
  - `aria-label?: string`.
  - `onLoad?: () => void` – Called when prefabs are loaded.
  - `recent?: string[]` – Array of recently used prefab IDs.
- **State:** `selectedCategory`, `searchQuery`, `filteredPrefabs`.
- **Events:** `onSelect`, `onDragStart`, `onSearch`, `onCategoryChange`,
  `onLoad`.
- **Variants:** `grid`, `list`, `compact` (via `variant` prop).
- **PlayCanvas Integration:** Reads prefabs via `usePrefabLibrary`; supports
  drag to scene.
- **Tailwind/UI Behavior:** `grid`, `grid-cols-4`, `gap-2`, `p-2`; each prefab
  draggable card with thumbnail.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `@dnd-kit/core`.
- **Composition:** Composes `Box`, `Input`, `Grid`, `Icon`; uses DnD.
- **Accessibility:** `role="grid"`, `aria-label="Object palette"`; keyboard
  navigation; drag‑drop accessible.
- **Rebuild Notes:** Part of `Editor`; drag‑drop to scene; supports recent
  items.

---

### Component: TerrainPainter

- **Purpose:** Brush-based terrain texture/height editing tool for the
  in-game `Editor`.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas terrain entity.
  - `mode: 'height' | 'texture' | 'smooth'` – Paint mode.
  - `brushSize?: number` – Brush radius in world units (default: `5`).
  - `brushStrength?: number` – Effect intensity per stroke, `0`–`1` (default:
    `0.5`).
  - `brushFalloff?: 'linear' | 'smooth' | 'constant'` (default: `'smooth'`).
  - `textures?: { id: string, thumbnail: string, name: string }[]` –
    Available terrain textures for `mode="texture"`.
  - `activeTexture?: string` – Currently selected texture ID.
  - `className?: string`.
  - `onPaint?: (position: { x: number, y: number, z: number }, strength: number) => void`
    – Called continuously while painting.
  - `onStrokeStart?: () => void`.
  - `onStrokeEnd?: () => void`.
  - `onModeChange?: (mode: 'height' | 'texture' | 'smooth') => void`.
  - `onTextureSelect?: (textureId: string) => void`.
  - `aria-label?: string`.
  - `showBrushOutline?: boolean` – Show the brush's world-space footprint
    under the cursor (default: `true`).
- **State:** `mode`, `brushSize`, `isPainting`.
- **Events:** `onPaint`, `onStrokeStart`, `onStrokeEnd`, `onModeChange`,
  `onTextureSelect`.
- **Variants:** `height`, `texture`, `smooth` (via `mode` prop).
- **PlayCanvas Integration:** Uses `useEditorBridge` to raycast the terrain
  and apply height/texture edits per paint event.
- **Tailwind/UI Behavior:** Toolbar `flex gap-2 p-2 bg-gray-800 rounded-lg`;
  brush-size/strength as `Slider`s; texture palette as a `Grid` of
  thumbnail buttons.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Flex`, `Slider`, `Grid`, `Button`,
  `Icon`; part of `Editor`.
- **Accessibility:** `role="toolbar"`, `aria-label="Terrain painter"`; the
  paint interaction itself is pointer-driven and not meaningfully
  keyboard-operable (consistent with other direct-manipulation `Editor`
  tools) — mode/brush controls remain fully keyboard accessible.
- **Rebuild Notes:** Only DevMode; raycasts against the terrain entity per
  paint event via `useEditorBridge`; undo/redo integration goes through
  `Editor`'s own `onUndo`/`onRedo`.

---

### Component: LightingControls

- **Purpose:** Adjust ambient and directional light properties (color,
  intensity, direction, shadows) within the in-game `Editor`.
- **DevMode/PlayMode:** DevMode only
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas light entity.
  - `lightType: 'directional' | 'point' | 'spot' | 'ambient'` – The light
    being edited.
  - `color: string` – Light color (hex).
  - `intensity: number` – Light intensity.
  - `direction?: { x: number, y: number, z: number }` – For
    `'directional'`/`'spot'` lights.
  - `range?: number` – For `'point'`/`'spot'` lights.
  - `castShadows?: boolean`.
  - `shadowResolution?: 512 | 1024 | 2048 | 4096` (default: `1024`).
  - `className?: string`.
  - `onChange?: (property: string, value: any) => void`.
  - `onColorChange?: (color: string) => void`.
  - `onIntensityChange?: (intensity: number) => void`.
  - `onDirectionChange?: (direction: { x: number, y: number, z: number }) => void`.
  - `onShadowToggle?: (enabled: boolean) => void`.
  - `aria-label?: string`.
- **State:** `lightProperties`.
- **Events:** `onChange`, `onColorChange`, `onIntensityChange`,
  `onDirectionChange`, `onShadowToggle`.
- **Variants:** `directional`, `point`, `spot`, `ambient` (via `lightType`).
- **PlayCanvas Integration:** Reads/writes light component properties via
  `usePropertyEditor` (same hook `Property` uses).
- **Tailwind/UI Behavior:** `grid grid-cols-2 gap-2 p-2`; reuses
  `ColorPicker`/`Slider`/`Toggle` per property, matching `Property`'s
  general form layout.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `ColorPicker`, `Slider`, `Toggle`,
  `Label`; effectively a `Property`-style form specialized for light
  components.
- **Accessibility:** `role="form"`, `aria-label="Lighting controls"`; each
  field has a `Label` and `aria-label`, consistent with `Property`.
- **Rebuild Notes:** Only DevMode; specialized `Property` form for
  PlayCanvas light components rather than a fully generic property grid.

---

## Category: Loading

### Component: LoadScreen

- **Purpose:** Game loading screen with progress, tips, and background.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `minLoadTime?: number` – Minimum display time in ms (default: `1000`).
    Guards against a jarring flash for near-instant loads (the screen stays
    up for at least this long even if assets finish sooner); keep it in the
    ~500–1500ms range for typical scenes — much higher artificially delays
    play, much lower reintroduces the flash this prop exists to prevent.
  - `pcEntity?: string` – PlayCanvas loading entity.
  - `background?: string` – Background image URL.
  - `tips?: string[]` – Loading tips to cycle through.
  - `variant?: 'full' | 'minimal' | 'with-logo' | 'with-tips'` (default:
    `'full'`). **Note:** `'animated'` variant removed; apply CSS animation
    classes directly via `className` (e.g., a custom `animate-*` Tailwind
    utility on the background or logo) instead of a dedicated variant, since
    "animated" isn't a distinct layout — it's an orthogonal visual effect
    like `Progress`'s `animated` prop.
  - `onLoadStart?: () => void` – Called when loading begins (mount, before
    any progress has been reported).
  - `onLoadComplete: (data?: { duration: number }) => void` – Called after
    `minLoadTime` and loading complete; includes total duration when
    available.
  - `className?: string`.
  - `onTipChange?: (tip: string) => void`.
  - `onProgress?: (progress: number) => void`.
  - `onLoadProgress?: (progress: number) => void` – Alias for `onProgress`;
    identical signature, fires alongside it.
  - `aria-label?: string`.
  - `logo?: string` – Logo image URL.
  - `onSkip?: (data: { progressAtSkip: number }) => void` – Called when skip
    is triggered, including the progress value at the moment of skipping.
  - `showProgress?: boolean` – Show progress bar (default: `true`).
- **State:** `progress`, `isComplete`, `tip`.
- **Events:** `onLoadStart`, `onLoadComplete`, `onTipChange`, `onProgress`,
  `onLoadProgress`, `onSkip`.
- **Variants:** `full`, `minimal`, `with-logo`, `with-tips` (via `variant`
  prop).
- **PlayCanvas Integration:** Reads progress via `useLoadingProgress`.
- **Tailwind/UI Behavior:** `fixed`, `inset-0`, `z-[9999]`, `bg-black`, `flex`,
  `items-center`, `justify-center`; background `bg-cover`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Flex`, `Progress`, `Text`, `Image`; uses
  `useLoadingProgress`.
- **Accessibility:** `role="progressbar"`, `aria-label="Loading"`,
  `aria-valuenow`; progress announced.
- **Rebuild Notes:** Uses `useLoadingProgress` with asset manifest; ensures
  minimum display time; can show tips.

---

### Component: Skeleton

- **Purpose:** Loading placeholder for content with animated pulse.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `variant?: 'text' | 'rect' | 'circle'` (default: `'rect'`). **Note:**
    `'card'` and `'avatar'` are composite, not primitives — build them by
    composing multiple `Skeleton` primitives (e.g., a `'circle'` avatar next
    to stacked `'text'` lines) inside a `Flex`/`Box`, rather than expecting a
    single `Skeleton` variant to produce the whole composite shape.
  - `width?: string | number` – Placeholder width. A bare `number` is treated
    as pixels (`width={200}` → `200px`); a `string` is used as-is and must
    include its own unit or be a valid CSS value (`'100%'`, `'10rem'`,
    `'auto'`).
  - `height?: string | number` – Placeholder height. Same numeric-as-pixels
    rule as `width`.
  - `animate?: boolean` – Enable pulse animation (default: `true`).
  - `className?: string`.
  - `aria-label?: string` – Hidden from screen readers by default.
  - `count?: number` – Number of skeletons to render (default: `1`).
  - `gap?: number` – Gap between skeletons (Tailwind spacing scale).
  - `onLoad?: () => void` – Called when skeleton is rendered.
  - `onError?: () => void` – Called if the content the skeleton is standing
    in for fails to load, so consumers can swap the skeleton for an error
    state rather than leaving it pulsing indefinitely.
  - `children?: ReactNode` – Custom skeleton content.
- **State:** `isVisible`.
- **Variants:** `text`, `rect`, `circle` (via `variant` prop).
- **PlayCanvas Integration:** None.
- **Tailwind/UI Behavior:** `bg-gray-700`, `animate-pulse` if animate,
  `rounded-*`; `w-*`, `h-*`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`.
- **Accessibility:** `aria-hidden="true"`; hides from screen readers; parent
  container can use `aria-busy="true"`.
- **Rebuild Notes:** Uses `useSkeleton` for responsive dimensions; supports
  custom content.

---

## Category: Error

### Component: ErrorBoundary

- **Purpose:** React error boundary with recovery and PlayCanvas error
  reporting.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `fallback?: ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => ReactNode)`
    – Custom fallback UI (overrides built-in for given variant). Accepts a
    plain `ReactNode` for a static fallback, or a render function to build
    error-specific fallback UI (e.g., showing `error.message`).
  - `onError?: (error: Error, errorInfo: React.ErrorInfo) => void`.
  - `pcEntity?: string` – PlayCanvas error entity.
  - `variant?: 'full' | 'inline' | 'minimal' | 'toast'` (default: `'full'`).
    `'toast'` renders the error as a dismissible `Toast` rather than
    replacing `children` in place — useful for non-fatal errors where the
    rest of the UI should remain interactive.
  - `className?: string`.
  - `children: ReactNode`.
  - `onReset?: (data?: { error: Error }) => void` – Reset boundary; includes
    the error that was being recovered from, when available.
  - `onReport?: (error: Error) => void` – Report error.
  - `aria-label?: string`.
- **State:** `hasError`, `error`, `errorInfo`.
- **Events:** `onReset`, `onReport`, `onError`.
- **Variants:** `full`, `inline`, `minimal`, `toast` (via `variant` prop).
- **PlayCanvas Integration:** Reports errors via `useErrorReporter`.
- **Tailwind/UI Behavior:** `bg-red-900/20`, `border-red-500`, `p-4`,
  `rounded-lg`, `text-red-300`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Button` (reset).
- **Accessibility:** `role="alert"`, `aria-live="assertive"`; focus on error
  message.
- **Rebuild Notes:** Wraps game UI; sends stack trace to PC console; allows
  reset.

---

### Component: ErrorMsg

- **Purpose:** Display error messages with actions like retry or dismiss.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `message: string` – Error message.
  - `code?: string | number` – Error code. Not validated against any known
    error-code registry — any string or number is accepted as-is and
    rendered alongside `message`; callers are responsible for ensuring it
    corresponds to a real code in their system.
  - `actionLabel?: string` – Action button label.
  - `pcEntity?: string` – PlayCanvas error entity.
  - `onDismiss?: (data?: { code?: string | number }) => void` – Dismiss
    handler; includes the error `code` when available.
  - `onAction?: (data?: { code?: string | number }) => void` – Action
    handler; includes the error `code` when available.
  - `onReport?: (data?: { code?: string | number, message: string }) => void`
    – Report handler; includes the error `code` and `message`.
  - `onRetry?: (data?: { code?: string | number }) => void` – Retry handler;
    includes the error `code` when available.
  - `variant?: 'banner' | 'toast' | 'inline' | 'full-page' | 'modal'`
    (default: `'inline'`). `'modal'` renders the error inside a `Modal`
    (blocking) rather than inline/banner (non-blocking) — use for errors that
    must be acknowledged before continuing.
  - `className?: string`.
  - `aria-label?: string`.
- **State:** `isVisible`, `isDismissed`.
- **Events:** `onDismiss`, `onAction`, `onReport`, `onRetry`.
- **Variants:** `banner`, `toast`, `inline`, `full-page`, `modal` (via
  `variant` prop).
- **PlayCanvas Integration:** Logs error via `useErrorReporter`.
- **Tailwind/UI Behavior:** `bg-red-900/20`, `border-red-500`, `p-4`,
  `rounded-lg`, `text-red-300`; action button `primary`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Text`, `Button`, `Icon`.
- **Accessibility:** `role="alert"`, `aria-live="assertive"`; focus on error;
  `aria-describedby`.
- **Rebuild Notes:** Used by `ErrorBoundary` and network errors; supports retry
  and dismiss.

---

## Category: Responsive

### Component: Responsive

- **Purpose:** Responsive wrapper that adapts to breakpoints and orientation.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `breakpoints?: { sm?: number, md?: number, lg?: number, xl?: number, '2xl'?: number }`
    (default: `{ sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }`). Values
    are plain numbers (pixels); there is no runtime validation that they are
    positive or in ascending order — passing an out-of-order breakpoint map
    (e.g., `md` larger than `lg`) produces undefined breakpoint-matching
    behavior, so keep custom breakpoints monotonically increasing.
  - `pcEntity?: string` – PlayCanvas responsive entity.
  - `variant?: 'mobile' | 'tablet' | 'desktop'` (default: `'desktop'`).
    **Note:** `'tv'` variant removed; use `variant="desktop"` together with a
    custom `breakpoints` map (e.g., a higher `xl`/`2xl` threshold) to
    reproduce TV-sized layout targeting instead of a dedicated variant.
  - `className?: string`.
  - `children?: ReactNode | ((ctx: { breakpoint: string, orientation: string }) => ReactNode)`
    – Either static content, or a function-as-child that receives the current
    breakpoint/orientation for responsive rendering logic.
  - `onMount?: () => void` – Called once after `Responsive` mounts and the
    initial breakpoint/orientation have been measured.
  - `onBreakpointChange?: (breakpoint: string) => void`.
  - `onOrientationChange?: (orientation: 'portrait' | 'landscape') => void`.
  - `aria-label?: string`.
  - `onResize?: (size: { width: number, height: number }) => void` – Called on
    resize.
- **State:** `currentBreakpoint`, `orientation`.
- **Events:** `onMount`, `onBreakpointChange`, `onOrientationChange`,
  `onResize`.
- **Variants:** `mobile`, `tablet`, `desktop` (via `variant` prop).
- **PlayCanvas Integration:** Syncs viewport via `useViewportSync`.
- **Tailwind/UI Behavior:** Uses Tailwind responsive classes: `sm:`, `md:`,
  `lg:`, `xl:`, `2xl:`; passes via `className`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useMediaQuery`.
- **Composition:** Composes `Box`; provides context.
- **Accessibility:** `role="region"` with `aria-label` (set a descriptive
  label for what the responsive region contains, e.g., `"Main layout"` —
  it's not auto-derived); respects `prefers-reduced-motion`; `aria-hidden`.
- **Rebuild Notes:** Uses `useViewport`; injects responsive classes; SSR with
  default breakpoint.

---

### Component: Touch

- **Purpose:** Mobile touch overlay for game controls (joystick, buttons).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `controls: TouchControl[]` where
    `TouchControl = { id: string, type: 'joystick' | 'button', position?: { x: number, y: number } | 'relative' | 'absolute', label?: string, size?: number }`
    – `id` doubles as the React list key when `Touch` renders `controls` (no
    separate `key` field is needed — `id` must therefore be unique within the
    array, the same requirement a `key` would have).
  - `pcEntity?: string` – PlayCanvas touch entity.
  - `variant?: 'joystick' | 'buttons' | 'mixed'` (default: `'mixed'`). **Note:**
    `'custom'` variant removed; for a custom layout, use `children` to render
    additional/custom controls alongside (or instead of) the ones generated
    from `controls`, rather than a dedicated variant.
  - `layout?: 'default' | 'left' | 'right'` (default: `'default'`).
  - `className?: string`.
  - `children?: ReactNode` – Additional touch controls.
  - `onTouchStart?: (id: string, touch: { x: number, y: number }) => void` –
    Includes the touch position.
  - `onTouchEnd?: (id: string, touch: { x: number, y: number }) => void` –
    Includes the last known touch position.
  - `onTouchMove?: (id: string, x: number, y: number) => void`.
  - `onButtonPress?: (id: string, button: TouchControl) => void` – Includes
    the full button's `TouchControl` definition.
  - `onButtonRelease?: (id: string, button: TouchControl) => void` – Includes
    the full button's `TouchControl` definition.
  - `aria-label?: string`.
  - `disabled?: boolean` – Disable all touch controls.
- **State:** `touchState`, `buttons`.
- **Events:** `onTouchStart`, `onTouchEnd`, `onTouchMove`, `onButtonPress`,
  `onButtonRelease`.
- **Variants:** `joystick`, `buttons`, `mixed` (via `variant` prop).
- **PlayCanvas Integration:** Sends touch input via `useTouchBridge`.
- **Tailwind/UI Behavior:** `fixed`, `bottom-0`, `left-0`, `right-0`, `z-40`,
  `touch-none`; joystick `w-24 h-24 rounded-full bg-white/20`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Joystick`, `Button`; uses
  `useIsTouchDevice`.
- **Accessibility:** `role="group"`, `aria-label="Touch controls"`; prevents
  default; buttons have `aria-label`.
- **Rebuild Notes:** Only rendered on touch devices; layout customizable;
  supports multi‑touch.

---

### Component: OrientationLock

- **Purpose:** Forces (or reacts to) a required device orientation, showing
  a rotate-prompt overlay when the device is the wrong way round.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `required: 'portrait' | 'landscape'` – Required orientation.
  - `children: ReactNode` – Content to render once the required orientation
    is active.
  - `pcEntity?: string` – PlayCanvas orientation entity.
  - `fallback?: ReactNode` – Custom content shown while the orientation is
    wrong (default: a built-in "rotate your device" prompt with an animated
    icon).
  - `attemptLock?: boolean` – Attempt to programmatically lock orientation
    via the Screen Orientation API where supported (default: `false`, since
    this requires fullscreen on most browsers and can fail silently).
  - `className?: string`.
  - `onOrientationMismatch?: () => void` – Called when the device
    orientation no longer matches `required`.
  - `onOrientationMatch?: () => void` – Called when it matches (including on
    initial mount if already correct).
  - `onLockFailed?: (error: Error) => void` – Called if `attemptLock`'s
    Screen Orientation API call rejects/is unsupported.
  - `aria-label?: string`.
- **State:** `currentOrientation`, `isMatching`.
- **Events:** `onOrientationMismatch`, `onOrientationMatch`, `onLockFailed`.
- **Variants:** None.
- **PlayCanvas Integration:** Reads viewport orientation via
  `useViewportSync`.
- **Tailwind/UI Behavior:** Overlay `fixed inset-0 z-[9999] bg-black flex
  flex-col items-center justify-center`; rotate icon `animate-spin` (slow)
  or a custom rotate animation.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`.
- **Accessibility:** `role="alert"` when mismatched (an actionable blocker
  the user must resolve), `aria-live="assertive"`; the fallback prompt's
  text instruction is the primary accessible content — don't rely on the
  rotate icon alone to convey the required action.
- **Rebuild Notes:** `attemptLock` only works within a user-gesture-
  initiated fullscreen context on most browsers — treat the built-in
  `fallback` prompt as the reliable primary path and `attemptLock` as a
  best-effort enhancement, not the sole mechanism.

---

## Category: Accessibility

### Component: A11y

- **Purpose:** Accessibility context provider for announcements and preferences.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `announcements?: { [key: string]: string }` – Announcement messages,
    keyed by a caller-defined announcement id (e.g., `'objective-complete'`)
    mapping to the message text to speak when `onAnnounce`/`useAnnounce` is
    triggered with that key; values must be plain strings (no rich
    content/interpolation is applied by `A11y` itself).
  - `highContrast?: boolean` – Enable high contrast mode (default: detected
    from the `prefers-contrast: more` media query via `useA11ySync`/system
    detection; pass explicitly to override the detected system preference).
  - `reducedMotion?: boolean` – Enable reduced motion (default: detected from
    the `prefers-reduced-motion: reduce` media query; pass explicitly to
    override the detected system preference).
  - `pcEntity?: string` – PlayCanvas accessibility entity.
  - `children: ReactNode`.
  - `onAnnounce?: (message: string) => void`.
  - `onFocusChange?: (element: HTMLElement) => void`.
  - `onPreferenceChange?: (key: string, value: boolean) => void`.
  - `screenReaderAnnouncements?: boolean` – Enable screen reader announcements
    (default: `true`).
- **State:** `prefersReducedMotion`, `prefersHighContrast`, `announcements`.
- **Events:** `onAnnounce`, `onFocusChange`, `onPreferenceChange`.
- **PlayCanvas Integration:** Syncs preferences via `useA11ySync`; PC can push
  announcements.
- **Dependencies:** `react`, `useContext`, `useEffect`, `useAnnounce`.
- **Composition:** Context Provider; wraps app.
- **Accessibility:** `role="status"`, `aria-live="polite"`; uses `useAnnounce`.
- **Rebuild Notes:** Uses `useAnnounce`; reads `prefers-reduced-motion`;
  extensible.

---

### Component: FocusTrap

- **Purpose:** Trap focus within modal/dialog and restore on release.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `active: boolean` – Trap active state.
  - `children: ReactNode`.
  - `returnFocus?: boolean` – Return focus on deactivation (default: `true`).
  - `variant?: 'modal' | 'auto'` (default: `'modal'`). `'modal'` applies
    `aria-hidden="true"` to sibling content outside the trap and prevents
    tabbing out entirely (the previous `'non-modal'`, which allowed tabbing
    out at the trap boundary, has been removed as a distinct variant);
    `'auto'` lets `FocusTrap` decide based on `active` and ancestor context
    — effectively behaving as `'modal'` whenever active, so in practice the
    two behave the same and `'auto'` exists mainly for future extensibility.
  - `initialFocus?: string | HTMLElement` – CSS selector (resolved with
    `querySelector` inside the trap) or a direct element reference for
    initial focus. Not validated — a selector matching nothing, or an
    `HTMLElement` not inside the trap, silently falls back to the first
    focusable descendant instead of throwing.
  - `className?: string`.
  - `onTrap?: () => void`.
  - `onRelease?: () => void`.
  - `onDeactivate?: () => void`.
  - `onFocusOut?: (e: FocusEvent) => void`.
  - `aria-label?: string`.
- **State:** `active`, `focusableElements`.
- **Events:** `onTrap`, `onRelease`, `onDeactivate`, `onFocusOut`.
- **Dependencies:** `@radix-ui/react-focus-trap`.
- **Composition:** Wraps children; uses Radix FocusTrap.
- **Accessibility:** `aria-hidden="true"` for outside content; ensures keyboard
  navigation stays inside.
- **Rebuild Notes:** Used by `Modal`, `Dialogue`, `ContextMenu`; restores focus
  on deactivation.

---

### Component: SkipLink

- **Purpose:** Skip to main content link for keyboard users, visible on focus.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `targetId: string` – Target element ID to skip to. Not validated against
    the live DOM — if no element with this `id` exists when the link is
    activated, the native anchor-jump (`href="#${targetId}"`) simply does
    nothing (no error, no focus change); ensure the target element exists
    wherever `SkipLink` is rendered.
  - `label?: string` – Link label (default: `'Skip to main content'`).
  - `offset?: number` – Offset for fixed headers in pixels (default: `0`).
  - `variant?: 'standard' | 'minimal'` (default: `'standard'`).
  - `className?: string`.
  - `onSkip?: (data: { targetId: string }) => void` – Includes the target
    that was skipped to.
  - `onFocus?: (e: React.FocusEvent) => void`.
  - `onBlur?: (e: React.FocusEvent) => void`.
  - `aria-label?: string`.
- **State:** `isVisible`, `isFocused`.
- **Events:** `onSkip`, `onFocus`, `onBlur`.
- **Variants:** `standard`, `minimal` (via `variant` prop).
- **Tailwind/UI Behavior:** `fixed`, `top-0`, `left-0`, `z-[9999]`, `bg-white`,
  `text-black`, `p-2`, `-translate-y-full`, `focus:translate-y-0`;
  `transition-transform`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Button` with `as="a"` to render an anchor element
  with `href="#${targetId}"` for native skip behavior.
- **Accessibility:** `role="link"`, `aria-label="${label}"`; first interactive
  element; skips to target.
- **Rebuild Notes:** Only visible on focus; uses `offset` for fixed headers.

---

### Component: ScreenReader

- **Purpose:** Screen reader announcements with priority.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `message: string` – Announcement message.
  - `priority?: 'polite' | 'assertive'` (default: `'polite'`). **Note:**
    `'live'` removed; use `'polite'`.
  - `pcEntity?: string` – PlayCanvas announcement entity.
  - `debounce?: number` – Debounce time in ms (default: `100`).
  - `className?: string`.
  - `onAnnounce?: (data: { message: string, priority: 'polite' | 'assertive' }) => void`
    – Called each time a message is announced, with the message text and
    priority level used.
  - `onClear?: () => void`.
  - `onPriorityChange?: (priority: string) => void`.
  - `aria-label?: string`.
- **State:** `messages`, `isAnnouncing`.
- **Events:** `onAnnounce`, `onClear`, `onPriorityChange`.
- **Variants:** `polite`, `assertive` (via `priority` prop).
- **PlayCanvas Integration:** Syncs via `useAnnounce`; PC can trigger.
- **Tailwind/UI Behavior:** `sr-only`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useAnnounce`.
- **Composition:** Composes `Text` with `sr-only`.
- **Accessibility:** `aria-live="${priority}"`, `aria-atomic="true"`; announces
  content changes.
- **Rebuild Notes:** Used for puzzle clues, objective updates, dialogue;
  debounced.

---

### Component: LiveRegion

- **Purpose:** Wrapper that announces dynamic content changes (e.g., chat
  messages, live score updates) via `aria-live`, complementing
  `ScreenReader`'s explicit-message-only announcements by announcing changes
  to arbitrary rendered content automatically.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `children: ReactNode` – Content to watch; text-content changes to this
    subtree are announced automatically.
  - `priority?: 'polite' | 'assertive'` (default: `'polite'`).
  - `atomic?: boolean` – Announce the entire region's content on any change
    rather than just the changed part (default: `true`, mirroring
    `aria-atomic`).
  - `relevant?: Array<'additions' | 'removals' | 'text' | 'all'>` – Maps
    directly to `aria-relevant` (default: `['additions', 'text']`).
  - `pcEntity?: string` – PlayCanvas live-region source entity.
  - `debounce?: number` – Debounce rapid successive changes into a single
    announcement, in ms (default: `100`, same default as `ScreenReader`'s
    `debounce`).
  - `className?: string`.
  - `visuallyHidden?: boolean` – Render visually hidden (`sr-only`) while
    remaining in the accessibility tree — for a region that exists purely
    to announce, with no visible UI of its own (default: `false`; when
    `false`, `children` renders normally and is *also* announced on
    change).
  - `onAnnounce?: (text: string) => void` – Called with the text that was
    announced.
- **State:** `lastAnnouncedText`.
- **Events:** `onAnnounce`.
- **Variants:** `polite`, `assertive` (via `priority` prop).
- **PlayCanvas Integration:** Can be driven by a PlayCanvas-side event via
  `useAnnounce` (same hook `A11y`/`ScreenReader` use) in addition to
  watching `children` directly.
- **Tailwind/UI Behavior:** `sr-only` when `visuallyHidden`; otherwise no
  imposed styling (renders `children` as-is).
- **Dependencies:** `react`, `tailwind-merge`, `clsx`, `useAnnounce`.
- **Composition:** Wraps `children`; a thin `aria-live`/`MutationObserver`-
  based layer rather than composing other library components.
- **Accessibility:** `aria-live="${priority}"`, `aria-atomic="${atomic}"`,
  `aria-relevant="${relevant.join(' ')}"`; unlike `ScreenReader` (which
  announces an explicit `message` prop on demand), `LiveRegion` derives what
  to announce from actual content changes — use `ScreenReader` for one-off
  programmatic announcements and `LiveRegion` for "this visible area
  changes and screen readers should know."
- **Rebuild Notes:** Use for chat/`History` logs, live objective progress
  text, and score counters where content updates outside of explicit user
  action.

---

## Category: General

### Component: Stepper

- **Purpose:** Multi-step workflow UI (e.g., character creation, tutorial
  onboarding) with step indicators and navigation.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `steps: { id: string, label: string, content: ReactNode, optional?: boolean }[]`
    – Step definitions, in order.
  - `activeStep?: string` – Currently active step ID (controlled).
  - `defaultStep?: string` – Initial step for uncontrolled mode (defaults to
    `steps[0].id`).
  - `pcEntity?: string` – PlayCanvas stepper entity.
  - `linear?: boolean` – Require completing steps in order, disabling direct
    jumps to future steps (default: `true`).
  - `variant?: 'horizontal' | 'vertical' | 'dots'` (default: `'horizontal'`).
    `'dots'` renders a minimal progress-dots indicator instead of full step
    labels (common for tutorial/onboarding flows).
  - `className?: string`.
  - `onStepChange?: (stepId: string) => void`.
  - `onNext?: () => void`.
  - `onBack?: () => void`.
  - `onComplete?: () => void` – Called after the last step's "Next"/"Finish"
    action.
  - `onStepValidate?: (stepId: string) => boolean | Promise<boolean>` – If
    it returns/resolves `false`, blocks advancing past that step.
  - `aria-label?: string`.
  - `showStepNumbers?: boolean` – Show numeric step indicators (default:
    `true`).
  - `allowSkipOptional?: boolean` – Allow skipping steps marked `optional`
    (default: `true`).
- **State:** `activeStep`, `completedSteps`, `isValidating`.
- **Events:** `onStepChange`, `onNext`, `onBack`, `onComplete`,
  `onStepValidate`.
- **Variants:** `horizontal`, `vertical`, `dots` (via `variant` prop).
- **PlayCanvas Integration:** Syncs current step via `useStepperSync` if
  `pcEntity` is set (e.g., a tutorial sequence gated on scene state).
- **Tailwind/UI Behavior:** Step indicators `flex items-center gap-2`;
  completed `bg-green-500`, active `bg-blue-500 ring-2`, upcoming
  `bg-gray-700`; connecting line between indicators `flex-1 h-0.5
  bg-gray-700`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Flex`, `Button` (Back/Next), `Text`,
  `Progress` (`'dots'` variant reuses `Progress`'s `segmented` variant).
- **Accessibility:** `role="navigation"` for the step indicator with
  `aria-label="Progress"`, each step `aria-current="step"` when active; the
  content panel is `role="region"` with `aria-labelledby` the active step's
  label; Back/Next are standard `Button`s with clear accessible names (not
  just chevron icons).
- **Rebuild Notes:** Use for onboarding, character creation, and settings
  wizards; `linear` mode should still allow going *back* to a completed
  step even when jumping *forward* is blocked.

---

### Component: Rating

- **Purpose:** Star-based (or icon-based) input/output for reviews,
  feedback, or difficulty ratings.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `value: number` – Current rating value.
  - `max?: number` – Maximum rating (default: `5`).
  - `onChange?: (value: number) => void` – Omit for a read-only display
    rating.
  - `readOnly?: boolean` – Explicit read-only mode (default: derived from
    whether `onChange` is provided).
  - `allowHalf?: boolean` – Allow half-step values (default: `false`).
  - `icon?: ReactNode` – Custom icon for a filled unit (default: a star
    `Icon`).
  - `emptyIcon?: ReactNode` – Custom icon for an empty unit (defaults to an
    outline version of `icon`).
  - `pcEntity?: string` – PlayCanvas rating entity.
  - `size?: 'sm' | 'md' | 'lg'` (default: `'md'`).
  - `color?: string` – Tailwind color class for filled units (default:
    `'text-yellow-400'`).
  - `className?: string`.
  - `onHover?: (value: number | null) => void` – Called with the value under
    the pointer while hovering (for live preview before committing via
    `onChange`).
  - `aria-label?: string`.
  - `label?: string` – Visible label above/beside the rating.
  - `showValue?: boolean` – Show the numeric value alongside the icons
    (default: `false`).
- **State:** `value`, `hoverValue`.
- **Events:** `onChange`, `onHover`.
- **Variants:** None (icon customizable via `icon`/`emptyIcon`).
- **PlayCanvas Integration:** Syncs via `useSettingSync` if `pcEntity` is
  set, e.g. a difficulty-rating persisted to a PlayCanvas-side profile.
- **Tailwind/UI Behavior:** `flex gap-0.5`; each unit `w-5 h-5
  cursor-pointer` (or `cursor-default` when `readOnly`); half-fill via a
  clipped overlay icon when `allowHalf`.
- **Dependencies:** `react`, `lucide-react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon` (×`max`), `Text` (value/label).
- **Accessibility:** `role="radiogroup"` with each unit `role="radio"` and
  `aria-checked` when interactive (`onChange` provided); `role="img"` with
  `aria-label` (e.g., `"Rated 4 out of 5"`) when read-only; keyboard
  Left/Right adjusts the focused unit's value when interactive.
- **Rebuild Notes:** Read-only vs. interactive modes share rendering but
  differ in ARIA role and pointer affordances — derive one from the other
  rather than duplicating markup.

---

### Component: Tag

- **Purpose:** Small label chip with optional removal, used for filters,
  keywords, or category badges.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `label: string` – Tag text.
  - `icon?: ReactNode` – Optional leading icon.
  - `variant?: 'solid' | 'outline' | 'subtle'` (default: `'subtle'`).
  - `color?: 'default' | 'primary' | 'success' | 'warning' | 'error'`
    (default: `'default'`).
  - `size?: 'sm' | 'md'` (default: `'md'`).
  - `removable?: boolean` – Show a remove (×) control (default: `false`).
  - `onRemove?: () => void` – Called when the remove control is activated;
    required when `removable` is `true`.
  - `pcEntity?: string` – PlayCanvas tag entity.
  - `onClick?: () => void` – Makes the tag itself clickable/selectable
    (e.g., a toggleable filter chip).
  - `selected?: boolean` – Selected/active state, relevant when `onClick` is
    set.
  - `className?: string`.
  - `aria-label?: string`.
  - `disabled?: boolean`.
- **State:** `isSelected`.
- **Events:** `onClick`, `onRemove`.
- **Variants:** `solid`, `outline`, `subtle` (via `variant` prop).
- **PlayCanvas Integration:** None (purely a UI/filter primitive); optional
  `pcEntity` accepted for consistency with the rest of the library, unused
  by default.
- **Tailwind/UI Behavior:** `inline-flex items-center gap-1 px-2 py-0.5
  rounded-full text-xs`; color-coded per `color`; remove control
  `hover:bg-black/20 rounded-full`.
- **Dependencies:** `react`, `tailwind-merge`, `clsx`.
- **Composition:** Composes `Box`, `Icon`, `Text`, `Button` (remove control,
  `variant="icon-only"`).
- **Accessibility:** Plain `role="status"`/no role when static; `role="button"`
  with `aria-pressed` when `onClick` makes it a toggle; the remove control
  is a real `Button` with `aria-label="Remove ${label}"`, not a bare icon.
- **Rebuild Notes:** Use for active-filter chips (`Inventory`/`ContextMenu`
  search filters), keyword lists, and category labels; compose from
  `Badge`-adjacent styling but keep them separate components since `Tag` is
  inline/removable while `Badge` is an overlay indicator.

---


## Category: PlayCanvas Bridge

### Component: PCProvider

- **Purpose:** Context provider for PlayCanvas engine access.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `pcApp: any` – PlayCanvas application instance (will be typed as
    `pc.Application`).
  - `pcScene: any` – PlayCanvas scene instance (will be typed as `pc.Scene`).
  - `config?: { assetPrefix?: string, scripts?: string[] }` – PlayCanvas
    configuration. `assetPrefix` is prepended to relative asset URLs loaded
    by the engine (useful when assets are served from a CDN or a
    non-root base path); `scripts` is a list of script URLs to load into the
    PlayCanvas script registry before the app starts, in order, so any
    component script referenced by `pcAction`/`useScript` elsewhere in the
    tree is guaranteed to be registered by the time `onReady` fires.
  - `children: ReactNode`.
  - `onReady?: (app: any) => void` – Includes the initialized PlayCanvas
    application instance.
  - `onError?: (error: Error) => void`.
  - `onSceneLoaded?: (scene: any) => void`.
  - `onDestroy?: () => void`.
  - `debug?: boolean` – Enable debug logging.
- **State:** `isReady`, `isLoading`, `scene`, `app`, `error`.
- **Events:** `onReady`, `onError`, `onSceneLoaded`, `onDestroy`.
- **PlayCanvas Integration:** Provides context; initializes engine.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useContext`, `useEffect`, `zustand`.
- **Composition:** Wraps entire app; provides context.
- **Accessibility:** N/A.
- **Rebuild Notes:** Single source of truth for PC instance; handles lifecycle.

---

### Hook: useEntity

- **Purpose:** Hook for PlayCanvas entity access and transform updates.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `entityId: string` – Entity ID. Not validated against the live scene
    graph at call time — an ID with no matching entity resolves `entity` to
    `null`/`undefined` rather than throwing, and re-resolves automatically if
    a matching entity appears later.
  - `sync?: boolean` – Auto-sync transforms (default: `false`).
  - `debounce?: number` – Debounce time in ms (default: `0`).
  - `onUpdate?: (transform: any) => void` – Called whenever the entity's
    transform updates.
  - `onDestroy?: () => void` – Called when the underlying entity is
    destroyed.
  - `onEnableChange?: (isEnabled: boolean) => void` – Called when the
    entity's enabled state changes.
- **Returns:**
  `{ entity: any, transform: { position: any, rotation: any, scale: any }, isEnabled: boolean, updateTransform: (t: any) => void }`
- **State:** `entity`, `transform`, `isEnabled`.
- **Events:** `onUpdate`, `onDestroy`, `onEnableChange`.
- **PlayCanvas Integration:** Subscribes to transform changes; updates each
  frame. **Performance:** `sync` defaults to `false` because per-frame
  transform subscription has a real cost when multiplied across many
  entities; enable it only for entities whose transform genuinely needs to
  stay live-mirrored in React state (e.g., driving a `Box`'s
  `syncTransform`-linked UI position) — for one-off reads, call
  `updateTransform`/read `transform` on demand instead of enabling `sync`.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Returns entity, transform, and methods; auto‑syncs if
  `sync` provided.

---

### Hook: useScript

- **Purpose:** Hook for PlayCanvas script state access.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `entityId: string` – Entity ID.
  - `stateKey: string` – Script state key. Not validated against the target
    script's actual attribute set — a `stateKey` that doesn't exist on the
    script resolves to `initialValue` (or `undefined`) rather than erroring,
    since the script may not have loaded yet.
  - `initialValue?: any` – Initial value.
  - `debounce?: number` – Write debounce in ms (default: `100`). Batches
    rapid `setValue` calls into a single write to the PlayCanvas script
    attribute; raise it (e.g., `250`–`500`ms) for state that changes very
    frequently but doesn't need near-real-time sync, or lower it (even to
    `0`) only for state where every intermediate value must reach PlayCanvas
    (rare — most UI-driven state doesn't need this).
  - `onChange?: (value: any) => void` – Called when `value` changes, from
    either `setValue` or an external PlayCanvas-side update.
  - `onSync?: (value: any) => void` – Called after a debounced write actually
    lands on the PlayCanvas script attribute.
  - `onError?: (error: Error) => void` – Called if a read/write fails (e.g.,
    the script or attribute doesn't exist).
- **Returns:**
  `{ value: any, setValue: (v: any) => void, isSynced: boolean, isLoading: boolean }`
- **State:** `value`, `isSynced`, `isLoading`.
- **Events:** `onChange`, `onSync`, `onError`.
- **PlayCanvas Integration:** Reads/writes script attributes; supports nested
  keys.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Supports lazy loading; error boundary; writes debounced.

---

### Hook: useEvent

- **Purpose:** Hook for PlayCanvas event subscription.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `entityId: string` – Entity ID.
  - `event: string` – Event name. Not validated against the entity's actual
    fired events — subscribing to a name the entity never fires is a silent
    no-op (`handler` simply never runs), not an error.
  - `handler: (...args: any[]) => void` – Event handler.
  - `once?: boolean` – Listen once (default: `false`).
  - `debounce?: number` – Debounce time in ms (default: `0`, i.e. no
    debouncing — every fire invokes `handler` immediately). Raise this for
    events that can fire in rapid bursts (e.g., a per-frame or per-collision
    event) where only the latest call in a burst matters; keep it at `0` for
    discrete, infrequent events (e.g., "puzzle solved") where every
    occurrence must be handled individually.
  - `onTrigger?: (...args: any[]) => void` – Called whenever the event fires
    (fires alongside `handler`, useful when composing multiple listeners).
  - `onSubscribe?: () => void` – Called once the listener is attached.
  - `onUnsubscribe?: () => void` – Called when the listener is torn down
    (unmount, `entityId`/`event` change, or explicit cleanup).
- **Returns:** `{ isListening: boolean, lastEvent: any }`.
- **State:** `isListening`, `lastEvent`.
- **Events:** `onTrigger`, `onSubscribe`, `onUnsubscribe`.
- **PlayCanvas Integration:** Subscribes to `entity.fire(event)` and
  `entity.on(event)`; auto‑cleans.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Auto‑cleans on unmount; debounces; supports once.

---

### Hook: useSync

- **Purpose:** Bidirectional state sync with PlayCanvas with conflict
  resolution.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `entityId: string` – Entity ID.
  - `prop: string` – Property name. Not validated against the target
    script/entity's actual property set — an unresolved `prop` reads as
    `undefined` and writes are dropped silently rather than erroring.
  - `localValue: any` – Local value.
  - `syncDirection?: 'both' | 'toPC' | 'fromPC'` (default: `'both'`).
    `'toPC'` only pushes local changes to PlayCanvas (ignores remote
    updates); `'fromPC'` only pulls PlayCanvas changes into `value` (local
    `setValue` calls don't write back); `'both'` does both directions and is
    the only mode where `hasConflict`/`conflictStrategy` are meaningful,
    since one-directional sync can't conflict with itself.
  - `debounce?: number` – Write debounce in ms (default: `100`). Same
    trade-off as `useScript`'s `debounce`: raise it for high-frequency local
    changes, lower it (toward `0`) only when near-real-time PlayCanvas
    reflection is required.
  - `conflictStrategy?: 'local' | 'remote' | 'merge'` (default: `'local'`).
  - `onSync?: (value: any) => void` – Called after a write successfully
    syncs to PlayCanvas.
  - `onConflict?: (local: any, remote: any) => void` – Called when
    `syncDirection="both"` detects a conflicting simultaneous local/remote
    change, before `conflictStrategy` resolves it.
  - `onChange?: (value: any) => void` – Called whenever `value` changes, from
    either side.
- **Returns:**
  `{ value: any, setValue: (v: any) => void, isLocal: boolean, isRemote: boolean, hasConflict: boolean }`.
- **State:** `value`, `isLocal`, `isRemote`, `hasConflict`.
- **Events:** `onSync`, `onConflict`, `onChange`.
- **PlayCanvas Integration:** Two‑way binding via `useEntity` + `useScript`;
  handles conflicts. Merge strategy: combines local and remote values,
  preferring remote for new keys and local for existing keys.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Handles conflict resolution with user‑defined strategy;
  debounces writes.

---

### Hook: useTransition

- **Purpose:** Hook for scene transitions with progress.
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `target: string` – Target scene name. Not validated against the
    project's registered scenes at call time — an unresolved `target` causes
    `start()`'s underlying `pcScene.loadScene(target)` call to reject, which
    surfaces through `onError`/the returned `error` state rather than
    failing earlier.
  - `params?: any` – Transition parameters.
  - `fadeDuration?: number` – Fade duration in ms (default: `500`). Only
    applies to `variant="fade"`/`"zoom"` (both are duration-based visual
    transitions); `'cut'` is instant regardless of this value, and `'slide'`
    uses its own internal timing tuned to distance rather than a flat
    duration. `300`–`800`ms is a reasonable range for `fade`/`zoom`; much
    higher reads as sluggish for scene transitions.
  - `variant?: 'fade' | 'cut' | 'slide' | 'zoom'` (default: `'fade'`).
  - `onStart?: () => void`.
  - `onProgress?: (progress: number) => void` – Called with loading progress
    (`0`–`1`) as the target scene's assets load.
  - `onComplete?: () => void`.
  - `onError?: (err: any) => void`.
- **Returns:**
  `{ isLoading: boolean, progress: number, isComplete: boolean, error: Error | null, start: () => void }`.
- **State:** `isLoading`, `progress`, `isComplete`, `error`.
- **Events:** `onStart`, `onProgress`, `onComplete`, `onError`.
- **Variants:** `fade`, `cut`, `slide`, `zoom` (via `variant` prop).
- **PlayCanvas Integration:** Triggers `pcScene.loadScene(target)`; updates
  progress via `useLoadingProgress`.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useCallback`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Shows `LoadScreen` during transition; passes params to new
  scene.

---

### Hook: useInput

- **Purpose:** Hook for PlayCanvas input handling (keyboard, mouse, touch,
  gamepad).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `inputType: 'keyboard' | 'mouse' | 'touch' | 'gamepad'` – Input type;
    determines which of the following fields are relevant: `'keyboard'` uses
    `key`; `'mouse'`/`'gamepad'` (buttons) use `button`; `'gamepad'` (analog)
    uses `axis`/`gamepadIndex`; `'touch'` uses none of them (touch state is
    read positionally, see `value`). Irrelevant fields for a given
    `inputType` are simply ignored.
  - `action?: string` – Action name.
  - `deadzone?: number` – Analog deadzone (default: `0.1`), applies only to
    `axis`-based (`'gamepad'`) input. Values below this threshold are
    clamped to `0` to absorb stick drift; `0.1`–`0.2` is typical for most
    gamepads, higher (`0.25`+) for controllers with known drift, lower
    (`0.05`) only for high-precision analog use cases like fine aiming.
  - `key?: string` – Keyboard key.
  - `button?: number` – Mouse button or gamepad button index.
  - `axis?: number` – Gamepad axis index.
  - `gamepadIndex?: number` – Gamepad index (default: `0`).
  - `onPress?: () => void` – Called when the input transitions to pressed
    (digital: key/button down; analog: crosses above `deadzone`).
  - `onRelease?: () => void` – Called when the input transitions to released.
  - `onMove?: (value: number) => void` – Called on analog value change
    (gamepad axis).
  - `onChange?: (value: number | null) => void` – Called on any change to
    `value`, digital or analog.
- **Returns:**
  `{ isPressed: boolean, value: number | null, isSupported: boolean }`.
- **State:** `isPressed`, `value`, `isSupported`.
- **Events:** `onPress`, `onRelease`, `onMove`, `onChange`.
- **PlayCanvas Integration:** Maps to `pc.Keyboard`, `pc.Mouse`,
  `pc.TouchDevice`, `pc.Gamepad`; subscribes.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Supports keyboard keys, mouse buttons, touch, gamepad axes;
  deadzone for analog.

---

### Hook: useNetwork

- **Purpose:** Hook for PlayCanvas network/multiplayer (for multiplayer escape
  games).
- **DevMode/PlayMode:** Both
- **Props/API:**
  - `networkId: string` – Network session ID. Not validated against an
    active session at call time — connecting with an unknown/expired
    `networkId` fails asynchronously (surfaced via `onError`/`isConnected`
    staying `false`) rather than being rejected synchronously.
  - `channel: string` – Communication channel.
  - `reconnect?: boolean` – Auto-reconnect (default: `true`). When enabled,
    reconnection uses backoff retries on disconnect (`onDisconnect` still
    fires immediately; `onReconnect` fires once a retry succeeds) — disable
    it only when the consumer wants to handle reconnection manually (e.g., to
    show a custom "connection lost" UI and let the player choose to retry)
    rather than reconnecting silently in the background.
  - `onMessage?: (msg: any) => void`.
  - `onPlayerJoin?: (player: any) => void`.
  - `onPlayerLeave?: (player: any) => void`.
  - `onDisconnect?: () => void`.
  - `onReconnect?: () => void`.
  - `onError?: (error: Error) => void`.
- **Returns:**
  `{ isConnected: boolean, isHost: boolean, players: any[], latency: number, send: (data: any) => void }`.
- **State:** `isConnected`, `isHost`, `players`, `latency`.
- **Events:** `onMessage`, `onPlayerJoin`, `onPlayerLeave`, `onDisconnect`,
  `onReconnect`, `onError`.
- **PlayCanvas Integration:** Uses `pc.WebSocket` or custom network layer;
  real‑time updates.
- **Tailwind/UI Behavior:** N/A.
- **Dependencies:** `react`, `useState`, `useEffect`, `useRef`.
- **Accessibility:** N/A.
- **Rebuild Notes:** Only for multiplayer; supports reconnection.

---

## Hooks (Documentation)

This section lists internal hooks used across the component library. They are
implementation details but are referenced in component APIs.

### Hook: useTimer

- **Purpose:** Provides a timer with start, pause, resume, and reset, using
  `requestAnimationFrame`.
- **Props/API:**
  - `initialTime: number` – Starting time in seconds.
  - `isCountdown?: boolean` – If true, counts down; otherwise counts up.
  - `autoStart?: boolean` – Start automatically on mount.
  - `onTick?: (time: number) => void` – Called every frame with current time.
  - `onFinish?: () => void` – Called when countdown reaches zero.
  - `timeDilation?: number` – Speed multiplier (default `1`).
- **Returns:**
  `{ time: number, isRunning: boolean, isPaused: boolean, isFinished: boolean, progress: number, start: () => void, pause: () => void, resume: () => void, reset: () => void }`
- **Dependencies:** `react`, `requestAnimationFrame` (falls back to
  `setInterval` in background).

### Hook: useTimerSync

- **Purpose:** Bidirectional sync of `Timer`'s running time with PlayCanvas
  (e.g., pausing/resuming from a scene-side trigger).
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas timer entity.
- **Returns:**
  `{ time: number, isRunning: boolean, setTime: (t: number) => void, start: () => void, pause: () => void }`

### Hook: useStopwatch

- **Purpose:** Extends `useTimer` with lap functionality.
- **Props/API:** Same as `useTimer` plus:
  - `maxLaps?: number` – Maximum number of laps to store.
  - `onLap?: (lapTime: number) => void` – Called when a lap is recorded.
- **Returns:** Same as `useTimer` plus:
  `{ laps: number[], isLapRunning: boolean, recordLap: () => void, resetLaps: () => void }`

### Hook: useStopwatchSync

- **Purpose:** Bidirectional sync of `Stopwatch`'s elapsed time and laps with
  PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas timer entity.
- **Returns:**
  `{ elapsed: number, laps: number[], setElapsed: (t: number) => void }`

### Hook: useToast

- **Purpose:** Manages a stack of toast notifications with auto-dismiss.
- **Props/API:**
  - `defaultDuration?: number` – Default duration for toasts (ms).
  - `maxToasts?: number` – Maximum concurrent toasts.
- **Returns:**
  `{ toasts: Toast[], addToast: (toast: ToastInput) => void, removeToast: (id: string) => void, clearAll: () => void }`
- **Dependencies:** `react`, `useState`, `useEffect`.

### Hook: useAnnounce

- **Purpose:** Sends screen reader announcements via `aria-live` region.
- **Props/API:**
  - `debounce?: number` – Debounce time between announcements (ms).
- **Returns:**
  `{ announce: (message: string, priority?: 'polite' | 'assertive') => void, clear: () => void }`
- **Dependencies:** `react`, `useRef`, `useEffect`.

### Hook: useScrollToBottom

- **Purpose:** Automatically scroll a container to the bottom when its content
  changes.
- **Props/API:**
  - `containerRef: React.RefObject<HTMLElement>` – Reference to the scroll
    container.
  - `dependencies?: any[]` – Array of values that trigger a scroll when changed.
  - `smooth?: boolean` – Use smooth scrolling (default: `true`).
- **Returns:** `{ scrollToBottom: () => void }`
- **Dependencies:** `react`, `useEffect`, `useRef`.

### Hook: useAnimation

- **Purpose:** Provides a value that animates between two numbers over a
  duration.
- **Props/API:**
  - `from: number` – Starting value.
  - `to: number` – Ending value.
  - `duration: number` – Animation duration in ms.
  - `easing?: (t: number) => number` – Easing function (default: linear).
- **Returns:** `{ value: number, isAnimating: boolean }`
- **Dependencies:** `react`, `useState`, `useEffect`, `requestAnimationFrame`.

### Hook: useLoadingProgress

- **Purpose:** Tracks asset loading progress from PlayCanvas.
- **Props/API:**
  - `pcApp: any` – PlayCanvas application instance.
  - `manifest?: any` – Asset manifest.
- **Returns:** `{ progress: number, isComplete: boolean, error: Error | null }`
- **Dependencies:** `react`, `useState`, `useEffect`.

### Hook: usePuzzleBridge

- **Purpose:** Synchronises puzzle state with PlayCanvas.
- **Props/API:**
  - `puzzleId: string` – Puzzle identifier.
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ state: any, setState: (s: any) => void, reset: () => void }`

### Hook: usePuzzleSubmit

- **Purpose:** Submit a `CodePuzzle` attempt to PlayCanvas and receive
  validation.
- **Props/API:**
  - `pcEntity?: string` – Puzzle entity.
- **Returns:** `{ submit: (code: string) => void, isValid: boolean | null }`

### Hook: useSettingSync

- **Purpose:** Sync a single setting value with PlayCanvas.
- **Props/API:**
  - `key: string` – Setting key.
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `defaultValue?: any` – Default if not present.
- **Returns:** `{ value: any, setValue: (v: any) => void }`

### Hook: useSettingsSync

- **Purpose:** Sync the entire `Settings` categories/values blob with
  PlayCanvas, as distinct from `useSettingSync`'s single-key sync used by
  `Toggle`/`Slider`/`Select`.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:**
  `{ settings: Record<string, any>, setSetting: (key: string, value: any) => void, resetAll: () => void }`

### Hook: useKeybindSync

- **Purpose:** Sync keybinding configuration with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
  - `defaultBindings?: KeyBinding[]` – Default bindings.
- **Returns:**
  `{ bindings: KeyBinding[], setBindings: (b: KeyBinding[]) => void, reset: () => void }`

### Hook: useObjectiveSync

- **Purpose:** Sync objective list with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:**
  `{ objectives: Objective[], updateObjective: (id: string, data: any) => void }`

### Hook: useObjectiveProgress

- **Purpose:** Track and update progress of a single objective.
- **Props/API:**
  - `objectiveId: string` – Objective ID.
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:**
  `{ progress: number, setProgress: (p: number) => void, complete: () => void }`

### Hook: useDialogueSync

- **Purpose:** Fetch dialogue lines from PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:**
  `{ lines: DialogueLine[], currentLine: number, nextLine: () => void }`

### Hook: useDialogueChoice

- **Purpose:** Send a chosen dialogue option to PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ selectChoice: (choice: string) => void }`

### Hook: useDialogueHistory

- **Purpose:** Read the recorded dialogue log for the `History` component.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas history entity.
  - `maxEntries?: number` – Maximum entries to retain.
- **Returns:**
  `{ entries: { text: string, timestamp: Date, speaker?: string }[], clear: () => void }`

### Hook: useInventorySync

- **Purpose:** Synchronise inventory items with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ items: Item[], setItems: (items: Item[]) => void }`

### Hook: useSlotSync

- **Purpose:** Synchronise a single inventory slot with PlayCanvas.
- **Props/API:**
  - `slotIndex: number` – Slot index.
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ item: Item | null, setItem: (item: Item | null) => void }`

### Hook: useHealthSync

- **Purpose:** Bidirectional sync for health value.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ health: number, setHealth: (h: number) => void }`

### Hook: useEnergySync

- **Purpose:** Bidirectional sync for energy value.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ energy: number, setEnergy: (e: number) => void }`

### Hook: useLoadingSync

- **Purpose:** Sync loading progress with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ progress: number, setProgress: (p: number) => void }`

### Hook: useProgressSync

- **Purpose:** Generic progress sync.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:** `{ value: number, setValue: (v: number) => void }`

### Hook: useTouchBridge

- **Purpose:** Send touch input events to PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – PlayCanvas entity ID.
- **Returns:**
  `{ sendTouchStart: (id: string, x: number, y: number) => void, sendTouchMove: (id: string, x: number, y: number) => void, sendTouchEnd: (id: string) => void }`

### Hook: useRaycaster

- **Purpose:** Perform raycasts from the camera through the crosshair.
- **Props/API:**
  - `pcCamera: any` – PlayCanvas camera.
  - `throttleRate?: number` – Throttle in ms.
  - `mask?: number` – Collision mask.
- **Returns:** `{ target: any, intersect: () => void }`

### Hook: usePlayerRotation

- **Purpose:** Get the player's current heading/rotation.
- **Props/API:**
  - `pcEntity?: string` – Player entity ID.
- **Returns:** `{ heading: number, rotation: any }`

### Hook: useCameraProjection

- **Purpose:** Project world position to screen coordinates.
- **Props/API:**
  - `pcCamera: any` – PlayCanvas camera.
- **Returns:** `{ project: (worldPos: any) => { x: number, y: number } }`

### Hook: useTextSync

- **Purpose:** Sync text content to PlayCanvas TextComponent.
- **Props/API:**
  - `pcEntity?: string` – Entity with TextComponent.
- **Returns:** `{ setText: (text: string) => void }`

### Hook: useIconSync

- **Purpose:** Sync icon name/color to PlayCanvas IconComponent.
- **Props/API:**
  - `pcEntity?: string` – Entity with IconComponent.
- **Returns:** `{ setIcon: (name: string, color?: string) => void }`

### Hook: useTextureSync

- **Purpose:** Set a PlayCanvas material/texture property from an `Image`'s
  `src`.
- **Props/API:**
  - `pcEntity?: string` – Entity with a texture property.
- **Returns:** `{ setTexture: (src: string) => void, isLoaded: boolean }`

### Hook: useAction

- **Purpose:** Trigger a PlayCanvas script method.
- **Props/API:**
  - `pcEntity: string` – Entity ID.
  - `method: string` – Method name.
- **Returns:** `{ execute: (...args: any[]) => void }`

### Hook: useItemData

- **Purpose:** Fetch item details from PlayCanvas.
- **Props/API:**
  - `itemId: string` – Item ID.
  - `pcEntity?: string` – Item entity.
- **Returns:** `{ item: Item | null, loading: boolean }`

### Hook: useHoverData

- **Purpose:** Fetch preview data for hover cards.
- **Props/API:**
  - `pcEntity?: string` – Hover entity.
- **Returns:** `{ data: any, loading: boolean }`

### Hook: useDevAPI

- **Purpose:** Interact with PlayCanvas engine for dev tools.
- **Props/API:**
  - `pcApp: any` – PlayCanvas application.
- **Returns:** `{ inspect: (entity: any) => void, getScene: () => any, ... }`

### Hook: useSceneInspector

- **Purpose:** Get the entity hierarchy for the scene.
- **Props/API:**
  - `pcScene: any` – PlayCanvas scene.
- **Returns:** `{ entities: any[], refresh: () => void }`

### Hook: usePropertyEditor

- **Purpose:** Read/write entity properties.
- **Props/API:**
  - `entity: any` – PlayCanvas entity.
- **Returns:**
  `{ get: (key: string) => any, set: (key: string, value: any) => void }`

### Hook: useEditorBridge

- **Purpose:** Bridge between editor UI and PlayCanvas manipulation.
- **Props/API:**
  - `pcScene: any` – PlayCanvas scene.
- **Returns:**
  `{ place: (prefab: Prefab, position: any) => void, delete: (entity: any) => void, transform: (entity: any, transform: any) => void }`

### Hook: usePrefabLibrary

- **Purpose:** Fetch available prefabs from PlayCanvas.
- **Props/API:**
  - `pcApp: any` – PlayCanvas application.
- **Returns:** `{ prefabs: Prefab[], categories: string[], load: () => void }`

### Hook: useConsoleBridge

- **Purpose:** Intercept PlayCanvas and browser console logs.
- **Props/API:**
  - `enabled?: boolean` – Whether to intercept.
- **Returns:**
  `{ logs: any[], clear: () => void, filter: (level: string) => void }`

### Hook: useErrorReporter

- **Purpose:** Report errors to PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Error reporting entity.
- **Returns:** `{ report: (error: Error) => void }`

### Hook: useConfirm

- **Purpose:** Trigger a confirmation dialog from PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Confirm entity.
- **Returns:**
  `{ confirm: (title: string, message: string) => Promise<boolean> }`

### Hook: useModalSync

- **Purpose:** Sync modal visibility with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Modal entity.
- **Returns:** `{ isOpen: boolean, open: () => void, close: () => void }`

### Hook: useNotificationListener

- **Purpose:** Listen for notifications from PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Notification entity.
- **Returns:** `{ addListener: (callback: (msg: string) => void) => void }`

### Hook: useA11ySync

- **Purpose:** Sync accessibility preferences with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – A11y entity.
- **Returns:** `{ preferences: any, update: (key: string, value: any) => void }`

### Hook: useViewportSync

- **Purpose:** Sync viewport dimensions with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Viewport entity.
- **Returns:** `{ width: number, height: number }`

### Hook: useIsTouchDevice

- **Purpose:** Detect if the current device supports touch.
- **Returns:** `{ isTouch: boolean }`

### Hook: useKeyboardListener

- **Purpose:** Listen for global keyboard events.
- **Props/API:**
  - `key: string` – Key to listen for.
  - `callback: (e: KeyboardEvent) => void` – Handler.
  - `options?: { capture?: boolean, once?: boolean }`
- **Returns:** `{ stop: () => void }`

### Hook: useTypewriter

- **Purpose:** Simulate typewriter effect.
- **Props/API:**
  - `text: string` – Full text to display.
  - `speed?: number` – Characters per second.
  - `autoStart?: boolean`
- **Returns:**
  `{ displayed: string, isComplete: boolean, start: () => void, skip: () => void }`

### Hook: useSequenceSubmit

- **Purpose:** Submit a sequence attempt to PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Puzzle entity.
- **Returns:** `{ submit: (sequence: any[]) => void }`

### Hook: useSliderSync

- **Purpose:** Sync sliding puzzle state with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Puzzle entity.
- **Returns:** `{ tiles: number[], move: (from: number, to: number) => void }`

### Hook: useObjectPuzzleSync

- **Purpose:** Sync object puzzle state with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Puzzle entity.
- **Returns:**
  `{ placed: Record<string, string>, place: (objectId: string, slotId: string) => void, pick: (objectId: string) => void }`

### Hook: useTooltipSync

- **Purpose:** Fetch tooltip content from PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Tooltip entity.
- **Returns:** `{ content: ReactNode, loading: boolean }`

### Hook: useContextMenu

- **Purpose:** Send context menu selection to PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Context menu entity.
- **Returns:** `{ select: (id: string) => void }`

### Hook: useSkeleton

- **Purpose:** Compute skeleton dimensions responsively.
- **Props/API:**
  - `width?: string | number` – Desired width.
  - `height?: string | number` – Desired height.
- **Returns:** `{ style: CSSProperties }`

### Hook: useViewport

- **Purpose:** Get current viewport size and breakpoint.
- **Returns:** `{ width: number, height: number, breakpoint: string }`

### Hook: useBadgeSync

- **Purpose:** Read a numeric/status value from PlayCanvas for `Badge`.
- **Props/API:**
  - `pcEntity?: string` – Badge-source entity.
- **Returns:** `{ content: string | number | null }`

### Hook: useAvatarSync

- **Purpose:** Read a live portrait/status for `Avatar` from PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Avatar-source entity.
- **Returns:**
  `{ src: string | null, status: 'online' | 'offline' | 'away' | 'busy' | 'none' }`

### Hook: useAccordionSync

- **Purpose:** Scene-driven expand/collapse sync for `Accordion`.
- **Props/API:**
  - `pcEntity?: string` – Accordion entity.
- **Returns:**
  `{ expanded: string[], setExpanded: (ids: string[]) => void }`

### Hook: useMinimapSync

- **Purpose:** Render a top-down `pcCamera` view to a texture and project
  marker world positions for `Minimap`.
- **Props/API:**
  - `pcCamera?: string` – Top-down camera entity.
  - `pcEntity?: string` – Player entity.
- **Returns:**
  `{ textureUrl: string | null, projectMarker: (worldPos: any) => { x: number, y: number } }`

### Hook: useAmmoSync

- **Purpose:** Bidirectional sync for weapon ammo state.
- **Props/API:**
  - `pcEntity?: string` – Weapon entity.
- **Returns:**
  `{ current: number, reserve: number, isReloading: boolean, reload: () => void }`

### Hook: useInteractionPromptSync

- **Purpose:** Read the currently interactable target/prompt data from
  PlayCanvas for `InteractionPrompt`.
- **Props/API:**
  - `pcEntity?: string` – Prompt-source entity.
- **Returns:**
  `{ target: { entity: any, label: string, keyHint?: string } | null }`

### Hook: useStatusEffectSync

- **Purpose:** Sync active buff/debuff effects with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Status-effect entity.
- **Returns:**
  `{ effects: StatusEffect[], removeEffect: (id: string) => void }`

### Hook: useEquipmentSync

- **Purpose:** Sync equipped items per slot with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Equipment entity.
- **Returns:**
  `{ equipped: Record<string, Item | null>, equip: (slotId: string, item: Item) => void, unequip: (slotId: string) => void }`

### Hook: useCraftingSync

- **Purpose:** Sync recipe list and craft actions with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Crafting entity.
- **Returns:**
  `{ recipes: Recipe[], craft: (recipeId: string) => Promise<void> }`

### Hook: useLootSync

- **Purpose:** Sync a loot/storage container's contents with PlayCanvas.
- **Props/API:**
  - `pcEntity?: string` – Container entity.
- **Returns:**
  `{ items: Item[], take: (itemId: string, quantity?: number) => void, deposit: (itemId: string, quantity?: number) => void }`

### Hook: useStepperSync

- **Purpose:** Sync the active step of a `Stepper` with PlayCanvas (e.g., a
  scene-gated tutorial sequence).
- **Props/API:**
  - `pcEntity?: string` – Stepper entity.
- **Returns:**
  `{ activeStep: string | null, setStep: (id: string) => void }`


### Hook: useMenu (from react-aria)

- **Purpose:** Provides accessibility for menus (used by NavMenu).
- **Note:** This is a react-aria hook; documented here for reference.

### Hook: useButton (from react-aria)

- **Purpose:** Provides accessibility for buttons (used by Button).
- **Note:** This is a react-aria hook; documented here for reference.
