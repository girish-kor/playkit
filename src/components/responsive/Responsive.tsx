import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Responsive` (category: Responsive).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Responsive, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Responsive entry in `COMPONENTS.md`.
 */
export interface ResponsiveProps {
  className?: string;
  children?: React.ReactNode;
}

export const Responsive = React.forwardRef<HTMLElement, ResponsiveProps>(
  function Responsive(_props, _ref) {
    throw new Error(
      'Responsive is not implemented yet. See COMPONENTS.md § Component: Responsive, and src/components/responsive/Responsive.tsx.',
    );
  },
);

Responsive.displayName = 'Responsive';
