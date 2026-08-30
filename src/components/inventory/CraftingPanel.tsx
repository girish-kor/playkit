import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: CraftingPanel` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for CraftingPanel, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the CraftingPanel entry in `COMPONENTS.md`.
 */
export interface CraftingPanelProps {
  className?: string;
  children?: React.ReactNode;
}

export const CraftingPanel = React.forwardRef<HTMLElement, CraftingPanelProps>(
  function CraftingPanel(_props, _ref) {
    throw new Error(
      'CraftingPanel is not implemented yet. See COMPONENTS.md § Component: CraftingPanel, and src/components/inventory/CraftingPanel.tsx.',
    );
  },
);

CraftingPanel.displayName = 'CraftingPanel';
