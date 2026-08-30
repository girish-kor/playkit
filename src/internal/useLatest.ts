import * as React from 'react';

/**
 * Shared "latest ref" helper for callback props passed into effects that intentionally
 * don't want to re-run when only the callback identity changes (used throughout
 * src/hooks/ for onChange/onSync/onError-style callbacks). The ref is written from an
 * effect, not during render, per `react-hooks/refs` — a ref is read-after-render data,
 * never mutated synchronously while rendering.
 */
export function useLatest<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref;
}
