import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Checkbox` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Checkbox, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Checkbox entry in `COMPONENTS.md`.
 */
export interface CheckboxProps {
  className?: string;
  children?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  function Checkbox(_props, _ref) {
    throw new Error(
      'Checkbox is not implemented yet. See COMPONENTS.md § Component: Checkbox, and src/components/primitives/Checkbox.tsx.',
    );
  },
);

Checkbox.displayName = 'Checkbox';
