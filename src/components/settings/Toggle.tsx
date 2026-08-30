import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Toggle` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Toggle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Toggle entry in `COMPONENTS.md`.
 */
export interface ToggleProps {
  className?: string;
  children?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLElement, ToggleProps>(function Toggle(_props, _ref) {
  throw new Error(
    'Toggle is not implemented yet. See COMPONENTS.md § Component: Toggle, and src/components/settings/Toggle.tsx.',
  );
});

Toggle.displayName = 'Toggle';
