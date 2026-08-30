import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: SkipLink` (category: Accessibility).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for SkipLink, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the SkipLink entry in `COMPONENTS.md`.
 */
export interface SkipLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export const SkipLink = React.forwardRef<HTMLElement, SkipLinkProps>(
  function SkipLink(_props, _ref) {
    throw new Error(
      'SkipLink is not implemented yet. See COMPONENTS.md § Component: SkipLink, and src/components/accessibility/SkipLink.tsx.',
    );
  },
);

SkipLink.displayName = 'SkipLink';
