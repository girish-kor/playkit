import { useScript } from './useScript';
import type { Objective } from '../types';

/** Objectives-list sync (docs/API.md § useObjectiveSync) — used by `Objectives`. */
export function useObjectiveSync(options: { pcEntity?: string } = {}): {
  objectives: Objective[];
  updateObjective: (id: string, patch: Partial<Objective>) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'objectives',
    initialValue: [] as Objective[],
  });
  const objectives = (value as Objective[] | undefined) ?? [];

  return {
    objectives,
    updateObjective: (id, patch) =>
      setValue(objectives.map((o) => (o.id === id ? { ...o, ...patch } : o))),
  };
}
