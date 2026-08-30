import { useScript } from './useScript';

/** Loading-progress sync (docs/API.md § useLoadingSync) — used by `Spinner`, `LoadingDots`. */
export function useLoadingSync(options: { pcEntity?: string } = {}): {
  progress: number;
  setProgress: (value: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'loadingProgress',
    initialValue: 0,
  });
  return { progress: (value as number | undefined) ?? 0, setProgress: (v: number) => setValue(v) };
}
