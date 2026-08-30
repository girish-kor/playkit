import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTimer } from '../useTimer';

describe('useTimer', () => {
  it('count-up mode increases time from initialTime once started', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimer({ initialTime: 0 }));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.time).toBeGreaterThan(0);
    vi.useRealTimers();
  });

  it('count-down mode decreases time and finishes at 0, calling onFinish', () => {
    vi.useFakeTimers();
    const onFinish = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ initialTime: 0.1, isCountdown: true, autoStart: true, onFinish }),
    );
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.isFinished).toBe(true);
    expect(result.current.time).toBe(0);
    expect(onFinish).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('pause stops the clock; resume continues it', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimer({ initialTime: 0, autoStart: true }));
    act(() => vi.advanceTimersByTime(200));
    const afterFirstRun = result.current.time;
    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.time).toBe(afterFirstRun);
    act(() => result.current.resume());
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.time).toBeGreaterThan(afterFirstRun);
    vi.useRealTimers();
  });

  it('reset returns to initialTime and clears isFinished/isRunning', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimer({ initialTime: 5, autoStart: true }));
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current.reset());
    expect(result.current.time).toBe(5);
    expect(result.current.isRunning).toBe(false);
    vi.useRealTimers();
  });

  it('calls onTick with the updated time on every frame', () => {
    vi.useFakeTimers();
    const onTick = vi.fn();
    renderHook(() => useTimer({ initialTime: 0, autoStart: true, onTick }));
    act(() => vi.advanceTimersByTime(100));
    expect(onTick).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('progress is time/initialTime for count-up mode (starts at 1 since time starts at initialTime)', () => {
    const { result } = renderHook(() => useTimer({ initialTime: 10 }));
    expect(result.current.progress).toBe(1);
  });

  it('progress is 1 - time/initialTime for countdown mode (starts at 0, approaches 1 as time runs out)', () => {
    const { result } = renderHook(() => useTimer({ initialTime: 10, isCountdown: true }));
    expect(result.current.progress).toBe(0);
  });
});
