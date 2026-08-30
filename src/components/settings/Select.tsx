import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Select` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Select, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Select entry in `COMPONENTS.md`.
 */
export interface SelectProps {
  className?: string;
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLElement, SelectProps>(function Select(_props, _ref) {
  throw new Error(
    'Select is not implemented yet. See COMPONENTS.md § Component: Select, and src/components/settings/Select.tsx.',
  );
});

Select.displayName = 'Select';
