/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useCameraProjection({pcCamera}) => {project(worldPos): {x,y}} — used by HUD, DamageNumbers, Minimap`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useCameraProjection(_options?: Record<string, unknown>): unknown {
  throw new Error(
    'useCameraProjection is not implemented yet. See docs/API.md § useCameraProjection.',
  );
}
