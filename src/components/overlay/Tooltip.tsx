import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Tooltip` (category: Overlay).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Tooltip, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Tooltip entry in `COMPONENTS.md`.
 */
export interface TooltipProps {
  className?: string;
  children?: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(function Tooltip(_props, _ref) {
  throw new Error(
    'Tooltip is not implemented yet. See COMPONENTS.md § Component: Tooltip, and src/components/overlay/Tooltip.tsx.',
  );
});

Tooltip.displayName = 'Tooltip';
