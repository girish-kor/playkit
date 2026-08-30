import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Energy` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Energy, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Energy entry in `COMPONENTS.md`.
 */
export interface EnergyProps {
  className?: string;
  children?: React.ReactNode;
}

export const Energy = React.forwardRef<HTMLElement, EnergyProps>(function Energy(_props, _ref) {
  throw new Error(
    'Energy is not implemented yet. See COMPONENTS.md § Component: Energy, and src/components/hud/Energy.tsx.',
  );
});

Energy.displayName = 'Energy';
