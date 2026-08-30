import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: FocusTrap` (category: Accessibility).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for FocusTrap, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the FocusTrap entry in `COMPONENTS.md`.
 */
export interface FocusTrapProps {
  className?: string;
  children?: React.ReactNode;
}

export const FocusTrap = React.forwardRef<HTMLElement, FocusTrapProps>(
  function FocusTrap(_props, _ref) {
    throw new Error(
      'FocusTrap is not implemented yet. See COMPONENTS.md § Component: FocusTrap, and src/components/accessibility/FocusTrap.tsx.',
    );
  },
);

FocusTrap.displayName = 'FocusTrap';
