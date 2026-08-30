import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: PerformanceMonitor` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for PerformanceMonitor, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the PerformanceMonitor entry in `COMPONENTS.md`.
 */
export interface PerformanceMonitorProps {
  className?: string;
  children?: React.ReactNode;
}

export const PerformanceMonitor = React.forwardRef<HTMLElement, PerformanceMonitorProps>(
  function PerformanceMonitor(_props, _ref) {
    throw new Error(
      'PerformanceMonitor is not implemented yet. See COMPONENTS.md § Component: PerformanceMonitor, and src/components/devtools/PerformanceMonitor.tsx.',
    );
  },
);

PerformanceMonitor.displayName = 'PerformanceMonitor';
