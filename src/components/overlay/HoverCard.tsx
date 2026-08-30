import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: HoverCard` (category: Overlay).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for HoverCard, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the HoverCard entry in `COMPONENTS.md`.
 */
export interface HoverCardProps {
  className?: string;
  children?: React.ReactNode;
}

export const HoverCard = React.forwardRef<HTMLElement, HoverCardProps>(
  function HoverCard(_props, _ref) {
    throw new Error(
      'HoverCard is not implemented yet. See COMPONENTS.md § Component: HoverCard, and src/components/overlay/HoverCard.tsx.',
    );
  },
);

HoverCard.displayName = 'HoverCard';
