import { useScript } from './useScript';
import type { Item } from '../types';

/** Whole-inventory sync (docs/API.md § useInventorySync) — used by `Inventory`. */
export function useInventorySync<T = unknown>(
  options: { pcEntity?: string } = {},
): {
  items: Array<Item<T> | null>;
  setItems: (items: Array<Item<T> | null>) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'inventoryItems',
    initialValue: [] as Array<Item<T> | null>,
  });
  return {
    items: (value as Array<Item<T> | null> | undefined) ?? [],
    setItems: (items) => setValue(items),
  };
}
