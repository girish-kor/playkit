import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Objective` (category: Objectives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Objective, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Objective entry in `COMPONENTS.md`.
 */
export interface ObjectiveProps {
  className?: string;
  children?: React.ReactNode;
}

export const Objective = React.forwardRef<HTMLElement, ObjectiveProps>(
  function Objective(_props, _ref) {
    throw new Error(
      'Objective is not implemented yet. See COMPONENTS.md § Component: Objective, and src/components/objectives/Objective.tsx.',
    );
  },
);

Objective.displayName = 'Objective';
