import * as React from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function computeBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  return 'sm';
}

/** Reactive viewport dimensions/breakpoint (docs/API.md § useViewport) — used by `Responsive`. */
export function useViewport(): { width: number; height: number; breakpoint: Breakpoint } {
  const subscribe = React.useCallback((onChange: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('resize', onChange);
    return () => window.removeEventListener('resize', onChange);
  }, []);

  const getSnapshot = () =>
    typeof window === 'undefined' ? '0x0' : `${window.innerWidth}x${window.innerHeight}`;

  const dimensions = React.useSyncExternalStore(subscribe, getSnapshot, () => '0x0');
  const [widthStr, heightStr] = dimensions.split('x');
  const width = Number(widthStr);
  const height = Number(heightStr);

  return { width, height, breakpoint: computeBreakpoint(width) };
}
