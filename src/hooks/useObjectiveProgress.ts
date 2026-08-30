import { useScript } from './useScript';

/** Single-objective progress sync (docs/API.md § useObjectiveProgress) — used by `Objective`. */
export function useObjectiveProgress(options: { objectiveId: string; pcEntity?: string }): {
  progress: number;
  setProgress: (value: number) => void;
  complete: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: `objectiveProgress.${options.objectiveId}`,
    initialValue: 0,
  });
  return {
    progress: (value as number | undefined) ?? 0,
    setProgress: (v) => setValue(v),
    complete: () => setValue(1),
  };
}
