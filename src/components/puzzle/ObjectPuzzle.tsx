import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ObjectPuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ObjectPuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ObjectPuzzle entry in `COMPONENTS.md`.
 */
export interface ObjectPuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const ObjectPuzzle = React.forwardRef<HTMLElement, ObjectPuzzleProps>(
  function ObjectPuzzle(_props, _ref) {
    throw new Error(
      'ObjectPuzzle is not implemented yet. See COMPONENTS.md § Component: ObjectPuzzle, and src/components/puzzle/ObjectPuzzle.tsx.',
    );
  },
);

ObjectPuzzle.displayName = 'ObjectPuzzle';
