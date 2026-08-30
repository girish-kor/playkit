# Logging

Source: the Debug/DevTools category and related hooks in `COMPONENTS.md`. All logging/inspection surfaces documented are **DevMode only** and, per explicit rebuild guidance stated for `DevTools` and `PerformanceMonitor`, must be excluded from production builds — this restriction is treated as applying to the whole Debug/DevTools category (`DevTools`, `Inspector`, `Property`, `Console`, `PerformanceMonitor`, `AssetViewer`) via their shared `DevMode only` flag.

## DevTools (root panel)

`enabled?` defaults `process.env.NODE_ENV !== 'production'` (see `docs/ERROR-HANDLING.md` for the SSR/bundler caveat on this default). `variant: 'compact' | 'full' | 'floating' | 'docked'` (default `'docked'`); `floatingPosition` defaults `'bottom-right'` at init but remains draggable afterward. `initialTab?` defaults `'console'`. `keyboardShortcut?` defaults backtick (`` ` ``). Composes `Modal`, `Tabs`, `Console`, `Input`, `Inspector`; uses `useDevAPI`. Console-patching and scene-polling interception are active only while the panel is fully **open**; closing it (not minimizing) detaches all listeners for zero ongoing per-frame cost — minimizing keeps it mounted and listening. `aria-hidden` when minimized; hidden entirely in production.

## Inspector

Entity-tree browser reading the live PlayCanvas scene hierarchy via `useSceneInspector({pcScene}) → {entities, refresh}`. `filter?: string` and `showHidden?` (default `false`) narrow the tree; `variant: 'tree' | 'flat'` (default `'tree'`; a formerly separate `'filtered'` variant has been removed in favor of the `filter` prop). Composes `TreeView` (for the hierarchy) and `Property` (for editing a selected entity's properties). `TreeView`'s own >1000-node virtualization threshold applies unchanged — `Inspector` adds no additional virtualization below that, so scenes with low-hundreds of entities (still under the threshold) see increased render cost; mitigate by collapsing deep hierarchies and using `filter`/`showHidden={false}`.

## Property

Generic entity-property editor via `usePropertyEditor({entity}) → {get(key), set(key, value)}`. `properties: PropertyDef[]` (`{key, label, type: 'string'|'number'|'boolean'|'color'|'vector', options?, min?, max?, step?}`); `type: 'vector'` renders one numeric input per present component of a `{x, y, z?, w?}` runtime value. `variant: 'form' | 'grid' | 'compact'` (default `'form'`). `onChange(key, value, property)` includes the full `PropertyDef`; `onApply`/`onRevert`/`onReset(property?)` include the affected property when known (omitted for a bulk "apply all"). The same `usePropertyEditor` hook is reused, unmodified, by `LightingControls` for editing light-specific properties.

## Console

In-game console via `useConsoleBridge({enabled?}) → {logs, clear, filter(level)}`, which intercepts **both** the PlayCanvas engine console and the browser console into one feed. `maxLines?` defaults `1000`; `filter?: 'all' | 'log' | 'warn' | 'error' | 'debug'` (default `'all'`). `onCommand(command)` is required (executes an entered command); `onExecute?(command, result)` fires on completion, including the result or a thrown error; `autocomplete?(command) => string[]` supplies suggestions. `role="log"`, `aria-live="polite"`.

## PerformanceMonitor

FPS/frame-time/memory/draw-call overlay reading `pc.Application.stats` via `useDevAPI({pcApp})`. `metrics?` defaults `['fps', 'frameTime', 'drawCalls']` from the full set `'fps' | 'frameTime' | 'memory' | 'drawCalls' | 'triangles' | 'gpu'`. `variant: 'compact' | 'graph' | 'detailed'` (default `'compact'`; `'graph'` shows a scrolling sparkline history per metric, `'detailed'` shows per-metric breakdowns e.g. draw calls by material). `updateInterval?` defaults `500`ms — sampling faster than the display needs wastes cycles measuring the measurer; keep it at 500ms or higher outside active performance investigation. `historyLength?` defaults `60` samples (graph variant). `thresholds?: Partial<Record<string, number>>` (e.g. `{fps: 30}`) drives `onThresholdExceeded?(metric, value)`. Stated twice in `COMPONENTS.md` (for both `DevTools` and `PerformanceMonitor`) as non-negotiable: **never ship this component in a production build.**

## AssetViewer

Loaded-asset registry browser reading `pc.Application.assets` via `useDevAPI({pcApp})`. `filter?: 'all' | 'texture' | 'model' | 'audio' | 'script' | 'material'` (default `'all'`); `sortBy?: 'name' | 'size' | 'type' | 'loadTime'` (default `'size'`); `groupBy?: 'type' | 'none'` (default `'type'`). `onUnload?(asset)` force-unloads an asset for diagnostic purposes (dev-only). `showUnusedOnly?` (default `false`) filters to assets with zero active references, for leak-finding. `role="table"` (or `role="tree"` when `groupBy="type"`).

## `useDevAPI` return shape

`useDevAPI({pcApp}) → {inspect(entity), getScene(), ...}` — `COMPONENTS.md` documents this return shape with a literal `...`, i.e. explicitly incomplete/truncated in the source. Do not assume additional members beyond `inspect` and `getScene` without a spec update; it is the shared hook behind `DevTools`, `PerformanceMonitor`, and `AssetViewer`.

## No production logging/telemetry pipeline documented

`COMPONENTS.md` documents no logging, telemetry, or error-reporting integration for production (non-DevMode) use beyond `ErrorBoundary`/`ErrorMsg`'s `onReport(error)` callback, which hands the error to a caller-supplied handler — the component itself does not send it anywhere. Do not assume a specific logging backend (Sentry, Datadog, etc.); none is named anywhere in the source.
