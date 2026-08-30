import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Energy } from '../Energy';

describe('Energy', () => {
  it('renders a Progress bar reflecting currentValue/maxValue', () => {
    render(<Energy maxValue={100} currentValue={60} aria-label="Stamina" />);
    expect(screen.getByRole('progressbar', { name: 'Stamina' })).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
  });

  it('calls onDeplete with the decrease amount, and onEmpty/onMax at the bounds', () => {
    const onDeplete = vi.fn();
    const onEmpty = vi.fn();
    const onMax = vi.fn();
    const { rerender } = render(
      <Energy
        maxValue={100}
        currentValue={100}
        onDeplete={onDeplete}
        onEmpty={onEmpty}
        onMax={onMax}
      />,
    );
    rerender(
      <Energy
        maxValue={100}
        currentValue={40}
        onDeplete={onDeplete}
        onEmpty={onEmpty}
        onMax={onMax}
      />,
    );
    expect(onDeplete).toHaveBeenCalledWith(60);
    rerender(
      <Energy
        maxValue={100}
        currentValue={0}
        onDeplete={onDeplete}
        onEmpty={onEmpty}
        onMax={onMax}
      />,
    );
    expect(onEmpty).toHaveBeenCalledTimes(1);
  });

  it('regenRate gradually regenerates after the resume delay, firing onRegenStart/onRegen/onRegenStop', () => {
    vi.useFakeTimers();
    const onRegenStart = vi.fn();
    const onRegen = vi.fn();
    const onRegenStop = vi.fn();
    render(
      <Energy
        maxValue={10}
        currentValue={9}
        regenRate={10}
        onRegenStart={onRegenStart}
        onRegen={onRegen}
        onRegenStop={onRegenStop}
      />,
    );
    act(() => vi.advanceTimersByTime(1600));
    expect(onRegenStart).toHaveBeenCalledTimes(1);
    expect(onRegen).toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(onRegenStop).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not regenerate without a regenRate', () => {
    vi.useFakeTimers();
    const onRegen = vi.fn();
    render(<Energy maxValue={100} currentValue={50} onRegen={onRegen} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(onRegen).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('showText renders the numeric label', () => {
    render(<Energy maxValue={100} currentValue={50} showText />);
    expect(screen.getByText('50 / 100')).toBeInTheDocument();
  });
});
