import { useScript } from './useScript';
import type { Item } from '../types';

/** Loot-container sync (docs/API.md § useLootSync) — used by `LootContainer`. */
export function useLootSync<T = unknown>(
  options: { pcEntity?: string } = {},
): {
  items: Array<Item<T>>;
  take: (itemId: string) => void;
  deposit: (item: Item<T>) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'lootItems',
    initialValue: [] as Array<Item<T>>,
  });
  const items = (value as Array<Item<T>> | undefined) ?? [];
  return {
    items,
    take: (itemId) => setValue(items.filter((i) => i.id !== itemId)),
    deposit: (item) => setValue([...items, item]),
  };
}
