import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Slot` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Slot, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Slot entry in `COMPONENTS.md`.
 */
export interface SlotProps {
  className?: string;
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(_props, _ref) {
  throw new Error(
    'Slot is not implemented yet. See COMPONENTS.md § Component: Slot, and src/components/primitives/Slot.tsx.',
  );
});

Slot.displayName = 'Slot';
