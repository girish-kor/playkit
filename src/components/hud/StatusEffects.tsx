import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: StatusEffects` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for StatusEffects, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the StatusEffects entry in `COMPONENTS.md`.
 */
export interface StatusEffectsProps {
  className?: string;
  children?: React.ReactNode;
}

export const StatusEffects = React.forwardRef<HTMLElement, StatusEffectsProps>(
  function StatusEffects(_props, _ref) {
    throw new Error(
      'StatusEffects is not implemented yet. See COMPONENTS.md § Component: StatusEffects, and src/components/hud/StatusEffects.tsx.',
    );
  },
);

StatusEffects.displayName = 'StatusEffects';
