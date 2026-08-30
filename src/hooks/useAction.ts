/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useAction({pcEntity, method}) => {execute(...args)} — pcEntity required (unlike most sync hooks); used by Button.pcAction, Confetti`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useAction(_options?: Record<string, unknown>): unknown {
  throw new Error('useAction is not implemented yet. See docs/API.md § useAction.');
}
