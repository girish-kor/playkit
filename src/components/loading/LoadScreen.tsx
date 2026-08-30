import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: LoadScreen` (category: Loading).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for LoadScreen, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the LoadScreen entry in `COMPONENTS.md`.
 */
export interface LoadScreenProps {
  className?: string;
  children?: React.ReactNode;
}

export const LoadScreen = React.forwardRef<HTMLElement, LoadScreenProps>(
  function LoadScreen(_props, _ref) {
    throw new Error(
      'LoadScreen is not implemented yet. See COMPONENTS.md § Component: LoadScreen, and src/components/loading/LoadScreen.tsx.',
    );
  },
);

LoadScreen.displayName = 'LoadScreen';
