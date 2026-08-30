import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: DropdownMenu` (category: Overlay).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for DropdownMenu, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the DropdownMenu entry in `COMPONENTS.md`.
 */
export interface DropdownMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const DropdownMenu = React.forwardRef<HTMLElement, DropdownMenuProps>(
  function DropdownMenu(_props, _ref) {
    throw new Error(
      'DropdownMenu is not implemented yet. See COMPONENTS.md § Component: DropdownMenu, and src/components/overlay/DropdownMenu.tsx.',
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
