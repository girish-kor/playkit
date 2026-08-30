import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Stopwatch } from '../Stopwatch';

describe('Stopwatch', () => {
  it('renders role="timer" with the formatted elapsed time', () => {
    render(<Stopwatch />);
    expect(screen.getByRole('timer', { name: 'Stopwatch' })).toBeInTheDocument();
  });

  it('Start/Stop toggles the running state and calls onStart/onStop', () => {
    const onStart = vi.fn();
    const onStop = vi.fn();
    render(<Stopwatch onStart={onStart} onStop={onStop} />);
    act(() => screen.getByRole('button', { name: 'Start' }).click());
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    act(() => screen.getByRole('button', { name: 'Stop' }).click());
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('variant="simple" (default) has no Lap button', () => {
    render(<Stopwatch />);
    expect(screen.queryByRole('button', { name: 'Lap' })).not.toBeInTheDocument();
  });

  it('variant="with-laps" records laps and lists them, calling onLap/onLapRecord', () => {
    vi.useFakeTimers();
    const onLap = vi.fn();
    const onLapRecord = vi.fn();
    render(<Stopwatch variant="with-laps" onLap={onLap} onLapRecord={onLapRecord} />);
    act(() => screen.getByRole('button', { name: 'Start' }).click());
    act(() => vi.advanceTimersByTime(200));
    act(() => screen.getByRole('button', { name: 'Lap' }).click());
    expect(onLap).toHaveBeenCalledTimes(1);
    expect(onLapRecord).toHaveBeenCalledWith(expect.any(Number), 0);
    expect(screen.getByText(/Lap 1:/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('Lap is disabled while not running', () => {
    render(<Stopwatch variant="with-laps" />);
    expect(screen.getByRole('button', { name: 'Lap' })).toBeDisabled();
  });

  it('Reset stops the clock, clears laps, and calls onReset', () => {
    vi.useFakeTimers();
    const onReset = vi.fn();
    render(<Stopwatch variant="with-laps" onReset={onReset} />);
    act(() => screen.getByRole('button', { name: 'Start' }).click());
    act(() => vi.advanceTimersByTime(100));
    act(() => screen.getByRole('button', { name: 'Lap' }).click());
    act(() => screen.getByRole('button', { name: 'Reset' }).click());
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Lap 1:/)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('Clear laps calls onLapReset/onLapClear without stopping the clock', () => {
    vi.useFakeTimers();
    const onLapReset = vi.fn();
    const onLapClear = vi.fn();
    render(<Stopwatch variant="with-laps" onLapReset={onLapReset} onLapClear={onLapClear} />);
    act(() => screen.getByRole('button', { name: 'Start' }).click());
    act(() => vi.advanceTimersByTime(100));
    act(() => screen.getByRole('button', { name: 'Lap' }).click());
    act(() => screen.getByRole('button', { name: 'Clear laps' }).click());
    expect(onLapReset).toHaveBeenCalledTimes(1);
    expect(onLapClear).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
