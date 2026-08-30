import * as React from 'react';

/**
 * Internal helper backing the `prefers-reduced-motion: reduce` handling documented on
 * `Overlay`, `A11y`, and `Confetti` (docs/ACCESSIBILITY.md). Not part of the public
 * hook surface in docs/API.md -- those three components each expose their own
 * documented prop/behavior for it; this just reads the media query once, reactively.
 */
export function usePrefersReducedMotion(): boolean {
  const getSnapshot = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const subscribe = (onChange: () => void) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
