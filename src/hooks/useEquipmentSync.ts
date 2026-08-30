import { useScript } from './useScript';
import type { Item } from '../types';

/** Equipped-items sync (docs/API.md § useEquipmentSync) — used by `EquipmentSlots`. */
export function useEquipmentSync<T = unknown>(
  options: { pcEntity?: string } = {},
): {
  equipped: Record<string, Item<T> | null>;
  equip: (slotId: string, item: Item<T>) => void;
  unequip: (slotId: string) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'equipped',
    initialValue: {} as Record<string, Item<T> | null>,
  });
  const equipped = (value as Record<string, Item<T> | null> | undefined) ?? {};
  return {
    equipped,
    equip: (slotId, item) => setValue({ ...equipped, [slotId]: item }),
    unequip: (slotId) => setValue({ ...equipped, [slotId]: null }),
  };
}
