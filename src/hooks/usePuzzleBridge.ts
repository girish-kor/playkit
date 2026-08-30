import { useScript } from './useScript';

/** Scene-bound puzzle state sync (docs/API.md § usePuzzleBridge) — used by `Puzzle`. */
export function usePuzzleBridge<T = unknown>(options: {
  puzzleId: string;
  pcEntity?: string;
}): {
  state: T | undefined;
  setState: (state: T) => void;
  reset: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: `puzzleState.${options.puzzleId}`,
  });
  return {
    state: value as T | undefined,
    setState: (state: T) => setValue(state),
    reset: () => setValue(undefined),
  };
}
