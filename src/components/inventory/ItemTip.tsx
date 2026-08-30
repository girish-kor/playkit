import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ItemTip` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ItemTip, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ItemTip entry in `COMPONENTS.md`.
 */
export interface ItemTipProps {
  className?: string;
  children?: React.ReactNode;
}

export const ItemTip = React.forwardRef<HTMLElement, ItemTipProps>(function ItemTip(_props, _ref) {
  throw new Error(
    'ItemTip is not implemented yet. See COMPONENTS.md § Component: ItemTip, and src/components/inventory/ItemTip.tsx.',
  );
});

ItemTip.displayName = 'ItemTip';
