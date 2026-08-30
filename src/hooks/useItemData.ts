import { useScript } from './useScript';
import type { Item } from '../types';

/** Resolves item data by id from PlayCanvas (docs/API.md § useItemData) — used by `ItemTip`, `ItemComparison`. */
export function useItemData<T = unknown>(options: {
  itemId: string;
  pcEntity?: string;
}): {
  item: Item<T> | undefined;
  loading: boolean;
} {
  const { value, isLoading } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: `itemData.${options.itemId}`,
  });
  return { item: value as Item<T> | undefined, loading: options.pcEntity ? isLoading : false };
}
