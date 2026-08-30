import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';

/** Scene-triggered confirmation (docs/API.md § useConfirm) — used by `Confirm`. */
export function useConfirm(): { confirm: (title: string, message: string) => Promise<boolean> } {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);

  const confirm = React.useCallback(
    (title: string, message: string) =>
      new Promise<boolean>((resolve) => {
        app?.fire?.('confirm:request', { title, message, resolve });
        // No PlayCanvas app to answer the request: nothing will ever call `resolve`,
        // so fall back to resolving `false` on the next tick rather than hanging.
        if (!app) setTimeout(() => resolve(false), 0);
      }),
    [app],
  );

  return { confirm };
}
