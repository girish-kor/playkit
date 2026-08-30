import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Stepper` (category: General).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Stepper, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Stepper entry in `COMPONENTS.md`.
 */
export interface StepperProps {
  className?: string;
  children?: React.ReactNode;
}

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(function Stepper(_props, _ref) {
  throw new Error(
    'Stepper is not implemented yet. See COMPONENTS.md § Component: Stepper, and src/components/general/Stepper.tsx.',
  );
});

Stepper.displayName = 'Stepper';
