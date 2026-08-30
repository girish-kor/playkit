import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Spinner` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Spinner, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Spinner entry in `COMPONENTS.md`.
 */
export interface SpinnerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Spinner = React.forwardRef<HTMLElement, SpinnerProps>(function Spinner(_props, _ref) {
  throw new Error(
    'Spinner is not implemented yet. See COMPONENTS.md § Component: Spinner, and src/components/feedback/Spinner.tsx.',
  );
});

Spinner.displayName = 'Spinner';
