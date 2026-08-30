import { useScript } from './useScript';

/** Scene-bound stopwatch sync (docs/API.md § useStopwatchSync) — used by `Stopwatch`. */
export function useStopwatchSync(options: { pcEntity?: string } = {}): {
  elapsed: number;
  laps: number[];
  setElapsed: (t: number) => void;
} {
  const elapsed = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'stopwatchElapsed',
    initialValue: 0,
  });
  const laps = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'stopwatchLaps',
    initialValue: [] as number[],
  });
  return {
    elapsed: (elapsed.value as number | undefined) ?? 0,
    laps: (laps.value as number[] | undefined) ?? [],
    setElapsed: (t) => elapsed.setValue(t),
  };
}
