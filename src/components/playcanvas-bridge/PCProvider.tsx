import * as React from 'react';

import { PCContext } from '../../internal/pcContext';
import { createPCStore } from '../../internal/pcStore';
import { loadScriptsInOrder } from '../../internal/pcScripts';
import { useLatest } from '../../internal/useLatest';

/**
 * Context provider for PlayCanvas engine access (COMPONENTS.md § Component:
 * PCProvider). Single source of truth for the PC app/scene instance, wrapping the
 * entire app — every other component reaches PlayCanvas exclusively through the hooks
 * in `src/hooks/`, never by importing this component's internals (docs/ARCHITECTURE.md).
 */
export interface PCProviderProps {
  /** PlayCanvas application instance (will be typed as `pc.Application`). */
  pcApp: any;
  /** PlayCanvas scene instance (will be typed as `pc.Scene`). */
  pcScene: any;
  config?: {
    assetPrefix?: string;
    scripts?: string[];
  };
  children: React.ReactNode;
  onReady?: (app: any) => void;
  onError?: (error: Error) => void;
  onSceneLoaded?: (scene: any) => void;
  onDestroy?: () => void;
  /** Enable debug logging. */
  debug?: boolean;
}

export function PCProvider(props: PCProviderProps): React.JSX.Element {
  const {
    pcApp,
    pcScene,
    config = {},
    children,
    onReady,
    onError,
    onSceneLoaded,
    onDestroy,
    debug = false,
  } = props;

  // One store per PCProvider instance — never at module scope. See
  // src/internal/pcStore.ts's comment on the documented SSR caveat this satisfies.
  const [store] = React.useState(() => createPCStore({ debug, config }));

  const onReadyRef = useLatest(onReady);
  const onErrorRef = useLatest(onError);
  const onSceneLoadedRef = useLatest(onSceneLoaded);

  React.useEffect(() => {
    store.setState({ isLoading: true, isReady: false, error: null, config, debug });

    let cancelled = false;

    async function initialize() {
      try {
        if (config.scripts && config.scripts.length > 0) {
          await loadScriptsInOrder(config.scripts, config.assetPrefix);
        }
        if (cancelled) return;
        store.setState({ app: pcApp, scene: pcScene, isReady: true, isLoading: false });
        onReadyRef.current?.(pcApp);
        if (pcScene) onSceneLoadedRef.current?.(pcScene);
      } catch (err) {
        if (cancelled) return;
        const error = err instanceof Error ? err : new Error(String(err));
        store.setState({ error, isLoading: false, isReady: false });
        onErrorRef.current?.(error);
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onReady/onError/onSceneLoaded are read via refs deliberately, so identity changes on every render don't re-run initialization.
  }, [pcApp, pcScene, config.assetPrefix, JSON.stringify(config.scripts), debug, store]);

  React.useEffect(() => {
    return () => onDestroy?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on unmount only.
  }, []);

  return <PCContext.Provider value={store}>{children}</PCContext.Provider>;
}

PCProvider.displayName = 'PCProvider';
