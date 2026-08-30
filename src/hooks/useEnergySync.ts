import { useScript } from './useScript';

/** Bidirectional energy sync (docs/API.md § useEnergySync) — used by `Energy`. */
export function useEnergySync(options: { pcEntity?: string } = {}): {
  energy: number;
  setEnergy: (value: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'energy',
    initialValue: 1,
  });
  return { energy: (value as number | undefined) ?? 1, setEnergy: (v: number) => setValue(v) };
}
