/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useDevAPI({pcApp}) => {inspect(entity), getScene(), ...} — return shape explicitly incomplete in COMPONENTS.md; do not assume members beyond inspect/getScene`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useDevAPI(_options?: Record<string, unknown>): unknown {
  throw new Error('useDevAPI is not implemented yet. See docs/API.md § useDevAPI.');
}
