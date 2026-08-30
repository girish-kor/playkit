import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Compass` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Compass, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Compass entry in `COMPONENTS.md`.
 */
export interface CompassProps {
  className?: string;
  children?: React.ReactNode;
}

export const Compass = React.forwardRef<HTMLElement, CompassProps>(function Compass(_props, _ref) {
  throw new Error(
    'Compass is not implemented yet. See COMPONENTS.md § Component: Compass, and src/components/hud/Compass.tsx.',
  );
});

Compass.displayName = 'Compass';
