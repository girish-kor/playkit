import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: DevTools` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for DevTools, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the DevTools entry in `COMPONENTS.md`.
 */
export interface DevToolsProps {
  className?: string;
  children?: React.ReactNode;
}

export const DevTools = React.forwardRef<HTMLElement, DevToolsProps>(
  function DevTools(_props, _ref) {
    throw new Error(
      'DevTools is not implemented yet. See COMPONENTS.md § Component: DevTools, and src/components/devtools/DevTools.tsx.',
    );
  },
);

DevTools.displayName = 'DevTools';
