# Error Handling

Source: every failure-path prop, callback, and behavior verified in `COMPONENTS.md`.

## Core convention: PlayCanvas bridge hooks never throw

`useEntity`, `useScript`, `useSync`, `useEvent`, `useTransition`, and `useNetwork` all share one deliberate, repeated design: an unresolved ID/prop/target/event is a silent no-op or resolves to a safe default (`null`/`undefined`), not a thrown exception. Failures surface exclusively through a dedicated `onError` callback or a returned `error` state (e.g. `useTransition`'s `error: Error | null`, `useNetwork`'s `onError`), never by throwing from inside the hook itself. Any new PlayCanvas-bridge hook must follow this same convention.

## Dedicated error components

- **`ErrorBoundary`** — React error boundary with PlayCanvas error reporting via `useErrorReporter`. `fallback` accepts either a static `ReactNode` or a render function `(error, errorInfo) => ReactNode`. `onReset(data?: {error})` includes the error being recovered from; `onReport(error)` is separate from the render-path error handling. `variant="toast"` renders the error as a dismissible `Toast` instead of replacing `children` in place, for non-fatal errors where the rest of the UI should stay interactive. `role="alert"`, `aria-live="assertive"`, and focus moves to the error message.
- **`ErrorMsg`** — Standalone error display with retry/dismiss, also used by `ErrorBoundary` and for network errors. `code?: string | number` is accepted as-is and is **not** validated against any registry — validating or mapping it is the caller's responsibility. `onDismiss`/`onAction`/`onReport`/`onRetry` all include the error code when available; `onReport` also includes the message. `variant="modal"` renders inside `Modal` for errors that must be acknowledged before the user can continue (blocking), distinct from `banner`/`toast`/`inline`/`full-page` (non-blocking). `role="alert"`, `aria-live="assertive"`.

## Attempt-vs-success callback split (repeated pattern)

A pattern repeated across every domain with a fallible action: a callback fires for every **attempt** (including failed/invalid ones), and a separate callback fires only for **success**. Do not conflate them when implementing a new fallible action.
- `Puzzle`: `onAttempt` (every attempt) vs. `onSolve` (success) vs. `onAttemptFail` (per failed attempt, before exhaustion) vs. `onFail` (terminal, after `maxAttempts` exhausted) vs. `onError` (thrown/rejected `validateSolution`).
- `ObjectPuzzle`: `onObjectDrop(objectId, slotId | null)` fires on every drop attempt including invalid ones (`slotId` is `null`); `onPlace` fires only for successful placement.
- `SequencePuzzle`: `onStepCorrect`/`onStepIncorrect` (per step) vs. `onComplete`/`onFail`.
- `CraftingPanel`: `onCraft` (attempted) vs. `onCraftComplete` (success) vs. `onCraftFail(recipeId, reason: 'missing-ingredients' | 'error')`.
- `EquipmentSlots`: `onEquip` (successful match) vs. `onInvalidDrop(slotId, item)` (dropped on a slot whose `slotType` it doesn't match — validity is determined by the consumer, not by `EquipmentSlots` itself).

## Async confirmation and rejection handling

`Confirm.onConfirm: () => void | Promise<void>` — if the returned promise **rejects**, `Confirm` catches the rejection, calls `onConfirmError`, keeps the modal open, and clears its internal `loading` state; it does not rethrow and does not leave the confirm button stuck in a loading state. `onBeforeConfirm?() => boolean | Promise<boolean>` can return/resolve `false` to prevent the confirm from proceeding at all. `onAfterConfirm(result: void | Error)` fires after the operation settles either way (success or caught rejection).

## Retry/lockout patterns

- `PatternLock`: `maxAttempts` (default 5, `0` = unlimited) triggers `onLockout(lockoutSeconds)`, with `lockoutDuration` defaulting to 30 seconds; `allowRetry` (default `true`) controls whether an immediate redraw is permitted after a failed, non-lockout attempt.
- `CodePuzzle`: `clearOnInvalid?` (default `false`) and `shakeOnInvalid?` (default `true`) control the failure-feedback UX without a hard lockout mechanism.

## Fallback content on load failure

- `Image`: `fallback?: string` (fallback image URL), `onError?: () => void` fires if the resolved image fails to load.
- `Avatar`: falls back to initials derived from `name` (e.g. `"Ada Lovelace"` → `"AL"`) on `src` load failure (`onError`), or to a custom `fallback` ReactNode if supplied.
- `Skeleton.onError?()` — called if the content the skeleton stands in for fails to load, so the consumer can swap to an explicit error state rather than pulsing indefinitely; `Skeleton` itself has no network activity of its own.

## Unvalidated inputs that degrade rather than fail loudly

- `SliderPuzzle.tiles`: must be a permutation of `0..size²-1`, but this is **not validated at runtime**, even with `parityCheck` enabled — `parityCheck` only checks the solvability of an assumed-valid permutation, not the permutation's validity itself. An invalid array can silently produce an unsolvable or broken board.
- `Icon.name`: an unrecognized name is only caught at runtime (renders nothing or a placeholder), not at compile time, since it is typed as a plain `string` against a runtime-resolved registry.
- `FocusTrap.initialFocus`: a non-matching selector or an out-of-trap element falls back silently to the first focusable descendant rather than throwing.
- `SkipLink.targetId`: not validated against the live DOM — a non-matching ID means the native `href="#${targetId}"` anchor jump simply does nothing, no error.
- `ErrorMsg.code`: accepted and displayed as-is with no registry validation.

## Configuration/runtime fragility

`DevTools.enabled` defaults to `process.env.NODE_ENV !== 'production'`. On SSR, `NODE_ENV` is typically `'production'` in deployment, which resolves to `false` server-side safely. If `process.env` itself is unavailable in a browser-only bundler's client runtime (some edge/browser-only bundlers strip it), this default throws a `ReferenceError` — pass `enabled` explicitly in that environment to avoid it. See `docs/CONFIGURATION.md`.

## Console warnings vs. thrown errors

- `Button` with `variant="icon-only"` and no `aria-label` **throws** a development-time console error (not merely a warning) — a hard failure signal during development.
- `Button.onClick` usage triggers a development-only `console.warn` deprecation notice (once per component instance, stripped from production builds); the component continues to function.
- These two are intentionally different severities: a missing required accessible name is treated as a defect (error), a discouraged-but-functional API usage is treated as a nudge (warning).
