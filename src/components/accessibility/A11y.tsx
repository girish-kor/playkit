import * as React from 'react';

import { useA11ySync } from '../../hooks/useA11ySync';
import { useAnnounce } from '../../hooks/useAnnounce';
import { usePrefersReducedMotion } from '../../internal/usePrefersReducedMotion';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';

/** Accessibility context provider for announcements and preferences (COMPONENTS.md § Component: A11y). */
export interface A11yContextValue {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  announce: (key: string) => void;
}

const A11yContext = React.createContext<A11yContextValue | null>(null);

export function useA11yContext(): A11yContextValue | null {
  return React.useContext(A11yContext);
}

function usePrefersHighContrast(): boolean {
  const getSnapshot = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-contrast: more)').matches;
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {};
    const mql = window.matchMedia('(prefers-contrast: more)');
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export interface A11yProps {
  announcements?: { [key: string]: string };
  highContrast?: boolean;
  reducedMotion?: boolean;
  pcEntity?: string;
  children: React.ReactNode;
  onAnnounce?: (message: string) => void;
  onFocusChange?: (element: HTMLElement) => void;
  onPreferenceChange?: (key: string, value: boolean) => void;
  screenReaderAnnouncements?: boolean;
}

export const A11y = React.forwardRef<HTMLDivElement, A11yProps>(function A11y(
  {
    announcements = {},
    highContrast,
    reducedMotion,
    pcEntity,
    children,
    onAnnounce,
    onFocusChange,
    onPreferenceChange,
    screenReaderAnnouncements = true,
  },
  ref,
) {
  const detectedReducedMotion = usePrefersReducedMotion();
  const detectedHighContrast = usePrefersHighContrast();
  const { preferences, update } = useA11ySync({ pcEntity });
  const { announce: announceDebounced } = useAnnounce();

  const prefersReducedMotion = reducedMotion ?? preferences.reducedMotion ?? detectedReducedMotion;
  const prefersHighContrast = highContrast ?? preferences.highContrast ?? detectedHighContrast;

  const [liveMessage, setLiveMessage] = React.useState('');

  const onAnnounceRef = useLatest(onAnnounce);
  const onPreferenceChangeRef = useLatest(onPreferenceChange);
  const onFocusChangeRef = useLatest(onFocusChange);

  const prevReducedMotionRef = React.useRef(prefersReducedMotion);
  const prevHighContrastRef = React.useRef(prefersHighContrast);
  React.useEffect(() => {
    if (prevReducedMotionRef.current !== prefersReducedMotion) {
      prevReducedMotionRef.current = prefersReducedMotion;
      onPreferenceChangeRef.current?.('reducedMotion', prefersReducedMotion);
    }
  }, [prefersReducedMotion, onPreferenceChangeRef]);
  React.useEffect(() => {
    if (prevHighContrastRef.current !== prefersHighContrast) {
      prevHighContrastRef.current = prefersHighContrast;
      onPreferenceChangeRef.current?.('highContrast', prefersHighContrast);
    }
  }, [prefersHighContrast, onPreferenceChangeRef]);

  React.useEffect(() => {
    update({ reducedMotion: prefersReducedMotion, highContrast: prefersHighContrast });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, prefersHighContrast]);

  React.useEffect(() => {
    if (!pcEntity || typeof document === 'undefined') return;
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement) onFocusChangeRef.current?.(e.target);
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, [pcEntity, onFocusChangeRef]);

  const announce = React.useCallback(
    (key: string) => {
      const message = announcements[key];
      if (!message) return;
      if (screenReaderAnnouncements) {
        announceDebounced(message);
        setLiveMessage(message);
      }
      onAnnounceRef.current?.(message);
    },
    [announcements, screenReaderAnnouncements, announceDebounced, onAnnounceRef],
  );

  const contextValue = React.useMemo<A11yContextValue>(
    () => ({ prefersReducedMotion, prefersHighContrast, announce }),
    [prefersReducedMotion, prefersHighContrast, announce],
  );

  return (
    <A11yContext.Provider value={contextValue}>
      <Box ref={ref} role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </Box>
      {children}
    </A11yContext.Provider>
  );
});

A11y.displayName = 'A11y';
