import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Box` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Box, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Box entry in `COMPONENTS.md`.
 */
export interface BoxProps {
  className?: string;
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(_props, _ref) {
  throw new Error(
    'Box is not implemented yet. See COMPONENTS.md § Component: Box, and src/components/primitives/Box.tsx.',
  );
});

Box.displayName = 'Box';
