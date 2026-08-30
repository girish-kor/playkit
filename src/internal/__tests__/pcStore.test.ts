import { useStore } from 'zustand';
import { describe, expect, it } from 'vitest';

import { createPCStore } from '../pcStore';

describe('createPCStore', () => {
  it('defaults to a not-ready, loading state with no app/scene', () => {
    const store = createPCStore();
    expect(store.getState()).toMatchObject({
      app: null,
      scene: null,
      isReady: false,
      isLoading: true,
      error: null,
      debug: false,
      config: {},
    });
  });

  it('accepts partial initial state overrides', () => {
    const store = createPCStore({ debug: true, isLoading: false });
    expect(store.getState().debug).toBe(true);
    expect(store.getState().isLoading).toBe(false);
  });

  it('creates an independent store per call (no shared module-scope state)', () => {
    const a = createPCStore({ debug: true });
    const b = createPCStore({ debug: false });
    expect(a.getState().debug).not.toBe(b.getState().debug);
    a.setState({ debug: false });
    expect(b.getState().debug).toBe(false);
  });

  it('is a real zustand store usable via useStore', () => {
    const store = createPCStore();
    expect(typeof useStore).toBe('function');
    expect(store.getState().isLoading).toBe(true);
  });
});
