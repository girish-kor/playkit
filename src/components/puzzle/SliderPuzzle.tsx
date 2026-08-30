import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { useSliderSync } from '../../hooks/useSliderSync';
import { cn } from '../../internal/cn';
import { Puzzle } from './Puzzle';

/** Sliding tile puzzle (3x3, 4x4, 5x5) with tile animations (COMPONENTS.md § Component: SliderPuzzle). */
export interface SliderPuzzleProps {
  size: 3 | 4 | 5;
  tiles?: number[];
  pcEntity?: string;
  imageUrl?: string;
  className?: string;
  onTileMove?: (from: number, to: number) => void;
  onTileClick?: (tileIndex: number) => void;
  onTileHover?: (tileIndex: number | null) => void;
  onTileFocus?: (tileIndex: number) => void;
  onShuffle?: () => void;
  onSolve?: () => void;
  onSolved?: () => void;
  onMovesChange?: (moves: number) => void;
  'aria-label'?: string;
  animationDuration?: number;
  scrambleCount?: number;
  showMoves?: boolean;
  parityCheck?: boolean;
}

function defaultTiles(size: number): number[] {
  return Array.from({ length: size * size }, (_, i) => i);
}

function isSolvable(tiles: number[], size: number): boolean {
  const flat = tiles.filter((t) => t !== 0);
  let inversions = 0;
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i]! > flat[j]!) inversions++;
    }
  }
  if (size % 2 === 1) return inversions % 2 === 0;
  const emptyRow = Math.floor(tiles.indexOf(0) / size);
  return (inversions + emptyRow) % 2 === 1;
}

function shuffle(size: number, scrambleCount: number): number[] {
  const tiles = defaultTiles(size);
  let emptyIndex = tiles.indexOf(0);
  for (let i = 0; i < scrambleCount; i++) {
    const neighbors = neighborIndices(emptyIndex, size);
    const swapWith = neighbors[Math.floor(Math.random() * neighbors.length)]!;
    [tiles[emptyIndex], tiles[swapWith]] = [tiles[swapWith]!, tiles[emptyIndex]!];
    emptyIndex = swapWith;
  }
  return tiles;
}

function neighborIndices(index: number, size: number): number[] {
  const row = Math.floor(index / size);
  const col = index % size;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - size);
  if (row < size - 1) neighbors.push(index + size);
  if (col > 0) neighbors.push(index - 1);
  if (col < size - 1) neighbors.push(index + 1);
  return neighbors;
}

export function SliderPuzzle({
  size,
  tiles: tilesProp,
  pcEntity,
  imageUrl,
  className,
  onTileMove,
  onTileClick,
  onTileHover,
  onTileFocus,
  onShuffle,
  onSolve,
  onSolved,
  onMovesChange,
  'aria-label': ariaLabel = 'Sliding puzzle',
  scrambleCount = 100,
  showMoves = true,
  parityCheck = true,
}: SliderPuzzleProps): React.JSX.Element {
  const puzzleId = useStableId('slider-puzzle');
  const synced = useSliderSync({ pcEntity });

  const [tiles, setTiles] = React.useState<number[]>(
    () => tilesProp ?? shuffle(size, scrambleCount),
  );
  const [moves, setMoves] = React.useState(0);
  const solvedTarget = React.useMemo(() => defaultTiles(size), [size]);
  const isSolved = React.useMemo(
    () => tiles.every((t, i) => t === solvedTarget[i]),
    [tiles, solvedTarget],
  );

  React.useEffect(() => {
    if (tilesProp) setTiles(tilesProp);
  }, [tilesProp]);

  React.useEffect(() => {
    if (isSolved) {
      onSolve?.();
      onSolved?.();
    }
  }, [isSolved, onSolve, onSolved]);

  const moveTile = (tileIndex: number) => {
    const emptyIndex = tiles.indexOf(0);
    if (!neighborIndices(tileIndex, size).includes(emptyIndex)) return;
    const next = [...tiles];
    [next[tileIndex], next[emptyIndex]] = [next[emptyIndex]!, next[tileIndex]!];
    setTiles(next);
    if (pcEntity) synced.move(tileIndex, emptyIndex);
    setMoves((m) => {
      const nm = m + 1;
      onMovesChange?.(nm);
      return nm;
    });
    onTileMove?.(tileIndex, emptyIndex);
    onTileClick?.(tileIndex);
  };

  const reshuffle = () => {
    let next = shuffle(size, scrambleCount);
    if (parityCheck && !isSolvable(next, size)) next = shuffle(size, scrambleCount);
    setTiles(next);
    setMoves(0);
    onShuffle?.();
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="logic"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <div
        role="grid"
        aria-label={ariaLabel}
        aria-rowcount={size}
        aria-colcount={size}
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            type="button"
            role="gridcell"
            aria-label={tile === 0 ? 'Empty' : `Tile ${tile}`}
            disabled={tile === 0}
            onClick={() => moveTile(index)}
            onMouseEnter={() => onTileHover?.(tile === 0 ? null : index)}
            onMouseLeave={() => onTileHover?.(null)}
            onFocus={() => onTileFocus?.(index)}
            className={cn(
              'aspect-square border transition-transform',
              tile === 0
                ? 'bg-transparent border-transparent'
                : 'bg-gray-200 text-gray-900 font-semibold',
            )}
            style={
              imageUrl && tile !== 0
                ? { backgroundImage: `url(${imageUrl})`, backgroundSize: `${size * 100}%` }
                : undefined
            }
          >
            {!imageUrl && tile !== 0 && tile}
          </button>
        ))}
      </div>
      {showMoves && <div className="text-sm text-gray-400 mt-2">Moves: {moves}</div>}
      <button type="button" className="text-sm text-blue-400 mt-1" onClick={reshuffle}>
        Shuffle
      </button>
    </Puzzle>
  );
}

SliderPuzzle.displayName = 'SliderPuzzle';
