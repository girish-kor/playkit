import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PCContext, usePCStore } from '../pcContext';
import { createPCStore } from '../pcStore';

describe('usePCStore', () => {
  it('resolves to a default no-provider store when rendered with no PCProvider ancestor', () => {
    const { result } = renderHook(() => usePCStore());
    expect(result.current.getState()).toMatchObject({ app: null, isLoading: false });
  });

  it('resolves to the nearest PCContext.Provider store when one is present', () => {
    const store = createPCStore({ app: { id: 'my-app' } });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PCContext.Provider value={store}>{children}</PCContext.Provider>
    );
    const { result } = renderHook(() => usePCStore(), { wrapper });
    expect(result.current).toBe(store);
    expect(result.current.getState().app).toEqual({ id: 'my-app' });
  });
});
