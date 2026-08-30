import { useScript } from './useScript';

/** Sliding-tile-board sync (docs/API.md § useSliderSync) — used by `SliderPuzzle`. */
export function useSliderSync(options: { pcEntity?: string } = {}): {
  tiles: number[];
  move: (index: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'sliderTiles',
    initialValue: [] as number[],
  });
  const tiles = (value as number[] | undefined) ?? [];
  return {
    tiles,
    move: (index: number) => {
      // The board's own move-validity logic lives in the SliderPuzzle component
      // (docs/COMPONENTS.md); this hook only persists whatever tile order it's given.
      setValue(tiles);
      void index;
    },
  };
}
