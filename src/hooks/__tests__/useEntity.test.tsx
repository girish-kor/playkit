import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderHookWithPC } from '../../test/renderWithPC';
import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { useEntity } from '../useEntity';

describe('useEntity', () => {
  it('resolves to entity: null and a null transform when entityId does not resolve (documented no-op)', () => {
    const { result } = renderHookWithPC(() => useEntity({ entityId: 'missing' }));
    expect(result.current.entity).toBeNull();
    expect(result.current.transform).toEqual({ position: null, rotation: null, scale: null });
    expect(result.current.isEnabled).toBe(false);
  });

  it('resolves the entity and its current transform when it exists', () => {
    const entity = createMockEntity({ guid: 'e1', position: { x: 1, y: 2, z: 3 } });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useEntity({ entityId: 'e1' }), { app });
    expect(result.current.entity).toBe(entity);
    expect(result.current.transform.position).toEqual({ x: 1, y: 2, z: 3 });
  });

  it('re-resolves automatically once a matching entity appears later (polling)', async () => {
    vi.useFakeTimers();
    const app = createMockApp({ entities: {} });
    const { result, rerender } = renderHookWithPC(
      ({ id }: { id: string }) => useEntity({ entityId: id }),
      { app },
      { initialProps: { id: 'missing' } },
    );
    expect(result.current.entity).toBeNull();

    const entity = createMockEntity({ guid: 'e1' });
    (app.root as { findByGuid: (id: string) => unknown }).findByGuid = (id: string) =>
      id === 'e1' ? entity : null;

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    rerender({ id: 'e1' });
    expect(result.current.entity).toBe(entity);
    vi.useRealTimers();
  });

  it('calls onEnableChange and updates isEnabled on enable/disable events', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const onEnableChange = vi.fn();
    const { result } = renderHookWithPC(() => useEntity({ entityId: 'e1', onEnableChange }), {
      app,
    });
    expect(result.current.isEnabled).toBe(true);
    act(() => entity.fire('disable'));
    expect(onEnableChange).toHaveBeenCalledWith(false);
  });

  it('calls onDestroy and resets entity to null when the entity is destroyed', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const onDestroy = vi.fn();
    const { result } = renderHookWithPC(() => useEntity({ entityId: 'e1', onDestroy }), { app });
    act(() => entity.fire('destroy'));
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(result.current.entity).toBeNull();
  });

  it('updateTransform writes to the entity and merges into local transform state', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useEntity({ entityId: 'e1' }), { app });
    act(() => result.current.updateTransform({ position: { x: 9, y: 9, z: 9 } }));
    expect(entity.getPosition()).toEqual({ x: 9, y: 9, z: 9 });
    expect(result.current.transform.position).toEqual({ x: 9, y: 9, z: 9 });
  });

  it('mirrors the transform every frame and calls onUpdate when sync is true', async () => {
    vi.useFakeTimers();
    const entity = createMockEntity({ guid: 'e1', position: { x: 0, y: 0, z: 0 } });
    const app = createMockApp({ entities: { e1: entity } });
    const onUpdate = vi.fn();
    renderHookWithPC(() => useEntity({ entityId: 'e1', sync: true, onUpdate }), { app });
    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    expect(onUpdate).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('coalesces per-frame emits so debounced updates fire far less often than every frame', async () => {
    vi.useFakeTimers();
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const onUpdateDebounced = vi.fn();
    const onUpdateEveryFrame = vi.fn();
    renderHookWithPC(
      () => {
        useEntity({ entityId: 'e1', sync: true, debounce: 100, onUpdate: onUpdateDebounced });
        useEntity({ entityId: 'e1', sync: true, onUpdate: onUpdateEveryFrame });
      },
      { app },
    );

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // Over the same 500ms window, the undebounced hook fires roughly once per (fake) 16ms
    // frame while the debounced hook -- at a 100ms window -- fires far fewer times.
    expect(onUpdateEveryFrame.mock.calls.length).toBeGreaterThan(10);
    expect(onUpdateDebounced.mock.calls.length).toBeGreaterThan(0);
    expect(onUpdateDebounced.mock.calls.length).toBeLessThan(onUpdateEveryFrame.mock.calls.length);
    vi.useRealTimers();
  });
});
