import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: SidebarMenu` (category: Navigation).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for SidebarMenu, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the SidebarMenu entry in `COMPONENTS.md`.
 */
export interface SidebarMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarMenu = React.forwardRef<HTMLElement, SidebarMenuProps>(
  function SidebarMenu(_props, _ref) {
    throw new Error(
      'SidebarMenu is not implemented yet. See COMPONENTS.md § Component: SidebarMenu, and src/components/navigation/SidebarMenu.tsx.',
    );
  },
);

SidebarMenu.displayName = 'SidebarMenu';
