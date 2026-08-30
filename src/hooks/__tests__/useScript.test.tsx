import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useScript } from '../useScript';

describe('useScript', () => {
  it('is loading with the initialValue and not synced until a script owning stateKey resolves', () => {
    const { result } = renderHookWithPC(() =>
      useScript({ entityId: 'missing', stateKey: 'hp', initialValue: 100 }),
    );
    expect(result.current.value).toBe(100);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSynced).toBe(false);
  });

  it('resolves value from the script instance once found, and calls onChange', () => {
    const script = { hp: 42 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const onChange = vi.fn();
    const { result } = renderHookWithPC(
      () => useScript({ entityId: 'e1', stateKey: 'hp', initialValue: 0, onChange }),
      { app },
    );
    expect(result.current.value).toBe(42);
    expect(result.current.isSynced).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('falls back to initialValue when the script does not own the key yet', () => {
    const script = {};
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    // findScriptOwning requires hasOwnProperty(stateKey), so an empty script never
    // "owns" it -- entity resolves but the script is never treated as found.
    const { result } = renderHookWithPC(
      () => useScript({ entityId: 'e1', stateKey: 'missingKey', initialValue: 'fallback' }),
      { app },
    );
    expect(result.current.value).toBe('fallback');
    expect(result.current.isLoading).toBe(true);
  });

  it('setValue updates local state immediately and writes to the script after the debounce', () => {
    vi.useFakeTimers();
    const script = { hp: 100 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const onSync = vi.fn();
    const { result } = renderHookWithPC(
      () => useScript({ entityId: 'e1', stateKey: 'hp', debounce: 100, onSync }),
      { app },
    );

    act(() => result.current.setValue(50));
    expect(result.current.value).toBe(50);
    expect(result.current.isSynced).toBe(false);
    expect(script.hp).toBe(100);

    act(() => vi.advanceTimersByTime(100));
    expect(script.hp).toBe(50);
    expect(result.current.isSynced).toBe(true);
    expect(onSync).toHaveBeenCalledWith(50);
    vi.useRealTimers();
  });

  it('coalesces rapid setValue calls into a single debounced write (default 100ms)', () => {
    vi.useFakeTimers();
    const script = { hp: 100 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const onSync = vi.fn();
    const { result } = renderHookWithPC(
      () => useScript({ entityId: 'e1', stateKey: 'hp', onSync }),
      { app },
    );

    act(() => {
      result.current.setValue(10);
      result.current.setValue(20);
      result.current.setValue(30);
    });
    act(() => vi.advanceTimersByTime(100));
    expect(script.hp).toBe(30);
    expect(onSync).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('calls onError if writing to the script instance throws', () => {
    vi.useFakeTimers();
    const script = {
      get hp() {
        return 1;
      },
      set hp(_v: number) {
        throw new Error('boom');
      },
    };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const onError = vi.fn();
    const { result } = renderHookWithPC(
      () => useScript({ entityId: 'e1', stateKey: 'hp', debounce: 10, onError }),
      { app },
    );
    act(() => result.current.setValue(5));
    act(() => vi.advanceTimersByTime(10));
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    vi.useRealTimers();
  });
});
