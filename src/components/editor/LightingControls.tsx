import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: LightingControls` (category: Editor).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for LightingControls, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the LightingControls entry in `COMPONENTS.md`.
 */
export interface LightingControlsProps {
  className?: string;
  children?: React.ReactNode;
}

export const LightingControls = React.forwardRef<HTMLElement, LightingControlsProps>(
  function LightingControls(_props, _ref) {
    throw new Error(
      'LightingControls is not implemented yet. See COMPONENTS.md § Component: LightingControls, and src/components/editor/LightingControls.tsx.',
    );
  },
);

LightingControls.displayName = 'LightingControls';
