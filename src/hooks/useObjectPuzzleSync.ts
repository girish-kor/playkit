import { useScript } from './useScript';

/** Object-placement sync (docs/API.md § useObjectPuzzleSync) — used by `ObjectPuzzle`. */
export function useObjectPuzzleSync(options: { pcEntity?: string } = {}): {
  placed: Record<string, string>;
  place: (objectId: string, slotId: string) => void;
  pick: (objectId: string) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'objectPuzzlePlacements',
    initialValue: {} as Record<string, string>,
  });
  const placed = (value as Record<string, string> | undefined) ?? {};
  return {
    placed,
    place: (objectId, slotId) => setValue({ ...placed, [objectId]: slotId }),
    pick: (objectId) => {
      const next = { ...placed };
      delete next[objectId];
      setValue(next);
    },
  };
}
