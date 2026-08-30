import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: HUD` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for HUD, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the HUD entry in `COMPONENTS.md`.
 */
export interface HUDProps {
  className?: string;
  children?: React.ReactNode;
}

export const HUD = React.forwardRef<HTMLElement, HUDProps>(function HUD(_props, _ref) {
  throw new Error(
    'HUD is not implemented yet. See COMPONENTS.md § Component: HUD, and src/components/hud/HUD.tsx.',
  );
});

HUD.displayName = 'HUD';
