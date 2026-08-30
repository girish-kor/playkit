import * as React from 'react';

import { useTimer, type UseTimerOptions, type UseTimerResult } from './useTimer';

/**
 * Extends `useTimer`'s props with `{maxLaps?, onLap?}` (docs/API.md § useStopwatch) —
 * used internally by `Stopwatch`. Recorded lap times always carry ms precision
 * internally regardless of what `Stopwatch.showMilliseconds` displays
 * (docs/REBUILD-GUIDE.md).
 */
export interface UseStopwatchOptions extends Omit<UseTimerOptions, 'isCountdown'> {
  maxLaps?: number;
  onLap?: (lapTime: number, allLaps: number[]) => void;
}

export interface UseStopwatchResult extends UseTimerResult {
  laps: number[];
  isLapRunning: boolean;
  recordLap: () => void;
  resetLaps: () => void;
}

export function useStopwatch(options: UseStopwatchOptions): UseStopwatchResult {
  const { maxLaps, onLap, ...timerOptions } = options;
  const timer = useTimer({ ...timerOptions, isCountdown: false });
  const [laps, setLaps] = React.useState<number[]>([]);

  const recordLap = React.useCallback(() => {
    setLaps((prev) => {
      if (maxLaps !== undefined && prev.length >= maxLaps) return prev;
      const next = [...prev, timer.time];
      onLap?.(timer.time, next);
      return next;
    });
  }, [maxLaps, onLap, timer.time]);

  const resetLaps = React.useCallback(() => setLaps([]), []);

  return { ...timer, laps, isLapRunning: timer.isRunning && !timer.isPaused, recordLap, resetLaps };
}
