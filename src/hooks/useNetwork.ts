/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useNetwork({networkId, channel, reconnect?, onMessage?, onPlayerJoin?, onPlayerLeave?, onDisconnect?, onReconnect?, onError?}) => {isConnected, isHost, players, latency, send}`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useNetwork(_options?: Record<string, unknown>): unknown {
  throw new Error('useNetwork is not implemented yet. See docs/API.md § useNetwork.');
}
