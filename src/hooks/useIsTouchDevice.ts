import * as React from 'react';

/** Detects touch-capable input (docs/API.md § useIsTouchDevice) — used by `Touch`. */
export function useIsTouchDevice(): { isTouch: boolean } {
  const getSnapshot = () =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const subscribe = () => () => {};
  const isTouch = React.useSyncExternalStore(subscribe, getSnapshot, () => false);
  return { isTouch };
}
