import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Confirm` (category: Modal).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Confirm, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Confirm entry in `COMPONENTS.md`.
 */
export interface ConfirmProps {
  className?: string;
  children?: React.ReactNode;
}

export const Confirm = React.forwardRef<HTMLElement, ConfirmProps>(function Confirm(_props, _ref) {
  throw new Error(
    'Confirm is not implemented yet. See COMPONENTS.md § Component: Confirm, and src/components/modal/Confirm.tsx.',
  );
});

Confirm.displayName = 'Confirm';
