import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: MathPuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for MathPuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the MathPuzzle entry in `COMPONENTS.md`.
 */
export interface MathPuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const MathPuzzle = React.forwardRef<HTMLElement, MathPuzzleProps>(
  function MathPuzzle(_props, _ref) {
    throw new Error(
      'MathPuzzle is not implemented yet. See COMPONENTS.md § Component: MathPuzzle, and src/components/puzzle/MathPuzzle.tsx.',
    );
  },
);

MathPuzzle.displayName = 'MathPuzzle';
