import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: OrientationLock` (category: Responsive).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for OrientationLock, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the OrientationLock entry in `COMPONENTS.md`.
 */
export interface OrientationLockProps {
  className?: string;
  children?: React.ReactNode;
}

export const OrientationLock = React.forwardRef<HTMLElement, OrientationLockProps>(
  function OrientationLock(_props, _ref) {
    throw new Error(
      'OrientationLock is not implemented yet. See COMPONENTS.md § Component: OrientationLock, and src/components/responsive/OrientationLock.tsx.',
    );
  },
);

OrientationLock.displayName = 'OrientationLock';
