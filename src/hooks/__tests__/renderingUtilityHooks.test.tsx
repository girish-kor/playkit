import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useAnimation } from '../useAnimation';
import { useCameraProjection } from '../useCameraProjection';
import { usePlayerRotation } from '../usePlayerRotation';
import { useRaycaster } from '../useRaycaster';
import { useTypewriter } from '../useTypewriter';

describe('useAnimation', () => {
  it('tweens from `from` to `to` over `duration`, ending with isAnimating: false', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAnimation({ from: 0, to: 100, duration: 100 }));
    expect(result.current.value).toBe(0);
    expect(result.current.isAnimating).toBe(true);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.value).toBe(100);
    expect(result.current.isAnimating).toBe(false);
    vi.useRealTimers();
  });

  it('applies a custom easing function', () => {
    vi.useFakeTimers();
    const easeToZero = () => 0;
    const { result } = renderHook(() =>
      useAnimation({ from: 0, to: 100, duration: 100, easing: easeToZero }),
    );
    act(() => vi.advanceTimersByTime(50));
    expect(result.current.value).toBe(0);
    vi.useRealTimers();
  });
});

describe('useTypewriter', () => {
  it('autoStart reveals text character-by-character at the given speed', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter({ text: 'hi', speed: 10 }));
    expect(result.current.displayed).toBe('');
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.displayed).toBe('h');
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.displayed).toBe('hi');
    expect(result.current.isComplete).toBe(true);
    vi.useRealTimers();
  });

  it('autoStart: false waits for start() before revealing anything', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter({ text: 'hi', autoStart: false, speed: 10 }));
    expect(result.current.isComplete).toBe(false);
    expect(result.current.displayed).toBe('');
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(100));
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.displayed).toBe('hi');
    expect(result.current.isComplete).toBe(true);
    vi.useRealTimers();
  });

  it('skip() jumps straight to the full text', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypewriter({ text: 'hello', speed: 1 }));
    act(() => result.current.skip());
    expect(result.current.displayed).toBe('hello');
    expect(result.current.isComplete).toBe(true);
    vi.useRealTimers();
  });
});

describe('usePlayerRotation', () => {
  it('reads the entity heading from its Euler y-rotation, normalized to 0-360', () => {
    vi.useFakeTimers();
    const entity = createMockEntity({ guid: 'e1', rotation: { x: 0, y: -90, z: 0 } });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => usePlayerRotation({ pcEntity: 'e1' }), { app });
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.heading).toBe(270);
    vi.useRealTimers();
  });

  it('defaults to heading 0 and rotation null when unresolved', () => {
    const { result } = renderHookWithPC(() => usePlayerRotation());
    expect(result.current.heading).toBe(0);
    expect(result.current.rotation).toBeNull();
  });
});

describe('useCameraProjection', () => {
  it('falls back to raw world x/y when the camera lacks worldToScreen (documented no-op degradation)', () => {
    const { result } = renderHookWithPC(() => useCameraProjection({ pcCamera: 'missing-cam' }));
    expect(result.current.project({ x: 3, y: 4, z: 5 })).toEqual({ x: 3, y: 4 });
  });

  it('uses cameraComponent.worldToScreen when available', () => {
    const camera = {
      worldToScreen: (_world: unknown, out: { x: number; y: number }) => {
        out.x = 100;
        out.y = 200;
      },
    };
    const entity = createMockEntity({ guid: 'cam' });
    (entity as unknown as { camera: unknown }).camera = camera;
    const app = createMockApp({ entities: { cam: entity } });
    const { result } = renderHookWithPC(() => useCameraProjection({ pcCamera: 'cam' }), { app });
    expect(result.current.project({ x: 1, y: 1, z: 1 })).toEqual({ x: 100, y: 200 });
  });
});

describe('useRaycaster', () => {
  it('returns a null target when the camera/physics system is unavailable (documented no-op)', () => {
    vi.useFakeTimers();
    const { result } = renderHookWithPC(() => useRaycaster({ pcCamera: 'missing-cam' }));
    act(() => vi.advanceTimersByTime(50));
    expect(result.current.target).toBeNull();
    vi.useRealTimers();
  });

  it('polls at the given throttleRate via intersect()', () => {
    vi.useFakeTimers();
    const entity = createMockEntity({ guid: 'cam' });
    const app = createMockApp({ entities: { cam: entity } });
    const { result } = renderHookWithPC(() => useRaycaster({ pcCamera: 'cam', throttleRate: 50 }), {
      app,
    });
    expect(() => act(() => vi.advanceTimersByTime(150))).not.toThrow();
    expect(result.current.target).toBeNull();
    vi.useRealTimers();
  });
});
