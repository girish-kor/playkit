import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: CombinationLock` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for CombinationLock, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the CombinationLock entry in `COMPONENTS.md`.
 */
export interface CombinationLockProps {
  className?: string;
  children?: React.ReactNode;
}

export const CombinationLock = React.forwardRef<HTMLElement, CombinationLockProps>(
  function CombinationLock(_props, _ref) {
    throw new Error(
      'CombinationLock is not implemented yet. See COMPONENTS.md § Component: CombinationLock, and src/components/puzzle/CombinationLock.tsx.',
    );
  },
);

CombinationLock.displayName = 'CombinationLock';
