import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';

/** PlayCanvas-side error reporting (docs/API.md § useErrorReporter) — used by `ErrorBoundary`, `ErrorMsg`. */
export function useErrorReporter(): { report: (error: unknown) => void } {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);

  const report = React.useCallback(
    (error: unknown) => {
      app?.fire?.('error:report', error);
    },
    [app],
  );

  return { report };
}
