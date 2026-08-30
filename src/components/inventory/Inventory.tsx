import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Inventory` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Inventory, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Inventory entry in `COMPONENTS.md`.
 */
export interface InventoryProps {
  className?: string;
  children?: React.ReactNode;
}

export const Inventory = React.forwardRef<HTMLElement, InventoryProps>(
  function Inventory(_props, _ref) {
    throw new Error(
      'Inventory is not implemented yet. See COMPONENTS.md § Component: Inventory, and src/components/inventory/Inventory.tsx.',
    );
  },
);

Inventory.displayName = 'Inventory';
