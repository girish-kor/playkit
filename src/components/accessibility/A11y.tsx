import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: A11y` (category: Accessibility).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for A11y, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the A11y entry in `COMPONENTS.md`.
 */
export interface A11yProps {
  className?: string;
  children?: React.ReactNode;
}

export const A11y = React.forwardRef<HTMLElement, A11yProps>(function A11y(_props, _ref) {
  throw new Error(
    'A11y is not implemented yet. See COMPONENTS.md § Component: A11y, and src/components/accessibility/A11y.tsx.',
  );
});

A11y.displayName = 'A11y';
