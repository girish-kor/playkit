import * as React from 'react';

/** Attaches a single global key listener (docs/API.md § useKeyboardListener) — used by `Keybinds`. */
export interface UseKeyboardListenerOptions {
  key: string;
  callback: (e: KeyboardEvent) => void;
  options?: { preventDefault?: boolean; target?: 'window' | 'document' };
}

export function useKeyboardListener(opts: UseKeyboardListenerOptions): { stop: () => void } {
  const { key, callback, options } = opts;
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });

  const stoppedRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const target = options?.target === 'document' ? document : window;
    const handler = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key !== key || stoppedRef.current) return;
      if (options?.preventDefault) ke.preventDefault();
      callbackRef.current(ke);
    };
    target.addEventListener('keydown', handler);
    return () => target.removeEventListener('keydown', handler);
  }, [key, options?.preventDefault, options?.target]);

  return { stop: () => (stoppedRef.current = true) };
}
