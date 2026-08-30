import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Grid } from '../primitives/Grid';
import { Text } from '../primitives/Text';
import { Puzzle } from './Puzzle';
import type { CrosswordClue } from '../../types';

/** Anagram, crossword, or letter-grid word puzzle (COMPONENTS.md § Component: WordPuzzle). */
export type WordPuzzleMode = 'anagram' | 'crossword' | 'letter-grid';

export interface WordPuzzleProps {
  mode: WordPuzzleMode;
  letters?: string[];
  targetWords?: string[];
  grid?: string[][];
  clues?: CrosswordClue[];
  pcEntity?: string;
  caseSensitive?: boolean;
  className?: string;
  onWordFound?: (word: string) => void;
  onWordSelect?: (cells: { row: number; col: number }[]) => void;
  onComplete?: () => void;
  onInvalidWord?: (attempt: string) => void;
  'aria-label'?: string;
  showFoundWordsList?: boolean;
  allowDiagonal?: boolean;
  shuffleLetters?: boolean;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function WordPuzzle({
  mode,
  letters = [],
  targetWords = [],
  grid,
  clues = [],
  pcEntity,
  caseSensitive = false,
  className,
  onWordFound,
  onWordSelect,
  onComplete,
  onInvalidWord,
  'aria-label': ariaLabel = 'Word puzzle',
  showFoundWordsList = true,
  shuffleLetters = true,
}: WordPuzzleProps): React.JSX.Element {
  const puzzleId = useStableId('word-puzzle');
  const { submit } = usePuzzleSubmit<string>();
  const [foundWords, setFoundWords] = React.useState<Set<string>>(new Set());
  const [selection, setSelection] = React.useState<{ row: number; col: number }[]>([]);
  const [displayLetters] = React.useState(() => (shuffleLetters ? shuffleArray(letters) : letters));
  const [anagramInput, setAnagramInput] = React.useState('');

  const normalize = (word: string) => (caseSensitive ? word : word.toLowerCase());

  const checkWord = async (word: string) => {
    const valid = await submit(word, (candidate) =>
      targetWords.some((t) => normalize(t) === normalize(candidate)),
    );
    if (valid) {
      setFoundWords((prev) => {
        const next = new Set(prev).add(normalize(word));
        if (next.size === targetWords.length) onComplete?.();
        return next;
      });
      onWordFound?.(word);
    } else {
      onInvalidWord?.(word);
    }
  };

  const toggleCell = (row: number, col: number) => {
    const next = [...selection, { row, col }];
    setSelection(next);
    onWordSelect?.(next);
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="pattern"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      {mode === 'anagram' && (
        <div role="group" aria-label={ariaLabel} className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {displayLetters.map((letter, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onPress={() => setAnagramInput((v) => v + letter)}
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </div>
          <Text className="text-white uppercase font-bold">{anagramInput}</Text>
          <div className="flex gap-2">
            <Button onPress={() => void checkWord(anagramInput)}>Submit</Button>
            <Button variant="ghost" onPress={() => setAnagramInput('')}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {(mode === 'letter-grid' || mode === 'crossword') && grid && (
        <Grid role="grid" aria-label={ariaLabel} cols={grid[0]?.length ?? 1} gap={1}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}, letter ${cell || 'blocked'}`}
                disabled={!cell}
                onClick={() => toggleCell(rowIndex, colIndex)}
                className={cn(
                  'w-10 h-10 text-center uppercase font-bold border rounded',
                  !cell && 'bg-gray-900 border-transparent',
                  selection.some((s) => s.row === rowIndex && s.col === colIndex) &&
                    'bg-green-600/40',
                )}
              >
                {cell}
              </button>
            )),
          )}
        </Grid>
      )}

      {mode === 'crossword' && clues.length > 0 && (
        <ul className="mt-2 text-sm text-gray-300">
          {clues.map((clue) => (
            <li key={`${clue.word}-${clue.direction}`}>
              {clue.direction}: {clue.clue}
            </li>
          ))}
        </ul>
      )}

      {showFoundWordsList && (
        <div aria-live="polite" className="text-sm text-gray-400 mt-2">
          Found {foundWords.size} / {targetWords.length}
        </div>
      )}
    </Puzzle>
  );
}

WordPuzzle.displayName = 'WordPuzzle';
