import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Skeleton` (category: Loading).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Skeleton, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Skeleton entry in `COMPONENTS.md`.
 */
export interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton = React.forwardRef<HTMLElement, SkeletonProps>(
  function Skeleton(_props, _ref) {
    throw new Error(
      'Skeleton is not implemented yet. See COMPONENTS.md § Component: Skeleton, and src/components/loading/Skeleton.tsx.',
    );
  },
);

Skeleton.displayName = 'Skeleton';
