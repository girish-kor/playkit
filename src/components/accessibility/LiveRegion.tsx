import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: LiveRegion` (category: Accessibility).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for LiveRegion, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the LiveRegion entry in `COMPONENTS.md`.
 */
export interface LiveRegionProps {
  className?: string;
  children?: React.ReactNode;
}

export const LiveRegion = React.forwardRef<HTMLElement, LiveRegionProps>(
  function LiveRegion(_props, _ref) {
    throw new Error(
      'LiveRegion is not implemented yet. See COMPONENTS.md § Component: LiveRegion, and src/components/accessibility/LiveRegion.tsx.',
    );
  },
);

LiveRegion.displayName = 'LiveRegion';
