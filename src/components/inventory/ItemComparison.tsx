import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ItemComparison` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ItemComparison, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ItemComparison entry in `COMPONENTS.md`.
 */
export interface ItemComparisonProps {
  className?: string;
  children?: React.ReactNode;
}

export const ItemComparison = React.forwardRef<HTMLElement, ItemComparisonProps>(
  function ItemComparison(_props, _ref) {
    throw new Error(
      'ItemComparison is not implemented yet. See COMPONENTS.md § Component: ItemComparison, and src/components/inventory/ItemComparison.tsx.',
    );
  },
);

ItemComparison.displayName = 'ItemComparison';
