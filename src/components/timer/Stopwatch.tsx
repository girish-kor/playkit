import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Stopwatch` (category: Timer).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Stopwatch, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Stopwatch entry in `COMPONENTS.md`.
 */
export interface StopwatchProps {
  className?: string;
  children?: React.ReactNode;
}

export const Stopwatch = React.forwardRef<HTMLElement, StopwatchProps>(
  function Stopwatch(_props, _ref) {
    throw new Error(
      'Stopwatch is not implemented yet. See COMPONENTS.md § Component: Stopwatch, and src/components/timer/Stopwatch.tsx.',
    );
  },
);

Stopwatch.displayName = 'Stopwatch';
