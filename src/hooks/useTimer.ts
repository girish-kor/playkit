import * as React from 'react';

/**
 * Core countdown/count-up engine (docs/API.md § useTimer) — used internally by
 * `Timer`. `Timer`'s own public `mode` prop (`'countdown'|'countup'`) replaced a
 * removed `isCountdown` boolean, but this internal hook keeps its own separate,
 * non-deprecated `isCountdown` option (docs/API.md's explicit note on this).
 */
export interface UseTimerOptions {
  initialTime: number;
  isCountdown?: boolean;
  autoStart?: boolean;
  onTick?: (time: number) => void;
  onFinish?: () => void;
  /** Default `1`. */
  timeDilation?: number;
}

export interface UseTimerResult {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  progress: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer(options: UseTimerOptions): UseTimerResult {
  const {
    initialTime,
    isCountdown = false,
    autoStart = false,
    onTick,
    onFinish,
    timeDilation = 1,
  } = options;

  const [time, setTime] = React.useState(initialTime);
  const [isRunning, setIsRunning] = React.useState(autoStart);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const onTickRef = React.useRef(onTick);
  const onFinishRef = React.useRef(onFinish);
  React.useEffect(() => {
    onTickRef.current = onTick;
    onFinishRef.current = onFinish;
  });

  React.useEffect(() => {
    if (!isRunning || isPaused || isFinished) return;
    let rafId: number;
    let last = performance.now();

    const tick = (now: number) => {
      const deltaSeconds = ((now - last) / 1000) * timeDilation;
      last = now;

      setTime((prev) => {
        const next = isCountdown ? Math.max(0, prev - deltaSeconds) : prev + deltaSeconds;
        onTickRef.current?.(next);
        if (isCountdown && next <= 0) {
          setIsFinished(true);
          setIsRunning(false);
          onFinishRef.current?.();
        }
        return next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning, isPaused, isFinished, isCountdown, timeDilation]);

  const start = React.useCallback(() => {
    setTime(initialTime);
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(true);
  }, [initialTime]);

  const pause = React.useCallback(() => setIsPaused(true), []);
  const resume = React.useCallback(() => setIsPaused(false), []);
  const reset = React.useCallback(() => {
    setTime(initialTime);
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(false);
  }, [initialTime]);

  const progress =
    isCountdown && initialTime > 0
      ? 1 - time / initialTime
      : initialTime > 0
        ? time / initialTime
        : 0;

  return { time, isRunning, isPaused, isFinished, progress, start, pause, resume, reset };
}
