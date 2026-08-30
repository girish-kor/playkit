import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ScrollArea` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ScrollArea, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ScrollArea entry in `COMPONENTS.md`.
 */
export interface ScrollAreaProps {
  className?: string;
  children?: React.ReactNode;
}

export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>(
  function ScrollArea(_props, _ref) {
    throw new Error(
      'ScrollArea is not implemented yet. See COMPONENTS.md § Component: ScrollArea, and src/components/primitives/ScrollArea.tsx.',
    );
  },
);

ScrollArea.displayName = 'ScrollArea';
