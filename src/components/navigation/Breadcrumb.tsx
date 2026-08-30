import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Breadcrumb` (category: Navigation).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Breadcrumb, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Breadcrumb entry in `COMPONENTS.md`.
 */
export interface BreadcrumbProps {
  className?: string;
  children?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(_props, _ref) {
    throw new Error(
      'Breadcrumb is not implemented yet. See COMPONENTS.md § Component: Breadcrumb, and src/components/navigation/Breadcrumb.tsx.',
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
