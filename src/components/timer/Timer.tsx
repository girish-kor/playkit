import * as React from 'react';

import { useTimer } from '../../hooks/useTimer';
import { useTimerSync } from '../../hooks/useTimerSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';

/** Countdown/up timer with pause/resume and PlayCanvas time sync (COMPONENTS.md § Component: Timer). */
export type TimerMode = 'countdown' | 'countup';
export type TimerVariant = 'digital' | 'circular' | 'analog';
export type TimerFormat = 'mm:ss' | 'HH:mm:ss' | 'ss' | ((seconds: number) => string);

export interface TimerProps {
  initialTime: number;
  mode?: TimerMode;
  autoStart?: boolean;
  pcEntity?: string;
  format?: TimerFormat;
  variant?: TimerVariant;
  className?: string;
  onTick?: (time: number) => void;
  onTimeChange?: (time: number) => void;
  onFinish?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onResume?: (timestamp: number) => void;
  onReset?: () => void;
  onRestart?: () => void;
  onStart?: (timestamp: number) => void;
  'aria-label'?: string;
  timeDilation?: number;
  onTimeUpdate?: (time: number) => void;
  showMilliseconds?: boolean;
}

export function formatTime(seconds: number, format: TimerFormat, showMilliseconds = false): string {
  if (typeof format === 'function') return format(seconds);
  const totalMs = Math.max(0, seconds) * 1000;
  const hh = Math.floor(totalMs / 3600000);
  const mm = Math.floor((totalMs % 3600000) / 60000);
  const ss = Math.floor((totalMs % 60000) / 1000);
  const ms = Math.floor(totalMs % 1000);
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  const msSuffix = showMilliseconds ? `.${pad(ms, 3)}` : '';

  if (format === 'ss') return `${Math.floor(totalMs / 1000)}${msSuffix}`;
  if (format === 'HH:mm:ss') return `${pad(hh)}:${pad(mm)}:${pad(ss)}${msSuffix}`;
  return `${pad(mm)}:${pad(ss)}${msSuffix}`;
}

export function Timer({
  initialTime,
  mode = 'countup',
  autoStart = false,
  pcEntity,
  format = 'mm:ss',
  variant = 'digital',
  className,
  onTick,
  onTimeChange,
  onFinish,
  onPause,
  onStop,
  onResume,
  onReset,
  onRestart,
  onStart,
  'aria-label': ariaLabel,
  timeDilation = 1,
  onTimeUpdate,
  showMilliseconds = false,
}: TimerProps): React.JSX.Element {
  const { setTime: syncTime } = useTimerSync({ pcEntity });
  const timer = useTimer({
    initialTime,
    isCountdown: mode === 'countdown',
    autoStart,
    timeDilation,
    onTick: (time) => {
      onTick?.(time);
      onTimeChange?.(time);
      onTimeUpdate?.(time);
      if (pcEntity) syncTime(time);
    },
    onFinish,
  });

  const wasRunningRef = React.useRef(timer.isRunning);
  React.useEffect(() => {
    if (wasRunningRef.current !== timer.isRunning) {
      wasRunningRef.current = timer.isRunning;
      if (timer.isRunning) onStart?.(Date.now());
    }
  }, [timer.isRunning, onStart]);

  const pause = () => {
    timer.pause();
    onPause?.();
    onStop?.();
  };
  const resume = () => {
    timer.resume();
    onResume?.(Date.now());
  };
  const reset = () => {
    timer.reset();
    onReset?.();
  };
  const restart = () => {
    timer.start();
    onRestart?.();
  };

  const display = formatTime(timer.time, format, showMilliseconds);
  const ariaText =
    ariaLabel ?? `Timer: ${display} ${mode === 'countdown' ? 'remaining' : 'elapsed'}`;

  return (
    <Box
      role="timer"
      aria-label={ariaText}
      aria-live="polite"
      className={cn('font-mono text-2xl tabular-nums text-white', className)}
    >
      {variant === 'circular' ? (
        <svg viewBox="0 0 36 36" className="w-16 h-16">
          <path
            d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
            fill="none"
            stroke="rgb(55 65 81)"
            strokeWidth={3}
          />
          <path
            d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
            fill="none"
            stroke="rgb(59 130 246)"
            strokeWidth={3}
            strokeDasharray={`${timer.progress * 100}, 100`}
          />
          <text x="18" y="20" textAnchor="middle" className="fill-white text-[6px]">
            {display}
          </text>
        </svg>
      ) : (
        <Text as="span" className="font-mono text-2xl tabular-nums text-white">
          {display}
        </Text>
      )}
      <div className="sr-only">
        {/* useTimer's `isRunning` stays true across a pause (it only reflects
            "started at all"); the actual paused/running toggle is `isPaused`. */}
        <button type="button" onClick={timer.isPaused ? resume : pause}>
          {timer.isPaused ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={restart}>
          Restart
        </button>
      </div>
    </Box>
  );
}

Timer.displayName = 'Timer';
