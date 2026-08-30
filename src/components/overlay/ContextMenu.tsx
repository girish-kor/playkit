import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ContextMenu` (category: Overlay).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ContextMenu, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ContextMenu entry in `COMPONENTS.md`.
 */
export interface ContextMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const ContextMenu = React.forwardRef<HTMLElement, ContextMenuProps>(
  function ContextMenu(_props, _ref) {
    throw new Error(
      'ContextMenu is not implemented yet. See COMPONENTS.md § Component: ContextMenu, and src/components/overlay/ContextMenu.tsx.',
    );
  },
);

ContextMenu.displayName = 'ContextMenu';
