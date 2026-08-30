import { useScript } from './useScript';

/** Generic progress-value sync (docs/API.md § useProgressSync) — used by `Progress`. */
export function useProgressSync(options: { pcEntity?: string } = {}): {
  value: number;
  setValue: (value: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'progressValue',
    initialValue: 0,
  });
  return { value: (value as number | undefined) ?? 0, setValue: (v: number) => setValue(v) };
}
