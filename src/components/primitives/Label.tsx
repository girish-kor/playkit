import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Label` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Label, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Label entry in `COMPONENTS.md`.
 */
export interface LabelProps {
  className?: string;
  children?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLElement, LabelProps>(function Label(_props, _ref) {
  throw new Error(
    'Label is not implemented yet. See COMPONENTS.md § Component: Label, and src/components/primitives/Label.tsx.',
  );
});

Label.displayName = 'Label';
