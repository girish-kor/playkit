import * as React from 'react';

export interface ConsoleLogEntry {
  level: 'log' | 'warn' | 'error' | 'debug';
  args: unknown[];
  timestamp: number;
}

/**
 * Intercepts both the PlayCanvas engine console and the browser console into one feed
 * (docs/API.md § useConsoleBridge, docs/LOGGING.md) — used by `Console`. Only patches
 * `console.*` while `enabled` is `true`, matching `DevTools`'s "listeners detach when
 * closed" performance contract (docs/PERFORMANCE.md).
 */
export function useConsoleBridge(options: { enabled?: boolean } = {}): {
  logs: ConsoleLogEntry[];
  clear: () => void;
  filter: (level: ConsoleLogEntry['level'] | 'all') => ConsoleLogEntry[];
} {
  const { enabled = true } = options;
  const [logs, setLogs] = React.useState<ConsoleLogEntry[]>([]);

  React.useEffect(() => {
    if (!enabled || typeof console === 'undefined') return;

    const original = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      debug: console.debug,
    };
    const patch = (level: ConsoleLogEntry['level']) => {
      return (...args: unknown[]) => {
        setLogs((prev) => [...prev, { level, args, timestamp: Date.now() }]);
        original[level](...args);
      };
    };

    console.log = patch('log');
    console.warn = patch('warn');
    console.error = patch('error');
    console.debug = patch('debug');

    return () => {
      console.log = original.log;
      console.warn = original.warn;
      console.error = original.error;
      console.debug = original.debug;
    };
  }, [enabled]);

  const clear = React.useCallback(() => setLogs([]), []);
  const filter = React.useCallback(
    (level: ConsoleLogEntry['level'] | 'all') =>
      level === 'all' ? logs : logs.filter((entry) => entry.level === level),
    [logs],
  );

  return { logs, clear, filter };
}
