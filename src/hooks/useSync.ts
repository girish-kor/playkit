/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useSync({entityId, prop, localValue, syncDirection?, debounce?, conflictStrategy?, onSync?, onConflict?, onChange?}) => {value, setValue, isLocal, isRemote, hasConflict}`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useSync(_options?: Record<string, unknown>): unknown {
  throw new Error('useSync is not implemented yet. See docs/API.md § useSync.');
}
