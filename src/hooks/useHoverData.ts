import { useScript } from './useScript';

/** Resolves scene-sourced hover-card data (docs/API.md § useHoverData) — used by `HoverCard`. */
export function useHoverData<T = unknown>(
  options: { pcEntity?: string } = {},
): {
  data: T | undefined;
  loading: boolean;
} {
  const { value, isLoading } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'hoverData',
  });
  return { data: value as T | undefined, loading: options.pcEntity ? isLoading : false };
}
