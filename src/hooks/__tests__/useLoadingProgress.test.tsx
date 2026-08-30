import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderHookWithPC } from '../../test/renderWithPC';
import { useLoadingProgress } from '../useLoadingProgress';

function makeAssetsApp(assets: { id: string; name: string; loaded: boolean }[]) {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  return {
    assets: {
      list: () => assets,
      on: (event: string, cb: (...args: unknown[]) => void) => {
        if (!listeners.has(event)) listeners.set(event, new Set());
        listeners.get(event)!.add(cb);
      },
      off: (event: string, cb: (...args: unknown[]) => void) => listeners.get(event)?.delete(cb),
      fire: (event: string, ...args: unknown[]) =>
        listeners.get(event)?.forEach((cb) => cb(...args)),
    },
  };
}

describe('useLoadingProgress', () => {
  it('reports progress: 1 / isComplete: true when pcApp has no assets registry', () => {
    const { result } = renderHookWithPC(() => useLoadingProgress({ pcApp: null }));
    expect(result.current.progress).toBe(1);
    expect(result.current.isComplete).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('computes progress as the fraction of loaded assets', () => {
    const app = makeAssetsApp([
      { id: 'a', name: 'a', loaded: true },
      { id: 'b', name: 'b', loaded: false },
    ]);
    const { result } = renderHookWithPC(() => useLoadingProgress({ pcApp: app }));
    expect(result.current.progress).toBe(0.5);
    expect(result.current.isComplete).toBe(false);
  });

  it('recomputes on the load event', () => {
    const assets = [
      { id: 'a', name: 'a', loaded: false },
      { id: 'b', name: 'b', loaded: false },
    ];
    const app = makeAssetsApp(assets);
    const { result } = renderHookWithPC(() => useLoadingProgress({ pcApp: app }));
    expect(result.current.progress).toBe(0);
    assets[0]!.loaded = true;
    act(() => app.assets.fire('load'));
    expect(result.current.progress).toBe(0.5);
  });

  it('surfaces asset load errors via the error field', () => {
    const app = makeAssetsApp([{ id: 'a', name: 'a', loaded: false }]);
    const { result } = renderHookWithPC(() => useLoadingProgress({ pcApp: app }));
    act(() => app.assets.fire('error', {}, new Error('404')));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('restricts tracked assets to the given manifest', () => {
    const app = makeAssetsApp([
      { id: 'a', name: 'a', loaded: true },
      { id: 'b', name: 'b', loaded: false },
      { id: 'c', name: 'c', loaded: false },
    ]);
    const { result } = renderHookWithPC(() =>
      useLoadingProgress({ pcApp: app, manifest: ['a', 'b'] }),
    );
    expect(result.current.progress).toBe(0.5);
  });

  it('honors direct progress events from the registry', () => {
    const app = makeAssetsApp([]);
    const { result } = renderHookWithPC(() => useLoadingProgress({ pcApp: app }));
    act(() => app.assets.fire('progress', 3, 10));
    expect(result.current.progress).toBe(0.3);
  });
});
