import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useTransition } from '../useTransition';

describe('useTransition', () => {
  it('starts idle: not loading, not complete, no error', () => {
    const { result } = renderHookWithPC(() => useTransition({ target: 'level-2' }));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('start() calls onStart immediately, then onComplete after the scene resolves (cut variant, no fade delay)', async () => {
    const scene = { loadScene: vi.fn().mockResolvedValue(undefined) };
    const app = createMockApp();
    const onStart = vi.fn();
    const onComplete = vi.fn();
    const { result } = renderHookWithPC(
      () => useTransition({ target: 'level-2', variant: 'cut', onStart, onComplete }),
      { app, scene },
    );

    await act(async () => {
      result.current.start();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(scene.loadScene).toHaveBeenCalledWith('level-2', undefined);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(result.current.isComplete).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('waits for fadeDuration before resolving for the default fade variant', async () => {
    vi.useFakeTimers();
    const scene = { loadScene: vi.fn().mockResolvedValue('ok') };
    const app = createMockApp();
    const onComplete = vi.fn();
    const { result } = renderHookWithPC(
      () => useTransition({ target: 'level-2', fadeDuration: 300, onComplete }),
      { app, scene },
    );

    act(() => result.current.start());
    expect(result.current.isLoading).toBe(true);
    expect(onComplete).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('calls onError (attempt-vs-failure path) when loadScene rejects, without throwing', async () => {
    const scene = { loadScene: vi.fn().mockRejectedValue(new Error('no such scene')) };
    const app = createMockApp();
    const onError = vi.fn();
    const { result } = renderHookWithPC(
      () => useTransition({ target: 'missing-scene', variant: 'cut', onError }),
      { app, scene },
    );

    await act(async () => {
      result.current.start();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.isLoading).toBe(false);
  });

  it('is a documented no-op-safe call when scene is unresolved (no throw)', async () => {
    const { result } = renderHookWithPC(() => useTransition({ target: 'level-2', variant: 'cut' }));
    await act(async () => {
      expect(() => result.current.start()).not.toThrow();
      await Promise.resolve();
    });
  });
});
