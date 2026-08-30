import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: PatternLock` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for PatternLock, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the PatternLock entry in `COMPONENTS.md`.
 */
export interface PatternLockProps {
  className?: string;
  children?: React.ReactNode;
}

export const PatternLock = React.forwardRef<HTMLElement, PatternLockProps>(
  function PatternLock(_props, _ref) {
    throw new Error(
      'PatternLock is not implemented yet. See COMPONENTS.md § Component: PatternLock, and src/components/puzzle/PatternLock.tsx.',
    );
  },
);

PatternLock.displayName = 'PatternLock';
