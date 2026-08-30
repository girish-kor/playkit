import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Confetti` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Confetti, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Confetti entry in `COMPONENTS.md`.
 */
export interface ConfettiProps {
  className?: string;
  children?: React.ReactNode;
}

export const Confetti = React.forwardRef<HTMLElement, ConfettiProps>(
  function Confetti(_props, _ref) {
    throw new Error(
      'Confetti is not implemented yet. See COMPONENTS.md § Component: Confetti, and src/components/feedback/Confetti.tsx.',
    );
  },
);

Confetti.displayName = 'Confetti';
