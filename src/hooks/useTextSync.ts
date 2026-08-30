import { useScript } from './useScript';

/** Syncs text content to a PlayCanvas TextComponent (docs/API.md § useTextSync). */
export function useTextSync(options: { pcEntity?: string } = {}): {
  setText: (text: string) => void;
} {
  const { setValue } = useScript({ entityId: options.pcEntity ?? '', stateKey: 'text' });
  return { setText: (text: string) => setValue(text) };
}
