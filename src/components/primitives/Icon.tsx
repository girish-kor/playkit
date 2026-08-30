import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Icon` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Icon, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Icon entry in `COMPONENTS.md`.
 */
export interface IconProps {
  className?: string;
  children?: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLElement, IconProps>(function Icon(_props, _ref) {
  throw new Error(
    'Icon is not implemented yet. See COMPONENTS.md § Component: Icon, and src/components/primitives/Icon.tsx.',
  );
});

Icon.displayName = 'Icon';
