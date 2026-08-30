import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useStopwatch } from '../useStopwatch';

describe('useStopwatch', () => {
  it('recordLap captures the current elapsed time and calls onLap', () => {
    vi.useFakeTimers();
    const onLap = vi.fn();
    const { result } = renderHook(() => useStopwatch({ initialTime: 0, autoStart: true, onLap }));
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current.recordLap());
    expect(result.current.laps).toHaveLength(1);
    expect(onLap).toHaveBeenCalledWith(result.current.laps[0], result.current.laps);
    vi.useRealTimers();
  });

  it('respects maxLaps, refusing to record beyond the limit', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() =>
      useStopwatch({ initialTime: 0, autoStart: true, maxLaps: 1 }),
    );
    act(() => result.current.recordLap());
    act(() => result.current.recordLap());
    expect(result.current.laps).toHaveLength(1);
    vi.useRealTimers();
  });

  it('resetLaps clears the recorded laps', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useStopwatch({ initialTime: 0, autoStart: true }));
    act(() => result.current.recordLap());
    act(() => result.current.resetLaps());
    expect(result.current.laps).toEqual([]);
    vi.useRealTimers();
  });

  it('isLapRunning is true only while running and not paused', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useStopwatch({ initialTime: 0, autoStart: true }));
    expect(result.current.isLapRunning).toBe(true);
    act(() => result.current.pause());
    expect(result.current.isLapRunning).toBe(false);
    vi.useRealTimers();
  });
});
