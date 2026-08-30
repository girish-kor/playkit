import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: CodePuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for CodePuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the CodePuzzle entry in `COMPONENTS.md`.
 */
export interface CodePuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const CodePuzzle = React.forwardRef<HTMLElement, CodePuzzleProps>(
  function CodePuzzle(_props, _ref) {
    throw new Error(
      'CodePuzzle is not implemented yet. See COMPONENTS.md § Component: CodePuzzle, and src/components/puzzle/CodePuzzle.tsx.',
    );
  },
);

CodePuzzle.displayName = 'CodePuzzle';
