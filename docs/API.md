# API

The library's internal API surface is its hook set (`COMPONENTS.md`, unlabeled "public PlayCanvas-integration hooks" run immediately after `PCProvider`, plus the `## Hooks (Documentation)` section, which opens with: "This section lists internal hooks used across the component library. They are implementation details but are referenced in component APIs."). 76 hooks total, plus 2 third-party react-aria hooks documented for reference only (`useMenu`, `useButton`). No REST/GraphQL/RPC API exists anywhere in `COMPONENTS.md` — "API" in this repository means the hook contracts below plus each component's own Props/API table in `docs/COMPONENTS.md`.

## PlayCanvas-integration hooks (foundational, used directly or indirectly by every domain-sync hook)

- **`useEntity({entityId, sync?, debounce?, onUpdate?, onDestroy?, onEnableChange?})` → `{entity, transform:{position,rotation,scale}, isEnabled, updateTransform}`.** `entityId` unvalidated; unresolved → `entity` null/undefined, re-resolves automatically once the entity appears. `sync` defaults `false` (per-frame transform subscription has real cost multiplied across many entities — enable only when the transform must stay live-mirrored in React state).
- **`useScript({entityId, stateKey, initialValue?, debounce?, onChange?, onSync?, onError?})` → `{value, setValue, isSynced, isLoading}`.** `stateKey` unvalidated (resolves to `initialValue`/`undefined` if missing). `debounce` default `100`ms (raise to 250–500ms for frequent-but-non-realtime state; lower toward `0` only when every intermediate value must reach PlayCanvas).
- **`useEvent({entityId, event, handler, once?, debounce?, onTrigger?, onSubscribe?, onUnsubscribe?})` → `{isListening, lastEvent}`.** Subscribes to `entity.fire(event)`/`entity.on(event)`; auto-cleans on unmount. `event` unvalidated — an event name that never fires is a silent no-op, not an error. `debounce` default `0` (no debounce; raise only for rapid-burst events like per-frame/per-collision).
- **`useSync({entityId, prop, localValue, syncDirection?, debounce?, conflictStrategy?, onSync?, onConflict?, onChange?})` → `{value, setValue, isLocal, isRemote, hasConflict}`.** `syncDirection` default `'both'` (`'toPC'` push-only ignores remote; `'fromPC'` pull-only, local `setValue` doesn't write back). `debounce` default `100`ms. `conflictStrategy` default `'local'`; `'merge'` combines local+remote, preferring **remote for new keys, local for existing keys** — only meaningful when `syncDirection: 'both'`. Built from `useEntity` + `useScript`.
- **`useTransition({target, params?, fadeDuration?, variant?, onStart?, onProgress?, onComplete?, onError?})` → `{isLoading, progress, isComplete, error, start}`.** Triggers `pcScene.loadScene(target)`. `target` unvalidated at call time — an unresolved target rejects at `start()`, surfaced via `onError`/`error`, not before. `fadeDuration` default `500`ms, applies only to `variant: 'fade'|'zoom'` (`'cut'` is instant; `'slide'` uses its own internal timing).
- **`useInput({inputType, action?, deadzone?, key?, button?, axis?, gamepadIndex?, onPress?, onRelease?, onMove?, onChange?})` → `{isPressed, value, isSupported}`.** Maps to `pc.Keyboard`/`pc.Mouse`/`pc.TouchDevice`/`pc.Gamepad`. `deadzone` default `0.1` (analog axes only; `0.25`+ for drift-prone controllers, `0.05` only for high-precision aiming). `gamepadIndex` default `0`.
- **`useNetwork({networkId, channel, reconnect?, onMessage?, onPlayerJoin?, onPlayerLeave?, onDisconnect?, onReconnect?, onError?})` → `{isConnected, isHost, players, latency, send}`.** Multiplayer only, via `pc.WebSocket` or a custom network layer. `networkId` unvalidated — an unknown/expired ID fails asynchronously (`onError`/`isConnected` stays `false`), not synchronously. `reconnect` default `true` (backoff retries; `onDisconnect` fires immediately regardless, `onReconnect` fires once a retry succeeds). See `docs/SECURITY.md` for payload-trust rules.

## Domain sync hooks

One `use<Domain>Sync` hook per state domain, each taking `{pcEntity?, ...}` and returning that domain's read/write pair, used by exactly the component(s) named:

| Hook | Returns | Used by |
|---|---|---|
| `useTimerSync` | `{time, isRunning, setTime, start, pause}` | `Timer` |
| `useStopwatchSync` | `{elapsed, laps, setElapsed}` | `Stopwatch` |
| `useSettingSync({key, pcEntity?, defaultValue?})` | `{value, setValue}` | `Toggle`, `Slider`, `Select`, `RadioGroup`, `ColorPicker`, `AccessibilitySlider`, `Rating` (single-key sync) |
| `useSettingsSync` | `{settings, setSetting, resetAll}` | `Settings` (whole-blob sync, distinct from `useSettingSync`) |
| `useKeybindSync` | `{bindings, setBindings, reset}` | `Keybinds` |
| `useObjectiveSync` | `{objectives, updateObjective}` | `Objectives` |
| `useObjectiveProgress({objectiveId, pcEntity?})` | `{progress, setProgress, complete}` | `Objective` (single-objective) |
| `useDialogueSync` | `{lines: DialogueLine[], currentLine, nextLine}` | `Dialogue`, `Subtitle` (without `useDialogueChoice`) |
| `useDialogueChoice` | `{selectChoice}` | `Dialogue` |
| `useDialogueHistory({pcEntity?, maxEntries?})` | `{entries, clear}` | `History` |
| `useInventorySync` | `{items, setItems}` | `Inventory` |
| `useSlotSync({slotIndex, pcEntity?})` | `{item, setItem}` | `ItemSlot` (single slot) |
| `useHealthSync` | `{health, setHealth}` | `Health` |
| `useEnergySync` | `{energy, setEnergy}` | `Energy` |
| `useLoadingSync` | `{progress, setProgress}` | `Spinner`, `LoadingDots` |
| `useProgressSync` | `{value, setValue}` | `Progress` |
| `useTextSync` | `{setText}` | `Text` |
| `useIconSync` | `{setIcon}` | `Icon` |
| `useTextureSync` | `{setTexture, isLoaded}` | `Image` (sets PlayCanvas material/texture from `src`) |
| `useBadgeSync` | `{content}` | `Badge` |
| `useAvatarSync` | `{src, status}` | `Avatar` |
| `useAccordionSync` | `{expanded, setExpanded}` | `Accordion` |
| `useMinimapSync({pcCamera?, pcEntity?})` | `{textureUrl, projectMarker}` | `Minimap` |
| `useAmmoSync` | `{current, reserve, isReloading, reload}` | `AmmoIndicator` |
| `useInteractionPromptSync` | `{target}` | `InteractionPrompt` |
| `useStatusEffectSync` | `{effects, removeEffect}` | `StatusEffects` |
| `useEquipmentSync` | `{equipped, equip, unequip}` | `EquipmentSlots` |
| `useCraftingSync` | `{recipes, craft}` (craft returns `Promise<void>`) | `CraftingPanel` |
| `useLootSync` | `{items, take, deposit}` | `LootContainer` |
| `useStepperSync` | `{activeStep, setStep}` | `Stepper` (scene-gated tutorial sequences) |
| `useModalSync` | `{isOpen, open, close}` | `Modal`, `Popover`, `Accordion` (scene-driven expand/collapse) |
| `useA11ySync` | `{preferences, update}` | `A11y` |
| `useViewportSync` | `{width, height}` | `Responsive`, `OrientationLock` |
| `useTooltipSync` | `{content, loading}` | `Tooltip` |
| `useObjectPuzzleSync` | `{placed, place, pick}` | `ObjectPuzzle` |
| `useSliderSync` | `{tiles, move}` | `SliderPuzzle` |
| `useSequenceSubmit` | `{submit}` | `SequencePuzzle` only (see naming inconsistency below) |
| `usePuzzleSubmit` | `{submit, isValid}` | `CodePuzzle`, `MathPuzzle`, `WordPuzzle`, `MemoryMatch`, `CombinationLock`, `PatternLock` |
| `usePuzzleBridge({puzzleId, pcEntity?})` | `{state, setState, reset}` | `Puzzle` |
| `useTouchBridge` | `{sendTouchStart, sendTouchMove, sendTouchEnd}` | `Touch`, `Joystick` |
| `useNotificationListener` | `{addListener}` | `Toast`, `AlertBanner` |
| `useErrorReporter` | `{report}` | `ErrorBoundary`, `ErrorMsg` |
| `useConfirm` | `{confirm(title, message): Promise<boolean>}` | `Confirm` (scene-triggered confirmation) |

**Naming inconsistency, verified and worth preserving as documentation rather than silently "fixing" without a spec change:** every puzzle type except `SequencePuzzle` shares one `usePuzzleSubmit` hook; `SequencePuzzle` alone has its own `useSequenceSubmit`.

## Rendering/utility hooks

- **`useRaycaster({pcCamera, throttleRate?, mask?})` → `{target, intersect}`.** Used by `Crosshair`.
- **`usePlayerRotation({pcEntity?})` → `{heading, rotation}`.** Used by `Compass`.
- **`useCameraProjection({pcCamera})` → `{project(worldPos): {x,y}}`.** Used by `HUD`, `DamageNumbers`, `Minimap`.
- **`useAction({pcEntity, method})` → `{execute(...args)}`.** `pcEntity` is required here (unlike most sync hooks' optional `pcEntity?`). Used by `Button.pcAction`, `Confetti`.
- **`useItemData({itemId, pcEntity?})` → `{item, loading}`.** Used by `ItemTip`, `ItemComparison`.
- **`useHoverData({pcEntity?})` → `{data, loading}`.** Used by `HoverCard`.
- **`useAnimation({from, to, duration, easing?})` → `{value, isAnimating}`.** requestAnimationFrame-driven tweening.
- **`useTypewriter({text, speed?, autoStart?})` → `{displayed, isComplete, start, skip}`.** Used by `Dialogue`.
- **`useScrollToBottom({containerRef, dependencies?, smooth?})` → `{scrollToBottom}`.** Used by `ScrollArea`, `History`.
- **`useSkeleton({width?, height?})` → `{style}`.** Used by `Skeleton`.
- **`useViewport()` → `{width, height, breakpoint}`.** Used by `Responsive`.
- **`useIsTouchDevice()` → `{isTouch}`.** Used by `Touch`.
- **`useKeyboardListener({key, callback, options?})` → `{stop}`.** Used by `Keybinds`.
- **`useContextMenu({pcEntity?})` → `{select}`.** Shared by `ContextMenu` and `DropdownMenu`.
- **`useTimer({initialTime, isCountdown?, autoStart?, onTick?, onFinish?, timeDilation?})` → `{time, isRunning, isPaused, isFinished, progress, start, pause, resume, reset}`.** `timeDilation` default `1`. Used internally by `Timer`; note `Timer`'s own public `mode` prop (`'countdown'|'countup'`, default `'countup'`) replaced a removed `isCountdown` boolean, but the internal `useTimer` hook retains its own separate, non-deprecated `isCountdown` option.
- **`useStopwatch`** — extends `useTimer`'s props with `{maxLaps?, onLap?}`, returns `useTimer`'s shape plus `{laps, isLapRunning, recordLap, resetLaps}`.
- **`useToast({defaultDuration?, maxToasts?})` → `{toasts, addToast, removeToast, clearAll}`.**
- **`useAnnounce({debounce?})` → `{announce(message, priority?), clear}`.** Used by `A11y`, `ScreenReader`, `LiveRegion`.
- **`useLoadingProgress({pcApp, manifest?})` → `{progress, isComplete, error}`.** Used by `LoadScreen`, `useTransition`.

## Dev-tooling hooks (DevMode only — see `docs/LOGGING.md`)

`useDevAPI({pcApp})` → `{inspect(entity), getScene(), ...}` (return shape explicitly incomplete in the source spec — do not assume additional members beyond `inspect`/`getScene` without updating `COMPONENTS.md` first); `useSceneInspector({pcScene})` → `{entities, refresh}`; `usePropertyEditor({entity})` → `{get(key), set(key, value)}` (shared by `Property` and `LightingControls`); `useEditorBridge({pcScene})` → `{place(prefab, position), delete(entity), transform(entity, transform)}`; `usePrefabLibrary({pcApp})` → `{prefabs, categories, load}`; `useConsoleBridge({enabled?})` → `{logs, clear, filter(level)}`.

## Third-party hooks (documented for reference only)

`useMenu` (react-aria) — accessibility for menus; used by `NavMenu`, `SidebarMenu`. `useButton` (react-aria) — accessibility for buttons; used by `Button`.

## Undocumented return shape

`DialogueLine` (the item type of `useDialogueSync`'s `lines` array) has no field-level shape declared anywhere in `COMPONENTS.md`. Treat it as opaque; do not invent fields for it in any downstream document or implementation without a spec update.
