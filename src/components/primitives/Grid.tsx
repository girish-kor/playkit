import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Grid` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Grid, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Grid entry in `COMPONENTS.md`.
 */
export interface GridProps {
  className?: string;
  children?: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(_props, _ref) {
  throw new Error(
    'Grid is not implemented yet. See COMPONENTS.md § Component: Grid, and src/components/primitives/Grid.tsx.',
  );
});

Grid.displayName = 'Grid';
