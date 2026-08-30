# Configuration

Source: `Settings` category and related sync hooks in `COMPONENTS.md`. **No persistence mechanism (localStorage, backend, save-file) is described anywhere in the source document.** Every "sync"/"persistence" reference in `COMPONENTS.md` refers exclusively to PlayCanvas-side sync via a `pcEntity` binding and its matching hook — do not assume or invent any other persistence layer.

## Settings container

`Settings.categories: SettingsCategory[]` where `SettingsCategory = {id, label, settings: SettingDef[]}` and `SettingDef = {key, label, description?, type: 'toggle'|'slider'|'select'|'keybind', default, min?, max?, step?, options?: Array<{label, value}>, keybinding?: {defaultKey}}`. `type: 'keybind'` renders internally via the dedicated `Keybinds` component as a single-binding instance, seeded from `keybinding.defaultKey`. `isOpen: boolean`, `onClose(reason?: 'save'|'cancel'|'overlay'|'escape')`. `variant: 'sidebar'|'tabs'|'modal'` (default `'modal'`) — a formerly separate `'full-page'` variant has been removed in favor of `variant="modal"` combined with `Modal`'s own `variant="full-screen"` (passed through) for the equivalent effect. Uses `zustand` (see `docs/STATE-MANAGEMENT.md` for the SSR caveat).

## Sync model: single-key vs. whole-blob

Two distinct sync hooks exist for two distinct scopes, and they are not interchangeable:
- **`useSettingSync({key, pcEntity?, defaultValue?}) → {value, setValue}`** — syncs one setting value. Used by `Toggle`, `Slider`, `Select`, `RadioGroup`, `ColorPicker`, `AccessibilitySlider`, `Rating`. This is the canonical per-setting sync mechanism.
- **`useSettingsSync({pcEntity?}) → {settings, setSetting, resetAll}`** — syncs the entire settings-categories blob. Used only by the `Settings` container itself.

## Individual setting controls

- **`Toggle`** — boolean switch. `variant: 'switch'|'button-toggle'` (default `'switch'`); a formerly available `'checkbox'` variant has been removed in favor of the dedicated `Checkbox` component. Uses `@radix-ui/react-switch`.
- **`Slider`** — numeric value with optional inline input. `showInput?` (default `false`); `variant: 'horizontal'|'vertical'|'with-input'`; `onCommit?(value)` fires on mouse-up (distinct from live `onChange`); `marks?: number[]` for tick positions; `tooltip?` (default `true`) shows the current value on the thumb.
- **`Select`** — dropdown chooser. `value: string|number|null` — `null` means "no selection," explicitly distinct from `''` or `0`, which are valid selectable values in their own right. `variant: 'dropdown'|'button-group'` (default `'dropdown'`); a formerly available `'radio-group'` variant has been removed in favor of the dedicated `RadioGroup` primitive component (or `variant="button-group"` for a similar all-visible single-select presentation).
- **`ColorPicker`** (user-facing) — `value: string` (hex, or `rgba()` when `allowAlpha` is `true`); `format: 'hex'|'rgb'|'hsl'` (default `'hex'`); `variant: 'swatch'|'wheel'|'sliders'` (default `'swatch'`). Syncs via `useSettingSync` like other atomic settings. Distinct from `Property`'s internal `type: 'color'` field editor, which is a DevMode-only entity-property control, not a user-facing setting.
- **`AccessibilitySlider`** — a **separate component** from `Slider`, not merely a variant of it, specifically to force a `previewText`/`presetLabels`-first UX for accessibility-scale settings (text size, UI scale, contrast/motion intensity), where showing the live effect matters more than the raw numeric value. `presetLabels?: string[]` (one label per reachable step; when set, overrides `format` in favor of the matching label, surfaced via `aria-valuetext`). `previewText?` defaults `'The quick brown fox'`. `resettable?` (default `true`). Also syncs via `useSettingSync`.

## Keybinds

`bindings: KeyBinding[]` (`{action, key, label?, modifiers?: Array<'ctrl'|'shift'|'alt'|'meta'>}`). `defaultBindings?`. `variant: 'list'|'grid'|'compact'|'table'` (default `'list'`; `'table'` presents data-table rows with separate columns, better for scanning many bindings). Conflict detection is a resolve-callback pattern, not a boolean return: `onConflict?(action, key, existingAction, resolve: (choice: 'keep'|'overwrite') => void)` — `resolve('overwrite')` reassigns the key (clearing it from `existingAction`); `resolve('keep')` rejects the new binding. `allowModifiers?` (default `true`); `showConflicts?` (default `true`). Syncs via the dedicated `useKeybindSync` (a structured-array sync, distinct from `useSettingSync`'s scalar-value sync, because bindings are a list, not a single value).

## PCProvider (application-level configuration)

`PCProvider.config?: {assetPrefix?, scripts?: string[]}` — `assetPrefix` is prepended to relative asset URLs (for a CDN or non-root base path); `scripts` is a list of script URLs loaded into the PlayCanvas script registry, in order, before the app starts — guaranteeing any `pcAction`/`useScript` reference elsewhere in the tree is registered by the time `onReady` fires. `debug?` is a boolean flag; `onReady?(app)` receives the initialized app instance.

## Environment-driven configuration

`DevTools.enabled` defaults from `process.env.NODE_ENV !== 'production'` — the only environment-variable-driven default documented in `COMPONENTS.md`. See `docs/ENVIRONMENT.md` and `docs/ERROR-HANDLING.md` for its SSR/bundler caveat.
