import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Toast` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Toast, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Toast entry in `COMPONENTS.md`.
 */
export interface ToastProps {
  className?: string;
  children?: React.ReactNode;
}

export const Toast = React.forwardRef<HTMLElement, ToastProps>(function Toast(_props, _ref) {
  throw new Error(
    'Toast is not implemented yet. See COMPONENTS.md § Component: Toast, and src/components/feedback/Toast.tsx.',
  );
});

Toast.displayName = 'Toast';
