import * as React from 'react';
import { createStore, useStore } from 'zustand';

import { usePuzzleBridge } from '../../hooks/usePuzzleBridge';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Flex } from '../primitives/Flex';

/**
 * Abstract puzzle container with state management and PlayCanvas bridge
 * (COMPONENTS.md § Component: Puzzle). All other puzzle types extend this. Uses a
 * per-instance zustand store (never module scope, per the documented SSR caveat --
 * docs/STATE-MANAGEMENT.md, same pattern as PCProvider's store).
 */
export type PuzzleType = 'logic' | 'sequence' | 'pattern' | 'code' | 'physical';

export interface PuzzleProps<S = unknown> {
  puzzleId: string;
  type: PuzzleType;
  pcEntity?: string;
  initialState?: Record<string, S>;
  children?: React.ReactNode;
  solution?: S;
  maxAttempts?: number;
  onSolve?: (solution: S) => void;
  onComplete?: (solution: S) => void;
  onFail?: () => void;
  onAttemptFail?: (attempt: S) => void;
  onError?: (error: Error) => void;
  onReset?: () => void;
  onStateReset?: () => void;
  onStateChange?: (state: S) => void;
  onAttempt?: (attempt: S) => void;
  'aria-label'?: string;
  validateSolution?: (state: S, solution: S) => boolean | Promise<boolean>;
  hint?: string | ((state: S) => string);
  onHint?: (hint: string) => void;
  timeLimit?: number;
  autoReset?: boolean;
  onTimeout?: () => void;
  onTimeExpire?: () => void;
  showHints?: boolean;
  className?: string;
}

interface PuzzleStoreState<S> {
  state: Record<string, S> | undefined;
  attempts: number;
}

export function createPuzzleStore<S>(initial?: Record<string, S>) {
  return createStore<PuzzleStoreState<S>>()(() => ({ state: initial, attempts: 0 }));
}

export function Puzzle<S = unknown>({
  puzzleId,
  type,
  pcEntity,
  initialState,
  children,
  solution,
  maxAttempts = 3,
  onSolve,
  onComplete,
  onFail,
  onAttemptFail,
  onError,
  onReset,
  onStateReset,
  onStateChange,
  onAttempt,
  'aria-label': ariaLabel,
  validateSolution,
  hint,
  onHint,
  timeLimit,
  autoReset = false,
  onTimeout,
  onTimeExpire,
  showHints = true,
  className,
}: PuzzleProps<S>): React.JSX.Element {
  const [store] = React.useState(() => createPuzzleStore<S>(initialState));
  const state = useStore(store, (s) => s.state);
  const attempts = useStore(store, (s) => s.attempts);

  const { reset: resetBridge } = usePuzzleBridge<Record<string, S> | undefined>({
    puzzleId,
    pcEntity,
  });

  const prevStateRef = React.useRef(state);
  React.useEffect(() => {
    if (prevStateRef.current !== state) {
      prevStateRef.current = state;
      if (state) onStateChange?.(state as unknown as S);
    }
  }, [state, onStateChange]);

  React.useEffect(() => {
    if (!timeLimit) return;
    const id = setTimeout(() => {
      onTimeout?.();
      onTimeExpire?.();
    }, timeLimit * 1000);
    return () => clearTimeout(id);
  }, [timeLimit, onTimeout, onTimeExpire]);

  const reset = React.useCallback(() => {
    store.setState({ state: initialState, attempts: 0 });
    resetBridge();
    onReset?.();
    onStateReset?.();
  }, [store, initialState, resetBridge, onReset, onStateReset]);

  const attempt = React.useCallback(
    async (candidate: S) => {
      onAttempt?.(candidate);
      try {
        const isCorrect = validateSolution
          ? await validateSolution(candidate, solution as S)
          : candidate === solution;
        if (isCorrect) {
          onSolve?.(candidate);
          onComplete?.(candidate);
          if (autoReset) reset();
        } else {
          const nextAttempts = attempts + 1;
          store.setState({ attempts: nextAttempts });
          onAttemptFail?.(candidate);
          if (maxAttempts > 0 && nextAttempts >= maxAttempts) onFail?.();
        }
      } catch (err) {
        onError?.(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [
      attempts,
      autoReset,
      maxAttempts,
      onAttempt,
      onAttemptFail,
      onComplete,
      onError,
      onFail,
      onSolve,
      reset,
      solution,
      store,
      validateSolution,
    ],
  );

  const requestHint = React.useCallback(() => {
    if (!showHints || !hint) return;
    const text = typeof hint === 'function' ? hint(state as unknown as S) : hint;
    onHint?.(text);
  }, [showHints, hint, state, onHint]);

  const context = React.useMemo(
    () => ({ store, attempt, reset, requestHint, attempts, puzzleId, type }),
    [store, attempt, reset, requestHint, attempts, puzzleId, type],
  );

  return (
    <PuzzleContext.Provider value={context as unknown as PuzzleContextValue<unknown>}>
      <Box role="region" aria-label={ariaLabel ?? `${puzzleId} puzzle`} className={cn(className)}>
        <Flex direction="col" gap={2}>
          {children}
        </Flex>
      </Box>
    </PuzzleContext.Provider>
  );
}

Puzzle.displayName = 'Puzzle';

export interface PuzzleContextValue<S> {
  store: ReturnType<typeof createPuzzleStore<S>>;
  attempt: (candidate: S) => Promise<void>;
  reset: () => void;
  requestHint: () => void;
  attempts: number;
  puzzleId: string;
  type: PuzzleType;
}

export const PuzzleContext = React.createContext<PuzzleContextValue<unknown> | null>(null);

export function usePuzzleContext<S = unknown>(): PuzzleContextValue<S> | null {
  return React.useContext(PuzzleContext) as PuzzleContextValue<S> | null;
}
