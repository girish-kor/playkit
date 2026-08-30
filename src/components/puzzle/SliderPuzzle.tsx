import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: SliderPuzzle` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for SliderPuzzle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the SliderPuzzle entry in `COMPONENTS.md`.
 */
export interface SliderPuzzleProps {
  className?: string;
  children?: React.ReactNode;
}

export const SliderPuzzle = React.forwardRef<HTMLElement, SliderPuzzleProps>(
  function SliderPuzzle(_props, _ref) {
    throw new Error(
      'SliderPuzzle is not implemented yet. See COMPONENTS.md § Component: SliderPuzzle, and src/components/puzzle/SliderPuzzle.tsx.',
    );
  },
);

SliderPuzzle.displayName = 'SliderPuzzle';
