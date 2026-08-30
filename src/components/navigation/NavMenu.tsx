import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: NavMenu` (category: Navigation).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for NavMenu, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the NavMenu entry in `COMPONENTS.md`.
 */
export interface NavMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const NavMenu = React.forwardRef<HTMLElement, NavMenuProps>(function NavMenu(_props, _ref) {
  throw new Error(
    'NavMenu is not implemented yet. See COMPONENTS.md § Component: NavMenu, and src/components/navigation/NavMenu.tsx.',
  );
});

NavMenu.displayName = 'NavMenu';
