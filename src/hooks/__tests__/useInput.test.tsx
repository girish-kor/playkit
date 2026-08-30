import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderHookWithPC } from '../../test/renderWithPC';
import { useInput } from '../useInput';

describe('useInput', () => {
  it('keyboard: fires onPress/onRelease and reports isSupported via window listeners when app.keyboard is absent', () => {
    const onPress = vi.fn();
    const onRelease = vi.fn();
    const onChange = vi.fn();
    const { result } = renderHookWithPC(() =>
      useInput({ inputType: 'keyboard', key: 'Space', onPress, onRelease, onChange }),
    );
    expect(result.current.isSupported).toBe(true);
    expect(result.current.isPressed).toBe(false);

    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space' })));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(result.current.isPressed).toBe(true);
    expect(onChange).toHaveBeenCalledWith(1);

    act(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space' })));
    expect(onRelease).toHaveBeenCalledTimes(1);
    expect(result.current.isPressed).toBe(false);
  });

  it('keyboard: ignores keys that do not match the configured key', () => {
    const onPress = vi.fn();
    renderHookWithPC(() => useInput({ inputType: 'keyboard', key: 'Space', onPress }));
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('mouse: tracks button press/release', () => {
    const onPress = vi.fn();
    const onRelease = vi.fn();
    renderHookWithPC(() => useInput({ inputType: 'mouse', button: 0, onPress, onRelease }));
    act(() => window.dispatchEvent(new MouseEvent('mousedown', { button: 0 })));
    expect(onPress).toHaveBeenCalledTimes(1);
    act(() => window.dispatchEvent(new MouseEvent('mouseup', { button: 0 })));
    expect(onRelease).toHaveBeenCalledTimes(1);
  });

  it('touch: reports isSupported and tracks press state from touchstart/touchend', () => {
    const onPress = vi.fn();
    const onRelease = vi.fn();
    const { result } = renderHookWithPC(() => useInput({ inputType: 'touch', onPress, onRelease }));
    act(() => window.dispatchEvent(new Event('touchstart')));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(result.current.isPressed).toBe(true);
    act(() => window.dispatchEvent(new Event('touchend')));
    expect(onRelease).toHaveBeenCalledTimes(1);
  });

  it('gamepad: applies the deadzone to axis input and reports isSupported based on navigator.getGamepads', () => {
    vi.useFakeTimers();
    const pad = { axes: [0.05], buttons: [] };
    const originalGetGamepads = navigator.getGamepads;
    (navigator as unknown as { getGamepads: () => unknown[] }).getGamepads = () => [pad];

    const onChange = vi.fn();
    const { result } = renderHookWithPC(() =>
      useInput({ inputType: 'gamepad', axis: 0, deadzone: 0.1, onChange }),
    );
    expect(result.current.isSupported).toBe(true);

    act(() => vi.advanceTimersByTime(20));
    // 0.05 is below the 0.1 deadzone -> clamped to 0.
    expect(result.current.value).toBe(0);

    pad.axes[0] = 0.8;
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.value).toBe(0.8);
    expect(onChange).toHaveBeenCalledWith(0.8);

    (navigator as unknown as { getGamepads: () => unknown[] }).getGamepads = originalGetGamepads;
    vi.useRealTimers();
  });
});
