import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Minimap` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Minimap, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Minimap entry in `COMPONENTS.md`.
 */
export interface MinimapProps {
  className?: string;
  children?: React.ReactNode;
}

export const Minimap = React.forwardRef<HTMLElement, MinimapProps>(function Minimap(_props, _ref) {
  throw new Error(
    'Minimap is not implemented yet. See COMPONENTS.md § Component: Minimap, and src/components/hud/Minimap.tsx.',
  );
});

Minimap.displayName = 'Minimap';
