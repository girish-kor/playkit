import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Puzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Puzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Puzzle entry in `COMPONENTS.md`.
 */
export interface PuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const Puzzle = React.forwardRef<HTMLElement, PuzzleProps>(function Puzzle(_props, _ref) {
  throw new Error(
    'Puzzle is not implemented yet. See COMPONENTS.md § Component: Puzzle, and src/components/puzzle/Puzzle.tsx.',
  );
});

Puzzle.displayName = 'Puzzle';
