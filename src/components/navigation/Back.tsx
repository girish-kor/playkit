import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Back` (category: Navigation).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Back, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Back entry in `COMPONENTS.md`.
 */
export interface BackProps {
  className?: string;
  children?: React.ReactNode;
}

export const Back = React.forwardRef<HTMLElement, BackProps>(function Back(_props, _ref) {
  throw new Error(
    'Back is not implemented yet. See COMPONENTS.md § Component: Back, and src/components/navigation/Back.tsx.',
  );
});

Back.displayName = 'Back';
