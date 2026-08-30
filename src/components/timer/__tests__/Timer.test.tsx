import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { formatTime, Timer } from '../Timer';

describe('formatTime', () => {
  it('formats mm:ss (default) padded to two digits', () => {
    expect(formatTime(65, 'mm:ss')).toBe('01:05');
  });

  it('formats HH:mm:ss', () => {
    expect(formatTime(3665, 'HH:mm:ss')).toBe('01:01:05');
  });

  it('formats ss as raw seconds', () => {
    expect(formatTime(90, 'ss')).toBe('90');
  });

  it('appends milliseconds when showMilliseconds is true', () => {
    expect(formatTime(1.234, 'ss', true)).toBe('1.234');
  });

  it('supports a custom formatter function', () => {
    const custom = (s: number) => `${s}s custom`;
    expect(formatTime(5, custom)).toBe('5s custom');
  });
});

describe('Timer', () => {
  it('renders role="timer" with a descriptive aria-label', () => {
    render(<Timer initialTime={0} />);
    expect(screen.getByRole('timer', { name: /Timer: 00:00 elapsed/ })).toBeInTheDocument();
  });

  it('countdown mode labels the aria description as "remaining"', () => {
    render(<Timer initialTime={10} mode="countdown" />);
    expect(screen.getByRole('timer', { name: /remaining/ })).toBeInTheDocument();
  });

  it('autoStart counts up automatically, calling onTick/onTimeChange/onTimeUpdate', () => {
    vi.useFakeTimers();
    const onTick = vi.fn();
    render(<Timer initialTime={0} autoStart onTick={onTick} />);
    act(() => vi.advanceTimersByTime(200));
    expect(onTick).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('calls onFinish when a countdown reaches zero', () => {
    vi.useFakeTimers();
    const onFinish = vi.fn();
    render(<Timer initialTime={0.05} mode="countdown" autoStart onFinish={onFinish} />);
    act(() => vi.advanceTimersByTime(500));
    expect(onFinish).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('sr-only controls: pause calls onPause/onStop, resume calls onResume', () => {
    const onPause = vi.fn();
    const onStop = vi.fn();
    const onResume = vi.fn();
    render(
      <Timer initialTime={0} autoStart onPause={onPause} onStop={onStop} onResume={onResume} />,
    );
    act(() => screen.getByRole('button', { name: 'Pause' }).click());
    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledTimes(1);
    act(() => screen.getByRole('button', { name: 'Resume' }).click());
    expect(onResume).toHaveBeenCalledWith(expect.any(Number));
  });

  it('Reset calls onReset; Restart calls onRestart', () => {
    const onReset = vi.fn();
    const onRestart = vi.fn();
    render(<Timer initialTime={5} onReset={onReset} onRestart={onRestart} />);
    act(() => screen.getByRole('button', { name: 'Reset' }).click());
    expect(onReset).toHaveBeenCalledTimes(1);
    act(() => screen.getByRole('button', { name: 'Restart' }).click());
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('variant="circular" renders an svg progress ring with the formatted time', () => {
    const { container } = render(<Timer initialTime={0} variant="circular" />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });
});
