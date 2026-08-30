import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Health } from '../Health';

describe('Health', () => {
  it('renders an accessible progressbar reflecting currentValue/maxValue', () => {
    render(<Health maxValue={100} currentValue={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('calls onDamage on a decrease and onHeal on an increase, with the delta amount', () => {
    const onDamage = vi.fn();
    const onHeal = vi.fn();
    const { rerender } = render(
      <Health maxValue={100} currentValue={100} onDamage={onDamage} onHeal={onHeal} />,
    );
    rerender(<Health maxValue={100} currentValue={70} onDamage={onDamage} onHeal={onHeal} />);
    expect(onDamage).toHaveBeenCalledWith(30);
    rerender(<Health maxValue={100} currentValue={90} onDamage={onDamage} onHeal={onHeal} />);
    expect(onHeal).toHaveBeenCalledWith(20);
  });

  it('calls onLow/onCritical exactly once when crossing their thresholds, not on every render below them', () => {
    const onLow = vi.fn();
    const onCritical = vi.fn();
    const { rerender } = render(
      <Health
        maxValue={100}
        currentValue={100}
        lowThreshold={25}
        onLow={onLow}
        onCritical={onCritical}
      />,
    );
    rerender(
      <Health
        maxValue={100}
        currentValue={20}
        lowThreshold={25}
        onLow={onLow}
        onCritical={onCritical}
      />,
    );
    expect(onLow).toHaveBeenCalledTimes(1);
    rerender(
      <Health
        maxValue={100}
        currentValue={5}
        lowThreshold={25}
        onLow={onLow}
        onCritical={onCritical}
      />,
    );
    expect(onCritical).toHaveBeenCalledTimes(1);
    rerender(
      <Health
        maxValue={100}
        currentValue={3}
        lowThreshold={25}
        onLow={onLow}
        onCritical={onCritical}
      />,
    );
    expect(onLow).toHaveBeenCalledTimes(1);
    expect(onCritical).toHaveBeenCalledTimes(1);
  });

  it('calls onEmpty at 0 and onMax at maxValue', () => {
    const onEmpty = vi.fn();
    const onMax = vi.fn();
    const { rerender } = render(
      <Health maxValue={100} currentValue={50} onEmpty={onEmpty} onMax={onMax} />,
    );
    rerender(<Health maxValue={100} currentValue={0} onEmpty={onEmpty} onMax={onMax} />);
    expect(onEmpty).toHaveBeenCalledTimes(1);
    rerender(<Health maxValue={100} currentValue={100} onEmpty={onEmpty} onMax={onMax} />);
    expect(onMax).toHaveBeenCalledTimes(1);
  });

  it('showText/showIcon render the numeric label and icon when enabled (both false by default)', () => {
    const { rerender } = render(<Health maxValue={100} currentValue={50} />);
    expect(screen.queryByText('50 / 100')).not.toBeInTheDocument();
    rerender(<Health maxValue={100} currentValue={50} showText />);
    expect(screen.getByText('50 / 100')).toBeInTheDocument();
  });

  it('flashOnLow applies a pulse animation once below lowThreshold (default true)', () => {
    const { container, rerender } = render(
      <Health maxValue={100} currentValue={100} lowThreshold={25} data-testid="health" />,
    );
    rerender(<Health maxValue={100} currentValue={10} lowThreshold={25} />);
    expect(container.querySelector('.animate-pulse')).not.toBeNull();
  });

  it('the sr-only status announcement escalates aria-live to assertive once critical', () => {
    render(<Health maxValue={100} currentValue={5} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'assertive');
  });
});
