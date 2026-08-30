import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { cn } from '../../internal/cn';
import { Grid } from '../primitives/Grid';
import { Puzzle } from './Puzzle';

/** Tile-flipping "concentration" memory game with match detection (COMPONENTS.md § Component: MemoryMatch). */
export type MemoryMatchVariant = 'default' | 'timed';

export interface MemoryPair {
  id: string;
  icon: React.ReactNode;
}

interface Tile {
  tileId: string;
  pairId: string;
  icon: React.ReactNode;
}

export interface MemoryMatchProps {
  pairs: MemoryPair[];
  pcEntity?: string;
  columns?: number;
  flipBackDelay?: number;
  maxFlipped?: number;
  className?: string;
  variant?: MemoryMatchVariant;
  timeLimit?: number;
  onFlip?: (tileId: string) => void;
  onMatch?: (pairId: string) => void;
  onMismatch?: (tileIdA: string, tileIdB: string) => void;
  onComplete?: (data: { moves: number; timeElapsed: number }) => void;
  onTimeout?: () => void;
  'aria-label'?: string;
  previewDuration?: number;
  showMoveCounter?: boolean;
}

export function MemoryMatch({
  pairs,
  pcEntity,
  columns,
  flipBackDelay = 1000,
  maxFlipped = 2,
  className,
  variant = 'default',
  timeLimit,
  onFlip,
  onMatch,
  onMismatch,
  onComplete,
  onTimeout,
  'aria-label': ariaLabel = 'Memory match',
  previewDuration = 0,
  showMoveCounter = true,
}: MemoryMatchProps): React.JSX.Element {
  const puzzleId = useStableId('memory-match');
  const { submit } = usePuzzleSubmit<string[]>();

  // Shuffled ONCE per instance (docs/REBUILD-GUIDE.md), not on every render.
  const tiles = React.useMemo<Tile[]>(() => {
    const doubled = pairs.flatMap((pair) => [
      { tileId: `${pair.id}-a`, pairId: pair.id, icon: pair.icon },
      { tileId: `${pair.id}-b`, pairId: pair.id, icon: pair.icon },
    ]);
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j]!, doubled[i]!];
    }
    return doubled;
  }, [pairs]);

  const cols = columns ?? Math.ceil(Math.sqrt(tiles.length));

  const [flipped, setFlipped] = React.useState<string[]>(
    previewDuration > 0 ? tiles.map((t) => t.tileId) : [],
  );
  const [matched, setMatched] = React.useState<Set<string>>(new Set());
  const [moves, setMoves] = React.useState(0);
  const startTimeRef = React.useRef(Date.now());

  React.useEffect(() => {
    if (previewDuration <= 0) return;
    const id = setTimeout(() => setFlipped([]), previewDuration);
    return () => clearTimeout(id);
  }, [previewDuration]);

  React.useEffect(() => {
    if (variant !== 'timed' || !timeLimit) return;
    const id = setTimeout(() => onTimeout?.(), timeLimit * 1000);
    return () => clearTimeout(id);
  }, [variant, timeLimit, onTimeout]);

  const isComplete = matched.size === pairs.length;
  React.useEffect(() => {
    if (isComplete)
      onComplete?.({ moves, timeElapsed: (Date.now() - startTimeRef.current) / 1000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once when completion is reached.
  }, [isComplete]);

  const flip = (tile: Tile) => {
    if (flipped.length >= maxFlipped || flipped.includes(tile.tileId) || matched.has(tile.pairId))
      return;
    onFlip?.(tile.tileId);
    const next = [...flipped, tile.tileId];
    setFlipped(next);

    if (next.length === maxFlipped) {
      setMoves((m) => m + 1);
      const flippedTiles = next.map((id) => tiles.find((t) => t.tileId === id)!);
      const allSamePair = flippedTiles.every((t) => t.pairId === flippedTiles[0]!.pairId);
      if (allSamePair) {
        void submit(next, () => true);
        setMatched((prev) => new Set(prev).add(flippedTiles[0]!.pairId));
        onMatch?.(flippedTiles[0]!.pairId);
        setFlipped([]);
      } else {
        setTimeout(() => {
          onMismatch?.(next[0]!, next[1]!);
          setFlipped([]);
        }, flipBackDelay);
      }
    }
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="pattern"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <Grid role="grid" aria-label={ariaLabel} cols={cols} gap={2}>
        {tiles.map((tile) => {
          const isFaceUp = flipped.includes(tile.tileId) || matched.has(tile.pairId);
          const isMatched = matched.has(tile.pairId);
          return (
            <button
              key={tile.tileId}
              type="button"
              role="gridcell"
              aria-label={isMatched ? 'Matched' : isFaceUp ? 'Face up' : 'Face down'}
              disabled={isMatched}
              onClick={() => flip(tile)}
              className={cn(
                'aspect-square rounded-lg bg-gray-700 transition-transform flex items-center justify-center',
                isMatched && 'opacity-50 pointer-events-none',
              )}
            >
              {isFaceUp ? tile.icon : null}
            </button>
          );
        })}
      </Grid>
      {showMoveCounter && <div className="text-sm text-gray-400 mt-2">Moves: {moves}</div>}
    </Puzzle>
  );
}

MemoryMatch.displayName = 'MemoryMatch';
