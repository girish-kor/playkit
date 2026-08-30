import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Badge` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Badge, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Badge entry in `COMPONENTS.md`.
 */
export interface BadgeProps {
  className?: string;
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(_props, _ref) {
  throw new Error(
    'Badge is not implemented yet. See COMPONENTS.md § Component: Badge, and src/components/primitives/Badge.tsx.',
  );
});

Badge.displayName = 'Badge';
