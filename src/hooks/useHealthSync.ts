import { useScript } from './useScript';

/** Bidirectional health sync (docs/API.md § useHealthSync) — used by `Health`. */
export function useHealthSync(options: { pcEntity?: string } = {}): {
  health: number;
  setHealth: (value: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'health',
    initialValue: 1,
  });
  return { health: (value as number | undefined) ?? 1, setHealth: (v: number) => setValue(v) };
}
