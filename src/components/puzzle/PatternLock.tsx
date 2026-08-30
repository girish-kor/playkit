import * as React from 'react';

import { useStableId } from '../../internal/useStableId';
import { useDrag } from '@use-gesture/react';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { cn } from '../../internal/cn';
import { Puzzle } from './Puzzle';

/**
 * Android-style grid pattern-drawing lock (COMPONENTS.md § Component: PatternLock).
 * The pointer-drag interaction has no native keyboard equivalent, so a
 * keyboard-accessible sequential dot-selection mode is mandatory, not optional
 * (docs/ACCESSIBILITY.md).
 */
export type PatternLockVariant = 'default' | 'invisible';

export interface PatternLockProps {
  gridSize?: number;
  correctPattern: number[];
  pcEntity?: string;
  minLength?: number;
  className?: string;
  variant?: PatternLockVariant;
  onDotConnect?: (dotIndex: number) => void;
  onPatternComplete?: (pattern: number[]) => void;
  onSuccess?: () => void;
  onFailure?: (attempt: number[]) => void;
  'aria-label'?: string;
  allowRetry?: boolean;
  maxAttempts?: number;
  onLockout?: (lockoutSeconds: number) => void;
  lockoutDuration?: number;
}

export function PatternLock({
  gridSize = 3,
  correctPattern,
  pcEntity,
  minLength = 4,
  className,
  variant = 'default',
  onDotConnect,
  onPatternComplete,
  onSuccess,
  onFailure,
  'aria-label': ariaLabel = 'Pattern lock',
  allowRetry = true,
  maxAttempts = 5,
  onLockout,
  lockoutDuration = 30,
}: PatternLockProps): React.JSX.Element {
  const puzzleId = useStableId('pattern-lock');
  const { submit } = usePuzzleSubmit<number[]>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pattern, setPattern] = React.useState<number[]>([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [attempts, setAttempts] = React.useState(0);
  const [isLockedOut, setIsLockedOut] = React.useState(false);
  const [keyboardMode, setKeyboardMode] = React.useState(false);

  const dotCount = gridSize * gridSize;
  const dotPositions = React.useMemo(
    () =>
      Array.from({ length: dotCount }, (_, i) => ({
        row: Math.floor(i / gridSize),
        col: i % gridSize,
      })),
    [dotCount, gridSize],
  );

  const complete = React.useCallback(
    async (candidate: number[]) => {
      onPatternComplete?.(candidate);
      if (candidate.length < minLength) return;
      const valid = await submit(
        candidate,
        (c) => c.length === correctPattern.length && c.every((v, i) => v === correctPattern[i]),
      );
      if (valid) {
        onSuccess?.();
      } else {
        onFailure?.(candidate);
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        if (maxAttempts > 0 && nextAttempts >= maxAttempts) {
          setIsLockedOut(true);
          onLockout?.(lockoutDuration);
          setTimeout(() => {
            setIsLockedOut(false);
            setAttempts(0);
          }, lockoutDuration * 1000);
        }
      }
      if (!allowRetry || valid) return;
    },
    [
      submit,
      correctPattern,
      minLength,
      onPatternComplete,
      onSuccess,
      onFailure,
      attempts,
      maxAttempts,
      onLockout,
      lockoutDuration,
      allowRetry,
    ],
  );

  const addDot = (index: number) => {
    if (isLockedOut || pattern.includes(index)) return;
    const next = [...pattern, index];
    setPattern(next);
    onDotConnect?.(index);
  };

  const bind = useDrag(
    ({ first, last, xy }) => {
      if (isLockedOut) return;
      if (first) {
        setIsDrawing(true);
        setPattern([]);
      }
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const cellSize = rect.width / gridSize;
        const col = Math.floor((xy[0] - rect.left) / cellSize);
        const row = Math.floor((xy[1] - rect.top) / cellSize);
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
          addDot(row * gridSize + col);
        }
      }
      if (last) {
        setIsDrawing(false);
        void complete(pattern);
      }
    },
    { enabled: !isLockedOut },
  );

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="pattern"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <div
        role="application"
        aria-label={ariaLabel}
        aria-describedby={`${puzzleId}-instructions`}
        aria-disabled={isLockedOut}
        className={cn('relative', className)}
      >
        <p id={`${puzzleId}-instructions`} className="sr-only">
          Draw a pattern by dragging across dots, or press the toggle button to switch to sequential
          dot-selection mode for keyboard-only input.
        </p>
        <button
          type="button"
          className="text-xs text-blue-400 mb-2"
          onClick={() => setKeyboardMode((v) => !v)}
        >
          {keyboardMode ? 'Switch to drag mode' : 'Switch to keyboard mode'}
        </button>
        <div
          ref={containerRef}
          {...(keyboardMode ? {} : bind())}
          className="grid gap-8 relative touch-none"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {dotPositions.map((_, index) => {
            const connected = pattern.includes(index);
            return (
              <button
                key={index}
                type="button"
                tabIndex={keyboardMode ? 0 : -1}
                aria-label={`Dot ${index + 1}${connected ? ', connected' : ''}`}
                onClick={() => keyboardMode && addDot(index)}
                disabled={isLockedOut}
                className={cn(
                  'w-4 h-4 rounded-full',
                  variant === 'invisible' && !isDrawing
                    ? 'bg-transparent'
                    : connected
                      ? 'bg-blue-500'
                      : 'bg-gray-500',
                )}
              />
            );
          })}
          {(variant === 'default' || isDrawing) && !keyboardMode && (
            <svg className="absolute inset-0 pointer-events-none w-full h-full">
              {pattern.map((dotIndex, i) => {
                if (i === 0) return null;
                const from = dotPositions[pattern[i - 1]!]!;
                const to = dotPositions[dotIndex]!;
                const cell = 100 / gridSize;
                return (
                  <line
                    key={i}
                    x1={`${from.col * cell + cell / 2}%`}
                    y1={`${from.row * cell + cell / 2}%`}
                    x2={`${to.col * cell + cell / 2}%`}
                    y2={`${to.row * cell + cell / 2}%`}
                    stroke="rgb(59 130 246)"
                    strokeWidth={3}
                  />
                );
              })}
            </svg>
          )}
        </div>
        {keyboardMode && (
          <button
            type="button"
            className="text-xs text-blue-400 mt-2"
            onClick={() => void complete(pattern)}
          >
            Confirm pattern
          </button>
        )}
      </div>
    </Puzzle>
  );
}

PatternLock.displayName = 'PatternLock';
