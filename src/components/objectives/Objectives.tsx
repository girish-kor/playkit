import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Objectives` (category: Objectives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Objectives, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Objectives entry in `COMPONENTS.md`.
 */
export interface ObjectivesProps {
  className?: string;
  children?: React.ReactNode;
}

export const Objectives = React.forwardRef<HTMLElement, ObjectivesProps>(
  function Objectives(_props, _ref) {
    throw new Error(
      'Objectives is not implemented yet. See COMPONENTS.md § Component: Objectives, and src/components/objectives/Objectives.tsx.',
    );
  },
);

Objectives.displayName = 'Objectives';
