import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Input` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Input, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Input entry in `COMPONENTS.md`.
 */
export interface InputProps {
  className?: string;
  children?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLElement, InputProps>(function Input(_props, _ref) {
  throw new Error(
    'Input is not implemented yet. See COMPONENTS.md § Component: Input, and src/components/primitives/Input.tsx.',
  );
});

Input.displayName = 'Input';
