import { useScript } from './useScript';

/**
 * Sliding-tile-board sync (COMPONENTS.md § Hook: useSliderSync -- "Returns:
 * `{ tiles: number[], move: (from: number, to: number) => void }`") -- used by
 * `SliderPuzzle`. `move` swaps the tiles at the two given indices and persists the
 * result; `SliderPuzzle` itself decides which two indices form a valid move.
 */
export function useSliderSync(options: { pcEntity?: string } = {}): {
  tiles: number[];
  move: (from: number, to: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'sliderTiles',
    initialValue: [] as number[],
  });
  const tiles = (value as number[] | undefined) ?? [];
  return {
    tiles,
    move: (from: number, to: number) => {
      if (tiles[from] === undefined || tiles[to] === undefined) return;
      const next = [...tiles];
      [next[from], next[to]] = [next[to]!, next[from]!];
      setValue(next);
    },
  };
}
