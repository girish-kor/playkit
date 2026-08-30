import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: LoadingDots` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for LoadingDots, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the LoadingDots entry in `COMPONENTS.md`.
 */
export interface LoadingDotsProps {
  className?: string;
  children?: React.ReactNode;
}

export const LoadingDots = React.forwardRef<HTMLElement, LoadingDotsProps>(
  function LoadingDots(_props, _ref) {
    throw new Error(
      'LoadingDots is not implemented yet. See COMPONENTS.md § Component: LoadingDots, and src/components/feedback/LoadingDots.tsx.',
    );
  },
);

LoadingDots.displayName = 'LoadingDots';
