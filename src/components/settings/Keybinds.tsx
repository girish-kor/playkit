import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Keybinds` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Keybinds, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Keybinds entry in `COMPONENTS.md`.
 */
export interface KeybindsProps {
  className?: string;
  children?: React.ReactNode;
}

export const Keybinds = React.forwardRef<HTMLElement, KeybindsProps>(
  function Keybinds(_props, _ref) {
    throw new Error(
      'Keybinds is not implemented yet. See COMPONENTS.md § Component: Keybinds, and src/components/settings/Keybinds.tsx.',
    );
  },
);

Keybinds.displayName = 'Keybinds';
