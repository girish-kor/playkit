import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useAction } from '../useAction';
import { useKeyboardListener } from '../useKeyboardListener';
import { useScrollToBottom } from '../useScrollToBottom';
import { useToast } from '../useToast';
import { useViewport } from '../useViewport';

describe('useViewport', () => {
  it('reports the current window dimensions and computed breakpoint', () => {
    window.innerWidth = 1300;
    window.innerHeight = 800;
    const { result } = renderHook(() => useViewport());
    expect(result.current.width).toBe(1300);
    expect(result.current.breakpoint).toBe('xl');
  });

  it('recomputes on window resize', () => {
    window.innerWidth = 500;
    window.innerHeight = 800;
    const { result } = renderHook(() => useViewport());
    expect(result.current.breakpoint).toBe('sm');
    act(() => {
      window.innerWidth = 1600;
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.breakpoint).toBe('2xl');
  });
});

describe('useKeyboardListener', () => {
  it('invokes the callback only for the configured key', () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardListener({ key: 'Escape', callback }));
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('stop() permanently disables further callback invocations', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useKeyboardListener({ key: 'Escape', callback }));
    act(() => result.current.stop());
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(callback).not.toHaveBeenCalled();
  });

  it('listens on document instead of window when target is "document"', () => {
    const callback = vi.fn();
    renderHook(() =>
      useKeyboardListener({ key: 'Escape', callback, options: { target: 'document' } }),
    );
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('useScrollToBottom', () => {
  it('calls scrollTo on the container element with the full scrollHeight', () => {
    Element.prototype.scrollTo = vi.fn();
    const containerRef = React.createRef<HTMLDivElement>();
    const div = document.createElement('div');
    Object.defineProperty(div, 'scrollHeight', { value: 500 });
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = div;
    const { result } = renderHook(() => useScrollToBottom({ containerRef }));
    result.current.scrollToBottom();
    expect(div.scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'auto' });
  });

  it('is a no-op when the container ref is not yet attached (no throw)', () => {
    const containerRef = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useScrollToBottom({ containerRef }));
    expect(() => result.current.scrollToBottom()).not.toThrow();
  });
});

describe('useToast', () => {
  it('addToast enqueues a toast and auto-removes it after its duration', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useToast({ defaultDuration: 1000 }));
    act(() => {
      result.current.addToast({ message: 'Saved!' });
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.toasts).toHaveLength(0);
    vi.useRealTimers();
  });

  it('caps the queue at maxToasts, dropping the oldest', () => {
    const { result } = renderHook(() => useToast({ maxToasts: 2, defaultDuration: 0 }));
    act(() => {
      result.current.addToast({ message: 'one' });
      result.current.addToast({ message: 'two' });
      result.current.addToast({ message: 'three' });
    });
    expect(result.current.toasts).toHaveLength(2);
    expect(result.current.toasts.map((t) => t.message)).toEqual(['two', 'three']);
  });

  it('removeToast removes a specific toast by id; clearAll empties the queue', () => {
    const { result } = renderHook(() => useToast({ defaultDuration: 0 }));
    let id = '';
    act(() => {
      id = result.current.addToast({ message: 'one' });
      result.current.addToast({ message: 'two' });
    });
    act(() => result.current.removeToast(id));
    expect(result.current.toasts).toHaveLength(1);
    act(() => result.current.clearAll());
    expect(result.current.toasts).toHaveLength(0);
  });
});

describe('useAction', () => {
  it('execute calls the named method on whichever attached script owns it', async () => {
    const methodSpy = vi.fn().mockReturnValue('result');
    const script = { doThing: methodSpy };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useAction({ pcEntity: 'e1', method: 'doThing' }), {
      app,
    });
    // Resolution happens in an effect; renderHookWithPC's wrapper flushes it via act.
    const outcome = result.current.execute('arg1');
    expect(outcome).toBe('result');
    expect(methodSpy).toHaveBeenCalledWith('arg1');
  });

  it('execute is a documented no-op returning undefined when unresolved', () => {
    const { result } = renderHookWithPC(() =>
      useAction({ pcEntity: 'missing', method: 'doThing' }),
    );
    expect(result.current.execute()).toBeUndefined();
  });
});
