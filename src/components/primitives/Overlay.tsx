import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Overlay` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Overlay, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Overlay entry in `COMPONENTS.md`.
 */
export interface OverlayProps {
  className?: string;
  children?: React.ReactNode;
}

export const Overlay = React.forwardRef<HTMLElement, OverlayProps>(function Overlay(_props, _ref) {
  throw new Error(
    'Overlay is not implemented yet. See COMPONENTS.md § Component: Overlay, and src/components/primitives/Overlay.tsx.',
  );
});

Overlay.displayName = 'Overlay';
