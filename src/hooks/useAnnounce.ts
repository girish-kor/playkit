import * as React from 'react';

/**
 * Debounced screen-reader announcement (docs/API.md § useAnnounce) — used by `A11y`,
 * `ScreenReader`, `LiveRegion`. Default debounce `100`ms (docs/PERFORMANCE.md).
 */
export function useAnnounce(options: { debounce?: number } = {}): {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  clear: () => void;
} {
  const { debounce = 100 } = options;
  const [, setMessage] = React.useState<{ text: string; priority: 'polite' | 'assertive' } | null>(
    null,
  );
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const announce = React.useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMessage({ text: message, priority }), debounce);
    },
    [debounce],
  );

  const clear = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(null);
  }, []);

  return { announce, clear };
}
