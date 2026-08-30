import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: WordPuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for WordPuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the WordPuzzle entry in `COMPONENTS.md`.
 */
export interface WordPuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const WordPuzzle = React.forwardRef<HTMLElement, WordPuzzleProps>(
  function WordPuzzle(_props, _ref) {
    throw new Error(
      'WordPuzzle is not implemented yet. See COMPONENTS.md § Component: WordPuzzle, and src/components/puzzle/WordPuzzle.tsx.',
    );
  },
);

WordPuzzle.displayName = 'WordPuzzle';
