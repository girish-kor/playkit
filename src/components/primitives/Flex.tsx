import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Flex` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Flex, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Flex entry in `COMPONENTS.md`.
 */
export interface FlexProps {
  className?: string;
  children?: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(_props, _ref) {
  throw new Error(
    'Flex is not implemented yet. See COMPONENTS.md § Component: Flex, and src/components/primitives/Flex.tsx.',
  );
});

Flex.displayName = 'Flex';
