import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Health` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Health, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Health entry in `COMPONENTS.md`.
 */
export interface HealthProps {
  className?: string;
  children?: React.ReactNode;
}

export const Health = React.forwardRef<HTMLElement, HealthProps>(function Health(_props, _ref) {
  throw new Error(
    'Health is not implemented yet. See COMPONENTS.md § Component: Health, and src/components/hud/Health.tsx.',
  );
});

Health.displayName = 'Health';
