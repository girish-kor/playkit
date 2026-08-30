import { useScript } from './useScript';

/** Scene-bound timer sync (docs/API.md § useTimerSync) — used by `Timer`. */
export function useTimerSync(options: { pcEntity?: string } = {}): {
  time: number;
  isRunning: boolean;
  setTime: (t: number) => void;
  start: () => void;
  pause: () => void;
} {
  const time = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'timerTime',
    initialValue: 0,
  });
  const running = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'timerRunning',
    initialValue: false,
  });
  return {
    time: (time.value as number | undefined) ?? 0,
    isRunning: Boolean(running.value),
    setTime: (t) => time.setValue(t),
    start: () => running.setValue(true),
    pause: () => running.setValue(false),
  };
}
