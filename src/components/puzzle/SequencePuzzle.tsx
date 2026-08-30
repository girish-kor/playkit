import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: SequencePuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for SequencePuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the SequencePuzzle entry in `COMPONENTS.md`.
 */
export interface SequencePuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const SequencePuzzle = React.forwardRef<HTMLElement, SequencePuzzleProps>(
  function SequencePuzzle(_props, _ref) {
    throw new Error(
      'SequencePuzzle is not implemented yet. See COMPONENTS.md § Component: SequencePuzzle, and src/components/puzzle/SequencePuzzle.tsx.',
    );
  },
);

SequencePuzzle.displayName = 'SequencePuzzle';
