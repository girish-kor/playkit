import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Accordion` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Accordion, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Accordion entry in `COMPONENTS.md`.
 */
export interface AccordionProps {
  className?: string;
  children?: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLElement, AccordionProps>(
  function Accordion(_props, _ref) {
    throw new Error(
      'Accordion is not implemented yet. See COMPONENTS.md § Component: Accordion, and src/components/primitives/Accordion.tsx.',
    );
  },
);

Accordion.displayName = 'Accordion';
