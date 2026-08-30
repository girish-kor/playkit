import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Crosshair` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Crosshair, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Crosshair entry in `COMPONENTS.md`.
 */
export interface CrosshairProps {
  className?: string;
  children?: React.ReactNode;
}

export const Crosshair = React.forwardRef<HTMLElement, CrosshairProps>(
  function Crosshair(_props, _ref) {
    throw new Error(
      'Crosshair is not implemented yet. See COMPONENTS.md § Component: Crosshair, and src/components/hud/Crosshair.tsx.',
    );
  },
);

Crosshair.displayName = 'Crosshair';
