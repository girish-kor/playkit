import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: RadioGroup` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for RadioGroup, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the RadioGroup entry in `COMPONENTS.md`.
 */
export interface RadioGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLElement, RadioGroupProps>(
  function RadioGroup(_props, _ref) {
    throw new Error(
      'RadioGroup is not implemented yet. See COMPONENTS.md § Component: RadioGroup, and src/components/primitives/RadioGroup.tsx.',
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
