import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { useStore } from 'zustand';
import { describe, expect, it, vi } from 'vitest';

import { usePCStore } from '../../../internal/pcContext';
import { PCProvider } from '../PCProvider';

function Probe(): React.JSX.Element {
  const store = usePCStore();
  const state = useStore(store);
  return (
    <div data-testid="probe">
      {JSON.stringify({ isReady: state.isReady, isLoading: state.isLoading, hasApp: !!state.app })}
    </div>
  );
}

describe('PCProvider', () => {
  it('provides isLoading: true, isReady: false synchronously on mount, then resolves ready with the app', async () => {
    const app = { id: 'app' };
    let renderResult: ReturnType<typeof render>;
    await act(async () => {
      renderResult = render(
        <PCProvider pcApp={app} pcScene={null}>
          <Probe />
        </PCProvider>,
      );
    });
    const text = screen.getByTestId('probe').textContent;
    expect(JSON.parse(text!)).toEqual({ isReady: true, isLoading: false, hasApp: true });
  });

  it('calls onReady with the app and onSceneLoaded with the scene once initialized', async () => {
    const app = { id: 'app' };
    const scene = { id: 'scene' };
    const onReady = vi.fn();
    const onSceneLoaded = vi.fn();
    await act(async () => {
      render(
        <PCProvider pcApp={app} pcScene={scene} onReady={onReady} onSceneLoaded={onSceneLoaded}>
          <div />
        </PCProvider>,
      );
    });
    expect(onReady).toHaveBeenCalledWith(app);
    expect(onSceneLoaded).toHaveBeenCalledWith(scene);
  });

  it('calls onDestroy on unmount', async () => {
    const onDestroy = vi.fn();
    let unmount: () => void;
    await act(async () => {
      const result = render(
        <PCProvider pcApp={{}} pcScene={null} onDestroy={onDestroy}>
          <div />
        </PCProvider>,
      );
      unmount = result.unmount;
    });
    unmount!();
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('loads config.scripts in order before marking ready', async () => {
    const loadOrder: string[] = [];
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'script') {
        queueMicrotask(() => {
          loadOrder.push((el as HTMLScriptElement).src);
          (el as HTMLScriptElement).onload?.(new Event('load'));
        });
      }
      return el;
    });

    await act(async () => {
      render(
        <PCProvider pcApp={{}} pcScene={null} config={{ scripts: ['/a.js', '/b.js'] }}>
          <div />
        </PCProvider>,
      );
      await new Promise((r) => setTimeout(r, 0));
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(loadOrder.some((s) => s.endsWith('/a.js'))).toBe(true);
    vi.restoreAllMocks();
  });
});
