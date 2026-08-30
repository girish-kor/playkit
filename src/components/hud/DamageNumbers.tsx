import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: DamageNumbers` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for DamageNumbers, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the DamageNumbers entry in `COMPONENTS.md`.
 */
export interface DamageNumbersProps {
  className?: string;
  children?: React.ReactNode;
}

export const DamageNumbers = React.forwardRef<HTMLElement, DamageNumbersProps>(
  function DamageNumbers(_props, _ref) {
    throw new Error(
      'DamageNumbers is not implemented yet. See COMPONENTS.md § Component: DamageNumbers, and src/components/hud/DamageNumbers.tsx.',
    );
  },
);

DamageNumbers.displayName = 'DamageNumbers';
