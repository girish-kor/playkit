import * as React from 'react';

import { useStopwatch } from '../../hooks/useStopwatch';
import { useStopwatchSync } from '../../hooks/useStopwatchSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { formatTime, type TimerFormat } from './Timer';

/** Precise elapsed time display with lap functionality, extending `Timer` (COMPONENTS.md § Component: Stopwatch). */
export type StopwatchVariant = 'simple' | 'with-laps' | 'split';

export interface StopwatchProps {
  format?: TimerFormat;
  pcEntity?: string;
  variant?: StopwatchVariant;
  className?: string;
  onStart?: () => void;
  onStop?: () => void;
  onLap?: (lapTime: number) => void;
  onReset?: () => void;
  onLapRecord?: (lapTime: number, lapIndex: number) => void;
  'aria-label'?: string;
  maxLaps?: number;
  onAverageLap?: (averageLapTime: number) => void;
  onBestLap?: (lapTime: number, lapIndex: number) => void;
  onLapReset?: () => void;
  onLapClear?: () => void;
}

export function Stopwatch({
  format = 'mm:ss',
  pcEntity,
  variant = 'simple',
  className,
  onStart,
  onStop,
  onLap,
  onReset,
  onLapRecord,
  'aria-label': ariaLabel = 'Stopwatch',
  maxLaps,
  onAverageLap,
  onBestLap,
  onLapReset,
  onLapClear,
}: StopwatchProps): React.JSX.Element {
  const { setElapsed: syncElapsed } = useStopwatchSync({ pcEntity });
  const bestLapRef = React.useRef<number | undefined>(undefined);

  const stopwatch = useStopwatch({
    initialTime: 0,
    maxLaps,
    onTick: (time) => {
      if (pcEntity) syncElapsed(time);
    },
    onLap: (lapTime, allLaps) => {
      onLap?.(lapTime);
      onLapRecord?.(lapTime, allLaps.length - 1);
      const average = allLaps.reduce((a, b) => a + b, 0) / allLaps.length;
      onAverageLap?.(average);
      if (bestLapRef.current === undefined || lapTime < bestLapRef.current) {
        bestLapRef.current = lapTime;
        onBestLap?.(lapTime, allLaps.length - 1);
      }
    },
  });

  const start = () => {
    stopwatch.start();
    onStart?.();
  };
  const stop = () => {
    stopwatch.pause();
    onStop?.();
  };
  const reset = () => {
    stopwatch.reset();
    stopwatch.resetLaps();
    onReset?.();
  };
  const clearLaps = () => {
    stopwatch.resetLaps();
    onLapReset?.();
    onLapClear?.();
  };

  const display = formatTime(stopwatch.time, format, true);

  return (
    <Box
      role="timer"
      aria-label={ariaLabel}
      className={cn('font-mono text-xl tabular-nums text-white', className)}
    >
      <span>{display}</span>
      <div className="flex gap-2 mt-2">
        <Button size="sm" onPress={stopwatch.isRunning ? stop : start}>
          {stopwatch.isRunning ? 'Stop' : 'Start'}
        </Button>
        {variant !== 'simple' && (
          <Button
            size="sm"
            variant="ghost"
            onPress={stopwatch.recordLap}
            disabled={!stopwatch.isRunning}
          >
            Lap
          </Button>
        )}
        <Button size="sm" variant="ghost" onPress={reset}>
          Reset
        </Button>
      </div>
      {variant === 'with-laps' && stopwatch.laps.length > 0 && (
        <ul aria-label="Lap times" className="overflow-auto max-h-32 mt-2 text-sm">
          {stopwatch.laps.map((lap, i) => (
            <li key={i}>
              Lap {i + 1}: {formatTime(lap, format, true)}
            </li>
          ))}
          <li>
            <Button size="sm" variant="ghost" onPress={clearLaps}>
              Clear laps
            </Button>
          </li>
        </ul>
      )}
    </Box>
  );
}

Stopwatch.displayName = 'Stopwatch';
