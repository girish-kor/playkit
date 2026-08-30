import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: MemoryMatch` (category: Puzzle).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for MemoryMatch, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the MemoryMatch entry in `COMPONENTS.md`.
 */
export interface MemoryMatchProps {
  className?: string;
  children?: React.ReactNode;
}

export const MemoryMatch = React.forwardRef<HTMLElement, MemoryMatchProps>(
  function MemoryMatch(_props, _ref) {
    throw new Error(
      'MemoryMatch is not implemented yet. See COMPONENTS.md § Component: MemoryMatch, and src/components/puzzle/MemoryMatch.tsx.',
    );
  },
);

MemoryMatch.displayName = 'MemoryMatch';
