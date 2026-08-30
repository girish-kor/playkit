import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: EquipmentSlots` (category: Inventory).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for EquipmentSlots, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the EquipmentSlots entry in `COMPONENTS.md`.
 */
export interface EquipmentSlotsProps {
  className?: string;
  children?: React.ReactNode;
}

export const EquipmentSlots = React.forwardRef<HTMLElement, EquipmentSlotsProps>(
  function EquipmentSlots(_props, _ref) {
    throw new Error(
      'EquipmentSlots is not implemented yet. See COMPONENTS.md § Component: EquipmentSlots, and src/components/inventory/EquipmentSlots.tsx.',
    );
  },
);

EquipmentSlots.displayName = 'EquipmentSlots';
