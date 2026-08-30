import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Choice` (category: Dialogue).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Choice, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Choice entry in `COMPONENTS.md`.
 */
export interface ChoiceProps {
  className?: string;
  children?: React.ReactNode;
}

export const Choice = React.forwardRef<HTMLElement, ChoiceProps>(function Choice(_props, _ref) {
  throw new Error(
    'Choice is not implemented yet. See COMPONENTS.md § Component: Choice, and src/components/dialogue/Choice.tsx.',
  );
});

Choice.displayName = 'Choice';
