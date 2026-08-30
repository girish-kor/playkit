import { useScript } from './useScript';

/** Syncs icon name/color to a PlayCanvas IconComponent (docs/API.md § useIconSync). */
export function useIconSync(options: { pcEntity?: string } = {}): {
  setIcon: (name: string) => void;
} {
  const { setValue } = useScript({ entityId: options.pcEntity ?? '', stateKey: 'icon' });
  return { setIcon: (name: string) => setValue(name) };
}
