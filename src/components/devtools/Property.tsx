import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Property` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Property, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Property entry in `COMPONENTS.md`.
 */
export interface PropertyProps {
  className?: string;
  children?: React.ReactNode;
}

export const Property = React.forwardRef<HTMLElement, PropertyProps>(
  function Property(_props, _ref) {
    throw new Error(
      'Property is not implemented yet. See COMPONENTS.md § Component: Property, and src/components/devtools/Property.tsx.',
    );
  },
);

Property.displayName = 'Property';
