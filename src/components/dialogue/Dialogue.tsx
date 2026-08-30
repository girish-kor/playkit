import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Dialogue` (category: Dialogue).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Dialogue, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Dialogue entry in `COMPONENTS.md`.
 */
export interface DialogueProps {
  className?: string;
  children?: React.ReactNode;
}

export const Dialogue = React.forwardRef<HTMLElement, DialogueProps>(
  function Dialogue(_props, _ref) {
    throw new Error(
      'Dialogue is not implemented yet. See COMPONENTS.md § Component: Dialogue, and src/components/dialogue/Dialogue.tsx.',
    );
  },
);

Dialogue.displayName = 'Dialogue';
