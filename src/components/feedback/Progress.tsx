import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Progress` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Progress, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Progress entry in `COMPONENTS.md`.
 */
export interface ProgressProps {
  className?: string;
  children?: React.ReactNode;
}

export const Progress = React.forwardRef<HTMLElement, ProgressProps>(
  function Progress(_props, _ref) {
    throw new Error(
      'Progress is not implemented yet. See COMPONENTS.md § Component: Progress, and src/components/feedback/Progress.tsx.',
    );
  },
);

Progress.displayName = 'Progress';
