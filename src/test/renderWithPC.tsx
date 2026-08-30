import * as React from 'react';
import { renderHook, type RenderHookOptions } from '@testing-library/react';

import { PCContext } from '../internal/pcContext';
import { createPCStore, type PCState } from '../internal/pcStore';

/**
 * Test helper wrapping a hook/component under test in a `PCContext.Provider` backed
 * by a pre-populated store -- bypasses `PCProvider`'s own async initialize effect
 * (script loading, etc.) since tests need synchronous, deterministic `app`/`scene`
 * availability (docs/TESTING.md § "PlayCanvas bridge isolation").
 */
export function pcWrapper(state: Partial<PCState> = {}): React.FC<{ children: React.ReactNode }> {
  const store = createPCStore({ isReady: true, isLoading: false, ...state });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <PCContext.Provider value={store}>{children}</PCContext.Provider>;
  };
}

export function renderHookWithPC<Result, Props>(
  callback: (props: Props) => Result,
  state: Partial<PCState> = {},
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(callback, { ...options, wrapper: pcWrapper(state) });
}
