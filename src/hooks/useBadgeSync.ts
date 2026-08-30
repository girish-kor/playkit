import { useScript } from './useScript';

/** Reads a numeric/status badge value from PlayCanvas (docs/API.md § useBadgeSync). */
export function useBadgeSync(options: { pcEntity?: string } = {}): {
  content: string | number | undefined;
} {
  const { value } = useScript({ entityId: options.pcEntity ?? '', stateKey: 'badgeContent' });
  return { content: value as string | number | undefined };
}
