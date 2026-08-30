import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Touch` (category: Responsive).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Touch, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Touch entry in `COMPONENTS.md`.
 */
export interface TouchProps {
  className?: string;
  children?: React.ReactNode;
}

export const Touch = React.forwardRef<HTMLElement, TouchProps>(function Touch(_props, _ref) {
  throw new Error(
    'Touch is not implemented yet. See COMPONENTS.md § Component: Touch, and src/components/responsive/Touch.tsx.',
  );
});

Touch.displayName = 'Touch';
