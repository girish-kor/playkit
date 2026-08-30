import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useA11ySync } from '../useA11ySync';
import { useAnnounce } from '../useAnnounce';
import { useErrorReporter } from '../useErrorReporter';
import { useIsTouchDevice } from '../useIsTouchDevice';
import { useSettingSync } from '../useSettingSync';
import { useSkeleton } from '../useSkeleton';
import { useStepperSync } from '../useStepperSync';
import { useTouchBridge } from '../useTouchBridge';
import { useViewportSync } from '../useViewportSync';

describe('useSkeleton', () => {
  it('converts numeric width/height to px, passing strings through unchanged', () => {
    const { result } = renderHookWithPC(() => useSkeleton({ width: 200, height: '100%' }));
    expect(result.current.style).toEqual({ width: 200, height: '100%' });
  });
});

describe('useAnnounce', () => {
  it('debounces the announce call by the given ms before it "lands" (no throw across the delay)', () => {
    vi.useFakeTimers();
    const { result } = renderHookWithPC(() => useAnnounce({ debounce: 50 }));
    expect(() => result.current.announce('Objective complete')).not.toThrow();
    act(() => vi.advanceTimersByTime(50));
    vi.useRealTimers();
  });

  it('clear() does not throw even with no pending announcement', () => {
    const { result } = renderHookWithPC(() => useAnnounce());
    expect(() => result.current.clear()).not.toThrow();
  });
});

describe('useErrorReporter', () => {
  it('report fires an error:report event on the PlayCanvas app', () => {
    const app = createMockApp();
    const fireSpy = vi.spyOn(app, 'fire');
    const { result } = renderHookWithPC(() => useErrorReporter(), { app });
    result.current.report(new Error('boom'));
    expect(fireSpy).toHaveBeenCalledWith('error:report', expect.any(Error));
  });

  it('report is a documented no-op when unresolved (no throw)', () => {
    const { result } = renderHookWithPC(() => useErrorReporter());
    expect(() => result.current.report('oops')).not.toThrow();
  });
});

describe('useIsTouchDevice', () => {
  it('reports false when neither ontouchstart nor maxTouchPoints indicate touch support', () => {
    const originalMaxTouchPoints = navigator.maxTouchPoints;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
    delete (window as { ontouchstart?: unknown }).ontouchstart;
    const { result } = renderHookWithPC(() => useIsTouchDevice());
    expect(result.current.isTouch).toBe(false);
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: originalMaxTouchPoints,
      configurable: true,
    });
  });

  it('reports true when maxTouchPoints indicates touch support', () => {
    const originalMaxTouchPoints = navigator.maxTouchPoints;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });
    const { result } = renderHookWithPC(() => useIsTouchDevice());
    expect(result.current.isTouch).toBe(true);
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: originalMaxTouchPoints,
      configurable: true,
    });
  });
});

describe('useTouchBridge', () => {
  it('sendTouchStart/Move/End each fire the matching event on the PlayCanvas app', () => {
    const app = createMockApp();
    const fireSpy = vi.spyOn(app, 'fire');
    const { result } = renderHookWithPC(() => useTouchBridge(), { app });
    result.current.sendTouchStart({ x: 1, y: 2, id: 'stick' });
    result.current.sendTouchMove({ x: 3, y: 4, id: 'stick' });
    result.current.sendTouchEnd({ id: 'stick' });
    expect(fireSpy).toHaveBeenCalledWith('touch:start', { x: 1, y: 2, id: 'stick' });
    expect(fireSpy).toHaveBeenCalledWith('touch:move', { x: 3, y: 4, id: 'stick' });
    expect(fireSpy).toHaveBeenCalledWith('touch:end', { id: 'stick' });
  });
});

describe('useA11ySync', () => {
  it('update merges a preference patch and reads it back', () => {
    const { result } = renderHookWithPC(() => useA11ySync());
    expect(result.current.preferences).toEqual({});
    act(() => result.current.update({ reducedMotion: true }));
    expect(result.current.preferences.reducedMotion).toBe(true);
  });
});

describe('useStepperSync', () => {
  it('reads/writes the active-step index, defaulting to 0', () => {
    const { result } = renderHookWithPC(() => useStepperSync());
    expect(result.current.activeStep).toBe(0);
    act(() => result.current.setStep(2));
    expect(result.current.activeStep).toBe(2);
  });
});

describe('useViewportSync', () => {
  it('mirrors the current window dimensions', () => {
    window.innerWidth = 900;
    window.innerHeight = 600;
    const { result } = renderHookWithPC(() => useViewportSync());
    expect(result.current).toEqual({ width: 900, height: 600 });
  });
});

describe('useSettingSync', () => {
  it('without pcEntity, is purely local state seeded by defaultValue', () => {
    const { result } = renderHookWithPC(() => useSettingSync({ key: 'volume', defaultValue: 50 }));
    expect(result.current.value).toBe(50);
    act(() => result.current.setValue(80));
    expect(result.current.value).toBe(80);
  });

  it('with pcEntity, reads/writes through the scoped script key', () => {
    const { result } = renderHookWithPC(() =>
      useSettingSync({ key: 'volume', pcEntity: 'missing', defaultValue: 50 }),
    );
    expect(result.current.value).toBe(50);
  });
});
