/**
 * Scaffold stub — not yet implemented.
 *
 * Documented signature (verbatim from `docs/API.md`):
 * `useTimer({initialTime, isCountdown?, autoStart?, onTick?, onFinish?, timeDilation?}) => {time, isRunning, isPaused, isFinished, progress, start, pause, resume, reset} — timeDilation default 1; used internally by Timer`
 *
 * Do not invent option/return fields beyond what's shown above without a spec update
 * (see `docs/API.md`, `docs/DATA-MODELS.md`). PlayCanvas-bridge hooks must never throw
 * from normal (unresolved-id) operation once implemented — see `docs/ERROR-HANDLING.md`.
 */
export function useTimer(_options?: Record<string, unknown>): unknown {
  throw new Error('useTimer is not implemented yet. See docs/API.md § useTimer.');
}
