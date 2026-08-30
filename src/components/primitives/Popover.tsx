import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Popover` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Popover, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Popover entry in `COMPONENTS.md`.
 */
export interface PopoverProps {
  className?: string;
  children?: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLElement, PopoverProps>(function Popover(_props, _ref) {
  throw new Error(
    'Popover is not implemented yet. See COMPONENTS.md § Component: Popover, and src/components/primitives/Popover.tsx.',
  );
});

Popover.displayName = 'Popover';
