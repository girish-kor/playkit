import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ErrorMsg` (category: Error).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ErrorMsg, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ErrorMsg entry in `COMPONENTS.md`.
 */
export interface ErrorMsgProps {
  className?: string;
  children?: React.ReactNode;
}

export const ErrorMsg = React.forwardRef<HTMLElement, ErrorMsgProps>(
  function ErrorMsg(_props, _ref) {
    throw new Error(
      'ErrorMsg is not implemented yet. See COMPONENTS.md § Component: ErrorMsg, and src/components/error/ErrorMsg.tsx.',
    );
  },
);

ErrorMsg.displayName = 'ErrorMsg';
