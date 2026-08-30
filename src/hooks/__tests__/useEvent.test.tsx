import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useEvent } from '../useEvent';

describe('useEvent', () => {
  it('is not listening when the entity is unresolved (documented no-op)', () => {
    const handler = vi.fn();
    const { result } = renderHookWithPC(() =>
      useEvent({ entityId: 'missing', event: 'hit', handler }),
    );
    expect(result.current.isListening).toBe(false);
  });

  it('subscribes once the entity resolves, calls onSubscribe, and invokes handler + onTrigger on fire', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const handler = vi.fn();
    const onTrigger = vi.fn();
    const onSubscribe = vi.fn();
    const { result } = renderHookWithPC(
      () => useEvent({ entityId: 'e1', event: 'hit', handler, onTrigger, onSubscribe }),
      { app },
    );
    expect(result.current.isListening).toBe(true);
    expect(onSubscribe).toHaveBeenCalledTimes(1);

    act(() => entity.fire('hit', 5));
    expect(handler).toHaveBeenCalledWith(5);
    expect(onTrigger).toHaveBeenCalledWith(5);
    expect(result.current.lastEvent).toBe(5);
  });

  it('subscribing to an event the entity never fires is a silent no-op, not an error', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const handler = vi.fn();
    const { result } = renderHookWithPC(
      () => useEvent({ entityId: 'e1', event: 'never-fired', handler }),
      { app },
    );
    expect(result.current.isListening).toBe(true);
    expect(handler).not.toHaveBeenCalled();
  });

  it('once: true only fires the handler a single time', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const handler = vi.fn();
    renderHookWithPC(() => useEvent({ entityId: 'e1', event: 'hit', handler, once: true }), {
      app,
    });
    act(() => {
      entity.fire('hit');
      entity.fire('hit');
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onUnsubscribe and stops listening on unmount', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const onUnsubscribe = vi.fn();
    const { unmount } = renderHookWithPC(
      () => useEvent({ entityId: 'e1', event: 'hit', handler: vi.fn(), onUnsubscribe }),
      { app },
    );
    unmount();
    expect(onUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('debounces rapid fires into a single handler call', () => {
    vi.useFakeTimers();
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    const handler = vi.fn();
    renderHookWithPC(() => useEvent({ entityId: 'e1', event: 'hit', handler, debounce: 100 }), {
      app,
    });
    act(() => {
      entity.fire('hit', 1);
      entity.fire('hit', 2);
      entity.fire('hit', 3);
    });
    expect(handler).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(3);
    vi.useRealTimers();
  });
});
