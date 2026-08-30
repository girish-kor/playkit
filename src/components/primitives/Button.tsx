import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Button` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Button, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Button entry in `COMPONENTS.md`.
 */
export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(_props, _ref) {
  throw new Error(
    'Button is not implemented yet. See COMPONENTS.md § Component: Button, and src/components/primitives/Button.tsx.',
  );
});

Button.displayName = 'Button';
