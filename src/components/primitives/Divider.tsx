import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Divider` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Divider, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Divider entry in `COMPONENTS.md`.
 */
export interface DividerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLElement, DividerProps>(function Divider(_props, _ref) {
  throw new Error(
    'Divider is not implemented yet. See COMPONENTS.md § Component: Divider, and src/components/primitives/Divider.tsx.',
  );
});

Divider.displayName = 'Divider';
