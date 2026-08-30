import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ItemSlot` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ItemSlot, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ItemSlot entry in `COMPONENTS.md`.
 */
export interface ItemSlotProps {
  className?: string;
  children?: React.ReactNode;
}

export const ItemSlot = React.forwardRef<HTMLElement, ItemSlotProps>(
  function ItemSlot(_props, _ref) {
    throw new Error(
      'ItemSlot is not implemented yet. See COMPONENTS.md § Component: ItemSlot, and src/components/inventory/ItemSlot.tsx.',
    );
  },
);

ItemSlot.displayName = 'ItemSlot';
