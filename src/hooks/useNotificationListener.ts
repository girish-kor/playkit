import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';

/** Scene-originated notification feed (docs/API.md § useNotificationListener) — used by `Toast`, `AlertBanner`. */
export function useNotificationListener<T = unknown>(): {
  addListener: (handler: (notification: T) => void) => () => void;
} {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);

  const addListener = React.useCallback(
    (handler: (notification: T) => void) => {
      if (!app?.on) return () => {};
      app.on('notification', handler);
      return () => app.off?.('notification', handler);
    },
    [app],
  );

  return { addListener };
}
