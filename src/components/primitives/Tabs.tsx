import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Tabs` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Tabs, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Tabs entry in `COMPONENTS.md`.
 */
export interface TabsProps {
  className?: string;
  children?: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLElement, TabsProps>(function Tabs(_props, _ref) {
  throw new Error(
    'Tabs is not implemented yet. See COMPONENTS.md § Component: Tabs, and src/components/primitives/Tabs.tsx.',
  );
});

Tabs.displayName = 'Tabs';
