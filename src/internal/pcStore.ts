import { createStore } from 'zustand/vanilla';

/**
 * The single source of truth for the PlayCanvas app/scene instance
 * (COMPONENTS.md § Component: PCProvider — "Single source of truth for PC instance").
 *
 * Created per-PCProvider-instance (never at module scope) specifically to satisfy the
 * documented SSR caveat on zustand usage (docs/STATE-MANAGEMENT.md, docs/PERFORMANCE.md):
 * "Zustand stores created at module scope are unsafe for SSR (state leaks between
 * requests) — create per-request/per-provider via a store factory if server-rendered."
 */
export interface PCState {
  app: any;
  scene: any;
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
  debug: boolean;
  config: { assetPrefix?: string; scripts?: string[] };
}

export type PCStoreApi = ReturnType<typeof createPCStore>;

export function createPCStore(initial: Partial<PCState> = {}) {
  return createStore<PCState>()(() => ({
    app: null,
    scene: null,
    isReady: false,
    isLoading: true,
    error: null,
    debug: false,
    config: {},
    ...initial,
  }));
}
