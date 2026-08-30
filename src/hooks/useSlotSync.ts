import { useScript } from './useScript';
import type { Item } from '../types';

/** Single inventory-slot sync (docs/API.md § useSlotSync) — used by `ItemSlot`. */
export function useSlotSync<T = unknown>(options: {
  slotIndex: number;
  pcEntity?: string;
}): {
  item: Item<T> | null;
  setItem: (item: Item<T> | null) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: `inventorySlot.${options.slotIndex}`,
  });
  return { item: (value as Item<T> | null | undefined) ?? null, setItem: (item) => setValue(item) };
}
