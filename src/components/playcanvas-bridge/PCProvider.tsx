import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: PCProvider` (category: PlayCanvas Bridge).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for PCProvider, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the PCProvider entry in `COMPONENTS.md`.
 */
export interface PCProviderProps {
  className?: string;
  children?: React.ReactNode;
}

export const PCProvider = React.forwardRef<HTMLElement, PCProviderProps>(
  function PCProvider(_props, _ref) {
    throw new Error(
      'PCProvider is not implemented yet. See COMPONENTS.md § Component: PCProvider, and src/components/playcanvas-bridge/PCProvider.tsx.',
    );
  },
);

PCProvider.displayName = 'PCProvider';
