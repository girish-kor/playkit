import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Inspector` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Inspector, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Inspector entry in `COMPONENTS.md`.
 */
export interface InspectorProps {
  className?: string;
  children?: React.ReactNode;
}

export const Inspector = React.forwardRef<HTMLElement, InspectorProps>(
  function Inspector(_props, _ref) {
    throw new Error(
      'Inspector is not implemented yet. See COMPONENTS.md § Component: Inspector, and src/components/devtools/Inspector.tsx.',
    );
  },
);

Inspector.displayName = 'Inspector';
